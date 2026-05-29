# 🚀 Setup Guide - Vaso Downloader

A beginner-friendly step-by-step guide to set up and run Vaso Downloader.

## ✅ Prerequisites Checklist

Before starting, make sure you have:

- [ ] A computer with Windows, Mac, or Linux
- [ ] Internet connection
- [ ] A text editor (VS Code, Sublime, Notepad++, etc.)
- [ ] Node.js installed

## 📥 Step 1: Install Node.js

### For Windows:
1. Go to https://nodejs.org/
2. Click "LTS" (Long Term Support) version
3. Download the installer
4. Run the installer and follow the steps
5. Click "Next" for all default options
6. Check the box for "Add to PATH"

### For Mac:
1. Go to https://nodejs.org/
2. Download the Mac installer
3. Run the installer and follow steps

### For Linux:
```bash
sudo apt update
sudo apt install nodejs npm
```

### Verify Installation:
Open Command Prompt/Terminal and type:
```bash
node --version
npm --version
```

You should see version numbers. If not, restart your computer.

## 📂 Step 2: Download Project Files

### Option A: Using Git (Recommended)
```bash
cd Desktop
git clone https://github.com/muhammadsharipov2508-netizen/Downloading.music
cd Downloading.music
```

### Option B: Manual Download
1. Go to the repository on GitHub
2. Click the green "Code" button
3. Click "Download ZIP"
4. Extract the ZIP file to your Desktop
5. Open the folder

## 📦 Step 3: Install Dependencies

Open Command Prompt/Terminal in the project folder and type:

```bash
npm install
```

This will install all required packages (Express, CORS, etc.).

**Wait time**: 1-3 minutes depending on internet speed.

When done, you'll see "added X packages".

## ⚙️ Step 4: Configure Environment

1. Copy `.env.example` to create `.env`:
   - Windows: Copy the file manually and rename it to `.env`
   - Mac/Linux:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` file in your text editor

3. The default settings are fine for local development - no changes needed!

## 🚀 Step 5: Start the Server

### For Windows:
```bash
npm start
```

### For Mac/Linux:
```bash
npm start
```

Or with auto-reload:
```bash
npm run dev
```

You should see:
```
╔═══════════════════════════════════════╗
║     VASO DOWNLOADER API SERVER       ║
╚═══════════════════════════════════════╝

🚀 Server running at http://localhost:3000
```

## 🌐 Step 6: Open in Browser

1. Open your web browser (Chrome, Firefox, Safari, Edge)
2. Go to: `http://localhost:3000`
3. You should see the Vaso Downloader website!

## ✨ Step 7: Test the Application

1. Copy a TikTok or Instagram URL (from your phone or a friend's post)
2. Paste it in the input box
3. Click "Analyze"
4. You should see a sample video with download options

**Note**: In this demo version, download shows mock data. To use real downloads, integrate with actual APIs (see INTEGRATION_GUIDE.md).

## 🔧 Troubleshooting

### "Command not found: npm"
- **Solution**: Node.js not installed properly. Reinstall from nodejs.org

### "Port 3000 already in use"
- **Solution**: Another app is using port 3000
  - Windows: `netstat -ano | findstr :3000`
  - Mac/Linux: `lsof -i :3000`
  - Then kill the process or change PORT in .env to 3001

### "CORS Error" in browser console
- **Solution**: Make sure server is running and FRONTEND_URL in .env is correct

### Website won't load
- **Solution**: Check that all three files (index.html, style.css, script.js) are in the same directory

### "Cannot find module 'express'"
- **Solution**: Run `npm install` in the project folder

## 📝 File Overview

| File | Purpose |
|------|---------|
| `index.html` | Website structure - the skeleton |
| `style.css` | Website design - colors, layout, animations |
| `script.js` | Website interactivity - buttons, forms, API calls |
| `server.js` | Backend logic - processes requests |
| `package.json` | Project settings and dependencies |
| `.env` | Configuration variables (port, keys, etc.) |

## 🎨 Making Your First Change

### Change the website title:
1. Open `index.html`
2. Find line with `<title>`
3. Change it to your desired name
4. Refresh browser (Ctrl+R or Cmd+R)

### Change the logo:
1. Open `index.html`
2. Find `<h1>🎬 Vaso Downloader</h1>`
3. Change to `<h1>🎬 Your App Name</h1>`
4. Refresh browser

### Change the primary color:
1. Open `style.css`
2. Find `:root {`
3. Change `--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);`
4. Refresh browser

## 🔌 Integrating Real Download Functionality

By default, the app shows mock download options. To enable real downloads:

1. **Install a downloader library**:
   ```bash
   npm install yt-dlp
   ```

2. **Update `server.js`** to use the library (see README.md)

3. **Get API keys** (if needed) from platform documentation

4. **Update the analyzeVideo function** with real API calls

## 📚 Next Steps

1. **Customize colors and branding** in `style.css`
2. **Integrate real downloader APIs** in `server.js`
3. **Add database** to store user history
4. **Deploy to production** (Heroku, AWS, DigitalOcean)
5. **Add more platforms** (YouTube, etc.)

## 🎓 Learning Resources

- **JavaScript Basics**: https://www.youtube.com/results?search_query=javascript+basics
- **Node.js Tutorial**: https://www.youtube.com/results?search_query=nodejs+tutorial
- **Express.js**: https://expressjs.com/en/starter/basic-routing.html
- **CSS Design**: https://www.youtube.com/results?search_query=css+design+tutorial

## 💡 Tips for Development

1. **Use browser console** for debugging:
   - Right-click → Inspect → Console tab
   - Look for error messages there

2. **Check server logs**:
   - Error messages appear in terminal where you started the server

3. **Use VS Code**:
   - Free editor with many extensions
   - Built-in terminal for running commands

4. **Comment your code**:
   - Add `// This does X` before your changes
   - Helps you remember what code does

## 🆘 Getting Help

1. **Check the README.md** - Most answers are there
2. **Search error message on Google** - Usually finds solutions
3. **Ask in coding communities**:
   - Stack Overflow
   - Reddit r/learnprogramming
   - Discord coding servers

## 🎉 Congratulations!

You've successfully set up Vaso Downloader! Now you can:

✅ Run the web application  
✅ Understand how it works  
✅ Customize it for your needs  
✅ Integrate real download APIs  
✅ Deploy it online  

Happy coding! 🚀

---

**Remember**: Every expert programmer started as a beginner. Don't be afraid to experiment and break things - that's how you learn!
