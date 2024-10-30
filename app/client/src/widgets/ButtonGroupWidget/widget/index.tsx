import {$t} from "locale/index";
import type { Alignment } from "@blueprintjs/core";
import type { IconName } from "@blueprintjs/icons";
import type { ButtonPlacement, ButtonVariant } from "components/constants";
import { ButtonPlacementTypes, ButtonVariantTypes } from "components/constants";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import { get } from "lodash";
import React from "react";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import { MinimumPopupWidthInPercentage } from "WidgetProvider/constants";
import ButtonGroupComponent from "../component";
import { getStylesheetValue } from "./helpers";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import { FILL_WIDGET_MIN_WIDTH } from "constants/minWidthConstants";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import { BlueprintOperationTypes } from "WidgetProvider/constants";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import { WIDGET_TAGS, layoutConfigurations } from "constants/WidgetConstants";
import { klonaFullWithTelemetry } from "utils/helpers";

class ButtonGroupWidget extends BaseWidget<
  ButtonGroupWidgetProps,
  WidgetState
> {
  static type = "BUTTON_GROUP_WIDGET";

  static getConfig() {
    return {
      name: $t('index.6a542b94f9f1942a'), // The display name which will be made in uppercase and show in the widgets panel ( can have spaces )
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      needsMeta: false, // Defines if this widget adds any meta properties
      isCanvas: false, // Defines if this widget has a canvas within in which we can drop other widgets
      searchTags: ["click", "submit"],
      tags: [WIDGET_TAGS.BUTTONS],
    };
  }

  static getDefaults() {
    return {
      rows: 4,
      columns: 24,
      widgetName: "ButtonGroup",
      orientation: "horizontal",
      buttonVariant: ButtonVariantTypes.PRIMARY,
      isVisible: true,
      version: 1,
      animateLoading: true,
      responsiveBehavior: ResponsiveBehavior.Fill,
      minWidth: FILL_WIDGET_MIN_WIDTH,
      groupButtons: {
        groupButton1: {
          label: $t('index.b41a56bf68dbe576'),
          iconName: "heart",
          id: "groupButton1",
          widgetId: "",
          buttonType: "SIMPLE",
          placement: "CENTER",
          isVisible: true,
          isDisabled: false,
          index: 0,
          menuItems: {},
        },
        groupButton2: {
          label: $t('index.d9e4875f3c09946c'),
          iconName: "add",
          id: "groupButton2",
          buttonType: "SIMPLE",
          placement: "CENTER",
          widgetId: "",
          isVisible: true,
          isDisabled: false,
          index: 1,
          menuItems: {},
        },
        groupButton3: {
          label: $t('index.75d031f822015028'),
          iconName: "more",
          id: "groupButton3",
          buttonType: "MENU",
          placement: "CENTER",
          widgetId: "",
          isVisible: true,
          isDisabled: false,
          index: 2,
          menuItems: {
            menuItem1: {
              label: $t('index.5a8ef7184c3a638b'),
              backgroundColor: "#FFFFFF",
              id: "menuItem1",
              widgetId: "",
              onClick: "",
              isVisible: true,
              isDisabled: false,
              index: 0,
            },
            menuItem2: {
              label: $t('index.73d74a5e3c65934c'),
              backgroundColor: "#FFFFFF",
              id: "menuItem2",
              widgetId: "",
              onClick: "",
              isVisible: true,
              isDisabled: false,
              index: 1,
            },
            menuItem3: {
              label: $t('index.c1c0e93da2e882bd'),
              iconName: "trash",
              iconColor: "#FFFFFF",
              iconAlign: "right",
              textColor: "#FFFFFF",
              backgroundColor: "#DD4B34",
              id: "menuItem3",
              widgetId: "",
              onClick: "",
              isVisible: true,
              isDisabled: false,
              index: 2,
            },
          },
        },
      },
      blueprint: {
        operations: [
          {
            type: BlueprintOperationTypes.MODIFY_PROPS,
            fn: (widget: WidgetProps & { children?: WidgetProps[] }) => {
              const groupButtons = klonaFullWithTelemetry(
                widget.groupButtons,
                "ButtonGroupWidget.groupButtons",
              );

              // TODO: Fix this the next time the file is edited
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const dynamicBindingPathList: any[] = get(
                widget,
                "dynamicBindingPathList",
                [],
              );

              Object.keys(groupButtons).map((groupButtonKey) => {
                groupButtons[groupButtonKey].buttonColor = get(
                  widget,
                  "childStylesheet.button.buttonColor",
                  "{{appsmith.theme.colors.primaryColor}}",
                );

                dynamicBindingPathList.push({
                  key: `groupButtons.${groupButtonKey}.buttonColor`,
                });
              });

              const updatePropertyMap = [
                {
                  widgetId: widget.widgetId,
                  propertyName: "dynamicBindingPathList",
                  propertyValue: dynamicBindingPathList,
                },
                {
                  widgetId: widget.widgetId,
                  propertyName: "groupButtons",
                  propertyValue: groupButtons,
                },
              ];

              return updatePropertyMap;
            },
          },
        ],
      },
    };
  }

  static getAutoLayoutConfig() {
    return {
      autoDimension: {
        height: true,
      },
      widgetSize: [
        {
          viewportMinWidth: 0,
          configuration: (props: ButtonGroupWidgetProps) => {
            let minWidth = 120;
            const buttonLength = Object.keys(props.groupButtons).length;

            if (props.orientation === "horizontal") {
              // 120 is the width of the button, 8 is widget padding, 1 is the gap between buttons
              minWidth = 120 * buttonLength + 8 + (buttonLength - 1) * 1;
            }

            return {
              minWidth: `${minWidth}px`,
              minHeight: "40px",
            };
          },
        },
      ],
      disableResizeHandles: {
        vertical: true,
      },
    };
  }

  static getAnvilConfig(): AnvilConfig | null {
    return {
      isLargeWidget: false,
      widgetSize: (props: ButtonGroupWidgetProps) => {
        let minWidth = 120;
        const buttonLength = Object.keys(props.groupButtons).length;

        if (props.orientation === "horizontal") {
          // 120 is the width of the button, 8 is widget padding, 1 is the gap between buttons
          minWidth = 120 * buttonLength + 8 + (buttonLength - 1) * 1;
        }

        return {
          maxHeight: {},
          maxWidth: {},
          minHeight: { base: "40px" },
          minWidth: { base: `${minWidth}px` },
        };
      },
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.1abb7395bd1ec7ea'),
      "!url": "https://docs.appsmith.com/widget-reference/button-group",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.207d0a191688a007'),
        children: [
          {
            helpText: $t('index.aea95be35f7143bf'),
            propertyName: "groupButtons",
            controlType: "GROUP_BUTTONS",
            label: $t('index.7d0be548bd6b0c28'),
            isBindProperty: false,
            isTriggerProperty: false,
            dependencies: ["childStylesheet"],
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
                  sectionName: $t('index.207d0a191688a007'),
                  children: [
                    {
                      propertyName: "buttonType",
                      label: $t('index.539eb00bb66eb47e'),
                      controlType: "ICON_TABS",
                      fullWidth: true,
                      helpText: $t('index.bb33f2f224869777'),
                      options: [
                        {
                          label: $t('index.2d1fdb8c0a54b3fb'),
                          value: "SIMPLE",
                        },
                        {
                          label: $t('index.5202e96b15ecf843'),
                          value: "MENU",
                        },
                      ],
                      defaultValue: "SIMPLE",
                      isJSConvertible: true,
                      isBindProperty: true,
                      isTriggerProperty: false,
                      validation: {
                        type: ValidationTypes.TEXT,
                        params: {
                          allowedValues: ["SIMPLE", "MENU"],
                        },
                      },
                    },
                    {
                      hidden: (
                        props: ButtonGroupWidgetProps,
                        propertyPath: string,
                      ) => {
                        const buttonType = get(
                          props,
                          `${propertyPath.split(".", 2).join(".")}.buttonType`,
                          "",
                        );

                        return buttonType !== "MENU";
                      },
                      dependencies: ["groupButtons"],
                      helpText: $t('index.43c7791c83442863'),
                      propertyName: "menuItems",
                      controlType: "MENU_ITEMS",
                      label: $t('index.43c7791c83442863'),
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
                            sectionName: $t('index.a4ac93d2ab1c423b'),
                            children: [
                              {
                                propertyName: "label",
                                helpText: $t('index.caa434789fadf257'),
                                label: $t('index.a19b36faf97a1bce'),
                                controlType: "INPUT_TEXT",
                                placeholderText: $t('index.13752f58fbf848ae'),
                                isBindProperty: true,
                                isTriggerProperty: false,
                                validation: { type: ValidationTypes.TEXT },
                              },
                            ],
                          },
                          {
                            sectionName: $t('index.deea8de9d273027a'),
                            children: [
                              {
                                propertyName: "isVisible",
                                helpText:
                                  $t('index.b12acdc5757ea176'),
                                label: $t('index.71e1af80e6e8dbd0'),
                                controlType: "SWITCH",
                                isJSConvertible: true,
                                isBindProperty: true,
                                isTriggerProperty: false,
                                validation: {
                                  type: ValidationTypes.BOOLEAN,
                                },
                              },
                              {
                                propertyName: "isDisabled",
                                helpText: $t('index.1f4fe71ff8b5a6b3'),
                                label: $t('index.5e981f02d6fd0db2'),
                                controlType: "SWITCH",
                                isJSConvertible: true,
                                isBindProperty: true,
                                isTriggerProperty: false,
                                validation: {
                                  type: ValidationTypes.BOOLEAN,
                                },
                              },
                            ],
                          },
                          {
                            sectionName: $t('index.0c3121c36e0eb5a0'),
                            children: [
                              {
                                helpText: $t('index.01e96b4a025d2faa'),
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
                            sectionName: $t('index.3818e54df2453c4f'),
                            children: [
                              {
                                propertyName: "iconName",
                                label: $t('index.3818e54df2453c4f'),
                                helpText:
                                  $t('index.602bb34fc8dba9b3'),
                                controlType: "ICON_SELECT",
                                isJSConvertible: true,
                                isBindProperty: true,
                                isTriggerProperty: false,
                                validation: { type: ValidationTypes.TEXT },
                              },
                              {
                                propertyName: "iconAlign",
                                label: $t('index.17218b538e1913f3'),
                                helpText:
                                  $t('index.f5b485404c444508'),
                                controlType: "ICON_TABS",
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
                                defaultValue: "left",
                                isBindProperty: false,
                                isTriggerProperty: false,
                                validation: { type: ValidationTypes.TEXT },
                              },
                            ],
                          },
                          {
                            sectionName: $t('index.e230137ef98f21a7'),
                            children: [
                              {
                                propertyName: "backgroundColor",
                                helpText:
                                  $t('index.77f8ac23de1301b2'),
                                label: $t('index.ef58aa3c02aab6ed'),
                                controlType: "COLOR_PICKER",
                                isJSConvertible: true,
                                isBindProperty: true,
                                isTriggerProperty: false,
                                validation: { type: ValidationTypes.TEXT },
                              },
                              {
                                propertyName: "iconColor",
                                helpText: $t('index.45f0d7fbe8b4fe96'),
                                label: $t('index.f4c2e5db5c67c795'),
                                controlType: "COLOR_PICKER",
                                isBindProperty: false,
                                isTriggerProperty: false,
                              },
                              {
                                propertyName: "textColor",
                                helpText: $t('index.7ca093be7aee476a'),
                                label: $t('index.82125371fe6189f8'),
                                controlType: "COLOR_PICKER",
                                isBindProperty: false,
                                isTriggerProperty: false,
                              },
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  sectionName: $t('index.a4ac93d2ab1c423b'),
                  children: [
                    {
                      propertyName: "label",
                      helpText: $t('index.caa434789fadf257'),
                      label: $t('index.a19b36faf97a1bce'),
                      controlType: "INPUT_TEXT",
                      placeholderText: $t('index.13752f58fbf848ae'),
                      isBindProperty: true,
                      isTriggerProperty: false,
                      validation: { type: ValidationTypes.TEXT },
                    },
                  ],
                },
                {
                  sectionName: $t('index.deea8de9d273027a'),
                  children: [
                    {
                      propertyName: "isVisible",
                      helpText: $t('index.d56116ba47da46a0'),
                      label: $t('index.71e1af80e6e8dbd0'),
                      controlType: "SWITCH",
                      isJSConvertible: true,
                      isBindProperty: true,
                      isTriggerProperty: false,
                      validation: { type: ValidationTypes.BOOLEAN },
                    },
                    {
                      propertyName: "isDisabled",
                      helpText: $t('index.131f4f3c1894feb0'),
                      label: $t('index.5e981f02d6fd0db2'),
                      controlType: "SWITCH",
                      isJSConvertible: true,
                      isBindProperty: true,
                      isTriggerProperty: false,
                      validation: { type: ValidationTypes.BOOLEAN },
                    },
                  ],
                },
                {
                  sectionName: $t('index.0c3121c36e0eb5a0'),
                  hidden: (
                    props: ButtonGroupWidgetProps,
                    propertyPath: string,
                  ) => {
                    const buttonType = get(
                      props,
                      `${propertyPath}.buttonType`,
                      "",
                    );

                    return buttonType === "MENU";
                  },
                  children: [
                    {
                      helpText: $t('index.ba7414a1c28fc028'),
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
                  sectionName: $t('index.3818e54df2453c4f'),
                  children: [
                    {
                      propertyName: "iconName",
                      label: $t('index.3818e54df2453c4f'),
                      helpText: $t('index.fb5174ea3cc783c6'),
                      controlType: "ICON_SELECT",
                      isJSConvertible: true,
                      isBindProperty: true,
                      isTriggerProperty: false,
                      validation: { type: ValidationTypes.TEXT },
                    },
                    {
                      propertyName: "iconAlign",
                      label: $t('index.17218b538e1913f3'),
                      helpText: $t('index.ef38c998c5290f09'),
                      controlType: "ICON_TABS",
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
                      defaultValue: "left",
                      isBindProperty: false,
                      isTriggerProperty: false,
                      validation: { type: ValidationTypes.TEXT },
                    },
                    {
                      propertyName: "placement",
                      label: $t('index.bdce801b4566e720'),
                      controlType: "DROP_DOWN",
                      helpText: $t('index.3181f2bee085081a'),
                      options: [
                        {
                          label: $t('index.3d6e026d1e50c116'),
                          value: ButtonPlacementTypes.START,
                        },
                        {
                          label: $t('index.6a08decddc4e156c'),
                          value: ButtonPlacementTypes.BETWEEN,
                        },
                        {
                          label: $t('index.e2485c416434f6f4'),
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
                  sectionName: $t('index.e230137ef98f21a7'),
                  children: [
                    {
                      getStylesheetValue,
                      propertyName: "buttonColor",
                      helpText: $t('index.1f7bb51ca9d1a7df'),
                      label: $t('index.aa70e65218164fd0'),
                      controlType: "COLOR_PICKER",
                      isJSConvertible: true,
                      isBindProperty: true,
                      isTriggerProperty: false,
                      validation: { type: ValidationTypes.TEXT },
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        sectionName: $t('index.deea8de9d273027a'),
        children: [
          {
            helpText: $t('index.d56116ba47da46a0'),
            propertyName: "isVisible",
            label: $t('index.71e1af80e6e8dbd0'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isDisabled",
            label: $t('index.5e981f02d6fd0db2'),
            controlType: "SWITCH",
            helpText: $t('index.a8bc8ae16842cf1e'),
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.f2f30bf732cfeb74'),
            controlType: "SWITCH",
            helpText: $t('index.6bf84c201dd2c4d5'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
    ];
  }

  static getPropertyPaneStyleConfig() {
    return [
      {
        sectionName: $t('index.deea8de9d273027a'),
        children: [
          {
            propertyName: "buttonVariant",
            label: $t('index.e55fbcc5ce3c5fbd'),
            controlType: "ICON_TABS",
            fullWidth: true,
            helpText: $t('index.08a7199cc2739544'),
            options: [
              {
                label: $t('index.5b012433001bad46'),
                value: ButtonVariantTypes.PRIMARY,
              },
              {
                label: $t('index.c1c83aebad84c45a'),
                value: ButtonVariantTypes.SECONDARY,
              },
              {
                label: $t('index.cdfe3d43a8a99075'),
                value: ButtonVariantTypes.TERTIARY,
              },
            ],
            defaultValue: ButtonVariantTypes.PRIMARY,
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
          {
            helpText: $t('index.6e8af1ca92f59ed3'),
            propertyName: "orientation",
            label: $t('index.bdb58558fc34f5b6'),
            controlType: "ICON_TABS",
            fullWidth: true,
            options: [
              {
                label: $t('index.57cc4540b086a4e0'),
                value: "horizontal",
              },
              {
                label: $t('index.b42907efce556508'),
                value: "vertical",
              },
            ],
            defaultValue: "horizontal",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
      {
        sectionName: $t('index.911bc476dfa36147'),
        children: [
          {
            propertyName: "borderRadius",
            label: $t('index.9dd49f9ab78ed9a4'),
            helpText:
              $t('index.e30476fc052e5526'),
            controlType: "BORDER_RADIUS_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "boxShadow",
            label: $t('index.8f128dd740563abe'),
            helpText:
              $t('index.66908d861cac203f'),
            controlType: "BOX_SHADOW_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
    ];
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      boxShadow: "none",
      childStylesheet: {
        button: {
          buttonColor: "{{appsmith.theme.colors.primaryColor}}",
        },
      },
    };
  }

  handleClick = (onClick: string | undefined, callback: () => void): void => {
    if (onClick) {
      super.executeAction({
        triggerPropertyName: "onClick",
        dynamicString: onClick,
        event: {
          type: EventType.ON_CLICK,
          callback,
        },
      });
    }
  };

  static getSetterConfig(): SetterConfig {
    return {
      __setters: {
        setVisibility: {
          path: "isVisible",
          type: "boolean",
        },
        setDisabled: {
          path: "isDisabled",
          type: "boolean",
        },
      },
    };
  }

  getWidgetView() {
    const { componentWidth } = this.props;
    const minPopoverWidth =
      (MinimumPopupWidthInPercentage / 100) *
      (this.props.mainCanvasWidth ?? layoutConfigurations.MOBILE.maxWidth);

    return (
      <ButtonGroupComponent
        borderRadius={this.props.borderRadius}
        boxShadow={this.props.boxShadow}
        buttonClickHandler={this.handleClick}
        buttonMinWidth={this.isAutoLayoutMode ? 120 : undefined}
        buttonVariant={this.props.buttonVariant}
        groupButtons={this.props.groupButtons}
        isDisabled={this.props.isDisabled}
        minHeight={this.isAutoLayoutMode ? this.props.minHeight : undefined}
        minPopoverWidth={minPopoverWidth}
        orientation={this.props.orientation}
        renderMode={this.props.renderMode}
        widgetId={this.props.widgetId}
        width={componentWidth}
      />
    );
  }
}

export interface ButtonGroupWidgetProps extends WidgetProps {
  orientation: string;
  isDisabled: boolean;
  borderRadius?: string;
  boxShadow?: string;
  buttonVariant: ButtonVariant;
  groupButtons: Record<
    string,
    {
      widgetId: string;
      id: string;
      index: number;
      isVisible?: boolean;
      isDisabled?: boolean;
      label?: string;
      buttonType?: string;
      buttonColor?: string;
      iconName?: IconName;
      iconAlign?: Alignment;
      placement?: ButtonPlacement;
      onClick?: string;
      menuItems: Record<
        string,
        {
          widgetId: string;
          id: string;
          index: number;
          isVisible?: boolean;
          isDisabled?: boolean;
          label?: string;
          backgroundColor?: string;
          textColor?: string;
          iconName?: IconName;
          iconColor?: string;
          iconAlign?: Alignment;
          onClick?: string;
        }
      >;
    }
  >;
}

export default ButtonGroupWidget;
