import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { useCurrencyRates } from "../useCurrencyRates";
import { fetchRates } from "../../services/ratesService";
import type { CurrencyRates } from "../../services/types";

vi.mock("../../services/ratesService");

const mockRates: CurrencyRates = {
  USD: { EUR: 0.94, JPY: 154.525 },
  EUR: { USD: 1.07, JPY: 164.132 },
  JPY: { USD: 0.00647, EUR: 0.00609 },
};

const mockFetchRates = vi.mocked(fetchRates);

describe("useCurrencyRates", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("fetches rates and exposes conversion helper", async () => {
    mockFetchRates.mockResolvedValueOnce({ rates: mockRates, timestamp: "2024-05-05T12:00:00Z" });

    const { result } = renderHook(() => useCurrencyRates());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.currencies).toEqual(["EUR", "JPY", "USD"]);
    expect(result.current.rates).toEqual(mockRates);
    expect(result.current.convert(10, "USD", "EUR")).toBeCloseTo(9.4, 5);
    expect(result.current.convert(10, "EUR", "EUR")).toBe(10);
  });

  it("handles errors from the rates service", async () => {
    mockFetchRates.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useCurrencyRates());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Network error");
    expect(result.current.currencies).toEqual([]);
    expect(result.current.convert(1, "USD", "EUR")).toBeNull();
  });
});
