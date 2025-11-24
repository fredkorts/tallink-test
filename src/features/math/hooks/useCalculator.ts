import { useMemo, useState } from "react";
import {
  DECIMAL_POINT,
  INITIAL_DISPLAY,
  MAX_DIGITS,
  OPERATIONS,
  SPECIAL_VALUES,
} from "../../../utils/constants";
import { divide, multiply, subtract, add } from "../utils/operations";
import { formatResult, formatInput } from "../utils/formatters";
import { canAddDecimal, isValidDigitInput } from "../utils/inputValidator";
import { maxPrimeInRange } from "../utils/primeUtils";

export type Operator = typeof OPERATIONS[keyof typeof OPERATIONS] | null;

interface CalculatorState {
  currentInput: string;
  firstOperand: string | null;
  operator: Operator;
  result: string | null;
  lastEntry: string | null;
  isError: boolean;
  shouldResetInput: boolean;
}

const initialState: CalculatorState = {
  currentInput: INITIAL_DISPLAY,
  firstOperand: null,
  operator: null,
  result: null,
  lastEntry: null,
  isError: false,
  shouldResetInput: false,
};

function computeOperation(a: string, b: string, operator: Operator) {
  const left = parseFloat(a);
  const right = parseFloat(b);

  if (Number.isNaN(left) || Number.isNaN(right) || operator === null) {
    return { value: NaN, display: SPECIAL_VALUES.NAN, isError: true };
  }

  let result: number | null = null;
  switch (operator) {
    case OPERATIONS.ADD:
      result = add(left, right);
      break;
    case OPERATIONS.SUBTRACT:
      result = subtract(left, right);
      break;
    case OPERATIONS.MULTIPLY:
      result = multiply(left, right);
      break;
    case OPERATIONS.DIVIDE:
      result = divide(left, right);
      break;
    case OPERATIONS.PRIME: {
      const prime = maxPrimeInRange(left, right);
      result = prime ?? NaN;
      break;
    }
    default:
      result = NaN;
  }

  const display = formatResult(result);
  const isError =
    display === SPECIAL_VALUES.NAN ||
    display === SPECIAL_VALUES.INFINITY ||
    display === SPECIAL_VALUES.NEGATIVE_INFINITY;

  return { value: result, display, isError };
}

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState);

  const expression = useMemo(() => {
    if (state.operator && state.firstOperand !== null) {
      return state.shouldResetInput
        ? `${state.firstOperand}${state.operator}` 
        : `${state.firstOperand}${state.operator}${state.currentInput}`;
    }
    return state.currentInput;
  }, [state.currentInput, state.firstOperand, state.operator, state.shouldResetInput]);

  const appendDigit = (digit: string) => {
    setState((prev) => {
      const sanitizedDigit = digit.trim();
      if (!sanitizedDigit) return prev;

      const nextInput = prev.shouldResetInput || prev.currentInput === INITIAL_DISPLAY
        ? sanitizedDigit
        : prev.currentInput + sanitizedDigit;
      if (!isValidDigitInput(nextInput, MAX_DIGITS)) return prev;

      return {
        ...prev,
        lastEntry: prev.shouldResetInput ? null : prev.lastEntry,
        currentInput: formatInput(nextInput),
        shouldResetInput: false,
        isError: false,
        result: null,
        lastEntry: null, // Clear lastEntry when starting new input
      };
    });
  };

  const appendDecimal = () => {
    setState((prev) => {
      const base = prev.shouldResetInput ? INITIAL_DISPLAY : prev.currentInput;
      if (!canAddDecimal(base)) return prev;
      const nextInput = `${base}${DECIMAL_POINT}`;
      return {
        ...prev,
        lastEntry: prev.shouldResetInput ? null : prev.lastEntry,
        currentInput: nextInput,
        shouldResetInput: false,
        result: null,
        lastEntry: null, // Clear lastEntry
      };
    });
  };

  const chooseOperator = (operator: Operator) => {
    setState((prev) => {
      const incomingOperator = operator;
      if (!incomingOperator) return prev;

      // If operator exists and user hits another operator before typing second operand, just swap
      if (prev.operator && prev.shouldResetInput) {
        return { ...prev, operator: incomingOperator, lastEntry: null };
      }

      // Chain operations: compute the result and continue with new operator
      if (prev.operator && prev.firstOperand !== null && !prev.shouldResetInput) {
        const { display, isError } = computeOperation(prev.firstOperand, prev.currentInput, prev.operator);
        const entry = `${prev.firstOperand}${prev.operator}${prev.currentInput}=${display}`;
        return {
          currentInput: display,
          firstOperand: display,
          operator: incomingOperator,
          result: display,
          lastEntry: entry,
          isError,
          shouldResetInput: true,
        };
      }

      // Start new operation
      return {
        ...prev,
        lastEntry: prev.shouldResetInput ? null : prev.lastEntry,
        firstOperand: prev.currentInput,
        operator: incomingOperator,
        shouldResetInput: true,
        lastEntry: null, // Clear lastEntry when starting new operation
      };
    });
  };

  const calculateResult = () => {
    setState((prev) => {
      if (!prev.operator || prev.firstOperand === null) return prev;
      const { display, isError } = computeOperation(prev.firstOperand, prev.currentInput, prev.operator);
      const entry = `${prev.firstOperand}${prev.operator}${prev.currentInput}=${display}`;
      return {
        currentInput: display,
        firstOperand: null,
        operator: null,
        result: display,
        lastEntry: entry,
        isError,
        shouldResetInput: true,
      };
    });
  };

  const clearAll = () => {
    setState(initialState);
  };

  const backspace = () => {
    setState((prev) => {
      if (prev.shouldResetInput) {
        return { ...prev, currentInput: INITIAL_DISPLAY, shouldResetInput: false };
      }
      if (prev.currentInput.length <= 1) {
        return { ...prev, currentInput: INITIAL_DISPLAY };
      }
      const next = prev.currentInput.slice(0, -1);
      return { ...prev, currentInput: next || INITIAL_DISPLAY };
    });
  };

  return {
    ...state,
    expression,
    handleNumberInput: appendDigit,
    handleDecimalInput: appendDecimal,
    handleOperatorInput: chooseOperator,
    handleEquals: calculateResult,
    handleClear: clearAll,
    handleBackspace: backspace,
  };
}