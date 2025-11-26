# Project Structure & Tech Stack

## Overview

This is a fully functional React + TypeScript calculator application built with Vite. The app features two modes:
- **Math Mode**: Basic arithmetic operations (addition, subtraction, multiplication, division) plus a prime number operation
- **Currency Mode**: Real-time currency conversion with exchange rate display

The project uses MirageJS for API mocking during development and follows a feature-based architecture with shared utilities.

---

## Tech Stack

### Core Framework & Libraries

| Technology | Version | Purpose |
|------------|---------| --------|
| **React** | 18.2.0 | UI framework |
| **TypeScript** | 5.x | Type safety and developer experience |
| **Vite** | 5.2.0 | Build tool and dev server |
| **MirageJS** | 0.1.48 | API mocking for development |

### Development Tools

| Tool | Version | Purpose |
|------|---------| --------|
| **@vitejs/plugin-react** | 4.2.1 | Vite plugin for React support |
| **@types/react** | 18.2.66 | TypeScript types for React |
| **@types/react-dom** | 18.2.22 | TypeScript types for React DOM |
| **Prettier** | 3.2.5 | Code formatting |

### Build Configuration

- **Language**: TypeScript
- **Module Type**: ES Modules  
- **Build Tool**: Vite
- **Development Server**: Vite Dev Server with HMR
- **Package Manager**: npm

---

## Project Architecture

The application follows a **feature-based architecture** with clear separation of concerns:

```
src/
├── features/           # Feature modules (math, currency)
│   ├── math/          # Math calculator feature
│   └── currency/      # Currency converter feature
├── components/        # Shared components
├── hooks/            # Global hooks
├── services/         # API service layer
├── utils/            # Utility functions and constants
└── styles/           # Global styles and CSS variables
```

---

## Detailed Folder Structure

```
tallink-test/
├── .editorconfig              # Editor configuration
├── .gitignore                 # Git ignore rules
├── LICENSE                    # MIT License
├── README.md                  # Project overview
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
│
├── docs/                      # Project documentation (git-ignored)
│   ├── EDGE_CASES.md
│   ├── PROJECT_STRUCTURE.md   # This file
│   ├── REQUIREMENTS.md
│   ├── USER_STORIES.md
│   └── WRITING_CODE.md
│
├── public/                    # Static assets
│   └── calc-icon.svg
│
└── src/                       # Source code
    ├── main.tsx               # Application entry point
    ├── App.tsx                # Root component
    ├── index.css              # Global styles
    ├── mirage.js              # Mock API server
    ├── vite-env.d.ts          # Vite TypeScript definitions
    │
    ├── components/            # Shared components
    │   ├── Calculator/                # Unified calculator view
    │   │   ├── Calculator.tsx
    │   │   └── Calculator.module.css
    │   ├── Common/
    │   │   ├── Button/                # Reusable button component
    │   │   ├── ErrorMessage/          # Error display component
    │   │   ├── IconButton/            # Icon-based button
    │   │   ├── LoadingSpinner/        # Loading state indicator
    │   │   └── ModeToggle/            # Mode switching control
    │   └── Layout/
    │       ├── AppLayout/             # Main app layout wrapper
    │       ├── Header/                # App header
    │       └── ModeToggle/            # Layout-specific toggle
    │
    ├── features/              # Feature modules
    │   ├── math/
    │   │   ├── components/
    │   │   │   ├── Keypad/            # Number/operator keypad
    │   │   │   └── MathDisplay/       # Math expression display
    │   │   ├── hooks/
    │   │   │   ├── useCalculator.ts   # Calculator logic hook
    │   │   │   ├── useHistory.ts      # History management hook
    │   │   │   └── useKeyboardHandler.ts # Keyboard input hook
    │   │   └── utils/
    │   │       ├── helpers.ts          # Combined math helpers (ops, validation, formatting)
    │   │   └── __tests__/             # Math feature tests
    │   │
    │   └── currency/
    │       ├── components/
    │       │   └── CurrencyDisplay/   # Currency input/output UI
    │       ├── hooks/
    │       │   └── useCurrencyConverter.ts # Currency logic hook
    │       └── utils/
    │           └── helpers.ts         # Currency utilities
    │
    ├── hooks/                 # Global hooks
    │   ├── useApi.ts          # Generic API hook
    │   ├── useCurrencyRates.ts # Exchange rates hook
    │   ├── useLocalStorage.ts  # localStorage hook
    │   └── useTimer.ts         # Interval-based timer hook
    │   └── __tests__/          # Hook tests
    │
    ├── services/              # API service layer
    │   ├── historyService.ts  # History API calls
    │   ├── ratesService.ts    # Rates API calls
    │   ├── types.ts           # Service types
    │   └── __tests__/         # Service tests
    │
    ├── utils/                 # Shared utilities
    │   ├── apiHelpers.ts      # API utility functions
    │   ├── constants.ts       # App-wide constants
    │   └── timeFormatters.ts  # Date/time formatting
    │
    ├── styles/                # Global styles
    │   └── variables.css      # CSS custom properties (colors, spacing)
```

---

## Component Overview

### Shared Components (`/src/components`)

#### Calculator Components
- **`Calculator`**: Unified calculator view that manages mode state and conditionally renders Math or Currency panels with a shared keypad.

#### Common Components
- **`Button`**: Reusable button with variants and states
- **`ErrorMessage`**: Consistent error display component
- **`IconButton`**: Button with icon support
- **`LoadingSpinner`**: Loading state indicator
- **`ModeToggle`**: Toggle between Math and Currency modes

#### Layout Components
- **`AppLayout`**: Main application layout structure
- **`Header`**: Application header with branding
- **`ModeToggle`**: Layout-specific mode toggle

---

### Math Feature (`/src/features/math`)

#### Components
- **`MathDisplay`**: Expression and result display
  - Props: `expression`, `result`, `history`, `isError`
  - Shows current calculation, result, and recent history

- **`Keypad`**: Interactive number and operator buttons
  - Props: Handlers for numbers, operators, equals, clear, backspace
  - Adapts layout based on mode (math vs currency)

#### Hooks
- **`useCalculator`**: Core calculator logic
  - Returns: `expression`, `result`, `lastEntry`, `isError`, handlers
  - Handles: Number input, operators, equals, clear, backspace
  
- **`useHistory`**: Calculation history management
  - Syncs with localStorage and API
  - Returns: `history`, `addHistoryEntry`, `clearHistory`
  
- **`useKeyboardHandler`**: Keyboard input support
  - Listens for number keys, operators, Enter, Escape, Backspace
  - Enabled for math mode in the unified view

#### Utilities
- **`helpers.ts`**: Combined arithmetic operations, validation, formatting, and prime helpers

---

### Currency Feature (`/src/features/currency`)

#### Components
- **`CurrencyDisplay`**: Currency input/output UI
  - Props: Currencies, rates, loading/error states, handlers
  - Shows: Currency selectors, input/output fields, exchange rate timestamp

#### Hooks
- **`useCurrencyConverter`**: Currency conversion logic
  - Fetches rates from API
  - Handles currency selection and value conversion
  - Returns: State values and event handlers

#### Utilities
- **`helpers.ts`**: Currency filtering, input sanitization, and formatting utilities

---

### Global Hooks (`/src/hooks`)

- **`useApi`**: Generic API hook with loading/error states
- **`useCurrencyRates`**: Fetches and caches exchange rates
- **`useLocalStorage`**: Sync state with localStorage
- **`useTimer`**: Interval hook for re-rendering timestamped UI

---

### Services (`/src/services`)

- **`historyService`**: API calls for calculation history
  - `getHistory()`, `postHistory()`, `deleteHistory()`
  
- **`ratesService`**: API calls for exchange rates
  - `getRates()`

- **`types`**: Shared service types
  - `HistoryRecord`, `ExchangeRates`

---

### Utilities (`/src/utils`)

- **`apiHelpers`**: Fetch wrappers, error handling, retry logic
- **`constants`**: 
  - Calculator modes (`MATH`, `CURRENCY`)
  - Operations (`ADD`, `SUBTRACT`, `MULTIPLY`, `DIVIDE`, `PRIME`)
  - Special values (`NAN`, `ERROR`)
  - API endpoints
  
- **`timeFormatters`**: 
  - `formatTimeAgo()`: Relative time formatting (e.g., "2 hours ago")

---

## Styling Architecture

### CSS Modules
- Each component has a co-located `.module.css` file
- Scoped styles prevent naming conflicts
- TypeScript integration with typed class names

### Global Styles
- **`index.css`**: Base styles, resets, typography
- **`styles/variables.css`**: CSS custom properties
  - Color tokens (primary, background, text, etc.)
  - Spacing scale
  - Border radius, shadows, transitions

### Design Tokens
```css
--color-primary: #007bff;
--color-background: #1a1a1a;
--color-text: #e0e0e0;
--color-text-muted: #888;
--color-warning: #ff6b6b;
/* ... and more */
```

---

## Key Features

### Math Mode
✅ Basic arithmetic operations (+, -, ×, ÷)  
✅ Prime number operation (finds max prime ≤ input)  
✅ Expression display with calculation history  
✅ Keyboard support (numbers, operators, Enter, Escape, Backspace)  
✅ Error handling (division by zero, invalid expressions)  
✅ History persistence (localStorage + API)  

### Currency Mode
✅ Real-time currency conversion  
✅ Support for USD, EUR, AUD, CAD, JPY  
✅ Exchange rate display with timestamp  
✅ Loading and error states  
✅ Automatic conversion on input  
✅ Keypad input (numbers and decimal)  

### Shared Features
✅ Mode switching (Math ↔ Currency)  
✅ Responsive layout  
✅ Accessible UI (ARIA labels, keyboard navigation)  
✅ Modern, polished design  
✅ TypeScript type safety  

---

## Development Workflow

### Running the App
```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build
```

### Code Quality
- TypeScript for type safety
- CSS Modules for scoped styling
- Prettier for code formatting
- EditorConfig for consistent editor settings

### Testing
- Component tests using React Testing Library
- Hook tests for custom hooks
- Service tests for API layer

---

## API Endpoints (MirageJS Mocked)

### History API
- **`GET /api/history`**: Retrieve calculation history
- **`POST /api/history`**: Store calculation record
- **`DELETE /api/history`**: Clear all history

### Rates API  
- **`GET /api/rates`**: Retrieve exchange rates
  - Simulated 6-second delay for loading state testing
  - Returns rates for USD, EUR, AUD, CAD, JPY

---

## State Management Strategy

### Local Component State
- Simple UI state (input values, open/closed states)
- Managed with `useState`

### Custom Hooks
- Complex feature logic encapsulated in hooks
- Examples: `useCalculator`, `useCurrencyConverter`, `useHistory`

### Props Drilling
- Mode state managed at `App` level
- Passed down to feature components
- Clean, explicit data flow

### Persistence
- History: localStorage + API sync
- Rates: API cache with timestamp

---

## File Naming Conventions

- **Components**: PascalCase folders and files
  - `components/Button/Button.tsx`
  - `features/math/components/MathDisplay/MathDisplay.tsx`
  
- **Hooks**: camelCase with `use` prefix
  - `hooks/useApi.ts`
  - `features/math/hooks/useCalculator.ts`
  
- **Utilities**: camelCase
  - `utils/apiHelpers.ts`
  - `features/math/utils/primeHelpers.ts`
  
- **Types**: Co-located with modules (inline interfaces) and shared service types in `services/types.ts`
  
- **Styles**: PascalCase with `.module.css` suffix
  - `Button.module.css`
  - `MathDisplay.module.css`

---

## TypeScript Usage

### Type Organization
- Feature-specific props and helper types live alongside their components/hooks
- Service types in `services/types.ts`
- Component props defined inline for readability
- Hook return types defined inline

### Type Safety Benefits
- Autocomplete for API responses
- Type-safe props and state
- Compile-time error detection
- Better refactoring support

---

## Notes

- **Architecture**: Feature-based structure for scalability
- **TypeScript**: Fully migrated from `.jsx` to `.tsx`
- **CSS Modules**: All components use scoped styles with bracket notation for index signatures
- **MirageJS**: Mock server enabled by default for development
- **Docs Folder**: Git-ignored, for local development notes only
- **Testing**: Test files co-located with features (`__tests__` directories)
