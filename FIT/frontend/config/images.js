/**
 * ============================================================================
 * FITMATE CENTRALIZED IMAGE CONFIGURATION
 * Single source of truth mapping Brand, Landing, Gender, Category, Fit Style,
 * and Anatomical Measurement Guides to locally stored, gender-verified assets.
 *
 * CRITICAL INVARIANTS:
 * - Men's assets (`assets/images/mens/*`) are ONLY used for Men (`male`).
 * - Women's assets (`assets/images/womens/*`) are ONLY used for Women (`female`).
 * - 'Slim' is kept ONLY for Tops (Men & Women) and REMOVED from Bottoms.
 * - 'Shift' is removed from the Dresses UI catalog (replaced by 'Jumpsuit').
 * ============================================================================
 */

export const FITMATE_IMAGES = {
  brand: {
    heroLogo: './assets/brand/fitmate-hero-logo.jpg',
    emblem: './assets/brand/fitmate-emblem-crop.jpg',
    emblemFull: './assets/brand/fitmate-emblem.jpg',
    favicon: './assets/brand/favicon.png',
  },
  landing: {
    editorialHero: './assets/images/landing/editorial-hero.jpg',
    editorialAtelier: './assets/images/landing/editorial-atelier.jpg',
    editorialFabric: './assets/images/landing/editorial-fabric.jpg',
    womensShowcase: './assets/images/womens/womens-hero.jpg',
    mensShowcase: './assets/images/mens/mens-hero.jpg',
  },
  gender: {
    male: {
      hero: './assets/images/mens/mens-hero.jpg',
      alt: "Men's tailored fashion collection featuring an adult male model",
    },
    female: {
      hero: './assets/images/womens/womens-hero.jpg',
      alt: "Women's tailored fashion collection featuring an adult female model",
    },
  },
  categories: {
    male: {
      tops: './assets/images/mens/mens-tops.jpg',
      bottoms: './assets/images/mens/mens-bottoms.jpg',
    },
    female: {
      tops: './assets/images/womens/womens-tops.jpg',
      bottoms: './assets/images/womens/womens-bottoms.jpg',
      dresses: './assets/images/womens/womens-dresses.jpg',
    },
  },
  fitStyles: {
    male: {
      tops: {
        'T-shirts': './assets/images/mens/mens-tshirt.jpg',
        Regular: './assets/images/mens/mens-regular.jpg',
        Slim: './assets/images/mens/mens-slim.jpg',
        Oversized: './assets/images/mens/mens-oversized.jpg',
        Sweatshirts: './assets/images/mens/mens-sweatshirt.jpg',
        Jackets: './assets/images/mens/mens-jacket.jpg',
        Kurta: './assets/images/mens/mens-kurta.jpg',
      },
      bottoms: {
        Straight: './assets/images/mens/mens-straight.jpg',
        Loose: './assets/images/mens/mens-loose.jpg',
        Baggy: './assets/images/mens/mens-baggy.jpg',
        Trousers: './assets/images/mens/mens-trousers.jpg',
        Cargo: './assets/images/mens/mens-cargo.jpg',
        'Track Pants': './assets/images/mens/mens-trackpants.jpg',
        Shorts: './assets/images/mens/mens-shorts.jpg',
        Skinny: './assets/images/mens/mens-skinny.jpg',
      },
    },
    female: {
      tops: {
        'T-shirts': './assets/images/womens/womens-tshirt.jpg',
        Regular: './assets/images/womens/womens-regular.jpg',
        Slim: './assets/images/womens/womens-slim.jpg',
        Oversized: './assets/images/womens/womens-oversized.jpg',
        Cropped: './assets/images/womens/womens-cropped.jpg',
        Sweatshirts: './assets/images/womens/womens-sweatshirt.jpg',
        Jackets: './assets/images/womens/womens-jacket.jpg',
        Kurta: './assets/images/womens/womens-kurta.jpg',
      },
      bottoms: {
        Straight: './assets/images/womens/womens-straight.jpg',
        Loose: './assets/images/womens/womens-loose.jpg',
        Baggy: './assets/images/womens/womens-baggy.jpg',
        Trousers: './assets/images/womens/womens-trousers.jpg',
        Cargo: './assets/images/womens/womens-cargo.jpg',
        'Track Pants': './assets/images/womens/womens-trackpants.jpg',
        Shorts: './assets/images/womens/womens-shorts.jpg',
        Skinny: './assets/images/womens/womens-skinny.jpg',
      },
      dresses: {
        Bodycon: './assets/images/womens/womens-bodycon.jpg',
        'A-line': './assets/images/womens/womens-aline.jpg',
        Maxi: './assets/images/womens/womens-maxi.jpg',
        Jumpsuit: './assets/images/womens/womens-jumpsuit.jpg',
      },
    },
  },
  measurementGuides: {
    chest: './assets/images/measurement-guides/chest-bust.svg',
    waist: './assets/images/measurement-guides/waist.svg',
    hips: './assets/images/measurement-guides/hips.svg',
    shoulder: './assets/images/measurement-guides/shoulders.svg',
    height: './assets/images/measurement-guides/height.svg',
    inseam: './assets/images/measurement-guides/inseam.svg',
  },
};

export function getCategoryImage(gender, categoryGroup) {
  const g = gender === 'male' ? 'male' : 'female';
  const group = g === 'male' && categoryGroup === 'dresses' ? 'tops' : categoryGroup || 'tops';
  return FITMATE_IMAGES.categories[g][group] || FITMATE_IMAGES.gender[g].hero;
}

export function getFitStyleImage(gender, categoryGroup, fitStyleId) {
  const g = gender === 'male' ? 'male' : 'female';
  const group = g === 'male' && categoryGroup === 'dresses' ? 'tops' : categoryGroup || 'tops';
  const map = FITMATE_IMAGES.fitStyles[g]?.[group] || {};
  return map[fitStyleId] || getCategoryImage(g, group) || FITMATE_IMAGES.brand.emblem;
}
