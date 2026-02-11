# Rennes School — Phase 2 (React)

This repository contains the **Phase 2** delivery of the Rennes School UI: the dashboard and related pages rebuilt with **React**, based on the provided design mockups.

## Deliverables
- **Public GitHub Repository:** https://github.com/burcusavci96/rennes-school-phase2
- **Live Demo (Vercel):** rennes-school-phase2.vercel.app

> Phase 1 (HTML/CSS) repository and live demo are delivered separately.

---

## Scope
The project recreates the required screens and layout as a React application, including:
- Responsive dashboard layout (mobile / tablet / desktop)
- Navigation between pages (Dashboard / News / Schedule)
- Dashboard sections: Events banners, Welcome card, Schedule list
- Schedule views (Day / Week / Month) with responsive behavior

---

## Tech Stack
- React
- Vite
- React Router
- CSS (custom styles)

---

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm

### Install dependencies
```bash
npm install

Project Structure (overview)
	•	src/components/ — reusable UI components (layout, schedule, news, etc.)
	•	src/sections/ — dashboard sections (events panel, welcome card, schedule list)
	•	src/data/ — mock data sources (events, schedule, etc.)
	•	src/styles/ — global and page-level styles

⸻


Notes
	•	The UI is implemented according to the provided design mockups.
	•	Required assets are included in the repository.
	•	Schedule data is mocked under src/data/ and can be replaced with an API integration.

    Author - Burcu Savcı