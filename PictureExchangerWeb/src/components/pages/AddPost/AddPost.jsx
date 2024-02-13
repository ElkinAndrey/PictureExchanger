import React, { useContext, useState } from "react";
import useFetching from "../../../hooks/useFetching";
import PostApi from "../../../api/postApi";
import InputString from "../../../views/InputString/InputString";
import InputBool from "../../../views/InputBool/InputBool";
import Img from "../../../views/Img/Img";
import UploadImage from "../../../views/UploadImage/UploadImage";
import { useNavigate } from "react-router-dom";
import Context from "../../../context/context";
import LeftMenu from "../../layout/LeftMenu/LeftMenu";

const baseImage =
  "data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw==";

const AddPost = () => {
  // КОНСТАНТЫ
  const { params } = useContext(Context); // Параметры из URL
  const navigate = useNavigate(); // Функция перехода на другую страницу

  // ПЕРЕМЕННЫЕ
  const [name, nameChange] = useState("");
  const [isPrivate, isPrivateChange] = useState(false);
  const [tags, tagsChange] = useState([]);
  const [covers, setCovers] = useState([]);
  const [coversSrc, setCoversSrc] = useState([]);
  const [coversNotSelected, setCoversNotSelected] = useState(false);

  // ОТПРАВКА И ПОЛУЧЕНИЕ ДАННЫХ

  /** Добавить пост */
  const [fetchAddPost, isLoadingAddPost, errorAddPost] = useFetching(
    async (p) => {
      await PostApi.add(p);
    }
  );

  /** Создать пост */
  const create = () => {
    fetchAddPost({
      name: name,
      isPrivate: isPrivate,
      tags: tags,
      files: covers,
    });
    navigate(`/users/${params.name}`);
  };

  return (
    <LeftMenu>
      <h1>Добавление поста</h1>
      <InputString value={name} valueChange={nameChange} text="Название" />
      <InputBool
        value={isPrivate}
        valueChange={isPrivateChange}
        text="Сделать приватным"
      />
      <InputString
        value={tags.join(",")}
        valueChange={(v) => tagsChange(v.split(","))}
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
    </LeftMenu>
  );
};

export default AddPost;
