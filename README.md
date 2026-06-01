# YouTube to MP3 Converter

A simple Flask web application that converts YouTube videos to MP3 audio files.

## Features

- 🎵 Convert YouTube videos to MP3 format
- 🚀 Fast and easy-to-use web interface
- 📱 Responsive design for mobile and desktop
- 💾 Download converted files directly
- ⚡ Built with Flask and yt-dlp

## Requirements

- Python 3.7 or higher
- FFmpeg (for audio conversion)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/muhammadsharipov2508-netizen/Downloading.music.git
cd Downloading.music
```

### 2. Create a virtual environment

```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Install FFmpeg

**Windows:**
```bash
choco install ffmpeg
```

**macOS:**
```bash
brew install ffmpeg
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install ffmpeg
```

### 5. Run the application

```bash
python app.py
```

The application will be available at `http://localhost:5000`

## Usage

1. Open your browser and navigate to `http://localhost:5000`
2. Paste a YouTube URL in the input field
3. Click "Download MP3"
4. Wait for the conversion to complete
5. Download the MP3 file

## Project Structure

```
.
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── .gitignore            # Git ignore rules
├── templates/
│   └── index.html        # Main HTML template
├── static/
│   └── style.css         # CSS styling
└── downloads/            # Downloaded MP3 files (created automatically)
```

## Configuration

Edit the configuration in `app.py`:

- `DOWNLOAD_FOLDER`: Directory where MP3s are saved (default: `downloads`)
- `MAX_FILE_SIZE`: Maximum file size in bytes (default: 500 MB)

## Security Notes

- This application includes path traversal protection
- URLs are validated before processing
- Downloaded files are stored in a protected directory

## Troubleshooting

### FFmpeg not found
Make sure FFmpeg is installed and added to your system PATH.

### Permission denied
Ensure the `downloads` directory has write permissions.

### YouTube URL not working
Some videos may have regional restrictions or copyright protections.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open a GitHub issue.
