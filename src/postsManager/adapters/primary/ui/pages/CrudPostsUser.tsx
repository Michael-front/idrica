import React, { useCallback, useEffect, useState } from "react";
import Header from "@components/Header";
import PostCard from "@components/PostCard";
import BreadCrumbs from "@components/BreadCrumbs";
import { useTranslation } from "react-i18next";
import { ROUTES_PATH } from "src/postsManager/config/routes/routes";
import { Post } from "src/postsManager/core/domain/entities/Post";
import Filter from "@components/Filter";
import { useSelector } from "react-redux";
import { RootState } from "src/postsManager/adapters/secondary/redux/store";
import { useGetPostByUserIdUseCase } from "src/postsManager/core/application/usesCases/useGetPostsByUserIdUsesCase";
import Button from "@components/Button";
import { useCreatePostUseCase } from "src/postsManager/core/application/usesCases/useCreatePostUsesCase";
import ChartColumnsBar, { DataChartColumnsBar } from "@components/ChartColumnsBar";

import * as styles from "./CrudPostsUser.module.css";

const CrudPostsUser: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { posts, error, isLoading, isError } = useGetPostByUserIdUseCase(user!.id); //id must exits
  const [postsFiltered, setPostFiltered] = useState<Post[]>([]);
  const { t } = useTranslation();
  const createPost = useCreatePostUseCase();
  const [sumCountComments, setSumCountCommets] = useState<number>(0);
  const [dataChar, setDataChar] = useState<DataChartColumnsBar[]>([]);

  useEffect(() => {
    if (!isLoading && !isError && posts) {
      setPostFiltered(posts);
    }
  }, [isError, isLoading, posts]);

  const handleDataChart = (indexPost: number, countComments: number) => {
    setSumCountCommets((prevCount) => prevCount + countComments);
    const newDataChar: DataChartColumnsBar = [`Post ${indexPost + 1}: "${posts[indexPost].title}"`, countComments];

    setDataChar((prevDataChar) => [...prevDataChar, newDataChar]);
  };

  const handleCreate = useCallback(() => {
    createPost({ id: 102, title: "createTitle", body: "createBody", userId: user!.id });
  }, [createPost, user]);

  return (
    <>
      <Header isLoading={isLoading} />
      <BreadCrumbs data={[{ path: t("breadcrumbs.userPost"), url: ROUTES_PATH.CRUD_POST_USER }]} />
      {!isLoading && !isError && (
        <div className={styles.crudPostsUser}>
          {posts.length > 0 && (
            <>
              <h1 className={styles.crudPostsUser__title}>{t("crud.statistics.title")}</h1>
              <ChartColumnsBar
                title={t("crud.statistics.chart.title", { countPosts: posts.length, countComments: sumCountComments })}
                yAxisName={t("crud.statistics.chart.yAxisName")}
                tooltipInitial={t("crud.statistics.chart.tooltipInitial")}
                data={dataChar}
              />
              <h1 className={styles.crudPostsUser__title}>{t("crud.posts.title")}</h1>
              <Filter
                data={posts || []}
                placeHoder='SEARCH A POST...'
                byFields={["title", "body"]}
                onDataFiltered={(postsFilter) => setPostFiltered(postsFilter)}
              />
              <div className={styles["crudPostsUser__container-button-add"]}>
                <Button
                  label={t("crud.create")}
                  className={styles["crudPostsUser__button-add"]}
                  onClick={handleCreate}
                />
              </div>

              <div className={styles.crudPostsUser__list}>
                {postsFiltered.map(({ id, title, body }, index) => (
                  <PostCard
                    key={id}
                    id={id}
                    title={title}
                    body={body}
                    existActions={true}
                    setCountComments={(count) => handleDataChart(index, count)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {isError && <div>Error: {error instanceof Error ? error.message : t("error.generic")}</div>}
    </>
  );
};

export default CrudPostsUser;
