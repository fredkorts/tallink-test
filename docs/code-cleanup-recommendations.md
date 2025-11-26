# Code cleanup and constants recommendations

## High priority
- **Completed: removed unused layout components**: The unused `ModeToggle` and `Header` variants under `src/components/Layout/` have been deleted to eliminate dead code and styles. The active `ModeToggle` that powers the Calculator view switch lives in `src/components/Common/ModeToggle` and remains in use.
- **Completed: pruned unused common components**: `IconButton`, `LoadingSpinner`, and `ErrorMessage` under `src/components/Common/` (plus their styles/tests) have been removed to reduce bundle size and maintenance surface. Ripgrep checks confirm no imports of these components remain in the codebase.
- **Cull unused constants**: `CURRENCIES`, `DEFAULT_SOURCE_CURRENCY`, `DEFAULT_TARGET_CURRENCY`, `API_ENDPOINTS`, and `MODE_LABELS` in `src/utils/constants.ts` are declared but not consumed. Either adopt them in the relevant features or drop them to avoid drift.

## Medium priority
- **Stop hard-coding converter defaults**: `useCurrencyConverter` initializes and falls back to literal "USD"/"EUR" values and "0" strings. Switch these to the currency defaults and initial display constants in `src/utils/constants.ts` so the configuration lives in one place.
- **Centralize API endpoints**: `ratesService` and `historyService` call `"/api/rates"` and `"/api/history"` directly even though matching constants exist. Use `API_ENDPOINTS` to keep endpoints consistent.
- **Extract timing constants**: CurrencyDisplay calls `useTimer(60000)` inline. Consider moving the one-minute refresh interval to a named constant (e.g., `CURRENCY_TIMESTAMP_REFRESH_MS`) in `src/utils/constants.ts` to make the intent and reuse clearer.

## Low priority
- **Validate currency options helper**: `getAvailableCurrencies` currently returns the selected currency even when it matches the "other" currency, which may not be the intended UX. Add a small unit test and adjust the filter if the dropdowns should never allow identical selections.
