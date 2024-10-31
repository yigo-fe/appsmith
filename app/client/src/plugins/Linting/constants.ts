import {$t} from "locale/index";
import { ECMA_VERSION } from "@shared/ast";
import type { LintOptions } from "jshint";
import isEntityFunction from "./utils/isEntityFunction";

export const lintOptions = (globalData: Record<string, boolean>) =>
  ({
    indent: 2,
    esversion: ECMA_VERSION,
    eqeqeq: false, // Not necessary to use ===
    curly: false, // Blocks can be added without {}, eg if (x) return true
    freeze: true, // Overriding inbuilt classes like Array is not allowed
    undef: true, // Undefined variables should be reported as error
    forin: false, // Doesn't require filtering for..in loops with obj.hasOwnProperty()
    noempty: false, // Empty blocks are allowed
    strict: false, // We won't force strict mode
    unused: "strict", // Unused variables are not allowed
    asi: true, // Tolerate Automatic Semicolon Insertion (no semicolons)
    boss: true, // Tolerate assignments where comparisons would be expected
    evil: false, // Use of eval not allowed
    funcscope: true, // Tolerate variable definition inside control statements
    sub: true, // Don't force dot notation
    expr: true, // suppresses warnings about the use of expressions where normally you would expect to see assignments or function calls
    // environments
    browser: false,
    worker: true,
    mocha: false,
    // global values
    globals: globalData,
    loopfunc: true,
  }) as LintOptions;
export const JS_OBJECT_START_STATEMENT = $t('constants.31aba46cdd489853');
export const INVALID_JSOBJECT_START_STATEMENT = $t('constants.a83fe3adb1308ca3', {JS_OBJECT_START_STATEMENT: JS_OBJECT_START_STATEMENT});
export const INVALID_JSOBJECT_START_STATEMENT_ERROR_CODE =
  "INVALID_JSOBJECT_START_STATEMENT_ERROR_CODE";
// https://github.com/jshint/jshint/blob/d3d84ae1695359aef077ddb143f4be98001343b4/src/messages.js#L204
export const IDENTIFIER_NOT_DEFINED_LINT_ERROR_CODE = "W117";

// For these error types, we want to show a warning
// All messages can be found here => https://github.com/jshint/jshint/blob/2.9.5/src/messages.js
export const WARNING_LINT_ERRORS = {
  W098: "'{a}' is defined but never used.",
  W014: "Misleading line break before '{a}'; readers may interpret this as an expression boundary.",
  ASYNC_FUNCTION_BOUND_TO_SYNC_FIELD:
    $t('constants.84916c27c673ca97'),
  ACTION_MODAL_STRING: 'Use Modal1.name instead of "Modal" as a string',
};

export function asyncActionInSyncFieldLintMessage(isJsObject = false) {
  return isJsObject
    ? $t('constants.84916c27c673ca97')
    : $t('constants.80451ceef314d743');
}

/** These errors should be overlooked
 * E041 => Unrecoverable syntax error.
 * W032 => Unnecessary semicolon.
 */
export const IGNORED_LINT_ERRORS = ["E041", "W032"];
export const SUPPORTED_WEB_APIS = {
  console: true,
  crypto: true,
  fetch: true,
};
export enum CustomLintErrorCode {
  INVALID_ENTITY_PROPERTY = "INVALID_ENTITY_PROPERTY",
  ASYNC_FUNCTION_BOUND_TO_SYNC_FIELD = "ASYNC_FUNCTION_BOUND_TO_SYNC_FIELD",
  // ButtonWidget.text = "test"
  INVALID_WIDGET_PROPERTY_SETTER = "INVALID_WIDGET_PROPERTY_SETTER",
  // appsmith.store.value = "test"
  INVALID_APPSMITH_STORE_PROPERTY_SETTER = "INVALID_APPSMITH_STORE_PROPERTY_SETTER",
  // showModal("Modal1")
  ACTION_MODAL_STRING = "ACTION_MODAL_STRING",
  INVALID_INPUTS = "INVALID_INPUTS",
}

export const CUSTOM_LINT_ERRORS: Record<
  CustomLintErrorCode,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]) => string
> = {
  [CustomLintErrorCode.INVALID_ENTITY_PROPERTY]: (
    entityName: string,
    propertyName: string,
    entity: unknown,
    isJsObject: boolean,
  ) =>
    isEntityFunction(entity, propertyName, entityName)
      ? asyncActionInSyncFieldLintMessage(isJsObject)
      : `"${propertyName}" doesn't exist in ${entityName}`,

  [CustomLintErrorCode.ASYNC_FUNCTION_BOUND_TO_SYNC_FIELD]: (
    dataFieldBindings: string[],
    fullName: string,
    isMarkedAsync: boolean,
  ) => {
    const hasMultipleBindings = dataFieldBindings.length > 1;
    const bindings = dataFieldBindings.join(" , ");

    return isMarkedAsync
      ? $t('constants.c87f16597c581b6a', {fullName, hasMultipleBindings: hasMultipleBindings ? "fields" : "field", bindings})
      : $t('constants.22aa93b13f0a593e', {fullName, hasMultipleBindings: hasMultipleBindings ? "fields" : "field", bindings});
  },
  [CustomLintErrorCode.INVALID_WIDGET_PROPERTY_SETTER]: (
    methodName: string,
    objectName: string,
    propertyName: string,
    isValidProperty: boolean,
  ) => {
    const suggestionSentence = methodName
      ? $t('constants.15f1084fc8ec810e', {methodName: methodName})
      : $t('constants.3062a076b160750a', {objectName: objectName});

    const lintErrorMessage = !isValidProperty
      ? $t('constants.402fae2b436fb93c', {objectName: objectName,propertyName: propertyName})
      : $t('constants.488f16a047afa6c5', {suggestionSentence: suggestionSentence});

    return lintErrorMessage;
  },
  [CustomLintErrorCode.INVALID_APPSMITH_STORE_PROPERTY_SETTER]: () => {
    return $t('constants.f74238d062141ac2');
  },
  [CustomLintErrorCode.ACTION_MODAL_STRING]: (modalName: string) => {
    return $t('constants.a05f027c8edc14ee', {modalName: modalName});
  },
  [CustomLintErrorCode.INVALID_INPUTS]: (
    inputs: string[],
    invalidKey: string,
  ) => {
    return $t('constants.54060ed4b11bb2d8', {invalidKey: invalidKey, inputs: inputs.join(", ")});
  },
};
