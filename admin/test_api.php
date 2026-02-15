<?php
// Test script for API authentication
ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "<h1>Teste de API de Autenticação</h1>";

// Test API endpoint
$apiUrl = 'http://localhost/lisistec/admin/api/auth.php';

// Test 1: Check authentication status
echo "<h2>Teste 1: Verificar status de autenticação</h2>";
$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookies.txt');
curl_setopt($ch, CURLOPT_COOKIEFILE, 'cookies.txt');
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "<p>HTTP Code: $httpCode</p>";
echo "<p>Response: <pre>$response</pre></p>";

// Test 2: Login
echo "<h2>Teste 2: Tentar login</h2>";
$loginData = json_encode(['username' => 'admin', 'password' => 'admin123']);

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $loginData);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookies.txt');
curl_setopt($ch, CURLOPT_COOKIEFILE, 'cookies.txt');
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "<p>HTTP Code: $httpCode</p>";
echo "<p>Response: <pre>$response</pre></p>";

// Test 3: Check authentication after login
echo "<h2>Teste 3: Verificar autenticação após login</h2>";
$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookies.txt');
curl_setopt($ch, CURLOPT_COOKIEFILE, 'cookies.txt');
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "<p>HTTP Code: $httpCode</p>";
echo "<p>Response: <pre>$response</pre></p>";

// Clean up
if (file_exists('cookies.txt')) {
    unlink('cookies.txt');
}

echo "<hr>";
echo "<p><a href='test_login.php'>Testar login direto</a></p>";
echo "<p><a href='index.php'>Ir para o painel de administração</a></p>";
?>
