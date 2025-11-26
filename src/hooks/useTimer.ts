import { useEffect, useState } from "react";

/**
 * Hook that triggers a re-render every specified interval
 * Useful for updating relative time displays ("2 min ago", etc.)
 * 
 * @param intervalMs Interval in milliseconds (default: 60000 = 1 minute)
 * @returns Current timestamp, updates every interval
 */
export function useTimer(intervalMs: number = 60000): number {
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(Date.now());
        }, intervalMs);

        return () => clearInterval(timer);
    }, [intervalMs]);

    return now;
}

export default useTimer;
