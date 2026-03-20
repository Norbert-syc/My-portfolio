// Smooth scrolling for navigation links and active state
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all links
      navLinks.forEach((l) => l.classList.remove("active"));

      // Add active class to clicked link
      this.classList.add("active");

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Set active link based on scroll position
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const scrollPos = window.scrollY + 150;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos <= bottom) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
});

// Download CV button
document.addEventListener("DOMContentLoaded", function () {
  const downloadBtn = document.querySelector(".download-cv");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Create download link
      const link = document.createElement("a");
      link.href = "./images/Norbert_Nabahire_CV.pdf";
      link.download = "Norbert_Nabahire_CV.pdf";
      link.style.display = "none";

      // Add to DOM, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show feedback
      const originalText = this.textContent;
      this.textContent = "Downloaded!";
      this.style.backgroundColor = "#00aa00";

      setTimeout(() => {
        this.textContent = originalText;
        this.style.backgroundColor = "";
      }, 2000);
    });
  }
});

// See More button
document.querySelector(".see-more-btn").addEventListener("click", function () {
  document.querySelector("#skills").scrollIntoView({ behavior: "smooth" });
});

// Read More buttons for projects - Open URL or show modal
document.querySelectorAll(".project-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const projectUrl = this.getAttribute("data-url");

    // If there's a URL, open it
    if (projectUrl && projectUrl !== "#") {
      window.open(projectUrl, "_blank");
      return;
    }

    // Otherwise, show the modal with project details
    const modal = document.getElementById("projectModal");
    const projectItem = this.parentElement;
    const projectTitle =
      projectItem.querySelector(".portfolio-title").textContent;
    const projectDesc = projectItem.querySelector(
      ".portfolio-description",
    ).textContent;
    const techBadges = projectItem.querySelectorAll(".tech-badge");

    const modalTitle = modal.querySelector(".modal-title");
    const modalText = modal.querySelector(".modal-text");
    const modalTech = modal.querySelector(".modal-tech");

    // Get tech stack from project
    let techStack = "";
    techBadges.forEach((badge) => {
      techStack += `<span class="tech-tag">${badge.textContent}</span>`;
    });

    modalTitle.textContent = projectTitle;
    modalText.textContent = projectDesc;
    modalTech.innerHTML = techStack;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

// Close modal
const modalClose = document.getElementById("modalClose");
const modal = document.getElementById("projectModal");

if (modalClose) {
  modalClose.addEventListener("click", function () {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  });
}

if (modal) {
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// Codes button
document.querySelector(".codes-btn").addEventListener("click", function () {
  window.open("https://github.com", "_blank");
});

// Contact form submission - Show 3D animated popup with contact info
const contactForm = document.getElementById("contactForm");
const contactPopup = document.getElementById("contactPopup");
const popupCloseBtn = document.getElementById("popupCloseBtn");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show the 3D animated popup
    if (contactPopup) {
      contactPopup.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    // Reset the form
    contactForm.reset();
  });
}

// Close popup when clicking close button
if (popupCloseBtn) {
  popupCloseBtn.addEventListener("click", function () {
    if (contactPopup) {
      contactPopup.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// Close popup when clicking outside
if (contactPopup) {
  contactPopup.addEventListener("click", function (e) {
    if (e.target === contactPopup) {
      contactPopup.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// Close popup with Escape key
document.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    contactPopup &&
    contactPopup.classList.contains("active")
  ) {
    contactPopup.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// Social media links
document.addEventListener("DOMContentLoaded", function () {
  const socialIcons = document.querySelectorAll(".social-icon");
  const socialLinks = [
    "https://www.instagram.com/___norbs/",
    "https://www.linkedin.com/in/norbert-nabahire-930a51260/",
    "https://twitter.com/norbertnabahire",
    "https://www.facebook.com/nabahire.norbert",
  ];

  socialIcons.forEach((icon, index) => {
    icon.addEventListener("click", function (e) {
      e.preventDefault();
      window.open(socialLinks[index], "_blank");
    });
  });
});

// Mobile menu hamburger toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when a nav link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }
});
