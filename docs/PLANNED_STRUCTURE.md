# Planned Folder Structure

## Overview

This document outlines the planned feature-based folder structure for the React Calculator application. The structure is organized around two main features (**math** and **currency**) with shared components and utilities.

---

## Folder Structure

```
src/
├── main.jsx                      # Application entry point
├── App.jsx                       # Root component with mode switching
├── index.css                     # Global styles
├── mirage.js                     # MirageJS mock server
│
├── features/                     # Feature-based organization
│   ├── math/                     # Math mode feature
│   │   ├── components/           # Math-specific components
│   │   │   ├── MathCalculator.jsx         # Main math calculator container
│   │   │   ├── Display.jsx                # Calculator display
│   │   │   ├── Keypad.jsx                 # Number and operator buttons
│   │   │   ├── HistoryPanel.jsx           # Calculation history display
│   │   │   └── HistoryItem.jsx            # Individual history entry
│   │   │
│   │   ├── hooks/                # Math-specific custom hooks
│   │   │   ├── useCalculator.js           # Calculator state and logic
│   │   │   ├── useKeyboardInput.js        # Keyboard event handling
│   │   │   ├── useHistory.js              # History management and API
│   │   │   └── usePrimeCalculator.js      # Max prime number logic
│   │   │
│   │   ├── utils/                # Math-specific utilities
│   │   │   ├── operations.js              # Basic math operations (+, -, ×, ÷)
│   │   │   ├── primeUtils.js              # Prime number algorithms
│   │   │   ├── inputValidator.js          # Input validation (10-digit limit, decimals)
│   │   │   └── formatters.js              # Number formatting for display
│   │   │
│   │   └── __tests__/            # Math feature tests
│   │       ├── MathCalculator.test.jsx
│   │       ├── useCalculator.test.js
│   │       ├── operations.test.js
│   │       └── primeUtils.test.js
│   │
│   └── currency/                 # Currency mode feature
│       ├── components/           # Currency-specific components
│       │   ├── CurrencyConverter.jsx      # Main currency converter container
│       │   ├── CurrencyInput.jsx          # Input field with currency selector
│       │   ├── CurrencySelect.jsx         # Native select dropdown for currencies
│       │   ├── ExchangeRate.jsx           # Display current rate between currencies
│       │   └── RateUpdateInfo.jsx         # Last update time and refresh button
│       │
│       ├── hooks/                # Currency-specific custom hooks
│       │   ├── useCurrencyRates.js        # Fetch and manage exchange rates
│       │   ├── useCurrencyConverter.js    # Conversion calculations
│       │   └── useRateTimer.js            # Track time since last rate update
│       │
│       ├── utils/                # Currency-specific utilities
│       │   ├── currencyCalculations.js    # Conversion logic
│       │   ├── currencyFormatters.js      # Currency-specific number formatting
│       │   └── timeFormatters.js          # Format elapsed time display
│       │
│       └── __tests__/            # Currency feature tests
│           ├── CurrencyConverter.test.jsx
│           ├── useCurrencyRates.test.js
│           └── currencyCalculations.test.js
│
├── components/                   # Shared components
│   ├── Layout/                   # Layout components
│   │   ├── AppLayout.jsx                  # Main app layout wrapper
│   │   ├── ModeToggle.jsx                 # Math/Currency mode switcher
│   │   └── Header.jsx                     # App header (if needed)
│   │
│   └── Common/                   # Common/reusable components
│       ├── Button.jsx                     # Generic button component
│       ├── LoadingSpinner.jsx             # Loading indicator
│       ├── ErrorMessage.jsx               # Error display component
│       └── IconButton.jsx                 # Button with icon (for refresh, etc.)
│
├── hooks/                        # Shared custom hooks
│   ├── useLocalStorage.js                 # Local storage hook for history
│   └── useApi.js                          # Generic API request hook
│
├── services/                     # API services
│   ├── historyService.js                  # History API calls
│   └── ratesService.js                    # Currency rates API calls
│
├── utils/                        # Shared utilities
│   ├── constants.js                       # App-wide constants (max digits, etc.)
│   └── apiHelpers.js                      # API request helpers
│
├── types/                        # TypeScript type definitions (when migrating)
│   ├── math.types.ts
│   ├── currency.types.ts
│   └── common.types.ts
│
└── styles/                       # Style organization (if needed beyond CSS modules)
    ├── variables.css                      # CSS variables
    └── mixins.css                         # Reusable CSS patterns
```

---

## Feature Structure Breakdown

### Math Feature (`features/math/`)

#### Components
- **MathCalculator.jsx**: Main container orchestrating all math mode functionality
- **Display.jsx**: Shows current input/operation/result
- **Keypad.jsx**: Grid of number and operator buttons
- **HistoryPanel.jsx**: Scrollable list of past calculations
- **HistoryItem.jsx**: Single history entry display

#### Hooks
- **useCalculator.js**: Core calculator state machine (input, operation, result)
- **useKeyboardInput.js**: Handles keyboard events (0-9, operators, Enter, C, etc.)
- **useHistory.js**: Manages history state and POST to `/api/history`
- **usePrimeCalculator.js**: Prime number calculation logic

#### Utils
- **operations.js**: Pure functions for +, -, ×, ÷
- **primeUtils.js**: Prime number algorithms (isPrime, maxPrimeInRange)
- **inputValidator.js**: Validate 10-digit limit, decimal rules, etc.
- **formatters.js**: Format numbers for display (handle Infinity, NaN, decimals)

---

### Currency Feature (`features/currency/`)

#### Components
- **CurrencyConverter.jsx**: Main container for currency mode
- **CurrencyInput.jsx**: Input field with associated currency selector
- **CurrencySelect.jsx**: Native select dropdown populated with available currencies
- **ExchangeRate.jsx**: Shows current exchange rate between selected currencies
- **RateUpdateInfo.jsx**: Displays "Updated X minutes ago" with refresh icon

#### Hooks
- **useCurrencyRates.js**: Fetches rates from `/api/rates`, handles loading/error states
- **useCurrencyConverter.js**: Performs conversion calculations in real-time
- **useRateTimer.js**: Tracks elapsed time since last rate fetch

#### Utils
- **currencyCalculations.js**: Conversion logic between currency pairs
- **currencyFormatters.js**: Format currency values with appropriate decimal places
- **timeFormatters.js**: Format elapsed time ("2 minutes ago", "1 hour ago")

---

## Shared Resources

### Components (`components/`)

#### Layout
- **AppLayout.jsx**: Wraps entire app, provides consistent spacing/structure
- **ModeToggle.jsx**: Tabs/buttons to switch between Math and Currency modes
- **Header.jsx**: App title, branding (if needed)

#### Common
- **Button.jsx**: Reusable button with variants (primary, secondary, operator)
- **LoadingSpinner.jsx**: Used during API calls
- **ErrorMessage.jsx**: Displays user-friendly error messages
- **IconButton.jsx**: Button with icon (used for refresh rates)

---

### Hooks (`hooks/`)

- **useLocalStorage.js**: Generic hook for persisting data locally (history backup)
- **useApi.js**: Generic hook for API requests with loading/error handling

---

### Services (`services/`)

- **historyService.js**: 
  - `postHistory(operation)`: POST to `/api/history`
  - `getHistory()`: GET from `/api/history` (if needed)
  
- **ratesService.js**:
  - `fetchRates()`: GET from `/api/rates`

---

### Utils (`utils/`)

- **constants.js**: 
  - `MAX_DIGITS = 10`
  - `OPERATIONS = { ADD: '+', SUBTRACT: '-', ... }`
  - Default currencies, etc.
  
- **apiHelpers.js**: 
  - Error handling helpers
  - Request/response transformers

---

## Testing Strategy

### Feature Tests (`features/*/__tests__/`)

Each feature has its own test folder covering:

- **Component tests**: User interactions, rendering, accessibility
- **Hook tests**: State management, side effects
- **Utility tests**: Pure function logic (operations, primes, conversions)

### Example Test Files

**Math Feature:**
- `MathCalculator.test.jsx` - Integration tests for math mode workflow
- `useCalculator.test.js` - Calculator state machine logic
- `operations.test.js` - Addition, subtraction, division, multiplication
- `primeUtils.test.js` - Prime number algorithm edge cases

**Currency Feature:**
- `CurrencyConverter.test.jsx` - Currency mode user flows
- `useCurrencyRates.test.js` - API calls, caching, errors
- `currencyCalculations.test.js` - Conversion accuracy

---

## Additional Considerations (Based on Requirements Review)

### What We Covered ✅

1. **Two main features** (Math and Currency) ✅
2. **Components folders** for each feature ✅
3. **Hooks folders** for custom logic ✅
4. **Tests folders** for unit tests ✅
5. **Shared Layout and Common components** ✅

### What We Added (Missing from Initial Plan) ✅

1. **`utils/` folders within features**
   - Math operations need pure utility functions
   - Prime number calculations should be isolated
   - Currency conversions and formatting need utilities
   
2. **`services/` folder**
   - API calls should be centralized
   - Separates API logic from hooks
   - Makes mocking easier for tests

3. **Shared `hooks/` folder**
   - `useLocalStorage` for history backup (requirement: "use local memory")
   - Generic API hooks

4. **Shared `utils/` folder**
   - Constants (MAX_DIGITS = 10, etc.)
   - Shared helpers

5. **`types/` folder**
   - Prepared for TypeScript migration
   - Type definitions for operations, currencies, API responses

6. **History components**
   - Requirements specify history display
   - Need `HistoryPanel` and `HistoryItem` components

7. **Error and Loading states**
   - Requirements mention API failures
   - Need `ErrorMessage` and `LoadingSpinner` components

8. **Rate update tracking**
   - Requirements specify showing time since last update
   - Need `useRateTimer` hook and `RateUpdateInfo` component

9. **Keyboard input**
   - Requirements specify keyboard support
   - Need dedicated `useKeyboardInput` hook

---

## Migration Path

### Phase 1: Foundation
- Set up folder structure
- Create shared components (Button, Layout)
- Set up services layer

### Phase 2: Math Feature
- Build calculator UI
- Implement basic operations
- Add prime number logic
- Integrate history

### Phase 3: Currency Feature
- Build converter UI
- Integrate rates API
- Implement conversion logic
- Add rate refresh

### Phase 4: Polish
- Keyboard support
- Error handling
- Loading states
- Accessibility
- Testing

---

## Benefits of This Structure

### Scalability
- Easy to add new features (e.g., "Scientific" mode)
- Each feature is self-contained

### Testability
- Tests colocated with features
- Pure utilities easy to test
- Services can be mocked

### Maintainability
- Clear separation of concerns
- Easy to find related code
- Follows React best practices

### Team Collaboration
- Features can be developed in parallel
- Clear ownership boundaries
- Consistent patterns

---

## File Naming Conventions

- **Components**: PascalCase (e.g., `MathCalculator.jsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useCalculator.js`)
- **Utils/Services**: camelCase (e.g., `operations.js`, `historyService.js`)
- **Tests**: Match file being tested with `.test` suffix (e.g., `operations.test.js`)
- **Types**: PascalCase with `.types.ts` suffix (e.g., `math.types.ts`)

---

## Next Steps

1. Create the folder structure
2. Set up shared components and utilities
3. Implement Math feature (MVP)
4. Implement Currency feature
5. Add tests progressively
6. Refine based on real usage
