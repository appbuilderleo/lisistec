<?php
/**
 * LISIS - Configuração Global do Site
 * Sistema de cache busting automático e estilos dinâmicos
 */

// Versão do site (atualizar quando houver mudanças de CSS/JS)
define('SITE_VERSION', time()); // Usa timestamp para sempre forçar atualização

// Configurações de estilo personalizadas
$custom_styles = [
    'navbar' => [
        'container_padding' => '0 5px',
    ],
    'hero' => [
        'container_padding' => '0 5px',
        'container_max_width' => '1200px',
    ],
];

/**
 * Gera URL de assets com cache busting
 */
function asset_url($path) {
    return $path . '?v=' . SITE_VERSION;
}

/**
 * Gera estilos inline personalizados
 */
function get_custom_styles() {
    global $custom_styles;
    
    $styles = "
    <style>
        /* Estilos Personalizados Dinâmicos - LISIS */
        
        .nav-container { padding: {$custom_styles['navbar']['container_padding']} !important; }
        
        .hero-content .container { padding: {$custom_styles['hero']['container_padding']} !important; max-width: {$custom_styles['hero']['container_max_width']} !important; margin: 0 auto !important; }
        
        @media (max-width: 768px) {
            .hero-content .container { padding: 0 var(--container-padding) !important; }
        }
        
        @media (max-width: 480px) {
            .hero-content .container { padding: 0 var(--container-padding) !important; }
        }
    </style>
    ";
    
    return $styles;
}

/**
 * Inclui o cabeçalho padrão do site
 */
function get_head($page_title = 'LISIS Tecnologias & Serviços', $additional_css = []) {
    ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="LISIS Tecnologias & Serviços - Soluções web robustas e escaláveis para maximizar a visibilidade da sua marca">
    <meta name="keywords" content="desenvolvimento web, aplicativos móveis, design, tecnologia, Moçambique">
    <title><?php echo $page_title; ?></title>
    
    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="logos/favicon_io (4)/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="logos/favicon_io (4)/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="logos/favicon_io (4)/favicon-16x16.png">
    <link rel="manifest" href="logos/favicon_io (4)/site.webmanifest">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- CSS Principal -->
    <link rel="stylesheet" href="<?php echo asset_url('css/style.css'); ?>">
    
    <?php
    // CSS adicional específico da página
    foreach ($additional_css as $css_file) {
        echo '<link rel="stylesheet" href="' . asset_url($css_file) . '">' . "\n    ";
    }
    ?>
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <?php echo get_custom_styles(); ?>
    <?php
}

/**
 * Inclui a navegação padrão do site
 */
function get_navbar() {
    ?>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="index.php">
                    <img src="logos/Logotipo Lisis.png" alt="LISIS Logo">
                </a>
            </div>
            <ul class="nav-menu">
                <li class="nav-item"><a href="index.php" class="nav-link">Início</a></li>
                <li class="nav-item"><a href="about.php" class="nav-link">Sobre Nós</a></li>
                <li class="nav-item"><a href="services.php" class="nav-link">Serviços</a></li>
                <li class="nav-item"><a href="pricing.php" class="nav-link">Preços</a></li>
                <li class="nav-item"><a href="projects.php" class="nav-link">Projetos</a></li>
                <li class="nav-item"><a href="events.php" class="nav-link">Eventos</a></li>
                <li class="nav-item"><a href="gallery.php" class="nav-link">Galeria</a></li>
                <li class="nav-item"><a href="contact.php" class="nav-link">Contacto</a></li>
                <li class="nav-item"><a href="admin/index.php" class="nav-link nav-admin" aria-label="Área Administrativa"><i class="fas fa-lock" aria-hidden="true"></i> Admin</a></li>
            </ul>
            <div class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>
    <?php
}

/**
 * Rodapé padrão do site
 */
function get_footer() {
    ?>
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>LISIS Tecnologias & Serviços</h3>
                    <p>Transformando ideias em realidade digital</p>
                    <div class="footer-social">
                        <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                        <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                        <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                    </div>
                </div>
                <div class="footer-section">
                    <h4>Links Rápidos</h4>
                    <ul>
                        <li><a href="about.php">Sobre Nós</a></li>
                        <li><a href="services.php">Serviços</a></li>
                        <li><a href="projects.php">Projetos</a></li>
                        <li><a href="events.php">Eventos</a></li>
                        <li><a href="contact.php">Contacto</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contacto</h4>
                    <p><i class="fas fa-phone"></i> +258 84 464 7599</p>
                    <p><i class="fas fa-phone"></i> +258 87 464 7599</p>
                    <p><i class="fas fa-envelope"></i> info@lisistec-servicos.com</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> LISIS Tecnologias & Serviços E.I. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>
    <?php
}

/**
 * Inclui o rodapé padrão do site
 */
function get_footer_scripts() {
    ?>
    <script src="<?php echo asset_url('js/script.js'); ?>"></script>
    <?php
}
?>
