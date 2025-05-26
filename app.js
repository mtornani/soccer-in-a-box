// Soccer in a Box - Main Application Logic
class SoccerInABox {
    constructor() {
        // Stato dell'applicazione
        this.matchData = {
            homeTeam: '',
            awayTeam: '',
            date: '',
            competition: '',
            venue: '',
            weather: '',
            scoutingFocus: '',
            startTime: null,
            duration: 0
        };
        
        this.liveNotes = [];
        this.players = [];
        this.timer = {
            startTime: null,
            elapsed: 0,
            isRunning: false,
            interval: null
        };

        // Inizializza l'app
        this.init();
    }

    init() {
        // Carica dati salvati
        this.loadData();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Setup tabs
        this.setupTabs();
        
        // Setup rating system
        this.setupRatingSystem();
        
        // Aggiorna l'interfaccia
        this.updateUI();
        
        // Imposta data corrente
        document.getElementById('matchDate').value = new Date().toISOString().split('T')[0];
        
        console.log('⚽ Soccer in a Box inizializzato');
    }

    // === GESTIONE TABS ===
    setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                
                // Rimuovi classe active da tutti i tab
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Attiva il tab selezionato
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    // === EVENT LISTENERS ===
    setupEventListeners() {
        // Match Setup Form
        document.getElementById('matchForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveMatchData();
        });

        // Timer Controls
        document.getElementById('startTimer').addEventListener('click', () => this.startTimer());
        document.getElementById('pauseTimer').addEventListener('click', () => this.pauseTimer());
        document.getElementById('resetTimer').addEventListener('click', () => this.resetTimer());

        // Live Notes
        document.getElementById('addNote').addEventListener('click', () => this.addLiveNote());
        document.getElementById('liveNote').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.addLiveNote();
            }
        });

        // Quick Actions
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.addQuickAction(action);
            });
        });

        // Player Evaluation
        document.getElementById('savePlayer').addEventListener('click', () => this.savePlayerEvaluation());

        // Export Functions
        document.getElementById('exportMarkdown').addEventListener('click', () => this.exportReport('markdown'));
        document.getElementById('exportText').addEventListener('click', () => this.exportReport('text'));
        document.getElementById('clearData').addEventListener('click', () => this.clearAllData());
    }

    // === MATCH SETUP ===
    saveMatchData() {
        this.matchData = {
            homeTeam: document.getElementById('homeTeam').value,
            awayTeam: document.getElementById('awayTeam').value,
            date: document.getElementById('matchDate').value,
            competition: document.getElementById('competition').value,
            venue: document.getElementById('venue').value,
            weather: document.getElementById('weather').value,
            scoutingFocus: document.getElementById('scoutingFocus').value,
            startTime: new Date().toISOString(),
            duration: 0
        };

        this.saveData();
        this.showNotification('✅ Dati match salvati!');
        
        // Passa automaticamente al tab delle note live
        document.querySelector('[data-tab="live-notes"]').click();
    }

    // === TIMER MANAGEMENT ===
    startTimer() {
        if (!this.timer.isRunning) {
            this.timer.startTime = Date.now() - this.timer.elapsed;
            this.timer.isRunning = true;
            this.timer.interval = setInterval(() => this.updateTimer(), 1000);
            
            if (!this.matchData.startTime) {
                this.matchData.startTime = new Date().toISOString();
                this.saveData();
            }
        }
    }

    pauseTimer() {
        if (this.timer.isRunning) {
            this.timer.isRunning = false;
            clearInterval(this.timer.interval);
        }
    }

    resetTimer() {
        this.timer.elapsed = 0;
        this.timer.isRunning = false;
        if (this.timer.interval) {
            clearInterval(this.timer.interval);
        }
        this.updateTimerDisplay();
    }

    updateTimer() {
        if (this.timer.isRunning) {
            this.timer.elapsed = Date.now() - this.timer.startTime;
            this.updateTimerDisplay();
        }
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timer.elapsed / 60000);
        const seconds = Math.floor((this.timer.elapsed % 60000) / 1000);
        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('matchTime').textContent = display;
        
        // Aggiorna durata match
        this.matchData.duration = minutes;
    }

    getCurrentMatchTime() {
        if (this.timer.elapsed === 0 && !this.timer.isRunning) {
            // Se il timer non è mai stato avviato, usa l'orario reale
            const now = new Date();
            const startTime = this.matchData.startTime ? new Date(this.matchData.startTime) : now;
            const realMinutes = Math.floor((now - startTime) / 60000);
            return realMinutes > 0 ? `${realMinutes}'` : `Pre-Match`;
        }
        
        const minutes = Math.floor(this.timer.elapsed / 60000);
        return `${minutes}'`;
    }

    // === LIVE NOTES ===
    addLiveNote() {
        const noteText = document.getElementById('liveNote').value.trim();
        if (!noteText) return;

        const note = {
            id: Date.now(),
            time: this.getCurrentMatchTime(),
            timestamp: new Date().toISOString(),
            text: noteText,
            type: 'manual'
        };

        this.liveNotes.unshift(note);
        this.updateNotesTimeline();
        this.saveData();
        
        // Pulisci il campo input
        document.getElementById('liveNote').value = '';
        
        this.showNotification('📝 Nota aggiunta');
    }

    addQuickAction(actionType) {
        const actionNames = {
            'goal': '⚽ Gol',
            'card': '🟨 Ammonizione',
            'substitution': '🔄 Cambio',
            'tactical': '📋 Nota Tattica'
        };

        const note = {
            id: Date.now(),
            time: this.getCurrentMatchTime(),
            timestamp: new Date().toISOString(),
            text: `${actionNames[actionType]} - ${this.getCurrentMatchTime()}`,
            type: actionType,
            action: actionNames[actionType]
        };

        this.liveNotes.unshift(note);
        this.updateNotesTimeline();
        this.saveData();
        
        this.showNotification(`${actionNames[actionType]} registrato`);
    }

    updateNotesTimeline() {
        const timeline = document.getElementById('notesTimeline');
        timeline.innerHTML = '';

        this.liveNotes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note-item';
            
            let actionBadge = '';
            if (note.action) {
                actionBadge = `<span class="note-action">${note.action}</span>`;
            }
            
            noteElement.innerHTML = `
                <div class="note-time">${note.time}</div>
                <div class="note-text">${actionBadge}${note.text}</div>
            `;
            
            timeline.appendChild(noteElement);
        });
    }

    // === PLAYER EVALUATION ===
    setupRatingSystem() {
        document.querySelectorAll('.rating').forEach(rating => {
            const stars = rating.querySelectorAll('.star');
            
            stars.forEach((star, index) => {
                star.addEventListener('click', () => {
                    // Rimuovi active da tutte le stelle
                    stars.forEach(s => s.classList.remove('active'));
                    
                    // Attiva stelle fino a quella cliccata
                    for (let i = 0; i <= index; i++) {
                        stars[i].classList.add('active');
                    }
                    
                    // Salva il rating
                    rating.dataset.rating = index + 1;
                });
            });
        });
    }

    savePlayerEvaluation() {
        const playerName = document.getElementById('playerName').value.trim();
        const playerNumber = document.getElementById('playerNumber').value;
        const playerPosition = document.getElementById('playerPosition').value;
        const playerNotes = document.getElementById('playerNotes').value.trim();

        if (!playerName) {
            this.showNotification('⚠️ Inserisci il nome del giocatore', 'warning');
            return;
        }

        // Raccogli tutte le valutazioni
        const ratings = {};
        document.querySelectorAll('.rating[data-rating]').forEach(rating => {
            const skill = rating.dataset.skill;
            const value = parseInt(rating.dataset.rating);
            ratings[skill] = value;
        });

        const player = {
            id: Date.now(),
            name: playerName,
            number: playerNumber,
            position: playerPosition,
            ratings: ratings,
            notes: playerNotes,
            evaluationTime: new Date().toISOString()
        };

        // Controlla se il giocatore esiste già
        const existingIndex = this.players.findIndex(p => 
            p.name.toLowerCase() === playerName.toLowerCase() || 
            (playerNumber && p.number === playerNumber)
        );

        if (existingIndex > -1) {
            this.players[existingIndex] = player;
            this.showNotification('🔄 Giocatore aggiornato');
        } else {
            this.players.push(player);
            this.showNotification('✅ Giocatore salvato');
        }

        this.updateSavedPlayers();
        this.clearPlayerForm();
        this.saveData();
    }

    clearPlayerForm() {
        document.getElementById('playerName').value = '';
        document.getElementById('playerNumber').value = '';
        document.getElementById('playerPosition').value = '';
        document.getElementById('playerNotes').value = '';
        
        // Reset ratings
        document.querySelectorAll('.rating .star').forEach(star => {
            star.classList.remove('active');
        });
        document.querySelectorAll('.rating').forEach(rating => {
            delete rating.dataset.rating;
        });
    }

    updateSavedPlayers() {
        const container = document.getElementById('savedPlayers');
        container.innerHTML = '';

        if (this.players.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Nessun giocatore valutato ancora</p>';
            return;
        }

        this.players.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.className = 'player-card';

            const ratingsHtml = Object.entries(player.ratings).map(([skill, rating]) => {
                const skillNames = {
                    'ball-control': 'Controllo',
                    'passing': 'Passaggio',
                    'speed': 'Velocità',
                    'stamina': 'Resistenza',
                    'decision': 'Decisione',
                    'leadership': 'Leadership'
                };
                return `<div class="rating-display">${skillNames[skill]}: <span>${'⭐'.repeat(rating)}</span></div>`;
            }).join('');

            playerCard.innerHTML = `
                <div class="player-header">
                    <div class="player-name">${player.name} ${player.number ? `#${player.number}` : ''}</div>
                    ${player.position ? `<div class="player-position">${player.position}</div>` : ''}
                </div>
                <div class="player-ratings">${ratingsHtml}</div>
                ${player.notes ? `<div class="player-notes-display" style="font-size: 0.9rem; margin-top: 8px; font-style: italic;">"${player.notes}"</div>` : ''}
            `;

            container.appendChild(playerCard);
        });
    }

    // === EXPORT & REPORTS ===
    exportReport(format) {
        const report = this.generateReport(format);
        const filename = `match_report_${this.matchData.homeTeam}_vs_${this.matchData.awayTeam}_${new Date().toISOString().split('T')[0]}`;
        
        if (format === 'markdown') {
            this.downloadFile(report, `${filename}.md`, 'text/markdown');
        } else {
            this.downloadFile(report, `${filename}.txt`, 'text/plain');
        }
    }

    generateReport(format) {
        const isMarkdown = format === 'markdown';
        const h1 = isMarkdown ? '# ' : '';
        const h2 = isMarkdown ? '## ' : '';
        const h3 = isMarkdown ? '### ' : '';
        const bold = (text) => isMarkdown ? `**${text}**` : text.toUpperCase();
        const separator = isMarkdown ? '\n---\n' : '\n' + '='.repeat(50) + '\n';

        let report = '';
        
        // Header
        report += `${h1}⚽ MATCH ANALYSIS REPORT\n`;
        report += `${bold('Soccer in a Box')} - Minimal Match Analysis Kit\n\n`;
        
        // Match Info
        report += `${h2}📋 INFORMAZIONI MATCH\n`;
        report += `${bold('Match')}: ${this.matchData.homeTeam} vs ${this.matchData.awayTeam}\n`;
        report += `${bold('Data')}: ${this.matchData.date}\n`;
        if (this.matchData.competition) report += `${bold('Competizione')}: ${this.matchData.competition}\n`;
        if (this.matchData.venue) report += `${bold('Venue')}: ${this.matchData.venue}\n`;
        if (this.matchData.weather) report += `${bold('Condizioni')}: ${this.matchData.weather}\n`;
        report += `${bold('Focus Scouting')}: ${this.matchData.scoutingFocus}\n`;
        report += `${bold('Durata Osservazione')}: ${this.matchData.duration} minuti\n`;
        report += `${bold('Report Generato')}: ${new Date().toLocaleString('it-IT')}\n`;
        
        report += separator;
        
        // Live Notes
        if (this.liveNotes.length > 0) {
            report += `${h2}📝 NOTE LIVE (${this.liveNotes.length})\n\n`;
            
            this.liveNotes.slice().reverse().forEach(note => {
                const actionText = note.action ? `[${note.action}] ` : '';
                report += `${bold(note.time)} - ${actionText}${note.text}\n`;
            });
            
            report += separator;
        }
        
        // Player Evaluations
        if (this.players.length > 0) {
            report += `${h2}👥 VALUTAZIONI GIOCATORI (${this.players.length})\n\n`;
            
            this.players.forEach(player => {
                report += `${h3}${player.name}`;
                if (player.number) report += ` #${player.number}`;
                if (player.position) report += ` (${player.position})`;
                report += '\n';
                
                // Ratings
                Object.entries(player.ratings).forEach(([skill, rating]) => {
                    const skillNames = {
                        'ball-control': 'Controllo Palla',
                        'passing': 'Passaggio',
                        'speed': 'Velocità',
                        'stamina': 'Resistenza',
                        'decision': 'Capacità Decisionale',
                        'leadership': 'Leadership'
                    };
                    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
                    report += `  ${skillNames[skill]}: ${stars} (${rating}/5)\n`;
                });
                
                if (player.notes) {
                    report += `  ${bold('Note')}: ${player.notes}\n`;
                }
                
                report += '\n';
            });
            
            report += separator;
        }
        
        // Summary Statistics
        report += `${h2}📊 STATISTICHE RIASSUNTIVE\n`;
        report += `${bold('Note Totali')}: ${this.liveNotes.length}\n`;
        report += `${bold('Giocatori Valutati')}: ${this.players.length}\n`;
        report += `${bold('Durata Osservazione')}: ${this.matchData.duration} minuti\n`;
        
        // Action Statistics
        const actionStats = {};
        this.liveNotes.forEach(note => {
            if (note.action) {
                actionStats[note.action] = (actionStats[note.action] || 0) + 1;
            }
        });
        
        if (Object.keys(actionStats).length > 0) {
            report += `\n${bold('Eventi Registrati')}:\n`;
            Object.entries(actionStats).forEach(([action, count]) => {
                report += `  ${action}: ${count}\n`;
            });
        }
        
        report += separator;
        report += `\n${bold('Report generato da Soccer in a Box')}\n`;
        report += `${bold('Minimal Match Analysis Kit per contesti rurali')}\n`;
        
        return report;
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        this.showNotification(`📄 ${filename} scaricato`);
    }

    clearAllData() {
        if (confirm('⚠️ Sei sicuro di voler cancellare tutti i dati? Questa azione non può essere annullata.')) {
            localStorage.removeItem('soccerInABoxData');
            location.reload();
        }
    }

    // === GESTIONE DATI ===
    saveData() {
        const data = {
            matchData: this.matchData,
            liveNotes: this.liveNotes,
            players: this.players,
            timer: {
                elapsed: this.timer.elapsed,
                isRunning: false // Non salvare lo stato running
            },
            lastSaved: new Date().toISOString()
        };
        
        localStorage.setItem('soccerInABoxData', JSON.stringify(data));
    }

    loadData() {
        try {
            const savedData = localStorage.getItem('soccerInABoxData');
            if (savedData) {
                const data = JSON.parse(savedData);
                
                this.matchData = { ...this.matchData, ...data.matchData };
                this.liveNotes = data.liveNotes || [];
                this.players = data.players || [];
                
                if (data.timer && data.timer.elapsed) {
                    this.timer.elapsed = data.timer.elapsed;
                    this.updateTimerDisplay();
                }
                
                console.log('📁 Dati caricati dal localStorage');
            }
        } catch (error) {
            console.error('Errore nel caricamento dati:', error);
        }
    }

    // === UI UPDATES ===
    updateUI() {
        // Aggiorna form match con dati salvati
        if (this.matchData.homeTeam) {
            document.getElementById('homeTeam').value = this.matchData.homeTeam;
            document.getElementById('awayTeam').value = this.matchData.awayTeam;
            document.getElementById('matchDate').value = this.matchData.date;
            document.getElementById('competition').value = this.matchData.competition;
            document.getElementById('venue').value = this.matchData.venue;
            document.getElementById('weather').value = this.matchData.weather;
            document.getElementById('scoutingFocus').value = this.matchData.scoutingFocus;
        }
        
        // Aggiorna timeline note
        this.updateNotesTimeline();
        
        // Aggiorna giocatori salvati
        this.updateSavedPlayers();
        
        // Aggiorna statistiche report
        this.updateReportStats();
        
        // Aggiorna anteprima report
        this.updateReportPreview();
    }

    updateReportStats() {
        document.getElementById('totalNotes').textContent = this.liveNotes.length;
        document.getElementById('totalPlayers').textContent = this.players.length;
        document.getElementById('matchDuration').textContent = this.matchData.duration;
    }

    updateReportPreview() {
        const preview = document.getElementById('reportPreview');
        if (this.liveNotes.length > 0 || this.players.length > 0) {
            const reportText = this.generateReport('text');
            preview.textContent = reportText.substring(0, 500) + (reportText.length > 500 ? '...\n\n[Anteprima limitata - Esporta per report completo]' : '');
        } else {
            preview.textContent = 'Nessun dato disponibile per il report.\nInizia ad aggiungere note e valutazioni per vedere l\'anteprima.';
        }
    }

    // === UTILITY ===
    showNotification(message, type = 'success') {
        // Crea elemento notifica
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'warning' ? '#f44336' : '#4CAF50'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            font-weight: 500;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animazione entrata
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Rimozione automatica
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// === INIZIALIZZAZIONE ===
// Avvia l'app quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
    window.soccerApp = new SoccerInABox();
});

// Auto-save periodico (ogni 30 secondi)
setInterval(() => {
    if (window.soccerApp) {
        window.soccerApp.saveData();
        console.log('💾 Auto-save completato');
    }
}, 30000);
