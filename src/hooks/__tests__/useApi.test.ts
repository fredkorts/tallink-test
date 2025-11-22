import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useApi from "../useApi";
import type { ApiOptions } from "../useApi";
import * as apiHelpers from "../../utils/apiHelpers";

// Mock the apiHelpers module
vi.mock("../../utils/apiHelpers", () => ({
  apiRequest: vi.fn(),
  handleApiError: vi.fn((error: unknown) => {
    if (error instanceof Error) {
      return error.message || "An error occurred";
    }
    return "An error occurred";
  }),
  retryRequest: vi.fn(<T,>(fn: () => Promise<T>) => fn()),
}));

interface MockData {
  id: number;
  name: string;
}

describe("useApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with correct default state", () => {
    const { result } = renderHook(() => useApi());

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.execute).toBe("function");
    expect(typeof result.current.reset).toBe("function");
  });

  it("sets loading to true when executing request", async () => {
    vi.mocked(apiHelpers.apiRequest).mockImplementation(() => new Promise(() => {})); // Never resolves

    const { result } = renderHook(() => useApi());

    void result.current.execute("/api/test");

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });
  });

  it("sets data and loading false on successful request", async () => {
    const mockData: MockData = { id: 1, name: "Test" };
    vi.mocked(apiHelpers.apiRequest).mockResolvedValue(mockData);

    const { result } = renderHook(() => useApi<MockData>());

    await result.current.execute("/api/test");

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it("sets error and loading false on failed request", async () => {
    const mockError = new Error("Network error");
    vi.mocked(apiHelpers.apiRequest).mockRejectedValue(mockError);
    vi.mocked(apiHelpers.handleApiError).mockReturnValue("Network error");

    const { result } = renderHook(() => useApi());

    try {
      await result.current.execute("/api/test");
    } catch {
      // Expected to throw
    }

    await waitFor(() => {
      expect(result.current.error).toBe("Network error");
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeNull();
    });
  });

  it("executes immediately when immediate is true", async () => {
    const mockData: MockData = { id: 1, name: "Test" };
    vi.mocked(apiHelpers.apiRequest).mockResolvedValue(mockData);

    const { result } = renderHook(() => useApi<MockData>("/api/test", {}, true));

    // Wait for initial loading to start
    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
      expect(result.current.loading).toBe(false);
    });
  });

  it("does not execute immediately when immediate is false", () => {
    vi.mocked(apiHelpers.apiRequest).mockResolvedValue({ id: 1 });

    const { result } = renderHook(() => useApi("/api/test", {}, false));

    expect(result.current.data).toBeNull();
    expect(apiHelpers.apiRequest).not.toHaveBeenCalled();
  });

  it("can execute with custom URL and options", async () => {
    const mockData: MockData = { id: 2, name: "Custom" };
    vi.mocked(apiHelpers.apiRequest).mockResolvedValue(mockData);

    const { result } = renderHook(() => useApi<MockData>());
    const customOptions: ApiOptions = { 
      method: "POST", 
      body: JSON.stringify({ test: "data" }) 
    };

    await result.current.execute("/api/custom", customOptions);

    await waitFor(() => {
      expect(apiHelpers.apiRequest).toHaveBeenCalledWith(
        "/api/custom",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ test: "data" }),
          signal: expect.any(AbortSignal),
        })
      );
      expect(result.current.data).toEqual(mockData);
    });
  });

  it("reset clears all state", async () => {
    const mockData: MockData = { id: 1, name: "Test" };
    vi.mocked(apiHelpers.apiRequest).mockResolvedValue(mockData);

    const { result } = renderHook(() => useApi<MockData>());

    await result.current.execute("/api/test");

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });

    await waitFor(() => {
      result.current.reset();
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("handles missing URL gracefully", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => useApi());

    // Call execute directly, outside of waitFor
    await result.current.execute();

    // Use waitFor to poll for the state changes
    await waitFor(() => {
      expect(result.current.error).toBe("No URL provided");
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith("useApi: No URL provided");

    consoleErrorSpy.mockRestore();
  });

  it("uses retryRequest for failed requests", async () => {
    const mockData: MockData = { id: 1, name: "Test" };
    // Mock retryRequest to call the function it receives
    vi.mocked(apiHelpers.retryRequest).mockImplementation(<T,>(fn: () => Promise<T>) => fn());
    // Mock apiRequest to return the data
    vi.mocked(apiHelpers.apiRequest).mockResolvedValue(mockData);

    const { result } = renderHook(() => useApi<MockData>());

    await result.current.execute("/api/test");

    await waitFor(() => {
      expect(apiHelpers.retryRequest).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Number),
        expect.any(Number)
      );
      expect(result.current.data).toEqual(mockData);
    });
  });
});
