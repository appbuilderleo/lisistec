<?php
/**
 * LISIS Admin - Messages API
 * API para gerenciar mensagens de contacto
 */

require_once '../config/session.php';
session_start();
header('Content-Type: application/json');

require_once '../classes/Auth.php';
require_once '../config/database.php';

// Check authentication
$auth = new Auth();
if (!$auth->isAuthenticated()) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Não autenticado']);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$database = new Database();
$db = $database->getConnection();

try {
    switch ($method) {
        case 'GET':
            handleGet($db);
            break;
        case 'PUT':
        case 'PATCH':
            handleUpdate($db);
            break;
        case 'DELETE':
            handleDelete($db);
            break;
        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

function handleGet($db) {
    $status = $_GET['status'] ?? 'all';
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
    $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
    
    // Build query
    $query = "SELECT * FROM contact_messages";
    $conditions = [];
    
    if ($status !== 'all') {
        $conditions[] = "status = :status";
    }
    
    if (!empty($conditions)) {
        $query .= " WHERE " . implode(' AND ', $conditions);
    }
    
    $query .= " ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
    
    $stmt = $db->prepare($query);
    
    if ($status !== 'all') {
        $stmt->bindParam(':status', $status);
    }
    
    $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
    
    $messages = $stmt->fetchAll();
    
    // Get total count
    $countQuery = "SELECT COUNT(*) as total FROM contact_messages";
    if ($status !== 'all') {
        $countQuery .= " WHERE status = :status";
    }
    
    $countStmt = $db->prepare($countQuery);
    if ($status !== 'all') {
        $countStmt->bindParam(':status', $status);
    }
    $countStmt->execute();
    $total = $countStmt->fetch()['total'];
    
    // Get counts by status
    $statsQuery = "SELECT 
                    status,
                    COUNT(*) as count
                   FROM contact_messages
                   GROUP BY status";
    $statsStmt = $db->query($statsQuery);
    $stats = [];
    while ($row = $statsStmt->fetch()) {
        $stats[$row['status']] = $row['count'];
    }
    
    echo json_encode([
        'success' => true,
        'data' => $messages,
        'total' => $total,
        'stats' => $stats
    ]);
}

function handleUpdate($db) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (empty($data['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'ID não fornecido']);
        return;
    }
    
    $id = (int)$data['id'];
    $status = $data['status'] ?? null;
    
    if (!in_array($status, ['unread', 'read', 'archived'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Status inválido']);
        return;
    }
    
    $query = "UPDATE contact_messages SET status = :status";
    
    if ($status === 'read') {
        $query .= ", read_at = CURRENT_TIMESTAMP";
    } elseif ($status === 'archived') {
        $query .= ", archived_at = CURRENT_TIMESTAMP";
    }
    
    $query .= " WHERE id = :id";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Status atualizado']);
    } else {
        throw new Exception('Erro ao atualizar status');
    }
}

function handleDelete($db) {
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'ID não fornecido']);
        return;
    }
    
    $query = "DELETE FROM contact_messages WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Mensagem excluída']);
    } else {
        throw new Exception('Erro ao excluir mensagem');
    }
}
?>
