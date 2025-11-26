import { SPECIAL_VALUES } from "../../../utils/constants";

/** Math operations */
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  return a / b;
}

/** Input validation helpers */
export function isValidDigitInput(input: string, maxDigits = 10): boolean {
  const digits = input.replace(/\D/g, "");
  return digits.length <= maxDigits;
}

export function canAddDecimal(input: string): boolean {
  return !input.includes(".");
}

/** Prime helpers */
export function isPrime(value: number): boolean {
  if (!Number.isInteger(value) || value < 2) return false;
  if (value === 2) return true;
  if (value % 2 === 0) return false;

  const limit = Math.sqrt(value);
  for (let i = 3; i <= limit; i += 2) {
    if (value % i === 0) return false;
  }
  return true;
}

export function maxPrimeInRange(a: number, b: number): number | null {
  const start = Math.min(a, b);
  const end = Math.max(a, b);

  if (!Number.isFinite(start) || !Number.isFinite(end)) return null;
  for (let candidate = Math.floor(end); candidate >= Math.ceil(start); candidate -= 1) {
    if (isPrime(candidate)) {
      return candidate;
    }
  }
  return null;
}

/** Display formatters */
export function formatResult(value: number | null): string {
  if (value === null) return SPECIAL_VALUES.NAN;
  if (Number.isNaN(value)) return SPECIAL_VALUES.NAN;
  if (!Number.isFinite(value)) return value > 0 ? SPECIAL_VALUES.INFINITY : SPECIAL_VALUES.NEGATIVE_INFINITY;

  return parseFloat(value.toFixed(6)).toString();
}

export function formatInput(input: string): string {
  if (input.startsWith("0") && !input.startsWith("0.")) {
    return String(Number(input));
  }
  return input;
}
