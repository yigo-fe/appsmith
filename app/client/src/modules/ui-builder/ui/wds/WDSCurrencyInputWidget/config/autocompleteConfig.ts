import {$t} from "locale/index";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";

export const autocompleteConfig = {
  "!doc":
    $t('autocompleteConfig.b2d4adbac7ff91bb'),
  "!url": "https://docs.appsmith.com/widget-reference/currency-input",
  parsedText: {
    "!type": "string",
    "!doc": $t('autocompleteConfig.f012464183dc5385'),
    "!url": "https://docs.appsmith.com/widget-reference/currency-input",
  },
  rawText: {
    "!type": "number",
    "!doc": $t('autocompleteConfig.8c16d712f40b67fc'),
    "!url": "https://docs.appsmith.com/widget-reference/currency-input",
  },
  isValid: "bool",
  isVisible: DefaultAutocompleteDefinitions.isVisible,
  isDisabled: "bool",
  isReadOnly: "bool",
  countryCode: {
    "!type": "string",
    "!doc": $t('autocompleteConfig.94bb256b90442ae2'),
  },
  currencyCode: {
    "!type": "string",
    "!doc": $t('autocompleteConfig.59fe7535e503f31d'),
  },
};
