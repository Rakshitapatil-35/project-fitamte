/**
 * ============================================================================
 * BOTTOM TAB BAR NAVIGATION (Mobile Devices)
 * Fixed bottom floating glass tab bar with tactile micro-interactions.
 * ============================================================================
 */

import { store } from '../state/store.js';

export function renderBottomTabBar(currentPath = '/') {
  const tabs = [
    { path: '/gender', label: 'Gender', icon: 'wc' },
    { path: '/category', label: 'Category', icon: 'checkroom' },
    { path: '/measurements', label: 'Measure', icon: 'straighten' },
    { path: '/fit-style', label: 'Fit Style', icon: 'styler' },
    { path: '/results', label: 'Sizes', icon: 'storefront' },
    { path: '/history', label: 'Vault', icon: 'history' },
  ];

  return `
    <nav class="fm-bottom-bar" aria-label="Mobile Navigation">
      ${tabs
        .map((tab) => {
          const isActive =
            currentPath === tab.path ||
            (tab.path === '/results' && (currentPath === '/result' || currentPath === '/comparison')) ||
            (tab.path === '/fit-style' && currentPath === '/brand-picker');
          return `
            <a href="#${tab.path}" class="fm-tab-item ${isActive ? 'active' : ''}" ${isActive ? 'aria-current="page"' : ''}>
              <span class="material-symbols-outlined" style="font-size: 22px;">${tab.icon}</span>
              <span>${tab.label}</span>
            </a>
          `;
        })
        .join('')}
    </nav>
  `;
}
