import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import { ButtonPlacementTypes, ButtonVariantTypes } from "components/constants";
import { Alignment } from "@blueprintjs/core";
import type { MenuButtonWidgetProps } from "../../constants";

export default [
  {
    sectionName: $t('styleConfig.fd81895fb20411e1'),
    children: [
      {
        propertyName: "menuVariant",
        label: $t('styleConfig.f6d5d133b648cb72'),
        controlType: "DROP_DOWN",
        helpText: $t('styleConfig.ee196d3a6f018aaa'),
        options: [
          {
            label: $t('styleConfig.6c7b8b1275b93a21'),
            value: ButtonVariantTypes.PRIMARY,
          },
          {
            label: $t('styleConfig.027a652333d96b83'),
            value: ButtonVariantTypes.SECONDARY,
          },
          {
            label: $t('styleConfig.2920a03498cc6921'),
            value: ButtonVariantTypes.TERTIARY,
          },
        ],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: [
              ButtonVariantTypes.PRIMARY,
              ButtonVariantTypes.SECONDARY,
              ButtonVariantTypes.TERTIARY,
            ],
            default: ButtonVariantTypes.PRIMARY,
          },
        },
      },
    ],
  },
  {
    sectionName: $t('styleConfig.7c600948fc503b8d'),
    children: [
      {
        propertyName: "iconName",
        label: $t('styleConfig.7c600948fc503b8d'),
        helpText: $t('styleConfig.20dde065ac2be0ec'),
        controlType: "ICON_SELECT",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        updateHook: (
          props: MenuButtonWidgetProps,
          propertyPath: string,
          propertyValue: string,
        ) => {
          const propertiesToUpdate = [{ propertyPath, propertyValue }];

          if (!props.iconAlign) {
            propertiesToUpdate.push({
              propertyPath: "iconAlign",
              propertyValue: Alignment.LEFT,
            });
          }

          return propertiesToUpdate;
        },
        dependencies: ["iconAlign"],
        validation: {
          type: ValidationTypes.TEXT,
        },
      },
      {
        propertyName: "iconAlign",
        label: $t('styleConfig.7b241f72a4eac17a'),
        helpText: $t('styleConfig.91e32feaeb9c3319'),
        controlType: "ICON_TABS",
        defaultValue: "left",
        fullWidth: false,
        options: [
          {
            startIcon: "skip-left-line",
            value: "left",
          },
          {
            startIcon: "skip-right-line",
            value: "right",
          },
        ],
        isBindProperty: false,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: ["center", "left", "right"],
          },
        },
      },
      {
        propertyName: "placement",
        label: $t('styleConfig.c885bf009938334f'),
        controlType: "DROP_DOWN",
        helpText: $t('styleConfig.921e3d01648d487a'),
        options: [
          {
            label: $t('styleConfig.ad92f2f53507723b'),
            value: ButtonPlacementTypes.START,
          },
          {
            label: $t('styleConfig.28bba6d05ec7afa1'),
            value: ButtonPlacementTypes.BETWEEN,
          },
          {
            label: $t('styleConfig.c20445534755c2e8'),
            value: ButtonPlacementTypes.CENTER,
          },
        ],
        defaultValue: ButtonPlacementTypes.CENTER,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: [
              ButtonPlacementTypes.START,
              ButtonPlacementTypes.BETWEEN,
              ButtonPlacementTypes.CENTER,
            ],
            default: ButtonPlacementTypes.CENTER,
          },
        },
      },
    ],
  },
  {
    sectionName: $t('styleConfig.4861d487a6e2752c'),
    children: [
      {
        propertyName: "menuColor",
        helpText: $t('styleConfig.ab37939eb3e917d5'),
        label: $t('styleConfig.115729155a099e68'),
        controlType: "COLOR_PICKER",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: $t('styleConfig.7aedf34c3767da15'),
    children: [
      {
        propertyName: "borderRadius",
        label: $t('styleConfig.540b3e3648ddb1ef'),
        helpText: $t('styleConfig.b4bb39a6ad5060be'),
        controlType: "BORDER_RADIUS_OPTIONS",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "boxShadow",
        label: $t('styleConfig.6ffbf7bdfc435558'),
        helpText:
          $t('styleConfig.0a152f6a321261af'),
        controlType: "BOX_SHADOW_OPTIONS",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
];
