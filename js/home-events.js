/**
 * LISIS - Home Page Events Display
 * Exibição de eventos em destaque na página inicial
 */

document.addEventListener('DOMContentLoaded', () => {
    loadHomeFeaturedEvents();
    loadHomeEvents();
});

async function loadHomeEvents() {
    try {
        // Load featured and upcoming events
        const response = await fetch('api/events.php?limit=3&upcoming=true');
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
            displayHomeEvents(data.data);
        } else {
            hideEventsSection();
        }
    } catch (error) {
        console.error('Error loading events:', error);
        hideEventsSection();
    }
}

async function loadHomeFeaturedEvents() {
    try {
        const res = await fetch('api/events.php?featured=true&upcoming=false&limit=1000');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
            displayHomeFeaturedEvents(data.data);
        } else {
            hideFeaturedSection();
        }
    } catch (err) {
        console.error('Error loading featured events:', err);
        hideFeaturedSection();
    }
}

function displayHomeFeaturedEvents(events) {
    const grid = document.getElementById('featured-events-grid-home');
    const section = document.getElementById('featured-events-home');
    if (!grid || !section) return;
    grid.innerHTML = events.map(e => createHomeFeaturedEventCard(e)).join('');
    section.style.display = 'block';
}

function createHomeFeaturedEventCard(event) {
    const eventDate = formatEventDate(event.event_date);
    const eventTime = event.event_time ? formatEventTime(event.event_time) : 'Horário a definir';
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
                    ${event.location ? `
                    <div class="meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.location}</span>
                    </div>` : ''}
                </div>
            </div>
        </div>
    `;
}

function hideFeaturedSection() {
    const section = document.getElementById('featured-events-home');
    if (section) section.style.display = 'none';
}

function displayHomeEvents(events) {
    const eventsContainer = document.getElementById('home-events-container');
    if (!eventsContainer) return;
    
    const eventsHTML = events.map(event => createHomeEventCard(event)).join('');
    eventsContainer.innerHTML = eventsHTML;
    
    // Show events section
    const eventsSection = document.getElementById('events-section');
    if (eventsSection) {
        eventsSection.style.display = 'block';
    }
}

function createHomeEventCard(event) {
    const eventDate = formatEventDate(event.event_date);
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
                    ${event.location ? `
                    <div class="meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.location}</span>
                    </div>` : ''}
                </div>
            </div>
        </div>
    `;
}

function formatEventDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-PT', options);
}

function formatEventTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
}

function truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function hideEventsSection() {
    const eventsSection = document.getElementById('events-section');
    if (eventsSection) {
        eventsSection.style.display = 'none';
    }
}
