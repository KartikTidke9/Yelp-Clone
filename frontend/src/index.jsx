import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Details from "./pages/Details";
import Update from "./pages/Update";
import { Provider } from "react-redux";
import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/restaurants/:id",
    element: <Details />,
  },
  {
    path: "/restaurants/:id/update",
    element: <Update />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
