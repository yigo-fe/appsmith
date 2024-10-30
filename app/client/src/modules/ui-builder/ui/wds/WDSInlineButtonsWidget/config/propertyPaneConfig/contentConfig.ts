import {$t} from "locale/index";
import { BUTTON_VARIANTS, COLORS } from "@appsmith/wds";
import {
  BUTTON_WIDGET_DEFAULT_LABEL,
  createMessage,
} from "ee/constants/messages";
import { ValidationTypes } from "constants/WidgetValidation";
import { capitalize } from "lodash";
import { objectKeys } from "@appsmith/utils";

export const propertyPaneContentConfig = [
  {
    sectionName: $t('contentConfig.c9b81664b15d3d08'),
    children: [
      {
        helpText: $t('contentConfig.43e2e541cd01b8f5'),
        propertyName: "buttonsList",
        controlType: "GROUP_BUTTONS",
        allowSpatialGrouping: true,
        label: $t('contentConfig.1f39ea68694a6f99'),
        dependencies: ["childStylesheet", "orientation"],
        isBindProperty: false,
        isTriggerProperty: false,
        panelConfig: {
          editableTitle: true,
          titlePropertyName: "label",
          panelIdPropertyName: "id",
          updateHook: (
            // TODO: Fix this the next time the file is edited
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            props: any,
            propertyPath: string,
            propertyValue: string,
          ) => {
            return [
              {
                propertyPath,
                propertyValue,
              },
            ];
          },
          contentChildren: [
            {
              sectionName: $t('contentConfig.d1d688d799cf9885'),
              children: [
                {
                  propertyName: "label",
                  helpText: $t('contentConfig.e075c2fc64fd802f'),
                  label: $t('contentConfig.4c2f8be633b5f7e5'),
                  controlType: "INPUT_TEXT",
                  placeholderText: createMessage(BUTTON_WIDGET_DEFAULT_LABEL),
                  isBindProperty: true,
                  isTriggerProperty: false,
                  validation: { type: ValidationTypes.TEXT },
                },
              ],
            },
            {
              sectionName: $t('contentConfig.d593b4d3b188fe5f'),
              children: [
                {
                  propertyName: "isVisible",
                  helpText: $t('contentConfig.f60d4127d2c0b3c2'),
                  label: $t('contentConfig.3e9468fc78055bc6'),
                  controlType: "SWITCH",
                  isJSConvertible: true,
                  isBindProperty: true,
                  isTriggerProperty: false,
                  validation: { type: ValidationTypes.BOOLEAN },
                },
                {
                  propertyName: "isDisabled",
                  helpText: $t('contentConfig.c174d4eeab654ac8'),
                  label: $t('contentConfig.f9bd586fb72ed77c'),
                  controlType: "SWITCH",
                  isJSConvertible: true,
                  isBindProperty: true,
                  isTriggerProperty: false,
                  validation: { type: ValidationTypes.BOOLEAN },
                },
              ],
            },
            {
              sectionName: $t('contentConfig.125a959727ad20cc'),
              children: [
                {
                  helpText: $t('contentConfig.6eb92f4327a135db'),
                  propertyName: "onClick",
                  label: "onClick",
                  controlType: "ACTION_SELECTOR",
                  isJSConvertible: true,
                  isBindProperty: true,
                  isTriggerProperty: true,
                },
              ],
            },
          ],
          styleChildren: [
            {
              sectionName: $t('contentConfig.d593b4d3b188fe5f'),
              children: [
                {
                  propertyName: "variant",
                  label: $t('contentConfig.b0d578b7055ce0a5'),
                  controlType: "ICON_TABS",
                  fullWidth: true,
                  helpText: $t('contentConfig.7de42249622c871e'),
                  options: objectKeys(BUTTON_VARIANTS).map((variant) => ({
                    label: BUTTON_VARIANTS[variant],
                    value: variant,
                  })),
                  isJSConvertible: true,
                  isBindProperty: true,
                  isTriggerProperty: false,
                  isReusable: true,
                  validation: {
                    type: ValidationTypes.TEXT,
                    params: {
                      allowedValues: objectKeys(BUTTON_VARIANTS),
                      default: objectKeys(BUTTON_VARIANTS)[0],
                    },
                  },
                },
                {
                  propertyName: "color",
                  label: $t('contentConfig.ab19b9a7fad729e4'),
                  controlType: "DROP_DOWN",
                  defaultValue: COLORS.accent,
                  fullWidth: true,
                  helpText: $t('contentConfig.c27f7d98cd3d36cf'),
                  options: Object.values(COLORS).map((semantic) => ({
                    label: capitalize(semantic),
                    value: semantic,
                  })),
                  isJSConvertible: true,
                  isBindProperty: true,
                  isTriggerProperty: false,
                  isReusable: true,
                  validation: {
                    type: ValidationTypes.TEXT,
                    params: {
                      allowedValues: Object.values(COLORS),
                      default: COLORS.accent,
                    },
                  },
                },
              ],
            },
            {
              sectionName: $t('contentConfig.aed029b17fa68705'),
              children: [
                {
                  propertyName: "icon",
                  label: $t('contentConfig.aed029b17fa68705'),
                  helpText: $t('contentConfig.a9e83f84512fc18c'),
                  controlType: "ICON_SELECT_V2",
                  isJSConvertible: true,
                  isBindProperty: true,
                  isTriggerProperty: false,
                  validation: { type: ValidationTypes.TEXT },
                },
                {
                  propertyName: "iconPosition",
                  label: $t('contentConfig.c279a88a64e64e4d'),
                  helpText: $t('contentConfig.c6e4a304f22414c9'),
                  controlType: "ICON_TABS",
                  fullWidth: false,
                  defaultValue: "start",
                  options: [
                    {
                      startIcon: "skip-left-line",
                      value: "start",
                    },
                    {
                      startIcon: "skip-right-line",
                      value: "end",
                    },
                  ],
                  isBindProperty: false,
                  isTriggerProperty: false,
                  validation: {
                    type: ValidationTypes.TEXT,
                    params: {
                      allowedValues: ["start", "end"],
                    },
                  },
                },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.d593b4d3b188fe5f'),
    children: [
      {
        helpText: $t('contentConfig.f60d4127d2c0b3c2'),
        propertyName: "isVisible",
        label: $t('contentConfig.3e9468fc78055bc6'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.78183b76f93e438f'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.02d0e206d2916adc'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
];
