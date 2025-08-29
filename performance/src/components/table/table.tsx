import type { CountryData, RawCountries, YearData } from '@/types/types';
import { useContext, useState, type FC } from 'react';
import Co2DataContext from '../context/data-context';
import TableRow from './table-row';
import TableHeader from './table-header';
import { createPortal } from 'react-dom';
import Modal from '../modal/modal';
import ColumnsPicker from '../columns-picker/columns-picker';

type TableProps = {
  country: keyof RawCountries | undefined;
  year: number;
};

const Table: FC<TableProps> = ({ country, year }) => {
  const co2Data = useContext(Co2DataContext);
  const [showModal, setShowModal] = useState(false);
  const [extraColumns, setExtraColumns] = useState<(keyof YearData)[]>([]);

  const countriesFilter = country
    ? { [country]: co2Data[country] as CountryData }
    : co2Data;

  const rowsKeys = Object.keys(countriesFilter);

  const defaultColumns = 2; // columns: country, year
  const columnsCount = defaultColumns + extraColumns.length;

  const onOptionsClick = () => setShowModal(true);

  return (
    <main className="relative overflow-auto">
      {showModal &&
        createPortal(
          <Modal setShowModal={setShowModal}>
            <ColumnsPicker
              extraColumns={extraColumns}
              setExtraColumns={setExtraColumns}
              setShowModal={setShowModal}
            />
          </Modal>,
          document.body
        )}
      <button
        onClick={onOptionsClick}
        className="absolute top-2 right-5 p-2 rounded-md bg-gray-300 dark:bg-gray-800 cursor-pointer"
      >
        Options
      </button>
      <div
        className="grid  w-full p-2"
        style={{
          gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`,
        }}
      >
        <TableHeader extraColumns={extraColumns} />
        {rowsKeys.map((c, index) => (
          <TableRow
            key={`${c}${index}`}
            country={c}
            year={year}
            countryData={countriesFilter[c]}
            extraColumns={extraColumns}
          />
        ))}
      </div>
    </main>
  );
};

export default Table;
