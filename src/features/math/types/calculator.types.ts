/**
 * Type definitions for the Math Calculator feature
 */

import type { CalculatorMode } from "../../../utils/constants";
import type { Operator } from "../hooks/useCalculator";

/**
 * Props for the Math Calculator component
 */
export interface MathCalculatorProps {
    mode: CalculatorMode;
    onModeChange: (mode: CalculatorMode) => void;
}

/**
 * Props for the Math Display component
 */
export interface MathDisplayProps {
    expression: string;
    result: string | null;
    history: string[];
    isError: boolean;
}

/**
 * Props for the Keypad component
 */
export interface KeypadProps {
    onNumber: (digit: string) => void;
    onDecimal: () => void;
    onOperator: (op: Operator) => void;
    onEquals: () => void;
    onClear: () => void;
    onBackspace: () => void;
    mode?: CalculatorMode;
}

/**
 * Props for mode change handler
 */
export interface ModeChangeProps {
    mode: CalculatorMode;
    onModeChange: (mode: CalculatorMode) => void;
}

/**
 * History entry value types
 */
export type HistoryEntryValue = string | number | null | undefined;

/**
 * History entry object structure
 */
export interface HistoryEntry {
    operand1?: HistoryEntryValue;
    operator?: HistoryEntryValue;
    operand2?: HistoryEntryValue;
    result?: HistoryEntryValue;
}

/**
 * Input type for adding history entries
 */
export type HistoryInput = string | HistoryEntry;
