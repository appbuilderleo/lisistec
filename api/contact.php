<?php
/**
 * LISIS - Contact Form API
 * Recebe e armazena mensagens do formulário de contacto
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../admin/config/database.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    exit();
}

try {
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (empty($data['nome']) || empty($data['email']) || empty($data['mensagem'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Por favor, preencha todos os campos obrigatórios.'
        ]);
        exit();
    }
    
    // Validate email format
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Por favor, insira um email válido.'
        ]);
        exit();
    }
    
    // Sanitize inputs
    $nome = htmlspecialchars(strip_tags($data['nome']));
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $empresa = !empty($data['empresa']) ? htmlspecialchars(strip_tags($data['empresa'])) : null;
    $telefone = !empty($data['telefone']) ? htmlspecialchars(strip_tags($data['telefone'])) : null;
    $servico = !empty($data['servico']) ? htmlspecialchars(strip_tags($data['servico'])) : null;
    $mensagem = htmlspecialchars(strip_tags($data['mensagem']));
    
    // Get client info
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? null;
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? null;
    
    // Connect to database
    $database = new Database();
    $db = $database->getConnection();
    
    // Insert message
    $query = "INSERT INTO contact_messages 
              (nome, email, empresa, telefone, servico, mensagem, ip_address, user_agent) 
              VALUES 
              (:nome, :email, :empresa, :telefone, :servico, :mensagem, :ip_address, :user_agent)";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':empresa', $empresa);
    $stmt->bindParam(':telefone', $telefone);
    $stmt->bindParam(':servico', $servico);
    $stmt->bindParam(':mensagem', $mensagem);
    $stmt->bindParam(':ip_address', $ip_address);
    $stmt->bindParam(':user_agent', $user_agent);
    
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Mensagem enviada com sucesso! Entraremos em contacto brevemente.'
        ]);
    } else {
        throw new Exception('Erro ao salvar mensagem');
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erro ao enviar mensagem. Por favor, tente novamente.'
    ]);
    
    // Log error in development
    if ($_SERVER['SERVER_NAME'] === 'localhost' || $_SERVER['SERVER_NAME'] === '127.0.0.1') {
        error_log("Contact form error: " . $e->getMessage());
    }
}
?>
