document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    // --- Core Navigation Logic ---
    const taskbarItems = document.querySelectorAll('.taskbar-item');
    const contentSections = document.querySelectorAll('.content-section');
    const ctaButtons = document.querySelectorAll('.cta-button[href^="#"]');

    const showSection = (sectionId) => {
        contentSections.forEach(section => section.classList.remove('active'));
        const targetSection = document.getElementById(sectionId);
        if (targetSection) targetSection.classList.add('active');

        taskbarItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === sectionId) item.classList.add('active');
        });
    };

    taskbarItems.forEach(item => {
        item.addEventListener('click', () => showSection(item.dataset.section));
    });
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionId = button.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });

    // --- Todo List Logic ---
    // This part is removed as you did not request it in this prompt.
    // If you need it, please let me know!

    // --- Initial Load ---
    showSection('home'); // Show home section by default
});

// --- EmailJS Contact Form Logic ---
(function() {
    // ---- PASTE YOUR KEYS HERE ----
    emailjs.init({
      publicKey: "cTMbPahEtNmZzyc-C",
    });
})();


document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevents the page from reloading

            const serviceID = "service_4x80pfq";
            const templateID = "template_ijvqpp4";

            const submitButton = this.querySelector('button[type="submit"]');
            const formMessage = document.getElementById('form-message'); // Get the message element
            submitButton.textContent = 'Sending...';

            // Send the email using EmailJS
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    // SUCCESS!
                    formMessage.textContent = "Message sent successfully!";
                    formMessage.style.color = "#34c759"; // Green color
                    formMessage.style.opacity = 1;
                    
                    this.reset(); // Clears the form fields
                    submitButton.textContent = 'Send Message';

                    // Hide the message after 5 seconds
                    setTimeout(() => {
                         formMessage.style.opacity = 0;
                    }, 5000);

                }, (err) => {
                    // FAILURE!
                    formMessage.textContent = "An error occurred. Please try again.";
                    formMessage.style.color = "#ff4d4d"; // Red color
                    formMessage.style.opacity = 1;

                    submitButton.textContent = 'Send Message';
                    
                    // Hide the message after 5 seconds
                     setTimeout(() => {
                         formMessage.style.opacity = 0;
                    }, 5000);
                });
        });
    }
});