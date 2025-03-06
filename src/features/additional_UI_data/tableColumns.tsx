/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Space } from 'antd';
import { Dispatch, SetStateAction, useContext } from 'react';
import { BooksContext } from '../books/booksContext';
import { Book } from '../types';
import { Link } from 'react-router-dom';

export const useTableColumns = () => {
  function handleDeleteBook(
    record: Book,
    booksList: Book[],
    setBooksList: Dispatch<SetStateAction<Book[]>>
  ) {
    setBooksList(booksList.filter((b) => b.key !== record.key));
  }

  function handleChangeStatus(
    record: Book,
    booksList: Book[],
    setBooksList: Dispatch<SetStateAction<Book[]>>
  ) {
    const updatedBooksList: Book[] = booksList.map((book) =>
      book.key === record.key
        ? { ...book, status: book.status === 'active' ? 'unactive' : 'active' }
        : book
    );
    setBooksList(updatedBooksList);
  }

  return [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'ISBN',
      dataIndex: 'isbn',
      key: 'isbn',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Updated At',
      dataIndex: 'edited_at',
      key: 'edited_at',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: string, record: Book) => {
        const { booksList, setBooksList, setSelectedBookId } =
          useContext(BooksContext);
        return (
          <Space direction="vertical">
            <Link to="edit">
              <Button
                type="primary"
                onClick={() => setSelectedBookId(record.key)}
              >
                Edit
              </Button>
            </Link>

            <Button
              type="primary"
              onClick={() => handleDeleteBook(record, booksList, setBooksList)}
            >
              Delete
            </Button>

            <Button
              type="primary"
              onClick={() =>
                handleChangeStatus(record, booksList, setBooksList)
              }
            >
              {record.status === 'active' ? 'Deactivate' : 'Activate'}
            </Button>
          </Space>
        );
      },
    },
  ];
};
