/**
 * ============================================================================
 * FITMATE MOTION & INTERACTION UTILITIES (Zero-Dependency)
 * High-performance, 60fps hardware-accelerated micro-interactions using:
 * - CSS Variables & Web Animations API (WAAPI)
 * - Canvas 2D particle simulation
 * - IntersectionObserver & requestAnimationFrame
 * - Full prefers-reduced-motion accessibility compliance
 * ============================================================================
 */

export const MotionTokens = {
  duration: {
    micro: 120,
    fast: 200,
    normal: 320,
    slow: 600,
    long: 1200,
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    entrance: 'cubic-bezier(0.16, 1, 0.3, 1)', // Smooth deceleration
    exit: 'cubic-bezier(0.4, 0, 1, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Snappy overshoot
    bounce: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  },
};

/**
 * Check if the user has requested reduced motion.
 */
export function isReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Scroll Reveal using IntersectionObserver
 */
export function reveal(selectorOrElements, options = {}) {
  if (isReducedMotion()) {
    const els = typeof selectorOrElements === 'string'
      ? document.querySelectorAll(selectorOrElements)
      : (selectorOrElements instanceof NodeList ? selectorOrElements : [selectorOrElements]);
    els.forEach((el) => {
      if (el) el.style.opacity = '1';
    });
    return null;
  }

  const {
    threshold = 0.15,
    rootMargin = '0px 0px -40px 0px',
    staggerDelay = 60,
    className = 'is-revealed',
  } = options;

  const elements = typeof selectorOrElements === 'string'
    ? Array.from(document.querySelectorAll(selectorOrElements))
    : (selectorOrElements instanceof NodeList ? Array.from(selectorOrElements) : [selectorOrElements].filter(Boolean));

  if (!elements.length) return null;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        setTimeout(() => {
          el.classList.add(className);
        }, idx * staggerDelay);
        obs.unobserve(el);
      }
    });
  }, { threshold, rootMargin });

  elements.forEach((el) => {
    el.classList.add('fm-reveal-init');
    observer.observe(el);
  });

  return observer;
}

/**
 * Stagger sequence execution across a list of DOM elements
 */
export function stagger(elements, animationFn, delayBetweenMs = 60) {
  if (!elements || !elements.length) return;
  const list = Array.isArray(elements) ? elements : Array.from(elements);
  list.forEach((el, index) => {
    if (!el) return;
    if (isReducedMotion()) {
      animationFn(el, index);
    } else {
      setTimeout(() => animationFn(el, index), index * delayBetweenMs);
    }
  });
}

/**
 * RAF-based Animated Number Counter with easeOutExpo
 */
export function countUp(element, endVal, options = {}) {
  if (!element) return;
  const {
    duration = MotionTokens.duration.slow,
    decimals = 0,
    prefix = '',
    suffix = '',
    startVal = 0,
  } = options;

  if (isReducedMotion()) {
    element.textContent = `${prefix}${endVal.toFixed(decimals)}${suffix}`;
    return;
  }

  const startTime = performance.now();
  const diff = endVal - startVal;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Exponential ease-out curve
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = startVal + diff * ease;

    element.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = `${prefix}${endVal.toFixed(decimals)}${suffix}`;
    }
  }

  requestAnimationFrame(update);
}

/**
 * FLIP Animation (First, Last, Invert, Play) for smooth list reordering & layout transitions
 */
export function flip(container, mutateFn, duration = MotionTokens.duration.normal) {
  if (!container) {
    if (mutateFn) mutateFn();
    return;
  }

  if (isReducedMotion()) {
    if (mutateFn) mutateFn();
    return;
  }

  const children = Array.from(container.children);
  // FIRST: Record initial bounding rects
  const firstRects = new Map();
  children.forEach((el) => {
    firstRects.set(el, el.getBoundingClientRect());
  });

  // Execute DOM mutation (reorder, filter, append)
  if (mutateFn) mutateFn();

  // LAST: Record final bounding rects
  const newChildren = Array.from(container.children);
  newChildren.forEach((el) => {
    const first = firstRects.get(el);
    if (!first) return;
    const last = el.getBoundingClientRect();

    // INVERT: Calculate delta transform
    const deltaX = first.left - last.left;
    const deltaY = first.top - last.top;

    if (deltaX !== 0 || deltaY !== 0) {
      // PLAY: Animate using WAAPI
      el.animate(
        [
          { transform: `translate(${deltaX}px, ${deltaY}px)` },
          { transform: 'translate(0, 0)' },
        ],
        {
          duration,
          easing: MotionTokens.easing.entrance,
        }
      );
    }
  });
}

/**
 * Snappy Spring Physics Helper
 */
export function spring({ from = 0, to = 1, stiffness = 170, damping = 26, mass = 1, onUpdate, onComplete }) {
  if (isReducedMotion()) {
    if (onUpdate) onUpdate(to);
    if (onComplete) onComplete();
    return () => {};
  }

  let current = from;
  let velocity = 0;
  let rafId = null;
  let lastTime = performance.now();

  function step(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.032); // Max 32ms step
    lastTime = now;

    const springForce = -stiffness * (current - to);
    const dampingForce = -damping * velocity;
    const acceleration = (springForce + dampingForce) / mass;

    velocity += acceleration * dt;
    current += velocity * dt;

    if (onUpdate) onUpdate(current);

    // Settle condition
    if (Math.abs(current - to) < 0.001 && Math.abs(velocity) < 0.01) {
      if (onUpdate) onUpdate(to);
      if (onComplete) onComplete();
      return;
    }

    rafId = requestAnimationFrame(step);
  }

  rafId = requestAnimationFrame(step);
  return () => {
    if (rafId) cancelAnimationFrame(rafId);
  };
}

/**
 * 3D Card Hover Tilt with Specular Glare (max 6 degrees)
 */
export function tilt3d(cardElement, maxDeg = 6) {
  if (!cardElement || isReducedMotion()) return () => {};

  cardElement.style.transformStyle = 'preserve-3d';
  cardElement.style.transition = 'transform 0.15s ease-out, box-shadow 0.2s ease-out';

  // Add subtle specular glare element if not present
  let glare = cardElement.querySelector('.fm-tilt-glare');
  if (!glare) {
    glare = document.createElement('div');
    glare.className = 'fm-tilt-glare';
    glare.style.cssText = `
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      pointer-events: none;
      border-radius: inherit;
      background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 70%);
      opacity: 0;
      transition: opacity 0.2s ease;
      mix-blend-mode: overlay;
      z-index: 2;
    `;
    cardElement.appendChild(glare);
  }

  function handleMouseMove(e) {
    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxDeg;
    const rotateY = ((x - centerX) / centerX) * maxDeg;

    cardElement.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
    glare.style.opacity = '1';
    glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 60%)`;
  }

  function handleMouseLeave() {
    cardElement.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    glare.style.opacity = '0';
  }

  cardElement.addEventListener('mousemove', handleMouseMove);
  cardElement.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    cardElement.removeEventListener('mousemove', handleMouseMove);
    cardElement.removeEventListener('mouseleave', handleMouseLeave);
  };
}

/**
 * Confetti Burst Particle Canvas (1.5s, Warm Cream Palette)
 */
export function confetti(canvasElement, options = {}) {
  if (isReducedMotion() || !canvasElement) return;

  const ctx = canvasElement.getContext('2d');
  if (!ctx) return;

  const width = (canvasElement.width = window.innerWidth);
  const height = (canvasElement.height = window.innerHeight);

  const colors = [
    '#FF6B6B', // Coral
    '#22A699', // Deep Retail Teal
    '#F7B731', // Marigold
    '#6EC1F7', // Sky
    '#C9B6F2', // Lilac
    '#FFEFEA', // Subtle Peach
  ];

  const particleCount = options.count || 75;
  const particles = [];
  const originX = options.x || width / 2;
  const originY = options.y || height / 3;

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 8;
    particles.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      size: 6 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      shape: Math.random() > 0.4 ? 'rect' : 'circle',
      alpha: 1,
      decay: 0.012 + Math.random() * 0.015,
    });
  }

  let startTime = performance.now();
  const maxDuration = 1600; // 1.6s

  function frame(now) {
    const elapsed = now - startTime;
    ctx.clearRect(0, 0, width, height);

    let activeCount = 0;
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // Gravity
      p.vx *= 0.98; // Air resistance
      p.rotation += p.rotSpeed;
      p.alpha -= p.decay;

      if (p.alpha > 0) {
        activeCount++;
        ctx.save();
        ctx.globalAlpha = Math.max(p.alpha, 0);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    });

    if (activeCount > 0 && elapsed < maxDuration) {
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  }

  requestAnimationFrame(frame);
}

/**
 * Click Ripple origin animation
 */
export function ripple(e, buttonElement) {
  if (isReducedMotion() || !buttonElement) return;

  const rect = buttonElement.getBoundingClientRect();
  const diameter = Math.max(rect.width, rect.height) * 2;
  const radius = diameter / 2;

  const circle = document.createElement('span');
  circle.className = 'fm-btn-ripple';
  circle.style.width = `${diameter}px`;
  circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - rect.left - radius}px`;
  circle.style.top = `${e.clientY - rect.top - radius}px`;

  // Remove existing ripples
  const existing = buttonElement.querySelector('.fm-btn-ripple');
  if (existing) existing.remove();

  buttonElement.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
}

/**
 * Subtle Ambient Drifting Background Blobs & Cursor Parallax
 */
export function initBackgroundBlobs(container) {
  if (!container || document.getElementById('fm-bg-blobs')) return;

  const blobWrapper = document.createElement('div');
  blobWrapper.id = 'fm-bg-blobs';
  blobWrapper.setAttribute('aria-hidden', 'true');
  blobWrapper.className = 'fm-ambient-blobs';
  blobWrapper.innerHTML = `
    <div class="fm-blob blob-1"></div>
    <div class="fm-blob blob-2"></div>
    <div class="fm-blob blob-3"></div>
  `;
  container.prepend(blobWrapper);

  if (isReducedMotion()) return;

  // Subtle cursor parallax
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  function onMouseMove(e) {
    targetX = (e.clientX / window.innerWidth - 0.5) * 24;
    targetY = (e.clientY / window.innerHeight - 0.5) * 24;
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });

  function renderParallax() {
    mouseX += (targetX - mouseX) * 0.05;
    mouseY += (targetY - mouseY) * 0.05;
    blobWrapper.style.transform = `translate3d(${mouseX.toFixed(2)}px, ${mouseY.toFixed(2)}px, 0)`;
    requestAnimationFrame(renderParallax);
  }

  requestAnimationFrame(renderParallax);
}

/**
 * Cursor-aware radial glow on primary CTAs (Desktop only)
 */
export function attachCursorGlow(buttonSelector = '.fm-btn-glow') {
  if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll(buttonSelector).forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty('--glow-x', `${x}px`);
      btn.style.setProperty('--glow-y', `${y}px`);
    });
  });
}
