import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { PopRevealSequence } from "../animations/reveal/PopReveal";
import { OpacityRevealSequence } from "../animations/reveal/OpacityReveal";
import {
  Group,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
  useMantineTheme,
  useMatches,
} from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import { CopyTooltip, IconTooltip } from "../IconTooltip";
import { Typing } from "../animations/Typing";
import { sectionPaddingX } from "../../utils/sections";
import Network from "../animations/Network";
import { DownloadCV } from "../DownloadCV";
import useWindowDimensions from "../../hooks/windowDimension";
import {
  Css3Plain,
  DjangoPlain,
  ExpressOriginal,
  FastapiOriginal,
  FastapiPlain,
  Html5Plain,
  JavascriptPlain,
  MongodbPlain,
  MysqlOriginal,
  NodejsPlain,
  PostgresqlOriginal,
  PostgresqlPlain,
  PythonOriginal,
  PythonPlain,
  ReactOriginal,
  SveltePlain,
  TypescriptPlain,
} from "devicons-react";

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

const skillIcons = [
  { tooltip: "Python", Icon: PythonPlain },
  { tooltip: "FastAPI", Icon: FastapiPlain },
  { tooltip: "Django", Icon: DjangoPlain },
  { tooltip: "TypeScript", Icon: TypescriptPlain },
  { tooltip: "JavaScript", Icon: JavascriptPlain },
  { tooltip: "NodeJS", Icon: NodejsPlain },
  // { tooltip: "ExpressJS", Icon: ExpressOriginal }, //TODO: find icon
  { tooltip: "MongoDB", Icon: MongodbPlain },
  { tooltip: "PostgreSQL", Icon: PostgresqlPlain },
  { tooltip: "MySQL", Icon: MysqlOriginal }, //TODO: fix fill for this icon
  { tooltip: "React", Icon: ReactOriginal },
  { tooltip: "Svelte", Icon: SveltePlain },
  { tooltip: "HTML", Icon: Html5Plain },
  { tooltip: "CSS", Icon: Css3Plain },
];

export const Home = () => {
  const { t } = useTranslation();
  const iconSize = "2.5rem";
  const [titleFontSize, subtitleFontSize, animationLeft] = useMatches({
    md: ["7rem", "2rem", "20%"],
    sm: ["6rem", "1.8rem", "5%"],
    base: ["5rem", "1.5rem"],
  });
  const px = useMatches(sectionPaddingX);
  const { height, width } = useWindowDimensions();

  return (
    <Group
      component="section"
      variant="main-section"
      id="home"
      m="0"
      px={px}
      align="center"
      mih="100vh"
      display="flex"
    >
      <Group
        style={{
          zIndex: "2",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
        gap="xs"
      >
        <Group
          id="home-title"
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
          }}
          mb="md"
        >
          <Title style={{ fontSize: titleFontSize }}>
            <Typing text="Caio Oliveira" duration={100} />
          </Title>
          <Title
            order={2}
            style={{
              fontSize: subtitleFontSize,
            }}
          >
            <Typing text={t("sections.home.role")} duration={50} delay={800} />
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

        {/* <OpacityRevealSequence delay={1}>
          <Text size="lg" w="80%">
            {t("sections.home.text")}
          </Text>
        </OpacityRevealSequence> */}
        <PopRevealSequence staggerChildren={0.2}>
          {skillIcons.map(({ tooltip, Icon }) => (
            <Tooltip label={tooltip} key={tooltip} position="bottom" withArrow>
              <Group className="devicon">
                <Icon size="25" />
              </Group>
            </Tooltip>
          ))}
        </PopRevealSequence>
      </Group>
      <Group
        pos="absolute"
        display="flex"
        justify="flex-end"
        style={{ zIndex: "1" }}
        w="80%"
        left={animationLeft}
      >
        <Network
          color="var(--mantine-primary-color-light-color)"
          width={width * 0.8}
          height={height}
        />
      </Group>
    </Group>
  );
};
