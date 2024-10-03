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
} from "@mantine/core";

const languages = {
  pt: { name: "Português", flag: brazilFlag },
  en: { name: "English", flag: usaFlag },
};

const SelectOption: React.FC<{ code: LanguageCode }> = ({ code }) => {
  return (
    <Group>
      <Image h="10px" src={languages[code]["flag"]} />
      <Text>{languages[code]["name"]}</Text>
    </Group>
  );
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
      withinPortal={false}
      onOptionSubmit={(val) => {
        console.log(val);
        chooseLanguage(val as LanguageCode);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          multiline
        >
          <SelectOption code={value} />
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {Object.keys(languages).map((c) => (
            <Combobox.Option key={"lang_" + c} value={c}>
              <SelectOption code={c as LanguageCode} />
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
