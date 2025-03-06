import { client } from '../../utils/api';
import { Book } from '../types';

export const getBooksFromServer = () => client.get<Book[]>('books');

export const postBookToServer = (book: Book) => client.post('books', book);
