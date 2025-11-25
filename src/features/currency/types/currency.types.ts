/**
 * Type definitions for the Currency Converter feature
 */

/**
 * Props for the Currency Display component
 */
export interface CurrencyDisplayProps {
    fromCurrency: string;
    toCurrency: string;
    currencies: string[];
    ratesLoading: boolean;
    ratesError: string | null;
    onFromCurrencyChange: (currency: string) => void;
    onToCurrencyChange: (currency: string) => void;
    inputValue: string;
    onInputValueChange: (val: string) => void;
    outputValue: string;
    timestamp: string | null;
}

/**
 * Return type for useCurrencyConverter hook
 */
export interface UseCurrencyConverterResult {
    fromCurrency: string;
    toCurrency: string;
    inputValue: string;
    outputValue: string;
    handlers: {
        onFromCurrencyChange: (code: string) => void;
        onToCurrencyChange: (code: string) => void;
        onInputValueChange: (value: string) => void;
        onNumber: (digit: string) => void;
        onDecimal: () => void;
        onClear: () => void;
        onBackspace: () => void;
    };
}
