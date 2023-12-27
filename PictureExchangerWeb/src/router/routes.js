import { Navigate } from "react-router-dom";
import Posts from "../components/pages/Posts/Posts";
import Post from "../components/pages/Post/Post";
import User from "../components/pages/User/User";
import AddPost from "../components/pages/AddPost/AddPost";
import ChangePost from "../components/pages/ChangePost/ChangePost";
import Register from "../components/pages/Register/Register";
import Login from "../components/pages/Login/Login";

const routes = {
  notRegister: [
    { path: "/", element: <Posts />, exact: true },
    { path: "*", element: <Navigate to="/" />, exact: true },
    { path: "users/:name", element: <User />, exact: true },
    { path: "/:postId", element: <Post />, exact: true },
    { path: "/:postId/change", element: <Navigate to="/" />, exact: true },
    { path: "add", element: <Navigate to="/" />, exact: true },
    { path: "register", element: <Register />, exact: true },
    { path: "login", element: <Login />, exact: true },
  ],
  user: [
    { path: "/", element: <Posts />, exact: true },
    { path: "*", element: <Navigate to="/" />, exact: true },
    { path: "users/:name", element: <User />, exact: true },
    { path: "/:postId", element: <Post />, exact: true },
    { path: "/:postId/change", element: <ChangePost />, exact: true },
    { path: "add", element: <AddPost />, exact: true },
    { path: "register", element: <Navigate to="/" />, exact: true },
    { path: "login", element: <Navigate to="/" />, exact: true },
  ],
  manager: [
    { path: "/", element: <Posts />, exact: true },
    { path: "*", element: <Navigate to="/" />, exact: true },
    { path: "users/:name", element: <User />, exact: true },
    { path: "/:postId", element: <Post />, exact: true },
    { path: "/:postId/change", element: <ChangePost />, exact: true },
    { path: "add", element: <AddPost />, exact: true },
    { path: "register", element: <Navigate to="/" />, exact: true },
    { path: "login", element: <Navigate to="/" />, exact: true },
  ],
  superManager: [
    { path: "/", element: <Posts />, exact: true },
    { path: "*", element: <Navigate to="/" />, exact: true },
    { path: "users/:name", element: <User />, exact: true },
    { path: "/:postId", element: <Post />, exact: true },
    { path: "/:postId/change", element: <ChangePost />, exact: true },
    { path: "add", element: <AddPost />, exact: true },
    { path: "register", element: <Navigate to="/" />, exact: true },
    { path: "login", element: <Navigate to="/" />, exact: true },
  ],
  admin: [
    { path: "/", element: <Posts />, exact: true },
    { path: "*", element: <Navigate to="/" />, exact: true },
    { path: "users/:name", element: <User />, exact: true },
    { path: "/:postId", element: <Post />, exact: true },
    { path: "/:postId/change", element: <ChangePost />, exact: true },
    { path: "add", element: <AddPost />, exact: true },
    { path: "register", element: <Navigate to="/" />, exact: true },
    { path: "login", element: <Navigate to="/" />, exact: true },
  ],
  superAdmin: [
    { path: "/", element: <Posts />, exact: true },
    { path: "*", element: <Navigate to="/" />, exact: true },
    { path: "users/:name", element: <User />, exact: true },
    { path: "/:postId", element: <Post />, exact: true },
    { path: "/:postId/change", element: <ChangePost />, exact: true },
    { path: "add", element: <AddPost />, exact: true },
    { path: "register", element: <Navigate to="/" />, exact: true },
    { path: "login", element: <Navigate to="/" />, exact: true },
  ],
};

export default routes;
