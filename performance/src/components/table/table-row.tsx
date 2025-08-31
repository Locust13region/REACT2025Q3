import type { CountryData, RawCountries, YearData } from '@/types/types';
import { memo, type FC } from 'react';
import Cell from '../cell/cell.';

type TableRowProps<K extends keyof YearData = keyof YearData> = {
  country: keyof RawCountries;
  year: number;
  countryData: CountryData;
  extraColumns: K[];
};

const TableRow: FC<TableRowProps> = ({
  country,
  countryData,
  extraColumns,
  year,
}) => {
  const currentYearData = countryData.data.find(
    (yearData) => yearData.year === year
  );

  return (
    <>
      <Cell data={country} />
      <Cell data={countryData.iso_code} />
      {extraColumns.map((c, index) => (
        <Cell
          key={`${country}${c}${index}`}
          data={currentYearData ? currentYearData[c] : currentYearData}
        />
      ))}
    </>
  );
};

export default memo(TableRow);
