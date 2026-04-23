// components/ProtectedRoute.tsx
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
  // Берем пользователя из Redux
  const { user, jwt } = useAppSelector((state) => state.user);

  // Если нет токена или пользователя - редирект на страницу авторизации
  if (!jwt || !user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
