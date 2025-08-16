'use server';

import type { BookType } from '../types/types';

export default async function csvBuilder(data: BookType[]) {
  const csvRows = [];

  const headers = Object.keys(data[0]) as (keyof BookType)[];

  csvRows.push(headers.join(','));

  for (const row of data) {
    const values = headers.map((header) => {
      if (Array.isArray(row[header]) && typeof row[header][0] === 'object') {
        return `"${row[header][0].name}"`;
      } else {
        return `"${row[header]}"`;
      }
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
}
