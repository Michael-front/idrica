import React from "react";
import { useTranslation } from "react-i18next";

export const AppRouter: React.FC = () => {
  const { t } = useTranslation();

  return <p>{t("welcome", { user: "Kal-el" })}</p>;
};
