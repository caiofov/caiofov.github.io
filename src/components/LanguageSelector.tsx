import React, { useState } from "react";
import i18n, { LanguageCode } from "../i18n";
import brazilFlag from "../assets/brazil_flag.svg";
import usaFlag from "../assets/usa_flag.svg";
import {
  Combobox,
  Group,
  useCombobox,
  Text,
  Image,
  Button,
  useMatches,
} from "@mantine/core";

const languages = {
  pt: { name: "Português", flag: brazilFlag },
  en: { name: "English", flag: usaFlag },
};

export const LanguageSelector = () => {
  const [value, setValue] = useState<LanguageCode>("pt");
  const textSize = useMatches({
    md: "md",
    base: "sm",
  });
  const chooseLanguage = (code: LanguageCode) => {
    setValue(code);
    i18n.changeLanguage(code);
  };
  const combobox = useCombobox();

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
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          variant="subtle"
          style={{
            transition: "all 0.2s ease-in-out",
          }}
        >
          <Group display="inline-flex">
            <Image h="15px" w="22px" src={languages[value].flag} />
            {/* <Text>{languages[value].name}</Text> */}
          </Group>
        </Button>
      </Combobox.Target>

      <Combobox.Dropdown p="0">
        <Combobox.Options>
          {Object.keys(languages).map((c) => (
            <Combobox.Option
              key={"lang_" + c}
              value={c}
              style={{
                transition: "all 0.2s ease-in-out",
              }}
            >
              <Group display="inline-flex" gap="xs">
                <Image
                  h="10px"
                  w="22px"
                  src={languages[c as LanguageCode].flag}
                />
                <Text size={textSize}>{languages[c as LanguageCode].name}</Text>
              </Group>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
