-- LISIS Events Management System
-- Esquema para gestão de eventos da empresa

USE lisiseeh_lisis;

-- Tabela de eventos
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME,
    location VARCHAR(255),
    image_path VARCHAR(500),
    category VARCHAR(100),
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_event_date (event_date),
    INDEX idx_slug (slug),
    INDEX idx_featured (is_featured)
);

-- Inserir eventos de exemplo
INSERT INTO events (title, slug, description, event_date, event_time, location, category, is_featured, is_active) VALUES 
('Lançamento de Produto Digital', 'lancamento-produto-digital', 'Apresentação oficial do nosso novo sistema de gestão empresarial integrado.', '2025-11-15', '14:00:00', 'Maputo, Moçambique', 'Tecnologia', TRUE, TRUE),
('Workshop de Desenvolvimento Web', 'workshop-desenvolvimento-web', 'Aprenda as melhores práticas de desenvolvimento web moderno com nossa equipa de especialistas.', '2025-10-20', '09:00:00', 'LISIS Headquarters', 'Formação', TRUE, TRUE),
('Conferência de Inovação Digital', 'conferencia-inovacao-digital', 'Evento anual sobre as últimas tendências em transformação digital e tecnologia.', '2025-12-05', '10:00:00', 'Centro de Conferências Maputo', 'Conferência', FALSE, TRUE),
('Networking Tech Meetup', 'networking-tech-meetup', 'Encontro informal para profissionais de tecnologia compartilharem experiências e criarem conexões.', '2025-10-30', '18:00:00', 'LISIS Innovation Hub', 'Networking', FALSE, TRUE)
ON DUPLICATE KEY UPDATE title = VALUES(title);
