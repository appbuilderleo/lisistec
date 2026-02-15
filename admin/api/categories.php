<?php
/**
 * LISIS - Categories API Endpoint
 * API para gestão de categorias
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

require_once '../classes/Category.php';
require_once '../classes/Auth.php';

$auth = new Auth();
$category = new Category();

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
            handleGet($category);
            break;
        case 'POST':
            handlePost($category);
            break;
        case 'PUT':
            handlePut($category);
            break;
        case 'DELETE':
            handleDelete($category);
            break;
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Método não permitido']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro interno do servidor: ' . $e->getMessage()]);
}

function handleGet($category) {
    $id = $_GET['id'] ?? null;
    
    if ($id) {
        // Obter categoria específica
        $result = $category->getById($id);
        if ($result) {
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Categoria não encontrada']);
        }
    } else {
        // Obter todas as categorias
        $categories = $category->getAll();
        echo json_encode($categories);
    }
}

function handlePost($category) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Dados inválidos']);
        return;
    }
    
    // Validar campos obrigatórios
    if (!isset($data['name']) || empty(trim($data['name']))) {
        http_response_code(400);
        echo json_encode(['error' => 'Nome da categoria é obrigatório']);
        return;
    }
    
    // Definir propriedades da categoria
    $category->name = trim($data['name']);
    // Gerar slug automaticamente a partir do slug fornecido ou do nome
    $baseSlug = $category->createSlug(isset($data['slug']) && trim($data['slug']) !== '' ? $data['slug'] : $category->name);
    $slug = $baseSlug;
    $suffix = 2;
    // Garantir unicidade do slug
    while ($category->getBySlug($slug)) {
        $slug = $baseSlug . '-' . $suffix++;
    }
    $category->slug = $slug;
    $category->description = $data['description'] ?? '';
    
    $category_id = $category->create();
    
    if ($category_id) {
        echo json_encode([
            'success' => true,
            'id' => $category_id,
            'message' => 'Categoria criada com sucesso'
        ]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Erro ao criar categoria.']);
    }
}

function handlePut($category) {
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID da categoria é obrigatório']);
        return;
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Dados inválidos']);
        return;
    }
    
    // Verificar se categoria existe
    $existing = $category->getById($id);
    if (!$existing) {
        http_response_code(404);
        echo json_encode(['error' => 'Categoria não encontrada']);
        return;
    }
    
    // Validar campos obrigatórios
    if (!isset($data['name']) || empty(trim($data['name']))) {
        http_response_code(400);
        echo json_encode(['error' => 'Nome da categoria é obrigatório']);
        return;
    }
    
    // Definir propriedades da categoria
    $category->id = $id;
    $category->name = trim($data['name']);
    $category->slug = isset($data['slug']) ? $category->createSlug($data['slug']) : $existing['slug'];
    $category->description = $data['description'] ?? $existing['description'];
    
    if ($category->update()) {
        echo json_encode([
            'success' => true,
            'message' => 'Categoria atualizada com sucesso'
        ]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Erro ao atualizar categoria. Slug já pode existir.']);
    }
}

function handleDelete($category) {
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID da categoria é obrigatório']);
        return;
    }
    
    // Verificar se categoria existe
    $existing = $category->getById($id);
    if (!$existing) {
        http_response_code(404);
        echo json_encode(['error' => 'Categoria não encontrada']);
        return;
    }
    
    $category->id = $id;
    
    if ($category->delete()) {
        echo json_encode([
            'success' => true,
            'message' => 'Categoria eliminada com sucesso'
        ]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Não é possível eliminar categoria que contém imagens']);
    }
}
?>
