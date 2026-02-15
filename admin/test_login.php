<?php
// Test script for login functionality
ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "<h1>Teste de Login</h1>";

// Include required files
require_once 'config/session.php';
session_start();
require_once 'classes/Auth.php';

try {
    $auth = new Auth();
    echo "<p style='color:green'>✓ Classe Auth carregada</p>";
    
    // Test login with default credentials
    $username = 'admin';
    $password = 'admin123';
    
    echo "<p>Tentando login com:</p>";
    echo "<p>Username: $username</p>";
    echo "<p>Password: $password</p>";
    
    $user = $auth->login($username, $password);
    
    if ($user) {
        echo "<p style='color:green'>✓ Login bem-sucedido!</p>";
        echo "<pre>" . print_r($user, true) . "</pre>";
        
        // Store in session
        $_SESSION['admin_user'] = $user;
        echo "<p style='color:green'>✓ Usuário armazenado na sessão</p>";
        
        // Check authentication
        if ($auth->isAuthenticated()) {
            echo "<p style='color:green'>✓ Usuário autenticado</p>";
        } else {
            echo "<p style='color:red'>✗ Usuário não autenticado</p>";
        }
        
        // Get current user
        $currentUser = $auth->getCurrentUser();
        if ($currentUser) {
            echo "<p style='color:green'>✓ Usuário atual recuperado</p>";
        }
        
    } else {
        echo "<p style='color:red'>✗ Falha no login</p>";
        
        // Check if user exists in database
        require_once 'config/database.php';
        $database = new Database();
        $conn = $database->getConnection();
        
        $stmt = $conn->prepare("SELECT * FROM admin_users WHERE username = ?");
        $stmt->execute([$username]);
        $dbUser = $stmt->fetch();
        
        if ($dbUser) {
            echo "<p style='color:orange'>⚠ Usuário encontrado no banco de dados</p>";
            echo "<pre>" . print_r($dbUser, true) . "</pre>";
            
            // Test password verification
            if (password_verify($password, $dbUser['password'])) {
                echo "<p style='color:green'>✓ Password verification successful</p>";
            } else {
                echo "<p style='color:red'>✗ Password verification failed</p>";
                echo "<p>Tentando recriar o hash...</p>";
                
                // Test with new hash
                $newHash = password_hash($password, PASSWORD_DEFAULT);
                echo "<p>Novo hash: $newHash</p>";
                
                if (password_verify($password, $newHash)) {
                    echo "<p style='color:green'>✓ Novo hash funciona</p>";
                    
                    // Update user password
                    $update = $conn->prepare("UPDATE admin_users SET password = ? WHERE username = ?");
                    $update->execute([$newHash, $username]);
                    echo "<p style='color:green'>✓ Senha atualizada no banco de dados</p>";
                }
            }
        } else {
            echo "<p style='color:red'>✗ Usuário não encontrado no banco de dados</p>";
        }
    }
    
} catch (Exception $e) {
    echo "<p style='color:red'>✗ Erro: " . $e->getMessage() . "</p>";
}

echo "<hr>";
echo "<p><a href='index.php'>Ir para o painel de administração</a></p>";
?>
