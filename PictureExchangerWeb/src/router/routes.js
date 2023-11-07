import { Navigate } from "react-router-dom";
import Posts from "../components/pages/Posts/Posts";
import Post from "../components/pages/Post/Post";
import User from "../components/pages/User/User";
import AddPost from "../components/pages/AddPost/AddPost";

const routes = [
  { path: "/", element: <Posts />, exact: true },
  { path: "*", element: <Navigate to="/" />, exact: true },
  { path: "users/:name", element: <User />, exact: true },
  { path: "/:postId", element: <Post />, exact: true },
  { path: "add", element: <AddPost />, exact: true },
];

export default routes;
