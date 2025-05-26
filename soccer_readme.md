# ⚽ Soccer in a Box - Minimal Match Analysis Kit

**Progressive Web App per match analysis e scouting calcistico offline**

Progettato specificamente per **accademie rurali**, **squadre a basso budget** e contesti dove l'infrastruttura tecnologica è limitata. Un toolkit essenziale che funziona completamente offline e si installa come app nativa su Android.

## 🎯 Obiettivo

Soccer in a Box democratizza l'analisi calcistica offrendo strumenti professionali accessibili a tutti, eliminando le barriere tecniche ed economiche che spesso impediscono alle squadre minori di sviluppare sistemi di scouting e match analysis.

## ✨ Caratteristiche Principali

### 🔄 **Funzionamento Offline Completo**
- Nessuna connessione internet richiesta durante l'uso
- Tutti i dati salvati localmente sul dispositivo
- Service Worker per caching intelligente delle risorse

### 📱 **Installabile come App Nativa**
- Progressive Web App (PWA) installabile da qualsiasi browser Android
- Icona personalizzata nella home screen
- Esperienza full-screen senza barre del browser
- Shortcuts per accesso rapido alle funzioni principali

### 🏟️ **Match Setup Intelligente**
- Configurazione rapida delle informazioni match
- Campi per squadre, data, competizione, venue
- Selezione condizioni meteo e focus scouting
- Salvataggio automatico dei dati

### ⏱️ **Timer Match Integrato**
- Cronometro con controlli play/pausa/reset
- Timestamp automatico per tutte le note
- Visualizzazione tempo in formato MM:SS
- Durata match calcolata automaticamente

### 📝 **Sistema di Note Live**
- Input rapido di osservazioni durante il match
- Quick actions per eventi comuni (gol, ammonizioni, cambi)
- Timeline cronologica delle note con timestamp
- Shortcuts da tastiera per velocità (Ctrl+Enter)

### 👤 **Valutazione Giocatori Avanzata**
- Sistema di rating a stelle (1-5) per multiple competenze
- Categorie: Tecnica, Fisico, Mentale
- Note testuali personalizzate per ogni giocatore
- Salvataggio e visualizzazione profili giocatori

### 📊 **Export e Report Professionali**
- Generazione automatica report in Markdown e TXT
- Statistiche riassuntive del match
- Export completo di note, valutazioni e dati temporali
- Download diretto dei file per condivisione

## 🛠️ Installazione e Deploy

### Deploy su GitHub Pages (Consigliato)

1. **Crea un nuovo repository su GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Soccer in a Box PWA"
   git branch -M main
   git remote add origin https://github.com/tuousername/soccer-in-a-box.git
   git push -u origin main
   ```

2. **Abilita GitHub Pages**
   - Vai su Settings → Pages
   - Source: Deploy from branch
   - Branch: main / (root)
   - Salva

3. **Accedi all'app**
   - URL: `https://tuousername.github.io/soccer-in-a-box/`
   - L'app sarà disponibile immediatamente

### Installazione su Android

1. **Apri l'app nel browser** (Chrome, Brave, Firefox)
2. **Tocca il menu del browser** (⋮)
3. **Seleziona "Aggiungi alla schermata Home"** o "Installa app"
4. **Conferma l'installazione**
5. **L'app apparirà nella home screen** come app nativa

### Deploy Locale (Per sviluppo)

```bash
# Clona o scarica i file
# Avvia un server HTTP locale
python -m http.server 8000
# Oppure
npx serve .
# Oppure
php -S localhost:8000
```

## 📁 Struttura File

```
soccer-in-a-box/
├── index.html          # Interfaccia principale dell'app
├── style.css           # Stili responsive e accessibili
├── app.js             # Logica applicazione e gestione dati
├── manifest.json      # Configurazione PWA
├── sw.js             # Service Worker per funzionalità offline
└── README.md         # Questa documentazione
```

## 🎮 Guida d'Uso

### 1. **Setup Match**
- Inserisci i dati del match (squadre, data, venue)
- Seleziona il focus di scouting
- Clicca "Inizia Match Analysis"

### 2. **Note Live Durante il Match**
- Avvia il timer quando inizia il match
- Usa i quick buttons per eventi comuni
- Scrivi note dettagliate nel campo testo
- Tutte le note sono timestampate automaticamente

### 3. **Valutazione Giocatori**
- Inserisci nome, numero e posizione
- Valuta con stelle le diverse competenze
- Aggiungi note specifiche testuali
- Salva per vedere il profilo nella lista

### 4. **Generazione Report**
- Visualizza statistiche nel tab Report
- Esporta in Markdown per GitHub/documentazione
- Esporta in TXT per condivisione semplice
- I file vengono scaricati automaticamente

## 💾 Gestione Dati

### Salvataggio Automatico
- **Auto-save ogni 30 secondi** in background
- **Salvataggio immediato** dopo ogni azione importante
- **Persistenza completa** anche chiudendo il browser

### Archiviazione Locale
- Utilizza `localStorage` del browser
- Nessun server esterno o database richiesto
- Dati accessibili solo dal dispositivo dell'utente

### Backup e Ripristino
- Export report come backup completo
- Funzione "Cancella Tutto" per reset completo
- Nessuna sincronizzazione cloud (privacy-first)

## 🎨 Design e UX

### Responsive Design
- **Mobile-first** ottimizzato per smartphone
- **Tablet-friendly** per uso su tablet during match
- **Desktop compatible** per preparazione pre-match

### Accessibilità
- **Contrasto elevato** per leggibilità in condizioni di luce variabile
- **Font leggibili** ottimizzati per lettura rapida
- **Controlli touch-friendly** per uso con guanti o in movimento
- **Feedback visivo** chiaro per ogni azione

### Performance
- **Caricamento istantaneo** dopo la prima visita
- **Interfaccia reattiva** senza lag o delay
- **Batteriche ottimizzata** per lunghe sessioni di match

## 🔧 Personalizzazione

### Modifica Colori e Tema
Edita le variabili CSS in `style.css`:
```css
:root {
    --primary-color: #2c5aa0;    /* Blu principale */
    --secondary-color: #4CAF50;  /* Verde accento */
    --accent-color: #FF9800;     /* Arancione azioni */
    /* ... */
}
```

### Aggiungere Nuove Competenze
Modifica il sistema di rating in `app.js`:
```javascript
const skillNames = {
    'ball-control': 'Controllo Palla',
    'passing': 'Passaggio',
    'nuova-skill': 'Nuova Competenza'  // Aggiungi qui
};
```

### Quick Actions Personalizzate
Aggiungi nuovi bottoni rapidi in `index.html`:
```html
<button class="quick-btn" data-action="nuova-azione">🎯 Nuova Azione</button>
```

## 🌐 Compatibilità Browser

### ✅ **Supporto Completo**
- **Chrome/Chromium** 80+
- **Firefox** 75+
- **Safari** 13+
- **Edge** 80+

### 📱 **Android**
- **Chrome Mobile** (consigliato)
- **Brave Browser**
- **Firefox Mobile**
- **Samsung Internet** 12+

### ⚠️ **Limitazioni Note**
- **Safari iOS**: Installazione PWA possibile ma con limitazioni
- **Browser obsoleti**: Funzionalità ridotte ma utilizzabile

## 🚀 Funzionalità Future (Roadmap)

### 🎯 **Fase 2: Analisi Avanzata**
- [ ] Heat maps posizionali
- [ ] Tracking eventi per giocatore
- [ ] Grafici performance temporali
- [ ] Comparazione multi-match

### 📊 **Fase 3: Insights AI**
- [ ] Suggerimenti tattici automatici
- [ ] Pattern recognition nei dati
- [ ] Proiezioni performance
- [ ] Alert anomalie prestazioni

### 🌐 **Fase 4: Collaborazione**
- [ ] Sync opzionale cloud
- [ ] Condivisione report real-time
- [ ] Multi-osservatore per stesso match
- [ ] Database giocatori condiviso

## 🤝 Contributi

Questo progetto è **open source** e accoglie contributi dalla comunità calcistica!

### Come Contribuire
1. Fork del repository
2. Crea branch per nuova feature (`git checkout -b feature/nuova-funzione`)
3. Commit delle modifiche (`git commit -am 'Aggiunge nuova funzione'`)
4. Push al branch (`git push origin feature/nuova-funzione`)
5. Apri Pull Request

### Aree di Contributo
- **UX/UI Design**: Miglioramenti interfaccia mobile
- **Traduzioni**: Localizzazione in altre lingue
- **Funzionalità**: Nuovi strumenti di analisi
- **Performance**: Ottimizzazioni e bug fix
- **Documentazione**: Guide d'uso e tutorial

## 📞 Supporto e Community

### 🐛 **Bug Report**
Segnala problemi aprendo un **Issue** su GitHub con:
- Descrizione dettagliata del problema
- Steps per riprodurlo
- Screenshot se possibile
- Modello dispositivo e browser

### 💡 **Richieste Feature**
Proponi nuove funzionalità con:
- Caso d'uso specifico
- Mockup o descrizione dettagliata
- Priorità e impatto stimato

### 🤝 **Community**
- **GitHub Discussions** per domande generali
- **Wiki** per guide avanzate e tips
- **Twitter** per aggiornamenti e news

## 📄 Licenza

Questo progetto è rilasciato sotto licenza **MIT** - vedi il file `LICENSE` per dettagli.

### Utilizzo Commerciale
✅ **Permesso** di utilizzare in contesti commerciali  
✅ **Modifica e redistribuzione** consentite  
✅ **Uso in accademie e club professionali**  
⚠️ **Attribuzione apprezzata** ma non obbligatoria

---

## 🎯 Vision

**Soccer in a Box rappresenta la democratizzazione dell'analisi calcistica.** 

In un mondo dove la tecnologia spesso crea divari, questo progetto colma il gap tra squadre professionali con budget illimitati e club rurali con risorse limitate. Ogni giovane talento, indipendentemente dalla sua geografia o condizione economica, merita strumenti per essere scoperto e sviluppato.

**Il calcio è universale. Gli strumenti per comprenderlo dovrebbero esserlo altrettanto.**

---

*Sviluppato con ❤️ per la comunità calcistica mondiale*  
*Made for Rural Football • Built for Everyone*

### 🌟 Crediti

**Progettato e sviluppato da:** [Il tuo nome/team]  
**Ispirato da:** La passione per il calcio e l'innovazione accessibile  
**Dedicato a:** Tutti gli allenatori, scout e analisti che credono nel potere dei dati per migliorare il gioco

---

**⚽ Pronto per il tuo primo match analysis?**  
**[Installa Soccer in a Box](https://tuousername.github.io/soccer-in-a-box/) e inizia subito!**