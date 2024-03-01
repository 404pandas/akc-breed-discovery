import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

// Pages
import Home from "./pages/Home";
import Breed from "./pages/Breed";
import Breeds from "./pages/Breeds";
import Groups from "./pages/Groups";
import Group from "./pages/Group";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import App from "./App.jsx";
// import Quiz from "./pages/Quiz";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/breeds/:id",
        element: <Breed />,
      },
      {
        path: "/breeds",
        element: <Breeds />,
      },
      // { path: "/quiz", element: <Quiz /> },
      {
        path: "/groups/:id",
        element: <Group />,
      },
      {
        path: "/groups",
        element: <Groups />,
      },
      {
        path: "/me",
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
