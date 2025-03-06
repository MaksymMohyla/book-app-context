import { useEffect, useState } from 'react';
import { BooksContext } from './booksContext';
import { Book } from '../types';
import { getBooksFromServer } from './booksApi';

type Props = {
  children: React.ReactNode;
};

export const BooksProvider: React.FC<Props> = ({ children }) => {
  const [booksList, setBooksList] = useState<Book[]>([]);
  const [selectedBookId, setSelectedBookId] = useState(0);

  useEffect(() => {
    getBooksFromServer()
      .then((res) => {
        setBooksList(res);
      })
      .catch((err) => {
        alert(err);
      });
  }, [booksList]);

  return (
    <BooksContext.Provider
      value={{ booksList, setBooksList, selectedBookId, setSelectedBookId }}
    >
      {children}
    </BooksContext.Provider>
  );
};
