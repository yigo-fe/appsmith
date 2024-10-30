import {$t} from "locale/index";
import { SIGNPOSTING_STEP } from "./Utils";

//Hide Anonymous Data Popup after 15 seconds
export const ANONYMOUS_DATA_POPOP_TIMEOUT = 15000;

//Telemetry Docs Page
export const TELEMETRY_DOCS_PAGE_URL =
  "https://docs.appsmith.com/product/telemetry";

export const SIGNPOSTING_ANALYTICS_STEP_NAME = {
  [SIGNPOSTING_STEP.CONNECT_A_DATASOURCE]: $t('constants.1de5c58e06dbb0f1'),
  [SIGNPOSTING_STEP.CREATE_A_QUERY]: $t('constants.873bb1508318d274'),
  [SIGNPOSTING_STEP.ADD_WIDGETS]: $t('constants.e4b07beadc6e9c8d'),
  [SIGNPOSTING_STEP.CONNECT_DATA_TO_WIDGET]: $t('constants.a90f08c466b71306'),
  [SIGNPOSTING_STEP.DEPLOY_APPLICATIONS]: $t('constants.4b58da247dc4941d'),
};
