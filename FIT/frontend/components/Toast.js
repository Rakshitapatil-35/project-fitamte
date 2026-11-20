/**
 * ============================================================================
 * TOAST NOTIFICATIONS COMPONENT (Dynamic & Spring-Animated)
 * Renders floating alerts for validation, success, warning, and network feedback
 * with spring physics and auto-dismiss countdown progress bar.
 * ============================================================================
 */

import { store } from '../state/store.js';

export function renderToasts() {
  const { toasts } = store.getState();
  if (!toasts || toasts.length === 0) return '';

  return `
    <div class="fm-toast-container" id="toast-root" role="region" aria-label="Notifications" aria-live="polite">
      ${toasts
        .map((t) => {
          let icon = 'info';
          let toastClass = '';
          if (t.type === 'error') {
            icon = 'error';
            toastClass = 'toast-error';
          } else if (t.type === 'success') {
            icon = 'check_circle';
            toastClass = 'toast-success';
          } else if (t.type === 'warning') {
            icon = 'warning';
            toastClass = 'toast-warning';
          }

          const durationMs = t.duration || 4500;

          return `
            <div class="fm-toast ${toastClass}" id="toast-${t.id}" role="alert">
              <span class="material-symbols-outlined" style="font-size: 20px;">${icon}</span>
              <span style="flex: 1; line-height: 1.4;">${t.message}</span>
              <button onclick="window.__dismissToast('${t.id}')" aria-label="Dismiss notification" style="background: none; border: none; cursor: pointer; color: inherit; padding: 0.2rem; display: flex; align-items: center; border-radius: 50%;">
                <span class="material-symbols-outlined" style="font-size: 16px;">close</span>
              </button>
              <div class="fm-toast-progress" style="animation-duration: ${durationMs}ms;"></div>
            </div>
          `;
        })
        .join('')}
    </div>
  `;
}

// Global dismiss helper
if (typeof window !== 'undefined') {
  window.__dismissToast = (id) => {
    const el = document.getElementById(`toast-${id}`);
    if (el) {
      el.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
      el.style.transform = 'translateX(60px) scale(0.9)';
      el.style.opacity = '0';
      setTimeout(() => store.removeToast(id), 200);
    } else {
      store.removeToast(id);
    }
  };
}
