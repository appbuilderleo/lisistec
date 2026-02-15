<?php
// Configure session before starting
require_once 'config/session.php';

// Start session
session_start();

// Include Auth class
require_once 'classes/Auth.php';

// Create Auth instance
$auth = new Auth();

// Handle logout via query param
if (isset($_GET['logout'])) {
    $auth->logout();
    header('Location: index.php');
    exit;
}

// Handle login form submission (server-side)
$loginError = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if ($username && $password) {
        $user = $auth->login($username, $password);
        if ($user) {
            $_SESSION['admin_user'] = $user;
            // Regenerate session ID for security
            session_regenerate_id(true);
            // Redirect to avoid resubmission
            header('Location: index.php');
            exit;
        } else {
            $loginError = 'Credenciais inválidas.';
        }
    } else {
        $loginError = 'Por favor, preencha todos os campos.';
    }
}

// Check if user is logged in
$isLoggedIn = $auth->isAuthenticated();
?>
<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LISIS Admin - Dashboard de Gestão de Imagens</title>
    <link rel="icon" type="image/png" sizes="32x32" href="../logos/favicon_io (4)/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../logos/favicon_io (4)/favicon-16x16.png">
    <link rel="stylesheet" href="css/admin.css?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="css/admin-inbox.css?v=<?php echo time(); ?>">
    <!-- Google Fonts for titles and body -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <style>
        /* Estilos para o modal de login movidos para admin.css */
        body.login-lock { 
            overflow: hidden;
            position: fixed;
            width: 100%;
            height: 100%;
        }

        /* Overrides para garantir a visibilidade do User Modal */
        #userModal { 
            background: transparent !important; 
            z-index: 3000 !important; 
        }
        #userModal.active { 
            display: flex !important; 
            align-items: center !important; 
            justify-content: center !important; 
        }
        #userModal .modal-overlay { 
            display: none !important; 
        }
        #userModal .modal-content { 
            position: relative !important; 
            z-index: 2 !important; 
            width: 95% !important; 
            max-width: 640px !important; 
            opacity: 1 !important; 
            box-shadow: 0 20px 60px rgba(24, 67, 57, 0.3) !important;
            margin: auto !important;
        }
        #userModal .modal-body { 
            display: block !important; 
            padding: 1.5rem !important; 
            max-height: 70vh !important; 
            overflow: auto !important; 
        }
    </style>
</head>
<body>
    <div id="admin-wrapper">
        <!-- Login Modal (design de index.html, sem scroll) -->
        <div id="loginModal" class="modal <?php echo !$isLoggedIn ? 'active' : ''; ?>">
            <div class="modal-content">
                <div class="login-form">
                    <div class="login-header">
                        <img src="../logos/Logotipo Lisis.png" alt="LISIS Logo" class="login-logo">
                    </div>
                    <?php if ($loginError): ?>
                        <div class="alert alert-error"><?php echo htmlspecialchars($loginError, ENT_QUOTES, 'UTF-8'); ?></div>
                    <?php endif; ?>
                    <form id="loginForm" method="post" action="" onsubmit="return true;">
                        <div class="form-group">
                            <label for="username">Utilizador</label>
                            <input type="text" id="username" name="username" required autocomplete="username" value="admin">
                        </div>
                        <div class="form-group">
                            <label for="password">Palavra-passe</label>
                            <input type="password" id="password" name="password" required autocomplete="current-password" value="admin123">
                        </div>
                        <button type="submit" class="login-btn">
                            <i class="fas fa-sign-in-alt"></i> Entrar
                        </button>
                    </form>
                    <div class="login-footer">
                        <a href="../index.php" class="back-to-site" aria-label="Voltar ao site">
                            <i class="fas fa-arrow-left" aria-hidden="true"></i>
                            Voltar ao site
                        </a>
                        <p>© <?php echo date('Y'); ?> LISIS Tecnologias & Serviços</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Admin Dashboard -->
        <div id="adminDashboard" class="dashboard <?php echo !$isLoggedIn ? 'hidden' : ''; ?>">
            <!-- Sidebar -->
            <div class="sidebar">
                <div class="sidebar-header">
                    <img src="../logos/Logotipo Lisis branco.png" alt="LISIS Logo">
                    <h3>Painel Admin</h3>
                </div>
                
                <nav class="sidebar-nav">
                    <ul>
                        <li class="nav-item active">
                            <a href="javascript:void(0)" data-section="gallery">
                                <i class="fas fa-images"></i>
                                Galeria
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void(0)" data-section="upload">
                                <i class="fas fa-cloud-upload-alt"></i>
                                Upload
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void(0)" data-section="categories">
                                <i class="fas fa-folder"></i>
                                Categorias
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void(0)" data-section="events">
                                <i class="fas fa-calendar-alt"></i>
                                Eventos
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void(0)" data-section="inbox">
                                <i class="fas fa-inbox"></i>
                                Inbox
                                <span id="unreadBadge" class="badge" style="display:none;">0</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void(0)" data-section="users">
                                <i class="fas fa-users"></i>
                                Utilizadores
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void(0)" data-section="settings">
                                <i class="fas fa-cog"></i>
                                Configurações
                            </a>
                        </li>
                    </ul>
                </nav>
                
                <div class="sidebar-footer">
                    <button id="logoutBtn" class="logout-btn">
                        <i class="fas fa-sign-out-alt"></i>
                        Sair
                    </button>
                </div>
            </div>
            
            <!-- Main Content -->
            <div class="main-content">
                <!-- Dashboard Header -->
                <div class="dashboard-header">
                    <div class="header-left">
                        <button class="sidebar-toggle">
                            <i class="fas fa-bars"></i>
                        </button>
                        <h1 id="pageTitle">Galeria de Imagens</h1>
                    </div>
                    <div class="header-right">
                        <div class="user-info">
                            <div class="user-avatar">
                                <?php echo $isLoggedIn ? strtoupper(substr($auth->getCurrentUser()['username'], 0, 1)) : 'A'; ?>
                            </div>
                            <span>Bem-vindo, <?php echo $isLoggedIn ? htmlspecialchars($auth->getCurrentUser()['username']) : 'Admin'; ?></span>
                        </div>
                    </div>
                </div>
                
                <!-- Content Wrapper -->
                <div class="content-wrapper">
                    <!-- Gallery Section -->
                    <div id="gallerySection" class="content-section active">
                        <div class="section-header">
                            <div class="section-title">
                                <h2>Galeria de Imagens</h2>
                                <p>Gerir e organizar as imagens do website</p>
                            </div>
                            <button id="addImageBtn" class="btn btn-primary">
                                <i class="fas fa-plus"></i>
                                Adicionar Imagem
                            </button>
                        </div>
                        
                        <div class="filters">
                            <div class="filter-group">
                                <label>Categoria</label>
                                <select id="categoryFilter">
                                    <option value="">Todas as categorias</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label>Ordenar por</label>
                                <select id="sortFilter">
                                    <option value="date-desc">Mais recentes</option>
                                    <option value="date-asc">Mais antigas</option>
                                    <option value="name-asc">Nome A-Z</option>
                                    <option value="name-desc">Nome Z-A</option>
                                </select>
                            </div>
                            <div class="search-group">
                                <input type="text" id="searchInput" placeholder="Pesquisar imagens...">
                                <i class="fas fa-search"></i>
                            </div>
                        </div>
                        
                        <div id="imageGrid" class="image-grid">
                            <!-- Images will be loaded here -->
                        </div>
                        
                        <div id="pagination" class="pagination">
                            <!-- Pagination will be loaded here -->
                        </div>
                    </div>
                    
                    <!-- Upload Section -->
                    <div id="uploadSection" class="content-section">
                        <div class="section-header">
                            <div class="section-title">
                                <h2>Upload de Imagens</h2>
                                <p>Adicionar novas imagens à galeria</p>
                            </div>
                        </div>
                        
                        <div class="upload-container">
                            <div id="uploadArea" class="upload-area">
                                <div class="upload-icon">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                </div>
                                <h3>Arraste as imagens aqui</h3>
                                <p>ou clique para selecionar ficheiros</p>
                                <button id="selectFilesBtn" class="btn btn-primary">
                                    Selecionar Ficheiros
                                </button>
                                <input type="file" id="fileInput" multiple accept="image/*" style="display: none;">
                            </div>
                            
                            <div id="uploadPreview" class="upload-preview">
                                <!-- Preview will be shown here -->
                            </div>
                            
                            <div class="upload-form">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="imageCategory">Categoria</label>
                                        <select id="imageCategory" required>
                                            <option value="">Selecionar categoria</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="imageTags">Tags (separadas por vírgula)</label>
                                        <input type="text" id="imageTags" placeholder="natureza, paisagem, verde">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="imageDescription">Descrição</label>
                                    <textarea id="imageDescription" rows="3" placeholder="Descrição da imagem..."></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="imageWebsiteUrl">URL do Website (opcional)</label>
                                    <input type="url" id="imageWebsiteUrl" placeholder="https://www.exemplo.com">
                                </div>
                            </div>
                            
                            <div class="upload-actions">
                                <button id="clearBtn" class="btn btn-secondary">Limpar</button>
                                <button id="uploadBtn" class="btn btn-primary" disabled>
                                    <i class="fas fa-upload"></i>
                                    Fazer Upload
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Categories Section -->
                    <div id="categoriesSection" class="content-section">
                        <div class="section-header">
                            <div class="section-title">
                                <h2>Gestão de Categorias</h2>
                                <p>Organizar as categorias das imagens</p>
                            </div>
                        </div>
                        
                        <div class="categories-container">
                            <div class="add-category">
                                <h3>Adicionar Nova Categoria</h3>
                                <form id="categoryForm">
                                    <div class="form-row">
                                        <div class="form-group">
                                            <input type="text" id="newCategoryName" placeholder="Nome da categoria" required>
                                        </div>
                                        <button type="submit" class="btn btn-primary">
                                            <i class="fas fa-plus"></i>
                                            Adicionar
                                        </button>
                                    </div>
                                </form>
                            </div>
                            
                            <div id="categoriesList" class="category-items">
                                <!-- Categories will be loaded here -->
                            </div>
                        </div>
                    </div>
                    
                    <!-- Events Section -->
                    <div id="eventsSection" class="content-section">
                        <div class="section-header">
                            <div class="section-title">
                                <h2>Gestão de Eventos</h2>
                                <p>Criar, editar e gerir eventos da empresa</p>
                            </div>
                            <button id="addEventBtn" class="btn btn-primary">
                                <i class="fas fa-plus"></i>
                                Adicionar Evento
                            </button>
                        </div>
                        
                        <div class="events-filters-bar">
                            <div class="filter-group">
                                <label>Filtrar por</label>
                                <select id="eventStatusFilter">
                                    <option value="all">Todos os eventos</option>
                                    <option value="upcoming">Próximos</option>
                                    <option value="past">Passados</option>
                                    <option value="featured">Em destaque</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label>Categoria</label>
                                <select id="eventCategoryFilter">
                                    <option value="">Todas as categorias</option>
                                    <!-- Categories will be loaded dynamically -->
                                </select>
                            </div>
                            <div class="filter-group">
                                <label>Ordenar por</label>
                                <select id="eventSortFilter">
                                    <option value="date-desc">Mais recentes</option>
                                    <option value="date-asc">Mais antigos</option>
                                    <option value="title-asc">Título A-Z</option>
                                </select>
                            </div>
                        </div>
                        
                        <div id="eventsList" class="events-grid-container">
                            <!-- Events will be loaded here -->
                        </div>
                    </div>
                    
                    <!-- Users Section -->
                    <div id="usersSection" class="content-section">
                        <div class="section-header">
                            <div class="section-title">
                                <h2>Gestão de Utilizadores</h2>
                                <p>Criar, editar, ativar/desativar e eliminar utilizadores</p>
                            </div>
                            <button id="addUserBtn" class="btn btn-primary">
                                <i class="fas fa-user-plus"></i>
                                Adicionar Utilizador
                            </button>
                        </div>
                        <div class="categories-container">
                            <div id="usersList" class="category-items">
                                <!-- Users will be loaded here -->
                            </div>
                        </div>
                    </div>
                    
                    <!-- Inbox Section -->
                    <div id="inboxSection" class="content-section">
                        <div class="section-header">
                            <div class="section-title">
                                <h2>Inbox - Mensagens de Contacto</h2>
                                <p>Gerir mensagens recebidas através do formulário de contacto</p>
                            </div>
                            <div class="inbox-stats">
                                <span class="stat-item">
                                    <i class="fas fa-envelope"></i>
                                    <strong id="totalMessages">0</strong> Total
                                </span>
                                <span class="stat-item unread">
                                    <i class="fas fa-envelope-open"></i>
                                    <strong id="unreadMessages">0</strong> Não lidas
                                </span>
                            </div>
                        </div>
                        
                        <div class="inbox-filters">
                            <div class="filter-group">
                                <label>Status:</label>
                                <select id="statusFilter">
                                    <option value="all">Todas</option>
                                    <option value="unread" selected>Não lidas</option>
                                    <option value="read">Lidas</option>
                                    <option value="archived">Arquivadas</option>
                                </select>
                            </div>
                            <div class="search-group">
                                <input type="text" id="messageSearch" placeholder="Pesquisar por nome ou email...">
                                <i class="fas fa-search"></i>
                            </div>
                        </div>
                        
                        <div id="messagesList" class="messages-list">
                            <!-- Messages will be loaded here -->
                        </div>
                    </div>
                    
                    <!-- Settings Section -->
                    <div id="settingsSection" class="content-section">
                        <div class="section-header">
                            <div class="section-title">
                                <h2>Configurações</h2>
                                <p>Configurar o sistema de gestão de imagens</p>
                            </div>
                        </div>
                        
                        <div class="settings-container">
                            <div class="settings-group">
                                <h3>Configurações de Upload</h3>
                                <div class="setting-item">
                                    <label for="maxFileSize">Tamanho máximo do ficheiro (MB)</label>
                                    <input type="number" id="maxFileSize" min="1" max="50" value="10">
                                </div>
                                <div class="setting-item">
                                    <label for="imagesPerPage">Imagens por página</label>
                                    <input type="number" id="imagesPerPage" min="6" max="100" value="24">
                                </div>
                                <div class="setting-item">
                                    <label for="compressionQuality">Qualidade de compressão: <span id="qualityValue">85%</span></label>
                                    <input type="range" id="compressionQuality" min="10" max="100" value="85">
                                </div>
                                <div class="setting-item">
                                    <label>Formatos permitidos</label>
                                    <div class="checkbox-group">
                                        <label><input type="checkbox" value="jpg" checked> JPG</label>
                                        <label><input type="checkbox" value="png" checked> PNG</label>
                                        <label><input type="checkbox" value="gif" checked> GIF</label>
                                        <label><input type="checkbox" value="webp" checked> WebP</label>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="settings-actions">
                                <button id="saveSettingsBtn" class="btn btn-primary">
                                    <i class="fas fa-save"></i>
                                    Guardar Configurações
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Image Modal -->
    <div id="imageModal" class="modal">
        <div class="modal-overlay"></div>
        <div class="modal-content image-modal-content">
            <div class="modal-header">
                <div class="modal-title-section">
                    <i class="fas fa-image modal-icon"></i>
                    <h3 id="modalImageTitle">Detalhes da Imagem</h3>
                </div>
                <button class="modal-close" title="Fechar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="image-preview-section">
                    <div class="image-preview-container">
                        <img id="modalImage" src="" alt="">
                        <div class="image-info-overlay">
                            <div class="image-size" id="imageSizeInfo"></div>
                            <div class="image-date" id="imageDateInfo"></div>
                        </div>
                    </div>
                </div>
                <div class="image-details-section">
                    <div class="details-header">
                        <h4><i class="fas fa-edit"></i> Editar Informações</h4>
                    </div>
                    <form id="imageEditForm" class="image-edit-form">
                        <div class="form-row">
                            <div class="form-group full-width">
                                <label for="editImageName">
                                    <i class="fas fa-file-image"></i> Nome do Arquivo
                                </label>
                                <input type="text" id="editImageName" placeholder="Digite o nome da imagem">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="editImageCategory">
                                    <i class="fas fa-folder"></i> Categoria
                                </label>
                                <select id="editImageCategory"></select>
                            </div>
                            <div class="form-group">
                                <label for="editImageTags">
                                    <i class="fas fa-tags"></i> Tags
                                </label>
                                <input type="text" id="editImageTags" placeholder="web, design, mobile">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group full-width">
                                <label for="editImageDescription">
                                    <i class="fas fa-align-left"></i> Descrição
                                </label>
                                <textarea id="editImageDescription" rows="4" placeholder="Descreva a imagem e seu contexto..."></textarea>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group full-width">
                                <label for="editImageWebsiteUrl">
                                    <i class="fas fa-external-link-alt"></i> URL do Website (opcional)
                                </label>
                                <input type="url" id="editImageWebsiteUrl" placeholder="https://www.exemplo.com">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <div class="footer-left">
                    <button class="btn btn-danger" id="deleteImageBtn">
                        <i class="fas fa-trash-alt"></i> Eliminar Imagem
                    </button>
                </div>
                <div class="footer-right">
                    <button class="btn btn-secondary" onclick="adminDashboard.closeModal()">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button class="btn btn-primary" id="saveImageBtn">
                        <i class="fas fa-save"></i> Salvar Alterações
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- User Modal -->
    <div id="userModal" class="modal" style="background: transparent;">
        <div class="modal-overlay"></div>
        <div class="modal-content" style="max-width: 600px; width: 95%; position: relative; z-index: 11;">
            <div class="modal-header">
                <div class="modal-title-section">
                    <i class="fas fa-user modal-icon"></i>
                    <h3 id="userModalTitle">Utilizador</h3>
                </div>
                <button class="modal-close" title="Fechar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body" style="display:block; padding: 1.5rem;">
                <input type="hidden" id="editUserId">
                <div class="form-row">
                    <div class="form-group">
                        <label for="userFullName"><i class="fas fa-id-card"></i> Nome completo</label>
                        <input type="text" id="userFullName" placeholder="Nome e apelido" required>
                    </div>
                    <div class="form-group">
                        <label for="userUsername"><i class="fas fa-user"></i> Username</label>
                        <input type="text" id="userUsername" placeholder="nome.utilizador" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="userEmail"><i class="fas fa-envelope"></i> Email</label>
                        <input type="email" id="userEmail" placeholder="email@dominio.com" required>
                    </div>
                    <div class="form-group">
                        <label for="userPassword"><i class="fas fa-key"></i> Palavra-passe</label>
                        <input type="password" id="userPassword" placeholder="Deixe vazio para não alterar">
                    </div>
                </div>
                <div class="form-group" style="margin-top: .5rem;">
                    <label><input type="checkbox" id="userActive" checked> Utilizador ativo</label>
                </div>
            </div>
            <div class="modal-footer">
                <div class="footer-left"></div>
                <div class="footer-right">
                    <button class="btn btn-secondary" onclick="adminDashboard.closeModal()">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button id="saveUserBtn" class="btn btn-primary">
                        <i class="fas fa-save"></i> Guardar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Event Modal -->
    <div id="eventModal" class="modal">
        <div class="modal-overlay"></div>
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <div class="modal-title-section">
                    <i class="fas fa-calendar-alt modal-icon"></i>
                    <h3 id="eventModalTitle">Adicionar Evento</h3>
                </div>
                <button class="modal-close" title="Fechar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="editEventId">
                <div class="form-row">
                    <div class="form-group" style="flex: 2;">
                        <label for="eventTitle"><i class="fas fa-heading"></i> Título do Evento *</label>
                        <input type="text" id="eventTitle" placeholder="Nome do evento" required>
                    </div>
                    <div class="form-group">
                        <label for="eventCategory"><i class="fas fa-tag"></i> Categoria *</label>
                        <select id="eventCategory" required>
                            <option value="">Selecionar categoria...</option>
                            <!-- Categories will be loaded dynamically -->
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="eventDescription"><i class="fas fa-align-left"></i> Descrição *</label>
                    <textarea id="eventDescription" rows="2" placeholder="Descrição detalhada do evento..." required></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="eventDate"><i class="fas fa-calendar"></i> Data *</label>
                        <input type="date" id="eventDate" required>
                    </div>
                    <div class="form-group">
                        <label for="eventTime"><i class="fas fa-clock"></i> Horário</label>
                        <input type="time" id="eventTime">
                    </div>
                    <div class="form-group">
                        <label for="eventLocation"><i class="fas fa-map-marker-alt"></i> Local</label>
                        <input type="text" id="eventLocation" placeholder="Local do evento">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group" style="flex: 2;">
                        <label for="eventImagePath"><i class="fas fa-image"></i> Caminho da Imagem</label>
                        <input type="text" id="eventImagePath" placeholder="logos/evento.png">
                    </div>
                    <div class="form-group" style="display: flex; align-items: flex-end;">
                        <button type="button" id="uploadEventImageBtn" class="btn btn-secondary" style="width: 100%;">
                            <i class="fas fa-upload"></i> Carregar
                        </button>
                    </div>
                </div>
                <div class="form-group" style="margin-top: 0.5rem; margin-bottom: 0.5rem;">
                    <label style="display: flex; align-items: center; cursor: pointer;">
                        <input type="checkbox" id="eventFeatured" style="margin-right: 0.5rem;">
                        <i class="fas fa-star" style="color: #FFD700; margin-right: 0.3rem;"></i>
                        <span>Marcar como evento em destaque</span>
                    </label>
                </div>
            </div>
            <div class="modal-footer">
                <div class="footer-left">
                    <button id="deleteEventBtn" class="btn btn-danger" style="display: none;">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
                <div class="footer-right">
                    <button class="btn btn-secondary modal-close">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button id="saveEventBtn" class="btn btn-primary">
                        <i class="fas fa-save"></i> Guardar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Message Modal -->
    <div id="messageModal" class="modal">
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title-section">
                    <i class="fas fa-envelope-open modal-icon"></i>
                    <h3>Mensagem de Contacto</h3>
                </div>
                <button class="modal-close" title="Fechar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="currentMessageId">
                <div class="message-details">
                    <div class="message-header-info">
                        <div class="info-row">
                            <strong><i class="fas fa-user"></i> Nome:</strong>
                            <span id="msgNome"></span>
                        </div>
                        <div class="info-row">
                            <strong><i class="fas fa-envelope"></i> Email:</strong>
                            <a id="msgEmail" href=""></a>
                        </div>
                        <div class="info-row">
                            <strong><i class="fas fa-building"></i> Empresa:</strong>
                            <span id="msgEmpresa"></span>
                        </div>
                        <div class="info-row">
                            <strong><i class="fas fa-phone"></i> Telefone:</strong>
                            <a id="msgTelefone" href=""></a>
                        </div>
                        <div class="info-row">
                            <strong><i class="fas fa-cogs"></i> Serviço:</strong>
                            <span id="msgServico"></span>
                        </div>
                        <div class="info-row">
                            <strong><i class="fas fa-clock"></i> Data:</strong>
                            <span id="msgData"></span>
                        </div>
                    </div>
                    <div class="message-content">
                        <h4><i class="fas fa-comment"></i> Mensagem:</h4>
                        <p id="msgMensagem"></p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="footer-left">
                    <button id="deleteMessageBtn" class="btn btn-danger">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
                <div class="footer-right">
                    <button id="archiveMessageBtn" class="btn btn-secondary">
                        <i class="fas fa-archive"></i> Arquivar
                    </button>
                    <button id="markReadBtn" class="btn btn-primary">
                        <i class="fas fa-check"></i> Marcar como lida
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>window.__USE_AJAX_LOGIN__ = false;</script>
    <script src="js/admin.js?v=<?php echo time(); ?>"></script>
    <script src="js/admin-events.js?v=<?php echo time(); ?>"></script>
    <script src="js/admin-inbox.js?v=<?php echo time(); ?>"></script>
    <script>
        // Bloqueia scroll do body quando o login estiver ativo
        document.addEventListener('DOMContentLoaded', function() {
            const loginModal = document.getElementById('loginModal');
            function syncLock() {
                if (loginModal && loginModal.classList.contains('active')) {
                    document.body.classList.add('login-lock');
                } else {
                    document.body.classList.remove('login-lock');
                }
            }
            syncLock();
            if (loginModal) {
                new MutationObserver(syncLock).observe(loginModal, { attributes: true, attributeFilter: ['class'] });
            }
        });
    </script>
</body>
</html>
