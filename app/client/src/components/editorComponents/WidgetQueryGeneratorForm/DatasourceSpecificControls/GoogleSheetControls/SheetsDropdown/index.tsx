import {$t} from "locale/index";
import {
  ErrorMessage,
  Label,
  SelectWrapper,
} from "components/editorComponents/WidgetQueryGeneratorForm/styles";
import { Tooltip, Select } from "@appsmith/ads";
import React, { memo } from "react";
import { useSheets } from "./useSheets";

export default memo(function SheetsDropdown() {
  const {
    error,
    isLoading,
    label,
    labelText,
    onSelect,
    options,
    selected,
    show,
  } = useSheets();

  if (show) {
    return (
      <SelectWrapper className="space-y-2">
        <Tooltip content={labelText}>
          <Label>{label}</Label>
        </Tooltip>
        <Select
          data-testId="t--sheetName-dropdown"
          dropdownStyle={{
            minWidth: "350px",
            maxHeight: "300px",
          }}
          isLoading={isLoading}
          isValid={!error}
          onSelect={onSelect}
          options={options}
          placeholder={$t('index.91e96a72519b438f')}
          showSearch
          value={selected}
        />
        <ErrorMessage>{error}</ErrorMessage>
      </SelectWrapper>
    );
  } else {
    return null;
  }
});
