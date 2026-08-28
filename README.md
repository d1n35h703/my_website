# Dual View Studio

Build a dual-mode interactive portfolio application using React, Tailwind CSS, Framer Motion, and Lucide icons. The app features two distinct UI presentation modes with a seamless transition system.

### State & Mode Switching Strategy

- Implement a global `useViewMode` state hook toggling between `"agency"` (Public Mode) and `"ubuntu"` (OS Mode).
- Include a fixed header switcher with a slick toggle button (e.g., "Agency View" ⇄ "Ubuntu OS Mode / Login").
- Smooth transition: Use Framer Motion's `AnimatePresence` to cross-fade between the visual Agency page and the Ubuntu Desktop interface.

---

### MODE 1: Agency Style Portfolio

A modern, dark-themed, glassmorphic agency landing page inspired by high-end design studios.

1. Navigation Bar:
   - Floating glassmorphism pill container with blur (`backdrop-blur-md bg-zinc-900/80 border border-zinc-800`).
   - Logo, page links (Home, About, Projects, Services, Experience, Contact), and a "Get in Touch" CTA button.

2. Hero Section:
   - High-impact dark slate/zinc background with ambient glowing color orbs (amber and electric blue radial gradients).
   - Dynamic headline with crisp white typography, micro-badges, and blurred photographic preview cards featuring subtle hover motion.

3. About & Stats Section:
   - Minimalist grid showcasing core values, key metrics, and background stats using clean cards with thin border highlights.

4. Interactive Projects Showcase:
   - Grid or horizontal snap-scroll cards showcasing featured builds with key metrics (performance gain, tech stack badges, live demo links).

5. Services Accordion/Tabs:
   - Interactive tabbed component categorizing core competencies (Design, Web Development, Cybersecurity, Cloud Architecture).

6. Contact Form Modal/Section:
   - Modern dark panel with interactive budget selection chips, sleek form fields, and instant client feedback state.

---

### MODE 2: Ubuntu OS Desktop Environment

An interactive, simulated Ubuntu Linux desktop complete with draggable windows, dock shortcuts, and a CLI terminal.

1. Top Status Bar:
   - Fixed top panel (`bg-zinc-950 text-zinc-300 text-xs px-4 py-1 flex justify-between`).
   - Left side: "Activities" menu, current app title.
   - Right side: System time/date clock, Wi-Fi icon, battery level, and user avatar dropdown.

2. Left Dock (Ubuntu Dash):
   - Vertical floating dock on the left side with dark glass styling and hover scaling icons:
     - Terminal (`Terminal` icon)
     - Projects (`Folder` icon)
     - About (`User` icon)
     - Services (`Cpu` icon)
     - Contact (`Mail` icon)
     - Settings (`Settings` icon)

3. Draggable Window Manager:
   - Build a reusable `Window` component with state for `isOpen`, `isMinimized`, `isMaximized`, and `position` (or use `framer-motion` drag constraints).
   - Ubuntu Title Bar: Red (close), Yellow (minimize), and Green (maximize) dots on the left or top-right, with the active app name centered.
   - Opening an app from the dock or terminal spawns a floating window on top of the desktop wallpaper without routing to a new page.

4. Interactive Ubuntu Terminal App:
   - Classic dark monospaced window with custom prompt: `visitor@portfolio:~$`.
   - Command Execution Engine:
     - `help`: Returns interactive command list (`ls`, `cat about.txt`, `projects`, `clear`, `contact`, `open <app>`).
     - `ls`: Lists available apps/directories (`projects.app`, `about.txt`, `services.sh`, `contact.exe`).
     - `cat <file>`: Prints file content directly into the terminal stream.
     - `open <app>`: Spawns the corresponding GUI window modal on the desktop.
     - Interactive Clickable Fallback: Terminal text outputs include clickable text links that trigger the corresponding window popup.

### Design System & Theme

- Palette: Dark Zinc (`#09090b`), Slate (`#18181b`), Accent Amber/Orange (`#f97316`), Electric Blue (`#3b82f6`).
- Typography: Inter/Sans-serif for Agency Mode; Monospace (Fira Code/JetBrains Mono) for OS/Terminal Mode.
- Fully responsive design with mobile fallback cards when OS Mode is viewed on smaller screens.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1cd2dfb5-2e4e-4d92-a155-b947a88371bc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
