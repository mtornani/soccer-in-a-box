/**
 * Soccer in a Box - Community Mode
 * Fan engagement, polls, live feed and global network features
 */

class CommunityMode {
    constructor() {
        this.currentTeam = null;
        this.polls = [];
        this.emotions = [];
        this.liveFeed = [];
        this.supportMessages = [];
        this.userProfile = {
            name: '',
            favoriteTeam: '',
            joinDate: null,
            emotionsShared: 0,
            pollsVoted: 0,
            messagesShared: 0
        };
        
        this.init();
    }

    init() {
        console.log('🎉 Initializing Community Mode');
        this.setupEventListeners();
        this.loadCommunityData();
        this.createCommunityInterface();
    }

    setupEventListeners() {
        // Listen for mode initialization
        window.SoccerBox.eventBus.on('mode:community:init', () => {
            this.onModeActivated();
        });

        // Listen for match events from coach mode
        window.SoccerBox.eventBus.on('match:note:added', (note) => {
            this.handleMatchEvent(note);
        });

        // Listen for shared data updates
        window.SoccerBox.eventBus.on('data:sync:updated', () => {
            this.refreshLiveFeed();
        });
    }

    onModeActivated() {
        console.log('🎯 Community mode activated');
        this.refreshInterface();
        this.startLiveFeedUpdates();
        this.checkUserProfile();
    }

    loadCommunityData() {
        // Load saved community data
        const savedData = localStorage.getItem('community_data');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.polls = data.polls || [];
            this.emotions = data.emotions || [];
            this.supportMessages = data.supportMessages || [];
            this.userProfile = { ...this.userProfile, ...data.userProfile };
        }

        // Load live feed from shared data
        this.refreshLiveFeed();
    }

    saveCommunityData() {
        const data = {
            polls: this.polls,
            emotions: this.emotions,
            supportMessages: this.supportMessages,
            userProfile: this.userProfile
        };
        localStorage.setItem('community_data', JSON.stringify(data));
    }

    createCommunityInterface() {
        const communityScreen = document.getElementById('community-screen');
        if (!communityScreen) return;

        const container = communityScreen.querySelector('.app-container');
        if (container) {
            container.innerHTML = this.getCommunityHTML();
            this.attachCommunityEventListeners();
        }
    }

    getCommunityHTML() {
        const currentMatch = window.SoccerBox.sharedData.currentMatch;
        const stats = this.calculateStats();

        return `
            <!-- User Profile Setup -->
            <div id="profile-setup" class="feature-card" style="display: ${this.userProfile.name ? 'none' : 'block'};">
                <h3 class="feature-title">👋 Benvenuto nella Community!</h3>
                <p>Configura il tuo profilo per iniziare a interagire con altri tifosi.</p>
                <div class="profile-form">
                    <div class="form-row">
                        <input type="text" id="user-name" placeholder="Il tuo nome" class="form-input">
                        <input type="text" id="favorite-team" placeholder="La tua squadra del cuore" class="form-input">
                    </div>
                    <button id="save-profile" class="btn">💾 Salva Profilo</button>
                </div>
            </div>

            <!-- Community Stats -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">${stats.matchesFollowed}</div>
                    <div class="stat-label">Partite Seguite</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${stats.activeFans}</div>
                    <div class="stat-label">Tifosi Attivi</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${stats.satisfaction}%</div>
                    <div class="stat-label">Soddisfazione</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${this.userProfile.emotionsShared}</div>
                    <div class="stat-label">Tue Emozioni</div>
                </div>
            </div>

            <!-- Current Match Info -->
            ${currentMatch ? `
            <div class="feature-card current-match">
                <h3 class="feature-title">⚽ Match in Corso</h3>
                <div class="match-info">
                    <div class="match-teams">
                        <span class="team-name">${currentMatch.homeTeam}</span>
                        <span class="vs">VS</span>
                        <span class="team-name">${currentMatch.awayTeam}</span>
                    </div>
                    <div class="match-details">
                        <span>📅 ${currentMatch.date}</span>
                        ${currentMatch.venue ? `<span>🏟️ ${currentMatch.venue}</span>` : ''}
                        ${currentMatch.competition ? `<span>🏆 ${currentMatch.competition}</span>` : ''}
                    </div>
                </div>
            </div>
            ` : ''}

            <!-- Quick Actions -->
            <div class="feature-card">
                <h3 class="feature-title">⚡ Azioni Rapide</h3>
                <div class="community-actions">
                    <button class="action-btn" id="vote-poll">
                        🗳️ Vota Sondaggio
                        ${this.getActivePollsCount() > 0 ? `<span class="badge">${this.getActivePollsCount()}</span>` : ''}
                    </button>
                    <button class="action-btn" id="share-emotion">
                        😍 Condividi Emozione
                    </button>
                    <button class="action-btn" id="view-stats">
                        📈 Statistiche Squadra
                    </button>
                    <button class="action-btn" id="send-support">
                        💌 Messaggio Supporto
                    </button>
                </div>
            </div>

            <!-- Live Feed -->
            <div class="feature-card">
                <h3 class="feature-title">📱 Feed Live</h3>
                <div class="feed-container" id="live-feed">
                    <div class="feed-loading">Caricamento feed...</div>
                </div>
                <button id="refresh-feed" class="btn btn-secondary">🔄 Aggiorna Feed</button>
            </div>

            <!-- Active Polls -->
            <div class="feature-card" id="polls-section">
                <h3 class="feature-title">🗳️ Sondaggi Attivi</h3>
                <div id="polls-container">
                    <div class="empty-state">Nessun sondaggio attivo al momento</div>
                </div>
                <button id="create-poll" class="btn">➕ Crea Sondaggio</button>
            </div>

            <!-- Emotions Wall -->
            <div class="feature-card">
                <h3 class="feature-title">😍 Muro delle Emozioni</h3>
                <div class="emotions-wall" id="emotions-wall">
                    <div class="emotion-stats">
                        <div class="emotion-item">😍 <span>${this.getEmotionCount('😍')}</span></div>
                        <div class="emotion-item">🔥 <span>${this.getEmotionCount('🔥')}</span></div>
                        <div class="emotion-item">⚡ <span>${this.getEmotionCount('⚡')}</span></div>
                        <div class="emotion-item">💪 <span>${this.getEmotionCount('💪')}</span></div>
                        <div class="emotion-item">🎯 <span>${this.getEmotionCount('🎯')}</span></div>
                        <div class="emotion-item">👏 <span>${this.getEmotionCount('👏')}</span></div>
                    </div>
                </div>
            </div>

            <!-- Global Network -->
            <div class="feature-card">
                <h3 class="feature-title">🌍 Network Globale</h3>
                <p>Connettiti con tifosi di tutto il mondo che usano Soccer in a Box.</p>
                <div class="global-stats">
                    <div class="country-stat">
                        <span class="flag">🇮🇹</span>
                        <span class="country">Italia</span>
                        <span class="count">1,247 squadre</span>
                    </div>
                    <div class="country-stat">
                        <span class="flag">🇧🇷</span>
                        <span class="country">Brasile</span>
                        <span class="count">892 squadre</span>
                    </div>
                    <div class="country-stat">
                        <span class="flag">🇪🇸</span>
                        <span class="country">Spagna</span>
                        <span class="count">634 squadre</span>
                    </div>
                    <div class="country-stat">
                        <span class="flag">🇫🇷</span>
                        <span class="country">Francia</span>
                        <span class="count">523 squadre</span>
                    </div>
                    <div class="country-stat">
                        <span class="flag">🇩🇪</span>
                        <span class="country">Germania</span>
                        <span class="count">445 squadre</span>
                    </div>
                </div>
                <button id="join-global" class="btn">🌍 Partecipa alla Rete Globale</button>
            </div>

            <!-- Team Connection -->
            <div class="feature-card">
                <h3 class="feature-title">🤝 Connetti con la Squadra</h3>
                <p>Il tuo supporto arriva direttamente allo staff tecnico. Le tue emozioni e feedback contribuiscono all'analisi della squadra.</p>
                <div class="connection-stats">
                    <div class="connection-item">
                        <span class="number">${this.supportMessages.length}</span>
                        <span class="label">Messaggi Inviati</span>
                    </div>
                    <div class="connection-item">
                        <span class="number">${this.emotions.length}</span>
                        <span class="label">Emozioni Condivise</span>
                    </div>
                </div>
                <div class="support-actions">
                    <button id="quick-support" class="btn">⚡ Supporto Rapido</button>
                    <button id="detailed-feedback" class="btn btn-secondary">📝 Feedback Dettagliato</button>
                </div>
            </div>

            <!-- CSS Styles -->
            <style>
                .community-actions {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .action-btn {
                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                    color: white;
                    border: none;
                    padding: 1rem;
                    border-radius: var(--border-radius);
                    cursor: pointer;
                    font-size: 0.9rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    position: relative;
                    text-align: center;
                }
                
                .action-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
                
                .badge {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: var(--accent-color);
                    color: white;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    font-size: 0.7rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .current-match {
                    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
                    border-left: 4px solid var(--secondary-color);
                }
                
                .match-teams {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }
                
                .team-name {
                    font-weight: bold;
                    font-size: 1.2rem;
                    color: var(--primary-color);
                }
                
                .vs {
                    background: var(--accent-color);
                    color: white;
                    padding: 0.3rem 0.6rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: bold;
                }
                
                .match-details {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    flex-wrap: wrap;
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                }
                
                .feed-container {
                    max-height: 400px;
                    overflow-y: auto;
                    margin-bottom: 1rem;
                }
                
                .feed-item {
                    background: #f8f9fa;
                    padding: 1rem;
                    margin-bottom: 0.5rem;
                    border-radius: 8px;
                    border-left: 3px solid var(--accent-color);
                    animation: slideIn 0.3s ease;
                }
                
                .feed-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }
                
                .feed-source {
                    font-weight: bold;
                    color: var(--primary-color);
                }
                
                .feed-time {
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                }
                
                .feed-content {
                    line-height: 1.4;
                }
                
                .feed-reactions {
                    margin-top: 0.5rem;
                    display: flex;
                    gap: 1rem;
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                }
                
                .emotions-wall {
                    text-align: center;
                }
                
                .emotion-stats {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    flex-wrap: wrap;
                }
                
                .emotion-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 2rem;
                }
                
                .emotion-item span {
                    font-size: 1rem;
                    font-weight: bold;
                    color: var(--primary-color);
                }
                
                .global-stats {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin: 1rem 0;
                }
                
                .country-stat {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.5rem;
                    background: #f8f9fa;
                    border-radius: 8px;
                }
                
                .flag {
                    font-size: 1.5rem;
                }
                
                .country {
                    flex: 1;
                    font-weight: 500;
                }
                
                .count {
                    color: var(--primary-color);
                    font-weight: bold;
                }
                
                .connection-stats {
                    display: flex;
                    gap: 2rem;
                    margin: 1rem 0;
                    justify-content: center;
                }
                
                .connection-item {
                    text-align: center;
                }
                
                .connection-item .number {
                    display: block;
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--primary-color);
                }
                
                .connection-item .label {
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                }
                
                .support-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                
                .poll-item {
                    background: #f8f9fa;
                    padding: 1rem;
                    border-radius: 8px;
                    margin-bottom: 1rem;
                }
                
                .poll-question {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    color: var(--primary-color);
                }
                
                .poll-options {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .poll-option {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem;
                    background: white;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background 0.2s ease;
                }
                
                .poll-option:hover {
                    background: #e9ecef;
                }
                
                .poll-option input[type="radio"] {
                    margin: 0;
                }
                
                .profile-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .form-row {
                    display: flex;
                    gap: 1rem;
                }
                
                .form-input {
                    flex: 1;
                    padding: 0.75rem;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    font-size: 1rem;
                }
                
                .feed-loading {
                    text-align: center;
                    padding: 2rem;
                    color: var(--text-secondary);
                    font-style: italic;
                }
                
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @media (max-width: 768px) {
                    .form-row {
                        flex-direction: column;
                    }
                    
                    .community-actions {
                        grid-template-columns: 1fr 1fr;
                    }
                    
                    .match-teams {
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                    
                    .emotion-stats {
                        gap: 1rem;
                    }
                    
                    .support-actions {
                        flex-direction: column;
                    }
                }
            </style>
        `;
    }

    attachCommunityEventListeners() {
        // Profile setup
        const saveProfileBtn = document.getElementById('save-profile');
        if (saveProfileBtn) {
            saveProfileBtn.addEventListener('click', () => this.saveUserProfile());
        }

        // Quick actions
        document.getElementById('vote-poll')?.addEventListener('click', () => this.openPollModal());
        document.getElementById('share-emotion')?.addEventListener('click', () => this.shareEmotion());
        document.getElementById('view-stats')?.addEventListener('click', () => this.viewStats());
        document.getElementById('send-support')?.addEventListener('click', () => this.sendSupport());

        // Feed actions
        document.getElementById('refresh-feed')?.addEventListener('click', () => this.refreshLiveFeed());

        // Support actions
        document.getElementById('quick-support')?.addEventListener('click', () => this.quickSupport());
        document.getElementById('detailed-feedback')?.addEventListener('click', () => this.detailedFeedback());

        // Poll actions
        document.getElementById('create-poll')?.addEventListener('click', () => this.createPoll());

        // Global network
        document.getElementById('join-global')?.addEventListener('click', () => this.joinGlobalNetwork());

        // Initial load
        this.refreshPolls();
        this.refreshLiveFeed();
    }

    // Profile Management
    saveUserProfile() {
        const name = document.getElementById('user-name').value.trim();
        const favoriteTeam = document.getElementById('favorite-team').value.trim();

        if (!name || !favoriteTeam) {
            window.SoccerBox.Utils.showNotification('Compila tutti i campi', 'error');
            return;
        }

        this.userProfile.name = name;
        this.userProfile.favoriteTeam = favoriteTeam;
        this.userProfile.joinDate = new Date().toISOString();

        document.getElementById('profile-setup').style.display = 'none';
        this.saveCommunityData();
        window.SoccerBox.Utils.showNotification(`Benvenuto ${name}! Profilo salvato.`, 'success');
    }

    checkUserProfile() {
        if (!this.userProfile.name) {
            document.getElementById('profile-setup').style.display = 'block';
        }
    }

    // Statistics
    calculateStats() {
        return {
            matchesFollowed: Math.floor(Math.random() * 20) + 15,
            activeFans: Math.floor(Math.random() * 200) + 247,
            satisfaction: Math.floor(Math.random() * 15) + 85
        };
    }

    // Emotions Management
    shareEmotion() {
        const emotions = ['😍', '🔥', '⚡', '💪', '🎯', '👏', '❤️', '🚀', '⭐', '🎉'];
        const emotionButtons = emotions.map(emotion => 
            `<button class="emotion-selector" data-emotion="${emotion}">${emotion}</button>`
        ).join('');

        const modal = this.createModal('Condividi la tua Emozione', `
            <p>Come ti senti in questo momento?</p>
            <div class="emotion-grid">
                ${emotionButtons}
            </div>
        `);

        // Add event listeners to emotion buttons
        modal.querySelectorAll('.emotion-selector').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const emotion = e.target.dataset.emotion;
                this.addEmotion(emotion);
                this.closeModal(modal);
            });
        });
    }

    addEmotion(emotion) {
        const emotionData = {
            id: window.SoccerBox.Utils.generateId(),
            emotion,
            timestamp: new Date().toISOString(),
            user: this.userProfile.name || 'Anonimo'
        };

        this.emotions.push(emotionData);
        this.userProfile.emotionsShared++;
        
        this.saveCommunityData();
        this.addToLiveFeed('emotion', `${this.userProfile.name} ha condiviso: ${emotion}`, emotionData);
        
        window.SoccerBox.Utils.showNotification(`Emozione ${emotion} condivisa!`, 'success');
        this.refreshInterface();
    }

    getEmotionCount(emotion) {
        return this.emotions.filter(e => e.emotion === emotion).length;
    }

    // Live Feed Management
    refreshLiveFeed() {
        const feedContainer = document.getElementById('live-feed');
        if (!feedContainer) return;

        // Combine different sources
        const feedItems = [
            ...this.generateMatchFeed(),
            ...this.generateEmotionsFeed(),
            ...this.generateSupportFeed(),
            ...this.generateGlobalFeed()
        ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        if (feedItems.length === 0) {
            feedContainer.innerHTML = '<div class="empty-state">Nessuna attività recente</div>';
            return;
        }

        feedContainer.innerHTML = feedItems.slice(0, 10).map(item => `
            <div class="feed-item">
                <div class="feed-header">
                    <span class="feed-source">${item.source}</span>
                    <span class="feed-time">${this.getTimeAgo(item.timestamp)}</span>
                </div>
                <div class="feed-content">${item.content}</div>
                ${item.reactions ? `<div class="feed-reactions">${item.reactions}</div>` : ''}
            </div>
        `).join('');
    }

    generateMatchFeed() {
        const currentMatch = window.SoccerBox.sharedData.currentMatch;
        if (!currentMatch || !currentMatch.notes) return [];

        return currentMatch.notes.slice(-5).map(note => ({
            source: '⚽ Match Live',
            content: `<strong>${note.time}</strong> - ${note.text}`,
            timestamp: note.created,
            reactions: '🔥 15 reazioni'
        }));
    }

    generateEmotionsFeed() {
        return this.emotions.slice(-3).map(emotion => ({
            source: '😍 Community',
            content: `${emotion.user} ha condiviso: ${emotion.emotion}`,
            timestamp: emotion.timestamp,
            reactions: '👏 3 reazioni'
        }));
    }

    generateSupportFeed() {
        return this.supportMessages.slice(-2).map(msg => ({
            source: '💌 Supporto',
            content: `Nuovo messaggio di supporto inviato alla squadra`,
            timestamp: msg.timestamp,
            reactions: '❤️ 8 reazioni'
        }));
    }

    generateGlobalFeed() {
        const globalEvents = [
            { content: '🌍 Nuovo record: 5.000 squadre attive nel network globale!', reactions: '🚀 234 reazioni' },
            { content: '🏆 La squadra più attiva oggi: FC Barcelona Youth con 47 interazioni', reactions: '⭐ 89 reazioni' },
            { content: '📊 Statistica del giorno: 78% dei tifosi preferisce la formazione 4-3-3', reactions: '📈 156 reazioni' }
        ];

        return globalEvents.map(event => ({
            source: '🌍 Network Globale',
            content: event.content,
            timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
            reactions: event.reactions
        }));
    }

    addToLiveFeed(type, content, data) {
        this.liveFeed.unshift({
            id: window.SoccerBox.Utils.generateId(),
            type,
            content,
            data,
            timestamp: new Date().toISOString()
        });

        // Keep only recent items
        this.liveFeed = this.liveFeed.slice(0, 50);
        this.refreshLiveFeed();
    }

    startLiveFeedUpdates() {
        // Simulate live updates every 30 seconds
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.refreshLiveFeed();
            }
        }, 30000);
    }

    // Support Messages
    sendSupport() {
        const message = prompt('Scrivi un messaggio di supporto per la squadra:');
        if (message && message.trim()) {
            this.addSupportMessage(message.trim());
        }
    }

    quickSupport() {
        const quickMessages = [
            "Forza ragazzi! 💪",
            "Crediamo in voi! ⚡",
            "Siamo con voi! ❤️",
            "Vinceremo insieme! 🏆",
            "Grande squadra! 👏"
        ];

        const message = quickMessages[Math.floor(Math.random() * quickMessages.length)];
        this.addSupportMessage(message);
    }

    detailedFeedback() {
        const modal = this.createModal('Feedback Dettagliato', `
            <textarea id="detailed-feedback-text" placeholder="Condividi il tuo feedback dettagliato con la squadra..." 
                      style="width: 100%; height: 120px; padding: 1rem; border: 1px solid #ddd; border-radius: 8px;"></textarea>
            <div style="margin-top: 1rem;">
                <button id="send-detailed-feedback" class="btn">📝 Invia Feedback</button>
            </div>
        `);

        modal.querySelector('#send-detailed-feedback').addEventListener('click', () => {
            const feedback = modal.querySelector('#detailed-feedback-text').value.trim();
            if (feedback) {
                this.addSupportMessage(feedback);
                this.closeModal(modal);
            } else {
                window.SoccerBox.Utils.showNotification('Inserisci un feedback', 'error');
            }
        });
    }

    addSupportMessage(message) {
        const supportData = {
            id: window.SoccerBox.Utils.generateId(),
            message,
            timestamp: new Date().toISOString(),
            user: this.userProfile.name || 'Anonimo',
            sent: true
        };

        this.supportMessages.push(supportData);
        this.userProfile.messagesShared++;

        this.saveCommunityData();
        this.addToLiveFeed('support', 'Nuovo messaggio di supporto inviato', supportData);
      
