/**
 * Prime utilities for the calculator
 * - Fast enough for the ranges in the requirements
 */
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
