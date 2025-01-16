import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const LoginForm = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Home = lazy(() => import('./pages/Home'));
const Layout = lazy(() => import('./layout'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Profile = lazy(() => import('./pages/Profile'));
const CreateArticle = lazy(() => import('./pages/CreateArticle'));
const EditArticlePage = lazy(() => import('./pages/EditArticle'));
const CategoriesPage = lazy(() => import('./pages/Category'));
const MyArticle = lazy(() => import('./pages/MyArticle'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/my-article" element={<Layout><MyArticle /></Layout>} />
          <Route path="/create-article" element={<Layout><CreateArticle /></Layout>} />
          <Route path="/edit-article/:Id" element={<Layout><EditArticlePage /></Layout>} />
          <Route path="/categories" element={<Layout><CategoriesPage /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
