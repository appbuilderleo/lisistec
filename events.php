<?php require_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <?php get_head('Eventos - LISIS Tecnologias & Serviços', ['css/events.css']); ?>
</head>
<body>
    <?php get_navbar(); ?>

    <!-- Page Header -->
    <section class="page-header events-header">
        <div class="container">
            <div class="header-content">
                <div class="header-icon">
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <h1>Nossos Eventos</h1>
                <p>Conecte-se, aprenda e cresça conosco através dos nossos eventos exclusivos</p>
            </div>
        </div>
        <div class="header-decoration">
            <div class="decoration-circle circle-1"></div>
            <div class="decoration-circle circle-2"></div>
            <div class="decoration-circle circle-3"></div>
        </div>
    </section>

    <!-- Events Filter -->
    <section class="events-filter">
        <div class="container">
            <div class="filter-tabs">
                <button class="filter-tab active" data-filter="all">
                    <i class="fas fa-th"></i>
                    <span>Todos</span>
                </button>
                <button class="filter-tab" data-filter="upcoming">
                    <i class="fas fa-clock"></i>
                    <span>Próximos</span>
                </button>
                <button class="filter-tab" data-filter="featured">
                    <i class="fas fa-star"></i>
                    <span>Destaques</span>
                </button>
                <button class="filter-tab" data-filter="Tecnologia">
                    <i class="fas fa-laptop-code"></i>
                    <span>Tecnologia</span>
                </button>
                <button class="filter-tab" data-filter="Formação">
                    <i class="fas fa-graduation-cap"></i>
                    <span>Formação</span>
                </button>
            </div>
        </div>
    </section>

    <!-- Featured Events -->
    <section class="featured-events">
        <div class="container">
            <div class="section-title">
                <h2>Eventos em Destaque</h2>
                <div class="title-underline"></div>
            </div>
            <div id="featured-events-grid" class="featured-grid">
                <!-- Featured events will be loaded here via JavaScript -->
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Carregando eventos...</p>
                </div>
            </div>
        </div>
    </section>

    <!-- All Events -->
    <section class="all-events">
        <div class="container">
            <div class="section-title">
                <h2>Todos os Eventos</h2>
                <div class="title-underline"></div>
            </div>
            <div id="events-grid" class="events-grid">
                <!-- Events will be loaded here via JavaScript -->
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Carregando eventos...</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Event Modal -->
    <div id="event-modal" class="event-modal">
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="" alt="" id="modal-event-image">
                    <div class="modal-badge" id="modal-event-badge"></div>
                </div>
                <div class="modal-details">
                    <h2 id="modal-event-title"></h2>
                    <div class="modal-meta">
                        <div class="meta-item">
                            <i class="fas fa-calendar"></i>
                            <span id="modal-event-date"></span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-clock"></i>
                            <span id="modal-event-time"></span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span id="modal-event-location"></span>
                        </div>
                    </div>
                    <div class="modal-description">
                        <p id="modal-event-description"></p>
                    </div>
                    <div class="modal-actions">
                        <a href="https://wa.me/258874647599?text=Olá! Gostaria de saber mais sobre o evento:" class="cta-button primary" target="_blank">
                            <i class="fab fa-whatsapp"></i>
                            Inscrever-se
                        </a>
                        <a href="contact.php" class="cta-button secondary">
                            <i class="fas fa-envelope"></i>
                            Mais Informações
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- CTA Section -->
    <section class="events-cta">
        <div class="container">
            <div class="cta-content">
                <div class="cta-icon">
                    <i class="fas fa-bell"></i>
                </div>
                <h2>Não Perca Nenhum Evento</h2>
                <p>Entre em contacto connosco para receber notificações sobre os próximos eventos</p>
                <div class="cta-buttons">
                    <a href="https://wa.me/258874647599" class="cta-button primary" target="_blank">
                        <i class="fab fa-whatsapp"></i>
                        WhatsApp
                    </a>
                    <a href="contact.php" class="cta-button secondary">
                        <i class="fas fa-envelope"></i>
                        Contactar
                    </a>
                </div>
            </div>
        </div>
        <div class="cta-background">
            <div class="cta-shape shape-1"></div>
            <div class="cta-shape shape-2"></div>
            <div class="cta-shape shape-3"></div>
        </div>
    </section>

    <?php get_footer(); ?>
    <?php get_footer_scripts(); ?>
    <script src="<?php echo asset_url('js/events.js'); ?>"></script>
</body>
</html>
