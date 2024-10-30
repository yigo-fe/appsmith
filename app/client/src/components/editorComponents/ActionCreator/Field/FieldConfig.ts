import {$t} from "locale/index";
import {
  AppsmithFunction,
  DEFAULT_SELECTOR_VIEW_TEXT,
  EMPTY_BINDING,
  EMPTY_BINDING_WITH_EMPTY_OBJECT,
  FieldType,
  FILE_TYPE_OPTIONS,
  NAVIGATION_TARGET_FIELD_OPTIONS,
  RESET_CHILDREN_OPTIONS,
  ViewTypes,
} from "../constants";
import { ALERT_STYLE_OPTIONS } from "ee/constants/messages";
import type {
  ActionIntegrationType,
  ActionType,
  AppsmithFunctionConfigType,
  FieldProps,
} from "../types";
import {
  enumTypeGetter,
  enumTypeSetter,
  modalGetter,
  modalSetter,
  textGetter,
  textSetter,
  callBackFieldSetter,
  callBackFieldGetter,
  objectSetter,
  paramSetter,
  getCodeFromMoustache,
  getEvaluationVersion,
  genericSetter,
} from "../utils";
import store from "store";
import { getPageList } from "ee/selectors/entitiesSelector";
import type { TreeDropdownOption } from "@appsmith/ads-old";
import { FIELD_GROUP_CONFIG } from "../FieldGroup/FieldGroupConfig";
import { getFunctionName, checkIfArgumentExistAtPosition } from "@shared/ast";

export const FIELD_CONFIG: AppsmithFunctionConfigType = {
  [FieldType.ACTION_SELECTOR_FIELD]: {
    label: (props: FieldProps) => props.label || "",
    options: (props: FieldProps) => props.integrationOptions,
    defaultText: DEFAULT_SELECTOR_VIEW_TEXT,
    exampleText: "",
    getter: (storedValue: string) => {
      if (storedValue === EMPTY_BINDING) {
        return AppsmithFunction.none;
      }

      return getFunctionName(storedValue, getEvaluationVersion());
    },
    setter: (option) => {
      const dropdownOption = option as TreeDropdownOption;
      const type: ActionType = (dropdownOption.type ||
        dropdownOption.value) as ActionType;
      let value = dropdownOption.value;
      const defaultParams = FIELD_GROUP_CONFIG[type].defaultParams;

      switch (type) {
        case AppsmithFunction.integration:
          value = `${value}.run()`;
          break;
        default:
          break;
      }

      if (value === "none") return "";

      if (defaultParams && defaultParams.length)
        return `{{${value}(${defaultParams})}}`;

      if (
        [AppsmithFunction.integration].includes(type as ActionIntegrationType)
      )
        return `{{${value}}}`;

      return `{{${value}()}}`;
    },
    view: ViewTypes.ACTION_SELECTOR_VIEW,
  },
  // Show Alert
  [FieldType.ALERT_TEXT_FIELD]: {
    label: () => $t('FieldConfig.604f4525e63ce839'),
    defaultText: "",
    exampleText: "showAlert($t('FieldConfig.5226d60a3dcbe9b7'), 'info')",
    options: () => null,
    getter: (value: string) => {
      return textGetter(value, 0);
    },
    setter: (value, currentValue) => {
      return textSetter(value, currentValue, 0);
    },
    view: ViewTypes.TEXT_VIEW,
  },
  [FieldType.ALERT_TYPE_SELECTOR_FIELD]: {
    label: () => $t('FieldConfig.1619a52a7e5758d3'),
    exampleText: "showAlert($t('FieldConfig.5226d60a3dcbe9b7'), 'info')",
    options: () => ALERT_STYLE_OPTIONS,
    defaultText: $t('FieldConfig.972b3d8faf82bed3'),
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any) => {
      return enumTypeGetter(value, 1, "success");
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (option: any, currentValue: string) => {
      const isMessageSet = Boolean(textGetter(currentValue, 0));

      if (!isMessageSet) {
        currentValue = enumTypeSetter("''", currentValue, 0);
      }

      return enumTypeSetter(option.value, currentValue, 1);
    },
    view: ViewTypes.SELECTOR_VIEW,
  },
  // navigateTo
  [FieldType.URL_FIELD]: {
    label: () => $t('FieldConfig.4f18515bc7307dce'),
    defaultText: "",
    exampleText: "navigateTo('google.com', { a: 1 }, 'SAME_WINDOW')",
    options: () => null,
    getter: (value: string) => {
      const appState = store.getState();
      const pageList = getPageList(appState).map((page) => page.pageName);
      const urlFieldValue = textGetter(value, 0);

      return pageList.includes(urlFieldValue) ? "" : urlFieldValue;
    },
    setter: (value, currentValue) => {
      return textSetter(value, currentValue, 0);
    },
    view: ViewTypes.TEXT_VIEW,
  },
  [FieldType.QUERY_PARAMS_FIELD]: {
    label: () => $t('FieldConfig.22d9b18f81662743'),
    defaultText: "",
    exampleText: "navigateTo('Page1', { a: 1 }, 'SAME_WINDOW')",
    options: () => null,
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any) => {
      const queryParams = textGetter(value, 1);

      if (queryParams === EMPTY_BINDING_WITH_EMPTY_OBJECT || queryParams === "")
        return '{{\n{\n //"key": "value",\n}\n}}';

      return queryParams;
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (value: any, currentValue: string) => {
      const isPageOrURLSet = Boolean(textGetter(currentValue, 0));

      if (!isPageOrURLSet) {
        currentValue = enumTypeSetter("''", currentValue, 0);
      }

      return objectSetter(value, currentValue, 1);
    },
    view: ViewTypes.TEXT_VIEW,
  },
  [FieldType.NAVIGATION_TARGET_FIELD]: {
    label: () => $t('FieldConfig.d4b7ff16fa0e30b9'),
    exampleText: "navigateTo('Page1', { a: 1 }, 'SAME_WINDOW')",
    options: () => NAVIGATION_TARGET_FIELD_OPTIONS,
    defaultText: NAVIGATION_TARGET_FIELD_OPTIONS[0].label,
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any) => {
      return enumTypeGetter(value, 2, "SAME_WINDOW");
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (option: any, currentValue: string) => {
      const isPageOrURLSet = textGetter(currentValue, 0);

      if (!isPageOrURLSet) {
        currentValue = enumTypeSetter("''", currentValue, 0);
      }

      const isQueryParamsSet = checkIfArgumentExistAtPosition(
        getCodeFromMoustache(currentValue),
        1,
        getEvaluationVersion(),
      );

      if (!isQueryParamsSet) {
        currentValue = objectSetter(
          EMPTY_BINDING_WITH_EMPTY_OBJECT,
          currentValue,
          1,
        );
      }

      return enumTypeSetter(option.value, currentValue, 2);
    },
    view: ViewTypes.SELECTOR_VIEW,
  },
  // Integration
  [FieldType.PARAMS_FIELD]: {
    label: () => $t('FieldConfig.bedeb01ef066a202'),
    defaultText: "{{\n{}\n}}",
    exampleText: "Api1.run({ a: 1 })",
    options: () => null,
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any, idx?: number) => {
      const params = textGetter(value, idx || 0);

      if (params === "") return '{{\n{\n //"key": "value",\n}\n}}';

      return params;
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (value: any, currentValue: string, idx?: number) => {
      return paramSetter(value, currentValue, idx);
    },
    view: ViewTypes.TEXT_VIEW,
  },
  [FieldType.KEY_TEXT_FIELD_REMOVE_VALUE]: {
    label: () => $t('FieldConfig.6ae340466eb0a513'),
    defaultText: "",
    exampleText: "removeValue('a')",
    options: () => null,
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any) => {
      return textGetter(value, 0);
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (option: any, currentValue: string) => {
      return textSetter(option, currentValue, 0);
    },
    view: ViewTypes.TEXT_VIEW,
  },
  // storeValue
  [FieldType.KEY_TEXT_FIELD_STORE_VALUE]: {
    label: () => $t('FieldConfig.6ae340466eb0a513'),
    defaultText: "",
    exampleText: "storeValue('a', 'b')",
    options: () => null,
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any) => {
      return textGetter(value, 0);
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (option: any, currentValue: string) => {
      return textSetter(option, currentValue, 0);
    },
    view: ViewTypes.TEXT_VIEW,
  },
  [FieldType.VALUE_TEXT_FIELD]: {
    label: () => $t('FieldConfig.406fa1ea903f3b04'),
    defaultText: "",
    exampleText: "storeValue('a', 'b')",
    options: () => null,
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any) => {
      return textGetter(value, 1);
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (option: any, currentValue: string) => {
      const isKeySet = Boolean(textGetter(currentValue, 0));

      if (!isKeySet) {
        currentValue = enumTypeSetter("''", currentValue, 0);
      }

      return textSetter(option, currentValue, 1);
    },
    view: ViewTypes.TEXT_VIEW,
  },
  // download()
  [FieldType.DOWNLOAD_DATA_FIELD]: {
    label: () => $t('FieldConfig.212095f3a02cc0ae'),
    defaultText: "",
    exampleText: "download($t('FieldConfig.496a0118d9d54a02'), 'img.png', 'image/png')",
    options: () => null,
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any) => {
      return textGetter(value, 0);
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (option: any, currentValue: string) => {
      return textSetter(option, currentValue, 0);
    },
    view: ViewTypes.TEXT_VIEW,
  },
  [FieldType.DOWNLOAD_FILE_NAME_FIELD]: {
    label: () => $t('FieldConfig.0f0082509b0ca567'),
    defaultText: "",
    exampleText: "download($t('FieldConfig.496a0118d9d54a02'), 'img.png', 'image/png')",
    options: () => null,
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any) => {
      return textGetter(value, 1);
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (option: any, currentValue: string) => {
      const isDataFieldSet = textGetter(currentValue, 0);

      if (!isDataFieldSet) {
        currentValue = enumTypeSetter("''", currentValue, 0);
      }

      return textSetter(option, currentValue, 1);
    },
    view: ViewTypes.TEXT_VIEW,
  },
  [FieldType.COPY_TEXT_FIELD]: {
    label: () => $t('FieldConfig.719e31de19b58e03'),
    defaultText: "",
    exampleText: "copyToClipboard('example')",
    options: () => null,
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any) => {
      return textGetter(value, 0);
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (option: any, currentValue: string) => {
      return textSetter(option, currentValue, 0);
    },
    view: ViewTypes.TEXT_VIEW,
  },
  [FieldType.CALLBACK_FUNCTION_FIELD_GEOLOCATION]: {
    label: () => $t('FieldConfig.494ed8d8855aca08'),
    defaultText: "",
    exampleText: `appsmith.geolocation.getCurrentPosition((location) => { console.log(location) })`,
    options: () => null,
    getter: (value: string) => {
      return callBackFieldGetter(value);
    },
    setter: (value, currentValue) => {
      return callBackFieldSetter(value, currentValue, 0);
    },
    view: ViewTypes.TEXT_VIEW,
  },
  // setInterval
  [FieldType.CALLBACK_FUNCTION_FIELD_SET_INTERVAL]: {
    label: () => $t('FieldConfig.494ed8d8855aca08'),
    defaultText: "",
    exampleText: `setInterval(() => {
      const a = 0;
     }, 5000, '1')`,
    options: () => null,
    getter: (value: string) => {
      return callBackFieldGetter(value);
    },
    setter: (value, currentValue) => {
      return callBackFieldSetter(value, currentValue, 0);
    },
    view: ViewTypes.TEXT_VIEW,
  },
  [FieldType.DELAY_FIELD]: {
    label: () => $t('FieldConfig.c85a451d129aa993'),
    defaultText: "",
    exampleText: `setInterval(() => {
      const a = 0;
     }, 5000, '1')`,
    options: () => null,
    getter: (value: string) => {
      return enumTypeGetter(value, 1);
    },
    setter: (value, currentValue) => {
      const isCallbackFunctionSet = Boolean(
        callBackFieldGetter(currentValue, 0) !== EMPTY_BINDING,
      );

      if (!isCallbackFunctionSet) {
        currentValue = callBackFieldSetter(
          "{{() => {\n // showAlert('Hello'); \n}}}",
          currentValue,
          0,
        );
      }

      return enumTypeSetter(value, currentValue, 1, "0");
    },
    view: ViewTypes.TEXT_VIEW,
  },
  [FieldType.ID_FIELD]: {
    label: () => $t('FieldConfig.f58a7798bdd4bce5'),
    defaultText: "",
    exampleText: "interval-id",
    options: () => null,
    getter: (value: string) => {
      return textGetter(value, 2);
    },
    setter: (value, currentValue) => {
      const isCallbackFunctionSet = Boolean(
        callBackFieldGetter(currentValue, 0) !== EMPTY_BINDING,
      );

      if (!isCallbackFunctionSet) {
        currentValue = callBackFieldSetter("", currentValue, 0);
      }

      const isDelaySet = Boolean(enumTypeGetter(currentValue, 1));

      if (!isDelaySet) {
        currentValue = enumTypeSetter("10", currentValue, 1);
      }

      return textSetter(value, currentValue, 2);
    },
    view: ViewTypes.TEXT_VIEW,
  },
  [FieldType.CLEAR_INTERVAL_ID_FIELD]: {
    label: () => $t('FieldConfig.f58a7798bdd4bce5'),
    defaultText: "",
    exampleText: "clearInterval('1')",
    options: () => null,
    getter: (value: string) => {
      return textGetter(value, 0);
    },
    setter: (value, currentValue) => {
      return textSetter(value, currentValue, 0);
    },
    view: ViewTypes.TEXT_VIEW,
  },
  [FieldType.SHOW_MODAL_FIELD]: {
    label: () => $t('FieldConfig.7cc894d5abc23b38'),
    options: (props: FieldProps) => props.modalDropdownList,
    defaultText: $t('FieldConfig.faa44c8e441b9fd8'),
    exampleText: "showModal(Modal1.name)",
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any) => {
      return modalGetter(value);
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (option: any, currentValue: string) => {
      return modalSetter(option.value, currentValue);
    },
    view: ViewTypes.SELECTOR_VIEW,
  },
  [FieldType.CLOSE_MODAL_FIELD]: {
    label: () => $t('FieldConfig.7cc894d5abc23b38'),
    options: (props: FieldProps) => props.modalDropdownList,
    defaultText: $t('FieldConfig.faa44c8e441b9fd8'),
    exampleText: "closeModal(Modal1.name)",
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any) => {
      return modalGetter(value);
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (option: any, currentValue: string) => {
      return modalSetter(option.value, currentValue);
    },
    view: ViewTypes.SELECTOR_VIEW,
  },
  [FieldType.WIDGET_NAME_FIELD]: {
    label: () => $t('FieldConfig.528367aaa79d4f07'),
    exampleText: "resetWidget('Modal1', true)",
    options: (props: FieldProps) => props.widgetOptionTree,
    defaultText: $t('FieldConfig.53477550c3b4f06b'),
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any) => {
      return enumTypeGetter(value, 0);
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (option: any, currentValue: string) => {
      return enumTypeSetter(option.value, currentValue, 0);
    },
    view: ViewTypes.SELECTOR_VIEW,
  },
  [FieldType.RESET_CHILDREN_FIELD]: {
    label: () => $t('FieldConfig.33f7e013629237d0'),
    options: () => RESET_CHILDREN_OPTIONS,
    defaultText: "true",
    exampleText: "resetWidget('Modal1', true)",
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any) => {
      return enumTypeGetter(value, 1);
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (option: any, currentValue: string) => {
      const isWidgetFieldSet = enumTypeGetter(currentValue, 0);

      if (!isWidgetFieldSet) {
        currentValue = enumTypeSetter("''", currentValue, 0);
      }

      return enumTypeSetter(option.value, currentValue, 1);
    },
    view: ViewTypes.SELECTOR_VIEW,
  },
  [FieldType.PAGE_SELECTOR_FIELD]: {
    label: () => $t('FieldConfig.56b1ee4d79e3a179'),
    exampleText: "navigateTo('Page1', { a: 1 }, 'SAME_WINDOW')",
    options: (props: FieldProps) => props.pageDropdownOptions,
    defaultText: $t('FieldConfig.a98f703142f7b337'),
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any) => {
      return enumTypeGetter(value, 0, "");
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (option: any, currentValue: string) => {
      return enumTypeSetter(option.value, currentValue, 0);
    },
    view: ViewTypes.SELECTOR_VIEW,
  },
  [FieldType.DOWNLOAD_FILE_TYPE_FIELD]: {
    label: () => $t('FieldConfig.1619a52a7e5758d3'),
    exampleText: "download($t('FieldConfig.496a0118d9d54a02'), 'img.png', 'image/png')",
    options: () => FILE_TYPE_OPTIONS,
    defaultText: $t('FieldConfig.3b3ac4683e01cb72'),
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any) => {
      return enumTypeGetter(value, 2);
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (option: any, currentValue: string) => {
      const isDataFieldSet = textGetter(currentValue, 0);

      if (!isDataFieldSet) {
        currentValue = enumTypeSetter("''", currentValue, 0);
      }

      const isFileTypeSet = textGetter(currentValue, 1);

      if (!isFileTypeSet) {
        currentValue = enumTypeSetter("''", currentValue, 1);
      }

      return enumTypeSetter(option.value, currentValue, 2);
    },
    view: ViewTypes.SELECTOR_VIEW,
  },
  [FieldType.ON_SUCCESS_FIELD]: {
    label: () => "",
    exampleText: "",
    options: (props: FieldProps) => props.integrationOptions,
    defaultText: $t('FieldConfig.832505c357a06a93'),
    view: ViewTypes.NO_VIEW,
    getter: () => "",
    setter: () => "",
  },
  [FieldType.ON_ERROR_FIELD]: {
    label: () => "",
    exampleText: "",
    options: (props: FieldProps) => props.integrationOptions,
    defaultText: $t('FieldConfig.832505c357a06a93'),
    view: ViewTypes.NO_VIEW,
    getter: () => "",
    setter: () => "",
  },
  [FieldType.PAGE_NAME_AND_URL_TAB_SELECTOR_FIELD]: {
    label: () => $t('FieldConfig.1619a52a7e5758d3'),
    defaultText: "",
    exampleText: "navigateTo('Page1', { a: 1 }, 'SAME_WINDOW')",
    options: () => null,
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any) => {
      return enumTypeGetter(value, 0);
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (option: any, currentValue: string) => {
      return enumTypeSetter(option.value, currentValue, 0);
    },
    view: ViewTypes.TAB_VIEW,
  },
  [FieldType.KEY_VALUE_FIELD]: {
    label: () => "",
    defaultText: $t('FieldConfig.832505c357a06a93'),
    exampleText: "",
    options: (props: FieldProps) => props.integrationOptions,
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any) => {
      return value;
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (value: any) => {
      return value;
    },
    view: ViewTypes.KEY_VALUE_VIEW,
  },
  [FieldType.ARGUMENT_KEY_VALUE_FIELD]: {
    label: (props: FieldProps) => props.field.label || "",
    defaultText: "",
    exampleText: "",
    options: () => null,
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any, index = 0) => {
      return textGetter(value, index);
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (value: any, currentValue: string, index) => {
      if (value === "") {
        value = undefined;
      }

      return textSetter(value, currentValue, index as number);
    },
    view: ViewTypes.TEXT_VIEW,
  },
  [FieldType.MESSAGE_FIELD]: {
    label: () => $t('FieldConfig.604f4525e63ce839'),
    defaultText: "",
    options: () => null,
    exampleText: "postWindowMessage('hi', 'window', '*')",
    toolTip: $t('FieldConfig.ed7304af1b8565a2'),
    getter: (value: string) => {
      return textGetter(value, 0);
    },
    setter: (value, currentValue) => {
      return genericSetter(value as string, currentValue, 0);
    },
    view: ViewTypes.TEXT_VIEW,
  },
  [FieldType.TARGET_ORIGIN_FIELD]: {
    label: () => $t('FieldConfig.679e7135bec82901'),
    defaultText: "",
    options: () => null,
    exampleText: "postWindowMessage('hi', 'window', '*')",
    toolTip: $t('FieldConfig.0006aedd8e7b8bb0'),
    getter: (value: string) => {
      return textGetter(value, 2);
    },
    setter: (value, currentValue) => {
      const isMessageFieldSet = textGetter(currentValue, 0);

      if (!isMessageFieldSet) {
        currentValue = enumTypeSetter("''", currentValue, 0);
      }

      const isSourceFieldSet = enumTypeGetter(currentValue, 1);

      if (!isSourceFieldSet) {
        currentValue = enumTypeSetter("'window'", currentValue, 1);
      }

      return textSetter(value, currentValue, 2);
    },
    view: ViewTypes.TEXT_VIEW,
  },
  [FieldType.SOURCE_FIELD]: {
    label: () => $t('FieldConfig.d4b7ff16fa0e30b9'),
    defaultText: $t('FieldConfig.4733107884a6a871'),
    options: (props: FieldProps) => {
      const { widgetOptionTree } = props;
      const defaultOption = { label: $t('FieldConfig.4733107884a6a871'), value: "'window'" };

      return [
        defaultOption,
        ...widgetOptionTree
          .filter((option) => option.type === "IFRAME_WIDGET")
          .map((w) => ({
            label: w.label,
            value: w.value,
          })),
      ];
    },
    exampleText: "postWindowMessage('hi', 'window', '*')",
    toolTip: $t('FieldConfig.b2cc9fd1ed915e3e'),
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any) => {
      return enumTypeGetter(value, 1);
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (option: any, currentValue: string) => {
      const isMessageFieldSet = textGetter(currentValue, 0);

      if (!isMessageFieldSet) {
        currentValue = enumTypeSetter("''", currentValue, 0);
      }

      return enumTypeSetter(option.value, currentValue, 1);
    },
    view: ViewTypes.SELECTOR_VIEW,
  },
  [FieldType.API_AND_QUERY_SUCCESS_FAILURE_TAB_FIELD]: {
    label: () => "",
    defaultText: "",
    exampleText: "",
    options: () => null,
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getter: (value: any) => {
      return enumTypeGetter(value, 0);
    },
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setter: (option: any, currentValue: string) => {
      return enumTypeSetter(option.value, currentValue, 0);
    },
    view: ViewTypes.TAB_VIEW,
  },
  [FieldType.CALLBACK_FUNCTION_API_AND_QUERY]: {
    label: () => $t('FieldConfig.494ed8d8855aca08'),
    defaultText: "",
    exampleText: `() => { showAlert($t('FieldConfig.327741106f95e4d4')) }`,
    options: () => null,
    getter: (value: string, argNumber = 0) => {
      return callBackFieldGetter(value, argNumber);
    },
    setter: (value, currentValue, argNumber = 0) => {
      return callBackFieldSetter(value, currentValue, argNumber);
    },
    view: ViewTypes.TEXT_VIEW,
  },
};
