/**
 * Type definitions for service layer
 */

/**
 * Calculation history data to be posted
 */
export interface HistoryData {
  /** The operation string (e.g., "2+3", "10-5") */
  operation: string;
  /** The result of the calculation */
  result: number | string;
  /** Optional ISO timestamp string */
  timestamp?: string;
}

/**
 * Stored history record with ID
 */
export interface HistoryRecord extends HistoryData {
  /** Unique identifier for the history record */
  id: number | string;
  /** ISO timestamp string (always present in stored records) */
  timestamp: string;
}

/**
 * Currency exchange rates structure
 * Maps from currency codes to their exchange rates against other currencies
 */
export interface CurrencyRates {
  [fromCurrency: string]: {
    [toCurrency: string]: number;
  };
}

/**
 * Response from the rates API endpoint
 */
export interface RatesResponse {
  /** Exchange rates data */
  rates: CurrencyRates;
  /** ISO timestamp when rates were fetched */
  timestamp: string;
}

/**
 * Response wrapper from Mirage.js history endpoint
 */
export interface HistoryApiResponse {
  records?: HistoryRecord[];
}
