import React from "react";

const UploadImage = ({
  covers,
  setCovers,
  coversSrc,
  setCoversSrc,
  coversNotSelected,
  setCoversNotSelected,
}) => {
  /** Добавить картинку */
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
  );
};

export default UploadImage;
