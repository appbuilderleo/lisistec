<?php require_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <?php get_head('Contacto - LISIS', ['css/events.css', 'css/contact.css']); ?>
</head>
<body>
    <?php get_navbar(); ?>

    <header class="page-header">
        <div class="container">
            <div class="header-content">
                <div class="header-icon">
                    <i class="fas fa-envelope"></i>
                </div>
                <h1>Contacto</h1>
                <p>Fale com a nossa equipa</p>
            </div>
        </div>
        <div class="header-decoration">
            <div class="decoration-circle circle-1"></div>
            <div class="decoration-circle circle-2"></div>
            <div class="decoration-circle circle-3"></div>
        </div>
    </header>

    <main>
        <!-- Contact -->
        <section class="contact-section">
            <div class="container contact-content">
                <div class="contact-form-container">
                    <h2>Envie-nos uma mensagem</h2>
                    <p>Responderemos o mais breve possível.</p>

                    <form id="contactForm" class="contact-form">
                        <div class="form-group">
                            <label for="nome">Nome</label>
                            <input type="text" id="nome" name="nome" placeholder="Seu nome" required>
                            <div class="error-message">Por favor, insira seu nome</div>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="seu@email.com" required>
                            <div class="error-message">Insira um email válido</div>
                        </div>
                        <div class="form-group">
                            <label for="empresa">Empresa</label>
                            <input type="text" id="empresa" name="empresa" placeholder="Nome da empresa">
                        </div>
                        <div class="form-group">
                            <label for="telefone">Telefone</label>
                            <input type="tel" id="telefone" name="telefone" placeholder="+258 ...">
                        </div>
                        <div class="form-group">
                            <label for="servico">Serviço</label>
                            <select id="servico" name="servico">
                                <option value="">Selecione</option>
                                <option value="web">Desenvolvimento Web</option>
                                <option value="mobile">Aplicativos Móveis</option>
                                <option value="redes">Redes de Computadores</option>
                                <option value="cctv">Segurança Electrónica (CCTV)</option>
                                <option value="design">Design</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="mensagem">Mensagem</label>
                            <textarea id="mensagem" name="mensagem" placeholder="Escreva sua mensagem" required></textarea>
                            <div class="error-message">Por favor, escreva sua mensagem</div>
                        </div>
                        <button type="submit" class="submit-button">
                            <i class="fas fa-paper-plane"></i>
                            Enviar Mensagem
                        </button>
                    </form>
                </div>

                <aside class="contact-info">
                    <h2>Informações de contacto</h2>

                    <div class="info-item">
                        <div class="info-icon"><i class="fas fa-phone"></i></div>
                        <div class="info-content">
                            <h3>Telefones</h3>
                            <p>+258 84 464 7599</p>
                            <p>+258 87 464 7599</p>
                        </div>
                    </div>

                    <div class="info-item">
                        <div class="info-icon"><i class="fas fa-envelope"></i></div>
                        <div class="info-content">
                            <h3>Email</h3>
                            <p>info@lisistec-servicos.com</p>
                        </div>
                    </div>

                    <div class="info-item">
                        <div class="info-icon"><i class="fas fa-map-marker-alt"></i></div>
                        <div class="info-content">
                            <h3>Endereço</h3>
                            <p>Maputo, Moçambique</p>
                        </div>
                    </div>

                    <div class="contact-social">
                        <h3>Siga-nos</h3>
                        <div class="social-links">
                            <a href="#" class="social-link" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="social-link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="social-link" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#" class="social-link" aria-label="Twitter"><i class="fab fa-x-twitter"></i></a>
                        </div>
                    </div>
                </aside>
            </div>
        </section>

        <!-- Mapa -->
        <section class="map-section">
            <div class="container">
                <h2>Localização</h2>
                <div class="map-container">
                    <div class="map-placeholder">
                        <i class="fas fa-map-marked-alt"></i>
                        <p>Mapa interativo em breve</p>
                        <small>Integração com Google Maps opcional</small>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ -->
        <section class="faq-section">
            <div class="container">
                <div class="faq-grid">
                    <div class="faq-item">
                        <h3>Quanto tempo leva um projeto?</h3>
                        <p>Depende do escopo. Projetos web costumam levar entre 4 a 12 semanas.</p>
                    </div>
                    <div class="faq-item">
                        <h3>Vocês oferecem suporte?</h3>
                        <p>Sim. Temos planos de suporte e manutenção contínua.</p>
                    </div>
                    <div class="faq-item">
                        <h3>Como começo?</h3>
                        <p>Entre em contacto pelo formulário e agendamos uma reunião.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <?php get_footer(); ?>
    <?php get_footer_scripts(); ?>
    <script src="<?php echo asset_url('js/contact.js'); ?>"></script>
</body>
</html>
