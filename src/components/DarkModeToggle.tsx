import React from "react";

import { Switch } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

export const DarkModeToggle: React.FC<{
  checked: boolean;
  onChange: () => void;
}> = ({ checked, onChange }) => {
  return (
    <Switch
      size="md"
      checked={checked}
      onChange={onChange}
      offLabel={<IconSun />}
      onLabel={<IconMoonStars />}
    />
  );
};
