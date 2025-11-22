/**
 * Custom error for API responses
 */
export class ApiError extends Error {
  response: { status: number; data?: unknown; message?: string };
  constructor(
    message: string,
    status: number,
    data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
    this.response = { status, data, message };
  }
}
/**
 * Generic API request helper with error handling
 */
export async function apiRequest<T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    // Build headers: merge options.headers first
    const headers = new Headers(options.headers || {});
    const method = (options.method || 'GET').toUpperCase();
    const hasBody = !!options.body && method !== 'GET' && method !== 'HEAD';
    if (!headers.has('Content-Type') && hasBody) {
      headers.set('Content-Type', 'application/json');
    }
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle empty response (204 No Content, Content-Length: 0, or no body)
    if (
      response.status === 204 ||
      response.headers.get('content-length') === '0' ||
      response.headers.get('transfer-encoding') === null && !('body' in response)
    ) {
      if (!response.ok) {
        throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
      }
      return undefined as T;
    }

    const contentType = response.headers.get('content-type') || '';
    let parsed: unknown = undefined;
    if (contentType.includes('application/json')) {
      // Safe to parse as JSON
      try {
        parsed = await response.json();
      } catch (err) {
        parsed = undefined;
      }
    } else {
      // Not JSON: try to get text, parse if possible
      const text = await response.text();
      if (!text || text.trim() === '') {
        parsed = undefined;
      } else {
        try {
          parsed = JSON.parse(text);
        } catch {
          parsed = text;
        }
      }
    }

    if (!response.ok) {
      throw new ApiError(`HTTP error! status: ${response.status}`, response.status, parsed);
    }
    return parsed as T;
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

    // Retry on network errors (no response/status)
    if (isNetworkError(error)) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryRequest(fn, retries - 1, delay);
    }

    // Retry on 5xx or 429, but not on 4xx (except 429)

    let status: number | undefined = undefined;
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      error.response &&
      typeof (error.response as { status?: unknown }).status === 'number'
    ) {
      status = (error.response as { status: number }).status;
    }

    if (status !== undefined && (status >= 500 || status === 429)) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryRequest(fn, retries - 1, delay);
    }

    // Otherwise, do not retry
    throw error;
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
