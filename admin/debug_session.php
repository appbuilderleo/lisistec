<?php
// Debug session script
require_once 'config/session.php';
session_start();

echo "<h1>Debug de Sessão</h1>";

echo "<h2>Status da Sessão</h2>";
echo "<p>Session Status: " . session_status() . " (1=disabled, 2=active)</p>";
echo "<p>Session ID: " . session_id() . "</p>";
echo "<p>Session Name: " . session_name() . "</p>";
echo "<p>Session Save Path: " . session_save_path() . "</p>";

echo "<h2>Conteúdo da Sessão</h2>";
echo "<pre>";
print_r($_SESSION);
echo "</pre>";

echo "<h2>Cookies</h2>";
echo "<pre>";
print_r($_COOKIE);
echo "</pre>";

echo "<h2>Teste de Autenticação</h2>";
require_once 'classes/Auth.php';
$auth = new Auth();

if ($auth->isAuthenticated()) {
    echo "<p style='color:green'>✓ Utilizador está autenticado</p>";
    echo "<pre>";
    print_r($auth->getCurrentUser());
    echo "</pre>";
} else {
    echo "<p style='color:red'>✗ Utilizador NÃO está autenticado</p>";
}

echo "<hr>";
echo "<p><a href='index.php'>Ir para o painel de administração</a></p>";
?>
