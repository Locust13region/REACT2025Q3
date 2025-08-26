import { co2dataSchema } from '@/types/types';

export default function parseData(data: unknown) {
  const result = co2dataSchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.message);
  } else {
    return result.data;
  }
}
