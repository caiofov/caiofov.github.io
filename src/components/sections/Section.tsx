import { Group, Title } from "@mantine/core";
import React from "react";

export const Section: React.FC<{
  text: string;
  id: string;
  children: JSX.Element;
}> = ({ text, children, id }) => {
  return (
    <section>
      <Group id={id} mb="5%">
        <Title order={3} style={{ fontSize: "2rem", fontFamily: "monospace" }}>
          {"< "}
          {text}
          {" />"}
        </Title>
        {children}
      </Group>
    </section>
  );
};
