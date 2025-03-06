export type Book = {
  key: number; // === isbn
  title: string;
  status: 'active' | 'unactive';
  author: string;
  category: string;
  isbn: number; // Iunique for each book
  created_at: string;
  edited_at: string;
};
