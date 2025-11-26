# 🧮 Calculator & Currency Converter

A modern, dual-mode calculator application built with React and TypeScript. Switch seamlessly between a full-featured mathematical calculator and a real-time currency converter.

## 📋 Project Overview

This application was built to provide Margaret, our accountant, with a reliable digital calculator after she misplaced her physical ones. The app features two distinct modes:

- **Math Mode**: Perform standard arithmetic operations plus a unique prime number calculation
- **Currency Mode**: Convert between multiple currencies with live exchange rates

The project emphasizes clean architecture, type safety, and a polished user experience with keyboard support, persistent history, and responsive design.

---

## 🛠️ Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI framework for building component-based interfaces |
| **TypeScript** | 5.x | Type safety and enhanced developer experience |
| **Vite** | 5.2.0 | Lightning-fast build tool and dev server with HMR |
| **MirageJS** | 0.1.48 | Mock API server for development and testing |

### Development & Testing

- **Vitest** (4.0.13): Unit testing framework with React Testing Library
- **ESLint** (9.39.1): Code linting with React-specific rules
- **Prettier** (3.2.5): Consistent code formatting
- **Husky** (9.1.7): Git hooks for pre-commit quality checks
- **TypeScript** (5.9.3): Static type checking

### Build Configuration

- **Module System**: ES Modules
- **JSX Transform**: React 18 automatic runtime
- **CSS Strategy**: CSS Modules for scoped component styles
- **Package Manager**: npm

---

## 🌐 API Usage

The application uses MirageJS to mock API endpoints during development, making it easy to switch to real endpoints when the backend is ready.

### Mock Server Setup

The mock server is configured in [`src/mirage.js`](file:///Users/fredkorts/Documents/Development/Homework/tallink-test/src/mirage.js) and provides two main endpoints:

#### 1. History API (`/api/history`)

Stores and retrieves calculation history for the math mode.

**Endpoints:**
- `GET /api/history` - Retrieve all calculation records
- `POST /api/history` - Store a new calculation
  ```json
  {
    "expression": "2+3",
    "result": "5",
    "timestamp": 1732618800000
  }
  ```
- `DELETE /api/history` - Clear all history

**Implementation:**
- History is persisted in both localStorage and the mock API
- The [`historyService.ts`](file:///Users/fredkorts/Documents/Development/Homework/tallink-test/src/services/historyService.ts) handles all API interactions
- Requests are automatically mocked during development
- To enable real API calls, simply update the service configuration

#### 2. Exchange Rates API (`/api/rates`)

Provides current exchange rates for currency conversion.

**Endpoint:**
- `GET /api/rates` - Retrieve exchange rates for supported currencies

**Response:**
```json
{
  "USD": 1.0,
  "EUR": 0.85,
  "AUD": 1.35,
  "CAD": 1.25,
  "JPY": 110.0,
  "timestamp": 1732618800000
}
```

**Implementation:**
- Rates are fetched via [`ratesService.ts`](file:///Users/fredkorts/Documents/Development/Homework/tallink-test/src/services/ratesService.ts)
- The mock server simulates a 6-second delay to test loading states
- Rates are cached with timestamps to show "last updated" information
- The [`useCurrencyRates`](file:///Users/fredkorts/Documents/Development/Homework/tallink-test/src/hooks/useCurrencyRates.ts) hook manages fetching and refresh logic

### Switching to Real APIs

To use real backend endpoints:

1. Update the base URL in your service files
2. Remove or disable the MirageJS server initialization in [`main.tsx`](file:///Users/fredkorts/Documents/Development/Homework/tallink-test/src/main.tsx)
3. Ensure CORS is properly configured on your backend

---

## 📁 Folder Structure

The project follows a **feature-based architecture** that promotes scalability, maintainability, and clear separation of concerns.

### High-Level Structure

```
src/
├── features/          # Feature modules (math, currency)
├── components/        # Shared/reusable components
├── hooks/            # Global custom hooks
├── services/         # API service layer
├── utils/            # Utility functions and constants
└── styles/           # Global styles and CSS variables
```

### Why This Organization?

#### 1. **Feature-Based Architecture**

Each feature (`math`, `currency`) is self-contained with its own components, hooks, and utilities. This approach:

- **Scales well**: New features can be added without touching existing code
- **Improves discoverability**: Everything related to a feature lives in one place
- **Enables code splitting**: Features can be lazy-loaded if needed
- **Facilitates team collaboration**: Different developers can work on different features independently

#### 2. **Separation of Concerns**

```
features/math/
├── components/        # UI components specific to math mode
│   ├── MathDisplay/
│   └── Keypad/
├── hooks/            # Business logic for math operations
│   ├── useCalculator.ts
│   ├── useHistory.ts
│   └── useKeyboardHandler.ts
└── utils/            # Math-specific utilities
    └── helpers.ts    # Arithmetic, validation, prime number logic
```

**Benefits:**
- **Components** focus purely on presentation
- **Hooks** encapsulate complex business logic and state management
- **Utils** provide pure, testable functions
- Each layer can be tested independently

#### 3. **Shared Resources**

```
components/           # Reusable across features
├── Calculator/       # Main calculator container
├── Common/          # Generic UI components (Button, IconButton, etc.)
└── Layout/          # Layout components (AppLayout, Header)

hooks/               # Global hooks used by multiple features
├── useApi.ts        # Generic API hook
├── useCurrencyRates.ts
├── useLocalStorage.ts
└── useTimer.ts

services/            # Centralized API layer
├── historyService.ts
├── ratesService.ts
└── types.ts         # Shared service types
```

**Benefits:**
- Avoids code duplication
- Provides consistent patterns across features
- Makes it easy to update shared functionality in one place

#### 4. **Co-located Styles**

Each component has its own CSS Module file:

```
MathDisplay/
├── MathDisplay.tsx
├── MathDisplay.module.css
└── index.ts
```

**Benefits:**
- Styles are scoped to prevent naming conflicts
- Easy to find and modify component-specific styles
- Unused styles are removed when components are deleted
- TypeScript integration provides autocomplete for class names

#### 5. **Test Co-location**

Tests live alongside the code they test:

```
hooks/
├── useCalculator.ts
├── useHistory.ts
└── __tests__/
    ├── useCalculator.test.ts
    └── useHistory.test.ts
```

**Benefits:**
- Easy to find tests for specific modules
- Tests are more likely to be updated when code changes
- Clear test coverage visibility

### Complete Folder Structure

```
tallink-test/
├── public/                    # Static assets
│   └── calc-icon.svg
│
├── src/
│   ├── main.tsx              # Application entry point
│   ├── App.tsx               # Root component
│   ├── index.css             # Global styles
│   ├── mirage.js             # Mock API server configuration
│   │
│   ├── components/           # Shared components
│   │   ├── Calculator/       # Main calculator container
│   │   ├── Common/           # Reusable UI components
│   │   │   ├── Button/
│   │   │   ├── ErrorMessage/
│   │   │   ├── IconButton/
│   │   │   ├── LoadingSpinner/
│   │   │   └── ModeToggle/
│   │   └── Layout/           # Layout components
│   │       ├── AppLayout/
│   │       └── Header/
│   │
│   ├── features/             # Feature modules
│   │   ├── math/
│   │   │   ├── components/
│   │   │   │   ├── Keypad/
│   │   │   │   └── MathDisplay/
│   │   │   ├── hooks/
│   │   │   │   ├── useCalculator.ts
│   │   │   │   ├── useHistory.ts
│   │   │   │   ├── useKeyboardHandler.ts
│   │   │   │   └── __tests__/
│   │   │   └── utils/
│   │   │       └── helpers.ts
│   │   │
│   │   └── currency/
│   │       ├── components/
│   │       │   └── CurrencyDisplay/
│   │       ├── hooks/
│   │       │   ├── useCurrencyConverter.ts
│   │       │   └── __tests__/
│   │       └── utils/
│   │           └── helpers.ts
│   │
│   ├── hooks/                # Global hooks
│   │   ├── useApi.ts
│   │   ├── useCurrencyRates.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useTimer.ts
│   │   └── __tests__/
│   │
│   ├── services/             # API service layer
│   │   ├── historyService.ts
│   │   ├── ratesService.ts
│   │   ├── types.ts
│   │   └── __tests__/
│   │
│   ├── utils/                # Shared utilities
│   │   ├── apiHelpers.ts
│   │   ├── constants.ts
│   │   └── timeFormatters.ts
│   │
│   └── styles/               # Global styles
│       └── variables.css     # CSS custom properties
│
├── docs/                     # Project documentation (git-ignored)
│   ├── HIERARCHY.md
│   ├── PROJECT_STRUCTURE.md
│   └── ...
│
├── package.json
├── tsconfig.json
├── vite.config.js
├── vitest.config.js
└── eslint.config.js
```

---

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Testing

```bash
npm test              # Run tests in watch mode
npm run test:ui       # Run tests with UI
npm run test:run      # Run tests once
```

### Code Quality

```bash
npm run lint          # Check for linting errors
npm run lint:fix      # Auto-fix linting errors
npm run typecheck     # Run TypeScript type checking
```

---

## ✨ Features

### Math Mode

- ✅ Basic arithmetic operations: addition, subtraction, multiplication, division
- ✅ Prime number operation: finds the maximum prime number ≤ the input
- ✅ Expression display with live calculation preview
- ✅ Calculation history with persistence
- ✅ Full keyboard support (numbers, operators, Enter, Escape, Backspace)
- ✅ Error handling (division by zero, invalid expressions)
- ✅ Decimal number support

### Currency Mode

- ✅ Real-time currency conversion
- ✅ Support for USD, EUR, AUD, CAD, JPY
- ✅ Exchange rate display with "last updated" timestamp
- ✅ Loading and error states
- ✅ Automatic conversion on input change
- ✅ Keypad input with decimal support

### Shared Features

- ✅ Seamless mode switching
- ✅ Responsive, modern design
- ✅ Accessible UI with ARIA labels
- ✅ TypeScript type safety throughout
- ✅ Comprehensive test coverage

---

## 🧪 Testing Strategy

The project includes comprehensive tests for:

- **Hooks**: Business logic testing (calculator operations, history management, currency conversion)
- **Services**: API interaction testing with mocked responses
- **Components**: UI behavior and user interaction testing
- **Utilities**: Pure function testing for math operations and formatting

Tests are co-located with their source files in `__tests__/` directories for easy discovery and maintenance.

---

## 📝 License

MIT License - see [LICENSE](file:///Users/fredkorts/Documents/Development/Homework/tallink-test/LICENSE) file for details.

---

## 🤝 Contributing

This project follows strict TypeScript and ESLint rules to maintain code quality. Pre-commit hooks ensure all code is properly formatted and linted before committing.

### Code Style

- **TypeScript**: Strict mode enabled with comprehensive type checking
- **CSS**: CSS Modules with scoped styles
- **Formatting**: Prettier with EditorConfig
- **Naming Conventions**:
  - Components: PascalCase (`MathDisplay.tsx`)
  - Hooks: camelCase with `use` prefix (`useCalculator.ts`)
  - Utilities: camelCase (`apiHelpers.ts`)
  - CSS Modules: PascalCase with `.module.css` suffix

---

For detailed technical documentation, see [`docs/PROJECT_STRUCTURE.md`](file:///Users/fredkorts/Documents/Development/Homework/tallink-test/docs/PROJECT_STRUCTURE.md).
