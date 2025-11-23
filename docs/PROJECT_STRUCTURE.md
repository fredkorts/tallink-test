# Project Structure & Tech Stack

## Overview

This is a React-based calculator application built with Vite. The app features two modes: **Math Mode** (for basic calculations and max prime number operations) and **Currency Mode** (for currency conversions). The project uses MirageJS for API mocking during development.

---

## Tech Stack

### Core Framework & Libraries

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI framework |
| **React DOM** | 18.2.0 | React renderer for web |
| **Vite** | 5.2.0 | Build tool and dev server |
| **MirageJS** | 0.1.48 | API mocking for development |

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| **@vitejs/plugin-react** | 4.2.1 | Vite plugin for React support |
| **@types/react** | 18.2.66 | TypeScript types for React |
| **@types/react-dom** | 18.2.22 | TypeScript types for React DOM |
| **Prettier** | 3.2.5 | Code formatting |

### Build Configuration

- **Module Type**: ES Modules
- **Build Tool**: Vite
- **Development Server**: Vite Dev Server
- **Package Manager**: npm

---

## Current Folder Structure

```
tallink-test/
├── .editorconfig              # Editor configuration (indent, line endings, etc.)
├── .git/                      # Git repository
├── .gitignore                 # Git ignore rules
├── LICENSE                    # Project license
├── README.md                  # Project overview and requirements
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── package-lock.json          # Locked dependency versions
├── vite.config.js             # Vite configuration
│
├── docs/                      # Project documentation (ignored by git)
│   ├── EDGE_CASES.md          # Comprehensive edge case checklist
│   ├── REQUIREMENTS.md        # Formatted project requirements
│   ├── USER_STORIES.md        # User stories organized by epic
│   └── WRITING_CODE.md        # React coding philosophy and guidelines
│
├── public/                    # Static assets served as-is
│   └── calc-icon.svg          # Calculator favicon
│
└── src/                       # Source code
    ├── main.jsx               # Application entry point
    ├── App.jsx                # Root application component
    ├── index.css              # Global styles
    └── mirage.js              # MirageJS server configuration
```

---

## File Descriptions

### Root Level

#### `index.html`
- HTML entry point for the application
- Includes the root div (`#root`) where React renders
- Links to favicon and main JavaScript entry point

#### `package.json`
- Project metadata and dependencies
- Scripts:
  - `npm run dev` - Start development server
  - `npm run build` - Build for production
  - `npm run preview` - Preview production build

#### `vite.config.js`
- Vite build configuration
- Configures React plugin for JSX support

#### `.editorconfig`
- Editor settings for consistent code formatting
- Specifies: LF line endings, 2-space indentation, max line length 100

#### `.gitignore`
- Excludes: `node_modules/`, `dist/`, build artifacts, editor files, **`docs/`** folder

---

### `docs/` Directory

**Note**: This folder is ignored by git (used for local development documentation only)

#### `REQUIREMENTS.md`
- Formatted and organized project requirements
- Covers Math Mode, Currency Mode, development guidelines, and testing

#### `EDGE_CASES.md`
- Comprehensive checklist of edge cases
- Categories: Math operations, Currency mode, Mode switching, Performance, Accessibility, Testing, Security
- Includes checkboxes for tracking implementation

#### `USER_STORIES.md`
- 50 user stories organized into 13 epics
- Each story has acceptance criteria
- Covers functionality, UX, accessibility, testing, and deployment

#### `WRITING_CODE.md`
- React development philosophy and best practices
- Covers: Component structure, hooks, testing, TypeScript usage, tooling

---

### `public/` Directory

#### `calc-icon.svg`
- Application favicon
- Displayed in browser tab

---

### `src/` Directory

#### `main.jsx`
- Application entry point
- Initializes MirageJS mock server
- Renders React app into `#root` div with StrictMode

#### `App.jsx`
- Root application component
- **Current State**: Contains placeholder UI for testing API endpoints
  - Two input fields for testing POST to `/api/history`
  - Buttons to fetch from `/api/history` and `/api/rates`
  - Displays fetched data as JSON
- **To Be Implemented**: Full calculator UI with Math and Currency modes

#### `index.css`
- Global styles for the application
- Currently minimal/default Vite styles

#### `mirage.js`
- MirageJS mock server configuration
- **Models**: `record` (for history)
- **API Endpoints**:
  - `GET /api/history` - Retrieve calculation history
  - `POST /api/history` - Store calculation records
  - `GET /api/rates` - Retrieve currency exchange rates (simulated 6-second delay)
- **Seed Data**: Empty records array
- **Rate Data**: Exchange rates for USD, EUR, AUD, CAD, JPY

---

## Development Setup

### Prerequisites
- Node.js (version compatible with React 18)
- npm (comes with Node.js)

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
- Starts Vite dev server (typically on `http://localhost:5173`)
- Hot module replacement enabled
- MirageJS mock server runs automatically

### Production Build
```bash
npm run build
```
- Creates optimized production build in `dist/` folder
- Minifies and bundles all assets

### Preview Production Build
```bash
npm run preview
```
- Serves the production build locally for testing

---

## API Endpoints (MirageJS Mocked)

### History Endpoints

#### `GET /api/history`
- Returns array of calculation records
- Currently empty by default

#### `POST /api/history`
- Accepts calculation data
- Schema: `{ input1, input2, operation?, result? }` (to be refined)
- Stores in MirageJS in-memory database

### Currency Endpoints

#### `GET /api/rates`
- Returns exchange rates object
- Structure:
  ```json
  {
    "USD": { "EUR": 0.94, "AUD": 1.56, "CAD": 1.38, "JPY": 154.525 },
    "EUR": { "USD": 1.07, "AUD": 1.66, "CAD": 1.47, "JPY": 164.132 },
    ...
  }
  ```
- Simulated 6-second response delay for testing loading states

---

## Current State & Next Steps

### ✅ Completed
- Project scaffolded with Vite + React
- MirageJS configured for API mocking
- Documentation created (requirements, edge cases, user stories, coding guidelines)
- Basic placeholder UI for API testing

### 🚧 To Be Implemented
- Full calculator UI matching Figma designs
- Math Mode operations (addition, subtraction, multiplication, division, max prime)
- Currency Mode with live conversion
- History display panel
- Keyboard input support
- Comprehensive error handling
- Unit and integration tests
- TypeScript migration (types are installed but not yet used)
- Accessibility features
- Responsive design

---

## Code Quality Tools

### Currently Configured
- **Prettier**: Code formatting
- **EditorConfig**: Consistent editor settings

### To Be Added (Per Coding Guidelines)
- ESLint with strict rules
- TypeScript strict mode
- Pre-commit hooks
- CI/CD pipeline for linting, type-checking, and testing

---

## Notes

- **TypeScript**: Type definitions are installed but the project currently uses `.jsx` files. Migration to `.tsx` is planned.
- **MirageJS**: Mock server is enabled by default. Can be toggled off to use real API endpoints when available.
- **Docs Folder**: Intentionally excluded from git for local-only development notes.
- **Naming**: Project internally named `test-calc` but displayed as "Test calc" in browser.
