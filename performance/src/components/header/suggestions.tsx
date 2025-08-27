import type { FC } from 'react';

type SuggestionsProps = {
  suggestions: string[];
  onClick: MouseEvent<HTMLLabelElement>;
};

const Suggestions: FC<SuggestionsProps> = (suggestions, onClick) => {
  return <div>{suggestions.length > 0 && suggestions.ma}</div>;
};

export default Suggestions;
