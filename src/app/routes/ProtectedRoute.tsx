import { Navigate } from "react-router";
import { useAppSelector } from "../../store/services/useAppSelector";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute = ({
  children,
  redirectTo = "/auth",
}: ProtectedRouteProps) => {
  const { user, jwt } = useAppSelector((state) => state.user);

  const hasValidSession =
    (jwt && user) ||
    (!jwt && !user && localStorage.getItem("jwt") && localStorage.getItem("user"));

  if (!hasValidSession) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
