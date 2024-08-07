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
import withComments from "@components/WithCommentsHoc";

import * as styles from "./CrudPostsUser.module.css";

const PostCardWithComments = withComments(PostCard);

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

  const getNewCoutComments = useCallback(
    (
      prevData: { data: DataChartColumnsBar[]; sumCountComments: number },
      indexPost: number,
      action: "add" | "update" | "delete",
      countComments = 0,
    ) => {
      if (action === "add") {
        return prevData.sumCountComments + countComments;
      }
      if (action === "update") {
        return dataChar.data[indexPost][1];
      }
      //delete
      const newCountComment = prevData.sumCountComments - prevData.data[indexPost][1];
      return newCountComment >= 0 ? newCountComment : 0;
    },
    [dataChar.data],
  );

  const getUpdateData = (
    prevData: { data: DataChartColumnsBar[]; sumCountComments: number },
    indexPost: number,
    action: "add" | "update" | "delete",
    newDataChar: DataChartColumnsBar,
  ) => {
    if (action === "add") {
      return [...prevData.data, newDataChar];
    }
    if (action === "update") {
      return [...prevData.data.slice(0, indexPost), newDataChar, ...prevData.data.slice(indexPost + 1)];
    }
    //delete
    return [...prevData.data.slice(0, indexPost), ...prevData.data.slice(indexPost + 1)];
  };

  const updateDataChart = useCallback(
    (data: Post[], indexPost: number, action: "add" | "update" | "delete", countComments = 0) => {
      setDataChar((prevData) => {
        const newCountComments = getNewCoutComments(prevData, indexPost, action, countComments);
        const newDataChar: DataChartColumnsBar = [`Post ${indexPost + 1}: "${data[indexPost].title}"`, countComments];
        const updatedData = getUpdateData(prevData, indexPost, action, newDataChar);

        return {
          data: updatedData,
          sumCountComments: newCountComments,
        };
      });
    },
    [getNewCoutComments],
  );

  return (
    <>
      <Header isLoading={isLoading} />
      <BreadCrumbs data={[{ path: t("breadcrumbs.userPost"), url: ROUTES_PATH.CRUD_POST_USER }]} />
      {!isLoading && !isError && (
        <div className={styles.crudPostsUser}>
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
                <PostCardWithComments
                  key={id}
                  id={id}
                  title={title}
                  body={body}
                  existActions={true}
                  setCountComments={(count: number) => updateDataChart(postsUpdate, index, "add", count)}
                  onUpdatePosts={(dataPost: Post) => {
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
                  onDeletePost={(postId: number) => {
                    setPostsUpdate(postsUpdate.filter((post) => post.id !== postId));
                    updateDataChart(postsUpdate, index, "delete", dataChar.data[index][1]);
                  }}
                />
              ))}
            </div>
          </>
        </div>
      )}

      {isError && <div>Error: {error instanceof Error ? error.message : t("error.generic")}</div>}
    </>
  );
};

export default CrudPostsUser;
