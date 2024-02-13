import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import RoleApi from "../../../api/roleApi";
import Bool from "../../../views/Bool/Bool";
import LeftMenu from "../../layout/LeftMenu/LeftMenu";

const User = () => {
  //#region КОНСТАНТЫ

  const pageSize = 4;
  const basePage = 1;
  const baseParams = { start: 0, length: pageSize, name: "" };
  const { params } = useContext(Context);

  //#endregion

  //#region ПЕРЕМЕННЫЕ

  const urlParams = useParams(); // Параметры из URL
  const [user, userChange] = useState(null); // Пользователь
  const [posts, postsChange] = useState([]); // Посты
  const [postsCount, postsCountChange] = useState([]); // Количество постов
  const [page, pageChange] = useState(basePage); // Страница
  const [paramsSearch, paramsSearchChange] = useState({ ...baseParams }); // Параметры плучения постов
  const [newParams, newParamsChange] = useState({ ...baseParams }); // Новые параметры получения постов

  //#endregion

  //#region ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ

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
  //#endregion

  //#region ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ (РАБОТА С РОЛЯМИ)

  /** Выдать роль пользователя */
  const [fetchGiveUser, isLoadingGiveUser, errorGiveUser] = useFetching(
    async () => {
      await RoleApi.giveUser(urlParams.name);
    }
  );

  /** Выдать роль менедрежа */
  const [fetchGiveManager, isLoadingGiveManager, errorGiveManager] =
    useFetching(async () => {
      await RoleApi.giveManager(urlParams.name);
    });

  /** Выдать роль суперменедрежа */
  const [
    fetchGiveSuperManager,
    isLoadingGiveSuperManager,
    errorGiveSuperManager,
  ] = useFetching(async () => {
    await RoleApi.giveSuperManager(urlParams.name);
  });

  /** Выдать роль администратора */
  const [fetchGiveAdmin, isLoadingGiveAdmin, errorGiveAdmin] = useFetching(
    async () => {
      await RoleApi.giveAdmin(urlParams.name);
    }
  );

  //#endregion

  //#region ФУНКЦИИ

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

  //#endregion

  //#region ДЕЙСТВИЯ

  /** Действия при загрузке страницы */
  useEffect(() => {
    fetchUser(urlParams.name);
    updatePostsFetch(urlParams.name, paramsSearch);
  }, []);

  //#endregion

  //#region ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

  const newParamsNameChange = (value) => {
    newParams.name = value;
    newParamsChange({ ...newParams });
  };

  //#endregion

  // Пока пользователь не пришел
  if (!user) return <Empty />;

  return (
    <LeftMenu>
      <h1>Пользователь</h1>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.registrationDate}</div>
      {Policy.isManagerOrOwner(params.role, params.id, user.id) && (
        <>
          <Bool
            value={user.isBanned}
            trueText="Забанен"
            fasleText="Не забанен"
          />
          <div>{user.role}</div>
        </>
      )}
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
      <div>
        {Policy.isSuperManager(params.role) &&
          Policy.firstRoleBigger(params.role, user.role) && (
            <button onClick={fetchGiveUser}>Выдать пользователя</button>
          )}
        {Policy.isSuperManager(params.role) &&
          Policy.firstRoleBigger(params.role, user.role) && (
            <button onClick={fetchGiveManager}>Выдать менеджера</button>
          )}
        {Policy.isAdmin(params.role) &&
          Policy.firstRoleBigger(params.role, user.role) && (
            <button onClick={fetchGiveSuperManager}>
              Выдать суперменеджера
            </button>
          )}
        {Policy.isSuperAdmin(params.role) &&
          Policy.firstRoleBigger(params.role, user.role) && (
            <button onClick={fetchGiveAdmin}>Выдать администратора</button>
          )}
      </div>
      {posts.map((post) => (
        <PostInPosts
          key={post.id}
          post={post}
          banned={bannedPost}
          unbanned={unbannedPost}
        />
      ))}
    </LeftMenu>
  );
};

export default User;
