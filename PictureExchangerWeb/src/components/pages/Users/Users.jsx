import React, { useEffect, useState } from "react";
import UserApi from "../../../api/userApi";
import useFetching from "../../../hooks/useFetching";
import Bool from "../../../views/Bool/Bool";
import PaginationBar from "../../forms/PaginationBar/PaginationBar";
import InputString from "../../../views/InputString/InputString";
import Count from "../../../views/Count/Count";
import { Link } from "react-router-dom";
import LeftMenu from "../../layout/LeftMenu/LeftMenu";

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
  const [sortMode, sortModeChange] = useState("1");
  const [filterMode, filterModeChange] = useState("1");

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

  const setSortMode = (e) => {
    let value = e.target.value;
    sortModeChange(value);
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

  const setFilterMode = (e) => {
    let value = e.target.value;
    filterModeChange(value);
    if (value === "1") newParams.isBanned = null;
    else if (value === "2") newParams.isBanned = true;
    else if (value === "3") newParams.isBanned = false;
    newParamsChange({ ...newParams });
  };

  return (
    <LeftMenu>
      <h1>Главная</h1>
      <InputString value={newParams.name} valueChange={newParamsNameChange} />
      <Count count={usersCount} />
      <div>
        <b>Сортировать</b>
        <div>
          <label>Сортировка по имени</label>
          <input
            type="radio"
            name="radiosort"
            value="1"
            checked={sortMode === "1" ? true : false}
            onChange={setSortMode}
          />
        </div>
        <div>
          <label>Сортировка по дате регистрации</label>
          <input
            type="radio"
            name="radiosort"
            value="2"
            checked={sortMode === "2" ? true : false}
            onChange={setSortMode}
          />
        </div>
        <div>
          <label>Сортировка по дате бана</label>
          <input
            type="radio"
            name="radiosort"
            value="3"
            checked={sortMode === "3" ? true : false}
            onChange={setSortMode}
          />
        </div>
      </div>
      <div>
        <b>Фильтрация</b>
        <div>
          <label>Все</label>
          <input
            type="radio"
            name="radiofilter"
            value="1"
            checked={filterMode === "1" ? true : false}
            onChange={setFilterMode}
          />
        </div>
        <div>
          <label>Только забаненные</label>
          <input
            type="radio"
            name="radiofilter"
            value="2"
            checked={filterMode === "2" ? true : false}
            onChange={setFilterMode}
          />
        </div>
        <div>
          <label>Только не забаненные</label>
          <input
            type="radio"
            name="radiofilter"
            value="3"
            checked={filterMode === "3" ? true : false}
            onChange={setFilterMode}
          />
        </div>
      </div>
      <PaginationBar
        min={1}
        max={Math.ceil(usersCount / pageSize)}
        page={page}
        setPage={setPage}
        centerCount={1}
      />
      <button onClick={update}>Обновить</button>
      <button onClick={reset}>Сбросить</button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Имя</th>
            <th>Email</th>
            <th>Дата регистрации</th>
            <th>Роль</th>
            <th>Забанен ли</th>
            <th>Дата бана</th>
            <th>Открыть</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.registrationDate}</td>
              <td>{user.role}</td>
              <td>
                <Bool
                  value={user.isBanned}
                  trueText="Забанен"
                  fasleText="Не забанен"
                />
              </td>
              <td>{user.bannedDate}</td>
              <td>
                <Link to={`/users/${user.name}`}>Открыть</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </LeftMenu>
  );
};

export default Users;
