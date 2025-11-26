import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { useTimer } from "../useTimer";

describe("useTimer", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2024-01-01T12:00:00Z'));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("returns current timestamp on mount", () => {
        const { result } = renderHook(() => useTimer());

        expect(typeof result.current).toBe("number");
        expect(result.current).toBeGreaterThan(0);
    });

    it("updates timestamp every minute by default", () => {
        const { result } = renderHook(() => useTimer());

        const initialTime = result.current;

        // Advance time by 1 minute and run pending timers
        act(() => {
            vi.advanceTimersByTime(60000);
        });

        expect(result.current).toBeGreaterThan(initialTime);
    });

    it("updates timestamp at custom interval", () => {
        const customInterval = 5000; // 5 seconds
        const { result } = renderHook(() => useTimer(customInterval));

        const initialTime = result.current;

        // Advance time by 5 seconds and run pending timers
        act(() => {
            vi.advanceTimersByTime(customInterval);
        });

        expect(result.current).toBeGreaterThan(initialTime);
    });

    it("does not update before interval elapses", () => {
        const { result } = renderHook(() => useTimer(60000));

        const initialTime = result.current;

        // Advance time by 30 seconds (less than interval)
        act(() => {
            vi.advanceTimersByTime(30000);
        });

        expect(result.current).toBe(initialTime);
    });

    it("cleans up timer on unmount", () => {
        const { unmount } = renderHook(() => useTimer());

        const clearIntervalSpy = vi.spyOn(globalThis, "clearInterval");

        unmount();

        expect(clearIntervalSpy).toHaveBeenCalled();
    });

    it("updates multiple times", () => {
        const { result } = renderHook(() => useTimer(10000));

        const times: number[] = [result.current];

        // Advance and capture 3 updates
        act(() => {
            vi.advanceTimersByTime(10000);
        });
        times.push(result.current);

        act(() => {
            vi.advanceTimersByTime(10000);
        });
        times.push(result.current);

        act(() => {
            vi.advanceTimersByTime(10000);
        });
        times.push(result.current);

        // All timestamps should be different and increasing
        expect(times[0]).toBeLessThan(times[1]);
        expect(times[1]).toBeLessThan(times[2]);
        expect(times[2]).toBeLessThan(times[3]);
    });
});
