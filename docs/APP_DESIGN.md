# App Design Overview

This document describes the visual design and component structure of the calculator and currency exchange app, based on the provided design image.

---

## 1. General Layout

- The app is mobile-first, with a clean, modern, and touch-friendly interface.
- There are two main modes: **Calculator** and **Exchange Rate**.
- The top of the screen features a mode toggle (tab switcher) to switch between Calculator and Exchange Rate views.
- The main content area changes based on the selected mode.
- The bottom portion of the screen contains a large, accessible keypad for input.

---

## 2. Major UI Sections & Components

### A. Mode Toggle (Tab Switcher)

- **Component:** `ModeToggle`
- **Description:**
  - Horizontally aligned tabs at the top: "Calculator" and "Exchange Rate".
  - The active tab is highlighted (blue underline and text).
  - Allows switching between calculator and currency conversion modes.

### B. Calculator Mode

- **Component:** `MathCalculator`
- **Subcomponents:**
  - `Display`
    - Shows the current calculation, previous operations, and the result in large, bold text.
    - Example: `240+140=380`, `10×2=20`, `2610` (result)
  - `HistoryPanel` (optional/future)
    - Scrollable area for past calculations (not shown in this image, but implied by multi-line display)
  - `Keypad`
    - Grid of buttons for numbers (0-9), decimal point, and operators (+, -, ×, ÷, =, C, backspace, P for prime)
    - Large, color-coded buttons for clear (C), backspace, and equals (=)
    - Operator buttons are visually distinct (blue or green)
    - Prime (P) button for special operation

### C. Exchange Rate Mode

- **Component:** `CurrencyConverter`
- **Subcomponents:**
  - `CurrencyInput`
    - Two rows: one for source currency (e.g., USD), one for target currency (e.g., EUR)
    - Each row shows the currency code, a chevron (for dropdown/select), and the amount
    - Amounts are right-aligned and styled for emphasis
  - `ExchangeRate`
    - Shows the converted value in real time
  - `RateUpdateInfo`
    - Displays last update time and a refresh icon/button
  - `Keypad`
    - Numeric keypad for entering amounts (0-9, decimal, clear, backspace)

---

## 3. Component List (Logical Structure)

- `AppLayout` (overall wrapper)
  - `ModeToggle`
  - `MathCalculator` (shown when Calculator mode is active)
    - `Display`
    - `Keypad`
    - (optional) `HistoryPanel`
  - `CurrencyConverter` (shown when Exchange Rate mode is active)
    - `CurrencyInput` (for both source and target)
    - `ExchangeRate`
    - `RateUpdateInfo`
    - `Keypad`

---

## 4. Visual/UX Notes

- All buttons are large and easy to tap.
- The equals button is highlighted in green for emphasis.
- The clear (C) and backspace buttons are colored for quick access.
- The design is minimalist, with clear separation between display and input areas.
- Font sizes and weights are used to emphasize results and important actions.
- The app is optimized for mobile, but the structure supports responsive adaptation.

---

## 5. Next Steps

- Use this breakdown to guide component implementation and folder structure.
- Each component should be implemented as a reusable, testable unit.
- Refer to this document when planning new features or refactoring UI.
