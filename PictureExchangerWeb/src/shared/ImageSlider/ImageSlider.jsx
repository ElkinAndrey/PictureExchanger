import React, { useEffect, useState } from "react";
import classes from "./ImageSlider.module.css";
import PostApi from "../../api/postApi";
import Empty from "../../shared/Empty/Empty";
import If from "../../shared/If/If";

/** Кнопка со стрелкой */
const ArrowButton = ({ className, style, onClick, left = false }) => {
  return (
    <div className={className} style={style}>
      <button
        className={classes.button}
        onClick={onClick}
        style={left ? { padding: "10px 2px 10px 7px" } : {}}
      >
        <div
          className={classes.arrow}
          style={left ? { transform: "rotate(45deg)" } : {}}
        ></div>
      </button>
    </div>
  );
};

/** Слайдер с картинками */
const ImageSlider = ({ post }) => {
  const [max, maxChange] = useState(0);
  const [currentImage, currentImageChange] = useState(0);

  const increase = () => {
    if (currentImage + 1 < max) currentImageChange(currentImage + 1);
  };

  const decrease = () => {
    if (currentImage - 1 >= 0) currentImageChange(currentImage - 1);
  };

  useEffect(() => {
    maxChange(post.images.length);
  }, [post]);

  if (max === 0) return <Empty />;

  return (
    <div className={classes.body}>
      <If value={currentImage >= 1}>
        <ArrowButton
          className={classes.leftButton}
          onClick={decrease}
          left={true}
        />
      </If>
      <If value={currentImage < max - 1}>
        <ArrowButton
          className={classes.rightButton}
          onClick={increase}
          left={false}
        />
      </If>
      {post.images.map((image, index) => (
        <img
          key={index}
          className={
            index === currentImage ? classes.image : classes.hiddenImage
          }
          src={PostApi.getPicture(post.id, image)}
          alt=""
        />
      ))}
      <div className={classes.miniImages}>
        <If value={max > 1}>
          {[...Array(max).keys()].map((i) => (
            <div
              key={i}
              className={
                i === currentImage ? classes.curMiniImage : classes.miniImage
              }
              onClick={() => currentImageChange(i)}
            ></div>
          ))}
        </If>
      </div>
    </div>
  );
};

export default ImageSlider;
