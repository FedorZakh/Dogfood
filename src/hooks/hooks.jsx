import { useEffect, useState } from "react";

export const useDebounce = (path) => {
  const [debounceValue, setDebounceValue] = useState(path);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(path);
    }, 400);

    return () => clearTimeout(timeout);
  }, [path]);

  return debounceValue;
};
