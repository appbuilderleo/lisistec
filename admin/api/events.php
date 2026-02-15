<?php
/**
 * LISIS Events API
 * API para gestão de eventos
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

// Helper: generate unique slug
function generateUniqueSlug($conn, $title, $excludeId = null) {
    // Generate base slug from title
    $baseSlug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title)));
    $slug = $baseSlug;
    $counter = 1;
    
    // Check if slug exists and generate unique one
    while (true) {
        $query = "SELECT id FROM events WHERE slug = ?";
        if ($excludeId) {
            $query .= " AND id != ?";
            $stmt = $conn->prepare($query);
            $stmt->execute([$slug, $excludeId]);
        } else {
            $stmt = $conn->prepare($query);
            $stmt->execute([$slug]);
        }
        
        if ($stmt->rowCount() === 0) {
            break; // Slug is unique
        }
        
        // Generate new slug with counter
        $slug = $baseSlug . '-' . $counter;
        $counter++;
    }
    
    return $slug;
}

// Helper: normalize absolute filesystem paths to relative web paths (like images table)
function normalize_image_path($path) {
    if (!$path) return null;
    // Keep external URLs as-is
    if (preg_match('/^https?:\/\//i', $path)) return $path;
    // Normalize slashes
    $p = str_replace('\\', '/', $path);
    $docroot = isset($_SERVER['DOCUMENT_ROOT']) ? str_replace('\\', '/', rtrim($_SERVER['DOCUMENT_ROOT'], '/\\')) : '';
    $siteRoot = $docroot ? $docroot . '/lisis/' : '';
    if ($siteRoot && strpos($p, $siteRoot) === 0) {
        $p = substr($p, strlen($siteRoot));
    } elseif (strpos($p, '/lisis/') === 0) {
        $p = substr($p, strlen('/lisis/'));
    }
    return $p;
}

// Obter método HTTP
$method = $_SERVER['REQUEST_METHOD'];

// Obter parâmetros da URL
$request_uri = $_SERVER['REQUEST_URI'];
$uri_parts = explode('/', trim($request_uri, '/'));

try {
    $db = new Database();
    $conn = $db->getConnection();
    
    switch($method) {
        case 'GET':
            // Listar eventos
            if(isset($_GET['id'])) {
                // Obter evento específico
                $id = intval($_GET['id']);
                $stmt = $conn->prepare("SELECT * FROM events WHERE id = ? AND is_active = 1");
                $stmt->execute([$id]);
                $event = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if($event) {
                    $event['image_path'] = normalize_image_path($event['image_path'] ?? null);
                    echo json_encode(['success' => true, 'data' => $event]);
                } else {
                    http_response_code(404);
                    echo json_encode(['success' => false, 'message' => 'Evento não encontrado']);
                }
            } elseif(isset($_GET['slug'])) {
                // Obter evento por slug
                $slug = $_GET['slug'];
                $stmt = $conn->prepare("SELECT * FROM events WHERE slug = ? AND is_active = 1");
                $stmt->execute([$slug]);
                $event = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if($event) {
                    $event['image_path'] = normalize_image_path($event['image_path'] ?? null);
                    echo json_encode(['success' => true, 'data' => $event]);
                } else {
                    http_response_code(404);
                    echo json_encode(['success' => false, 'message' => 'Evento não encontrado']);
                }
            } else {
                // Listar todos os eventos
                $featured = isset($_GET['featured']) ? intval($_GET['featured']) : null;
                $category = isset($_GET['category']) ? $_GET['category'] : null;
                $upcoming = isset($_GET['upcoming']) ? intval($_GET['upcoming']) : null;
                
                $sql = "SELECT * FROM events WHERE is_active = 1";
                $params = [];
                
                if($featured !== null) {
                    $sql .= " AND is_featured = ?";
                    $params[] = $featured;
                }
                
                if($category !== null) {
                    $sql .= " AND category = ?";
                    $params[] = $category;
                }
                
                if($upcoming !== null && $upcoming == 1) {
                    $sql .= " AND event_date >= CURDATE()";
                }
                
                $sql .= " ORDER BY event_date DESC, event_time DESC";
                
                $stmt = $conn->prepare($sql);
                $stmt->execute($params);
                $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
                // Normalize image paths
                foreach ($events as &$ev) {
                    $ev['image_path'] = normalize_image_path($ev['image_path'] ?? null);
                }
                unset($ev);
                echo json_encode(['success' => true, 'data' => $events, 'count' => count($events)]);
            }
            break;
            
        case 'POST':
            // Criar novo evento (requer autenticação)
            $data = json_decode(file_get_contents('php://input'), true);
            
            if(!isset($data['title']) || !isset($data['event_date'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Título e data são obrigatórios']);
                break;
            }
            
            // Gerar slug único
            $slug = generateUniqueSlug($conn, $data['title']);
            
            $stmt = $conn->prepare("INSERT INTO events (title, slug, description, event_date, event_time, location, image_path, category, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            
            $result = $stmt->execute([
                $data['title'],
                $slug,
                $data['description'] ?? null,
                $data['event_date'],
                $data['event_time'] ?? null,
                $data['location'] ?? null,
                $data['image_path'] ?? null,
                $data['category'] ?? null,
                $data['is_featured'] ?? 0
            ]);
            
            if($result) {
                $id = $conn->lastInsertId();
                echo json_encode(['success' => true, 'message' => 'Evento criado com sucesso', 'id' => $id, 'slug' => $slug]);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Erro ao criar evento']);
            }
            break;
            
        case 'PUT':
            // Atualizar evento (requer autenticação)
            $data = json_decode(file_get_contents('php://input'), true);
            
            if(!isset($data['id'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'ID do evento é obrigatório']);
                break;
            }
            
            $updates = [];
            $params = [];
            
            // Se o título for alterado, gerar novo slug único
            if(isset($data['title'])) {
                $updates[] = "title = ?";
                $params[] = $data['title'];
                
                // Gerar slug único excluindo o próprio evento
                $newSlug = generateUniqueSlug($conn, $data['title'], $data['id']);
                $updates[] = "slug = ?";
                $params[] = $newSlug;
            }
            if(isset($data['description'])) {
                $updates[] = "description = ?";
                $params[] = $data['description'];
            }
            if(isset($data['event_date'])) {
                $updates[] = "event_date = ?";
                $params[] = $data['event_date'];
            }
            if(isset($data['event_time'])) {
                $updates[] = "event_time = ?";
                $params[] = $data['event_time'];
            }
            if(isset($data['location'])) {
                $updates[] = "location = ?";
                $params[] = $data['location'];
            }
            if(isset($data['image_path'])) {
                $updates[] = "image_path = ?";
                $params[] = $data['image_path'];
            }
            if(isset($data['category'])) {
                $updates[] = "category = ?";
                $params[] = $data['category'];
            }
            if(isset($data['is_featured'])) {
                $updates[] = "is_featured = ?";
                $params[] = $data['is_featured'];
            }
            
            if(empty($updates)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Nenhum campo para atualizar']);
                break;
            }
            
            $params[] = $data['id'];
            $sql = "UPDATE events SET " . implode(', ', $updates) . " WHERE id = ?";
            
            $stmt = $conn->prepare($sql);
            $result = $stmt->execute($params);
            
            if($result) {
                echo json_encode(['success' => true, 'message' => 'Evento atualizado com sucesso']);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Erro ao atualizar evento']);
            }
            break;
            
        case 'DELETE':
            // Deletar evento (soft delete - requer autenticação)
            $data = json_decode(file_get_contents('php://input'), true);
            
            if(!isset($data['id'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'ID do evento é obrigatório']);
                break;
            }
            
            $stmt = $conn->prepare("UPDATE events SET is_active = 0 WHERE id = ?");
            $result = $stmt->execute([$data['id']]);
            
            if($result) {
                echo json_encode(['success' => true, 'message' => 'Evento removido com sucesso']);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Erro ao remover evento']);
            }
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Método não permitido']);
            break;
    }
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro no servidor: ' . $e->getMessage()]);
}
?>
