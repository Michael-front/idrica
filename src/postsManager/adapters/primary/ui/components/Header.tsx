import React, { useCallback } from "react";
import LogoIdrica from "@assets/idrica_white-300x70.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { ROUTES_PATH } from "src/postsManager/config/routes/routes";
import { useTranslation } from "react-i18next";

import * as style from "./Header.module.css";

interface HeaderProps {
  isLoading: boolean;
}

const Header = ({ isLoading }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleLogoClick = useCallback(() => {
    navigate(ROUTES_PATH.HOME);
  }, [navigate]);

  return (
    <>
      <div role='roleHeader' className={style.header}>
        <img src={LogoIdrica} alt='logo' onClick={() => handleLogoClick()} />
        <ul className={style.header__menu}>
          <li className={style["header__menu-item"]}>
            <Link className={style["header__menu-link"]} to={ROUTES_PATH.HOME}>
              {t("header.menu.allPost")}
            </Link>
          </li>
        </ul>

        {location.pathname !== ROUTES_PATH.LOGIN && (
          <Link className={style.header__login} to={"/login"}>
            {t("header.login")}
          </Link>
        )}
      </div>
      <Loader isLoading={isLoading} />
    </>
  );
};

export default React.memo(Header);
