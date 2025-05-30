/**
 * Soccer in a Box - Service Worker FSGC Professional
 * Advanced caching, background sync, and enterprise features
 */

const CACHE_NAME = 'soccerbox-fsgc-v2.0.0';
const DATA_CACHE_NAME = 'soccerbox-fsgc-data-v2.0.0';
const RUNTIME_CACHE_NAME = 'soccerbox-fsgc-runtime-v2.0.0';

// Core app files for offline functionality
const CORE_FILES = [
  './',
  './index.html',
  './manifest.json'
];

// External resources that might be needed
const EXTERNAL_RESOURCES = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

// API endpoints for data caching
const API_ENDPOINTS = [
  '/api/matches',
  '/api/players', 
  '/api/teams',
  '/api/reports',
  '/api/community',
  '/api/fsgc'
];

/**
 * Service Worker Installation
 */
self.addEventListener('