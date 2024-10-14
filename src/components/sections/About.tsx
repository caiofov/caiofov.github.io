import {
  Badge,
  Grid,
  GridCol,
  Group,
  Text,
  ThemeIcon,
  Title,
  useMatches,
} from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { Section } from "./Section";
import { Icon } from "@tabler/icons-react";

import { typedEntries } from "../../utils/functions";

import { ABOUT_SECTIONS, SECTION_ICONS } from "../../utils/about";
import { OpacityRevealOnVisible } from "../animations/reveal/OpacityReveal";
import { PopRevealOnVisible } from "../animations/reveal/PopReveal";

const ItemAboutMobile: React.FC<{
  Icon: Icon;
  badges: string[];
  title: string;
  text: string;
}> = ({ Icon, title, text, badges }) => {
  const [titleSize, textSize] = useMatches({
    sm: ["1.7rem", "xl"],
    base: ["1.6", "lg"],
  });
  return (
    <GridCol span={12}>
      <Group justify="center">
        <Group
          w="80%"
          align="center"
          justify="center"
          style={{ textAlign: "center", flexDirection: "column" }}
        >
          <PopRevealOnVisible>
            <ThemeIcon size="80" variant="transparent" c="inherit" radius="md">
              <Icon size="80" />
            </ThemeIcon>
          </PopRevealOnVisible>
          <OpacityRevealOnVisible
            parentProps={{ style: { justifyContent: "center" } }}
          >
            <Title style={{ fontSize: titleSize }} order={4}>
              {title}
            </Title>
            <Text size={textSize}>{text}</Text>
            <Group gap="xs" justify="center" mt="md">
              {badges.map((b) => (
                <Badge key={b} variant="light">
                  {b}
                </Badge>
              ))}
            </Group>
          </OpacityRevealOnVisible>
        </Group>
      </Group>
    </GridCol>
  );
};

const ItemAboutDesktop: React.FC<{
  Icon: Icon;
  badges: string[];
  title: string;
  text: string;
  alignLeft: boolean;
}> = ({ Icon, title, text, badges, alignLeft }) => {
  const IconComponent = (
    <Group justify="center">
      <PopRevealOnVisible>
        <ThemeIcon size="70" variant="transparent" c="inherit" radius="md">
          <Icon size="70" />
        </ThemeIcon>
      </PopRevealOnVisible>
    </Group>
  );
  const textAlign = alignLeft ? "left" : "right";
  const justify = alignLeft ? "flex-start" : "flex-end";

  const BodyComponent = (
    <Group w="100%" gap="xs" justify={justify}>
      <OpacityRevealOnVisible delay={0.5}>
        <Title style={{ fontSize: "1.8rem", textAlign }} order={4}>
          {title}
        </Title>
        <Text size="xl" style={{ textAlign }}>
          {text}
        </Text>
        <Group
          justify={!alignLeft ? "flex-end" : "flex-start"}
          gap="xs"
          mt="md"
        >
          {badges.map((b) => (
            <Badge key={b} variant="light">
              {b}
            </Badge>
          ))}
        </Group>
      </OpacityRevealOnVisible>
    </Group>
  );
  const IconCell = <GridCol span={1}>{IconComponent}</GridCol>;
  const EmptyCell = <GridCol span={5}></GridCol>;
  const BodyCell = <GridCol span={5}>{BodyComponent}</GridCol>;
  return (
    <>
      {alignLeft ? (
        <>
          {EmptyCell}
          {IconCell}
          {BodyCell}
        </>
      ) : (
        <>
          {BodyCell}
          {IconCell}
          {EmptyCell}
        </>
      )}
    </>
  );
};

export const About = () => {
  const { t } = useTranslation();
  const isMobile = useMatches({ md: false, base: true });
  return (
    <Section text={t("sections.about.name")} id="about">
      <Grid w="100%" gutter={50} align="center" justify="center">
        {typedEntries(ABOUT_SECTIONS).map(([section, skills], idx) => {
          return isMobile ? (
            <ItemAboutMobile
              Icon={SECTION_ICONS[section]}
              title={t(`sections.about.${section}.title`)}
              text={t(`sections.about.${section}.text`)}
              badges={skills}
              key={section}
            />
          ) : (
            <ItemAboutDesktop
              Icon={SECTION_ICONS[section]}
              title={t(`sections.about.${section}.title`)}
              text={t(`sections.about.${section}.text`)}
              badges={skills}
              alignLeft={idx % 2 === 0}
              key={section}
            />
          );
        })}
      </Grid>
    </Section>
  );
};
