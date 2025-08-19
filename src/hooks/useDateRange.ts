import { useMemo } from "react";

export function useDateRange({ start = new Date(), monthsAhead = 1 } = {}) {
  const today = useMemo(() => {
    const d = new Date(start);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [start]);

  const endDate = useMemo(() => {
    const tryEnd = new Date(
      today.getFullYear(),
      today.getMonth() + monthsAhead,
      today.getDate()
    );
    const expectedMonth = (today.getMonth() + monthsAhead) % 12;
    if (tryEnd.getMonth() !== expectedMonth) {
      return new Date(
        today.getFullYear(),
        today.getMonth() + monthsAhead + 1,
        0
      );
    }
    return tryEnd;
  }, [today, monthsAhead]);

  const dateRange = useMemo(() => {
    const dates: Date[] = [];
    const cur = new Date(today);
    while (cur <= endDate) {
      dates.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return dates;
  }, [today, endDate]);

  const monthCells = useMemo(() => {
    const cells: (Date | null)[] = [];
    if (dateRange.length === 0) return cells;
    const first = dateRange[0];
    const offset = (first.getDay() + 6) % 7;
    for (let i = 0; i < offset; i++) cells.push(null);
    for (const d of dateRange) cells.push(d);
    const remainder = cells.length % 7;
    if (remainder !== 0) {
      for (let i = 0; i < 7 - remainder; i++) cells.push(null);
    }
    return cells;
  }, [dateRange]);

  return { today, endDate, dateRange, monthCells };
}
