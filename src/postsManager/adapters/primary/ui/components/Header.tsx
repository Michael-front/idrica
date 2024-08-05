import React, { useCallback, useState } from "react";
import LogoIdrica from "@assets/idrica_white-300x70.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { ROUTES_PATH } from "src/postsManager/config/routes/routes";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/postsManager/adapters/secondary/redux/store";
import { clearCredentials } from "src/postsManager/adapters/secondary/redux/authSlice";

import * as style from "./Header.module.css";

interface HeaderProps {
  isLoading: boolean;
}

const Header = ({ isLoading }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [isOpenDropDownMenuUser, setIsOpenDropDownMenuUSer] = useState<boolean>(false);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogoClick = useCallback(() => {
    navigate(ROUTES_PATH.HOME);
  }, [navigate]);

  const handleLogout = () => {
    dispatch(clearCredentials());
  };

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

        {!isAuthenticated && location.pathname !== ROUTES_PATH.LOGIN && (
          <Link className={style.header__login} to={"/login"}>
            {t("header.login")}
          </Link>
        )}

        {isAuthenticated && (
          <div
            className={style["header__user-menu"]}
            onClick={() => setIsOpenDropDownMenuUSer(!isOpenDropDownMenuUser)}
            onMouseEnter={() => setIsOpenDropDownMenuUSer(true)}
            onMouseLeave={() => setIsOpenDropDownMenuUSer(false)}
          >
            <span className={style.header__user}>{t("header.welcomeUser", { user: user?.user })} </span>
            <span className={style["header__user-arrow-down"]} />

            {isOpenDropDownMenuUser && (
              <div className={style["header__user-dropdown-menu"]}>
                <Link to={ROUTES_PATH.SETTINGS}>{t("header.config")}</Link>
                <a onClick={handleLogout}>{t("header.logout")}</a>
              </div>
            )}
          </div>
        )}
      </div>
      <Loader isLoading={isLoading} />
    </>
  );
};

export default React.memo(Header);
