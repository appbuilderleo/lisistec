<?php
// Simple login test without JavaScript interference
require_once 'config/session.php';
session_start();
require_once 'classes/Auth.php';

$auth = new Auth();
$loginError = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if ($username && $password) {
        $user = $auth->login($username, $password);
        if ($user) {
            $_SESSION['admin_user'] = $user;
            header('Location: index.php');
            exit;
        } else {
            $loginError = 'Credenciais inválidas.';
        }
    } else {
        $loginError = 'Por favor, preencha todos os campos.';
    }
}

// Check if already logged in
if ($auth->isAuthenticated()) {
    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Test - LISIS Admin</title>
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #eef3f6 0%, #fafafa 100%);
            margin: 0;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        .login-container {
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(161, 179, 203, 0.35);
            border-radius: 16px;
            box-shadow: 0 15px 50px rgba(24, 67, 57, 0.2);
            padding: 2.5rem;
            max-width: 440px;
            width: 100%;
            text-align: center;
        }
        .logo {
            max-width: 180px;
            margin-bottom: 2rem;
        }
        h2 {
            color: #184339;
            margin-bottom: 1.5rem;
        }
        .form-group {
            margin-bottom: 1.25rem;
            text-align: left;
        }
        label {
            display: block;
            margin-bottom: 0.5rem;
            color: #184339;
            font-weight: 500;
        }
        input {
            width: 100%;
            padding: 0.9rem 1rem;
            border: 2px solid rgba(24, 67, 57, 0.15);
            border-radius: 10px;
            font-size: 1rem;
            box-sizing: border-box;
        }
        input:focus {
            outline: none;
            border-color: #184339;
            box-shadow: 0 0 0 4px rgba(24, 67, 57, 0.1);
        }
        .btn {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(135deg, #184339, #1e5a4a);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            margin-top: 1.5rem;
            transition: all 0.3s ease;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(24, 67, 57, 0.4);
        }
        .alert {
            padding: 0.875rem 1rem;
            border-radius: 10px;
            margin-bottom: 1.5rem;
            font-size: 0.95rem;
        }
        .alert-error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .footer {
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(24, 67, 57, 0.1);
            color: rgba(24, 67, 57, 0.7);
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <img src="../logos/Logotipo Lisis.png" alt="LISIS Logo" class="logo">
        
        <h2>Login Test</h2>
        
        <?php if ($loginError): ?>
            <div class="alert alert-error"><?php echo htmlspecialchars($loginError, ENT_QUOTES, 'UTF-8'); ?></div>
        <?php endif; ?>
        
        <form method="post" action="">
            <div class="form-group">
                <label for="username">Utilizador</label>
                <input type="text" id="username" name="username" required autocomplete="username" value="admin">
            </div>
            <div class="form-group">
                <label for="password">Palavra-passe</label>
                <input type="password" id="password" name="password" required autocomplete="current-password" value="admin123">
            </div>
            <button type="submit" class="btn">
                Entrar
            </button>
        </form>
        
        <div class="footer">
            <p>© <?php echo date('Y'); ?> LISIS Tecnologias & Serviços</p>
        </div>
        
        <div style="margin-top: 2rem; font-size: 0.8rem; color: #666;">
            <p><a href="test_login.php">Testar Login com Debug</a></p>
            <p><a href="test_api.php">Testar API</a></p>
            <p><a href="index.php">Voltar para o Painel</a></p>
        </div>
    </div>
</body>
</html>
