export type Book = {
  key: number; // === isbn
  title: string;
  status: 'active' | 'unactive';
  author: string;
  category: string;
  isbn: number; // unique for each book, 13 digins
  created_at: string;
  edited_at: string;
};
