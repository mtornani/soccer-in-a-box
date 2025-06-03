window.app = {}; // Global access object

// Language detection and translations
// Aggiorna solo la sezione translations nel tuo app.js esistente:

const translations = {
    'en': {
        'tagline-text': 'Professional Football Analysis & Community Management',
        'subtitle-text': 'Professional platform for football analysis and community management.',
        'select-mode-text': 'Choose your mode to access the system.',
        'coach-mode-title': 'Coach Mode',
        'coach-mode-desc': 'Advanced tactical analysis, player evaluation, professional reports and scouting tools.',
        'community-mode-title': 'Community Mode',
        'community-mode-desc': 'Fan engagement, live polls, sentiment analysis and global network connection.',
        'back-text': 'Back',
        'match-setup-title': 'Match Setup',
        'home-team-label': 'Home Team:',
        'away-team-label': 'Away Team:',
        'date-label': 'Date:',
        'venue-label': 'Venue:',
        'competition-label': 'Competition:',
        'start-match-btn': 'Start Match Analysis',
        'add-note-btn': 'Add Note',
        'players-title': 'Player Evaluation',
        'technical-label': 'Technical:',
        'physical-label': 'Physical:',
        'mental-label': 'Mental:',
        'save-player-btn': 'Save Player',
        'report-title': 'Match Report',
        'notes-label': 'Notes',
        'players-label': 'Players',
        'duration-label': 'Duration',
        'rating-label': 'Avg Rating',
        'export-md-btn': 'Export Markdown',
        'export-txt-btn': 'Export TXT',
        'clear-btn': 'Clear All',
        'community-title': 'Community Mode',
        'community-desc': 'Community features in development. Come back soon for fan engagement, live polls and sentiment analysis!',
        'back-home-btn': 'Back to Home'
    },
    'it': {
        'tagline-text': 'Analisi Calcistica Professionale & Gestione Community',
        'subtitle-text': 'Piattaforma professionale per l\'analisi calcistica e gestione community.',
        'select-mode-text': 'Scegli la tua modalità per accedere al sistema.',
        'coach-mode-title': 'Modalità Coach',
        'coach-mode-desc': 'Analisi tattica avanzata, valutazione giocatori, report professionali e strumenti di scouting.',
        'community-mode-title': 'Modalità Community',
        'community-mode-desc': 'Engagement tifosi, sondaggi live, sentiment analysis e connessione con la rete globale.',
        'back-text': 'Indietro',
        'match-setup-title': 'Setup Partita',
        'home-team-label': 'Squadra Casa:',
        'away-team-label': 'Squadra Ospite:',
        'date-label': 'Data:',
        'venue-label': 'Venue:',
        'competition-label': 'Competizione:',
        'start-match-btn': 'Inizia Match Analysis',
        'add-note-btn': 'Aggiungi Nota',
        'players-title': 'Valutazione Giocatori',
        'technical-label': 'Tecnica:',
        'physical-label': 'Fisico:',
        'mental-label': 'Mentale:',
        'save-player-btn': 'Salva Giocatore',
        'report-title': 'Report Partita',
        'notes-label': 'Note',
        'players-label': 'Giocatori',
        'duration-label': 'Durata',
        'rating-label': 'Rating Medio',
        'export-md-btn': 'Esporta Markdown',
        'export-txt-btn': 'Esporta TXT',
        'clear-btn': 'Cancella Tutto',
        'community-title': 'Modalità Community',
        'community-desc': 'Funzionalità community in sviluppo. Torna presto per engagement tifosi, sondaggi live e sentiment analysis!',
        'back-home-btn': 'Torna alla Home'
    },
    'es': {
        'tagline-text': 'Análisis Futbolístico Profesional & Gestión Comunitaria',
        'subtitle-text': 'Plataforma profesional para análisis futbolístico y gestión comunitaria.',
        'select-mode-text': 'Elige tu modalidad para acceder al sistema.',
        'coach-mode-title': 'Modo Entrenador',
        'coach-mode-desc': 'Análisis táctico avanzado, evaluación de jugadores, reportes profesionales y herramientas de scouting.',
        'community-mode-title': 'Modo Comunidad',
        'community-mode-desc': 'Engagement de aficionados, encuestas en vivo, análisis de sentimientos y conexión con la red global.',
        'back-text': 'Atrás',
        'match-setup-title': 'Configuración del Partido',
        'home-team-label': 'Equipo Local:',
        'away-team-label': 'Equipo Visitante:',
        'date-label': 'Fecha:',
        'venue-label': 'Estadio:',
        'competition-label': 'Competición:',
        'start-match-btn': 'Iniciar Análisis del Partido',
        'add-note-btn': 'Agregar Nota',
        'players-title': 'Evaluación de Jugadores',
        'technical-label': 'Técnica:',
        'physical-label': 'Físico:',
        'mental-label': 'Mental:',
        'save-player-btn': 'Guardar Jugador',
        'report-title': 'Reporte del Partido',
        'notes-label': 'Notas',
        'players-label': 'Jugadores',
        'duration-label': 'Duración',
        'rating-label': 'Rating Promedio',
        'export-md-btn': 'Exportar Markdown',
        'export-txt-btn': 'Exportar TXT',
        'clear-btn': 'Limpiar Todo',
        'community-title': 'Modo Comunidad',
        'community-desc': 'Funcionalidades comunitarias en desarrollo. ¡Vuelve pronto para engagement de fans, encuestas en vivo y análisis de sentimientos!',
        'back-home-btn': 'Volver al Inicio'
    },
    'fr': {
        'tagline-text': 'Analyse Footballistique Professionnelle & Gestion Communautaire',
        'subtitle-text': 'Plateforme professionnelle pour l\'analyse football et gestion communautaire.',
        'select-mode-text': 'Choisissez votre mode pour accéder au système.',
        'coach-mode-title': 'Mode Entraîneur',
        'coach-mode-desc': 'Analyse tactique avancée, évaluation des joueurs, rapports professionnels et outils de scouting.',
        'community-mode-title': 'Mode Communauté',
        'community-mode-desc': 'Engagement des fans, sondages en direct, analyse de sentiment et connexion réseau global.',
        'back-text': 'Retour',
        'match-setup-title': 'Configuration du Match',
        'home-team-label': 'Équipe à Domicile:',
        'away-team-label': 'Équipe Visiteur:',
        'date-label': 'Date:',
        'venue-label': 'Stade:',
        'competition-label': 'Compétition:',
        'start-match-btn': 'Commencer l\'Analyse du Match',
        'add-note-btn': 'Ajouter Note',
        'players-title': 'Évaluation des Joueurs',
        'technical-label': 'Technique:',
        'physical-label': 'Physique:',
        'mental-label': 'Mental:',
        'save-player-btn': 'Sauvegarder Joueur',
        'report-title': 'Rapport du Match',
        'notes-label': 'Notes',
        'players-label': 'Joueurs',
        'duration-label': 'Durée',
        'rating-label': 'Note Moyenne',
        'export-md-btn': 'Exporter Markdown',
        'export-txt-btn': 'Exporter TXT',
        'clear-btn': 'Tout Effacer',
        'community-title': 'Mode Communauté',
        'community-desc': 'Fonctionnalités communautaires en développement. Revenez bientôt pour l\'engagement des fans, sondages en direct et analyse de sentiment!',
        'back-home-btn': 'Retour à l\'Accueil'
    },
    'de': {
        'tagline-text': 'Professionelle Fußballanalyse & Community-Management',
        'subtitle-text': 'Professionelle Plattform für Fußballanalyse und Community-Management.',
        'select-mode-text': 'Wählen Sie Ihren Modus für den Systemzugang.',
        'coach-mode-title': 'Trainer-Modus',
        'coach-mode-desc': 'Erweiterte taktische Analyse, Spielerbewertung, professionelle Berichte und Scouting-Tools.',
        'community-mode-title': 'Community-Modus',
        'community-mode-desc': 'Fan-Engagement, Live-Umfragen, Stimmungsanalyse und globale Netzwerkverbindung.',
        'back-text': 'Zurück',
        'match-setup-title': 'Spiel-Setup',
        'home-team-label': 'Heimmannschaft:',
        'away-team-label': 'Gastmannschaft:',
        'date-label': 'Datum:',
        'venue-label': 'Stadion:',
        'competition-label': 'Wettbewerb:',
        'start-match-btn': 'Spielanalyse starten',
        'add-note-btn': 'Notiz hinzufügen',
        'players-title': 'Spielerbewertung',
        'technical-label': 'Technik:',
        'physical-label': 'Körperlich:',
        'mental-label': 'Mental:',
        'save-player-btn': 'Spieler speichern',
        'report-title': 'Spielbericht',
        'notes-label': 'Notizen',
        'players-label': 'Spieler',
        'duration-label': 'Dauer',
        'rating-label': 'Durchschnittsbewertung',
        'export-md-btn': 'Markdown exportieren',
        'export-txt-btn': 'TXT exportieren',
        'clear-btn': 'Alles löschen',
        'community-title': 'Community-Modus',
        'community-desc': 'Community-Features in Entwicklung. Kommen Sie bald zurück für Fan-Engagement, Live-Umfragen und Stimmungsanalyse!',
        'back-home-btn': 'Zurück zur Startseite'
    }
};
// App state
let appState = {
    currentMode: 'home',
    currentTab: 'setup',
    match: {
        homeTeam: '',
        awayTeam: '',
        date: '',
        venue: '',
        competition: '',
        startTime: null,
        duration: 0
    },
    timer: {
        startTime: null,
        elapsedTime: 0,
        isRunning: false,
        interval: null
    },
    notes: [],
    players: [],
    playerRatings: {}
};

// Language detection
function detectLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    const langCode = userLang.substring(0, 2);
    
    if (translations[langCode]) {
        return langCode;
    }
    
    // Default to Italian
    return 'it';
}

// Apply translations
function applyTranslations(lang) {
    const texts = translations[lang];
    
    Object.keys(texts).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = texts[key];
            } else if (element.tagName === 'TEXTAREA' || (element.tagName === 'INPUT' && element.type === 'text')) {
                element.placeholder = texts[key];
            }
            else {
                element.textContent = texts[key];
            }
        }
    });
}

// Initialize app
function initApp() {
    const lang = detectLanguage();
    applyTranslations(lang);
    
    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js') // Ensure this path is still './sw.js'
            .then(registration => {
                console.log('app.js: SW registered successfully. Scope: ', registration.scope);
                // Log current SW states
                if (registration.installing) {
                    console.log('app.js: SW installing:', registration.installing);
                } else if (registration.waiting) {
                    console.log('app.js: SW waiting:', registration.waiting);
                } else if (registration.active) {
                    console.log('app.js: SW active:', registration.active);
                }

                registration.addEventListener('updatefound', () => {
                    console.log('app.js: SW update found. New worker installing.');
                    const newWorker = registration.installing;
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            console.log('app.js: SW new worker state change:', newWorker.state);
                            if (newWorker.state === 'installed') {
                                if (navigator.serviceWorker.controller) {
                                    // New worker installed, old one controlling.
                                    console.log('app.js: SW new worker installed. Controller exists. Page reload might be needed to activate.');
                                } else {
                                    // New worker installed, no controller. Will activate on next load or claim.
                                    console.log('app.js: SW new worker installed. No controller. Will activate.');
                                }
                            }
                        });
                    }
                });
            })
            .catch(registrationError => {
                console.error('app.js: SW registration failed: ', registrationError);
            });

        navigator.serviceWorker.addEventListener('controllerchange', () => { // Note: Corrected to `() =>`
            console.log('app.js: SW controller changed. A new service worker has taken control.');
            // It's often a good idea to reload the page when the controller changes.
            // Consider adding window.location.reload(); if appropriate for the app.
            // For now, just logging.
        });

        // Optional: Log current controller if any
        if (navigator.serviceWorker.controller) {
            console.log('app.js: Current page controller:', navigator.serviceWorker.controller);
        } else {
            console.log('app.js: No current page controller.');
        }
    }
    
    // Set current date
    document.getElementById('match-date').value = new Date().toISOString().split('T')[0];
    
    // Load saved data
    loadData();
    
    // Setup event listeners
    setupEventListeners();
    
    // Auto-save every 30 seconds
    setInterval(saveData, 30000);

    // Add event listeners for home screen buttons
    const modeButtons = document.querySelectorAll('#home-screen .btn-mode-select');
    modeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const mode = event.target.dataset.mode;
            if (mode) {
                startMode(mode);
            }
        });
    });

    // Ensure app starts on the home screen
    goHome();
}

// Event listeners
function setupEventListeners() {
    // Star ratings (ensure elements exist before attaching)
    document.querySelectorAll('.stars').forEach(starGroup => {
        starGroup.addEventListener('click', handleStarClick);
        starGroup.addEventListener('mouseover', handleStarHover);
        starGroup.addEventListener('mouseout', handleStarOut);
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
    
    // Note input enter key (ensure element exists)
    const noteInputElement = document.getElementById('note-input');
    if (noteInputElement) {
        noteInputElement.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                addNote();
            }
        });
    }
}

// Star rating handlers
function handleStarClick(e) {
    if (e.target.classList.contains('star')) {
        const stars = e.currentTarget.querySelectorAll('.star');
        const value = parseInt(e.target.dataset.value);
        const category = e.currentTarget.dataset.category;
        
        stars.forEach((star, index) => {
            if (index < value) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
        
        appState.playerRatings[category] = value;
    }
}

function handleStarHover(e) {
    if (e.target.classList.contains('star')) {
        const stars = e.currentTarget.querySelectorAll('.star');
        const value = parseInt(e.target.dataset.value);
        
        stars.forEach((star, index) => {
            if (index < value) {
                star.style.color = '#ffd700';
            } else {
                star.style.color = '#ddd';
            }
        });
    }
}

function handleStarOut(e) {
    const stars = e.currentTarget.querySelectorAll('.star');
    stars.forEach(star => {
        if (star.classList.contains('active')) {
            star.style.color = '#ffd700';
        } else {
            star.style.color = '#ddd';
        }
    });
}

// Keyboard shortcuts
function handleKeyboard(e) {
    if (e.ctrlKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                addQuickNote('⚽ Gol');
                break;
            case '2':
                e.preventDefault();
                addQuickNote('🟨 Ammonizione');
                break;
            case '3':
                e.preventDefault();
                addQuickNote('🔄 Cambio');
                break;
            case '4':
                e.preventDefault();
                addQuickNote('🥅 Tiro');
                break;
        }
    }
}

// Navigation functions
function startMode(mode) {
    // Hide all top-level mode containers first
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('app-coach-mode').classList.add('hidden');
    document.getElementById('community-mode').classList.add('hidden');
    document.getElementById('detective-mode').classList.add('hidden');
    document.getElementById('soccerbox-coach-mode').classList.add('hidden');

    appState.currentMode = mode;

    if (mode === 'coach') {
        document.getElementById('app-coach-mode').classList.remove('hidden');
        appState.currentMode = 'coach';
        showTab('setup'); // Default tab for app coach mode
    } else if (mode === 'community') {
        document.getElementById('community-mode').classList.remove('hidden');
        appState.currentMode = 'community';
        if (window.community && typeof window.community.showCommunityTab === 'function') {
            window.community.showCommunityTab('engagement');
        }
    } else if (mode === 'detective') {
        document.getElementById('detective-mode').classList.remove('hidden');
        appState.currentMode = 'detective';
    } else if (mode === 'simple_coach') {
        document.getElementById('soccerbox-coach-mode').classList.remove('hidden');
        appState.currentMode = 'simple_coach';
    } else {
        // Default to home if mode is unknown
        goHome();
    }
}

function goHome() {
    document.getElementById('home-screen').classList.remove('hidden');
    document.getElementById('app-coach-mode').classList.add('hidden');
    document.getElementById('community-mode').classList.add('hidden');
    document.getElementById('detective-mode').classList.add('hidden');
    document.getElementById('soccerbox-coach-mode').classList.add('hidden');
    appState.currentMode = 'home';
}

function showTab(tabName) {
    appState.currentTab = tabName;
    
    // Hide all tab content within app-coach-mode
    const coachModeContainer = document.getElementById('app-coach-mode');
    if (coachModeContainer) {
        coachModeContainer.querySelectorAll('.tab-content').forEach(tabContent => {
            tabContent.classList.add('hidden');
        });

        // Show selected tab content
        const selectedTabContent = document.getElementById(tabName + '-tab-content');
        if (selectedTabContent) {
            selectedTabContent.classList.remove('hidden');
        }

        // Update tab buttons active state within app-coach-mode
        coachModeContainer.querySelectorAll('.tabs .tab').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeTabButton = document.getElementById('tab-' + tabName);
        if (activeTabButton) {
            activeTabButton.classList.add('active');
        }
    }
    
    // Update stats if on report tab
    if (tabName === 'report') {
        updateStats();
    }
    
    // Update players list if on players tab
    if (tabName === 'players') {
        updatePlayersList();
    }
}

// Match functions
function startMatch() {
    appState.match.homeTeam = document.getElementById('home-team').value;
    appState.match.awayTeam = document.getElementById('away-team').value;
    appState.match.date = document.getElementById('match-date').value;
    appState.match.venue = document.getElementById('venue').value;
    appState.match.competition = document.getElementById('competition').value;
    appState.match.startTime = new Date();
    
    saveData();
    showTab('live');
}

// Timer functions
function toggleTimer() {
    if (appState.timer.isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    appState.timer.startTime = Date.now() - appState.timer.elapsedTime;
    appState.timer.isRunning = true;
    
    appState.timer.interval = setInterval(updateTimerDisplay, 100);
    
    document.getElementById('timer-btn').textContent = '⏸️';
}

function pauseTimer() {
    appState.timer.isRunning = false;
    clearInterval(appState.timer.interval);
    
    document.getElementById('timer-btn').textContent = '▶️';
}

function resetTimer() {
    pauseTimer();
    appState.timer.elapsedTime = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    if (appState.timer.isRunning) {
        appState.timer.elapsedTime = Date.now() - appState.timer.startTime;
    }
    
    const minutes = Math.floor(appState.timer.elapsedTime / 60000);
    const seconds = Math.floor((appState.timer.elapsedTime % 60000) / 1000);
    
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timer-display').textContent = display;
}

// Notes functions
function addNote() {
    const noteText = document.getElementById('note-input').value.trim();
    if (!noteText) return;
    
    const note = {
        id: Date.now(),
        text: noteText,
        timestamp: getTimestamp(),
        time: appState.timer.elapsedTime
    };
    
    appState.notes.unshift(note);
    document.getElementById('note-input').value = '';
    
    updateTimeline();
    saveData();
}

function addQuickNote(text) {
    const note = {
        id: Date.now(),
        text: text,
        timestamp: getTimestamp(),
        time: appState.timer.elapsedTime
    };
    
    appState.notes.unshift(note);
    updateTimeline();
    saveData();
}

function getTimestamp() {
    const minutes = Math.floor(appState.timer.elapsedTime / 60000);
    const seconds = Math.floor((appState.timer.elapsedTime % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function getTimestampMs(elapsedMs) { // Renamed to avoid conflict if a global getTimestamp exists without params
    if (isNaN(elapsedMs) || elapsedMs < 0) elapsedMs = 0;
    const minutes = Math.floor(elapsedMs / 60000);
    const seconds = Math.floor((elapsedMs % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateTimeline() {
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';
    
    appState.notes.forEach(note => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <span class="timestamp">${note.timestamp}</span> - ${note.text}
        `;
        timeline.appendChild(item);
    });
}

// Player functions
function savePlayer() {
    const name = document.getElementById('player-name').value.trim();
    const number = document.getElementById('player-number').value;
    const position = document.getElementById('player-position').value.trim();
    const notes = document.getElementById('player-notes').value.trim();
    
    if (!name) return;
    
    const player = {
        id: Date.now(),
        name: name,
        number: number,
        position: position,
        notes: notes,
        ratings: { ...appState.playerRatings }
    };
    
    appState.players.push(player);
    
    // Clear form
    document.getElementById('player-name').value = '';
    document.getElementById('player-number').value = '';
    document.getElementById('player-position').value = '';
    document.getElementById('player-notes').value = '';
    
    // Reset ratings
    document.querySelectorAll('.star').forEach(star => {
        star.classList.remove('active');
    });
    appState.playerRatings = {};
    
    updatePlayersList();
    saveData();
}

function updatePlayersList() {
    const list = document.getElementById('players-list');
    list.innerHTML = '';
    
    appState.players.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        
        const avgRating = calculatePlayerAverage(player.ratings);
        
        card.innerHTML = `
            <h4>${player.name} ${player.number ? '#' + player.number : ''}</h4>
            <div class="player-info">${player.position}</div>
            <div class="ratings">
                <span>Tecnica: ${player.ratings.technical || 0}⭐</span>
                <span>Fisico: ${player.ratings.physical || 0}⭐</span>
                <span>Mentale: ${player.ratings.mental || 0}⭐</span>
                <span>Media: ${avgRating.toFixed(1)}⭐</span>
            </div>
            ${player.notes ? `<div class="player-notes">${player.notes}</div>` : ''}
        `;
        
        list.appendChild(card);
    });
}

function calculatePlayerAverage(ratings) {
    const values = Object.values(ratings).filter(v => v > 0);
    if (values.length === 0) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
}

// Stats and reporting
function updateStats() {
    document.getElementById('notes-count').textContent = appState.notes.length;
    document.getElementById('players-count').textContent = appState.players.length;
    
    const minutes = Math.floor(appState.timer.elapsedTime / 60000);
    const seconds = Math.floor((appState.timer.elapsedTime % 60000) / 1000);
    document.getElementById('match-duration').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const avgRating = calculateOverallAverage();
    document.getElementById('avg-rating').textContent = avgRating.toFixed(1);
}

function calculateOverallAverage() {
    if (appState.players.length === 0) return 0;
    
    const totalAvg = appState.players.reduce((sum, player) => {
        return sum + calculatePlayerAverage(player.ratings);
    }, 0);
    
    return totalAvg / appState.players.length;
}

// Export functions
function exportReport(format) {
    const report = generateReport(format);
    downloadFile(report.content, report.filename, report.type);
}

function exportEnhancedSnapshot() {
    const appVersion = "2.0-snapshot"; // Or some other version identifier

    // 1. Match Details
    const matchDetails = { ...appState.match };
    if (matchDetails.startTime) {
        matchDetails.startTimeISO = new Date(matchDetails.startTime).toISOString();
    }
    matchDetails.finalDurationFormatted = getTimestampMs(appState.timer.elapsedTime);

    // 2. Timeline Events
    const timelineEvents = appState.notes.map(note => ({
        id: note.id,
        text: note.text,
        timestampFormatted: note.timestamp, // This is already formatted "MM:SS" from original getTimestamp()
        elapsedTimeMs: note.time
    }));

    // 3. Player Evaluations
    const playerEvaluations = appState.players.map(player => ({
        id: player.id,
        name: player.name,
        number: player.number,
        position: player.position,
        notes: player.notes,
        ratings: { ...player.ratings },
        averageRating: calculatePlayerAverage(player.ratings).toFixed(1)
    }));

    // 4. Analysis Summary (from existing report stats)
    const analysisSummary = {
        totalNotes: appState.notes.length,
        playersEvaluated: appState.players.length,
        matchDurationFormatted: getTimestampMs(appState.timer.elapsedTime),
        overallAverageRating: calculateOverallAverage().toFixed(1)
    };

    const snapshotV2 = {
        snapshotVersion: "2.0",
        generatedAt: new Date().toISOString(),
        sourceApp: `SoccerInABox/${appVersion}`,
        matchDetails: matchDetails,
        timelineEvents: timelineEvents,
        playerEvaluations: playerEvaluations,
        analysisSummary: analysisSummary,
        interactiveElements: {}, // Placeholder for future use
        // rawAppState: { ...appState } // Optional: for full state debugging/backup
    };

    const filenameDate = appState.match.date || new Date().toISOString().split('T')[0];
    const filename = `soccerbox_analysis_${filenameDate}_${Date.now()}.json`;
    downloadFile(JSON.stringify(snapshotV2, null, 2), filename, 'application/json');
}

function generateReport(format) {
    const matchInfo = `${appState.match.homeTeam} vs ${appState.match.awayTeam}`;
    const date = appState.match.date || new Date().toISOString().split('T')[0];
    
    if (format === 'md') {
        let content = `# Soccer in a Box - Match Report\n\n`;
        content += `## Match Information\n`;
        content += `- **Teams**: ${matchInfo}\n`;
        content += `- **Date**: ${date}\n`;
        content += `- **Venue**: ${appState.match.venue || 'N/A'}\n`;
        content += `- **Competition**: ${appState.match.competition || 'N/A'}\n`;
        content += `- **Duration**: ${document.getElementById('match-duration').textContent}\n\n`;
        
        content += `## Statistics\n`;
        content += `- **Total Notes**: ${appState.notes.length}\n`;
        content += `- **Players Evaluated**: ${appState.players.length}\n`;
        content += `- **Average Rating**: ${calculateOverallAverage().toFixed(1)}/5\n\n`;
        
        if (appState.notes.length > 0) {
            content += `## Match Timeline\n`;
            appState.notes.forEach(note => {
                content += `- **${note.timestamp}** - ${note.text}\n`;
            });
            content += '\n';
        }
        
        if (appState.players.length > 0) {
            content += `## Player Evaluations\n`;
            appState.players.forEach(player => {
                content += `### ${player.name} ${player.number ? '#' + player.number : ''}\n`;
                content += `- **Position**: ${player.position}\n`;
                content += `- **Technical**: ${player.ratings.technical || 0}/5\n`;
                content += `- **Physical**: ${player.ratings.physical || 0}/5\n`;
                content += `- **Mental**: ${player.ratings.mental || 0}/5\n`;
                content += `- **Average**: ${calculatePlayerAverage(player.ratings).toFixed(1)}/5\n`;
                if (player.notes) {
                    content += `- **Notes**: ${player.notes}\n`;
                }
                content += '\n';
            });
        }
        
        content += `\n---\n*Generated by Soccer in a Box - ${new Date().toLocaleString()}*`;
        
        return {
            content: content,
            filename: `soccer-report-${date}.md`,
            type: 'text/markdown'
        };
    } else {
        let content = `SOCCER IN A BOX - MATCH REPORT\n`;
        content += `=====================================\n\n`;
        content += `MATCH INFORMATION\n`;
        content += `-----------------\n`;
        content += `Teams: ${matchInfo}\n`;
        content += `Date: ${date}\n`;
        content += `Venue: ${appState.match.venue || 'N/A'}\n`;
        content += `Competition: ${appState.match.competition || 'N/A'}\n`;
        content += `Duration: ${document.getElementById('match-duration').textContent}\n\n`;
        
        content += `STATISTICS\n`;
        content += `----------\n`;
        content += `Total Notes: ${appState.notes.length}\n`;
        content += `Players Evaluated: ${appState.players.length}\n`;
        content += `Average Rating: ${calculateOverallAverage().toFixed(1)}/5\n\n`;
        
        if (appState.notes.length > 0) {
            content += `MATCH TIMELINE\n`;
            content += `--------------\n`;
            appState.notes.forEach(note => {
                content += `${note.timestamp} - ${note.text}\n`;
            });
            content += '\n';
        }
        
        if (appState.players.length > 0) {
            content += `PLAYER EVALUATIONS\n`;
            content += `------------------\n`;
            appState.players.forEach(player => {
                content += `${player.name} ${player.number ? '#' + player.number : ''}\n`;
                content += `Position: ${player.position}\n`;
                content += `Technical: ${player.ratings.technical || 0}/5\n`;
                content += `Physical: ${player.ratings.physical || 0}/5\n`;
                content += `Mental: ${player.ratings.mental || 0}/5\n`;
                content += `Average: ${calculatePlayerAverage(player.ratings).toFixed(1)}/5\n`;
                if (player.notes) {
                    content += `Notes: ${player.notes}\n`;
                }
                content += '\n';
            });
        }
        
        content += `\nGenerated by Soccer in a Box - ${new Date().toLocaleString()}`;
        
        return {
            content: content,
            filename: `soccer-report-${date}.txt`,
            type: 'text/plain'
        };
    }
}

function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Data persistence
function saveData() {
    try {
        localStorage.setItem('soccerInABox', JSON.stringify(appState));
    } catch (e) {
        console.error('Failed to save data:', e);
    }
}

function loadData() {
    try {
        const saved = localStorage.getItem('soccerInABox');
        if (saved) {
            const data = JSON.parse(saved);
            appState = { ...appState, ...data };
            
            // Restore UI state
            if (appState.notes.length > 0) {
                updateTimeline();
            }
            
            if (appState.players.length > 0) {
                updatePlayersList();
            }
            
            // Restore match form
            if (appState.match.homeTeam) {
                document.getElementById('home-team').value = appState.match.homeTeam;
            }
            if (appState.match.awayTeam) {
                document.getElementById('away-team').value = appState.match.awayTeam;
            }
            if (appState.match.venue) {
                document.getElementById('venue').value = appState.match.venue;
            }
            if (appState.match.competition) {
                document.getElementById('competition').value = appState.match.competition;
            }
            
            // Restore timer
            if (appState.timer.elapsedTime > 0) {
                updateTimerDisplay();
            }
        }
    } catch (e) {
        console.error('Failed to load data:', e);
    }
}

function clearAll() {
    if (confirm('Sei sicuro di voler cancellare tutti i dati?')) {
        appState = {
            currentMode: 'home',
            currentTab: 'setup',
            match: {
                homeTeam: '',
                awayTeam: '',
                date: '',
                venue: '',
                competition: '',
                startTime: null,
                duration: 0
            },
            timer: {
                startTime: null,
                elapsedTime: 0,
                isRunning: false,
                interval: null
            },
            notes: [],
            players: [],
            playerRatings: {}
        };
        
        localStorage.removeItem('soccerInABox');
        
        // Reset UI
        document.getElementById('timeline').innerHTML = '';
        document.getElementById('players-list').innerHTML = '';
        updateStats();
        resetTimer();
        
        // Clear forms
        document.querySelectorAll('input, textarea').forEach(input => {
            input.value = '';
        });
        
        // Set current date
        document.getElementById('match-date').value = new Date().toISOString().split('T')[0];
        
        goHome();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    // Diagnostic logs
    console.log('app.js: soccerApp instance:', window.soccerApp);
    console.log('app.js: typeof startAnalysis:', typeof startAnalysis);
    console.log('app.js: typeof exportSnapshot:', typeof exportSnapshot);
    console.log('app.js: typeof copyShareLink:', typeof copyShareLink);
    console.log('app.js: typeof importFromLink:', typeof importFromLink);
    console.log('app.js: typeof loadSampleData:', typeof loadSampleData);
    console.log('app.js: typeof submitPrediction:', typeof submitPrediction);
    console.log('app.js: typeof nextMystery:', typeof nextMystery);
    console.log('app.js: typeof submitNarrative:', typeof submitNarrative);
    console.log('app.js: typeof startMode:', typeof startMode);
    console.log('app.js: typeof goHome:', typeof goHome);
    console.log('app.js: typeof showTab:', typeof showTab);
    console.log('app.js: typeof toggleTimer:', typeof toggleTimer);
    console.log('app.js: typeof resetTimer:', typeof resetTimer);
    console.log('app.js: typeof addNote:', typeof addNote);
    console.log('app.js: typeof addQuickNote:', typeof addQuickNote);
    console.log('app.js: typeof savePlayer:', typeof savePlayer);
    console.log('app.js: typeof exportReport:', typeof exportReport);
    console.log('app.js: typeof clearAll:', typeof clearAll);
});

// Expose functions to global app object
window.app.goHome = goHome;
window.app.startMode = startMode;
window.app.showTab = showTab;
// Assuming these might be called from HTML later or by other modules
window.app.startMatch = startMatch;
window.app.toggleTimer = toggleTimer;
window.app.resetTimer = resetTimer;
window.app.addNote = addNote;
window.app.addQuickNote = addQuickNote;
window.app.savePlayer = savePlayer;
window.app.exportReport = exportReport;
window.app.exportEnhancedSnapshot = exportEnhancedSnapshot;
window.app.clearAll = clearAll;
// Note: Player rating handlers (handleStarClick, etc.) are typically not called directly from HTML
// and are fine as internal functions. `applyTranslations` is also usually internal.

// Aggiungi queste funzioni al tuo app.js esistente per collegare Coach e Community

// Estendi startMatch per attivare community
const originalStartMatch = window.startMatch;
window.startMatch = function() {
    // Chiama la funzione originale
    if (originalStartMatch) {
        originalStartMatch();
    } else {
        // Implementazione base se non esiste
        appState.match.homeTeam = document.getElementById('home-team').value;
        appState.match.awayTeam = document.getElementById('away-team').value;
        appState.match.date = document.getElementById('match-date').value;
        appState.match.venue = document.getElementById('venue').value;
        appState.match.competition = document.getElementById('competition').value;
        appState.match.startTime = new Date();
        
        saveData();
        showTab('live');
    }
    
    // Attiva community quando il coach inizia il match
    if (appState.community) {
        // Simula fan che si collegano
        appState.community.liveStats.onlineFans = Math.floor(Math.random() * 500) + 100;
        
        // Aggiungi messaggio automatico
        setTimeout(() => {
            if (typeof addFanMessage === 'function') {
                addFanMessage(`🔴 LIVE: ${appState.match.homeTeam} vs ${appState.match.awayTeam} is starting!`, 'positive');
            }
        }, 1000);
    }
};

// Estendi addNote per generare engagement automatico
const originalAddNote = window.addNote;
window.addNote = function() {
    // Chiama la funzione originale
    if (originalAddNote) {
        originalAddNote();
    }
    
    // Genera reazione community automatica
    if (appState.community && typeof addFanMessage === 'function') {
        const noteText = document.getElementById('note-input')?.value?.toLowerCase() || '';
        
        // Reazioni basate sul contenuto della nota
        setTimeout(() => {
            if (noteText.includes('gol') || noteText.includes('goal')) {
                addFanMessage('🎉 GOOOOOL! Amazing shot!', 'positive');
            } else if (noteText.includes('card') || noteText.includes('ammonizione')) {
                addFanMessage('🟨 That was a tough decision by the referee', 'neutral');
            } else if (noteText.includes('cambio') || noteText.includes('sub')) {
                addFanMessage('🔄 Good substitution, coach knows what to do!', 'positive');
            } else {
                // Reazione generale
                const reactions = [
                    { text: 'Great tactical observation! 📊', type: 'positive' },
                    { text: 'Interesting point from the coaching staff', type: 'neutral' },
                    { text: 'Thanks for keeping us updated! 👍', type: 'positive' }
                ];
                const reaction = reactions[Math.floor(Math.random() * reactions.length)];
                addFanMessage(reaction.text, reaction.type);
            }
        }, Math.random() * 3000 + 1000); // Random delay 1-4 secondi
    }
};

// Estendi addQuickNote per reazioni immediate
const originalAddQuickNote = window.addQuickNote;
window.addQuickNote = function(text) {
    // Chiama la funzione originale
    if (originalAddQuickNote) {
        originalAddQuickNote(text);
    } else {
        // Implementazione base se non esiste
        const note = {
            id: Date.now(),
            text: text,
            timestamp: getTimestamp(),
            time: appState.timer.elapsedTime
        };
        
        appState.notes.unshift(note);
        updateTimeline();
        saveData();
    }
    
    // Genera reazioni community immediate
    if (appState.community && typeof addFanMessage === 'function') {
        setTimeout(() => {
            if (text.includes('⚽')) {
                // Reazioni per i gol
                const goalReactions = [
                    'GOOOOOOOOOL! 🔥🔥🔥',
                    'What a strike! Incredible! ⚡',
                    'YES! That\'s why we support this team! 💙',
                    'Amazing goal! The crowd goes wild! 🎉'
                ];
                const reaction = goalReactions[Math.floor(Math.random() * goalReactions.length)];
                addFanMessage(reaction, 'positive');
                
                // Crea automaticamente un sondaggio per il gol
                setTimeout(() => {
                    if (appState.community.polls.filter(p => p.active).length < 2) {
                        createAutoGoalPoll();
                    }
                }, 2000);
                
            } else if (text.includes('🟨')) {
                // Reazioni per i cartellini
                const cardReactions = [
                    'Fair yellow card, deserved 🟨',
                    'Referee is being strict today',
                    'Come on, that was a soft card! 😤',
                    'Good decision by the ref'
                ];
                const reaction = cardReactions[Math.floor(Math.random() * cardReactions.length)];
                const sentiment = Math.random() > 0.5 ? 'neutral' : 'negative';
                addFanMessage(reaction, sentiment);
                
            } else if (text.includes('🔄')) {
                // Reazioni per i cambi
                const subReactions = [
                    'Smart substitution by the coach! 👏',
                    'Let\'s see what the new player brings',
                    'Good time for a change',
                    'Hope this tactical change works!'
                ];
                const reaction = subReactions[Math.floor(Math.random() * subReactions.length)];
                addFanMessage(reaction, 'positive');
                
            } else if (text.includes('🥅')) {
                // Reazioni per i tiri
                const shotReactions = [
                    'So close! Great attempt! 😮',
                    'What a shot! Keeper made a great save',
                    'Keep shooting, boys! 💪',
                    'Almost there! Next one will go in! 🎯'
                ];
                const reaction = shotReactions[Math.floor(Math.random() * shotReactions.length)];
                addFanMessage(reaction, 'positive');
            }
        }, Math.random() * 2000 + 500); // Random delay 0.5-2.5 secondi
    }
};

// Funzione per creare automaticamente sondaggi dopo eventi importanti
function createAutoGoalPoll() {
    if (!appState.community) return;
    
    const autoPoll = {
        id: Date.now(),
        question: "How would you rate that goal?",
        options: [
            { text: "🔥 Incredible strike!", votes: 0 },
            { text: "👍 Good goal", votes: 0 },
            { text: "😐 Lucky shot", votes: 0 },
            { text: "⚽ Simple finish", votes: 0 }
        ],
        active: true,
        createdAt: new Date().toLocaleString(),
        totalVotes: 0
    };
    
    appState.community.polls.unshift(autoPoll);
    
    // Simula voti automatici
    setTimeout(() => {
        simulatePollVotes(autoPoll.id);
    }, 3000);
    
    // Aggiorna UI se siamo nella tab polls
    if (appState.community.currentTab === 'polls') {
        updatePollsList();
    }
    
    saveData();
}

// Estendi savePlayer per feedback community
const originalSavePlayer = window.savePlayer;
window.savePlayer = function() {
    const playerName = document.getElementById('player-name')?.value;
    
    // Chiama la funzione originale
    if (originalSavePlayer) {
        originalSavePlayer();
    }
    
    // Genera feedback community per il giocatore valutato
    if (appState.community && typeof addFanMessage === 'function' && playerName) {
        setTimeout(() => {
            const playerFeedback = [
                `Great analysis on ${playerName}! 📊`,
                `${playerName} is definitely one to watch! ⭐`,
                `Thanks for the detailed evaluation of ${playerName}`,
                `Interesting insights about ${playerName}'s performance`
            ];
            const feedback = playerFeedback[Math.floor(Math.random() * playerFeedback.length)];
            addFanMessage(feedback, 'positive');
        }, 1500);
    }
};

// Funzione per sincronizzare timer con community
const originalUpdateTimerDisplay = window.updateTimerDisplay;
window.updateTimerDisplay = function() {
    // Chiama la funzione originale
    if (originalUpdateTimerDisplay) {
        originalUpdateTimerDisplay();
    }
    
    // Aggiorna stats community se il timer è attivo
    if (appState.timer.isRunning && appState.community) {
        // Aumenta engagement durante il match
        appState.community.liveStats.totalEngagement += Math.floor(Math.random() * 10);
        
        // Aggiorna UI se necessario
        if (appState.community.currentTab === 'engagement') {
            updateStatsUI();
        }
    }
};

// Funzione per connettere Coach Mode con Community Mode
function syncCoachToCommunity() {
    if (!appState.community) return;
    
    // Sync match info
    if (appState.match.homeTeam && appState.match.awayTeam) {
        appState.community.matchInfo = {
            homeTeam: appState.match.homeTeam,
            awayTeam: appState.match.awayTeam,
            date: appState.match.date,
            venue: appState.match.venue
        };
    }
    
    // Sync timer status
    appState.community.timerStatus = {
        isRunning: appState.timer.isRunning,
        elapsedTime: appState.timer.elapsedTime
    };
    
    // Sync stats
    appState.community.matchStats = {
        totalNotes: appState.notes.length,
        playersEvaluated: appState.players.length,
        averageRating: calculateOverallAverage()
    };
}

// Auto-sync ogni 5 secondi
setInterval(syncCoachToCommunity, 5000);

// Funzioni per migliorare l'integrazione
function triggerCommunityEvent(eventType, data) {
    if (!appState.community || typeof addFanMessage !== 'function') return;
    
    switch(eventType) {
        case 'match_start':
            addFanMessage(`🔴 LIVE: Match is starting! ${data.homeTeam} vs ${data.awayTeam}`, 'positive');
            break;
        case 'half_time':
            addFanMessage('⏸️ Half-time break! What do you think about the first half?', 'neutral');
            createHalfTimePoll();
            break;
        case 'match_end':
            addFanMessage('⏱️ Full-time! Thanks for following the match with us!', 'positive');
            createMatchRatingPoll();
            break;
        case 'milestone_note':
            if (appState.notes.length % 10 === 0) {
                addFanMessage(`📝 Coach team has taken ${appState.notes.length} notes so far! Great analysis!`, 'positive');
            }
            break;
    }
}

function createHalfTimePoll() {
    if (!appState.community) return;
    
    const halfTimePoll = {
        id: Date.now(),
        question: "How was the first half?",
        options: [
            { text: "🔥 Excellent performance!", votes: 0 },
            { text: "👍 Good, but can improve", votes: 0 },
            { text: "😐 Average half", votes: 0 },
            { text: "😞 Disappointing", votes: 0 }
        ],
        active: true,
        createdAt: new Date().toLocaleString(),
        totalVotes: 0
    };
    
    appState.community.polls.unshift(halfTimePoll);
    setTimeout(() => simulatePollVotes(halfTimePoll.id), 2000);
    saveData();
}

function createMatchRatingPoll() {
    if (!appState.community) return;
    
    const matchRatingPoll = {
        id: Date.now(),
        question: "Overall match rating?",
        options: [
            { text: "⭐⭐⭐⭐⭐ Perfect!", votes: 0 },
            { text: "⭐⭐⭐⭐ Very good", votes: 0 },
            { text: "⭐⭐⭐ Good", votes: 0 },
            { text: "⭐⭐ Could be better", votes: 0 },
            { text: "⭐ Poor performance", votes: 0 }
        ],
        active: true,
        createdAt: new Date().toLocaleString(),
        totalVotes: 0
    };
    
    appState.community.polls.unshift(matchRatingPoll);
    setTimeout(() => simulatePollVotes(matchRatingPoll.id), 1000);
    saveData();
}

// Trigger eventi automatici basati su timer
const originalStartTimer = window.startTimer;
window.startTimer = function() {
    if (originalStartTimer) {
        originalStartTimer();
    }
    
    // Trigger community event
    triggerCommunityEvent('match_start', {
        homeTeam: appState.match.homeTeam,
        awayTeam: appState.match.awayTeam
    });
    
    // Auto-trigger half-time poll a 45 minuti
    setTimeout(() => {
        if (appState.timer.isRunning) {
            triggerCommunityEvent('half_time', {});
        }
    }, 45 * 60 * 1000); // 45 minuti
};

// Trigger milestone notes
const originalUpdateTimeline = window.updateTimeline;
window.updateTimeline = function() {
    if (originalUpdateTimeline) {
        originalUpdateTimeline();
    }
    
    // Trigger milestone event
    triggerCommunityEvent('milestone_note', {});
};

console.log('Coach-Community integration loaded successfully!');
        
        
