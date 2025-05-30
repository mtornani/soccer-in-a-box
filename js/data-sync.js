/**
 * Soccer in a Box - Data Synchronization System
 * Manages data flow between coach and community modes
 */

class DataSync {
    constructor() {
        this.syncInterval = null;
        this.lastSyncTime = null;
        this.conflictResolver = new ConflictResolver();
        this.offlineQueue = [];
        
        this.init();
    }

    init() {
        console.log('🔄 Initializing Data Sync System');
        this.setupEventListeners();
        this.startAutoSync();
        this.processOfflineQueue();
    }

    setupEventListeners() {
        // Listen for data changes
        window.SoccerBox.eventBus.on('data:changed', (data) => {
            this.handleDataChange(data);
        });

        // Listen for online/offline events
        window.addEventListener('online', () => {
            console.log('📶 Connection restored');
            this.processOfflineQueue();
        });

        window.addEventListener('offline', () => {
            console.log('📵 Connection lost - switching to offline mode');
        });

        // Listen for visibility changes (app going background/foreground)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.syncData();
            }
        });
    }

    // Auto-sync every 30 seconds when online
    startAutoSync() {
        this.syncInterval = setInterval(() => {
            if (navigator.onLine) {
                this.syncData();
            }
        }, 30000);
    }

    stopAutoSync() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
        }
    }

    // Main sync function
    async syncData() {
        try {
            console.log('🔄 Starting data sync...');
            
            // Sync shared data between modes
            this.syncSharedData();
            
            // Sync with local storage
            this.syncLocalStorage();
            
            // If online, attempt cloud sync (future feature)
            if (navigator.onLine) {
                await this.attemptCloudSync();
            }
            
            this.lastSyncTime = new Date().toISOString();
            window.SoccerBox.eventBus.emit('data:sync:completed');
            
        } catch (error) {
            console.error('❌ Sync failed:', error);
            window.SoccerBox.eventBus.emit('data:sync:failed', error);
        }
    }

    // Sync data between coach and community modes
    syncSharedData() {
        const sharedData = window.SoccerBox.sharedData;
        
        // Ensure all modes have access to current match data
        if (sharedData.currentMatch) {
            this.propagateMatchData(sharedData.currentMatch);
        }
        
        // Sync live events
        this.syncLiveEvents();
        
        // Sync community messages
        this.syncCommunityMessages();
        
        // Save updated shared data
        window.SoccerBox.DataManager.saveSharedData();
    }

    // Propagate match data to community
    propagateMatchData(matchData) {
        // Ensure community mode has access to live match updates
        const communityData = this.getCommunityData();
        
        if (communityData) {
            communityData.currentMatch = matchData;
            this.saveCommunityData(communityData);
        }
        
        // Emit event for community mode to update
        window.SoccerBox.eventBus.emit('match:updated', matchData);
    }

    // Sync live events between modes
    syncLiveEvents() {
        const coachData = this.getCoachData();
        const communityData = this.getCommunityData();
        
        if (coachData && coachData.notes) {
            // Convert coach notes to live events for community
            const liveEvents = coachData.notes.map(note => ({
                id: note.id,
                type: 'match_event',
                content: note.text,
                timestamp: note.created || new Date().toISOString(),
                source: 'coach',
                matchTime: note.time
            }));
            
            window.SoccerBox.sharedData.liveEvents = liveEvents;
        }
    }

    // Sync community messages to coach dashboard
    syncCommunityMessages() {
        const communityData = this.getCommunityData();
        
        if (communityData) {
            // Get support messages for coach
            const supportMessages = communityData.supportMessages || [];
            const emotions = communityData.emotions || [];
            
            // Aggregate community sentiment
            const sentiment = this.calculateCommunitySentiment(emotions, supportMessages);
            
            window.SoccerBox.sharedData.communitySentiment = sentiment;
            window.SoccerBox.sharedData.communityMessages = supportMessages;
            
            // Notify coach mode of community updates
            window.SoccerBox.eventBus.emit('community:updated', {
                sentiment,
                messageCount: supportMessages.length,
                emotionCount: emotions.length
            });
        }
    }

    // Calculate community sentiment for coach insights
    calculateCommunitySentiment(emotions, messages) {
        const positiveEmotions = ['😍', '🔥', '⚡', '💪', '🎯', '👏', '❤️', '🚀', '⭐', '🎉'];
        const neutralEmotions = ['🤔', '😐', '🫤'];
        const negativeEmotions = ['😞', '😭', '😡', '🤬'];
        
        let positive = 0;
        let neutral = 0;
        let negative = 0;
        
        emotions.forEach(emotion => {
            if (positiveEmotions.includes(emotion.emotion)) positive++;
            else if (neutralEmotions.includes(emotion.emotion)) neutral++;
            else if (negativeEmotions.includes(emotion.emotion)) negative++;
        });
        
        const total = positive + neutral + negative;
        
        return {
            positive: total ? Math.round((positive / total) * 100) : 0,
            neutral: total ? Math.round((neutral / total) * 100) : 0,
            negative: total ? Math.round((negative / total) * 100) : 0,
            totalEmotions: total,
            totalMessages: messages.length,
            trend: this.calculateTrend(emotions)
        };
    }

    calculateTrend(emotions) {
        if (emotions.length < 2) return 'stable';
        
        const recent = emotions.slice(-5);
        const older = emotions.slice(-10, -5);
        
        const recentPositive = recent.filter(e => ['😍', '🔥', '⚡', '💪'].includes(e.emotion)).length;
        const olderPositive = older.filter(e => ['😍', '🔥', '⚡', '💪'].includes(e.emotion)).length;
        
        if (recentPositive > olderPositive) return 'rising';
        if (recentPositive < olderPositive) return 'falling';
        return 'stable';
    }

    // Handle data changes from either mode
    handleDataChange(data) {
        const { source, type, payload } = data;
        
        switch (type) {
            case 'match_note':
                this.handleMatchNoteChange(payload);
                break;
            case 'player_evaluation':
                this.handlePlayerEvaluationChange(payload);
                break;
            case 'community_emotion':
                this.handleCommunityEmotionChange(payload);
                break;
            case 'support_message':
                this.handleSupportMessageChange(payload);
                break;
            default:
                console.log('🔄 Unknown data change type:', type);
        }
    }

    handleMatchNoteChange(noteData) {
        // Add to shared live events
        const liveEvent = {
            id: noteData.id,
            type: 'match_event',
            content: noteData.text,
            timestamp: noteData.created,
            source: 'coach',
            matchTime: noteData.time
        };
        
        window.SoccerBox.sharedData.liveEvents.unshift(liveEvent);
        
        // Notify community mode
        window.SoccerBox.eventBus.emit('live:event:added', liveEvent);
    }

    handlePlayerEvaluationChange(playerData) {
        // Store player evaluations in shared data
        if (!window.SoccerBox.sharedData.playerEvaluations) {
            window.SoccerBox.sharedData.playerEvaluations = [];
        }
        
        window.SoccerBox.sharedData.playerEvaluations.push(playerData);
        
        // Notify community of new player evaluation
        window.SoccerBox.eventBus.emit('player:evaluated', playerData);
    }

    handleCommunityEmotionChange(emotionData) {
        // Add to community messages for coach
        if (!window.SoccerBox.sharedData.communityMessages) {
            window.SoccerBox.sharedData.communityMessages = [];
        }
        
        window.SoccerBox.sharedData.communityMessages.unshift({
            type: 'emotion',
            content: emotionData.emotion,
            user: emotionData.user,
            timestamp: emotionData.timestamp
        });
        
        // Notify coach mode
        window.SoccerBox.eventBus.emit('community:emotion:added', emotionData);
    }

    handleSupportMessageChange(messageData) {
        // Add to shared data for coach
        if (!window.SoccerBox.sharedData.communityMessages) {
            window.SoccerBox.sharedData.communityMessages = [];
        }
        
        window.SoccerBox.sharedData.communityMessages.unshift({
            type: 'support',
            content: messageData.message,
            user: messageData.user,
            timestamp: messageData.timestamp
        });
        
        // Notify coach mode
        window.SoccerBox.eventBus.emit('community:support:added', messageData);
    }

    // Local storage sync
    syncLocalStorage() {
        try {
            // Ensure all data is saved to localStorage
            window.SoccerBox.DataManager.saveUserData();
            window.SoccerBox.DataManager.saveSharedData();
            
            // Cross-check data integrity
            this.validateDataIntegrity();
            
        } catch (error) {
            console.error('❌ Local storage sync failed:', error);
        }
    }

    validateDataIntegrity() {
        // Check if critical data structures exist
        const userData = window.SoccerBox.userData;
        const sharedData = window.SoccerBox.sharedData;
        
        if (!userData || !sharedData) {
            console.warn('⚠️ Missing critical data structures, reinitializing...');
            this.reinitializeData();
        }
        
        // Validate data types
        if (typeof userData !== 'object' || typeof sharedData !== 'object') {
            console.warn('⚠️ Invalid data types detected, fixing...');
            this.fixDataTypes();
        }
    }

    reinitializeData() {
        if (!window.SoccerBox.userData) {
            window.SoccerBox.userData = {
                role: null,
                preferences: { language: 'it', theme: 'light', notifications: true },
                teams: [],
                matches: [],
                profile: { name: '', favoriteTeam: '', joinDate: null }
            };
        }
        
        if (!window.SoccerBox.sharedData) {
            window.SoccerBox.sharedData = {
                currentMatch: null,
                liveEvents: [],
                communityMessages: [],
                polls: [],
                stats: {}
            };
        }
    }

    fixDataTypes() {
        // Ensure arrays are arrays
        if (!Array.isArray(window.SoccerBox.sharedData.liveEvents)) {
            window.SoccerBox.sharedData.liveEvents = [];
        }
        
        if (!Array.isArray(window.SoccerBox.sharedData.communityMessages)) {
            window.SoccerBox.sharedData.communityMessages = [];
        }
        
        if (!Array.isArray(window.SoccerBox.userData.teams)) {
            window.SoccerBox.userData.teams = [];
        }
        
        if (!Array.isArray(window.SoccerBox.userData.matches)) {
            window.SoccerBox.userData.matches = [];
        }
    }

    // Cloud sync (future feature)
    async attemptCloudSync() {
        // This is a placeholder for future cloud sync functionality
        // For now, just simulate the process
        
        if (this.offlineQueue.length > 0) {
            console.log('📤 Processing offline queue...');
            await this.processOfflineQueue();
        }
        
        // In the future, this would sync with a backend service
        // await this.syncWithServer();
    }

    // Offline queue management
    addToOfflineQueue(action) {
        this.offlineQueue.push({
            id: window.SoccerBox.Utils.generateId(),
            action,
            timestamp: new Date().toISOString(),
            retryCount: 0
        });
        
        // Persist queue to localStorage
        localStorage.setItem('soccerbox_offline_queue', JSON.stringify(this.offlineQueue));
    }

    async processOfflineQueue() {
        if (this.offlineQueue.length === 0) return;
        
        console.log(`📤 Processing ${this.offlineQueue.length} offline actions...`);
        
        const processedActions = [];
        
        for (const queueItem of this.offlineQueue) {
            try {
                await this.processOfflineAction(queueItem);
                processedActions.push(queueItem.id);
            } catch (error) {
                console.error('❌ Failed to process offline action:', error);
                queueItem.retryCount++;
                
                // Remove after 3 failed attempts
                if (queueItem.retryCount >= 3) {
                    processedActions.push(queueItem.id);
                }
            }
        }
        
        // Remove processed actions from queue
        this.offlineQueue = this.offlineQueue.filter(item => 
            !processedActions.includes(item.id)
        );
        
        // Update stored queue
        localStorage.setItem('soccerbox_offline_queue', JSON.stringify(this.offlineQueue));
    }

    async processOfflineAction(queueItem) {
        const { action } = queueItem;
        
        switch (action.type) {
            case 'save_match_data':
                await this.syncMatchData(action.data);
                break;
            case 'save_community_data':
                await this.syncCommunityData(action.data);
                break;
            default:
                console.log('🔄 Unknown offline action type:', action.type);
        }
    }

    // Helper methods for getting mode-specific data
    getCoachData() {
        const saved = localStorage.getItem('coach_current_match');
        return saved ? JSON.parse(saved) : null;
    }

    getCommunityData() {
        const saved = localStorage.getItem('community_data');
        return saved ? JSON.parse(saved) : null;
    }

    saveCommunityData(data) {
        localStorage.setItem('community_data', JSON.stringify(data));
    }

    // Export/Import functionality
    exportAllData() {
        const allData = {
            userData: window.SoccerBox.userData,
            sharedData: window.SoccerBox.sharedData,
            coachData: this.getCoachData(),
            communityData: this.getCommunityData(),
            exportDate: new Date().toISOString(),
            version: '1.0.0'
        };
        
        return JSON.stringify(allData, null, 2);
    }

    importAllData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (data.userData) {
                window.SoccerBox.userData = data.userData;
                window.SoccerBox.DataManager.saveUserData();
            }
            
            if (data.sharedData) {
                window.SoccerBox.sharedData = data.sharedData;
                window.SoccerBox.DataManager.saveSharedData();
            }
            
            if (data.coachData) {
                localStorage.setItem('coach_current_match', JSON.stringify(data.coachData));
            }
            
            if (data.communityData) {
                this.saveCommunityData(data.communityData);
            }
            
            window.SoccerBox.Utils.showNotification('Dati importati con successo!', 'success');
            
            // Emit event to refresh all interfaces
            window.SoccerBox.eventBus.emit('data:imported');
            
        } catch (error) {
            console.error('❌ Import failed:', error);
            window.SoccerBox.Utils.showNotification('Errore durante l\'importazione', 'error');
        }
    }

    // Cleanup and destroy
    destroy() {
        this.stopAutoSync();
        
        // Remove event listeners
        window.removeEventListener('online', this.processOfflineQueue);
        window.removeEventListener('offline', () => {});
        document.removeEventListener('visibilitychange', this.syncData);
        
        console.log('🔄 Data sync system destroyed');
    }
}

// Conflict resolution system
class ConflictResolver {
    resolve(localData, remoteData) {
        // Simple last-write-wins for now
        // In the future, implement more sophisticated conflict resolution
        
        const localTime = new Date(localData.lastModified || 0);
        const remoteTime = new Date(remoteData.lastModified || 0);
        
        return remoteTime > localTime ? remoteData : localData;
    }
    
    mergeArrays(localArray, remoteArray, keyField = 'id') {
        const merged = [...localArray];
        const localIds = new Set(localArray.map(item => item[keyField]));
        
        remoteArray.forEach(item => {
            if (!localIds.has(item[keyField])) {
                merged.push(item);
            }
        });
        
        return merged.sort((a, b) => 
            new Date(b.timestamp || b.created || 0) - new Date(a.timestamp || a.created || 0)
        );
    }
}

// Initialize data sync when the module loads
window.SoccerBox.DataSync = DataSync;

// Auto-initialize if SoccerBox is available
if (window.SoccerBox && window.SoccerBox.eventBus) {
    window.SoccerBox.dataSync = new DataSync();
  }
