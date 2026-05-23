(function () {
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
  const sections = document.querySelectorAll("section[id]");
  const tabButtons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".experience-panel");

  function setActiveNav() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isActive = href === `#${current}`;
      link.classList.toggle("active", isActive);
    });
  }

  function switchTab(index) {
    tabButtons.forEach((btn, i) => {
      const isActive = i === index;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel, i) => {
      const isActive = i === index;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      switchTab(Number(btn.dataset.index));
    });

    btn.addEventListener("keydown", (e) => {
      const index = Number(btn.dataset.index);
      let next = index;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        next = (index + 1) % tabButtons.length;
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        next = (index - 1 + tabButtons.length) % tabButtons.length;
      } else {
        return;
      }

      tabButtons[next].focus();
      switchTab(next);
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();
})();
