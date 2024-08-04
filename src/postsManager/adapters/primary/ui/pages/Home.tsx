import React from "react";
import { useGetPostUseCase } from "src/postsManager/core/application/usesCases/useGetPostsUsesCase";
import Header from "@components/Header";
import PostCard from "@components/PostCard";
import BreadCrumbs from "@components/BreadCrumbs";
import { useTranslation } from "react-i18next";
import { ROUTES_PATH } from "src/postsManager/config/routes/routes";

import * as styles from "./Home.module.css";

const Home: React.FC = () => {
  const { posts, error, isLoading, isError } = useGetPostUseCase();

  const { t } = useTranslation();

  return (
    <>
      <Header isLoading={isLoading} />
      <BreadCrumbs data={[{ path: t("breadcrumbs.allPost"), url: ROUTES_PATH.MAIN }]} />
      {!isLoading && !isError && (
        <div className={styles.home}>
          {posts?.length && (
            <div className={styles.home__list}>
              {posts.map(({ id, title, body }) => (
                <PostCard key={id} id={id} title={title} body={body} />
              ))}
            </div>
          )}
        </div>
      )}

      {isError && <>Error: {error instanceof Error ? error.message : "An error occurred"}</>}
    </>
  );
};

export default Home;
