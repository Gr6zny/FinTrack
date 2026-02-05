import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout";
import HomePage from "../../pages/home/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);

export default router;
