// Smooth scrolling for navigation links and active state
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Set active link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});

// Download CV button
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.querySelector('.download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create download link
            const link = document.createElement('a');
            link.href = './images/Norbert_Nabahire_CV.pdf';
            link.download = 'Norbert_Nabahire_CV.pdf';
            link.style.display = 'none';
            
            // Add to DOM, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show feedback
            const originalText = this.textContent;
            this.textContent = 'Downloaded!';
            this.style.backgroundColor = '#00aa00';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 2000);
        });
    }
});

// See More button
document.querySelector('.see-more-btn').addEventListener('click', function() {
    document.querySelector('#skills').scrollIntoView({ behavior: 'smooth' });
});

// Read More buttons for projects
document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const projectTitle = this.parentElement.querySelector('.portfolio-title').textContent;
        alert(`More details about "${projectTitle}" coming soon!`);
    });
});

// Codes button
document.querySelector('.codes-btn').addEventListener('click', function() {
    window.open('https://github.com', '_blank');
});

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const firstName = this.querySelector('input[placeholder="First name"]').value;
    const lastName = this.querySelector('input[placeholder="Last name"]').value;
    const phone = this.querySelector('input[placeholder="Phone"]').value;
    const email = this.querySelector('input[placeholder="Email"]').value;
    const message = this.querySelector('textarea').value;
    
    if (firstName && lastName && email && message) {
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    } else {
        alert('Please fill in all required fields.');
    }
});

// Social media links
document.addEventListener('DOMContentLoaded', function() {
    const socialIcons = document.querySelectorAll('.social-icon');
    const socialLinks = [
        'https://instagram.com/norbertnabahire',
        'https://linkedin.com/in/norbertnabahire',
        'https://twitter.com/norbertnabahire',
        'https://facebook.com/norbertnabahire'
    ];
    
    socialIcons.forEach((icon, index) => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(socialLinks[index], '_blank');
        });
    });
});