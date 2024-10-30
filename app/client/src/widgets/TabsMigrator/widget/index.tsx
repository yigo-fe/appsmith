import {$t} from "locale/index";
import type { WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import type {
  TabContainerWidgetProps,
  TabsWidgetProps,
} from "widgets/TabsWidget/constants";
import { selectedTabValidation } from "widgets/TabsWidget/widget";
import { cloneDeep, get, isString } from "lodash";
import { ValidationTypes } from "constants/WidgetValidation";
import { generateReactKey } from "utils/generators";
import { EVAL_VALUE_PATH } from "utils/DynamicBindingUtils";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import * as Sentry from "@sentry/react";
import type { DSLWidget } from "WidgetProvider/constants";
import { DATA_BIND_REGEX_GLOBAL } from "constants/BindingsConstants";

function migrateTabsDataUsingMigrator(currentDSL: DSLWidget) {
  if (currentDSL.type === "TABS_WIDGET" && currentDSL.version === 1) {
    try {
      currentDSL.type = "TABS_MIGRATOR_WIDGET";
      currentDSL.version = 1;
    } catch (error) {
      Sentry.captureException({
        message: $t('index.8497016e1a38822a'),
        oldData: currentDSL.tabs,
      });
      currentDSL.tabsObj = {};
      delete currentDSL.tabs;
    }
  }

  if (currentDSL.children && currentDSL.children.length) {
    currentDSL.children = currentDSL.children.map(migrateTabsDataUsingMigrator);
  }

  return currentDSL;
}

const migrateTabsData = (currentDSL: DSLWidget) => {
  if (
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ["TABS_WIDGET", "TABS_MIGRATOR_WIDGET"].includes(currentDSL.type as any) &&
    currentDSL.version === 1
  ) {
    try {
      currentDSL.type = "TABS_WIDGET";
      const isTabsDataBinded = isString(currentDSL.tabs);

      currentDSL.dynamicPropertyPathList =
        currentDSL.dynamicPropertyPathList || [];
      currentDSL.dynamicBindingPathList =
        currentDSL.dynamicBindingPathList || [];

      if (isTabsDataBinded) {
        const tabsString = currentDSL.tabs.replace(
          DATA_BIND_REGEX_GLOBAL,
          // TODO: Fix this the next time the file is edited
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (word: any) => `"${word}"`,
        );

        try {
          currentDSL.tabs = JSON.parse(tabsString);
        } catch (error) {
          return migrateTabsDataUsingMigrator(currentDSL);
        }
        const dynamicPropsList = currentDSL.tabs // TODO: Fix this the next time the file is edited
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((each: any) => DATA_BIND_REGEX_GLOBAL.test(each.isVisible)) // TODO: Fix this the next time the file is edited
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((each: any) => {
            return { key: `tabsObj.${each.id}.isVisible` };
          });
        // TODO: Fix this the next time the file is edited
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dynamicBindablePropsList = currentDSL.tabs.map((each: any) => {
          return { key: `tabsObj.${each.id}.isVisible` };
        });

        currentDSL.dynamicPropertyPathList = [
          ...currentDSL.dynamicPropertyPathList,
          ...dynamicPropsList,
        ];
        currentDSL.dynamicBindingPathList = [
          ...currentDSL.dynamicBindingPathList,
          ...dynamicBindablePropsList,
        ];
      }

      currentDSL.dynamicPropertyPathList =
        currentDSL.dynamicPropertyPathList.filter((each) => {
          return each.key !== "tabs";
        });
      currentDSL.dynamicBindingPathList =
        currentDSL.dynamicBindingPathList.filter((each) => {
          return each.key !== "tabs";
        });
      currentDSL.tabsObj = currentDSL.tabs.reduce(
        // TODO: Fix this the next time the file is edited
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (obj: any, tab: any, index: number) => {
          obj = {
            ...obj,
            [tab.id]: {
              ...tab,
              isVisible: tab.isVisible === undefined ? true : tab.isVisible,
              index,
            },
          };

          return obj;
        },
        {},
      );
      currentDSL.version = 2;
      delete currentDSL.tabs;
    } catch (error) {
      Sentry.captureException({
        message: $t('index.8497016e1a38822a'),
        oldData: currentDSL.tabs,
      });
      currentDSL.tabsObj = {};
      delete currentDSL.tabs;
    }
  }

  if (currentDSL.children && currentDSL.children.length) {
    currentDSL.children = currentDSL.children.map(migrateTabsData);
  }

  return currentDSL;
};

class TabsMigratorWidget extends BaseWidget<
  TabsWidgetProps<TabContainerWidgetProps>,
  WidgetState
> {
  static type = "TABS_MIGRATOR_WIDGET";

  static getConfig() {
    return {
      name: "TabsMigrator",
      needsMeta: true,
    };
  }

  static getDefaults() {
    return {
      isLoading: true,
      rows: 1,
      columns: 1,
      widgetName: "Skeleton",
      version: 1,
      animateLoading: true,
    };
  }

  getWidgetView() {
    return null;
  }
  static getPropertyPaneConfig() {
    return [
      {
        sectionName: $t('index.16fe4747efedf6ef'),
        children: [
          {
            helpText: $t('index.7489ab2180bd2631'),
            propertyName: "tabs",
            isJSConvertible: true,
            label: $t('index.a67f94ce64bb6243'),
            controlType: "TABS_INPUT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.ARRAY,
              params: {
                children: {
                  type: ValidationTypes.OBJECT,
                  params: {
                    allowedKeys: [
                      {
                        name: "label",
                        type: ValidationTypes.TEXT,
                      },
                      {
                        name: "id",
                        type: ValidationTypes.TEXT,
                        default: generateReactKey(),
                      },
                      {
                        name: "widgetId",
                        type: ValidationTypes.TEXT,
                        default: generateReactKey(),
                      },
                    ],
                  },
                },
              },
            },
          },
          {
            propertyName: "shouldShowTabs",
            helpText:
              $t('index.159fcfa66fac0d63'),
            label: $t('index.849a5b40fa9cb963'),
            controlType: "SWITCH",
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "defaultTab",
            helpText: $t('index.d65c49f1e720b259'),
            placeholderText: $t('index.1c994f6de685b3f0'),
            label: $t('index.ed958632b0ecad96'),
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.FUNCTION,
              params: {
                fn: selectedTabValidation,
                expected: {
                  type: $t('index.0993306c037daab3'),
                  example: $t('index.7cd0ace17535df6a'),
                  autocompleteDataType: AutocompleteDataType.STRING,
                },
              },
            },
            dependencies: ["tabsObj", "tabs"],
          },
          {
            helpText: $t('index.f0fecd5b4b45e614'),
            propertyName: "shouldScrollContents",
            label: $t('index.0ecb7066c512037a'),
            controlType: "SWITCH",
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "isVisible",
            label: $t('index.7d5d6c086f054944'),
            helpText: $t('index.e9a8b836008400b1'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.0c4bf5addaf37d4a'),
            controlType: "SWITCH",
            helpText: $t('index.a4fa569f5cd7dbbf'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.8875c957bbee6fd3'),
        children: [
          {
            helpText: $t('index.2aa30e73cfd92ad1'),
            propertyName: "onTabSelected",
            label: "onTabSelected",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
        ],
      },
    ];
  }

  componentDidMount() {
    if (get(this.props, EVAL_VALUE_PATH, false)) {
      const tabsDsl = cloneDeep(this.props);
      const migratedTabsDsl = migrateTabsData(tabsDsl);

      super.batchUpdateWidgetProperty({
        modify: {
          tabsObj: migratedTabsDsl.tabsObj,
          type: "TABS_WIDGET",
          version: 2,
          dynamicPropertyPathList: migratedTabsDsl.dynamicPropertyPathList,
          dynamicBindingPathList: migratedTabsDsl.dynamicBindingPathList,
        },
        remove: ["tabs"],
      });
    }
  }
}
export default TabsMigratorWidget;
