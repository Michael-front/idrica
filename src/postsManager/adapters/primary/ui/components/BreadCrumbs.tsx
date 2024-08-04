import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import * as style from "./BreadCrumbs.module.css";

interface BreadCrumbsProps {
  data: { path: string; url: string }[];
}

const BreadCrumbs = ({ data }: BreadCrumbsProps) => {
  const navigate = useNavigate();

  const handleClick = useCallback(
    (url: string) => {
      navigate(url);
    },
    [navigate],
  );

  return (
    <div className={style.breadCrumbs}>
      {data.map(({ path, url }, index) => (
        <span key={index} className={style.breadCrumbs__item} onClick={() => handleClick(url)}>
          {path}
        </span>
      ))}
    </div>
  );
};

export default React.memo(BreadCrumbs);
