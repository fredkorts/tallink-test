/**
 * Currency converter utility functions
 */

/** Maximum number of decimal places for currency input */
export const MAX_DECIMAL_PLACES = 6;

/**
 * Gets available currency options excluding the currently selected other currency
 * @param allCurrencies All available currency codes
 * @param selectedCurrency Currently selected currency for this dropdown
 * @param otherCurrency The other currency (to exclude from options)
 * @returns Filtered list of available currencies
 */
export function getAvailableCurrencies(
    allCurrencies: string[],
    selectedCurrency: string,
    otherCurrency: string
): string[] {
    return allCurrencies.filter(
        (code) => code === selectedCurrency || code !== otherCurrency
    );
}

/**
 * Sanitizes currency input value
 * - Removes non-numeric characters except decimal point
 * - Ensures only one decimal point
 * - Limits decimal places
 * - Removes leading zeros
 * 
 * @param value Raw input value
 * @returns Sanitized value
 */
export function sanitizeCurrencyInput(value: string): string {
    const cleaned = value.replace(/[^\d.]/g, "");
    const [integer = "", ...decimalParts] = cleaned.split(".");
    const decimal = decimalParts.join("");
    const sanitizedInteger = integer.replace(/^0+(?=\d)/, "") || "0";

    // Allow trailing decimal point for better UX
    if (cleaned.endsWith(".") && decimal === "") {
        return `${sanitizedInteger}.`;
    }

    const sanitizedDecimal = decimal
        ? `.${decimal.slice(0, MAX_DECIMAL_PLACES)}`
        : "";

    return `${sanitizedInteger}${sanitizedDecimal}`;
}
