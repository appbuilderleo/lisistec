<?php
/**
 * Check Events Image Paths
 */

require_once 'config/database.php';

$db = new Database();
$conn = $db->getConnection();

echo "<h2>Eventos e seus caminhos de imagem:</h2>";
echo "<style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #184339; color: white; }
    .error { color: red; }
    .success { color: green; }
    img { max-width: 200px; max-height: 150px; }
</style>";

$stmt = $conn->query("SELECT id, title, image_path, event_date FROM events ORDER BY id DESC LIMIT 10");
$events = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo "<table>";
echo "<tr><th>ID</th><th>Título</th><th>Caminho no BD</th><th>Arquivo Existe?</th><th>Preview</th></tr>";

foreach ($events as $event) {
    $imagePath = $event['image_path'];
    $fullPath = '../' . $imagePath;
    $exists = file_exists($fullPath);
    
    echo "<tr>";
    echo "<td>{$event['id']}</td>";
    echo "<td>{$event['title']}</td>";
    echo "<td><code>{$imagePath}</code></td>";
    echo "<td class='" . ($exists ? 'success' : 'error') . "'>";
    echo $exists ? "✓ Existe" : "✗ Não encontrado";
    echo "<br><small>Procurado em: {$fullPath}</small>";
    echo "</td>";
    echo "<td>";
    if ($exists && $imagePath) {
        echo "<img src='../{$imagePath}' alt='Preview'>";
    } else {
        echo "N/A";
    }
    echo "</td>";
    echo "</tr>";
}

echo "</table>";

echo "<h3>Arquivos na pasta uploads/events/:</h3>";
$eventsDir = 'uploads/events/';
if (is_dir($eventsDir)) {
    $files = scandir($eventsDir);
    echo "<ul>";
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            echo "<li>{$file}</li>";
        }
    }
    echo "</ul>";
} else {
    echo "<p class='error'>Diretório não existe!</p>";
}
?>
