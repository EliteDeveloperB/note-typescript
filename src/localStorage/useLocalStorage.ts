import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialvalue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonVlue = localStorage.getItem(key);
    if (jsonVlue !== null && jsonVlue !== "undefind") {
      return JSON.parse(jsonVlue);
    } else {
      if (typeof initialvalue == "function") {
        return (initialvalue as () => T)();
      } else {
        return initialvalue;
      }
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [T, typeof setValue];
}
