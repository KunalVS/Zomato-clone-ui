// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Loading screen
    showLoadingScreen();
    
    // Initialize all animations and interactions
    initScrollAnimations();
    initHeaderEffects();
    initSearchFunctionality();
    initLocationButtons();
    initParallaxEffect();
    initTypingAnimation();
    
});

// Loading Screen
function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loadingScreen);
        }, 500);
    }, 2000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);
    
    // Add scroll animation class to location buttons
    const locationButtons = document.querySelectorAll('.Locations li');
    locationButtons.forEach((button, index) => {
        button.classList.add('scroll-animate');
        button.style.animationDelay = `${index * 0.1}s`;
        observer.observe(button);
    });
}

// Header Effects
function initHeaderEffects() {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo img');
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'linear-gradient(135deg, #8b0000 0%, #5c0000 100%)';
            header.style.boxShadow = '0 4px 30px rgba(220, 20, 60, 0.6)';
        } else {
            header.style.background = 'linear-gradient(135deg, #dc143c 0%, #b71c1c 100%)';
            header.style.boxShadow = '0 4px 20px rgba(220, 20, 60, 0.4)';
        }
    });
    
    // Logo click animation
    logo.addEventListener('click', () => {
        logo.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
            logo.style.animation = '';
        }, 600);
    });
}

// Search Functionality
function initSearchFunctionality() {
    const searchInput = document.querySelector('form input');
    const searchForm = document.querySelector('form');
    
    // Search suggestions (mock data)
    const suggestions = [
        'Pizza', 'Burger', 'Chinese', 'Indian', 'Italian', 'Thai',
        'McDonald\'s', 'KFC', 'Domino\'s', 'Subway', 'Starbucks',
        'Biryani', 'Pasta', 'Sushi', 'Tacos', 'Ice Cream'
    ];
    
    // Create suggestions dropdown
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'suggestions-dropdown';
    suggestionsContainer.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        max-height: 200px;
        overflow-y: auto;
        z-index: 1000;
        display: none;
    `;
    
    searchForm.style.position = 'relative';
    searchForm.appendChild(suggestionsContainer);
    
    // Search input events
    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        if (value.length > 0) {
            const filteredSuggestions = suggestions.filter(item => 
                item.toLowerCase().includes(value)
            );
            showSuggestions(filteredSuggestions);
        } else {
            hideSuggestions();
        }
    });
    
    searchInput.addEventListener('focus', () => {
        searchInput.style.transform = 'scale(1.02)';
        searchForm.style.animation = 'pulse 0.3s ease';
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.style.transform = 'scale(1)';
        setTimeout(hideSuggestions, 200);
    });
    
    function showSuggestions(items) {
        if (items.length === 0) {
            hideSuggestions();
            return;
        }
        
        suggestionsContainer.innerHTML = items.map(item => 
            `<div class="suggestion-item" style="padding: 12px 20px; cursor: pointer; transition: all 0.2s ease;">${item}</div>`
        ).join('');
        
        suggestionsContainer.style.display = 'block';
        
        // Add hover effects
        document.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.background = '#dc143c';
                item.style.color = 'white';
            });
            item.addEventListener('mouseleave', () => {
                item.style.background = 'transparent';
                item.style.color = '#333';
            });
            item.addEventListener('click', () => {
                searchInput.value = item.textContent;
                hideSuggestions();
                performSearch(item.textContent);
            });
        });
    }
    
    function hideSuggestions() {
        suggestionsContainer.style.display = 'none';
    }
    
    function performSearch(query) {
        console.log('Searching for:', query);
        // Add search animation
        searchInput.style.background = 'linear-gradient(45deg, #dc143c, #b71c1c)';
        searchInput.style.color = 'white';
        searchInput.style.borderColor = '#8b0000';
        setTimeout(() => {
            searchInput.style.background = 'rgba(255, 255, 255, 0.98)';
            searchInput.style.color = '#333';
            searchInput.style.borderColor = '#dc143c';
        }, 1000);
    }
    
    // Form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (searchInput.value.trim()) {
            performSearch(searchInput.value.trim());
        }
    });
}

// Location Buttons Interactions
function initLocationButtons() {
    const locationButtons = document.querySelectorAll('.Locations button');
    
    locationButtons.forEach((button, index) => {
        // Add stagger effect
        button.style.animationDelay = `${index * 0.05}s`;
        
        // Click effect
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
        
        // Enhanced hover effects
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-10px) scale(1.03)';
            button.style.boxShadow = '0 25px 50px rgba(220, 20, 60, 0.4)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
}

// Parallax Effect
function initParallaxEffect() {
    const heroSection = document.querySelector('main section:first-child');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Typing Animation for Search Placeholder
function initTypingAnimation() {
    const searchInput = document.querySelector('form input');
    const originalPlaceholder = searchInput.placeholder;
    const typingTexts = [
        'Search for restaurants...',
        'Find your favorite cuisine...',
        'Discover new dishes...',
        'Order food online...'
    ];
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeAnimation() {
        const currentText = typingTexts[currentTextIndex];
        
        if (!isDeleting) {
            searchInput.placeholder = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentText.length) {
                setTimeout(() => {
                    isDeleting = true;
                    typeAnimation();
                }, 2000);
                return;
            }
        } else {
            searchInput.placeholder = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
            }
        }
        
        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(typeAnimation, typingSpeed);
    }
    
    // Start typing animation after a delay
    setTimeout(() => {
        if (document.activeElement !== searchInput) {
            typeAnimation();
        }
    }, 3000);
    
    // Stop typing animation when input is focused
    searchInput.addEventListener('focus', () => {
        searchInput.placeholder = originalPlaceholder;
    });
}

// Add ripple animation to CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Smooth scrolling for anchor links
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add floating elements animation
function createFloatingElements() {
    const heroSection = document.querySelector('main section:first-child');
    const floatingElements = ['🍕', '🍔', '🍜', '🍱', '🌮', '🍰'];
    
    floatingElements.forEach((emoji, index) => {
        const element = document.createElement('div');
        element.textContent = emoji;
        element.style.cssText = `
            position: absolute;
            font-size: 2rem;
            opacity: 0.1;
            pointer-events: none;
            animation: float 6s ease-in-out infinite;
            animation-delay: ${index * 1}s;
            left: ${Math.random() * 80 + 10}%;
            top: ${Math.random() * 80 + 10}%;
        `;
        heroSection.appendChild(element);
    });
}

// Initialize floating elements after page load
window.addEventListener('load', () => {
    setTimeout(createFloatingElements, 1000);
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Add error handling for image loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
            console.warn(`Image failed to load: ${img.src}`);
        });
    });
});

// Console welcome message
console.log(`
🍕 Welcome to Zomato Clone!
🎨 Styled with love and red theme
⚡ Enhanced with smooth animations
🚀 Built for the best user experience
`);

// Add a fun Easter egg
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === konamiSequence.toString()) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        console.log('🌈 Easter egg activated! You found the secret!');
    }
});

// Rainbow animation for Easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);