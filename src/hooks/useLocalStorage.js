import { useState, useEffect } from "react";

/**
 * Custom hook for localStorage with state synchronization
 * Automatically syncs state with localStorage and handles JSON parsing/stringifying
 *
 * @param {string} key - The localStorage key
 * @param {*} initialValue - The initial value if no stored value exists
 * @returns {[*, Function]} - Returns [storedValue, setValue] tuple like useState
 */
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value) => {
    // Use functional form of setState to avoid race conditions
    setStoredValue((prev) => {
      // Allow value to be a function so we have same API as useState
      const newValue = typeof value === "function" ? value(prev) : value;

      // Save to local storage
      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(newValue));
        }
      } catch (error) {
        // If localStorage fails, still update state but log the error
        console.error(`Error setting localStorage key "${key}":`, error);
      }

      return newValue;
    });
  };

  // Listen for changes to this key in other tabs/windows
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleStorageChange = (e) => {
      if (e.key === key) {
        if (e.newValue === null) {
          // Handle deletion: reset to initial value
          setStoredValue(initialValue);
        } else {
          // Handle update: parse and set new value
          try {
            setStoredValue(JSON.parse(e.newValue));
          } catch (error) {
            console.error(`Error parsing storage event for key "${key}":`, error);
          }
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;
