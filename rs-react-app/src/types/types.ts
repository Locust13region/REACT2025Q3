export type HeaderProps = {
  searchSubstring: string;
  setSearchSubstring: (value: string) => void;
};

export type ContentProps = {
  searchSubstring: string;
  setErrorInfo: (value: string) => void;
};

export type ErrorBoundaryProps = {
  //   hasError: boolean;
  children: Element;
  //   fallback: Element;
};

export type MappedResponse = {
  id: number;
  author: string;
  title: string;
}[];
