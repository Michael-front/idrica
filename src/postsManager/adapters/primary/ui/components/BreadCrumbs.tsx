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

  const renderItem = (index: number, path: string, url: string) => (
    <span key={index} className={style.breadCrumbs__item} onClick={() => handleClick(url)}>
      {path}
    </span>
  );

  return (
    <div className={style.breadCrumbs}>
      {data.map(({ path, url }, index) =>
        index === data.length || index === 0 ? (
          renderItem(index, path, url)
        ) : (
          <div key={`container-separator-${index}`}>
            <span key={`separator-${index}`} className={style.breadCrumbs__separator}>{`>`}</span>
            {renderItem(index, path, url)}
          </div>
        ),
      )}
    </div>
  );
};

export default React.memo(BreadCrumbs);
