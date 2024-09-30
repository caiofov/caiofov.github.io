import React from "react";
import { useTranslation } from "react-i18next";

export const Projects = () => {
  const { t } = useTranslation();
  return (
    <section id="projects">
      <h3>{t("sections.projects.name")}</h3>
    </section>
  );
};
