import React from "react";
import { useTranslation } from "react-i18next";
import { ReactTyped } from "react-typed";
import { HIAnimation } from "../animations/HiAnimation";

export const Home = () => {
  const { t } = useTranslation();
  return (
    <div id="home-section">
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
              strings={[t("role")]}
              typeSpeed={50}
              startDelay={800}
              onComplete={(self) => self.cursor.remove()}
            />
          </h2>
        </div>
        <p>{t("home-text")}</p>
      </div>

      <div className="photo">
        <HIAnimation width={"100%"} />
      </div>
    </div>
  );
};
