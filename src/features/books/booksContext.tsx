import React, { createContext, useState } from 'react';
import { Book } from '../types';

export const BooksContext = createContext<
  | {
      booksList: Book[];
      setBooksList: React.Dispatch<React.SetStateAction<Book[]>>;
    }
  | []
>([]);

type Props = {
  children: React.ReactNode;
};

export const BooksProvider: React.FC<Props> = ({ children }) => {
  const [booksList, setBooksList] = useState<Book[]>([]);

  return (
    <BooksContext.Provider value={{ booksList, setBooksList }}>
      {children}
    </BooksContext.Provider>
  );
};
