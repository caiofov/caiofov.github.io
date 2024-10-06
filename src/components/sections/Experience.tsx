import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { OpacityRevealSequence } from "../animations/OpacityReveal";

import {
  Badge,
  Group,
  List,
  Paper,
  ScrollArea,
  Text,
  Title,
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
  return (
    <Group>
      <PopReveal>
        <ExperienceIcon />
      </PopReveal>
      <Group display={"block"} mb="sm">
        <Title order={4}>
          <Typing text={role} duration={25} />
        </Title>
        <Text>
          <Typing text={companyName} duration={25} delay={500} />
        </Text>
      </Group>
    </Group>
  );
};
const ActivityItem: React.FC<{
  company: CompanyIDType;
  activity: string;
  text: string;
}> = ({ company, text, activity }) => {
  const skills = EXPERIENCES[company]["activities"][activity];

  return (
    <List.Item mb="md">
      <Text mb="sm">{text}</Text>

      <Group display={"flex"} gap="xs">
        {skills.map((skill) => (
          <Badge key={skill} variant="light">
            {skill}
          </Badge>
        ))}
      </Group>
    </List.Item>
  );
};

export const Experience = () => {
  const { t } = useTranslation();
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeId, setActiveId] = useState<CompanyIDType>(
    typedKeys(EXPERIENCES)[activeIdx]
  );

  const [isMobile, paperWidth, timelineWidth] = useMatches({
    md: [false, "50%", "40%"],
    base: [true, "100%", "100%"],
  });

  const changeActiveExp = (idx: number) => {
    setActiveId(typedKeys(EXPERIENCES)[idx]);
    setActiveIdx(idx);
  };

  return (
    <Section
      id="experiences"
      position="right"
      text={t("sections.experiences.name")}
    >
      <Group
        display={"flex"}
        w="100%"
        mt="md"
        style={{
          justifyContent: "space-evenly",
        }}
      >
        <Group w={timelineWidth} justify="center">
          <ExperienceTimeline
            changeActive={changeActiveExp}
            activeIdx={activeIdx}
            isMobile={isMobile}
          />
        </Group>

        <Paper w={paperWidth} withBorder radius="md" shadow="xl" p="lg">
          <ExperienceBodyTitle
            companyName={EXPERIENCES[activeId].name}
            role={t(`sections.experiences.${activeId}.role`)}
            ExperienceIcon={EXPERIENCE_ICONS[activeId]}
          />

          <ScrollArea h={250} p="sm" type="always" scrollbars="y">
            <List w={"90%"}>
              <OpacityRevealSequence delayInit={0.5} delayIncrease={0.1}>
                {typedKeys(EXPERIENCES[activeId].activities).map((exp) => {
                  return (
                    <ActivityItem
                      key={uuidv4()}
                      company={activeId}
                      activity={exp}
                      text={t(`sections.experiences.${activeId}.texts.${exp}`)}
                    />
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
