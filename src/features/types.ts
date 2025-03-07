export type DropDownVariants = 'all' | 'active' | 'unactive';

export enum BookStatus {
  active = 'active',
  unactive = 'unactive',
}

export type Book = {
  id: string; // json-server generates these
  key: number; // === isbn, needed in antd library for table rendering
  title: string;
  status: BookStatus;
  author: string;
  category: string;
  isbn: number; // unique for each book, 13 digins
  created_at: string;
  edited_at: string;
};
