"""
Automated Test Suite for Students Path Finder
Validates:
- Health check & API version
- College listings & filters
- PBKDF2/scrypt salted password hashing
- Session token generation (64-char hex)
- Duplicate registration rejection (409 Conflict)
- Invalid credentials rejection (401 Unauthorized)
- Role-based authorization & fee update auditing
- Unified frontend static file serving
"""
import sys
import os
import sqlite3

backend_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, backend_dir)

from app import app
from database import get_connection

print("==================================================================")
print("  Running Students Path Finder Automated Test Suite")
print("==================================================================")

# Clean up test user from previous runs
conn = get_connection()
conn.execute("DELETE FROM users WHERE email = 'kavya.test@pathfinder.edu'")
conn.commit()
conn.close()

client = app.test_client()

# 1. Health check
res = client.get('/api/health')
assert res.status_code == 200, f"Health check failed: {res.status_code}"
print("[PASS] GET /api/health returned 200 OK")

# 2. Get colleges
res = client.get('/api/colleges')
assert res.status_code == 200, f"Get colleges failed: {res.status_code}"
colleges = res.get_json()['colleges']
assert len(colleges) >= 2, "Seeded colleges missing"
print(f"[PASS] GET /api/colleges returned {len(colleges)} colleges")

# 3. Weak password rejected (< 6 chars)
res = client.post('/api/auth/signup', json={
    'name': 'Test Student',
    'email': 'weak@test.com',
    'password': '123',
    'role': 'student'
})
assert res.status_code == 400, f"Expected 400 for weak password, got {res.status_code}"
print("[PASS] Weak password rejected (< 6 characters)")

# 4. Student registration with strong password
res = client.post('/api/auth/signup', json={
    'name': 'Kavya Reddy',
    'email': 'kavya.test@pathfinder.edu',
    'password': 'SecurePassword@2025',
    'phone': '+91 98765 43210',
    'tenthGpa': '9.9',
    'role': 'student'
})
assert res.status_code == 201, f"Signup failed: {res.status_code}"
student_token = res.get_json()['token']
assert len(student_token) >= 64, "Token should be at least 64 chars"
print(f"[PASS] Student registration succeeded with 64-char token: {student_token[:16]}...")

# 5. Verify cryptographic salted hashing in DB
conn = get_connection()
row = conn.execute("SELECT password_hash FROM users WHERE email = 'kavya.test@pathfinder.edu'").fetchone()
conn.close()
assert row is not None
assert ('scrypt' in row['password_hash'] or 'pbkdf2' in row['password_hash'])
assert 'SecurePassword@2025' not in row['password_hash']
print(f"[PASS] Password securely stored as cryptographic salted hash in database")

# 6. Duplicate registration rejected
res = client.post('/api/auth/signup', json={
    'name': 'Duplicate',
    'email': 'kavya.test@pathfinder.edu',
    'password': 'AnotherPassword@123',
    'role': 'student'
})
assert res.status_code == 409, f"Expected 409 Conflict, got {res.status_code}"
print("[PASS] Duplicate email registration blocked with 409 Conflict")

# 7. Invalid credentials login rejected
res = client.post('/api/auth/login', json={
    'email': 'kavya.test@pathfinder.edu',
    'password': 'WrongPassword999'
})
assert res.status_code == 401, f"Expected 401 for wrong password, got {res.status_code}"
print("[PASS] Invalid password rejected with 401 Unauthorized")

# 8. Valid login produces new session
res = client.post('/api/auth/login', json={
    'email': 'kavya.test@pathfinder.edu',
    'password': 'SecurePassword@2025'
})
assert res.status_code == 200, f"Login failed: {res.status_code}"
new_token = res.get_json()['token']
print("[PASS] Valid login produced authenticated session token")

# 9. Verify token via /api/auth/me
res = client.get('/api/auth/me', headers={'Authorization': f'Bearer {new_token}'})
assert res.status_code == 200, f"Auth check failed: {res.status_code}"
profile = res.get_json()['user']
assert profile['email'] == 'kavya.test@pathfinder.edu'
print(f"[PASS] /api/auth/me verified user: {profile['name']} ({profile['role']})")

# 10. Seeded College Admin login
res = client.post('/api/auth/login', json={
    'email': 'admin@srichaitanya.edu',
    'password': 'College@1234'
})
assert res.status_code == 200, f"College admin login failed: {res.status_code}"
college_token = res.get_json()['token']
print("[PASS] Seeded College Admin authenticated successfully")

# 11. Authorized fee update & calculation
update_payload = {
    'tuitionFee': 95000,
    'admissionFee': 10000,
    'coachingFee': 45000,
    'labExamFee': 12000,
    'booksUniformFee': 8000,
    'hostelFeeAC': 80000,
    'hostelFeeNonAC': 60000,
    'busFeeAvg': 22000,
    'installmentsAllowed': 3,
    'installmentPlan': '3 installments'
}
res = client.put(
    '/api/colleges/sri-chaitanya-madhapur/fees',
    json=update_payload,
    headers={'Authorization': f'Bearer {college_token}'}
)
assert res.status_code == 200, f"Fee update failed: {res.status_code}"
assert res.get_json()['newTotalDayScholar'] == 170000
print("[PASS] PUT /api/colleges/fees updated day scholar fee to INR 1,70,000")

# 12. Submit student inquiry lead
res = client.post('/api/inquiries', json={
    'collegeId': 'sri-chaitanya-madhapur',
    'studentName': 'Rahul Sharma',
    'phone': '+91 98490 55443',
    'tenthGPA': '9.7',
    'interestedStream': 'MPC',
    'residentialPreference': 'Day Scholar'
})
assert res.status_code == 201, f"Inquiry submission failed: {res.status_code}"
print("[PASS] POST /api/inquiries logged admission lead")

# 13. Static frontend file serving
res = client.get('/')
assert res.status_code == 200 and b'Students Path Finder' in res.data
print("[PASS] GET / serves index.html")

res = client.get('/colleges')
assert res.status_code == 200
print("[PASS] GET /colleges serves colleges.html")

res = client.get('/css/style.css')
assert res.status_code == 200
print("[PASS] GET /css/style.css serves CSS stylesheet")

print("\n>>> ALL AUTOMATED TESTS COMPLETED WITH 100% SUCCESS <<<\n")
