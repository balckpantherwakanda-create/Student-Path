/**
 * InterFeeFinder - Core Application Logic
 * Pure JavaScript for 10th to Intermediate College & Fee Portal
 */

// Global State
const AppState = {
  bookmarks: JSON.parse(localStorage.getItem('inter_bookmarks') || '[]'),
  compareList: JSON.parse(localStorage.getItem('inter_compare') || '[]'),
  filters: {
    search: '',
    city: 'All Cities',
    stream: 'All',
    maxBudget: 250000,
    gender: 'All',
    collegeType: 'All',
    hasHostel: false,
    hasTransport: false,
    sortBy: 'recommended'
  }
};

// ==================== UTILITY FUNCTIONS ====================

// Format Currency in Indian Rupee
function formatINR(amount) {
  if (amount === 0) return "100% Free";
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

// Show Toast Message
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-check-circle';
  if (type === 'warning') icon = 'fa-exclamation-triangle';

  toast.innerHTML = `
    <i class="fas ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==================== BOOKMARK MANAGEMENT ====================
function toggleBookmark(collegeId) {
  const index = AppState.bookmarks.indexOf(collegeId);
  if (index > -1) {
    AppState.bookmarks.splice(index, 1);
    showToast('College removed from shortlisted list', 'info');
  } else {
    AppState.bookmarks.push(collegeId);
    showToast('College saved to your shortlist!', 'success');
  }
  localStorage.setItem('inter_bookmarks', JSON.stringify(AppState.bookmarks));
  updateBookmarkBadges();
  
  // Re-render if on current view
  if (typeof renderCollegesList === 'function') {
    renderCollegesList();
  }
}

function updateBookmarkBadges() {
  const countEls = document.querySelectorAll('.bookmark-count-badge');
  countEls.forEach(el => {
    el.textContent = AppState.bookmarks.length;
    el.style.display = AppState.bookmarks.length > 0 ? 'inline-flex' : 'none';
  });
}

// ==================== COMPARISON DOCK MANAGEMENT ====================
function toggleCompare(collegeId) {
  const index = AppState.compareList.indexOf(collegeId);
  if (index > -1) {
    AppState.compareList.splice(index, 1);
    showToast('College removed from comparison', 'info');
  } else {
    if (AppState.compareList.length >= 3) {
      showToast('You can compare maximum 3 colleges at once!', 'warning');
      return false;
    }
    AppState.compareList.push(collegeId);
    showToast('Added to comparison dock!', 'success');
  }
  localStorage.setItem('inter_compare', JSON.stringify(AppState.compareList));
  renderCompareDock();
  return true;
}

function removeFromCompare(collegeId) {
  AppState.compareList = AppState.compareList.filter(id => id !== collegeId);
  localStorage.setItem('inter_compare', JSON.stringify(AppState.compareList));
  renderCompareDock();
  if (typeof renderCompareMatrix === 'function') {
    renderCompareMatrix();
  }
  if (typeof renderCollegesList === 'function') {
    renderCollegesList();
  }
}

function renderCompareDock() {
  let dock = document.getElementById('compareFloatingDock');
  if (!dock) {
    dock = document.createElement('div');
    dock.id = 'compareFloatingDock';
    dock.className = 'compare-floating-dock';
    document.body.appendChild(dock);
  }

  if (AppState.compareList.length === 0) {
    dock.classList.remove('show');
    return;
  }

  dock.classList.add('show');
  const selectedColleges = COLLEGES_DATA.filter(c => AppState.compareList.includes(c.id));

  dock.innerHTML = `
    <div style="font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
      <i class="fas fa-columns" style="color: #38bdf8;"></i>
      Compare (${selectedColleges.length}/3):
    </div>
    <div class="compare-dock-colleges">
      ${selectedColleges.map(c => `
        <div class="compare-chip">
          <span>${c.name.split(' ')[0]} (${c.branch.split(' ')[0]})</span>
          <button onclick="removeFromCompare('${c.id}')"><i class="fas fa-times"></i></button>
        </div>
      `).join('')}
    </div>
    <div style="display: flex; gap: 10px;">
      <a href="compare.html" class="btn btn-sm btn-primary" style="padding: 6px 14px; font-size: 0.85rem;">
        Compare Now <i class="fas fa-arrow-right"></i>
      </a>
      <button onclick="clearCompareList()" class="btn btn-sm btn-outline" style="background: rgba(255,255,255,0.1); color:#fff; border:none;">
        Clear
      </button>
    </div>
  `;
}

function clearCompareList() {
  AppState.compareList = [];
  localStorage.setItem('inter_compare', JSON.stringify([]));
  renderCompareDock();
  if (typeof renderCompareMatrix === 'function') {
    renderCompareMatrix();
  }
  if (typeof renderCollegesList === 'function') {
    renderCollegesList();
  }
  showToast('Comparison cleared', 'info');
}

// ==================== TRAVEL SAVINGS CALCULATOR ====================
function calculateTravelSavings(collegesCount = 6, costPerVisit = 450, hoursPerVisit = 4) {
  const totalMoneySaved = collegesCount * costPerVisit;
  const totalHoursSaved = collegesCount * hoursPerVisit;
  const carbonFootprintSaved = (collegesCount * 12).toFixed(1); // approx kg CO2 saved

  return {
    money: totalMoneySaved,
    hours: totalHoursSaved,
    carbon: carbonFootprintSaved
  };
}

function updateHeroSavingsWidget(count) {
  const savings = calculateTravelSavings(count);
  
  const moneyEl = document.getElementById('heroSavedMoney');
  const hoursEl = document.getElementById('heroSavedHours');
  const countLabelEl = document.getElementById('heroCollegesCountLabel');

  if (moneyEl) moneyEl.textContent = `₹${savings.money.toLocaleString('en-IN')}`;
  if (hoursEl) hoursEl.textContent = `${savings.hours} Hours`;
  if (countLabelEl) countLabelEl.textContent = `${count} Colleges`;
}

// ==================== SCHOLARSHIP CALCULATOR ====================
function calculateScholarship(college, gpaOrPercent) {
  const score = parseFloat(gpaOrPercent) || 0;
  if (!college.scholarships || college.scholarships.length === 0) {
    return { discountPercent: 0, discountAmount: 0, netTuition: college.feeStructure.tuitionFee, desc: "Standard Fee" };
  }

  // Find matching bracket
  let matched = null;
  for (let s of college.scholarships) {
    if (score >= s.minGPA) {
      matched = s;
      break;
    }
  }

  if (matched) {
    const discountAmount = (college.feeStructure.tuitionFee * matched.concessionPercentage) / 100;
    const netTuition = college.feeStructure.tuitionFee - discountAmount;
    return {
      discountPercent: matched.concessionPercentage,
      discountAmount: discountAmount,
      netTuition: netTuition,
      desc: matched.desc
    };
  }

  return {
    discountPercent: 0,
    discountAmount: 0,
    netTuition: college.feeStructure.tuitionFee,
    desc: "Score below scholarship bracket - Standard Fee applies"
  };
}

// ==================== COLLEGE CARD RENDERER ====================
function createCollegeCardHTML(college) {
  const isBookmarked = AppState.bookmarks.includes(college.id);
  const isCompared = AppState.compareList.includes(college.id);
  const fee = college.feeStructure.totalDayScholar;

  return `
    <div class="college-card" id="card-${college.id}">
      <div class="card-image-wrap">
        <img src="${college.image}" alt="${college.name}" loading="lazy" />
        <div class="card-tags">
          <span class="badge ${fee === 0 ? 'badge-success' : 'badge-primary'}">
            ${fee === 0 ? '🎉 100% FREE GOVT' : (college.tag || 'Verified Campus')}
          </span>
          <span class="badge badge-dark">
            <i class="fas fa-venus-mars"></i> ${college.gender}
          </span>
        </div>
        <button class="card-bookmark-btn ${isBookmarked ? 'active' : ''}" 
                onclick="toggleBookmark('${college.id}')" 
                title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark College'}">
          <i class="${isBookmarked ? 'fas fa-heart' : 'far fa-heart'}"></i>
        </button>
      </div>

      <div class="card-body">
        <div class="card-header-row">
          <div>
            <a href="college-detail.html?id=${college.id}" class="college-name">${college.name}</a>
            <div style="font-size: 0.85rem; color: var(--primary); font-weight: 600;">${college.branch}</div>
          </div>
          <div style="text-align: right;">
            <span class="badge badge-warning" style="font-size: 0.85rem;">
              <i class="fas fa-star" style="color: #d97706;"></i> ${college.rating}
            </span>
            <div style="font-size: 0.72rem; color: var(--gray-500); margin-top: 2px;">(${college.reviewCount} reviews)</div>
          </div>
        </div>

        <div class="college-location">
          <i class="fas fa-map-marker-alt" style="color: var(--danger);"></i>
          <span>${college.city}, ${college.state}</span>
          <span>•</span>
          <span>Est. ${college.established}</span>
        </div>

        <div class="stream-chips">
          ${college.streams.map(s => `<span class="stream-chip">${s}</span>`).join('')}
        </div>

        <div class="fee-highlight-box">
          <div class="fee-row">
            <div>
              <div class="fee-label">Total Day Scholar Fee / Year</div>
              <div class="fee-amount ${fee === 0 ? 'free' : ''}">${formatINR(fee)}</div>
            </div>
            <div style="text-align: right;">
              <div class="fee-label">Tuition Only</div>
              <div style="font-weight: 700; font-size: 1rem; color: var(--gray-700);">${formatINR(college.feeStructure.tuitionFee)}</div>
            </div>
          </div>
          ${college.feeStructure.hostelFeeNonAC > 0 ? `
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px dashed var(--gray-300); display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--gray-600);">
              <span><i class="fas fa-bed"></i> Hostel from:</span>
              <span style="font-weight: 700;">${formatINR(college.feeStructure.hostelFeeNonAC)}/yr</span>
            </div>
          ` : `
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px dashed var(--gray-300); font-size: 0.8rem; color: var(--secondary); font-weight: 600;">
              <i class="fas fa-check-circle"></i> ${fee === 0 ? 'Free Hostel & Bus Pass' : 'Day Scholar Focused Campus'}
            </div>
          `}
        </div>

        <ul class="card-features-list">
          ${college.coachingOffered.slice(0, 2).map(c => `
            <li><i class="fas fa-graduation-cap" style="color: var(--primary);"></i> ${c}</li>
          `).join('')}
          <li><i class="fas fa-check"></i> ${college.facilities[0]}</li>
        </ul>

        <div class="card-footer-actions">
          <label class="compare-checkbox-label">
            <input type="checkbox" ${isCompared ? 'checked' : ''} onchange="toggleCompare('${college.id}')">
            <span>Compare</span>
          </label>
          
          <div style="display: flex; gap: 8px; margin-left: auto;">
            <button onclick="openEnquiryModal('${college.id}')" class="btn btn-sm btn-outline-primary" title="Request Call">
              <i class="fas fa-phone-alt"></i> Enquiry
            </button>
            <a href="college-detail.html?id=${college.id}" class="btn btn-sm btn-primary">
              View Fees <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ==================== ENQUIRY & CALLBACK MODAL ====================
function openEnquiryModal(collegeId) {
  const college = COLLEGES_DATA.find(c => c.id === collegeId) || COLLEGES_DATA[0];
  
  let modal = document.getElementById('enquiryModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'enquiryModal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <div>
          <h3 style="font-size: 1.25rem;">Direct Fee & Admission Enquiry</h3>
          <p style="font-size: 0.85rem; color: var(--gray-500);">${college.name} - ${college.branch}</p>
        </div>
        <button class="modal-close-btn" onclick="closeModal('enquiryModal')">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <div style="background: var(--primary-light); padding: 12px 16px; border-radius: var(--radius-md); margin-bottom: 20px; font-size: 0.85rem; color: var(--primary-dark);">
          <i class="fas fa-shield-alt"></i> <strong>Travel-Free Guarantee:</strong> Get official fee prospectus, installment breakdown, and scholarship evaluation directly to your phone/email.
        </div>

        <form id="enquiryForm" onsubmit="handleEnquirySubmit(event, '${college.id}')">
          <div class="form-group">
            <label>Student / Parent Full Name *</label>
            <input type="text" id="enqName" required placeholder="e.g. Rahul Sharma / S. Sharma" />
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="form-group">
              <label>Phone / WhatsApp Number *</label>
              <input type="tel" id="enqPhone" required placeholder="e.g. 9876543210" />
            </div>
            <div class="form-group">
              <label>10th Class GPA / Marks (%)</label>
              <input type="number" step="0.1" max="10" min="4" id="enqGPA" placeholder="e.g. 9.8 GPA or 95%" />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="form-group">
              <label>Preferred Intermediate Stream *</label>
              <select id="enqStream" required>
                ${college.streams.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label>Accommodation Needed?</label>
              <select id="enqHostel">
                <option value="Day Scholar">Day Scholar (Local Bus)</option>
                <option value="Hostel AC">Hostel (AC Room)</option>
                <option value="Hostel Non-AC">Hostel (Non-AC)</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Any Specific Questions (Coaching, Installments, Discount)?</label>
            <textarea id="enqMsg" rows="3" placeholder="e.g. Please share details of IIT JEE batch timings and scholarship criteria..."></textarea>
          </div>

          <div style="display: flex; gap: 12px; margin-top: 24px;">
            <button type="submit" class="btn btn-primary" style="flex: 1;">
              <i class="fas fa-paper-plane"></i> Send Enquiry & Get Quote
            </button>
            <button type="button" onclick="closeModal('enquiryModal')" class="btn btn-outline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function handleEnquirySubmit(event, collegeId) {
  event.preventDefault();
  const college = COLLEGES_DATA.find(c => c.id === collegeId);
  const name = document.getElementById('enqName').value;
  const phone = document.getElementById('enqPhone').value;
  const stream = document.getElementById('enqStream').value;
  const gpa = document.getElementById('enqGPA').value || '10.0';

  closeModal('enquiryModal');
  showToast(`Enquiry sent to ${college.name}! College counselor will call ${phone} shortly.`, 'success');

  // Simulated instant Fee Prospectus download notification
  setTimeout(() => {
    showToast(`Official Fee Breakdown PDF for ${stream} stream is ready to download!`, 'info');
  }, 1500);
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  updateBookmarkBadges();
  renderCompareDock();
  
  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show-mobile');
    });
  }
});
