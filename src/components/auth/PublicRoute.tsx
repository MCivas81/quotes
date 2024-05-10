import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";
import { selectIsLoggedIn } from "../../state/reducers/authSlice";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const location = useLocation();

  if (!isLoggedIn) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default PublicRoute;
