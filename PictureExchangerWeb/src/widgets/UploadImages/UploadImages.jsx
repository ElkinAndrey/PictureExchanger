import React, { useState } from "react";
import classes from "./UploadImages.module.css";
import UploadImageButton from "../../shared/UploadImageButton/UploadImageButton";

/** Поле для загрузки картинок */
const UploadImages = ({ images, setImages, className, style }) => {
  const [imagesSrc, setImagesSrc] = useState([]);
  const [imagesNotSelected, setImagesNotSelected] = useState(false);

  const del = (index) => {
    images.splice(index, 1);
    imagesSrc.splice(index, 1);
    setImages([...images]);
    setImagesSrc([...imagesSrc]);
  };

  return (
    <div className={className} style={style}>
      <div className={classes.body}>
        <div className={classes.logo}>Картинки</div>
        <div className={classes.images}>
          {imagesSrc.map((imageSrc, index) => (
            <div className={classes.imageBody} key={index}>
              <img src={imageSrc} alt="" className={classes.image} />
              <button onClick={() => del(index)} className={classes.delButton}>
                ✖
              </button>
            </div>
          ))}
        </div>
        <UploadImageButton
          covers={images}
          setCovers={setImages}
          coversSrc={imagesSrc}
          setCoversSrc={setImagesSrc}
          coversNotSelected={imagesNotSelected}
          setCoversNotSelected={setImagesNotSelected}
        />
      </div>
    </div>
  );
};

export default UploadImages;
