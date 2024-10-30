import {$t} from "locale/index";
import type { ExtraDef } from "utils/autocomplete/defCreatorUtils";
import { generateTypeDef } from "utils/autocomplete/defCreatorUtils";
import { ENTITY_TYPE, type AppsmithEntity } from "ee/entities/DataTree/types";
import _ from "lodash";
import { EVALUATION_PATH } from "utils/DynamicBindingUtils";
import type { Def } from "tern";
import type {
  ActionEntity,
  ActionEntityConfig,
  DataTreeEntityConfig,
  WidgetEntityConfig,
} from "ee/entities/DataTree/types";
import type { FieldEntityInformation } from "components/editorComponents/CodeEditor/EditorConfig";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import { eeAppsmithAutocompleteDefs } from "ee/utils/autocomplete/helpers";

export const entityDefinitions = {
  APPSMITH: (entity: AppsmithEntity, extraDefsToDefine: ExtraDef) => {
    const generatedTypeDef = generateTypeDef(
      _.omit(entity, "ENTITY_TYPE", EVALUATION_PATH),
      extraDefsToDefine,
    );

    if (
      typeof generatedTypeDef === "object" &&
      typeof generatedTypeDef.geolocation === "object"
    ) {
      return {
        ...generatedTypeDef,
        "!doc":
          $t('EntityDefinitions.c9b251a15e5ea7e2'),
        "!url": "https://docs.appsmith.com/reference/appsmith-framework",
        store: {
          ...(generatedTypeDef.store as Def),
          "!doc":
            $t('EntityDefinitions.2eefac6143a02398'),
          "!url":
            "https://docs.appsmith.com/reference/appsmith-framework/context-object#store-object",
        },
        user: {
          ...(generatedTypeDef.user as Def),
          "!doc":
            $t('EntityDefinitions.45aa02ef819ee08b'),
          "!url":
            "https://docs.appsmith.com/reference/appsmith-framework/context-object#user-object",
        },
        URL: {
          ...(generatedTypeDef.URL as Def),
          "!doc": $t('EntityDefinitions.e9b029b85e5e9d32'),
          "!url":
            "https://docs.appsmith.com/reference/appsmith-framework/context-object#url-object",
        },
        theme: {
          ...(generatedTypeDef.theme as Def),
          "!doc":
            $t('EntityDefinitions.2acf4c016e8f8a41'),
          "!url":
            "https://docs.appsmith.com/reference/appsmith-framework/context-object#theme-object",
        },
        mode: {
          "!type": generatedTypeDef.mode as Def,
          "!doc":
            "An enum that contains whether the app runs in view or edit mode. It takes the values VIEW or EDIT",
          "!url":
            "https://docs.appsmith.com/reference/appsmith-framework/context-object#mode-enum",
        },
        geolocation: {
          ...generatedTypeDef.geolocation,
          "!doc":
            $t('EntityDefinitions.96c07530a225318c'),
          "!url":
            "https://docs.appsmith.com/reference/appsmith-framework/context-object#geolocation-object",
          getCurrentPosition: {
            "!type":
              "fn(onSuccess: fn() -> void, onError: fn() -> void, options: object) -> +Promise|void",
            "!url":
              "https://docs.appsmith.com/reference/appsmith-framework/context-object#geolocationgetcurrentposition",
          },
          watchPosition: {
            "!type": "fn(options: object) -> void",
            "!url":
              "https://docs.appsmith.com/reference/appsmith-framework/context-object#geolocationwatchposition",
          },
          clearWatch: {
            "!type": "fn() -> +Promise|void",
            "!url":
              "https://docs.appsmith.com/reference/appsmith-framework/context-object#geolocationclearwatch",
          },
        },
        ...eeAppsmithAutocompleteDefs(generatedTypeDef),
      };
    }

    return generatedTypeDef;
  },
  ACTION: (entity: ActionEntity, extraDefsToDefine: ExtraDef) => {
    const dataDef = generateTypeDef(entity.data, extraDefsToDefine);
    let responseMetaDef = generateTypeDef(
      entity.responseMeta,
      extraDefsToDefine,
    );

    if (_.isString(responseMetaDef)) {
      responseMetaDef = {
        "!type": responseMetaDef,
      };
    }

    let dataCustomDef: Def = {
      "!doc":
        $t('EntityDefinitions.963b57a8dd637f9c'),
      "!url":
        "https://docs.appsmith.com/reference/appsmith-framework/query-object#data-array",
    };

    if (_.isString(dataDef)) {
      dataCustomDef["!type"] = dataDef;
    } else {
      dataCustomDef = { ...dataCustomDef, ...dataDef };
    }

    return {
      "!doc":
        $t('EntityDefinitions.1b776610f54e889d'),
      "!url":
        "https://docs.appsmith.com/reference/appsmith-framework/query-object",
      isLoading: {
        "!type": "bool",
        "!doc":
          $t('EntityDefinitions.951c50f0470411e5'),
      },
      data: dataCustomDef,
      responseMeta: {
        "!doc":
          $t('EntityDefinitions.690d20b85bcb6829'),
        "!url":
          "https://docs.appsmith.com/reference/appsmith-framework/query-object#responsemeta-object",
        ...responseMetaDef,
      },
      run: {
        "!type": "fn(params?: {}) -> +Promise",
        "!url":
          "https://docs.appsmith.com/reference/appsmith-framework/query-object#queryrun",
        "!doc": $t('EntityDefinitions.f502e41bb2ef0b63'),
      },
      clear: {
        "!type": "fn() -> +Promise",
        "!url":
          "https://docs.appsmith.com/reference/appsmith-framework/query-object#queryclear",
        "!doc": $t('EntityDefinitions.480978ce7bad5238'),
      },
    };
  },
};

/*
  $__name__$ is just to reduce occurrences of global def showing up in auto completion for user as `$` is less commonly used as entityName/

  GLOBAL_DEFS are maintained to support definition for array of objects which currently aren't supported by our generateTypeDef.
*/
export const GLOBAL_DEFS = {
  $__dropdownOption__$: {
    label: "string",
    value: "string",
  },
  $__dropdrowOptionWithChildren__$: {
    label: "string",
    value: "string",
    children: "[$__dropdrowOptionWithChildren__$]",
  },
  $__chartDataPoint__$: {
    x: "string",
    y: "string",
  },
  $__file__$: {
    data: "string",
    dataFormat: "string",
    name: "text",
    type: "file",
  },
  $__mapMarker__$: {
    lat: "number",
    long: "number",
    title: "string",
    description: "string",
  },
};

export const GLOBAL_FUNCTIONS = {
  "!name": "DATA_TREE.APPSMITH.FUNCTIONS",
  navigateTo: {
    "!url":
      "https://docs.appsmith.com/reference/appsmith-framework/widget-actions/navigate-to",
    "!doc":
      $t('EntityDefinitions.4e1d100ab087727e'),
    "!type":
      "fn(pageNameOrUrl: string, params: {}, target?: string) -> +Promise",
  },
  showAlert: {
    "!url":
      "https://docs.appsmith.com/reference/appsmith-framework/widget-actions/show-alert",
    "!doc":
      $t('EntityDefinitions.d821bb9b4e8a367c'),
    "!type": "fn(message: string, style: string) -> +Promise",
  },
  showModal: {
    "!url":
      "https://docs.appsmith.com/reference/appsmith-framework/widget-actions/show-modal",
    "!doc":
      $t('EntityDefinitions.80c55ac96ae0bf88'),
    "!type": "fn(modalName: string) -> +Promise",
  },
  closeModal: {
    "!url":
      "https://docs.appsmith.com/reference/appsmith-framework/widget-actions/close-modal",
    "!doc": $t('EntityDefinitions.7cb78d1558fd1abf'),
    "!type": "fn(modalName: string) -> +Promise",
  },
  storeValue: {
    "!url":
      "https://docs.appsmith.com/reference/appsmith-framework/widget-actions/store-value",
    "!doc":
      "Stores the data in the browser's local storage as key-value pairs that represent storage objects and can be later accessed anywhere in the application via <code>appsmith.store</code>.",
    "!type": "fn(key: string, value: any, persist?: bool) -> +Promise",
  },
  removeValue: {
    "!url":
      "https://docs.appsmith.com/reference/appsmith-framework/widget-actions/remove-value",
    "!doc": $t('EntityDefinitions.2e3892397b0dc6f3'),
    "!type": "fn(key: string) -> +Promise",
  },
  clearStore: {
    "!url":
      "https://docs.appsmith.com/reference/appsmith-framework/widget-actions/clear-store",
    "!doc": $t('EntityDefinitions.e1c2b8d05e18c63b'),
    "!type": "fn() -> +Promise",
  },
  download: {
    "!url":
      "https://docs.appsmith.com/reference/appsmith-framework/widget-actions/download",
    "!doc":
      $t('EntityDefinitions.6e7942cd9cb42a3a'),
    "!type":
      "fn(data: string|+Blob, fileName: string, fileType?: string) -> +Promise",
  },
  copyToClipboard: {
    "!url":
      "https://docs.appsmith.com/reference/appsmith-framework/widget-actions/copy-to-clipboard",
    "!doc": $t('EntityDefinitions.4b050b42ce864f53'),
    "!type": "fn(data: string, options: object) -> +Promise",
  },
  resetWidget: {
    "!url":
      "https://docs.appsmith.com/reference/appsmith-framework/widget-actions/reset-widget",
    "!doc":
      $t('EntityDefinitions.e01f1ae9be484662'),
    "!type": "fn(widgetName: string, resetChildren: bool) -> +Promise",
  },
  setInterval: {
    "!url":
      "https://docs.appsmith.com/reference/appsmith-framework/widget-actions/intervals-time-events",
    "!doc": $t('EntityDefinitions.6d526cfa31e002b0'),
    "!type":
      "fn(callback: fn() -> void, interval: number, id?: string) -> number",
  },
  clearInterval: {
    "!url":
      "https://docs.appsmith.com/reference/appsmith-framework/widget-actions/clear-interval",
    "!doc": $t('EntityDefinitions.2222511c029e7dba'),
    "!type": "fn(id: string) -> void",
  },
  postWindowMessage: {
    "!url":
      "https://docs.appsmith.com/reference/appsmith-framework/widget-actions/post-message",
    "!doc":
      $t('EntityDefinitions.11a42535236dc223'),
    "!type": "fn(message: unknown, source: string, targetOrigin: string)",
  },
};

// TODO: Fix this the next time the file is edited
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ternDocsInfo: Record<string, any> = {
  showAlert: {
    exampleArgs: [
      "$t('EntityDefinitions.05ddcbd616cf047d'), 'success'",
      "$t('EntityDefinitions.17c02d6a15d1b229'), 'error'",
    ],
  },
  showModal: {
    exampleArgs: ["Modal1.name"],
  },
  closeModal: {
    exampleArgs: ["Modal1.name"],
  },
  navigateTo: {
    exampleArgs: [
      "'Page1', { id: 1 }",
      "'https://appsmith.com', {}, 'NEW_WINDOW'",
    ],
  },
  copyToClipboard: {
    exampleArgs: ["$t('EntityDefinitions.65a72a5ec73171e2')"],
  },
  download: {
    exampleArgs: [
      "$t('EntityDefinitions.c273db5c450abead'), 'hello.txt', 'text/plain'",
      "FilePicker1.files[0].data, 'data.json'",
    ],
  },
  storeValue: {
    exampleArgs: ["'key', 'value'"],
  },
  removeValue: {
    exampleArgs: ["'key'"],
  },
  clearStore: {
    exampleArgs: [""],
  },
  resetWidget: {
    exampleArgs: ["'Table1', false"],
  },
  setInterval: {
    exampleArgs: ["() => showAlert($t('EntityDefinitions.65a72a5ec73171e2')), 1000, 'id'"],
  },
  clearInterval: {
    exampleArgs: ["'id'"],
  },
  postWindowMessage: {
    exampleArgs: ["message, $t('EntityDefinitions.652089fbed3f7cba'), '*'"],
  },
};

export type EntityDefinitionsOptions = keyof typeof entityDefinitions;

export const getEachEntityInformation = {
  [ENTITY_TYPE.ACTION]: (
    entity: DataTreeEntityConfig,
    entityInformation: FieldEntityInformation,
  ): FieldEntityInformation => {
    const actionEntity = entity as ActionEntityConfig;

    entityInformation.entityId = actionEntity.actionId;

    return entityInformation;
  },
  [ENTITY_TYPE.WIDGET]: (
    entity: DataTreeEntityConfig,
    entityInformation: FieldEntityInformation,
    propertyPath: string,
  ): FieldEntityInformation => {
    const widgetEntity = entity as WidgetEntityConfig;
    const isTriggerPath = widgetEntity.triggerPaths[propertyPath];

    entityInformation.entityId = widgetEntity.widgetId;

    if (isTriggerPath)
      entityInformation.expectedType = AutocompleteDataType.FUNCTION;

    entityInformation.isTriggerPath = isTriggerPath;
    entityInformation.widgetType = widgetEntity.type;

    return entityInformation;
  },
  [ENTITY_TYPE.JSACTION]: (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    entity: DataTreeEntityConfig,
    entityInformation: FieldEntityInformation,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    propertyPath: string,
  ): FieldEntityInformation => {
    entityInformation.isTriggerPath = true;

    return entityInformation;
  },
};
