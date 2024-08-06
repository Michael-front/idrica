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
import ChartColumnsBar, { DataChartColumnsBar } from "@components/ChartColumnsBar";

import * as styles from "./CrudPostsUser.module.css";

const CrudPostsUser: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { posts, error, isLoading, isError } = useGetPostByUserIdUseCase(user!.id); //id must exits
  const [postsUpdate, setPostsUpdate] = useState<Post[]>([]);
  const [postsFiltered, setPostFiltered] = useState<Post[]>([]);
  const { t } = useTranslation();
  const [dataChar, setDataChar] = useState<{ data: DataChartColumnsBar[]; sumCountComments: number }>({
    data: [],
    sumCountComments: 0,
  });

  useEffect(() => {
    if (!isLoading && !isError && posts) {
      setPostFiltered(posts);
      setPostsUpdate(posts);
    }
  }, [isError, isLoading, posts]);

  useEffect(() => {
    setPostFiltered(postsUpdate);
  }, [postsUpdate]);

  const updateDataChart = useCallback(
    (data: Post[], indexPost: number, action: "add" | "update" | "delete", countComments = 0) => {
      console.log("edit: ", `Post ${indexPost + 1}: "${data[indexPost].title}"`);

      setDataChar((prevData) => {
        const newCountComments =
          action === "add" ? prevData.sumCountComments + countComments : dataChar.data[indexPost][1];
        const newDataChar: DataChartColumnsBar = [`Post ${indexPost + 1}: "${data[indexPost].title}"`, countComments];

        const updatedData =
          action === "add"
            ? [...prevData.data, newDataChar]
            : [...prevData.data.slice(0, indexPost), newDataChar, ...prevData.data.slice(indexPost + 1)];

        return {
          data: updatedData,
          sumCountComments: newCountComments,
        };
      });
    },
    [dataChar.data],
  );

  return (
    <>
      <Header isLoading={isLoading} />
      <BreadCrumbs data={[{ path: t("breadcrumbs.userPost"), url: ROUTES_PATH.CRUD_POST_USER }]} />
      {!isLoading && !isError && (
        <div className={styles.crudPostsUser}>
          {postsUpdate.length > 0 && (
            <>
              <h1 className={styles.crudPostsUser__title}>{t("crud.statistics.title")}</h1>
              <ChartColumnsBar
                title={t("crud.statistics.chart.title", {
                  countPosts: postsUpdate.length,
                  countComments: dataChar.sumCountComments,
                })}
                yAxisName={t("crud.statistics.chart.yAxisName")}
                tooltipInitial={t("crud.statistics.chart.tooltipInitial")}
                data={dataChar.data}
              />
              <h1 className={styles.crudPostsUser__title}>{t("crud.posts.title")}</h1>
              <h2 className={styles.crudPostsUser__title}>{t("crud.new")}</h2>
              <PostCard
                key='newPost'
                id={101}
                title=''
                body=''
                modeEdit={true}
                existActions={true}
                isNew={true}
                onUpdatePosts={(dataPost) => {
                  setPostsUpdate((prevPosts) => [...prevPosts, dataPost]);
                  updateDataChart([...postsUpdate, dataPost], postsUpdate.length, "add"); //the index is one more [...postsUpdate, dataPost]
                }}
              />
              <Filter
                data={postsUpdate || []}
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
                    setCountComments={(count) => updateDataChart(postsUpdate, index, "add", count)}
                    onUpdatePosts={(dataPost) => {
                      let findIndex = 0;
                      const updatedPostsAux = postsUpdate.map((post, index) => {
                        if (post.id === dataPost.id) {
                          findIndex = index;
                          return { ...post, ...dataPost };
                        } else {
                          return post;
                        }
                      });
                      setPostsUpdate(updatedPostsAux);
                      updateDataChart(updatedPostsAux, findIndex, "update", dataChar.data[findIndex][1]);
                    }}
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
