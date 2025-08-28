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
    <ul>
      {suggestions.length > 0 &&
        suggestions.map((country) => (
          <li key={country}>
            <label onClick={() => onSuggestionClick(country)}>{country}</label>
          </li>
        ))}
    </ul>
  );
};

export default Suggestions;
