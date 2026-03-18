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

// Contact form submission with Formspree
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const submitBtn = this.querySelector(".send-btn");
    const originalText = submitBtn.textContent;

    try {
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Replace YOUR_FORM_ID with your actual Formspree form ID
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        alert("Thank you for your message! I will get back to you soon.");
        this.reset();
      } else {
        alert("There was an error. Please try again or email me directly.");
      }
    } catch (error) {
      alert("There was an error. Please try again or email me directly.");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

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
