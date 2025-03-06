import { createContext, Dispatch, SetStateAction } from 'react';
import { Book } from '../types';

type BooksContext = {
  booksList: Book[];
  setBooksList: Dispatch<SetStateAction<Book[]>>;
  selectedBookId: number;
  setSelectedBookId: Dispatch<SetStateAction<number>>;
};

export const BooksContext = createContext<BooksContext>({
  booksList: [],
  setBooksList: () => {},
  selectedBookId: 0,
  setSelectedBookId: () => {},
});
