import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Join from "../Join/Join";
import Empty from "../Empty/Empty";
import Context from "../../context/context";
import Policy from "../../utils/policy";
import classes from "./PostInPosts.module.css";
import getOnlyDate from "../../utils/getOnlyDate";
import ImageSlider from "../../components/forms/ImageSlider/ImageSlider";
import If from "../If/If";
import useFetching from "../../hooks/useFetching";
import PostApi from "../../api/postApi";
import Loader from "../../components/forms/Loader/Loader";
import UserCell from "../UserCell/UserCell";

const PostInPosts = ({ post, deletePost = null, openable = true }) => {
  // КОНСТАНТЫ
  const { params } = useContext(Context);

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

  /** Забанить */
  const banned = (id) => {
    if (isLoadingBanned || isLoadingUnbanned) return;
    fetchBanned(id);
  };

  /** Разбанить */
  const unbanned = (id) => {
    if (isLoadingBanned || isLoadingUnbanned) return;
    fetchUnbanned(id);
  };

  /** Забанить по Id */
  const bannedById = () => banned(post.id);

  /** Разбанить по Id */
  const unbannedById = () => unbanned(post.id);

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
            <button
              className={classes.banButton}
              onClick={post.isBanned ? unbannedById : bannedById}
            >
              <If value={!isLoadingBanned && !isLoadingUnbanned}>
                {post.isBanned ? "Разбанить" : "Забанить"}
              </If>
              <If value={isLoadingBanned || isLoadingUnbanned}>
                <div className={classes.loader}>
                  <Loader />
                </div>
              </If>
            </button>
          </If>
          <If value={Policy.isOwner(params?.id, post.user.id)}>
            <Link className={classes.change} to={`/${post.id}/change`}>
              Изменить
            </Link>
            <If value={deletePost}>
              <button className={classes.deleteButton} onClick={deletePost}>
                Удалить
              </button>
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
        <Link className={classes.openButton} to={`/${post.id}`}>
          Открыть
        </Link>
      </If>
    </div>
  );
};

export default PostInPosts;
