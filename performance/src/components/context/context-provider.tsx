import { use, type ReactNode } from 'react';
import Co2DataContext from './data-context';
import { fetchCo2Data } from '@/utils/fetch-data';

const co2DataPromise = fetchCo2Data();

const Co2DataProvider = ({ children }: { children: ReactNode }) => {
  const co2Data = use(co2DataPromise);

  return co2Data ? (
    <Co2DataContext value={co2Data}>{children}</Co2DataContext>
  ) : (
    <h1>Data unavailable</h1>
  );
};

export default Co2DataProvider;
