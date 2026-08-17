import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import PostDetail from "../pages/PostDetail";
import SignInForm from "../pages/SignInForm";
import SignUpForm from "../pages/SignUpForm";
import PostForm from "../pages/PostForm";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "posts/:id",
        element: <PostDetail />, 
      },
      {
        path: "sign-in",
        element: <SignInForm />, 
      },
      {
        path: "sign-up",
        element: <SignUpForm />, 
      },

  
      {
        element: <ProtectedRoute />, 
        children: [
          {
            path: "posts/create",
            element: <PostForm />, 
          },
          {
            path: "posts/edit/:id",
            element: <PostForm />
          }
        ],
      },
    ],
  },
]);