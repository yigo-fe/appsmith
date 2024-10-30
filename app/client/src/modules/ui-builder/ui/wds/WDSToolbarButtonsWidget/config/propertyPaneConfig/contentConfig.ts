import {$t} from "locale/index";
import {
  BUTTON_WIDGET_DEFAULT_LABEL,
  createMessage,
} from "ee/constants/messages";
import { ValidationTypes } from "constants/WidgetValidation";

export const propertyPaneContentConfig = [
  {
    sectionName: $t('contentConfig.ea062684a47ddbfc'),
    children: [
      {
        helpText: $t('contentConfig.65e404c5086014d0'),
        propertyName: "buttonsList",
        controlType: "TOOLBAR_BUTTONS",
        label: $t('contentConfig.745ffbf7dd3fab9c'),
        allowSeparators: true,
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
              sectionName: $t('contentConfig.febdc87f9d299ba8'),
              children: [
                {
                  propertyName: "label",
                  helpText: $t('contentConfig.3dbdec334a935d19'),
                  label: $t('contentConfig.c64772b7fbd1d894'),
                  controlType: "INPUT_TEXT",
                  placeholderText: createMessage(BUTTON_WIDGET_DEFAULT_LABEL),
                  isBindProperty: true,
                  isTriggerProperty: false,
                  validation: { type: ValidationTypes.TEXT },
                },
              ],
            },
            {
              sectionName: $t('contentConfig.3452ee9fc1f407ec'),
              children: [
                {
                  propertyName: "isVisible",
                  helpText: $t('contentConfig.3b2aec8523d0088b'),
                  label: $t('contentConfig.cb4d56e9358ece05'),
                  controlType: "SWITCH",
                  isJSConvertible: true,
                  isBindProperty: true,
                  isTriggerProperty: false,
                  validation: { type: ValidationTypes.BOOLEAN },
                },
                {
                  propertyName: "isDisabled",
                  helpText: $t('contentConfig.0e25337c8bc1ab60'),
                  label: $t('contentConfig.4e53b89e0b413b7a'),
                  controlType: "SWITCH",
                  isJSConvertible: true,
                  isBindProperty: true,
                  isTriggerProperty: false,
                  validation: { type: ValidationTypes.BOOLEAN },
                },
              ],
            },
            {
              sectionName: $t('contentConfig.2f7d78ba7e18e1d2'),
              children: [
                {
                  helpText: $t('contentConfig.035d21d30551e9ca'),
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
              sectionName: $t('contentConfig.5d3393b4743ba6a0'),
              children: [
                {
                  propertyName: "icon",
                  label: $t('contentConfig.5d3393b4743ba6a0'),
                  helpText: $t('contentConfig.ec9008303542b03d'),
                  controlType: "ICON_SELECT_V2",
                  isJSConvertible: true,
                  isBindProperty: true,
                  isTriggerProperty: false,
                  validation: { type: ValidationTypes.TEXT },
                },
                {
                  propertyName: "iconPosition",
                  label: $t('contentConfig.7536959aef7e37c6'),
                  helpText: $t('contentConfig.990221dd7edaf5a3'),
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
    sectionName: $t('contentConfig.3452ee9fc1f407ec'),
    children: [
      {
        helpText: $t('contentConfig.3b2aec8523d0088b'),
        propertyName: "isVisible",
        label: $t('contentConfig.cb4d56e9358ece05'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.3c84921bf37257e4'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.969598676a7c6d1b'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
];
