import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ROUTES_PATH } from "src/postsManager/config/routes/routes";
import Home from "src/postsManager/adapters/primary/ui/pages/Home";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "src/postsManager/adapters/secondary/redux/themeSlice";

import * as styles from "./AppRouter.module.css";

export const AppRouter: React.FC = () => {
  const isDarkMode = useSelector(selectIsDarkMode);
  return (
    <div className={isDarkMode ? styles["app--dark-mode"] : styles["app--light-mode"]}>
      <Router>
        <Routes>
          <Route path={ROUTES_PATH.HOME} Component={Home} />
        </Routes>
      </Router>
    </div>
  );
};
