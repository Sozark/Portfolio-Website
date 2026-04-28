# Noah C. Jones — Portfolio
### noahcjones.dev

A fully custom personal portfolio site built from scratch — no templates, no frameworks. Features a Matrix-inspired visual identity, interactive entry experience, and dedicated sections for art, 3D models, motion graphics, music, and development projects.

[![Live Site](https://img.shields.io/badge/Live%20Site-noahcjones.dev-00ff41?style=flat-square)](https://noahcjones.dev)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## Overview

This portfolio was designed to reflect who I am as a creative technologist — someone who works at the intersection of design, code, and art. Rather than using a template, every component was built by hand to demonstrate both design thinking and front-end capability.

The entry experience is a Matrix-inspired pill choice scene that sets the tone for the rest of the site. Users who choose the red pill enter the portfolio. Users who choose the blue pill enter a fully rendered corporate cubicle scene — a satirical comment on the alternative.

---

## Features

- **Interactive entry page** — animated Matrix pill scene with cinematic transitions
- **Custom carousel system** — built in vanilla JavaScript with swipe support, dot navigation, and keyboard controls
- **Modal system** — supports images, video, and audio with scanline overlay disabled during media viewing
- **Art Gallery** — six original digital art pieces with descriptions
- **3D Models** — Nomad Sculpt character models with expandable modal view
- **Videos** — motion graphics and digital art animations
- **Music** — six original tracks with animated audio visualizer bars
- **Projects** — case study pages for each development project
- **Contact form** — wired to Formspree for live email delivery
- **Fully responsive** — mobile hamburger menu, responsive grid and carousel layouts
- **Matrix design system** — scanline overlay, Share Tech Mono font, green glow effects, corner bracket details

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 (custom design system, CSS variables) |
| Logic | Vanilla JavaScript (ES6+) |
| Font | Share Tech Mono (Google Fonts) |
| Icons | Font Awesome 6 |
| Form | Formspree |
| Deployment | GitHub Pages |
| Domain | Porkbun → noahcjones.dev |

---

## Project Structure

```
Portfolio-Website/
├── index.html              # Entry point — Matrix pill scene
├── portfolio.html          # Hub page — navigation grid
├── about.html              # About page with skills
├── art.html                # Art gallery
├── 3DModels.html           # 3D model gallery
├── videos.html             # Video gallery
├── music.html              # Music player
├── projects.html           # Projects grid
├── github.html             # GitHub profile page
├── contact.html            # Contact form
├── wrongChoice.html        # Blue pill — corporate cubicle scene
├── case-study-sideral.html # Sidéral case study
├── case-study-bubble-hero.html # Bubble Hero case study
├── case-study-airbnb.html  # AI Airbnb Finder case study
├── css/
│   ├── normalize.css       # CSS reset
│   ├── main.css            # Base styles and choice page
│   ├── portfolio.css       # Core design system and variables
│   ├── aboutContact.css    # About and contact page styles
│   ├── projects.css        # Projects page styles
│   ├── caseStudy.css       # Case study page styles
│   ├── about.css           # Skills section styles
│   ├── github.css          # GitHub page styles
│   ├── gridCenter.css      # Grid centering utility
│   └── wrongChoice.css     # Corporate cubicle scene styles
├── js/
│   ├── main.js             # Navigation and shared interactions
│   ├── portfolio.js        # Carousel and modal system
│   ├── wrongChoice.js      # Cubicle scene interactions
│   └── contact.js          # Contact form handling
├── img/                    # Images and favicon
├── videos/                 # Motion graphic video files
└── Music/                  # Original music tracks
```

---

## Running Locally

No build step required. Clone the repo and open any HTML file directly in your browser or use VS Code Live Server.

```bash
git clone https://github.com/Sozark/Portfolio-Website.git
cd Portfolio-Website
# Open index.html in your browser or use Live Server in VS Code
```

---

## Design Decisions

**Why vanilla JS instead of React?**
The portfolio is a static site with no complex state management needs. Vanilla JS keeps the bundle size at zero, loads instantly, and demonstrates that I understand the fundamentals — not just frameworks.

**Why a Matrix theme?**
The theme is intentional. The red pill / blue pill metaphor represents the choice between creative work that excites you versus uninspiring work just to pay the bills. It sets a tone and makes the portfolio memorable in a stack of generic ones.

**Why build from scratch?**
Templates look like templates. Building everything by hand means every design decision is intentional and every line of code is something I can explain in an interview.

---

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

## Contact

Noah C. Jones
- Portfolio: [noahcjones.dev](https://noahcjones.dev)
- Email: jonesncharbonnet@gmail.com
- GitHub: [github.com/Sozark](https://github.com/Sozark)
- LinkedIn: [linkedin.com/in/noah-jones-b31043205](https://linkedin.com/in/noah-jones-b31043205)
