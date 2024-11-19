import React from "react";

import { Combobox, Group, useCombobox, Anchor } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { IconTooltip } from "./IconTooltip";

export const DownloadCV: React.FC<{ iconSize: string }> = ({ iconSize }) => {
  const { t } = useTranslation();
  const combobox = useCombobox();
  return (
    <Combobox
      store={combobox}
      onOptionSubmit={() => {
        combobox.closeDropdown();
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
          {["pt", "en"].map((c, idx) => (
            <Combobox.Option
              key={"download_" + c}
              value={c}
              style={{
                transition: "all 0.2s ease-in-out",
                textWrap: "nowrap",
              }}
              variant="custom-light"
              mb={idx === 0 ? "xs" : 0}
            >
              <Anchor
                size="md"
                href={`https://raw.githubusercontent.com/caiofov/caiofov/refs/heads/master/cv/CV_${c}_CaioDeFreitasOliveira.pdf`}
                target="_blank"
                underline="never"
              >
                {t(`sections.home.download-${c}`)}
              </Anchor>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
