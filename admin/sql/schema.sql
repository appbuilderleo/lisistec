-- LISIS Image Management System Database Schema
-- Esquema da base de dados para o sistema de gestão de imagens

-- Criar base de dados se não existir
CREATE DATABASE IF NOT EXISTS lisiseeh_lisis CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE lisiseeh_lisis;

-- Tabela de utilizadores administrativos
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    full_name VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de imagens
CREATE TABLE IF NOT EXISTS images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    width INT,
    height INT,
    category_id INT,
    title VARCHAR(255),
    description TEXT,
    alt_text VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_category (category_id),
    INDEX idx_filename (filename),
    INDEX idx_upload_date (upload_date)
);

-- Tabela de tags
CREATE TABLE IF NOT EXISTS tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de relacionamento imagem-tag (many-to-many)
CREATE TABLE IF NOT EXISTS image_tags (
    image_id INT,
    tag_id INT,
    PRIMARY KEY (image_id, tag_id),
    FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Tabela de configurações do sistema
CREATE TABLE IF NOT EXISTS system_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserir utilizador administrativo padrão
INSERT INTO admin_users (username, password, email, full_name) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@lisis.co.mz', 'Administrador LISIS')
ON DUPLICATE KEY UPDATE username = username;

-- Inserir categorias padrão
INSERT INTO categories (name, slug, description) VALUES 
('Projetos', 'projetos', 'Imagens dos projetos desenvolvidos'),
('Serviços', 'servicos', 'Imagens representativas dos serviços oferecidos'),
('Parceiros', 'parceiros', 'Logotipos e imagens dos parceiros'),
('Logos', 'logos', 'Logotipos da empresa e variações')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Inserir configurações padrão do sistema
INSERT INTO system_settings (setting_key, setting_value, description) VALUES 
('max_file_size', '10485760', 'Tamanho máximo de arquivo em bytes (10MB)'),
('allowed_formats', 'jpg,jpeg,png,gif,webp', 'Formatos de imagem permitidos'),
('images_per_page', '24', 'Número de imagens por página'),
('compression_quality', '85', 'Qualidade de compressão das imagens (0-100)'),
('upload_path', 'uploads/images/', 'Caminho para upload das imagens')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

-- Inserir algumas tags padrão
INSERT INTO tags (name, slug) VALUES 
('Web', 'web'),
('Design', 'design'),
('Mobile', 'mobile'),
('Tecnologia', 'tecnologia'),
('Desenvolvimento', 'desenvolvimento'),
('Logo', 'logo'),
('Identidade', 'identidade'),
('Branding', 'branding')
ON DUPLICATE KEY UPDATE name = VALUES(name);
