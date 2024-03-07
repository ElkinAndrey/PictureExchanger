import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetching from "../../hooks/useFetching";
import UserApi from "../../api/userApi";
import PostInPosts from "../../widgets/PostInPosts/PostInPosts";
import Context from "../../context/context";
import RoleApi from "../../api/roleApi";
import LeftMenu from "../../layout/LeftMenu/LeftMenu";
import classes from "./User.module.css";
import getOnlyDate from "../../utils/getOnlyDate";
import Policy from "../../utils/policy";
import DropDownMenu from "../../shared/DropDownMenu/DropDownMenu";
import roles from "../../constants/roles";
import InputSearch from "../../shared/InputSearch/InputSearch";
import If from "../../shared/If/If";
import Loader from "../../shared/Loader/Loader";
import PaginationBar from "../../shared/PaginationBar/PaginationBar";
import LoadButton from "../../shared/LoadButton/LoadButton";

const pageSize = 4;
const basePage = 1;
const baseParams = { start: 0, length: pageSize, name: "" };

/** Страница пользователя */
const User = () => {
  // КОНСТАНТЫ
  const { params } = useContext(Context);

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

  const bannedUserCallback = async (name) => {
    await UserApi.banned(name);
    user.isBanned = true;
  };

  const unbannedUserCallback = async (name) => {
    await UserApi.unbanned(name);
    user.isBanned = false;
  };

  const giveUserCallback = async () => {
    await RoleApi.giveUser(urlParams.name);
    user.role = roles.user;
  };

  const giveManagerCallback = async () => {
    await RoleApi.giveManager(urlParams.name);
    user.role = roles.manager;
  };

  const giveSuperManagerCallback = async () => {
    await RoleApi.giveSuperManager(urlParams.name);
    user.role = roles.superManager;
  };

  const giveAdminCallback = async () => {
    await RoleApi.giveAdmin(urlParams.name);
    user.role = roles.admin;
  };

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ
  const [fetchUser, isLoadingUser, errorUser] = useFetching(userCallback);
  const [fetchPosts, isLoadingPosts, errorPosts] = useFetching(postsCallback);
  const [fetchPostsCount, isLoadingPostsCount, errorPostsCount] =
    useFetching(postsCountCallback);
  const [fetchBannedUser, isLoadingBannedUser, errorBannedUser] =
    useFetching(bannedUserCallback);
  const [fetchUnbannedUser, isLoadingUnbannedUser, errorUnbannedUser] =
    useFetching(unbannedUserCallback);
  const [fetchGiveUser, isLoadingGiveUser, errorGiveUser] =
    useFetching(giveUserCallback);
  const [fetchGiveManager, isLoadingGiveManager, errorGiveManager] =
    useFetching(giveManagerCallback);
  const [fetchGiveSuperManag, isLoadingGiveSuperManag, errorGiveSuperManag] =
    useFetching(giveSuperManagerCallback);
  const [fetchGiveAdmin, isLoadingGiveAdmin, errorGiveAdmin] =
    useFetching(giveAdminCallback);

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

  const bannedUser = () => {
    fetchBannedUser(user.name);
  };

  const unbannedUser = () => {
    fetchUnbannedUser(user.name);
  };

  useEffect(() => {
    fetchUser(urlParams.name);
    updatePostsFetch(urlParams.name, paramsSearch);
  }, [urlParams.name]);

  const newParamsNameChange = (value) => {
    newParams.name = value;
    newParamsChange({ ...newParams });
  };

  // Пока пользователь не пришел
  if (isLoadingUser)
    return (
      <Loader
        className={classes.loader}
        color={"#4177b5"}
        width={"50px"}
        thickness={"4px"}
      />
    );

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.userBody}>
          <img
            src="/images/profile.png"
            alt=""
            className={classes.userImages}
          />
          <div>
            <div className={classes.name}>{user.name}</div>
            <div className={classes.userInfo}>
              {user.email !== null ? `Email: ${user.email}` : ``}
            </div>
            <div className={classes.userInfo}>
              {user.registrationDate !== null
                ? `Дата регистрации: ${getOnlyDate(user.registrationDate)}`
                : ``}
            </div>
          </div>
        </div>
        <div>
          <div className={classes.headerButtons}>
            <If value={user.isBanned}>
              <img
                className={classes.isBanned}
                src="/images/banned.png"
                alt=""
                title="Пользователь забанен"
              />
            </If>
            <If value={Policy.isAdmin(params?.role)}>
              <LoadButton
                text={user.isBanned ? "Разбанить" : "Забанить"}
                onClick={user.isBanned ? unbannedUser : bannedUser}
                load={isLoadingBannedUser || isLoadingUnbannedUser}
                width={"120px"}
                className={classes.banButton}
              />
            </If>
            <If
              value={
                Policy.isSuperManager(params?.role) &&
                Policy.firstRoleBigger(params?.role, user.role)
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
                  <If value={Policy.isAdmin(params?.role)}>
                    <LoadButton
                      className={classes.roleButton}
                      text={"Суперменеджер"}
                      onClick={fetchGiveSuperManag}
                      disabled={user.role === roles.superManager}
                      load={isLoadingGiveSuperManag}
                      width="100%"
                    />
                  </If>
                  <If value={Policy.isSuperAdmin(params?.role)}>
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
      <If value={posts.length === 0 && !isLoadingPosts}>
        <div className={classes.emptyList}>Нет постов</div>
      </If>
    </div>
  );
};

export default User;
