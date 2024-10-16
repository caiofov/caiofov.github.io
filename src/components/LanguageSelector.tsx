import React, { useRef, useState } from "react";
import i18n, { LanguageCode } from "../i18n";

import {
  Combobox,
  Group,
  useCombobox,
  Text,
  Button,
  useMatches,
} from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import { typedKeys } from "../utils/functions";

const languages = { pt: { name: "Português" }, en: { name: "English" } };

export const LanguageSelector = () => {
  const [value, setValue] = useState<LanguageCode>(
    i18n.language as LanguageCode
  );
  const isMobile = useMatches({
    md: false,
    base: true,
  });
  const chooseLanguage = (code: LanguageCode) => {
    setValue(code);
    i18n.changeLanguage(code);
  };
  const combobox = useCombobox();
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        chooseLanguage(val as LanguageCode);
        combobox.closeDropdown();
      }}
      transitionProps={{ duration: 200, transition: "scale-y" }}
      width="fit-content"
      position="bottom-start"
    >
      <Combobox.Target>
        <Button
          size="compact-md"
          onClick={() => combobox.toggleDropdown()}
          variant={combobox.dropdownOpened ? "light" : "subtle"}
          style={{
            transition: "all 0.2s ease-in-out",
          }}
          ref={buttonRef}
        >
          <Group display="inline-flex" gap="xs">
            <IconWorld />
            <Text>
              {isMobile ? value.toUpperCase() : languages[value].name}
            </Text>
          </Group>
        </Button>
      </Combobox.Target>

      <Combobox.Dropdown
        variant="custom-light"
        miw={buttonRef.current?.clientWidth}
      >
        <Combobox.Options>
          {typedKeys(languages).map((c, idx) => (
            <Combobox.Option
              key={"lang_" + c}
              value={c}
              style={{
                transition: "all 0.2s ease-in-out",
              }}
              variant="custom-light"
              selected={value === c}
              mb={idx + 1 !== Object.keys(languages).length ? "xs" : 0}
            >
              <Text size="md">{languages[c].name}</Text>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
