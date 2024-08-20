import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ROUTES_PATH } from "src/postsManager/config/routes/routes";
import Header from "@components/Header";
import BreadCrumbs from "@components/BreadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/postsManager/adapters/secondary/redux/store";

import * as styles from "./Settings.module.css";
import { toggleTheme } from "src/postsManager/adapters/secondary/redux/themeSlice";

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const { t, i18n } = useTranslation();

  const handleToggleTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const handleLanguageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      i18n.changeLanguage(event.target.value);
    },
    [i18n],
  );

  const isSpanish: boolean = useMemo(() => i18n.language === "es-ES" || i18n.language === "es", [i18n.language]);

  return (
    <>
      <Header isLoading={false} />
      <BreadCrumbs
        data={[
          { path: t("breadcrumbs.allPost"), url: ROUTES_PATH.HOME },
          { path: t("breadcrumbs.config"), url: ROUTES_PATH.SETTINGS },
        ]}
      />
      <div className={styles.settings__container}>
        <div className={styles.settings}>
          <h1 className={styles.settings__title}>{t("settings.title")}</h1>
          <h2 className={styles.settings__subtitle}>{t("settings.theme.title")}</h2>
          <div className={styles.settings__toggle}>
            <span className={styles["settings__toggle-label"]}>
              {isDarkMode ? t("settings.theme.darkMode") : t("settings.theme.lightMode")}
            </span>
            <label className={styles["settings__toggle-switch"]}>
              <input type='checkbox' checked={isDarkMode} onChange={handleToggleTheme} />
              <span className={styles.settings__slider}></span>
            </label>
          </div>
          <h2 className={styles.settings__subtitle}>{t("settings.language.title")}</h2>
          <div className={styles["settings__radio-group"]}>
            <input
              type='radio'
              id='english'
              name='language'
              value='en'
              onChange={handleLanguageChange}
              checked={!isSpanish}
            />
            <label htmlFor='english'>{t("settings.language.english")}</label>
            <input
              type='radio'
              id='spanish'
              name='language'
              value='es'
              onChange={handleLanguageChange}
              checked={isSpanish}
            />
            <label htmlFor='spanish'>{t("settings.language.spanish")}</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
