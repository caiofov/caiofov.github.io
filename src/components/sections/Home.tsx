import React from "react";
import { useTranslation } from "react-i18next";
import { ReactTyped } from "react-typed";
import { HIAnimation } from "../animations/HiAnimation";
import { Icon } from "../Icon";
import brazilFlag from "../../assets/brazil_flag.svg";
import usaFlag from "../../assets/usa_flag.svg";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const CVLanguage: React.FC<{
  image: string;
  tooltipText: string;
  href: string;
}> = ({ image, tooltipText, href }) => {
  return (
    <a href={href}>
      <img src={image} title={tooltipText} />
    </a>
  );
};
export const Home = () => {
  const { t } = useTranslation();
  return (
    <section id="home-section">
      <div id="home-left-section">
        <div className="title">
          <h1>
            <ReactTyped
              className="typed-h1"
              strings={["Caio Oliveira"]}
              typeSpeed={100}
              onComplete={(self) => self.cursor.remove()}
            />
          </h1>
          <h2>
            <ReactTyped
              className="typed-h2"
              strings={[t("sections.home.role")]}
              typeSpeed={50}
              startDelay={800}
              onComplete={(self) => self.cursor.remove()}
            />
          </h2>
        </div>
        <div
          id="contact-info"
          className="d-flex justify-content-between mt-4 mb-3"
        >
          <Icon
            iconName="linkedin"
            href="https://www.linkedin.com/in/caio-oliveira1312/"
            text="caio-oliveira1312"
          />
          <Icon
            iconName="github"
            href="https://www.github.com/caiofov"
            text="caiofov"
          />
          <Icon iconName="envelope-fill" text="cfoviana@gmail.com" />
        </div>

        <div id="download-cv" className="">
          <p className="d-inline m-0 p-0">{t("sections.home.download-cv")}:</p>
          <CVLanguage
            image={brazilFlag}
            href=""
            tooltipText={t("sections.home.download-pt")}
          />
          <CVLanguage
            image={usaFlag}
            href=""
            tooltipText={t("sections.home.download-en")}
          />
        </div>
        <p>{t("sections.home.text")}</p>
      </div>

      <div className="photo">
        <HIAnimation width={"100%"} />
      </div>
    </section>
  );
};
