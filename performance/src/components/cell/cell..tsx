import dataFormat from '@/utils/data-format';
import { memo, useEffect, useMemo, useState, type FC } from 'react';

type CellProps = {
  data?: number | string;
  sticky?: boolean;
};

const Cell: FC<CellProps> = ({ data, sticky }) => {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    setHighlight(true);

    const highlightDelay = 800;

    const timer = setTimeout(() => setHighlight(false), highlightDelay);
    return () => clearTimeout(timer);
  }, [data]);

  const displayValue = () => {
    if (data == null) return 'N/A';
    if (typeof data === 'number') return dataFormat(data);
    return data;
  };
  // const displayValue = useMemo(() => {
  //   if (data == null) return 'N/A';
  //   if (typeof data === 'number') return dataFormat(data);
  //   return data;
  // }, [data]);

  return (
    <div
      className={`${sticky ? 'sticky top-0  bg-gray-300 dark:bg-gray-950' : ''}  px-3 py-2 border-b-2  border-b-gray-500 ${highlight ? 'bg-gray-700' : ''}`}
    >
      {displayValue()}
    </div>
  );
};

export default Cell;
// export default memo(Cell);
