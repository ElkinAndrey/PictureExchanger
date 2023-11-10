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

  /** Забанить пост */
  const [fetchBanned, isLoadingBanned, errorBanned] = useFetching(
    async (id) => {
      await PostApi.banned(id);
    }
  );

  /** Разбанить пост */
  const [fetchUnbanned, isLoadingUnbanned, errorUnbanned] = useFetching(
    async (id) => {
      await PostApi.unbanned(id);
    }
  );

  // ФУНКЦИИ

  /** Забанить */
  const banned = () => {
    fetchBanned(params.postId);
    post.isBanned = true;
    postChange({ ...post });
  };

  /** Разбанить */
  const unbanned = () => {
    fetchUnbanned(params.postId);
    post.isBanned = false;
    postChange({ ...post });
  };

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
        {post.isBanned ? (
          <button onClick={unbanned}>Разбанить</button>
        ) : (
          <button onClick={banned}>Забанить</button>
        )}
        <div>
          <Link to={`/users/${post.user.name}`}>{post.user.name}</Link>
        </div>
        <div>{"#" + post.tags.join(" #")}</div>{" "}
        <div>
          {post.images.map((image, index) => (
            <img
              key={index}
              src={PostApi.getPicture(post.id, image)}
              alt=""
              style={{ width: "100px" }}
            />
          ))}
        </div>
        <Link to={`/${params.postId}/change`}>Изменить</Link>
      </div>
    )
  );
};

export default Post;
