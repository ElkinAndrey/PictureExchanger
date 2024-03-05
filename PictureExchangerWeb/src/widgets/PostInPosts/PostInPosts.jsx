import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../context/context";
import Policy from "../../utils/policy";
import classes from "./PostInPosts.module.css";
import getOnlyDate from "../../utils/getOnlyDate";
import useFetching from "../../hooks/useFetching";
import PostApi from "../../api/postApi";
import UserCell from "../UserCell/UserCell";
import Join from "../../shared/Join/Join";
import If from "../../shared/If/If";
import Empty from "../../shared/Empty/Empty";
import ImageSlider from "../../shared/ImageSlider/ImageSlider";
import LoadButton from "../../shared/LoadButton/LoadButton";
import LinkButton from "../../shared/LinkButton/LinkButton";
import { useNavigate } from "react-router-dom";

/** Пост */
const PostInPosts = ({ post, isDeleted = false, openable = true }) => {
  // КОНСТАНТЫ
  const { params } = useContext(Context);
  const navigate = useNavigate(); // Функция перехода на другую страницу

  //ФУНКЦИИ

  /** Забанить пост */
  const [fetchBanned, isLoadingBanned, errorBanned] = useFetching(
    async (id) => {
      await PostApi.banned(id);
      post.isBanned = true;
    }
  );

  /** Разбанить пост */
  const [fetchUnbanned, isLoadingUnbanned, errorUnbanned] = useFetching(
    async (id) => {
      await PostApi.unbanned(id);
      post.isBanned = false;
    }
  );

  /** Удалить пост */
  const [fetchDeletePost, isLoadingDeletePost, errorDeletePost] = useFetching(
    async () => {
      await PostApi.delete(post.id);
      navigate("/");
    }
  );

  /** Забанить */
  const banned = () => {
    if (isLoadingBanned || isLoadingUnbanned) return;
    fetchBanned(post.id);
  };

  /** Разбанить */
  const unbanned = () => {
    if (isLoadingBanned || isLoadingUnbanned) return;
    fetchUnbanned(post.id);
  };

  if (!post) return <Empty />;

  return (
    <div className={classes.body}>
      <div className={classes.header}>
        <UserCell name={post.user.name} date={getOnlyDate(post.date)} />
        <div className={classes.secretButtons}>
          <If
            value={Policy.isManagerOrOwner(
              params?.role,
              params?.id,
              post.user.id
            )}
          >
            <div className={classes.images}>
              <If value={post.isBanned}>
                <img
                  className={classes.privateImage}
                  src="/images/banned.png"
                  alt=""
                  title="Пост забанен"
                />
              </If>
              <If value={post.isPrivate}>
                <img
                  className={classes.privateImage}
                  src="/images/private.png"
                  alt=""
                  title="Приватный пост"
                />
              </If>
            </div>
          </If>
          <If value={Policy.isManager(params?.role)}>
            <LoadButton
              text={post.isBanned ? "Разбанить" : "Забанить"}
              onClick={post.isBanned ? unbanned : banned}
              load={isLoadingBanned || isLoadingUnbanned}
              width="120px"
              className={classes.banButton}
            />
          </If>
          <If value={Policy.isOwner(params?.id, post.user.id)}>
            <LinkButton
              text={"Изменить"}
              to={`/${post.id}/change`}
              className={classes.change}
            />
            <If value={isDeleted}>
              <LoadButton
                text={"Удалить"}
                onClick={fetchDeletePost}
                load={isLoadingDeletePost}
                className={classes.deleteButton}
              />
            </If>
          </If>
        </div>
      </div>
      <ImageSlider post={post} />

      <div className={classes.info}>
        <div className={classes.postName}>{post.name}</div>
        <Join list={post.tags} separator=" " before="#" />
      </div>

      <If value={openable}>
        <LinkButton text={"Открыть"} to={`/${post.id}`} />
      </If>
    </div>
  );
};

export default PostInPosts;
