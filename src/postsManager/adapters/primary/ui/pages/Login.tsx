import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ROUTES_PATH } from "src/postsManager/config/routes/routes";
import Header from "@components/Header";
import BreadCrumbs from "@components/BreadCrumbs";
import Button from "@components/Button";
import { useGetUsersUseCase } from "src/postsManager/core/application/usesCases/useGetUsersUsesCase ";
import { useDispatch } from "react-redux";
import { setCredentials } from "src/postsManager/adapters/secondary/redux/authSlice";
import { useNavigate } from "react-router-dom";

import * as styles from "./Login.module.css";

const Login: React.FC = () => {
  const { users, isLoading, isError, error } = useGetUsersUseCase();

  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const findUser = users.find((user) => user.user === username || user.email === username);
    const findPassword = users.find((user) => user.password === password);

    if (findUser && findPassword) {
      // The API does not have a path for login, so I use a fake token from which I will obtain the user subsequently.
      dispatch(setCredentials({ user: findUser, token: `token/user:${findUser.user}` }));
      navigate(ROUTES_PATH.HOME);
    } else {
      console.error("user not found");
    }
  };

  return (
    <>
      <Header isLoading={false} />
      <BreadCrumbs
        data={[
          { path: t("breadcrumbs.allPost"), url: ROUTES_PATH.HOME },
          { path: t("breadcrumbs.login"), url: ROUTES_PATH.LOGIN },
        ]}
      />
      {!isLoading && !isError && (
        <div className={styles.login__container}>
          <div className={styles.login}>
            <div className={styles.login__header}>
              <h2 className={styles.login__title}>{t("login.access")}</h2>
            </div>
            <form className={styles.login__form} onSubmit={handleSubmit}>
              <div className={styles.login__field}>
                <label className={styles.login__label}>{t("login.user")}</label>
                <div className={styles["login__input-group"]}>
                  <input
                    type='text'
                    className={styles.login__input}
                    placeholder={t("login.user")}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete='username'
                  />
                </div>
              </div>
              <div className={styles.login__field}>
                <label className={styles.login__label}>{t("login.password")}</label>
                <div className={styles["login__input-group"]}>
                  <input
                    type='password'
                    className={styles.login__input}
                    placeholder={t("login.password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete='current-password'
                  />
                </div>
              </div>
              <Button label={t("login.button")} />
            </form>
          </div>
        </div>
      )}
      {isError && <>Error: {error instanceof Error ? error.message : "An error occurred"}</>}
    </>
  );
};

export default Login;
