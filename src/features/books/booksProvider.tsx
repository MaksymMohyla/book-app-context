import { useState } from 'react';
import { BooksContext } from './booksContext';
import { Book } from '../types';

type Props = {
  children: React.ReactNode;
};

export const BooksProvider: React.FC<Props> = ({ children }) => {
  const [booksList, setBooksList] = useState<Book[]>([]);
  const [selectedBookId, setSelectedBookId] = useState(0);

  return (
    <BooksContext.Provider
      value={{ booksList, setBooksList, selectedBookId, setSelectedBookId }}
    >
      {children}
    </BooksContext.Provider>
  );
};
