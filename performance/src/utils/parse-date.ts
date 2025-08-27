import { countriesDataSchema } from '@/types/types';

export default function parseData(data: unknown) {
  const result = countriesDataSchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.message);
  } else {
    return result.data;
  }
}
