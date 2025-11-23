import { useCallback, useEffect, useRef, useState } from "react";
import { apiRequest, handleApiError } from "../utils/apiHelpers";



/**
 * Minimal API hook for calculator app
 * @param url - API endpoint (optional, can be provided in execute)
 * @param options - Fetch options (optional)
 * @param immediate - If true, runs on mount
 */
function useApi<T = unknown>(
  url: string | null = null,
  options: RequestInit = {},
  immediate: boolean = false
): {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (url?: string, options?: RequestInit) => Promise<T | undefined>;
  reset: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Only track the latest request for aborting
  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(
    async (executeUrl?: string, executeOptions: RequestInit = {}): Promise<T | undefined> => {
      const finalUrl = executeUrl || url;
      if (!finalUrl) {
        console.error("useApi: No URL provided");
        setError("No URL provided");
        return;
      }
      // Abort previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const abortController = new AbortController();
      abortControllerRef.current = abortController;
      setLoading(true);
      setError(null);
      try {
        const result = await apiRequest<T>(finalUrl, {
          ...options,
          ...executeOptions,
          signal: abortController.signal,
        });
        setData(result);
        setLoading(false);
        return result;
      } catch (err) {
        setError(handleApiError(err));
        setLoading(false);
        throw err;
      }
    },
    [url, options]
  );

  // Reset the hook state
  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  // Cleanup: abort pending requests on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Execute immediately if requested
  useEffect(() => {
    if (immediate && url) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate, url]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}

export default useApi;
