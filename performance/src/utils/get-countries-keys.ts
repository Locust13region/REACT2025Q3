import type { Co2data } from '@/types/types';

export default function getCountriesKeys(data: Co2data) {
  return Object.keys(data) as (keyof typeof data)[];
}
