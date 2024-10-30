import {$t} from "locale/index";
export default [
  {
    sectionName: "",
    id: 1,
    children: [
      {
        label: $t('GoogleSheetsSettingsConfig.a55b6db392bba33b'),
        configProperty: "executeOnLoad",
        controlType: "SWITCH",
      },
      {
        label: $t('GoogleSheetsSettingsConfig.0ff49b43f27867b0'),
        configProperty: "confirmBeforeExecute",
        controlType: "SWITCH",
        tooltipText:
          $t('GoogleSheetsSettingsConfig.cb9e975e65d60b8a'),
      },
      {
        label: $t('GoogleSheetsSettingsConfig.da88aa6dce477718'),
        subtitle: $t('GoogleSheetsSettingsConfig.016b528a68d7a0f2'),
        configProperty: "actionConfiguration.timeoutInMillisecond",
        controlType: "INPUT_TEXT",
        dataType: "NUMBER",
        width: "270px",
      },
    ],
  },
];
