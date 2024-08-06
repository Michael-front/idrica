import React, { useEffect, useState } from "react";
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
import ChartColumnsBar, { DataChartColumnsBar } from "@components/ChartColumnsBar";

import * as styles from "./CrudPostsUser.module.css";

const CrudPostsUser: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { posts, error, isLoading, isError } = useGetPostByUserIdUseCase(user!.id); //id must exits
  const [postsFiltered, setPostFiltered] = useState<Post[]>([]);
  const { t } = useTranslation();
  const [dataChar, setDataChar] = useState<{ data: DataChartColumnsBar[]; sumCountComments: number }>({
    data: [],
    sumCountComments: 0,
  });

  useEffect(() => {
    if (!isLoading && !isError && posts) {
      setPostFiltered(posts);
    }
  }, [isError, isLoading, posts]);

  const handleDataChart = (indexPost: number, countComments: number) => {
    const newDataChar: DataChartColumnsBar = [`Post ${indexPost + 1}: "${posts[indexPost].title}"`, countComments];

    setDataChar((prevData) => ({
      data: [...prevData.data, newDataChar],
      sumCountComments: prevData.sumCountComments + countComments,
    }));
  };

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
                title={t("crud.statistics.chart.title", {
                  countPosts: posts.length,
                  countComments: dataChar.sumCountComments,
                })}
                yAxisName={t("crud.statistics.chart.yAxisName")}
                tooltipInitial={t("crud.statistics.chart.tooltipInitial")}
                data={dataChar.data}
              />
              <h1 className={styles.crudPostsUser__title}>{t("crud.posts.title")}</h1>
              <h2 className={styles.crudPostsUser__title}>{t("crud.new")}</h2>
              <PostCard key='newPost' id={101} title='' body='' modeEdit={true} existActions={true} isNew={true} />
              <Filter
                data={posts || []}
                placeHoder='SEARCH A POST...'
                byFields={["title", "body"]}
                onDataFiltered={(postsFilter) => setPostFiltered(postsFilter)}
              />
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
