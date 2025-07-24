import { useEffect, useState } from 'react';

const storageKey = 'rs-react-app';

export default function useLocalStorage(
  keyValue?: string
): [string, (value: string) => void, () => void] {
  const [storageValue, setStorageValue] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored !== null ? stored : (keyValue ?? '');
  });

  useEffect(() => {
    localStorage.setItem(storageKey, storageValue ?? '');
  }, [storageValue]);

  const clearStorageValue = () => {
    setStorageValue('');
  };

  return [storageValue, setStorageValue, clearStorageValue];
}
