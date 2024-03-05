import React, { useEffect, useState } from "react";
import UserApi from "../../api/userApi";
import useFetching from "../../hooks/useFetching";
import LeftMenu from "../../layout/LeftMenu/LeftMenu";
import classes from "./Users.module.css";
import UsersTable from "../../widgets/UsersTable/UsersTable";
import InputSearch from "../../shared/InputSearch/InputSearch";
import If from "../../shared/If/If";
import RadioButtons from "../../shared/RadioButtons/RadioButtons";
import Loader from "../../shared/Loader/Loader";
import PaginationBar from "../../shared/PaginationBar/PaginationBar";

/** Значения для сортировки */
const sortValues = [
  { value: "1", text: "Сортировка по имени" },
  { value: "2", text: "Сортировка по дате регистрации" },
  { value: "3", text: "Сортировка по дате бана" },
];

/** Значения для фильтрации */
const filterValues = [
  { value: "1", text: "Все" },
  { value: "2", text: "Только забаненные" },
  { value: "3", text: "Только не забаненные" },
];

/** Страница с пользователями */
const Users = () => {
  const pageSize = 4;
  const basePage = 1;
  const baseParams = {
    start: 0,
    length: pageSize,
    name: "",
    isBanned: null,
    isSortByRegistrationDate: false,
    isSortByBannedDate: false,
  };
  const [users, usersChange] = useState([]);
  const [usersCount, usersCountChange] = useState([]); // Количество постов
  const [page, pageChange] = useState(basePage); // Страница
  const [params, paramsChange] = useState({ ...baseParams }); // Параметры плучения постов
  const [newParams, newParamsChange] = useState({ ...baseParams }); // Новые параметры получения постов

  const [fetchUsers, isLoadingUsers, errorUsers] = useFetching(async (p) => {
    const response = await UserApi.get(p);
    usersChange(response.data);
  });

  const [fetchUsersCount, isLoadingUsersCount, errorUsersCount] = useFetching(
    async (p) => {
      const response = await UserApi.getCount(p);
      usersCountChange(response.data);
    }
  );

  // ФУНКЦИИ

  /** Загрузить все данные на страницу заново */
  const updateFetch = (params) => {
    fetchUsers(params);
    fetchUsersCount(params);
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

  // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
  const newParamsNameChange = (value) => {
    newParams.name = value;
    newParamsChange({ ...newParams });
  };

  const setSortMode = (value) => {
    if (value === "1") {
      newParams.isSortByRegistrationDate = false;
      newParams.isSortByBannedDate = false;
    } else if (value === "2") {
      newParams.isSortByRegistrationDate = true;
      newParams.isSortByBannedDate = false;
    } else if (value === "3") {
      newParams.isSortByRegistrationDate = false;
      newParams.isSortByBannedDate = true;
    }
    newParamsChange({ ...newParams });
  };

  const setFilterMode = (value) => {
    if (value === "1") newParams.isBanned = null;
    else if (value === "2") newParams.isBanned = true;
    else if (value === "3") newParams.isBanned = false;
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
      <div className={classes.radioButtons}>
        <RadioButtons
          text={"Сортировать"}
          values={sortValues}
          setValue={setSortMode}
        />
        <RadioButtons
          text={"Фильтровать"}
          values={filterValues}
          setValue={setFilterMode}
        />
      </div>

      <PaginationBar
        min={1}
        max={Math.ceil(usersCount / pageSize)}
        page={page}
        setPage={setPage}
        centerCount={1}
        className={classes.paginationBar}
      />
      <If value={!isLoadingUsers}>
        <UsersTable users={users} />
      </If>
      <If value={isLoadingUsers || isLoadingUsersCount}>
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

export default Users;
