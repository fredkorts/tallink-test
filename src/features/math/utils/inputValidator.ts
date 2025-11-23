/**
 * Input validation utilities for calculator
 * - 10-digit limit
 * - Decimal rules
 */

export function isValidDigitInput(input: string, maxDigits = 10): boolean {
  // Count only actual digits (0-9)
  const digits = input.replace(/\D/g, "");
  return digits.length <= maxDigits;
}

export function canAddDecimal(input: string): boolean {
  // Only one decimal allowed per number
  return !input.includes(".");
}
