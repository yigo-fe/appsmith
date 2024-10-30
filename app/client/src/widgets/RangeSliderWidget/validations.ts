import {$t} from "locale/index";
import type { RangeSliderWidgetProps } from "./widget";

export function minValueValidation(
  min: unknown,
  props: RangeSliderWidgetProps,
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
          message: $t('validations.4a8ed354d0bb467e'),
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
          message: $t('validations.e7aebc6e6f4e075d'),
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
          message: $t('validations.b750f7e6c39848cc'),
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
  props: RangeSliderWidgetProps,
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
          message: $t('validations.4a8ed354d0bb467e'),
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
          message: $t('validations.e7aebc6e6f4e075d'),
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
          message: $t('validations.b4145c8bd51db3e7'),
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

export function stepSizeValidation(
  step: unknown,
  props: RangeSliderWidgetProps,
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
          message: $t('validations.4a8ed354d0bb467e'),
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
          message: $t('validations.e7aebc6e6f4e075d'),
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
          message: $t('validations.3f79471e6590954a'),
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
          message: $t('validations.eac9756f2b4c8260', {sliderRange: sliderRange}),
        },
      ],
    };
  }

  const minRange = props.minRange;

  if (stepValue > minRange) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('validations.b43fb7338ab6345b'),
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

export function startValueValidation(
  startValue: unknown,
  props: RangeSliderWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
) {
  if (_.isNil(startValue) || startValue === "") {
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

  const defaultStartValue = Number(startValue);
  const defaultEndValue = props.defaultEndValue;
  const minValue = props.min;

  if (!Number.isFinite(defaultStartValue)) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "TypeError",
          message: $t('validations.e7aebc6e6f4e075d'),
        },
      ],
    };
  }

  if (!_.isNil(minValue) && defaultStartValue < minValue) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('validations.9a303bf44d43ad7e'),
        },
      ],
    };
  }

  if (defaultEndValue !== undefined && defaultStartValue >= defaultEndValue) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('validations.2c2d432e26d818b6'),
        },
      ],
    };
  }

  return {
    isValid: true,
    parsed: defaultStartValue,
    messages: [
      {
        name: "",
        message: "",
      },
    ],
  };
}

export function endValueValidation(
  endValue: unknown,
  props: RangeSliderWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
) {
  if (_.isNil(endValue) || endValue === "") {
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

  const defaultEndValue = Number(endValue);
  const defaultStartValue = props.defaultStartValue;
  const maxValue = props.max;

  if (!Number.isFinite(defaultEndValue)) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "TypeError",
          message: $t('validations.e7aebc6e6f4e075d'),
        },
      ],
    };
  }

  if (!_.isNil(maxValue) && defaultEndValue > maxValue) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('validations.0b288c29fba09eba'),
        },
      ],
    };
  }

  if (defaultStartValue !== undefined && defaultEndValue <= defaultStartValue) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('validations.2499806779e149b2'),
        },
      ],
    };
  }

  return {
    isValid: true,
    parsed: defaultEndValue,
    messages: [
      {
        name: "",
        message: "",
      },
    ],
  };
}

export function minRangeValidation(
  minRange: unknown,
  props: RangeSliderWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
) {
  if (_.isNil(minRange) || minRange === "") {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "ValidationError",
          message: $t('validations.4a8ed354d0bb467e'),
        },
      ],
    };
  }

  const defaultMinRange = Number(minRange);
  const stepSize = props.step;

  if (!Number.isFinite(defaultMinRange)) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "TypeError",
          message: $t('validations.e7aebc6e6f4e075d'),
        },
      ],
    };
  }

  const minValue = props.min;
  const maxValue = props.max;

  const sliderRange = maxValue - minValue;

  if (defaultMinRange > sliderRange) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('validations.eac9756f2b4c8260', {sliderRange: sliderRange}),
        },
      ],
    };
  }

  if (defaultMinRange < 0.1) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('validations.3f79471e6590954a'),
        },
      ],
    };
  }

  if (defaultMinRange < stepSize) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('validations.385272b8e9ab4445'),
        },
      ],
    };
  }

  return {
    isValid: true,
    parsed: defaultMinRange,
    messages: [
      {
        name: "",
        message: "",
      },
    ],
  };
}
