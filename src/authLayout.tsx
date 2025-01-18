// src/components/AuthLayout.tsx
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/store';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const user = useSelector((state: RootState) => state.user.user);
  const location = useLocation();

  if (user) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthLayout;