import { describe, it, expect } from 'vitest';
import { formatResult, formatInput } from '../formatters';

describe('formatters', () => {
  describe('formatResult', () => {
    it('formats NaN as "NaN"', () => {
      expect(formatResult(NaN)).toBe('NaN');
    });
    it('formats Infinity as "∞"', () => {
      expect(formatResult(Infinity)).toBe('∞');
      expect(formatResult(-Infinity)).toBe('-∞');
    });
    it('formats normal numbers as string', () => {
      expect(formatResult(123)).toBe('123');
      expect(formatResult(-45.6)).toBe('-45.6');
    });
  });

  describe('formatInput', () => {
    it('removes leading zeros except for decimals', () => {
      expect(formatInput('000123')).toBe('123');
      expect(formatInput('0123.45')).toBe('123.45');
      expect(formatInput('0.123')).toBe('0.123');
    });
    it('returns input unchanged if no leading zeros', () => {
      expect(formatInput('123')).toBe('123');
      expect(formatInput('1.23')).toBe('1.23');
    });
  });
});
