import { responseSchema } from '@/types/zod-schemas';
import { baseUrl } from './api-base-url';

export default async function dataFetch(searchSubstring: string = '') {
  try {
    const response = await fetch(baseUrl + '?search=' + searchSubstring);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData: unknown = await response.json();
    const parsedResponseData = responseSchema.safeParse(responseData);

    if (!parsedResponseData.success) {
      throw new Error(`Incorrect server response!`);
    }

    if (parsedResponseData.data.results.length === 0) {
      throw new Error(`Item(s) not found!`);
    }

    const mappedResponse = parsedResponseData.data.results.map((item) => ({
      id: item.id,
      author: item.authors[0].name,
      title: item.title,
    }));
    console.log(mappedResponse);
    return mappedResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Fetch error occurred.');
    }
  }
}
