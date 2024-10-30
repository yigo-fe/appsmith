import {$t} from "locale/index";
// JSON Form

export const JSON_FORM_CONNECT_OVERLAY_TEXT = () =>
  $t('messages.4af1b63047855b67');
export const JSON_FORM_CONNECT_BUTTON_TEXT = () => $t('messages.1ba4e9ef4ec7f668');
export const SUCCESSFULL_BINDING_MESSAGE = (action: string) =>
  $t('messages.f1eace9a70779a2a', {action: action});
export const ONSUBMIT_NOT_CONFIGURED_MESSAGE = (widgetName: string) =>
  `onSubmit event is not configured for ${widgetName}`;
export const ONSUBMIT_NOT_CONFIGURED_ACTION_TEXT = () => $t('messages.56e47fcbe3b05ff5');

export const NO_CONNECTABLE_WIDGET_FOUND = () =>
  $t('messages.8c729a04532a3240');

export const ONSUBMIT_NOT_CONFIGURED_ACTION_URL = () =>
  "https://docs.appsmith.com/build-apps/how-to-guides/submit-form-data";
