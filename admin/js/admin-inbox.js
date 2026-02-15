/**
 * LISIS Admin - Inbox Management
 * Gestão de mensagens de contacto
 */

class InboxManager {
    constructor() {
        this.messages = [];
        this.currentFilter = 'unread';
        this._intervalId = null;
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.loadMessages();
        
        // Auto-refresh every 30 seconds
        this._intervalId = setInterval(() => this.loadMessages(), 30000);
    }

    attachEventListeners() {
        // Status filter
        const statusFilter = document.getElementById('statusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.currentFilter = e.target.value;
                this.loadMessages();
            });
        }

        // Search
        const messageSearch = document.getElementById('messageSearch');
        if (messageSearch) {
            messageSearch.addEventListener('input', (e) => {
                this.filterMessages(e.target.value);
            });
        }

        // Modal actions
        document.getElementById('markReadBtn')?.addEventListener('click', () => this.markAsRead());
        document.getElementById('archiveMessageBtn')?.addEventListener('click', () => this.archiveMessage());
        document.getElementById('deleteMessageBtn')?.addEventListener('click', () => this.deleteMessage());
    }

    async loadMessages() {
        try {
            const response = await fetch(`api/messages.php?status=${this.currentFilter}`);
            const data = await response.json();

            if (data.success) {
                this.messages = data.data;
                this.updateStats(data.stats);
                this.renderMessages(this.messages);
            } else {
                this.showError('Erro ao carregar mensagens');
            }
        } catch (error) {
            console.error('Error loading messages:', error);
            this.showError('Erro ao conectar com o servidor');
        }
    }

    updateStats(stats) {
        const unreadCount = stats.unread || 0;
        const totalCount = Object.values(stats).reduce((a, b) => a + b, 0);

        document.getElementById('unreadMessages').textContent = unreadCount;
        document.getElementById('totalMessages').textContent = totalCount;

        // Update badge in sidebar
        const badge = document.getElementById('unreadBadge');
        if (badge) {
            if (unreadCount > 0) {
                badge.textContent = unreadCount;
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }
        }
    }

    renderMessages(messages) {
        const container = document.getElementById('messagesList');
        if (!container) return;

        if (messages.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <h3>Nenhuma mensagem</h3>
                    <p>Não há mensagens ${this.getFilterLabel()} no momento.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = messages.map(msg => this.createMessageCard(msg)).join('');

        // Attach click handlers
        container.querySelectorAll('.message-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.messageId;
                const message = this.messages.find(m => m.id == id);
                if (message) {
                    this.showMessageModal(message);
                }
            });
        });
    }

    createMessageCard(msg) {
        const statusClass = msg.status === 'unread' ? 'unread' : '';
        const serviceName = this.getServiceName(msg.servico);
        const date = this.formatDate(msg.created_at);

        return `
            <div class="message-card ${statusClass}" data-message-id="${msg.id}">
                <div class="message-card-header">
                    <div class="message-sender">
                        <i class="fas fa-user-circle"></i>
                        <strong>${this.escapeHtml(msg.nome)}</strong>
                        ${msg.status === 'unread' ? '<span class="unread-dot"></span>' : ''}
                    </div>
                    <div class="message-date">
                        <i class="fas fa-clock"></i>
                        ${date}
                    </div>
                </div>
                <div class="message-card-body">
                    <div class="message-meta">
                        <span><i class="fas fa-envelope"></i> ${this.escapeHtml(msg.email)}</span>
                        ${msg.empresa ? `<span><i class="fas fa-building"></i> ${this.escapeHtml(msg.empresa)}</span>` : ''}
                        ${msg.servico ? `<span class="service-tag">${serviceName}</span>` : ''}
                    </div>
                    <div class="message-preview">
                        ${this.escapeHtml(msg.mensagem.substring(0, 150))}${msg.mensagem.length > 150 ? '...' : ''}
                    </div>
                </div>
            </div>
        `;
    }

    showMessageModal(message) {
        document.getElementById('currentMessageId').value = message.id;
        document.getElementById('msgNome').textContent = message.nome;
        document.getElementById('msgEmail').textContent = message.email;
        document.getElementById('msgEmail').href = `mailto:${message.email}`;
        document.getElementById('msgEmpresa').textContent = message.empresa || 'Não informado';
        document.getElementById('msgTelefone').textContent = message.telefone || 'Não informado';
        if (message.telefone) {
            document.getElementById('msgTelefone').href = `tel:${message.telefone}`;
        }
        document.getElementById('msgServico').textContent = this.getServiceName(message.servico);
        document.getElementById('msgData').textContent = this.formatDate(message.created_at);
        document.getElementById('msgMensagem').textContent = message.mensagem;

        // Update button states
        const markReadBtn = document.getElementById('markReadBtn');
        if (message.status === 'read') {
            markReadBtn.innerHTML = '<i class="fas fa-envelope"></i> Marcar como não lida';
        } else {
            markReadBtn.innerHTML = '<i class="fas fa-check"></i> Marcar como lida';
        }

        // Show modal
        document.getElementById('messageModal').classList.add('active');

        // Mark as read automatically
        if (message.status === 'unread') {
            this.updateMessageStatus(message.id, 'read');
        }
    }

    async markAsRead() {
        const id = document.getElementById('currentMessageId').value;
        const message = this.messages.find(m => m.id == id);
        const newStatus = message.status === 'read' ? 'unread' : 'read';
        
        await this.updateMessageStatus(id, newStatus);
        this.closeModal();
    }

    async archiveMessage() {
        const id = document.getElementById('currentMessageId').value;
        
        if (confirm('Deseja arquivar esta mensagem?')) {
            await this.updateMessageStatus(id, 'archived');
            this.closeModal();
        }
    }

    async deleteMessage() {
        const id = document.getElementById('currentMessageId').value;
        
        if (!confirm('Tem certeza que deseja eliminar esta mensagem? Esta ação não pode ser desfeita.')) {
            return;
        }

        try {
            const response = await fetch(`api/messages.php?id=${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();

            if (data.success) {
                this.showSuccess('Mensagem eliminada com sucesso');
                this.closeModal();
                this.loadMessages();
            } else {
                this.showError(data.message || 'Erro ao eliminar mensagem');
            }
        } catch (error) {
            console.error('Error deleting message:', error);
            this.showError('Erro ao conectar com o servidor');
        }
    }

    async updateMessageStatus(id, status) {
        try {
            const response = await fetch('api/messages.php', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, status })
            });
            const data = await response.json();

            if (data.success) {
                this.loadMessages();
            } else {
                this.showError(data.message || 'Erro ao atualizar status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            this.showError('Erro ao conectar com o servidor');
        }
    }

    filterMessages(searchTerm) {
        if (!searchTerm) {
            this.renderMessages(this.messages);
            return;
        }

        const filtered = this.messages.filter(msg => 
            msg.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (msg.empresa && msg.empresa.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        this.renderMessages(filtered);
    }

    closeModal() {
        document.getElementById('messageModal').classList.remove('active');
    }

    getServiceName(servico) {
        const services = {
            'web': 'Desenvolvimento Web',
            'mobile': 'Aplicativos Móveis',
            'redes': 'Redes de Computadores',
            'cctv': 'Segurança Electrónica (CCTV)',
            'design': 'Design'
        };
        return services[servico] || 'Não especificado';
    }

    getFilterLabel() {
        const labels = {
            'all': '',
            'unread': 'não lidas',
            'read': 'lidas',
            'archived': 'arquivadas'
        };
        return labels[this.currentFilter] || '';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            if (hours === 0) {
                const minutes = Math.floor(diff / (1000 * 60));
                return minutes <= 1 ? 'Agora mesmo' : `Há ${minutes} minutos`;
            }
            return `Há ${hours} hora${hours > 1 ? 's' : ''}`;
        } else if (days === 1) {
            return 'Ontem';
        } else if (days < 7) {
            return `Há ${days} dias`;
        } else {
            return date.toLocaleDateString('pt-PT', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showSuccess(message) {
        // Use existing notification system if available
        if (window.adminDashboard && window.adminDashboard.showNotification) {
            window.adminDashboard.showNotification(message, 'success');
        } else {
            alert(message);
        }
    }

    showError(message) {
        if (window.adminDashboard && window.adminDashboard.showNotification) {
            window.adminDashboard.showNotification(message, 'error');
        } else {
            alert(message);
        }
    }
}

// Expose class for lazy initialization by admin.js
window.InboxManager = InboxManager;
