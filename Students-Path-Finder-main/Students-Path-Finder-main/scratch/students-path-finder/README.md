# 🎓 Students Path Finder

> **A Modern Full-Stack College Discovery & Real-Time Transparent Fee Management Platform for 10th-Passed Students**

---

## 🌟 Overview & Problem Solved
After completing 10th standard (SSC/CBSE/ICSE), students and parents face severe stress, spending significant money and days traveling from college to college offline just to collect brochures, understand hidden fee structures, and ask about scholarships.

**Students Path Finder** eliminates this stress by providing:
1. **Student Discovery Portal**: Search, filter by stream (MPC, BiPC, MEC, CEC, Polytechnic, ITI), compare up to 4 colleges side-by-side, inspect campus photo galleries, and calculate real-time scholarships based on 10th GPA.
2. **College Partner Administration Portal**: Restricted portal for verified college administrators to manage college profiles, upload campus photos, and edit fee structures.
3. **Instant Cross-Portal Fee Sync**: Any fee revision in the College Portal immediately reflects across student search results, detail pages, and comparison tables without page reloads.
4. **Hardened Security & Relational Database**: SQLite persistent database, salted cryptographic password hashing (PBKDF2/scrypt), 64-character session tokens, role-based access control, and audit logs.
5. **Modern Dark Mode & Micro-Animations**: Smooth theme switcher with persistent preference, animated glassmorphism cards, and interactive visual indicators.

---

## 🚀 Quick Start (Local Run)

### Option A: Double-Click Launcher (Windows)
Double-click `run_production.bat` (or right-click `run_production.ps1` and select *Run with PowerShell*).
The script installs required dependencies, boots the server on **`http://127.0.0.1:5000`**, and automatically opens your browser.

### Option B: Manual Command Line
```bash
# 1. Install dependencies
pip install -r backend/requirements.txt

# 2. Run the unified full-stack server
python backend/app.py
```
Visit **[http://127.0.0.1:5000](http://127.0.0.1:5000)** in your browser.

---

## 🔑 Pre-Seeded Demo Accounts

### 👨‍🎓 Student Demo Account
- **URL**: `http://127.0.0.1:5000/student-login.html`
- **Email**: `student@pathfinder.edu`
- **Password**: `Pass@1234`
- **Features**: Bookmark colleges, submit callbacks, calculate 10th GPA scholarships.

### 🏫 College Partner Demo Accounts (Institutions)
1. **Sri Chaitanya Junior College (Madhapur, Hyderabad)**
   - **URL**: `http://127.0.0.1:5000/college-login.html`
   - **Email**: `admin@srichaitanya.edu`
   - **Password**: `College@1234`
   - **Affiliation Code**: `SCJC-HYD-01`
2. **Narayana Junior College (KPHB, Hyderabad)**
   - **URL**: `http://127.0.0.1:5000/college-login.html`
   - **Email**: `admin.kphb@narayanagroup.com`
   - **Password**: `College@1234`
   - **Affiliation Code**: `NJC-HYD-04`

---

## 🏗️ Architecture & Technology Stack

```
+------------------------------------------------------------------------+
|                      STUDENTS PATH FINDER PLATFORM                      |
+------------------------------------------------------------------------+
|  Frontend Layer (HTML5, CSS3 Variables, ES6 Modules, Reactive Store)  |
|  - Student Pages: index, colleges, college-detail, compare             |
|  - Auth Pages: student-login, student-signup, college-login/signup     |
|  - College Portal: college-dashboard (Real-time fee editor & leads)    |
|  - Live Sync: BroadcastChannel API + Reactive Store + Storage Event    |
+------------------------------------------------------------------------+
                                   | HTTP / JSON REST API
+------------------------------------------------------------------------+
|  Backend Layer (Python Flask 3.10 + Unified Static File Delivery)       |
|  - Routing: Unified port 5000 serving frontend assets & REST endpoints  |
|  - Security: Cryptographic salted password hashing, 64-char hex tokens  |
|  - Middleware: Role-based authorization (@require_auth)                 |
+------------------------------------------------------------------------+
                                   | SQLite Driver
+------------------------------------------------------------------------+
|  Persistence Layer (SQLite Database: backend/pathfinder.db)           |
|  - users (id, email, password_hash, role, tenth_gpa, created_at)       |
|  - sessions (token, user_id, expires_at, created_at)                   |
|  - colleges (id, code, name, streams, feeStructure, gallery, etc.)    |
|  - inquiries (leads submitted by students requesting callbacks)        |
|  - bookmarks (student saved colleges)                                  |
|  - fee_audit_logs (historical record of fee updates)                   |
+------------------------------------------------------------------------+
```

---

## 📡 REST API Reference

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/health` | GET | Public | Health status & API version |
| `/api/auth/signup` | POST | Public | Register student or college partner |
| `/api/auth/login` | POST | Public | Authenticate user & issue 64-char token |
| `/api/auth/me` | GET | Bearer | Verify session token & retrieve profile |
| `/api/auth/logout` | POST | Bearer | Invalidate session token |
| `/api/colleges` | GET | Public | List colleges with stream/budget filters |
| `/api/colleges/<id>` | GET | Public | Detailed college data & fee breakdown |
| `/api/colleges/<id>/fees` | PUT | College | Update fee structure & log audit trail |
| `/api/inquiries` | POST | Public | Submit callback request from student |
| `/api/inquiries` | GET | College | List student inquiries for college admin |

---

## ☁️ Cloud Deployment Options

### 1. Render (1-Click Deployment)
This repository includes a production-ready `render.yaml` blueprint:
1. Push this project to GitHub.
2. Sign in to [Render](https://render.com) and click **New > Blueprint**.
3. Connect your GitHub repository.
4. Render automatically runs `pip install -r backend/requirements.txt` and starts the server via `python backend/app.py`.

### 2. Docker & Docker Compose
```bash
# Build and run container
docker-compose up --build -d

# Check running status
docker ps
```
Visit **`http://localhost:5000`**.

### 3. Railway / Heroku
The included `Procfile` defines the production process:
```
web: python backend/app.py
```

---

## 🧪 Automated Testing
Run the backend test suite:
```bash
python backend/test_api.py
```
Verifies 13 points including password hashing, session issuance, lead capture, and fee calculation.
