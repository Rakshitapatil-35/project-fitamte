/**
 * ============================================================================
 * TOP NAVIGATION COMPONENT (Luxury Editorial Navbar)
 * - Uses the supplied FITMATE logo image on the left
 * - Landing links: Home, How It Works, Features, Brands, About, Log In, Get Started
 * - Application flow links & Active Profile Pill for inside-app steps
 * ============================================================================
 */

import { store } from '../state/store.js';

export function renderTopNav(currentPath = '/') {
  const { user, isAuthenticated, activeProfile } = store.getState();
  const profileName = activeProfile ? activeProfile.profile_name : user ? user.full_name : 'Guest';

  const isLanding = currentPath === '/';

  const landingAnchorLinks = [
    { href: '#/', label: 'Home', section: 'top' },
    { href: '#section-how-it-works', label: 'How It Works', section: 'section-how-it-works' },
    { href: '#section-features', label: 'Features', section: 'section-features' },
    { href: '#section-brands', label: 'Brands', section: 'section-brands' },
    { href: '#section-about', label: 'About', section: 'section-about' },
  ];

  const appFlowLinks = [
    { path: '/?stay=1', label: 'Home' },
    { path: '/gender', label: 'Gender' },
    { path: '/category', label: 'Category' },
    { path: '/measurements', label: 'Measurements' },
    { path: '/fit-style', label: 'Fit Style' },
    { path: '/results', label: 'Brand Sizes' },
    { path: '/history', label: 'Saved Vault' },
  ];

  return `
    <header class="fm-top-nav" id="main-top-nav" role="banner">
      <div class="fm-top-nav-inner">
        <!-- Supplied FITMATE Brand Logo Lockup -->
        <a href="${isAuthenticated ? '#/gender' : '#/'}" class="fm-brand-lockup" aria-label="FITMATE Home">
          <img
            src="./assets/brand/fitmate-emblem-crop.jpg"
            alt="FITMATE Couture Emblem"
            class="fm-brand-logo-img"
            onerror="this.src='./assets/brand/fitmate-hero-logo.jpg'"
          />
          <div style="display: flex; flex-direction: column;">
            <span class="fm-brand-title">FITMATE</span>
            <span class="fm-brand-subtitle">Bespoke Sizing AI</span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="fm-nav-links" aria-label="Main Navigation">
          ${
            isLanding
              ? landingAnchorLinks
                  .map(
                    (item, idx) => `
                  <a href="${item.href}" class="fm-nav-link ${idx === 0 ? 'active' : ''}" data-scroll-target="${item.section}">
                    ${item.label}
                  </a>
                `
                  )
                  .join('')
              : appFlowLinks
                  .map((link) => {
                    const cleanLinkPath = link.path.split('?')[0];
                    const isActive =
                      currentPath === cleanLinkPath ||
                      (cleanLinkPath === '/results' && (currentPath === '/result' || currentPath === '/comparison')) ||
                      (cleanLinkPath === '/fit-style' && currentPath === '/brand-picker');
                    return `
                    <a href="#${link.path}" class="fm-nav-link ${isActive ? 'active' : ''}" ${isActive ? 'aria-current="page"' : ''}>
                      ${link.label}
                    </a>
                  `;
                  })
                  .join('')
          }
        </nav>

        <!-- Right User Actions -->
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          ${
            isAuthenticated
              ? `
              <a href="#/history" class="fm-chip fm-chip-teal" style="text-decoration: none; display: flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.9rem;" title="Manage saved measurements">
                <span class="material-symbols-outlined" style="font-size: 16px; color: var(--color-champagne-gold);">verified_user</span>
                <span style="max-width: 135px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 700;">${profileName}</span>
              </a>

              <button id="btn-nav-logout" type="button" class="fm-btn fm-btn-secondary fm-btn-sm" title="Sign out">
                <span class="material-symbols-outlined" style="font-size: 17px;">logout</span>
                <span>Log Out</span>
              </button>
            `
              : `
              <a href="#/auth?mode=login" class="fm-btn fm-btn-secondary fm-btn-sm">
                Log In
              </a>
              <a href="#/auth?mode=signup" class="fm-btn fm-btn-primary fm-btn-sm">
                Get Started
              </a>
            `
          }
        </div>
      </div>
    </header>
  `;
}

export function attachTopNavEvents() {
  const logoutBtn = document.getElementById('btn-nav-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await store.logout();
      window.location.hash = '#/';
    });
  }

  // Smooth in-page section scrolling on the landing page without breaking hash routing
  document.querySelectorAll('a[data-scroll-target]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('data-scroll-target');
      if (!targetId) return;
      if (targetId === 'top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const sectionEl = document.getElementById(targetId);
      if (sectionEl) {
        e.preventDefault();
        sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll condensation handler
  const nav = document.getElementById('main-top-nav');
  if (nav && !window.__topNavScrollBound) {
    window.__topNavScrollBound = true;
    window.addEventListener(
      'scroll',
      () => {
        const top = window.scrollY || document.documentElement.scrollTop;
        if (top > 24) {
          nav.classList.add('is-scrolled');
        } else {
          nav.classList.remove('is-scrolled');
        }
      },
      { passive: true }
    );
  }
}
