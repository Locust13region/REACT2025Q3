import type { YearData } from '@/types/types';
import { memo, type FC } from 'react';
import Cell from '../cell/cell.';

type TableHeaderProps<K extends keyof YearData = keyof YearData> = {
  extraColumns: K[];
};

const TableHeader: FC<TableHeaderProps> = ({ extraColumns }) => {
  return (
    <>
      <Cell sticky={true} data={'Country'} />
      <Cell sticky={true} data={'ISO'} />
      {extraColumns.length > 0 &&
        extraColumns.map((k) => <Cell sticky={true} key={`${k}`} data={k} />)}
    </>
  );
};

export default memo(TableHeader);
