import { Anchor, Group, Title } from "@mantine/core";
import React from "react";

export const Section: React.FC<{
  text: string;
  id: string;
  children: JSX.Element;
}> = ({ text, children, id }) => {
  return (
    <section>
      <Group id={id} mb="xl">
        <Anchor href={"#" + id} underline="never" c="inherit">
          <Title
            order={3}
            style={{ fontSize: "2rem", fontFamily: "monospace" }}
          >
            {text}
          </Title>
        </Anchor>
        {children}
      </Group>
    </section>
  );
};
