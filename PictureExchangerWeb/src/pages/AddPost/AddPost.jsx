import React, { useContext, useState } from "react";
import useFetching from "../../hooks/useFetching";
import PostApi from "../../api/postApi";
import { useNavigate } from "react-router-dom";
import Context from "../../context/context";
import classes from "./AddPost.module.css";
import Checkbox from "../../shared/Checkbox/Checkbox";
import UploadImages from "../../widgets/UploadImages/UploadImages";
import Loader from "../../shared/Loader/Loader";
import Input from "../../shared/Input/Input";
import LeftMenu from "../../layout/LeftMenu/LeftMenu";

/** Страница с добавлением поста */
const AddPost = () => {
  // КОНСТАНТЫ
  const { params } = useContext(Context); // Параметры из URL
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

  return (
    <LeftMenu>
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
        <button onClick={create} className={classes.add}>
          {isLoadingAddPost ? <Loader /> : "Создать"}
        </button>
      </div>
    </LeftMenu>
  );
};

export default AddPost;
