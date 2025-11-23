import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide } from '../operations';

describe('math operations', () => {
  it('adds numbers', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });

  it('subtracts numbers', () => {
    expect(subtract(5, 3)).toBe(2);
    expect(subtract(0, 5)).toBe(-5);
  });

  it('multiplies numbers', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-2, 3)).toBe(-6);
  });

  it('divides numbers', () => {
    expect(divide(6, 3)).toBe(2);
    expect(divide(1, 2)).toBe(0.5);
  });

  it('returns Infinity for x/0', () => {
    expect(divide(5, 0)).toBe(Infinity);
    expect(divide(-5, 0)).toBe(-Infinity);
  });

  it('returns NaN for 0/0', () => {
    expect(Number.isNaN(divide(0, 0))).toBe(true);
  });
});
