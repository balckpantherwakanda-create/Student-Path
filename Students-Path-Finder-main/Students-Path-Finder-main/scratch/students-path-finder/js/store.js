/**
 * Students Path Finder - Centralized Reactive State Store
 * Handles localStorage persistence, Theme (Dark/Light Mode), CRUD operations,
 * cross-tab BroadcastChannel sync, and optional Python Backend API integration.
 */

const STORAGE_KEYS = {
  COLLEGES: 'spf_colleges_data',
  BOOKMARKS: 'spf_bookmarks',
  COMPARE: 'spf_compare_list',
  INQUIRIES: 'spf_inquiries',
  CURRENT_USER: 'spf_current_user',
  THEME: 'spf_theme',
  LAST_UPDATE_EVENT: 'spf_last_update_event'
};

const SYNC_CHANNEL_NAME = 'students_path_finder_live_sync';
const BACKEND_API_BASE = 'http://127.0.0.1:5000/api';

// Globally Available Currency Formatter
function formatINR(amount) {
  const num = Number(amount);
  if (isNaN(num) || num === 0) return "100% Free / Govt RTF";
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(num);
}

if (typeof window !== 'undefined') {
  window.formatINR = formatINR;
}

// Theme Manager (Dark / Light Mode)
const Theme = {
  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    this.updateToggleIcons(theme);
  },

  toggle() {
    const current = this.getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    if (typeof showToast === 'function') {
      showToast('Switched to ' + (next === 'dark' ? 'Dark' : 'Light') + ' Mode', 'info');
    }
  },

  updateToggleIcons(theme) {
    const btns = document.querySelectorAll('.theme-toggle-btn');
    btns.forEach(btn => {
      btn.innerHTML = theme === 'dark' 
        ? '<i class="fas fa-sun text-warning"></i> <span class="theme-text">Light</span>' 
        : '<i class="fas fa-moon text-primary"></i> <span class="theme-text">Dark</span>';
      btn.setAttribute('title', 'Switch to ' + (theme === 'dark' ? 'Light' : 'Dark') + ' Mode');
    });
  },

  init() {
    const saved = this.getTheme();
    this.setTheme(saved);
  }
};

if (typeof window !== 'undefined') {
  window.Theme = Theme;
}

class AppStore {
  constructor() {
    this.broadcastChannel = null;
    this.initBroadcastChannel();
    this.initData();
    this.syncWithBackend();
  }

  initBroadcastChannel() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.broadcastChannel = new BroadcastChannel(SYNC_CHANNEL_NAME);
      } catch (e) {
        console.warn('BroadcastChannel not supported:', e);
      }
    }
  }

  initData() {
    if (typeof window === 'undefined') return;
    const existing = localStorage.getItem(STORAGE_KEYS.COLLEGES);
    if (!existing || JSON.parse(existing).length === 0) {
      localStorage.setItem(STORAGE_KEYS.COLLEGES, JSON.stringify(SEED_COLLEGES_DATA));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BOOKMARKS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.COMPARE)) {
      localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
      const sampleInquiries = [
        {
          id: "inq-101",
          collegeId: "sri-chaitanya-madhapur",
          collegeName: "Sri Chaitanya Junior College",
          studentName: "Sai Kiran Reddy",
          phone: "+91 98480 99887",
          email: "saikiran.reddy10@gmail.com",
          tenthGPA: "9.8",
          interestedStream: "MPC (Maths, Physics, Chem)",
          preferredBatch: "IPL Super-60 Batch",
          residentialPreference: "Day Scholar + Bus",
          message: "Looking for scholarship on 9.8 GPA and hostel availability.",
          date: "30 Oct 2026, 06:15 PM",
          status: "New Lead"
        },
        {
          id: "inq-102",
          collegeId: "sri-chaitanya-madhapur",
          collegeName: "Sri Chaitanya Junior College",
          studentName: "Ananya Sharma",
          phone: "+91 97001 44552",
          email: "ananya.s@outlook.com",
          tenthGPA: "10.0",
          interestedStream: "BiPC (Biology, Physics, Chem)",
          preferredBatch: "Neon Star Elite (NEET)",
          residentialPreference: "AC Hostel",
          message: "Interested in AIIMS integrated preparation.",
          date: "30 Oct 2026, 07:45 PM",
          status: "Contacted"
        }
      ];
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(sampleInquiries));
    }
  }

  // Attempt background sync with Python Backend if running
  async syncWithBackend() {
    if (typeof fetch === 'undefined') return;
    try {
      const res = await fetch(BACKEND_API_BASE + '/colleges', { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.colleges && data.colleges.length > 0) {
          localStorage.setItem(STORAGE_KEYS.COLLEGES, JSON.stringify(data.colleges));
          console.log('[Store] Synchronized with Python Backend API successfully.');
        }
      }
    } catch (e) {
      // Backend not running yet, gracefully continue in local offline mode
    }
  }

  getColleges() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COLLEGES);
      return data ? JSON.parse(data) : SEED_COLLEGES_DATA;
    } catch (e) {
      return SEED_COLLEGES_DATA;
    }
  }

  getCollegeById(id) {
    const colleges = this.getColleges();
    return colleges.find(c => c.id === id) || null;
  }

  // Update College Fee Structure (Triggered from College Portal)
  updateCollegeFees(collegeId, updatedFees) {
    const colleges = this.getColleges();
    const index = colleges.findIndex(c => c.id === collegeId);
    if (index === -1) return { success: false, error: 'College not found' };

    const oldFee = colleges[index].feeStructure.totalDayScholar;
    
    const tuition = Number(updatedFees.tuitionFee) || 0;
    const admission = Number(updatedFees.admissionFee) || 0;
    const coaching = Number(updatedFees.coachingFee) || 0;
    const labExam = Number(updatedFees.labExamFee) || 0;
    const booksUniform = Number(updatedFees.booksUniformFee) || 0;
    const totalDay = tuition + admission + coaching + labExam + booksUniform;

    colleges[index].feeStructure = {
      ...colleges[index].feeStructure,
      ...updatedFees,
      tuitionFee: tuition,
      admissionFee: admission,
      coachingFee: coaching,
      labExamFee: labExam,
      booksUniformFee: booksUniform,
      totalDayScholar: totalDay,
      hostelFeeAC: Number(updatedFees.hostelFeeAC) || 0,
      hostelFeeNonAC: Number(updatedFees.hostelFeeNonAC) || 0,
      busFeeAvg: Number(updatedFees.busFeeAvg) || 0
    };

    const now = new Date();
    colleges[index].lastUpdated = "Just now (" + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ")";

    localStorage.setItem(STORAGE_KEYS.COLLEGES, JSON.stringify(colleges));

    // Try posting to Python Backend
    fetch(BACKEND_API_BASE + '/colleges/' + collegeId + '/fees', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(colleges[index].feeStructure)
    }).catch(() => {});

    // Broadcast across tabs
    const syncPayload = {
      type: 'FEE_UPDATED',
      timestamp: Date.now(),
      collegeId: collegeId,
      collegeName: colleges[index].name,
      oldFee: oldFee,
      newFee: totalDay,
      newTuitionFee: tuition,
      updatedFeeStructure: colleges[index].feeStructure
    };

    this.broadcast(syncPayload);
    return { success: true, college: colleges[index], payload: syncPayload };
  }

  updateCollegeProfile(collegeId, profileData) {
    const colleges = this.getColleges();
    const index = colleges.findIndex(c => c.id === collegeId);
    if (index === -1) return { success: false, error: 'College not found' };

    colleges[index] = { ...colleges[index], ...profileData, lastUpdated: "Just now" };
    localStorage.setItem(STORAGE_KEYS.COLLEGES, JSON.stringify(colleges));

    const syncPayload = {
      type: 'PROFILE_UPDATED',
      timestamp: Date.now(),
      collegeId: collegeId,
      collegeName: colleges[index].name,
      updatedData: profileData
    };

    this.broadcast(syncPayload);
    return { success: true, college: colleges[index] };
  }

  addCollegePhoto(collegeId, photoUrl) {
    const colleges = this.getColleges();
    const index = colleges.findIndex(c => c.id === collegeId);
    if (index === -1) return false;

    if (!colleges[index].gallery) colleges[index].gallery = [];
    colleges[index].gallery.unshift(photoUrl);
    colleges[index].image = photoUrl;

    localStorage.setItem(STORAGE_KEYS.COLLEGES, JSON.stringify(colleges));
    this.broadcast({
      type: 'PHOTO_ADDED',
      collegeId,
      collegeName: colleges[index].name,
      photoUrl
    });
    return true;
  }

  submitInquiry(inquiryData) {
    const inquiries = this.getInquiries();
    const newInquiry = {
      id: "inq-" + Date.now(),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + ", " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "New Lead",
      ...inquiryData
    };
    inquiries.unshift(newInquiry);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));

    // Try posting to Python backend
    fetch(BACKEND_API_BASE + '/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInquiry)
    }).catch(() => {});

    this.broadcast({
      type: 'NEW_INQUIRY',
      collegeId: inquiryData.collegeId,
      inquiry: newInquiry
    });

    return newInquiry;
  }

  getInquiries(collegeId = null) {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      const list = data ? JSON.parse(data) : [];
      if (collegeId) {
        return list.filter(inq => inq.collegeId === collegeId);
      }
      return list;
    } catch (e) {
      return [];
    }
  }

  updateInquiryStatus(inquiryId, newStatus) {
    const inquiries = this.getInquiries();
    const inq = inquiries.find(i => i.id === inquiryId);
    if (inq) {
      inq.status = newStatus;
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
      
      // Try notify backend
      fetch(BACKEND_API_BASE + '/inquiries/' + inquiryId + '/status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      }).catch(() => {});

      return true;
    }
    return false;
  }

  getBookmarks() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  toggleBookmark(collegeId) {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.indexOf(collegeId);
    let added = false;
    if (index > -1) {
      bookmarks.splice(index, 1);
    } else {
      bookmarks.push(collegeId);
      added = true;
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    return { added, bookmarks };
  }

  isBookmarked(collegeId) {
    return this.getBookmarks().includes(collegeId);
  }

  getCompareList() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPARE);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  toggleCompare(collegeId) {
    const list = this.getCompareList();
    const index = list.indexOf(collegeId);
    let added = false;
    if (index > -1) {
      list.splice(index, 1);
    } else {
      if (list.length >= 4) {
        return { success: false, error: 'You can compare at most 4 colleges at a time.' };
      }
      list.push(collegeId);
      added = true;
    }
    localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(list));
    return { success: true, added, list };
  }

  isInCompare(collegeId) {
    return this.getCompareList().includes(collegeId);
  }

  broadcast(payload) {
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(payload);
      } catch (err) {}
    }
    localStorage.setItem(STORAGE_KEYS.LAST_UPDATE_EVENT, JSON.stringify(payload));
  }
}

const Store = new AppStore();
if (typeof window !== 'undefined') {
  window.Store = Store;
  document.addEventListener('DOMContentLoaded', () => {
    Theme.init();
  });
}
