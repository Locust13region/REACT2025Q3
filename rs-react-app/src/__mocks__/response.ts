import { http, HttpResponse } from 'msw';
import mockBooksList from './books-list';
import mockEmptyBooksList from './empty-books-list';

export const handlers = [
  http.get('https://gutendex.com/books', ({ request }) => {
    console.log(request.url);
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const bookId = url.searchParams.get('ids');
    console.log('bookId', bookId);
    if (page === '0') return HttpResponse.json(mockEmptyBooksList);
    if (bookId === '0') return HttpResponse.json(mockEmptyBooksList);
    return HttpResponse.json(mockBooksList);
  }),
];
