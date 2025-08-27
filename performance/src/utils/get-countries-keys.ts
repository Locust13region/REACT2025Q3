import type { RawCountries } from '@/types/types';

export default function getCountriesKeys(data: RawCountries) {
  return Object.keys(data) as (keyof typeof data)[];
}
