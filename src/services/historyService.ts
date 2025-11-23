
import { apiRequest, handleApiError } from '../utils/apiHelpers';
import type {
  HistoryData,
  HistoryRecord,
  HistoryApiResponse,
} from './types';

/**
 * Delete all calculation history records
 */
export async function deleteHistory(): Promise<void> {
  try {
    await apiRequest<void>('/api/history', {
      method: 'DELETE',
    });
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

/**
 * Post a new calculation to the history
 */
export async function postHistory(historyData: HistoryData): Promise<HistoryRecord> {
  try {
    const response = await apiRequest<HistoryRecord>('/api/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operation: historyData.operation,
        result: historyData.result,
        timestamp: historyData.timestamp || new Date().toISOString(),
      }),
    });

    return response;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

/**
 * Fetch all calculation history records
 */
export async function getHistory(): Promise<HistoryRecord[]> {
  try {
    const response = await apiRequest<HistoryApiResponse | HistoryRecord[]>('/api/history');

    // Mirage returns { records: [...] }, extract the records array
    // If records exists, return it. If response is an array, return it. Otherwise return empty array.
    if (response && typeof response === 'object' && 'records' in response) {
      return response.records || [];
    }
    return Array.isArray(response) ? response : [];
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}
