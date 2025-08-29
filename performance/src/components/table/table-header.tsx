import type { YearData } from '@/types/types';
import { memo, type FC } from 'react';
import Cell from '../cell/cell.';

type TableHeaderProps<K extends keyof YearData = keyof YearData> = {
  extraColumns: K[];
};

const TableHeader: FC<TableHeaderProps> = ({ extraColumns }) => {
  return (
    <>
      <Cell data={'Country'} />
      <Cell data={'ISO'} />
      {extraColumns.length > 0 &&
        extraColumns.map((k) => <Cell key={`$${k}`} data={k} />)}
    </>
  );
};

export default memo(TableHeader);
