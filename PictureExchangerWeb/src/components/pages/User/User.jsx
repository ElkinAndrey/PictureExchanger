import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetching from "../../../hooks/useFetching";
import UserApi from "../../../api/userApi";
import PaginationBar from "../../forms/PaginationBar/PaginationBar";

/** Количество книг на странице */
const pageSize = 4;

/** Страница по умолчанию */
const basePage = 1;

/** Параметры поиска по умолчанию */
const baseParams = { start: 0, length: pageSize, name: "" };

const User = () => {
  // ПЕРЕМЕННЫЕ
  const urlParams = useParams(); // Параметры из URL
  const [user, userChange] = useState(null); // Пользователь
  const [posts, postsChange] = useState([]); // Посты
  const [postsCount, postsCountChange] = useState([]); // Количество постов
  const [page, pageChange] = useState(basePage); // Страница
  const [params, paramsChange] = useState({ ...baseParams }); // Параметры плучения постов
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

  // ФУНКЦИИ

  /** Загрузить все данные на страницу заново */
  const updatePostsFetch = (name, params) => {
    fetchPosts(name, params);
    fetchPostsCount(name, params);
  };

  /** Действия при установке страницы */
  const setPage = (page) => {
    params.start = (page - 1) * pageSize;
    params.length = pageSize;
    pageChange(page);
    updatePostsFetch(urlParams.name, params);
    paramsChange({ ...params });
  };

  /** Обновить параметры поиска */
  const update = () => {
    newParams.start = (basePage - 1) * pageSize;
    newParams.length = pageSize;
    pageChange(basePage);
    paramsChange(newParams);
    updatePostsFetch(urlParams.name, newParams);
  };

  /** Установить параметры поиска по умолчанию */
  const reset = () => {
    pageChange(basePage);
    paramsChange({ ...baseParams });
    newParamsChange({ ...baseParams });
    updatePostsFetch(urlParams.name, { ...baseParams });
  };

  // ДЕЙСТВИЯ

  /** Действия при загрузке страницы */
  useEffect(() => {
    fetchUser(urlParams.name);
    updatePostsFetch(urlParams.name, params);
  }, []);

  return (
    <div>
      <div>
        {user && (
          <div>
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        )}
      </div>
      <div>
        <input
          value={newParams.name}
          onChange={(e) => {
            newParams.name = e.target.value;
            newParamsChange({ ...newParams });
          }}
        />
        <div>{`Количество: ${postsCount}`}</div>
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
          <div
            key={post.id}
            style={{ border: "3px black solid", margin: "5px 0px" }}
          >
            <div>{post.name}</div>
            <div>{post.date}</div>
            <div>{post.isPrivate ? "Приватный" : "Публичный"}</div>
            <div>{post.isBanned ? "Забанен" : "Не забанен"}</div>
            <div>{"#" + post.tags.join(" #")}</div>
            <div>{post.images.join(", ")}</div>
            <Link to={`/${post.id}`}>Открыть</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
