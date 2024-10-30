import {$t} from "locale/index";
import type { InputWidgetProps } from "../../../widget/types";

// TODO: Fix this the next time the file is edited
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function minValueValidation(min: any, props: InputWidgetProps, _?: any) {
  const max = props.maxNum;
  const value = min;

  min = Number(min);

  if (_?.isNil(value) || value === "") {
    return {
      isValid: true,
      parsed: undefined,
      messages: [
        {
          name: "",
          message: "",
        },
      ],
    };
  }

  if (!Number.isFinite(min)) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "TypeError",
          message: $t('minValueValidation.36f8785edff6e56d'),
        },
      ],
    };
  }

  if (max !== undefined && min >= max) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('minValueValidation.46e4bc084c816962'),
        },
      ],
    };
  }

  return {
    isValid: true,
    parsed: Number(min),
    messages: [
      {
        name: "",
        message: "",
      },
    ],
  };
}
