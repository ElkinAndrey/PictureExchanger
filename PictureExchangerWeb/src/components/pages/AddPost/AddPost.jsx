import React, { useState } from "react";
import useFetching from "../../../hooks/useFetching";
import PostApi from "../../../api/postApi";

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

  const addCover = (e) => {
    if (e.target.files && e.target.files[0]) {
      let image = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setCovers([...covers, image]);
        setCoversSrc([...coversSrc, x.target.result]);
      };
      reader.readAsDataURL(image);
      setCoversNotSelected(false);
    }
  };

  return (
    <div>
      <h1>Добавление поста</h1>
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
          value={params.isPrivate}
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
      <div style={{ border: "3px black solid" }}>
        <div>Картинки</div>
        <div style={{ display: "inline-block" }}>
          {coversSrc.map((coverSrc, index) => (
            <img
              key={index}
              style={{ width: "300px" }}
              hidden={baseImage === coverSrc ? true : false}
              src={coverSrc}
              alt={""}
            />
          ))}
        </div>

        <div>
          <label
            htmlFor="formIdCover"
            style={{
              background: "#EFEFEF",
              border: "1px #767676 solid",
              borderRadius: "2px",
              padding: "0px 5px",
              cursor: "pointer",
            }}
          >
            <input
              name=""
              type="file"
              accept="image/*"
              onChange={addCover}
              id="formIdCover"
              hidden
            />
            Выбрать картинку
          </label>
        </div>
      </div>
      <button
        onClick={() => {
          fetchAddPost({ ...params, files: covers });
        }}
      >
        Создать
      </button>
    </div>
  );
};

export default AddPost;
