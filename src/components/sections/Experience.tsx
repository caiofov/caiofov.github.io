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
  ThemeIcon,
  Timeline,
  Title,
} from "@mantine/core";
import { Section } from "./Section";
import { useHover } from "@mantine/hooks";
import {
  Icon,
  IconBrowser,
  IconDeviceDesktop,
  IconMessageChatbot,
} from "@tabler/icons-react";
import { PopReveal } from "../animations/PopReveal";
import {
  activeBulletStyle,
  activeExperienceStyle,
  bulletStyle,
  experienceStyle,
} from "../../styles/experience";
import { Typing } from "../animations/Typing";
import { v4 as uuidv4 } from "uuid";

type CompanyType = keyof typeof experiences;
type ExperienceType = keyof (typeof experiences)[CompanyType]["experiences"];

const experienceIcons = {
  milenio: IconDeviceDesktop,
  ckl: IconMessageChatbot,
  codijr: IconBrowser,
};

const ExperienceTitle: React.FC<{
  company: string;
  start: string;
  end: string;
  role: string;
  active: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  Bullet: Icon;
}> = ({ company, start, end, role, active, onClick, Bullet }) => {
  const { hovered, ref } = useHover();
  const isActiveOrHovered = hovered || active;
  const style = isActiveOrHovered ? activeExperienceStyle : experienceStyle;
  const bullet = isActiveOrHovered ? activeBulletStyle : bulletStyle;

  return (
    <Timeline.Item
      bullet={
        <ThemeIcon
          variant={active ? "gradient" : "transparent"}
          size="lg"
          radius="lg"
          style={bullet}
        >
          <Bullet />
        </ThemeIcon>
      }
      onClick={onClick}
      ref={ref}
      style={style}
      title={role}
    >
      <Text>{company}</Text>
      <Text c="dimmed">
        {start} - {end}
      </Text>
    </Timeline.Item>
  );
};
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

const ExperienceTimeline: React.FC<{
  changeActive: (idx: number) => void;
  activeIdx: number;
}> = ({ changeActive, activeIdx }) => {
  const { t } = useTranslation();
  return (
    <Timeline
      h="100%"
      active={activeIdx + 1}
      bulletSize={30}
      lineWidth={2}
      style={{ alignItems: "stretch" }}
    >
      {Object.keys(experiences).map((c, idx) => {
        const company = c as CompanyType;
        return (
          <ExperienceTitle
            key={company}
            company={experiences[company as CompanyType].name}
            start={t(`sections.experiences.${company}.start`)}
            end={t(`sections.experiences.${company}.end`)}
            role={t(`sections.experiences.${company}.role`)}
            active={idx === activeIdx}
            onClick={(e) => {
              e.preventDefault();
              changeActive(idx);
            }}
            Bullet={experienceIcons[company]}
          />
        );
      })}
    </Timeline>
  );
};

export const Experience = () => {
  const { t } = useTranslation();
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeId, setActiveId] = useState<CompanyType>(
    Object.keys(experiences)[activeIdx] as CompanyType
  );

  const changeActiveExp = (idx: number) => {
    setActiveId(Object.keys(experiences)[idx] as CompanyType);
    setActiveIdx(idx);
  };

  return (
    <Section id="experiences" text={t("sections.experiences.name")}>
      <Group
        display={"flex"}
        w="100%"
        mt="xl"
        style={{
          justifyContent: "space-evenly",
        }}
      >
        <Group w={"40%"} justify="center">
          <ExperienceTimeline
            changeActive={changeActiveExp}
            activeIdx={activeIdx}
          />
        </Group>

        <Paper w="50%" withBorder radius="md" shadow="xl" p="lg">
          <ExperienceBodyTitle
            companyName={experiences[activeId].name}
            role={t(`sections.experiences.${activeId}.role`)}
            ExperienceIcon={experienceIcons[activeId]}
          />

          <ScrollArea h={250} p="sm" type="always" scrollbars="y">
            <List w={"90%"}>
              <OpacityRevealSequence delayInit={0.5} delayIncrease={0.1}>
                {Object.keys(experiences[activeId]["experiences"]).map(
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
