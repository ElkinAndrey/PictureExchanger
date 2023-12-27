import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetching from "../../../hooks/useFetching";
import UserApi from "../../../api/userApi";
import PaginationBar from "../../forms/PaginationBar/PaginationBar";
import PostApi from "../../../api/postApi";
import IsBanned from "../../../views/IsBanned/IsBanned";
import PostInPosts from "../../../views/PostInPosts/PostInPosts";
import InputString from "../../../views/InputString/InputString";
import Empty from "../../../views/Empty/Empty";
import Count from "../../../views/Count/Count";
import Policy from "../../../utils/policy";
import Context from "../../../context/context";

const User = () => {
  // КОНСТАНТЫ
  /** Количество книг на странице */
  const pageSize = 4;
  /** Страница по умолчанию */
  const basePage = 1;
  /** Параметры поиска по умолчанию */
  const baseParams = { start: 0, length: pageSize, name: "" };
  const { params } = useContext(Context);

  // ПЕРЕМЕННЫЕ
  const urlParams = useParams(); // Параметры из URL
  const [user, userChange] = useState(null); // Пользователь
  const [posts, postsChange] = useState([]); // Посты
  const [postsCount, postsCountChange] = useState([]); // Количество постов
  const [page, pageChange] = useState(basePage); // Страница
  const [paramsSearch, paramsSearchChange] = useState({ ...baseParams }); // Параметры плучения постов
  const [newParams, newParamsChange] = useState({ ...baseParams }); // Новые параметры получения постов

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ

  /** Получение пользователя по имени */
  const [fetchUser, isLoadingUser, errorUser] = useFetching(async (name) => {
    const response = await UserApi.getByName(name);
    userChange(response.data);
  });

  /** Получение постов пользователя */
  const [fetchPosts, isLoadingPosts, errorPosts] = useFetching(
    async (name, params) => {
      const response = await UserApi.getPostsByName(name, params);
      postsChange(response.data);
    }
  );

  /** Получение количества постов у пользователя*/
  const [fetchPostsCount, isLoadingPostsCount, errorPostsCount] = useFetching(
    async (name, params) => {
      const response = await UserApi.getPostsCountByName(name, params);
      postsCountChange(response.data);
    }
  );

  /** Забанить пост */
  const [fetchBannedPost, isLoadingBannedPost, errorBannedPost] = useFetching(
    async (id) => {
      await PostApi.banned(id);
    }
  );

  /** Разбанить пост */
  const [fetchUnbannedPost, isLoadingUnbannedPost, errorUnbannedPost] =
    useFetching(async (id) => {
      await PostApi.unbanned(id);
    });

  /** Забанить пользователя */
  const [fetchBannedUser, isLoadingBannedUser, errorBannedUser] = useFetching(
    async (name) => {
      await UserApi.banned(name);
    }
  );

  /** Разбанить пользователя */
  const [fetchUnbannedUser, isLoadingUnbannedUser, errorUnbannedUser] =
    useFetching(async (name) => {
      await UserApi.unbanned(name);
    });

  // ФУНКЦИИ

  /** Загрузить все данные на страницу заново */
  const updatePostsFetch = (name, params) => {
    fetchPosts(name, params);
    fetchPostsCount(name, params);
  };

  /** Действия при установке страницы */
  const setPage = (page) => {
    paramsSearch.start = (page - 1) * pageSize;
    paramsSearch.length = pageSize;
    pageChange(page);
    updatePostsFetch(urlParams.name, paramsSearch);
    paramsSearchChange({ ...paramsSearch });
  };

  /** Обновить параметры поиска */
  const update = () => {
    newParams.start = (basePage - 1) * pageSize;
    newParams.length = pageSize;
    pageChange(basePage);
    paramsSearchChange(newParams);
    updatePostsFetch(urlParams.name, newParams);
  };

  /** Установить параметры поиска по умолчанию */
  const reset = () => {
    pageChange(basePage);
    paramsSearchChange({ ...baseParams });
    newParamsChange({ ...baseParams });
    updatePostsFetch(urlParams.name, { ...baseParams });
  };

  /** Забанить */
  const bannedPost = (id) => {
    fetchBannedPost(id);
    let newPosts = posts.map((post) => {
      if (post.id === id) post.isBanned = true;
      return post;
    });
    postsChange(newPosts);
  };

  /** Разбанить */
  const unbannedPost = (id) => {
    fetchUnbannedPost(id);
    postsChange(
      posts.map((post) => {
        if (post.id === id) post.isBanned = false;
        return post;
      })
    );
  };

  /** Забанить */
  const bannedUser = () => {
    fetchBannedUser(user.name);
    user.isBanned = true;
    userChange({ ...user });
  };

  /** Разбанить */
  const unbannedUser = () => {
    fetchUnbannedUser(user.name);
    user.isBanned = false;
    userChange({ ...user });
  };

  // ДЕЙСТВИЯ

  /** Действия при загрузке страницы */
  useEffect(() => {
    fetchUser(urlParams.name);
    updatePostsFetch(urlParams.name, paramsSearch);
  }, []);

  // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
  const newParamsNameChange = (value) => {
    newParams.name = value;
    newParamsChange({ ...newParams });
  };

  // Пока пользователь не пришел
  if (!user) return <Empty />;

  return (
    <div>
      <h1>Пользователь</h1>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.isBanned}</div>
      {Policy.isAdmin(params.role) && (
        <IsBanned
          isBanned={user.isBanned}
          banned={bannedUser}
          unbanned={unbannedUser}
        />
      )}
      <InputString value={newParams.name} valueChange={newParamsNameChange} />
      <Count count={postsCount} />
      <PaginationBar
        min={1}
        max={Math.ceil(postsCount / pageSize)}
        page={page}
        setPage={setPage}
        centerCount={1}
      />
      <button onClick={update}>Обновить</button>
      <button onClick={reset}>Сбросить</button>
      {posts.map((post) => (
        <PostInPosts
          key={post.id}
          post={post}
          banned={bannedPost}
          unbanned={unbannedPost}
        />
      ))}
    </div>
  );
};

export default User;
