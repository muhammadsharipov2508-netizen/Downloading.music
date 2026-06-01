# YouTube to MP3 Downloader

A simple Flask web application that converts YouTube videos to MP3 audio files.

## Features

- Clean, user-friendly interface
- Downloads audio from YouTube videos
- Converts to MP3 format automatically
- Self-contained application (no separate templates folder needed)

## Requirements

- Python 3.7+
- Flask
- yt-dlp
- FFmpeg (required by yt-dlp for audio conversion)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/muhammadsharipov2508-netizen/Downloading.music.git
cd Downloading.music
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Install FFmpeg:
   - **Ubuntu/Debian**: `sudo apt-get install ffmpeg`
   - **macOS**: `brew install ffmpeg`
   - **Windows**: Download from [ffmpeg.org](https://ffmpeg.org/download.html) or use `choco install ffmpeg`

## Usage

1. Run the application:
```bash
python app.py
```

2. Open your browser and navigate to `http://localhost:5000`

3. Paste a YouTube URL and click "Download MP3"

4. The MP3 file will be downloaded to your downloads folder

## Project Structure

```
Downloading.music/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## License

MIT License - feel free to use this project for personal or commercial purposes.
