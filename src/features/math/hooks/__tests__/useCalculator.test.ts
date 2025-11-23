import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCalculator } from '../useCalculator';

describe('useCalculator', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => useCalculator());
    expect(result.current.currentInput).toBe('0');
    expect(result.current.operator).toBeNull();
    expect(result.current.firstOperand).toBeNull();
    expect(result.current.result).toBeNull();
    expect(result.current.history).toEqual([]);
  });

  it('handles number input and digit limit', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      for (let d of '1234567890') result.current.handleNumberInput(d);
    });
    expect(result.current.currentInput.length).toBeLessThanOrEqual(10);
    act(() => {
      result.current.handleNumberInput('1');
    });
    expect(result.current.currentInput.length).toBe(10); // no more than 10 digits
  });

  it('handles decimal input', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.handleDecimalInput();
      result.current.handleNumberInput('5');
      result.current.handleDecimalInput(); // should not add another
    });
    expect(result.current.currentInput).toBe('0.5');
  });

  it('handles operator input and chaining', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.handleNumberInput('2');
      result.current.handleOperatorInput('+');
      result.current.handleNumberInput('3');
      result.current.handleOperatorInput('×'); // chain: should compute 2+3
    });
    expect(result.current.firstOperand).toBe('5');
    expect(result.current.operator).toBe('×');
    expect(result.current.currentInput).toBe('0');
  });

  it('handles equals and history', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.handleNumberInput('2');
      result.current.handleOperatorInput('+');
      result.current.handleNumberInput('3');
      result.current.handleEquals();
    });
    expect(result.current.result).toBe(5);
    expect(result.current.currentInput).toBe('5');
    expect(result.current.history[result.current.history.length - 1]).toBe('2+3=5');
  });

  it('handles clear', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.handleNumberInput('2');
      result.current.handleOperatorInput('+');
      result.current.handleClear();
    });
    expect(result.current.currentInput).toBe('0');
    expect(result.current.operator).toBeNull();
    expect(result.current.firstOperand).toBeNull();
    expect(result.current.result).toBeNull();
    expect(result.current.history).toEqual([]);
  });

  it('handles backspace', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.handleNumberInput('2');
      result.current.handleNumberInput('3');
      result.current.handleBackspace();
    });
    expect(result.current.currentInput).toBe('2');
    act(() => {
      result.current.handleBackspace();
    });
    expect(result.current.currentInput).toBe('0');
  });
});
