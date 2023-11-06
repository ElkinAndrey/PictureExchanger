import React, { useEffect, useState } from "react";
import useFetching from "../../../hooks/useFetching";
import PostApi from "../../../api/postApi";
import PaginationBar from "../../forms/PaginationBar/PaginationBar";
import { Link } from "react-router-dom";

/** Количество книг на странице */
const pageSize = 4;

/** Страница по умолчанию */
const basePage = 1;

/** Параметры поиска по умолчанию */
const baseParams = { start: 0, length: pageSize, name: "" };

const Posts = () => {
  // ПЕРЕМЕННЫЕ
  const [posts, postsChange] = useState([]); // Посты
  const [postsCount, postsCountChange] = useState([]); // Количество постов
  const [page, pageChange] = useState(basePage); // Страница
  const [params, paramsChange] = useState({ ...baseParams }); // Параметры плучения постов
  const [newParams, newParamsChange] = useState({ ...baseParams }); // Новые параметры получения постов

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ

  /** Получение постов */
  const [fetchPosts, isLoadingPosts, errorPosts] = useFetching(
    async (params) => {
      const response = await PostApi.get(params);
      postsChange(response.data);
    }
  );

  /** Получение количества постов */
  const [fetchPostsCount, isLoadingPostsCount, errorPostsCount] = useFetching(
    async (params) => {
      const response = await PostApi.count(params);
      postsCountChange(response.data);
    }
  );

  // ФУНКЦИИ

  /** Загрузить все данные на страницу заново */
  const updateFetch = (params) => {
    fetchPosts(params);
    fetchPostsCount(params);
  };

  /** Действия при установке страницы */
  const setPage = (page) => {
    params.start = (page - 1) * pageSize;
    params.length = pageSize;
    pageChange(page);
    updateFetch(params);
    paramsChange({ ...params });
  };

  /** Обновить параметры поиска */
  const update = () => {
    newParams.start = (basePage - 1) * pageSize;
    newParams.length = pageSize;
    pageChange(basePage);
    paramsChange(newParams);
    updateFetch(newParams);
  };

  /** Установить параметры поиска по умолчанию */
  const reset = () => {
    pageChange(basePage);
    paramsChange({ ...baseParams });
    newParamsChange({ ...baseParams });
    updateFetch({ ...baseParams });
  };

  // ДЕЙСТВИЯ

  /** Действия при загрузке страницы */
  useEffect(() => {
    updateFetch(params);
  }, []);

  return (
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
          <div>
            <Link to={`/users/${post.user.name}`}>{post.user.name}</Link>
          </div>
          <div>{"#" + post.tags.join(" #")}</div>
          <div>{post.images.join(", ")}</div>
          <Link to={`${post.id}`}>Открыть</Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;
