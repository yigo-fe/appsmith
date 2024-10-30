import {$t} from "locale/index";
import {
  HTTP_PROTOCOL_INPUT_PLACEHOLDER,
  createMessage,
} from "ee/constants/messages";
import {
  HTTP_PROTOCOL,
  HTTP_PROTOCOL_VERSIONS,
} from "PluginActionEditor/constants/CommonApiConstants";

export default [
  {
    sectionName: "",
    id: 1,
    children: [
      {
        label: $t('ApiSettingsConfig.dd9f58931691be09'),
        configProperty: "executeOnLoad",
        controlType: "SWITCH",
      },
      {
        label: $t('ApiSettingsConfig.fe7ebc6a234eebb5'),
        configProperty: "confirmBeforeExecute",
        controlType: "SWITCH",
        tooltipText:
          $t('ApiSettingsConfig.fd9351347efeed0e'),
      },
      {
        label: $t('ApiSettingsConfig.af607447918e7020'),
        configProperty: "actionConfiguration.encodeParamsToggle",
        controlType: "SWITCH",
        tooltipText:
          $t('ApiSettingsConfig.b97be24fcbe7a527'),
      },
      {
        label: $t('ApiSettingsConfig.8b4ee6cadcfd10d8'),
        configProperty: "actionConfiguration.pluginSpecifiedTemplates[0].value",
        controlType: "SWITCH",
        tooltipText:
          $t('ApiSettingsConfig.7471e8183ab43061'),
        initialValue: true,
      },
      {
        label: $t('ApiSettingsConfig.71b82df46c0e0b3a'),
        configProperty: "actionConfiguration.httpVersion",
        name: "actionConfiguration.httpVersion",
        controlType: "DROP_DOWN",
        initialValue: HTTP_PROTOCOL.HTTP11.label,
        options: HTTP_PROTOCOL_VERSIONS,
        placeholder: createMessage(HTTP_PROTOCOL_INPUT_PLACEHOLDER),
      },
      {
        label: $t('ApiSettingsConfig.c4e8ce4edcafe885'),
        subtitle: $t('ApiSettingsConfig.76903dd923c597df'),
        controlType: "INPUT_TEXT",
        configProperty: "actionConfiguration.timeoutInMillisecond",
        dataType: "NUMBER",
        width: "270px",
      },
    ],
  },
];
