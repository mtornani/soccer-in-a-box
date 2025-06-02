// Community Module - FIXED VERSION
// ===================================

// Helper Functions for Shared Analysis
function getFormattedTimestamp(elapsedMs) {
    if (isNaN(elapsedMs) || elapsedMs < 0) elapsedMs = 0;
    const minutes = Math.floor(elapsedMs / 60000);
    const seconds = Math.floor((elapsedMs % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function escapeHTML(str) {
    if (str === null || str === undefined) {
        return '';
    }
    return String(str).replace(/[&<>"']/g, function (match) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[match];
    });
}

// Core Viewer Functions for Shared Analysis
function clearSharedAnalysisDisplay() {
    const displayArea = document.getElementById('shared-analysis-display-area');
    if (displayArea) {
        displayArea.innerHTML = '<p><em>No analysis loaded or cleared. Use the controls above to load an analysis.</em></p>';
    }
}

function displaySharedAnalysis(data) {
    const displayArea = document.getElementById('shared-analysis-display-area');
    if (!displayArea) {
        console.error('Shared analysis display area not found.');
        return;
    }
    displayArea.innerHTML = ''; // Clear previous content

    if (!data || typeof data !== 'object') {
        displayArea.innerHTML = '<p><em>Error: Invalid analysis data format.</em></p>';
        return;
    }

    let html = '<h4>Analysis Snapshot Details:</h4>';
    html += `<p><strong>Snapshot Version:</strong> ${escapeHTML(data.snapshotVersion)}</p>`;
    html += `<p><strong>Generated At:</strong> ${escapeHTML(new Date(data.generatedAt).toLocaleString())}</p>`;
    html += `<p><strong>Source App:</strong> ${escapeHTML(data.sourceApp)}</p>`;

    if (data.matchDetails) {
        html += '<hr><h5>Match Details:</h5>';
        html += `<p><strong>Teams:</strong> ${escapeHTML(data.matchDetails.homeTeam)} vs ${escapeHTML(data.matchDetails.awayTeam)}</p>`;
        html += `<p><strong>Date:</strong> ${escapeHTML(data.matchDetails.date)}</p>`;
        html += `<p><strong>Venue:</strong> ${escapeHTML(data.matchDetails.venue)}</p>`;
        html += `<p><strong>Competition:</strong> ${escapeHTML(data.matchDetails.competition)}</p>`;
        if (data.matchDetails.startTimeISO) {
             html += `<p><strong>Start Time:</strong> ${escapeHTML(new Date(data.matchDetails.startTimeISO).toLocaleString())}</p>`;
        }
        html += `<p><strong>Final Duration:</strong> ${escapeHTML(data.matchDetails.finalDurationFormatted)}</p>`;
    }

    if (data.analysisSummary) {
        html += '<hr><h5>Analysis Summary:</h5>';
        html += `<p><strong>Total Notes:</strong> ${escapeHTML(data.analysisSummary.totalNotes)}</p>`;
        html += `<p><strong>Players Evaluated:</strong> ${escapeHTML(data.analysisSummary.playersEvaluated)}</p>`;
        html += `<p><strong>Overall Average Rating:</strong> ${escapeHTML(data.analysisSummary.overallAverageRating)}</p>`;
    }

    if (data.timelineEvents && data.timelineEvents.length > 0) {
        html += '<hr><h5>Timeline Events:</h5>';
        html += '<ul>';
        data.timelineEvents.forEach(event => {
            html += `<li><strong>${escapeHTML(event.timestampFormatted)}:</strong> ${escapeHTML(event.text)}</li>`;
        });
        html += '</ul>';
    }

    if (data.playerEvaluations && data.playerEvaluations.length > 0) {
        html += '<hr><h5>Player Evaluations:</h5>';
        data.playerEvaluations.forEach(player => {
            html += `<div class="player-eval-card" style="border:1px solid #ccc; margin-bottom:10px; padding:10px; border-radius:5px;">`;
            html += `<strong>${escapeHTML(player.name)} (#${escapeHTML(player.number)})</strong> - ${escapeHTML(player.position)}`;
            html += `<p>Avg Rating: ${escapeHTML(player.averageRating)}⭐</p>`;
            if (player.ratings) {
                html += `<p>Technical: ${escapeHTML(player.ratings.technical)}⭐ | Physical: ${escapeHTML(player.ratings.physical)}⭐ | Mental: ${escapeHTML(player.ratings.mental)}⭐</p>`;
            }
            if (player.notes) {
                html += `<p><em>Notes:</em> ${escapeHTML(player.notes)}</p>`;
            }
            html += `</div>`;
        });
    }
    displayArea.innerHTML = html;
}

function handleSnapshotFile(file) {
    if (!file) {
        clearSharedAnalysisDisplay();
        document.getElementById('shared-analysis-display-area').innerHTML = '<p><em>No file selected.</em></p>';
        return;
    }
    if (file.type !== 'application/json') {
        clearSharedAnalysisDisplay();
        document.getElementById('shared-analysis-display-area').innerHTML = '<p><em>Error: Invalid file type. Please select a .json file.</em></p>';
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const snapshotData = JSON.parse(event.target.result);
            displaySharedAnalysis(snapshotData);
        } catch (e) {
            console.error("Error parsing snapshot JSON:", e);
            clearSharedAnalysisDisplay();
            document.getElementById('shared-analysis-display-area').innerHTML = `<p><em>Error: Could not parse the JSON file. ${escapeHTML(e.message)}</em></p>`;
        }
    };
    reader.onerror = function(event) {
        console.error("File reading error:", event);
        clearSharedAnalysisDisplay();
        document.getElementById('shared-analysis-display-area').innerHTML = '<p><em>Error: Could not read the file.</em></p>';
    };
    reader.readAsText(file);
}

function initSharedAnalysisView() {
    console.log('Initializing Shared Analysis View');
    const fileInput = document.getElementById('snapshot-file-input');
    const loadFileBtn = document.getElementById('load-snapshot-btn');
    const loadDemoBtn = document.getElementById('load-demo-community-analysis-btn');

    if (loadFileBtn) {
        loadFileBtn.onclick = function() { // Use onclick to avoid duplicate listeners if tab is re-entered
            if (fileInput && fileInput.files && fileInput.files.length > 0) {
                handleSnapshotFile(fileInput.files[0]);
            } else {
                const displayArea = document.getElementById('shared-analysis-display-area');
                if(displayArea) displayArea.innerHTML = '<p><em>Please select a file first.</em></p>';
            }
        };
    }

    if (loadDemoBtn) {
        loadDemoBtn.onclick = function() { // Use onclick
            const demoData = {
                snapshotVersion: "2.0",
                generatedAt: new Date().toISOString(),
                sourceApp: "SoccerInABox/DemoSnapshot-v2.0",
                matchDetails: {
                    homeTeam: "Red Dragons", awayTeam: "Blue Eagles", date: "2024-08-01",
                    venue: "Champions Stadium", competition: "Friendly Cup",
                    startTimeISO: new Date().toISOString(), finalDurationFormatted: "92:30"
                },
                timelineEvents: [
                    { id: 1, text: "Kick-off!", timestampFormatted: "00:00", elapsedTimeMs: 0 },
                    { id: 2, text: "Goal by Red Dragons #9!", timestampFormatted: "15:32", elapsedTimeMs: 15 * 60000 + 32000 },
                    { id: 3, text: "Yellow card for Blue Eagles #4.", timestampFormatted: "44:15", elapsedTimeMs: 44 * 60000 + 15000 }
                ],
                playerEvaluations: [
                    { id: 101, name: "Alex Striker", number: 9, position: "Forward", notes: "Great goal, good off-ball movement.", ratings: { technical: 5, physical: 4, mental: 4 }, averageRating: "4.3" },
                    { id: 102, name: "Midfield Maestro", number: 8, position: "Midfielder", notes: "Excellent passing range.", ratings: { technical: 5, physical: 3, mental: 5 }, averageRating: "4.3" }
                ],
                analysisSummary: { totalNotes: 3, playersEvaluated: 2, matchDurationFormatted: "92:30", overallAverageRating: "4.3" },
                interactiveElements: {}
            };
            displaySharedAnalysis(demoData);
        };
    }
     // Clear display area initially when tab is loaded
    clearSharedAnalysisDisplay();
}

// Assicurati che appState esista
if (typeof window !== 'undefined' && !window.appState) {
    window.appState = {
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
        playerRatings: {},
        community: {
            currentTab: 'engagement',
            polls: [],
            fanMessages: [],
            sentimentData: {
                positive: 0,
                negative: 0,
                neutral: 0
            },
            liveStats: {
                onlineFans: 0,
                totalEngagement: 0,
                activePolls: 0
            },
            matchPredictions: [],
            socialFeeds: [],
            broadcastMessages: []
        }
    };
}

// Se appState esiste già, aggiungi solo community se manca
if (window.appState && !window.appState.community) {
    window.appState.community = {
        currentTab: 'engagement',
        polls: [],
        fanMessages: [],
        sentimentData: {
            positive: 0,
            negative: 0,
            neutral: 0
        },
        liveStats: {
            onlineFans: 0,
            totalEngagement: 0,
            activePolls: 0
        },
        matchPredictions: [],
        socialFeeds: [],
        broadcastMessages: []
    };
}

// Community Navigation - FIXED
function showCommunityTab(tabName) {
    console.log('Switching to community tab:', tabName);
    
    if (window.appState) {
        window.appState.community.currentTab = tabName;
    }
    
    // Hide all community tabs
    document.querySelectorAll('.community-tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Show selected tab
    const targetTab = document.getElementById(`community-${tabName}-tab`);
    if (targetTab) {
        targetTab.classList.remove('hidden');
    }
    
    // Update tab buttons
    document.querySelectorAll('.community-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[onclick*="showCommunityTab('${tabName}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Load tab-specific content
    switch(tabName) {
        case 'engagement':
            updateEngagementStats();
            updateFanMessagesFeed();
            break;
        case 'polls':
            updatePollsList();
            break;
        case 'sentiment':
            updateSentimentAnalysis();
            break;
        case 'social':
            updateSocialFeeds();
            break;
        case 'shared-analysis': // New case
            initSharedAnalysisView();
            break;
    }
}

// Engagement Functions - FIXED
function updateEngagementStats() {
    console.log('Updating engagement stats...');
    
    if (!window.appState?.community) return;
    
    // Simulate real-time data
    window.appState.community.liveStats.onlineFans = Math.floor(Math.random() * 1000) + 500;
    window.appState.community.liveStats.totalEngagement = Math.floor(Math.random() * 5000) + 2000;
    window.appState.community.liveStats.activePolls = window.appState.community.polls.filter(poll => poll.active).length;
    
    // Update UI elements
    updateStatsUI();
}

function updateStatsUI() {
    if (!window.appState?.community) return;
    
    const elements = [
        { id: 'online-fans-count', value: window.appState.community.liveStats.onlineFans },
        { id: 'online-fans-count-main', value: window.appState.community.liveStats.onlineFans },
        { id: 'total-engagement-count', value: window.appState.community.liveStats.totalEngagement },
        { id: 'active-polls-count', value: window.appState.community.liveStats.activePolls }
    ];
    
    elements.forEach(({ id, value }) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value ? value.toLocaleString() : '0';
        }
    });
}

// Fan Message System - FIXED
function addFanMessage(message, type = 'neutral') {
    console.log('Adding fan message:', message, type);
    
    if (!window.appState?.community) {
        console.error('Community state not initialized');
        return;
    }
    
    const fanMessage = {
        id: Date.now(),
        text: message,
        type: type,
        timestamp: new Date().toLocaleTimeString(),
        likes: Math.floor(Math.random() * 50) + 1,
        fanName: generateRandomFanName()
    };
    
    window.appState.community.fanMessages.unshift(fanMessage);
    window.appState.community.sentimentData[type]++;
    
    updateFanMessagesFeed();
    updateSentimentAnalysis();
    updateEngagementStats();
    
    // Save data if function exists
    if (typeof window.saveData === 'function') {
        window.saveData();
    }
}

function generateRandomFanName() {
    const names = ['Marco', 'Luigi', 'Giuseppe', 'Francesco', 'Antonio', 'Alessandro', 'Andrea', 'Matteo', 'Lorenzo', 'Davide'];
    const surnames = ['Rossi', 'Bianchi', 'Romano', 'Ricci', 'Marino', 'Greco', 'Bruno', 'Gallo', 'Conti', 'De Luca'];
    return `${names[Math.floor(Math.random() * names.length)]} ${surnames[Math.floor(Math.random() * surnames.length)]}`;
}

function updateFanMessagesFeed() {
    const feed = document.getElementById('fan-messages-feed');
    if (!feed) {
        console.error('Fan messages feed element not found');
        return;
    }
    
    if (!window.appState?.community) {
        console.error('Community state not available');
        return;
    }
    
    feed.innerHTML = '';
    
    if (window.appState.community.fanMessages.length === 0) {
        feed.innerHTML = `
            <div class="empty-state">
                <p>🎯 No fan messages yet. Use the quick actions above to simulate fan engagement!</p>
            </div>
        `;
        return;
    }
    
    window.appState.community.fanMessages.slice(0, 10).forEach(message => {
        const messageEl = document.createElement('div');
        messageEl.className = `fan-message ${message.type}`;
        messageEl.innerHTML = `
            <div class="fan-message-header">
                <span class="fan-name">👤 ${message.fanName}</span>
                <span class="message-time">🕐 ${message.timestamp}</span>
            </div>
            <div class="fan-message-text">${message.text}</div>
            <div class="fan-message-actions">
                <span class="message-likes">❤️ ${message.likes}</span>
                <span class="message-type ${message.type}">
                    ${message.type === 'positive' ? '😊' : message.type === 'negative' ? '😞' : '😐'} 
                    ${message.type}
                </span>
            </div>
        `;
        feed.appendChild(messageEl);
    });
}

// Poll System - FIXED
function createPoll() {
    console.log('Creating poll...');
    
    const questionEl = document.getElementById('poll-question');
    const optionInputs = document.querySelectorAll('.poll-option-input');
    
    if (!questionEl) {
        console.error('Poll question element not found');
        return;
    }
    
    const question = questionEl.value.trim();
    
    if (!question) {
        alert('Please enter a poll question');
        return;
    }
    
    const options = Array.from(optionInputs)
        .map(input => input.value.trim())
        .filter(option => option.length > 0);
    
    if (options.length < 2) {
        alert('Please add at least 2 options');
        return;
    }
    
    const poll = {
        id: Date.now(),
        question: question,
        options: options.map(option => ({
            text: option,
            votes: 0
        })),
        active: true,
        createdAt: new Date().toLocaleString(),
        totalVotes: 0
    };
    
    if (window.appState?.community) {
        window.appState.community.polls.unshift(poll);
    }
    
    // Clear form
    questionEl.value = '';
    document.querySelectorAll('.poll-option-input').forEach(input => {
        input.value = '';
    });
    
    resetPollOptions();
    updatePollsList();
    updateEngagementStats();
    
    if (typeof window.saveData === 'function') {
        window.saveData();
    }
    
    // Simulate some votes after creation
    setTimeout(() => simulatePollVotes(poll.id), 1000);
}

function addPollOption() {
    const optionsContainer = document.getElementById('poll-options-container');
    if (!optionsContainer) return;
    
    const optionCount = optionsContainer.children.length;
    
    if (optionCount >= 6) {
        alert('Maximum 6 options allowed');
        return;
    }
    
    const optionDiv = document.createElement('div');
    optionDiv.className = 'poll-option-input-container';
    optionDiv.innerHTML = `
        <input type="text" class="poll-option-input" placeholder="Poll option ${optionCount + 1}">
        <button type="button" class="btn-remove-option" onclick="removePollOption(this)">✕</button>
    `;
    
    optionsContainer.appendChild(optionDiv);
}

function removePollOption(button) {
    const container = button.parentElement;
    const optionsContainer = document.getElementById('poll-options-container');
    
    if (optionsContainer && optionsContainer.children.length > 2) {
        container.remove();
    } else {
        alert('Minimum 2 options required');
    }
}

function resetPollOptions() {
    const optionsContainer = document.getElementById('poll-options-container');
    if (!optionsContainer) return;
    
    optionsContainer.innerHTML = `
        <div class="poll-option-input-container">
            <input type="text" class="poll-option-input" placeholder="Poll option 1">
        </div>
        <div class="poll-option-input-container">
            <input type="text" class="poll-option-input" placeholder="Poll option 2">
        </div>
    `;
}

function updatePollsList() {
    const pollsList = document.getElementById('polls-list');
    if (!pollsList) return;
    
    if (!window.appState?.community) return;
    
    pollsList.innerHTML = '';
    
    if (window.appState.community.polls.length === 0) {
        pollsList.innerHTML = `
            <div class="empty-state">
                <p>📊 No polls created yet. Create your first poll to engage with fans!</p>
            </div>
        `;
        return;
    }
    
    window.appState.community.polls.forEach(poll => {
        const pollEl = document.createElement('div');
        pollEl.className = `poll-card ${poll.active ? 'active' : 'closed'}`;
        
        const optionsHtml = poll.options.map((option, index) => {
            const percentage = poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;
            return `
                <div class="poll-option" onclick="votePoll(${poll.id}, ${index})">
                    <div class="poll-option-text">${option.text}</div>
                    <div class="poll-option-bar">
                        <div class="poll-option-fill" style="width: ${percentage}%"></div>
                    </div>
                    <div class="poll-option-stats">
                        <span>${option.votes} votes (${percentage}%)</span>
                    </div>
                </div>
            `;
        }).join('');
        
        pollEl.innerHTML = `
            <div class="poll-header">
                <h4>${poll.question}</h4>
                <div class="poll-status">
                    <span class="poll-badge ${poll.active ? 'active' : 'closed'}">
                        ${poll.active ? '🔴 LIVE' : '⏹️ CLOSED'}
                    </span>
                </div>
            </div>
            <div class="poll-options">
                ${optionsHtml}
            </div>
            <div class="poll-footer">
                <div class="poll-stats">
                    <span>📊 Total votes: ${poll.totalVotes}</span>
                    <span>📅 Created: ${poll.createdAt}</span>
                </div>
                <div class="poll-actions">
                    ${poll.active ? 
                        `<button class="btn btn-danger btn-small" onclick="closePoll(${poll.id})">Close Poll</button>` :
                        `<button class="btn btn-secondary btn-small" onclick="deletePoll(${poll.id})">Delete</button>`
                    }
                </div>
            </div>
        `;
        
        pollsList.appendChild(pollEl);
    });
}

function votePoll(pollId, optionIndex) {
    if (!window.appState?.community) return;
    
    const poll = window.appState.community.polls.find(p => p.id === pollId);
    if (!poll || !poll.active) return;
    
    poll.options[optionIndex].votes++;
    poll.totalVotes++;
    
    updatePollsList();
    updateEngagementStats();
    
    if (typeof window.saveData === 'function') {
        window.saveData();
    }
}

function closePoll(pollId) {
    if (!window.appState?.community) return;
    
    const poll = window.appState.community.polls.find(p => p.id === pollId);
    if (poll) {
        poll.active = false;
        updatePollsList();
        updateEngagementStats();
        
        if (typeof window.saveData === 'function') {
            window.saveData();
        }
    }
}

function deletePoll(pollId) {
    if (!window.appState?.community) return;
    
    if (confirm('Are you sure you want to delete this poll?')) {
        window.appState.community.polls = window.appState.community.polls.filter(p => p.id !== pollId);
        updatePollsList();
        updateEngagementStats();
        
        if (typeof window.saveData === 'function') {
            window.saveData();
        }
    }
}

function simulatePollVotes(pollId) {
    if (!window.appState?.community) return;
    
    const poll = window.appState.community.polls.find(p => p.id === pollId);
    if (!poll || !poll.active) return;
    
    // Simulate random votes
    const votesToAdd = Math.floor(Math.random() * 50) + 10;
    
    for (let i = 0; i < votesToAdd; i++) {
        const randomOptionIndex = Math.floor(Math.random() * poll.options.length);
        poll.options[randomOptionIndex].votes++;
        poll.totalVotes++;
    }
    
    updatePollsList();
    updateEngagementStats();
    
    if (typeof window.saveData === 'function') {
        window.saveData();
    }
}

// Sentiment Analysis - FIXED
function updateSentimentAnalysis() {
    const sentimentChart = document.getElementById('sentiment-chart');
    if (!sentimentChart || !window.appState?.community) return;
    
    const data = window.appState.community.sentimentData;
    const total = data.positive + data.negative + data.neutral;
    
    if (total === 0) {
        sentimentChart.innerHTML = `
            <div class="empty-state">
                <p>📊 No sentiment data available yet. Fan messages will generate sentiment analysis.</p>
            </div>
        `;
        return;
    }
    
    const positivePercent = Math.round((data.positive / total) * 100);
    const negativePercent = Math.round((data.negative / total) * 100);
    const neutralPercent = Math.round((data.neutral / total) * 100);
    
    sentimentChart.innerHTML = `
        <div class="sentiment-overview">
            <h4>Fan Sentiment Analysis</h4>
            <div class="sentiment-stats">
                <div class="sentiment-stat positive">
                    <span class="sentiment-label">😊 Positive</span>
                    <span class="sentiment-value">${positivePercent}%</span>
                    <div class="sentiment-bar">
                        <div class="sentiment-fill positive" style="width: ${positivePercent}%"></div>
                    </div>
                    <span class="sentiment-count">${data.positive} messages</span>
                </div>
                <div class="sentiment-stat negative">
                    <span class="sentiment-label">😞 Negative</span>
                    <span class="sentiment-value">${negativePercent}%</span>
                    <div class="sentiment-bar">
                        <div class="sentiment-fill negative" style="width: ${negativePercent}%"></div>
                    </div>
                    <span class="sentiment-count">${data.negative} messages</span>
                </div>
                <div class="sentiment-stat neutral">
                    <span class="sentiment-label">😐 Neutral</span>
                    <span class="sentiment-value">${neutralPercent}%</span>
                    <div class="sentiment-bar">
                        <div class="sentiment-fill neutral" style="width: ${neutralPercent}%"></div>
                    </div>
                    <span class="sentiment-count">${data.neutral} messages</span>
                </div>
            </div>
        </div>
        <div class="sentiment-insights">
            <h5>📈 Insights</h5>
            <div class="insight-cards">
                ${generateSentimentInsights(positivePercent, negativePercent, neutralPercent)}
            </div>
        </div>
    `;
}

function generateSentimentInsights(positive, negative, neutral) {
    let insights = [];
    
    if (positive > 60) {
        insights.push('<div class="insight-card positive">🎉 Fans are very positive! Great engagement opportunity.</div>');
    } else if (negative > 50) {
        insights.push('<div class="insight-card negative">⚠️ High negative sentiment detected. Consider engagement strategies.</div>');
    } else if (neutral > 70) {
        insights.push('<div class="insight-card neutral">📊 Mostly neutral sentiment. Try more engaging content.</div>');
    }
    
    if (positive > negative && positive > neutral) {
        insights.push('<div class="insight-card positive">✨ Positive sentiment is leading - capitalize on this momentum!</div>');
    }
    
    if (insights.length === 0) {
        insights.push('<div class="insight-card neutral">📈 Balanced sentiment across your fanbase.</div>');
    }
    
    return insights.join('');
}

// Social Media Integration - FIXED
function updateSocialFeeds() {
    // Placeholder function for social media feeds
    console.log('Social feeds updated');
}

// Broadcast Message - FIXED
function broadcastMessage() {
    const message = prompt('Enter broadcast message for all fans:');
    if (message && message.trim()) {
        addFanMessage(`📢 OFFICIAL: ${message.trim()}`, 'positive');
        alert('Message broadcasted to all fans!');
    }
}

// Export Community Report - FIXED
function exportCommunityReport() {
    if (!window.appState?.community) {
        alert('No community data to export');
        return;
    }
    
    const report = generateCommunityReport();
    downloadFile(report.content, report.filename, report.type);
}

function generateCommunityReport() {
    const date = new Date().toISOString().split('T')[0];
    const data = window.appState.community;
    
    let content = `# Soccer in a Box - Community Report\n\n`;
    content += `## Community Overview\n`;
    content += `- **Date**: ${new Date().toLocaleString()}\n`;
    content += `- **Online Fans**: ${data.liveStats.onlineFans}\n`;
    content += `- **Total Engagement**: ${data.liveStats.totalEngagement}\n`;
    content += `- **Active Polls**: ${data.liveStats.activePolls}\n\n`;
    
    // Sentiment Analysis
    const total = data.sentimentData.positive + data.sentimentData.negative + data.sentimentData.neutral;
    if (total > 0) {
        content += `## Sentiment Analysis\n`;
        content += `- **Positive**: ${Math.round((data.sentimentData.positive / total) * 100)}% (${data.sentimentData.positive} messages)\n`;
        content += `- **Negative**: ${Math.round((data.sentimentData.negative / total) * 100)}% (${data.sentimentData.negative} messages)\n`;
        content += `- **Neutral**: ${Math.round((data.sentimentData.neutral / total) * 100)}% (${data.sentimentData.neutral} messages)\n\n`;
    }
    
    // Polls
    if (data.polls.length > 0) {
        content += `## Polls Summary\n`;
        data.polls.forEach(poll => {
            content += `### ${poll.question}\n`;
            content += `- **Status**: ${poll.active ? 'Active' : 'Closed'}\n`;
            content += `- **Total Votes**: ${poll.totalVotes}\n`;
            content += `- **Created**: ${poll.createdAt}\n`;
            poll.options.forEach(option => {
                const percentage = poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;
                content += `  - ${option.text}: ${option.votes} votes (${percentage}%)\n`;
            });
            content += '\n';
        });
    }
    
    // Recent Fan Messages
    if (data.fanMessages.length > 0) {
        content += `## Recent Fan Messages\n`;
        data.fanMessages.slice(0, 10).forEach(message => {
            content += `- **${message.fanName}** (${message.timestamp}): ${message.text} [${message.type}]\n`;
        });
        content += '\n';
    }
    
    content += `\n---\n*Generated by Soccer in a Box Community Module - ${new Date().toLocaleString()}*`;
    
    return {
        content: content,
        filename: `community-report-${date}.md`,
        type: 'text/markdown'
    };
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

// Auto-initialize demo data
function initializeCommunityDemo() {
    if (!window.appState?.community) return;
    
    console.log('Initializing community demo...');
    
    // Add sample messages if none exist
    if (window.appState.community.fanMessages.length === 0) {
        const sampleMessages = [
            { text: "Great match! Forza team! 💪", type: "positive" },
            { text: "The team played really well today", type: "positive" },
            { text: "When is the next match?", type: "neutral" },
            { text: "Amazing goal in the second half! ⚽", type: "positive" }
        ];
        
        sampleMessages.forEach((msg, index) => {
            setTimeout(() => addFanMessage(msg.text, msg.type), index * 500);
        });
    }
    
    // Create sample poll if none exist
    if (window.appState.community.polls.length === 0) {
        setTimeout(() => {
            window.appState.community.polls.push({
                id: Date.now(),
                question: "Who was the Man of the Match?",
                options: [
                    { text: "Player #10", votes: 45 },
                    { text: "Player #7", votes: 32 },
                    { text: "Player #4", votes: 23 }
                ],
                active: true,
                createdAt: new Date().toLocaleString(),
                totalVotes: 100
            });
            updatePollsList();
            updateEngagementStats();
        }, 2000);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Community module loading...');
    
    // Small delay to ensure main app is loaded
    setTimeout(() => {
        initializeCommunityDemo();
        updateEngagementStats();
    }, 1000);
});

// Export functions to global scope
window.community = {
    showCommunityTab: showCommunityTab,
    addFanMessage: addFanMessage,
    createPoll: createPoll,
    // initSharedAnalysisView might not need to be globally exposed if only called by showCommunityTab
    // but if any future HTML directly calls it, it would be needed here.
    // For now, keeping it internal to the module, callable by showCommunityTab.
};

// Keep existing direct window assignments if they are used by HTML onclick outside of window.community scope
// For example, if HTML has onclick="addPollOption()" instead of onclick="window.community.addPollOption()"
// However, the current structure suggests these are internal or on window.community
// The prompt uses onclick="showCommunityTab(...)" which implies window.showCommunityTab
// but also window.community.showCommunityTab later. Let's stick to window.community for consistency.

// Make sure all functions called by HTML are on window.community
window.community.addPollOption = addPollOption;
window.community.removePollOption = removePollOption;
window.community.votePoll = votePoll;
window.community.closePoll = closePoll;
window.community.deletePoll = deletePoll;
window.community.broadcastMessage = broadcastMessage;
window.community.exportCommunityReport = exportCommunityReport;
// Exposing initSharedAnalysisView in case it's useful, though showCommunityTab calls it.
window.community.initSharedAnalysisView = initSharedAnalysisView;


console.log('Community module loaded successfully');
