import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetching from "../../hooks/useFetching";
import PostApi from "../../api/postApi";
import classes from "./ChangePost.module.css";
import Checkbox from "../../shared/Checkbox/Checkbox";
import Loader from "../../shared/Loader/Loader";
import Input from "../../shared/Input/Input";
import LoadButton from "../../shared/LoadButton/LoadButton";
import Context from "../../context/context";
import notificationStatus from "../../constants/notificationStatus";
import { useNavigate } from "react-router-dom";

/** Страница с изменением поста */
const ChangePost = () => {
  // КОНСТАНТЫ
  const { params, addNotification } = useContext(Context); // Параметры из URL
  const urlParams = useParams(); // Параметры из URL
  const navigate = useNavigate(); // Функция перехода на другую страницу

  // ПЕРЕМЕННЫЕ
  const [baseParams, baseParamsChange] = useState(null);
  const [name, nameChange] = useState("");
  const [isPrivate, isPrivateChange] = useState(false);
  const [tags, tagsChange] = useState([]);

  // КОЛБЭКИ
  const getPostCallback = async () => {
    let response = await PostApi.getById(urlParams.postId);
    if (params.id !== response.data.user.id) navigate("/");
    baseParamsChange({ ...response.data });
    nameChange(response.data.name);
    isPrivateChange(response.data.isPrivate);
    tagsChange(response.data.tags);
  };

  const changePostCallback = async () => {
    const params = {
      name: name,
      isPrivate: isPrivate,
      tags: tags,
    };
    await PostApi.change(urlParams.postId, params);
    baseParamsChange(params);
    addNotification({
      title: "Изменение поста",
      text: "Пост успешно изменен",
      status: notificationStatus.successful,
    });
  };

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ
  const [fetchGetPost, isLoadingGetPost, errorGetPost] =
    useFetching(getPostCallback);
  const [fetchChangePost, isLoadingChangePost, errorChangePost] =
    useFetching(changePostCallback);

  /** Отменить изменения */
  const cancelChanges = () => {
    nameChange(baseParams.name);
    isPrivateChange(baseParams.isPrivate);
    tagsChange(baseParams.tags);
  };

  // ЭФФЕКТЫ
  useEffect(() => {
    if (errorChangePost === null) return;
    if (errorChangePost?.response === undefined) {
      addNotification({
        title: "Ошибка",
        text: "Серовер не отвечает. Не удалось изменить пост.",
        status: notificationStatus.error,
      });
      return;
    }
    addNotification({
      title: "Ошибка",
      text: errorChangePost?.response.data,
      status: notificationStatus.error,
    });
  }, [errorChangePost]);

  // ЭФФЕКТЫ
  useEffect(() => {
    if (errorGetPost === null) return;
    if (errorGetPost?.response === undefined) {
      addNotification({
        title: "Ошибка",
        text: "Серовер не отвечает. Не удалось получить данные поста.",
        status: notificationStatus.error,
      });
      return;
    }
    addNotification({
      title: "Ошибка",
      text: errorGetPost?.response.data,
      status: notificationStatus.error,
    });
  }, [errorGetPost]);

  useEffect(() => {
    fetchGetPost();
  }, []);

  // Если параметров нет
  if (isLoadingGetPost)
    return (
      <Loader
        className={classes.loader}
        color={"#4177b5"}
        width={"50px"}
        thickness={"4px"}
      />
    );

  return (
    <div className={classes.body}>
      <div className={classes.logo}>Измененить пост</div>
      <Input
        value={name}
        setValue={nameChange}
        placeholder="Название"
        className={classes.inputName}
      />
      <Input
        value={tags.join(",")}
        setValue={(v) => tagsChange(v.split(","))}
        placeholder="Теги"
        className={classes.inputTags}
      />
      <Checkbox
        value={isPrivate}
        setValue={isPrivateChange}
        text={"Приватный"}
        className={classes.checkbox}
      />
      <div className={classes.buttons}>
        <LoadButton
          text={"Сохранить"}
          onClick={fetchChangePost}
          load={isLoadingChangePost}
        />
        <LoadButton text={"Отменить"} onClick={cancelChanges} />
      </div>
    </div>
  );
};

export default ChangePost;
