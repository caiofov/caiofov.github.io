import { Switch, ThemeIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export const DarkModeToggle = () => {
  const colorScheme = useMantineColorScheme();
  return (
    <Switch
      size="md"
      color="dark.4"
      checked={colorScheme.colorScheme === "dark"}
      onChange={(event) =>
        colorScheme.setColorScheme(
          event.currentTarget.checked ? "dark" : "light"
        )
      }
      offLabel={
        <ThemeIcon size="sm" variant="transparent">
          <IconSun />
        </ThemeIcon>
      }
      onLabel={
        <ThemeIcon size="sm" variant="transparent">
          <IconMoon />
        </ThemeIcon>
      }
      variant="custom-light"
    />
  );
};
