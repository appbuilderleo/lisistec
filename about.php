<?php require_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <?php get_head('Sobre Nós - LISIS', ['css/events.css', 'css/about.css']); ?>
    
</head>
<body>
    <?php get_navbar(); ?>

    <header class="page-header">
        <div class="container">
            <div class="header-content">
                <div class="header-icon">
                    <i class="fas fa-users"></i>
                </div>
                <h1>Sobre Nós</h1>
                <p>Visão, Missão, Objetivos e Valores</p>
            </div>
        </div>
        <div class="header-decoration">
            <div class="decoration-circle circle-1"></div>
            <div class="decoration-circle circle-2"></div>
            <div class="decoration-circle circle-3"></div>
        </div>
    </header>

    <main>
        <!-- Introdução -->
        <section class="company-intro">
            <div class="container intro-content">
                <div class="intro-text">
                    <h2>LISIS Tecnologias & Serviços E.I.</h2>
                    <p>
                        Somos uma empresa moçambicana focada em tecnologia e design, entregando soluções
                        modernas, escaláveis e alinhadas aos objetivos de negócio dos nossos clientes.
                    </p>
                    <p>
                        Em <strong>Tecnologias</strong>, atuamos com desenvolvimento de sistemas web e
                        aplicativos móveis, fornecimento de equipamentos de informática, redes de
                        computadores e segurança eletrónica (CCTV).
                    </p>
                    <p>
                        Em <strong>Design</strong>, produzimos identidade visual, materiais de
                        comunicação (revistas, vídeos e social media) e desenvolvemos produtos como
                        mobiliário residencial e empresarial.
                    </p>
                    <a href="services.php" class="cta-button primary">Ver Serviços</a>
                </div>
                <div class="intro-image">
                    <img src="logos/img1.png" alt="Imagem Sobre a LISIS" />
                </div>
            </div>
        </section>

        <!-- Visão, Missão, Objetivos, Valores -->
        <section class="company-values">
            <div class="container">
                <div class="section-header">
                    <h2>Quem Somos</h2>
                    <p>Visão, Missão, Objetivos e Valores</p>
                </div>
                <div class="values-grid">
                    <div class="value-card">
                        <div class="value-icon"><i class="fas fa-eye"></i></div>
                        <h3>Visão</h3>
                        <p>Ser referência nacional em soluções tecnológicas e de design, contribuindo
                        para a transformação digital de empresas em Moçambique.</p>
                    </div>
                    <div class="value-card">
                        <div class="value-icon"><i class="fas fa-bullseye"></i></div>
                        <h3>Missão</h3>
                        <p>Transformar ideias em experiências digitais de alto impacto, com foco em
                        qualidade, performance e resultados mensuráveis.</p>
                    </div>
                    <div class="value-card">
                        <div class="value-icon"><i class="fas fa-flag-checkered"></i></div>
                        <h3>Objetivos</h3>
                        <ul>
                            <li>Entregar projetos que gerem valor real ao cliente</li>
                            <li>Garantir segurança, escalabilidade e usabilidade</li>
                            <li>Promover relações de longo prazo e confiança</li>
                        </ul>
                    </div>
                    <div class="value-card">
                        <div class="value-icon"><i class="fas fa-heart"></i></div>
                        <h3>Valores</h3>
                        <ul>
                            <li>Inovação e melhoria contínua</li>
                            <li>Transparência e ética</li>
                            <li>Excelência no atendimento</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Indicadores -->
        <section class="team-section">
            <div class="container">
                <div class="section-header">
                    <h2>Compromisso com Resultados</h2>
                    <p>Parcerias duradouras e entregas consistentes</p>
                </div>
                <div class="team-stats">
                    <div class="stat-item">
                        <div class="stat-number">10+</div>
                        <div class="stat-label">Áreas de atuação</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">100%</div>
                        <div class="stat-label">Foco no Cliente</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">24/7</div>
                        <div class="stat-label">Suporte por acordo</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">∞</div>
                        <div class="stat-label">Inovação</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Redes Sociais / Contacto -->
        <section class="social-section">
            <div class="container">
                <div class="section-header">
                    <h2>Conecte-se com a LISIS</h2>
                    <p>Acompanhe novidades e projetos</p>
                </div>
                <div class="social-links">
                    <a href="#" class="social-link facebook"><i class="fab fa-facebook-f"></i> Facebook</a>
                    <a href="#" class="social-link instagram"><i class="fab fa-instagram"></i> Instagram</a>
                    <a href="#" class="social-link twitter"><i class="fab fa-x-twitter"></i> X / Twitter</a>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="cta-section">
            <div class="container">
                <h2>Vamos construir algo extraordinário</h2>
                <p>Conte-nos sobre o seu projeto e receba uma proposta personalizada.</p>
                <a href="contact.php" class="cta-button">Falar com a LISIS</a>
            </div>
        </section>
    </main>

    <?php get_footer(); ?>
    <?php get_footer_scripts(); ?>
</body>
</html>
