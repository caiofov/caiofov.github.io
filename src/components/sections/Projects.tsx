import {
  Card,
  Group,
  Title,
  Image,
  Text,
  Badge,
  Anchor,
  Grid,
  GridCol,
  ThemeIcon,
  useMatches,
} from "@mantine/core";
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
    <Group w="fit-content" gap="xs" mr="sm">
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
      p="xl"
      shadow="xl"
      radius="lg"
      withBorder
      h="100%"
      w="100%"
      style={{
        justifyContent: "space-between",
      }}
    >
      <Card.Section>
        {"img" in project && project["img"].length > 0 ? (
          <Image radius="xl" src={project.img} height={300} />
        ) : null}
        <Title mt="md" mb="sm" order={4}>
          {project.title}
        </Title>
        <Group mb="md" justify="flex-start" gap="xs">
          {project.techs.sort().map((tech) => {
            return (
              <Badge key={tech} radius="sm" mr="xs" size="sm" variant="light">
                {tech}
              </Badge>
            );
          })}
        </Group>
      </Card.Section>

      <Card.Section mb="xl">
        <Text>{project.text}</Text>
      </Card.Section>

      <Card.Section>
        <Title order={5} mb="sm">
          Links:
        </Title>
        <Group display="flex">
          {project.anchorsMapped.map((anchor) => (
            <ProjectAnchor key={anchor.link} anchor={anchor} />
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
  const justify = useMatches({
    md: "flex-start",
    base: "center",
  });

  return (
    <Section id="projects" text={t("sections.projects.name")}>
      <Grid gutter={{ md: "lg", sm: "xs" }} align="stretch" justify={justify}>
        {Object.keys(projects).map((key) => {
          const proj = projects[key as keyof typeof projects];
          return (
            <GridCol span={{ lg: 4, md: 6, xs: 10 }}>
              <ProjectItem
                key={key}
                project={{
                  ...proj,
                  title: t(`sections.projects.${key}.title`),
                  text: t(`sections.projects.${key}.text`),
                  anchorsMapped: getProjectAnchors(proj),
                }}
              />
            </GridCol>
          );
        })}
      </Grid>
    </Section>
  );
};
