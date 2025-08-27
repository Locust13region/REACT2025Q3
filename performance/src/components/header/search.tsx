import {
  use,
  useContext,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FC,
  type SetStateAction,
} from 'react';
import Co2DataContext from '../context/data-context';
import getCountriesKeys from '@/utils/get-countries-keys';
import Suggestions from './suggestions';

type SearchProps = {
  country: string;
  setCountry: Dispatch<SetStateAction<string>>;
};

const Search: FC<SearchProps> = ({ country, setCountry }) => {
  const co2Data = use(Co2DataContext);
  const countries = getCountriesKeys(co2Data);

  const selectSuggestions = (text: string) => {
    return countries.filter((country) => country.includes(text));
  };

  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (e.target.value.length > 0) {
      const selected = selectSuggestions(e.target.value);
      setSuggestions(selected);
    } else {
      setSuggestions([]);
    }
  };

  const onSuggestion = () => {
    setValue(suggestion.label);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Country search"
        value={value}
        className=""
        onChange={onChange}
      />
      <Suggestions suggestions={suggestions} onClick={onSuggestion} />
    </div>
  );
};

export default Search;
