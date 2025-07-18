import { useCallback, useState } from "react";

export function useToggleArray<T>(initial: T[] = []) {
  const [items, setItems] = useState<T[]>(initial);
  const toggle = useCallback((item: T) => {
    setItems((arr) =>
      arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]
    );
  }, []);
  return { items, toggle, setItems };
}
