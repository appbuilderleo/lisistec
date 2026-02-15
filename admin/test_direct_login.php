<?php
// Test direct login and session setup
require_once 'config/session.php';
session_start();

require_once 'classes/Auth.php';

$auth = new Auth();
$username = 'admin';
$password = 'admin123';

echo "<h1>Teste de Login Direto</h1>";

// Attempt login
$user = $auth->login($username, $password);

if ($user) {
    echo "<p style='color:green'>✓ Login bem-sucedido</p>";
    echo "<pre>";
    print_r($user);
    echo "</pre>";
    
    // Store in session
    $_SESSION['admin_user'] = $user;
    
    // Regenerate session ID
    if (session_status() === PHP_SESSION_ACTIVE) {
        session_regenerate_id(true);
        echo "<p style='color:green'>✓ Session ID regenerado</p>";
    }
    
    // Check authentication
    if ($auth->isAuthenticated()) {
        echo "<p style='color:green'>✓ Utilizador está autenticado na sessão</p>";
    } else {
        echo "<p style='color:red'>✗ Utilizador NÃO está autenticado na sessão</p>";
    }
    
    echo "<h2>Conteúdo da Sessão</h2>";
    echo "<pre>";
    print_r($_SESSION);
    echo "</pre>";
    
    echo "<h2>Session Info</h2>";
    echo "<p>Session ID: " . session_id() . "</p>";
    echo "<p>Session Name: " . session_name() . "</p>";
    
    echo "<hr>";
    echo "<p><strong>Agora clique no link abaixo para ir ao painel:</strong></p>";
    echo "<p><a href='index.php' style='font-size:20px; color:blue;'>→ IR PARA O PAINEL DE ADMINISTRAÇÃO</a></p>";
    
} else {
    echo "<p style='color:red'>✗ Login falhou</p>";
    echo "<p>Verifique se o utilizador 'admin' existe e está ativo no banco de dados.</p>";
}
?>
