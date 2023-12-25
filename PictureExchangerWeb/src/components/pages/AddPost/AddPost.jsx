import React, { useState } from "react";
import useFetching from "../../../hooks/useFetching";
import PostApi from "../../../api/postApi";
import InputString from "../../../views/InputString/InputString";
import InputBool from "../../../views/InputBool/InputBool";
import Img from "../../../views/Img/Img";
import UploadImage from "../../../views/UploadImage/UploadImage";

const baseImage =
  "data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw==";
const baseParams = { name: "", isPrivate: false, tags: [], files: [] };

const AddPost = () => {
  const [params, paramsChange] = useState({ ...baseParams });
  const [covers, setCovers] = useState([]);
  const [coversSrc, setCoversSrc] = useState([]);
  const [coversNotSelected, setCoversNotSelected] = useState(false);

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ

  /** Добавить пост */
  const [fetchAddPost, isLoadingAddPost, errorAddPost] = useFetching(
    async (params) => {
      await PostApi.add(params);
    }
  );

  /** Создать пост */
  const create = () => {
    fetchAddPost({ ...params, files: covers });
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

  return (
    <div>
      <h1>Добавление поста</h1>
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
      <div style={{ border: "3px black solid" }}>
        <div>Картинки</div>
        <div style={{ display: "inline-block" }}>
          {coversSrc.map((coverSrc, index) => (
            <Img
              key={index}
              hidden={baseImage === coverSrc ? true : false}
              src={coverSrc}
            />
          ))}
        </div>
        <UploadImage
          covers={covers}
          setCovers={setCovers}
          coversSrc={coversSrc}
          setCoversSrc={setCoversSrc}
          coversNotSelected={coversNotSelected}
          setCoversNotSelected={setCoversNotSelected}
        />
      </div>
      <button onClick={create}>Создать</button>
    </div>
  );
};

export default AddPost;
