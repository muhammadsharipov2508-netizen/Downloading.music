# 🎬 Vaso Downloader

A modern, full-stack web application for downloading TikTok and Instagram videos with multiple format options, built with HTML, CSS, JavaScript, Node.js, and Express.

## ✨ Features

- **Multi-Platform Support**: Download from TikTok and Instagram
- **Multiple Formats**:
  - MP4 HD Video (1080p)
  - MP4 SD Video (720p)
  - MP3 Audio Only
  - No Watermark Version
- **Modern Dark UI**: Beautiful gradient design with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Processing**: Instant video analysis
- **Loading Animations**: Beautiful loaders while processing
- **Error Handling**: Comprehensive error messages and validation
- **Professional Code**: Well-commented, easy to understand and modify

## 🎯 Project Structure

```
Downloading.music/
├── index.html          # Frontend HTML structure
├── style.css           # Modern CSS styling
├── script.js           # Frontend JavaScript
├── server.js           # Express backend server
├── package.json        # Node.js dependencies
├── .env.example        # Environment configuration template
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   cd Downloading.music
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📝 Usage

1. **Paste a Link**: Copy a TikTok or Instagram video link
2. **Analyze**: Click the "Analyze" button
3. **Choose Format**: Select your preferred download format
4. **Download**: Click the download button for your chosen format
5. **Save**: The video will be downloaded to your device

### Supported Link Formats

**TikTok:**
- `https://www.tiktok.com/@username/video/123456789`
- `https://vm.tiktok.com/ZM123abc`
- `https://vt.tiktok.com/ZM123abc`

**Instagram:**
- `https://www.instagram.com/p/ABC123DEF/`
- `https://www.instagram.com/reel/ABC123DEF/`
- `https://www.instagram.com/tv/ABC123DEF/`

## 🔧 API Documentation

### Analyze Endpoint

**POST** `/analyze`

Analyzes a video URL and returns available formats.

**Request:**
```json
{
  "url": "https://www.tiktok.com/@username/video/123456789"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "Amazing Video",
    "description": "Video description",
    "duration": "2:45",
    "thumbnail": "image_url",
    "platform": "TikTok",
    "date": "12/29/2024",
    "formats": [
      {
        "type": "mp4",
        "name": "MP4 HD Video",
        "description": "1080p HD Quality",
        "size": "45-120 MB",
        "url": "download_url"
      }
    ]
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## 🎨 Customization

### Change Colors

Edit the CSS variables in `style.css`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --dark-bg: #0f0f1e;
    --accent-color: #667eea;
    /* ... more variables */
}
```

### Change Logo Text

Edit in `index.html`:
```html
<h1>🎬 Your App Name</h1>
```

### Change Font

Update the `font-family` in `style.css`:
```css
body {
    font-family: 'Your Font', Tahoma, Geneva, Verdana, sans-serif;
}
```

## 🔌 Backend Integration

### To integrate with real downloader APIs:

1. **Update `server.js`** - Replace mock data with actual API calls:

```javascript
// Example: Using yt-dlp for downloads
const ytdl = require('youtube-dl-exec');

async function analyzeVideo(url, platform) {
    const info = await ytdl(url, {
        dumpJson: true,
        noWarnings: true,
    });
    
    return {
        title: info.title,
        duration: formatDuration(info.duration),
        formats: info.formats.map(f => ({
            type: f.ext,
            name: f.format,
            url: f.url
        }))
    };
}
```

2. **Popular Libraries**:
   - **TikTok**: `TikTokApi`, `instagrapi`, `yt-dlp`
   - **Instagram**: `instagrapi`, `instagram-api`
   - **General**: `yt-dlp` (supports both platforms)

3. **Install libraries**:
   ```bash
   npm install yt-dlp
   ```

## 📱 Mobile Responsiveness

The application is fully responsive with breakpoints for:
- Desktop: Full-width layout
- Tablet (768px): Adjusted grid and padding
- Mobile (480px): Single column layout, touch-friendly buttons

## 🛡️ Security Considerations

1. **URL Validation**: All URLs are validated before processing
2. **CORS Protection**: Configure CORS in `.env`
3. **Rate Limiting**: Consider adding rate limiting for production
4. **Data Privacy**: URLs are not stored or logged
5. **File Handling**: Implement proper temp file cleanup

## 🚀 Deployment

### Deploy to Heroku

1. Create `Procfile`:
   ```
   web: node server.js
   ```

2. Deploy:
   ```bash
   heroku create your-app-name
   heroku config:set FRONTEND_URL=https://your-app-name.herokuapp.com
   git push heroku main
   ```

### Deploy to AWS/DigitalOcean

1. Set up Node.js on your server
2. Copy files to server
3. Install dependencies: `npm install`
4. Use PM2 for process management: `npm install -g pm2`
5. Start: `pm2 start server.js`

## 📊 Performance Tips

1. **Cache API responses** for frequently requested videos
2. **Implement video compression** for downloads
3. **Use CDN** for static files
4. **Add database** to store user history
5. **Implement pagination** for large format lists

## 🐛 Troubleshooting

### "Cannot GET /"
- Make sure Node server is running on port 3000
- Check that `index.html`, `style.css`, `script.js` are in the same directory

### "CORS Error"
- Check `FRONTEND_URL` in `.env`
- Make sure cors middleware is properly configured

### "API returns 404"
- Verify Express routes are defined correctly
- Check endpoint paths match frontend fetch calls

### Videos not downloading
- Implement actual downloader library integration
- Check API key configurations in `.env`

## 📚 Resources

- [Express.js Documentation](https://expressjs.com)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/nodejs-web-app-architecture/)
- [yt-dlp Documentation](https://github.com/yt-dlp/yt-dlp)
- [MDN Web Docs](https://developer.mozilla.org)

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

Created with ❤️ for content enthusiasts.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check GitHub issues
4. Create a new issue with details

---

**Note**: This is a learning project. For production use, implement proper error handling, security measures, and integrate with official APIs or reliable third-party services.

**Last Updated**: December 2024
