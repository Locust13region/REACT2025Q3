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
        className=""
      />
    </div>
  );
};

export default SelectYear;
