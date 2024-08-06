import React, { useCallback, useEffect, useRef, useState } from "react";
import { Post } from "src/postsManager/core/domain/entities/Post";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import { useDeleteByIdUseCase } from "src/postsManager/core/application/usesCases/useDeletePostByIdUsesCase";
import { useUpdatePostByIdUseCase } from "src/postsManager/core/application/usesCases/useUpdatePostByIdUsesCase";
import { useSelector } from "react-redux";
import { RootState } from "src/postsManager/adapters/secondary/redux/store";
import { useGetCommentsByPostIdUsesCase } from "src/postsManager/core/application/usesCases/useGetCommentsByPostIdUsesCase";
import { useCreatePostUseCase } from "src/postsManager/core/application/usesCases/useCreatePostUsesCase";

import * as styles from "./PostCard.module.css";

type PostCardProps = Post & {
  modeEdit?: boolean;
  isNew?: boolean;
  existActions?: boolean;
  setCountComments?: (countComments: number) => void;
};

const PostCard = ({ id, title, body, existActions, setCountComments, modeEdit, isNew }: PostCardProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  const deletePost = useDeleteByIdUseCase();
  const updatePost = useUpdatePostByIdUseCase();
  const createPost = useCreatePostUseCase();

  const { comments, isLoading, isError } = useGetCommentsByPostIdUsesCase(id);
  const commentsRef = useRef<number>(0);

  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);

  useEffect(() => {
    if (!isLoading && !isError && comments) {
      const currentCount = comments.length;
      if (commentsRef.current !== currentCount) {
        commentsRef.current = currentCount;
        setCountComments && setCountComments(currentCount);
      }
    }
  }, [comments, isLoading, isError, setCountComments]);

  const handleDelete = useCallback(() => {
    deletePost(id);
  }, [deletePost, id]);

  const handleUpdate = useCallback(() => {
    updatePost({ id, title: editTitle, body: editBody, userId: user?.id });
  }, [updatePost, id, user?.id, editTitle, editBody]);

  const handleCreate = useCallback(() => {
    createPost({ id: id, title: "editTitle", body: "editBody", userId: user!.id });
    setEditTitle("");
    setEditBody("");
  }, [createPost, id, user]);

  return (
    <div key={id} className={styles.card}>
      <div className={styles.card__details}>
        {modeEdit ? (
          <>
            <input
              className={styles.card__title_input}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              className={styles.card__body_input}
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
          </>
        ) : (
          <>
            <span className={styles.card__title}>{title?.toUpperCase()}</span>
            <span className={styles.card__body}>{body}</span>
          </>
        )}
      </div>
      {existActions && (
        <div className={styles.card__actions}>
          {modeEdit ? (
            <Button
              style={{ width: 200 }}
              className={styles["card__action-item"]}
              label={isNew ? t("crud.create") : t("crud.save")}
              onClick={isNew ? handleCreate : handleUpdate}
            />
          ) : (
            <>
              <Button className={styles["card__action-item"]} label={t("crud.edit")} onClick={handleUpdate} />
              <Button className={styles["card__action-item"]} label={t("crud.delete")} onClick={handleDelete} />
              <Button
                className={styles["card__action-item"]}
                label={t("comments.button", { count: comments.length })}
                onClick={() => console.log("ver comentarios")}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(PostCard);
