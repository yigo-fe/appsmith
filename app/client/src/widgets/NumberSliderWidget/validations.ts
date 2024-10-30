import {$t} from "locale/index";
import type { NumberSliderWidgetProps } from "./widget";

export function minValueValidation(
  min: unknown,
  props: NumberSliderWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
) {
  if (_.isNil(min) || min === "") {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "ValidationError",
          message: $t('validations.3e3e5b0a54107a56'),
        },
      ],
    };
  }

  const minValue = Number(min);
  const maxValue = props.max;

  if (!Number.isFinite(minValue)) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "TypeError",
          message: $t('validations.c794e39df21a3545'),
        },
      ],
    };
  }

  if (!_.isNil(maxValue) && minValue >= maxValue) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('validations.4a3a67dc28ea7ae7'),
        },
      ],
    };
  }

  return {
    isValid: true,
    parsed: minValue,
    messages: [
      {
        name: "",
        message: "",
      },
    ],
  };
}

export function maxValueValidation(
  max: unknown,
  props: NumberSliderWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
) {
  if (_.isNil(max) || max === "") {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "ValidationError",
          message: $t('validations.3e3e5b0a54107a56'),
        },
      ],
    };
  }

  const maxValue = Number(max);
  const minValue = props.min;

  if (!Number.isFinite(maxValue)) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "TypeError",
          message: $t('validations.c794e39df21a3545'),
        },
      ],
    };
  }

  if (!_.isNil(minValue) && maxValue <= minValue) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('validations.d9afb5b0430efc0d'),
        },
      ],
    };
  }

  return {
    isValid: true,
    parsed: maxValue,
    messages: [
      {
        name: "",
        message: "",
      },
    ],
  };
}

export function defaultValueValidation(
  value: unknown,
  props: NumberSliderWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
) {
  if (_.isNil(value) || value === "") {
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

  const maxValue = props.max;
  const minValue = props.min;
  const defaultValue = Number(value);

  if (!Number.isFinite(defaultValue)) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "TypeError",
          message: $t('validations.c794e39df21a3545'),
        },
      ],
    };
  }

  if (!_.isNil(minValue) && defaultValue < minValue) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('validations.8bed2b1cbb0e6ccd'),
        },
      ],
    };
  }

  if (!_.isNil(maxValue) && defaultValue > maxValue) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('validations.86d55ec9f28691ff'),
        },
      ],
    };
  }

  return {
    isValid: true,
    parsed: defaultValue,
    messages: [
      {
        name: "",
        message: "",
      },
    ],
  };
}

export function stepSizeValidation(
  step: unknown,
  props: NumberSliderWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
) {
  if (_.isNil(step) || step === "") {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "ValidationError",
          message: $t('validations.3e3e5b0a54107a56'),
        },
      ],
    };
  }

  const stepValue = Number(step);

  if (!Number.isFinite(stepValue)) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "TypeError",
          message: $t('validations.c794e39df21a3545'),
        },
      ],
    };
  }

  if (stepValue < 0.1) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('validations.980a51da9535ae3e'),
        },
      ],
    };
  }

  const minValue = props.min;
  const maxValue = props.max;

  const sliderRange = maxValue - minValue;

  if (stepValue > sliderRange) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('validations.3bf202b98a548f47', {sliderRange: sliderRange}),
        },
      ],
    };
  }

  return {
    isValid: true,
    parsed: stepValue,
    messages: [
      {
        name: "",
        message: "",
      },
    ],
  };
}
