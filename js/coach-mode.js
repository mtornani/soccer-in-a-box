/**
 * Soccer in a Box - Coach Mode (COMPLETO)
 * Professional match analysis, scouting, and player evaluation tools
 */

class CoachMode {
    constructor() {
        this.currentMatch = null;
        this.matchTimer = null;
        this.startTime = null;
        this.elapsedTime = 0;
        this.isRunning = false;
        this.notes = [];
        this.players = [];
        this.matchData = {};
        this.playerRatings = {};
        
        this.init();
    }

    init() {
        console.log('🏈 Initializing Coach Mode');
        this.setupEventListeners();
        this.loadExistingData();
        this.createCoachInterface();
    }

    setupEventListeners() {
        // Listen for mode initialization
        window.SoccerBox.eventBus.on('mode:coach:init', () => {
            this.onModeActivated();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (window.SoccerBox.currentMode !== 'coach') return;
            
            // Ctrl + Enter = Quick note
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.focusNoteInput();
            }
            
            // Space = Toggle timer (when not in input)
            if (e.key === ' ' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                this.toggleTimer();
            }
        });
    }

    onModeActivated() {
        console.log('🎯 Coach mode activated');
        this.refreshInterface();
        this.loadCurrentMatch();
    }

    loadExistingData() {
        // Load saved match data
        const savedMatch = localStorage.getItem('coach_current_match');
        if (savedMatch) {
            this.matchData = JSON.parse(savedMatch);
            this.notes = this.matchData.notes || [];
            this.players = this.matchData.players || [];
        }
    }

    saveMatchData() {
        if (this.matchData) {
            this.matchData.notes = this.notes;
            this.matchData.players = this.players;
            this.matchData.elapsedTime = this.elapsedTime;
            localStorage.setItem('coach_current_match', JSON.stringify(this.matchData));
            
            // Update shared data for community
            window.SoccerBox.sharedData.currentMatch = this.matchData;
            window.SoccerBox.DataManager.saveSharedData();
        }
    }

    createCoachInterface() {
        const coachScreen = document.getElementById('coach-screen');
        if (!coachScreen) return;

        // Replace the existing content with full coach interface
        const container = coachScreen.querySelector('.app-container');
        if (container) {
            container.innerHTML = this.getCoachHTML();
            this.attachCoachEventListeners();
        }
    }

    getCoachHTML() {
        return `
            <!-- Match Setup Section -->
            <div id="match-setup" class="feature-card">
                <h3 class="feature-title">🏟️ Setup Match</h3>
                <div class="match-form">
                    <div class="form-row">
                        <input type="text" id="home-team" placeholder="Squadra Casa" class="form-input" value="${this.matchData.homeTeam || ''}">
                        <input type="text" id="away-team" placeholder="Squadra Ospite" class="form-input" value="${this.matchData.awayTeam || ''}">
                    </div>
                    <div class="form-row">
                        <input type="date" id="match-date" class="form-input" value="${this.matchData.date || new Date().toISOString().split('T')[0]}">
                        <input type="text" id="venue" placeholder="Venue" class="form-input" value="${this.matchData.venue || ''}">
                    </div>
                    <div class="form-row">
                        <select id="competition" class="form-input">
                            <option value="">Competizione</option>
                            <option value="campionato" ${this.matchData.competition === 'campionato' ? 'selected' : ''}>Campionato</option>
                            <option value="coppa" ${this.matchData.competition === 'coppa' ? 'selected' : ''}>Coppa</option>
                            <option value="amichevole" ${this.matchData.competition === 'amichevole' ? 'selected' : ''}>Amichevole</option>
                            <option value="playoff" ${this.matchData.competition === 'playoff' ? 'selected' : ''}>Playoff</option>
                        </select>
                        <select id="weather" class="form-input">
                            <option value="">Condizioni Meteo</option>
                            <option value="sole" ${this.matchData.weather === 'sole' ? 'selected' : ''}>☀️ Sole</option>
                            <option value="nuvoloso" ${this.matchData.weather === 'nuvoloso' ? 'selected' : ''}>☁️ Nuvoloso</option>
                            <option value="pioggia" ${this.matchData.weather === 'pioggia' ? 'selected' : ''}>🌧️ Pioggia</option>
                            <option value="vento" ${this.matchData.weather === 'vento' ? 'selected' : ''}>💨 Ventoso</option>
                        </select>
                    </div>
                    <button id="start-match" class="btn">📊 ${this.matchData.id ? 'Aggiorna Match' : 'Inizia Analisi Match'}</button>
                </div>
            </div>

            <!-- Live Analysis Section -->
            <div id="live-analysis" class="feature-card" style="display: ${this.matchData.id ? 'block' : 'none'};">
                <div class="analysis-header">
                    <h3 class="feature-title">⏱️ Analisi Live</h3>
                    <div class="timer-controls">
                        <div id="match-timer" class="timer-display">${window.SoccerBox.Utils.formatTime(this.elapsedTime)}</div>
                        <button id="timer-toggle" class="btn btn-secondary">${this.isRunning ? '⏸️ Pause' : '▶️ Start'}</button>
                        <button id="timer-reset" class="btn">🔄 Reset</button>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="quick-actions">
                    <h4>Azioni Rapide:</h4>
                    <div class="quick-buttons">
                        <button class="quick-btn" data-action="goal">⚽ Gol</button>
                        <button class="quick-btn" data-action="yellow">🟨 Ammonizione</button>
                        <button class="quick-btn" data-action="red">🟥 Espulsione</button>
                        <button class="quick-btn" data-action="substitution">🔄 Cambio</button>
                        <button class="quick-btn" data-action="corner">📐 Corner</button>
                        <button class="quick-btn" data-action="foul">🚫 Fallo</button>
                        <button class="quick-btn" data-action="offside">🏁 Fuorigioco</button>
                        <button class="quick-btn" data-action="shot">🎯 Tiro</button>
                    </div>
                </div>

                <!-- Note Input -->
                <div class="note-input-section">
                    <textarea id="live-notes" placeholder="Inserisci note dettagliate... (Ctrl+Enter per salvare rapidamente)" 
                              class="note-textarea"></textarea>
                    <button id="add-note" class="btn">💾 Aggiungi Nota</button>
                </div>

                <!-- Notes Timeline -->
                <div class="notes-timeline" id="notes-timeline">
                    <h4>Timeline Note (${this.notes.length}):</h4>
                    <div id="notes-list"></div>
                </div>
            </div>

            <!-- Player Evaluation -->
            <div class="feature-card">
                <h3 class="feature-title">👤 Valutazione Giocatori</h3>
                <div class="player-form">
                    <div class="form-row">
                        <input type="text" id="player-name" placeholder="Nome Giocatore" class="form-input">
                        <input type="number" id="player-number" placeholder="Numero" class="form-input" min="1" max="99">
                        <input type="text" id="player-position" placeholder="Posizione (es. CC, ATT, DIF)" class="form-input">
                    </div>
                    
                    <!-- Skill Ratings -->
                    <div class="skills-section">
                        <h4>Valutazioni Tecniche:</h4>
                        <div class="skill-ratings">
                            <div class="skill-row">
                                <label>Controllo Palla:</label>
                                <div class="stars" data-skill="ball-control">
                                    <span class="star" data-rating="1">⭐</span>
                                    <span class="star" data-rating="2">⭐</span>
                                    <span class="star" data-rating="3">⭐</span>
                                    <span class="star" data-rating="4">⭐</span>
                                    <span class="star" data-rating="5">⭐</span>
                                </div>
                            </div>
                            <div class="skill-row">
                                <label>Passaggio:</label>
                                <div class="stars" data-skill="passing">
                                    <span class="star" data-rating="1">⭐</span>
                                    <span class="star" data-rating="2">⭐</span>
                                    <span class="star" data-rating="3">⭐</span>
                                    <span class="star" data-rating="4">⭐</span>
                                    <span class="star" data-rating="5">⭐</span>
                                </div>
                            </div>
                            <div class="skill-row">
                                <label>Tiro:</label>
                                <div class="stars" data-skill="shooting">
                                    <span class="star" data-rating="1">⭐</span>
                                    <span class="star" data-rating="2">⭐</span>
                                    <span class="star" data-rating="3">⭐</span>
                                    <span class="star" data-rating="4">⭐</span>
                                    <span class="star" data-rating="5">⭐</span>
                                </div>
                            </div>
                            <div class="skill-row">
                                <label>Difesa:</label>
                                <div class="stars" data-skill="defending">
                                    <span class="star" data-rating="1">⭐</span>
                                    <span class="star" data-rating="2">⭐</span>
                                    <span class="star" data-rating="3">⭐</span>
                                    <span class="star" data-rating="4">⭐</span>
                                    <span class="star" data-rating="5">⭐</span>
                                </div>
                            </div>
                            <div class="skill-row">
                                <label>Fisico:</label>
                                <div class="stars" data-skill="physical">
                                    <span class="star" data-rating="1">⭐</span>
                                    <span class="star" data-rating="2">⭐</span>
                                    <span class="star" data-rating="3">⭐</span>
                                    <span class="star" data-rating="4">⭐</span>
                                    <span class="star" data-rating="5">⭐</span>
                                </div>
                            </div>
                            <div class="skill-row">
                                <label>Mentalità:</label>
                                <div class="stars" data-skill="mental">
                                    <span class="star" data-rating="1">⭐</span>
                                    <span class="star" data-rating="2">⭐</span>
                                    <span class="star" data-rating="3">⭐</span>
                                    <span class="star" data-rating="4">⭐</span>
                                    <span class="star" data-rating="5">⭐</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <textarea id="player-notes" placeholder="Note specifiche sul giocatore..." class="note-textarea"></textarea>
                    <button id="save-player" class="btn">💾 Salva Giocatore</button>
                </div>

                <!-- Players List -->
                <div id="players-list" class="players-section">
                    <h4>Giocatori Valutati (${this.players.length}):</h4>
                    <div id="players-grid"></div>
                </div>
            </div>

            <!-- Reports Section -->
            <div class="feature-card">
                <h3 class="feature-title">📊 Report e Export</h3>
                <div class="report-stats" id="report-stats">
                    <div class="stats-summary">
                        <div class="stat-item">
                            <span class="stat-number">${this.notes.length}</span>
                            <span class="stat-label">Note Totali</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${this.players.length}</span>
                            <span class="stat-label">Giocatori Valutati</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${window.SoccerBox.Utils.formatTime(this.elapsedTime)}</span>
                            <span class="stat-label">Durata Match</span>
                        </div>
                    </div>
                </div>
                <div class="export-buttons">
                    <button id="export-markdown" class="btn">📄 Export Markdown</button>
                    <button id="export-txt" class="btn btn-secondary">📝 Export TXT</button>
                    <button id="share-community" class="btn" style="background: var(--accent-color);">
                        🌍 Condividi con Community
                    </button>
                    <button id="clear-match" class="btn" style="background: #dc3545;">
                        🗑️ Pulisci Match
                    </button>
                </div>
            </div>

            <!-- CSS Styles -->
            <style>
                .match-form, .player-form {
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
                
                .form-input:focus {
                    outline: none;
                    border-color: var(--primary-color);
                    box-shadow: 0 0 0 2px rgba(44, 90, 160, 0.1);
                }
                
                .analysis-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                
                .timer-controls {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .timer-display {
                    font-size: 2rem;
                    font-weight: bold;
                    color: var(--primary-color);
                    font-family: monospace;
                    min-width: 80px;
                    text-align: center;
                }
                
                .quick-actions {
                    margin: 1rem 0;
                }
                
                .quick-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                }
                
                .quick-btn {
                    background: var(--accent-color);
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.2s ease;
                }
                
                .quick-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                
                .note-input-section {
                    margin: 1rem 0;
                }
                
                .note-textarea {
                    width: 100%;
                    min-height: 100px;
                    padding: 1rem;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    resize: vertical;
                    font-family: inherit;
                    margin-bottom: 0.5rem;
                }
                
                .skills-section {
                    margin: 1rem 0;
                }
                
                .skill-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                    padding: 0.5rem;
                    background: #f8f9fa;
                    border-radius: 8px;
                }
                
                .skill-row label {
                    font-weight: 500;
                    min-width: 120px;
                }
                
                .stars {
                    display: flex;
                    gap: 0.2rem;
                }
                
                .star {
                    cursor: pointer;
                    font-size: 1.2rem;
                    opacity: 0.3;
                    transition: opacity 0.2s ease;
                    user-select: none;
                }
                
                .star.active {
                    opacity: 1;
                }
                
                .star:hover {
                    opacity: 0.7;
                }
                
                .players-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .player-card {
                    background: #f8f9fa;
                    padding: 1rem;
                    border-radius: 8px;
                    border-left: 4px solid var(--primary-color);
                    transition: transform 0.2s ease;
                }
                
                .player-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }
                
                .player-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }
                
                .player-name {
                    font-weight: bold;
                    font-size: 1.1rem;
                    color: var(--primary-color);
                }
                
                .player-number {
                    background: var(--primary-color);
                    color: white;
                    padding: 0.2rem 0.5rem;
                    border-radius: 50%;
                    font-size: 0.9rem;
                    min-width: 25px;
                    text-align: center;
                }
                
                .player-position {
                    color: var(--text-secondary);
                    font-style: italic;
                    margin-bottom: 0.5rem;
                }
                
                .player-skills {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.3rem;
                    font-size: 0.8rem;
                    margin-bottom: 0.5rem;
                }
                
                .player-notes {
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    font-style: italic;
                    margin-top: 0.5rem;
                    padding-top: 0.5rem;
                    border-top: 1px solid #e9ecef;
                }
                
                .notes-timeline {
                    margin-top: 1rem;
                }
                
                #notes-list {
                    max-height: 300px;
                    overflow-y: auto;
                    margin-top: 0.5rem;
                }
                
                .note-item {
                    background: #f8f9fa;
                    padding: 0.75rem;
                    margin-bottom: 0.5rem;
                    border-radius: 8px;
                    border-left: 3px solid var(--accent-color);
                }
                
                .note-timestamp {
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                    font-weight: bold;
                    font-family: monospace;
                }
                
                .note-content {
                    margin-top: 0.3rem;
                    line-height: 1.4;
                }
                
                .stats-summary {
                    display: flex;
                    gap: 2rem;
                    margin-bottom: 1rem;
                    flex-wrap: wrap;
                }
                
                .stat-item {
                    text-align: center;
                }
                
                .stat-number {
                    display: block;
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--primary-color);
                }
                
                .stat-label {
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                }
                
                .export-buttons {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                    margin-top: 1rem;
                }
                
                @media (max-width: 768px) {
                    .form-row {
                        flex-direction: column;
                    }
                    
                    .analysis-header {
                        flex-direction: column;
                        gap: 1rem;
                        align-items: stretch;
                    }
                    
                    .timer-controls {
                        justify-content: center;
                    }
                    
                    .quick-buttons {
                        justify-content: center;
                    }
                    
                    .export-buttons {
                        flex-direction: column;
                    }
                    
                    .stats-summary {
                        justify-content: center;
                    }
                    
                    .players-grid {
                        grid-template-columns: 1fr;
                    }
                }
                
                .empty-state {
                    text-align: center;
                    padding: 2rem;
                    color: var(--text-secondary);
                    font-style: italic;
                }
            </style>
        `;
    }

    attachCoachEventListeners() {
        // Match setup
        const startMatchBtn = document.getElementById('start-match');
        if (startMatchBtn) {
            startMatchBtn.addEventListener('click', () => this.startMatch());
        }

        // Timer controls
        const timerToggle = document.getElementById('timer-toggle');
        const timerReset = document.getElementById('timer-reset');
        
        if (timerToggle) {
            timerToggle.addEventListener('click', () => this.toggleTimer());
        }
        
        if (timerReset) {
            timerReset.addEventListener('click', () => this.resetTimer());
        }

        // Quick action buttons
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.addQuickNote(action);
            });
        });

        // Add note button
        const addNoteBtn = document.getElementById('add-note');
        if (addNoteBtn) {
            addNoteBtn.addEventListener('click', () => this.addNote());
        }

        // Live notes enter key
        const liveNotesTextarea = document.getElementById('live-notes');
        if (liveNotesTextarea) {
            liveNotesTextarea.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === 'Enter') {
                    e.preventDefault();
                    this.addNote();
                }
            });
        }

        // Player rating stars
        document.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', (e) => this.setPlayerRating(e));
        });

        // Save player button
        const savePlayerBtn = document.getElementById('save-player');
        if (savePlayerBtn) {
            savePlayerBtn.addEventListener('click', () => this.savePlayer());
        }

        // Export buttons
        const exportMdBtn = document.getElementById('export-markdown');
        const exportTxtBtn = document.getElementById('export-txt');
        const shareCommunityBtn = document.getElementById('share-community');
        const clearMatchBtn = document.getElementById('clear-match');

        if (exportMdBtn) {
            exportMdBtn.addEventListener('click', () => this.exportMarkdown());
        }
        
        if (exportTxtBtn) {
            exportTxtBtn.addEventListener('click', () => this.exportTxt());
        }
        
        if (shareCommunityBtn) {
            shareCommunityBtn.addEventListener('click', () => this.shareToCommunity());
        }

        if (clearMatchBtn) {
            clearMatchBtn.addEventListener('click', () => this.clearMatch());
        }

        // Initial data load
        this.refreshNotesList();
        this.refreshPlayersList();
    }

    refreshInterface() {
        if (this.matchData.id) {
            document.getElementById('live-analysis').style.display = 'block';
        }
        this.refreshNotesList();
        this.refreshPlayersList();
    }

    loadCurrentMatch() {
        if (this.matchData.elapsedTime) {
            this.elapsedTime = this.matchData.elapsedTime;
            this.updateTimerDisplay();
        }
    }

    // Match Management
    startMatch() {
        const homeTeam = document.getElementById('home-team').value;
        const awayTeam = document.getElementById('away-team').value;
        const matchDate = document.getElementById('match-date').value;
        const venue = document.getElementById('venue').value;
        const competition = document.getElementById('competition').value;
        const weather = document.getElementById('weather').value;

        if (!homeTeam || !awayTeam) {
            window.SoccerBox.Utils.showNotification('Inserisci almeno i nomi delle squadre', 'error');
            return;
        }

        this.matchData = {
            id: this.matchData.id || window.SoccerBox.Utils.generateId(),
            homeTeam,
            awayTeam,
            date: matchDate || new Date().toISOString().split('T')[0],
            venue,
            competition,
            weather,
            startTime: this.matchData.startTime || new Date().toISOString(),
            notes: this.notes,
            players: this.players
        };

        // Hide setup, show analysis
        document.getElementById('match-setup').style.display = 'none';
        document.getElementById('live-analysis').style.display = 'block';

        this.saveMatchData();
        window.SoccerBox.Utils.showNotification('Match configurato! Timer disponibile.', 'success');
    }

    clearMatch() {
        if (confirm('Sei sicuro di voler cancellare tutti i dati del match corrente? Questa azione non può essere annullata.')) {
            this.matchData = {};
            this.notes = [];
            this.players = [];
            this.elapsedTime = 0;
            this.resetTimer();
            
            localStorage.removeItem('coach_current_match');
            
            // Reset interface
            document.getElementById('match-setup').style.display = 'block';
            document.getElementById('live-analysis').style.display = 'none';
            
            // Clear form
            document.getElementById('home-team').value = '';
            document.getElementById('away-team').value = '';
            document.getElementById('venue').value = '';
            document.getElementById('competition').value = '';
            document.getElementById('weather').value = '';
            
            this.refreshInterface();
            window.SoccerBox.Utils.showNotification('Match cancellato', 'success');
        }
    }

    // Timer Functions
    toggleTimer() {
        if (this.isRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        if (!this.startTime) {
            this.startTime = Date.now() - this.elapsedTime * 1000;
        } else {
            this.startTime = Date.now() - this.elapsedTime * 1000;
        }
        
        this.isRunning = true;
        this.matchTimer = setInterval(() => this.updateTimer(), 1000);
        
        const toggleBtn = document.getElementById('timer-toggle');
        if (toggleBtn) {
            toggleBtn.textContent = '⏸️ Pause';
        }
    }

    pauseTimer() {
        if (this.matchTimer) {
            clearInterval(this.matchTimer);
            this.matchTimer = null;
        }
        this.isRunning = false;
        
        const toggleBtn = document.getElementById('timer-toggle');
        if (toggleBtn) {
            toggleBtn.textContent = '▶️ Start';
        }
    }

    resetTimer() {
        this.pauseTimer();
        this.elapsedTime = 0;
        this.startTime = null;
        this.updateTimerDisplay();
        this.saveMatchData();
    }

    updateTimer() {
        if (this.isRunning && this.startTime) {
            this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
            this.updateTimerDisplay();
            
            // Auto-save every 30 seconds