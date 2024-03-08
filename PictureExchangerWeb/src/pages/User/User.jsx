import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetching from "../../hooks/useFetching";
import UserApi from "../../api/userApi";
import PostInPosts from "../../widgets/PostInPosts/PostInPosts";
import Context from "../../context/context";
import classes from "./User.module.css";
import InputSearch from "../../shared/InputSearch/InputSearch";
import If from "../../shared/If/If";
import Loader from "../../shared/Loader/Loader";
import PaginationBar from "../../shared/PaginationBar/PaginationBar";
import notificationStatus from "../../constants/notificationStatus";
import UserHeader from "../../widgets/UserHeader/UserHeader";

const pageSize = 4;
const basePage = 1;
const baseParams = { start: 0, length: pageSize, name: "" };

/** Страница пользователя */
const User = () => {
  // КОНСТАНТЫ
  const { addNotification } = useContext(Context);

  // ПЕРЕМЕННЫЕ
  const urlParams = useParams(); // Параметры из URL
  const [user, userChange] = useState({}); // Пользователь
  const [posts, postsChange] = useState([]); // Посты
  const [postsCount, postsCountChange] = useState([]); // Количество постов
  const [page, pageChange] = useState(basePage); // Страница
  const [paramsSearch, paramsSearchChange] = useState({ ...baseParams }); // Параметры плучения постов
  const [newParams, newParamsChange] = useState({ ...baseParams }); // Новые параметры получения постов

  // КОЛБЭКИ
  const userCallback = async (name) => {
    const response = await UserApi.getByName(name);
    userChange(response.data);
  };

  const postsCallback = async (name, p) => {
    const response = await UserApi.getPostsByName(name, p);
    postsChange(response.data);
  };

  const postsCountCallback = async (name, p) => {
    const response = await UserApi.getPostsCountByName(name, p);
    postsCountChange(response.data);
  };

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ
  const [fetchUser, isLoadingUser, errorUser] = useFetching(userCallback, true);
  const [fetchPosts, isLoadingPosts, errorPosts] = useFetching(postsCallback);
  const [fetchPostsCount, isLoadingPostsCount, errorPostsCount] =
    useFetching(postsCountCallback);

  // ФУНКЦИИ
  const updatePostsFetch = (name, p) => {
    fetchPosts(name, p);
    fetchPostsCount(name, p);
  };

  const setPage = (page) => {
    paramsSearch.start = (page - 1) * pageSize;
    paramsSearch.length = pageSize;
    pageChange(page);
    updatePostsFetch(urlParams.name, paramsSearch);
    paramsSearchChange({ ...paramsSearch });
  };

  const update = () => {
    newParams.start = (basePage - 1) * pageSize;
    newParams.length = pageSize;
    pageChange(basePage);
    paramsSearchChange(newParams);
    updatePostsFetch(urlParams.name, newParams);
  };

  const reset = () => {
    pageChange(basePage);
    paramsSearchChange({ ...baseParams });
    newParamsChange({ ...baseParams });
    updatePostsFetch(urlParams.name, { ...baseParams });
  };

  const newParamsNameChange = (value) => {
    newParams.name = value;
    newParamsChange({ ...newParams });
  };

  useEffect(() => {
    fetchUser(urlParams.name);
    updatePostsFetch(urlParams.name, paramsSearch);
  }, [urlParams.name]);

  useEffect(() => {
    if (errorUser !== null && errorUser?.response === undefined)
      addNotification({
        title: "Ошибка",
        text: "Сервер не отвечает. Не удалось данные пользователя.",
        status: notificationStatus.error,
      });
  }, [errorUser]);

  useEffect(() => {
    if (errorPosts !== null)
      addNotification({
        title: "Ошибка",
        text: "Сервер не отвечает. Не удалось получить посты пользователя.",
        status: notificationStatus.error,
      });
  }, [errorPosts]);

  useEffect(() => {
    if (errorPostsCount !== null)
      addNotification({
        title: "Ошибка",
        text: "Сервер не отвечает. Не удалось получить количество постов.",
        status: notificationStatus.error,
      });
  }, [errorPostsCount]);

  if (errorUser?.response?.status === 404)
    return (
      <div className={classes.errorUserNotFound}>Пользователь не найден</div>
    );

  if (errorUser !== null) return <></>;

  return (
    <div>
      <If value={!isLoadingUser}>
        <UserHeader user={user} />
        <InputSearch
          value={newParams.name}
          valueChange={newParamsNameChange}
          update={update}
          reset={reset}
          className={classes.search}
        />
      </If>
      <If value={!isLoadingPostsCount}>
        <PaginationBar
          min={1}
          max={Math.ceil(postsCount / pageSize)}
          page={page}
          setPage={setPage}
          centerCount={1}
        />
      </If>
      <If value={!isLoadingPosts}>
        {posts.map((post) => (
          <PostInPosts key={post.id} post={post} />
        ))}
      </If>
      <If value={isLoadingPosts}>
        <Loader
          className={classes.loader}
          color={"#4177b5"}
          width={"50px"}
          thickness={"4px"}
        />
      </If>
      <If value={posts.length === 0 && !isLoadingPosts && !isLoadingUser}>
        <div className={classes.emptyList}>Нет постов</div>
      </If>
    </div>
  );
};

export default User;
