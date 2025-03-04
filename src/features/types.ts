export type Book = {
  title: string;
  status: 'active' | 'unactive';
  author: string;
  category: string;
  isbn: number; // International Standard Book Number(13 digits) - eg '9783161484100'
  created_at: string;
  edited_at: string;
};
