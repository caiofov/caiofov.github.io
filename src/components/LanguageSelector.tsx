import React, { useState } from "react";
import i18n, { LanguageCode } from "../i18n";
import brazilFlag from "../assets/brazil_flag.svg";
import usaFlag from "../assets/usa_flag.svg";
import {
  Combobox,
  Group,
  InputBase,
  useCombobox,
  Text,
  Image,
  ThemeIcon,
  Popover,
  Button,
} from "@mantine/core";
import { IconChevronCompactDown, IconChevronDown } from "@tabler/icons-react";

const languages = {
  pt: { name: "Português", flag: brazilFlag },
  en: { name: "English", flag: usaFlag },
};

export const LanguageSelector = () => {
  const [value, setValue] = useState<LanguageCode>("pt");

  const chooseLanguage = (code: LanguageCode) => {
    setValue(code);
    i18n.changeLanguage(code);
  };
  const combobox = useCombobox();

  return (
    <Combobox
      store={combobox}
      withinPortal={true}
      onOptionSubmit={(val) => {
        console.log(val);
        chooseLanguage(val as LanguageCode);
        combobox.closeDropdown();
      }}
      transitionProps={{ duration: 200, transition: "scale-y" }}
      width="fit-content"
      position="bottom-start"
    >
      <Combobox.Target>
        <Button
          size="compact-sm"
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          variant="subtle"
          style={{
            justifyContent: "space-around",
            transition: "all 0.2s ease-in-out",
          }}
        >
          <Image h="15px" w="22px" src={languages[value]["flag"]} />
        </Button>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options w="100%">
          {Object.keys(languages).map((c) => (
            <Combobox.Option key={"lang_" + c} value={c}>
              <Group display="inline-flex">
                <Image
                  h="10px"
                  w="22px"
                  src={languages[c as LanguageCode]["flag"]}
                />
                <Text>{languages[c as LanguageCode]["name"]}</Text>
              </Group>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
