import {$t} from "locale/index";
import type { Validation } from "modules/ui-builder/ui/wds/WDSInputWidget/widget/types";

import type { CheckboxGroupWidgetProps } from "./types";

export function validateInput(props: CheckboxGroupWidgetProps): Validation {
  if (!props.isValid && props.isDirty) {
    return {
      validationStatus: "invalid",
      errorMessage: $t('helpers.2e290a5a926041a0'),
    };
  }

  return {
    validationStatus: "valid",
    errorMessage: "",
  };
}
