import {$t} from "locale/index";
import { APP_MAX_WIDTH, type AppMaxWidth } from "@appsmith/wds-theming";
import { Option, Select } from "@appsmith/ads";
import React from "react";

interface AppMaxWidthSelectProps {
  value: AppMaxWidth;
  onSelect: (value: string) => void;
}

const resolveOptionLabelText = (option: AppMaxWidth) => {
  switch (option) {
    case APP_MAX_WIDTH.Unlimited:
      return $t('AppMaxWidthSelect.0d5948681ae82d32');
    case APP_MAX_WIDTH.Large:
      return $t('AppMaxWidthSelect.5a73ee6ca423febc');
    case APP_MAX_WIDTH.Medium:
      return $t('AppMaxWidthSelect.410ad5f5090fdbfd');
    default: {
      const exhaustiveCheck: never = option;

      throw new Error(`Unhandled app max width: ${exhaustiveCheck}`);
    }
  }
};

export const AppMaxWidthSelect = ({
  onSelect,
  value,
}: AppMaxWidthSelectProps) => {
  return (
    <Select
      dropdownClassName="t--theme-layout-dropdown"
      onSelect={onSelect}
      value={value}
    >
      {Object.values(APP_MAX_WIDTH).map((option, index) => (
        <Option key={index} value={option}>
          <div className="flex items-center w-full space-x-2 cursor-pointer">
            <div className="leading-normal">
              {resolveOptionLabelText(option)}
            </div>
          </div>
        </Option>
      ))}
    </Select>
  );
};
