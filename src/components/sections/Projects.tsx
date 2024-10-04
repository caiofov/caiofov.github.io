import { Card, Group, Title, Image, Text, Badge, Anchor } from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";
import projects from "../../assets/projects.json";
import {
  IconCode,
  IconDeviceGamepad,
  IconFloatCenter,
  IconPaperclip,
  IconStackMiddle,
  IconWorld,
} from "@tabler/icons-react";
import { Section } from "./Section";
type ProjectType = (typeof projects)[keyof typeof projects];

const AnchorIcons = {
  repo: IconCode,
  paper: IconPaperclip,
  game: IconDeviceGamepad,
  site: IconWorld,
  back: IconStackMiddle,
  front: IconFloatCenter,
};

type AnchorType = {
  text: string;
  link: string;
  type: keyof typeof AnchorIcons;
};

type CompleteProjectType = {
  title: string;
  text: string;
  anchorsMapped: AnchorType[];
} & ProjectType;

const ProjectAnchor: React.FC<{
  anchor: AnchorType;
}> = ({ anchor }) => {
  const AnchorIcon = AnchorIcons[anchor.type];
  return (
    <Group>
      <AnchorIcon />
      <Anchor href={anchor.link}>{anchor.text}</Anchor>
    </Group>
  );
};

const ProjectItem: React.FC<{ project: CompleteProjectType }> = ({
  project,
}) => {
  return (
    <Card
      p={"2%"}
      shadow="sm"
      radius="md"
      withBorder
      style={{ maxWidth: "30%", alignContent: "center" }}
    >
      {"img" in project && project["img"].length > 0 ? (
        <Card.Section>
          <Image radius="md" src={project.img} height={300} />
        </Card.Section>
      ) : null}
      <Card.Section p={"1%"}>
        <Title mt={"1%"} order={4}>
          {project.title}
        </Title>
      </Card.Section>
      <Card.Section>
        {project.techs.sort().map((tech) => {
          return (
            <Badge radius="sm" mr={"1%"} size="sm">
              {tech}
            </Badge>
          );
        })}
      </Card.Section>

      <Card.Section p={"1%"}>
        <Text size="sm">{project.text}</Text>
      </Card.Section>

      <Card.Section>
        <Text fw={"bold"}>Links:</Text>
        <Group display={"flex"}>
          {project.anchorsMapped.map((anchor) => (
            <ProjectAnchor anchor={anchor} />
          ))}
        </Group>
      </Card.Section>
    </Card>
  );
};

export const Projects = () => {
  const { t } = useTranslation();

  const getProjectAnchors = (proj: ProjectType) => {
    return Object.keys(proj.anchors).map((anchorType) => {
      const type = anchorType as keyof ProjectType["anchors"];
      return {
        text: t(`sections.projects.anchors.${anchorType}`),
        link: proj.anchors[type],
        type,
      } as AnchorType;
    });
  };

  return (
    <Section id="projects" text={t("sections.projects.name")}>
      <Group display="flex" align="top">
        {Object.keys(projects).map((key) => {
          const proj = projects[key as keyof typeof projects];
          return (
            <ProjectItem
              project={{
                ...proj,
                title: t(`sections.projects.${key}.title`),
                text: t(`sections.projects.${key}.text`),
                anchorsMapped: getProjectAnchors(proj),
              }}
            />
          );
        })}
      </Group>
    </Section>
  );
};
