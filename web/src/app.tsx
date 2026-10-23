import { createBrowserRouter, RouterProvider } from "react-router";
import { Home } from "./pages/home";
import { NotFound } from "./pages/not-found";
import { Redirect } from "./pages/redirect";
import { StyleGuide } from "./pages/style-guide";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/style-guide", element: <StyleGuide /> },
  { path: "/:shortUrl", element: <Redirect /> },
  { path: "*", element: <NotFound /> },
]);

export function App() {
  return <RouterProvider router={router} />;
}
