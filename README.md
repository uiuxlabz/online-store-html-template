# Online Store HTML Template — ESHOPPER

A premium, framework-free online marketplace template built with semantic HTML, modern CSS, and vanilla JavaScript. Designed for multi-vendor e-commerce experiences with a clean, trustworthy aesthetic.

**Live demo concept:** Vendor-verified marketplace with product browsing, category filtering, shopping cart, contact forms, and newsletter integration — all without a single framework dependency.

## Pages

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Hero with vendor cards, feature bar, category grid, trending products, promotional offers, featured vendors, testimonials, newsletter |
| About | `about.html` | Mission statement, marketplace stats, feature highlights, featured vendor partner profiles |
| Shop | `shop.html` | Full product grid with sidebar filters (categories, price, vendor, size), sorting, pagination |
| Contact | `contact.html` | Contact form, office info cards, map placeholder |

## Design Distinction — 6-Axis Analysis

| Axis | Characteristic |
|------|---------------|
| **Color Palette** | Fresh green primary (`#16A34A`) against navy (`#0F172A`) and warm neutrals — conveys trust, growth, and marketplace energy |
| **Typography** | Plus Jakarta Sans (headings) + Inter (body) — geometric modernism with excellent readability at all sizes |
| **Layout System** | CSS Grid for multi-column sections, Flexbox for component internals — responsive breakpoints at 980px, 768px, 480px |
| **Visual Language** | Rounded cards with soft shadows, leaf motif branding, verified badges, gradient overlays on hero and category images |
| **Spacing & Rhythm** | Consistent 8px base unit, generous section padding (4-5rem), tight component spacing for density without clutter |
| **Interaction Design** | Scroll-reveal animations, hover-lift cards, sticky header with shadow, burger menu with overlay, toast notifications, accordion filters |

## Features

- **Vendor Marketplace Theme** — Verified vendor badges, vendor cards, trust indicators
- **Product Grid** — Cards with images, ratings, pricing (original/sale), badges, quick actions
- **Sidebar Filters** — Accordion-based category, price range, vendor, and size filters
- **Burger Menu** — Mobile nav with overlay, Escape key dismiss, aria-expanded accessibility
- **Cart Demo** — Add-to-cart buttons with live count update and toast notification
- **Form Handling** — Client-side validation with success/error states (no alert())
- **Scroll Reveal** — IntersectionObserver-powered fade-in animations with prefers-reduced-motion support
- **Back to Top** — Scroll-triggered visibility with smooth scroll behavior
- **Newsletter** — Email subscription forms with validation
- **Responsive** — Fully responsive across desktop, tablet, and mobile breakpoints
- **Zero Dependencies** — No frameworks, no build tools, no npm — just HTML/CSS/JS

## File Structure

```
online-store-html-template/
  index.html
  about.html
  shop.html
  contact.html
  assets/
    css/
      style.css          (1485 lines — complete design system)
    js/
      main.js            (interactivity — burger, forms, cart, scroll, accordion)
    img/
      carousel-1.jpg     (hero images)
      carousel-2.jpg
      product-1..8.jpg   (product photography)
      vendor-1..7.jpg    (vendor portraits)
      cat-1..6.jpg       (category images)
      offer-1..2.png     (promotional banners)
```

## Getting Started

1. Open any `.html` file in a browser — no server required
2. All assets use relative paths, so the template works from any directory
3. Replace images in `assets/img/` with your own product/vendor photography
4. Customize colors and spacing in `assets/css/style.css` via CSS custom properties at the top of the file

## Customization

The CSS uses custom properties (variables) for all design tokens:

```css
:root {
  --green: #16A34A;       /* Primary brand color */
  --navy: #0F172A;        /* Dark backgrounds */
  --mint: #F0FDF4;        /* Light green tints */
  --radius: 10px;         /* Border radius base */
  --shadow-md: ...;       /* Elevation system */
}
```

---

**Let's Build Something Together** 🚀

Have a project in mind? Let's talk: [https://tally.so/r/q4q1L9](https://tally.so/r/q4q1L9)
