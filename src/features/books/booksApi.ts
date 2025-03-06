import { client } from '../../utils/api';
import { Book } from '../types';

export const getBooksFromServer = () => client.get<Book[]>('books');

export const postBookToServer = (book: Omit<Book, 'id'>) =>
  client.post('books', book);

export const deleteBookFromServer = (id: string) =>
  client.delete(`books/${id}`);

export const updateBookOnServer = (id: string, updatedBook: Partial<Book>) =>
  client.patch(`books/${id}`, updatedBook);
