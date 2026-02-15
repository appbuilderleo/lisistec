<?php
/**
 * LISIS - Image Management Class
 * Classe para gestão de imagens
 */

require_once __DIR__ . '/../config/database.php';

class Image {
    private $conn;
    private $table_name = "images";
    
    public $id;
    public $filename;
    public $original_name;
    public $file_path;
    public $file_size;
    public $mime_type;
    public $width;
    public $height;
    public $category_id;
    public $title;
    public $description;
    public $alt_text;
    public $is_active;
    public $upload_date;
    public $website_url;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    // Obter todas as imagens com paginação e filtros
    public function getAll($page = 1, $limit = 24, $category = null, $search = null, $sort = 'upload_date DESC') {
        $offset = ($page - 1) * $limit;
        
        $query = "SELECT i.*, c.name as category_name, c.slug as category_slug 
                  FROM " . $this->table_name . " i 
                  LEFT JOIN categories c ON i.category_id = c.id 
                  WHERE i.is_active = 1";
        
        $params = array();
        
        if ($category) {
            $query .= " AND c.slug = :category";
            $params[':category'] = $category;
        }
        
        if ($search) {
            $query .= " AND (i.original_name LIKE :search OR i.title LIKE :search OR i.description LIKE :search)";
            $params[':search'] = '%' . $search . '%';
        }
        
        // Validar ordenação
        $allowed_sorts = ['upload_date DESC', 'upload_date ASC', 'original_name ASC', 'original_name DESC'];
        if (!in_array($sort, $allowed_sorts)) {
            $sort = 'upload_date DESC';
        }
        
        $query .= " ORDER BY " . $sort . " LIMIT :limit OFFSET :offset";
        
        $stmt = $this->conn->prepare($query);
        
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        
        $stmt->execute();
        return $stmt->fetchAll();
    }
    
    // Contar total de imagens (para paginação)
    public function countAll($category = null, $search = null) {
        $query = "SELECT COUNT(*) as total FROM " . $this->table_name . " i 
                  LEFT JOIN categories c ON i.category_id = c.id 
                  WHERE i.is_active = 1";
        
        $params = array();
        
        if ($category) {
            $query .= " AND c.slug = :category";
            $params[':category'] = $category;
        }
        
        if ($search) {
            $query .= " AND (i.original_name LIKE :search OR i.title LIKE :search OR i.description LIKE :search)";
            $params[':search'] = '%' . $search . '%';
        }
        
        $stmt = $this->conn->prepare($query);
        
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        
        $stmt->execute();
        $result = $stmt->fetch();
        return $result['total'];
    }
    
    // Obter imagem por ID
    public function getById($id) {
        $query = "SELECT i.*, c.name as category_name, c.slug as category_slug 
                  FROM " . $this->table_name . " i 
                  LEFT JOIN categories c ON i.category_id = c.id 
                  WHERE i.id = :id AND i.is_active = 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        return $stmt->fetch();
    }
    
    // Criar nova imagem
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  (filename, original_name, file_path, file_size, mime_type, width, height, 
                   category_id, title, description, alt_text, website_url) 
                  VALUES 
                  (:filename, :original_name, :file_path, :file_size, :mime_type, :width, :height, 
                   :category_id, :title, :description, :alt_text, :website_url)";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':filename', $this->filename);
        $stmt->bindParam(':original_name', $this->original_name);
        $stmt->bindParam(':file_path', $this->file_path);
        $stmt->bindParam(':file_size', $this->file_size);
        $stmt->bindParam(':mime_type', $this->mime_type);
        $stmt->bindParam(':width', $this->width);
        $stmt->bindParam(':height', $this->height);
        $stmt->bindParam(':category_id', $this->category_id);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':alt_text', $this->alt_text);
        $stmt->bindParam(':website_url', $this->website_url);
        
        if ($stmt->execute()) {
            return $this->conn->lastInsertId();
        }
        
        return false;
    }
    
    // Atualizar imagem
    public function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET original_name = :original_name, category_id = :category_id, 
                      title = :title, description = :description, alt_text = :alt_text, 
                      website_url = :website_url 
                  WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':original_name', $this->original_name);
        $stmt->bindParam(':category_id', $this->category_id);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':alt_text', $this->alt_text);
        $stmt->bindParam(':website_url', $this->website_url);
        $stmt->bindParam(':id', $this->id);
        
        return $stmt->execute();
    }
    
    // Eliminar imagem (hard delete - permanente)
    public function delete() {
        // Primeiro, obter informações da imagem para deletar o arquivo físico
        $image = $this->getById($this->id);
        
        if ($image) {
            // Deletar arquivo físico se existir
            $file_path = '../' . $image['file_path'];
            if (file_exists($file_path)) {
                @unlink($file_path);
            }
            
            // Remover tags associadas
            $this->removeTags($this->id);
        }
        
        // Deletar registro da base de dados
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        
        return $stmt->execute();
    }
    
    // Obter tags de uma imagem
    public function getTags($image_id) {
        $query = "SELECT t.* FROM tags t 
                  INNER JOIN image_tags it ON t.id = it.tag_id 
                  WHERE it.image_id = :image_id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':image_id', $image_id);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }
    
    // Adicionar tags a uma imagem
    public function addTags($image_id, $tags) {
        if (empty($tags)) return true;
        
        // Primeiro, remover tags existentes
        $this->removeTags($image_id);
        
        foreach ($tags as $tag_name) {
            $tag_name = trim($tag_name);
            if (empty($tag_name)) continue;
            
            // Criar tag se não existir
            $tag_id = $this->createOrGetTag($tag_name);
            
            // Associar tag à imagem
            $query = "INSERT INTO image_tags (image_id, tag_id) VALUES (:image_id, :tag_id)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':image_id', $image_id);
            $stmt->bindParam(':tag_id', $tag_id);
            $stmt->execute();
        }
        
        return true;
    }
    
    // Remover todas as tags de uma imagem
    public function removeTags($image_id) {
        $query = "DELETE FROM image_tags WHERE image_id = :image_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':image_id', $image_id);
        return $stmt->execute();
    }
    
    // Criar ou obter tag existente
    private function createOrGetTag($tag_name) {
        $slug = $this->createSlug($tag_name);
        
        // Verificar se tag já existe
        $query = "SELECT id FROM tags WHERE slug = :slug";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':slug', $slug);
        $stmt->execute();
        
        $result = $stmt->fetch();
        if ($result) {
            return $result['id'];
        }
        
        // Criar nova tag
        $query = "INSERT INTO tags (name, slug) VALUES (:name, :slug)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':name', $tag_name);
        $stmt->bindParam(':slug', $slug);
        $stmt->execute();
        
        return $this->conn->lastInsertId();
    }
    
    // Criar slug a partir do nome
    private function createSlug($text) {
        $text = strtolower($text);
        $text = preg_replace('/[^a-z0-9]+/', '-', $text);
        $text = trim($text, '-');
        return $text;
    }
}
?>
