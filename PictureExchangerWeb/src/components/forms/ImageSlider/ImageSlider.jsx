import React, { useEffect, useState } from "react";
import classes from "./ImageSlider.module.css";
import PostApi from "../../../api/postApi";
import If from "../../../views/If/If";
import ArrowButton from "../../../views/ArrowButton/ArrowButton";

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

  if (max === 0) return <></>;

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
