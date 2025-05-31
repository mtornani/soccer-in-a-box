// Language detection and translations
const translations = {
    'en': {
        'partnership-text': 'Partnership FSGC - San Marino Football Federation',
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
        'partnership-text': 'Partnership FSGC - Federazione Sammarinese Giuoco Calcio',
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
        'partnership-text': 'Partnership FSGC - Federación Sanmarinense de Fútbol',
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
        'partnership-text': 'Partnership FSGC - Fédération Saint-Marinaise de Football',
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
        'partnership-text': 'Partnership FSGC - San-Marinesischer Fußballverband',
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
            element.textContent = texts[key];
        }
    });
}

// Initialize app
function initApp() {
    const lang = detectLanguage();
    applyTranslations(lang);
    
    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    }
    
    // Set current date
    document.getElementById('match-date').value = new Date().toISOString().split('T')[0];
    
    // Load saved data
    loadData();
    
    // Setup event listeners
    setupEventListeners();
    
    // Auto-save every 30 seconds
    setInterval(saveData, 30000);
}

// Event listeners
function setupEventListeners() {
    // Star ratings
    document.querySelectorAll('.stars').forEach(starGroup => {
        starGroup.addEventListener('click', handleStarClick);
        starGroup.addEventListener('mouseover', handleStarHover);
        starGroup.addEventListener('mouseout', handleStarOut);
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
    
    // Note input enter key
    document.getElementById('note-input').addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            addNote();
        }
    });
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
    appState.currentMode = mode;
    
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('coach-mode').classList.add('hidden');
    document.getElementById('community-mode').classList.add('hidden');
    
    if (mode === 'coach') {
        document.getElementById('coach-mode').classList.remove('hidden');
        showTab('setup');
    } else if (mode === 'community') {
        document.getElementById('community-mode').classList.remove('hidden');
    }
}

function goHome() {
    appState.currentMode = 'home';
    
    document.getElementById('home-screen').classList.remove('hidden');
    document.getElementById('coach-mode').classList.add('hidden');
    document.getElementById('community-mode').classList.add('hidden');
}

function showTab(tabName) {
    appState.currentTab = tabName;
    
    // Hide all tabs
    document.querySelectorAll('.card[id$="-tab"]').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Show selected tab
    document.getElementById(tabName + '-tab').classList.remove('hidden');
    
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('tab-' + tabName).classList.add('active');
    
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
document.addEventListener('DOMContentLoaded', initApp);


        
        