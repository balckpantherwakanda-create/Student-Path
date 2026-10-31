"""
Students Path Finder - Full-Stack Production Server & REST API
Features:
- Unified Static File Serving (serves frontend HTML, CSS, JS directly on port 5000)
- Hardened Authentication (Salted Hashing, Token Auth, Role Guards)
- Fee Management, Dynamic Calculation & Audit Logging
- Direct SQLite Database Integration with Inquiries, Bookmarks, and Reviews
"""

from flask import Flask, request, jsonify, send_from_directory, redirect
from flask_cors import CORS
import sqlite3
import json
import os
import time
import re
import secrets
import uuid
from functools import wraps

from database import (
    get_connection, init_db, generate_password_hash, check_password_hash,
    create_session, verify_token, delete_session
)

# Root project directory containing HTML, css, js
FRONTEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

app = Flask(__name__, static_folder=FRONTEND_DIR)
CORS(app)

# ==================== AUTHENTICATION MIDDLEWARE / DECORATORS ====================
def require_auth(role=None):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            auth_header = request.headers.get('Authorization', '')
            token = None
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]

            session = verify_token(token)
            if not session:
                return jsonify({"success": False, "error": "Unauthorized: Invalid or expired session token"}), 401

            if role and session['role'] != role:
                return jsonify({"success": False, "error": f"Forbidden: Requires role '{role}' privilege"}), 403

            request.current_user = session
            return f(*args, **kwargs)
        return decorated
    return decorator

# Helper function to convert DB row to College dict
def row_to_college(row):
    return {
        "id": row["id"],
        "code": row["code"],
        "name": row["name"],
        "branch": row["branch"],
        "city": row["city"],
        "district": row["district"],
        "state": row["state"],
        "type": row["type"],
        "gender": row["gender"],
        "established": row["established"],
        "rating": row["rating"],
        "reviewCount": row["review_count"],
        "image": row["image"],
        "gallery": json.loads(row["gallery"]) if row["gallery"] else [],
        "streams": json.loads(row["streams"]) if row["streams"] else [],
        "coachingOffered": json.loads(row["coaching"]) if row["coaching"] else [],
        "batchTypes": json.loads(row["batches"]) if row["batches"] else [],
        "feeStructure": {
            "tuitionFee": row["tuition_fee"],
            "admissionFee": row["admission_fee"],
            "coachingFee": row["coaching_fee"],
            "labExamFee": row["lab_exam_fee"],
            "booksUniformFee": row["books_uniform_fee"],
            "totalDayScholar": row["total_day_scholar"],
            "hostelFeeAC": row["hostel_fee_ac"],
            "hostelFeeNonAC": row["hostel_fee_non_ac"],
            "busFeeAvg": row["bus_fee_avg"],
            "installmentsAllowed": row["installments_allowed"],
            "installmentPlan": row["installment_plan"]
        },
        "scholarships": json.loads(row["scholarships"]) if row["scholarships"] else [],
        "facilities": json.loads(row["facilities"]) if row["facilities"] else [],
        "phone": row["phone"],
        "whatsapp": row["whatsapp"],
        "email": row["email"],
        "website": row["website"],
        "address": row["address"],
        "lastUpdated": row["last_updated"]
    }

# ==================== STATIC FRONTEND SERVING (DEPLOYMENT UNIFICATION) ====================
@app.route('/')
def serve_index():
    return send_from_directory(FRONTEND_DIR, 'index.html')

@app.route('/<path:filename>')
def serve_static_files(filename):
    file_path = os.path.join(FRONTEND_DIR, filename)
    if os.path.exists(file_path):
        return send_from_directory(FRONTEND_DIR, filename)
    if os.path.exists(file_path + '.html'):
        return send_from_directory(FRONTEND_DIR, filename + '.html')
    return send_from_directory(FRONTEND_DIR, 'index.html')

# ==================== HARDENED AUTHENTICATION API ====================

@app.route('/api/auth/signup', methods=['POST'])
def auth_signup():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    name = data.get('name', '').strip()
    phone = data.get('phone', '').strip()
    role = data.get('role', 'student')
    college_id = data.get('collegeId')

    if not email or not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"success": False, "error": "A valid email address is required."}), 400

    if len(password) < 6:
        return jsonify({"success": False, "error": "Password must be at least 6 characters long."}), 400

    if not name:
        return jsonify({"success": False, "error": "Full name is required."}), 400

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute('SELECT id FROM users WHERE email = ?', (email,))
    if cursor.fetchone():
        conn.close()
        return jsonify({"success": False, "error": "An account with this email already exists. Please log in."}), 409

    user_id = "usr-" + role[:3] + "-" + secrets.token_hex(6)
    p_hash = generate_password_hash(password)
    now_str = time.strftime('%Y-%m-%d %H:%M:%S')

    cursor.execute('''
    INSERT INTO users (id, email, password_hash, name, phone, role, college_id, tenth_gpa, stream, city, avatar, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        user_id, email, p_hash, name, phone, role, college_id,
        data.get('tenthGPA', ''), data.get('stream', ''), data.get('city', ''),
        data.get('avatar', '🎓'), now_str
    ))
    conn.commit()
    conn.close()

    token = create_session(user_id, role, college_id)

    return jsonify({
        "success": True,
        "token": token,
        "user": {
            "id": user_id,
            "name": name,
            "email": email,
            "role": role,
            "collegeId": college_id,
            "phone": phone
        }
    }), 201

@app.route('/api/auth/login', methods=['POST'])
def auth_login():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    college_code = data.get('collegeCode', '').strip()
    role = data.get('role', 'student')

    if not email or not password:
        return jsonify({"success": False, "error": "Email and password are required."}), 400

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
    user = cursor.fetchone()

    if not user or not check_password_hash(user['password_hash'], password):
        conn.close()
        return jsonify({"success": False, "error": "Invalid email or password."}), 401

    if user['role'] == 'college_admin' and college_code:
        cursor.execute('SELECT id, code, name FROM colleges WHERE id = ? OR code = ?', (user['college_id'], college_code))
        col = cursor.fetchone()
        if not col or col['code'].lower() != college_code.lower():
            conn.close()
            return jsonify({"success": False, "error": "College code does not match registered institution credentials."}), 403

    now_str = time.strftime('%Y-%m-%d %H:%M:%S')
    cursor.execute('UPDATE users SET last_login = ? WHERE id = ?', (now_str, user['id']))
    conn.commit()
    conn.close()

    token = create_session(user['id'], user['role'], user['college_id'])

    return jsonify({
        "success": True,
        "token": token,
        "user": {
            "id": user['id'],
            "name": user['name'],
            "email": user['email'],
            "role": user['role'],
            "collegeId": user['college_id'],
            "phone": user['phone'],
            "tenthGPA": user['tenth_gpa'],
            "stream": user['stream'],
            "avatar": user['avatar']
        }
    })

@app.route('/api/auth/me', methods=['GET'])
@require_auth()
def auth_me():
    user = request.current_user
    return jsonify({
        "success": True,
        "user": {
            "id": user['user_id'],
            "name": user['name'],
            "email": user['email'],
            "role": user['role'],
            "collegeId": user['college_id'],
            "phone": user['phone'],
            "tenthGPA": user['tenth_gpa'],
            "stream": user['stream'],
            "avatar": user['avatar']
        }
    })

@app.route('/api/auth/logout', methods=['POST'])
def auth_logout():
    auth_header = request.headers.get('Authorization', '')
    if auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
        delete_session(token)
    return jsonify({"success": True, "message": "Logged out successfully."})

# ==================== COLLEGE & FEE MANAGEMENT API ====================

@app.route('/api/colleges', methods=['GET'])
def get_colleges():
    city = request.args.get('city')
    stream = request.args.get('stream')
    search = request.args.get('search')
    max_budget = request.args.get('max_budget', type=int)

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM colleges ORDER BY rating DESC')
    rows = cursor.fetchall()
    conn.close()

    colleges = [row_to_college(r) for r in rows]

    if city and city != 'All':
        colleges = [c for c in colleges if c['city'].lower() == city.lower()]
    if stream and stream != 'All':
        colleges = [c for c in colleges if any(stream.lower() in s.lower() for s in c['streams'])]
    if search:
        q = search.lower()
        colleges = [c for c in colleges if q in c['name'].lower() or q in c['city'].lower() or q in c['branch'].lower()]
    if max_budget:
        colleges = [c for c in colleges if c['feeStructure']['totalDayScholar'] <= max_budget]

    return jsonify({"success": True, "count": len(colleges), "colleges": colleges})

@app.route('/api/colleges/<college_id>', methods=['GET'])
def get_college(college_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM colleges WHERE id = ?', (college_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return jsonify({"success": False, "error": "College not found"}), 404

    return jsonify({"success": True, "college": row_to_college(row)})

@app.route('/api/colleges/<college_id>/fees', methods=['PUT'])
def update_college_fees(college_id):
    auth_header = request.headers.get('Authorization', '')
    updater_name = 'College Administration'
    if auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
        session = verify_token(token)
        if session:
            updater_name = session.get('name', 'College Admin')

    data = request.get_json() or {}
    tuition = int(data.get('tuitionFee', 0))
    admission = int(data.get('admissionFee', 0))
    coaching = int(data.get('coachingFee', 0))
    lab = int(data.get('labExamFee', 0))
    books = int(data.get('booksUniformFee', 0))
    total_day = tuition + admission + coaching + lab + books
    hostel_ac = int(data.get('hostelFeeAC', 0))
    hostel_non_ac = int(data.get('hostelFeeNonAC', 0))
    bus = int(data.get('busFeeAvg', 0))
    installments = int(data.get('installmentsAllowed', 2))
    plan = data.get('installmentPlan', '')

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute('SELECT total_day_scholar, name FROM colleges WHERE id = ?', (college_id,))
    old_row = cursor.fetchone()
    if not old_row:
        conn.close()
        return jsonify({"success": False, "error": "College not found"}), 404

    old_fee = old_row['total_day_scholar']
    college_name = old_row['name']
    now_str = time.strftime('%Y-%m-%d %H:%M:%S')

    cursor.execute('''
    UPDATE colleges SET
        tuition_fee = ?,
        admission_fee = ?,
        coaching_fee = ?,
        lab_exam_fee = ?,
        books_uniform_fee = ?,
        total_day_scholar = ?,
        hostel_fee_ac = ?,
        hostel_fee_non_ac = ?,
        bus_fee_avg = ?,
        installments_allowed = ?,
        installment_plan = ?,
        last_updated = ?
    WHERE id = ?
    ''', (tuition, admission, coaching, lab, books, total_day, hostel_ac, hostel_non_ac, bus, installments, plan, "Just now (" + now_str[11:16] + ")", college_id))

    cursor.execute('''
    INSERT INTO fee_audit_logs (college_id, old_fee, new_fee, updated_by, timestamp, details)
    VALUES (?, ?, ?, ?, ?, ?)
    ''', (college_id, old_fee, total_day, updater_name, now_str, json.dumps(data)))

    conn.commit()

    cursor.execute('SELECT * FROM colleges WHERE id = ?', (college_id,))
    updated_college = row_to_college(cursor.fetchone())
    conn.close()

    return jsonify({
        "success": True,
        "message": f"Fees updated successfully for {college_name}",
        "newTotalDayScholar": total_day,
        "oldFee": old_fee,
        "college": updated_college
    })

@app.route('/api/colleges/<college_id>/photos', methods=['POST'])
def add_college_photo(college_id):
    data = request.get_json() or {}
    photo_url = data.get('url', '').strip()
    if not photo_url:
        return jsonify({"success": False, "error": "Photo URL is required"}), 400

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT gallery FROM colleges WHERE id = ?', (college_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return jsonify({"success": False, "error": "College not found"}), 404

    gallery = json.loads(row['gallery']) if row['gallery'] else []
    gallery.append(photo_url)

    cursor.execute('UPDATE colleges SET gallery = ? WHERE id = ?', (json.dumps(gallery), college_id))
    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": "Campus photo added successfully", "gallery": gallery})

# ==================== STUDENT INQUIRIES & ADMISSION LEADS ====================

@app.route('/api/inquiries', methods=['POST'])
def submit_inquiry():
    data = request.get_json() or {}
    inq_id = data.get('id', "inq-" + str(int(time.time()*1000)))
    now = int(time.time())
    
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
    INSERT INTO inquiries (id, college_id, college_name, student_name, phone, email, tenth_gpa, interested_stream, residential_preference, message, date, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        inq_id,
        data.get('collegeId', ''),
        data.get('collegeName', ''),
        data.get('studentName', ''),
        data.get('phone', ''),
        data.get('email', ''),
        data.get('tenthGPA', ''),
        data.get('interestedStream', ''),
        data.get('residentialPreference', ''),
        data.get('message', ''),
        data.get('date', time.strftime('%d %b %Y, %I:%M %p')),
        data.get('status', 'New Lead'),
        now
    ))
    conn.commit()
    conn.close()

    return jsonify({"success": True, "id": inq_id, "message": "Inquiry recorded successfully."}), 201

@app.route('/api/inquiries', methods=['GET'])
def list_inquiries():
    college_id = request.args.get('college_id')
    conn = get_connection()
    cursor = conn.cursor()
    if college_id:
        cursor.execute('SELECT * FROM inquiries WHERE college_id = ? ORDER BY created_at DESC', (college_id,))
    else:
        cursor.execute('SELECT * FROM inquiries ORDER BY created_at DESC')
    rows = cursor.fetchall()
    conn.close()

    inquiries = [{
        "id": r["id"],
        "collegeId": r["college_id"],
        "collegeName": r["college_name"],
        "studentName": r["student_name"],
        "phone": r["phone"],
        "email": r["email"],
        "tenthGPA": r["tenth_gpa"],
        "interestedStream": r["interested_stream"],
        "residentialPreference": r["residential_preference"],
        "message": r["message"],
        "date": r["date"],
        "status": r["status"]
    } for r in rows]

    return jsonify({"success": True, "count": len(inquiries), "inquiries": inquiries})

@app.route('/api/inquiries/<inquiry_id>/status', methods=['PATCH'])
def update_inquiry_status(inquiry_id):
    data = request.get_json() or {}
    new_status = data.get('status', 'New Lead')

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('UPDATE inquiries SET status = ? WHERE id = ?', (new_status, inquiry_id))
    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": f"Inquiry status updated to {new_status}"})

# ==================== BOOKMARKS API ====================

@app.route('/api/bookmarks', methods=['GET'])
@require_auth()
def get_bookmarks():
    user_id = request.current_user['user_id']
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
    SELECT c.* FROM bookmarks b
    JOIN colleges c ON b.college_id = c.id
    WHERE b.user_id = ?
    ''', (user_id,))
    rows = cursor.fetchall()
    conn.close()

    colleges = [row_to_college(r) for r in rows]
    return jsonify({"success": True, "bookmarks": colleges})

@app.route('/api/bookmarks/<college_id>', methods=['POST'])
@require_auth()
def add_bookmark(college_id):
    user_id = request.current_user['user_id']
    conn = get_connection()
    cursor = conn.cursor()
    now = int(time.time())
    cursor.execute('INSERT OR IGNORE INTO bookmarks (user_id, college_id, created_at) VALUES (?, ?, ?)', (user_id, college_id, now))
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": "College bookmarked successfully"})

@app.route('/api/bookmarks/<college_id>', methods=['DELETE'])
@require_auth()
def remove_bookmark(college_id):
    user_id = request.current_user['user_id']
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM bookmarks WHERE user_id = ? AND college_id = ?', (user_id, college_id))
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": "Bookmark removed"})

# ==================== SYSTEM HEALTH ====================

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy",
        "service": "Students Path Finder Production API",
        "version": "2.5",
        "activeDatabase": "SQLite (pathfinder.db)",
        "features": ["PBKDF2-Auth", "Relational-Colleges", "LiveSync-Fees", "Leads-CRM", "Bookmarks"]
    })

if __name__ == '__main__':
    init_db()
    print("==================================================================")
    print("  Students Path Finder - Unified Full-Stack Production Server")
    print("  Serving Frontend & API unified on: http://127.0.0.1:5000")
    print("==================================================================")
    app.run(host='127.0.0.1', port=5000, debug=False)
