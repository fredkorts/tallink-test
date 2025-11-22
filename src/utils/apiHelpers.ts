/**
 * Generic API request helper with error handling
 */
export async function apiRequest<T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

/**
 * Handle API errors and return user-friendly message
 */
export function handleApiError(error: unknown): string {
  const errorMessage = error instanceof Error ? error.message : String(error);

  if (errorMessage.includes("fetch")) {
    return "Unable to connect to server. Please check your connection.";
  }

  if (errorMessage.includes("404")) {
    return "Resource not found.";
  }

  if (errorMessage.includes("500")) {
    return "Server error. Please try again later.";
  }

  return "An unexpected error occurred. Please try again.";
}

/**
 * Retry a failed API request
 */
export async function retryRequest<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }

    // Type-safe error checking
    const errorWithResponse = error as { response?: { status: number } };

    // Check if error is retryable
    const isRetryable =
      // Network errors or timeouts (no response)
      !errorWithResponse.response ||
      // Server errors (5xx) or rate limiting (429)
      (errorWithResponse.response &&
        (errorWithResponse.response.status >= 500 ||
          errorWithResponse.response.status === 429));

    // If not retryable (4xx except 429), throw immediately
    if (!isRetryable) {
      throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, delay));
    return retryRequest(fn, retries - 1, delay);
  }
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  const errorMessage = error instanceof Error ? error.message : String(error);

  return (
    errorMessage.includes("fetch") ||
    errorMessage.includes("network") ||
    errorMessage.includes("NetworkError")
  );
}
