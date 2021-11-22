import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuth = localStorage.getItem("Auth");

  return isAuth ? children : <Navigate to="/login" />;
}
