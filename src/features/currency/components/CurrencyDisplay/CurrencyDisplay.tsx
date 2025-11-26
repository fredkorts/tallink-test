import { formatTimeAgo } from "../../../../utils/timeFormatters";
import { getAvailableCurrencies } from "../../utils/helpers";
import useTimer from "../../../../hooks/useTimer";
import styles from "./CurrencyDisplay.module.css";

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
 * Display component for Currency Converter mode
 * Shows currency selectors, input/output values, and last updated timestamp
 */
export default function CurrencyDisplay({
    fromCurrency,
    toCurrency,
    currencies,
    ratesLoading,
    ratesError,
    onFromCurrencyChange,
    onToCurrencyChange,
    inputValue,
    onInputValueChange,
    outputValue,
    timestamp,
}: CurrencyDisplayProps) {
    // Trigger re-render every minute to update elapsed time
    useTimer(60000);

    const currencyOptions = currencies || [];
    const fromOptions = getAvailableCurrencies(currencyOptions, fromCurrency, toCurrency);
    const toOptions = getAvailableCurrencies(currencyOptions, toCurrency, fromCurrency);
    const hasCurrencies = fromOptions.length > 0 && toOptions.length > 0;

    return (
        <div className={styles['currencyDisplay']}>
            <div className={styles["statusRow"]}>
                {ratesLoading && <span className={styles["statusMuted"]}>Loading rates…</span>}
                {ratesError && <span className={styles["statusError"]}>{ratesError}</span>}
            </div>

            <div className={styles["currencyRow"]}>
                <select
                    className={styles["currencySelect"]}
                    value={fromCurrency}
                    onChange={(e) => onFromCurrencyChange(e.target.value)}
                    disabled={!hasCurrencies || ratesLoading}
                >
                    {fromOptions.map((code) => (
                        <option key={code} value={code} disabled={code === toCurrency}>
                            {code}
                        </option>
                    ))}
                </select>
                <span className={styles["chevron"]}>›</span>
                <input
                    className={styles["currencyInput"]}
                    type="text"
                    value={inputValue}
                    onChange={(e) => onInputValueChange(e.target.value)}
                    inputMode="decimal"
                    aria-label="Amount to convert"
                    disabled={ratesLoading || !hasCurrencies}
                />
            </div>

            <div className={styles['currencyRow']}>
                <select
                    className={styles['currencySelect']}
                    value={toCurrency}
                    onChange={(e) => onToCurrencyChange(e.target.value)}
                    disabled={!hasCurrencies || ratesLoading}
                >
                    {toOptions.map((code) => (
                        <option key={code} value={code} disabled={code === fromCurrency}>
                            {code}
                        </option>
                    ))}
                </select>
                <span className={styles['chevron']}>›</span>
                <div className={styles['currencyOutput']} aria-live="polite">
                    {outputValue || (ratesLoading ? "…" : "")}
                </div>
            </div>

            {timestamp && (
                <div className={styles['timestamp']}>
                    Last Updated {formatTimeAgo(timestamp)}
                </div>
            )}
        </div>
    );
}
