import { useEffect, useState } from "react";
import AppLayout from "../Layout/AppLayout";
import ModeToggle from "../Common/ModeToggle";
import MathDisplay from "../../features/math/components/MathDisplay";
import CurrencyDisplay from "../../features/currency/components/CurrencyDisplay";
import Keypad from "../../features/math/components/Keypad";
import { useCalculator } from "../../features/math/hooks/useCalculator";
import useHistory from "../../features/math/hooks/useHistory";
import { useKeyboardHandler } from "../../features/math/hooks/useKeyboardHandler";
import { useCurrencyRates } from "../../hooks/useCurrencyRates";
import { useCurrencyConverter } from "../../features/currency/hooks/useCurrencyConverter";
import { CALCULATOR_MODES, type CalculatorMode } from "../../utils/constants";
import styles from "./Calculator.module.css";

const noop = () => { };

/**
 * Unified Calculator component
 * Manages mode, math + currency logic, and renders a single view with conditional panels
 */
export default function Calculator() {
    const [mode, setMode] = useState<CalculatorMode>(CALCULATOR_MODES.MATH);
    const isMathMode = mode === CALCULATOR_MODES.MATH;

    // Math feature state
    const {
        expression,
        result,
        lastEntry,
        isError,
        handleNumberInput,
        handleDecimalInput,
        handleOperatorInput,
        handleEquals,
        handleClear,
        handleBackspace,
    } = useCalculator();
    const { history, addHistoryEntry } = useHistory();

    useKeyboardHandler(
        {
            handleNumberInput,
            handleDecimalInput,
            handleOperatorInput,
            handleEquals,
            handleBackspace,
            handleClear,
        },
        isMathMode,
    );

    useEffect(() => {
        if (lastEntry) {
            addHistoryEntry(lastEntry);
        }
    }, [addHistoryEntry, lastEntry]);

    // Currency feature state
    const currencyRates = useCurrencyRates();
    const converter = useCurrencyConverter(currencyRates);

    const keypadProps = isMathMode
        ? {
            onNumber: handleNumberInput,
            onDecimal: handleDecimalInput,
            onOperator: handleOperatorInput,
            onEquals: handleEquals,
            onClear: handleClear,
            onBackspace: handleBackspace,
            mode,
        }
        : {
            onNumber: converter.handlers.onNumber,
            onDecimal: converter.handlers.onDecimal,
            onOperator: noop,
            onEquals: noop,
            onClear: converter.handlers.onClear,
            onBackspace: converter.handlers.onBackspace,
            mode,
        };

    return (
        <AppLayout>
            <div className={styles["calculator"]}>
                <div className={styles["displayArea"]} aria-live="polite">
                    <ModeToggle mode={mode} onModeChange={setMode} />

                    {isMathMode ? (
                        <MathDisplay
                            expression={expression}
                            result={result}
                            history={history}
                            isError={isError}
                        />
                    ) : (
                        <CurrencyDisplay
                            fromCurrency={converter.fromCurrency}
                            toCurrency={converter.toCurrency}
                            currencies={currencyRates.currencies}
                            ratesLoading={currencyRates.loading}
                            ratesError={currencyRates.error}
                            onFromCurrencyChange={converter.handlers.onFromCurrencyChange}
                            onToCurrencyChange={converter.handlers.onToCurrencyChange}
                            inputValue={converter.inputValue}
                            onInputValueChange={converter.handlers.onInputValueChange}
                            outputValue={converter.outputValue}
                            timestamp={currencyRates.timestamp}
                        />
                    )}
                </div>

                <Keypad {...keypadProps} />
            </div>
        </AppLayout>
    );
}
