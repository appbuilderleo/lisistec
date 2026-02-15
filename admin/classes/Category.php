<?php
/**
 * LISIS - Category Management Class
 * Classe para gestão de categorias
 */

require_once __DIR__ . '/../config/database.php';

class Category {
    private $conn;
    private $table_name = "categories";
    
    public $id;
    public $name;
    public $slug;
    public $description;
    public $is_active;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    // Obter todas as categorias ativas
    public function getAll() {
        $query = "SELECT c.*, COUNT(i.id) as image_count 
                  FROM " . $this->table_name . " c 
                  LEFT JOIN images i ON c.id = i.category_id AND i.is_active = 1 
                  WHERE c.is_active = 1 
                  GROUP BY c.id 
                  ORDER BY c.name ASC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }
    
    // Obter categoria por ID
    public function getById($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id AND is_active = 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        return $stmt->fetch();
    }
    
    // Obter categoria por slug
    public function getBySlug($slug) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE slug = :slug AND is_active = 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':slug', $slug);
        $stmt->execute();
        
        return $stmt->fetch();
    }
    
    // Criar nova categoria
    public function create() {
        // Verificar se slug já existe
        if ($this->slugExists($this->slug)) {
            return false;
        }
        
        $query = "INSERT INTO " . $this->table_name . " (name, slug, description) 
                  VALUES (:name, :slug, :description)";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':slug', $this->slug);
        $stmt->bindParam(':description', $this->description);
        
        if ($stmt->execute()) {
            return $this->conn->lastInsertId();
        }
        
        return false;
    }
    
    // Atualizar categoria
    public function update() {
        // Verificar se slug já existe (exceto para a categoria atual)
        if ($this->slugExists($this->slug, $this->id)) {
            return false;
        }
        
        $query = "UPDATE " . $this->table_name . " 
                  SET name = :name, slug = :slug, description = :description 
                  WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':slug', $this->slug);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':id', $this->id);
        
        return $stmt->execute();
    }
    
    // Eliminar categoria (soft delete)
    public function delete() {
        // Verificar se categoria tem imagens associadas
        $query = "SELECT COUNT(*) as count FROM images WHERE category_id = :id AND is_active = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
        $result = $stmt->fetch();
        
        if ($result['count'] > 0) {
            return false; // Não pode eliminar categoria com imagens
        }
        
        $query = "UPDATE " . $this->table_name . " SET is_active = 0 WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        
        return $stmt->execute();
    }
    
    // Verificar se slug já existe
    private function slugExists($slug, $exclude_id = null) {
        $query = "SELECT id FROM " . $this->table_name . " WHERE slug = :slug AND is_active = 1";
        
        if ($exclude_id) {
            $query .= " AND id != :exclude_id";
        }
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':slug', $slug);
        
        if ($exclude_id) {
            $stmt->bindParam(':exclude_id', $exclude_id);
        }
        
        $stmt->execute();
        
        return $stmt->rowCount() > 0;
    }
    
    // Criar slug a partir do nome
    public function createSlug($text) {
        $text = strtolower($text);
        $text = preg_replace('/[^a-z0-9\s-]/', '', $text);
        $text = preg_replace('/[\s-]+/', '-', $text);
        $text = trim($text, '-');
        return $text;
    }
}
?>
