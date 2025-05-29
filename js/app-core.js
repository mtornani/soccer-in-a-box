/**
 * Soccer in a Box - Core Application Logic
 * Manages global state, routing, and shared functionality
 */

// Global application state
window.SoccerBox = {
    // Current application mode
    currentMode: null,
    
    // User data and preferences
    userData: {
        role: null,
        preferences: {
            language: 'it',
            theme: 'light',
            notifications: true
        },
        teams: [],
        matches: [],
        profile: {
            name: '',
            favoriteTeam: '',
            joinDate: null
        }
    },
    
    // Shared data between modes
    sharedData: {
        currentMatch: null,
        liveEvents: [],
        communityMessages: [],
        polls: [],
        stats: {}
    }
};

/**
 * Data persistence layer
 */
class DataManager {
    static STORAGE_KEYS = {
        USER_DATA: 'soccerbox_userdata',
        SHARED_DATA: 'soccerbox_shareddata',
        SETTINGS: 'soccerbox_settings'
    };

    static saveUserData() {
        try {
            localStorage.setItem(
                this.STORAGE_KEYS.USER_DATA, 
                JSON.stringify(window.SoccerBox.userData)
            );
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    }

    static loadUserData() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEYS.USER_DATA);
            if (saved) {
                window.SoccerBox.userData = { 
                    ...window.SoccerBox.userData, 
                    ...JSON.parse(saved) 
                };
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    static saveSharedData() {
        try {
            localStorage.setItem(
                this.STORAGE_KEYS.SHARED_DATA, 
                JSON.stringify(window.SoccerBox.sharedData)
            );
        } catch (error) {
            console.error('Error saving shared data:', error);
        }
    }

    static loadSharedData() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEYS.SHARED_DATA);
            if (saved) {
                window.SoccerBox.sharedData = { 
                    ...window.SoccerBox.sharedData, 
                    ...JSON.parse(saved) 
                };
            }
        } catch (error) {
            console.error('Error loading shared data:', error);
        }
    }

    static clearAllData() {
        try {
            localStorage.removeItem(this.STORAGE_KEYS.USER_DATA);
            localStorage.removeItem(this.STORAGE_KEYS.SHARED_DATA);
            localStorage.removeItem(this.STORAGE_KEYS.SETTINGS);
            
            // Reset to defaults
            window.SoccerBox.userData = {
                role: null,
                preferences: { language: 'it', theme: 'light', notifications: true },
                teams: [],
                matches: [],
                profile: { name: '', favoriteTeam: '', joinDate: null }
            };
            
            window.SoccerBox.sharedData = {
                currentMatch: null,
                liveEvents: [],
                communityMessages: [],
                polls: [],
                stats: {}
            };
        } catch (error) {
            console.error('Error clearing data:', error);
        }
    }
}

/**
 * Event system for communication between components
 */
class EventBus {
    constructor() {
        this.events = {};
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }

    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
}

// Global event bus instance
window.SoccerBox.eventBus = new EventBus();

/**
 * Mode management and routing
 */
class ModeManager {
    static selectMode(mode) {
        const previousMode = window.SoccerBox.currentMode;
        window.SoccerBox.currentMode = mode;
        window.SoccerBox.userData.role = mode;
        
        // Save user preference
        DataManager.saveUserData();
        
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show selected mode screen
        const targetScreen = document.getElementById(`${mode}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
        
        // Initialize mode-specific functionality
        if (mode === 'coach') {
            window.SoccerBox.eventBus.emit('mode:coach:init');
        } else if (mode === 'community') {
            window.SoccerBox.eventBus.emit('mode:community:init');
        }
        
        // Track mode switch
        window.SoccerBox.eventBus.emit('mode:changed', {
            from: previousMode,
            to: mode
        });
    }

    static switchMode() {
        const currentMode = window.SoccerBox.currentMode;
        const newMode = currentMode === 'coach' ? 'community' : 'coach';
        this.selectMode(newMode);
    }

    static showWelcome() {
        window.SoccerBox.currentMode = null;
        
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        document.getElementById('welcome-screen').classList.add('active');
    }
}

/**
 * Utility functions
 */
class Utils {
    static formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    static formatDate(date) {
        return new Intl.DateTimeFormat('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(new Date(date));
    }

    static formatDateTime(date) {
        return new Intl.DateTimeFormat('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(date));
    }

    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static showNotification(message, type = 'info') {
        // Simple notification system
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#f44336' : type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

/**
 * Application initialization
 */
class AppInitializer {
    static init() {
        console.log('🚀 Initializing Soccer in a Box Ecosystem');
        
        // Load saved data
        DataManager.loadUserData();
        DataManager.loadSharedData();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Register service worker
        this.registerServiceWorker();
        
        // Check for returning user
        if (window.SoccerBox.userData.role) {
            ModeManager.selectMode(window.SoccerBox.userData.role);
        } else {
            ModeManager.showWelcome();
        }
        
        // Set up auto-save
        this.setupAutoSave();
        
        console.log('✅ App initialized successfully');
    }

    static setupEventListeners() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + M = Switch modes
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
                e.preventDefault();
                if (window.SoccerBox.currentMode) {
                    ModeManager.switchMode();
                }
            }
            
            // Escape = Go to welcome screen
            if (e.key === 'Escape' && window.SoccerBox.currentMode) {
                ModeManager.showWelcome();
            }
        });

        // Handle browser back button
        window.addEventListener('popstate', (event) => {
            if (window.SoccerBox.currentMode) {
                ModeManager.showWelcome();
            }
        });

        // Handle visibility change (app going to background/foreground)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                DataManager.saveUserData();
                DataManager.saveSharedData();
            }
        });

        // Handle page unload
        window.addEventListener('beforeunload', () => {
            DataManager.saveUserData();
            DataManager.saveSharedData();
        });
    }

    static registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('✅ Service Worker registered:', registration);
                })
                .catch(error => {
                    console.error('❌ Service Worker registration failed:', error);
                });
        }
    }

    static setupAutoSave() {
        // Auto-save every 30 seconds
        setInterval(() => {
            DataManager.saveUserData();
            DataManager.saveSharedData();
        }, 30000);
    }
}

// Make classes globally available
window.SoccerBox.DataManager = DataManager;
window.SoccerBox.ModeManager = ModeManager;
window.SoccerBox.Utils = Utils;
window.SoccerBox.AppInitializer = AppInitializer;

// Global functions for backward compatibility and ease of use
window.selectMode = ModeManager.selectMode.bind(ModeManager);
window.switchMode = ModeManager.switchMode.bind(ModeManager);
window.initApp = AppInitializer.init.bind(AppInitializer);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', AppInitializer.init);
} else {
    AppInitializer.init();
        }
