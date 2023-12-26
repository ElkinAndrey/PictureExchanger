import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetching from "../../../hooks/useFetching";
import PostApi from "../../../api/postApi";
import Empty from "../../../views/Empty/Empty";
import InputString from "../../../views/InputString/InputString";
import InputBool from "../../../views/InputBool/InputBool";

const ChangePost = () => {
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
  if (!baseParams) return <Empty />;

  return (
    <div>
      <h1>Изменение поста</h1>
      <InputString value={name} valueChange={nameChange} text="Название" />
      <InputBool
        value={isPrivate}
        valueChange={isPrivateChange}
        text="Сделать приватным"
      />
      <InputString
        value={tags.join(",")}
        valueChange={tagsChange}
        text="Теги"
      />
      <button onClick={change}>Изменить</button>
      <button onClick={cancelChanges}>Отменить изменения</button>
    </div>
  );
};

export default ChangePost;
