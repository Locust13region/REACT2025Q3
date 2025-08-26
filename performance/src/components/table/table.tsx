import type { FC } from 'react';

type TableProps = {
  country: string;
  year: number;
};

const Table: FC<TableProps> = ({ country, year }) => {
  return <div className="table"></div>;
};

export default Table;
