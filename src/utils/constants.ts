// Maximum number of digits allowed for input
export const MAX_DIGITS = 10;

// Mathematical operations
export const OPERATIONS = {
  ADD: "+",
  SUBTRACT: "-",
  MULTIPLY: "×",
  DIVIDE: "÷",
  PRIME: "P",
} as const;

// Type for operation keys
export type OperationKey = keyof typeof OPERATIONS;

// Type for operation values
export type OperationValue = typeof OPERATIONS[OperationKey];

// Operation symbols for display
export const OPERATION_SYMBOLS: Record<OperationValue, string> = {
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
} as const;

// Type for special values
export type SpecialValue = typeof SPECIAL_VALUES[keyof typeof SPECIAL_VALUES];

// Currency codes
export const CURRENCIES = ["USD", "EUR", "AUD", "CAD", "JPY"] as const;

// Type for currency codes
export type CurrencyCode = typeof CURRENCIES[number];

// Default currencies for converter
export const DEFAULT_SOURCE_CURRENCY: CurrencyCode = "USD";
export const DEFAULT_TARGET_CURRENCY: CurrencyCode = "EUR";

// API endpoints
export const API_ENDPOINTS = {
  HISTORY: "/api/history",
  RATES: "/api/rates",
} as const;

// Type for API endpoint keys
export type ApiEndpointKey = keyof typeof API_ENDPOINTS;

// Calculator modes
export const CALCULATOR_MODES = {
  MATH: "math",
  CURRENCY: "currency",
} as const;

// Type for calculator mode keys
export type CalculatorModeKey = keyof typeof CALCULATOR_MODES;

// Type for calculator mode values
export type CalculatorMode = typeof CALCULATOR_MODES[CalculatorModeKey];

// Mode display labels
export const MODE_LABELS: Record<CalculatorMode, string> = {
  [CALCULATOR_MODES.MATH]: "Math",
  [CALCULATOR_MODES.CURRENCY]: "Currency",
};

// Initial display value
export const INITIAL_DISPLAY = "0";

// Decimal point character
export const DECIMAL_POINT = ".";

// Cache configuration
export const RATES_CACHE_KEY = "currency_rates_cache";
export const RATES_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
