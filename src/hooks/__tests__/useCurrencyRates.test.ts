import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { useCurrencyRates } from "../useCurrencyRates";
import { fetchRates } from "../../services/ratesService";
import type { CurrencyRates } from "../../services/types";
import useLocalStorage from "../useLocalStorage";

vi.mock("../../services/ratesService");
vi.mock("../useLocalStorage");

const mockRates: CurrencyRates = {
  USD: { EUR: 0.94, JPY: 154.525 },
  EUR: { USD: 1.07, JPY: 164.132 },
  JPY: { USD: 0.00647, EUR: 0.00609 },
};

const mockFetchRates = vi.mocked(fetchRates);
const mockUseLocalStorage = vi.mocked(useLocalStorage);

describe("useCurrencyRates", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("fetches rates and exposes conversion helper", async () => {
    mockUseLocalStorage.mockReturnValue([null, vi.fn()]);
    mockFetchRates.mockResolvedValueOnce({ rates: mockRates, timestamp: "2024-05-05T12:00:00Z" });

    const { result } = renderHook(() => useCurrencyRates());

    await waitFor(() => expect(result.current.rates).toEqual(mockRates));

    expect(result.current.loading).toBe(false);
    expect(result.current.currencies).toEqual(["EUR", "JPY", "USD"]);
    expect(result.current.convert(10, "USD", "EUR")).toBeCloseTo(9.4, 5);
    expect(result.current.convert(10, "EUR", "EUR")).toBe(10);
  });

  it("uses cached rates if valid", async () => {
    const now = new Date().getTime();
    const cachedData = {
      rates: mockRates,
      timestamp: new Date(now - 1000).toISOString(), // 1 second ago
    };

    mockUseLocalStorage.mockReturnValue([cachedData, vi.fn()]);

    const { result } = renderHook(() => useCurrencyRates());

    await waitFor(() => expect(result.current.rates).toEqual(mockRates));

    expect(mockFetchRates).not.toHaveBeenCalled();
  });

  it("fetches new rates if cache is expired", async () => {
    const now = new Date().getTime();
    const cachedData = {
      rates: mockRates,
      timestamp: new Date(now - 11 * 60 * 1000).toISOString(), // 11 minutes ago (expired)
    };

    mockUseLocalStorage.mockReturnValue([cachedData, vi.fn()]);

    mockFetchRates.mockResolvedValueOnce({ rates: mockRates, timestamp: new Date().toISOString() });

    renderHook(() => useCurrencyRates());

    await waitFor(() => expect(mockFetchRates).toHaveBeenCalledTimes(1));
  });

  it("refresh ignores cache and fetches new rates", async () => {
    const now = new Date().getTime();
    const cachedData = {
      rates: mockRates,
      timestamp: new Date(now - 1000).toISOString(), // Valid cache
    };

    mockUseLocalStorage.mockReturnValue([cachedData, vi.fn()]);

    mockFetchRates.mockResolvedValueOnce({ rates: mockRates, timestamp: new Date().toISOString() });

    const { result } = renderHook(() => useCurrencyRates());

    // Should use cache initially
    await waitFor(() => expect(result.current.rates).toEqual(mockRates));
    expect(mockFetchRates).not.toHaveBeenCalled();

    // Manually refresh
    await result.current.refresh();

    await waitFor(() => expect(mockFetchRates).toHaveBeenCalledTimes(1));
  });

  it("handles errors from the rates service", async () => {
    mockUseLocalStorage.mockReturnValue([null, vi.fn()]);
    mockFetchRates.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useCurrencyRates());

    await waitFor(() => expect(result.current.error).toBe("Network error"));

    expect(result.current.loading).toBe(false);
    expect(result.current.currencies).toEqual([]);
    expect(result.current.convert(1, "USD", "EUR")).toBeNull();
  });
});
