import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ROUTES_PATH } from "src/postsManager/config/routes/routes";
import Home from "src/postsManager/adapters/primary/ui/pages/Home";
import { useSelector } from "react-redux";
import Login from "src/postsManager/adapters/primary/ui/pages/Login";
import { RootState } from "src/postsManager/adapters/secondary/redux/store";
import Settings from "src/postsManager/adapters/primary/ui/pages/Settings";
import CrudPostsUser from "./postsManager/adapters/primary/ui/pages/CrudPostsUser";

import * as styles from "./AppRouter.module.css";

export const AppRouter: React.FC = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <div className={isDarkMode ? styles["app--dark-mode"] : styles["app--light-mode"]}>
      <Router>
        <Routes>
          <Route path={ROUTES_PATH.HOME} Component={Home} />
          {!isAuthenticated && <Route path={ROUTES_PATH.LOGIN} Component={Login} />}
          {isAuthenticated && (
            <>
              <Route path={ROUTES_PATH.SETTINGS} Component={Settings} />
              <Route path={ROUTES_PATH.CRUD_POST_USER} Component={CrudPostsUser} />
            </>
          )}
          <Route path='*' element={<Navigate to={ROUTES_PATH.HOME} />} />
        </Routes>
      </Router>
    </div>
  );
};
