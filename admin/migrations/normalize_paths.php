<?php
/**
 * LISIS - Normalize Image Paths Migration
 * Normaliza caminhos absolutos para caminhos relativos no banco de dados
 */

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../config/database.php';

try {
    $db = new Database();
    $conn = $db->getConnection();
    
    echo "<h2>Normalizando caminhos de imagens...</h2>";
    
    // Normalizar tabela images
    echo "<h3>Tabela: images</h3>";
    $stmt = $conn->query("SELECT id, file_path FROM images");
    $images = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $updated_images = 0;
    
    foreach ($images as $image) {
        $original_path = $image['file_path'];
        $normalized_path = normalizePath($original_path);
        
        if ($original_path !== $normalized_path) {
            $update = $conn->prepare("UPDATE images SET file_path = ? WHERE id = ?");
            $update->execute([$normalized_path, $image['id']]);
            $updated_images++;
            echo "<p>✓ Atualizado ID {$image['id']}: <br>";
            echo "&nbsp;&nbsp;De: {$original_path}<br>";
            echo "&nbsp;&nbsp;Para: {$normalized_path}</p>";
        }
    }
    
    echo "<p><strong>Total de imagens atualizadas: {$updated_images}</strong></p>";
    
    // Normalizar tabela events
    echo "<h3>Tabela: events</h3>";
    $stmt = $conn->query("SELECT id, image_path FROM events WHERE image_path IS NOT NULL");
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $updated_events = 0;
    
    foreach ($events as $event) {
        $original_path = $event['image_path'];
        $normalized_path = normalizePath($original_path);
        
        if ($original_path !== $normalized_path) {
            $update = $conn->prepare("UPDATE events SET image_path = ? WHERE id = ?");
            $update->execute([$normalized_path, $event['id']]);
            $updated_events++;
            echo "<p>✓ Atualizado ID {$event['id']}: <br>";
            echo "&nbsp;&nbsp;De: {$original_path}<br>";
            echo "&nbsp;&nbsp;Para: {$normalized_path}</p>";
        }
    }
    
    echo "<p><strong>Total de eventos atualizados: {$updated_events}</strong></p>";
    
    echo "<h2 style='color: green;'>✓ Migração concluída com sucesso!</h2>";
    
} catch (Exception $e) {
    echo "<h2 style='color: red;'>✗ Erro na migração:</h2>";
    echo "<p>" . $e->getMessage() . "</p>";
}

/**
 * Normaliza um caminho para formato relativo web
 */
function normalizePath($path) {
    if (!$path) return null;
    
    // Manter URLs externas como estão
    if (preg_match('/^https?:\/\//i', $path)) {
        return $path;
    }
    
    // Normalizar barras
    $path = str_replace('\\', '/', $path);
    
    // Remover caminhos absolutos do Windows (C:/, D:/, etc)
    $path = preg_replace('/^[A-Z]:\//i', '', $path);
    
    // Remover caminhos absolutos do servidor
    $patterns = [
        '/^\/xampp\/htdocs\/lisis\//i',
        '/^xampp\/htdocs\/lisis\//i',
        '/^\/var\/www\/html\/lisis\//i',
        '/^var\/www\/html\/lisis\//i',
        '/^\/home\/[^\/]+\/public_html\/lisis\//i',
        '/^home\/[^\/]+\/public_html\/lisis\//i',
        '/^\/home\/[^\/]+\/public_html\//i',
        '/^home\/[^\/]+\/public_html\//i',
    ];
    
    foreach ($patterns as $pattern) {
        $path = preg_replace($pattern, '', $path);
    }
    
    // Remover barras iniciais múltiplas
    $path = preg_replace('/^\/+/', '', $path);
    
    // Garantir que não começa com admin/
    $path = preg_replace('/^admin\//', '', $path);
    
    return $path;
}
?>
