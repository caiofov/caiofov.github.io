import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import experiences from "../../assets/experiences.json";
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
import {
  ExperienceTimeline,
  EXPERIENCE_ICONS,
  ExperienceType,
  CompanyType,
} from "../ExperienceTimeline";
import EXPERIENCES from "../../assets/experiences.json";

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
  company: CompanyType;
  experience: ExperienceType;
  text: string;
}> = ({ company, text, experience }) => {
  const skills = experiences[company]["experiences"][experience] as string[];

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
  const [activeId, setActiveId] = useState<CompanyType>(
    Object.keys(EXPERIENCES)[activeIdx] as CompanyType
  );

  const [isMobile, paperWidth, timelineWidth] = useMatches({
    md: [false, "50%", "40%"],
    base: [true, "100%", "100%"],
  });

  const changeActiveExp = (idx: number) => {
    setActiveId(Object.keys(EXPERIENCES)[idx] as CompanyType);
    setActiveIdx(idx);
  };

  return (
    <Section id="experiences" text={t("sections.experiences.name")}>
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
                {Object.keys(EXPERIENCES[activeId]["experiences"]).map(
                  (exp) => {
                    return (
                      <ActivityItem
                        key={uuidv4()}
                        company={activeId}
                        experience={exp as ExperienceType}
                        text={t(
                          `sections.experiences.${activeId}.texts.${exp}`
                        )}
                      />
                    );
                  }
                )}
              </OpacityRevealSequence>
            </List>
          </ScrollArea>
        </Paper>
      </Group>
    </Section>
  );
};
