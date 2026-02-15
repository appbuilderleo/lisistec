<?php require_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <?php get_head('Galeria - LISIS', ['css/events.css', 'css/gallery.css']); ?>
</head>
<body>
    <?php get_navbar(); ?>

    <header class="page-header">
        <div class="container">
            <div class="header-content">
                <div class="header-icon">
                    <i class="fas fa-images"></i>
                </div>
                <h1>Galeria</h1>
                <p>Imagens dos nossos trabalhos e parcerias</p>
            </div>
        </div>
        <div class="header-decoration">
            <div class="decoration-circle circle-1"></div>
            <div class="decoration-circle circle-2"></div>
            <div class="decoration-circle circle-3"></div>
        </div>
    </header>

    <main>
        <section class="gallery-section">
            <div class="container">
                <!-- Filtros -->
                <div class="gallery-filters">
                    <button class="filter-btn active" data-filter="all">Todos</button>
                    <button class="filter-btn" data-filter="projetos">Projetos</button>
                    <button class="filter-btn" data-filter="servicos">Serviços</button>
                    <button class="filter-btn" data-filter="parceiros">Parceiros</button>
                    <button class="filter-btn" data-filter="logos">Logos</button>
                </div>

                <!-- Estados -->
                <div id="galleryLoading" class="loading">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>A carregar imagens...</p>
                </div>
                <div id="noImages" class="no-images" style="display:none;">
                    <i class="fas fa-images"></i>
                    <h3>Nenhuma imagem encontrada</h3>
                    <p>Tente outro filtro ou volte mais tarde.</p>
                </div>

                <!-- Grelha -->
                <div id="galleryGrid" class="gallery-grid"></div>

                <!-- Load more -->
                <div class="load-more-container">
                    <button id="loadMoreBtn" class="load-more-btn">Carregar mais</button>
                </div>
            </div>
        </section>

        <!-- Modal -->
        <div id="imageModal" class="image-modal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button id="modalClose" class="modal-close" aria-label="Fechar"><i class="fas fa-times"></i></button>
                <div class="modal-image-container">
                    <img id="modalImage" src="" alt="">
                </div>
                <div class="modal-info">
                    <h3 id="modalTitle"></h3>
                    <p id="modalDescription"></p>
                    <div class="modal-meta">
                        <span id="modalCategory"></span>
                        <span id="modalDate"></span>
                    </div>
                </div>
                <div class="modal-nav">
                    <button id="modalPrev" class="modal-nav-btn" aria-label="Anterior"><i class="fas fa-chevron-left"></i></button>
                    <button id="modalNext" class="modal-nav-btn" aria-label="Seguinte"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
        </div>
    </main>

    <?php get_footer(); ?>
    <?php get_footer_scripts(); ?>
    <script src="<?php echo asset_url('js/gallery.js'); ?>"></script>
</body>
</html>
