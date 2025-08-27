// db.ts
import { openDB } from 'idb';

export interface YearData {
  year: number;
  population?: number;
  // ... остальные поля
}

export interface CountryData {
  iso_code?: string;
  data: YearData[];
}

const DB_NAME = 'co2-db';
const STORE_NAME = 'countries';

export async function getDb() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function saveCountry(key: string, data: CountryData) {
  const db = await getDb();
  await db.put(STORE_NAME, data, key);
}

export async function getCountry(
  key: string
): Promise<CountryData | undefined> {
  const db = await getDb();
  return db.get(STORE_NAME, key);
}

export async function getAllCountriesKeys(): Promise<string[]> {
  const db = await getDb();
  return db.getAllKeys(STORE_NAME) as string[];
}
