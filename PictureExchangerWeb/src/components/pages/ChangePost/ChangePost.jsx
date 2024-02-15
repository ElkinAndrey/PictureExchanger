import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetching from "../../../hooks/useFetching";
import PostApi from "../../../api/postApi";
import Empty from "../../../views/Empty/Empty";
import InputString from "../../../views/InputString/InputString";
import InputBool from "../../../views/InputBool/InputBool";
import Context from "../../../context/context";
import LeftMenu from "../../layout/LeftMenu/LeftMenu";
import classes from "./ChangePost.module.css";
import Input from "../../forms/Input/Input";
import Loader from "../../forms/Loader/Loader";
import BigLoader from "../../forms/BigLoader/BigLoader";
import Checkbox from "../../../views/Checkbox/Checkbox";

const ChangePost = () => {
  // КОНСТАНТЫ
  const { params } = useContext(Context); // Параметры из URL
  const navigate = useNavigate(); // Функция перехода на другую страницу

  // ПЕРЕМЕННЫЕ
  const urlParams = useParams(); // Параметры из URL
  const [baseParams, baseParamsChange] = useState(null);
  const [name, nameChange] = useState("");
  const [isPrivate, isPrivateChange] = useState(false);
  const [tags, tagsChange] = useState([]);

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ

  /** Добавить пост */
  const [fetchGetPost, isLoadingGetPost, errorGetPost] = useFetching(
    async (id) => {
      let response = await PostApi.getById(id);
      baseParamsChange({ ...response.data });
      nameChange(response.data.name);
      isPrivateChange(response.data.isPrivate);
      tagsChange(response.data.tags);
    }
  );
  const [fetchChangePost, isLoadingChangePost, errorChangePost] = useFetching(
    async (id, params) => {
      await PostApi.change(id, params);
    }
  );

  useEffect(() => {
    fetchGetPost(urlParams.postId);
  }, []);

  const change = () => {
    fetchChangePost(urlParams.postId, {
      name: name,
      isPrivate: isPrivate,
      tags: tags,
    });
  };

  /** Отменить изменения */
  const cancelChanges = () => {
    nameChange(baseParams.name);
    isPrivateChange(baseParams.isPrivate);
    tagsChange(baseParams.tags);
  };

  // Если параметров нет
  if (!baseParams)
    return (
      <LeftMenu>
        <BigLoader className={classes.bigLoader} />
      </LeftMenu>
    );

  return (
    <LeftMenu>
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
          <button className={classes.button} onClick={change}>
            {isLoadingChangePost ? <Loader /> : "Сохранить"}
          </button>
          <button className={classes.button} onClick={cancelChanges}>
            Отменить
          </button>
        </div>
      </div>
    </LeftMenu>
  );
};

export default ChangePost;
