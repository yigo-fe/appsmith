import {$t} from "locale/index";
import type { Validation } from "modules/ui-builder/ui/wds/WDSInputWidget/widget/types";
import type { WDSComboBoxWidgetProps } from "./types";

export function validateInput(props: WDSComboBoxWidgetProps): Validation {
  if (!props.isValid) {
    return {
      validationStatus: "invalid",
      errorMessage: $t('helpers.1e9af6964e072669'),
    };
  }

  return {
    validationStatus: "valid",
    errorMessage: "",
  };
}
