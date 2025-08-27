import { useEffect, useState } from 'react';
import { saveCountry, getAllCountriesKeys } from '@/db/db';
import { countrySchema } from '@/types/types';

export function useCo2Data() {
  const [keys, setKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const storedKeys = await getAllCountriesKeys();
      if (storedKeys.length > 0) {
        setKeys(storedKeys);
        setLoading(false);
        return;
      }

      const response = await fetch('./owid-co2-data.json');
      const json = await response.json();

      for (const [countryKey, rawCountry] of Object.entries(json)) {
        const parsed = countrySchema.safeParse(rawCountry);
        if (parsed.success) {
          await saveCountry(countryKey, parsed.data);
        }
      }

      const newKeys = await getAllCountriesKeys();
      setKeys(newKeys);
      setLoading(false);
    })();
  }, []);

  return { keys, loading };
}
