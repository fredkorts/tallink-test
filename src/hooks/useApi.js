/* global AbortController */
import { useState, useEffect, useCallback, useRef } from "react";
import { apiRequest, handleApiError, retryRequest } from "../utils/apiHelpers";

/**
 * Custom hook for API requests with loading and error states
 * Provides a clean interface for making API calls with automatic state management
 * Includes request cancellation and race condition prevention
 *
 * @param {string} url - The API endpoint URL (optional, can be provided in execute)
 * @param {Object} options - Fetch options (method, headers, body, etc.)
 * @param {boolean} immediate - Whether to execute the request immediately on mount
 * @returns {Object} - { data, loading, error, execute, reset }
 */
function useApi(url = null, options = {}, immediate = false) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Track current request to prevent race conditions
  const requestIdRef = useRef(0);
  const abortControllerRef = useRef(null);

  // Use ref for options to avoid dependency issues
  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  });

  // Execute the API request
  const execute = useCallback(
    async (executeUrl = url, executeOptions = optionsRef.current) => {
      if (!executeUrl) {
        console.error("useApi: No URL provided");
        setError("No URL provided");
        return;
      }

      // Cancel any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new AbortController for this request
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      // Increment request ID to track this specific request
      const currentRequestId = ++requestIdRef.current;

      setLoading(true);
      setError(null);

      try {
        // Use retryRequest to handle transient failures
        const result = await retryRequest(
          () =>
            apiRequest(executeUrl, {
              ...executeOptions,
              signal: abortController.signal,
            }),
          3, // retries
          1000, // delay
        );

        // Only update state if this is still the latest request
        if (currentRequestId === requestIdRef.current && !abortController.signal.aborted) {
          setData(result);
          setLoading(false);
        }

        return result;
      } catch (err) {
        // Don't update state if request was aborted or if a newer request exists
        if (currentRequestId === requestIdRef.current && !abortController.signal.aborted) {
          const errorMessage = handleApiError(err);
          setError(errorMessage);
          setLoading(false);
        }
        throw err;
      }
    },
    [url],
  );

  // Reset the hook state
  const reset = useCallback(() => {
    // Cancel any pending request
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
    const runRequest = async () => {
      if (immediate && url) {
        try {
          await execute();
        } catch {
          // Error is already handled in execute function
        }
      }
    };

    runRequest();
    // Note: execute is included in dependencies. Since execute is memoized with useCallback
    // and depends on url/options, the effect will re-run when url or options change.
    // Cleanup is handled by the separate unmount effect and within execute() itself
    // through requestId tracking and AbortController.
  }, [immediate, url, execute]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}

export default useApi;
