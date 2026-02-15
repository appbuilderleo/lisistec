<?php
/**
 * LISIS - Session Configuration
 * Configuração de sessão para desenvolvimento e produção
 */

// Detectar ambiente
$isProduction = ($_SERVER['SERVER_NAME'] !== 'localhost' && $_SERVER['SERVER_NAME'] !== '127.0.0.1');
$isHTTPS = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443;

// Configurações de sessão
if ($isProduction) {
    // Produção: usar cookies seguros apenas se HTTPS estiver disponível
    ini_set('session.cookie_httponly', 1);
    ini_set('session.use_strict_mode', 1);
    ini_set('session.cookie_samesite', 'Lax');
    
    // Apenas usar cookie_secure se HTTPS estiver ativo
    if ($isHTTPS) {
        ini_set('session.cookie_secure', 1);
    }
    
    // Configurar caminho de sessão
    $session_path = __DIR__ . '/../sessions';
    if (!file_exists($session_path)) {
        mkdir($session_path, 0755, true);
    }
    ini_set('session.save_path', $session_path);
    
} else {
    // Desenvolvimento: configurações mais permissivas
    ini_set('session.cookie_httponly', 1);
    ini_set('session.use_strict_mode', 1);
    ini_set('session.cookie_samesite', 'Lax');

    // Definir caminho de sessão também em desenvolvimento
    $session_path = __DIR__ . '/../sessions';
    if (!file_exists($session_path)) {
        mkdir($session_path, 0755, true);
    }
    ini_set('session.save_path', $session_path);
}

// Configurar nome da sessão (DEVE vir ANTES de session_set_cookie_params)
session_name('LISIS_ADMIN_SESSION');

// Configurar tempo de vida da sessão (24 horas)
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 86400);

// Definir parâmetros explícitos do cookie de sessão (antes de session_start)
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_set_cookie_params([
        'lifetime' => 86400,
        'path' => '/',
        'secure' => $isProduction && $isHTTPS,
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
}
?>
