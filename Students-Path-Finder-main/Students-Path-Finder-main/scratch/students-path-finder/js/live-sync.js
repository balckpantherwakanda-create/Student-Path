/**
 * Students Path Finder - Real-Time Reactive Sync Listener
 * Listens to BroadcastChannel & LocalStorage events across tabs/windows.
 * When the College Portal updates fee structures, this script flashes DOM elements,
 * updates fee numbers on open student pages, and shows animated live toast alerts!
 */

(function initLiveSync() {
  const SYNC_CHANNEL_NAME = 'students_path_finder_live_sync';

  function formatINR(amount) {
    if (!amount || amount === 0) return "Free";
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  function showLiveToast(message, collegeId) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast success';
    toast.innerHTML = `
      <div class="live-pulse-dot"></div>
      <div style="flex-grow: 1;">
        <div style="font-weight: 700; font-size: 0.85rem; color: var(--success-dark); margin-bottom: 2px;">
          ⚡ REAL-TIME FEE UPDATE BY COLLEGE
        </div>
        <div style="font-size: 0.86rem; color: var(--text-main);">
          ${message}
        </div>
      </div>
      ${collegeId ? `<a href="college-detail.html?id=${collegeId}" class="btn btn-sm btn-primary" style="padding: 0.25rem 0.6rem; font-size: 0.72rem;">View</a>` : ''}
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastSlideOut 0.35s forwards';
      setTimeout(() => toast.remove(), 350);
    }, 5500);
  }

  function showFloatingSyncPill(collegeName, newFee) {
    let pill = document.getElementById('liveSyncFloatingPill');
    if (!pill) {
      pill = document.createElement('div');
      pill.id = 'liveSyncFloatingPill';
      pill.className = 'live-broadcast-pill';
      document.body.appendChild(pill);
    }

    pill.innerHTML = `
      <div class="live-pulse-dot"></div>
      <div>
        <div style="font-size: 0.75rem; font-weight: 800; color: var(--success-dark); text-transform: uppercase;">
          LIVE DATA SYNCED
        </div>
        <div style="font-size: 0.88rem; font-weight: 600; color: var(--text-main);">
          <strong>${collegeName}</strong> revised fees to <strong>${formatINR(newFee)}</strong>
        </div>
      </div>
    `;

    pill.classList.add('active');
    setTimeout(() => {
      pill.classList.remove('active');
    }, 4500);
  }

  function handleFeeUpdate(payload) {
    const { collegeId, collegeName, newFee, newTuitionFee, updatedFeeStructure } = payload;
    console.log('[LiveSync] Received fee update:', payload);

    // 1. Show notification banner and toast
    showLiveToast(`<strong>${collegeName}</strong> updated their total fee to <strong>${formatINR(newFee)}</strong>.`, collegeId);
    showFloatingSyncPill(collegeName, newFee);

    // 2. If student is currently on colleges.html, update the fee card in place with flash animation
    const cardFeeEl = document.querySelector(`[data-college-fee-id="${collegeId}"]`);
    if (cardFeeEl) {
      cardFeeEl.innerText = formatINR(newFee);
      const parentBox = cardFeeEl.closest('.college-fee-box');
      if (parentBox) {
        parentBox.classList.remove('flash-live-sync');
        void parentBox.offsetWidth; // trigger reflow
        parentBox.classList.add('flash-live-sync');
      }
    }

    // 3. If student is on college-detail.html viewing this specific college
    if (window.location.pathname.includes('college-detail.html')) {
      const urlParams = new URLSearchParams(window.location.search);
      const currentId = urlParams.get('id');
      if (currentId === collegeId && typeof window.renderCollegeDetails === 'function') {
        window.renderCollegeDetails(); // Refresh details seamlessly
        const mainFeeBox = document.getElementById('detailMainFeeBox');
        if (mainFeeBox) {
          mainFeeBox.classList.remove('flash-live-sync');
          void mainFeeBox.offsetWidth;
          mainFeeBox.classList.add('flash-live-sync');
        }
      }
    }

    // 4. Update ticker or other cards if function exists
    if (typeof window.refreshLiveTicker === 'function') {
      window.refreshLiveTicker(collegeName, newFee);
    }
  }

  // Set up BroadcastChannel listener
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    try {
      const channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
      channel.onmessage = (event) => {
        if (event.data && event.data.type === 'FEE_UPDATED') {
          handleFeeUpdate(event.data);
        }
      };
    } catch (e) {
      console.warn('Live sync channel init failed:', e);
    }
  }

  // Fallback to storage event for older browsers or cross-process tabs
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
      if (event.key === 'spf_last_update_event' && event.newValue) {
        try {
          const payload = JSON.parse(event.newValue);
          if (payload.type === 'FEE_UPDATED') {
            handleFeeUpdate(payload);
          }
        } catch (e) {}
      }
    });
  }
})();
