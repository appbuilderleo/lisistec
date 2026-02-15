<?php
/**
 * LISIS - File Upload API Endpoint
 * API para upload de imagens
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../config/session.php';
session_start();

require_once '../classes/Auth.php';
require_once '../classes/Image.php';

$auth = new Auth();

// Verificar autenticação
if (!$auth->isAuthenticated()) {
    http_response_code(401);
    echo json_encode(['error' => 'Não autorizado']);
    exit;
}

// Configurações de upload
$upload_dir = '../uploads/images/';
$max_file_size = 10 * 1024 * 1024; // 10MB
$allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

// Criar diretório se não existir
if (!file_exists($upload_dir)) {
    mkdir($upload_dir, 0755, true);
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        handleUpload();
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Método não permitido']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro interno do servidor: ' . $e->getMessage()]);
}

function handleUpload() {
    global $upload_dir, $max_file_size, $allowed_types;
    
    if (!isset($_FILES['images']) || empty($_FILES['images']['name'][0])) {
        http_response_code(400);
        echo json_encode(['error' => 'Nenhum arquivo foi enviado']);
        return;
    }
    
    $category_id = $_POST['category_id'] ?? null;
    $tags = isset($_POST['tags']) ? explode(',', $_POST['tags']) : [];
    $description = $_POST['description'] ?? '';
    $website_url = $_POST['website_url'] ?? null;
    
    $uploaded_files = [];
    $errors = [];
    
    $files = $_FILES['images'];
    $file_count = count($files['name']);
    
    for ($i = 0; $i < $file_count; $i++) {
        if ($files['error'][$i] !== UPLOAD_ERR_OK) {
            $errors[] = "Erro no upload do arquivo: " . $files['name'][$i];
            continue;
        }
        
        // Validar tamanho do arquivo
        if ($files['size'][$i] > $max_file_size) {
            $errors[] = "Arquivo muito grande: " . $files['name'][$i];
            continue;
        }
        
        // Validar tipo do arquivo
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime_type = finfo_file($finfo, $files['tmp_name'][$i]);
        finfo_close($finfo);
        
        if (!in_array($mime_type, $allowed_types)) {
            $errors[] = "Tipo de arquivo não permitido: " . $files['name'][$i];
            continue;
        }
        
        // Gerar nome único para o arquivo
        $extension = pathinfo($files['name'][$i], PATHINFO_EXTENSION);
        $filename = uniqid() . '_' . time() . '.' . $extension;
        $file_path = $upload_dir . $filename;
        
        // Mover arquivo para diretório de upload
        if (move_uploaded_file($files['tmp_name'][$i], $file_path)) {
            // Obter dimensões da imagem
            $image_info = getimagesize($file_path);
            $width = $image_info[0] ?? null;
            $height = $image_info[1] ?? null;
            
            // Salvar informações na base de dados
            $image = new Image();
            $image->filename = $filename;
            $image->original_name = $files['name'][$i];
            $image->file_path = 'uploads/images/' . $filename;
            $image->file_size = $files['size'][$i];
            $image->mime_type = $mime_type;
            $image->width = $width;
            $image->height = $height;
            $image->category_id = $category_id;
            $image->title = pathinfo($files['name'][$i], PATHINFO_FILENAME);
            $image->description = $description;
            $image->alt_text = pathinfo($files['name'][$i], PATHINFO_FILENAME);
            $image->website_url = $website_url;
            
            $image_id = $image->create();
            
            if ($image_id) {
                // Adicionar tags
                if (!empty($tags)) {
                    $image->addTags($image_id, array_map('trim', $tags));
                }
                
                $uploaded_files[] = [
                    'id' => $image_id,
                    'filename' => $filename,
                    'original_name' => $files['name'][$i],
                    'file_path' => 'uploads/images/' . $filename,
                    'file_size' => $files['size'][$i],
                    'mime_type' => $mime_type,
                    'width' => $width,
                    'height' => $height
                ];
            } else {
                // Remover arquivo se falhou ao salvar na BD
                unlink($file_path);
                $errors[] = "Erro ao salvar informações do arquivo: " . $files['name'][$i];
            }
        } else {
            $errors[] = "Erro ao mover arquivo: " . $files['name'][$i];
        }
    }
    
    $response = [
        'success' => !empty($uploaded_files),
        'uploaded_files' => $uploaded_files,
        'errors' => $errors,
        'message' => count($uploaded_files) . ' arquivo(s) enviado(s) com sucesso'
    ];
    
    if (!empty($errors)) {
        $response['message'] .= '. ' . count($errors) . ' erro(s) encontrado(s).';
    }
    
    echo json_encode($response);
}
?>
