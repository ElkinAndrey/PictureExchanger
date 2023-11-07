import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetching from "../../../hooks/useFetching";
import PostApi from "../../../api/postApi";

const Post = () => {
  // ПЕРЕМЕННЫЕ
  const params = useParams(); // Параметры из URL
  const [post, postChange] = useState(null); // Посты

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ

  /** Получение поста по id */
  const [fetchPost, isLoadingPost, errorPost] = useFetching(async (id) => {
    const response = await PostApi.getById(id);
    postChange(response.data);
  });

  // ДЕЙСТВИЯ

  /** Действия при загрузке страницы */
  useEffect(() => {
    fetchPost(params.postId);
  }, []);

  return (
    post && (
      <div>
        <h1>Пост</h1>
        <div>{post.name}</div>
        <div>{post.date}</div>
        <div>{post.isPrivate ? "Приватный" : "Публичный"}</div>
        <div>{post.isBanned ? "Забанен" : "Не забанен"}</div>
        <div>
          <Link to={`/users/${post.user.name}`}>{post.user.name}</Link>
        </div>
        <div>{"#" + post.tags.join(" #")}</div>
        <div>{post.images.join(", ")}</div>
      </div>
    )
  );
};

export default Post;
