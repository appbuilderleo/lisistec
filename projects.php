<?php require_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <?php get_head('Projetos - LISIS', ['css/events.css', 'css/projects.css']); ?>
</head>
<body>
    <?php get_navbar(); ?>

    <header class="page-header">
        <div class="container">
            <div class="header-content">
                <div class="header-icon">
                    <i class="fas fa-briefcase"></i>
                </div>
                <h1>Projetos</h1>
                <p>Conheça alguns dos nossos trabalhos</p>
            </div>
        </div>
        <div class="header-decoration">
            <div class="decoration-circle circle-1"></div>
            <div class="decoration-circle circle-2"></div>
            <div class="decoration-circle circle-3"></div>
        </div>
    </header>

    <main>
        <!-- Websites Section -->
        <section class="websites-section">
            <div class="container">
                <div class="section-header">
                    <h2>Projectos de Websites</h2>
                    <p>Explore alguns dos websites que criámos — design moderno, performance e segurança, prontos para escalar o seu negócio.</p>
                </div>
                <div id="websitesFilters" class="websites-filters" style="display:none;"></div>
                <div id="websitesLoading" class="loading">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>A carregar websites...</p>
                </div>
                <div id="websitesGrid" class="projects-grid" style="display:none;"></div>
                <div id="noWebsites" class="no-projects" style="display:none;">
                    <i class="fas fa-globe"></i>
                    <h3>Nenhum website disponível no momento</h3>
                    <p>Estamos a preparar uma seleção de websites para apresentar em breve.</p>
                </div>
                <div id="websitesLoadMoreContainer" class="load-more-container" style="display:none;">
                    <button id="websitesLoadMoreBtn" class="load-more-btn">Carregar mais websites</button>
                </div>
            </div>
        </section>

        <section class="projects-gallery">
            <div class="container">
                <div class="section-header">
                    <h2>Outros Projetos</h2>
                    <p>Veja imagens e detalhes dos nossos trabalhos em diversas áreas.</p>
                </div>
                <div id="projectsLoading" class="loading">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>A carregar projetos...</p>
                </div>

                <div id="projectsGrid" class="projects-grid" style="display:none;"></div>

                <div id="noProjects" class="no-projects" style="display:none;">
                    <i class="fas fa-folder-open"></i>
                    <h3>Nenhum projeto disponível no momento</h3>
                    <p>Estamos a preparar uma seleção de projetos para apresentar em breve.</p>
                    <a class="cta-button" href="contact.php">Iniciar um Projeto</a>
                </div>
            </div>
        </section>
    </main>

    <?php get_footer(); ?>
    <?php get_footer_scripts(); ?>
    <script src="<?php echo asset_url('js/projects.js'); ?>"></script>
</body>
</html>
