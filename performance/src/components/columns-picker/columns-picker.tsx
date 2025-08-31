import { yearDataKeys } from '@/service/extra-columns';
import type { YearData } from '@/types/types';
import underlineCaseTransform from '@/utils/underline-case-transform';
import type { Dispatch, FC, SetStateAction } from 'react';

type ExtraColumns = (typeof yearDataKeys)[number];

type ColumnsPickerProps<K extends keyof YearData = keyof YearData> = {
  extraColumns: K[];
  setExtraColumns: Dispatch<SetStateAction<K[]>>;
};

const ColumnsPicker: FC<ColumnsPickerProps> = ({
  extraColumns,
  setExtraColumns,
}) => {
  const toggle = (column: ExtraColumns) => {
    setExtraColumns((prev) =>
      prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev, column]
    );
  };
  return (
    <div className="h-[50vh] p-2 pl-5 rounded-md text-gray-950 dark:text-gray-300 bg-gray-300 dark:bg-gray-800 overflow-auto">
      <fieldset>
        {yearDataKeys.map((key) => (
          <label key={key} className="flex items-center gap-2 accent-blue-400">
            <input
              type="checkbox"
              checked={extraColumns.includes(key)}
              onChange={() => toggle(key)}
            />
            {underlineCaseTransform(key)}
          </label>
        ))}
      </fieldset>
    </div>
  );
};

export default ColumnsPicker;
