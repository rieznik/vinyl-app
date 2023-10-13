import "./wdyr.js";
import { createRoot } from "react-dom/client";
import { StrictMode, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";

import Application from "./Application.jsx";
import HomePage from "./pages/HomePage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import NewSearchPage from "./pages/NewSearchPage.jsx";

import "./main.css";

const appRootElement = document.querySelector("#app");
const root = createRoot(appRootElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Application />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/search",
        element: (
          <ErrorBoundary fallback={<h1>Error!</h1>}>
            <Suspense fallback={<h1>Loading...</h1>}>
              <SearchPage />
            </Suspense>
          </ErrorBoundary>
        ),
        children: [
          {
            index: true,
            element: <NewSearchPage />,
          },
          {
            path: "results",
            lazy: async () => {
              const { default: SearchResultsPage } = await import(
                "./pages/SearchResultsPage.jsx"
              );
              return {
                Component: SearchResultsPage,
              };
            },
            children: [
              {
                path: "vinyl/:vinylId",
                lazy: async () => {
                  const { default: SearchResultsPage } = await import(
                    "./pages/SearchResultsPage.jsx"
                  );
                  return {
                    Component: SearchResultsPage,
                  };
                },
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <h1>Error 404</h1>,
      },
    ],
  },
]);

async function bootstrap() {
  // if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser.js");
  worker.start();
  // }
}

bootstrap().then(() => {
  root.render(
    <StrictMode>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </StrictMode>
  );
});
