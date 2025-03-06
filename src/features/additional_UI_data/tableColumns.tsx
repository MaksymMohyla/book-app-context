import { Button, Space } from 'antd';
import { Dispatch, SetStateAction, useContext } from 'react';
import { BooksContext } from '../books/booksContext';
import { Book } from '../types';

export const useTableColumns = () => {
  function deleteBook(
    record: Book,
    booksList: Book[],
    setBooksList: Dispatch<SetStateAction<Book[]>>
  ) {
    setBooksList(booksList.filter((b) => b.key !== record.key));
  }

  function changeStatus(
    record: Book,
    booksList: Book[],
    setBooksList: Dispatch<SetStateAction<Book[]>>
  ) {
    const updatedBooksList = booksList.map((book) =>
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
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { booksList, setBooksList } = useContext(BooksContext);
        return (
          <Space direction="vertical">
            <Button type="primary">Edit</Button>

            <Button
              type="primary"
              onClick={() => deleteBook(record, booksList, setBooksList)}
            >
              Delete
            </Button>

            <Button
              type="primary"
              onClick={() => changeStatus(record, booksList, setBooksList)}
            >
              {record.status === 'active' ? 'Deactivate' : 'Activate'}
            </Button>
          </Space>
        );
      },
    },
  ];
};
