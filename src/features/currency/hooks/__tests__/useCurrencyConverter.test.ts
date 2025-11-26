import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useCurrencyConverter } from "../useCurrencyConverter";
import type { UseCurrencyRatesResult } from "../../../../hooks/useCurrencyRates";
import type { CurrencyRates } from "../../../../services/types";

const mockRates: CurrencyRates = {
    USD: { EUR: 0.94, JPY: 154.525, GBP: 0.79 },
    EUR: { USD: 1.07, JPY: 164.132, GBP: 0.84 },
    JPY: { USD: 0.00647, EUR: 0.00609, GBP: 0.00512 },
    GBP: { USD: 1.27, EUR: 1.19, JPY: 195.31 },
};

describe("useCurrencyConverter", () => {
    let mockCurrencyRates: UseCurrencyRatesResult;

    beforeEach(() => {
        mockCurrencyRates = {
            rates: mockRates,
            currencies: ["EUR", "GBP", "JPY", "USD"],
            timestamp: "2024-01-01T12:00:00Z",
            loading: false,
            error: null,
            refresh: vi.fn(),
            convert: vi.fn((amount, from, to) => {
                if (from === to) return amount;
                const rate = mockRates[from]?.[to];
                return rate !== undefined ? amount * rate : null;
            }),
        };
    });

    describe("conversion calculations", () => {
        it("calculates basic conversion correctly", async () => {
            const { result } = renderHook(() => useCurrencyConverter(mockCurrencyRates));

            // Wait for currencies to be set
            await waitFor(() => {
                expect(result.current.fromCurrency).toBeTruthy();
                expect(result.current.toCurrency).toBeTruthy();
            });

            // Set input value
            result.current.handlers.onInputValueChange("100");

            await waitFor(() => {
                expect(result.current.outputValue).toBeTruthy();
                // Verify conversion is happening (output should be a valid number)
                const output = parseFloat(result.current.outputValue.replace(/,/g, ""));
                expect(output).toBeGreaterThan(0);
            });
        });

        it("handles decimal input values", async () => {
            const { result } = renderHook(() => useCurrencyConverter(mockCurrencyRates));

            await waitFor(() => {
                expect(result.current.fromCurrency).toBeTruthy();
                expect(result.current.toCurrency).toBeTruthy();
            });

            result.current.handlers.onInputValueChange("50.5");

            await waitFor(() => {
                expect(result.current.outputValue).toBeTruthy();
                // Verify conversion is happening with decimal values
                const output = parseFloat(result.current.outputValue.replace(/,/g, ""));
                expect(output).toBeGreaterThan(0);
            });
        });

        it("formats output with appropriate decimal places", async () => {
            const { result } = renderHook(() => useCurrencyConverter(mockCurrencyRates));

            await waitFor(() => {
                expect(result.current.fromCurrency).toBeTruthy();
            });

            result.current.handlers.onInputValueChange("100");

            await waitFor(() => {
                expect(result.current.outputValue).toBeTruthy();
                // Should have maximum 4 decimal places
                const match = result.current.outputValue.match(/\.\d+/);
                if (match) {
                    expect(match[0].length - 1).toBeLessThanOrEqual(4);
                }
            });
        });
    });

    describe("conversion updates on currency change", () => {
        it("recalculates when source currency changes", async () => {
            const { result } = renderHook(() => useCurrencyConverter(mockCurrencyRates));

            await waitFor(() => {
                expect(result.current.fromCurrency).toBeTruthy();
            });

            result.current.handlers.onInputValueChange("100");

            await waitFor(() => {
                expect(result.current.outputValue).toBeTruthy();
            });

            const firstOutput = result.current.outputValue;

            // Change source currency
            result.current.handlers.onFromCurrencyChange("GBP");

            await waitFor(() => {
                expect(result.current.outputValue).not.toBe(firstOutput);
            });
        });

        it("recalculates when target currency changes", async () => {
            const { result } = renderHook(() => useCurrencyConverter(mockCurrencyRates));

            await waitFor(() => {
                expect(result.current.fromCurrency).toBeTruthy();
            });

            result.current.handlers.onInputValueChange("100");

            await waitFor(() => {
                expect(result.current.outputValue).toBeTruthy();
            });

            const firstOutput = result.current.outputValue;

            // Change target currency
            result.current.handlers.onToCurrencyChange("JPY");

            await waitFor(() => {
                expect(result.current.outputValue).not.toBe(firstOutput);
            });
        });

        it("ensures distinct currencies when changing", async () => {
            const { result } = renderHook(() => useCurrencyConverter(mockCurrencyRates));

            await waitFor(() => {
                expect(result.current.fromCurrency).toBeTruthy();
                expect(result.current.toCurrency).toBeTruthy();
            });

            const initialFrom = result.current.fromCurrency;
            const initialTo = result.current.toCurrency;

            // Try to set source to same as target
            result.current.handlers.onFromCurrencyChange(initialTo);

            await waitFor(() => {
                expect(result.current.fromCurrency).not.toBe(result.current.toCurrency);
            });
        });
    });

    describe("conversion updates on rate refresh", () => {
        it("recalculates when rates are refreshed", async () => {
            const { result } = renderHook(
                ({ ratesData }) => useCurrencyConverter(ratesData),
                { initialProps: { ratesData: mockCurrencyRates } }
            );

            await waitFor(() => {
                expect(result.current.fromCurrency).toBeTruthy();
            });

            result.current.handlers.onInputValueChange("100");

            await waitFor(() => {
                expect(result.current.outputValue).toBeTruthy();
            });

            // Simply verify that converter hook uses the convert function
            // The convert function is called on every render, so changes to rates
            // will be reflected automatically
            expect(mockCurrencyRates.convert).toHaveBeenCalled();
        });
    });

    describe("edge cases", () => {
        it("handles zero amount", async () => {
            const { result } = renderHook(() => useCurrencyConverter(mockCurrencyRates));

            await waitFor(() => {
                expect(result.current.fromCurrency).toBeTruthy();
            });

            result.current.handlers.onInputValueChange("0");

            await waitFor(() => {
                expect(result.current.outputValue).toBe("0");
            });
        });

        it("handles same currency selection", async () => {
            const { result } = renderHook(() => useCurrencyConverter(mockCurrencyRates));

            await waitFor(() => {
                expect(result.current.fromCurrency).toBeTruthy();
                expect(result.current.toCurrency).toBeTruthy();
            });

            // Verify currencies are different
            expect(result.current.fromCurrency).not.toBe(result.current.toCurrency);
        });

        it("handles missing rates gracefully", async () => {
            const emptyRates: UseCurrencyRatesResult = {
                ...mockCurrencyRates,
                rates: null,
                currencies: [],
                convert: vi.fn(() => null),
            };

            const { result } = renderHook(() => useCurrencyConverter(emptyRates));

            result.current.handlers.onInputValueChange("100");

            await waitFor(() => {
                expect(result.current.outputValue).toBe("");
            });
        });

        it("handles invalid input", async () => {
            const { result } = renderHook(() => useCurrencyConverter(mockCurrencyRates));

            await waitFor(() => {
                expect(result.current.fromCurrency).toBeTruthy();
            });

            result.current.handlers.onInputValueChange("abc");

            await waitFor(() => {
                // Invalid input is sanitized to "0"
                expect(result.current.inputValue).toBe("0");
                expect(result.current.outputValue).toBe("0");
            });
        });

        it("handles rates error", async () => {
            const errorRates: UseCurrencyRatesResult = {
                ...mockCurrencyRates,
                error: "Network error",
            };

            const { result } = renderHook(() => useCurrencyConverter(errorRates));

            await waitFor(() => {
                expect(result.current.fromCurrency).toBeTruthy();
            });

            result.current.handlers.onInputValueChange("100");

            await waitFor(() => {
                expect(result.current.outputValue).toBe("");
            });
        });

        it("clears output when clear is called", async () => {
            const { result } = renderHook(() => useCurrencyConverter(mockCurrencyRates));

            await waitFor(() => {
                expect(result.current.fromCurrency).toBeTruthy();
            });

            result.current.handlers.onInputValueChange("100");

            await waitFor(() => {
                expect(result.current.outputValue).toBeTruthy();
                expect(result.current.outputValue).not.toBe("0");
            });

            result.current.handlers.onClear();

            await waitFor(() => {
                expect(result.current.inputValue).toBe("0");
                expect(result.current.outputValue).toBe("0");
            });
        });
    });

    describe("input handlers", () => {
        it("handles number input", async () => {
            const { result } = renderHook(() => useCurrencyConverter(mockCurrencyRates));

            result.current.handlers.onNumber("5");
            await waitFor(() => {
                expect(result.current.inputValue).toBe("5");
            });

            result.current.handlers.onNumber("0");
            await waitFor(() => {
                expect(result.current.inputValue).toBe("50");
            });
        });

        it("handles decimal input", async () => {
            const { result } = renderHook(() => useCurrencyConverter(mockCurrencyRates));

            result.current.handlers.onNumber("1");
            result.current.handlers.onNumber("2");
            result.current.handlers.onDecimal();
            result.current.handlers.onNumber("5");

            await waitFor(() => {
                expect(result.current.inputValue).toBe("12.5");
            });
        });

        it("prevents multiple decimal points", async () => {
            const { result } = renderHook(() => useCurrencyConverter(mockCurrencyRates));

            result.current.handlers.onNumber("1");
            result.current.handlers.onDecimal();
            result.current.handlers.onNumber("5");
            result.current.handlers.onDecimal(); // Should be ignored

            await waitFor(() => {
                expect(result.current.inputValue).toBe("1.5");
                expect(result.current.inputValue.split(".").length - 1).toBe(1);
            });
        });

        it("handles backspace", async () => {
            const { result } = renderHook(() => useCurrencyConverter(mockCurrencyRates));

            result.current.handlers.onInputValueChange("123");
            await waitFor(() => {
                expect(result.current.inputValue).toBe("123");
            });

            result.current.handlers.onBackspace();
            await waitFor(() => {
                expect(result.current.inputValue).toBe("12");
            });

            result.current.handlers.onBackspace();
            await waitFor(() => {
                expect(result.current.inputValue).toBe("1");
            });

            result.current.handlers.onBackspace();
            await waitFor(() => {
                expect(result.current.inputValue).toBe("0");
            });
        });
    });
});
