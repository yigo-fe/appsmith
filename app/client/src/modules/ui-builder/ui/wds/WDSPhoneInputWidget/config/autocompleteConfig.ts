import {$t} from "locale/index";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";

export const autocompleteConfig = {
  "!doc":
    $t('autocompleteConfig.12656c427edddbff'),
  "!url": "https://docs.appsmith.com/widget-reference/phone-input",
  parsedText: {
    "!type": "string",
    "!doc": $t('autocompleteConfig.2b375cc3d8e0244f'),
    "!url": "https://docs.appsmith.com/widget-reference/phone-input",
  },
  rawText: {
    "!type": "string",
    "!doc": $t('autocompleteConfig.87ec2d3d25b963b8'),
    "!url": "https://docs.appsmith.com/widget-reference/phone-input",
  },
  isValid: "bool",
  isVisible: DefaultAutocompleteDefinitions.isVisible,
  isDisabled: "bool",
  isReadOnly: "bool",
  countryCode: {
    "!type": "string",
    "!doc": $t('autocompleteConfig.17ff595b9a58092e'),
  },
  dialCode: {
    "!type": "string",
    "!doc": $t('autocompleteConfig.465c45b2ee30bf38'),
  },
};
