<?php require_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <?php get_head('LISIS Tecnologias & Serviços - Potencializamos o crescimento da sua empresa', ['css/events.css']); ?>
</head>
<body>
    <?php get_navbar(); ?>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-background">
            <?php
                $slides_dir = __DIR__ . '/uploads/slides';
                $slide_urls = [];
                if (is_dir($slides_dir)) {
                    foreach (scandir($slides_dir) as $file) {
                        if (preg_match('/\.(png|jpe?g|webp)$/i', $file)) {
                            $slide_urls[] = 'uploads/slides/' . rawurlencode($file);
                        }
                    }
                    if (!empty($slide_urls)) {
                        sort($slide_urls, SORT_NATURAL | SORT_FLAG_CASE);
                    }
                }
            ?>
            <?php if (!empty($slide_urls)): ?>
                <div class="hero-slides">
                    <?php foreach ($slide_urls as $i => $url): ?>
                        <div class="hero-slide<?php echo $i === 0 ? ' active' : ''; ?>" style="background-image: url('<?php echo $url; ?>');"></div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
            <div class="container">
                <div class="hero-flex">
                    <div class="hero-text">
                        <p class="hero-welcome">Bem-vindo à LISIS</p>
                        <h1 class="hero-title">Potencializamos o crescimento da sua empresa com soluções web robustas e escaláveis</h1>
                        <p class="hero-subtitle">Transformamos a sua visão em experiências digitais que conectam pessoas, fortalecem marcas e geram resultados reais, ajudando o seu negócio a conquistar mais clientes e a expandir fronteiras.</p>
                        <div class="hero-buttons">
                            <a href="projects.php" class="cta-button secondary">Ver Projectos</a>
                            <a href="contact.php" class="cta-button primary">Iniciar Projecto</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Partner Logos Section -->
    <section class="partners">
        <div class="container">
            <div class="partners-content">
                <h3 class="partners-title">Nossos Parceiros e Clientes</h3>
                <div class="partners-carousel-wrapper">
                    <div class="partners-carousel">
                        <div class="partner-logo">
                            <img src="parceiros/focus.png" alt="Focos TV - Moçambique Real">
                        </div>
                        <div class="partner-logo">
                            <img src="parceiros/logo-cemoqe-2.png" alt="CEMOQE">
                        </div>
                        <div class="partner-logo">
                            <img src="parceiros/a4d10aa8-5376-4fed-9ad8-c25d16f6c3c4.png" alt="Parceiro">
                        </div>
                        <div class="partner-logo">
                            <img src="parceiros/logotipo.png" alt="Parceiro">
                        </div>
                        <!-- Duplicate for seamless loop -->
                        <div class="partner-logo">
                            <img src="parceiros/focus.png" alt="Focos TV - Moçambique Real">
                        </div>
                        <div class="partner-logo">
                            <img src="parceiros/logo-cemoqe-2.png" alt="CEMOQE">
                        </div>
                        <div class="partner-logo">
                            <img src="parceiros/a4d10aa8-5376-4fed-9ad8-c25d16f6c3c4.png" alt="Parceiro">
                        </div>
                        <div class="partner-logo">
                            <img src="parceiros/logotipo.png" alt="Parceiro">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- What We Do Section -->
    <section id="services-preview" class="what-we-do">
        <div class="container">
            <div class="section-header">
                <h2>O que Fazemos</h2>
                <p>Combinamos tecnologia de ponta com design inovador para criar soluções que impulsionam o seu negócio</p>
            </div>
            <div class="services-grid">
                <div class="service-column">
                    <h3><i class="fas fa-code"></i> Tecnologias</h3>
                    <ul>
                        <li>Desenvolvimento de Sistemas Web</li>
                        <li>Aplicativos Móveis</li>
                        <li>Equipamentos de Informática</li>
                        <li>Redes de Computadores</li>
                        <li>Segurança Electrónica (CCTV)</li>
                    </ul>
                </div>
                <div class="service-column">
                    <h3><i class="fas fa-palette"></i> Design</h3>
                    <ul>
                        <li>Logotipos e Identidade Visual</li>
                        <li>Revistas e Material Gráfico</li>
                        <li>Vídeos Corporativos</li>
                        <li>Gestão de Redes Sociais</li>
                        <li>Design de Produtos</li>
                    </ul>
                </div>
            </div>
            <div class="cta-center">
                <a href="services.php" class="cta-button primary">Ver Todos os Serviços</a>
            </div>
        </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="why-choose-us">
        <div class="container">
            <div class="section-header">
                <h2>Por que Escolher a LISIS?</h2>
                <p>Somos mais do que uma empresa de tecnologia - somos seu parceiro estratégico para o sucesso digital</p>
            </div>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-rocket"></i>
                    </div>
                    <h3>Inovação Constante</h3>
                    <p>Utilizamos as tecnologias mais recentes para criar soluções que destacam o seu negócio</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <h3>Equipa Experiente</h3>
                    <p>Profissionais qualificados e dedicados ao sucesso dos nossos clientes</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-headset"></i>
                    </div>
                    <h3>Suporte Dedicado</h3>
                    <p>Acompanhamento contínuo e suporte técnico sempre que precisar</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h3>Resultados Mensuráveis</h3>
                    <p>Focamos em entregar soluções que geram impacto real no seu negócio</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Events (Home) -->
    <section id="featured-events-home" class="featured-events" style="display: none;">
        <div class="container">
            <div class="section-title">
                <h2>Eventos em Destaque</h2>
                <div class="title-underline"></div>
            </div>
            <div id="featured-events-grid-home" class="featured-grid"></div>
        </div>
    </section>

    <!-- Events Section -->
    <section id="events-section" class="events-section" style="display: none;">
        <div class="container">
            <div class="section-header" data-aos="fade-up">
                <span class="section-subtitle">Próximos Eventos</span>
                <h2>Eventos LISIS</h2>
                <p>Participe dos nossos eventos e workshops de tecnologia</p>
            </div>
            <div id="home-events-container" class="events-grid" data-aos="fade-up" data-aos-delay="200"></div>
            <div class="section-cta" data-aos="fade-up" data-aos-delay="400">
                <a href="events.php" class="cta-button primary">
                    Ver Todos os Eventos <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
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

    <?php get_footer_scripts(); ?>
    <script src="<?php echo asset_url('js/home-events.js'); ?>"></script>
</body>
</html>
