import { Title } from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";

export const Projects = () => {
  const { t } = useTranslation();
  return (
    <section id="projects">
      <Title order={3}>{t("sections.projects.name")}</Title>
    </section>
  );
};
