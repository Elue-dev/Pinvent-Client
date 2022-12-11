import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../../redux/features/auth/auth_slice";

export default function ProtectAuthRoutes({ children }) {
  const user = useSelector(getUser);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
