<?php require_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <?php get_head('Preços - LISIS', ['css/events.css', 'css/pricing.css']); ?>
</head>
<body>
    <?php get_navbar(); ?>

    <header class="pricing-header">
        <div class="container">
            <div class="header-content">
                <div class="header-icon"><i class="fas fa-tags"></i></div>
                <h1>Planos e Preços</h1>
                <p>Escolha o pacote ideal para o seu projeto. Todos os planos podem ser personalizados.</p>
            </div>
        </div>
    </header>

    <main>
        <!-- Desenvolvimento Web -->
        <section class="pricing-section">
            <div class="container">
                <div class="section-header">
                    <h2>Desenvolvimento Web</h2>
                    <p>Sites rápidos, seguros e orientados a resultados</p>
                </div>
                <div class="pricing-grid">
                    <div class="pricing-card">
                        <span class="badge"><i class="fas fa-check"></i> Essencial</span>
                        <h3>Site Institucional Essencial</h3>
                        <div class="price">7.500 MZN <small>/ 5-7 dias</small></div>
                        <p class="description">Presença online rápida para apresentar sua empresa.</p>
                        <ul>
                            <li><i class="fas fa-check"></i> Até 5 páginas (Home, Sobre, Serviços, Contacto, Política)</li>
                            <li><i class="fas fa-check"></i> Layout responsivo (mobile-first)</li>
                            <li><i class="fas fa-check"></i> Formulário de contacto funcional</li>
                            <li><i class="fas fa-check"></i> Integração básica com redes sociais</li>
                            <li><i class="fas fa-check"></i> Configuração inicial de segurança (SSL ready)</li>
                        </ul>
                        <div class="cta"><a href="contact.php">Pedir orçamento</a></div>
                    </div>

                    <div class="pricing-card featured">
                        <span class="badge"><i class="fas fa-star"></i> Mais procurado</span>
                        <h3>Site Profissional + SEO</h3>
                        <div class="price">12.000 MZN <small>/ 7-10 dias</small></div>
                        <p class="description">Performance, SEO e conversão para gerar leads.</p>
                        <ul>
                            <li><i class="fas fa-check"></i> Até 8 páginas + Blog</li>
                            <li><i class="fas fa-check"></i> SEO on-page (meta tags, sitemap, schema básico)</li>
                            <li><i class="fas fa-check"></i> Otimização de velocidade (imagens/JS/CSS)</li>
                            <li><i class="fas fa-check"></i> Google Analytics + Search Console</li>
                            <li><i class="fas fa-check"></i> Formulários com anti-spam</li>
                        </ul>
                        <div class="cta"><a href="contact.php">Pedir orçamento</a></div>
                    </div>

                    <div class="pricing-card">
                        <span class="badge"><i class="fas fa-shopping-cart"></i> Ecommerce</span>
                        <h3>Loja Virtual Starter</h3>
                        <div class="price">18.000 MZN <small>/ 10-14 dias</small></div>
                        <p class="description">E-commerce inicial para vender online com segurança.</p>
                        <ul>
                            <li><i class="fas fa-check"></i> Catálogo até 50 produtos</li>
                            <li><i class="fas fa-check"></i> Carrinho e checkout simples</li>
                            <li><i class="fas fa-check"></i> Integração com pagamentos locais</li>
                            <li><i class="fas fa-check"></i> Gestão de stock e encomendas</li>
                            <li><i class="fas fa-check"></i> Relatórios básicos de vendas</li>
                        </ul>
                        <div class="cta"><a href="contact.php">Pedir orçamento</a></div>
                    </div>
                </div>
                <div class="pricing-notes">Nota: Preços não incluem hospedagem e domínio.</div>
            </div>
        </section>

        <!-- Design e Identidade -->
        <section class="pricing-section">
            <div class="container">
                <div class="section-header">
                    <h2>Design e Identidade</h2>
                    <p>Branding consistente para fortalecer a sua marca</p>
                </div>
                <div class="pricing-grid">
                    <div class="pricing-card">
                        <span class="badge"><i class="fas fa-pen-nib"></i> Logo</span>
                        <h3>Logotipo + Identidade Básica</h3>
                        <div class="price">3.500 MZN</div>
                        <p class="description">Identidade essencial para iniciar com credibilidade.</p>
                        <ul>
                            <li><i class="fas fa-check"></i> 1 logo + 2 variações</li>
                            <li><i class="fas fa-check"></i> Paleta de cores + tipografia</li>
                            <li><i class="fas fa-check"></i> Cartão de visita (digital)</li>
                            <li><i class="fas fa-check"></i> Kit de arquivos para impressão e web</li>
                        </ul>
                        <div class="cta"><a href="contact.php">Pedir orçamento</a></div>
                    </div>

                    <div class="pricing-card featured">
                        <span class="badge"><i class="fas fa-gem"></i> Completo</span>
                        <h3>Identidade Visual Completa</h3>
                        <div class="price">8.000 MZN</div>
                        <p class="description">Manual de marca completo para uso consistente.</p>
                        <ul>
                            <li><i class="fas fa-check"></i> Logo principal + versões horizontais</li>
                            <li><i class="fas fa-check"></i> Guia de marca (cores, tipografia, aplicações)</li>
                            <li><i class="fas fa-check"></i> Papelaria (carta, assinatura e-mail, capa social)</li>
                            <li><i class="fas fa-check"></i> 3 templates para redes sociais</li>
                        </ul>
                        <div class="cta"><a href="contact.php">Pedir orçamento</a></div>
                    </div>

                    <div class="pricing-card">
                        <span class="badge"><i class="fas fa-layer-group"></i> Packs</span>
                        <h3>Material Gráfico (pack 5 peças)</h3>
                        <div class="price">5.000 MZN</div>
                        <p class="description">Pacote de peças gráficas para campanhas e social.</p>
                        <ul>
                            <li><i class="fas fa-check"></i> 5 peças (posts, flyers, banners)</li>
                            <li><i class="fas fa-check"></i> Adaptação para redes sociais</li>
                            <li><i class="fas fa-check"></i> Revisões inclusas (até 2)</li>
                            <li><i class="fas fa-check"></i> Entrega em formatos otimizados</li>
                        </ul>
                        <div class="cta"><a href="contact.php">Pedir orçamento</a></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Marketing Digital -->
        <section class="pricing-section">
            <div class="container">
                <div class="section-header">
                    <h2>Marketing Digital (Mensal)</h2>
                    <p>Planos para construir e escalar presença online</p>
                </div>
                <div class="pricing-grid">
                    <div class="pricing-card">
                        <span class="badge"><i class="fas fa-seedling"></i> Presença</span>
                        <h3>Presença Social</h3>
                        <div class="price">3.000 MZN <small>/ mês</small></div>
                        <p class="description">Inicie presença online com consistência.</p>
                        <ul>
                            <li><i class="fas fa-check"></i> 8 posts/mês (2 por semana)</li>
                            <li><i class="fas fa-check"></i> Planeamento editorial básico</li>
                            <li><i class="fas fa-check"></i> Design de criativos</li>
                            <li><i class="fas fa-check"></i> Relatório mensal simples</li>
                        </ul>
                        <div class="cta"><a href="contact.php">Pedir orçamento</a></div>
                    </div>

                    <div class="pricing-card featured">
                        <span class="badge"><i class="fas fa-bolt"></i> Crescimento</span>
                        <h3>Crescimento Digital</h3>
                        <div class="price">5.500 MZN <small>/ mês</small></div>
                        <p class="description">Para acelerar alcance e conversão.</p>
                        <ul>
                            <li><i class="fas fa-check"></i> 12-16 posts/mês (3-4 por semana)</li>
                            <li><i class="fas fa-check"></i> Gestão de anúncios (orçamento à parte)</li>
                            <li><i class="fas fa-check"></i> Monitorização e resposta básica</li>
                            <li><i class="fas fa-check"></i> Relatório avançado mensal</li>
                        </ul>
                        <div class="cta"><a href="contact.php">Pedir orçamento</a></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Pacotes Combinados -->
        <section class="pricing-section">
            <div class="container">
                <div class="section-header">
                    <h2>Pacotes Combinados</h2>
                    <p>Bundles para lançar ou fortalecer a sua marca</p>
                </div>
                <div class="pricing-grid">
                    <div class="pricing-card">
                        <span class="badge"><i class="fas fa-rocket"></i> Lançamento</span>
                        <h3>Start Digital (Site + Logo)</h3>
                        <div class="price">10.000 MZN</div>
                        <p class="description">Comece com site essencial e identidade básica.</p>
                        <ul>
                            <li><i class="fas fa-check"></i> Site Institucional Essencial</li>
                            <li><i class="fas fa-check"></i> Logo + Identidade Básica</li>
                            <li><i class="fas fa-check"></i> Integração social e formulário</li>
                            <li><i class="fas fa-check"></i> 1 ronda de ajustes incluída</li>
                        </ul>
                        <div class="cta"><a href="contact.php">Pedir orçamento</a></div>
                    </div>

                    <div class="pricing-card featured">
                        <span class="badge"><i class="fas fa-crown"></i> Completo</span>
                        <h3>Presença Total (Site Pro + ID Visual)</h3>
                        <div class="price">18.000 MZN</div>
                        <p class="description">Pacote profissional para credibilidade imediata.</p>
                        <ul>
                            <li><i class="fas fa-check"></i> Site Profissional + SEO</li>
                            <li><i class="fas fa-check"></i> Identidade Visual Completa</li>
                            <li><i class="fas fa-check"></i> 3 templates redes sociais</li>
                            <li><i class="fas fa-check"></i> Setup de analytics e SEO on-page</li>
                        </ul>
                        <div class="cta"><a href="contact.php">Pedir orçamento</a></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ curto -->
        <section class="pricing-faq">
            <div class="container">
                <div class="section-header">
                    <h2>FAQ Rápido</h2>
                    <p>Perguntas frequentes sobre preços e escopo</p>
                </div>
                <div class="faq-grid">
                    <div class="faq-item">
                        <h4>Hospedagem e domínio estão incluídos?</h4>
                        <p>Não. Trabalhamos com parceiros ou sua conta própria; podemos recomendar opções.</p>
                    </div>
                    <div class="faq-item">
                        <h4>Posso personalizar um pacote?</h4>
                        <p>Sim, todos os pacotes são ajustáveis conforme necessidades e integrações.</p>
                    </div>
                    <div class="faq-item">
                        <h4>Como funciona o pagamento?</h4>
                        <p>Normalmente 50% início + 50% na entrega. Para planos mensais, pagamento antecipado.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <?php get_footer(); ?>
    <?php get_footer_scripts(); ?>
</body>
</html>
