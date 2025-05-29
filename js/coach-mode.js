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
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.2s ease;
                }
                
                .quick-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                
                .note-textarea {
                    width: 100%;
                    min-height: 100px;
                    padding: 1rem;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    resize: vertical;
                    font-family: inherit;
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
                }
                
                .star.active {
                    opacity: 1;
                }
                
                .star:hover {
                    opacity: 0.7;
                }
                
                .players-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .player-card {
                    background: #f8f9fa;
                    padding: 1rem;
                    border-radius: 8px;
                    border-left: 4px solid var(--primary-color);
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
                }
                
                .player-number {
                    background: var(--primary-color);
                    color: white;
                    padding: 0.2rem 0.5rem;
                    border-radius: 50%;
                    font-size: 0.9rem;
                }
                
                .player-skills {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.3rem;
                    font-size: 0.8rem;
                }
                
                .notes-list {
                    max-height: 300px;
                    overflow-y: auto;
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
                }
                
                .note-content {
                    margin-top: 0.3rem;
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
                    }
                    
                    .quick-buttons {
                        justify-content: center;
                    }
                    
                    .export-buttons {
                        flex-direction: column;
                    }
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

        if (exportMdBtn) {
            exportMdBtn.addEventListener('click', () => this.exportMarkdown());
        }
        
        if (exportTxtBtn) {
            exportTxtBtn.addEventListener('click', () => this.exportTxt());
        }
        
        if (shareCommunityBtn) {
            shareCommunityBtn.addEventListener('click', () => this.shareToCommunity());
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
            alert('Inserisci almeno i nomi delle squadre');
            return;
        }

        this.matchData = {
            id: window.SoccerBox.Utils.generateId(),
            homeTeam,
            awayTeam,
            date: matchDate || new Date().toISOString().split('T')[0],
            venue,
            competition,
            weather,
            startTime: new Date().toISOString(),
            notes: [],
            players: []
        };

        // Hide setup, show analysis
        document.getElementById('match-setup').style.display = 'none';
        document.getElementById('live-analysis').style.display = 'block';

        // Update shared data for community
        window.SoccerBox.sharedData.currentMatch = this.matchData;
        window.SoccerBox.DataManager.saveSharedData();

        window.SoccerBox.Utils.showNotification('Match iniziato! Timer disponibile.', 'success');
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
        
        document.getElementById('timer-toggle').textContent = '⏸️ Pause';
    }

    pauseTimer() {
        if (this.matchTimer) {
            clearInterval(this.matchTimer);
            this.matchTimer = null;
        }
        this.isRunning = false;
        document.getElementById('timer-toggle').textContent = '▶️ Start';
    }

    resetTimer() {
        this.pauseTimer();
        this.elapsedTime = 0;
        this.startTime = null;
        this.updateTimerDisplay();
    }

    updateTimer() {
        if (this.isRunning && this.startTime) {
            this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
            this.updateTimerDisplay();
        }
    }

    updateTimerDisplay() {
        const display = document.getElementById('match-timer');
        if (display) {
            display.textContent = window.SoccerBox.Utils.formatTime(this.elapsedTime);
        }
    }

    // Notes Management
    addQuickNote(action) {
        const actionTexts = {
            goal: '⚽ GOL!',
            yellow: '🟨 Cartellino giallo',
            red: '🟥 Cartellino rosso',
            substitution: '🔄 Sostituzione',
            corner: '📐 Calcio d\'angolo',
            foul: '🚫 Fallo',
            offside: '🏁 Fuorigioco',
            shot: '🎯 Tiro in porta'
        };

        const noteText = actionTexts[action] || action;
        this.addNoteWithText(noteText);
    }

    addNote() {
        const noteInput = document.getElementById('live-notes');
        if (noteInput && noteInput.value.trim()) {
            this.addNoteWithText(noteInput.value.trim());
            noteInput.value = '';
        }
    }

    addNoteWithText(text) {
        const note = {
            id: window.SoccerBox.Utils.generateId(),
            timestamp: this.elapsedTime,
            time: window.SoccerBox.Utils.formatTime(this.elapsedTime),
            text: text,
            created: new Date().toISOString()
        };

        this.notes.push(note);
        this.matchData.notes = this.notes;
        
        this.refreshNotesList();
        this.saveMatchData();

        // Share to community
        window.SoccerBox.eventBus.emit('match:note:added', note);
    }

    refreshNotesList() {
        const notesList = document.getElementById('notes-list');
        if (!notesList) return;

        notesList.innerHTML = this.notes
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(note => `
                <div class="note-item">
                    <div class="note-timestamp">${note.time}</div>
                    <div class="note-content">${note.text}</div>
                </div>
            `).join('');
    }

    focusNoteInput() {
        const noteInput = document.getElementById('live-notes');
        if (noteInput) {
            noteInput.focus();
        }
    }

    // Player Evaluation
    setPlayerRating(event) {
        const star = event.target;
        const rating = parseInt(star.dataset.rating);
        const skillGroup = star.closest('.stars');
        const skill = skillGroup.dataset.skill;
        
        // Update visual stars
        const stars = skillGroup.querySelectorAll('.star');
        stars.forEach((s, index) => {
            if (index < rating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
        
        // Store rating
        if (!this.playerRatings.current) {
            this.playerRatings.current = {};
        }
        this.playerRatings.current[skill] = rating;
    }

    savePlayer() {
        const name = document.getElementById('player-name').value;
        const number = document.getElementById('player-number').value;
        const position = document.getElementById('player-position').value;
        const notes = document.getElementById('player-notes').value;

        if (!name) {
            alert('Inserisci il nome del giocatore');
            return;
        }

        const player = {
            id: window.SoccerBox.Utils.generateId(),
            name,
            number: number || null,
            position,
            notes,
            ratings: { ...this.playerRatings.current } || {},
            matchId: this.matchData?.id,
            evaluatedAt: new Date().toISOString()
        };

        this.players.push(player);
        this.matchData.players = this.players;
        
        // Clear form
        document.getElementById('player-name').value = '';
        document.getElementById('player-number').value = '';
        document.getElementById('player-position').value = '';
        document.getElementById('player-notes').value = '';
        
        // Reset ratings
        document.querySelectorAll('.star').forEach(star => {
            star.classList.remove('active');
        });
        this.playerRatings.current = {};

        this.refreshPlayersList();
        this.saveMatchData();
        
        window.SoccerBox.Utils.showNotification(`Giocatore ${name} salvato!`, 'success');
    }

    refreshPlayersList() {
        const playersGrid = document.getElementById('players-grid');
        if (!playersGrid) return;

        playersGrid.innerHTML = this.players.map(player => `
            <div class="player-card">
                <div class="player-header">
                    <span class="player-name">${player.name}</span>
                    ${player.number ? `<span class="player-number">${player.number}</span>` : ''}
                </div>
                <div class="player-position">${player.position || 'Posizione non specificata'}</div>
                <div class="player-skills">
                    ${Object.entries(player.ratings).map(([skill, rating]) => 
                        `<div>${this.getSkillName(skill)}: ${'⭐'.repeat(rating)}</div>`
                    ).join('')}
                </div>
                ${player.notes ? `<div class="player-notes">${player.notes}</div>` : ''}
            </div>
        `).join('');
    }

    getSkillName(skill) {
        const skillNames = {
            'ball-control': 'Controllo',
            'passing': 'Passaggio',
            'shooting': 'Tiro',
            'defending': 'Difesa',
            'physical': 'Fisico',
            'mental': 'Mentale'
        };
        return skillNames[skill] || skill;
    }

    // Export Functions
    exportMarkdown() {
        const markdown = this.generateMarkdownReport();
        this.downloadFile(markdown, 'match-report.md', 'text/markdown');
    }

    exportTxt() {
        const txtReport = this.generateTxtReport();
        this.downloadFile(txtReport, 'match-report.txt', 'text/plain');
    }

    generateMarkdownReport() {
        const match = this.matchData;
        if (!match) return '';

        return `# Match Report: ${match.homeTeam} vs ${match.awayTeam}

## Match Information
- **Date:** ${match.date}
- **Venue:** ${match.venue || 'N/A'}
- **Competition:** ${match.competition || 'N/A'}
- **Weather:** ${match.weather || 'N/A'}
- **Duration:** ${window.SoccerBox.Utils.formatTime(this.elapsedTime)}

## Match Notes
${this.notes.map(note => `- **${note.time}** - ${note.text}`).join('\n')}

## Player Evaluations
${this.players.map(player => `
### ${player.name} ${player.number ? `#${player.number}` : ''}
- **Position:** ${player.position || 'N/A'}
- **Ratings:**
${Object.entries(player.ratings).map(([skill, rating]) => 
  `  - ${this.getSkillName(skill)}: ${rating}/5 ⭐`).join('\n')}
${player.notes ? `- **Notes:** ${player.notes}` : ''}
`).join('\n')}

## Statistics
- **Total Notes:** ${this.notes.length}
- **Players Evaluated:** ${this.players.length}
- **Match Duration:** ${window.SoccerBox.Utils.formatTime(this.elapsedTime)}

---
*Generated by Soccer in a Box - ${new Date().toLocaleString()}*
`;
    }

    generateTxtReport() {
        const match = this.matchData;
        if (!match) return '';

        return `MATCH REPORT: ${match.homeTeam} vs ${match.awayTeam}
${'='.repeat(50)}

MATCH INFORMATION:
Date: ${match.date}
Venue: ${match.venue || 'N/A'}
Competition: ${match.competition || 'N/A'}
Weather: ${match.weather || 'N/A'}
