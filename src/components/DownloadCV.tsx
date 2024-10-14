import React, { useRef, useState } from "react";

import {
  Combobox,
  Group,
  useCombobox,
  Text,
  Button,
  Tooltip,
  Anchor,
} from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { typedKeys } from "../utils/functions";
const languages = {
  pt: { name: "Português", anchor: "" },
  en: { name: "English", anchor: "" },
};

export const DownloadCV: React.FC<{ iconSize: string }> = ({ iconSize }) => {
  const { t } = useTranslation();
  const combobox = useCombobox();
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <Combobox
      store={combobox}
      onOptionSubmit={() => {
        combobox.closeDropdown();
        alert("in development");
      }}
      transitionProps={{
        duration: 200,
        transition: "rotate-right",
      }}
      width="fit-content"
      position="right-start"
    >
      <Combobox.Target>
        <Button
          onClick={() => {
            combobox.toggleDropdown();
          }}
          variant={combobox.dropdownOpened ? "light" : "subtle"}
          style={{
            transition: "all 0.2s ease-in-out",
          }}
          ref={buttonRef}
        >
          <Group display="inline-flex" gap="xs">
            <Tooltip label={t("sections.home.download-cv")}>
              <IconDownload size={iconSize} />
            </Tooltip>
          </Group>
        </Button>
      </Combobox.Target>

      <Combobox.Dropdown
        variant="custom-light"
        miw={buttonRef.current?.clientWidth}
      >
        <Combobox.Header>{t("sections.home.download-cv")}:</Combobox.Header>
        <Combobox.Options>
          {typedKeys(languages).map((c, idx) => (
            <Combobox.Option
              key={"download_" + c}
              value={c}
              style={{
                transition: "all 0.2s ease-in-out",
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
