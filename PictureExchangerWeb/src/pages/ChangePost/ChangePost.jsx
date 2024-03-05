import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetching from "../../hooks/useFetching";
import PostApi from "../../api/postApi";
import LeftMenu from "../../layout/LeftMenu/LeftMenu";
import classes from "./ChangePost.module.css";
import Checkbox from "../../shared/Checkbox/Checkbox";
import Loader from "../../shared/Loader/Loader";
import Input from "../../shared/Input/Input";
import LoadButton from "../../shared/LoadButton/LoadButton";

/** Страница с изменением поста */
const ChangePost = () => {
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
        <Loader
          className={classes.loader}
          color={"#4177b5"}
          width={"50px"}
          thickness={"4px"}
        />
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
          <LoadButton
            text={"Сохранить"}
            onClick={change}
            load={isLoadingChangePost}
          />
          <LoadButton text={"Отменить"} onClick={cancelChanges} />
        </div>
      </div>
    </LeftMenu>
  );
};

export default ChangePost;
