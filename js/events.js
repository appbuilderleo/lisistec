/**
 * LISIS Events Page JavaScript
 * Handles event loading, filtering, and modal interactions
 */

// Global variables
let allEvents = [];
let currentFilter = 'all';

// DOM Elements
const featuredEventsGrid = document.getElementById('featured-events-grid');
const eventsGrid = document.getElementById('events-grid');
const filterTabs = document.querySelectorAll('.filter-tab');
const eventModal = document.getElementById('event-modal');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    initializeFilters();
    initializeModal();
});

/**
 * Load events from API
 */
async function loadEvents() {
    try {
        const response = await fetch('api/events.php?limit=1000&upcoming=false');
        const data = await response.json();
        
        if (data.success) {
            allEvents = data.data;
            displayFeaturedEvents();
            displayAllEvents();
        } else {
            showError('Erro ao carregar eventos');
        }
    } catch (error) {
        console.error('Error loading events:', error);
        showError('Erro ao conectar com o servidor');
    }
}

/**
 * Display featured events
 */
function displayFeaturedEvents() {
    const featuredEvents = allEvents.filter(event => event.is_featured == 1);
    
    if (featuredEvents.length === 0) {
        featuredEventsGrid.innerHTML = '<p class="no-events">Nenhum evento em destaque no momento.</p>';
        return;
    }
    
    featuredEventsGrid.innerHTML = featuredEvents.map(event => createFeaturedEventCard(event)).join('');
    
    // Add click listeners
    document.querySelectorAll('.featured-event-card').forEach(card => {
        card.addEventListener('click', () => {
            const eventId = card.dataset.eventId;
            const event = allEvents.find(e => e.id == eventId);
            if (event) openEventModal(event);
        });
    });
}

/**
 * Display all events based on current filter
 */
function displayAllEvents() {
    let filteredEvents = [...allEvents];
    
    // Apply filters
    if (currentFilter === 'upcoming') {
        const today = new Date().toISOString().split('T')[0];
        filteredEvents = filteredEvents.filter(event => event.event_date >= today);
    } else if (currentFilter === 'featured') {
        filteredEvents = filteredEvents.filter(event => event.is_featured == 1);
    } else if (currentFilter !== 'all') {
        filteredEvents = filteredEvents.filter(event => event.category === currentFilter);
    }
    
    if (filteredEvents.length === 0) {
        eventsGrid.innerHTML = '<p class="no-events">Nenhum evento encontrado.</p>';
        return;
    }
    
    eventsGrid.innerHTML = filteredEvents.map(event => createEventCard(event)).join('');
    
    // Add click listeners
    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => {
            const eventId = card.dataset.eventId;
            const event = allEvents.find(e => e.id == eventId);
            if (event) openEventModal(event);
        });
    });
}

/**
 * Create featured event card HTML
 */
function createFeaturedEventCard(event) {
    const eventDate = formatDate(event.event_date);
    const eventTime = event.event_time ? formatTime(event.event_time) : 'Horário a definir';
    const eventImageTag = event.image_path ? `<img src="${event.image_path}" alt="${event.title}">` : '';
    const badgeClass = event.is_featured == 1 ? 'featured' : '';
    
    return `
        <div class="featured-event-card" data-event-id="${event.id}">
            <div class="featured-event-image">
                ${eventImageTag}
                <div class="event-badge ${badgeClass}">${event.category || 'Evento'}</div>
            </div>
            <div class="featured-event-content">
                <div class="event-date-badge">
                    <i class="fas fa-calendar"></i>
                    ${eventDate}
                </div>
                <h3>${event.title}</h3>
                <p>${truncateText(event.description, 120)}</p>
                <div class="event-meta">
                    <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${eventTime}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.location || 'Local a definir'}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Create regular event card HTML
 */
function createEventCard(event) {
    const eventDate = formatDate(event.event_date);
    const eventImageTag = event.image_path ? `<img src="${event.image_path}" alt="${event.title}">` : '';
    const badgeClass = event.is_featured == 1 ? 'featured' : '';
    
    return `
        <div class="event-card" data-event-id="${event.id}">
            <div class="event-image">
                ${eventImageTag}
                <div class="event-badge ${badgeClass}">${event.category || 'Evento'}</div>
            </div>
            <div class="event-content">
                <div class="event-date-badge">
                    <i class="fas fa-calendar"></i>
                    ${eventDate}
                </div>
                <h3>${event.title}</h3>
                <p>${truncateText(event.description, 100)}</p>
                <div class="event-meta">
                    <div class="meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.location || 'Local a definir'}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Initialize filter tabs
 */
function initializeFilters() {
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active state
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update filter and display events
            currentFilter = tab.dataset.filter;
            displayAllEvents();
        });
    });
}

/**
 * Initialize modal
 */
function initializeModal() {
    // Close modal on close button click
    modalClose.addEventListener('click', closeEventModal);
    
    // Close modal on overlay click
    modalOverlay.addEventListener('click', closeEventModal);
    
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && eventModal.classList.contains('active')) {
            closeEventModal();
        }
    });
}

/**
 * Open event modal
 */
function openEventModal(event) {
    const eventDate = formatDate(event.event_date);
    const eventTime = event.event_time ? formatTime(event.event_time) : 'Horário a definir';
    
    // Populate modal
    document.getElementById('modal-event-title').textContent = event.title;
    document.getElementById('modal-event-date').textContent = eventDate;
    document.getElementById('modal-event-time').textContent = eventTime;
    document.getElementById('modal-event-location').textContent = event.location || 'Local a definir';
    document.getElementById('modal-event-description').textContent = event.description || 'Descrição não disponível.';
    const modalImg = document.getElementById('modal-event-image');
    if (event.image_path) {
        modalImg.src = event.image_path;
        modalImg.alt = event.title;
        modalImg.style.display = '';
    } else {
        modalImg.removeAttribute('src');
        modalImg.alt = '';
        modalImg.style.display = 'none';
    }
    document.getElementById('modal-event-badge').textContent = event.category || 'Evento';
    
    // Update WhatsApp link with event title
    const whatsappLink = document.querySelector('.modal-actions .cta-button.primary');
    whatsappLink.href = `https://wa.me/258874647599?text=Olá! Gostaria de saber mais sobre o evento: ${encodeURIComponent(event.title)}`;
    
    // Show modal
    eventModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close event modal
 */
function closeEventModal() {
    eventModal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Format date to Portuguese
 */
function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-PT', options);
}

/**
 * Format time
 */
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
}

/**
 * Truncate text
 */
function truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

/**
 * Show error message
 */
function showError(message) {
    const errorHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
    `;
    
    if (featuredEventsGrid) {
        featuredEventsGrid.innerHTML = errorHTML;
    }
    if (eventsGrid) {
        eventsGrid.innerHTML = errorHTML;
    }
}

// Add CSS for error and no events messages
const style = document.createElement('style');
style.textContent = `
    .error-message,
    .no-events {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        color: var(--steel-grey);
        font-size: 1.1rem;
    }
    
    .error-message i {
        font-size: 3rem;
        color: var(--rock-blue);
        margin-bottom: 1rem;
        display: block;
    }
`;
document.head.appendChild(style);
