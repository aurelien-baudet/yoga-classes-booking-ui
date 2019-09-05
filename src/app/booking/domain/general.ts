export type Instant = number;

export interface DateRange {
    start: Instant;
    end: Instant;
}

export const isSameDay = (a: Instant, b: Instant) => {
    const aDate = new Date(a);
    const bDate = new Date(b);
    return aDate.getDate() === bDate.getDate()
        && aDate.getMonth() === bDate.getMonth()
        && aDate.getFullYear() === bDate.getFullYear();
};
export const sameDayPredicate = (a: Instant) => (b: Instant) => isSameDay(a, b);

