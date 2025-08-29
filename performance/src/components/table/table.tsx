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

  const defaultColumns = 2; // columns: country, year
  const columnsCount = defaultColumns + extraKeys.length;

  return (
    <div
      className="grid overflow-auto w-full p-2"
      style={{ gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))` }}
    >
      {/* <div className="heading">{}</div> */}
      {rowsKeys.map((c, index) => (
        <TableRow
          key={`${c}${index}`}
          country={c}
          year={year}
          countryData={countriesFilter[c]}
          extraKeys={extraKeys}
        />
      ))}
    </div>
  );
};

export default Table;
