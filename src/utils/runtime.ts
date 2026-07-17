// ======================================================================
// Runtime Utilities
// ======================================================================

export function formatRuntime(
    startedAt?: string | null,
    completedAt?: string | null,
): string {

    if (!startedAt) {
        return "--";
    }

    const start = new Date(startedAt).getTime();

    const end = completedAt
        ? new Date(completedAt).getTime()
        : Date.now();

    let seconds = Math.max(
        0,
        Math.floor((end - start) / 1000),
    );

    const days = Math.floor(seconds / 86400);
    seconds %= 86400;

    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;

    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    if (days > 0) {

        return `${days}d ${hours}h ${minutes}m`;

    }

    if (hours > 0) {

        return `${hours}h ${minutes}m ${seconds}s`;

    }

    return `${minutes}m ${seconds}s`;

}