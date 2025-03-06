import { Button, Form, Input, Select } from 'antd';
import st from './AddNew.module.less';
import { useContext, useState } from 'react';
import { Book } from '../../features/types';
import { Link, useNavigate } from 'react-router-dom';
import { BooksContext } from '../../features/books/booksContext';

const AddNew = () => {
  const { booksList, setBooksList } = useContext(BooksContext);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('fiction');
  const [isbn, setIsbn] = useState('1111111111111');

  const [hasDuplicateError, setHasDuplicateError] = useState(false);
  const [hasIsbnError, setHasIsbnError] = useState(false);

  const navigate = useNavigate();

  function handleSubmit() {
    if (booksList.some((b) => b.isbn === +isbn)) {
      setHasDuplicateError(true);
      return;
    }

    if (isbn.length !== 13) {
      setHasIsbnError(true);
      return;
    }

    const newBook: Book = {
      // compose the object with values from inputs
      key: +isbn,
      title,
      status: 'active',
      author,
      category,
      isbn: +isbn,
      created_at: '12 March 2022, 8:35pm',
      edited_at: "hasn't been updated yet",
    };

    setBooksList((prev) => [...prev, newBook]); // add this object to the end of the list
    navigate('/'); // return to homepage
    alert('Successfully added new book!');
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
        <h1>Add a new book</h1>
      </header>

      <Form onFinish={handleSubmit}>
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
          <Button type="primary" htmlType="submit">
            Add the book
          </Button>
          <Link to="/">
            <Button>Return to dashboard</Button>
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

export default AddNew;
