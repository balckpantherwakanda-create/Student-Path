"""
Students Path Finder - Universal Python Server Runner
If Flask is installed, it runs app.py.
If Flask is NOT installed, it runs an identical REST API server using Python's
built-in standard library http.server and sqlite3 (zero external dependencies required!).
"""

import sys
import os

try:
    import flask
    import flask_cors
    print("[Server] Found Flask & Flask-CORS. Starting Flask backend on http://127.0.0.1:5000...")
    from app import app, init_db
    init_db()
    app.run(host='127.0.0.1', port=5000, debug=False)
except ImportError:
    print("[Server] Flask not detected. Running built-in Python standard library HTTP REST Server...")
    from http.server import HTTPServer, BaseHTTPRequestHandler
    import json
    import sqlite3
    import time
    from database import init_db, get_connection

    init_db()

    class StandaloneApiHandler(BaseHTTPRequestHandler):
        def _send_cors_headers(self):
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')

        def do_OPTIONS(self):
            self.send_response(200)
            self._send_cors_headers()
            self.end_headers()

        def do_GET(self):
            self._send_cors_headers()
            if self.path.startswith('/api/health'):
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "healthy", "engine": "Python Standard Library"}).encode())
            elif self.path.startswith('/api/colleges'):
                conn = sqlite3.connect(os.path.join(os.path.dirname(__file__), 'pathfinder.db'))
                conn.row_factory = sqlite3.Row
                cursor = conn.cursor()
                cursor.execute('SELECT * FROM colleges')
                rows = cursor.fetchall()
                colleges = []
                for r in rows:
                    colleges.append({
                        "id": r["id"],
                        "name": r["name"],
                        "code": r["code"],
                        "branch": r["branch"],
                        "city": r["city"],
                        "rating": r["rating"],
                        "image": r["image"],
                        "feeStructure": {
                            "tuitionFee": r["tuition_fee"],
                            "totalDayScholar": r["total_day_scholar"],
                            "hostelFeeAC": r["hostel_fee_ac"],
                            "hostelFeeNonAC": r["hostel_fee_non_ac"],
                            "busFeeAvg": r["bus_fee_avg"]
                        }
                    })
                conn.close()
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"success": True, "colleges": colleges}).encode())
            else:
                self.send_response(404)
                self.end_headers()

        def do_PUT(self):
            self._send_cors_headers()
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length).decode()
            data = json.loads(body) if body else {}

            if '/api/colleges/' in self.path and '/fees' in self.path:
                college_id = self.path.split('/')[3]
                tuition = int(data.get('tuitionFee', 0))
                admission = int(data.get('admissionFee', 0))
                coaching = int(data.get('coachingFee', 0))
                lab = int(data.get('labExamFee', 0))
                books = int(data.get('booksUniformFee', 0))
                total = tuition + admission + coaching + lab + books

                conn = sqlite3.connect(os.path.join(os.path.dirname(__file__), 'pathfinder.db'))
                cursor = conn.cursor()
                cursor.execute('''
                UPDATE colleges SET
                    tuition_fee = ?,
                    total_day_scholar = ?
                WHERE id = ?
                ''', (tuition, total, college_id))
                conn.commit()
                conn.close()

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"success": True, "newTotalDayScholar": total}).encode())

        def do_POST(self):
            self._send_cors_headers()
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length).decode()
            data = json.loads(body) if body else {}

            if self.path.startswith('/api/inquiries'):
                conn = sqlite3.connect(os.path.join(os.path.dirname(__file__), 'pathfinder.db'))
                cursor = conn.cursor()
                cursor.execute('''
                INSERT INTO inquiries (id, college_id, student_name, phone, tenth_gpa, status)
                VALUES (?, ?, ?, ?, ?, 'New Lead')
                ''', (data.get('id', 'inq-1'), data.get('collegeId', ''), data.get('studentName', ''), data.get('phone', ''), data.get('tenthGPA', '')))
                conn.commit()
                conn.close()

                self.send_response(201)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"success": True}).encode())

    server = HTTPServer(('127.0.0.1', 5000), StandaloneApiHandler)
    print("==================================================================")
    print("  Students Path Finder - Python Server (Native Mode)")
    print("  Serving on: http://127.0.0.1:5000")
    print("==================================================================")
    server.serve_forever()
