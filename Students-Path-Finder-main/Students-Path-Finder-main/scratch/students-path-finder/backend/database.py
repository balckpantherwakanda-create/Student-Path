"""
Students Path Finder - Comprehensive Relational SQLite Database Layer
Implements:
- PBKDF2-SHA256 Salted Password Hashing
- Cryptographic Session Token Generation & Tracking
- Complete relational schema (users, sessions, colleges, inquiries, bookmarks, fee_audit_logs, reviews)
- Pre-seeded realistic dataset for all 6 junior colleges and polytechnics
- Pre-seeded demo accounts (student and college partners)
"""

import sqlite3
import json
import os
import secrets
import hashlib
import time

DB_PATH = os.path.join(os.path.dirname(__file__), 'pathfinder.db')

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# Password Hashing Utilities using Werkzeug or standard hashlib
try:
    from werkzeug.security import generate_password_hash, check_password_hash
except ImportError:
    def generate_password_hash(password):
        salt = secrets.token_hex(16)
        key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000)
        return "pbkdf2:sha256:100000$" + salt + "$" + key.hex()

    def check_password_hash(p_hash, password):
        try:
            algo, iters, salt, key = p_hash.split('$')
            iters = int(iters)
            test_key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), iters)
            return secrets.compare_digest(test_key.hex(), key)
        except Exception:
            return False

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # 1. Users Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT NOT NULL,
        phone TEXT,
        role TEXT NOT NULL,  -- 'student' or 'college_admin'
        college_id TEXT,
        tenth_gpa TEXT,
        stream TEXT,
        city TEXT,
        avatar TEXT,
        created_at TEXT NOT NULL,
        last_login TEXT
    )
    ''')

    # 2. Sessions Table (Active Bearer Tokens)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS sessions (
        token TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        role TEXT NOT NULL,
        college_id TEXT,
        created_at INTEGER NOT NULL,
        expires_at INTEGER NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )
    ''')

    # 3. Colleges Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS colleges (
        id TEXT PRIMARY KEY,
        code TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        branch TEXT,
        city TEXT,
        district TEXT,
        state TEXT,
        type TEXT,
        gender TEXT,
        established INTEGER,
        rating REAL,
        review_count INTEGER,
        image TEXT,
        gallery TEXT,
        streams TEXT,
        coaching TEXT,
        batches TEXT,
        tuition_fee INTEGER,
        admission_fee INTEGER,
        coaching_fee INTEGER,
        lab_exam_fee INTEGER,
        books_uniform_fee INTEGER,
        total_day_scholar INTEGER,
        hostel_fee_ac INTEGER,
        hostel_fee_non_ac INTEGER,
        bus_fee_avg INTEGER,
        installments_allowed INTEGER,
        installment_plan TEXT,
        scholarships TEXT,
        facilities TEXT,
        phone TEXT,
        whatsapp TEXT,
        email TEXT,
        website TEXT,
        address TEXT,
        last_updated TEXT
    )
    ''')

    # 4. Inquiries / Leads Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS inquiries (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        college_id TEXT NOT NULL,
        college_name TEXT NOT NULL,
        student_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        tenth_gpa TEXT,
        interested_stream TEXT,
        residential_preference TEXT,
        message TEXT,
        date TEXT,
        status TEXT DEFAULT 'New Lead',
        created_at INTEGER
    )
    ''')

    # 5. Bookmarks Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS bookmarks (
        user_id TEXT NOT NULL,
        college_id TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        PRIMARY KEY (user_id, college_id)
    )
    ''')

    # 6. Fee Audit Logs (Tracks every fee modification with previous and new fees)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS fee_audit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        college_id TEXT NOT NULL,
        old_fee INTEGER NOT NULL,
        new_fee INTEGER NOT NULL,
        updated_by TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        details TEXT
    )
    ''')

    # 7. Reviews Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS reviews (
        id TEXT PRIMARY KEY,
        college_id TEXT NOT NULL,
        user_id TEXT,
        user_name TEXT NOT NULL,
        rating REAL NOT NULL,
        comment TEXT NOT NULL,
        stream TEXT,
        date TEXT NOT NULL,
        created_at INTEGER
    )
    ''')

    conn.commit()

    # Always seed colleges if count is less than 6
    cursor.execute('SELECT COUNT(*) FROM colleges')
    col_count = cursor.fetchone()[0]
    if col_count < 6:
        seed_colleges(conn)

    # Always seed users if empty
    cursor.execute('SELECT COUNT(*) FROM users')
    if cursor.fetchone()[0] == 0:
        seed_users(conn)

    conn.close()
    print("[Database] Normalized SQLite schema verified at:", DB_PATH)

def seed_users(conn):
    cursor = conn.cursor()
    now_str = time.strftime('%Y-%m-%d %H:%M:%S')

    users = [
        # Student Demo
        (
            "usr-student-01",
            "student@pathfinder.edu",
            generate_password_hash("Pass@1234"),
            "Sai Kiran Reddy",
            "+91 98480 12345",
            "student",
            None,
            "9.8",
            "MPC",
            "Hyderabad",
            "🎓",
            now_str
        ),
        # Sri Chaitanya Demo Admin
        (
            "usr-admin-01",
            "admin@srichaitanya.edu",
            generate_password_hash("College@1234"),
            "Dr. P. Venkateswara Rao (Director)",
            "+91 98490 12345",
            "college_admin",
            "sri-chaitanya-madhapur",
            None,
            None,
            "Hyderabad",
            "🏛️",
            now_str
        ),
        # Narayana Demo Admin
        (
            "usr-admin-02",
            "admin.kphb@narayanagroup.com",
            generate_password_hash("College@1234"),
            "Prof. K. Narayana Murthy",
            "+91 99890 23456",
            "college_admin",
            "narayana-junior-college-kukatpally",
            None,
            None,
            "Hyderabad",
            "🏛️",
            now_str
        ),
        # PAGE Junior College Admin
        (
            "usr-admin-03",
            "admin@pageacademy.com",
            generate_password_hash("College@1234"),
            "Mrs. Anuradha Sharma (Academic Dean)",
            "+91 92465 52255",
            "college_admin",
            "page-junior-college-banjara",
            None,
            None,
            "Hyderabad",
            "🏛️",
            now_str
        ),
        # Government Polytechnic Masab Tank Admin
        (
            "usr-admin-04",
            "principal.gpthyd@telangana.gov.in",
            generate_password_hash("College@1234"),
            "Sri T. Prabhakar (Principal)",
            "+91 40 2339 1234",
            "college_admin",
            "govt-polytechnic-masab-tank",
            None,
            None,
            "Hyderabad",
            "🏛️",
            now_str
        ),
        # Loyola Academy Admin
        (
            "usr-admin-05",
            "admissions@loyolaacademy.edu.in",
            generate_password_hash("College@1234"),
            "Rev. Fr. Joseph Anthony SJ (Principal)",
            "+91 40 2786 2363",
            "college_admin",
            "loyola-academy-alwal",
            None,
            None,
            "Secunderabad",
            "🏛️",
            now_str
        ),
        # St. Ann's Junior College Admin
        (
            "usr-admin-06",
            "admin@stannscollege.in",
            generate_password_hash("College@1234"),
            "Sr. Dr. Fatima Mary (Principal)",
            "+91 40 2351 3020",
            "college_admin",
            "st-ann-junior-college-mehdipatnam",
            None,
            None,
            "Hyderabad",
            "🏛️",
            now_str
        )
    ]

    for u in users:
        cursor.execute('''
        INSERT OR REPLACE INTO users (id, email, password_hash, name, phone, role, college_id, tenth_gpa, stream, city, avatar, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', u)

    conn.commit()
    print("[Database] Seeded student and institutional admin demo accounts.")

def seed_colleges(conn):
    cursor = conn.cursor()
    colleges = [
        {
            "id": "sri-chaitanya-madhapur",
            "code": "SCJC-HYD-01",
            "name": "Sri Chaitanya Junior College",
            "branch": "Madhapur Hi-Tech Campus",
            "city": "Hyderabad",
            "district": "Ranga Reddy",
            "state": "Telangana",
            "type": "Private Residential / Day Scholar",
            "gender": "Co-ed",
            "established": 1986,
            "rating": 4.6,
            "review_count": 412,
            "image": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
            "gallery": json.dumps([
                "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80"
            ]),
            "streams": json.dumps(["MPC (Maths, Physics, Chem)", "BiPC (Biology, Physics, Chem)", "MEC (Maths, Eco, Comm)"]),
            "coaching": json.dumps(["JEE Main & Advanced", "NEET Medical", "BITSAT", "State EAPCET", "CA Foundation"]),
            "batches": json.dumps(["IPL Super-60 Batch", "Neon Star Elite", "Regular Intermediate + Coaching", "Day Scholar Morning-Evening"]),
            "tuition_fee": 85000,
            "admission_fee": 10000,
            "coaching_fee": 45000,
            "lab_exam_fee": 12000,
            "books_uniform_fee": 8000,
            "total_day_scholar": 160000,
            "hostel_fee_ac": 95000,
            "hostel_fee_non_ac": 70000,
            "bus_fee_avg": 22000,
            "installments_allowed": 3,
            "installment_plan": "1st: ₹60,000 at admission | 2nd: ₹50,000 (Sep) | 3rd: ₹50,000 (Dec)",
            "scholarships": json.dumps([
                {"minGPA": 10.0, "concessionPercentage": 40, "desc": "10.0 GPA in 10th Board: 40% Off on Tuition Fee"},
                {"minGPA": 9.8, "concessionPercentage": 25, "desc": "9.8+ GPA: 25% Off on Tuition Fee"},
                {"minGPA": 9.5, "concessionPercentage": 15, "desc": "9.5+ GPA: 15% Off on Tuition Fee"},
                {"minGPA": 9.0, "concessionPercentage": 10, "desc": "9.0+ GPA: 10% Off on Tuition Fee"}
            ]),
            "facilities": json.dumps([
                "Air-Conditioned Digital Smart Classrooms",
                "Advanced Physics, Chemistry & Biology Labs",
                "Full-time IIT & AIIMS Qualified Faculty",
                "Separate AC & Non-AC Hostels with 24/7 Security",
                "Fleet of 35+ GPS-Tracked College Buses",
                "Hygienic South & North Indian Food Court",
                "Daily Practice Problems (DPP) & Doubt Sessions",
                "Weekly All-India Level Mock Tests & Analysis"
            ]),
            "phone": "+91 98490 12345",
            "whatsapp": "+91 98490 12345",
            "email": "admissions@srichaitanya.net",
            "website": "https://srichaitanya.net",
            "address": "Plot 12, Near Cyber Towers, Madhapur, Hyderabad - 500081",
            "last_updated": "Live Synced via Python Backend"
        },
        {
            "id": "narayana-junior-college-kukatpally",
            "code": "NJC-HYD-04",
            "name": "Narayana Junior College & Olympiad Academy",
            "branch": "Kukatpally Main Campus",
            "city": "Hyderabad",
            "district": "Medchal-Malkajgiri",
            "state": "Telangana",
            "type": "Private Residential / Semi-Residential",
            "gender": "Co-ed",
            "established": 1979,
            "rating": 4.5,
            "review_count": 388,
            "image": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
            "gallery": json.dumps([
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80"
            ]),
            "streams": json.dumps(["MPC (Maths, Physics, Chem)", "BiPC (Biology, Physics, Chem)", "MEC (Maths, Eco, Comm)", "CEC (Civics, Eco, Comm)"]),
            "coaching": json.dumps(["JEE Advanced (CO-Spark)", "NEET Medical", "BITSAT", "TG EAPCET", "CLAT & IPMAT"]),
            "batches": json.dumps(["CO-Spark / Medi-Spark", "Champs Batch", "Day Scholar Extensive", "Integrated Board Batch"]),
            "tuition_fee": 80000,
            "admission_fee": 8000,
            "coaching_fee": 42000,
            "lab_exam_fee": 10000,
            "books_uniform_fee": 7500,
            "total_day_scholar": 147500,
            "hostel_fee_ac": 90000,
            "hostel_fee_non_ac": 68000,
            "bus_fee_avg": 20000,
            "installments_allowed": 3,
            "installment_plan": "1st: ₹55,000 at admission | 2nd: ₹47,500 (Oct) | 3rd: ₹45,000 (Jan)",
            "scholarships": json.dumps([
                {"minGPA": 10.0, "concessionPercentage": 35, "desc": "10.0 GPA in 10th: 35% Concession on Tuition"},
                {"minGPA": 9.7, "concessionPercentage": 20, "desc": "9.7+ GPA: 20% Concession on Tuition"},
                {"minGPA": 9.3, "concessionPercentage": 12, "desc": "9.3+ GPA: 12% Concession on Tuition"}
            ]),
            "facilities": json.dumps([
                "Micro-Level Concept Teaching Classrooms",
                "Biometric Attendance & Parent SMS Alert",
                "Dedicated Olympiad Faculty & Mentors",
                "Hostels with Resident Wardens & Infirmary",
                "Transport covering 40+ City Routes",
                "Weekly Error Analysis & Special Counseling"
            ]),
            "phone": "+91 99890 23456",
            "whatsapp": "+91 99890 23456",
            "email": "admissions.kphb@narayanagroup.com",
            "website": "https://narayanagroup.com",
            "address": "Near KPHB Metro Station, Kukatpally, Hyderabad - 500072",
            "last_updated": "Yesterday"
        },
        {
            "id": "page-junior-college-banjara",
            "code": "PAGE-HYD-02",
            "name": "PAGE Junior College",
            "branch": "Banjara Hills Campus",
            "city": "Hyderabad",
            "district": "Hyderabad",
            "state": "Telangana",
            "type": "Private Day Scholar (Premium Boutique)",
            "gender": "Co-ed",
            "established": 1988,
            "rating": 4.8,
            "review_count": 245,
            "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80",
            "gallery": json.dumps([
                "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80"
            ]),
            "streams": json.dumps(["MPC (Maths, Physics, Chem)", "MEC (Maths, Eco, Comm)", "CEC (Civics, Eco, Comm)"]),
            "coaching": json.dumps(["JEE Main & Advanced", "Design Architecture (NATA/UCEED)", "CLAT Law", "IPMAT / IIM Indore", "SAT Overseas"]),
            "batches": json.dumps(["Small Batch (Max 30 Students)", "Morning Intensive", "Integrated Liberal Arts"]),
            "tuition_fee": 120000,
            "admission_fee": 15000,
            "coaching_fee": 55000,
            "lab_exam_fee": 15000,
            "books_uniform_fee": 10000,
            "total_day_scholar": 215000,
            "hostel_fee_ac": 120000,
            "hostel_fee_non_ac": 85000,
            "bus_fee_avg": 25000,
            "installments_allowed": 2,
            "installment_plan": "50% at Admission | 50% in October",
            "scholarships": json.dumps([
                {"minGPA": 10.0, "concessionPercentage": 30, "desc": "10.0 GPA / 95%+ in 10th: 30% Concession"},
                {"minGPA": 9.6, "concessionPercentage": 15, "desc": "9.6+ GPA: 15% Concession"}
            ]),
            "facilities": json.dumps([
                "Air-Conditioned Ergonomic Classrooms",
                "Strict 1:25 Faculty to Student Ratio",
                "Career Guidance for Overseas Admissions",
                "Modern Design Studio & Architecture Lab",
                "Nutritious Cafeteria & Recreation Lounge"
            ]),
            "phone": "+91 92465 52255",
            "whatsapp": "+91 92465 52255",
            "email": "info@pageacademy.com",
            "website": "https://pageacademy.com",
            "address": "Road No. 2, Near Park Hyatt, Banjara Hills, Hyderabad - 500034",
            "last_updated": "3 days ago"
        },
        {
            "id": "govt-polytechnic-masab-tank",
            "code": "GPT-HYD-01",
            "name": "Government Polytechnic College",
            "branch": "Masab Tank Campus",
            "city": "Hyderabad",
            "district": "Hyderabad",
            "state": "Telangana",
            "type": "Government Autonomous",
            "gender": "Co-ed",
            "established": 1923,
            "rating": 4.4,
            "review_count": 520,
            "image": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=900&q=80",
            "gallery": json.dumps([
                "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80"
            ]),
            "streams": json.dumps(["Polytechnic Diploma (Computer Engg)", "Polytechnic Diploma (ECE)", "Polytechnic Diploma (Mechanical)", "Polytechnic Diploma (Civil)"]),
            "coaching": json.dumps(["ECET Lateral Entry to 2nd Year B.Tech", "Industry Apprenticeship", "Govt PSU Exams"]),
            "batches": json.dumps(["State POLYCET Counseling Batch", "Direct Merit Intake"]),
            "tuition_fee": 3800,
            "admission_fee": 500,
            "coaching_fee": 0,
            "lab_exam_fee": 1200,
            "books_uniform_fee": 1500,
            "total_day_scholar": 7000,
            "hostel_fee_ac": 0,
            "hostel_fee_non_ac": 8500,
            "bus_fee_avg": 0,
            "installments_allowed": 1,
            "installment_plan": "Full Payment at Counseling (100% Govt RTF Reimbursement for eligible SC/ST/BC/EBC)",
            "scholarships": json.dumps([
                {"minGPA": 8.0, "concessionPercentage": 100, "desc": "Full Govt Tuition Fee Reimbursement (JVD/ePASS) based on income"}
            ]),
            "facilities": json.dumps([
                "Historic 100-Year Heritage Campus & Huge Workshops",
                "State-of-the-Art CNC Machinery & CAD/CAM Labs",
                "High-Speed NMEICT Optical Fiber Internet",
                "Government Subsidized Boys & Girls Hostel",
                "TSRTC Student Bus Pass Counter On Campus",
                "Direct Placement Cell with L&T, Tata Motors, DRDO"
            ]),
            "phone": "+91 40 2339 1234",
            "whatsapp": "+91 94401 23456",
            "email": "principal.gpthyd@telangana.gov.in",
            "website": "https://polycet.sbtet.telangana.gov.in",
            "address": "Near Mahaveer Hospital, Masab Tank, Hyderabad - 500028",
            "last_updated": "1 week ago"
        },
        {
            "id": "loyola-academy-alwal",
            "code": "LA-HYD-03",
            "name": "Loyola Academy Degree & PG College",
            "branch": "Old Alwal Campus",
            "city": "Secunderabad",
            "district": "Medchal-Malkajgiri",
            "state": "Telangana",
            "type": "Private Autonomous (NAAC A+ Accredited)",
            "gender": "Co-ed",
            "established": 1976,
            "rating": 4.7,
            "review_count": 395,
            "image": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
            "gallery": json.dumps([
                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80"
            ]),
            "streams": json.dumps(["B.Sc Data Science & AI", "B.Com Business Analytics", "BBA Digital Marketing", "B.Sc Agricultural Science"]),
            "coaching": json.dumps(["Campus Recruitment Training (CRT)", "Civil Services IAS Academy", "Global Certifications"]),
            "batches": json.dumps(["Autonomous Honours Program", "Industry-Partnered Batch"]),
            "tuition_fee": 65000,
            "admission_fee": 7500,
            "coaching_fee": 15000,
            "lab_exam_fee": 8500,
            "books_uniform_fee": 5000,
            "total_day_scholar": 101000,
            "hostel_fee_ac": 75000,
            "hostel_fee_non_ac": 55000,
            "bus_fee_avg": 18000,
            "installments_allowed": 2,
            "installment_plan": "Semester 1: ₹55,000 | Semester 2: ₹46,000",
            "scholarships": json.dumps([
                {"minGPA": 9.8, "concessionPercentage": 25, "desc": "Academic Excellence Scholarship for 9.8+ GPA"},
                {"minGPA": 9.0, "concessionPercentage": 15, "desc": "Merit Sports & Cultural Concession"}
            ]),
            "facilities": json.dumps([
                "Sprawling 130-Acre Lush Green Campus",
                "Olympic-Sized Athletic Track & Cricket Pavilion",
                "Central Digital Library with 50,000+ Books",
                "Well-Furnished Campus Hostels",
                "Campus Placement tie-ups with Deloitte, Amazon, TCS"
            ]),
            "phone": "+91 40 2786 2363",
            "whatsapp": "+91 98495 67890",
            "email": "admissions@loyolaacademy.edu.in",
            "website": "https://loyolaacademy.edu.in",
            "address": "Father Baliah Nagar, Old Alwal, Secunderabad - 500010",
            "last_updated": "5 days ago"
        },
        {
            "id": "st-ann-junior-college-mehdipatnam",
            "code": "SAJC-HYD-05",
            "name": "St. Ann's Junior College for Girls",
            "branch": "Mehdipatnam Campus",
            "city": "Hyderabad",
            "district": "Hyderabad",
            "state": "Telangana",
            "type": "Private Aided / Un-Aided (Exclusively Girls)",
            "gender": "Girls Only",
            "established": 1983,
            "rating": 4.8,
            "review_count": 310,
            "image": "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=900&q=80",
            "gallery": json.dumps([
                "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80"
            ]),
            "streams": json.dumps(["MPC (Maths, Physics, Chem)", "BiPC (Biology, Physics, Chem)", "MEC (Maths, Eco, Comm)", "CEC (Civics, Eco, Comm)"]),
            "coaching": json.dumps(["NEET Medical Focus", "State Board Toppers Track", "CA CPT Foundation"]),
            "batches": json.dumps(["Morning General Shift", "Afternoon Intensive Shift"]),
            "tuition_fee": 42000,
            "admission_fee": 5000,
            "coaching_fee": 18000,
            "lab_exam_fee": 6000,
            "books_uniform_fee": 4500,
            "total_day_scholar": 75500,
            "hostel_fee_ac": 0,
            "hostel_fee_non_ac": 50000,
            "bus_fee_avg": 16000,
            "installments_allowed": 2,
            "installment_plan": "Term 1: ₹45,000 at admission | Term 2: ₹30,500 (November)",
            "scholarships": json.dumps([
                {"minGPA": 10.0, "concessionPercentage": 30, "desc": "10.0 GPA Topper Scholarship"},
                {"minGPA": 9.5, "concessionPercentage": 15, "desc": "9.5+ GPA Merit Scholarship"}
            ]),
            "facilities": json.dumps([
                "Secure & Protected All-Girls Campus Environment",
                "Spacious Biology, Botany, Physics & Chemistry Labs",
                "Well-Stocked Reference Library & Reading Hall",
                "Dedicated Sports & Cultural Activity Clubs",
                "Annual Career & Higher Education Guidance Fair"
            ]),
            "phone": "+91 40 2351 3020",
            "whatsapp": "+91 93910 88221",
            "email": "stannscollege_hyd@yahoo.co.in",
            "website": "https://stannscollege.in",
            "address": "Santosh Nagar Colony, Mehdipatnam, Hyderabad - 500028",
            "last_updated": "4 days ago"
        }
    ]

    for col in colleges:
        cursor.execute('''
        INSERT OR REPLACE INTO colleges VALUES (
            :id, :code, :name, :branch, :city, :district, :state, :type, :gender, :established,
            :rating, :review_count, :image, :gallery, :streams, :coaching, :batches,
            :tuition_fee, :admission_fee, :coaching_fee, :lab_exam_fee, :books_uniform_fee,
            :total_day_scholar, :hostel_fee_ac, :hostel_fee_non_ac, :bus_fee_avg,
            :installments_allowed, :installment_plan, :scholarships, :facilities,
            :phone, :whatsapp, :email, :website, :address, :last_updated
        )
        ''', col)

    conn.commit()
    print("[Database] Seeded all 6 colleges with transparent fee structures.")

# Session Management Functions
def create_session(user_id, role, college_id=None, duration_seconds=604800):  # 7 days
    token = secrets.token_hex(32)
    now = int(time.time())
    expires = now + duration_seconds

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
    INSERT INTO sessions (token, user_id, role, college_id, created_at, expires_at)
    VALUES (?, ?, ?, ?, ?, ?)
    ''', (token, user_id, role, college_id, now, expires))
    conn.commit()
    conn.close()
    return token

def verify_token(token):
    if not token:
        return None
    now = int(time.time())
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
    SELECT s.*, u.name, u.email, u.tenth_gpa, u.stream, u.phone, u.avatar
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.token = ? AND s.expires_at > ?
    ''', (token, now))
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None

def delete_session(token):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM sessions WHERE token = ?', (token,))
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
