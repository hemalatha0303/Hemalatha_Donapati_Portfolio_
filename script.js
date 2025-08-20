// Portfolio JavaScript - Desktop App Style Navigation

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the portfolio
    initPortfolio();
});

function initPortfolio() {
    // Get all taskbar items and content sections
    const taskbarItems = document.querySelectorAll('.taskbar-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Add click event listeners to taskbar items
    taskbarItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Handle active states
            handleTaskbarNavigation(targetSection);
            
            // Show/hide content sections
            showSection(targetSection);
            
            // Add click animation
            addClickAnimation(this);
        });
    });
    
    // Initialize with home section active
    showSection('home');
}

function handleTaskbarNavigation(targetSection) {
    // Remove active class from all taskbar items
    const taskbarItems = document.querySelectorAll('.taskbar-item');
    taskbarItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item
    const activeItem = document.querySelector(`[data-section="${targetSection}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

function showSection(sectionId) {
    // Hide all content sections
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        
        // Add active class with delay for smooth animation
        setTimeout(() => {
            targetSection.classList.add('active');
        }, 50);
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

function addClickAnimation(element) {
    // Add temporary animation class
    element.style.transform = 'scale(0.95)';
    
    // Remove animation class after animation completes
    setTimeout(() => {
        element.style.transform = '';
    }, 150);
}

// Smooth scrolling for anchor links and CTA buttons
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        
        // Handle CTA button navigation to switch sections
        if (targetId === 'projects' || targetId === 'contact') {
            const taskbarItem = document.querySelector(`[data-section="${targetId}"]`);
            if (taskbarItem) {
                taskbarItem.click();
            }
        } else {
            // Regular smooth scrolling for other anchor links
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add hover effects to tool cards
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add hover effects to tech items
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Form handling for contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    // Initialize EmailJS
    emailjs.init("cTMbPahEtNmZzyc-C"); // Replace with your actual EmailJS public key
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const submitBtn = document.getElementById('submitBtn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const message = document.getElementById('userMessage').value;
            
            // Validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            
            // Prepare email parameters
            const templateParams = {
                to_email: 'hemalathareddy.7254@gmail.com', // Replace with your email
                from_name: name,
                from_email: email,
                message: message,
                reply_to: email
            };
            
                         // Send email using EmailJS
             console.log('Sending email with params:', templateParams);
             console.log('Service ID:', 'service_oru5ala');
             console.log('Template ID:', 'template_6h09lyv');
             
             emailjs.send('service_oru5ala', 'template_6h09lyv', templateParams)
                 .then(function(response) {
                     console.log('SUCCESS!', response.status, response.text);
                     showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                     contactForm.reset();
                 }, function(error) {
                     console.log('FAILED...', error);
                     console.log('Error details:', error.text);
                     console.log('Error status:', error.status);
                     console.log('Full error object:', error);
                     showNotification('Failed to send message: ' + error.text, 'error');
                 })
                 .finally(function() {
                     // Reset button state
                     submitBtn.disabled = false;
                     btnText.style.display = 'inline-block';
                     btnLoading.style.display = 'none';
                 });
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.style.filter = 'grayscale(100%)';
        });
    });
});

// Add parallax effect to background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('body');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.backgroundPosition = `center ${speed}px`;
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const taskbarItems = document.querySelectorAll('.taskbar-item');
    const activeItem = document.querySelector('.taskbar-item.active');
    let currentIndex = 0;
    
    // Find current active item index
    taskbarItems.forEach((item, index) => {
        if (item.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    // Handle arrow key navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : taskbarItems.length - 1;
        taskbarItems[prevIndex].click();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = currentIndex < taskbarItems.length - 1 ? currentIndex + 1 : 0;
        taskbarItems[nextIndex].click();
    }
});

// Add smooth reveal animations for content
function addRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const elements = document.querySelectorAll('.project-card, .tool-card, .tech-item, .interest-card, .experience-item, .education-item');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize reveal animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addRevealAnimations, 500);
});

// Add typing animation for hero title
function addTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid #667eea';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.style.borderRight = 'none';
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addTypingAnimation, 500);
});

// Add particle effect to background (optional enhancement)
function addParticleEffect() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
            animation-delay: ${Math.random() * 6}s;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        particleContainer.appendChild(particle);
    }
}

// Add CSS for particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particle effect
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addParticleEffect, 1000);
});

// Todo Functionality
class TodoManager {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('todoNotes')) || [];
        this.init();
    }

    init() {
        this.addNoteBtn = document.getElementById('addNoteBtn');
        this.saveAllBtn = document.getElementById('saveAllBtn');
        this.container = document.getElementById('stickyNotesContainer');
        
        if (this.addNoteBtn) {
            this.addNoteBtn.addEventListener('click', () => this.addNewNote());
        }
        
        if (this.saveAllBtn) {
            this.saveAllBtn.addEventListener('click', () => this.saveAllNotes());
        }
        
        this.renderNotes();
    }

    addNewNote() {
        const note = {
            id: Date.now(),
            title: 'New Note',
            content: 'Click to edit your note...',
            completed: false,
            createdAt: new Date().toLocaleDateString(),
            updatedAt: new Date().toLocaleDateString()
        };
        
        this.notes.unshift(note);
        this.renderNotes();
        this.saveToLocalStorage();
        
        // Focus on the new note
        setTimeout(() => {
            const newNote = document.querySelector(`[data-note-id="${note.id}"]`);
            if (newNote) {
                const titleInput = newNote.querySelector('.note-title');
                const contentInput = newNote.querySelector('.note-content');
                if (titleInput) titleInput.focus();
                if (contentInput) contentInput.focus();
            }
        }, 100);
    }

    renderNotes() {
        if (!this.container) return;
        
        if (this.notes.length === 0) {
            this.container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-sticky-note"></i>
                    <h3>No Notes Yet</h3>
                    <p>Click "Add New Note" to create your first sticky note!</p>
                </div>
            `;
            return;
        }
        
        this.container.innerHTML = this.notes.map(note => this.createNoteHTML(note)).join('');
        
        // Add event listeners to all notes
        this.addNoteEventListeners();
    }

    createNoteHTML(note) {
        return `
            <div class="sticky-note ${note.completed ? 'completed' : ''}" data-note-id="${note.id}">
                <div class="note-header">
                    <input type="text" class="note-title" value="${note.title}" placeholder="Note title">
                    <div class="note-actions">
                        <button class="note-action-btn toggle-btn" title="${note.completed ? 'Mark as incomplete' : 'Mark as complete'}">
                            <i class="fas ${note.completed ? 'fa-undo' : 'fa-check'}"></i>
                        </button>
                        <button class="note-action-btn delete-btn" title="Delete note">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <textarea class="note-content" placeholder="Write your note here...">${note.content}</textarea>
                <div class="note-footer">
                    <span class="note-date">${note.updatedAt}</span>
                    <div class="note-status">
                        <span class="status-indicator ${note.completed ? 'completed' : ''}"></span>
                        <span>${note.completed ? 'Completed' : 'Active'}</span>
                    </div>
                </div>
            </div>
        `;
    }

    addNoteEventListeners() {
        const notes = document.querySelectorAll('.sticky-note');
        
        notes.forEach(note => {
            const noteId = parseInt(note.dataset.noteId);
            const noteData = this.notes.find(n => n.id === noteId);
            
            if (!noteData) return;
            
            // Title input
            const titleInput = note.querySelector('.note-title');
            if (titleInput) {
                titleInput.addEventListener('input', (e) => {
                    noteData.title = e.target.value;
                    noteData.updatedAt = new Date().toLocaleDateString();
                    this.saveToLocalStorage();
                });
            }
            
            // Content textarea
            const contentInput = note.querySelector('.note-content');
            if (contentInput) {
                contentInput.addEventListener('input', (e) => {
                    noteData.content = e.target.value;
                    noteData.updatedAt = new Date().toLocaleDateString();
                    this.saveToLocalStorage();
                });
            }
            
            // Toggle completion
            const toggleBtn = note.querySelector('.toggle-btn');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => {
                    noteData.completed = !noteData.completed;
                    noteData.updatedAt = new Date().toLocaleDateString();
                    this.renderNotes();
                    this.saveToLocalStorage();
                    
                    // Show notification
                    showNotification(
                        noteData.completed ? 'Note marked as completed!' : 'Note marked as active!',
                        'success'
                    );
                });
            }
            
            // Delete note
            const deleteBtn = note.querySelector('.delete-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => {
                    if (confirm('Are you sure you want to delete this note?')) {
                        this.notes = this.notes.filter(n => n.id !== noteId);
                        this.renderNotes();
                        this.saveToLocalStorage();
                        showNotification('Note deleted successfully!', 'success');
                    }
                });
            }
        });
    }

    saveAllNotes() {
        this.saveToLocalStorage();
        showNotification('All notes saved successfully!', 'success');
        
        // Add save animation
        const saveBtn = document.getElementById('saveAllBtn');
        if (saveBtn) {
            saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
            setTimeout(() => {
                saveBtn.innerHTML = '<i class="fas fa-save"></i> Save All';
            }, 2000);
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('todoNotes', JSON.stringify(this.notes));
    }
}

// Initialize Todo functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Todo manager
    new TodoManager();
    
    // Initialize Tools page functionality
    initToolsPage();
    
    // Initialize Technologies page functionality
    initTechnologiesPage();
});

// --- Technologies Accordion Functionality ---
document.addEventListener('DOMContentLoaded', function() {
    const techAccordionBtns = document.querySelectorAll('.tech-accordion-btn');
    let openPanel = null;
    techAccordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = btn.getAttribute('data-category');
            const panel = document.getElementById(category + '-panel');
            const chevron = btn.querySelector('.chevron');
            // If already open, close it
            if (panel.classList.contains('open')) {
                panel.classList.remove('open');
                btn.classList.remove('active');
                if (chevron) chevron.classList.remove('rotated');
                openPanel = null;
                return;
            }
            // Close any open panel
            if (openPanel) {
                openPanel.panel.classList.remove('open');
                openPanel.btn.classList.remove('active');
                const prevChevron = openPanel.btn.querySelector('.chevron');
                if (prevChevron) prevChevron.classList.remove('rotated');
            }
            // Open this panel
            panel.classList.add('open');
            btn.classList.add('active');
            if (chevron) chevron.classList.add('rotated');
            openPanel = { btn, panel };
        });
    });
});

// Tools Page Functionality
function initToolsPage() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const toolsPanels = document.querySelectorAll('.tools-panel');
    const toolsContent = document.querySelector('.tools-content');
    const toolsDescription = document.querySelector('.tools-description');
    
    if (!categoryButtons.length) return;
    
    // Track the currently active category
    let activeCategory = null;
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // If clicking the same category twice, return to description
            if (activeCategory === category) {
                showToolsDescription();
                activeCategory = null;
                return;
            }
            
            // Update active states
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show the corresponding panel
            showToolsPanel(category);
            activeCategory = category;
        });
    });
    
    function showToolsPanel(categoryId) {
        // Hide description
        if (toolsDescription) {
            toolsDescription.style.display = 'none';
        }
        
        // Hide all panels
        toolsPanels.forEach(panel => {
            panel.classList.remove('active');
        });
        
        // Show the selected panel
        const targetPanel = document.getElementById(categoryId);
        if (targetPanel) {
            targetPanel.classList.add('active');
            
            // Add animation
            targetPanel.style.opacity = '0';
            targetPanel.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                targetPanel.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                targetPanel.style.opacity = '1';
                targetPanel.style.transform = 'translateY(0)';
            }, 50);
        }
    }
    
    function showToolsDescription() {
        // Remove active state from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Hide all panels
        toolsPanels.forEach(panel => {
            panel.classList.remove('active');
        });
        
        // Show description
        if (toolsDescription) {
            toolsDescription.style.display = 'block';
            toolsDescription.style.opacity = '0';
            toolsDescription.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                toolsDescription.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                toolsDescription.style.opacity = '1';
                toolsDescription.style.transform = 'translateY(0)';
            }, 50);
        }
    }
}

// Technologies Page Functionality
function initTechnologiesPage() {
    const techCategoryButtons = document.querySelectorAll('.tech-category-btn');
    const techPanels = document.querySelectorAll('.tech-panel');
    const techContent = document.querySelector('.tech-content');
    const techDescription = document.querySelector('.tech-description');
    
    if (!techCategoryButtons.length) return;
    
    // Track the currently active category
    let activeTechCategory = null;
    
    techCategoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // If clicking the same category twice, return to description
            if (activeTechCategory === category) {
                showTechDescription();
                activeTechCategory = null;
                return;
            }
            
            // Update active states
            techCategoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show the corresponding panel
            showTechPanel(category);
            activeTechCategory = category;
        });
    });
    
    function showTechPanel(categoryId) {
        // Hide description
        if (techDescription) {
            techDescription.style.display = 'none';
        }
        
        // Hide all panels
        techPanels.forEach(panel => {
            panel.classList.remove('active');
        });
        
        // Show the selected panel
        const targetPanel = document.getElementById(categoryId);
        if (targetPanel) {
            targetPanel.classList.add('active');
            
            // Add animation
            targetPanel.style.opacity = '0';
            targetPanel.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                targetPanel.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                targetPanel.style.opacity = '1';
                targetPanel.style.transform = 'translateY(0)';
            }, 50);
        }
    }
    
    function showTechDescription() {
        // Remove active state from all buttons
        techCategoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Hide all panels
        techPanels.forEach(panel => {
            panel.classList.remove('active');
        });
        
        // Show description
        if (techDescription) {
            techDescription.style.display = 'block';
            techDescription.style.opacity = '0';
            techDescription.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                techDescription.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                techDescription.style.opacity = '1';
                techDescription.style.transform = 'translateY(0)';
            }, 50);
        }
    }
}