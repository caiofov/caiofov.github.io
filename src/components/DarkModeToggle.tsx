import React from "react";

import { Switch, ThemeIcon } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export const DarkModeToggle: React.FC<{
  checked: boolean;
  onChange: () => void;
}> = ({ checked, onChange }) => {
  return (
    <Switch
      size="md"
      color="dark.4"
      checked={checked}
      onChange={onChange}
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
