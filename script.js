/* ============================================
   VASO DOWNLOADER - Frontend JavaScript
   Modern UI Interactions & API Communication
   ============================================ */

// DOM Elements - Cached for better performance
const urlInput = document.getElementById('urlInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const btnLoader = document.getElementById('btnLoader');
const errorMessage = document.getElementById('errorMessage');
const resultsSection = document.getElementById('resultsSection');
const optionsGrid = document.getElementById('optionsGrid');
const downloadLoader = document.getElementById('downloadLoader');
const loaderText = document.getElementById('loaderText');

// API Configuration - Easy to modify
const API_BASE_URL = 'http://localhost:3000';
const ANALYZE_ENDPOINT = `${API_BASE_URL}/analyze`;

// ============================================
// EVENT LISTENERS
// ============================================

// Analyze button click event
analyzeBtn.addEventListener('click', handleAnalyze);

// Enter key support in input field
urlInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleAnalyze();
    }
});

// Clear error when user starts typing
urlInput.addEventListener('input', () => {
    if (errorMessage.style.display !== 'none') {
        errorMessage.style.display = 'none';
    }
});

// ============================================
// MAIN FUNCTIONS
// ============================================

/**
 * Handle the analyze button click
 * Validates input, calls API, and displays results
 */
async function handleAnalyze() {
    const url = urlInput.value.trim();

    // Validate input
    if (!url) {
        showError('Please paste a TikTok or Instagram link');
        return;
    }

    if (!isValidUrl(url)) {
        showError('Invalid URL format. Please paste a valid TikTok or Instagram link');
        return;
    }

    // Disable button and show loader
    analyzeBtn.disabled = true;
    showButtonLoader(true);
    hideError();

    try {
        // Call backend API
        const response = await fetch(ANALYZE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }),
        });

        // Handle API response
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to analyze URL');
        }

        const data = await response.json();

        // Display results
        displayResults(data.data);

    } catch (error) {
        // Show error message to user
        console.error('Error:', error);
        showError(error.message || 'Error processing URL. Please try again.');
    } finally {
        // Re-enable button and hide loader
        analyzeBtn.disabled = false;
        showButtonLoader(false);
    }
}

/**
 * Validate if URL is from TikTok or Instagram
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid
 */
function isValidUrl(url) {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();
        
        // Check if URL is from TikTok or Instagram
        const isTikTok = hostname.includes('tiktok.com') || hostname.includes('vm.tiktok.com') || hostname.includes('vt.tiktok.com');
        const isInstagram = hostname.includes('instagram.com') || hostname.includes('instagr.am');
        
        return isTikTok || isInstagram;
    } catch {
        return false;
    }
}

/**
 * Display results in the UI
 * @param {object} data - Data from API containing video info and download formats
 */
function displayResults(data) {
    // Update video information
    document.getElementById('thumbnail').src = data.thumbnail || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3C/svg%3E';
    document.getElementById('videoTitle').textContent = data.title || 'Video Title';
    document.getElementById('videoDescription').textContent = data.description || 'No description available';
    document.getElementById('duration').textContent = data.duration || '--:--';
    document.getElementById('videoPlatform').textContent = data.platform || 'Unknown';
    document.getElementById('videoDate').textContent = data.date || '--';

    // Clear previous options
    optionsGrid.innerHTML = '';

    // Create download option cards
    if (data.formats && data.formats.length > 0) {
        data.formats.forEach((format) => {
            const card = createDownloadCard(format);
            optionsGrid.appendChild(card);
        });
    } else {
        optionsGrid.innerHTML = '<p style="color: var(--text-secondary); grid-column: 1 / -1; text-align: center;">No download formats available</p>';
    }

    // Show results section with animation
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Create a download card element
 * @param {object} format - Format information object
 * @returns {HTMLElement} - Card element
 */
function createDownloadCard(format) {
    const card = document.createElement('div');
    card.className = 'download-card';
    
    // Format icon mapping
    const iconMap = {
        'mp4': '🎬',
        'hd': '📹',
        'audio': '🎵',
        'mp3': '🎵',
        'nowm': '✨',
        'no-watermark': '✨',
    };

    const icon = iconMap[format.type.toLowerCase()] || '📥';
    const size = format.size ? `(${format.size})` : '';

    card.innerHTML = `
        <div class="format-icon">${icon}</div>
        <div class="format-name">${format.name}</div>
        <div class="format-info">${format.description || 'Premium quality'}</div>
        ${format.size ? `<div class="format-size">${format.size}</div>` : ''}
        <button class="btn btn-secondary" onclick="handleDownload('${format.url}', '${format.name}')">
            Download
        </button>
    `;

    return card;
}

/**
 * Handle download button click
 * @param {string} url - Download URL
 * @param {string} formatName - Name of the format being downloaded
 */
function handleDownload(url, formatName) {
    // Show loading animation
    downloadLoader.style.display = 'flex';
    loaderText.textContent = `Preparing ${formatName}...`;

    // Simulate download after delay (in real app, backend would handle this)
    setTimeout(() => {
        // Trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = `video_${Date.now()}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Hide loader
        downloadLoader.style.display = 'none';
    }, 2000);
}

// ============================================
// UI HELPER FUNCTIONS
// ============================================

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

/**
 * Hide error message
 */
function hideError() {
    errorMessage.style.display = 'none';
}

/**
 * Show/hide button loader
 * @param {boolean} show - True to show, false to hide
 */
function showButtonLoader(show) {
    const btnText = analyzeBtn.querySelector('.btn-text');
    btnLoader.style.display = show ? 'inline-flex' : 'none';
    btnText.style.display = show ? 'none' : 'inline-flex';
}

// ============================================
// PAGE INITIALIZATION
// ============================================

/**
 * Initialize the page
 */
function initPage() {
    console.log('Vaso Downloader initialized');
    // Add any initial page setup here
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format duration from seconds to MM:SS format
 * @param {number} seconds - Duration in seconds
 * @returns {string} - Formatted duration
 */
function formatDuration(seconds) {
    if (!seconds) return '--:--';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format file size
 * @param {number} bytes - Size in bytes
 * @returns {string} - Formatted size
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

/**
 * Debounce function for performance
 * @param {function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {function} - Debounced function
 */
function debounce(func, wait) {
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
