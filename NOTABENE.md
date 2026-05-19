### Prerequisiti
- Node.js (versione 18 o superiore)
- npm o pnpm

### Installazione

1. **Installa le dipendenze:**
   ```bash
   npm install
   ```
   oppure con pnpm:
   ```bash
   pnpm install
   ```

2. **Avvia il server di sviluppo:**
   ```bash
   npm run dev
   ```
   oppure:
   ```bash
   pnpm dev
   ```

   ### Build per Produzione

Per creare una build di produzione:
```bash
npm run build
```



## 📁 Struttura del Progetto

```
prestigehotels/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── postcss.config.mjs
├── README.md
└── src/
    ├── main.tsx
    ├── app/
    │   ├── App.tsx
    │   └── components/
    │       ├── hotel-navbar.tsx
    │       ├── hotel-hero.tsx
    │       ├── hotel-card.tsx
    │       ├── hotel-detail.tsx
    │       ├── hotel-footer.tsx
    │       └── figma/
    │           └── ImageWithFallback.tsx
    └── styles/
        ├── index.css
        ├── tailwind.css
        ├── theme.css
        └── fonts.css