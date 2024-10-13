import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { OpacityRevealSequence } from "../animations/OpacityReveal";

import {
  alpha,
  Badge,
  Group,
  List,
  Paper,
  ScrollArea,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
  useMatches,
} from "@mantine/core";
import { Section } from "./Section";
import { Icon } from "@tabler/icons-react";
import { PopReveal } from "../animations/PopReveal";

import { Typing } from "../animations/Typing";
import { v4 as uuidv4 } from "uuid";
import { ExperienceTimeline } from "../ExperienceTimeline";
import {
  CompanyIDType,
  EXPERIENCE_ICONS,
  EXPERIENCES,
} from "../../utils/experience";
import { typedKeys } from "../../utils/functions";

const ExperienceBodyTitle: React.FC<{
  role: string;
  companyName: string;
  ExperienceIcon: Icon;
}> = ({ role, companyName, ExperienceIcon }) => {
  const [titleSize, subTitleSize] = useMatches({
    sm: ["xl", "lg"],
    base: ["lg", "sm"],
  });
  return (
    <Group wrap="nowrap">
      <PopReveal>
        <ExperienceIcon />
      </PopReveal>
      <Group
        mb="sm"
        gap="0"
        style={{ flexDirection: "column", alignItems: "flex-start" }}
      >
        <Title order={4} size={titleSize}>
          <Typing text={role} duration={25} />
        </Title>
        <Text size={subTitleSize}>
          <Typing text={companyName} duration={25} delay={500} />
        </Text>
      </Group>
    </Group>
  );
};

export const Experience = () => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeId, setActiveId] = useState<CompanyIDType>(
    typedKeys(EXPERIENCES)[activeIdx]
  );

  const [isMobile, paperWidth, paperPadding, timelineWidth] = useMatches({
    md: [false, "50%", "xl", "40%"],
    base: [true, "100%", "sm", "80%"],
  });

  const changeActiveExp = (idx: number) => {
    scrollRef.current!.scrollTo({ top: 0 });
    setActiveId(typedKeys(EXPERIENCES)[idx]);
    setActiveIdx(idx);
  };
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  console.log(theme);

  return (
    <Section
      id="experiences"
      position="right"
      text={t("sections.experiences.name")}
    >
      <Group display="flex" justify="space-evenly">
        <Group w={timelineWidth} justify="center">
          <ExperienceTimeline
            changeActive={changeActiveExp}
            activeIdx={activeIdx}
            isMobile={isMobile}
          />
        </Group>

        <Paper
          w={paperWidth}
          radius="md"
          mt="xl"
          shadow="xl"
          p={paperPadding}
          withBorder
          variant="custom-light"
        >
          <ExperienceBodyTitle
            companyName={EXPERIENCES[activeId].name}
            role={t(`sections.experiences.${activeId}.role`)}
            ExperienceIcon={EXPERIENCE_ICONS[activeId]}
          />

          <ScrollArea
            viewportRef={scrollRef}
            h={350}
            w="100%"
            p="md"
            type="always"
            scrollbars="y"
          >
            <List mr="lg">
              <OpacityRevealSequence delayInit={0.5} delayIncrease={0.1}>
                {typedKeys(EXPERIENCES[activeId].activities).map((exp, idx) => {
                  const skills = EXPERIENCES[activeId]["activities"][exp];
                  const marginBottom =
                    idx - 1 ===
                    Object.keys(EXPERIENCES[activeId].activities).length
                      ? "0"
                      : "md";
                  return (
                    <List.Item mb={marginBottom} key={uuidv4()}>
                      <Text size="lg">
                        {t(`sections.experiences.${activeId}.texts.${exp}`)}
                      </Text>

                      {skills.length ? (
                        <Group display="flex" gap="xs" mt="sm">
                          {skills.map((skill) => (
                            <Badge key={skill} variant="light">
                              {skill}
                            </Badge>
                          ))}
                        </Group>
                      ) : null}
                    </List.Item>
                  );
                })}
              </OpacityRevealSequence>
            </List>
          </ScrollArea>
        </Paper>
      </Group>
    </Section>
  );
};
