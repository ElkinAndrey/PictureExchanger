import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetching from "../../hooks/useFetching";
import PostApi from "../../api/postApi";
import PostInPosts from "../../widgets/PostInPosts/PostInPosts";
import Loader from "../../shared/Loader/Loader";
import classes from "./Post.module.css";
import Context from "../../context/context";
import serverNotRespondingError from "../../constants/serverNotRespondingError";

/** Страница с постом */
const Post = () => {
  // КОНСТАНТЫ
  const params = useParams(); // Параметры из URL
  const { addNotification } = useContext(Context);

  // ПЕРЕМЕННЫЕ
  const [post, postChange] = useState(null); // Посты

  const postCallback = async () => {
    const response = await PostApi.getById(params.postId);
    postChange(response.data);
  };

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ
  const [fetchPost, loadPost, errorPost] = useFetching(postCallback);

  // ДЕЙСТВИЯ
  useEffect(() => {
    fetchPost();
  }, [params.postId]);

  useEffect(() => {
    if (errorPost !== null && errorPost?.response === undefined)
      addNotification({ ...serverNotRespondingError });
  }, [errorPost]);

  // При загрузке поста
  if (loadPost)
    return (
      <Loader
        className={classes.loader}
        color={"#4177b5"}
        width={"50px"}
        thickness={"4px"}
      />
    );

  // Если пост не найден
  if (errorPost?.response !== undefined)
    return <div className={classes.errorPostNotFound}>Пост не найден</div>;

  return <PostInPosts post={post} isDeleted={true} openable={false} />;
};

export default Post;
