function showLogoutPopup(logoutCallback) {
  // Prevent multiple popups
  if (document.getElementById('logoutPopupOverlay')) return;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'logoutPopupOverlay';
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,50,150,0.5); display: flex; justify-content: center;
    align-items: center; z-index: 10000;
  `;

  // Create popup box
  const popup = document.createElement('div');
  popup.style.cssText = `
    background-color: #1e3a8a; color: white; padding: 30px 40px;
    border-radius: 12px; text-align: center; box-shadow: 0 0 20px rgba(0,0,0,0.3);
    max-width: 350px; width: 90%; animation: fadeIn 0.3s ease-out;
  `;
  popup.innerHTML = `
    <h2>Confirm Logout</h2>
    <p>Are you sure you want to log out?</p>
    <div style="margin-top:20px; display:flex; justify-content:space-around;">
      <button id="logoutConfirmBtn" style="
        padding:10px 20px; border:none; border-radius:8px;
        background-color:#3b82f6; color:white; font-weight:bold; cursor:pointer;
      ">Yes</button>
      <button id="logoutCancelBtn" style="
        padding:10px 20px; border:none; border-radius:8px;
        background-color:#f87171; color:white; font-weight:bold; cursor:pointer;
      ">No</button>
    </div>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  // Add fade-in animation style
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeIn {
      from {opacity:0; transform:scale(0.8);}
      to {opacity:1; transform:scale(1);}
    }
  `;
  document.head.appendChild(style);

  // Button events
  document.getElementById('logoutConfirmBtn').addEventListener('click', () => {
    overlay.remove();
    logoutCallback();
  });

  document.getElementById('logoutCancelBtn').addEventListener('click', () => {
    overlay.remove();
  });

  // Close when clicking outside popup
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

// Attach popup to all logout buttons with ID 'sidebarLogoutBtn'
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('sidebarLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault(); // prevent default navigation
      showLogoutPopup(() => {
        // Redirect to login page or logout logic
        window.location.href = 'index.html'; // change to your actual login page
      });
    });
  }
});