// LISIS Admin Dashboard JavaScript

class AdminDashboard {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'gallery';
        this.images = [];
        this.categories = [];
        this.users = [];
        this.settings = {
            maxFileSize: 10,
            allowedFormats: ['jpg', 'png', 'gif', 'webp'],
            imagesPerPage: 24,
            compressionQuality: 85
        };
        this.currentPage = 1;
        this.selectedFiles = [];
        this.apiBase = 'api/';
        this.baseUrl = 'uploads/images/';
        
        this.init();
    }

    init() {
        // Check if already logged in (server-side session)
        const adminDashboard = document.getElementById('adminDashboard');
        const loginModal = document.getElementById('loginModal');
        
        this.setupEventListeners();
        
        // Server-side PHP already determined auth state via classes
        // If dashboard is NOT hidden, user is authenticated
        if (adminDashboard && !adminDashboard.classList.contains('hidden')) {
            console.log('User authenticated via server-side session');
            this.showDashboard();
        } else {
            // Not authenticated, show login
            console.log('User not authenticated, showing login');
            this.showLogin();
        }
    }

    async checkAuthentication() {
        try {
            const response = await fetch(this.apiBase + 'auth.php', {
                credentials: 'same-origin'
            });
            const data = await response.json();
            
            if (data.authenticated) {
                this.currentUser = data.user;
                this.showDashboard();
            } else {
                this.showLogin();
            }
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
            this.showLogin();
        }
    }

    showLogin() {
        document.getElementById('loginModal').classList.add('active');
        document.getElementById('adminDashboard').classList.add('hidden');
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            const useAjax = window.__USE_AJAX_LOGIN__ === true;
            if (useAjax) {
                loginForm.addEventListener('submit', (e) => {
                    if (loginForm.dataset.nativeSubmit === '1') {
                        delete loginForm.dataset.nativeSubmit;
                        return;
                    }
                    const username = document.getElementById('username').value;
                    const password = document.getElementById('password').value;
                    if (username && password) {
                        e.preventDefault();
                        this.handleLogin().then(success => {
                            if (!success) {
                                loginForm.dataset.nativeSubmit = '1';
                                loginForm.submit();
                            }
                        }).catch(() => {
                            loginForm.dataset.nativeSubmit = '1';
                            loginForm.submit();
                        });
                    }
                });
            }
        }

        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }

        // Navigation - direct event binding
        const navLinks = document.querySelectorAll('.nav-item a[data-section]');
        console.log('Found nav links:', navLinks.length);
        navLinks.forEach((link, index) => {
            console.log(`Setting up link ${index}:`, link.dataset.section);
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const section = link.dataset.section;
                console.log('Navigation clicked, section:', section);
                if (section) {
                    this.switchSection(section);
                }
            });
        });

        // Sidebar toggle for mobile
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                document.querySelector('.sidebar').classList.toggle('active');
            });
        }

        // Upload functionality
        this.setupUploadListeners();

        // Gallery functionality
        this.setupGalleryListeners();

        // Categories functionality
        this.setupCategoriesListeners();

        // Settings functionality
        this.setupSettingsListeners();

        // Modal functionality
        this.setupModalListeners();

        // Users functionality
        this.setupUsersListeners();
    }

    setupUploadListeners() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const selectFilesBtn = document.getElementById('selectFilesBtn');
        const uploadBtn = document.getElementById('uploadBtn');
        const clearBtn = document.getElementById('clearBtn');

        if (selectFilesBtn && fileInput) {
            // File selection
            selectFilesBtn.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', (e) => this.handleFileSelect(e.target.files));
        }

        if (uploadArea) {
            // Drag and drop
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                this.handleFileSelect(e.dataTransfer.files);
            });
        }

        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => this.handleUpload());
        }
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearUpload());
        }
    }

    setupGalleryListeners() {
        // Filters
        const categoryFilter = document.getElementById('categoryFilter');
        const sortFilter = document.getElementById('sortFilter');
        const searchInput = document.getElementById('searchInput');
        const addImageBtn = document.getElementById('addImageBtn');

        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.filterImages());
        }
        if (sortFilter) {
            sortFilter.addEventListener('change', () => this.filterImages());
        }
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterImages());
        }
        if (addImageBtn) {
            addImageBtn.addEventListener('click', () => {
                this.switchSection('upload');
            });
        }
    }

    setupCategoriesListeners() {
        const categoryForm = document.getElementById('categoryForm');
        if (categoryForm) {
            categoryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addCategory();
            });
        }
    }

    setupSettingsListeners() {
        const compressionQuality = document.getElementById('compressionQuality');
        const saveSettingsBtn = document.getElementById('saveSettingsBtn');
        const qualityValue = document.getElementById('qualityValue');

        if (compressionQuality && qualityValue) {
            compressionQuality.addEventListener('input', (e) => {
                qualityValue.textContent = e.target.value + '%';
            });
        }

        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => {
                this.saveSettings();
            });
        }
    }

    setupModalListeners() {
        // Close modals
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });

        // Click outside to close (ignore login modal to avoid blank screen)
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (modal.id === 'loginModal') return; // do not close login modal on outside click
                if (e.target === modal) this.closeModal();
            });
        });

        // Image modal actions
        const saveImageBtn = document.getElementById('saveImageBtn');
        const deleteImageBtn = document.getElementById('deleteImageBtn');
        
        if (saveImageBtn) {
            saveImageBtn.addEventListener('click', () => this.saveImageChanges());
        }
        if (deleteImageBtn) {
            deleteImageBtn.addEventListener('click', () => this.deleteImage());
        }
    }

    async handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
            this.showAlert('Por favor, preencha todos os campos', 'error');
            return false;
        }

        try {
            const response = await fetch(this.apiBase + 'auth.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                this.currentUser = data.user;
                // Recarrega para sincronizar sessão de servidor e evitar interferência de extensões
                window.location.reload();
                return true;
            } else {
                this.showAlert(data.error || 'Credenciais inválidas', 'error');
                return false;
            }
        } catch (error) {
            console.error('Erro no login:', error);
            this.showAlert('Erro de conexão. Tente novamente.', 'error');
            return false;
        }
    }

    async handleLogout() {
        try {
            await fetch(this.apiBase + 'auth.php', {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Erro no logout:', error);
        }
        
        this.currentUser = null;
        document.getElementById('loginModal').classList.add('active');
        document.getElementById('adminDashboard').classList.add('hidden');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }

    showDashboard() {
        console.log('showDashboard() called');
        const loginModal = document.getElementById('loginModal');
        const adminDashboard = document.getElementById('adminDashboard');
        
        console.log('loginModal element:', loginModal);
        console.log('adminDashboard element:', adminDashboard);
        
        if (loginModal) {
            console.log('Removing active class from loginModal');
            loginModal.classList.remove('active');
        }
        if (adminDashboard) {
            console.log('Removing hidden class from adminDashboard');
            console.log('adminDashboard classes before:', adminDashboard.className);
            adminDashboard.classList.remove('hidden');
            console.log('adminDashboard classes after:', adminDashboard.className);
        }
        
        this.loadCategories();
        this.loadImages();
        this.loadSettings();
        // Pre-load users silently
        this.loadUsers();
    }

    switchSection(section) {
        console.log('Switching to section:', section);
        
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        const navLink = document.querySelector(`[data-section="${section}"]`);
        if (navLink) {
            navLink.closest('.nav-item').classList.add('active');
        }

        // Update content
        document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
        const targetSection = document.getElementById(`${section}Section`);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update page title
        const titles = {
            gallery: 'Galeria de Imagens',
            upload: 'Upload de Imagens',
            categories: 'Gestão de Categorias',
            events: 'Gestão de Eventos',
            settings: 'Configurações',
            users: 'Gestão de Utilizadores'
        };
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle && titles[section]) {
            pageTitle.textContent = titles[section];
        }

        this.currentSection = section;

        // Lazy load when entering section
        if (section === 'users') {
            this.loadUsers();
        } else if (section === 'events' && window.eventsManager) {
            window.eventsManager.loadEvents();
        } else if (section === 'inbox') {
            // Initialize InboxManager only when user opens Inbox and is authenticated
            if (!window.inboxManager && window.InboxManager) {
                window.inboxManager = new window.InboxManager();
            } else if (window.inboxManager && typeof window.inboxManager.loadMessages === 'function') {
                window.inboxManager.loadMessages();
            }
        }
    }

    async loadUsers() {
        try {
            const response = await fetch(this.apiBase + 'users.php');
            const data = await response.json();
            if (Array.isArray(data)) {
                this.users = data;
                this.renderUsers();
            } else if (data.error) {
                this.showAlert(data.error, 'error');
            }
        } catch (error) {
            console.error('Erro ao carregar utilizadores:', error);
            this.showAlert('Erro ao carregar utilizadores', 'error');
        }
    }

    renderUsers() {
        const list = document.getElementById('usersList');
        if (!list) return;
        if (!this.users || this.users.length === 0) {
            list.innerHTML = '<p>Nenhum utilizador encontrado.</p>';
            return;
        }

        list.innerHTML = this.users.map(u => `
            <div class="category-item">
                <div class="category-info">
                    <h4>${u.full_name || u.username}</h4>
                    <span>${u.username} • ${u.email || ''} • ${u.is_active ? 'Ativo' : 'Inativo'}</span>
                </div>
                <div class="category-actions">
                    <button class="btn btn-small ${u.is_active ? 'btn-secondary' : 'btn-primary'}" onclick="toggleUserActive(${u.id}, ${u.is_active ? 0 : 1})">
                        <i class="fas ${u.is_active ? 'fa-toggle-off' : 'fa-toggle-on'}"></i>
                    </button>
                    <button class="btn btn-small btn-secondary" onclick="editUser(${u.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-small btn-danger" onclick="deleteUser(${u.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    setupUsersListeners() {
        const addUserBtn = document.getElementById('addUserBtn');
        const saveUserBtn = document.getElementById('saveUserBtn');
        if (addUserBtn) {
            addUserBtn.addEventListener('click', () => this.openUserModal());
        }
        if (saveUserBtn) {
            saveUserBtn.addEventListener('click', () => this.saveUser());
        }
    }

    openUserModal(user = null) {
        // Reset fields
        const idInput = document.getElementById('editUserId');
        const fullName = document.getElementById('userFullName');
        const username = document.getElementById('userUsername');
        const email = document.getElementById('userEmail');
        const password = document.getElementById('userPassword');
        const active = document.getElementById('userActive');

        if (idInput) idInput.value = user ? user.id : '';
        if (fullName) fullName.value = user ? (user.full_name || '') : '';
        if (username) username.value = user ? (user.username || '') : '';
        if (email) email.value = user ? (user.email || '') : '';
        if (password) password.value = '';
        if (active) active.checked = user ? !!user.is_active : true;

        // Close other modals to avoid stacked overlays
        document.querySelectorAll('.modal').forEach(m => {
            if (m.id !== 'userModal' && m.id !== 'loginModal') {
                m.classList.remove('active');
                m.style.display = '';
            }
        });

        const modal = document.getElementById('userModal');
        if (modal) {
            // Ensure class-based activation
            modal.classList.add('active');
            // Fallback inline centering in case CSS cache misses
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            const overlay = modal.querySelector('.modal-overlay');
            if (overlay) overlay.style.display = 'none';
            const content = modal.querySelector('.modal-content');
            if (content) content.style.zIndex = '2';
            modal.scrollTop = 0;
            document.body.style.overflow = 'hidden';
        }
    }

    async saveUser() {
        const id = document.getElementById('editUserId').value;
        const full_name = document.getElementById('userFullName').value.trim();
        const username = document.getElementById('userUsername').value.trim();
        const email = document.getElementById('userEmail').value.trim();
        const password = document.getElementById('userPassword').value; // optional in edit
        const is_active = document.getElementById('userActive').checked ? 1 : 0;

        if (!username || !full_name || !email || (!id && !password)) {
            this.showAlert('Preencha os campos obrigatórios. Palavra-passe é obrigatória na criação.', 'error');
            return;
        }

        const payload = { id: id ? parseInt(id) : undefined, full_name, username, email, is_active };
        if (password) payload.password = password;

        try {
            const method = id ? 'PUT' : 'POST';
            const response = await fetch(this.apiBase + 'users.php' + (method === 'PUT' ? '' : ''), {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (data.success) {
                this.closeModal();
                await this.loadUsers();
                this.showAlert(id ? 'Utilizador atualizado com sucesso!' : 'Utilizador criado com sucesso!', 'success');
            } else {
                this.showAlert(data.error || 'Erro ao salvar utilizador', 'error');
            }
        } catch (error) {
            console.error('Erro ao salvar utilizador:', error);
            this.showAlert('Erro de conexão', 'error');
        }
    }

    async editUser(id) {
        try {
            const response = await fetch(this.apiBase + 'users.php?id=' + id);
            const user = await response.json();
            if (user && user.id) {
                this.openUserModal(user);
            } else {
                this.showAlert(user.error || 'Utilizador não encontrado', 'error');
            }
        } catch (error) {
            console.error('Erro ao carregar utilizador:', error);
            this.showAlert('Erro ao carregar utilizador', 'error');
        }
    }

    async deleteUser(id) {
        if (!confirm('Tem certeza que deseja eliminar este utilizador?')) return;
        try {
            const response = await fetch(this.apiBase + 'users.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            const data = await response.json();
            if (data.success) {
                await this.loadUsers();
                this.showAlert('Utilizador eliminado com sucesso!', 'success');
            } else {
                this.showAlert(data.error || 'Erro ao eliminar utilizador', 'error');
            }
        } catch (error) {
            console.error('Erro ao eliminar utilizador:', error);
            this.showAlert('Erro de conexão', 'error');
        }
    }

    async toggleUserActive(id, newState) {
        try {
            const response = await fetch(this.apiBase + 'users.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, is_active: newState })
            });
            const data = await response.json();
            if (data.success) {
                await this.loadUsers();
                this.showAlert('Estado do utilizador atualizado', 'success');
            } else {
                this.showAlert(data.error || 'Erro ao atualizar estado', 'error');
            }
        } catch (error) {
            console.error('Erro ao atualizar estado do utilizador:', error);
            this.showAlert('Erro de conexão', 'error');
        }
    }

    async loadCategories() {
        try {
            const response = await fetch(this.apiBase + 'categories.php');
            const data = await response.json();
            
            if (Array.isArray(data)) {
                this.categories = data;
                this.renderCategories();
                this.updateCategorySelects();
            }
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
            this.showAlert('Erro ao carregar categorias', 'error');
        }
    }

    async loadImages() {
        try {
            const params = new URLSearchParams({
                page: this.currentPage,
                limit: this.settings.imagesPerPage
            });

            const categoryFilter = document.getElementById('categoryFilter');
            const searchInput = document.getElementById('searchInput');
            const sortFilter = document.getElementById('sortFilter');

            if (categoryFilter && categoryFilter.value) {
                // categoryFilter holds slug values
                params.append('category', categoryFilter.value);
            }
            if (searchInput && searchInput.value) {
                params.append('search', searchInput.value);
            }
            if (sortFilter && sortFilter.value) {
                const sortMap = {
                    'date-desc': 'upload_date DESC',
                    'date-asc': 'upload_date ASC',
                    'name-asc': 'original_name ASC',
                    'name-desc': 'original_name DESC'
                };
                params.append('sort', sortMap[sortFilter.value] || 'upload_date DESC');
            }

            const response = await fetch(this.apiBase + 'images.php?' + params);
            const data = await response.json();
            
            if (data.images) {
                this.images = data.images;
                console.log('Imagens carregadas da API:', this.images.length);
                this.renderGallery();
                this.renderPagination(data.total);
            } else {
                console.warn('Nenhuma imagem retornada pela API');
            }
        } catch (error) {
            console.error('Erro ao carregar imagens:', error);
            this.showAlert('Erro ao carregar imagens', 'error');
        }
    }

    updateCategoryCounts() {
        this.categories.forEach(category => {
            category.count = this.images.filter(img => img.category === category.slug).length;
        });
    }

    renderGallery() {
        const grid = document.getElementById('imageGrid');
        
        if (!grid) {
            console.error('Grid não encontrado!');
            return;
        }
        
        if (!this.images || this.images.length === 0) {
            grid.innerHTML = `
                <div class="no-images">
                    <i class="fas fa-images" style="font-size: 3rem; color: var(--rock-blue); margin-bottom: 1rem;"></i>
                    <h3>Nenhuma imagem encontrada</h3>
                    <p>Adicione algumas imagens para começar.</p>
                </div>
            `;
            return;
        }

        console.log('Renderizando galeria com', this.images.length, 'imagens');
        
        grid.innerHTML = this.images.map(image => `
            <div class="image-card" data-id="${image.id}">
                <img src="${image.file_path}" alt="${image.title || image.filename}" onerror="console.error('Erro ao carregar:', '${image.file_path}'); this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbTwvdGV4dD48L3N2Zz4='">
                <div class="image-info">
                    <h4>${image.title || image.filename}</h4>
                    <div class="image-meta">
                        <span class="image-category">${image.category_name || 'Sem categoria'}</span>
                        <span>${this.formatFileSize(parseInt(image.file_size))}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Add click listeners to image cards
        const cards = document.querySelectorAll('.image-card');
        console.log('Adicionando listeners a', cards.length, 'cards');
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const imageId = parseInt(card.dataset.id);
                this.openImageModal(imageId);
            });
        });
    }

    getFilteredImages() {
        let filtered = [...this.images];

        // Category filter
        const categoryFilter = document.getElementById('categoryFilter').value;
        if (categoryFilter) {
            filtered = filtered.filter(img => img.category === categoryFilter);
        }

        // Search filter
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(img => 
                img.name.toLowerCase().includes(searchTerm) ||
                img.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                img.description.toLowerCase().includes(searchTerm)
            );
        }

        // Sort
        const sortBy = document.getElementById('sortFilter').value;
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'date-desc':
                    return new Date(b.uploadDate) - new Date(a.uploadDate);
                case 'date-asc':
                    return new Date(a.uploadDate) - new Date(b.uploadDate);
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });

        return filtered;
    }

    filterImages() {
        this.currentPage = 1;
        this.loadImages();
    }

    renderPagination(totalImages) {
        const pagination = document.getElementById('pagination');
        const totalPages = Math.ceil(totalImages / this.settings.imagesPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <button ${this.currentPage === 1 ? 'disabled' : ''} onclick="adminDashboard.changePage(${this.currentPage - 1})">
                <i class="fas fa-chevron-left"></i>
            </button>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage || i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                paginationHTML += `
                    <button class="${i === this.currentPage ? 'active' : ''}" onclick="adminDashboard.changePage(${i})">
                        ${i}
                    </button>
                `;
            } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                paginationHTML += '<span>...</span>';
            }
        }

        // Next button
        paginationHTML += `
            <button ${this.currentPage === totalPages ? 'disabled' : ''} onclick="adminDashboard.changePage(${this.currentPage + 1})">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;

        pagination.innerHTML = paginationHTML;
    }

    changePage(page) {
        this.currentPage = page;
        this.loadImages();
    }

    getCategoryName(categoryId) {
        const category = this.categories.find(cat => cat.id == categoryId);
        return category ? category.name : 'Sem categoria';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    handleFileSelect(files) {
        this.selectedFiles = Array.from(files).filter(file => {
            // Validate file type
            const extension = file.name.split('.').pop().toLowerCase();
            return this.settings.allowedFormats.includes(extension);
        });

        this.renderUploadPreview();
        document.getElementById('uploadBtn').disabled = this.selectedFiles.length === 0;
    }

    renderUploadPreview() {
        const preview = document.getElementById('uploadPreview');
        
        if (this.selectedFiles.length === 0) {
            preview.innerHTML = '';
            return;
        }

        preview.innerHTML = this.selectedFiles.map((file, index) => `
            <div class="preview-item">
                <img src="${URL.createObjectURL(file)}" alt="${file.name}">
                <button class="preview-remove" onclick="adminDashboard.removeFile(${index})">&times;</button>
            </div>
        `).join('');
    }

    removeFile(index) {
        this.selectedFiles.splice(index, 1);
        this.renderUploadPreview();
        document.getElementById('uploadBtn').disabled = this.selectedFiles.length === 0;
    }

    async handleUpload() {
        const category = document.getElementById('imageCategory').value;
        const tags = document.getElementById('imageTags').value;
        const description = document.getElementById('imageDescription').value;
        const websiteUrl = document.getElementById('imageWebsiteUrl').value;

        if (!category) {
            this.showAlert('Por favor, selecione uma categoria.', 'error');
            return;
        }

        if (this.selectedFiles.length === 0) {
            this.showAlert('Por favor, selecione pelo menos uma imagem.', 'error');
            return;
        }

        // Show loading
        this.showAlert('Fazendo upload das imagens...', 'success');
        document.getElementById('uploadBtn').disabled = true;

        try {
            const formData = new FormData();
            
            // Add files
            this.selectedFiles.forEach(file => {
                formData.append('images[]', file);
            });
            
            // Add metadata
            formData.append('category_id', category);
            formData.append('tags', tags);
            formData.append('description', description);
            if (websiteUrl) formData.append('website_url', websiteUrl.trim());

            const response = await fetch(this.apiBase + 'upload.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                this.showAlert(data.message, 'success');
                this.clearUpload();
                this.switchSection('gallery');
                this.loadImages();
                this.loadCategories(); // Refresh category counts
            } else {
                this.showAlert(data.errors ? data.errors.join(', ') : 'Erro no upload', 'error');
            }
        } catch (error) {
            console.error('Erro no upload:', error);
            this.showAlert('Erro de conexão durante o upload', 'error');
        } finally {
            document.getElementById('uploadBtn').disabled = false;
        }
    }

    clearUpload() {
        this.selectedFiles = [];
        document.getElementById('fileInput').value = '';
        document.getElementById('imageCategory').value = '';
        document.getElementById('imageTags').value = '';
        document.getElementById('imageDescription').value = '';
        const websiteUrlInput = document.getElementById('imageWebsiteUrl');
        if (websiteUrlInput) websiteUrlInput.value = '';
        document.getElementById('uploadPreview').innerHTML = '';
        document.getElementById('uploadBtn').disabled = true;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    openImageModal(imageId) {
        const image = this.images.find(img => img.id == imageId);
        if (!image) {
            console.error('Imagem não encontrada:', imageId);
            return;
        }

        // Update modal content
        const modalImage = document.getElementById('modalImage');
        if (modalImage) {
            modalImage.src = image.file_path;
            modalImage.dataset.imageId = image.id;
        }
        
        const modalTitle = document.getElementById('modalImageTitle');
        if (modalTitle) modalTitle.textContent = image.title || image.filename;
        
        const editName = document.getElementById('editImageName');
        if (editName) editName.value = image.title || image.filename;
        
        const editCategory = document.getElementById('editImageCategory');
        if (editCategory) editCategory.value = image.category_id;
        
        const editTags = document.getElementById('editImageTags');
        if (editTags) editTags.value = Array.isArray(image.tags) ? image.tags.join(', ') : '';
        
        const editDescription = document.getElementById('editImageDescription');
        if (editDescription) editDescription.value = image.description || '';

        const editWebsiteUrl = document.getElementById('editImageWebsiteUrl');
        if (editWebsiteUrl) editWebsiteUrl.value = image.website_url || '';

        // Update image info overlay
        const sizeInfo = document.getElementById('imageSizeInfo');
        const dateInfo = document.getElementById('imageDateInfo');
        if (sizeInfo) {
            sizeInfo.textContent = this.formatFileSize(parseInt(image.file_size));
        }
        if (dateInfo) {
            dateInfo.textContent = new Date(image.upload_date).toLocaleDateString('pt-PT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        }

        // Show modal
        const modal = document.getElementById('imageModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('pt-PT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            if (modal.id !== 'loginModal') {
                // Use class-based visibility per CSS
                modal.classList.remove('active');
                // Clear any inline display override
                modal.style.display = '';
            }
        });
        
        // Restore body scrolling (login modal lock handled elsewhere)
        document.body.style.overflow = '';
    }

    async saveImageChanges() {
        const imageId = document.getElementById('modalImage').dataset.imageId;
        const title = document.getElementById('editImageName').value;
        const category = document.getElementById('editImageCategory').value;
        const tags = document.getElementById('editImageTags').value;
        const description = document.getElementById('editImageDescription').value;
        const website_url = document.getElementById('editImageWebsiteUrl').value.trim();

        if (!title || !category) {
            this.showAlert('Nome e categoria são obrigatórios', 'error');
            return;
        }

        console.log('Salvando alterações:', {
            id: imageId,
            title: title,
            category_id: category,
            tags: tags,
            description: description
        });

        try {
            const response = await fetch(this.apiBase + 'images.php', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: parseInt(imageId),
                    title: title,
                    category_id: parseInt(category),
                    tags: tags,
                    description: description,
                    website_url: website_url || null
                })
            });

            const data = await response.json();
            console.log('Resposta da API:', data);

            if (data.success) {
                this.closeModal();
                
                // Pequeno delay para garantir que o modal fechou
                await new Promise(resolve => setTimeout(resolve, 100));
                
                // Recarregar imagens e categorias
                await this.loadImages();
                await this.loadCategories();
                
                console.log('Imagens recarregadas:', this.images.length);
                
                // Aguardar um pouco antes de re-renderizar
                await new Promise(resolve => setTimeout(resolve, 100));
                
                // Forçar re-renderização da galeria
                this.renderGallery();
                
                this.showAlert('Imagem atualizada com sucesso!', 'success');
            } else {
                this.showAlert(data.error || 'Erro ao atualizar imagem', 'error');
            }
        } catch (error) {
            console.error('Erro ao atualizar imagem:', error);
            this.showAlert('Erro de conexão', 'error');
        }
    }

    async deleteImage() {
        if (!confirm('Tem certeza que deseja eliminar esta imagem?')) {
            return;
        }

        const imageId = document.getElementById('modalImage').dataset.imageId;

        try {
            const response = await fetch(this.apiBase + 'images.php', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: imageId })
            });

            const data = await response.json();

            if (data.success) {
                this.showAlert('Imagem eliminada com sucesso!', 'success');
                this.closeModal();
                this.loadImages();
                this.loadCategories();
            } else {
                this.showAlert(data.error || 'Erro ao eliminar imagem', 'error');
            }
        } catch (error) {
            console.error('Erro ao eliminar imagem:', error);
            this.showAlert('Erro de conexão', 'error');
        }
    }

    async addCategory() {
        const name = document.getElementById('newCategoryName').value.trim();
        
        if (!name) {
            this.showAlert('Por favor, insira o nome da categoria.', 'error');
            return;
        }

        try {
            const response = await fetch(this.apiBase + 'categories.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name })
            });

            const data = await response.json();

            if (data.success) {
                this.showAlert('Categoria adicionada com sucesso!', 'success');
                document.getElementById('newCategoryName').value = '';
                this.loadCategories();
            } else {
                this.showAlert(data.error || 'Erro ao adicionar categoria', 'error');
            }
        } catch (error) {
            console.error('Erro ao adicionar categoria:', error);
            this.showAlert('Erro de conexão', 'error');
        }
    }

    async editCategory(categoryId) {
        const category = this.categories.find(cat => cat.id === categoryId);
        if (!category) return;

        const newName = prompt('Novo nome da categoria:', category.name);
        if (!newName || newName === category.name) return;

        try {
            const response = await fetch(this.apiBase + 'categories.php', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    id: categoryId, 
                    name: newName 
                })
            });

            const data = await response.json();

            if (data.success) {
                this.showAlert('Categoria atualizada com sucesso!', 'success');
                this.loadCategories();
            } else {
                this.showAlert(data.error || 'Erro ao atualizar categoria', 'error');
            }
        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
            this.showAlert('Erro de conexão', 'error');
        }
    }

    async deleteCategory(categoryId) {
        const category = this.categories.find(cat => cat.id === categoryId);
        if (!category) return;

        if (category.image_count > 0) {
            this.showAlert('Não é possível eliminar uma categoria que contém imagens.', 'error');
            return;
        }

        if (!confirm(`Tem certeza que deseja eliminar a categoria "${category.name}"?`)) {
            return;
        }

        try {
            const response = await fetch(this.apiBase + 'categories.php', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: categoryId })
            });

            const data = await response.json();

            if (data.success) {
                this.showAlert('Categoria eliminada com sucesso!', 'success');
                this.loadCategories();
            } else {
                this.showAlert(data.error || 'Erro ao eliminar categoria', 'error');
            }
        } catch (error) {
            console.error('Erro ao eliminar categoria:', error);
            this.showAlert('Erro de conexão', 'error');
        }
    }

    renderCategories() {
        const categoriesList = document.getElementById('categoriesList');
        if (!categoriesList) return;
        
        if (this.categories.length === 0) {
            categoriesList.innerHTML = '<p>Nenhuma categoria encontrada.</p>';
            return;
        }
        
        categoriesList.innerHTML = this.categories.map(category => `
            <div class="category-item">
                <div class="category-info">
                    <h4>${category.name}</h4>
                    <span>${category.image_count || 0} imagens</span>
                </div>
                <div class="category-actions">
                    <button class="btn btn-small btn-secondary" onclick="editCategory(${category.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-small btn-danger" onclick="deleteCategory(${category.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateCategorySelects() {
        const selects = ['categoryFilter', 'imageCategory', 'editImageCategory'];
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (!select) {
                console.warn(`Select não encontrado: ${selectId}`);
                return;
            }
            
            const currentValue = select.value;
            
            // Keep the first option (All Categories for filter, empty for others)
            const firstOption = select.querySelector('option');
            select.innerHTML = '';
            if (firstOption) {
                select.appendChild(firstOption);
            }
            
            // Add category options
            this.categories.forEach(category => {
                const option = document.createElement('option');
                // Use slug for the gallery filter, and id for upload/edit selects
                option.value = selectId === 'categoryFilter' ? String(category.slug) : String(category.id);
                option.textContent = category.name;
                select.appendChild(option);
            });
            
            console.log(`${selectId} atualizado com ${this.categories.length} categorias`);
            
            // Restore selected value if it still exists
            if (currentValue && select.querySelector(`option[value="${currentValue}"]`)) {
                select.value = currentValue;
            }
        });
    }

    loadSettings() {
        document.getElementById('maxFileSize').value = this.settings.maxFileSize;
        document.getElementById('imagesPerPage').value = this.settings.imagesPerPage;
        document.getElementById('compressionQuality').value = this.settings.compressionQuality;
        document.getElementById('qualityValue').textContent = this.settings.compressionQuality + '%';
        
        // Update checkboxes
        this.settings.allowedFormats.forEach(format => {
            const checkbox = document.querySelector(`input[value="${format}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }

    saveSettings() {
        this.settings.maxFileSize = parseInt(document.getElementById('maxFileSize').value);
        this.settings.imagesPerPage = parseInt(document.getElementById('imagesPerPage').value);
        this.settings.compressionQuality = parseInt(document.getElementById('compressionQuality').value);
        
        // Update allowed formats
        this.settings.allowedFormats = [];
        document.querySelectorAll('.checkbox-group input:checked').forEach(checkbox => {
            this.settings.allowedFormats.push(checkbox.value);
        });
        
        // Save to localStorage
        localStorage.setItem('lisis_admin_settings', JSON.stringify(this.settings));
        
        this.showAlert('Configurações salvas com sucesso!', 'success');
    }

    showAlert(message, type = 'success') {
        // Remove existing alerts
        document.querySelectorAll('.alert').forEach(alert => alert.remove());
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        
        // Insert at the top of the current content section or login form
        const activeSection = document.querySelector('.content-section.active');
        const loginForm = document.querySelector('.login-form');
        
        if (activeSection) {
            activeSection.insertBefore(alert, activeSection.firstChild);
        } else if (loginForm) {
            loginForm.insertBefore(alert, loginForm.firstChild);
        } else {
            // Fallback - append to body
            document.body.appendChild(alert);
        }
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminDashboard = new AdminDashboard();
});

// Utility functions for inline event handlers
function changePage(page) {
    window.adminDashboard.changePage(page);
}

function removeFile(index) {
    window.adminDashboard.removeFile(index);
}

function editCategory(id) {
    window.adminDashboard.editCategory(id);
}

function deleteCategory(id) {
    window.adminDashboard.deleteCategory(id);
}

// Users: global wrappers for inline handlers
function editUser(id) {
    window.adminDashboard.editUser(id);
}

function deleteUser(id) {
    window.adminDashboard.deleteUser(id);
}

function toggleUserActive(id, newState) {
    window.adminDashboard.toggleUserActive(id, newState);
}
