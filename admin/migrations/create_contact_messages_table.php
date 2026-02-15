<?php
/**
 * Migration: Create contact_messages table
 * Run this file once to create the table
 */

// Direct database connection for CLI
$host = 'localhost';
$db_name = 'lisiseeh_lisis';
$username = 'root';
$password = '';

try {
    $db = new PDO(
        "mysql:host=" . $host . ";dbname=" . $db_name . ";charset=utf8mb4",
        $username,
        $password,
        array(
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        )
    );
    
    $sql = "CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        empresa VARCHAR(100),
        telefone VARCHAR(20),
        servico VARCHAR(50),
        mensagem TEXT NOT NULL,
        status ENUM('unread', 'read', 'archived') DEFAULT 'unread',
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        read_at TIMESTAMP NULL,
        archived_at TIMESTAMP NULL,
        INDEX idx_status (status),
        INDEX idx_created_at (created_at),
        INDEX idx_email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    $db->exec($sql);
    
    echo "✓ Tabela contact_messages criada com sucesso!\n";
    echo "Acesse: http://localhost/lisis/admin/index.php para ver o inbox\n";
    
} catch (Exception $e) {
    echo "✗ Erro ao criar tabela: " . $e->getMessage() . "\n";
}
?>
