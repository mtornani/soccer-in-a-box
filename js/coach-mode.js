/**
 * Soccer in a Box - Coach Mode
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
                        <input type="text" id="home-team" placeholder="Squadra Casa" class="form-input">
                        <input type="text" id="away-team" placeholder="Squadra Ospite" class="form-input">
                    </div>
                    <div class="form-row">
                        <input type="date" id="match-date" class="form-input">
                        <input type="text" id="venue" placeholder="Venue" class="form-input">
                    </div>
                    <div class="form-row">
                        <select id="competition" class="form-input">
                            <option value="">Competizione</option>
                            <option value="campionato">Campionato</option>
                            <option value="coppa">Coppa</option>
                            <option value="amichevole">Amichevole</option>
                            <option value="playoff">Playoff</option>
                        </select>
                        <select id="weather" class="form-input">
                            <option value="">Condizioni Meteo</option>
                            <option value="sole">☀️ Sole</option>
                            <option value="nuvoloso">☁️ Nuvoloso</option>
                            <option value="pioggia">🌧️ Pioggia</option>
                            <option value="vento">💨 Ventoso</option>
                        </select>
                    </div>
                    <button id="start-match" class="btn">📊 Inizia Analisi Match</button>
                </div>
            </div>

            <!-- Live Analysis Section -->
            <div id="live-analysis" class="feature-card" style="display: none;">
                <div class="analysis-header">
                    <h3 class="feature-title">⏱️ Analisi Live</h3>
                    <div class="timer-controls">
                        <div id="match-timer" class="timer-display">00:00</div>
                        <button id="timer-toggle" class="btn btn-secondary">▶️ Start</button>
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
                    <h4>Timeline Note:</h4>
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
                        <input type="text" id="player-position" placeholder="Posizione" class="form-input">
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
                    <h4>Giocatori Valutati:</h4>
                    <div id="players-grid"></div>
                </div>
            </div>

            <!-- Reports Section -->
            <div class="feature-card">
                <h3 class="feature-title">📊 Report e Export</h3>
                <div class="report-stats" id="report-stats"></div>
                <div class="export-buttons">
                    <button id="export-markdown" class="btn">📄 Export Markdown</button>
                    <button id="export-txt" class="btn btn-secondary">📝 Export TXT</button>
                    <button id="share-community" class="btn" style="background: var(--accent-color);">
                        🌍 Condividi con Community
                    </button>
                </div>
            </div>

            <!-- Additional CSS -->
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
