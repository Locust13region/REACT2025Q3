import BooksList from '@components/books-list';

const Content = ({ children }: { children?: React.ReactNode }) => {
  return (
    <main className="content">
      <BooksList />
      {children}
    </main>
  );
};

export default Content;
