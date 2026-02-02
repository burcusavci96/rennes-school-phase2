cat > README.md <<'EOF'
# Rennes School — Phase 2 (React)

React + Vite ile, verilen Figma tasarımına göre (mobile-first) responsive bir arayüz geliştirme çalışması.

## Implemented
- Vite + React proje kurulumu
- Sayfalar:
  - Dashboard (`src/pages/Dashboard.jsx`)
  - Calendar (`src/pages/Calendar.jsx`)
- Bileşenler:
  - `WelcomeCard` (kapatma/X butonu state ile çalışır)
- Dashboard içeriği (UI):
  - Next course kartları
  - Events/News başlığı (tabs)
  - Banner alanı (görseller/styling devam ediyor)
- Genel: CSS ile responsive layout (phase ilerledikçe birebir entegrasyon)

## Run locally
```bash
npm install
npm run dev