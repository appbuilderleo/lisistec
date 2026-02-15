<?php require_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <?php get_head('Serviços - LISIS', ['css/events.css', 'css/services.css', 'css/pricing.css']); ?>
</head>
<body>
    <?php get_navbar(); ?>

    <header class="page-header">
        <div class="container">
            <div class="header-content">
                <div class="header-icon">
                    <i class="fas fa-cogs"></i>
                </div>
                <h1>Serviços</h1>
                <p>Soluções tecnológicas e de design para impulsionar o seu negócio</p>
            </div>
        </div>
        <div class="header-decoration">
            <div class="decoration-circle circle-1"></div>
            <div class="decoration-circle circle-2"></div>
            <div class="decoration-circle circle-3"></div>
        </div>
    </header>

    <main>
        <!-- Overview -->
        <section class="services-overview">
            <div class="container overview-content">
                <h2>O que oferecemos</h2>
                <p>Combinamos tecnologia de ponta e design para criar soluções digitais de alto impacto, ajudando empresas a alcançar resultados reais e sustentáveis.</p>
            </div>
        </section>

        <!-- Tecnologias -->
        <section class="tech-services">
            <div class="container">
                <div class="section-header">
                    <h2><i class="fas fa-microchip"></i> Tecnologias</h2>
                    <p>Desenvolvimento, redes e segurança eletrónica</p>
                </div>
                <div class="services-grid">
                    <div class="service-card">
                        <div class="service-icon"><i class="fas fa-code"></i></div>
                        <h3>Desenvolvimento Web</h3>
                        <p>Sistemas web escaláveis e seguros, sob medida para o seu negócio.</p>
                        <ul class="service-features">
                            <li>Arquitetura moderna</li>
                            <li>APIs e integrações</li>
                            <li>Painéis administrativos</li>
                        </ul>
                    </div>
                    <div class="service-card">
                        <div class="service-icon"><i class="fas fa-network-wired"></i></div>
                        <h3>Redes de Computadores</h3>
                        <p>Infraestrutura confiável para garantir conectividade contínua.</p>
                        <ul class="service-features">
                            <li>Planeamento e implementação</li>
                            <li>Wi‑Fi corporativo</li>
                            <li>Monitorização</li>
                        </ul>
                    </div>
                    <div class="service-card">
                        <div class="service-icon"><i class="fas fa-video"></i></div>
                        <h3>Segurança Electrónica (CCTV)</h3>
                        <p>Soluções de vigilância com alta qualidade de imagem e gravação.</p>
                        <ul class="service-features">
                            <li>Câmaras IP/Analógicas</li>
                            <li>Gravação em NVR/DVR</li>
                            <li>Acesso remoto</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Design -->
        <section class="design-services">
            <div class="container">
                <div class="section-header">
                    <h2><i class="fas fa-palette"></i> Design</h2>
                    <p>Identidade visual, comunicação e conteúdo</p>
                </div>
                <div class="services-grid">
                    <div class="service-card">
                        <div class="service-icon"><i class="fas fa-bullhorn"></i></div>
                        <h3>Comunicação</h3>
                        <p>Branding, materiais gráficos, gestão de redes sociais e vídeos.</p>
                    </div>
                    <div class="service-card">
                        <div class="service-icon"><i class="fas fa-couch"></i></div>
                        <h3>Design de Produtos</h3>
                        <p>Design de mobiliário residencial e empresarial.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Preços - Preview -->
        <section class="pricing-preview">
            <div class="container">
                <div class="section-header">
                    <h2>Planos e Preços</h2>
                    <p>Escolha o pacote ideal ou peça uma proposta personalizada.</p>
                </div>
                <div class="pricing-grid">
                    <div class="pricing-card">
                        <span class="badge"><i class="fas fa-check"></i> Essencial</span>
                        <h3>Site Institucional</h3>
                        <div class="price">7.500 MZN <small>/ 5-7 dias</small></div>
                        <ul>
                            <li><i class="fas fa-check"></i> 5 páginas</li>
                            <li><i class="fas fa-check"></i> Responsivo e seguro</li>
                            <li><i class="fas fa-check"></i> Formulário de contacto</li>
                        </ul>
                        <a href="pricing.php" class="cta-button">Ver todos os planos</a>
                    </div>

                    <div class="pricing-card featured">
                        <span class="badge"><i class="fas fa-star"></i> Destaque</span>
                        <h3>Site Profissional + SEO</h3>
                        <div class="price">12.000 MZN <small>/ 7-10 dias</small></div>
                        <ul>
                            <li><i class="fas fa-check"></i> SEO on-page</li>
                            <li><i class="fas fa-check"></i> Blog + Analytics</li>
                            <li><i class="fas fa-check"></i> Otimização de velocidade</li>
                        </ul>
                        <a href="pricing.php" class="cta-button">Ver todos os planos</a>
                    </div>

                    <div class="pricing-card">
                        <span class="badge"><i class="fas fa-palette"></i> Design</span>
                        <h3>Identidade Visual</h3>
                        <div class="price">8.000 MZN</div>
                        <ul>
                            <li><i class="fas fa-check"></i> Logo e variações</li>
                            <li><i class="fas fa-check"></i> Guia de marca</li>
                            <li><i class="fas fa-check"></i> Papelaria digital</li>
                        </ul>
                        <a href="pricing.php" class="cta-button">Ver todos os planos</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Processo -->
        <section class="process-section">
            <div class="container">
                <div class="section-header">
                    <h2>Nosso Processo</h2>
                    <p>Metodologia clara do início ao fim</p>
                </div>
                <div class="process-steps">
                    <div class="process-step">
                        <span class="step-number">1</span>
                        <h3>Descoberta</h3>
                        <p>Entendimento dos objetivos do seu negócio.</p>
                    </div>
                    <div class="process-step">
                        <span class="step-number">2</span>
                        <h3>Planeamento</h3>
                        <p>Definição de requisitos e roadmap do projeto.</p>
                    </div>
                    <div class="process-step">
                        <span class="step-number">3</span>
                        <h3>Execução</h3>
                        <p>Desenvolvimento com entregas iterativas.</p>
                    </div>
                    <div class="process-step">
                        <span class="step-number">4</span>
                        <h3>Suporte</h3>
                        <p>Monitorização e melhoria contínua.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="cta-section">
            <div class="container">
                <h2>Pronto para transformar o seu projeto?</h2>
                <p>Converse com a nossa equipa e receba uma proposta personalizada.</p>
                <div class="cta-actions">
                    <a href="contact.php" class="cta-button">Falar com a LISIS</a>
                    <a href="https://wa.me/258874647599" class="cta-button" target="_blank" rel="noopener">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                </div>
            </div>
        </section>
    </main>

    <?php get_footer(); ?>
    <?php get_footer_scripts(); ?>
</body>
</html>
