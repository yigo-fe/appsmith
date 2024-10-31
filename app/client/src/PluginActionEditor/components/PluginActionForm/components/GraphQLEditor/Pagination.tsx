import {$t} from "locale/index";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { change, formValueSelector } from "redux-form";
import FormRow from "components/editorComponents/FormRow";
import { PaginationType } from "entities/Action";
import RadioFieldGroup from "components/editorComponents/form/fields/RadioGroupField";
import type { DropdownOption } from "@appsmith/ads-old";
import type { EditorTheme } from "components/editorComponents/CodeEditor/EditorConfig";
import type { AnyAction, Dispatch } from "redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import type { AppState } from "ee/reducers";
import { FormLabel } from "components/editorComponents/form/fields/StyledFormComponents";
import DynamicTextField from "components/editorComponents/form/fields/DynamicTextField";
import type { GRAPHQL_PAGINATION_TYPE } from "../../../../constants/GraphQLEditorConstants";
import {
  LIMITBASED_PREFIX,
  CURSORBASED_PREFIX,
  CURSOR_PREVIOUS_PREFIX,
  CURSOR_NEXT_PREFIX,
} from "utils/editor/EditorBindingPaths";
import { log } from "loglevel";
import { PaginationSubComponent } from "components/formControls/utils";
import { Select, Option, Checkbox, Text, Tooltip, Link } from "@appsmith/ads";

const PAGINATION_PREFIX =
  "actionConfiguration.pluginSpecifiedTemplates[2].value";

interface PaginationProps {
  actionName: string;
  paginationType: PaginationType;
  theme?: EditorTheme;
  query: string;
  formName: string;
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  change: (formName: string, id: string, value: any) => void;
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cursorBased?: any;
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  limitBased?: any;
}

const SubHeading = styled(Text)`
  display: block;
  margin-bottom: ${(props) => props.theme.spaces[4]}px;
  // color: ${(props) => props.theme.colors.apiPane.pagination.stepTitle};
`;

const PaginationTypeView = styled.div`
  margin-left: 22px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  // TODO: remove this in the favor of changing the kind of text during ads typography update phase
  .help-text {
    color: #6a7585;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  width: 100%;
  padding: var(--ads-v2-spaces-4) 0;
`;

const PaginationSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: ${(props) => props.theme.spaces[11]}px;
`;

const PaginationFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  max-width: 280px;
`;

const PaginationFieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  &:not(:last-child) {
    margin-bottom: ${(props) => props.theme.spaces[9]}px;
  }
  ${PaginationFieldWrapper}:last-child {
    margin-left: 24px;
  }
`;

const Step = styled.div`
  label {
    width: fit-content;
    min-width: unset;
  }

  & label .label-icon-wrapper {
    cursor: help;
  }
`;

const CheckboxFieldWrapper = styled.div`
  margin-top: 8px;
  div > span {
    font-size: ${(props) => props.theme.fontSizes[2]}px;
  }
`;

const RadioFieldGroupWrapper = styled(RadioFieldGroup)`
  width: 80%;
  label {
    width: fit-content;
  }
`;

const DynamicTextFieldWrapper = styled(DynamicTextField)`
  &&&& .CodeMirror {
    background-color: ${(props) => props.disabled && "#eef2f5"};
  }
`;

const ErrorMsg = styled.span`
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.221538px;
  color: var(--ads-v2-color-fg-error);
  margin-top: var(--ads-spaces-3);
`;

const graphqlParseVariables = (queryBody: string) => {
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const variables: any = {};

  try {
    const variableString = queryBody.match(/\((\$[^)]*?)\)/);

    if (variableString && variableString?.length >= 2) {
      variableString[1].split(",").forEach((variableWithType: string) => {
        let [name = "", vtype = ""] = variableWithType.trim().split(":");

        name = name.trim().substring(1);
        vtype = vtype.trim();

        if (name.length > 0 && vtype.length > 0) {
          variables[name] = {
            name,
            type: vtype,
          };
        }
      });
    }
  } catch (error) {
    log(error);
  }

  return variables;
};

interface PaginationTypeBasedWrapperProps {
  actionName: string;
  className: string;
  dataReplayId: string;
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onInputChange?: (value: any) => void;
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelectVariable: (_: any, dropdownOption: any) => void;
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSeparateKeyChange?: (value: any) => void;
  selectedVariable: {
    label?: string;
    value?: string;
  };
  separateKeyFlag?: boolean;
  separateKeyLabel?: string;
  separateKeyPath?: string;
  // This states that is separate value for any text is enabled or not
  separateValueFlag?: boolean;
  valuePath: string;
  valuePlaceholder?: string;
  valueLabel: string;
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variableOptions: Array<any>;
  variableLabel: string;
  variableTooltip?: string;
  valueTooltip?: string;
}

function PaginationTypeBasedWrapper({
  actionName,
  className,
  dataReplayId,
  onInputChange,
  onSelectVariable,
  onSeparateKeyChange,
  selectedVariable,
  separateKeyFlag,
  separateKeyLabel,
  separateKeyPath,
  separateValueFlag,
  valueLabel,
  valuePath,
  valuePlaceholder,
  valueTooltip,
  variableLabel,
  variableOptions,
  variableTooltip,
}: PaginationTypeBasedWrapperProps) {
  // Add a disabled option if there are no variables in the dropdown to select.
  const dropdownOptions: DropdownOption[] =
    variableOptions.length > 0
      ? variableOptions
      : [
          {
            label:
              $t('Pagination.34f7b7a2b15e2d42'),
            value: "",
            disabled: true,
            disabledTooltipText: true,
          },
        ];

  // creating a datatree path for the evaluated value
  const dataTreePath = `${actionName}.config.${valuePath
    .split(".")
    .slice(1)
    .join(".")}`;

  return (
    <PaginationFieldContainer>
      <PaginationFieldWrapper data-location-id={dataReplayId}>
        <Step>
          <FormLabel>
            {variableTooltip ? (
              <Tooltip content={variableTooltip}>
                <span className="label-icon-wrapper">{variableLabel}</span>
              </Tooltip>
            ) : (
              <span className="label-icon-wrapper">{variableLabel}</span>
            )}
          </FormLabel>
        </Step>
        <Select
          className={`${className}Variable`}
          onChange={(value) =>
            onSelectVariable(
              value,
              dropdownOptions?.find((option) => option?.value === value),
            )
          }
          placeholder={
            dropdownOptions.length > 0
              ? $t('Pagination.bcbd7baf0d12e0ff')
              : $t('Pagination.e9af50ad263af84b')
          }
          value={
            (selectedVariable.label && selectedVariable.value
              ? selectedVariable
              : // TODO: Fix this the next time the file is edited
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                undefined) as any
          }
        >
          {dropdownOptions.map((option) => {
            return (
              <Option
                isDisabled={option?.disabled}
                key={option?.label}
                value={option?.label}
              >
                {option?.label}
              </Option>
            );
          })}
        </Select>
        {!selectedVariable.value ||
          (dropdownOptions.some(
            (option: DropdownOption) => option.value === selectedVariable.value,
          ) && (
            <ErrorMsg>
              {!selectedVariable.value ||
              dropdownOptions.some(
                (option: DropdownOption) =>
                  option.value === selectedVariable.value,
              )
                ? undefined
                : $t('Pagination.a1e13710cfbcf95f')}
            </ErrorMsg>
          ))}
      </PaginationFieldWrapper>
      <PaginationFieldWrapper data-location-id={dataReplayId}>
        <Step>
          <FormLabel>
            {valueTooltip ? (
              <Tooltip content={valueTooltip}>
                <span className="label-icon-wrapper">{valueLabel}</span>
              </Tooltip>
            ) : (
              <span className="label-icon-wrapper">{valueLabel}</span>
            )}
          </FormLabel>
        </Step>
        <DynamicTextFieldWrapper
          className={`${className}Value`}
          dataTreePath={dataTreePath}
          disabled={separateKeyFlag && !separateValueFlag}
          evaluatedPopUpLabel={valueLabel}
          name={valuePath}
          onChange={onInputChange}
          placeholder={valuePlaceholder || ""}
          showLightningMenu={!(separateKeyFlag && !separateValueFlag)}
        />
        {separateKeyFlag &&
          separateKeyPath &&
          separateKeyLabel &&
          onSeparateKeyChange && (
            <CheckboxFieldWrapper>
              <Checkbox
                defaultChecked={separateValueFlag}
                name={separateKeyPath}
                onChange={onSeparateKeyChange}
              >
                {separateKeyLabel}
              </Checkbox>
            </CheckboxFieldWrapper>
          )}
      </PaginationFieldWrapper>
    </PaginationFieldContainer>
  );
}

function Pagination(props: PaginationProps) {
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [variablesList, setVariablesList] = useState<any>(
    graphqlParseVariables(props.query),
  );

  useEffect(() => {
    setVariablesList(graphqlParseVariables(props.query));
  }, [props.query]);

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const variableOptions = Object.keys(variablesList).map((variable: any) => ({
    label: variable,
    value: variable,
  }));

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setPaginationValue = (keyPath: string, key: string, value: any) => {
    props.change(
      props.formName,
      `${PAGINATION_PREFIX}.${keyPath}.${key}`,
      value,
    );
  };

  const setSeparateOrSameLimitValue = ({
    actualKeyPath,
    dependentKeyPath,
    isSeparateEnabled,
    value,
  }: {
    actualKeyPath: string;
    dependentKeyPath: string;
    isSeparateEnabled: boolean;
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
  }) => {
    if (!isSeparateEnabled) {
      props.change(
        props.formName,
        `${PAGINATION_PREFIX}.${dependentKeyPath}`,
        value,
      );
    }

    props.change(
      props.formName,
      `${PAGINATION_PREFIX}.${actualKeyPath}`,
      value,
    );
  };

  const paginationPrev = props.cursorBased?.previous;
  const paginationNext = props.cursorBased?.next;

  return (
    <PaginationContainer>
      <FormRow style={{ flexGrow: 1 }}>
        <RadioFieldGroupWrapper
          className="t--apiFormPaginationType"
          name="actionConfiguration.paginationType"
          options={[
            {
              label: $t('Pagination.89d772c4e40470c7'),
              value: PaginationType.NONE,
            },
            {
              label: $t('Pagination.0a12e0c66cf23d69'),
              value: PaginationType.PAGE_NO,
            },
            {
              label: $t('Pagination.f071a3ee7a605e2c'),
              value: PaginationType.CURSOR,
            },
          ]}
          placeholder={$t('Pagination.01d7863e18677152')}
          rows={3}
          selectedOptionElements={[
            null,
            <PaginationTypeView key={`${PaginationType.PAGE_NO}-element`}>
              <Text kind="body-m" renderAs={"p"}>
                Specify a specific limit (number of results) and offset (the
                number of records that needed to be skipped).
              </Text>
              <PaginationSection>
                {/* Limit */}
                <PaginationTypeBasedWrapper
                  actionName={props.actionName}
                  className="t--apiFormPaginationLimit"
                  dataReplayId={btoa(
                    `${PAGINATION_PREFIX}.${LIMITBASED_PREFIX}.${PaginationSubComponent.Limit}.value`,
                  )}
                  // TODO: Fix this the next time the file is edited
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onInputChange={(value: any) => {
                    setPaginationValue(
                      `${LIMITBASED_PREFIX}.${PaginationSubComponent.Limit}`,
                      "value",
                      value,
                    );
                  }}
                  // TODO: Fix this the next time the file is edited
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onSelectVariable={(_: any, dropdownOption: any) => {
                    const values = variablesList[dropdownOption.value];

                    Object.keys(values).forEach((key: string) => {
                      setPaginationValue(
                        `${LIMITBASED_PREFIX}.${PaginationSubComponent.Limit}`,
                        key,
                        values[key],
                      );
                    });
                  }}
                  selectedVariable={{
                    label: props.limitBased?.limit?.name,
                    value: props.limitBased?.limit?.name,
                  }}
                  valueLabel={$t('Pagination.50ba76f54197d501')}
                  valuePath={`${PAGINATION_PREFIX}.${LIMITBASED_PREFIX}.${PaginationSubComponent.Limit}.value`}
                  valuePlaceholder="{{Table1.pageSize}}"
                  valueTooltip={$t('Pagination.b553b134e59558c5')}
                  variableLabel={$t('Pagination.88d76bbf51bff328')}
                  variableOptions={variableOptions}
                  variableTooltip={$t('Pagination.f9d51cc0d0a458e3')}
                />
                {/* Offset */}
                <PaginationTypeBasedWrapper
                  actionName={props.actionName}
                  className="t--apiFormPaginationOffset"
                  dataReplayId={btoa(
                    `${PAGINATION_PREFIX}.${LIMITBASED_PREFIX}.${PaginationSubComponent.Offset}.value`,
                  )}
                  // TODO: Fix this the next time the file is edited
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onInputChange={(value: any) => {
                    setPaginationValue(
                      `${LIMITBASED_PREFIX}.${PaginationSubComponent.Offset}`,
                      "value",
                      value,
                    );
                  }}
                  // TODO: Fix this the next time the file is edited
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onSelectVariable={(_: any, dropdownOption: any) => {
                    const values = variablesList[dropdownOption.value];

                    Object.keys(values).forEach((key: string) => {
                      setPaginationValue(
                        `${LIMITBASED_PREFIX}.${PaginationSubComponent.Offset}`,
                        key,
                        values[key],
                      );
                    });
                  }}
                  selectedVariable={{
                    label: props.limitBased?.offset?.name,
                    value: props.limitBased?.offset?.name,
                  }}
                  valueLabel={$t('Pagination.75fb759feeffb20c')}
                  valuePath={`${PAGINATION_PREFIX}.${LIMITBASED_PREFIX}.${PaginationSubComponent.Offset}.value`}
                  valuePlaceholder="{{Table1.pageNo * Table1.pageSize}}"
                  valueTooltip={$t('Pagination.88314ff972b64692')}
                  variableLabel={$t('Pagination.191ea06691bfb264')}
                  variableOptions={variableOptions}
                  variableTooltip={$t('Pagination.4bf867385221e06b')}
                />
              </PaginationSection>
            </PaginationTypeView>,
            <PaginationTypeView key={`${PaginationType.CURSOR}-element`}>
              <Text className="help-text" kind="body-m" renderAs={"p"}>
                Specify the previous and next cursor variables along with a
                limit value.{" "}
                <Link
                  kind="primary"
                  style={{ display: "inline" }}
                  target={"_blank"}
                  to="https://graphql.org/learn/pagination/"
                >
                  Refer documentation
                </Link>{" "}
                for more information
              </Text>
              <PaginationSection>
                <SubHeading kind="body-m" renderAs={"p"}>
                  Configure previous page
                </SubHeading>
                {/* Previous Limit value */}
                <PaginationTypeBasedWrapper
                  actionName={props.actionName}
                  className="t--apiFormPaginationPrevLimit"
                  dataReplayId={btoa(
                    `${PAGINATION_PREFIX}.${CURSORBASED_PREFIX}.${CURSOR_PREVIOUS_PREFIX}.${PaginationSubComponent.Limit}.value`,
                  )}
                  // TODO: Fix this the next time the file is edited
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onInputChange={(value: any) => {
                    setSeparateOrSameLimitValue({
                      actualKeyPath: `${CURSORBASED_PREFIX}.${CURSOR_PREVIOUS_PREFIX}.${PaginationSubComponent.Limit}.value`,
                      dependentKeyPath: `${CURSORBASED_PREFIX}.${CURSOR_NEXT_PREFIX}.${PaginationSubComponent.Limit}.value`,
                      value: value,
                      isSeparateEnabled: !!paginationNext?.limit?.isSeparate,
                    });
                  }}
                  // TODO: Fix this the next time the file is edited
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onSelectVariable={(_: any, dropdownOption: any) => {
                    const values = variablesList[dropdownOption.value];

                    Object.keys(values).forEach((key: string) => {
                      setPaginationValue(
                        `${CURSORBASED_PREFIX}.${CURSOR_PREVIOUS_PREFIX}.${PaginationSubComponent.Limit}`,
                        key,
                        values[key],
                      );
                    });
                  }}
                  selectedVariable={{
                    label: paginationPrev?.limit?.name,
                    value: paginationPrev?.limit?.name,
                  }}
                  valueLabel={$t('Pagination.3d68749fbc35602b')}
                  valuePath={`${PAGINATION_PREFIX}.${CURSORBASED_PREFIX}.${CURSOR_PREVIOUS_PREFIX}.${PaginationSubComponent.Limit}.value`}
                  valuePlaceholder="{{Table1.pageSize}}"
                  valueTooltip={$t('Pagination.f84d31452f81f142')}
                  variableLabel={$t('Pagination.bbeb8a9424e4e689')}
                  variableOptions={variableOptions}
                  variableTooltip={$t('Pagination.ed7cbf84c113d4d2')}
                />
                {/* Previous Cursor Values */}
                <PaginationTypeBasedWrapper
                  actionName={props.actionName}
                  className="t--apiFormPaginationPrevCursor"
                  dataReplayId={btoa(
                    `${PAGINATION_PREFIX}.${CURSORBASED_PREFIX}.${CURSOR_PREVIOUS_PREFIX}.${PaginationSubComponent.Cursor}.value`,
                  )}
                  // TODO: Fix this the next time the file is edited
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onInputChange={(value: any) => {
                    setPaginationValue(
                      `${CURSORBASED_PREFIX}.${CURSOR_PREVIOUS_PREFIX}.${PaginationSubComponent.Cursor}`,
                      "value",
                      value,
                    );
                  }}
                  // TODO: Fix this the next time the file is edited
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onSelectVariable={(_: any, dropdownOption: any) => {
                    const values = variablesList[dropdownOption.value];

                    Object.keys(values).forEach((key: string) => {
                      setPaginationValue(
                        `${CURSORBASED_PREFIX}.${CURSOR_PREVIOUS_PREFIX}.${PaginationSubComponent.Cursor}`,
                        key,
                        values[key],
                      );
                    });
                  }}
                  selectedVariable={{
                    label: paginationPrev?.cursor?.name,
                    value: paginationPrev?.cursor?.name,
                  }}
                  valueLabel={$t('Pagination.5df94039b5a5e79b')}
                  valuePath={`${PAGINATION_PREFIX}.${CURSORBASED_PREFIX}.${CURSOR_PREVIOUS_PREFIX}.${PaginationSubComponent.Cursor}.value`}
                  valuePlaceholder="{{Api1.data.previousCursor}}"
                  valueTooltip={$t('Pagination.f2a03425d9b10164')}
                  variableLabel={$t('Pagination.9f9ee5da96f05e33')}
                  variableOptions={variableOptions}
                  variableTooltip={$t('Pagination.15ff3beac9949dd2')}
                />
              </PaginationSection>
              <PaginationSection>
                <SubHeading kind="body-m" renderAs={"p"}>
                  Configure next page
                </SubHeading>
                {/* Next Limit value */}
                <PaginationTypeBasedWrapper
                  actionName={props.actionName}
                  className="t--apiFormPaginationNextLimit"
                  dataReplayId={btoa(
                    `${PAGINATION_PREFIX}.${CURSORBASED_PREFIX}.${CURSOR_NEXT_PREFIX}.${PaginationSubComponent.Limit}.value`,
                  )}
                  // TODO: Fix this the next time the file is edited
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onInputChange={(value: any) => {
                    setPaginationValue(
                      `${CURSORBASED_PREFIX}.${CURSOR_NEXT_PREFIX}.${PaginationSubComponent.Limit}`,
                      "value",
                      value,
                    );
                  }}
                  // TODO: Fix this the next time the file is edited
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onSelectVariable={(_: any, dropdownOption: any) => {
                    const values = variablesList[dropdownOption.value];

                    Object.keys(values).forEach((key: string) => {
                      setPaginationValue(
                        `${CURSORBASED_PREFIX}.${CURSOR_NEXT_PREFIX}.${PaginationSubComponent.Limit}`,
                        key,
                        values[key],
                      );
                    });
                  }}
                  // TODO: Fix this the next time the file is edited
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onSeparateKeyChange={(value: any) => {
                    setPaginationValue(
                      `${CURSORBASED_PREFIX}.${CURSOR_NEXT_PREFIX}.${PaginationSubComponent.Limit}`,
                      "isSeparate",
                      value,
                    );
                  }}
                  selectedVariable={{
                    label: paginationNext?.limit?.name,
                    value: paginationNext?.limit?.name,
                  }}
                  separateKeyFlag
                  separateKeyLabel={$t('Pagination.7854d282bf9f329e')}
                  separateKeyPath={`${PAGINATION_PREFIX}.${CURSORBASED_PREFIX}.${CURSOR_NEXT_PREFIX}.${PaginationSubComponent.Limit}.isSeparate`}
                  separateValueFlag={!!paginationNext?.limit?.isSeparate}
                  valueLabel={$t('Pagination.3d68749fbc35602b')}
                  valuePath={`${PAGINATION_PREFIX}.${CURSORBASED_PREFIX}.${CURSOR_NEXT_PREFIX}.${PaginationSubComponent.Limit}.value`}
                  valuePlaceholder="{{Table1.pageSize}}"
                  valueTooltip={$t('Pagination.de3a8e1cd29a490d')}
                  variableLabel={$t('Pagination.bbeb8a9424e4e689')}
                  variableOptions={variableOptions}
                  variableTooltip={$t('Pagination.3a09d337b8af3ce4')}
                />
                {/* Next Cursor Values */}
                <PaginationTypeBasedWrapper
                  actionName={props.actionName}
                  className="t--apiFormPaginationNextCursor"
                  dataReplayId={btoa(
                    `${PAGINATION_PREFIX}.${CURSORBASED_PREFIX}.${CURSOR_NEXT_PREFIX}.${PaginationSubComponent.Cursor}.value`,
                  )}
                  // TODO: Fix this the next time the file is edited
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onInputChange={(value: any) => {
                    setPaginationValue(
                      `${CURSORBASED_PREFIX}.${CURSOR_NEXT_PREFIX}.${PaginationSubComponent.Cursor}`,
                      "value",
                      value,
                    );
                  }}
                  // TODO: Fix this the next time the file is edited
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onSelectVariable={(_: any, dropdownOption: any) => {
                    const values = variablesList[dropdownOption.value];

                    Object.keys(values).forEach((key: string) => {
                      setPaginationValue(
                        `${CURSORBASED_PREFIX}.${CURSOR_NEXT_PREFIX}.${PaginationSubComponent.Cursor}`,
                        key,
                        values[key],
                      );
                    });
                  }}
                  selectedVariable={{
                    label: paginationNext?.cursor?.name,
                    value: paginationNext?.cursor?.name,
                  }}
                  valueLabel={$t('Pagination.0189d3d1aa1a103f')}
                  valuePath={`${PAGINATION_PREFIX}.${CURSORBASED_PREFIX}.${CURSOR_NEXT_PREFIX}.${PaginationSubComponent.Cursor}.value`}
                  valuePlaceholder="{{Api1.data.nextCursor}}"
                  valueTooltip={$t('Pagination.78311615e0e4e9c3')}
                  variableLabel={$t('Pagination.3052eca9703b8490')}
                  variableOptions={variableOptions}
                  variableTooltip={$t('Pagination.b0f6de5bda3c47d2')}
                />
              </PaginationSection>
            </PaginationTypeView>,
          ]}
        />
      </FormRow>
    </PaginationContainer>
  );
}

const mapStateToProps = (state: AppState, props: { formName: string }) => {
  const selector = formValueSelector(props.formName);
  const pluginExtraData: GRAPHQL_PAGINATION_TYPE = selector(
    state,
    PAGINATION_PREFIX,
  );
  const limitBased = pluginExtraData?.[LIMITBASED_PREFIX];
  const cursorBased = pluginExtraData?.[CURSORBASED_PREFIX];

  return {
    cursorBased,
    limitBased,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators({ change }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
