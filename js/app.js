// ==========================================================================
// PORTFOLIO APPLICATION LOGIC - ANDROID 16 / MATERIAL YOU HUB
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const htmlEl = document.documentElement;
  
  // --- UI Elements ---
  const themeModeToggle = document.getElementById("theme-mode-toggle");
  const linksStack = document.getElementById("links-stack");
  const shareProfileBtn = document.getElementById("share-profile-btn");
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");


  // Sun and Moon SVGs for theme mode switcher
  const sunIcon = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  // ==========================================
  // 1. Ripple Effect Generator
  // ==========================================
  document.body.addEventListener("mousedown", (e) => {
    const target = e.target.closest(".ripple-target");
    if (!target) return;

    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    const existing = target.querySelectorAll(".ripple");
    existing.forEach((r) => r.remove());

    target.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });

  // ==========================================
  // 2. Light & Dark Mode Toggle
  // ==========================================
  const currentMode = localStorage.getItem("pm-hub-mode") || "dark";
  setThemeMode(currentMode);

  if (themeModeToggle) {
    themeModeToggle.addEventListener("click", () => {
      const activeMode = htmlEl.getAttribute("data-mode");
      const nextMode = activeMode === "dark" ? "light" : "dark";
      setThemeMode(nextMode);
    });
  }

  function setThemeMode(mode) {
    htmlEl.setAttribute("data-mode", mode);
    localStorage.setItem("pm-hub-mode", mode);
    
    if (themeModeToggle) {
      themeModeToggle.innerHTML = mode === "dark" ? sunIcon : moonIcon;
    }
  }

  // ==========================================
  // 3. Render Social Links (using SVG files)
  // ==========================================
  async function renderLinks() {
    if (!linksStack) return;
    linksStack.innerHTML = "";

    const arrowSvg = `<svg class="link-arrow" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

    for (const link of linksData) {
      const linkCard = document.createElement("a");
      linkCard.href = link.url;
      linkCard.target = link.url.startsWith("mailto:") ? "_self" : "_blank";
      linkCard.className = "card card-filled link-row ripple-target";
      linkCard.setAttribute("aria-label", `Link to ${link.title}`);
      
      let svgContent = "";
      try {
        const response = await fetch(link.icon);
        if (response.ok) {
          svgContent = await response.text();
        } else {
          svgContent = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>`;
        }
      } catch (err) {
        console.error("Failed to load icon from " + link.icon, err);
        svgContent = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>`;
      }
      
      linkCard.innerHTML = `
        <div class="link-icon-wrapper">
          ${svgContent}
        </div>
        <div class="link-details">
          <h3 class="link-title">${link.title}</h3>
          <p class="link-subtitle">${link.subtitle}</p>
        </div>
        ${arrowSvg}
      `;
      
      linksStack.appendChild(linkCard);
    }
  }

  renderLinks();

  // ==========================================
  // 4. Discord presence integration via Lanyard API
  // ==========================================
  const discordId = "905478198266069004";
  
  async function fetchDiscordStatus() {
    const statusTextEl = document.getElementById("discord-status-text");
    const statusDotEl = document.getElementById("discord-status-dot");
    const statusBadgeEl = document.getElementById("discord-status-badge");
    
    if (!statusTextEl || !statusDotEl || !statusBadgeEl) return;
    
    try {
      const response = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          const status = json.data.discord_status;
          
          // Clear classes
          statusDotEl.className = "pulse-dot";
          
          if (status === "online") {
            statusTextEl.textContent = "Online";
            statusDotEl.classList.add("status-online");
          } else if (status === "idle") {
            statusTextEl.textContent = "Away";
            statusDotEl.classList.add("status-idle");
          } else if (status === "dnd") {
            statusTextEl.textContent = "Do Not Disturb";
            statusDotEl.classList.add("status-dnd");
          } else {
            statusTextEl.textContent = "Offline";
            statusDotEl.classList.add("status-offline");
          }
        }
      }
    } catch (err) {
      console.error("Failed to fetch Discord status from Lanyard", err);
      // Graceful fallback
      statusTextEl.textContent = "Online";
      statusDotEl.className = "pulse-dot status-online";
    }
  }

  fetchDiscordStatus();
  setInterval(fetchDiscordStatus, 15000); // Poll status every 15 seconds

  // ==========================================
  // 5. Share Profile Clipboard Copy
  // ==========================================
  if (shareProfileBtn) {
    shareProfileBtn.addEventListener("click", () => {
      const currentUrl = window.location.href;
      
      navigator.clipboard.writeText(currentUrl)
        .then(() => {
          showToast("Profile link copied to clipboard!");
        })
        .catch(err => {
          console.error("Failed to copy link: ", err);
          showToast("Failed to copy URL automatically.");
        });
    });
  }

  function showToast(message) {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add("show");
    
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }


});
