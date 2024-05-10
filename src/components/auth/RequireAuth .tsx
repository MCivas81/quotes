import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";
import { selectUserProfile } from "../../state/reducers/authSlice";

interface RequireAuthProps {
  children: ReactNode;
  allowedRoles: string[];
}

const RequireAuth: FC<RequireAuthProps> = ({ allowedRoles, children }) => {
  const userProfile = useAppSelector(selectUserProfile);
  const location = useLocation();
  const userRole = userProfile?.role ?? "";

  return allowedRoles?.includes(userRole) ? (
    children
  ) : userRole ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
