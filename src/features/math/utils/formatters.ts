/**
 * Formatters for calculator display
 * - Handles Infinity, NaN, decimals, negatives
 */

import { SPECIAL_VALUES } from "../../../utils/constants";

export function formatResult(value: number | null): string {
  if (value === null) return SPECIAL_VALUES.NAN;
  if (Number.isNaN(value)) return SPECIAL_VALUES.NAN;
  if (!Number.isFinite(value)) return value > 0 ? SPECIAL_VALUES.INFINITY : SPECIAL_VALUES.NEGATIVE_INFINITY;
  return value.toString();
}

export function formatInput(input: string): string {
  // Remove leading zeros (except for decimals)
  if (input.startsWith("0") && !input.startsWith("0.")) {
    return String(Number(input));
  }
  return input;
}
