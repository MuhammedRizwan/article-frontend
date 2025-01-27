import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/store';

const AuthLayout = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const location = useLocation();

  if (user) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }
  return <Outlet />

};

export default AuthLayout;
