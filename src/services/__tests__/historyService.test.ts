import { describe, it, expect, beforeEach, vi } from 'vitest';
import { postHistory, getHistory } from '../historyService';
import type { HistoryData, HistoryRecord, HistoryApiResponse } from '../types';
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

describe('historyService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('postHistory', () => {
    it('posts history data successfully', async () => {
      const mockHistoryData: HistoryData = {
        operation: '2+3',
        result: 5,
        timestamp: '2025-11-22T12:00:00.000Z',
      };

      const mockResponse: HistoryRecord = {
        id: 1,
        ...mockHistoryData,
        timestamp: mockHistoryData.timestamp!,
      };

      vi.mocked(apiHelpers.apiRequest).mockResolvedValue(mockResponse);

      const result = await postHistory(mockHistoryData);

      expect(apiHelpers.apiRequest).toHaveBeenCalledWith('/api/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockHistoryData),
      });

      expect(result).toEqual(mockResponse);
    });

    it('adds timestamp if not provided', async () => {
      const mockHistoryData: HistoryData = {
        operation: '5-2',
        result: 3,
      };

      const mockResponse: HistoryRecord = {
        id: 2,
        operation: '5-2',
        result: 3,
        timestamp: '2025-11-22T12:00:00.000Z',
      };

      vi.mocked(apiHelpers.apiRequest).mockResolvedValue(mockResponse);

      await postHistory(mockHistoryData);

      const callArgs = vi.mocked(apiHelpers.apiRequest).mock.calls[0];
      const body = JSON.parse(callArgs?.[1]?.body as string);

      expect(body.operation).toBe('5-2');
      expect(body.result).toBe(3);
      expect(body.timestamp).toBeDefined();
      expect(typeof body.timestamp).toBe('string');
    });

    it('handles API errors', async () => {
      const mockHistoryData: HistoryData = {
        operation: '10/2',
        result: 5,
      };

      const mockError = new Error('Network error');
      vi.mocked(apiHelpers.apiRequest).mockRejectedValue(mockError);
      vi.mocked(apiHelpers.handleApiError).mockReturnValue('Network error');

      await expect(postHistory(mockHistoryData)).rejects.toThrow('Network error');

      expect(apiHelpers.handleApiError).toHaveBeenCalledWith(mockError);
    });

    it('handles server validation errors', async () => {
      const mockHistoryData: HistoryData = {
        operation: '', // Invalid empty operation
        result: 5,
      };

      const mockError = new Error('Bad Request');
      vi.mocked(apiHelpers.apiRequest).mockRejectedValue(mockError);
      vi.mocked(apiHelpers.handleApiError).mockReturnValue('Bad Request');

      await expect(postHistory(mockHistoryData)).rejects.toThrow('Bad Request');
    });
  });

  describe('getHistory', () => {
    it('fetches history successfully', async () => {
      const mockRecords: HistoryRecord[] = [
        { id: 1, operation: '2+3', result: 5, timestamp: '2025-11-22T12:00:00.000Z' },
        { id: 2, operation: '10-5', result: 5, timestamp: '2025-11-22T12:01:00.000Z' },
        { id: 3, operation: '6*7', result: 42, timestamp: '2025-11-22T12:02:00.000Z' },
      ];

      // Mirage returns { records: [...] }
      const mockResponse: HistoryApiResponse = { records: mockRecords };
      vi.mocked(apiHelpers.apiRequest).mockResolvedValue(mockResponse);

      const result = await getHistory();

      expect(apiHelpers.apiRequest).toHaveBeenCalledWith('/api/history');
      expect(result).toEqual(mockRecords);
    });

    it('handles empty history', async () => {
      const mockResponse: HistoryApiResponse = { records: [] };
      vi.mocked(apiHelpers.apiRequest).mockResolvedValue(mockResponse);

      const result = await getHistory();

      expect(result).toEqual([]);
    });

    it('handles response without records wrapper', async () => {
      const mockRecords: HistoryRecord[] = [
        { id: 1, operation: '2+3', result: 5, timestamp: '2025-11-22T12:00:00.000Z' },
      ];

      // Some APIs might return array directly
      vi.mocked(apiHelpers.apiRequest).mockResolvedValue(mockRecords);

      const result = await getHistory();

      expect(result).toEqual(mockRecords);
    });

    it('handles empty response object', async () => {
      // If response doesn't have records, return empty array
      vi.mocked(apiHelpers.apiRequest).mockResolvedValue({});

      const result = await getHistory();

      expect(result).toEqual([]);
    });

    it('handles API errors', async () => {
      const mockError = new Error('Server error');
      vi.mocked(apiHelpers.apiRequest).mockRejectedValue(mockError);
      vi.mocked(apiHelpers.handleApiError).mockReturnValue('Server error');

      await expect(getHistory()).rejects.toThrow('Server error');

      expect(apiHelpers.handleApiError).toHaveBeenCalledWith(mockError);
    });
  });
});
