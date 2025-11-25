import type { CalculatorMode } from "../../../../utils/constants";
import { useCurrencyRates } from "../../../../hooks/useCurrencyRates";
import { useCurrencyConverter } from "../../hooks/useCurrencyConverter";
import CalculatorLayout from "../../../math/components/CalculatorLayout";
import type { Operator } from "../../../math/hooks/useCalculator";
import styles from "./CurrencyConverter.module.css";

export interface CurrencyConverterProps {
    mode: CalculatorMode;
    onModeChange: (mode: CalculatorMode) => void;
}

/**
 * Currency Converter Component
 * Manages currency conversion state and renders the currency UI
 */
export default function CurrencyConverter({
    mode,
    onModeChange,
}: CurrencyConverterProps) {
    // Get currency rates from API
    const currencyRates = useCurrencyRates();
    const { currencies, loading: ratesLoading, error: ratesError, timestamp } = currencyRates;

    // Use currency converter hook for state management
    const converter = useCurrencyConverter(currencyRates);

    // Currency display props
    const displayProps = {
        mode: "currency" as const,
        onModeChange,
        fromCurrency: converter.fromCurrency,
        toCurrency: converter.toCurrency,
        currencies,
        ratesLoading,
        ratesError,
        onFromCurrencyChange: converter.handlers.onFromCurrencyChange,
        onToCurrencyChange: converter.handlers.onToCurrencyChange,
        inputValue: converter.inputValue,
        onInputValueChange: converter.handlers.onInputValueChange,
        outputValue: converter.outputValue,
        timestamp,
    };

    // Keypad props for currency mode
    const noopOperator: (op: Operator) => void = () => { };
    const keypadProps = {
        onNumber: converter.handlers.onNumber,
        onDecimal: converter.handlers.onDecimal,
        onOperator: noopOperator,
        onEquals: () => { },
        onClear: converter.handlers.onClear,
        onBackspace: converter.handlers.onBackspace,
        mode,
    };

    return (
        <div className={styles["wrapper"]}>
            <CalculatorLayout displayProps={displayProps} keypadProps={keypadProps} />
        </div>
    );
}
