<?php
/**
 * LISIS - Images API Endpoint
 * API para gestão de imagens
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../config/session.php';
session_start();

require_once '../config/database.php';
require_once '../classes/Image.php';
require_once '../classes/Auth.php';

$auth = new Auth();
$image = new Image();

// Verificar autenticação para operações que não sejam GET
$method = $_SERVER['REQUEST_METHOD'];
if ($method !== 'GET' && !$auth->isAuthenticated()) {
    http_response_code(401);
    echo json_encode(['error' => 'Não autorizado']);
    exit;
}

try {
    switch ($method) {
        case 'GET':
            handleGet($image);
            break;
        case 'POST':
            handlePost($image);
            break;
        case 'PUT':
            handlePut($image);
            break;
        case 'DELETE':
            handleDelete($image);
            break;
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Método não permitido']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro interno do servidor: ' . $e->getMessage()]);
}

function handleGet($image) {
    $id = $_GET['id'] ?? null;
    
    if ($id) {
        // Obter imagem específica
        $result = $image->getById($id);
        if ($result) {
            // Obter tags da imagem
            $tags = $image->getTags($id);
            $result['tags'] = array_column($tags, 'name');
            
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Imagem não encontrada']);
        }
    } else {
        // Obter lista de imagens com paginação e filtros
        $page = intval($_GET['page'] ?? 1);
        $limit = intval($_GET['limit'] ?? 24);
        $category = $_GET['category'] ?? null;
        $search = $_GET['search'] ?? null;
        $sort = $_GET['sort'] ?? 'upload_date DESC';
        
        $images = $image->getAll($page, $limit, $category, $search, $sort);
        $total = $image->countAll($category, $search);
        
        // Adicionar tags para cada imagem
        foreach ($images as &$img) {
            $tags = $image->getTags($img['id']);
            $img['tags'] = array_column($tags, 'name');
        }
        
        echo json_encode([
            'images' => $images,
            'total' => $total,
            'page' => $page,
            'limit' => $limit,
            'pages' => ceil($total / $limit)
        ]);
    }
}

function handlePost($image) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Dados inválidos']);
        return;
    }
    
    // Validar campos obrigatórios
    $required_fields = ['filename', 'original_name', 'file_path', 'file_size', 'mime_type'];
    foreach ($required_fields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            http_response_code(400);
            echo json_encode(['error' => "Campo obrigatório: $field"]);
            return;
        }
    }
    
    // Definir propriedades da imagem
    $image->filename = $data['filename'];
    $image->original_name = $data['original_name'];
    $image->file_path = $data['file_path'];
    $image->file_size = $data['file_size'];
    $image->mime_type = $data['mime_type'];
    $image->width = $data['width'] ?? null;
    $image->height = $data['height'] ?? null;
    $image->category_id = $data['category_id'] ?? null;
    $image->title = $data['title'] ?? $data['original_name'];
    $image->description = $data['description'] ?? '';
    $image->alt_text = $data['alt_text'] ?? $data['original_name'];
    $image->website_url = $data['website_url'] ?? null;
    
    $image_id = $image->create();
    
    if ($image_id) {
        // Adicionar tags se fornecidas
        if (isset($data['tags']) && is_array($data['tags'])) {
            $image->addTags($image_id, $data['tags']);
        }
        
        echo json_encode([
            'success' => true,
            'id' => $image_id,
            'message' => 'Imagem criada com sucesso'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao criar imagem']);
    }
}

function handlePut($image) {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Dados inválidos']);
            return;
        }
        
        $id = $data['id'] ?? null;
        
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID da imagem é obrigatório']);
            return;
        }
        
        // Verificar se imagem existe
        $existing = $image->getById($id);
        if (!$existing) {
            http_response_code(404);
            echo json_encode(['error' => 'Imagem não encontrada']);
            return;
        }
        
        // Verificar se categoria existe (se fornecida)
        if (isset($data['category_id']) && $data['category_id']) {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare("SELECT id FROM categories WHERE id = ?");
            $stmt->execute([$data['category_id']]);
            if (!$stmt->fetch()) {
                http_response_code(400);
                echo json_encode(['error' => 'Categoria não encontrada. Por favor, selecione uma categoria válida.']);
                return;
            }
        }
        
        // Definir propriedades da imagem
        $image->id = $id;
        $image->original_name = $data['original_name'] ?? $existing['original_name'];
        $image->category_id = $data['category_id'] ?? $existing['category_id'];
        $image->title = $data['title'] ?? $existing['title'];
        $image->description = $data['description'] ?? $existing['description'];
        $image->alt_text = $data['alt_text'] ?? $data['title'] ?? $existing['alt_text'];
        $image->website_url = $data['website_url'] ?? $existing['website_url'];
        
        if ($image->update()) {
            // Atualizar tags se fornecidas
            if (isset($data['tags'])) {
                $tags = is_string($data['tags']) ? explode(',', $data['tags']) : $data['tags'];
                $tags = array_map('trim', $tags);
                $tags = array_filter($tags); // Remove empty values
                $image->addTags($id, $tags);
            }
            
            echo json_encode([
                'success' => true,
                'message' => 'Imagem atualizada com sucesso'
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Erro ao atualizar imagem na base de dados']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Erro de base de dados: ' . $e->getMessage(),
            'details' => 'Verifique se a categoria selecionada existe'
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro interno: ' . $e->getMessage()]);
    }
}

function handleDelete($image) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $id = $data['id'] ?? $_GET['id'] ?? null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID da imagem é obrigatório']);
        return;
    }
    
    // Verificar se imagem existe
    $existing = $image->getById($id);
    if (!$existing) {
        http_response_code(404);
        echo json_encode(['error' => 'Imagem não encontrada']);
        return;
    }
    
    $image->id = $id;
    
    if ($image->delete()) {
        echo json_encode([
            'success' => true,
            'message' => 'Imagem eliminada com sucesso (arquivo e registro)'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao eliminar imagem']);
    }
}
?>
