import { useState, useEffect } from 'react';

interface UseLocalStorageProps<T> {
  key: string;
  initialValue: T;
}

function useLocalStorage<T>(params: UseLocalStorageProps<T>) {
  const { key, initialValue } = params;
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const valueInStorage = window.localStorage.getItem(key);
      if (!valueInStorage) {
        return initialValue;
      }
      return JSON.parse(valueInStorage);
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const updatedState = JSON.stringify(storedValue);
      window.localStorage.setItem(key, updatedState);
    } catch (error) {
      console.log(error);
    }
  }, [storedValue, key]);

  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
