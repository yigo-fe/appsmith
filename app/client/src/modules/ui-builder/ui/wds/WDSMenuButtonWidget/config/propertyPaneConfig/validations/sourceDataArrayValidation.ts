import {$t} from "locale/index";
import type { ValidationResponse } from "constants/WidgetValidation";
import type { MenuButtonWidgetProps } from "modules/ui-builder/ui/wds/WDSMenuButtonWidget/widget/types";

/**
 * Checks if the source data array
 * - is Array
 * - has a max length of 10
 */
export function sourceDataArrayValidation(
  options: unknown,
  props: MenuButtonWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
): ValidationResponse {
  const invalidResponse = {
    isValid: false,
    parsed: [],
    messages: [
      {
        name: "TypeError",
        message: $t('sourceDataArrayValidation.08c700005bfdb7d0'),
      },
    ],
  };

  try {
    if (_.isString(options)) {
      options = JSON.parse(options as string);
    }

    if (Array.isArray(options)) {
      let isValid = true;
      let message = { name: "", message: "" };

      if (options.length > 10) {
        isValid = false;
        message = {
          name: "RangeError",
          message: $t('sourceDataArrayValidation.0dbc7071b8c3681d'),
        };
      }

      return {
        isValid,
        parsed: isValid ? options : [],
        messages: [message],
      };
    } else {
      return invalidResponse;
    }
  } catch (e) {
    return invalidResponse;
  }
}
