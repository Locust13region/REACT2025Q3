import type { YearData } from '@/types/types';
import type { Dispatch, FC, SetStateAction } from 'react';

type SelectYearProps = {
  year: YearData['year'];
  setYear: Dispatch<SetStateAction<YearData['year']>>;
};

const SelectYear: FC<SelectYearProps> = ({ year, setYear }) => {
  return (
    <div>
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="rounded-md pl-3 p-2 bg-gray-300 dark:bg-gray-800 cursor-pointer"
      />
    </div>
  );
};

export default SelectYear;
