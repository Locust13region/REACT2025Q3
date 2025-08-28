import { type Dispatch, type FC, type SetStateAction } from 'react';
import Search from './search';
import type { RawCountries, YearData } from '@/types/types';
import SelectYear from './select-year';

type HeaderProps = {
  country: keyof RawCountries | undefined;
  setCountry: Dispatch<SetStateAction<keyof RawCountries | undefined>>;
  year: YearData['year'];
  setYear: Dispatch<SetStateAction<YearData['year']>>;
};

const Header: FC<HeaderProps> = ({ country, setCountry, year, setYear }) => {
  return (
    <header className={'h-15 pl-4 w-full flex'}>
      <Search country={country} setCountry={setCountry} />
      <SelectYear year={year} setYear={setYear} />
    </header>
  );
};

export default Header;
