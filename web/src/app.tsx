import { createBrowserRouter, RouterProvider } from "react-router";
import { Home } from "./pages/home";
import { NotFound } from "./pages/not-found";
import { Redirect } from "./pages/redirect";

// Dev-only: Vite replaces `import.meta.env.DEV` with `false` in the build, so the page is not bundled.
const devRoutes = import.meta.env.DEV
  ? [
      {
        path: "/style-guide",
        lazy: async () => {
          const { StyleGuide } = await import("./pages/style-guide");

          return { Component: StyleGuide };
        },
      },
    ]
  : [];

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  ...devRoutes,
  { path: "/:shortUrl", element: <Redirect /> },
  { path: "*", element: <NotFound /> },
]);

export function App() {
  return <RouterProvider router={router} />;
}
