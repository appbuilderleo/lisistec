<?php
/**
 * LISIS - Event Image Upload API
 * Upload de imagens para eventos
 */

require_once '../config/session.php';
session_start();
header('Content-Type: application/json');

require_once '../classes/Auth.php';

$auth = new Auth();

// Verificar autenticação
if (!$auth->isAuthenticated()) {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => 'Não autorizado'
    ]);
    exit;
}

// Verificar se é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método não permitido'
    ]);
    exit;
}

// Configurações de upload
$upload_dir = '../uploads/events/';
$max_file_size = 5 * 1024 * 1024; // 5MB
$allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
$allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

// Criar diretório se não existir
if (!file_exists($upload_dir)) {
    if (!mkdir($upload_dir, 0755, true)) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Erro ao criar diretório de upload'
        ]);
        exit;
    }
}

try {
    // Verificar se arquivo foi enviado
    if (!isset($_FILES['event_image']) || $_FILES['event_image']['error'] !== UPLOAD_ERR_OK) {
        $error_message = 'Nenhum arquivo enviado';
        
        if (isset($_FILES['event_image']['error'])) {
            switch ($_FILES['event_image']['error']) {
                case UPLOAD_ERR_INI_SIZE:
                case UPLOAD_ERR_FORM_SIZE:
                    $error_message = 'Arquivo muito grande. Máximo: 5MB';
                    break;
                case UPLOAD_ERR_PARTIAL:
                    $error_message = 'Upload incompleto';
                    break;
                case UPLOAD_ERR_NO_FILE:
                    $error_message = 'Nenhum arquivo selecionado';
                    break;
                default:
                    $error_message = 'Erro no upload';
            }
        }
        
        throw new Exception($error_message);
    }
    
    $file = $_FILES['event_image'];
    
    // Validar tamanho
    if ($file['size'] > $max_file_size) {
        throw new Exception('Arquivo muito grande. Tamanho máximo: 5MB');
    }
    
    // Validar tipo MIME
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime_type = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);
    
    if (!in_array($mime_type, $allowed_types)) {
        throw new Exception('Tipo de arquivo não permitido. Use: JPG, PNG, GIF ou WEBP');
    }
    
    // Validar extensão
    $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($extension, $allowed_extensions)) {
        throw new Exception('Extensão de arquivo não permitida');
    }
    
    // Gerar nome único
    $filename = 'event_' . uniqid() . '_' . time() . '.' . $extension;
    $file_path = $upload_dir . $filename;
    
    // Mover arquivo
    if (!move_uploaded_file($file['tmp_name'], $file_path)) {
        throw new Exception('Erro ao salvar arquivo');
    }
    
    // Obter dimensões da imagem
    $image_info = @getimagesize($file_path);
    $width = $image_info[0] ?? null;
    $height = $image_info[1] ?? null;
    
    // Caminho relativo para salvar no banco
    $relative_path = 'uploads/events/' . $filename;
    
    // Resposta de sucesso
    echo json_encode([
        'success' => true,
        'message' => 'Imagem enviada com sucesso',
        'data' => [
            'filename' => $filename,
            'original_name' => $file['name'],
            'file_path' => $relative_path,
            'file_size' => $file['size'],
            'mime_type' => $mime_type,
            'width' => $width,
            'height' => $height,
            'url' => '../' . $relative_path
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
