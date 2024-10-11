import React from "react";
import { useTranslation } from "react-i18next";
import brazilFlag from "../../assets/brazil_flag.svg";
import usaFlag from "../../assets/usa_flag.svg";
import { PopRevealSequence } from "../animations/PopReveal";
import { OpacityRevealSequence } from "../animations/OpacityReveal";
import { Group, Text, Title, useMatches } from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import { CopyTooltip, IconTooltip, ImageTooltip } from "../IconTooltip";
import { Typing } from "../animations/Typing";

const contactInfo = [
  {
    href: "https://www.linkedin.com/in/caio-oliveira1312/",
    icon: IconBrandLinkedin,
    text: "LinkedIn",
  },
  {
    href: "https://www.github.com/caiofov",
    icon: IconBrandGithub,
    text: "GitHub",
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
  const [titleFontSize, subtitleFontSize] = useMatches({
    md: ["6rem", "2rem"],
    sm: ["5rem", "1.5rem"],
    base: ["4.2rem", "1.5rem"],
  });
  return (
    <section>
      <Group id="home" align="center" my="xl" h="80vh">
        <Group display="block">
          <Group id="home-title" display="block" mb="lg">
            <Title style={{ fontSize: titleFontSize }}>
              <Typing text="Caio Oliveira" duration={100} />
            </Title>
            <Title
              order={2}
              style={{
                fontSize: subtitleFontSize,
              }}
            >
              <Typing
                text={t("sections.home.role")}
                duration={50}
                delay={800}
              />
            </Title>
          </Group>

          <Group id="contact-info" mb="lg" gap="xs">
            <PopRevealSequence>
              {contactInfo.map(({ href, icon, text }) => {
                return href ? (
                  <IconTooltip
                    key={text}
                    href={href}
                    Icon={icon}
                    tooltip={text}
                  />
                ) : (
                  <CopyTooltip
                    key={text}
                    Icon={icon}
                    tooltip={text}
                    copyValue={text}
                    copiedTooltip={`(${t("sections.home.copied")})`}
                  />
                );
              })}
            </PopRevealSequence>
          </Group>

          <OpacityRevealSequence delayInit={1}>
            <Group id="download-cv">
              <Text>{t("sections.home.download-cv")}:</Text>
              {languageInfo.map(({ code, href, image }) => (
                <ImageTooltip
                  key={code}
                  imageSrc={image}
                  href={href}
                  tooltip={t(`sections.home.download-${code}`)}
                />
              ))}
            </Group>
            <Text size="lg" w="90%">
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
