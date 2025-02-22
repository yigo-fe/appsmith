import {$t} from "locale/index";
import React from "react";
import type { ControlProps } from "./BaseControl";
import BaseControl from "./BaseControl";
import type { ControlType } from "constants/PropertyControlConstants";
import FormControl from "pages/Editor/FormControl";
import FormLabel from "components/editorComponents/FormLabel";
import styled from "styled-components";
import { getBindingOrConfigPathsForPaginationControl } from "entities/Action/actionProperties";
import { PaginationSubComponent } from "components/formControls/utils";

export const StyledFormLabel = styled(FormLabel)`
  margin-top: 5px;
  /* font-weight: 400; */
  font-size: 12px;
  color: var(--ads-v2-color-fg-muted);
  line-height: 12px;
`;

export const FormControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 270px;
  margin-right: 1rem;
`;

const PaginationContainer = styled.div`
  display: grid;
  grid-gap: 5px 5px;
  grid-template-columns: repeat(auto-fill, 270px);
`;

// using query dynamic input text for both so user can dynamically change these values.
// TODO: Fix this the next time the file is edited
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const valueFieldConfig: any = {
  key: "value",
  controlType: "QUERY_DYNAMIC_INPUT_TEXT",
  placeholderText: "value",
  customStyles: {
    // width: "280px",
  },
};

// TODO: Fix this the next time the file is edited
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const limitFieldConfig: any = {
  ...valueFieldConfig,
  placeholderText: "20",
};

// TODO: Fix this the next time the file is edited
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const offsetFieldConfig: any = {
  ...valueFieldConfig,
  placeholderText: "0",
};

export function Pagination(props: {
  label: string;
  isValid: boolean;
  validationMessage?: string;
  placeholder?: Record<string, string>;
  tooltip?: Record<string, string>;
  isRequired?: boolean;
  name: string;
  disabled?: boolean;
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customStyles?: any;
  configProperty: string;
  formName: string;
  initialValue?: Record<string, string>;
}) {
  const {
    configProperty,
    customStyles,
    formName,
    initialValue,
    name,
    placeholder,
    tooltip,
  } = props;

  const offsetPath = getBindingOrConfigPathsForPaginationControl(
    PaginationSubComponent.Offset,
    configProperty,
  );
  const limitPath = getBindingOrConfigPathsForPaginationControl(
    PaginationSubComponent.Limit,
    configProperty,
  );

  const defaultStyles = {
    // width: "280px",
    ...customStyles,
  };

  return (
    <PaginationContainer data-testid={name}>
      {/*  form control for Limit field */}
      <FormControlContainer>
        <FormControl
          config={{
            ...limitFieldConfig,
            label: $t('PaginationControl.20c2cde8535c7ee1'),
            defaultStyles,
            configProperty: limitPath,
            placeholderText:
              typeof placeholder === "object" ? placeholder.limit : "",
            tooltipText: typeof tooltip === "object" ? tooltip.limit : "",
            initialValue:
              typeof initialValue === "object" ? initialValue.limit : null,
          }}
          formName={formName}
        />
        <StyledFormLabel>Limits the number of rows returned.</StyledFormLabel>
      </FormControlContainer>

      {/*  form control for Offset field */}
      <FormControlContainer>
        <FormControl
          config={{
            ...offsetFieldConfig,
            label: $t('PaginationControl.e9827baf3f6ff748'),
            defaultStyles,
            configProperty: offsetPath,
            placeholderText:
              typeof placeholder === "object" ? placeholder.offset : "",
            tooltipText: typeof tooltip === "object" ? tooltip.offset : "",
            initialValue:
              typeof initialValue === "object" ? initialValue.offset : null,
          }}
          formName={formName}
        />
        <StyledFormLabel>
          No. of rows to be skipped before querying
        </StyledFormLabel>
      </FormControlContainer>
    </PaginationContainer>
  );
}

class PaginationControl extends BaseControl<PaginationControlProps> {
  render() {
    const {
      configProperty, // JSON path for the pagination data
      disabled,
      formName, // Name of the form, used by redux-form lib to store the data in redux store
      isValid,
      label,
      placeholderText,
      tooltipText,
      validationMessage,
    } = this.props;

    return (
      // pagination component
      <Pagination
        configProperty={configProperty}
        disabled={disabled}
        formName={formName}
        isValid={isValid}
        label={label}
        name={configProperty}
        placeholder={placeholderText}
        tooltip={tooltipText}
        validationMessage={validationMessage}
      />
    );
  }

  getControlType(): ControlType {
    return "PAGINATION";
  }
}

export interface PaginationControlProps extends ControlProps {
  placeholderText: Record<string, string>;
  tooltipText: Record<string, string>;
  disabled?: boolean;
}

export default PaginationControl;
