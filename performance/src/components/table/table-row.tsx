import type { CountryData, RawCountries, YearData } from '@/types/types';
import type { FC } from 'react';
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
  const currentYearData = getYearData(countryData, year);

  return (
    <>
      <Cell data={country} />
      <Cell data={countryData.iso_code} />
      {extraColumns.map((k) => (
        <Cell key={`${country}${year}${k}`} data={currentYearData[k]} />
      ))}
    </>
  );
};

export default TableRow;

function getYearData(countryData: CountryData, year: number) {
  return countryData.data.find(
    (yearData) => yearData.year === year
  ) as YearData;
}
