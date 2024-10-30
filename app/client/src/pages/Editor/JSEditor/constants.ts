import {$t} from "locale/index";
export const CONFIRM_BEFORE_CALLING_HEADING = {
  text: $t('constants.1659dd3d1aedc56c'),
  hasInfo: true,
  info: $t('constants.1681be5deb599b40'),
  key: "run_before_calling",
  hidden: true,
};

export const SETTINGS_HEADINGS = [
  {
    text: $t('constants.2381c9853f936814'),
    hasInfo: false,
    key: "func_name",
    hidden: undefined,
  },
  {
    text: $t('constants.2f707920ec7ac706'),
    hasInfo: true,
    info: $t('constants.b360d6b60441d581'),
    key: "run_on_pageload",
    hidden: undefined,
  },
  CONFIRM_BEFORE_CALLING_HEADING,
];

export const RUN_GUTTER_ID = "run-gutter";
export const RUN_GUTTER_CLASSNAME = "run-marker-gutter";
export const JS_OBJECT_HOTKEYS_CLASSNAME = "js-object-hotkeys";
export const ANIMATE_RUN_GUTTER = "animate-run-marker";
