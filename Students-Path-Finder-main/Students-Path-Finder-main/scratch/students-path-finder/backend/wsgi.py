"""
WSGI Entrypoint for Production Web Servers (Gunicorn, Waitress, uWSGI)
Usage:
  gunicorn backend.wsgi:app
  waitress-serve --listen=*:5000 backend.wsgi:app
"""
import sys
import os

# Add backend directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import app, init_db

# Initialize database tables on server start
init_db()

if __name__ == '__main__':
    app.run()
