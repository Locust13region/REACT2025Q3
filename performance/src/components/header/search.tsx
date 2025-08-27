import { useContext, type Dispatch, type FC, type SetStateAction } from 'react';
import Co2DataContext from '../context/data-context';
import getCountriesKeys from '@/utils/get-countries-keys';

type SearchProps = {
  country: string;
  setCountry: Dispatch<SetStateAction<string>>;
};

const Search: FC<SearchProps> = ({ country, setCountry }) => {
  const co2Data = useContext(Co2DataContext);
  const countries = getCountriesKeys(co2Data);
  console.log('countries', countries);
  return <div>SEARCH</div>;
};

export default Search;
