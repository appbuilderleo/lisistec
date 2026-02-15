<?php
/**
 * LISIS - Contact Form API
 * Recebe, armazena e envia email das mensagens do formulário
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../admin/config/database.php';

// Apenas POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método não permitido'
    ]);
    exit();
}

try {

    // Ler JSON
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        throw new Exception('Dados inválidos');
    }

    // Validação
    if (empty($data['nome']) || empty($data['email']) || empty($data['mensagem'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Por favor, preencha todos os campos obrigatórios.'
        ]);
        exit();
    }

    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Por favor, insira um email válido.'
        ]);
        exit();
    }

    // Sanitização
    $nome     = htmlspecialchars(strip_tags($data['nome']));
    $email    = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $empresa  = !empty($data['empresa']) ? htmlspecialchars(strip_tags($data['empresa'])) : null;
    $telefone = !empty($data['telefone']) ? htmlspecialchars(strip_tags($data['telefone'])) : null;
    $servico  = !empty($data['servico']) ? htmlspecialchars(strip_tags($data['servico'])) : null;
    $mensagem = htmlspecialchars(strip_tags($data['mensagem']));

    $ip_address = $_SERVER['REMOTE_ADDR'] ?? null;
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? null;

    // Conectar BD
    $database = new Database();
    $db = $database->getConnection();

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

    if (!$stmt->execute()) {
        throw new Exception('Erro ao salvar mensagem no banco');
    }

    /**
     * =========================
     * ENVIO DE EMAIL VIA SMTP
     * =========================
     */

    require_once __DIR__ . '/../src/PHPMailer-master/src/PHPMailer.php';
    require_once __DIR__ . '/../src/PHPMailer-master/src/SMTP.php';
    require_once __DIR__ . '/../src/PHPMailer-master/src/Exception.php';

    $mail = new PHPMailer\PHPMailer\PHPMailer(true);

    try {

        $mail->isSMTP();
        $mail->Host       = 'smtp.lisistec-servicos.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'contacto@lisistec-servicos.com';
        $mail->Password   = '844647599Leo';
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';

        // Remetente
        $mail->setFrom('contacto@lisistec-servicos.com', 'Website LISIS');

        // Destinatário principal
        $mail->addAddress('contacto@lisistec-servicos.com');

        // Opcional: responder direto ao cliente
        $mail->addReplyTo($email, $nome);

        $mail->isHTML(true);
        
        $mail->Subject = "Nova mensagem de contacto - $nome";

        $mail->Body = "
            <h3>Nova mensagem recebida</h3>
            <p><strong>Nome:</strong> {$nome}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Empresa:</strong> {$empresa}</p>
            <p><strong>Telefone:</strong> {$telefone}</p>
            <p><strong>Serviço:</strong> {$servico}</p>
            <p><strong>Mensagem:</strong><br>{$mensagem}</p>
            <hr>
            <small>IP: {$ip_address}</small>
        ";

        $mail->send();

    } catch (Exception $e) {
        // Loga erro mas não bloqueia sucesso
        error_log("Erro SMTP: " . $mail->ErrorInfo);
    }

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Mensagem enviada com sucesso! Entraremos em contacto brevemente.'
    ]);

} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Erro ao enviar mensagem. Por favor, tente novamente.'
    ]);

    error_log("Contact API Error: " . $e->getMessage());
}
?>
