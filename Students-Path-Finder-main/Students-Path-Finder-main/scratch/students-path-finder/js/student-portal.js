/**
 * Students Path Finder - Student Portal UI Controller
 * Handles college exploration, filtering, detail views, scholarship calculations,
 * comparison matrix, bookmarks, and admission inquiry modals.
 */

// Format INR Currency
function formatINR(amount) {
  if (amount === 0 || amount === '0') return "100% Free / Govt RTF";
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

// Show Toast
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-check-circle';
  if (type === 'warning') icon = 'fa-exclamation-triangle';
  if (type === 'danger') icon = 'fa-times-circle';

  toast.innerHTML = `
    <i class="fas ${icon}"></i>
    <div>${message}</div>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastSlideOut 0.35s forwards';
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

// Render College Card HTML
function createCollegeCardHtml(college) {
  const isBookmarked = Store.isBookmarked(college.id);
  const isInCompare = Store.isInCompare(college.id);
  const fee = college.feeStructure.totalDayScholar;
  const tuition = college.feeStructure.tuitionFee;

  return `
    <div class="college-card fade-in-up" data-college-id="${college.id}">
      <div class="college-card-media">
        <img src="${college.image}" alt="${college.name}" loading="lazy">
        <div class="media-badges-top">
          <span class="badge badge-dark">
            <i class="fas fa-certificate text-warning"></i> ${college.code}
          </span>
          <button class="bookmark-toggle-btn ${isBookmarked ? 'active' : ''}" 
                  onclick="handleBookmarkToggle('${college.id}', this)" 
                  title="${isBookmarked ? 'Remove Bookmark' : 'Shortlist College'}">
            <i class="${isBookmarked ? 'fas fa-heart' : 'far fa-heart'}"></i>
          </button>
        </div>
        <div class="media-badges-bottom">
          <span class="badge badge-success">
            <i class="fas fa-star text-warning"></i> ${college.rating} (${college.reviewCount})
          </span>
          <span style="font-size: 0.78rem; font-weight: 600; background: rgba(0,0,0,0.6); padding: 0.15rem 0.5rem; border-radius: var(--radius-sm);">
            <i class="fas fa-camera"></i> ${college.gallery ? college.gallery.length : 1} Photos
          </span>
        </div>
      </div>

      <div class="college-card-body">
        <div class="college-header-meta">
          <span class="badge badge-primary">${college.type.split('/')[0]}</span>
          <span class="badge badge-outline">${college.gender}</span>
        </div>

        <h3 class="college-card-title">
          <a href="college-detail.html?id=${college.id}">${college.name}</a>
        </h3>

        <div class="college-location">
          <i class="fas fa-map-marker-alt text-primary"></i>
          <span>${college.branch}, ${college.city}</span>
        </div>

        <div class="streams-chips-row">
          ${college.streams.slice(0, 3).map(s => `<span class="badge badge-purple" style="font-size: 0.68rem;">${s.split(' ')[0]}</span>`).join('')}
          ${college.streams.length > 3 ? `<span class="badge badge-outline" style="font-size: 0.68rem;">+${college.streams.length - 3} more</span>` : ''}
        </div>

        <!-- Live Fee Box -->
        <div class="college-fee-box">
          <div class="college-fee-header">
            <span>Verified Annual Fee</span>
            <span class="badge badge-success" style="font-size: 0.65rem;">
              <i class="fas fa-check-circle"></i> Direct From College
            </span>
          </div>
          <div class="college-fee-amount" data-college-fee-id="${college.id}">
            ${formatINR(fee)}
            <span class="college-fee-sub">/ year (Day Scholar)</span>
          </div>
          <div class="college-fee-meta">
            <span>Tuition: <strong>${formatINR(tuition)}</strong></span>
            <span>Hostel Non-AC: <strong>${formatINR(college.feeStructure.hostelFeeNonAC)}</strong></span>
          </div>
        </div>

        <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.5rem;">
          <i class="fas fa-history text-primary"></i> Fee Verified: ${college.lastUpdated || 'Recently'}
        </div>
      </div>

      <div class="college-card-footer">
        <label style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; cursor: pointer;">
          <input type="checkbox" onchange="handleCompareToggle('${college.id}', this)" ${isInCompare ? 'checked' : ''}>
          <span>Compare</span>
        </label>
        <div style="display: flex; gap: 0.5rem;">
          <button onclick="openInquiryModal('${college.id}')" class="btn btn-outline-primary btn-sm">
            <i class="fas fa-paper-plane"></i> Inquire
          </button>
          <a href="college-detail.html?id=${college.id}" class="btn btn-primary btn-sm">
            Details <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  `;
}

// Handle Bookmark Toggle
function handleBookmarkToggle(collegeId, buttonEl) {
  const res = Store.toggleBookmark(collegeId);
  if (res.added) {
    buttonEl.classList.add('active');
    buttonEl.innerHTML = '<i class="fas fa-heart"></i>';
    showToast('Saved to your shortlisted colleges!', 'success');
  } else {
    buttonEl.classList.remove('active');
    buttonEl.innerHTML = '<i class="far fa-heart"></i>';
    showToast('Removed from shortlist', 'info');
  }
  updateBookmarkNavBadge();
}

// Handle Compare Toggle
function handleCompareToggle(collegeId, checkboxEl) {
  const res = Store.toggleCompare(collegeId);
  if (!res.success) {
    checkboxEl.checked = false;
    showToast(res.error, 'warning');
    return;
  }
  if (res.added) {
    showToast('Added to comparison matrix (' + res.list.length + '/4)', 'success');
  } else {
    showToast('Removed from comparison', 'info');
  }
  updateCompareNavBadge();
}

// Update Nav Badges
function updateBookmarkNavBadge() {
  const badges = document.querySelectorAll('.bookmark-badge-count');
  const count = Store.getBookmarks().length;
  badges.forEach(b => {
    b.innerText = count;
    b.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

function updateCompareNavBadge() {
  const badges = document.querySelectorAll('.compare-badge-count');
  const count = Store.getCompareList().length;
  badges.forEach(b => {
    b.innerText = count;
    b.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

// Inquiry Modal Handler
function openInquiryModal(collegeId) {
  const college = Store.getCollegeById(collegeId);
  if (!college) return;

  const modalEl = document.getElementById('inquiryModal');
  if (!modalEl) return;

  document.getElementById('inquiryCollegeId').value = college.id;
  document.getElementById('inquiryCollegeNameDisplay').innerText = college.name + ' (' + college.branch + ')';
  
  // Populate streams dropdown
  const streamSelect = document.getElementById('inquiryStream');
  if (streamSelect) {
    streamSelect.innerHTML = college.streams.map(s => `<option value="${s}">${s}</option>`).join('');
  }

  // Pre-fill user details if logged in
  const user = Auth.getCurrentUser();
  if (user) {
    if (document.getElementById('inquiryStudentName') && user.name) {
      document.getElementById('inquiryStudentName').value = user.name;
    }
    if (document.getElementById('inquiryEmail') && user.email) {
      document.getElementById('inquiryEmail').value = user.email;
    }
    if (document.getElementById('inquiryPhone') && user.phone) {
      document.getElementById('inquiryPhone').value = user.phone;
    }
    if (document.getElementById('inquiryGPA') && user.tenthGPA) {
      document.getElementById('inquiryGPA').value = user.tenthGPA;
    }
  }

  modalEl.classList.add('active');
}

function closeInquiryModal() {
  const modalEl = document.getElementById('inquiryModal');
  if (modalEl) modalEl.classList.remove('active');
}

// Submit Inquiry Form
function handleInquiryFormSubmit(e) {
  e.preventDefault();
  const collegeId = document.getElementById('inquiryCollegeId').value;
  const college = Store.getCollegeById(collegeId);

  const inquiryData = {
    collegeId: collegeId,
    collegeName: college ? college.name : 'Unknown College',
    studentName: document.getElementById('inquiryStudentName').value,
    phone: document.getElementById('inquiryPhone').value,
    email: document.getElementById('inquiryEmail').value,
    tenthGPA: document.getElementById('inquiryGPA').value,
    interestedStream: document.getElementById('inquiryStream').value,
    residentialPreference: document.getElementById('inquiryResPreference').value,
    message: document.getElementById('inquiryMessage').value || 'Requested callback for fee details & campus visit.'
  };

  Store.submitInquiry(inquiryData);
  closeInquiryModal();
  showToast('Inquiry sent successfully to ' + (college ? college.name : 'college') + '! The admission office will call you.', 'success');
}

// Initialize Global UI Listeners
document.addEventListener('DOMContentLoaded', () => {
  updateBookmarkNavBadge();
  updateCompareNavBadge();

  // Close modals on clicking outside or close button
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });

  const inquiryForm = document.getElementById('inquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', handleInquiryFormSubmit);
  }
});
