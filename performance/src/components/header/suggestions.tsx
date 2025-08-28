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
    <ul className="absolute top-[120%] left-[10%] max-h-[50vh] w-full overflow-auto ">
      {suggestions.length > 0 &&
        suggestions.map((country) => (
          <li key={country}>
            <label onMouseDown={() => onSuggestionClick(country)}>
              {country}
            </label>
          </li>
        ))}
    </ul>
  );
};

export default Suggestions;
