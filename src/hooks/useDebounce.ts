import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number = 300) {
  const [debounce, setdebounce] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setdebounce(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounce;
}
