# Rennes School — Phase 2 (React)

This project recreates the provided Figma UI using **React + Vite** with a **mobile-first** and responsive layout approach.

## What is implemented so far
- React project setup with Vite
- Pages:
  - `Dashboard` (`src/pages/Dashboard.jsx`)
  - `Calendar` (`src/pages/Calendar.jsx`)
- App layout structure:
  - Sidebar + main content area (desktop layout)
- Components:
  - `WelcomeCard` component with a close (X) action
    - Implemented using React state (`showWelcome`)
- Dashboard UI sections (static UI for now):
  - "Next course" list (cards)
  - Events/News header (tabs)
  - Event banners area (placeholders / images in progress)

## Tech stack
- React
- Vite
- CSS (no UI library)
- Mobile-first responsive styling

## Run locally
```bash
npm install
npm run dev
