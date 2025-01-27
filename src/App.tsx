import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChangePassword from './pages/ChangePassword';
import ArticlesPage from './pages/ArticlePage';
import LoadingSpinner from './page_component/Spinner';
import ProtectedRoute from './protectedRoute';
import AuthLayout from './authLayout';
import { Toaster } from './components/ui/sonner';

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
      <Toaster/>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<LoginForm />} />
            <Route path="/signup" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/home" element={<Home />} />
            <Route path="/articles/:Id" element={<ArticlesPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/my-article" element={<MyArticle />} />
            <Route path="/create-article" element={<CreateArticle />} />
            <Route path="/edit-article/:Id" element={<EditArticlePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
