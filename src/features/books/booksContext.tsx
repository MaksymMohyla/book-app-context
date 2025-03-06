import { createContext, Dispatch, SetStateAction } from 'react';
import { Book } from '../types';

type BooksContext = {
  booksList: Book[];
  setBooksList: Dispatch<SetStateAction<Book[]>>;
};

export const BooksContext = createContext<BooksContext>({
  booksList: [],
  setBooksList: () => {},
});
