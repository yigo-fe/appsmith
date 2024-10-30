import {$t} from "locale/index";
import type { ValidationResponse } from "constants/WidgetValidation";
import type { MenuButtonWidgetProps } from "./constants";

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
        message: $t('validations.df9dbfb5fef8de51'),
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
          message: $t('validations.cfa3fa8ce6be7c0d'),
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
