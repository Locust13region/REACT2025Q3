import type { RawCountries, YearData } from '@/types/types';
import type { FC } from 'react';

type TableProps<K extends keyof YearData = keyof YearData> = {
  country: keyof RawCountries | undefined;
  year: number;
  extraKeys?: K[];
};

const Table: FC<TableProps> = ({ country, year, extraKeys }) => {
  return <div className="table"></div>;
};

export default Table;
