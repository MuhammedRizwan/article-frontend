import { useSelector } from "react-redux";
import { RootState } from "./Redux/store";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const userId = useSelector((state: RootState) => state.user.user?._id);
   return userId ? children : <Navigate to="/" />;
  }