export function formatDateTime(dateTime: string) {
    const date = new Date(dateTime);

    return {
        date: date.toISOString().split("T")[0],
        time: date.toISOString().split("T")[1].slice(0, 5),
    };
}