import { Route, Routes, Navigate } from 'react-router-dom';

import PostListPage from 'features/posts/pages/PostListPage';
import PostFormPage from 'features/posts/pages/PostFormPage';
import PostDetailPage from 'features/posts/pages/PostDetailPage';

import { FORM_MODES } from 'features/posts/constants';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" replace />} />
      <Route path="/posts" element={<PostListPage />} />
      <Route path="/posts/new" element={<PostFormPage mode={FORM_MODES.CREATE} />} />
      <Route path="/posts/:id" element={<PostDetailPage />} />
      <Route path="/posts/:id/edit" element={<PostFormPage mode={FORM_MODES.EDIT} />} />
    </Routes>
  );
};

export default AppRouter;