import { describe, it, expect } from 'vitest';
import { isValidDigitInput, canAddDecimal } from '../inputValidator';

describe('inputValidator', () => {
  describe('isValidDigitInput', () => {
    it('allows up to 10 digits', () => {
      expect(isValidDigitInput('1234567890')).toBe(true);
      expect(isValidDigitInput('12345678901')).toBe(false);
    });
    it('ignores decimal point for digit count', () => {
      expect(isValidDigitInput('12345.6789')).toBe(true);
      expect(isValidDigitInput('123456789.0')).toBe(true);
      expect(isValidDigitInput('1234567890.1')).toBe(false);
    });
  });

  describe('canAddDecimal', () => {
    it('allows decimal if not present', () => {
      expect(canAddDecimal('123')).toBe(true);
      expect(canAddDecimal('0')).toBe(true);
    });
    it('disallows decimal if already present', () => {
      expect(canAddDecimal('12.3')).toBe(false);
      expect(canAddDecimal('0.')).toBe(false);
    });
  });
});
