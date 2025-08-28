import dataFormat from '@/utils/data-format';
import { memo, useEffect, useState, type FC } from 'react';

type CellProps = {
  data?: number | string;
};

const Cell: FC<CellProps> = ({ data }) => {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    setHighlight(true);

    const timer = setTimeout(() => setHighlight(false), 1000);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div className={`cell__data ${highlight ? 'cell__data-highlight' : ''}`}>
      {data ? (typeof data === 'number' ? dataFormat(data) : data) : 'N/A'}
    </div>
  );
};

// export default Cell;
export default memo(Cell);
