export function formatDateTime(dateTime: string) {
    
    const date = new Date(dateTime);

    return {

        date: date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }),

        time: date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }),
    };
}