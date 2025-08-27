// Global variables
let particleCount = 0;
let weedParticleCount = 0;
const maxParticles = 50;
const maxWeedParticles = 20;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    createInitialParticles();
    simulateLoading();
});

// Initialize application
function initializeApp() {
    console.log('🚀 Initializing Cosmic Portfolio...');
    
    // Add smooth scrolling to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Initialize alien characters
    setupAlienInteractions();
    
    // Setup profile avatar interactions
    setupAvatarInteractions();
    
    // Add click effects to the entire page
    document.addEventListener('click', createClickEffect);
    
    // Setup galaxy background interactions
    setupBackgroundInteractions();
    
    // Initialize parallax effects
    setupParallaxEffects();
    
    console.log('✨ Cosmic Portfolio Initialized!');
}

// Handle navigation clicks
function handleNavigation(e) {
    e.preventDefault();
    
    const target = e.target.getAttribute('href');
    const targetElement = document.querySelector(target);
    
    if (targetElement) {
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        e.target.classList.add('active');
        
        // Smooth scroll to target
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Create navigation particles
        createNavigationEffect(e.clientX, e.clientY);
    }
}

// Setup alien character interactions
function setupAlienInteractions() {
    const alienCharacters = document.querySelectorAll('.alien-character');
    
    alienCharacters.forEach((alien, index) => {
        alien.addEventListener('click', function(e) {
            handleAlienClick(alien, e, index + 1);
        });
        
        alien.addEventListener('mouseenter', function() {
            createAlienHoverEffect(alien);
        });
    });
}

// Handle alien character clicks
function handleAlienClick(alien, event, alienType) {
    // Add clicked class for animation
    alien.classList.add('clicked');
    
    // Remove the class after animation completes
    setTimeout(() => {
        alien.classList.remove('clicked');
    }, 1000);
    
    // Create explosion effect
    createAlienExplosion(event.clientX, event.clientY, alienType);
    
    // Create weed particles for alien interactions
    createWeedParticles(event.clientX, event.clientY, 5);
    
    // Play sound effect simulation (visual feedback)
    createSoundWave(event.clientX, event.clientY);
    
    // Log interaction
    console.log(`👽 Alien ${alienType} activated! Cosmic energy released!`);
}

// Create alien explosion effect
function createAlienExplosion(x, y, type) {
    const colors = ['#00ff88', '#06ffa5', '#ff006e', '#6b46c1', '#ffd700'];
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            createExplosionParticle(x, y, colors[Math.floor(Math.random() * colors.length)]);
        }, i * 50);
    }
}

// Create explosion particle
function createExplosionParticle(x, y, color) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.boxShadow = `0 0 10px ${color}`;
    
    document.body.appendChild(particle);
    
    // Random direction and speed
    const angle = Math.random() * Math.PI * 2;
    const speed = 100 + Math.random() * 150;
    const deltaX = Math.cos(angle) * speed;
    const deltaY = Math.sin(angle) * speed;
    
    // Animate the particle
    particle.animate([
        {
            transform: 'translate(0, 0) scale(1)',
            opacity: 1
        },
        {
            transform: `translate(${deltaX}px, ${deltaY}px) scale(0)`,
            opacity: 0
        }
    ], {
        duration: 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => {
        particle.remove();
    };
}

// Setup avatar interactions
function setupAvatarInteractions() {
    const avatar = document.getElementById('alienAvatar');
    
    if (avatar) {
        avatar.addEventListener('click', function(e) {
            handleAvatarClick(e);
        });
        
        avatar.addEventListener('mouseenter', function() {
            createAvatarGlow();
        });
    }
}

// Handle avatar clicks
function handleAvatarClick(event) {
    const avatar = event.target;
    
    // Create pulsing effect
    avatar.style.transform = 'scale(1.2)';
    setTimeout(() => {
        avatar.style.transform = 'scale(1)';
    }, 200);
    
    // Create cosmic particles around avatar
    const rect = avatar.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    createCosmicBurst(centerX, centerY);
    createWeedParticles(centerX, centerY, 8);
    
    console.log('👽 Main alien avatar activated! Cosmic consciousness expanded!');
}

// Create cosmic burst effect
function createCosmicBurst(x, y) {
    for (let i = 0; i < 16; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'cosmic-burst-particle';
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.backgroundColor = i % 2 ? '#00ff88' : '#06ffa5';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            document.body.appendChild(particle);
            
            const angle = (i / 16) * Math.PI * 2;
            const distance = 100 + Math.random() * 50;
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;
            
            particle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 800,
                easing: 'ease-out'
            }).onfinish = () => {
                particle.remove();
            };
        }, i * 30);
    }
}

// Create click effect
function createClickEffect(event) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.style.left = (event.clientX - 10) + 'px';
    effect.style.top = (event.clientY - 10) + 'px';
    
    document.getElementById('clickEffects').appendChild(effect);
    
    // Remove effect after animation
    setTimeout(() => {
        effect.remove();
    }, 800);
}

// Create weed particles
function createWeedParticles(x, y, count) {
    const container = document.getElementById('weedParticles');
    
    for (let i = 0; i < count; i++) {
        if (weedParticleCount >= maxWeedParticles) break;
        
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'weed-particle';
            particle.innerHTML = '🌿';
            particle.style.left = (x + (Math.random() - 0.5) * 100) + 'px';
            particle.style.top = (y + (Math.random() - 0.5) * 50) + 'px';
            
            container.appendChild(particle);
            weedParticleCount++;
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
                weedParticleCount--;
            }, 4000);
        }, i * 100);
    }
}

// Create sound wave visual effect
function createSoundWave(x, y) {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const wave = document.createElement('div');
            wave.style.position = 'fixed';
            wave.style.left = x + 'px';
            wave.style.top = y + 'px';
            wave.style.width = '20px';
            wave.style.height = '20px';
            wave.style.border = '2px solid #00ff88';
            wave.style.borderRadius = '50%';
            wave.style.pointerEvents = 'none';
            wave.style.zIndex = '9999';
            wave.style.transform = 'translate(-50%, -50%)';
            
            document.body.appendChild(wave);
            
            wave.animate([
                {
                    opacity: 1,
                    transform: 'translate(-50%, -50%) scale(0)'
                },
                {
                    opacity: 0,
                    transform: 'translate(-50%, -50%) scale(3)'
                }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => {
                wave.remove();
            };
        }, i * 200);
    }
}

// Setup background interactions
function setupBackgroundInteractions() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Move floating objects slightly based on mouse position
        const objects = document.querySelectorAll('.floating-object');
        objects.forEach((obj, index) => {
            const speed = parseFloat(obj.dataset.speed) || 0.5;
            const moveX = (mouseX - window.innerWidth / 2) * speed * 0.01;
            const moveY = (mouseY - window.innerHeight / 2) * speed * 0.01;
            
            obj.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        // Update nebula position
        const nebula = document.querySelector('.nebula');
        if (nebula) {
            const moveX = (mouseX - window.innerWidth / 2) * 0.005;
            const moveY = (mouseY - window.innerHeight / 2) * 0.005;
            nebula.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
    
    // Create random particles on mouse movement
    let lastParticleTime = 0;
    document.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();
        if (currentTime - lastParticleTime > 100 && Math.random() > 0.8) {
            createTrailParticle(e.clientX, e.clientY);
            lastParticleTime = currentTime;
        }
    });
}

// Create trail particle
function createTrailParticle(x, y) {
    if (particleCount >= maxParticles) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    document.getElementById('particles').appendChild(particle);
    particleCount++;
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
        particleCount--;
    }, 3000);
}

// Setup parallax effects
function setupParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        // Move background elements at different speeds
        const stars = document.querySelector('.stars');
        const movingStars = document.querySelector('.moving-stars');
        const nebula = document.querySelector('.nebula');
        
        if (stars) {
            stars.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
        
        if (movingStars) {
            movingStars.style.transform = `translateY(${scrollY * 0.2}px)`;
        }
        
        if (nebula) {
            nebula.style.transform = `translateY(${scrollY * 0.05}px) scale(${1 + scrollY * 0.0001})`;
        }
        
        // Parallax effect on floating objects
        const floatingObjects = document.querySelectorAll('.floating-object');
        floatingObjects.forEach((obj, index) => {
            const speed = 0.1 + (index * 0.05);
            obj.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

// Create initial particles
function createInitialParticles() {
    // Create some initial cosmic particles
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createTrailParticle(x, y);
        }, i * 500);
    }
}

// Navigation effect
function createNavigationEffect(x, y) {
    const colors = ['#00ff88', '#06ffa5', '#6b46c1'];
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.boxShadow = '0 0 6px currentColor';
            
            document.body.appendChild(particle);
            
            const angle = (i / 6) * Math.PI * 2;
            const distance = 50;
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;
            
            particle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => {
                particle.remove();
            };
        }, i * 50);
    }
}

// Create alien hover effect
function createAlienHoverEffect(alien) {
    const rect = alien.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Create subtle glow particles
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '3px';
            particle.style.height = '3px';
            particle.style.backgroundColor = '#00ff88';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.opacity = '0.7';
            
            document.body.appendChild(particle);
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 20;
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;
            
            particle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(1)',
                    opacity: 0.7
                },
                {
                    transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 800,
                easing: 'ease-out'
            }).onfinish = () => {
                particle.remove();
            };
        }, i * 150);
    }
}

// Create avatar glow effect
function createAvatarGlow() {
    const avatar = document.getElementById('alienAvatar');
    const rect = avatar.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const glow = document.createElement('div');
            glow.style.position = 'fixed';
            glow.style.left = centerX + 'px';
            glow.style.top = centerY + 'px';
            glow.style.width = '2px';
            glow.style.height = '2px';
            glow.style.backgroundColor = '#06ffa5';
            glow.style.borderRadius = '50%';
            glow.style.pointerEvents = 'none';
            glow.style.zIndex = '999';
            glow.style.boxShadow = '0 0 4px #06ffa5';
            
            document.body.appendChild(glow);
            
            const angle = (i / 8) * Math.PI * 2;
            const radius = 60;
            
            glow.animate([
                {
                    transform: 'translate(-50%, -50%)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * radius - 1}px, ${Math.sin(angle) * radius - 1}px)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => {
                glow.remove();
            };
        }, i * 100);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Gallery item interactions
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            createGalleryEffect(this);
        });
    });
    
    // Social link interactions
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            createSocialEffect(e.clientX, e.clientY);
        });
    });
    
    // Stat item interactions
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            createStatEffect(this);
        });
    });
    
    // Footer alien interactions
    const footerAliens = document.querySelectorAll('.footer-alien');
    footerAliens.forEach((alien, index) => {
        alien.addEventListener('click', function(e) {
            createFooterAlienEffect(e.clientX, e.clientY, index);
        });
    });
}

// Create gallery effect
function createGalleryEffect(item) {
    const rect = item.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create expanding ring effect
    const ring = document.createElement('div');
    ring.style.position = 'fixed';
    ring.style.left = centerX + 'px';
    ring.style.top = centerY + 'px';
    ring.style.width = '0px';
    ring.style.height = '0px';
    ring.style.border = '3px solid #00ff88';
    ring.style.borderRadius = '50%';
    ring.style.pointerEvents = 'none';
    ring.style.zIndex = '9999';
    ring.style.transform = 'translate(-50%, -50%)';
    
    document.body.appendChild(ring);
    
    ring.animate([
        {
            width: '0px',
            height: '0px',
            opacity: 1
        },
        {
            width: '200px',
            height: '200px',
            opacity: 0
        }
    ], {
        duration: 800,
        easing: 'ease-out'
    }).onfinish = () => {
        ring.remove();
    };
}

// Create social effect
function createSocialEffect(x, y) {
    const icons = ['📱', '🌐', '💫', '✨'];
    
    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            const icon = document.createElement('div');
            icon.innerHTML = icons[i];
            icon.style.position = 'fixed';
            icon.style.left = x + 'px';
            icon.style.top = y + 'px';
            icon.style.fontSize = '20px';
            icon.style.pointerEvents = 'none';
            icon.style.zIndex = '9999';
            
            document.body.appendChild(icon);
            
            const angle = (i / 4) * Math.PI * 2;
            const distance = 40;
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;
            
            icon.animate([
                {
                    transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translate(${endX - x}px, ${endY - y}px) scale(0) rotate(360deg)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => {
                icon.remove();
            };
        }, i * 100);
    }
}

// Create stat effect
function createStatEffect(item) {
    const rect = item.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const spark = document.createElement('div');
            spark.style.position = 'fixed';
            spark.style.left = centerX + 'px';
            spark.style.top = centerY + 'px';
            spark.style.width = '2px';
            spark.style.height = '2px';
            spark.style.backgroundColor = '#ffd700';
            spark.style.borderRadius = '50%';
            spark.style.pointerEvents = 'none';
            spark.style.zIndex = '9999';
            spark.style.boxShadow = '0 0 4px #ffd700';
            
            document.body.appendChild(spark);
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 20;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            spark.animate([
                {
                    transform: 'translate(-50%, -50%) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => {
                spark.remove();
            };
        }, i * 50);
    }
}

// Simulate loading screen
function simulateLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
        
        // Create welcome effect
        createWelcomeEffect();
    }, 3000);
}

// Create welcome effect
function createWelcomeEffect() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Create burst of cosmic particles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createExplosionParticle(
                centerX + (Math.random() - 0.5) * 200,
                centerY + (Math.random() - 0.5) * 200,
                ['#00ff88', '#06ffa5', '#6b46c1', '#ffd700'][Math.floor(Math.random() * 4)]
            );
        }, i * 100);
    }
    
    console.log('🌌 Welcome to the Cosmic Portfolio! Ready for intergalactic exploration!');
}

// Add some random cosmic events
setInterval(() => {
    if (Math.random() > 0.95) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createCosmicEvent(x, y);
    }
}, 5000);

// Create random cosmic event
function createCosmicEvent(x, y) {
    const events = [
        () => createTrailParticle(x, y),
        () => createWeedParticles(x, y, 2),
        () => createSoundWave(x, y),
        () => {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createExplosionParticle(x + (Math.random() - 0.5) * 50, y + (Math.random() - 0.5) * 50, '#06ffa5');
                }, i * 200);
            }
        }
    ];
    
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    randomEvent();
    
    console.log('💫 Random cosmic event triggered!');
}

// Create footer alien effect
function createFooterAlienEffect(x, y, alienIndex) {
    const effects = [
        { emojis: ['👽', '🛸', '⭐', '✨'], colors: ['#00ff88', '#06ffa5'] },
        { emojis: ['🛸', '🌌', '⚡', '💫'], colors: ['#6b46c1', '#ff006e'] },
        { emojis: ['🌌', '🌟', '🌠', '👽'], colors: ['#ffd700', '#ff6b35'] }
    ];
    
    const effect = effects[alienIndex] || effects[0];
    
    // Create cosmic burst
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.innerHTML = effect.emojis[Math.floor(Math.random() * effect.emojis.length)];
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.fontSize = '1.5rem';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.filter = 'drop-shadow(0 0 6px ' + effect.colors[Math.floor(Math.random() * effect.colors.length)] + ')';
            
            document.body.appendChild(particle);
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 60 + Math.random() * 40;
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;
            
            particle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translate(${endX - x}px, ${endY - y}px) scale(0) rotate(360deg)`,
                    opacity: 0
                }
            ], {
                duration: 1200,
                easing: 'ease-out'
            }).onfinish = () => {
                particle.remove();
            };
        }, i * 100);
    }
    
    // Create weed particles for footer interactions
    createWeedParticles(x, y, 3);
    
    console.log(`🌌 Footer alien ${alienIndex + 1} activated cosmic portal!`);
}

// Performance optimization
let rafId;
function optimizePerformance() {
    // Limit particle creation based on device performance
    const isLowPerformance = navigator.hardwareConcurrency <= 2;
    if (isLowPerformance) {
        maxParticles = 20;
        maxWeedParticles = 10;
    }
    
    // Use requestAnimationFrame for smooth animations
    function animate() {
        // Update any continuous animations here
        rafId = requestAnimationFrame(animate);
    }
    
    // Start animation loop only when page is visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        } else {
            animate();
        }
    });
    
    animate();
}

// Initialize performance optimizations
optimizePerformance();

// Add error handling
window.addEventListener('error', (e) => {
    console.log('🚨 Cosmic Error Detected:', e.message);
    // Continue running despite errors
});

// Log final initialization
console.log('🚀 Mot Mot Oyamat\'s Cosmic Portfolio fully loaded! 👽✨');
