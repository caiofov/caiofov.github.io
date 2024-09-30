import React from "react";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

export const About = () => {
  const { t } = useTranslation();
  return (
    <section id="about-me">
      <div id="about-me-main">
        <h3>{t("sections.about.name")}</h3>
        <Trans className="justify" i18nKey={"sections.about.text"} />
      </div>
    </section>
  );
};
