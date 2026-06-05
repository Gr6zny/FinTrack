// router.tsx
import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout";
import HomePage from "../../pages/home/HomePage";
import AuthPage from "../../pages/auth/AuthPage";
import { MainPage } from "../../pages/main/MainPage";
import Transaction from "../../pages/transaction/Transaction";
import Account from "../../pages/account/Account";
import Budget from "../../pages/budget/Budget";
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
      { path: "/transaction", element: <Transaction /> },
      { path: "/account", element: <Account /> },
      {
        path: "/budget",
        element: (
          <ProtectedRoute>
            <Budget />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
