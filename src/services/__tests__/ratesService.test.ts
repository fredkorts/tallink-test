import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fetchRates } from '../ratesService';
import type { RatesResponse } from '../types';
import * as apiHelpers from '../../utils/apiHelpers';

// Mock the apiHelpers module
vi.mock('../../utils/apiHelpers', () => ({
  apiRequest: vi.fn(),
  handleApiError: vi.fn((error: unknown) => {
    if (error instanceof Error) {
      return error.message || 'An error occurred';
    }
    return 'An error occurred';
  }),
}));

describe('ratesService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchRates', () => {
    it('fetches rates successfully', async () => {
      const mockRatesResponse: RatesResponse = {
        timestamp: '2025-11-22T19:00:00.000Z',
        rates: {
          USD: { EUR: 0.94, AUD: 1.56, CAD: 1.38, JPY: 154.525 },
          EUR: { USD: 1.07, AUD: 1.66, CAD: 1.47, JPY: 164.132 },
          AUD: { EUR: 0.61, USD: 0.64, CAD: 0.89, JPY: 99.0964 },
          CAD: { EUR: 0.68, USD: 0.72, AUD: 1.13, JPY: 111.885 },
          JPY: { EUR: 0.00609, USD: 0.00647, AUD: 0.01009, CAD: 0.00894 },
        },
      };

      vi.mocked(apiHelpers.apiRequest).mockResolvedValue(mockRatesResponse);

      const result = await fetchRates();

      expect(apiHelpers.apiRequest).toHaveBeenCalledWith('/api/rates');
      expect(result).toEqual(mockRatesResponse);
      expect(result.rates).toBeDefined();
      expect(result.timestamp).toBeDefined();
    });

    it('returns rates with correct structure', async () => {
      const mockRatesResponse: RatesResponse = {
        timestamp: '2025-11-22T19:00:00.000Z',
        rates: {
          USD: { EUR: 0.94 },
          EUR: { USD: 1.07 },
        },
      };

      vi.mocked(apiHelpers.apiRequest).mockResolvedValue(mockRatesResponse);

      const result = await fetchRates();

      expect(result).toHaveProperty('rates');
      expect(result).toHaveProperty('timestamp');
      expect(typeof result.timestamp).toBe('string');
      expect(typeof result.rates).toBe('object');
    });

    it('validates rates response format', async () => {
      // Missing rates property
      const invalidResponse = {
        timestamp: '2025-11-22T19:00:00.000Z',
      };

      vi.mocked(apiHelpers.apiRequest).mockResolvedValue(invalidResponse);

      await expect(fetchRates()).rejects.toThrow('Invalid rates response format');
    });

    it('validates timestamp in response', async () => {
      // Missing timestamp property
      const invalidResponse = {
        rates: {
          USD: { EUR: 0.94 },
        },
      };

      vi.mocked(apiHelpers.apiRequest).mockResolvedValue(invalidResponse);

      await expect(fetchRates()).rejects.toThrow('Invalid rates response format');
    });

    it('handles empty rates object', async () => {
      const mockRatesResponse: RatesResponse = {
        timestamp: '2025-11-22T19:00:00.000Z',
        rates: {},
      };

      vi.mocked(apiHelpers.apiRequest).mockResolvedValue(mockRatesResponse);

      const result = await fetchRates();

      expect(result.rates).toEqual({});
      expect(result.timestamp).toBeDefined();
    });

    it('handles API errors', async () => {
      const mockError = new Error('Network error');
      vi.mocked(apiHelpers.apiRequest).mockRejectedValue(mockError);
      vi.mocked(apiHelpers.handleApiError).mockReturnValue('Network error');

      await expect(fetchRates()).rejects.toThrow('Network error');

      expect(apiHelpers.handleApiError).toHaveBeenCalledWith(mockError);
    });

    it('handles server errors', async () => {
      const mockError = new Error('Internal Server Error');
      vi.mocked(apiHelpers.apiRequest).mockRejectedValue(mockError);
      vi.mocked(apiHelpers.handleApiError).mockReturnValue('Internal Server Error');

      await expect(fetchRates()).rejects.toThrow('Internal Server Error');
    });

    it('handles timeout errors', async () => {
      const mockError = new Error('Request timeout');
      vi.mocked(apiHelpers.apiRequest).mockRejectedValue(mockError);
      vi.mocked(apiHelpers.handleApiError).mockReturnValue('Request timeout');

      await expect(fetchRates()).rejects.toThrow('Request timeout');
    });
  });
});
