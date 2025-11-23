/**
 * Formatters for calculator display
 * - Handles Infinity, NaN, decimals, negatives
 */

export function formatResult(value: number): string {
  if (Number.isNaN(value)) return "NaN";
  if (!Number.isFinite(value)) return value > 0 ? "∞" : "-∞";
  return value.toString();
}

export function formatInput(input: string): string {
  // Remove leading zeros (except for decimals)
  if (input.startsWith("0") && !input.startsWith("0.")) {
    return String(Number(input));
  }
  return input;
}
