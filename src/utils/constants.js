// Maximum number of digits allowed for input
export const MAX_DIGITS = 10;

// Mathematical operations
export const OPERATIONS = {
  ADD: "+",
  SUBTRACT: "-",
  MULTIPLY: "×",
  DIVIDE: "÷",
  PRIME: "P",
};

// Operation symbols for display
export const OPERATION_SYMBOLS = {
  [OPERATIONS.ADD]: "+",
  [OPERATIONS.SUBTRACT]: "-",
  [OPERATIONS.MULTIPLY]: "×",
  [OPERATIONS.DIVIDE]: "÷",
  [OPERATIONS.PRIME]: "P",
};

// Special result values
export const SPECIAL_VALUES = {
  INFINITY: "Infinity",
  NAN: "NaN",
  NEGATIVE_INFINITY: "-Infinity",
};

// Currency list (based on mirage.js rates)
export const CURRENCIES = ["USD", "EUR", "AUD", "CAD", "JPY"];

// Default currencies for converter
export const DEFAULT_SOURCE_CURRENCY = "USD";
export const DEFAULT_TARGET_CURRENCY = "EUR";

// API endpoints
export const API_ENDPOINTS = {
  HISTORY: "/api/history",
  RATES: "/api/rates",
};

// Calculator modes
export const CALCULATOR_MODES = {
  MATH: "math",
  CURRENCY: "currency",
};

// Initial display value
export const INITIAL_DISPLAY = "0";

// Decimal point character
export const DECIMAL_POINT = ".";
