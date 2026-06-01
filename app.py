from flask import Flask, render_template, request, jsonify, send_file
import yt_dlp
import os
import threading
from pathlib import Path

app = Flask(__name__)

# Configuration
DOWNLOAD_FOLDER = 'downloads'
MAX_FILE_SIZE = 500 * 1024 * 1024  # 500 MB

if not os.path.exists(DOWNLOAD_FOLDER):
    os.makedirs(DOWNLOAD_FOLDER)

app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE


def download_audio(youtube_url, output_path):
    """
    Download audio from YouTube video and convert to MP3.
    """
    try:
        ydl_opts = {
            'format': 'bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
            'outtmpl': os.path.join(output_path, '%(title)s'),
            'quiet': False,
            'no_warnings': False,
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(youtube_url, download=True)
            return {
                'success': True,
                'title': info.get('title', 'Unknown'),
                'filename': f"{info.get('title', 'audio')}.mp3"
            }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }


@app.route('/')
def index():
    """Render the main page."""
    return render_template('index.html')


@app.route('/download', methods=['POST'])
def download():
    """
    Handle YouTube URL submission and download request.
    """
    try:
        data = request.get_json()
        youtube_url = data.get('url')
        
        if not youtube_url:
            return jsonify({'success': False, 'error': 'No URL provided'}), 400
        
        # Validate URL
        if 'youtube.com' not in youtube_url and 'youtu.be' not in youtube_url:
            return jsonify({'success': False, 'error': 'Invalid YouTube URL'}), 400
        
        # Download in background thread
        result = download_audio(youtube_url, DOWNLOAD_FOLDER)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/download-file/<filename>')
def download_file(filename):
    """
    Serve the downloaded MP3 file.
    """
    try:
        file_path = os.path.join(DOWNLOAD_FOLDER, filename)
        
        # Security check: prevent directory traversal
        if not os.path.abspath(file_path).startswith(os.path.abspath(DOWNLOAD_FOLDER)):
            return jsonify({'error': 'Invalid file path'}), 403
        
        if not os.path.exists(file_path):
            return jsonify({'error': 'File not found'}), 404
        
        return send_file(
            file_path,
            as_attachment=True,
            download_name=filename,
            mimetype='audio/mpeg'
        )
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
