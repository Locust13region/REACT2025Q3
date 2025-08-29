import type { FC } from 'react';

type SuggestionsProps = {
  suggestions: string[];
  onSuggestionClick: (value: string) => void;
};

const Suggestions: FC<SuggestionsProps> = ({
  suggestions,
  onSuggestionClick,
}) => {
  return (
    <ul className="absolute top-[120%] left-[10%] max-h-[50vh] px-8 py-3 empty:py-0 w-[150%] rounded-md overflow-auto bg-gray-300 dark:bg-gray-800">
      {suggestions.length > 0 &&
        suggestions.map((country) => (
          <li key={country}>
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
};

export default Suggestions;
