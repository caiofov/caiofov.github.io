import React from "react";

import { Combobox, Group, useCombobox, Text } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { typedKeys } from "../utils/functions";
import { IconTooltip } from "./IconTooltip";
const languages = {
  pt: { name: "Português", anchor: "" },
  en: { name: "English", anchor: "" },
};

export const DownloadCV: React.FC<{ iconSize: string }> = ({ iconSize }) => {
  const { t } = useTranslation();
  const combobox = useCombobox();
  return (
    <Combobox
      store={combobox}
      onOptionSubmit={() => {
        combobox.closeDropdown();
        alert("in development"); //TODO
      }}
      transitionProps={{
        duration: 200,
        transition: "rotate-right",
      }}
      position="right-start"
      width="fit-content"
    >
      <Combobox.Target>
        <Group m="0" p="0">
          <IconTooltip
            onClick={() => {
              combobox.toggleDropdown();
            }}
            Icon={IconDownload}
            iconProps={{ size: iconSize }}
            variantFunc={(hovered) => {
              return combobox.dropdownOpened
                ? "light"
                : hovered
                ? "gradient"
                : "subtle";
            }}
            actionIconProps={{
              size: iconSize,
              style: {
                transition: "all 0.2s ease-in-out",
              },
            }}
            tooltip={t("sections.home.download-cv")}
          />
        </Group>
      </Combobox.Target>

      <Combobox.Dropdown variant="custom-light">
        <Combobox.Header>{t("sections.home.download-cv")}:</Combobox.Header>
        <Combobox.Options>
          {typedKeys(languages).map((c, idx) => (
            <Combobox.Option
              key={"download_" + c}
              value={c}
              style={{
                transition: "all 0.2s ease-in-out",
                textWrap: "nowrap",
              }}
              variant="custom-light"
              mb={idx + 1 != Object.keys(languages).length ? "xs" : 0}
            >
              <Text size="md">{t(`sections.home.download-${c}`)}</Text>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
