// router.tsx
import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout";
import HomePage from "../../pages/home/HomePage";
import MainPage from "../../pages/main/MainPage";
import AuthPage from "../../pages/auth/AuthPage";
import { ProtectedRoute } from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "/main",
        element: (
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        ),
      },
      { path: "/auth", element: <AuthPage /> },
    ],
  },
]);

export default router;
