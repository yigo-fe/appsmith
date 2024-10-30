import {$t} from "locale/index";
import type { Validation } from "modules/ui-builder/ui/wds/WDSInputWidget/widget/types";
import type { RadioGroupWidgetProps } from "./types";

export function validateInput(props: RadioGroupWidgetProps): Validation {
  if (!props.isValid) {
    return {
      validationStatus: "invalid",
      errorMessage: $t('helpers.5c3c316dcd68f524'),
    };
  }

  return {
    validationStatus: "valid",
    errorMessage: "",
  };
}
