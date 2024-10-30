import {$t} from "locale/index";
import type { InputWidgetProps } from "../../../widget/types";

// TODO: Fix this the next time the file is edited
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function maxValueValidation(max: any, props: InputWidgetProps, _?: any) {
  const min = props.minNum;
  const value = max;

  max = Number(max);

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

  if (!Number.isFinite(max)) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "TypeError",
          message: $t('maxValueValidation.b472a7d78ca77bf8'),
        },
      ],
    };
  }

  if (min !== undefined && max <= min) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('maxValueValidation.c11a4a7b7a77f5d0'),
        },
      ],
    };
  }

  return {
    isValid: true,
    parsed: Number(max),
    messages: [
      {
        name: "",
        message: "",
      },
    ],
  };
}
