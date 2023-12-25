import React, { useEffect, useState } from "react";
import useFetching from "../../../hooks/useFetching";
import PostApi from "../../../api/postApi";
import PaginationBar from "../../forms/PaginationBar/PaginationBar";
import { Link } from "react-router-dom";
import InputString from "../../../views/InputString/InputString";
import Count from "../../../views/Count/Count";
import PostInPosts from "../../../views/PostInPosts/PostInPosts";

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

  /** Забанить */
  const banned = (id) => {
    fetchBanned(id);
    let newPosts = posts.map((post) => {
      if (post.id === id) post.isBanned = true;
      return post;
    });
    postsChange(newPosts);
  };

  /** Разбанить */
  const unbanned = (id) => {
    fetchUnbanned(id);
    postsChange(
      posts.map((post) => {
        if (post.id === id) post.isBanned = false;
        return post;
      })
    );
  };

  // ДЕЙСТВИЯ

  /** Действия при загрузке страницы */
  useEffect(() => {
    updateFetch(params);
  }, []);

  // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
  const newParamsNameChange = (value) => {
    newParams.name = value;
    newParamsChange({ ...newParams });
  };

  return (
    <div>
      <h1>Главная</h1>
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
          banned={banned}
          unbanned={unbanned}
        />
      ))}
    </div>
  );
};

export default Posts;
