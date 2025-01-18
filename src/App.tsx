import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChangePassword from './pages/ChangePassword';
import ArticlesPage from './pages/ArticlePage';
import LoadingSpinner from './page_component/Spinner';
import ProtectedRoute from './protectedRoute';
import AuthLayout from './authLayout';

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
      <Suspense fallback={<LoadingSpinner/>}>
        <Routes>
          <Route path="/" element={<AuthLayout><LoginForm /></AuthLayout>} />
          <Route path="/signup" element={<AuthLayout><Register /></AuthLayout>} />
          <Route path="/home" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
          <Route path="/articles/:Id" element={<ProtectedRoute><Layout><ArticlesPage /></Layout></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
          <Route path="/change-password" element={<ProtectedRoute><Layout><ChangePassword /></Layout></ProtectedRoute>} />
          <Route path="/my-article" element={<ProtectedRoute><Layout><MyArticle /></Layout></ProtectedRoute>} />
          <Route path="/create-article" element={<ProtectedRoute><Layout><CreateArticle /></Layout></ProtectedRoute>} />
          <Route path="/edit-article/:Id" element={<ProtectedRoute><Layout><EditArticlePage /></Layout></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute><Layout><CategoriesPage /></Layout></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
