import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BooksProvider } from './features/books/booksContext.tsx';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './assets/styles/global.css';
import Dashboard from './pages/Dashboard/Dashboard.tsx';

createRoot(document.getElementById('root')!).render(
  <BooksProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </HashRouter>
  </BooksProvider>
);
