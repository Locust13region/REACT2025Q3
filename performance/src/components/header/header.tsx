import { type Dispatch, type FC, type SetStateAction } from 'react';
import Search from './search';

type HeaderProps = {
  country: string;
  setCountry: Dispatch<SetStateAction<string>>;
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
};

const Header: FC<HeaderProps> = ({ country, setCountry }) => {
  return (
    <header className={'h-15 pl-4 w-full flex'}>
      <Search country={country} setCountry={setCountry} />
    </header>
  );
};

export default Header;
