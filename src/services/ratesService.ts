import { apiRequest, handleApiError } from '../utils/apiHelpers';
import type { RatesResponse } from './types';

/**
 * Fetch currency exchange rates
 * 
 * @example
 * const { rates, timestamp } = await fetchRates();
 * // rates = { USD: { EUR: 0.94, ... }, EUR: { USD: 1.07, ... }, ... }
 * // timestamp = "2025-11-22T19:00:00.000Z"
 */
export async function fetchRates(): Promise<RatesResponse> {
  try {
    const response = await apiRequest<RatesResponse>('/api/rates');

    // Ensure we have both rates and timestamp
    if (!response.rates || !response.timestamp) {
      throw new Error('Invalid rates response format');
    }

    return {
      rates: response.rates,
      timestamp: response.timestamp,
    };
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}
