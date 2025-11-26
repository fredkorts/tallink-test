# Implementation Checklist

This checklist outlines the step-by-step implementation plan for the React Calculator application, organized by phases and aligned with our requirements and planned folder structure.

---

## Phase 0: Project Setup & Foundation ✅

### Setup & Configuration

- [x] Create folder structure according to `PLANNED_STRUCTURE.md`
- [x] Set up ESLint with React and strict rules
- [x] Configure ESLint rules: `no-unused-vars`, `no-explicit-any`, `no-floating-promises`, React hooks
- [x] Set up testing framework (Vitest or Jest + React Testing Library)
- [x] Configure TypeScript strict mode (prepare for migration)
- [x] Add pre-commit hooks (Husky) for linting and formatting
- [x] Update `package.json` scripts: `lint`, `test`, `typecheck`

### Shared Constants & Utilities

- [x] Create `src/utils/constants.js` with MAX_DIGITS, OPERATIONS enum, currencies list
- [x] Create `src/utils/apiHelpers.js` with error handling utilities
- [x] Create basic folder structure with placeholder files

---

## Phase 1: Shared Components & Layout

### Layout Components

- [x] Create `components/Layout/AppLayout.jsx` - Main app wrapper
- [x] Create `components/Layout/ModeToggle.jsx` - Tab/button switcher for Math/Currency modes
- [x] Create `components/Layout/Layout.module.css` - Layout component styles
- [x] Create `components/Layout/Header.jsx` - App title/branding (optional component for future use)

### Common Components

- [x] Create `components/Common/Button.jsx` - Reusable button with variants (primary, secondary, operator, number)
- [x] Create `components/Common/LoadingSpinner.jsx` - Loading indicator
- [x] Create `components/Common/ErrorMessage.jsx` - Error display component
- [x] Create `components/Common/IconButton.jsx` - Button with icon support
- [x] Create `components/Common/Common.module.css` - Shared styles for all common components
- [x] Add prop types or TypeScript types for all common components
- [x] Write tests for common components (Button, LoadingSpinner, ErrorMessage, IconButton)

### Shared Hooks

- [x] Create `hooks/useLocalStorage.js` - Generic local storage hook with state sync
- [x] Create `hooks/useApi.js` - Generic API request hook with loading/error states
- [x] Write tests for shared hooks (useLocalStorage: 8 tests, useApi: 10 tests)

### API Services

- [x] Create `services/historyService.js` with `postHistory()` and `getHistory()` functions
- [x] Create `services/ratesService.js` with `fetchRates()` function
- [x] Add error handling and request/response transformations
- [x] Write tests for services (with mocked fetch)

---

## Phase 2: Math Mode - Core Calculator

### Math Utils

- [x] Create `features/math/utils/operations.js` - Pure functions for +, -, ×, ÷
- [x] Handle division by zero (return Infinity)
- [x] Handle 0/0 (return NaN)
- [x] Create `features/math/utils/inputValidator.js` - Validate 10-digit limit, decimal rules
- [x] Create `features/math/utils/formatters.js` - Format display (Infinity, NaN, decimals, negatives)
- [x] Write comprehensive tests for all math utilities

### Math Components - Basic Structure

- [x] Create `features/math/components/MathCalculator.jsx` - Main container
- [x] Create `features/math/components/Display.jsx` - Calculator display screen
- [x] Create `features/math/components/Keypad.jsx` - Button grid (0-9, operators, C, =)
- [x] Style components to match Figma design
- [x] Ensure buttons are accessible (proper labels, keyboard focus)

### Calculator State Hook

- [x] Create `features/math/hooks/useCalculator.js`
- [x] Implement state: currentInput, operator, firstOperand, result
- [x] Implement `handleNumberInput(digit)` - Add digit to current input
- [x] Implement `handleOperatorInput(op)` - Store operator and first operand
- [x] Implement `handleEquals()` - Execute calculation and show result
- [x] Implement `handleClear()` - Reset to initial state
- [x] Handle decimal point input (only one per number)
- [x] Enforce 10-digit limit
- [ ] Write comprehensive tests for calculator state machine

### Basic Operations Integration

- [x] Connect useCalculator hook to MathCalculator component
- [x] Wire up number buttons (0-9) to handleNumberInput
- [x] Wire up operator buttons (+, -, ×, ÷) to handleOperatorInput
- [x] Wire up equals button to handleEquals
- [x] Wire up clear button to handleClear
- [x] Display updates in real-time showing operation (e.g., "2+3")
- [ ] Test full calculation flow: 2 + 3 = 5

### Error Handling in Math Mode

- [x] Display "NaN" for impossible operations
- [x] Display "Infinity" or ∞ for division by zero
- [x] Handle edge cases: empty input, incomplete operations, multiple decimals
- [ ] Test all error scenarios

---

## Phase 3: Math Mode - History Feature

### History Components

- [x] Create `features/math/components/HistoryPanel.jsx` - Scrollable history list
- [x] Create `features/math/components/HistoryItem.jsx` - Single history entry
- [x] Style history panel to match Figma design
- [x] Ensure history is scrollable when many entries exist

### History Hook

- [x] Create `features/math/hooks/useHistory.js`
- [x] Store history in local state
- [x] Implement `addHistoryEntry(operation)` function
- [x] Format history entries: "operand1 operator operand2 = result"
- [x] POST to `/api/history` when entry is added
- [x] Use local storage as backup when API fails
- [ ] Write tests for history management

### History Integration

- [x] Connect useHistory hook to MathCalculator
- [x] Add history entry on each equals press
- [x] Display history in HistoryPanel
- [x] Handle special values (Infinity, NaN) in history display
- [ ] Test history with multiple calculations
- [ ] Test history persistence with local storage

---

## Phase 4: Math Mode - Max Prime Number Operation

### Prime Number Utils

- [x] Create `features/math/utils/primeUtils.js`
- [x] Implement `isPrime(n)` function
- [x] Implement `maxPrimeInRange(num1, num2)` function
- [x] Handle edge cases: zero, one, negative numbers, decimals, reversed order
- [x] Return NaN when no prime exists in range
- [ ] Optimize for performance (consider memoization for large ranges)
- [ ] Write comprehensive tests for prime algorithms

### Prime Calculator Hook

- [ ] Create `features/math/hooks/usePrimeCalculator.js`
- [ ] Integrate prime calculation into useCalculator
- [ ] Add loading state for slow prime calculations
- [ ] Handle timeout for very large ranges

### Prime Operation Integration

- [x] Add "P" button to Keypad
- [x] Wire up P button to handle prime operation
- [x] Display format: "3P13" during input
- [x] Calculate and display result on equals press
- [x] Add prime operation results to history
- [ ] Test prime calculations: 3P13=13, 20P25=23, 20P19=NaN
- [ ] Test edge cases: same numbers, reverse order, 0, 1, decimals

---

## Phase 5: Math Mode - Keyboard Support

### Keyboard Input Hook

- [ ] Create `features/math/hooks/useKeyboardInput.js`
- [ ] Map keyboard numbers (0-9) to number input
- [ ] Map keyboard operators (+, -, \*, /) to operations
- [ ] Map Enter key to equals
- [ ] Map Escape or C key to clear
- [ ] Map decimal/period key to decimal input
- [ ] Prevent browser default behavior for mapped keys
- [ ] Handle "P" key for prime operation

### Keyboard Integration

- [ ] Connect useKeyboardInput to MathCalculator
- [ ] Test all keyboard shortcuts work correctly
- [ ] Ensure keyboard and mouse input work interchangeably
- [ ] Add visual feedback for keyboard input (button press effect)
- [ ] Test rapid keyboard input

---

## Phase 6: Currency Mode - Basic Structure

### Currency Utils

- [x] Create `features/currency/utils/currencyCalculations.js` - Conversion logic
- [x] Create `features/currency/utils/currencyFormatters.js` - Currency number formatting
- [x] Create `features/currency/utils/timeFormatters.js` - Format elapsed time ("2 minutes ago")
- [ ] Write tests for all currency utilities

### Currency Components - Basic Structure

- [x] Create `features/currency/components/CurrencyConverter.jsx` - Main container
- [x] Create `features/currency/components/CurrencyInput.jsx` - Input field with currency selector
- [x] Create `features/currency/components/CurrencySelect.jsx` - Native select dropdown
- [ ] Create `features/currency/components/ExchangeRate.jsx` - Display current rate
- [x] Create `features/currency/components/RateUpdateInfo.jsx` - Last update time + refresh button
- [x] Style components to match Figma design

---

## Phase 7: Currency Mode - Rates Management

### Currency Rates Hook

- [x] Create `features/currency/hooks/useCurrencyRates.js`
- [x] Fetch rates from `/api/rates` on mount
- [x] Store rates in state
- [x] Handle loading state during fetch
- [x] Handle error state if fetch fails
- [x] Implement manual refresh function
- [x] Cache rates to avoid unnecessary refetches
- [x] Write tests for rate fetching and error handling

### Rate Timer Hook

- [x] Create features/currency/hooks/useTimer.ts (created in shared hooks)
- [x] Track timestamp of last rate fetch
- [x] Calculate elapsed time since last update
- [x] Update elapsed time display periodically (every minute)
- [x] Write tests for timer logic

### Rates Integration

- [x] Connect useCurrencyRates to CurrencyConverter
- [x] Display loading spinner while fetching rates
- [x] Display error message if rates fail to load
- [x] Populate currency selectors with available currencies
- [x] Show "Updated X ago" with useRateTimer
- [x] Wire up refresh button to refetch rates
- [x] Test rate loading on mode open
- [x] Test manual refresh functionality
- [x] Test error handling (mock failed API call)

---

## Phase 8: Currency Mode - Conversion Logic

### Currency Converter Hook

- [x] Create `features/currency/hooks/useCurrencyConverter.js`
- [x] Manage source currency, target currency, and amount state
- [x] Calculate converted amount based on rates
- [x] Update conversion on any input change (amount, source, or target currency)
- [x] Handle decimal precision appropriately
- [x] Handle edge cases: zero amount, missing rates, same currency selected
- [x] Write tests for conversion calculations

### Conversion Integration

- [x] Connect useCurrencyConverter to CurrencyConverter component
- [x] Wire up source currency input field
- [x] Wire up source currency selector
- [x] Wire up target currency selector
- [x] Display converted amount in real-time
- [x] Test conversion accuracy
- [x] Test conversion updates on currency change
- [x] Test conversion updates on rate refresh
- [x] Test edge cases: 0 amount, same currency, missing rates

---

## Phase 9: Mode Switching & App Integration

### Mode Toggle Implementation

- [x] Implement mode state in App.jsx (math/currency)
- [x] Wire ModeToggle to switch modes
- [x] Conditionally render MathCalculator or CurrencyConverter
- [x] Default to Math mode on load
- [x] Style mode toggle to match Figma (tabs or buttons)

### State Preservation Strategy

- [ ] Decide: preserve or clear state when switching modes
- [ ] Implement chosen strategy consistently
- [ ] Test mode switching multiple times
- [ ] Ensure no memory leaks or stale state

---

## Phase 10: UI/UX Polish

### Figma Design Implementation

- [ ] Review all components against Figma designs
- [ ] Match colors, typography, spacing exactly
- [ ] Implement consistent button styles
- [ ] Ensure proper alignment and layout

### Responsive Design

- [ ] Test on desktop screens (1920px, 1440px, 1024px)
- [ ] Test on tablet screens (768px)
- [ ] Test on mobile screens (375px, 414px)
- [ ] Adjust layout/sizing for different breakpoints
- [ ] Ensure touch targets are appropriately sized (min 44x44px)

### Visual Feedback

- [ ] Add hover states to all buttons
- [ ] Add active/pressed states to all buttons
- [ ] Add focus states for keyboard navigation
- [ ] Add smooth transitions/animations where appropriate
- [ ] Ensure feedback is immediate and noticeable

### Loading & Error States

- [ ] Show loading spinner during API calls
- [ ] Show user-friendly error messages
- [ ] Provide retry options for failed requests
- [ ] Ensure app remains functional during errors (graceful degradation)

---

## Phase 11: Accessibility

### Keyboard Accessibility

- [ ] Ensure logical tab order through all interactive elements
- [ ] All buttons accessible via keyboard
- [ ] Visible focus indicators on all focusable elements
- [ ] Keyboard shortcuts don't conflict with browser shortcuts
- [ ] Test complete workflows using only keyboard

### Screen Reader Support

- [ ] Add descriptive labels to all buttons (aria-label)
- [ ] Announce display value changes
- [ ] Announce operation results
- [ ] Announce mode switches
- [ ] Announce error messages
- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)

### Visual Accessibility

- [ ] Verify color contrast meets WCAG AA standards (4.5:1 for text)
- [ ] Ensure text is readable (min 16px for body text)
- [ ] Buttons large enough to click (min 44x44px)
- [ ] Test at 200% browser zoom
- [ ] No information conveyed by color alone

---

## Phase 12: Testing

### Unit Tests

- [ ] Math operations (operations.js) - all edge cases
- [ ] Prime number algorithms (primeUtils.js) - comprehensive coverage
- [ ] Input validation (inputValidator.js) - 10-digit limit, decimals, etc.
- [ ] Currency calculations (currencyCalculations.js) - conversion accuracy
- [ ] Formatters (all formatter utils) - display formatting
- [ ] Custom hooks (useCalculator, useCurrencyConverter, etc.) - state logic
- [ ] Services (historyService, ratesService) - API calls with mocked fetch

### Component Tests

- [ ] Common components (Button, LoadingSpinner, ErrorMessage) - rendering and props
- [ ] Math components (MathCalculator, Display, Keypad, HistoryPanel) - user interactions
- [ ] Currency components (CurrencyConverter, CurrencyInput, etc.) - user interactions
- [ ] Test accessibility (proper labels, keyboard navigation)
- [ ] Test error states and edge cases

### Integration Tests

- [ ] Complete math calculation flow: input → operation → result → history
- [ ] Prime number calculation flow
- [ ] Currency conversion flow: select currencies → enter amount → see result
- [ ] Rate refresh flow
- [ ] Mode switching flow
- [ ] Keyboard input integration
- [ ] API integration with MirageJS

### E2E Tests (Optional but Recommended)

- [ ] Install Playwright or Cypress
- [ ] Test key user journey: perform multiple calculations
- [ ] Test currency conversion journey
- [ ] Test error scenarios (API failures)
- [ ] Test keyboard-only navigation
- [ ] Run E2E tests in CI

---

## Phase 13: Performance Optimization

### Performance Audit

- [ ] Use React DevTools Profiler to identify slow renders
- [ ] Add `useMemo` for expensive calculations (only if measured performance issue)
- [ ] Add `useCallback` for callbacks passed to memoized children (only if needed)
- [ ] Optimize prime calculation algorithm for large ranges
- [ ] Consider Web Worker for prime calculations if blocking UI

### Bundle Size

- [ ] Analyze bundle size with Vite build analysis
- [ ] Lazy load features if bundle is large
- [ ] Remove unused dependencies
- [ ] Ensure production build is optimized

---

## Phase 14: Final Polish & Documentation

### Code Quality

- [ ] Run linter and fix all warnings
- [ ] Run type checker (if using TypeScript)
- [ ] Remove console.logs and debug code
- [ ] Add JSDoc comments to complex functions
- [ ] Ensure consistent code style throughout

### Documentation

- [ ] Update README.md with setup instructions
- [ ] Document how to run tests
- [ ] Document how to toggle between mock and real API
- [ ] Add comments to complex logic
- [ ] Update PROJECT_STRUCTURE.md with any changes

### Testing

- [ ] Run all tests and ensure they pass
- [ ] Check test coverage (aim for >80% for critical paths)
- [ ] Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on multiple devices
- [ ] Perform manual QA of all features

### Deployment Preparation

- [ ] Ensure `npm run build` works without errors
- [ ] Test production build locally with `npm run preview`
- [ ] Verify no console errors in production build
- [ ] Create deployment instructions
- [ ] Set up CI/CD pipeline (optional)

---

## Phase 15: Stretch Goals (If Time Permits)

### Advanced Features

- [ ] Add calculation history persistence (save to localStorage)
- [ ] Add ability to click history item to reload calculation
- [ ] Add backspace/delete functionality (remove last digit)
- [ ] Add scientific notation support for very large numbers
- [ ] Add more currency formatting options
- [ ] Add ability to swap source/target currencies
- [ ] Add favorites/recent currencies

### Developer Experience

- [ ] Migrate to TypeScript (.tsx files)
- [ ] Add Storybook for component documentation
- [ ] Set up CI/CD with GitHub Actions
- [ ] Add code coverage reports
- [ ] Add visual regression testing

### User Experience

- [ ] Add animations for mode switching
- [ ] Add haptic feedback on mobile
- [ ] Add dark mode support
- [ ] Add keyboard shortcut help modal
- [ ] Add calculation history export

---

## Progress Tracking

**Current Phase**: Phase 9 - Mode Switching & App Integration

**Completion Status**:

- Phase 0: ✅ 100% (8/8)
- Phase 1: ✅ 100% (15/15)
- Phase 2: ⚙️ 88% (22/25)
- Phase 3: ⚙️ 82% (9/11)
- Phase 4: ⚙️ 77% (10/13)
- Phase 5: ⚙️ 20% (2/9)
- Phase 6: ⚙️ 75% (6/8)
- Phase 7: ⚙️ 70% (12/17)
- Phase 8: ⚙️ 71% (10/14)
- Phase 9: ⚙️ 55% (5/9)
- Phase 10: ⬜ 0% (0/16)
- Phase 11: ⬜ 0% (0/17)
- Phase 12: ⬜ 0% (0/23)
- Phase 13: ⬜ 0% (0/8)
- Phase 14: ⬜ 0% (0/15)

**Overall**: ⚙️ Progress updated with current implemented features

---

## Notes

- This checklist is a living document - update as implementation progresses
- Some tasks may be completed in different order based on dependencies
- Add new tasks as edge cases or requirements are discovered
- Check off tasks as they are completed and tested
- Each phase should be tested before moving to the next
- Prioritize core functionality over polish initially
