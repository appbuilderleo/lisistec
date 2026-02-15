<?php
// Complete diagnostic for LISIS Admin
ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "<h1>🔍 Diagnóstico Completo do Sistema LISIS</h1>";

// 1. Check PHP Version
echo "<h2>1. Versão do PHP</h2>";
echo "<p>✓ PHP Version: " . phpversion() . "</p>";

// 2. Check required extensions
echo "<h2>2. Extensões PHP Necessárias</h2>";
$required_extensions = ['pdo', 'pdo_mysql', 'json', 'mbstring', 'session'];
foreach ($required_extensions as $ext) {
    if (extension_loaded($ext)) {
        echo "<p style='color:green'>✓ $ext: Carregada</p>";
    } else {
        echo "<p style='color:red'>✗ $ext: Não carregada</p>";
    }
}

// 3. Check files
echo "<h2>3. Verificação de Arquivos</h2>";
$required_files = [
    'config/session.php' => 'Configuração de Sessão',
    'config/database.php' => 'Configuração do Banco de Dados',
    'classes/Auth.php' => 'Classe de Autenticação',
    'api/auth.php' => 'API de Autenticação',
    'js/admin.js' => 'JavaScript do Admin',
    'css/admin.css' => 'CSS do Admin'
];

foreach ($required_files as $file => $description) {
    if (file_exists($file)) {
        echo "<p style='color:green'>✓ $description: $file</p>";
    } else {
        echo "<p style='color:red'>✗ $description: $file (não encontrado)</p>";
    }
}

// 4. Database connection
echo "<h2>4. Conexão com o Banco de Dados</h2>";
try {
    require_once 'config/database.php';
    $database = new Database();
    $conn = $database->getConnection();
    echo "<p style='color:green'>✓ Conexão com o banco de dados bem-sucedida</p>";
    
    // Check tables
    $stmt = $conn->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo "<p>Tabelas encontradas: " . implode(', ', $tables) . "</p>";
    
    // Check admin_users table
    if (in_array('admin_users', $tables)) {
        echo "<p style='color:green'>✓ Tabela admin_users existe</p>";
        
        // Check admin user
        $stmt = $conn->prepare("SELECT COUNT(*) FROM admin_users WHERE username = 'admin'");
        $stmt->execute();
        $count = $stmt->fetchColumn();
        
        if ($count > 0) {
            echo "<p style='color:green'>✓ Usuário admin existe</p>";
            
            // Get user details
            $stmt = $conn->prepare("SELECT id, username, email, full_name, is_active, created_at FROM admin_users WHERE username = 'admin'");
            $stmt->execute();
            $user = $stmt->fetch();
            echo "<pre>" . print_r($user, true) . "</pre>";
        } else {
            echo "<p style='color:red'>✗ Usuário admin não encontrado</p>";
        }
    } else {
        echo "<p style='color:red'>✗ Tabela admin_users não existe</p>";
    }
} catch (Exception $e) {
    echo "<p style='color:red'>✗ Erro na conexão: " . $e->getMessage() . "</p>";
}

// 5. Session configuration
echo "<h2>5. Configuração de Sessão</h2>";
try {
    require_once 'config/session.php';
    session_start();
    echo "<p style='color:green'>✓ Sessão iniciada com sucesso</p>";
    echo "<p>ID da Sessão: " . session_id() . "</p>";
    echo "<p>Nome da Sessão: " . session_name() . "</p>";
    echo "<p>Caminho de Salvamento: " . session_save_path() . "</p>";
} catch (Exception $e) {
    echo "<p style='color:red'>✗ Erro na sessão: " . $e->getMessage() . "</p>";
}

// 6. Auth class test
echo "<h2>6. Teste da Classe Auth</h2>";
try {
    require_once 'classes/Auth.php';
    $auth = new Auth();
    echo "<p style='color:green'>✓ Classe Auth carregada</p>";
    
    // Test authentication
    $isAuth = $auth->isAuthenticated();
    echo "<p>Status de Autenticação: " . ($isAuth ? "Autenticado" : "Não autenticado") . "</p>";
    
    if ($isAuth) {
        $user = $auth->getCurrentUser();
        echo "<pre>" . print_r($user, true) . "</pre>";
    }
} catch (Exception $e) {
    echo "<p style='color:red'>✗ Erro na classe Auth: " . $e->getMessage() . "</p>";
}

// 7. File permissions
echo "<h2>7. Permissões de Arquivos</h2>";
$dirs = ['uploads', 'uploads/images', 'uploads/thumbnails'];
foreach ($dirs as $dir) {
    if (is_dir($dir)) {
        if (is_writable($dir)) {
            echo "<p style='color:green'>✓ $dir: Escritível</p>";
        } else {
            echo "<p style='color:orange'>⚠ $dir: Não é escritível</p>";
        }
    } else {
        echo "<p style='color:orange'>⚠ $dir: Não existe</p>";
    }
}

// 8. API test
echo "<h2>8. Teste da API</h2>";
$api_url = 'http://' . $_SERVER['HTTP_HOST'] . '/lisistec/admin/api/auth.php';
$ch = curl_init($api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response !== false) {
    echo "<p style='color:green'>✓ API respondeu (HTTP $http_code)</p>";
    echo "<p>Resposta: <pre>$response</pre></p>";
} else {
    echo "<p style='color:red'>✗ API não respondeu</p>";
}

echo "<hr>";
echo "<h2>📋 Links Úteis</h2>";
echo "<p><a href='reset_admin.php'>🔄 Resetar Senha do Admin</a></p>";
echo "<p><a href='login_test.php'>🔐 Teste de Login Simples</a></p>";
echo "<p><a href='test_login.php'>🧪 Teste de Login com Debug</a></p>";
echo "<p><a href='test_api.php'>🌐 Teste da API</a></p>";
echo "<p><a href='index.php'>🎯 Painel de Administração</a></p>";
echo "<p><a href='db_setup.php'>🗄️ Configuração do Banco de Dados</a></p>";

echo "<hr>";
echo "<p><small>Diagnóstico gerado em: " . date('Y-m-d H:i:s') . "</small></p>";
?>
