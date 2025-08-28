import {
  use,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FC,
  type SetStateAction,
} from 'react';
import Co2DataContext from '../context/data-context';
import getCountriesKeys from '@/utils/get-countries-keys';
import Suggestions from './suggestions';
import type { RawCountries } from '@/types/types';

type SearchProps = {
  country: keyof RawCountries | undefined;
  setCountry: Dispatch<SetStateAction<keyof RawCountries | undefined>>;
};

const Search: FC<SearchProps> = ({ setCountry }) => {
  const co2Data = use(Co2DataContext);

  const countries = getCountriesKeys(co2Data);
  type CountryKey = (typeof countries)[number];

  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<CountryKey[]>([]);

  const selectSuggestions = (text: string) => {
    return countries.filter((country) => country.includes(text));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue.length > 0) {
      const selected = selectSuggestions(newValue);
      setSuggestions(selected);
    } else {
      setSuggestions(countries);
      setCountry(undefined);
    }
  };

  const onFocus = () => setSuggestions(countries);

  const onBlur = () => setSuggestions([]);

  const onSuggestionClick = (value: keyof RawCountries) => {
    setValue(value);
    setCountry(value);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Country search"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className=""
      />
      <Suggestions
        suggestions={suggestions}
        onSuggestionClick={onSuggestionClick}
      />
    </div>
  );
};

export default Search;
