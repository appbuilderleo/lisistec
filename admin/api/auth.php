<?php
/**
 * LISIS - Authentication API Endpoint
 * API para autenticação de utilizadores
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../config/session.php';
session_start();

require_once '../classes/Auth.php';

$auth = new Auth();
$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'POST':
            handleLogin($auth);
            break;
        case 'DELETE':
            handleLogout($auth);
            break;
        case 'GET':
            handleCheckAuth($auth);
            break;
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Método não permitido']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro interno do servidor: ' . $e->getMessage()]);
}

function handleLogin($auth) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['username']) || !isset($data['password'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Utilizador e palavra-passe são obrigatórios']);
        return;
    }
    
    $user = $auth->login($data['username'], $data['password']);
    
    if ($user) {
        $_SESSION['admin_user'] = $user;
        echo json_encode([
            'success' => true,
            'user' => $user,
            'message' => 'Login realizado com sucesso'
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Credenciais inválidas']);
    }
}

function handleLogout($auth) {
    $auth->logout();
    echo json_encode([
        'success' => true,
        'message' => 'Logout realizado com sucesso'
    ]);
}

function handleCheckAuth($auth) {
    if ($auth->isAuthenticated()) {
        echo json_encode([
            'authenticated' => true,
            'user' => $auth->getCurrentUser()
        ]);
    } else {
        echo json_encode(['authenticated' => false]);
    }
}
?>
