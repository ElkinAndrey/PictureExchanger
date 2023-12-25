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
  const [params, paramsChange] = useState(null);

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ

  /** Добавить пост */
  const [fetchGetPost, isLoadingGetPost, errorGetPost] = useFetching(
    async (id) => {
      let response = await PostApi.getById(id);
      baseParamsChange({ ...response.data });
      paramsChange({ ...response.data });
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
    fetchChangePost(urlParams.postId, params);
  };

  /** Отменить изменения */
  const cancelChanges = () => {
    paramsChange({ ...baseParams });
  };

  /** Изменить имя */
  const paramsChangeName = (value) => {
    params.name = value;
    paramsChange({ ...params });
  };

  /** Изменить приватность */
  const paramsChangeIsPrivate = () => {
    params.isPrivate = !params.isPrivate;
    paramsChange({ ...params });
  };

  /** Изменить теги */
  const paramsChangeTags = (value) => {
    params.tags = value.split(",");
    paramsChange({ ...params });
  };

  // Если параметров нет
  if (!params) return <Empty />;

  return (
    <div>
      <h1>Изменение поста</h1>
      <InputString
        value={params.name}
        valueChange={paramsChangeName}
        text="Название"
      />
      <InputBool
        value={params.isPrivate}
        valueChange={paramsChangeIsPrivate}
        text="Сделать приватным"
      />
      <InputString
        value={params.tags.join(",")}
        valueChange={paramsChangeTags}
        text="Теги"
      />
      <button onClick={change}>Изменить</button>
      <button onClick={cancelChanges}>Отменить изменения</button>
    </div>
  );
};

export default ChangePost;
