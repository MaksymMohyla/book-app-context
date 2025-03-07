/* eslint-disable react-hooks/rules-of-hooks */
import { Button, MenuProps, Space } from 'antd';
import { Dispatch, SetStateAction, useContext } from 'react';
import { BooksContext } from '../features/books/booksContext';
import { Book, BookStatus, DropDownVariants } from '../features/types';
import { Link } from 'react-router-dom';
import {
  deleteBookFromServer,
  updateBookOnServer,
} from '../features/books/booksApi';
import { getFormattedDate } from '../utils/getFormattedDate';

export const useTableColumns = () => {
  function handleDeleteBook(
    record: Book,
    booksList: Book[],
    setBooksList: Dispatch<SetStateAction<Book[]>>
  ) {
    deleteBookFromServer(record.id)
      .then(() => {
        setBooksList(booksList.filter((b) => b.key !== record.key));
        alert('Successfully deleted book!');
      })
      .catch((err) => alert(err));
  }

  function handleChangeStatus(
    record: Book,
    booksList: Book[],
    setBooksList: Dispatch<SetStateAction<Book[]>>
  ) {
    const updatedBooksList: Book[] = booksList.map((book) => {
      if (book.key === record.key) {
        return {
          ...book,
          status:
            book.status === BookStatus.active
              ? BookStatus.unactive
              : BookStatus.active,
        };
      }
      return book;
    });

    updateBookOnServer(record.id, {
      status:
        record.status === BookStatus.active
          ? BookStatus.unactive
          : BookStatus.active,
      edited_at: getFormattedDate(),
    })
      .then(() => {
        setBooksList(updatedBooksList);
      })
      .catch((err) => alert(err));
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
              {record.status === BookStatus.active ? 'Deactivate' : 'Activate'}
            </Button>
          </Space>
        );
      },
    },
  ];
};

export const useDropDownItems = (
  selectedFilter: DropDownVariants,
  setSelectedFilter: Dispatch<SetStateAction<DropDownVariants>>
) => {
  const items: MenuProps['items'] = [
    {
      label: (
        <Button
          onClick={() => setSelectedFilter('all')}
          type={selectedFilter === 'all' ? 'primary' : 'default'}
        >
          Show all
        </Button>
      ),
      key: '0',
    },
    {
      label: (
        <Button
          onClick={() => setSelectedFilter('active')}
          type={selectedFilter === 'active' ? 'primary' : 'default'}
        >
          Show active
        </Button>
      ),
      key: '1',
    },
    {
      label: (
        <Button
          onClick={() => setSelectedFilter('unactive')}
          type={selectedFilter === 'unactive' ? 'primary' : 'default'}
        >
          Show unactive
        </Button>
      ),
      key: '2',
    },
  ];

  return items;
};
