import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetching from "../../../hooks/useFetching";
import UserApi from "../../../api/userApi";
import PaginationBar from "../../forms/PaginationBar/PaginationBar";
import PostApi from "../../../api/postApi";

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
    updatePostsFetch(urlParams.name, params);
  }, []);

  return (
    <div>
      <h1>Пользователь</h1>
      <div>
        {user && (
          <div>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.isBanned}</div>
            <div>
              {user.isBanned ? (
                <button onClick={unbannedUser}>Разбанить</button>
              ) : (
                <button onClick={bannedUser}>Забанить</button>
              )}
            </div>
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
            {post.isBanned ? (
              <button onClick={() => unbannedPost(post.id)}>Разбанить</button>
            ) : (
              <button onClick={() => bannedPost(post.id)}>Забанить</button>
            )}
            <div>{"#" + post.tags.join(" #")}</div>
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
            <Link to={`/${post.id}`}>Открыть</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
