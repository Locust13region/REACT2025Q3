import type { CountryData, RawCountries, YearData } from '@/types/types';
import type { FC } from 'react';
import Cell from '../cell/cell.';

type TableRowProps<K extends keyof YearData = keyof YearData> = {
  country: keyof RawCountries;
  year: number;
  countryData: CountryData;
  extraKeys: K[];
};

const TableRow: FC<TableRowProps> = ({ country, countryData, extraKeys }) => {
  console.log(country, countryData, extraKeys);
  // const currentYearData = getYearData(countriesFilter, year);

  return (
    <div className="flex">
      <Cell country={country} />
      <Cell countryISO={countryData.iso_code} />
      <Cell country={countryData.data} />
    </div>
  );
};

export default TableRow;
