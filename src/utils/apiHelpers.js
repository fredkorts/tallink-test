/**
 * Generic API request helper with error handling
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} Response data
 * @throws {Error} If request fails
 */
export async function apiRequest(url, options = {}) {
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
    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

/**
 * Handle API errors and return user-friendly message
 * @param {Error} error - The error object
 * @returns {string} User-friendly error message
 */
export function handleApiError(error) {
  if (error.message.includes("fetch")) {
    return "Unable to connect to server. Please check your connection.";
  }

  if (error.message.includes("404")) {
    return "Resource not found.";
  }

  if (error.message.includes("500")) {
    return "Server error. Please try again later.";
  }

  return "An unexpected error occurred. Please try again.";
}

/**
 * Retry a failed API request
 * @param {Function} fn - The function to retry
 * @param {number} retries - Number of retry attempts
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise<any>} Result of the function
 */
export async function retryRequest(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }

    // Check if error is retryable
    const isRetryable =
      // Network errors or timeouts (no response)
      !error.response ||
      // Server errors (5xx) or rate limiting (429)
      (error.response && (error.response.status >= 500 || error.response.status === 429));

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
 * @param {Error} error - The error object
 * @returns {boolean} True if network error
 */
export function isNetworkError(error) {
  return (
    error.message.includes("fetch") ||
    error.message.includes("network") ||
    error.message.includes("NetworkError")
  );
}
