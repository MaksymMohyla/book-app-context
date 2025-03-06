import st from './BookForm.module.less';
import { Button, Form, Input, Select } from 'antd';
import { useContext, useState } from 'react';
import { Book } from '../../features/types';
import { Link, useNavigate } from 'react-router-dom';
import { BooksContext } from '../../features/books/booksContext';
import { getFormattedDate } from '../../utils/getFormattedDate';
import {
  postBookToServer,
  updateBookOnServer,
} from '../../features/books/booksApi';

type Props = {
  type: 'addNew' | 'edit';
};

const BookForm: React.FC<Props> = ({ type }) => {
  const { booksList, setBooksList, selectedBookId, setSelectedBookId } =
    useContext(BooksContext);

  const selectedBook = booksList.find((b) => b.key === selectedBookId);

  const [title, setTitle] = useState(selectedBookId ? selectedBook?.title : '');
  const [author, setAuthor] = useState(
    selectedBookId ? selectedBook?.author : ''
  );
  const [category, setCategory] = useState(
    selectedBookId ? selectedBook?.category : 'fiction'
  );
  const [isbn, setIsbn] = useState(
    selectedBookId ? String(selectedBook?.isbn) : '1111111111111'
  );
  const [hasDuplicateError, setHasDuplicateError] = useState(false);
  const [hasIsbnError, setHasIsbnError] = useState(false);

  const navigate = useNavigate();

  function handleAddNew() {
    if (booksList.some((b) => b.isbn === +isbn)) {
      setHasDuplicateError(true);
      return;
    }

    if (isbn.length !== 13) {
      setHasIsbnError(true);
      return;
    }

    const newBook: Omit<Book, 'id'> = {
      // id is generated automaticly
      // compose the object with values from inputs
      key: +isbn,
      title: title || '', // did this to avoid TS error
      status: 'active',
      author: author || '',
      category: category || 'fiction',
      isbn: +isbn,
      created_at: getFormattedDate(),
      edited_at: "hasn't been updated yet",
    };

    postBookToServer(newBook)
      .then(() => {
        // @ts-expect-error - TS is mad about id but it is generated with json server lib
        setBooksList((prev) => [...prev, newBook]);
        navigate('/'); // return to homepage
        alert('Successfully added new book!');
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleEdit() {
    if (!selectedBook) return;

    if (isbn.length !== 13) {
      setHasIsbnError(true);
      return;
    }

    const updatedBook: Book = {
      ...selectedBook,
      title: title || '',
      author: author || '',
      category: category || '',
      isbn: +isbn,
      edited_at: getFormattedDate(),
    };

    const updatedBooksList = booksList.map((book) =>
      book.key === selectedBookId ? updatedBook : book
    );

    updateBookOnServer(updatedBook.id, updatedBook)
      .then(() => {
        setBooksList(updatedBooksList);
        navigate('/');
        alert('Successfully edited the book!');
      })
      .catch((err) => alert(err));
  }

  function handleInputChange(state: string, newValue: string) {
    switch (state) {
      case 'title':
        setTitle(newValue);
        break;
      case 'author':
        setAuthor(newValue);
        break;
      case 'category':
        setCategory(newValue);
        break;
      case 'isbn':
        setIsbn(newValue);
        break;
    }

    setHasDuplicateError(false);
    setHasIsbnError(false);
  }

  return (
    <>
      <header className={st.title}>
        <h1>{type === 'addNew' ? 'Add a new book' : 'Edit the book'}</h1>
      </header>

      <Form onFinish={type === 'addNew' ? handleAddNew : handleEdit}>
        <Form.Item label="Title" required>
          <Input
            type="text"
            className={st.input}
            value={title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
          />
        </Form.Item>

        <Form.Item label="Author name" required>
          <Input
            type="text"
            className={st.input}
            value={author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            required
          />
        </Form.Item>

        <Form.Item label="Category" required>
          <Select
            className={`${st.input} ${st['input--select']}`}
            value={category}
            onChange={(value) => handleInputChange('category', value)}
          >
            <Select.Option value="fiction">Fiction</Select.Option>
            <Select.Option value="non-fiction">Non-fiction</Select.Option>
            <Select.Option value="science">Science</Select.Option>
            <Select.Option value="reference">Reference</Select.Option>
            <Select.Option value="children">
              Children's Literature
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="International Standard Book Number - 13 digits"
          required
        >
          <Input
            type="number"
            required
            className={st.input}
            value={isbn}
            onChange={(e) => handleInputChange('isbn', e.target.value)}
          />
        </Form.Item>

        <div className={st.buttons}>
          <Button type="primary" htmlType="submit" className="antd-button">
            {type === 'addNew' ? 'Add the book' : 'Edit the book'}
          </Button>
          <Link to="/">
            <Button
              onClick={() => setSelectedBookId(0)}
              className="antd-button"
            >
              Return to dashboard
            </Button>
          </Link>
        </div>
      </Form>

      {hasDuplicateError && (
        <div role="alert" className={st.errorMessage}>
          Error! The book with the same ISBN already exists on the dashboard!
        </div>
      )}

      {hasIsbnError && (
        <div role="alert" className={st.errorMessage}>
          Error! ISBN should contain 13 digits!
        </div>
      )}
    </>
  );
};

export default BookForm;
