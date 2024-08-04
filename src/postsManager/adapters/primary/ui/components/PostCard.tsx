import React from "react";
// import { useNavigate } from "react-router-dom";
import { Post } from "src/postsManager/core/domain/entities/Post";

import * as styles from "./PostCard.module.css";

const PostCard = ({ id, title, body }: Post) => {
  // const navigate = useNavigate();

  // const handleCharacterCardClick = useCallback(() => {
  //   navigate(`/post/${id.toString()}`);
  // }, [id, navigate]);

  return (
    <div key={id} className={styles.card}>
      <div className={styles.card__details}>
        <span className={styles.card__title}>{title?.toUpperCase()}</span>
        <span className={styles.card__body}>{body}</span>
      </div>
    </div>
  );
};

export default PostCard;
