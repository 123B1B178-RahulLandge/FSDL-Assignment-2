document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Navbar & Active Section Highlight ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        // Shadow on scroll
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.05)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Active Link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });

        // Back to Top Button
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 500) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Hamburger animation
        const bars = document.querySelectorAll('.bar');
        if(hamburger.classList.contains('active')) {
            bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
            bars[1].style.opacity = "0";
            bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
        } else {
            bars[0].style.transform = "none";
            bars[1].style.opacity = "1";
            bars[2].style.transform = "none";
        }
    });

    // --- Scroll Reveal Animation ---
    const revealItems = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealItems.forEach(item => {
            const windowHeight = window.innerHeight;
            const revealTop = item.getBoundingClientRect().top;
            const revealPoint = 150;

            if (revealTop < windowHeight - revealPoint) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // --- Project Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // --- Form Validation & Success Message ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        // Simple Validation
        if(name.length < 2) {
            showStatus('Please enter a valid name.', 'error');
            return;
        }

        // Simulate success
        showStatus('Sending message...', 'pending');
        
        setTimeout(() => {
            showStatus('Success! Message sent to Rahul.', 'success');
            contactForm.reset();
        }, 1500);
    });

    function showStatus(msg, type) {
        formStatus.textContent = msg;
        formStatus.style.color = type === 'error' ? '#ef4444' : (type === 'success' ? '#10b981' : '#94a3b8');
    }

    // --- Back to Top Action ---
    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});