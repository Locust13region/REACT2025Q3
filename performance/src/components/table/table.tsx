import type { CountryData, RawCountries, YearData } from '@/types/types';
import { useContext, type FC } from 'react';
import Co2DataContext from '../context/data-context';
import TableRow from './table-row';

type TableProps<K extends keyof YearData = keyof YearData> = {
  country: keyof RawCountries | undefined;
  year: number;
  extraKeys: K[];
};

const Table: FC<TableProps> = ({ country, year, extraKeys }) => {
  const co2Data = useContext(Co2DataContext);

  const countriesFilter = country
    ? { [country]: co2Data[country] as CountryData }
    : co2Data;

  const rowsKeys = Object.keys(countriesFilter);

  return (
    <div className="flex flex-col">
      <div className="heading">{}</div>
      <div className="flex flex-col">
        {rowsKeys.map((cntry, index) => (
          <TableRow
            key={`${cntry}${index}`}
            country={cntry}
            year={year}
            countryData={countriesFilter[cntry]}
            extraKeys={extraKeys}
          />
        ))}
      </div>
    </div>
  );
};

export default Table;
