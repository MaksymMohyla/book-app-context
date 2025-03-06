export type Book = {
  id: string; // json-server generates these for me
  key: number; // === isbn, needed in antd library for table rendering
  title: string;
  status: 'active' | 'unactive';
  author: string;
  category: string;
  isbn: number; // unique for each book, 13 digins
  created_at: string;
  edited_at: string;
};
