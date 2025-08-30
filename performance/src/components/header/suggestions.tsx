import { forwardRef } from 'react';

type SuggestionsProps = {
  suggestions: string[];
  onSuggestionClick: (value: string) => void;
};

const Suggestions = forwardRef<HTMLUListElement, SuggestionsProps>(
  ({ suggestions, onSuggestionClick }, ref) => {
    return (
      <ul
        ref={ref}
        tabIndex={-1}
        className="absolute top-[120%] left-[10%] max-h-[50vh] px-5 w-[150%] rounded-md overflow-auto bg-gray-300 dark:bg-gray-800"
      >
        {suggestions.length > 0 &&
          suggestions.map((country) => (
            <li tabIndex={-1} key={country}>
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
