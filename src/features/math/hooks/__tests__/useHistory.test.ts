import { renderHook, act } from '@testing-library/react';
import useHistory from '../useHistory';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('useHistory', () => {
  beforeEach(() => {
    window.localStorage.clear();
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        headers: {
          get: () => "application/json",
        },
        json: () => Promise.resolve({}),
      })
    ) as unknown as typeof fetch;
  });

  it('initializes with empty history', () => {
    const { result } = renderHook(() => useHistory());
    expect(result.current.history).toEqual([]);
  });

  it('adds a history entry and persists to localStorage', () => {
    const { result } = renderHook(() => useHistory());
    act(() => {
      result.current.addHistoryEntry('2+3=5');
    });
    expect(result.current.history).toContain('2+3=5');
    expect(JSON.parse(window.localStorage.getItem('calc_history')!)).toContain('2+3=5');
  });

  it('clears history and localStorage', () => {
    const { result } = renderHook(() => useHistory());
    act(() => {
      result.current.addHistoryEntry('2+3=5');
      result.current.clearHistory();
    });
    expect(result.current.history).toEqual([]);
    expect(window.localStorage.getItem('calc_history')).toBeNull();
  });
});
