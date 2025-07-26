import { responseSchema } from '@/types/zod-schemas';

export default async function dataFetch(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData: unknown = await response.json();
    const parsedResponseData = responseSchema.safeParse(responseData);

    if (!parsedResponseData.success) {
      throw new Error(`Incorrect server response.`);
    }

    if (parsedResponseData.data.results.length === 0) {
      throw new Error(`Book(s) not found!`);
    }

    console.log(parsedResponseData.data);
    return parsedResponseData.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Fetch error occurred.');
    }
  }
}
