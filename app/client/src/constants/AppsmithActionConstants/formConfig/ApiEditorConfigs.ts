import {$t} from "locale/index";
export default [
  {
    sectionName: "",
    id: 1,
    children: [
      {
        label: $t('ApiEditorConfigs.c95d481605b1e58d'),
        configProperty: "actionConfiguration.path",
        controlType: "QUERY_DYNAMIC_INPUT_TEXT",
      },
      {
        label: $t('ApiEditorConfigs.709215de4cced7e5'),
        configProperty: "actionConfiguration.body",
        controlType: "QUERY_DYNAMIC_INPUT_TEXT",
        evaluationSubstitutionType: "SMART_SUBSTITUTE",
        hidden: {
          path: "actionConfiguration.pluginSpecifiedTemplates[0].value",
          comparison: "EQUALS",
          value: false,
        },
      },
      {
        label: $t('ApiEditorConfigs.709215de4cced7e5'),
        configProperty: "actionConfiguration.body",
        controlType: "QUERY_DYNAMIC_INPUT_TEXT",
        evaluationSubstitutionType: "TEMPLATE",
        hidden: {
          path: "actionConfiguration.pluginSpecifiedTemplates[0].value",
          comparison: "EQUALS",
          value: true,
        },
      },
      {
        label: $t('ApiEditorConfigs.adaf125bbfb15270'),
        configProperty: "actionConfiguration.queryParameters",
        controlType: "ARRAY_FIELD",
        schema: [
          {
            label: $t('ApiEditorConfigs.54399ec9fc1a355c'),
            key: "key",
            controlType: "QUERY_DYNAMIC_INPUT_TEXT",
            placeholderText: $t('ApiEditorConfigs.54399ec9fc1a355c'),
          },
          {
            label: $t('ApiEditorConfigs.5356df0bba5f672a'),
            key: "value",
            controlType: "QUERY_DYNAMIC_INPUT_TEXT",
            placeholderText: $t('ApiEditorConfigs.5356df0bba5f672a'),
          },
        ],
      },
      {
        label: $t('ApiEditorConfigs.3a7a9b0ed3ddf8cc'),
        configProperty: "actionConfiguration.headers",
        controlType: "ARRAY_FIELD",
        schema: [
          {
            label: $t('ApiEditorConfigs.54399ec9fc1a355c'),
            key: "key",
            controlType: "QUERY_DYNAMIC_INPUT_TEXT",
            placeholderText: $t('ApiEditorConfigs.54399ec9fc1a355c'),
          },
          {
            label: $t('ApiEditorConfigs.5356df0bba5f672a'),
            key: "value",
            controlType: "QUERY_DYNAMIC_INPUT_TEXT",
            placeholderText: $t('ApiEditorConfigs.5356df0bba5f672a'),
          },
        ],
      },
      {
        label: $t('ApiEditorConfigs.cf169986f3783d19'),
        configProperty: "actionConfiguration.bodyFormData",
        controlType: "ARRAY_FIELD",
        schema: [
          {
            label: $t('ApiEditorConfigs.54399ec9fc1a355c'),
            key: "key",
            controlType: "QUERY_DYNAMIC_INPUT_TEXT",
            placeholderText: $t('ApiEditorConfigs.54399ec9fc1a355c'),
          },
          {
            label: $t('ApiEditorConfigs.5356df0bba5f672a'),
            key: "value",
            controlType: "QUERY_DYNAMIC_INPUT_TEXT",
            placeholderText: $t('ApiEditorConfigs.5356df0bba5f672a'),
          },
        ],
      },
      {
        label: $t('ApiEditorConfigs.7b985f3f8a0cec12'),
        configProperty: "actionConfiguration.pluginSpecifiedTemplates[1].value",
        controlType: "QUERY_DYNAMIC_INPUT_TEXT",
        evaluationSubstitutionType: "SMART_SUBSTITUTE",
        hidden: {
          path: "actionConfiguration.pluginSpecifiedTemplates[0].value",
          comparison: "EQUALS",
          value: false,
        },
      },
      {
        label: $t('ApiEditorConfigs.7b985f3f8a0cec12'),
        configProperty: "actionConfiguration.pluginSpecifiedTemplates[1].value",
        controlType: "QUERY_DYNAMIC_INPUT_TEXT",
        evaluationSubstitutionType: "TEMPLATE",
        hidden: {
          path: "actionConfiguration.pluginSpecifiedTemplates[0].value",
          comparison: "EQUALS",
          value: true,
        },
      },
      {
        label: $t('ApiEditorConfigs.bb90fcebb65f51e8'),
        configProperty: "actionConfiguration.pluginSpecifiedTemplates[2].value",
        controlType: "E_GRAPHQL_PAGINATION",
        evaluationSubstitutionType: "SMART_SUBSTITUTE",
      },
    ],
  },
];
