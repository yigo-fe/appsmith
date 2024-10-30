import {$t} from "locale/index";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";

export const autocompleteConfig = {
  "!doc":
    $t('autocompleteConfig.9a55dd69908d5400'),
  "!url": "https://docs.appsmith.com/widget-reference/input",
  parsedText: {
    "!type": "string",
    "!doc": $t('autocompleteConfig.6628410765f02a4a'),
    "!url": "https://docs.appsmith.com/widget-reference/input",
  },
  isValid: "bool",
  isVisible: DefaultAutocompleteDefinitions.isVisible,
  isDisabled: "bool",
  isReadOnly: "bool",
};
