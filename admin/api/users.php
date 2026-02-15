<?php
/**
 * LISIS - Users API Endpoint
 * API para gestão de utilizadores (admin_users)
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

require_once '../classes/User.php';
require_once '../classes/Auth.php';

$auth = new Auth();
$user = new User();

// Para segurança: exigir autenticação para todas as operações
if (!$auth->isAuthenticated()) {
    http_response_code(401);
    echo json_encode(['error' => 'Não autorizado']);
    exit;
}

try {
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            handleGet($user);
            break;
        case 'POST':
            handlePost($user);
            break;
        case 'PUT':
            handlePut($user);
            break;
        case 'DELETE':
            handleDelete($user);
            break;
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Método não permitido']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro interno do servidor: ' . $e->getMessage()]);
}

function handleGet($user) {
    $id = $_GET['id'] ?? null;
    if ($id) {
        $result = $user->getById((int)$id);
        if ($result) {
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Utilizador não encontrado']);
        }
    } else {
        $users = $user->getAll();
        echo json_encode($users);
    }
}

function handlePost($user) {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Dados inválidos']);
        return;
    }

    $required = ['username', 'email', 'full_name', 'password'];
    foreach ($required as $field) {
        if (!isset($data[$field]) || trim($data[$field]) === '') {
            http_response_code(400);
            echo json_encode(['error' => "Campo obrigatório: {$field}"]);
            return;
        }
    }

    // Validar unicidade
    if ($user->usernameExists($data['username'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Nome de utilizador já existe']);
        return;
    }
    if ($user->emailExists($data['email'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Email já existe']);
        return;
    }

    $user->username = trim($data['username']);
    $user->email = trim($data['email']);
    $user->full_name = trim($data['full_name']);
    $user->password = $data['password'];
    $user->is_active = isset($data['is_active']) ? (int)!!$data['is_active'] : 1;

    $newId = $user->create();
    if ($newId) {
        echo json_encode(['success' => true, 'id' => $newId, 'message' => 'Utilizador criado com sucesso']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao criar utilizador']);
    }
}

function handlePut($user) {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Dados inválidos']);
        return;
    }

    $id = $data['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID do utilizador é obrigatório']);
        return;
    }

    // Verificar existente
    $existing = $user->getById((int)$id);
    if (!$existing) {
        http_response_code(404);
        echo json_encode(['error' => 'Utilizador não encontrado']);
        return;
    }

    // Validar unicidade
    if (isset($data['username']) && $user->usernameExists($data['username'], (int)$id)) {
        http_response_code(400);
        echo json_encode(['error' => 'Nome de utilizador já existe']);
        return;
    }
    if (isset($data['email']) && $user->emailExists($data['email'], (int)$id)) {
        http_response_code(400);
        echo json_encode(['error' => 'Email já existe']);
        return;
    }

    $user->id = (int)$id;
    $user->username = isset($data['username']) ? trim($data['username']) : $existing['username'];
    $user->email = isset($data['email']) ? trim($data['email']) : $existing['email'];
    $user->full_name = isset($data['full_name']) ? trim($data['full_name']) : $existing['full_name'];
    $user->is_active = isset($data['is_active']) ? (int)!!$data['is_active'] : (int)$existing['is_active'];
    $user->password = isset($data['password']) && trim($data['password']) !== '' ? $data['password'] : '';

    if ($user->update()) {
        echo json_encode(['success' => true, 'message' => 'Utilizador atualizado com sucesso']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao atualizar utilizador']);
    }
}

function handleDelete($user) {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'] ?? $_GET['id'] ?? null;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID do utilizador é obrigatório']);
        return;
    }

    // Evitar eliminar a si próprio
    $current = $_SESSION['admin_user']['id'] ?? null;
    if ($current && (int)$current === (int)$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Não é possível eliminar o utilizador atualmente autenticado']);
        return;
    }

    // Evitar eliminar o último utilizador
    $all = $user->getAll();
    if (count($all) <= 1) {
        http_response_code(400);
        echo json_encode(['error' => 'Não é possível eliminar o último utilizador']);
        return;
    }

    $user->id = (int)$id;
    if ($user->delete()) {
        echo json_encode(['success' => true, 'message' => 'Utilizador eliminado com sucesso']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao eliminar utilizador']);
    }
}
