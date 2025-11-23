/**
 * useCalculator - State and logic for the calculator
 *
 * Handles:
 * - currentInput, operator, firstOperand, result
 * - handleNumberInput(digit)
 * - handleOperatorInput(op)
 * - handleEquals()
 * - handleClear()
 * - decimal point input (only one per number)
 * - 10-digit limit
 */
import { useState } from 'react';
import { add, subtract, multiply, divide } from '../utils/operations';
import { isValidDigitInput, canAddDecimal } from '../utils/inputValidator';

export type Operator = '+' | '-' | '×' | '÷' | 'P' | null;

export interface CalculatorState {
  currentInput: string;
  operator: Operator;
  firstOperand: string | null;
  result: number | null | 'Error';
  history: string[];
  isError?: boolean;
}

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>({
    currentInput: '0',
    operator: null,
    firstOperand: null,
    result: null,
    history: [],
  });

  function handleNumberInput(digit: string) {
    setState((prev) => {
      let input = prev.currentInput === '0' ? digit : prev.currentInput + digit;
      if (!isValidDigitInput(input)) return prev;
      return { ...prev, currentInput: input };
    });
  }

  function handleDecimalInput() {
    setState((prev) => {
      if (!canAddDecimal(prev.currentInput)) return prev;
      return { ...prev, currentInput: prev.currentInput + '.' };
    });
  }

  function handleOperatorInput(op: Operator) {
    setState((prev) => {
      if (prev.operator && prev.firstOperand !== null) {
        // Chain operations: compute previous first
        const computed = computeResult(prev.firstOperand, prev.currentInput, prev.operator);
        if (Number.isFinite(computed) && !Number.isNaN(computed)) {
          return {
            ...prev,
            firstOperand: String(computed),
            currentInput: '0',
            operator: op,
            result: null,
          };
        } else {
          // Error: reset to initial state, set error marker, clear operator, set isError
          return {
            ...prev,
            firstOperand: '0',
            currentInput: '0',
            operator: null,
            result: 'Error',
            isError: true,
          };
        }
      }
      return {
        ...prev,
        firstOperand: prev.currentInput,
        currentInput: '0',
        operator: op,
        result: null,
      };
    });
  }

  function handleEquals() {
    setState((prev) => {
      if (!prev.operator || prev.firstOperand === null) return prev;
      const computed = computeResult(prev.firstOperand, prev.currentInput, prev.operator);
      let isError = !Number.isFinite(computed) || Number.isNaN(computed);
      const historyEntry = `${prev.firstOperand}${prev.operator}${prev.currentInput}=${isError ? 'Error' : computed}`;
      if (isError) {
        return {
          ...prev,
          result: 'Error',
          currentInput: 'Error',
          firstOperand: null,
          operator: null,
          history: [...prev.history, historyEntry],
          isError: true,
        };
      }
      return {
        ...prev,
        result: computed,
        currentInput: String(computed),
        firstOperand: null,
        operator: null,
        history: [...prev.history, historyEntry],
      };
    });
  }

  function handleClear() {
    setState({
      currentInput: '0',
      operator: null,
      firstOperand: null,
      result: null,
      history: [],
      isError: false,
    });
  }

  function handleBackspace() {
    setState((prev) => {
      if (prev.currentInput.length <= 1) {
        return { ...prev, currentInput: '0' };
      }
      return { ...prev, currentInput: prev.currentInput.slice(0, -1) };
    });
  }

  function computeResult(a: string, b: string, op: Operator): number {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (!Number.isFinite(x) || Number.isNaN(x) || !Number.isFinite(y) || Number.isNaN(y)) {
      return NaN;
    }
    let result: number;
    switch (op) {
      case '+':
        result = add(x, y);
        break;
      case '-':
        result = subtract(x, y);
        break;
      case '×':
        result = multiply(x, y);
        break;
      case '÷':
        if (y === 0) return NaN; // Explicitly handle division by zero
        result = divide(x, y);
        break;
      default:
        return NaN;
    }
    // Enforce 10-digit integer part limit
    const [intPart = ''] = Math.abs(result).toString().split('.');
    if (!Number.isFinite(result) || Number.isNaN(result) || intPart.length > 10) {
      return NaN;
    }
    return result;
  }

  return {
    ...state,
    handleNumberInput,
    handleDecimalInput,
    handleOperatorInput,
    handleEquals,
    handleClear,
    handleBackspace,
  };
}
