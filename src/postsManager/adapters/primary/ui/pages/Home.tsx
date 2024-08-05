import React, { useEffect, useState } from "react";
import { useGetPostUseCase } from "src/postsManager/core/application/usesCases/useGetPostsUsesCase";
import Header from "@components/Header";
import PostCard from "@components/PostCard";
import BreadCrumbs from "@components/BreadCrumbs";
import { useTranslation } from "react-i18next";
import { ROUTES_PATH } from "src/postsManager/config/routes/routes";
import { Post } from "src/postsManager/core/domain/entities/Post";
import Filter from "@components/Filter";

import * as styles from "./Home.module.css";

const Home: React.FC = () => {
  const { posts, error, isLoading, isError } = useGetPostUseCase();
  const [postsFiltered, setPostFiltered] = useState<Post[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isLoading && !isError && posts) {
      setPostFiltered(posts);
    }
  }, [isError, isLoading, posts]);

  return (
    <>
      <Header isLoading={isLoading} />
      <BreadCrumbs data={[{ path: t("breadcrumbs.allPost"), url: ROUTES_PATH.HOME }]} />
      {!isLoading && !isError && (
        <div className={styles.home}>
          {posts.length > 0 && (
            <>
              <Filter
                data={posts || []}
                placeHoder='SEARCH A POST...'
                byFields={["title", "body"]}
                onDataFiltered={(postsFilter) => setPostFiltered(postsFilter)}
              />
              <div className={styles.home__list}>
                {postsFiltered.map(({ id, title, body }) => (
                  <PostCard key={id} id={id} title={title} body={body} />
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

export default Home;
