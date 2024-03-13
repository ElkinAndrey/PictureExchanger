import React, { useContext, useEffect, useState } from "react";
import useFetching from "../../hooks/useFetching";
import PostApi from "../../api/postApi";
import { useNavigate } from "react-router-dom";
import Context from "../../context/context";
import classes from "./AddPost.module.css";
import Checkbox from "../../shared/Checkbox/Checkbox";
import UploadImages from "../../widgets/UploadImages/UploadImages";
import Input from "../../shared/Input/Input";
import LoadButton from "../../shared/LoadButton/LoadButton";
import serverNotRespondingError from "../../constants/serverNotRespondingError";
import notificationStatus from "../../constants/notificationStatus";

/** Страница с добавлением поста */
const AddPost = () => {
  // КОНСТАНТЫ
  const { params, addNotification } = useContext(Context); // Параметры из URL
  const navigate = useNavigate(); // Функция перехода на другую страницу

  // ПЕРЕМЕННЫЕ
  const [name, nameChange] = useState("");
  const [isPrivate, isPrivateChange] = useState(false);
  const [tags, tagsChange] = useState([]);
  const [images, setImages] = useState([]);

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ

  /** Добавить пост */
  const [fetchAddPost, isLoadingAddPost, errorAddPost] = useFetching(
    async (p) => {
      await PostApi.add(p);
      addNotification({
        title: "Добавление поста",
        text: "Пост успешно добавлен",
        status: notificationStatus.successful,
      });
      navigate(`/users/${params?.name}`);
    }
  );

  /** Создать пост */
  const create = () => {
    fetchAddPost({
      name: name,
      isPrivate: isPrivate,
      tags: tags,
      files: images,
    });
  };

  // ЭФФЕКТЫ
  useEffect(() => {
    if (errorAddPost === null) return;
    if (errorAddPost?.response === undefined) {
      addNotification(serverNotRespondingError);
      return;
    }
    addNotification({
      title: "Ошибка",
      text: errorAddPost?.response.data,
      status: notificationStatus.error,
    });
  }, [errorAddPost]);

  return (
    <div className={classes.body}>
      <div className={classes.logo}>Добавить пост</div>
      <Input
        value={name}
        setValue={nameChange}
        placeholder="Название"
        className={classes.input}
      />
      <Input
        value={tags.join(",")}
        setValue={(v) => tagsChange(v.split(","))}
        placeholder="Теги"
        className={classes.input}
      />
      <Checkbox
        value={isPrivate}
        valueChange={isPrivateChange}
        text="Сделать приватным"
        className={classes.isPrivate}
      />
      <UploadImages
        images={images}
        setImages={setImages}
        className={classes.images}
      />
      <LoadButton text={"Создать"} onClick={create} load={isLoadingAddPost} />
    </div>
  );
};

export default AddPost;
