import type { CountryData, RawCountries, YearData } from '@/types/types';
import type { FC } from 'react';
import Cell from '../cell/cell.';

type TableRowProps<K extends keyof YearData = keyof YearData> = {
  country: keyof RawCountries;
  year: number;
  countryData: CountryData;
  extraKeys: K[];
};

const TableRow: FC<TableRowProps> = ({
  country,
  countryData,
  extraKeys,
  year,
}) => {
  const currentYearData = getYearData(countryData, year);

  return (
    <div className="flex gap-3 px-4">
      <Cell data={country} />
      <Cell data={countryData.iso_code} />
      {extraKeys.map((k) => (
        <Cell key={`${country}${year}${k}`} data={currentYearData[k]} />
      ))}
    </div>
  );
};

export default TableRow;

function getYearData(countryData: CountryData, year: number) {
  return countryData.data.find(
    (yearData) => yearData.year === year
  ) as YearData;
}
