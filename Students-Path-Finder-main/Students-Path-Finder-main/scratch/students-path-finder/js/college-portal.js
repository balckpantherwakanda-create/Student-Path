/**
 * Students Path Finder - College Partner & Administration Portal Controller
 * Powers college-dashboard.html
 * Fixes fee calculations, live calculated preview, and synchronizes updates live.
 */

let activeCollege = null;

// Safe INR formatter fallback
const getFormattedINR = (val) => {
  if (typeof window.formatINR === 'function') return window.formatINR(val);
  const num = Number(val);
  if (isNaN(num) || num === 0) return "Free";
  return '₹' + num.toLocaleString('en-IN');
};

function initCollegeDashboard() {
  const user = Auth.getCurrentUser();
  if (!user || user.role !== 'college_admin') {
    Auth.loginCollege('admin@srichaitanya.edu', 'SCJC-HYD-01', 'college123');
  }

  const currentUser = Auth.getCurrentUser();
  activeCollege = Store.getCollegeById(currentUser.collegeId) || Store.getColleges()[0];

  renderDashboardHeader();
  renderDashboardStats();
  populateFeeEditor();
  renderInquiriesList();
  renderGalleryManager();
  setupFeeEditorEvents();
}

function renderDashboardHeader() {
  const nameEl = document.getElementById('dashCollegeName');
  const codeEl = document.getElementById('dashCollegeCode');
  const branchEl = document.getElementById('dashCollegeBranch');
  const lastSyncEl = document.getElementById('dashLastSync');

  if (nameEl) nameEl.innerText = activeCollege.name;
  if (codeEl) codeEl.innerText = activeCollege.code;
  if (branchEl) branchEl.innerText = activeCollege.branch + ', ' + activeCollege.city;
  if (lastSyncEl) lastSyncEl.innerText = activeCollege.lastUpdated || 'Live Sync Active';

  const switcher = document.getElementById('collegeSwitcherSelect');
  if (switcher) {
    const allColleges = Store.getColleges();
    switcher.innerHTML = allColleges.map(c => 
      `<option value="${c.id}" ${c.id === activeCollege.id ? 'selected' : ''}>${c.name} (${c.city})</option>`
    ).join('');

    switcher.onchange = (e) => {
      activeCollege = Store.getCollegeById(e.target.value);
      const user = Auth.getCurrentUser() || {};
      user.collegeId = activeCollege.id;
      user.collegeName = activeCollege.name;
      user.collegeCode = activeCollege.code;
      localStorage.setItem('spf_current_user', JSON.stringify(user));
      
      renderDashboardHeader();
      renderDashboardStats();
      populateFeeEditor();
      renderInquiriesList();
      renderGalleryManager();
      if (typeof showToast === 'function') {
        showToast('Switched to ' + activeCollege.name, 'info');
      }
    };
  }
}

function renderDashboardStats() {
  const inquiries = Store.getInquiries(activeCollege.id);
  const totalInquiriesEl = document.getElementById('statTotalInquiries');
  const newLeadsEl = document.getElementById('statNewLeads');
  const currentTotalFeeEl = document.getElementById('statCurrentTotalFee');
  const currentTuitionEl = document.getElementById('statCurrentTuition');

  if (totalInquiriesEl) totalInquiriesEl.innerText = inquiries.length;
  if (newLeadsEl) newLeadsEl.innerText = inquiries.filter(i => i.status === 'New Lead').length;
  if (currentTotalFeeEl) currentTotalFeeEl.innerText = getFormattedINR(activeCollege.feeStructure.totalDayScholar);
  if (currentTuitionEl) currentTuitionEl.innerText = getFormattedINR(activeCollege.feeStructure.tuitionFee);
}

function populateFeeEditor() {
  const fees = activeCollege.feeStructure || {};
  document.getElementById('inputTuition').value = fees.tuitionFee || 0;
  document.getElementById('inputAdmission').value = fees.admissionFee || 0;
  document.getElementById('inputCoaching').value = fees.coachingFee || 0;
  document.getElementById('inputLabExam').value = fees.labExamFee || 0;
  document.getElementById('inputBooks').value = fees.booksUniformFee || 0;
  document.getElementById('inputHostelAC').value = fees.hostelFeeAC || 0;
  document.getElementById('inputHostelNonAC').value = fees.hostelFeeNonAC || 0;
  document.getElementById('inputBusFee').value = fees.busFeeAvg || 0;
  document.getElementById('inputInstallments').value = fees.installmentsAllowed || 2;
  document.getElementById('inputInstallmentPlan').value = fees.installmentPlan || '';

  // Calculate live preview immediately
  updateFeeLivePreview();
}

function updateFeeLivePreview() {
  const tuition = Number(document.getElementById('inputTuition').value) || 0;
  const admission = Number(document.getElementById('inputAdmission').value) || 0;
  const coaching = Number(document.getElementById('inputCoaching').value) || 0;
  const lab = Number(document.getElementById('inputLabExam').value) || 0;
  const books = Number(document.getElementById('inputBooks').value) || 0;
  
  const total = tuition + admission + coaching + lab + books;

  const previewEl = document.getElementById('previewTotalFee');
  if (previewEl) {
    previewEl.innerText = getFormattedINR(total);
    previewEl.style.transition = 'color 0.2s ease, transform 0.2s ease';
    previewEl.style.transform = 'scale(1.05)';
    setTimeout(() => { previewEl.style.transform = 'scale(1)'; }, 150);
  }
}

function setupFeeEditorEvents() {
  const feeInputs = document.querySelectorAll('.fee-calc-input');
  feeInputs.forEach(input => {
    input.addEventListener('input', updateFeeLivePreview);
    input.addEventListener('change', updateFeeLivePreview);
    input.addEventListener('keyup', updateFeeLivePreview);
  });

  const form = document.getElementById('feeEditorForm');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      publishFeeChanges();
    };
  }
}

function publishFeeChanges() {
  const updatedFees = {
    tuitionFee: Number(document.getElementById('inputTuition').value) || 0,
    admissionFee: Number(document.getElementById('inputAdmission').value) || 0,
    coachingFee: Number(document.getElementById('inputCoaching').value) || 0,
    labExamFee: Number(document.getElementById('inputLabExam').value) || 0,
    booksUniformFee: Number(document.getElementById('inputBooks').value) || 0,
    hostelFeeAC: Number(document.getElementById('inputHostelAC').value) || 0,
    hostelFeeNonAC: Number(document.getElementById('inputHostelNonAC').value) || 0,
    busFeeAvg: Number(document.getElementById('inputBusFee').value) || 0,
    installmentsAllowed: Number(document.getElementById('inputInstallments').value) || 2,
    installmentPlan: document.getElementById('inputInstallmentPlan').value
  };

  const res = Store.updateCollegeFees(activeCollege.id, updatedFees);
  if (res.success) {
    activeCollege = res.college;
    renderDashboardStats();
    renderDashboardHeader();
    updateFeeLivePreview();

    if (typeof showToast === 'function') {
      showToast('Fee structure updated & broadcasted LIVE to student website!', 'success');
    }

    const btn = document.getElementById('btnPublishFees');
    if (btn) {
      const origHtml = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check-circle"></i> Broadcasted Live!';
      btn.classList.add('btn-success');
      setTimeout(() => {
        btn.innerHTML = origHtml;
        btn.classList.remove('btn-success');
      }, 3000);
    }
  } else {
    if (typeof showToast === 'function') {
      showToast('Failed to update fees: ' + res.error, 'danger');
    }
  }
}

function renderInquiriesList() {
  const container = document.getElementById('inquiriesTableBody');
  if (!container) return;

  const inquiries = Store.getInquiries(activeCollege.id);
  if (inquiries.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
          <i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
          No student inquiries received yet.
        </td>
      </tr>
    `;
    return;
  }

  container.innerHTML = inquiries.map(inq => {
    let badgeClass = 'badge-primary';
    if (inq.status === 'New Lead') badgeClass = 'badge-accent';
    if (inq.status === 'Contacted') badgeClass = 'badge-purple';
    if (inq.status === 'Enrolled') badgeClass = 'badge-success';

    return `
      <tr>
        <td>
          <div style="font-weight: 700; color: var(--text-main);">${inq.studentName}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">${inq.date}</div>
        </td>
        <td>
          <div style="font-size: 0.88rem; font-weight: 600;"><i class="fas fa-phone text-primary"></i> ${inq.phone}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">${inq.email || 'N/A'}</div>
        </td>
        <td>
          <span class="badge badge-success" style="font-size: 0.82rem;">${inq.tenthGPA} GPA</span>
        </td>
        <td>
          <div style="font-weight: 600; font-size: 0.85rem;">${inq.interestedStream}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">${inq.residentialPreference || 'Day Scholar'}</div>
        </td>
        <td>
          <span class="badge ${badgeClass}">${inq.status}</span>
        </td>
        <td>
          <select class="form-control" style="padding: 0.25rem 0.5rem; font-size: 0.78rem;" 
                  onchange="handleInquiryStatusChange('${inq.id}', this.value)">
            <option value="New Lead" ${inq.status === 'New Lead' ? 'selected' : ''}>New Lead</option>
            <option value="Contacted" ${inq.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
            <option value="Campus Visit Scheduled" ${inq.status === 'Campus Visit Scheduled' ? 'selected' : ''}>Campus Visit</option>
            <option value="Enrolled" ${inq.status === 'Enrolled' ? 'selected' : ''}>Enrolled</option>
          </select>
        </td>
      </tr>
    `;
  }).join('');
}

function handleInquiryStatusChange(inquiryId, newStatus) {
  Store.updateInquiryStatus(inquiryId, newStatus);
  renderDashboardStats();
  renderInquiriesList();
  if (typeof showToast === 'function') {
    showToast('Inquiry status updated to ' + newStatus, 'success');
  }
}

function renderGalleryManager() {
  const container = document.getElementById('dashboardGalleryGrid');
  if (!container) return;

  const gallery = activeCollege.gallery || [];
  container.innerHTML = gallery.map((imgUrl, index) => `
    <div style="position: relative; border-radius: var(--radius-md); overflow: hidden; height: 110px; background: #0f172a;">
      <img src="${imgUrl}" style="width: 100%; height: 100%; object-fit: cover;">
      <span style="position: absolute; top: 0.35rem; left: 0.35rem; background: rgba(0,0,0,0.7); color: white; font-size: 0.65rem; padding: 0.15rem 0.4rem; border-radius: 4px;">
        Photo ${index + 1}
      </span>
    </div>
  `).join('');
}

function handleAddPhotoSubmit(e) {
  e.preventDefault();
  const urlInput = document.getElementById('inputPhotoUrl');
  if (!urlInput || !urlInput.value.trim()) return;

  Store.addCollegePhoto(activeCollege.id, urlInput.value.trim());
  activeCollege = Store.getCollegeById(activeCollege.id);
  urlInput.value = '';
  renderGalleryManager();
  if (typeof showToast === 'function') {
    showToast('Campus photo added to gallery!', 'success');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('feeEditorForm')) {
    initCollegeDashboard();
    const photoForm = document.getElementById('addPhotoForm');
    if (photoForm) {
      photoForm.addEventListener('submit', handleAddPhotoSubmit);
    }
  }
});
