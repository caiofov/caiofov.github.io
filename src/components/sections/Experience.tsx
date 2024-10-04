import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import experiences from "../../assets/experiences.json";
import { OpacityRevealSequence } from "../animations/OpacityReveal";
import { Group, List, Text, Title } from "@mantine/core";
import { Section } from "./Section";
import { useHover } from "@mantine/hooks";

type CompanyType = keyof typeof experiences;
type ExperienceType = keyof (typeof experiences)[CompanyType]["experiences"];

const ExperienceTitle: React.FC<{
  company: string;
  start: string;
  end: string;
  role: string;
  active: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}> = ({ company, start, end, role, active, onClick }) => {
  const { hovered, ref } = useHover();
  const style = hovered
    ? {
        opacity: "50%",
        cursor: "pointer",
      }
    : {
        transition: "all 0.3s ease-in-out",
      };
  return (
    <Group display="block" onClick={onClick} ref={ref} style={style}>
      <Title order={4}>{role}</Title>
      <Text>{company}</Text>
      <Text>
        {start} - {end}
      </Text>
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
    <List.Item>
      <Text>{text}</Text>

      <Group display={"flex"}>
        {skills.map((skill) => {
          return <Text>{skill}</Text>;
        })}
      </Group>
    </List.Item>
  );
};

export const Experience = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(
    Object.keys(experiences)[0] as CompanyType
  );
  return (
    <Section id="experiences" text={t("sections.experiences.name")}>
      <Group>
        <Group
          id="experiences-select"
          display={"flex"}
          justify="space-around"
          w="100%"
          mt="2%"
        >
          {Object.keys(experiences).map((c) => {
            const company = c as CompanyType;
            return (
              <ExperienceTitle
                key={company}
                company={experiences[company as keyof typeof experiences].name}
                start={t(`sections.experiences.${company}.start`)}
                end={t(`sections.experiences.${company}.end`)}
                role={t(`sections.experiences.${company}.role`)}
                active={company === active}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(company);
                }}
              />
            );
          })}
        </Group>
        <Group id="experiences-body" mt="2%">
          <List>
            <OpacityRevealSequence
              delayIncrease={(len) => {
                return len > 5 ? 0.1 : 10;
              }}
            >
              {Object.keys(experiences[active]["experiences"]).map((e) => {
                const exp = e as ExperienceType;
                return (
                  <ExperienceItem
                    key={active + exp}
                    company={active}
                    experience={exp}
                    text={t(
                      `sections.experiences.${active}.texts.${exp as string}`
                    )}
                  />
                );
              })}
            </OpacityRevealSequence>
          </List>
        </Group>
      </Group>
    </Section>
  );
};
