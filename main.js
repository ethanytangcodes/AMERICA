// Initialize fireworks
const fireworks = new Fireworks.default(document.body, {
  sound: {
    enabled: true,
    files: ["explosion1.mp3"],
    volume: { min: 20, max: 50 },
  },
  acceleration: 1.03,
  friction: 0.96,
  gravity: 1.3,
  particles: 90,
  traceLength: 3,
  traceSpeed: 12,
  explosion: 7,
  intensity: 25,
  flickering: 40,
  lineStyle: 'round',
  hue: {
    min: 0,
    max: 60
  },
  delay: {
    min: 25,
    max: 45
  },
  rocketsPoint: {
    min: 50,
    max: 50
  },
  lineWidth: {
    explosion: {
      min: 1,
      max: 5
    },
    trace: {
      min: 0.1,
      max: 1.5
    }
  },
  brightness: {
    min: 60,
    max: 90
  },
  decay: {
    min: 0.015,
    max: 0.03
  },
  mouse: {
    click: true,
    move: false,
    max: 4
  }
});

// Start fireworks
fireworks.start();

// Handle overlay click
const overlay = document.getElementById("overlay");
overlay.addEventListener("click", () => {
  overlay.classList.add("hidden");
  
  const eagleSound = document.getElementById("eagleSound");
  const bannerSound = document.getElementById("bannerSound");
  
  eagleSound.play().then(() => {
    setTimeout(() => {
      bannerSound.play().catch(err => {
        console.log("Anthem autoplay prevented:", err);
      });
    }, 1000);
  }).catch(err => {
    console.log("Eagle sound prevented:", err);
  });
  
  triggerFireworksBurst(15);
});

// Celebrate America function
function celebrateAmerica() {
  const eagleSound = document.getElementById("eagleSound");
  eagleSound.currentTime = 0;
  eagleSound.play();
  
  triggerFireworksBurst(20);
  showPatrioticMessage();
  createStarBurst();
}

// Trigger fireworks burst
function triggerFireworksBurst(count = 10) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * (window.innerHeight * 0.6);
      const event = new MouseEvent('click', {
        clientX: x,
        clientY: y
      });
      document.body.dispatchEvent(event);
    }, i * 150);
  }
}

// Show patriotic messages
function showPatrioticMessage() {
  const messages = [
    "🇺🇸 GOD BLESS AMERICA! 🇺🇸",
    "🦅 LAND OF THE FREE! 🦅",
    "⭐ HOME OF THE BRAVE! ⭐",
    "🗽 LIBERTY AND JUSTICE FOR ALL! 🗽",
    "🎆 AMERICA THE BEAUTIFUL! 🎆",
    "⚡ UNITED WE STAND! ⚡",
    "🎇 FREEDOM RINGS! 🎇",
    "🌟 IN GOD WE TRUST! 🌟",
    "🎊 E PLURIBUS UNUM! 🎊",
    "💫 ONE NATION UNDER GOD! 💫"
  ];
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  
  const messageDiv = document.createElement('div');
  messageDiv.textContent = randomMessage;
  messageDiv.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3.5rem;
    color: #FFD700;
    text-shadow: 
      0 0 30px #FFD700,
      0 0 60px #FFD700,
      4px 4px 0 #B22234,
      -4px -4px 0 #3C3B6E,
      4px -4px 0 #B22234,
      -4px 4px 0 #3C3B6E;
    z-index: 10000;
    pointer-events: none;
    animation: messagePopup 2.5s ease-out forwards;
    font-family: mercuhfont, serif;
    text-align: center;
    padding: 30px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
    border: 3px solid #FFD700;
  `;
  
  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    messageDiv.remove();
  }, 2500);
}

// Create star burst effect
function createStarBurst() {
  const stars = ['⭐', '🌟', '✨', '💫'];
  
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const star = document.createElement('div');
      const randomStar = stars[Math.floor(Math.random() * stars.length)];
      
      star.textContent = randomStar;
      star.style.cssText = `
        position: fixed;
        left: 50%;
        top: 50%;
        font-size: 2rem;
        pointer-events: none;
        z-index: 9999;
        animation: starBurst ${1 + Math.random()}s ease-out forwards;
      `;
      
      const angle = (Math.PI * 2 * i) / 20;
      const distance = 200 + Math.random() * 200;
      
      star.style.setProperty('--angle', angle);
      star.style.setProperty('--distance', distance + 'px');
      
      document.body.appendChild(star);
      
      setTimeout(() => star.remove(), 2000);
    }, i * 50);
  }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes messagePopup {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.3) rotate(-10deg);
    }
    15% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.2) rotate(5deg);
    }
    85% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1) rotate(0deg);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5) rotate(10deg);
    }
  }
  
  @keyframes starBurst {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(0);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate(
        calc(-50% + var(--distance) * cos(var(--angle))),
        calc(-50% + var(--distance) * sin(var(--angle)))
      ) scale(2) rotate(720deg);
    }
  }
`;
document.head.appendChild(style);

// Smooth scroll for navigation
document.querySelectorAll('.main-nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const headerHeight = document.querySelector('.main-header').offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll effects - add glow to sections as they come into view
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInOnScroll 1s ease-out';
      
      // Trigger small fireworks when reaching important sections
      if (entry.target.id === 'bill-of-rights' || 
          entry.target.id === 'constitution' ||
          entry.target.id === 'declaration') {
        setTimeout(() => {
          triggerFireworksBurst(5);
        }, 300);
      }
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
  sectionObserver.observe(section);
});

// Add sparkle trail on mouse move (more subtle)
let lastSparkleTime = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastSparkleTime > 100 && Math.random() > 0.7) {
    lastSparkleTime = now;
    createSparkle(e.clientX, e.clientY);
  }
});

function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  const colors = ['#FFD700', '#FFFFFF', '#B22234', '#3C3B6E'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  sparkle.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: 6px;
    height: 6px;
    background: ${color};
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    animation: sparkleAnim 1s ease-out forwards;
    box-shadow: 0 0 10px ${color};
  `;
  
  document.body.appendChild(sparkle);
  
  setTimeout(() => {
    sparkle.remove();
  }, 1000);
}

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
  @keyframes sparkleAnim {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0) translateY(-30px);
    }
  }
`;
document.head.appendChild(sparkleStyle);

// Random patriotic facts
const patrioticFacts = [
  "🗽 The Statue of Liberty was a gift from France in 1886",
  "🔔 The Liberty Bell has a crack and weighs 2,080 pounds",
  "🦅 The Bald Eagle can fly up to 10,000 feet in the air",
  "⭐ Each star on the flag represents one of the 50 states",
  "📜 The Constitution was signed by 39 founding fathers",
  "🎆 The 4th of July celebrates independence since 1776",
  "🏛️ The White House has 132 rooms and 35 bathrooms",
  "🗻 Mount Rushmore took 14 years to carve",
  "🎵 The Star-Spangled Banner became the anthem in 1931",
  "📖 The Declaration took 17 days to write"
];

// Show facts periodically when user is engaged
let factInterval;
window.addEventListener('scroll', () => {
  clearTimeout(factInterval);
  factInterval = setTimeout(() => {
    if (!overlay.classList.contains('hidden') && Math.random() > 0.7) {
      showFact();
    }
  }, 3000);
}, { passive: true });

function showFact() {
  const fact = patrioticFacts[Math.floor(Math.random() * patrioticFacts.length)];
  
  const factDiv = document.createElement('div');
  factDiv.textContent = fact;
  factDiv.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, #B22234 0%, #3C3B6E 100%);
    color: white;
    padding: 20px 30px;
    border-radius: 15px;
    font-size: 1.1rem;
    z-index: 1001;
    animation: factSlideIn 4s ease-out forwards;
    max-width: 350px;
    text-align: center;
    border: 3px solid #FFD700;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  `;
  
  document.body.appendChild(factDiv);
  
  setTimeout(() => {
    factDiv.remove();
  }, 4000);
}

const factStyle = document.createElement('style');
factStyle.textContent = `
  @keyframes factSlideIn {
    0% {
      opacity: 0;
      right: -400px;
    }
    15% {
      opacity: 1;
      right: 20px;
    }
    85% {
      opacity: 1;
      right: 20px;
    }
    100% {
      opacity: 0;
      right: -400px;
    }
  }
`;
document.head.appendChild(factStyle);

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Press 'F' for Freedom (celebrate)
  if (e.key === 'f' || e.key === 'F') {
    celebrateAmerica();
  }
  
  // Press 'A' for Anthem
  if (e.key === 'a' || e.key === 'A') {
    const bannerSound = document.getElementById("bannerSound");
    if (bannerSound.paused) {
      bannerSound.play();
    } else {
      bannerSound.pause();
      bannerSound.currentTime = 0;
    }
  }
});

// Auto-celebrate on special scroll positions
let hasTriggeredConstitution = false;
let hasTriggeredBillOfRights = false;

window.addEventListener('scroll', () => {
  const constitutionSection = document.getElementById('constitution');
  const billSection = document.getElementById('bill-of-rights');
  
  if (constitutionSection && !hasTriggeredConstitution) {
    const rect = constitutionSection.getBoundingClientRect();
    if (rect.top < window.innerHeight / 2) {
      hasTriggeredConstitution = true;
      setTimeout(() => {
        createStarBurst();
      }, 500);
    }
  }
  
  if (billSection && !hasTriggeredBillOfRights) {
    const rect = billSection.getBoundingClientRect();
    if (rect.top < window.innerHeight / 2) {
      hasTriggeredBillOfRights = true;
      setTimeout(() => {
        createStarBurst();
      }, 500);
    }
  }
}, { passive: true });

console.log("🇺🇸 AMERICA! LAND OF THE FREE, HOME OF THE BRAVE! 🇺🇸");
console.log("💡 TIP: Press 'F' to celebrate freedom! Press 'A' to play/pause the anthem!");
