import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import type { ModalWidgetProps } from "../../widget/types";

export const propertyPaneContentConfig = [
  {
    sectionName: $t('contentConfig.07af7a52d480ec48'),
    children: [
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.32c598d1bdebc7fe'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.0039a108802403b7'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "size",
        label: $t('contentConfig.d7af982193a0ae5b'),
        helpText: $t('contentConfig.a59feb05a900f6a9'),
        controlType: "DROP_DOWN",
        options: [
          {
            label: $t('contentConfig.5ebdb5cbe42dbecc'),
            value: "small",
          },
          { label: $t('contentConfig.c368a336b5523c86'), value: "medium" },
          { label: $t('contentConfig.9279ce77ce0270e4'), value: "large" },
        ],
        isBindProperty: false,
        isTriggerProperty: false,
      },
    ],
  },
  {
    sectionName: $t('contentConfig.8451f080b09ecd7b'),
    children: [
      {
        propertyName: "showHeader",
        label: $t('contentConfig.8451f080b09ecd7b'),
        helpText: $t('contentConfig.5904025f7c1e6b61'),
        controlType: "SWITCH",
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        propertyName: "title",
        label: $t('contentConfig.c431969c01b2c355'),
        helpText: $t('contentConfig.a4cea120cf795aa5'),
        controlType: "INPUT_TEXT",
        hidden: (props: ModalWidgetProps) => !props.showHeader,
        dependencies: ["showHeader"],
        isBindProperty: false,
        isTriggerProperty: false,
        placeholderText: $t('contentConfig.9bd347af09b03351'),
      },
    ],
  },
  {
    sectionName: $t('contentConfig.6fb841223268dcdb'),
    children: [
      {
        propertyName: "showFooter",
        label: $t('contentConfig.6fb841223268dcdb'),
        helpText: $t('contentConfig.e23d702c30a900b2'),
        controlType: "SWITCH",
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        propertyName: "showSubmitButton",
        label: $t('contentConfig.3a177e2c286a2e45'),
        helpText: $t('contentConfig.735b00fc308da2ea'),
        controlType: "SWITCH",
        hidden: (props: ModalWidgetProps) => !props.showFooter,
        dependencies: ["showFooter"],
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        propertyName: "submitButtonText",
        label: $t('contentConfig.7848992e1db9fd65'),
        helpText: $t('contentConfig.f42dbf5d7bfc01a0'),
        controlType: "INPUT_TEXT",
        hidden: (props: ModalWidgetProps) =>
          !props.showSubmitButton || !props.showFooter,
        dependencies: ["showSubmitButton", "showFooter"],
        isBindProperty: false,
        isTriggerProperty: false,
        placeholderText: $t('contentConfig.3a177e2c286a2e45'),
      },

      {
        propertyName: "cancelButtonText",
        label: $t('contentConfig.f975efa0a41d01ab'),
        helpText: $t('contentConfig.7ebfe57fc4faabbc'),
        controlType: "INPUT_TEXT",
        hidden: (props: ModalWidgetProps) => !props.showFooter,
        dependencies: ["showCancelButton", "showFooter"],
        isBindProperty: false,
        isTriggerProperty: false,
        placeholderText: $t('contentConfig.b77814ddc651defe'),
      },
    ],
  },
  {
    sectionName: $t('contentConfig.2d52570b724ae8da'),
    children: [
      {
        helpText: $t('contentConfig.021651435975e44a'),
        propertyName: "onClose",
        label: "onClose",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
      {
        propertyName: "closeOnSubmit",
        label: $t('contentConfig.5d24fc0911454aed'),
        helpText:
          $t('contentConfig.8dfaef149709e37c'),
        controlType: "SWITCH",
        hidden: (props: ModalWidgetProps) =>
          !props.showFooter || !props.showSubmitButton,
        dependencies: ["showFooter", "showSubmitButton"],
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        helpText: $t('contentConfig.dff463987e60ae9c'),
        propertyName: "onSubmit",
        hidden: (props: ModalWidgetProps) =>
          !props.showFooter || !props.showSubmitButton,
        dependencies: ["showSubmitButton", "showFooter"],
        label: "onSubmit",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
    ],
  },
];
