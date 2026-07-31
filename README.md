# Aurelia Fine Jewellery - Luxury eCommerce HTML Template

Aurelia is a commercial-grade, responsive, and SEO-optimized HTML template tailored for premium jewelry brands, diamond retailers, fine jewelry boutiques, and luxury lifestyle platforms. 

Built with rich typography, smooth GSAP animations, a dual-theme switcher (Light/Dark), and a robust client-side eCommerce state simulator using HTML5 LocalStorage.

---

## Key Features

- **Dual Homepage Switcher**: Instantly toggle between a Cinematic background showcase slideshow and an editorial lookbook layout.
- **Glassmorphic & Premium Design Elements**: Clean borders, generous editorial letter spacing, and a responsive layout using custom CSS properties and Bootstrap 5 grids.
- **Interactive Campain Lookbooks**: Campaigns feature interactive hot-spots that load item details and click triggers directly.
- **Advanced Filtering & Sorting Engine**: Client-side filtering by categories, metals, and pricing range on grid/list catalog pages.
- **Interactive Details Showcase**: Zoom-enabled image gallery, metal selections, size options, and star review submissions.
- **Dynamic Shopping Cart & Wishlist**: Synchronized global cart drawers, wishlist counters, coupon code processing, and shipping tax calculations powered by Vanilla JavaScript and LocalStorage.
- **Bespoke Consultation Widget**: A dedicated appointment calendar system for private virtual or in-store styling sessions.
- **Fully Responsive & Clean**: Tested extensively across breakpoints from 320px up to 1920px (no horizontal scrollbar leakages).

---

## File Structure

```
/jewellery-store/
│
├── index.html
├── shop.html
├── shop-grid.html
├── shop-list.html
├── product-details.html
├── wishlist.html
├── cart.html
├── checkout.html
├── about.html
├── blog.html
├── blog-details.html
├── contact.html
├── login.html
├── signup.html
├── 404.html
│
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css       # Bootstrap 5 layout grid
│   │   ├── style.css               # Core styling and typography
│   │   ├── dark.css                # Dark mode overrides
│   │   └── animations.css          # Subtle hover keyframes & sparkles
│   │
│   ├── js/
│   │   ├── main.js                 # Cart and details interaction logic
│   │   ├── theme-toggle.js         # Theme toggler & localStorage sync
│   │   └── animations.js           # GSAP timelines and ScrollTriggers
│   │
│   ├── images/                     # Curated local photography
│   ├── icons/
│   └── fonts/
│
└── README.md
```

---

## Technical Specifications

- **HTML5 & CSS3**: Adhering to semantic elements, CSS variables, and modern web specifications.
- **Bootstrap 5**: Used strictly for grid alignments, containers, and spacing utilities. No bootstrap scripts required.
- **GSAP (GreenSock)**: Orchestrates premium entrance staggers, slide transitions, and fade-up reveals.
- **Bootstrap Icons**: Used for standard shopping bag, heart, and search drawer graphics.
- **WCAG 2.1 AA Accessibility**: Highly readable text contrasts in both modes, responsive scales, and semantic elements.

---

## Deployment & Customization

1. Open `index.html` directly in any web browser or host on basic static web platforms (GitHub Pages, Netlify, Vercel, etc.).
2. Customize base styles by adjusting variables inside [style.css](file:///c:/Users/sriva/OneDrive/Desktop/own/websites/jewellery/jewellery-store/assets/css/style.css).
3. Change default text or logo naming by replacing the brand name inside the header elements.
