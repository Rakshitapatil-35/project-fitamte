/**
 * ============================================================================
 * LOADING, EMPTY & ERROR STATE COMPONENTS
 * Clean reusable feedback blocks.
 * ============================================================================
 */

export function renderLoadingSpinner(message = 'Analyzing body geometry & brand matrix...') {
  return `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem 1.5rem; text-align: center; gap: 1rem;">
      <div class="fm-spinner"></div>
      <p style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-muted); max-width: 320px;">
        ${message}
      </p>
    </div>
  `;
}

export function renderEmptyState({ icon = 'inventory_2', title = 'No records found', message = 'There are no items matching this filter.', actionLabel = null, actionHref = null, onAction = null }) {
  return `
    <div class="fm-card" style="text-align: center; padding: 3.5rem 1.5rem; max-width: 480px; margin: 2rem auto;">
      <div style="width: 4rem; height: 4rem; border-radius: var(--radius-pill); background: var(--color-surface-subtle); color: var(--color-secondary); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
        <span class="material-symbols-outlined" style="font-size: 32px;">${icon}</span>
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--color-text-main); margin-bottom: 0.4rem;">${title}</h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 1.5rem; line-height: 1.5;">${message}</p>
      ${
        actionLabel && actionHref
          ? `<a href="${actionHref}" class="fm-btn fm-btn-primary fm-btn-sm">${actionLabel}</a>`
          : ''
      }
    </div>
  `;
}

export function renderErrorState({ title = 'Unable to Load Data', message = 'Could not establish connection to the sizing engine.', retryFnName = null }) {
  return `
    <div class="fm-card" style="text-align: center; padding: 3rem 1.5rem; max-width: 480px; margin: 2rem auto; border-top: 4px solid var(--color-error);">
      <div style="width: 3.5rem; height: 3.5rem; border-radius: var(--radius-pill); background: var(--color-error-light); color: var(--color-error); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
        <span class="material-symbols-outlined" style="font-size: 28px;">error_outline</span>
      </div>
      <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--color-text-main); margin-bottom: 0.4rem;">${title}</h3>
      <p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 1.5rem; line-height: 1.5;">${message}</p>
      ${
        retryFnName
          ? `<button onclick="${retryFnName}()" class="fm-btn fm-btn-secondary fm-btn-sm">
              <span class="material-symbols-outlined" style="font-size: 18px;">refresh</span> Try Again
             </button>`
          : ''
      }
    </div>
  `;
}
