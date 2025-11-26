# Component Hierarchy

This document outlines the hierarchical structure of React components in the application.

## Root Structure

```
App
└── Calculator (State: mode)
    └── AppLayout
        ├── ModeToggle
        ├── MathDisplay (if mode === 'math')
        │   └── (History & Result Views)
        ├── CurrencyDisplay (if mode === 'currency')
        │   ├── (From Currency Select)
        │   ├── (Input Field)
        │   ├── (To Currency Select)
        │   └── (Output Display + Timestamp)
        └── Keypad
            ├── (Math Buttons: 0-9, ., +, -, *, /, Prime, C, ⌫, =)
            └── (Currency Buttons: 0-9, 00, ., C, ⌫)
```

## Component Descriptions

### Root Level
- **App**: Application entry point.
- **Calculator**: Main container that manages the active mode (`math` vs `currency`) and renders the display + keypad stack.
- **AppLayout**: Provides the visual frame/container for the calculator content.

### Shared Components
- **ModeToggle**: Switcher component to toggle between Math and Currency modes.
- **Keypad**: Shared keypad component that renders different button configurations based on the active mode.

### Feature: Math
- **MathDisplay**: Shows the current expression, calculation result, and a brief history of recent calculations.
- **Hooks used by Calculator**: `useCalculator`, `useHistory`, and `useKeyboardHandler` wire math logic and keyboard input directly into the shared view.

### Feature: Currency
- **CurrencyDisplay**: Specialized display with dropdowns for currency selection and input/output fields for conversion.
- **Hooks used by Calculator**: `useCurrencyConverter` and `useCurrencyRates` provide rate data and conversion handlers to the shared view.
