// ===== TEST IMMEDIATO =====
console.log('🔥 Script caricato!');

// Test funzione semplice
function testFunction() {
    alert('✅ JavaScript funziona!');
    console.log('Test function chiamata');
}
class SoccerInABox {
    constructor() {
        this.currentMode = 'coach';
        this.fanProfile = {
            level: 1,
            points: 0,
            predictionsCorrect: 0,
            narrativesWritten: 0,
            badges: ['🆕 Rookie Detective']
        };
        this.currentSnapshot = null;
        this.mysteryIndex = 0;
        this.currentPrediction = null;
        this.mysteries = [];
        this.init();
    }

    init() {
        this.setupModeNavigation();
        this.setupImportSystem();
        this.loadFanProfile();
        this.registerServiceWorker();
    }

    // ===== NAVIGAZIONE =====
    setupModeNavigation() {
        const modeButtons = document.querySelectorAll('.mode-btn');
        const modeContainers = document.querySelectorAll('.mode-container');

        modeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetMode = btn.dataset.mode;
                
                modeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                modeContainers.forEach(container => {
                    container.classList.remove('active');
                });
                
                document.getElementById(`${targetMode}-mode`).classList.add('active');
                this.currentMode = targetMode;
            });
        });
    }

    // ===== COACH MODE - EXPORT =====
    exportSnapshot() {
        const snapshot = {
            match: "Juventus vs Inter",
            timestamp: "75'",
            score: "2-1",
            events: [
                { time: 65, description: "Chiesa riceve sulla destra", type: "action" },
                { time: 67, description: "Cross di Chiesa, testa di Vlahovic!", type: "shot" },
                { time: 69, description: "Corner per la Juventus", type: "setpiece" }
            ],
            mysteries: [
                {
                    time: "65'",
                    setup: "Chiesa riceve palla sulla fascia destra, a 25 metri dalla porta avversaria. Davanti a lui Bastoni in marcatura, alle spalle Vlahovic che chiede palla in area...",
                    question: "Cosa succederà secondo te?",
                    options: [
                        { id: "cross", text: "🎯 Cross in area per Vlahovic", correct: true },
                        { id: "dribbling", text: "⚡ Dribbling su Bastoni", correct: false },
                        { id: "backward", text: "↩️ Passaggio indietro sicuro", correct: false },
                        { id: "shot", text: "🚀 Tiro dalla distanza", correct: false }
                    ],
                    revelation: "⚽ Chiesa crossa perfettamente in area! Vlahovic svetta di testa ma Handanovic para in extremis!",
                    points: 50
                },
                {
                    time: "72'",
                    setup: "Corner per la Juventus. Cuadrado si posiziona per battere, in area ci sono Vlahovic, Bremer e De Ligt contro la difesa dell'Inter. Handanovic organizza la barriera...",
                    question: "Come finirà questa azione da calcio d'angolo?",
                    options: [
                        { id: "goal", text: "⚽ Gol di testa!", correct: false },
                        { id: "clearance", text: "🛡️ Liberano i difensori", correct: true },
                        { id: "another_corner", text: "⭕ Altro corner", correct: false },
                        { id: "counter", text: "⚡ Contropiede Inter", correct: false }
                    ],
                    revelation: "🛡️ Skriniar libera di testa, palla che finisce sui piedi di Barella che inizia il contropiede!",
                    points: 40
                },
                {
                    time: "78'",
                    setup: "Ultima occasione della partita! Dzeko si gira in area di rigore con il pallone tra i piedi, Bremer in marcatura stretta. L'Inter è sotto 2-1 e il tempo scorre...",
                    question: "Cosa farà Dzeko in questo momento cruciale?",
                    options: [
                        { id: "shot_low", text: "🎯 Tiro rasoterra", correct: true },
                        { id: "shot_high", text: "🚀 Tiro alto", correct: false },
                        { id: "pass", text: "🤝 Passaggio a Lautaro", correct: false },
                        { id: "dribble", text: "💫 Dribbling su Bremer", correct: false }
                    ],
                    revelation: "🎯 Dzeko calcia rasoterra! Szczesny para con i piedi, ultimo brivido della partita!",
                    points: 60
                }
            ],
            narratives: [
                {
                    event: "Chiesa cross + Vlahovic header",
                    official: "Al 67° minuto splendida azione della Juventus: Chiesa serve un cross millimetrico dalla destra, Vlahovic svetta imperioso ma trova la grande parata di Handanovic che mantiene il risultato sul 2-1."
                }
            ],
            metadata: {
                generated: new Date().toISOString(),
                coachId: "demo_coach",
                matchId: "JUV_INT_2025"
            }
        };

        const encoded = btoa(JSON.stringify(snapshot));
        const shareLink = `soccer://snapshot/${encoded}`;
        
        document.getElementById('share-link').value = shareLink;
        document.getElementById('share-link-container').classList.remove('hidden');
        
        this.showNotification('🔗 Link snapshot generato!', 'success');
    }

    copyShareLink() {
        const linkInput = document.getElementById('share-link');
        linkInput.select();
        linkInput.setSelectionRange(0, 99999);
        document.execCommand('copy');
        this.showNotification('📋 Link copiato!', 'success');
    }

    // ===== DETECTIVE MODE - IMPORT =====
    setupImportSystem() {
        const importContainer = document.getElementById('import-container');
        
        // Drag & Drop
        importContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            importContainer.classList.add('dragover');
        });
        
        importContainer.addEventListener('dragleave', () => {
            importContainer.classList.remove('dragover');
        });
        
        importContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            importContainer.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.loadSnapshotFromFile(files[0]);
            }
        });

        // Setup prediction buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('prediction-btn')) {
                // Remove selection from all buttons
                document.querySelectorAll('.prediction-btn').forEach(btn => {
                    btn.classList.remove('selected');
                });
                // Select clicked button
                e.target.classList.add('selected');
                this.currentPrediction = e.target.dataset.option;
            }
        });
    }

    async loadSnapshotFromFile(file) {
        try {
            const text = await file.text();
            const snapshot = JSON.parse(text);
            this.loadSnapshot(snapshot);
        } catch (error) {
            this.showNotification('❌ Errore nel caricamento del file', 'error');
        }
    }

    importFromLink() {
        const link = document.getElementById('snapshot-link').value.trim();
        
        if (!link.startsWith('soccer://snapshot/')) {
            this.showNotification('❌ Link non valido', 'error');
            return;
        }
        
        try {
            const encoded = link.replace('soccer://snapshot/', '');
            const snapshot = JSON.parse(atob(encoded));
            this.loadSnapshot(snapshot);
        } catch (error) {
            this.showNotification('❌ Errore nel decodificare il link', 'error');
        }
    }

    loadSampleData() {
        // Carica dati demo per testing
        this.exportSnapshot(); // Genera snapshot
        const link = document.getElementById('share-link').value;
        document.getElementById('snapshot-link').value = link;
        this.importFromLink();
    }

    loadSnapshot(snapshot) {
        this.currentSnapshot = snapshot;
        this.mysteries = snapshot.mysteries || [];
        this.mysteryIndex = 0;
        
        // Nascondi import, mostra investigation
        document.getElementById('import-container').classList.add('hidden');
        document.getElementById('investigation-area').classList.remove('hidden');
        
        // Carica primo mistero
        this.loadCurrentMystery();
        
        this.showNotification(`🕵️ Analisi caricata: ${snapshot.match}`, 'success');
    }

    // ===== DETECTIVE GAMEPLAY =====
    loadCurrentMystery() {
        if (this.mysteryIndex >= this.mysteries.length) {
            this.completeInvestigation();
            return;
        }

        const mystery = this.mysteries[this.mysteryIndex];
        
        // Reset UI
        document.getElementById('prediction-result').classList.add('hidden');
        document.getElementById('current-mystery').classList.remove('hidden');
        document.querySelectorAll('.prediction-btn').forEach(btn => {
            btn.classList.remove('selected', 'correct', 'wrong');
        });
        
        // Popola mistero
        document.getElementById('mystery-time').textContent = mystery.time;
        document.getElementById('mystery-description').innerHTML = 
            mystery.setup + '<br><br><strong>' + mystery.question + '</strong>';
        
        // Popola opzioni
        const optionsContainer = document.getElementById('prediction-options');
        optionsContainer.innerHTML = '';
        
        mystery.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'prediction-btn';
            btn.dataset.option = option.id;
            btn.textContent = option.text;
            optionsContainer.appendChild(btn);
        });

        // Reset prediction
        this.currentPrediction = null;
        
        // Aggiorna progress
        this.updateProgress();
    }

    submitPrediction() {
        if (!this.currentPrediction) {
            this.showNotification('🤔 Seleziona prima una predizione!', 'info');
            return;
        }

        const mystery = this.mysteries[this.mysteryIndex];
        const selectedOption = mystery.options.find(opt => opt.id === this.currentPrediction);
        const isCorrect = selectedOption.correct;
        
        // Feedback visivo
        document.querySelectorAll('.prediction-btn').forEach(btn => {
            const optionData = mystery.options.find(opt => opt.id === btn.dataset.option);
            if (optionData.correct) {
                btn.classList.add('correct');
            } else if (btn.dataset.option === this.currentPrediction) {
                btn.classList.add('wrong');
            }
        });

        // Aggiorna stats
        if (isCorrect) {
            this.fanProfile.points += mystery.points;
            this.fanProfile.predictionsCorrect++;
            this.checkForBadges();
        }

        // Mostra rivelazione
        this.showRevelation(mystery, isCorrect);
        
        // Aggiorna UI
        this.updateFanStats();
        this.saveFanProfile();
    }

    showRevelation(mystery, isCorrect) {
        const resultCard = document.getElementById('prediction-result');
        const content = document.getElementById('revelation-content');
        
        const pointsText = isCorrect ? 
            `<div style="color: #22c55e; font-weight: bold;">+${mystery.points} punti! 🎉</div>` :
            `<div style="color: #ef4444;">Nessun punto questa volta 😔</div>`;
        
        content.innerHTML = `
            <div style="font-size: 1.1rem; margin-bottom: 1rem;">
                ${mystery.revelation}
            </div>
            ${pointsText}
        `;
        
        document.getElementById('current-mystery').classList.add('hidden');
        resultCard.classList.remove('hidden');
    }

    nextMystery() {
        this.mysteryIndex++;
        this.loadCurrentMystery();
    }

    completeInvestigation() {
        const totalPoints = this.fanProfile.points;
        const correctPredictions = this.fanProfile.predictionsCorrect;
        const totalMysteries = this.mysteries.length;
        
        this.showNotification(
            `🏆 Investigazione completata! ${correctPredictions}/${totalMysteries} corrette`, 
            'success'
        );
        
        // Reset per nuova investigazione
        document.getElementById('investigation-area').classList.add('hidden');
        document.getElementById('import-container').classList.remove('hidden');
        document.getElementById('snapshot-link').value = '';
    }

    // ===== NARRATIVE MODE =====
    submitNarrative() {
        const userText = document.getElementById('user-narrative').value.trim();
        
        if (!userText) {
            this.showNotification('📝 Scrivi prima una cronaca!', 'info');
            return;
        }

        // Simula cronaca ufficiale
        const officialText = "Al 67° minuto splendida azione della Juventus: Chiesa serve un cross millimetrico dalla destra, Vlahovic svetta imperioso ma trova la grande parata di Handanovic che mantiene il risultato sul 2-1.";
        
        // Mostra confronto
        document.getElementById('user-narrative-display').textContent = userText;
        document.getElementById('official-narrative').textContent = officialText;
        document.getElementById('narrative-comparison').classList.remove('hidden');
        
        // Aggiorna stats
        this.fanProfile.narrativesWritten++;
        this.fanProfile.points += 25; // Punti per creatività
        
        this.updateFanStats();
        this.checkForBadges();
        this.saveFanProfile();
        
        this.showNotification('📰 Cronaca pubblicata! +25 punti creatività', 'success');
    }

    // ===== GAMIFICATION SYSTEM =====
    updateFanStats() {
        document.getElementById('fan-level').textContent = this.fanProfile.level;
        document.getElementById('fan-points').textContent = this.fanProfile.points;
        document.getElementById('predictions-correct').textContent = this.fanProfile.predictionsCorrect;
        document.getElementById('narratives-written').textContent = this.fanProfile.narrativesWritten;
        
        // Level up check
        const newLevel = Math.floor(this.fanProfile.points / 100) + 1;
        if (newLevel > this.fanProfile.level) {
            this.fanProfile.level = newLevel;
            this.showNotification(`🆙 Level UP! Ora sei livello ${newLevel}!`, 'success');
        }
    }

    checkForBadges() {
        const badges = [];
        
        if (this.fanProfile.predictionsCorrect >= 5 && !this.fanProfile.badges.includes('🎯 Profeta')) {
            badges.push('🎯 Profeta');
        }
        
        if (this.fanProfile.predictionsCorrect >= 3 && this.fanProfile.narrativesWritten >= 2 && !this.fanProfile.badges.includes('👁️ Occhio Clinico')) {
            badges.push('👁️ Occhio Clinico');
        }
        
        if (this.fanProfile.narrativesWritten >= 5 && !this.fanProfile.badges.includes('📝 Narratore')) {
            badges.push('📝 Narratore');
        }
        
        if (this.fanProfile.points >= 500 && !this.fanProfile.badges.includes('⭐ Analista')) {
            badges.push('⭐ Analista');
        }
        
        // Aggiungi nuovi badges
        badges.forEach(badge => {
            if (!this.fanProfile.badges.includes(badge)) {
                this.fanProfile.badges.push(badge);
                this.showNotification(`🏆 Nuovo Badge: ${badge}!`, 'success');
            }
        });
        
        this.updateBadgesDisplay();
    }

    updateBadgesDisplay() {
        const container = document.getElementById('badges-container');
        container.innerHTML = '';
        
        this.fanProfile.badges.forEach(badge => {
            const badgeEl = document.createElement('div');
            badgeEl.className = 'badge';
            badgeEl.textContent = badge;
            container.appendChild(badgeEl);
        });
    }

    updateProgress() {
        const progress = ((this.mysteryIndex) / this.mysteries.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = 
            `${this.mysteryIndex}/${this.mysteries.length} eventi analizzati`;
    }

    // ===== STORAGE =====
    loadFanProfile() {
        const saved = localStorage.getItem('soccerbox_fan_profile');
        if (saved) {
            this.fanProfile = { ...this.fanProfile, ...JSON.parse(saved) };
        }
        this.updateFanStats();
        this.updateBadgesDisplay();
    }

    saveFanProfile() {
        localStorage.setItem('soccerbox_fan_profile', JSON.stringify(this.fanProfile));
    }

    // ===== UTILS =====
    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('./sw.js');
                console.log('Service Worker registrato');
            } catch (error) {
                console.log('Errore Service Worker:', error);
            }
        }
    }

    // ===== API EXPORT/IMPORT =====
    exportData() {
        return {
            fanProfile: this.fanProfile,
            currentSnapshot: this.currentSnapshot,
            mysteryIndex: this.mysteryIndex,
            timestamp: new Date().toISOString()
        };
    }

    importData(data) {
        this.fanProfile = data.fanProfile || this.fanProfile;
        this.currentSnapshot = data.currentSnapshot || null;
        this.mysteryIndex = data.mysteryIndex || 0;
        this.updateFanStats();
        this.updateBadgesDisplay();
    }
}

// ===== FUNZIONI GLOBALI (DEVONO ESSERE FUORI DALLA CLASSE) =====
function startAnalysis() {
    if (window.soccerApp) {
        window.soccerApp.showNotification('🚀 Analisi avviata!', 'success');
    }
}

function exportSnapshot() {
    if (window.soccerApp) {
        window.soccerApp.exportSnapshot();
    }
}

function copyShareLink() {
    if (window.soccerApp) {
        window.soccerApp.copyShareLink();
    }
}

function importFromLink() {
    if (window.soccerApp) {
        window.soccerApp.importFromLink();
    }
}

function loadSampleData() {
    if (window.soccerApp) {
        window.soccerApp.loadSampleData();
    }
}

function submitPrediction() {
    if (window.soccerApp) {
        window.soccerApp.submitPrediction();
    }
}

function nextMystery() {
    if (window.soccerApp) {
        window.soccerApp.nextMystery();
    }
}

function submitNarrative() {
    if (window.soccerApp) {
        window.soccerApp.submitNarrative();
    }
}

// ===== INIZIALIZZAZIONE =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Soccer in a Box inizializzato!');
    
    // Crea l'app globalmente
    window.soccerApp = new SoccerInABox();
    
    // Test immediato
    console.log('✅ App caricata:', window.soccerApp);
    console.log('✅ Funzioni globali:', typeof e