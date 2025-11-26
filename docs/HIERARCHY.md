# Component Hierarchy

This document outlines the hierarchical structure of React components in the application.

## Root Structure

```
App
└── Calculator (State: mode)
    └── AppLayout
        ├── MathCalculator (if mode === 'math')
        │   └── CalculatorLayout
        │       ├── Display
        │       │   ├── ModeToggle
        │       │   └── MathDisplay
        │       │       └── (History & Result Views)
        │       └── Keypad
        │           └── (Math Buttons: 0-9, ., +, -, *, /, Prime, C, ⌫, =)
        │
        └── CurrencyConverter (if mode === 'currency')
            └── CalculatorLayout
                ├── Display
                │   ├── ModeToggle
                │   └── CurrencyDisplay
                │       ├── (From Currency Select)
                │       ├── (Input Field)
                │       ├── (To Currency Select)
                │       └── (Output Display)
                └── Keypad
                    └── (Currency Buttons: 0-9, 00, ., C, ⌫)
```

## Component Descriptions

### Root Level
- **App**: Application entry point.
- **Calculator**: Main container that manages the active mode (`math` vs `currency`) and switches between features.
- **AppLayout**: Provides the visual frame/container for the calculator content.

### Layout Components
- **CalculatorLayout**: A shared layout pattern used by both features to position the Display and Keypad areas consistently.

### Shared Components
- **Display**: A wrapper component that handles the `ModeToggle` and renders the appropriate feature-specific display (`MathDisplay` or `CurrencyDisplay`).
- **ModeToggle**: Switcher component to toggle between Math and Currency modes.
- **Keypad**: Shared keypad component that renders different button configurations based on the active mode.

### Feature: Math
- **MathCalculator**: Orchestrator for math logic. Connects hooks (`useCalculator`, `useHistory`, `useKeyboardHandler`) to the UI.
- **MathDisplay**: Shows the current expression, calculation result, and a brief history of recent calculations.

### Feature: Currency
- **CurrencyConverter**: Orchestrator for currency logic. Connects hooks (`useCurrencyConverter`, `useCurrencyRates`) to the UI.
- **CurrencyDisplay**: Specialized display with dropdowns for currency selection and input/output fields for conversion.
