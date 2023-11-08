import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetching from "../../../hooks/useFetching";
import PostApi from "../../../api/postApi";

const ChangePost = () => {
  const urlParams = useParams(); // Параметры из URL
  const [baseParams, baseParamsChange] = useState(null);
  const [params, paramsChange] = useState(null);
  const [covers, setCovers] = useState([]);
  const [coversSrc, setCoversSrc] = useState([]);
  const [coversNotSelected, setCoversNotSelected] = useState(false);

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

  return (
    params && (
      <div>
        <h1>Изменение поста</h1>
        <div>
          Название
          <input
            value={params.name}
            onChange={(e) => {
              params.name = e.target.value;
              paramsChange({ ...params });
            }}
          />
        </div>
        <div>
          Сделать приватным
          <input
            type="checkbox"
            checked={params.isPrivate}
            onChange={() => {
              params.isPrivate = !params.isPrivate;
              paramsChange({ ...params });
            }}
          />
        </div>
        <div>
          Теги
          <input
            value={params.tags.join(",")}
            onChange={(e) => {
              params.tags = e.target.value.split(",");
              paramsChange({ ...params });
            }}
          />
        </div>
        <button onClick={change}>Изменить</button>
        <button onClick={() => paramsChange({ ...baseParams })}>
          Отменить изменения
        </button>
      </div>
    )
  );
};

export default ChangePost;
