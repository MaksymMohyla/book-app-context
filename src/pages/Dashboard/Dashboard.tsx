import { Button, Dropdown, Space, Table } from 'antd';
import st from './Dashboard.module.less';
import { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BooksContext } from '../../features/books/booksContext';
import { DropDownVariants } from '../../features/types';
import { useDropDownItems, useTableColumns } from '../../app/hooks';

const Dashboard = () => {
  const { booksList } = useContext(BooksContext);
  const [selectedFilter, setSelectedFilter] =
    useState<DropDownVariants>('active');

  const items = useDropDownItems(selectedFilter, setSelectedFilter);
  const columns = useTableColumns(); // manipulate buttons logic is in this hook

  const data = useMemo(() => {
    return booksList.filter((book) => {
      switch (selectedFilter) {
        case 'active':
          return book.status === 'active';
        case 'unactive':
          return book.status === 'unactive';
        default:
          return true;
      }
    });
  }, [booksList, selectedFilter]);

  return (
    <>
      <header className={st.header}>
        <h1 className={st.header__title}>Dashboard</h1>
        <div className={st.header__bottomSection}>
          <Dropdown
            menu={{ items }}
            trigger={['click']}
            className={st.header__dropdown}
          >
            <Button type="primary" className="antd-button">
              <Space>Show {selectedFilter} ▼</Space>
            </Button>
          </Dropdown>

          {booksList.length !== 0 && (
            <p>
              Showing {data.length} of {booksList.length} books
            </p>
          )}

          <Link to="addNew">
            <Button type="primary" className="antd-button">
              <Space>Add a new book</Space>
            </Button>
          </Link>
        </div>
      </header>
      <main>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
          className={st.table}
          locale={{ emptyText: 'No books yet' }}
        />
      </main>
    </>
  );
};

export default Dashboard;
