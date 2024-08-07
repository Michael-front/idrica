import React, { useCallback, useEffect, useRef, useState } from "react";
import { Post } from "src/postsManager/core/domain/entities/Post";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import { useDeleteByIdUseCase } from "src/postsManager/core/application/usesCases/useDeletePostByIdUsesCase";
import { useUpdatePostByIdUseCase } from "src/postsManager/core/application/usesCases/useUpdatePostByIdUsesCase";
import { useSelector } from "react-redux";
import { RootState } from "src/postsManager/adapters/secondary/redux/store";
import { useCreatePostUseCase } from "src/postsManager/core/application/usesCases/useCreatePostUsesCase";
import { ApiResponsePost } from "src/postsManager/infrastructure/api/rtkQueryClient/postsApiRTK";

import * as styles from "./PostCard.module.css";

export type PostCardProps = Post & {
  modeEdit?: boolean;
  isNew?: boolean;
  existActions?: boolean;
  setCountComments?: (countComments: number) => void;
  onUpdatePosts?: (post: Post) => void;
  onDeletePost?: (idPost: number) => void;
  comments?: Comment[];
  isLoading?: boolean;
  isError?: boolean;
};

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  body,
  existActions,
  setCountComments,
  modeEdit,
  isNew,
  onUpdatePosts,
  onDeletePost,
  comments = [],
  isLoading = false,
  isError = false,
}: PostCardProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  const deletePost = useDeleteByIdUseCase();
  const updatePost = useUpdatePostByIdUseCase();
  const createPost = useCreatePostUseCase();
  const [isModeEditState, setIsModeEditState] = useState<boolean>(modeEdit || false);

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
    onDeletePost && onDeletePost(id);
  }, [deletePost, id, onDeletePost]);

  const handleUpdate = useCallback(() => {
    const data: ApiResponsePost = { id: id, title: editTitle, body: editBody, userId: user!.id };
    updatePost(data);
    onUpdatePosts && onUpdatePosts(data);
    setIsModeEditState(false);
  }, [id, editTitle, editBody, user, updatePost, onUpdatePosts]);

  const handleCreate = useCallback(() => {
    const data: ApiResponsePost = { id: id, title: editTitle, body: editBody, userId: user!.id };
    createPost(data);
    onUpdatePosts && onUpdatePosts(data);
    setEditTitle("");
    setEditBody("");
  }, [createPost, editBody, editTitle, id, onUpdatePosts, user]);

  return (
    <div key={id} className={styles.card}>
      <div className={styles.card__details}>
        {isModeEditState ? (
          <>
            <input
              data-testid='edit-title-input'
              className={styles.card__title_input}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              data-testid='edit-body-input'
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
          {isModeEditState ? (
            <Button
              data-testid={isNew ? "create-post-button" : "save-post-button"}
              style={{ width: 200 }}
              className={styles["card__action-item"]}
              label={isNew ? t("crud.create") : t("crud.save")}
              onClick={isNew ? handleCreate : handleUpdate}
            />
          ) : (
            <>
              <Button
                data-testid='edit-post-button'
                className={styles["card__action-item"]}
                label={t("crud.edit")}
                onClick={() => setIsModeEditState(true)}
              />
              <Button
                data-testid='delete-post-button'
                className={styles["card__action-item"]}
                label={t("crud.delete")}
                onClick={handleDelete}
              />
              <Button
                className={styles["card__action-item"]}
                label={t("comments.button", { count: comments.length })}
                onClick={() => console.log("ver comentarios")}
                disabled={true}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(PostCard);
