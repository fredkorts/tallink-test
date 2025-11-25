/**
 * Formats a timestamp as a human-readable "time ago" string
 * @param timestamp ISO timestamp string or null
 * @returns Formatted string like "2 min ago", "1 hour ago", etc.
 */
export function formatTimeAgo(timestamp: string | null): string {
    if (!timestamp) {
        return "";
    }

    try {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffSeconds < 60) {
            return "just now";
        } else if (diffMinutes < 60) {
            return `${diffMinutes} min ago`;
        } else if (diffHours < 24) {
            return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
        } else {
            return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
        }
    } catch (error) {
        console.error("Error parsing timestamp:", error);
        return "";
    }
}
