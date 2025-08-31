import { forwardRef, memo, use, useMemo } from 'react';
import Co2DataContext from '../context/data-context';
import getCountriesKeys from '@/utils/get-countries-keys';

type SuggestionsProps = {
  inputValue: string;
  onSuggestionClick: (value: string) => void;
};

const Suggestions = forwardRef<HTMLUListElement, SuggestionsProps>(
  ({ inputValue, onSuggestionClick }, ref) => {
    const co2Data = use(Co2DataContext);
    // const countries = getCountriesKeys(co2Data);
    const countries = useMemo(() => {
      console.log('calc countries');
      return getCountriesKeys(co2Data);
    }, [co2Data]);

    const suggestions = inputValue
      ? countries.filter((country) =>
          country.toLowerCase().includes(inputValue.toLowerCase())
        )
      : countries;

    return (
      <ul
        ref={ref}
        tabIndex={-1}
        className="absolute top-[120%] left-[10%] max-h-[50vh] px-5 w-[150%] rounded-md overflow-auto bg-gray-300 dark:bg-gray-800"
      >
        {suggestions.length > 0 &&
          suggestions.map((country) => (
            <li tabIndex={0} key={country}>
              <label
                className="block w-full p-2 cursor-pointer "
                onMouseDown={() => onSuggestionClick(country)}
              >
                {country}
              </label>
            </li>
          ))}
      </ul>
    );
  }
);

Suggestions.displayName = 'Suggestions';

export default Suggestions;
// export default memo(Suggestions);
