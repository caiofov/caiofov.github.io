import React from "react";
import { useTranslation } from "react-i18next";
import brazilFlag from "../../assets/brazil_flag.svg";
import usaFlag from "../../assets/usa_flag.svg";
import { PopRevealSequence } from "../animations/PopReveal";
import { OpacityRevealSequence } from "../animations/OpacityReveal";
import { Group, Text, Title } from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import { IconTooltip, ImageTooltip } from "../IconTooltip";
import { Typing } from "../animations/Typing";

const contactInfo = [
  {
    href: "https://www.linkedin.com/in/caio-oliveira1312/",
    icon: IconBrandLinkedin,
    text: "caio-oliveira1312",
    ariaLabel: "linkedin",
  },
  {
    href: "https://www.github.com/caiofov",
    icon: IconBrandGithub,
    text: "caiofov",
    ariaLabel: "github",
  },
  {
    text: "cfoviana@gmail.com",
    icon: IconMail,
    ariaLabel: "email",
  },
];

const languageInfo = [
  {
    code: "pt",
    href: "",
    image: brazilFlag,
  },
  {
    code: "en",
    href: "",
    image: usaFlag,
  },
];

export const Home = () => {
  const { t } = useTranslation();
  return (
    <section>
      <Group
        id="home-section"
        style={{ justifyContent: "center", alignItems: "center" }}
        mb="10%"
        mt="10%"
      >
        <Group display={"block"}>
          <Group id="home-section-title" display="block" mb="1%">
            <Title style={{ fontFamily: "monospace", fontSize: "6rem" }}>
              <Typing text={"Caio Oliveira"} duration={100} />
            </Title>
            <Title
              order={2}
              style={{ fontFamily: "monospace", fontSize: "2rem" }}
            >
              <Typing
                text={t("sections.home.role")}
                duration={50}
                delay={800}
              />
            </Title>
          </Group>

          <Group id="contact-info" mb="1%">
            <PopRevealSequence>
              {contactInfo.map(({ href, icon, text }) => (
                <IconTooltip
                  key={text}
                  href={href}
                  Icon={icon}
                  tooltip={text}
                />
              ))}
            </PopRevealSequence>
          </Group>

          <OpacityRevealSequence delayInit={1}>
            <Group id="download-cv">
              <Text style={{ fontFamily: "monospace" }}>
                {t("sections.home.download-cv")}:
              </Text>
              {languageInfo.map(({ code, href, image }) => (
                <ImageTooltip
                  imageSrc={image}
                  href={href}
                  tooltip={t(`sections.home.download-${code}`)}
                />
              ))}
            </Group>
            <Text size="lg" w="90%" style={{ fontFamily: "monospace" }}>
              {t("sections.home.text")}
            </Text>
          </OpacityRevealSequence>

          {/* <div className="photo">
        <PopReveal stiffness={20}>
          <HIAnimation width={"100%"} />
        </PopReveal>
      </div> */}
        </Group>
      </Group>
    </section>
  );
};
