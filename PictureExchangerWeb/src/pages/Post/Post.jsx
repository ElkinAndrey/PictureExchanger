import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetching from "../../hooks/useFetching";
import PostApi from "../../api/postApi";
import PostInPosts from "../../widgets/PostInPosts/PostInPosts";
import LeftMenu from "../../layout/LeftMenu/LeftMenu";
import Empty from "../../shared/Empty/Empty";

/** Страница с постом */
const Post = () => {
  // КОНСТАНТЫ
  const params = useParams(); // Параметры из URL

  // ПЕРЕМЕННЫЕ
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
  }, [params]);

  // Пока пост не пришел
  if (!post) return <Empty />;

  return (
    <LeftMenu>
      <PostInPosts post={post} isDeleted={true} openable={false} />
    </LeftMenu>
  );
};

export default Post;
