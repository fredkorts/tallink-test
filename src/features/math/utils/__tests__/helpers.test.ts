import { describe, expect, it } from "vitest";
import {
  add,
  subtract,
  multiply,
  divide,
  isValidDigitInput,
  canAddDecimal,
  formatResult,
  formatInput,
  isPrime,
  maxPrimeInRange,
} from "../helpers";

describe("math helpers", () => {
  it("performs basic operations", () => {
    expect(add(1, 2)).toBe(3);
    expect(subtract(5, 3)).toBe(2);
    expect(multiply(4, 3)).toBe(12);
    expect(divide(10, 2)).toBe(5);
  });

  it("validates digit input and decimals", () => {
    expect(isValidDigitInput("1234567890")).toBe(true);
    expect(isValidDigitInput("12345678901")).toBe(false);
    expect(canAddDecimal("12.3")).toBe(false);
    expect(canAddDecimal("12")).toBe(true);
  });

  it("formats calculator values", () => {
    expect(formatResult(NaN)).toBe("NaN");
    expect(formatResult(Infinity)).toBe("Infinity");
    expect(formatResult(-Infinity)).toBe("-Infinity");
    expect(formatResult(1 / 3)).toBe("0.333333");
    expect(formatResult(1.5)).toBe("1.5");
    expect(formatInput("0007")).toBe("7");
    expect(formatInput("0.7")).toBe("0.7");
  });

  it("detects prime numbers and ranges", () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(15)).toBe(false);
    expect(maxPrimeInRange(10, 2)).toBe(7);
    expect(maxPrimeInRange(-5, 1)).toBeNull();
  });
});
