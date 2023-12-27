import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PostApi from "../../api/postApi";
import IsBanned from "../IsBanned/IsBanned";
import DivLink from "../DivLink/DivLink";
import Join from "../Join/Join";
import Bool from "../Bool/Bool";
import Img from "../Img/Img";
import Empty from "../Empty/Empty";
import DivButton from "../DivButton/DivButton";
import Context from "../../context/context";
import Policy from "../../utils/policy";

const PostInPosts = ({
  post,
  banned,
  unbanned,
  deletePost = null,
  openable = true,
}) => {
  // КОНСТАНТЫ
  const { params } = useContext(Context);

  //ФУНКЦИИ

  /** Забанить по Id */
  const bannedById = () => banned(post.id);

  /** Разбанить по Id */
  const unbannedById = () => unbanned(post.id);

  if (!post) return <Empty />;

  return (
    <div style={{ border: "3px black solid", margin: "5px 0px" }}>
      <div>{post.name}</div>
      <div>{post.date}</div>
      {Policy.isManagerOrOwner(params.role, params.id, post.user.id) && (
        <>
          <Bool
            value={post.isPrivate}
            trueText="Приватный"
            fasleText="Публичный"
          />
          <Bool
            value={post.isBanned}
            trueText="Забанен"
            fasleText="Не забанен"
          />
        </>
      )}
      {Policy.isManager(params.role) && (
        <IsBanned
          isBanned={post.isBanned}
          banned={bannedById}
          unbanned={unbannedById}
        />
      )}
      <DivLink to={`/users/${post.user.name}`}>{post.user.name}</DivLink>
      <Join list={post.tags} separator=" " before="#" />
      <div>
        {post.images.map((image, index) => (
          <Img key={index} src={PostApi.getPicture(post.id, image)} />
        ))}
      </div>
      {openable && <Link to={`/${post.id}`}>Открыть</Link>}
      {Policy.isManagerOrOwner(params.role, params.id, post.user.id) && (
        <Link to={`/${post.id}/change`}>Изменить</Link>
      )}
      {deletePost &&
        Policy.isManagerOrOwner(params.role, params.id, post.user.id) && (
          <DivButton onClick={deletePost}>Удалить</DivButton>
        )}
    </div>
  );
};

export default PostInPosts;
