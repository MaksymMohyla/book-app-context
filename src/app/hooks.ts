import { useContext } from 'react';
import { BooksContext } from '../features/books/booksContext';

export const useBooks = () => useContext(BooksContext);
