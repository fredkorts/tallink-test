import { useEffect } from "react";
import { OPERATIONS } from "../../../utils/constants";
import type { Operator } from "../hooks/useCalculator";

interface KeyboardHandlers {
    handleNumberInput: (digit: string) => void;
    handleDecimalInput: () => void;
    handleOperatorInput: (op: Operator) => void;
    handleEquals: () => void;
    handleBackspace: () => void;
    handleClear: () => void;
}

/**
 * Custom hook to handle keyboard events for the math calculator
 * Listens for keyboard input and triggers appropriate calculator actions
 * 
 * @param handlers Object containing all calculator handler functions
 * @param enabled Whether keyboard handling is enabled (defaults to true)
 */
export function useKeyboardHandler(
    handlers: KeyboardHandlers,
    enabled: boolean = true
): void {
    const {
        handleNumberInput,
        handleDecimalInput,
        handleOperatorInput,
        handleEquals,
        handleBackspace,
        handleClear,
    } = handlers;

    useEffect(() => {
        if (!enabled) return;

        const handleKey = (event: KeyboardEvent) => {
            const { key } = event;

            // Number keys
            if (/[0-9]/.test(key)) {
                handleNumberInput(key);
                return;
            }

            // Decimal point
            if (key === ".") {
                handleDecimalInput();
                return;
            }

            // Operators
            if (["+", "-", "*", "/", "p", "P"].includes(key)) {
                event.preventDefault();
                const operatorMap: Record<string, NonNullable<Operator>> = {
                    "+": OPERATIONS.ADD,
                    "-": OPERATIONS.SUBTRACT,
                    "*": OPERATIONS.MULTIPLY,
                    "/": OPERATIONS.DIVIDE,
                    p: OPERATIONS.PRIME,
                    P: OPERATIONS.PRIME,
                };
                const operatorKey = key as keyof typeof operatorMap;
                const operator = operatorMap[operatorKey];
                if (operator) {
                    handleOperatorInput(operator);
                }
                return;
            }

            // Equals
            if (key === "Enter" || key === "=") {
                event.preventDefault();
                handleEquals();
                return;
            }

            // Backspace
            if (key === "Backspace") {
                handleBackspace();
                return;
            }

            // Clear
            if (key.toLowerCase() === "c" || key === "Escape") {
                handleClear();
                return;
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [
        enabled,
        handleNumberInput,
        handleDecimalInput,
        handleOperatorInput,
        handleEquals,
        handleBackspace,
        handleClear,
    ]);
}
