/* ============================================
   VASO DOWNLOADER - Backend Server
   Node.js + Express API Server
   ============================================ */

// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE
// ============================================

// Enable CORS - Allow requests from frontend
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}));

// Parse JSON request bodies
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, '.')));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
    next();
});

// ============================================
// ROUTES
// ============================================

/**
 * Health check endpoint
 * GET /health
 */
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Vaso Downloader API is running',
        timestamp: new Date().toISOString()
    });
});

/**
 * Main analyze endpoint
 * POST /analyze
 * 
 * Receives URL and returns available formats
 * Request body: { url: 'https://...' }
 */
app.post('/analyze', async (req, res) => {
    try {
        const { url } = req.body;

        // Validate request
        if (!url) {
            return res.status(400).json({
                success: false,
                message: 'URL is required'
            });
        }

        // Validate URL format
        if (!isValidURL(url)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid URL format'
            });
        }

        // Validate platform
        const platform = detectPlatform(url);
        if (!platform) {
            return res.status(400).json({
                success: false,
                message: 'Unsupported platform. Please use TikTok or Instagram links'
            });
        }

        console.log(`Analyzing URL from ${platform}: ${url}`);

        // Simulate API call to external downloader service
        // In production, you would integrate with actual download APIs
        const videoData = await analyzeVideo(url, platform);

        // Return response
        res.json({
            success: true,
            data: videoData
        });

    } catch (error) {
        console.error('Error in /analyze:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error processing URL'
        });
    }
});

/**
 * Download endpoint
 * POST /download
 * 
 * Handles actual download requests
 */
app.post('/download', async (req, res) => {
    try {
        const { format, url } = req.body;

        if (!format || !url) {
            return res.status(400).json({
                success: false,
                message: 'Format and URL are required'
            });
        }

        console.log(`Download requested: ${format}`);

        // In production, integrate with downloader library
        // This is where you would call yt-dlp, instagrapi, or similar

        res.json({
            success: true,
            message: `Download started for ${format}`,
            downloadUrl: null // Would contain actual download link
        });

    } catch (error) {
        console.error('Error in /download:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Download failed'
        });
    }
});

/**
 * Error handling for undefined routes
 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid URL
 */
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Detect platform from URL
 * @param {string} url - URL to check
 * @returns {string|null} - Platform name or null
 */
function detectPlatform(url) {
    const urlLower = url.toLowerCase();
    
    if (urlLower.includes('tiktok.com') || 
        urlLower.includes('vm.tiktok.com') || 
        urlLower.includes('vt.tiktok.com')) {
        return 'tiktok';
    }
    
    if (urlLower.includes('instagram.com') || 
        urlLower.includes('instagr.am')) {
        return 'instagram';
    }
    
    return null;
}

/**
 * Analyze video from URL
 * Returns mock data - In production, integrate with actual download APIs
 * @param {string} url - Video URL
 * @param {string} platform - Platform name
 * @returns {object} - Video data with formats
 */
async function analyzeVideo(url, platform) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock video data
    // In production, this would fetch real data from the video platform
    const mockData = {
        title: 'Amazing Video Content',
        description: 'This is a sample video description. The content would be analyzed from the actual video source.',
        duration: '2:45',
        thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320"%3E%3Crect fill="%23667eea" width="320" height="320"/%3E%3Ctext x="50%25" y="50%25" font-size="48" fill="white" text-anchor="middle" dy=".3em"%3EVaso%3C/text%3E%3C/svg%3E',
        platform: platform.charAt(0).toUpperCase() + platform.slice(1),
        date: new Date().toLocaleDateString(),
        formats: getFormatsByPlatform(platform)
    };

    return mockData;
}

/**
 * Get available formats based on platform
 * @param {string} platform - Platform name
 * @returns {array} - Array of format objects
 */
function getFormatsByPlatform(platform) {
    const commonFormats = [
        {
            type: 'mp4',
            name: 'MP4 HD Video',
            description: '1080p HD Quality',
            size: '45-120 MB',
            url: 'https://example.com/download/video.mp4'
        },
        {
            type: 'mp4',
            name: 'MP4 SD Video',
            description: '720p Standard Quality',
            size: '15-35 MB',
            url: 'https://example.com/download/video_sd.mp4'
        },
        {
            type: 'mp3',
            name: 'MP3 Audio Only',
            description: 'High Quality Audio',
            size: '3-8 MB',
            url: 'https://example.com/download/audio.mp3'
        },
        {
            type: 'no-watermark',
            name: 'No Watermark HD',
            description: 'Remove watermark from video',
            size: '50-130 MB',
            url: 'https://example.com/download/video_nowm.mp4'
        }
    ];

    // Customize formats based on platform if needed
    if (platform === 'tiktok') {
        // TikTok specific formats
        return commonFormats;
    } else if (platform === 'instagram') {
        // Instagram specific formats
        return commonFormats;
    }

    return commonFormats;
}

// ============================================
// ERROR HANDLING
// ============================================

/**
 * Global error handler
 */
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

// ============================================
// SERVER STARTUP
// ============================================

/**
 * Start the server
 */
app.listen(PORT, () => {
    console.log('');
    console.log('╔═══════════════════════════════════════╗');
    console.log('║     VASO DOWNLOADER API SERVER       ║');
    console.log('╚═══════════════════════════════════════╝');
    console.log('');
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📍 API Health: http://localhost:${PORT}/health`);
    console.log(`📝 Analyze Endpoint: POST http://localhost:${PORT}/analyze`);
    console.log('');
    console.log('📱 Supported Platforms:');
    console.log('   • TikTok');
    console.log('   • Instagram');
    console.log('');
    console.log('Press CTRL+C to stop the server');
    console.log('');
});

// ============================================
// EXPORT FOR TESTING
// ============================================

module.exports = app;
