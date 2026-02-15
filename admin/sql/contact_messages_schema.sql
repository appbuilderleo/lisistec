-- LISIS Contact Messages Schema
-- Tabela para armazenar mensagens do formulário de contacto

USE lisiseeh_lisis;

-- Tabela de mensagens de contacto
CREATE TABLE IF NOT EXISTS contact_messages (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
