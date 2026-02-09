import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout";
import HomePage from "../../pages/home/HomePage";
import MainPage from "../../pages/main/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/main", element: <MainPage /> },
    ],
  },
]);

export default router;
