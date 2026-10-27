# Pixel & Bohne – MUI & Feature-Architektur (Demo 06)

Professionelles Enterprise-Demo-Projekt für **Material UI (MUI)** und **Feature-basierte Architektur** in React & TypeScript.

Dieses Projekt setzt das State-Management-Projekt aus Teil 05 fort, refaktoriert die flache Komponentenstruktur in modulare **Features** und ersetzt das handgeschriebene CSS durch das **Design-System von MUI**.

---

## Schnellstart

```bash
npm install
npm run dev
```

Die Applikation läuft standardmäßig auf `http://localhost:5173`. Es wird kein externes Backend benötigt – die API wird in [`src/features/products/api/productsApi.ts`](./src/features/products/api/productsApi.ts) mit Netzwerkverzögerung und zuschaltbarem Fehlermodus simuliert.

---

## 🏛 Projekt- & Architekturübersicht

Das Projekt demonstriert die Prinzipien aus [📘 React 06 - Cheat Sheet: Teil B (React Architektur)](../../📘%20React%2006%20-%20Architektur%20&%20MUI%20-%20Cheat%20Sheet.md#teil-b-react-architektur):

```text
src/
├── features/                     # Modulare Fachbereiche (Features)
│   ├── products/                 # Feature-Modul: Produktkatalog
│   │   ├── api/
│   │   │   └── productsApi.ts    # Schicht 1: API-Calls & Datentransformation
│   │   ├── hooks/
│   │   │   └── useProducts.ts    # Schicht 2: Business Logic & TanStack Query
│   │   └── components/           # Schicht 3: UI-Präsentation
│   │       ├── ProductCard.tsx   # MUI Card & Dialog
│   │       ├── ProductList.tsx   # MUI Grid & Filter
│   │       └── CreateProductForm.tsx # MUI Formular & Validation
│   └── cart/                     # Feature-Modul: Warenkorb
│       ├── store/
│       │   └── cartStore.ts      # Zustand Store
│       └── components/
│           └── CartPanel.tsx     # MUI Paper, List & Badges
├── shared/                       # Querschnittliche Module & Design System
│   ├── context/
│   │   └── ThemeContext.tsx      # Globaler ThemeMode (light/dark)
│   ├── theme/
│   │   └── muiTheme.ts           # MUI Theme Factory (createTheme)
│   └── types/
│       └── product.ts            # Domänentypen & TypeScript Interfaces
├── App.tsx                       # App-Shell (AppBar, Grid-Layout, Sidebar)
└── main.tsx                      # Root Provider-Komposition & CssBaseline
```

---

## 🔗 Verknüpfung zum Cheat Sheet (Wo finde ich was?)

### 1. Material UI (MUI) Deep-Dive (Teil A)

| Konzept | Implementierung im Demo-Projekt | Referenz im Cheat Sheet |
|---|---|---|
| **Setup & CssBaseline** | Normalisierung des Viewports und Theme-Injektion in [`src/main.tsx`](./src/main.tsx) | [A.1 Installation & Setup](../../📘%20React%2006%20-%20Architektur%20&%20MUI%20-%20Cheat%20Sheet.md#a1-installation--setup) |
| **Theme Engine** | Zentrale Farbpalette, Typografie und globale Radien in [`src/shared/theme/muiTheme.ts`](./src/shared/theme/muiTheme.ts) | [A.2 `createTheme` – Das Design-System konfigurieren](../../📘%20React%2006%20-%20Architektur%20&%20MUI%20-%20Cheat%20Sheet.md#a2-createtheme--das-design-system-konfigurieren) |
| **`sx`-Prop Styling** | Flexbox, Spacing und Pseudoklassen (z. B. Hover-Effekt) in [`src/features/products/components/ProductCard.tsx`](./src/features/products/components/ProductCard.tsx) | [A.3 `sx`-Prop vs. `styled()`](../../📘%20React%2006%20-%20Architektur%20&%20MUI%20-%20Cheat%20Sheet.md#a3-sx-prop-vs-styled-vs-makestyles) |
| **MUI Core Components** | `AppBar`, `Container`, `Grid`, `Card`, `Dialog`, `TextField`, `ToggleButtonGroup` in `App.tsx` und Feature-Komponenten | [A.4 Die wichtigsten MUI-Komponenten](../../📘%20React%2006%20-%20Architektur%20&%20MUI%20-%20Cheat%20Sheet.md#a4-die-wichtigsten-mui-komponenten) |
| **Component Overrides** | Globales Abschalten von Button-Großschreibung (`textTransform: "none"`) in [`src/shared/theme/muiTheme.ts`](./src/shared/theme/muiTheme.ts) | [A.5 Component Overrides – Globale Anpassungen](../../📘%20React%2006%20-%20Architektur%20&%20MUI%20-%20Cheat%20Sheet.md#a5-component-overrides--globale-anpassungen) |
| **Dynamischer Dark Mode** | Verknüpfung von React Context + `useMemo` + `buildMuiTheme(mode)` in [`src/main.tsx`](./src/main.tsx) und [`src/shared/context/ThemeContext.tsx`](./src/shared/context/ThemeContext.tsx) | [A.6 Dark Mode mit `useMemo` + `createTheme`](../../📘%20React%2006%20-%20Architektur%20&%20MUI%20-%20Cheat%20Sheet.md#a6-dark-mode-mit-usememo--createtheme) |

---

### 2. React Architektur & Best Practices (Teil B)

| Architektur-Muster | Implementierung im Demo-Projekt | Referenz im Cheat Sheet |
|---|---|---|
| **Feature-basierte Ordnerstruktur** | Kapselung nach Fachlichkeit (`features/products/`, `features/cart/`) statt flacher `components/`-Ordner | [B.1 Flat vs. Feature-basierte Ordnerstruktur](../../📘%20React%2006%20-%20Architektur%20&%20MUI%20-%20Cheat%20Sheet.md#b1-flat-vs-feature-basierte-ordnerstruktur) |
| **Feature-Sliced Design Schichten** | Trennung in `features/` (Geschäftsfunktionen) und `shared/` (wiederverwendbare Basiselemente wie Theme und Typen) | [B.2 Feature-Sliced Design (FSD)](../../📘%20React%2006%20-%20Architektur%20&%20MUI%20-%20Cheat%20Sheet.md#b2-feature-sliced-design-fsd) |
| **3-Schichten-Modell im Feature** | Aufteilung in `api/productsApi.ts` (Schicht 1) ➔ `hooks/useProducts.ts` (Schicht 2) ➔ `components/ProductList.tsx` (Schicht 3) | [B.3 Die 3 Schichten innerhalb eines Features](../../📘%20React%2006%20-%20Architektur%20&%20MUI%20-%20Cheat%20Sheet.md#b3-die-3-schichten-innerhalb-eines-features) |
| **Presentational vs. Container** | [`ProductList.tsx`](./src/features/products/components/ProductList.tsx) enthält keinerlei Daten-Fetching-Logik, sondern konsumiert ausschließlich den Custom Hook [`useProducts.ts`](./src/features/products/hooks/useProducts.ts) | [B.4 Presentational vs. Container Components](../../📘%20React%2006%20-%20Architektur%20&%20MUI%20-%20Cheat%20Sheet.md#b4-presentational-vs-container-components) |
| **Barrel Exports** | Export über `index.ts` Schnittstellen (siehe Lösungsbranch `solution/06-ü6-barrel`) | [B.5 Barrel Exports mit `index.ts`](../../📘%20React%2006%20-%20Architektur%20&%20MUI%20-%20Cheat%20Sheet.md#b5-barrel-exports-mit-indexts) |

