import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import experiences from "../../assets/experiences.json";
import { OpacityRevealSequence } from "../animations/OpacityReveal";

import {
  Badge,
  Group,
  List,
  MantineStyleProp,
  Paper,
  ScrollArea,
  Text,
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
  const style: MantineStyleProp = isActiveOrHovered
    ? {
        cursor: "pointer",
      }
    : {
        transition: "all 0.3s ease-in-out",
      };

  const bulletStyle: React.CSSProperties = isActiveOrHovered
    ? {
        cursor: "pointer",
        opacity: "100%",
      }
    : {
        opacity: "50%",
        transition: "all 0.3s ease-in-out",
      };

  return (
    <Timeline.Item
      bullet={<Bullet size="xs" style={bulletStyle} />}
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
const ExperienceItem: React.FC<{
  company: CompanyType;
  experience: ExperienceType;
  text: string;
}> = ({ company, text, experience }) => {
  const skills = experiences[company]["experiences"][experience] as string[];

  return (
    <List.Item mb="md">
      <Text mb="sm">{text}</Text>

      <Group display={"flex"}>
        {skills.map((skill) => {
          return <Badge>{skill}</Badge>;
        })}
      </Group>
    </List.Item>
  );
};

export const Experience = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const getActiveCompany = () =>
    Object.keys(experiences)[active] as CompanyType;

  return (
    <Section id="experiences" text={t("sections.experiences.name")}>
      <Group display={"flex"} w="100%" mt="lg" ml="5%">
        <Group w={"40%"} justify="center">
          <Timeline active={active + 1} bulletSize={30} lineWidth={2}>
            {Object.keys(experiences).map((c, idx) => {
              const company = c as CompanyType;
              return (
                <ExperienceTitle
                  key={company}
                  company={
                    experiences[company as keyof typeof experiences].name
                  }
                  start={t(`sections.experiences.${company}.start`)}
                  end={t(`sections.experiences.${company}.end`)}
                  role={t(`sections.experiences.${company}.role`)}
                  active={idx === active}
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(idx);
                  }}
                  Bullet={experienceIcons[company]}
                />
              );
            })}
          </Timeline>
        </Group>
        <Paper w="50%" withBorder radius="md" shadow="xl" p="lg">
          <ExperienceBodyTitle
            companyName={experiences[getActiveCompany()].name}
            role={t(`sections.experiences.${getActiveCompany()}.role`)}
            ExperienceIcon={experienceIcons[getActiveCompany()]}
          />

          <ScrollArea h={250} p="sm" type="always" scrollbars="y">
            <List w={"90%"}>
              <OpacityRevealSequence delayInit={0.5} delayIncrease={0.1}>
                {Object.keys(
                  experiences[getActiveCompany()]["experiences"]
                ).map((e) => {
                  const exp = e as ExperienceType;
                  return (
                    <ExperienceItem
                      company={getActiveCompany()}
                      experience={exp}
                      text={t(
                        `sections.experiences.${getActiveCompany()}.texts.${
                          exp as string
                        }`
                      )}
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
