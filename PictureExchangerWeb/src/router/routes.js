import { Navigate } from "react-router-dom";
import Posts from "../components/pages/Posts/Posts";
import Post from "../components/pages/Post/Post";
import User from "../components/pages/User/User";

const routes = [
  { path: "/", element: <Posts />, exact: true },
  { path: "*", element: <Navigate to="/" />, exact: true },
  { path: "/:postId", element: <Post />, exact: true },
  { path: "users/:name", element: <User />, exact: true },
];

export default routes;
