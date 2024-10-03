import React from "react";
import { useTranslation } from "react-i18next";
import { ReactTyped } from "react-typed";
import { Icon } from "../Icon";
import brazilFlag from "../../assets/brazil_flag.svg";
import usaFlag from "../../assets/usa_flag.svg";
import { PopRevealSequence } from "../animations/PopReveal";
import { OpacityRevealSequence } from "../animations/OpacityReveal";
import { Anchor, Group, Image, Text, Title, Tooltip } from "@mantine/core";

const CVLanguage: React.FC<{
  image: string;
  tooltipText: string;
  href: string;
}> = ({ image, tooltipText, href }) => {
  return (
    <Tooltip label={tooltipText}>
      <Anchor href={href}>
        <Image h={"20px"} src={image} />
      </Anchor>
    </Tooltip>
  );
};
export const Home = () => {
  const { t } = useTranslation();
  return (
    <section id="home-section" className="d-block">
      <Group className="title" display="block">
        <Title>
          <ReactTyped
            className="typed-h1"
            strings={["Caio Oliveira"]}
            typeSpeed={100}
            onComplete={(self) => self.cursor.remove()}
          />
        </Title>
        <Title order={2}>
          <ReactTyped
            className="typed-h2"
            strings={[t("sections.home.role")]}
            typeSpeed={50}
            startDelay={800}
            onComplete={(self) => self.cursor.remove()}
          />
        </Title>
      </Group>
      <Group
        id="contact-info"
        className="d-flex justify-content-between mt-4 mb-3 align-items-center"
      >
        <PopRevealSequence>
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
        </PopRevealSequence>
      </Group>
      <OpacityRevealSequence delayInit={1}>
        <Group id="download-cv" className="">
          <Text className="d-inline m-0 p-0">
            {t("sections.home.download-cv")}:
          </Text>
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
        </Group>
        <Text>{t("sections.home.text")}</Text>
      </OpacityRevealSequence>

      {/* <div className="photo">
        <PopReveal stiffness={20}>
          <HIAnimation width={"100%"} />
        </PopReveal>
      </div> */}
    </section>
  );
};
