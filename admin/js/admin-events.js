/**
 * LISIS Admin - Events Management
 * Gestão de eventos no painel administrativo
 */

class EventsManager {
    constructor() {
        this.events = [];
        this.categories = [];
        this.currentFilter = 'all';
        this.currentCategory = '';
        this.currentSort = 'date-desc';
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.loadCategories();
        this.loadEvents();
    }

    attachEventListeners() {
        // Add Event Button
        const addEventBtn = document.getElementById('addEventBtn');
        if (addEventBtn) {
            addEventBtn.addEventListener('click', () => this.openAddEventModal());
        }

        // Save Event Button
        const saveEventBtn = document.getElementById('saveEventBtn');
        if (saveEventBtn) {
            saveEventBtn.addEventListener('click', () => this.saveEvent());
        }

        // Delete Event Button
        const deleteEventBtn = document.getElementById('deleteEventBtn');
        if (deleteEventBtn) {
            deleteEventBtn.addEventListener('click', () => this.deleteEvent());
        }

        // Upload Event Image Button
        const uploadEventImageBtn = document.getElementById('uploadEventImageBtn');
        if (uploadEventImageBtn) {
            uploadEventImageBtn.addEventListener('click', () => {
                this.openImageUploadDialog();
            });
        }

        // Filters
        const statusFilter = document.getElementById('eventStatusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.currentFilter = e.target.value;
                this.displayEvents();
            });
        }

        const categoryFilter = document.getElementById('eventCategoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentCategory = e.target.value;
                this.displayEvents();
            });
        }

        const sortFilter = document.getElementById('eventSortFilter');
        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.displayEvents();
            });
        }

        // Modal close buttons
        document.querySelectorAll('#eventModal .modal-close').forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });

        // Close modal on overlay click
        const eventModal = document.getElementById('eventModal');
        if (eventModal) {
            const overlay = eventModal.querySelector('.modal-overlay');
            if (overlay) {
                overlay.addEventListener('click', () => this.closeModal());
            }
        }
    }

    async loadCategories() {
        try {
            const response = await fetch('api/categories.php');
            const data = await response.json();

            if (Array.isArray(data)) {
                this.categories = data.filter(cat => cat.is_active);
                this.populateCategorySelects();
            } else {
                console.warn('No categories loaded, using defaults');
                this.categories = [];
            }
        } catch (error) {
            console.error('Error loading categories:', error);
            // Use empty array if categories fail to load
            this.categories = [];
        }
    }

    populateCategorySelects() {
        // Populate event category select (modal)
        const eventCategorySelect = document.getElementById('eventCategory');
        if (eventCategorySelect) {
            // Keep the first option (placeholder)
            const placeholder = eventCategorySelect.options[0];
            eventCategorySelect.innerHTML = '';
            eventCategorySelect.appendChild(placeholder);
            
            this.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.name;
                option.textContent = category.name;
                eventCategorySelect.appendChild(option);
            });
        }

        // Populate event category filter
        const eventCategoryFilter = document.getElementById('eventCategoryFilter');
        if (eventCategoryFilter) {
            // Keep the first option (all categories)
            const allOption = eventCategoryFilter.options[0];
            eventCategoryFilter.innerHTML = '';
            eventCategoryFilter.appendChild(allOption);
            
            this.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.name;
                option.textContent = category.name;
                eventCategoryFilter.appendChild(option);
            });
        }
    }

    async loadEvents() {
        try {
            const response = await fetch('api/events.php');
            const data = await response.json();

            if (data.success) {
                this.events = data.data;
                this.displayEvents();
            } else {
                this.showNotification('Erro ao carregar eventos', 'error');
            }
        } catch (error) {
            console.error('Error loading events:', error);
            this.showNotification('Erro ao conectar com o servidor', 'error');
        }
    }

    displayEvents() {
        const eventsList = document.getElementById('eventsList');
        if (!eventsList) return;

        let filteredEvents = [...this.events];

        // Apply status filter
        const today = new Date().toISOString().split('T')[0];
        if (this.currentFilter === 'upcoming') {
            filteredEvents = filteredEvents.filter(e => e.event_date >= today);
        } else if (this.currentFilter === 'past') {
            filteredEvents = filteredEvents.filter(e => e.event_date < today);
        } else if (this.currentFilter === 'featured') {
            filteredEvents = filteredEvents.filter(e => e.is_featured == 1);
        }

        // Apply category filter
        if (this.currentCategory) {
            filteredEvents = filteredEvents.filter(e => e.category === this.currentCategory);
        }

        // Apply sorting
        if (this.currentSort === 'date-desc') {
            filteredEvents.sort((a, b) => new Date(b.event_date) - new Date(a.event_date));
        } else if (this.currentSort === 'date-asc') {
            filteredEvents.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
        } else if (this.currentSort === 'title-asc') {
            filteredEvents.sort((a, b) => a.title.localeCompare(b.title));
        }

        if (filteredEvents.length === 0) {
            eventsList.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <i class="fas fa-calendar-times"></i>
                    <p>Nenhum evento encontrado</p>
                    <button class="btn btn-primary" onclick="window.eventsManager.openAddEventModal()">
                        <i class="fas fa-plus"></i> Adicionar Primeiro Evento
                    </button>
                </div>
            `;
            return;
        }

        eventsList.innerHTML = filteredEvents.map(event => this.createEventCard(event)).join('');

        // Attach click listeners to edit buttons
        eventsList.querySelectorAll('.edit-event-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const eventId = e.currentTarget.dataset.eventId;
                this.openEditEventModal(eventId);
            });
        });

        // Attach click listeners to toggle featured
        eventsList.querySelectorAll('.toggle-featured-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const eventId = e.currentTarget.dataset.eventId;
                this.toggleFeatured(eventId);
            });
        });

        // Attach click listener to card for quick view
        eventsList.querySelectorAll('.event-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Only trigger if not clicking on buttons
                if (!e.target.closest('button')) {
                    const eventId = card.dataset.eventId;
                    this.openEditEventModal(eventId);
                }
            });
        });
    }

    createEventCard(event) {
        const eventDate = new Date(event.event_date + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const isPast = eventDate < today;
        const isFeatured = event.is_featured == 1;

        const formattedTime = event.event_time ? this.formatTime(event.event_time) : 'Horário a definir';
        
        // Build image tag only if image_path exists (no default image)
        let eventImageTag = '';
        if (event.image_path && event.image_path.trim() !== '') {
            let displayPath = event.image_path;
            if (/^https?:\/\//i.test(displayPath)) {
                // keep as is
            } else if (
                displayPath.startsWith('../') ||
                displayPath.startsWith('/') ||
                displayPath.startsWith('uploads/') ||
                displayPath.startsWith('admin/uploads/')
            ) {
                // keep as is for relative admin uploads and absolute paths
            } else if (!displayPath.includes('/')) {
                displayPath = 'uploads/events/' + displayPath;
            } else {
                displayPath = '../' + displayPath;
            }
            eventImageTag = `<img src="${displayPath}" alt="${event.title}">`;
        }

        return `
            <div class="event-card ${isPast ? 'past-event' : ''} ${isFeatured ? 'featured-event' : ''}" data-event-id="${event.id}">
                <div class="event-card-image">
                    ${eventImageTag}
                    <div class="event-card-date-overlay">
                        <div class="date-day">${eventDate.getDate()}</div>
                        <div class="date-month">${this.getMonthName(eventDate.getMonth())}</div>
                    </div>
                    <div class="event-card-actions-overlay">
                        <button class="toggle-featured-btn ${isFeatured ? 'active' : ''}" 
                                data-event-id="${event.id}" 
                                title="${isFeatured ? 'Remover destaque' : 'Marcar como destaque'}">
                            <i class="fas fa-star"></i>
                        </button>
                        <button class="edit-event-btn" data-event-id="${event.id}" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                    ${isPast ? '<div class="event-badge past-badge">Passado</div>' : ''}
                    ${isFeatured ? '<div class="event-badge featured-badge">Destaque</div>' : ''}
                </div>
                <div class="event-card-content">
                    <h3 class="event-card-title">${event.title}</h3>
                    <div class="event-card-meta">
                        <div class="meta-item">
                            <i class="fas fa-clock"></i>
                            <span>${formattedTime}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${event.location || 'Local a definir'}</span>
                        </div>
                    </div>
                    <p class="event-card-description">${event.description || 'Sem descrição'}</p>
                    <div class="event-card-footer">
                        <span class="event-card-category">
                            <i class="fas fa-tag"></i>
                            ${event.category || 'Sem categoria'}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    openAddEventModal() {
        document.getElementById('eventModalTitle').textContent = 'Adicionar Evento';
        document.getElementById('editEventId').value = '';
        document.getElementById('eventTitle').value = '';
        document.getElementById('eventCategory').value = '';
        document.getElementById('eventDescription').value = '';
        document.getElementById('eventDate').value = '';
        document.getElementById('eventTime').value = '';
        document.getElementById('eventLocation').value = '';
        document.getElementById('eventImagePath').value = '';
        document.getElementById('eventFeatured').checked = false;
        document.getElementById('deleteEventBtn').style.display = 'none';

        this.openModal();
    }

    openEditEventModal(eventId) {
        const event = this.events.find(e => e.id == eventId);
        if (!event) return;

        document.getElementById('eventModalTitle').textContent = 'Editar Evento';
        document.getElementById('editEventId').value = event.id;
        document.getElementById('eventTitle').value = event.title;
        document.getElementById('eventCategory').value = event.category || '';
        document.getElementById('eventDescription').value = event.description || '';
        document.getElementById('eventDate').value = event.event_date;
        document.getElementById('eventTime').value = event.event_time || '';
        document.getElementById('eventLocation').value = event.location || '';
        document.getElementById('eventImagePath').value = event.image_path || '';
        document.getElementById('eventFeatured').checked = event.is_featured == 1;
        document.getElementById('deleteEventBtn').style.display = 'block';

        this.openModal();
    }

    async saveEvent() {
        const eventId = document.getElementById('editEventId').value;
        const title = document.getElementById('eventTitle').value.trim();
        const category = document.getElementById('eventCategory').value;
        const description = document.getElementById('eventDescription').value.trim();
        const eventDate = document.getElementById('eventDate').value;
        const eventTime = document.getElementById('eventTime').value;
        const location = document.getElementById('eventLocation').value.trim();
        const imagePath = document.getElementById('eventImagePath').value.trim();
        const isFeatured = document.getElementById('eventFeatured').checked ? 1 : 0;

        // Validation
        if (!title || !category || !description || !eventDate) {
            this.showNotification('Por favor, preencha todos os campos obrigatórios', 'error');
            return;
        }

        const eventData = {
            title,
            category,
            description,
            event_date: eventDate,
            event_time: eventTime || null,
            location: location || null,
            image_path: imagePath || null,
            is_featured: isFeatured
        };

        try {
            let response;
            if (eventId) {
                // Update existing event
                eventData.id = eventId;
                response = await fetch('api/events.php', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(eventData)
                });
            } else {
                // Create new event
                response = await fetch('api/events.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(eventData)
                });
            }

            const data = await response.json();

            if (data.success) {
                this.showNotification(eventId ? 'Evento atualizado com sucesso' : 'Evento criado com sucesso', 'success');
                this.closeModal();
                this.loadEvents();
            } else {
                this.showNotification(data.message || 'Erro ao guardar evento', 'error');
            }
        } catch (error) {
            console.error('Error saving event:', error);
            this.showNotification('Erro ao conectar com o servidor', 'error');
        }
    }

    async deleteEvent() {
        const eventId = document.getElementById('editEventId').value;
        if (!eventId) return;

        if (!confirm('Tem certeza que deseja eliminar este evento?')) {
            return;
        }

        try {
            const response = await fetch('api/events.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: eventId })
            });

            const data = await response.json();

            if (data.success) {
                this.showNotification('Evento eliminado com sucesso', 'success');
                this.closeModal();
                this.loadEvents();
            } else {
                this.showNotification(data.message || 'Erro ao eliminar evento', 'error');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            this.showNotification('Erro ao conectar com o servidor', 'error');
        }
    }

    async toggleFeatured(eventId) {
        const event = this.events.find(e => e.id == eventId);
        if (!event) return;

        const newFeaturedStatus = event.is_featured == 1 ? 0 : 1;

        try {
            const response = await fetch('api/events.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: eventId,
                    is_featured: newFeaturedStatus
                })
            });

            const data = await response.json();

            if (data.success) {
                this.showNotification(
                    newFeaturedStatus ? 'Evento marcado como destaque' : 'Destaque removido',
                    'success'
                );
                this.loadEvents();
            } else {
                this.showNotification(data.message || 'Erro ao atualizar evento', 'error');
            }
        } catch (error) {
            console.error('Error toggling featured:', error);
            this.showNotification('Erro ao conectar com o servidor', 'error');
        }
    }

    openModal() {
        const modal = document.getElementById('eventModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modal = document.getElementById('eventModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString + 'T00:00:00');
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('pt-PT', options);
    }

    formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        return `${hours}:${minutes}`;
    }

    getMonthName(monthIndex) {
        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        return months[monthIndex];
    }

    openImageUploadDialog() {
        // Create file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/jpeg,image/jpg,image/png,image/gif,image/webp';
        fileInput.style.display = 'none';
        
        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                this.showNotification('Arquivo muito grande. Tamanho máximo: 5MB', 'error');
                return;
            }
            
            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                this.showNotification('Tipo de arquivo inválido. Use: JPG, PNG, GIF ou WEBP', 'error');
                return;
            }
            
            await this.uploadEventImage(file);
        });
        
        // Trigger file selection
        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    }

    async uploadEventImage(file) {
        try {
            // Show loading notification
            this.showNotification('Enviando imagem...', 'info');
            
            // Create FormData
            const formData = new FormData();
            formData.append('event_image', file);
            
            // Upload file
            const response = await fetch('api/upload_event_image.php', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Update image path field
                const imagePathInput = document.getElementById('eventImagePath');
                if (imagePathInput) {
                    imagePathInput.value = data.data.file_path;
                }
                
                this.showNotification('Imagem enviada com sucesso!', 'success');
            } else {
                throw new Error(data.message || 'Erro ao enviar imagem');
            }
        } catch (error) {
            console.error('Upload error:', error);
            this.showNotification(error.message || 'Erro ao enviar imagem', 'error');
        }
    }

    showNotification(message, type = 'info') {
        // Use existing notification system if available
        if (window.adminDashboard && window.adminDashboard.showNotification) {
            window.adminDashboard.showNotification(message, type);
        } else {
            alert(message);
        }
    }
}

// Initialize Events Manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.eventsManager = new EventsManager();
});
