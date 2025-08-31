import { use, useMemo, type ReactNode } from 'react';
import Co2DataContext from './data-context';
import { fetchCo2Data } from '@/utils/fetch-data';

const co2DataPromise = fetchCo2Data();

const Co2DataProvider = ({ children }: { children: ReactNode }) => {
  const co2Data = use(co2DataPromise);
  const value = useMemo(() => co2Data, [co2Data]);
  // const value = co2Data;

  return value ? (
    <Co2DataContext value={value}>{children}</Co2DataContext>
  ) : (
    <h1>Data unavailable</h1>
  );
};

export default Co2DataProvider;
