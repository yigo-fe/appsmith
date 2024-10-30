import {$t} from "locale/index";
import type { Validation } from "modules/ui-builder/ui/wds/WDSInputWidget/widget/types";
import type { WDSSelectWidgetProps } from "./types";

export function validateInput(props: WDSSelectWidgetProps): Validation {
  if (!props.isValid) {
    return {
      validationStatus: "invalid",
      errorMessage: $t('helpers.05f4d8762b833490'),
    };
  }

  return {
    validationStatus: "valid",
    errorMessage: "",
  };
}
