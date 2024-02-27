import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetching from "../../../hooks/useFetching";
import UserApi from "../../../api/userApi";
import PaginationBar from "../../forms/PaginationBar/PaginationBar";
import PostApi from "../../../api/postApi";
import PostInPosts from "../../../views/PostInPosts/PostInPosts";
import Context from "../../../context/context";
import RoleApi from "../../../api/roleApi";
import LeftMenu from "../../layout/LeftMenu/LeftMenu";
import InputSearch from "../../../views/InputSearch/InputSearch";
import classes from "./User.module.css";
import getOnlyDate from "../../../utils/getOnlyDate";
import If from "../../../views/If/If";
import BigLoader from "../../forms/BigLoader/BigLoader";
import Policy from "../../../utils/policy";
import IsBanned from "../../../views/IsBanned/IsBanned";
import Loader from "../../forms/Loader/Loader";
import DropDownMenu from "../../forms/DropDownMenu/DropDownMenu";
import roles from "../../../constants/roles";
import LoadButton from "../../forms/LoadButton/LoadButton";

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
      user.isBanned = true;
    }
  );

  /** Разбанить пользователя */
  const [fetchUnbannedUser, isLoadingUnbannedUser, errorUnbannedUser] =
    useFetching(async (name) => {
      await UserApi.unbanned(name);
      user.isBanned = false;
    });
  //#endregion

  //#region ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ (РАБОТА С РОЛЯМИ)

  /** Выдать роль пользователя */
  const [fetchGiveUser, isLoadingGiveUser, errorGiveUser] = useFetching(
    async () => {
      await RoleApi.giveUser(urlParams.name);
      user.role = roles.user;
    }
  );

  /** Выдать роль менедрежа */
  const [fetchGiveManager, isLoadingGiveManager, errorGiveManager] =
    useFetching(async () => {
      await RoleApi.giveManager(urlParams.name);
      user.role = roles.manager;
    });

  /** Выдать роль суперменедрежа */
  const [
    fetchGiveSuperManager,
    isLoadingGiveSuperManager,
    errorGiveSuperManager,
  ] = useFetching(async () => {
    await RoleApi.giveSuperManager(urlParams.name);
    user.role = roles.superManager;
  });

  /** Выдать роль администратора */
  const [fetchGiveAdmin, isLoadingGiveAdmin, errorGiveAdmin] = useFetching(
    async () => {
      await RoleApi.giveAdmin(urlParams.name);
      user.role = roles.admin;
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
  };

  /** Разбанить */
  const unbannedUser = () => {
    fetchUnbannedUser(user.name);
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
  if (!user)
    return (
      <LeftMenu>
        <BigLoader className={classes.loader} />
      </LeftMenu>
    );

  return (
    <LeftMenu>
      <div className={classes.header}>
        <div className={classes.userBody}>
          <img
            src="/images/profile.png"
            alt=""
            className={classes.userImages}
          />
          <div>
            <div className={classes.name}>{user.name}</div>
            <div className={classes.userInfo}>{`Email: ${user.email}`}</div>
            <div className={classes.userInfo}>{`Дата регистрации: ${getOnlyDate(
              user.registrationDate
            )}`}</div>
          </div>
        </div>
        <div>
          <div className={classes.headerButtons}>
            <div>
              <If value={user.isBanned}>
                <img
                  className={classes.isBanned}
                  src="/images/banned.png"
                  alt=""
                  title="Пользователь забанен"
                />
              </If>
            </div>
            <div>
              <If value={Policy.isAdmin(params.role)}>
                <button
                  className={classes.banButton}
                  onClick={user.isBanned ? unbannedUser : bannedUser}
                >
                  <If value={!isLoadingBannedUser && !isLoadingUnbannedUser}>
                    {user.isBanned ? "Разбанить" : "Забанить"}
                  </If>
                  <If value={isLoadingBannedUser || isLoadingUnbannedUser}>
                    <div className={classes.loader}>
                      <Loader color="#4177b5" />
                    </div>
                  </If>
                </button>
              </If>
            </div>
            <If
              value={
                Policy.isSuperManager(params.role) &&
                Policy.firstRoleBigger(params.role, user.role)
              }
            >
              <DropDownMenu text={"Роль"}>
                <div>
                  <div>{`Роль ${user.role}`}</div>
                  <LoadButton
                    className={classes.roleButton}
                    text={"Пользователь"}
                    onClick={fetchGiveUser}
                    disabled={user.role === roles.user}
                    load={isLoadingGiveUser}
                    width="100%"
                  />
                  <LoadButton
                    className={classes.roleButton}
                    text={"Менеджер"}
                    onClick={fetchGiveManager}
                    disabled={user.role === roles.manager}
                    load={isLoadingGiveManager}
                    width="100%"
                  />
                  <If value={Policy.isAdmin(params.role)}>
                    <LoadButton
                      className={classes.roleButton}
                      text={"Суперменеджер"}
                      onClick={fetchGiveSuperManager}
                      disabled={user.role === roles.superManager}
                      load={isLoadingGiveSuperManager}
                      width="100%"
                    />
                  </If>
                  <If value={Policy.isSuperAdmin(params.role)}>
                    <LoadButton
                      className={classes.roleButton}
                      text={"Администратор"}
                      onClick={fetchGiveAdmin}
                      disabled={user.role === roles.admin}
                      load={isLoadingGiveAdmin}
                      width="100%"
                    />
                  </If>
                </div>
              </DropDownMenu>
            </If>
          </div>
        </div>
      </div>
      <InputSearch
        value={newParams.name}
        valueChange={newParamsNameChange}
        update={update}
        reset={reset}
        className={classes.search}
      />
      <PaginationBar
        min={1}
        max={Math.ceil(postsCount / pageSize)}
        page={page}
        setPage={setPage}
        centerCount={1}
      />
      <If value={!isLoadingPosts}>
        {posts.map((post) => (
          <PostInPosts
            key={post.id}
            post={post}
            banned={bannedPost}
            unbanned={unbannedPost}
          />
        ))}
      </If>
      <If value={isLoadingPosts}>
        <BigLoader className={classes.loader} />
      </If>
      <If value={posts.length === 0 && !isLoadingPosts}>
        <div className={classes.emptyList}>Нет постов</div>
      </If>
    </LeftMenu>
  );
};

export default User;
