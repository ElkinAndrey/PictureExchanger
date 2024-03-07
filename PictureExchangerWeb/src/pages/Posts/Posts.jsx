import React, { useContext, useEffect, useState } from "react";
import useFetching from "../../hooks/useFetching";
import PostApi from "../../api/postApi";
import PostInPosts from "../../widgets/PostInPosts/PostInPosts";
import classes from "./Posts.module.css";
import LeftMenu from "../../layout/LeftMenu/LeftMenu";
import InputSearch from "../../shared/InputSearch/InputSearch";
import If from "../../shared/If/If";
import Loader from "../../shared/Loader/Loader";
import PaginationBar from "../../shared/PaginationBar/PaginationBar";
import Context from "../../context/context";
import notificationStatus from "../../constants/notificationStatus";

/** Количество книг на странице */
const pageSize = 4;

/** Страница по умолчанию */
const basePage = 1;

/** Параметры поиска по умолчанию */
const baseParams = { start: 0, length: pageSize, name: "" };

const postsNotification = {
  title: "Ошибка",
  text: "Сервер не отвечает. Не удалось получить посты.",
  status: notificationStatus.error,
};

const countNotification = {
  title: "Ошибка",
  text: "Сервер не отвечает. Не удалось получить количество постов.",
  status: notificationStatus.error,
};

/** Страница с постами */
const Posts = () => {
  // КОНСТАНТЫ
  const { addNotification } = useContext(Context);

  // ПЕРЕМЕННЫЕ
  const [posts, postsChange] = useState([]); // Посты
  const [postsCount, postsCountChange] = useState([]); // Количество постов
  const [page, pageChange] = useState(basePage); // Страница
  const [params, paramsChange] = useState({ ...baseParams }); // Параметры плучения постов
  const [newParams, newParamsChange] = useState({ ...baseParams }); // Новые параметры получения постов

  const postsCallback = async (params) => {
    const response = await PostApi.get(params);
    postsChange(response.data);
  };

  const countCallback = async (params) => {
    const response = await PostApi.count(params);
    postsCountChange(response.data);
  };

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ
  const [fetchPosts, loadPosts, errorPosts] = useFetching(postsCallback);
  const [fetchCount, loadCount, errorCount] = useFetching(countCallback);

  // ФУНКЦИИ

  /** Загрузить все данные на страницу заново */
  const updateFetch = (params) => {
    fetchPosts(params);
    fetchCount(params);
  };

  /** Действия при установке страницы */
  const setPage = (page) => {
    params.start = (page - 1) * pageSize;
    params.length = pageSize;
    pageChange(page);
    fetchPosts(params);
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

  // ЭФФЕКТЫ
  useEffect(() => {
    updateFetch(params);
  }, []);

  useEffect(() => {
    if (errorPosts !== null && errorPosts?.response === undefined)
      addNotification(postsNotification);
  }, [errorPosts]);

  useEffect(() => {
    if (errorCount !== null && errorCount?.response === undefined)
      addNotification(countNotification);
  }, [errorCount]);

  // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
  const newParamsNameChange = (value) => {
    newParams.name = value;
    newParamsChange({ ...newParams });
  };

  return (
    <LeftMenu>
      <InputSearch
        value={newParams.name}
        valueChange={newParamsNameChange}
        update={update}
        reset={reset}
        className={classes.search}
      />
      <If value={!loadCount}>
        <PaginationBar
          min={1}
          max={Math.ceil(postsCount / pageSize)}
          page={page}
          setPage={setPage}
          centerCount={1}
          className={classes.paginationBar}
        />
        <If value={posts.length === 0}>
          <div className={classes.emptyList}>Список пуст</div>
        </If>
      </If>
      <If value={!loadPosts}>
        {posts.map((post) => (
          <PostInPosts key={post.id} post={post} />
        ))}
      </If>
      <If value={loadPosts || loadCount}>
        <Loader
          className={classes.loader}
          color={"#4177b5"}
          width={"50px"}
          thickness={"4px"}
        />
      </If>
    </LeftMenu>
  );
};

export default Posts;
