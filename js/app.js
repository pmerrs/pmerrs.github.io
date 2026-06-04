// ==========================================================================
// APPLICATION LOGIC - FIGMA CONCEPT LINK HUB
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const linksStack = document.getElementById("links-stack");

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
  // 2. Render Social Links (using SVG files & custom background colors)
  // ==========================================
  async function renderLinks() {
    if (!linksStack) return;
    linksStack.innerHTML = "";

    for (const link of linksData) {
      const linkCard = document.createElement("a");
      linkCard.href = link.url;
      linkCard.target = "_blank";
      linkCard.className = "link-row ripple-target";
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
        <div class="link-icon-wrapper" style="background-color: ${link.iconBg || '#555'}; color: ${link.iconColor || '#fff'};">
          ${svgContent}
        </div>
        <div class="link-details">
          <h3 class="link-title">${link.title}</h3>
          <p class="link-subtitle">${link.subtitle}</p>
        </div>
      `;
      
      linksStack.appendChild(linkCard);
    }
  }

  renderLinks();

  // ==========================================
  // 3. Secret Redirect Easter Egg
  // ==========================================
  const avatarImg = document.querySelector(".profile-avatar-img");
  if (avatarImg) {
    avatarImg.style.cursor = "pointer";
    avatarImg.addEventListener("click", () => {
      const targetPath = "/aW5kZWVkdHJvcGljYWxncm93bW92aW5nZmxvYXRpbmdyZXNwZWN0cGlua2xvdGNvbXA=";
      window.location.href = window.location.origin + targetPath;
    });
  }
});
