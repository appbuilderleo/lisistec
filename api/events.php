<?php
/**
 * LISIS - Public Events API
 * API pública para exibição de eventos no site
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../admin/config/database.php';

// Helper: normalize image path for public site (relative to site root)
function normalize_public_image_path($path) {
    if (!$path) return null;
    // Keep external URLs
    if (preg_match('/^https?:\/\//i', $path)) return $path;
    
    // Normalize slashes
    $p = str_replace('\\', '/', $path);
    
    // Remove absolute filesystem prefixes (docroot)
    $docroot = isset($_SERVER['DOCUMENT_ROOT']) ? str_replace('\\', '/', rtrim($_SERVER['DOCUMENT_ROOT'], '/\\')) : '';
    $siteRoot = $docroot ? $docroot . '/lisis/' : '';
    if ($siteRoot && strpos($p, $siteRoot) === 0) {
        $p = substr($p, strlen($siteRoot));
    } elseif (strpos($p, '/lisis/') === 0) {
        $p = substr($p, strlen('/lisis/'));
    }
    
    // Remove leading ../ if present
    while (strpos($p, '../') === 0) {
        $p = substr($p, 3);
    }
    
    // If path already starts with admin/uploads -> ok
    if (strpos($p, 'admin/uploads/') === 0) return $p;
    // If starts with uploads/ (saved by admin APIs), prefix admin/
    if (strpos($p, 'uploads/') === 0) return 'admin/' . $p;
    // If starts with /uploads/, strip leading slash and prefix admin/
    if (strpos($p, '/uploads/') === 0) return 'admin' . $p; // '/uploads/..' => 'admin/uploads/..'
    // If just a filename (no slash), assume events folder
    if (strpos($p, '/') === false) return 'admin/uploads/events/' . $p;
    
    // Otherwise return relative as-is (e.g., admin/..., logos/..., etc.)
    return ltrim($p, '/');
}

try {
    $db = new Database();
    $conn = $db->getConnection();
    
    // Get query parameters
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 6;
    $featured = isset($_GET['featured']) ? filter_var($_GET['featured'], FILTER_VALIDATE_BOOLEAN) : false;
    $upcoming = isset($_GET['upcoming']) ? filter_var($_GET['upcoming'], FILTER_VALIDATE_BOOLEAN) : true;
    
    // Build query
    $sql = "SELECT id, title, description, event_date, event_time, location, 
            category, image_path, is_featured, created_at 
            FROM events 
            WHERE is_active = 1";
    
    $params = [];
    
    // Filter by featured
    if ($featured) {
        $sql .= " AND is_featured = 1";
    }
    
    // Filter by upcoming/past
    if ($upcoming) {
        $sql .= " AND event_date >= CURDATE()";
        $sql .= " ORDER BY event_date ASC, event_time ASC";
    } else {
        $sql .= " ORDER BY event_date DESC, event_time DESC";
    }
    
    // Add limit
    $sql .= " LIMIT :limit";
    
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->execute();
    
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($events as &$event) {
        // Format date
        $date = new DateTime($event['event_date']);
        $event['formatted_date'] = $date->format('d/m/Y');
        $event['day'] = $date->format('d');
        $event['month'] = $date->format('M');
        $event['year'] = $date->format('Y');
        
        if ($event['event_time']) {
            $time = new DateTime($event['event_time']);
            $event['formatted_time'] = $time->format('H:i');
        } else {
            $event['formatted_time'] = null;
        }

        // Normalize image path for public site
        $event['image_path'] = normalize_public_image_path($event['image_path'] ?? null);
        
        // Check if event is past
        $today = new DateTime();
        $today->setTime(0, 0, 0);
        $event['is_past'] = $date < $today;
    }
    
    echo json_encode([
        'success' => true,
        'count' => count($events),
        'data' => $events
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erro ao carregar eventos',
        'error' => $e->getMessage()
    ]);
}
