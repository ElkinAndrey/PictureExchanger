import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetching from "../../hooks/useFetching";
import PostApi from "../../api/postApi";
import PostInPosts from "../../widgets/PostInPosts/PostInPosts";
import LeftMenu from "../../layout/LeftMenu/LeftMenu";
import Empty from "../../shared/Empty/Empty";

/** Страница с постом */
const Post = () => {
  // КОНСТАНТЫ
  const navigate = useNavigate(); // Функция перехода на другую страницу
  const params = useParams(); // Параметры из URL

  // ПЕРЕМЕННЫЕ
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

  /** Удалить пост */
  const [fetchDeletePost, isLoadingDeletePost, errorDeletePost] = useFetching(
    async (id) => {
      await PostApi.delete(id);
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

  /** Удалить пост */
  const deletePost = () => {
    fetchDeletePost(params.postId);
    navigate("/");
  };

  // ДЕЙСТВИЯ

  /** Действия при загрузке страницы */
  useEffect(() => {
    fetchPost(params.postId);
  }, []);

  // Пока пост не пришел
  if (!post) return <Empty />;

  return (
    <LeftMenu>
      <PostInPosts
        post={post}
        banned={banned}
        unbanned={unbanned}
        deletePost={deletePost}
        openable={false}
      />
    </LeftMenu>
  );
};

export default Post;
