import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FC,
  type SetStateAction,
} from 'react';
import Suggestions from './suggestions';
import type { RawCountries } from '@/types/types';

type SearchProps = {
  country: keyof RawCountries | undefined;
  setCountry: Dispatch<SetStateAction<keyof RawCountries | undefined>>;
};

const Search: FC<SearchProps> = ({ setCountry }) => {
  const [value, setValue] = useState('');
  const [isSuggestionsOpen, setSuggestionsOpen] = useState(false);

  const suggestionRef = useRef<HTMLUListElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue.length > 0) {
      setSuggestionsOpen(true);
    } else {
      setCountry(undefined);
    }
  };

  const onFocus = () => setSuggestionsOpen(true);

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      e.relatedTarget &&
      suggestionRef.current &&
      suggestionRef.current.contains(e.relatedTarget as Node)
    ) {
      return;
    }
    setSuggestionsOpen(false);
  };

  const onDownKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' && suggestionRef.current) {
      e.preventDefault();
      suggestionRef.current.focus();
    }
  };

  const onSuggestionClick = useCallback(
    (value: keyof RawCountries) => {
      setValue(value);
      setCountry(value);
      setSuggestionsOpen(false);
    },
    [setCountry]
  );
  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Country search"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onDownKeyDown}
        className="rounded-md pl-3 p-2 bg-gray-300 dark:bg-gray-800 cursor-pointer"
      />
      <Suggestions
        inputValue={value}
        isOpen={isSuggestionsOpen}
        onSuggestionClick={onSuggestionClick}
        ref={suggestionRef}
      />
    </div>
  );
};

export default Search;
