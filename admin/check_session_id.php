<?php
// Check session ID matching
require_once 'config/session.php';
session_start();

echo "<h1>Verificação de Session ID</h1>";

echo "<h2>Informação da Sessão</h2>";
echo "<p><strong>Session ID:</strong> " . session_id() . "</p>";
echo "<p><strong>Session Name:</strong> " . session_name() . "</p>";
echo "<p><strong>Session Save Path:</strong> " . session_save_path() . "</p>";
echo "<p><strong>Session Status:</strong> " . session_status() . " (2=active)</p>";

echo "<h2>Cookie Recebido</h2>";
if (isset($_COOKIE[session_name()])) {
    echo "<p style='color:green'>✓ Cookie encontrado: " . $_COOKIE[session_name()] . "</p>";
} else {
    echo "<p style='color:red'>✗ Cookie NÃO encontrado</p>";
}

echo "<h2>Arquivo de Sessão Esperado</h2>";
$expected_file = session_save_path() . '/sess_' . session_id();
echo "<p>" . $expected_file . "</p>";

if (file_exists($expected_file)) {
    echo "<p style='color:green'>✓ Arquivo existe</p>";
    echo "<h3>Conteúdo do arquivo:</h3>";
    echo "<pre>" . htmlspecialchars(file_get_contents($expected_file)) . "</pre>";
} else {
    echo "<p style='color:red'>✗ Arquivo NÃO existe</p>";
}

echo "<h2>Arquivos de Sessão Disponíveis</h2>";
$files = glob(session_save_path() . '/sess_*');
if ($files) {
    echo "<ul>";
    foreach ($files as $file) {
        echo "<li>" . basename($file) . " (" . filesize($file) . " bytes)</li>";
    }
    echo "</ul>";
} else {
    echo "<p>Nenhum arquivo de sessão encontrado</p>";
}

echo "<h2>Conteúdo de \$_SESSION</h2>";
echo "<pre>";
print_r($_SESSION);
echo "</pre>";

echo "<h2>Cookies do Navegador</h2>";
echo "<pre>";
print_r($_COOKIE);
echo "</pre>";
?>
