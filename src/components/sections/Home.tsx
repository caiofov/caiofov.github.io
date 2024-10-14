import React from "react";
import { useTranslation } from "react-i18next";
import brazilFlag from "../../assets/flags/brazil_flag.png";
import usaFlag from "../../assets/flags/usa_flag.png";
import { PopRevealSequence } from "../animations/PopReveal";
import { OpacityRevealSequence } from "../animations/OpacityReveal";
import {
  Group,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
  useMatches,
} from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import { CopyTooltip, IconTooltip, ImageTooltip } from "../IconTooltip";
import { Typing } from "../animations/Typing";
import { getSectionBackground, sectionPaddingX } from "../../utils/sections";
import Network from "../animations/Network";
import { DownloadCV } from "../DownloadCV";
import { motion } from "framer-motion";

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
  const iconSize = "2.5rem";
  const [titleFontSize, subtitleFontSize] = useMatches({
    md: ["7rem", "2rem"],
    base: ["6rem", "1.8rem"],
  });
  const px = useMatches(sectionPaddingX);
  const bg = getSectionBackground(true, useMantineColorScheme().colorScheme);
  const theme = useMantineTheme();
  return (
    <section>
      <Group
        id="home"
        m="0"
        bg={bg}
        px={px}
        align="center"
        h="100vh"
        display="flex"
      >
        <Group display="block" style={{ zIndex: "2" }}>
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

          <Group id="contact-info" pb="lg" gap="xs">
            <PopRevealSequence parentProps={{ gap: "xs" }}>
              {contactInfo.map(({ href, icon, text }) => {
                return href ? (
                  <IconTooltip
                    key={text}
                    href={href}
                    Icon={icon}
                    tooltip={text}
                    iconProps={{ size: iconSize }}
                    actionIconProps={{ size: iconSize }}
                  />
                ) : (
                  <CopyTooltip
                    key={text}
                    Icon={icon}
                    tooltip={text}
                    copyValue={text}
                    copiedTooltip={`(${t("sections.home.copied")})`}
                    iconProps={{ size: iconSize }}
                    actionIconProps={{ size: iconSize }}
                  />
                );
              })}
              <DownloadCV iconSize={iconSize} />
            </PopRevealSequence>
          </Group>

          <OpacityRevealSequence delayInit={1}>
            <Text size="lg" w="80%">
              {t("sections.home.text")}
            </Text>
            <></>
          </OpacityRevealSequence>
        </Group>
        <Group
          justify="center"
          align="center"
          pos="absolute"
          style={{ zIndex: "1" }}
        >
          <Network color={theme.colors.blue[9]} />
        </Group>
      </Group>
    </section>
  );
};
