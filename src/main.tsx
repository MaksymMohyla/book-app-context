import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BooksProvider } from './features/books/booksProvider.tsx';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import './assets/styles/global.less';
import AddNew from './pages/AddNew/AddNew.tsx';

createRoot(document.getElementById('root')!).render(
  <BooksProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="addNew" element={<AddNew />} />
        </Route>
      </Routes>
    </HashRouter>
  </BooksProvider>
);
