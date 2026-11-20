/**
 * ============================================================================
 * PHASE 3: LUXURY FASHION EDITORIAL LANDING PAGE (#/)
 * - Integrates the actual supplied FITMATE logo image & emblem
 * - Luxury Warm Ivory (#E9DCC5), Espresso Brown (#392419), Champagne Gold (#C49A52),
 *   Soft Cream (#F8F5EF), Dark Chocolate (#21150F) visual identity
 * - Hero Heading: "THE PERFECT FIT. REDEFINED."
 * - Primary CTA: "Find My Perfect Fit", Secondary CTA: "Explore How It Works"
 * - Sections:
 *   1. How FITMATE Works (Enter measurements -> Choose preferred fit -> Discover recommended sizes)
 *   2. Intelligent Fit Technology (Five-model AI pipeline, body measurement analysis, garment fit prediction, cross-brand comparison)
 *   3. Explore Fashion Brands (Zara, H&M, Levi's, Uniqlo, Mango, NordicThread, AuraAtelier)
 *   4. Why FITMATE?
 *   5. Final CTA Section
 *   6. Professional Footer with supplied FITMATE branding & navigation
 * - ZERO fabricated statistics, fake testimonials, or unsupported claims.
 * ============================================================================
 */

import { store } from '../state/store.js';
import { FITMATE_IMAGES } from '../config/images.js';
import { renderTopNav, attachTopNavEvents } from '../components/TopNav.js';
import { renderBottomTabBar } from '../components/BottomTabBar.js';
import { renderToasts } from '../components/Toast.js';
import { reveal } from '../components/motion.js';

export function renderLandingPage() {
  const { isAuthenticated } = store.getState();
  const primaryStartHref = isAuthenticated ? '#/gender' : '#/auth?mode=signup';

  const brands = [
    {
      name: 'Zara',
      origin: 'Spain • Contemporary Tailoring',
      desc: 'Structured blazers, poplin shirts, trousers, and dresses graded against European pattern blocks.',
    },
    {
      name: 'H&M',
      origin: 'Sweden • Everyday Apparel',
      desc: 'Essential knitwear, relaxed shirts, denim, and daily wardrobe staples with calibrated ease.',
    },
    {
      name: "Levi's",
      origin: 'United States • Heritage Denim',
      desc: 'Iconic waist, seat, rise, and inseam specifications across straight, baggy, loose, cargo, and skinny cuts.',
    },
    {
      name: 'Uniqlo',
      origin: 'Japan • LifeWear Essentials',
      desc: 'Precision-engineered basics and outerwear calibrated for natural movement and drape.',
    },
    {
      name: 'Mango',
      origin: 'Spain • Mediterranean Silhouette',
      desc: 'Tailored dresses, linen separates, and contemporary silhouettes with refined waist-to-hip contours.',
    },
    {
      name: 'NordicThread',
      origin: 'Sweden • Architectural Minimalist',
      desc: 'Scandinavian wardrobe foundations built on verified garment dimensions and clean lines.',
    },
    {
      name: 'AuraAtelier',
      origin: 'France • Contoured Knit & Couture',
      desc: 'Sculpted silhouettes and stretch-woven garments with fabric elasticity compensation.',
    },
  ];

  return `
    <div class="app-shell">
      ${renderTopNav('/')}
      ${renderToasts()}

      <main class="main-content" style="padding-bottom: 2rem;">
        <!-- =================================================================
             HERO SECTION: EDITORIAL LUXURY SPLIT LAYOUT
             ================================================================= -->
        <section style="background: linear-gradient(135deg, #F8F5EF 0%, #E9DCC5 100%); border: 1px solid var(--color-muted-beige); border-radius: var(--radius-xl); padding: clamp(1.75rem, 4vw, 3.25rem); margin-bottom: 4rem; box-shadow: var(--shadow-md);">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 2.75rem; align-items: center;">
            
            <!-- Left Column: Brand Crest, Editorial Heading, Copy & CTAs -->
            <div>
              <div style="display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.35rem 0.9rem; background: var(--color-white); border: 1px solid var(--color-champagne-gold); border-radius: var(--radius-xs); margin-bottom: 1.5rem;">
                <span style="width: 7px; height: 7px; border-radius: 50%; background: var(--color-champagne-gold);"></span>
                <span style="font-size: 0.74rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-espresso);">
                  YOUR PERFECT FIT STARTS HERE
                </span>
              </div>

              <h1 class="fm-serif" style="font-size: clamp(2.5rem, 5.2vw, 4.1rem); font-weight: 700; line-height: 1.08; color: var(--color-dark-chocolate); margin-bottom: 1.25rem; letter-spacing: -0.01em;">
                THE PERFECT FIT.<br />
                <span style="color: var(--color-espresso); border-bottom: 2px solid var(--color-champagne-gold);">REDEFINED.</span>
              </h1>

              <p style="font-size: 1.05rem; color: var(--color-text-muted); line-height: 1.7; max-width: 540px; margin-bottom: 2rem;">
                Your measurements. Your style. Your perfect fit. Discover intelligent size recommendations across your favourite fashion brands.
              </p>

              <!-- Primary & Secondary Hero CTAs -->
              <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                <a href="${primaryStartHref}" id="btn-hero-find-fit" class="fm-btn fm-btn-primary" style="padding: 1rem 2.1rem; font-size: 0.96rem;">
                  <span>Find My Perfect Fit</span>
                  <span class="material-symbols-outlined" style="font-size: 19px; color: var(--color-champagne-gold);">arrow_forward</span>
                </a>

                <a href="#section-how-it-works" id="btn-hero-explore" data-scroll-target="section-how-it-works" class="fm-btn fm-btn-secondary" style="padding: 1rem 1.8rem; font-size: 0.96rem;">
                  <span>Explore How It Works</span>
                </a>
              </div>

              <!-- Direct Access Links: Log In / Sign Up / Guest Flow -->
              <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--color-muted-beige); font-size: 0.85rem;">
                <a href="#/auth?mode=login" style="color: var(--color-espresso); font-weight: 700; text-decoration: none;">
                  Returning Member? <span style="text-decoration: underline; color: var(--color-champagne-gold);">Log In</span>
                </a>
                <span style="color: var(--color-muted-beige);">|</span>
                <a href="#/auth?mode=signup" style="color: var(--color-espresso); font-weight: 700; text-decoration: none;">
                  New to FITMATE? <span style="text-decoration: underline;">Sign Up</span>
                </a>
                <span style="color: var(--color-muted-beige);">|</span>
                <a href="#/gender" style="color: var(--color-text-muted); font-weight: 600; text-decoration: none;">
                  Continue as Guest →
                </a>
              </div>
            </div>

            <!-- Right Column: Supplied Official FITMATE Brand Artwork & Editorial Photography Showcase -->
            <div style="display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 1rem; align-items: stretch;">
              <!-- Supplied Primary FITMATE Brand Identity Card -->
              <div class="fm-card" style="padding: 0.75rem; background: #E9DCC5; border: 1.5px solid var(--color-champagne-gold); box-shadow: var(--shadow-lg); display: flex; flex-direction: column; justify-content: space-between;">
                <div class="fm-img-frame" style="aspect-ratio: 1 / 1; border: none; background: #E9DCC5;">
                  <img
                    src="./assets/brand/fitmate-hero-logo.jpg"
                    alt="FITMATE Official Brand Identity — Your Perfect Fit Starts Here"
                    style="object-fit: contain; width: 100%; height: 100%;"
                  />
                </div>
                <div style="padding: 0.65rem 0.4rem 0.2rem; text-align: center;">
                  <div style="font-family: var(--font-serif); font-size: 1.05rem; font-weight: 700; color: var(--color-espresso);">
                    Bespoke Atelier Intelligence
                  </div>
                  <div style="font-size: 0.72rem; color: var(--color-text-muted); letter-spacing: 0.06em; text-transform: uppercase;">
                    Women's & Men's Tailored Sizing
                  </div>
                </div>
              </div>

              <!-- Stacking Fashion Editorial Photography Frames -->
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div class="fm-img-frame" style="flex: 1; min-height: 170px; border: 1px solid var(--color-muted-beige);">
                  <img
                    src="${FITMATE_IMAGES.landing.editorialHero}"
                    alt="Luxury fashion editorial collection"
                    loading="eager"
                    onerror="this.src='${FITMATE_IMAGES.brand.emblem}'"
                  />
                </div>
                <div class="fm-img-frame" style="flex: 1; min-height: 170px; border: 1px solid var(--color-muted-beige);">
                  <img
                    src="${FITMATE_IMAGES.landing.editorialAtelier}"
                    alt="Tailored garment craftsmanship and fabric drape"
                    loading="eager"
                    onerror="this.src='${FITMATE_IMAGES.brand.heroLogo}'"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        <!-- =================================================================
             SECTION 1: HOW FITMATE WORKS
             ================================================================= -->
        <section id="section-how-it-works" class="reveal-on-scroll" style="margin-bottom: 4.5rem; scroll-margin-top: 5.5rem;">
          <div style="text-align: center; max-width: 680px; margin: 0 auto 2.5rem;">
            <span class="fm-chip fm-chip-marigold" style="margin-bottom: 0.6rem;">The Process</span>
            <h2 class="fm-serif" style="font-size: clamp(2rem, 3.8vw, 2.75rem); font-weight: 700; color: var(--color-dark-chocolate); margin-bottom: 0.5rem;">
              How FITMATE Works
            </h2>
            <p style="font-size: 0.96rem; color: var(--color-text-muted);">
              Three deliberate steps from your natural silhouette to tailored size recommendations across every label.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            <!-- Step 01 -->
            <div class="fm-card" style="padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.1rem;">
                  <span class="fm-serif" style="font-size: 2.2rem; font-weight: 700; color: var(--color-champagne-gold); line-height: 1;">01</span>
                  <span class="fm-chip fm-chip-teal">Measurements</span>
                </div>
                <div class="fm-img-frame" style="height: 185px; margin-bottom: 1.25rem;">
                  <img
                    src="${FITMATE_IMAGES.landing.editorialFabric}"
                    alt="Tailoring tape and garment fabric"
                    loading="lazy"
                    onerror="this.src='${FITMATE_IMAGES.brand.emblem}'"
                  />
                </div>
                <h3 class="fm-serif" style="font-size: 1.45rem; font-weight: 700; color: var(--color-espresso); margin-bottom: 0.45rem;">
                  Enter Measurements
                </h3>
                <p style="font-size: 0.88rem; color: var(--color-text-muted); line-height: 1.6;">
                  Select Women or Men and your clothing category (Tops, Bottoms, or Dresses). Enter only the relevant body dimensions in centimetres or inches, and skip optional measurements anytime.
                </p>
              </div>
              <div style="margin-top: 1.25rem; padding-top: 0.85rem; border-top: 1px solid var(--color-border-subtle); font-size: 0.78rem; font-weight: 700; color: var(--color-espresso);">
                Supports CM & IN • Guided Anatomical Tooltips
              </div>
            </div>

            <!-- Step 02 -->
            <div class="fm-card" style="padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.1rem;">
                  <span class="fm-serif" style="font-size: 2.2rem; font-weight: 700; color: var(--color-champagne-gold); line-height: 1;">02</span>
                  <span class="fm-chip fm-chip-teal">Silhouette & Drape</span>
                </div>
                <div class="fm-img-frame" style="height: 185px; margin-bottom: 1.25rem;">
                  <img
                    src="${FITMATE_IMAGES.landing.womensShowcase}"
                    alt="Women's tailored fashion silhouette"
                    loading="lazy"
                    style="object-position: top center;"
                    onerror="this.src='${FITMATE_IMAGES.brand.emblem}'"
                  />
                </div>
                <h3 class="fm-serif" style="font-size: 1.45rem; font-weight: 700; color: var(--color-espresso); margin-bottom: 0.45rem;">
                  Choose Your Preferred Fit
                </h3>
                <p style="font-size: 0.88rem; color: var(--color-text-muted); line-height: 1.6;">
                  Select the exact garment silhouette you are shopping for — from T-shirts, Regular, Slim, Oversized, Sweatshirts, Jackets, and Kurta tops to Straight, Baggy, Cargo, Track Pants, Bodycon, and Jumpsuit cuts.
                </p>
              </div>
              <div style="margin-top: 1.25rem; padding-top: 0.85rem; border-top: 1px solid var(--color-border-subtle); font-size: 0.78rem; font-weight: 700; color: var(--color-espresso);">
                14 Category-Specific Fit Styles • Dynamic Ease Calibration
              </div>
            </div>

            <!-- Step 03 -->
            <div class="fm-card" style="padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.1rem;">
                  <span class="fm-serif" style="font-size: 2.2rem; font-weight: 700; color: var(--color-champagne-gold); line-height: 1;">03</span>
                  <span class="fm-chip fm-chip-teal">Cross-Brand Verdict</span>
                </div>
                <div class="fm-img-frame" style="height: 185px; margin-bottom: 1.25rem;">
                  <img
                    src="${FITMATE_IMAGES.landing.mensShowcase}"
                    alt="Men's tailored fashion fit recommendation"
                    loading="lazy"
                    style="object-position: top center;"
                    onerror="this.src='${FITMATE_IMAGES.brand.heroLogo}'"
                  />
                </div>
                <h3 class="fm-serif" style="font-size: 1.45rem; font-weight: 700; color: var(--color-espresso); margin-bottom: 0.45rem;">
                  Discover Your Recommended Sizes
                </h3>
                <p style="font-size: 0.88rem; color: var(--color-text-muted); line-height: 1.6;">
                  View your recommended size across every brand simultaneously with live confidence scores, tailoring notes, size chart comparisons, and a five-model AI analysis.
                </p>
              </div>
              <div style="margin-top: 1.25rem; padding-top: 0.85rem; border-top: 1px solid var(--color-border-subtle); font-size: 0.78rem; font-weight: 700; color: var(--color-espresso);">
                Instant All-Brand Comparison • Save & Edit Anytime
              </div>
            </div>
          </div>
        </section>

        <!-- =================================================================
             SECTION 2: INTELLIGENT FIT TECHNOLOGY
             ================================================================= -->
        <section id="section-features" class="reveal-on-scroll" style="margin-bottom: 4.5rem; scroll-margin-top: 5.5rem;">
          <div class="fm-card" style="padding: clamp(1.75rem, 3.5vw, 2.75rem); background: linear-gradient(145deg, #FFFFFF 0%, #F8F5EF 100%);">
            <div style="max-width: 680px; margin-bottom: 2.25rem;">
              <span class="fm-chip fm-chip-coral" style="margin-bottom: 0.6rem;">Architecture</span>
              <h2 class="fm-serif" style="font-size: clamp(1.9rem, 3.6vw, 2.6rem); font-weight: 700; color: var(--color-dark-chocolate); margin-bottom: 0.5rem;">
                Intelligent Fit Technology
              </h2>
              <p style="font-size: 0.95rem; color: var(--color-text-muted);">
                Every recommendation is computed in real time by combining deterministic garment ease strategies with our five specialized machine learning models.
              </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(245px, 1fr)); gap: 1.25rem;">
              <div style="background: var(--color-soft-cream); border: 1px solid var(--color-muted-beige); border-radius: var(--radius-md); padding: 1.4rem;">
                <div style="width: 2.5rem; height: 2.5rem; border-radius: var(--radius-sm); background: var(--color-espresso); color: var(--color-champagne-gold); display: flex; align-items: center; justify-content: center; margin-bottom: 0.9rem;">
                  <span class="material-symbols-outlined">psychology</span>
                </div>
                <h3 class="fm-serif" style="font-size: 1.3rem; font-weight: 700; color: var(--color-espresso); margin-bottom: 0.35rem;">
                  Five-Model AI Pipeline
                </h3>
                <p style="font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.55;">
                  Evaluates size probability (Model 1), fit tension dynamics (Model 2), flat garment specifications (Model 3), anthropometric body shape (Model 4), and return-risk prediction (Model 5).
                </p>
              </div>

              <div style="background: var(--color-soft-cream); border: 1px solid var(--color-muted-beige); border-radius: var(--radius-md); padding: 1.4rem;">
                <div style="width: 2.5rem; height: 2.5rem; border-radius: var(--radius-sm); background: var(--color-espresso); color: var(--color-champagne-gold); display: flex; align-items: center; justify-content: center; margin-bottom: 0.9rem;">
                  <span class="material-symbols-outlined">straighten</span>
                </div>
                <h3 class="fm-serif" style="font-size: 1.3rem; font-weight: 700; color: var(--color-espresso); margin-bottom: 0.35rem;">
                  Body Measurement Analysis
                </h3>
                <p style="font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.55;">
                  Normalizes metric and imperial dimensions, validates anatomical ranges, and computes waist-to-height proportions without distorting missing optional fields.
                </p>
              </div>

              <div style="background: var(--color-soft-cream); border: 1px solid var(--color-muted-beige); border-radius: var(--radius-md); padding: 1.4rem;">
                <div style="width: 2.5rem; height: 2.5rem; border-radius: var(--radius-sm); background: var(--color-espresso); color: var(--color-champagne-gold); display: flex; align-items: center; justify-content: center; margin-bottom: 0.9rem;">
                  <span class="material-symbols-outlined">checkroom</span>
                </div>
                <h3 class="fm-serif" style="font-size: 1.3rem; font-weight: 700; color: var(--color-espresso); margin-bottom: 0.35rem;">
                  Garment Fit Prediction
                </h3>
                <p style="font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.55;">
                  Accounts for fabric stretch elasticity and category-specific ease allowances across Women's Tops, Bottoms, Dresses, and Men's Tops and Bottoms.
                </p>
              </div>

              <div style="background: var(--color-soft-cream); border: 1px solid var(--color-muted-beige); border-radius: var(--radius-md); padding: 1.4rem;">
                <div style="width: 2.5rem; height: 2.5rem; border-radius: var(--radius-sm); background: var(--color-espresso); color: var(--color-champagne-gold); display: flex; align-items: center; justify-content: center; margin-bottom: 0.9rem;">
                  <span class="material-symbols-outlined">compare_arrows</span>
                </div>
                <h3 class="fm-serif" style="font-size: 1.3rem; font-weight: 700; color: var(--color-espresso); margin-bottom: 0.35rem;">
                  Cross-Brand Comparison
                </h3>
                <p style="font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.55;">
                  Translates your single measurement profile across multiple international brand grading blocks so you know when to size up or down per label.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- =================================================================
             SECTION 3: EXPLORE FASHION BRANDS
             ================================================================= -->
        <section id="section-brands" class="reveal-on-scroll" style="margin-bottom: 4.5rem; scroll-margin-top: 5.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
            <div>
              <span class="fm-chip fm-chip-marigold" style="margin-bottom: 0.5rem;">Catalog Coverage</span>
              <h2 class="fm-serif" style="font-size: clamp(1.9rem, 3.6vw, 2.6rem); font-weight: 700; color: var(--color-dark-chocolate);">
                Explore Fashion Brands
              </h2>
            </div>
            <p style="font-size: 0.9rem; color: var(--color-text-muted); max-width: 440px;">
              Compare your silhouette against the size charts and grading offsets of all seven catalog brands simultaneously.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.15rem;">
            ${brands
              .map(
                (b) => `
                <div class="fm-card" style="padding: 1.35rem; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                      <h3 class="fm-serif" style="font-size: 1.5rem; font-weight: 700; color: var(--color-espresso);">${b.name}</h3>
                      <span class="material-symbols-outlined" style="font-size: 18px; color: var(--color-champagne-gold);">verified</span>
                    </div>
                    <div style="font-size: 0.72rem; font-weight: 700; color: var(--color-champagne-gold); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.6rem;">
                      ${b.origin}
                    </div>
                    <p style="font-size: 0.84rem; color: var(--color-text-muted); line-height: 1.55;">
                      ${b.desc}
                    </p>
                  </div>
                  <div style="margin-top: 1rem; padding-top: 0.65rem; border-top: 1px solid var(--color-border-subtle); display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-light);">Size Chart Integrated</span>
                    <a href="#/gender" style="font-size: 0.78rem; font-weight: 700; color: var(--color-espresso); text-decoration: none;">Check My Size →</a>
                  </div>
                </div>
              `
              )
              .join('')}
          </div>
        </section>

        <!-- =================================================================
             SECTION 4: WHY FITMATE?
             ================================================================= -->
        <section id="section-about" class="reveal-on-scroll" style="margin-bottom: 4.5rem; scroll-margin-top: 5.5rem;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 2.25rem; align-items: center;">
            <div class="fm-img-frame" style="height: 430px; border: 1.5px solid var(--color-champagne-gold); box-shadow: var(--shadow-md);">
              <img
                src="${FITMATE_IMAGES.landing.womensShowcase}"
                alt="Editorial female fashion model wearing tailored champagne silk and ivory coat"
                loading="lazy"
                style="object-position: top center;"
                onerror="this.src='${FITMATE_IMAGES.brand.heroLogo}'"
              />
            </div>

            <div>
              <span class="fm-chip fm-chip-marigold" style="margin-bottom: 0.6rem;">The FITMATE Advantage</span>
              <h2 class="fm-serif" style="font-size: clamp(2rem, 3.6vw, 2.65rem); font-weight: 700; color: var(--color-dark-chocolate); margin-bottom: 1rem;">
                Why FITMATE?
              </h2>
              <p style="font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.65; margin-bottom: 1.5rem;">
                Standard size labels vary significantly from one fashion house to another. FITMATE replaces guesswork with transparent garment geometry.
              </p>

              <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; gap: 0.9rem; align-items: flex-start;">
                  <span class="material-symbols-outlined" style="color: var(--color-champagne-gold); font-size: 22px; margin-top: 2px;">check_circle</span>
                  <div>
                    <h4 style="font-size: 0.98rem; font-weight: 700; color: var(--color-espresso);">Reduce Sizing Uncertainty</h4>
                    <p style="font-size: 0.85rem; color: var(--color-text-muted);">See exact ease allowances and per-measurement fit notes before choosing a size.</p>
                  </div>
                </div>

                <div style="display: flex; gap: 0.9rem; align-items: flex-start;">
                  <span class="material-symbols-outlined" style="color: var(--color-champagne-gold); font-size: 22px; margin-top: 2px;">check_circle</span>
                  <div>
                    <h4 style="font-size: 0.98rem; font-weight: 700; color: var(--color-espresso);">Compare Sizes Across Brands</h4>
                    <p style="font-size: 0.85rem; color: var(--color-text-muted);">Understand how your size in Zara or Mango compares to H&M, Levi's, or Uniqlo for the same fit style.</p>
                  </div>
                </div>

                <div style="display: flex; gap: 0.9rem; align-items: flex-start;">
                  <span class="material-symbols-outlined" style="color: var(--color-champagne-gold); font-size: 22px; margin-top: 2px;">check_circle</span>
                  <div>
                    <h4 style="font-size: 0.98rem; font-weight: 700; color: var(--color-espresso);">Personalized Recommendations</h4>
                    <p style="font-size: 0.85rem; color: var(--color-text-muted);">Tailored to your chosen silhouette — whether you prefer a sculpted slim fit or an oversized drape.</p>
                  </div>
                </div>

                <div style="display: flex; gap: 0.9rem; align-items: flex-start;">
                  <span class="material-symbols-outlined" style="color: var(--color-champagne-gold); font-size: 22px; margin-top: 2px;">check_circle</span>
                  <div>
                    <h4 style="font-size: 0.98rem; font-weight: 700; color: var(--color-espresso);">Save and Reuse Measurements</h4>
                    <p style="font-size: 0.85rem; color: var(--color-text-muted);">Store profiles by category and gender, track timestamped measurement changes, and re-run recommendations anytime.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- =================================================================
             SECTION 5: FINAL CTA BANNER
             ================================================================= -->
        <section class="reveal-on-scroll" style="margin-bottom: 2rem;">
          <div style="background: var(--color-espresso); color: var(--color-warm-ivory); border: 1.5px solid var(--color-champagne-gold); border-radius: var(--radius-xl); padding: clamp(2rem, 4vw, 3.25rem); text-align: center; box-shadow: var(--shadow-lg);">
            <img
              src="./assets/brand/fitmate-emblem-crop.jpg"
              alt="FITMATE Emblem"
              style="width: 72px; height: 72px; object-fit: cover; border-radius: 50%; border: 1.5px solid var(--color-champagne-gold); margin: 0 auto 1rem;"
            />
            <h2 class="fm-serif" style="font-size: clamp(1.9rem, 3.8vw, 2.75rem); font-weight: 700; color: var(--color-white); margin-bottom: 0.65rem;">
              Begin Your Bespoke Fitting Experience
            </h2>
            <p style="font-size: 0.96rem; color: var(--color-muted-beige); max-width: 540px; margin: 0 auto 1.75rem;">
              Enter your measurements once or sign in to your saved vault to discover your recommended size across every fashion brand.
            </p>
            <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
              <a href="${primaryStartHref}" class="fm-btn fm-btn-gold" style="padding: 0.95rem 2.2rem;">
                <span>Find My Perfect Fit</span>
                <span class="material-symbols-outlined" style="font-size: 19px;">arrow_forward</span>
              </a>
              <a href="#/auth?mode=login" class="fm-btn fm-btn-secondary" style="background: transparent; color: var(--color-warm-ivory); border-color: var(--color-champagne-gold); padding: 0.95rem 1.85rem;">
                <span>Log In to Saved Vault</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <!-- ===================================================================
           SECTION 6: PROFESSIONAL LUXURY FOOTER
           =================================================================== -->
      <footer class="fm-luxury-footer" role="contentinfo">
        <div class="fm-luxury-footer-inner">
          <div>
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
              <img
                src="./assets/brand/fitmate-hero-logo.jpg"
                alt="FITMATE Official Brand Logo"
                style="width: 54px; height: 54px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--color-champagne-gold);"
              />
              <div>
                <div class="fm-serif" style="font-size: 1.5rem; font-weight: 700; color: var(--color-white); letter-spacing: 0.08em;">FITMATE</div>
                <div style="font-size: 0.65rem; color: var(--color-champagne-gold); letter-spacing: 0.14em; text-transform: uppercase;">Your Perfect Fit Starts Here</div>
              </div>
            </div>
            <p style="font-size: 0.84rem; color: var(--color-muted-beige); line-height: 1.6;">
              AI-powered clothing size recommendation and cross-brand garment fit analysis platform.
            </p>
          </div>

          <div>
            <h4 class="fm-serif" style="font-size: 1.15rem; font-weight: 700; color: var(--color-white); margin-bottom: 0.85rem;">Platform</h4>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <a href="#/gender">Gender Selection</a>
              <a href="#/category">Clothing Categories</a>
              <a href="#/measurements">Body Measurements</a>
              <a href="#/fit-style">Fit-Style Selection</a>
              <a href="#/results">Brand Recommendations</a>
            </div>
          </div>

          <div>
            <h4 class="fm-serif" style="font-size: 1.15rem; font-weight: 700; color: var(--color-white); margin-bottom: 0.85rem;">Account & Vault</h4>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <a href="#/auth?mode=login">Log In</a>
              <a href="#/auth?mode=signup">Sign Up</a>
              <a href="#/history">Saved Measurement Profiles</a>
              <a href="#/comparison">Size Chart Comparison Matrix</a>
            </div>
          </div>

          <div>
            <h4 class="fm-serif" style="font-size: 1.15rem; font-weight: 700; color: var(--color-white); margin-bottom: 0.85rem;">Supported Brands</h4>
            <p style="font-size: 0.84rem; color: var(--color-muted-beige); line-height: 1.7;">
              Zara • H&M • Levi's • Uniqlo • Mango • NordicThread • AuraAtelier
            </p>
          </div>
        </div>

        <div style="max-width: 1200px; margin: 2.25rem auto 0; padding-top: 1.25rem; border-top: 1px solid rgba(214, 196, 167, 0.2); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; font-size: 0.78rem; color: var(--color-muted-beige);">
          <span>© ${new Date().getFullYear()} FITMATE. All rights reserved.</span>
          <span>Powered by 5-Model Sizing Intelligence & Verified Brand Size Charts</span>
        </div>
      </footer>

      ${renderBottomTabBar('/')}
    </div>
  `;
}

export function onMountLandingPage(params = {}) {
  attachTopNavEvents();

  // Returning users with a valid session skip this page and go straight to #/gender unless ?stay=1 is passed
  const { isAuthenticated } = store.getState();
  if (isAuthenticated && !params?.stay) {
    window.location.hash = '#/gender';
    return;
  }

  reveal('.reveal-on-scroll', {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });
}
