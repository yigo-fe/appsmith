import {$t} from "locale/index";
export default [
  {
    sectionName: "",
    id: 1,
    children: [
      {
        label: $t('QuerySettingsConfig.e1351dbda7d4b1d2'),
        configProperty: "executeOnLoad",
        controlType: "SWITCH",
      },
      {
        label: $t('QuerySettingsConfig.6cc8f1d53d326b9b'),
        configProperty: "confirmBeforeExecute",
        controlType: "SWITCH",
        tooltipText:
          $t('QuerySettingsConfig.12b0064ee4dcc3b0'),
      },
      {
        label: $t('QuerySettingsConfig.aa7682fa9c0f756f'),
        subtitle: $t('QuerySettingsConfig.55e2adece2e2cd00'),
        configProperty: "actionConfiguration.timeoutInMillisecond",
        controlType: "INPUT_TEXT",
        dataType: "NUMBER",
        width: "270px",
      },
    ],
  },
];
