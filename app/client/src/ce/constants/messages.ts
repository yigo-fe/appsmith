import {$t} from "locale/index";
import type { PageErrorMessageProps } from "pages/common/ErrorPages/Components/PageErrorMessage";

export // TODO: Fix this the next time the file is edited
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createMessage(format: (...strArgs: any[]) => string, ...args: any[]) {
  return format(...args);
}

/*
  For self hosted CE, it displays the string "Appsmith Community v1.10.0".
 */
export const APPSMITH_DISPLAY_VERSION = (edition: string, version: string) =>
  `Appsmith ${edition} ${version}`;
export const INTERCOM_CONSENT_MESSAGE = () =>
  $t('messages.1b4e2ef0b36f57f0');
export const YES = () => $t('messages.a6d0b97fe5922124');
export const ARE_YOU_SURE = () => $t('messages.94920b8e6194aa6c');
export const CHAT_WITH_US = () => $t('messages.7e7c37f9143e9c44');
export const ERROR_ADD_API_INVALID_URL = () =>
  $t('messages.10cd99827a5213e6');
export const ERROR_MESSAGE_NAME_EMPTY = () => $t('messages.8817d781d3a3d651');
export const ERROR_MESSAGE_CREATE_APPLICATION = () =>
  $t('messages.d475e4c5df0cbe23');
export const APPLICATION_NAME_UPDATE = () => $t('messages.0295d9e7ddf9ec80');
export const ERROR_EMPTY_APPLICATION_NAME = () =>
  $t('messages.11aefc5248e7c008');
export const API_PATH_START_WITH_SLASH_ERROR = () => $t('messages.a1548b240c88da55');
export const FIELD_REQUIRED_ERROR = () => $t('messages.f713bda228ebc991');
export const INPUT_DEFAULT_TEXT_MAX_CHAR_ERROR = (max: number) =>
  $t('messages.89928366fbf24692', {max: max});
export const INPUT_TEXT_MAX_CHAR_ERROR = (max: number) =>
  $t('messages.465a1ef5e73bbb12', {max: max});
export const INPUT_DEFAULT_TEXT_MAX_NUM_ERROR = () =>
  $t('messages.d62b686051c1a413');
export const INPUT_DEFAULT_TEXT_MIN_NUM_ERROR = () =>
  $t('messages.50a05fd378ebb52e');
export const INPUT_INVALID_TYPE_ERROR = () =>
  $t('messages.05fe3be94ba6d909');
export const VALID_FUNCTION_NAME_ERROR = () =>
  $t('messages.d53b0697d074b2ff');
export const UNIQUE_NAME_ERROR = () => $t('messages.18347b3c8c0923d7');
export const NAME_SPACE_ERROR = () => $t('messages.fd5f04b6f0aa278a');
export const APLHANUMERIC_HYPHEN_SLASH_SPACE_ERROR = () =>
  $t('messages.c4a743fac4bda73e');

export const FORM_VALIDATION_EMPTY_EMAIL = () => $t('messages.a0b96c759abc9b08');
export const FORM_VALIDATION_INVALID_EMAIL = () =>
  $t('messages.97416c8d883412de');
export const ENTER_VIDEO_URL = () => $t('messages.4c776066ca85b405');
export const ENTER_AUDIO_URL = () => $t('messages.4c776066ca85b405');

export const FORM_VALIDATION_EMPTY_PASSWORD = () => $t('messages.7183d6e32e065767');
export const FORM_VALIDATION_PASSWORD_RULE = () =>
  $t('messages.7a07c412d7795892');
export const FORM_VALIDATION_INVALID_PASSWORD = FORM_VALIDATION_PASSWORD_RULE;

export const LOGIN_PAGE_EMAIL_INPUT_LABEL = () => $t('messages.b89b6ed8f3cf5639');
export const LOGIN_PAGE_PASSWORD_INPUT_LABEL = () => $t('messages.803a6ccaee85debb');
export const LOGIN_PAGE_EMAIL_INPUT_PLACEHOLDER = () => $t('messages.3530f5b50c40a9b0');
export const LOGIN_PAGE_PASSWORD_INPUT_PLACEHOLDER = () =>
  $t('messages.de2d9d36f870d25b');
export const LOGIN_PAGE_INVALID_CREDS_ERROR = () =>
  $t('messages.571cd0ebe5a87c27');
export const LOGIN_PAGE_INVALID_CREDS_FORGOT_PASSWORD_LINK = () =>
  $t('messages.e2198186245a5cc8');
export const NEW_TO_APPSMITH = () => $t('messages.969a4333ce5e3ef0');
export const LOGIN_PAGE_TITLE = () => $t('messages.3518c569858910d4');
export const LOGIN_PAGE_SUBTITLE = () => $t('messages.3518c569858910d4');

export const LOGIN_PAGE_LOGIN_BUTTON_TEXT = () => $t('messages.f01514ccb20726f1');
export const LOGIN_PAGE_FORGOT_PASSWORD_TEXT = () => $t('messages.4cfa5c41daaef8ad');
export const LOGIN_PAGE_REMEMBER_ME_LABEL = () => $t('messages.c81048a07f617f6c');
export const LOGIN_PAGE_SIGN_UP_LINK_TEXT = () => $t('messages.6009a537f9f375e7');
export const SIGNUP_PAGE_TITLE = () => $t('messages.6e07f33c50a51473');
export const SIGNUP_PAGE_SUBTITLE = () => $t('messages.0308f151cfecd00f');
export const SIGNUP_PAGE_EMAIL_INPUT_LABEL = () => $t('messages.b89b6ed8f3cf5639');
export const SIGNUP_PAGE_EMAIL_INPUT_PLACEHOLDER = () => $t('messages.3530f5b50c40a9b0');
export const SIGNUP_PAGE_NAME_INPUT_PLACEHOLDER = () => $t('messages.59b987976ebf281f');
export const SIGNUP_PAGE_NAME_INPUT_LABEL = () => $t('messages.59b987976ebf281f');
export const SIGNUP_PAGE_PASSWORD_INPUT_LABEL = () => $t('messages.803a6ccaee85debb');
export const SIGNUP_PAGE_PASSWORD_INPUT_PLACEHOLDER = () =>
  $t('messages.de2d9d36f870d25b');
export const SIGNUP_PAGE_LOGIN_LINK_TEXT = () => $t('messages.f01514ccb20726f1');
export const SIGNUP_PAGE_NAME_INPUT_SUBTEXT = () => $t('messages.2376d82334ae4fa6');
export const SIGNUP_PAGE_SUBMIT_BUTTON_TEXT = () => $t('messages.6009a537f9f375e7');
export const ALREADY_HAVE_AN_ACCOUNT = () => $t('messages.c643939cc3c3aa41');
export const LOOKING_TO_SELF_HOST = () => "Looking to self-host Appsmith?";
export const VISIT_OUR_DOCS = () => $t('messages.cf72d0f1bd0a57d4');

export const SIGNUP_PAGE_SUCCESS = () =>
  $t('messages.f601cf739b5cc22b');
export const SIGNUP_PAGE_SUCCESS_LOGIN_BUTTON_TEXT = () => $t('messages.77acd48ec2ca91f9');

export const RESET_PASSWORD_PAGE_PASSWORD_INPUT_LABEL = () => $t('messages.9ae1a44c02bdcaa2');
export const RESET_PASSWORD_PAGE_PASSWORD_INPUT_PLACEHOLDER = () =>
  $t('messages.423c8109956c89b4');
export const RESET_PASSWORD_LOGIN_LINK_TEXT = () => $t('messages.93413a6ffe56db34');
export const RESET_PASSWORD_PAGE_TITLE = () => $t('messages.e2198186245a5cc8');
export const RESET_PASSWORD_SUBMIT_BUTTON_TEXT = () => $t('messages.3166091c4587d5c7');
export const RESET_PASSWORD_PAGE_SUBTITLE = () =>
  $t('messages.918bc66acd06a499');

export const RESET_PASSWORD_RESET_SUCCESS = () =>
  $t('messages.0d4c545efd5e1dfc'); //`Your password has been reset. Please login` (see next entry));
export const RESET_PASSWORD_RESET_SUCCESS_LOGIN_LINK = () => $t('messages.77acd48ec2ca91f9');

export const RESET_PASSWORD_EXPIRED_TOKEN = () =>
  $t('messages.4ac4f185ca6d6287');
export const RESET_PASSWORD_INVALID_TOKEN = () =>
  $t('messages.83eee75c310b3ff7');
export const RESET_PASSWORD_FORGOT_PASSWORD_LINK = () => $t('messages.4cfa5c41daaef8ad');

export const FORGOT_PASSWORD_PAGE_EMAIL_INPUT_LABEL = () => $t('messages.b89b6ed8f3cf5639');
export const FORGOT_PASSWORD_PAGE_EMAIL_INPUT_PLACEHOLDER = () =>
  $t('messages.3530f5b50c40a9b0');
export const FORGOT_PASSWORD_PAGE_TITLE = () => $t('messages.e2198186245a5cc8');
export const FORGOT_PASSWORD_PAGE_SUB_TITLE = () =>
  $t('messages.ab6a9c0856018b31');
export const FORGOT_PASSWORD_PAGE_SUBTITLE = () =>
  $t('messages.1ae2c7cdc411d03f');
export const FORGOT_PASSWORD_PAGE_SUBMIT_BUTTON_TEXT = () => $t('messages.9d1f7f272bcecdc4');
export const FORGOT_PASSWORD_SUCCESS_TEXT = (email: string) =>
  `A password reset link has been sent to your email address ${email} registered with Appsmith.`;

export const VERIFICATION_PENDING_TITLE = () => $t('messages.5970c186be4b78e9');
export const VERIFICATION_PENDING_BODY = () =>
  $t('messages.c7460117e4a97483');

export const VERIFICATION_PENDING_NOT_YOU = () => $t('messages.0ca5caeaad232a23');

export const VERIFICATION_PENDING_NO_EMAIL = () =>
  $t('messages.e989698ebef7954d');

export const VERIFICATION_PENDING_RESEND_LINK = () => $t('messages.270a65487f77c98d');

export const VERIFY_ERROR_ALREADY_VERIFIED_TITLE = () =>
  $t('messages.a48d289e718e6d58');

export const VERIFY_ERROR_EXPIRED_TITLE = () => $t('messages.3fa5afa94631735a');

export const VERIFY_ERROR_MISMATCH_TITLE = () =>
  $t('messages.082109b55f38bfd9');

export const PRIVACY_POLICY_LINK = () => $t('messages.746c454522ca259b');
export const TERMS_AND_CONDITIONS_LINK = () => $t('messages.8ed898a4fb32f79e');

export const ERROR_500 = () =>
  $t('messages.4ac1f4e9e8b2dc3e');
export const ERROR_0 = () =>
  $t('messages.4120b536d4f93985');
export const ERROR_401 = () =>
  $t('messages.7f51e85f6554f0f5');
export const ERROR_413 = (maxFileSize: number) =>
  $t('messages.3636e8a3e5db6b13', {maxFileSize: maxFileSize});
export const GENERIC_API_EXECUTION_ERROR = () => $t('messages.cf8fb2a80defa702');
export const APPSMITH_HTTP_ERROR_413 = () => `413 CONTENT_TOO_LARGE`;
export const ERROR_403 = (entity: string, userEmail: string) =>
  `Sorry, but your account (${userEmail}) does not seem to have the required access to update this ${entity}. Please get in touch with your Appsmith admin to resolve this.`;
export const PAGE_NOT_FOUND_ERROR = () =>
  $t('messages.917c647bff119b6a');
export const INVALID_URL_ERROR = () => $t('messages.b3c92e13375d16d0');
export const INVALID_NAME_ERROR = () => $t('messages.629ae38d46b80c1b');
export const MAKE_APPLICATION_PUBLIC = () => $t('messages.7f62cbd29739520d');
export const MAKE_APPLICATION_PUBLIC_TOOLTIP = () =>
  "A public app is accessible to anyone who can access your instance of appsmith";
export const INVITE_TAB = () => $t('messages.7a03b8d8d767bca6');
export const INVITE_USERS_VALIDATION_EMAIL_LIST = () =>
  $t('messages.67596c103570481b');
export const INVITE_USERS_VALIDATION_ROLE_EMPTY = () => $t('messages.24fc8183b50c41a7');
export const APPLICATION_INVITE = (name: string) => $t('messages.0ef579f8c38a3b6c', {name: name});
export const INVITE_USERS_EMAIL_LIST_PLACEHOLDER = () =>
  $t('messages.f8caeb3651936e61');
export const INVITE_USERS_ROLE_SELECT_PLACEHOLDER = () => $t('messages.3d2a575ac3f89b49');
export const INVITE_USERS_ROLE_SELECT_LABEL = () => $t('messages.974f03b30bd92dcf');
export const INVITE_USERS_EMAIL_LIST_LABEL = () => $t('messages.11ffe3bcf0aa905a');
export const INVITE_USERS_ADD_EMAIL_LIST_FIELD = () => $t('messages.fd31239421dd993a');
export const INVITE_USERS_MESSAGE = () => $t('messages.c109c1115d9c6ab6');
export const INVITE_USERS_PLACEHOLDER = () => $t('messages.2d5717a11fe22bc3');
export const INVITE_USERS_SUBMIT_BUTTON_TEXT = () => $t('messages.c109c1115d9c6ab6');
export const INVITE_USERS_SUBMIT_SUCCESS = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  cloudHosting?: boolean,
) => $t('messages.45eeb259ced415d3');
export const INVITE_USER_SUBMIT_SUCCESS = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  cloudHosting?: boolean,
) => $t('messages.5370da75d211f922');
export const INVITE_USERS_VALIDATION_EMAILS_EMPTY = () =>
  $t('messages.3b312df080122630');
export const INVITE_USER_RAMP_TEXT = () =>
  $t('messages.4ec2e28641baa5c2');
export const CUSTOM_ROLES_RAMP_TEXT = () =>
  $t('messages.9e8b29576ae1f92c');
export const ASSIGN_CUSTOM_ROLE = () => $t('messages.a80629b1479e93c0');
export const CUSTOM_ROLE_TEXT = () => $t('messages.3c1e22319c889ea5');
export const CUSTOM_ROLE_DISABLED_OPTION_TEXT = () =>
  $t('messages.677269543152e211');
export const USERS_HAVE_ACCESS_TO_ALL_APPS = () =>
  $t('messages.4bf56eade9e8c3f4');
export const USERS_HAVE_ACCESS_TO_ONLY_THIS_APP = () =>
  $t('messages.a15aadfc094b748c');
export const NO_USERS_INVITED = () => $t('messages.3a8778fb75ec3753');
export const BUSINESS_EDITION_TEXT = () => $t('messages.d668ba6d56d40ec1');
export const PARTNER_PROGRAM_CALLOUT = (
  email: string,
) => $t('messages.218b0052da934abb', {email});
export const PARTNER_PROGRAM_CALLOUT_LINK = () =>
  `Learn about Appsmith Partner Program`;
export const NEW_APPLICATION = () => $t('messages.a15561ab43301aa1');
export const APPLICATIONS = () => $t('messages.c43aff6b51a331b7');
export const FIXED_APPLICATIONS = () => $t('messages.35d3c4141af0d7ca');
export const ANVIL_APPLICATIONS = () => $t('messages.ddfebc4d4e19ebf9');

export const USER_PROFILE_PICTURE_UPLOAD_FAILED = () =>
  $t('messages.bc085094fd154b10');
export const UPDATE_USER_DETAILS_FAILED = () =>
  $t('messages.d7c09a4e9aca2b13');
export const USER_DISPLAY_PICTURE_FILE_INVALID = () =>
  $t('messages.b8481b56dbda52a9');
export const USER_DISPLAY_NAME_CHAR_CHECK_FAILED = () =>
  $t('messages.87d76c2c21eb6546');
export const USER_DISPLAY_NAME_PLACEHOLDER = () => $t('messages.53613b954d1fd6f9');
export const USER_DISPLAY_PICTURE_PLACEHOLDER = () => $t('messages.62a3b391b9af2bd1');
export const USER_EMAIL_PLACEHOLDER = () => $t('messages.b89b6ed8f3cf5639');
export const USER_RESET_PASSWORD = () => $t('messages.e2198186245a5cc8');

export const CREATE_PASSWORD_RESET_SUCCESS = () => $t('messages.b215168ecbe1732a');
export const CREATE_PASSWORD_RESET_SUCCESS_LOGIN_LINK = () => $t('messages.77acd48ec2ca91f9');

export const FORGOT_PASSWORD_PAGE_LOGIN_LINK = () => $t('messages.93413a6ffe56db34');
export const ADD_API_TO_PAGE_SUCCESS_MESSAGE = (actionName: string) =>
  $t('messages.cac6c3092caed919', {actionName: actionName});
export const INPUT_WIDGET_DEFAULT_VALIDATION_ERROR = () => $t('messages.9218d7f604a086fe');

export const AUTOFIT_ALL_COLUMNS = () => $t('messages.177418e6f70d8f19');
export const AUTOFIT_THIS_COLUMN = () => $t('messages.b8826b0cc120b64c');
export const AUTOFIT_COLUMN = () => $t('messages.c2b175e098abac65');

export const DATE_WIDGET_DEFAULT_VALIDATION_ERROR = () => $t('messages.9e48ceb91c4baffa');

export const TIMEZONE = () => $t('messages.5ab1f3bda11c2098');
export const ENABLE_TIME = () => $t('messages.e0dff7aac4ab9f3e');

export const EDIT_APP = () => $t('messages.abf065dc7d411c98');
export const FORK_APP = () => $t('messages.304e45198e4d6ec2');
export const SIGN_IN = () => $t('messages.f01514ccb20726f1');
export const SHARE_APP = () => $t('messages.04397722caf29d21');
export const ALL_APPS = () => $t('messages.24fb417ae6094ad2');
export const KNOW_MORE = () => $t('messages.3dc571b998e49e68');

export const EDITOR_HEADER = {
  saving: () => $t('messages.1c21c4f36619dc07'),
  saveFailed: () => $t('messages.fce213540ee9c114'),
  share: () => $t('messages.bb8ea70347838aac'),
  previewTooltip: {
    text: () => $t('messages.f388e85e459c7ab7'),
    shortcut: () => "P",
  },
};

// Homepage
export const CREATE_NEW_APPLICATION = () => $t('messages.bac97c9b06ce902f');
export const SEARCH_APPS = () => $t('messages.69864d324c5dbb4e');
export const GETTING_STARTED = () => $t('messages.f95d2619ca14d584');
export const WORKSPACES_HEADING = () => $t('messages.fe10275aa2e1cc67');
export const CREATE_A_NEW_WORKSPACE = () => $t('messages.7093e2ea337f5965');
export const WELCOME_TOUR = () => $t('messages.424353c2fbb5c139');
export const NO_APPS_FOUND = () =>
  $t('messages.493a38a4d6448508');
export const APPLICATION_CARD_LIST_ZERO_STATE = () =>
  $t('messages.7e252d9998e91cff');
export const NEW_APPLICATION_CARD_LIST_ZERO_STATE = () =>
  $t('messages.f7b1898c1041df0a');
export const CLASSIC_APPLICATION_CARD_LIST_ZERO_STATE = () =>
  $t('messages.c4f70171708512bb');
export const TRY_GUIDED_TOUR = () => $t('messages.b51f2914ccad004b');
export const JOIN_OUR_DISCORD = () => $t('messages.24653f9c39f40974');
export const WHATS_NEW = () => $t('messages.64e758eba972ac43');
export const WORKSPACE_ACTION_BUTTON = () => $t('messages.bac97c9b06ce902f');
export const NEW_APP = () => $t('messages.a026ea8beac51ffe');
export const NEW_APP_FROM_TEMPLATE = () => $t('messages.d2786a2052487cbb');
export const NO_WORKSPACE_HEADING = () => $t('messages.5f3ed911e9fdab2c');
export const NO_WORKSPACE_DESCRIPTION = () =>
  $t('messages.a2dfc3f3086d98c5');

// Lightning menu
export const LIGHTNING_MENU_DATA_API = () => $t('messages.ecf74e755d2021f5');
export const LIGHTNING_MENU_DATA_QUERY = () => $t('messages.f745883ae33f0796');
export const LIGHTNING_MENU_DATA_TOOLTIP = () => $t('messages.1dff12fe7d57daea');
export const LIGHTNING_MENU_DATA_WIDGET = () => $t('messages.b383bc7af82491c4');
export const LIGHTNING_MENU_QUERY_CREATE_NEW = () => $t('messages.1d3c7cf1dfc8d541');
export const LIGHTNING_MENU_API_CREATE_NEW = () => $t('messages.3f08960eb9f3deaa');

export const LIGHTNING_MENU_OPTION_TEXT = () => $t('messages.75af6ba2f7ed1f4f');
export const LIGHTNING_MENU_OPTION_JS = () => $t('messages.84aebf92ca455ab0');
export const LIGHTNING_MENU_OPTION_HTML = () => $t('messages.0481ebc8148f9841');
export const CHECK_REQUEST_BODY = () =>
  $t('messages.9e6b570ca986a0e3');
export const DONT_SHOW_THIS_AGAIN = () => $t('messages.152611d2971976b0');

export const TABLE_FILTER_COLUMN_TYPE_CALLOUT = () =>
  $t('messages.df028c0d8a041118');

export const SAVE_HOTKEY_TOASTER_MESSAGE = () =>
  $t('messages.a4d41b165d69bdd6');

export const WIDGET_SIDEBAR_TITLE = () => $t('messages.b203819586adb3d7');
export const WIDGET_SIDEBAR_CAPTION = () =>
  $t('messages.12a7551e471ece61');
export const GOOGLE_RECAPTCHA_KEY_ERROR = () =>
  `Google reCAPTCHA token generation failed! Please check the reCAPTCHA site key.`;
export const GOOGLE_RECAPTCHA_DOMAIN_ERROR = () =>
  `Google reCAPTCHA token generation failed! Please check the allowed domains.`;

export const SERVER_API_TIMEOUT_ERROR = () =>
  `Appsmith server is taking too long to respond. Please try again after some time`;
export const DEFAULT_ERROR_MESSAGE = () => $t('messages.995bd0409288b0fc');
export const REMOVE_FILE_TOOL_TIP = () => $t('messages.16f1a79e17a62000');
export const ERROR_FILE_TOO_LARGE = (fileSize: string) =>
  $t('messages.4ef26cdf39e16e86', {fileSize: fileSize});
export const ERROR_DATEPICKER_MIN_DATE = () =>
  $t('messages.fa43117f5eb8dbda');
export const ERROR_DATEPICKER_MAX_DATE = () =>
  $t('messages.fa43117f5eb8dbda');
export const ERROR_WIDGET_DOWNLOAD = (err: string) => $t('messages.8a2bb984e69f8cb2', {err: err});
export const ERROR_PLUGIN_ACTION_EXECUTE = (actionName: string) =>
  $t('messages.cf1d09957ad632ca', {actionName: actionName});
export const ACTION_EXECUTION_CANCELLED = (actionName: string) =>
  $t('messages.a1babdbd5fd82fa3', {actionName: actionName});
export const ERROR_FAIL_ON_PAGE_LOAD_ACTIONS = () =>
  $t('messages.7881d5bdcb67cb79');
export const ERROR_ACTION_EXECUTE_FAIL = (actionName: string) =>
  $t('messages.4038a245a2655551', {actionName: actionName});
export const ACTION_MOVE_SUCCESS = (actionName: string, pageName: string) =>
  $t('messages.70dcc6887ab7e5dc', {actionName: actionName,pageName: pageName});
export const ERROR_ACTION_MOVE_FAIL = (actionName: string) =>
  $t('messages.7f85e0d8cffc4c4f', {actionName: actionName});
export const ACTION_COPY_SUCCESS = (actionName: string, pageName: string) =>
  `${actionName} action copied ${pageName.length > 0 ? "to page " + pageName : ""} successfully`;
export const ERROR_ACTION_COPY_FAIL = (actionName: string) =>
  $t('messages.c2a49db5cd9aea91', {actionName: actionName});
export const ERROR_ACTION_RENAME_FAIL = (actionName: string) =>
  $t('messages.16ea6c7142034a0e', {actionName: actionName});

// Action Names Messages
export const ACTION_NAME_PLACEHOLDER = (type: string) =>
  $t('messages.23c2df50729a1601', {type: type});
export const ACTION_INVALID_NAME_ERROR = () => $t('messages.9401deeaa6e577b3');
export const ACTION_NAME_CONFLICT_ERROR = (name: string) =>
  $t('messages.b0134c9ff350920c', {name: name});
export const ENTITY_EXPLORER_ACTION_NAME_CONFLICT_ERROR = (name: string) =>
  $t('messages.eed3d9ae7ecf876f', {name: name});

export const ACTION_ID_NOT_FOUND_IN_URL =
  $t('messages.ad1b635cec5a2585');
export const JS_OBJECT_ID_NOT_FOUND_IN_URL =
  $t('messages.f65a413195af8766');

export const DATASOURCE_CREATE = (dsName: string) =>
  $t('messages.20b9aeeeb58b304d', {dsName: dsName});
export const DATASOURCE_DELETE = (dsName: string) =>
  $t('messages.626ae162e8549dd8', {dsName: dsName});
export const DATASOURCE_UPDATE = (dsName: string) =>
  $t('messages.e242c5a353bedf6b', {dsName: dsName});
export const DATASOURCE_VALID = (dsName: string) =>
  $t('messages.465ed0dcce244651', {dsName: dsName});
export const EDIT_DATASOURCE = () => $t('messages.aa177b4b0f5cceac');
export const SAVE_DATASOURCE = () => $t('messages.03f41736e0cec2b6');
export const SAVE_DATASOURCE_MESSAGE = () =>
  $t('messages.96e98e03ebf5c592');
export const EDIT_DATASOURCE_MESSAGE = () =>
  $t('messages.93e54e07b03bfadc');
export const OAUTH_ERROR = () => $t('messages.bfd387e9b2884a64');
export const OAUTH_2_0 = () => $t('messages.8fe9de7bc0b81e28');
export const ENABLE = () => $t('messages.7cd4ba60ca37745c');
export const UPGRADE = () => $t('messages.e3b346a7d1115345');
export const EDIT = () => $t('messages.aa177b4b0f5cceac');
export const CONFIGURE = () => $t('messages.fd8f2edff78cb88a');
export const UNEXPECTED_ERROR = () => $t('messages.ee02b95a3d27e3fa');
export const EXPECTED_ERROR = () => $t('messages.d167e13d959dfe21');
export const NO_DATASOURCE_FOR_QUERY = () =>
  $t('messages.397673e6af937407');
export const ACTION_EDITOR_REFRESH = () => $t('messages.351e70144df2b795');
export const INVALID_FORM_CONFIGURATION = () => $t('messages.f421c50523238e3e');
export const ACTION_RUN_BUTTON_MESSAGE_FIRST_HALF = () => "🙌 Click on";
export const ACTION_RUN_BUTTON_MESSAGE_SECOND_HALF = () =>
  $t('messages.ac4bb4e8baaa75f2');
export const CREATE_NEW_DATASOURCE = () => $t('messages.92b81b118954eab5');
export const CREATE_NEW_DATASOURCE_DATABASE_HEADER = () => $t('messages.32b117f81759a679');
export const CREATE_NEW_DATASOURCE_MOST_POPULAR_HEADER = () => $t('messages.653d499fa664e5f4');
export const CREATE_NEW_DATASOURCE_REST_API = () => "REST API";
export const SAMPLE_DATASOURCES = () => $t('messages.b16a84305d143f4b');

export const ERROR_EVAL_ERROR_GENERIC = () =>
  $t('messages.886a593ab4b1910a');

export const ERROR_EVAL_TRIGGER = (message: string) =>
  $t('messages.2d5b3805883ff578', {message: message});

export const WIDGET_COPY = (widgetName: string) => $t('messages.98ad08d950406ca6', {widgetName: widgetName});
export const ERROR_WIDGET_COPY_NO_WIDGET_SELECTED = () =>
  $t('messages.0dee6cd474fc20be');
export const ERROR_WIDGET_COPY_NOT_ALLOWED = () =>
  $t('messages.f3b5a5fc40e7d146');
export const WIDGET_CUT = (widgetName: string) => $t('messages.ca63306c1adf4bdc', {widgetName: widgetName});
export const ERROR_WIDGET_CUT_NO_WIDGET_SELECTED = () =>
  $t('messages.897460590ef144e0');
export const ERROR_WIDGET_CUT_NOT_ALLOWED = () =>
  $t('messages.08a53e840593b96c');
export const ERROR_PASTE_ANVIL_LAYOUT_SYSTEM_CONFLICT = () =>
  $t('messages.479285dfc8e5bb1c');
export const ERROR_PASTE_FIXED_LAYOUT_SYSTEM_CONFLICT = () =>
  $t('messages.b25630066bfc948b');
export const SELECT_ALL_WIDGETS_MSG = () =>
  $t('messages.dea39722b6b51fb9');
export const ERROR_ADD_WIDGET_FROM_QUERY = () => $t('messages.6a8de975c78ea8b2');

export const REST_API_AUTHORIZATION_SUCCESSFUL = () =>
  $t('messages.1e1e04a0728b1966');
export const REST_API_AUTHORIZATION_FAILED = () =>
  $t('messages.66a648e3df7f669b');
// Todo: improve this for appsmith_error error message
export const REST_API_AUTHORIZATION_APPSMITH_ERROR = () =>
  $t('messages.2615c522e32f4bad');

export const OAUTH_AUTHORIZATION_SUCCESSFUL = $t('messages.1e1e04a0728b1966');
export const OAUTH_AUTHORIZATION_FAILED =
  $t('messages.66a648e3df7f669b');
// Todo: improve this for appsmith_error error message
export const OAUTH_AUTHORIZATION_APPSMITH_ERROR = $t('messages.2615c522e32f4bad');
export const OAUTH_APPSMITH_TOKEN_NOT_FOUND = "Appsmith token not found";

export const GSHEET_AUTHORIZATION_ERROR =
  $t('messages.3766ad2e5e39fb61');
export const GSHEET_FILES_NOT_SELECTED =
  $t('messages.73e2b8a9b5d311ad');
export const FILES_NOT_SELECTED_EVENT = () => $t('messages.5f9132f6ba56cad5');

export const LOCAL_STORAGE_QUOTA_EXCEEDED_MESSAGE = () =>
  $t('messages.d0ad2985a0cc08a0');
export const LOCAL_STORAGE_NO_SPACE_LEFT_ON_DEVICE_MESSAGE = () =>
  $t('messages.1c79ed9ee4269ebd');
export const LOCAL_STORAGE_NOT_SUPPORTED_APP_MIGHT_NOT_WORK_AS_EXPECTED = () =>
  "LocalStorage is not supported on your device. Some features including the Appsmith store won't work.";

export const OMNIBAR_PLACEHOLDER = () =>
  $t('messages.1bb3645d2b472ff6');
export const OMNIBAR_PLACEHOLDER_NAV = () => $t('messages.01a8cc249ff82041');
export const CREATE_NEW_OMNIBAR_PLACEHOLDER = () =>
  $t('messages.0fa2936eaf4a0951');
export const HELPBAR_PLACEHOLDER = () => $t('messages.158a9477dc055a64');
export const NO_SEARCH_DATA_TEXT = () => $t('messages.d2f9eb61c2bd981e');

export const WIDGET_BIND_HELP = () =>
  $t('messages.73ef7525c16e6ca9');

export const BACK_TO_HOMEPAGE = () => $t('messages.b390fb67919537f0');

// error pages
export const PAGE_NOT_FOUND_TITLE = () => "404";
export const PAGE_NOT_FOUND = () => $t('messages.3a2b7679ce6d72d5');
export const PAGE_SERVER_TIMEOUT_ERROR_CODE = () => "504";
export const PAGE_SERVER_TIMEOUT_TITLE = () =>
  "Appsmith server is taking too long to respond";
export const PAGE_SERVER_TIMEOUT_DESCRIPTION = () =>
  $t('messages.23697ace410cd396');
export const PAGE_CLIENT_ERROR_TITLE = () => $t('messages.bdb5180b10a61de5');
export const PAGE_CLIENT_ERROR_DESCRIPTION = () =>
  "This is embarrassing, please contact Appsmith support for help";

export const PAGE_SERVER_UNAVAILABLE_ERROR_CODE = () => "503";

// Modules
export const CONVERT_MODULE_CTA_TEXT = () => $t('messages.220692e70a5a2089');
export const CONVERT_MODULE_TO_NEW_PKG_OPTION = () => $t('messages.4001806105af1500');

// cloudHosting used in EE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PAGE_SERVER_UNAVAILABLE_TITLE = (cloudHosting: boolean) =>
  "Appsmith server unavailable";

export const PAGE_SERVER_UNAVAILABLE_DESCRIPTION = () =>
  $t('messages.7d220faa83baa196');

export const PAGE_SERVER_UNAVAILABLE_ERROR_MESSAGES = (
  cloudHosting: boolean,
): PageErrorMessageProps[] => {
  if (cloudHosting) {
    return [
      {
        text: $t('messages.7f57d2d738f64885'),
        links: [
          {
            from: 40,
            to: 56,
            href: "mailto: support@appsmith.com?subject=Appsmith 503 Server Error",
          },
        ],
        addNewLine: true,
      },
    ];
  } else {
    return [
      {
        text: $t('messages.205ab86870318559'),
        addNewLine: true,
      },
      {
        text: $t('messages.bd7d740ce0c21a33'),
        links: [
          {
            from: 66,
            to: 70,
            href: "https://docs.appsmith.com/learning-and-resources/how-to-guides/how-to-get-container-logs",
          },
        ],
        addNewLine: true,
      },
      {
        text: $t('messages.9c8792b31ca4ba6a'),
        links: [
          {
            from: 46,
            to: 50,
            href: "/supervisor/logtail/backend",
          },
        ],
      },
    ];
  }
};

// comments
export const POST = () => $t('messages.fbf0d48391fa9b1d');
export const CANCEL = () => $t('messages.745450bf893892a4');
export const REMOVE = () => $t('messages.0b8fc4b38f926774');
export const CREATE = () => $t('messages.15c7b199cc78116a');

// Showcase Carousel
export const NEXT = () => "NEXT";
export const BACK = () => "BACK";
export const SKIP = () => "SKIP";

// Debugger
export const CLICK_ON = () => "🙌 Click on ";
export const PRESS = () => "🎉 Press ";
export const OPEN_THE_DEBUGGER = () => " to show/hide the debugger";
export const DEBUGGER_QUERY_RESPONSE_SECOND_HALF = () =>
  " to see more info in the debugger";
export const LOGS_FILTER_OPTION_ALL = () => $t('messages.7cabbe740a8e8d59');
export const LOGS_FILTER_OPTION_ERROR = () => $t('messages.aaa86d075d270f15');
export const LOGS_FILTER_OPTION_CONSOLE = () => $t('messages.8ab7cd214a5abd04');
export const LOGS_FILTER_OPTION_SYSTEM = () => $t('messages.8571117aa988a532');
export const NO_LOGS = () => $t('messages.289b21d6b0a9b2ad');
export const NO_ERRORS = () => $t('messages.bd559a04e704f414');
export const DEBUGGER_ERRORS = () => $t('messages.56e3ef98b36ce898');
export const DEBUGGER_RESPONSE = () => $t('messages.2038870299a3ef47');
export const DEBUGGER_HEADERS = () => $t('messages.b4d195148ac95d7b');
export const DEBUGGER_LOGS = () => $t('messages.674f3380384d4551');

export const INSPECT_ENTITY = () => $t('messages.182331db93982779');
export const INSPECT_ENTITY_BLANK_STATE = () => $t('messages.a954181a97a146f0');
export const VALUE_IS_INVALID = (propertyPath: string) =>
  $t('messages.08f16fdd63b2022a', {propertyPath: propertyPath});
export const ACTION_CONFIGURATION_UPDATED = () => $t('messages.a52810c52be230f7');
export const WIDGET_PROPERTIES_UPDATED = () => $t('messages.d108067ff9a807b8');
export const EMPTY_RESPONSE_FIRST_HALF = () => "🙌 Click on";
export const EMPTY_RESPONSE_LAST_HALF = () => $t('messages.30e374d9ea384998');
export const EMPTY_JS_RESPONSE_LAST_HALF = () =>
  $t('messages.ab859e4274ca92e5');
export const INVALID_EMAIL = () => $t('messages.e0808748831d8a82');
export const DEBUGGER_INTERCOM_TEXT = (text: string) =>
  `Hi, \nI'm facing the following error on Appsmith, can you please help? \n\n${text}`;
export const DEBUGGER_TRIGGER_ERROR = (propertyName: string) =>
  $t('messages.e564715d152199cb', {propertyName: propertyName});

export const TROUBLESHOOT_ISSUE = () => $t('messages.9f3cd16c99c49093');
export const DEBUGGER_OPEN_DOCUMENTATION = () => $t('messages.6a0b625bec4c3718');
export const DEBUGGER_SEARCH_SNIPPET = () => "Browse code snippets";
export const DEBUGGER_APPSMITH_SUPPORT = () => "Get Appsmith support";

//action creator menu
export const NO_ACTION = () => $t('messages.ba5dd72d1b62b42e');
export const EXECUTE_A_QUERY = () => $t('messages.ecefd7277add6724');
export const NAVIGATE_TO = () => $t('messages.49779c77fe174d41');
export const SHOW_ALERT = () => $t('messages.41f3098f5f0bfc99');
export const SHOW_MODAL = () => $t('messages.fb29f4a84280f585');
export const CLOSE_MODAL = () => $t('messages.18d7cc048985d3ff');
export const CLOSE = () => $t('messages.f9b4fd1f8625365f');
export const STORE_VALUE = () => $t('messages.7fb76fa4c795b2dd');
export const REMOVE_VALUE = () => $t('messages.9aa1d090bfe372fe');
export const CLEAR_STORE = () => $t('messages.929b5ef2fa38c9f0');
export const DOWNLOAD = () => $t('messages.e3b3c695f34ca0ce');
export const COPY_TO_CLIPBOARD = () => $t('messages.c942c0df9e3d08b2');
export const RESET_WIDGET = () => $t('messages.ad43676d30132b8d');
export const EXECUTE_JS_FUNCTION = () => $t('messages.57d74f665bcb5575');
export const SET_INTERVAL = () => $t('messages.219165ed33a24443');
export const CLEAR_INTERVAL = () => $t('messages.5c5506b7876b3547');
export const GET_GEO_LOCATION = () => $t('messages.006d89a5f101ec01');
export const WATCH_GEO_LOCATION = () => $t('messages.9ac92d7eba884f3a');
export const STOP_WATCH_GEO_LOCATION = () => $t('messages.03adebd87a819ede');
export const POST_MESSAGE = () => $t('messages.cb47dd0018bfad4d');

//js actions
export const JS_ACTION_COPY_SUCCESS = (actionName: string, pageName: string) =>
  $t('messages.883e3013bf8d45fa', {actionName: actionName,pageName: pageName});
export const ERROR_JS_ACTION_COPY_FAIL = (actionName: string) =>
  $t('messages.56ce5ac397283852', {actionName: actionName});
export const JS_ACTION_DELETE_SUCCESS = (actionName: string) =>
  $t('messages.3934f1f2b3842986', {actionName: actionName});
export const JS_ACTION_MOVE_SUCCESS = (actionName: string, pageName: string) =>
  $t('messages.ae9cae14d8c9e6b9', {actionName: actionName,pageName: pageName});
export const ERROR_JS_ACTION_MOVE_FAIL = (actionName: string) =>
  $t('messages.46fca84c16a2a63d', {actionName: actionName});
export const ERROR_JS_COLLECTION_RENAME_FAIL = (actionName: string) =>
  $t('messages.bb17ab391215ba60', {actionName: actionName});
export const PARSE_JS_FUNCTION_ERROR = (message: string) =>
  $t('messages.9fba9c754fe3fee1', {message: message});

export const EXECUTING_FUNCTION = () => $t('messages.9d8bb0ed0f484e3e');
export const UPDATING_JS_COLLECTION = () => `Updating...`;
export const EMPTY_JS_OBJECT = () =>
  $t('messages.7f79c47760540286');
export const EXPORT_DEFAULT_BEGINNING = () =>
  $t('messages.a1d722d669300732');
export const ACTION_EXECUTION_FAILED = (actionName: string) =>
  $t('messages.446c785e3c7728e0', {actionName: actionName});
export const JS_EXECUTION_SUCCESS = () => $t('messages.5cb8887914ddd02d');
export const JS_EXECUTION_FAILURE = () => $t('messages.1c6ffc12ee160f6e');
export const JS_EXECUTION_FAILURE_TOASTER = () =>
  $t('messages.80df972743b9ae1c');
export const JS_SETTINGS_ONPAGELOAD = () => $t('messages.85db3d6d17c6053e');
export const JS_SETTINGS_ONPAGELOAD_SUBTEXT = () =>
  $t('messages.9434f70d8150fc3d');
export const JS_SETTINGS_CONFIRM_EXECUTION = () =>
  $t('messages.a401780736c2f694');
export const JS_SETTINGS_CONFIRM_EXECUTION_SUBTEXT = () =>
  $t('messages.790a77cbd9d1b3e8');
export const JS_SETTINGS_EXECUTE_TIMEOUT = () =>
  $t('messages.8502331ae1fae339');
export const FUNCTION_SETTINGS_HEADING = () => $t('messages.95c5b5802322416d');
export const NO_JS_FUNCTIONS = () => $t('messages.18bc2a028b9d71be');
export const NO_JS_FUNCTION_TO_RUN = (JSObjectName: string) =>
  $t('messages.cc7aa64617bbfa62', {JSObjectName: JSObjectName});
export const NO_JS_FUNCTION_RETURN_VALUE = (JSFunctionName: string) =>
  $t('messages.f49a91c8c26c98d1', {JSFunctionName: JSFunctionName});

export const REMOVE_CONFIRM_BEFORE_CALLING_HEADING = () =>
  $t('messages.176638fc01f93a29');
export const REMOVE_CONFIRM_BEFORE_CALLING_DESCRIPTION =
  () => $t('messages.62a7a12c4725db9a');

// Import/Export Application features
export const ERROR_IMPORTING_APPLICATION_TO_WORKSPACE = () =>
  $t('messages.1fad24995f378a65');
export const IMPORT_APPLICATION_MODAL_TITLE = () => $t('messages.0e628ace5cd29f74');
export const IMPORT_APPLICATION_MODAL_LABEL = () =>
  $t('messages.1d039923c6d87fbe');
export const IMPORT_FROM_GIT_DISABLED_IN_ANVIL = () =>
  $t('messages.7835b52813703e31');
export const IMPORT_APP_FROM_FILE_TITLE = () => $t('messages.72726b4a3a901111');
export const UPLOADING_JSON = () => $t('messages.1438cba81dbb3e33');
export const UPLOADING_APPLICATION = () => $t('messages.4d274135372afcf9');
export const IMPORT_APP_FROM_GIT_TITLE = () =>
  $t('messages.e362f860629e798b');
export const IMPORT_APP_FROM_FILE_MESSAGE = () =>
  $t('messages.ccd64c23ad0332c2');
export const IMPORT_APP_FROM_GIT_MESSAGE = () =>
  $t('messages.7f05a3533e04bae9');
export const IMPORT_FROM_GIT_REPOSITORY = () => $t('messages.d1e9b1260be4ea63');
export const RECONNECT_MISSING_DATASOURCE_CREDENTIALS = () =>
  $t('messages.03f887e21942eac2');
export const RECONNECT_MISSING_DATASOURCE_CREDENTIALS_DESCRIPTION = () =>
  $t('messages.d0d42c7033d09ac5');
export const RECONNECT_DATASOURCE_SUCCESS_MESSAGE1 = () =>
  $t('messages.57b57b1d97f4414a');
export const RECONNECT_DATASOURCE_SUCCESS_MESSAGE2 = () =>
  $t('messages.7c8f333c9feb98db');
export const ADD_MISSING_DATASOURCES = () => $t('messages.60a2eb53161d3c51');
export const SKIP_TO_APPLICATION_TOOLTIP_HEADER = () =>
  $t('messages.825fc461e23ed7cf');
export const SKIP_TO_APPLICATION_TOOLTIP_DESCRIPTION = () =>
  $t('messages.ebfb18886bbb1bc0');
export const SKIP_TO_APPLICATION = () => $t('messages.dddcf9e860e37a3d');
export const SKIP_CONFIGURATION = () => $t('messages.b74f3b362fa50212');
export const SELECT_A_METHOD_TO_ADD_CREDENTIALS = () =>
  $t('messages.e626444bd8337f27');
export const DELETE_CONFIRMATION_MODAL_TITLE = () => $t('messages.94920b8e6194aa6c');
export const DELETE_CONFIRMATION_MODAL_SUBTITLE = (
  name?: string | null,
  entityType?: string,
) =>
  $t('messages.2ad28c462a163990', {name: name}) + ' ' +
  `${
    entityType === "Application" ? $t('messages.1684a3c0f46ee07d') : $t('messages.779efccbcf7a53c4')
  }`;
export const PARSING_ERROR = () =>
  $t('messages.e43c20c31d7306f3');
export const PARSING_WARNING = () =>
  $t('messages.8ddcc56d3240e22f');
export const JS_FUNCTION_CREATE_SUCCESS = () =>
  $t('messages.89dac8b6513cc468');
export const JS_FUNCTION_UPDATE_SUCCESS = () =>
  $t('messages.74d5c2e40c21ed9a');
export const JS_FUNCTION_DELETE_SUCCESS = () =>
  $t('messages.31c7bd1e743d5a64');
export const JS_OBJECT_BODY_INVALID = () => $t('messages.4bc26ded16644b44');
export const JS_ACTION_EXECUTION_ERROR = (jsFunctionName: string) =>
  $t('messages.428f6f4e20d9d2a9', {jsFunctionName: jsFunctionName});
//Editor Page
export const EDITOR_HEADER_SAVE_INDICATOR = () => $t('messages.50ce0ef52990b02c');

//Import Application Succesful
export const IMPORT_APP_SUCCESSFUL = () => $t('messages.9179946f1dfe119f');
//Unable to import application in workspace
export const UNABLE_TO_IMPORT_APP = () =>
  $t('messages.c451794051d43f2b');
//
export const ERROR_IN_EXPORTING_APP = () =>
  $t('messages.ddbd370214ad3009');
//undo redo
export const WIDGET_REMOVED = (widgetName: string) =>
  $t('messages.583801c9815b913b', {widgetName: widgetName});
export const WIDGET_ADDED = (widgetName: string) =>
  $t('messages.cd60dc55b0fb3739', {widgetName: widgetName});
export const BULK_WIDGET_REMOVED = (widgetName: string) =>
  $t('messages.9a7f5ee0a83163c4', {widgetName: widgetName});
export const BULK_WIDGET_ADDED = (widgetName: string) =>
  $t('messages.53e316f594851ad7', {widgetName: widgetName});

export const ACTION_CONFIGURATION_CHANGED = (name: string) =>
  $t('messages.38a665ee72009d33', {name: name});

// Generate page from DB Messages

export const UNSUPPORTED_PLUGIN_DIALOG_TITLE = () =>
  $t('messages.e1f6fbc24397ec9a');

export const UNSUPPORTED_PLUGIN_DIALOG_SUBTITLE = () =>
  $t('messages.a818b8ca34eff7bc');
export const UNSUPPORTED_PLUGIN_DIALOG_MAIN_HEADING = () =>
  $t('messages.ef2943990da5f0e8');

export const BUILD_FROM_SCRATCH_ACTION_SUBTITLE = () =>
  $t('messages.9ef540b988d8d79d');

export const BUILD_FROM_SCRATCH_ACTION_TITLE = () => $t('messages.be78fd94ade9dfd6');

export const GENERATE_PAGE_ACTION_TITLE = () => $t('messages.ed4246274e3038ff');

export const GENERATE_PAGE_FORM_TITLE = () => $t('messages.c619abf5a077ae5e');

export const GEN_CRUD_SUCCESS_MESSAGE = () =>
  $t('messages.b74da71000044368');
export const GEN_CRUD_INFO_DIALOG_TITLE = () => $t('messages.756b249409b42e99');
export const GEN_CRUD_INFO_DIALOG_SUBTITLE = () =>
  $t('messages.b53304b8c6143f46');
export const GEN_CRUD_COLUMN_HEADER_TITLE = () => $t('messages.142b8d7da856c7fe');
export const GEN_CRUD_NO_COLUMNS = () => $t('messages.88444f13c653878f');
export const GEN_CRUD_DATASOURCE_DROPDOWN_LABEL = () => $t('messages.8cfca3641bbff5bd');
export const GEN_CRUD_TABLE_HEADER_LABEL = () => $t('messages.2f0c849ce5b983e1');
export const GEN_CRUD_TABLE_HEADER_TOOLTIP_DESC = () =>
  $t('messages.21e0e4ba8dfdd9d5');
// Actions Right pane
export const SEE_CONNECTED_ENTITIES = () => $t('messages.e5b321c545544891');
export const INCOMING_ENTITIES = () => $t('messages.a48ddaa46b1be5c5');
export const NO_INCOMING_ENTITIES = () => $t('messages.2a7174cce5eaeecf');
export const OUTGOING_ENTITIES = () => $t('messages.065fa253f69517b2');
export const NO_OUTGOING_ENTITIES = () => $t('messages.46a8af06cbb17639');
export const NO_CONNECTIONS = () => $t('messages.3246a09f02d8368d');
export const BACK_TO_CANVAS = () => $t('messages.90c13b19951ce979');
export const SUGGESTED_WIDGET_DESCRIPTION = () =>
  $t('messages.f81d6f9118f99704');
export const ADD_NEW_WIDGET = () => $t('messages.e950c0999c3893e0');
export const SUGGESTED_WIDGETS = () => $t('messages.dae5766526a40aac');
export const SUGGESTED_WIDGET_TOOLTIP = () => $t('messages.b912d35efa10f58d');
export const WELCOME_TOUR_STICKY_BUTTON_TEXT = () => $t('messages.210b73fc4e3b9329');
export const BINDING_SECTION_LABEL = () => $t('messages.3bd7689c31f59388');
export const ADD_NEW_WIDGET_SUB_HEADING = () =>
  $t('messages.cbd72d9cb11706a2');
export const CONNECT_EXISTING_WIDGET_LABEL = () => $t('messages.656fb6ca5c34a338');
export const CONNECT_EXISTING_WIDGET_SUB_HEADING = () =>
  $t('messages.ed9624589cc85f3b');
export const NO_EXISTING_WIDGETS = () => $t('messages.409966c655848baf');
export const BINDING_WALKTHROUGH_TITLE = () => $t('messages.b6ae6424b16c09b8');
export const BINDING_WALKTHROUGH_DESC = () =>
  $t('messages.05f7ca08c46be679');
export const BINDINGS_DISABLED_TOOLTIP = () =>
  $t('messages.b0a460d00eecff3f');

// Data Sources pane
export const EMPTY_ACTIVE_DATA_SOURCES = () => $t('messages.3c7f689f7aa9dd62');

// Datasource structure

export const SCHEMA_NOT_AVAILABLE = () =>
  $t('messages.8ab80bb33f23aa3d');
export const TABLE_NOT_FOUND = () => $t('messages.f8713ed4924a8022');
export const DATASOURCE_STRUCTURE_INPUT_PLACEHOLDER_TEXT = (name: string) =>
  $t('messages.39de344317b4bbf7', {name: name});
export const SCHEMA_LABEL = () => $t('messages.2d8ccc512a1b2795');
export const STRUCTURE_NOT_FETCHED = () =>
  $t('messages.c2aad3b02c51243a');
export const TEST_DATASOURCE_AND_FIX_ERRORS = () =>
  $t('messages.821530052496b7f8');
export const LOADING_SCHEMA = () => $t('messages.a153a2707b99961d');
export const SCHEMA_WALKTHROUGH_TITLE = () => $t('messages.d6f7b7f869878374');
export const SCHEMA_WALKTHROUGH_DESC = () =>
  $t('messages.9ffba81663eb02e9');
export const SUGGESTED_TAG = () => $t('messages.edcb16ad64b7e42e');

// structure - View Mode

export const DATASOURCE_VIEW_DATA_TAB = () => $t('messages.daa01e0dbefd4e45');
export const DATASOURCE_CONFIGURATIONS_TAB = () => "Configurations";
export const DATASOURCE_NO_RECORDS_TO_SHOW = () => $t('messages.1ea057b1aa8dfa25');

// Git sync
export const CONNECTED_TO_GIT = () => $t('messages.9fc72f58323faf87');

export const GIT_DISCONNECT_POPUP_TITLE = () =>
  $t('messages.74d12ee095bbd1b0');

export const GIT_DISCONNECT_POPUP_SUBTITLE = () =>
  $t('messages.efbee0eeecc32b4f');
export const GIT_DISCONNECT_POPUP_MAIN_HEADING = () => $t('messages.94920b8e6194aa6c');

export const CONFIGURE_GIT = () => $t('messages.24681e5a829996fe');
export const IMPORT_APP = () => $t('messages.3d9cdb9eea607cbd');
export const SETTINGS_GIT = () => $t('messages.172afc00246949ec');
export const IMPORT_APP_CTA = () => $t('messages.30c919adb6cd3f5c');

export const GIT_CONNECTION = () => $t('messages.9aa69883b95afa03');
export const GIT_IMPORT = () => $t('messages.b70041ce304cd7f7');
export const MERGE = () => $t('messages.35dcfe5fcce25d8d');
export const GIT_SETTINGS = () => $t('messages.f7c057e3e99fc641');
export const CONNECT_TO_GIT = () => $t('messages.2ca2736556ca4668');
export const CONNECT_TO_GIT_SUBTITLE = () =>
  $t('messages.c40336f82854f76a');
export const REMOTE_URL = () => $t('messages.a169d94126b1ec94');
export const REMOTE_URL_INFO = () =>
  $t('messages.2693f493ebebc4c1');
export const IMPORT_URL_INFO = () => $t('messages.04e6124d00110ef1');
export const REMOTE_URL_VIA = () => $t('messages.c2b2b3080ac0ead4');

export const USER_PROFILE_SETTINGS_TITLE = () => $t('messages.7764e82581996af8');
export const GIT_USER_SETTINGS_TITLE = () => $t('messages.aa2663c3ae7052bf');

export const USE_DEFAULT_CONFIGURATION = () => $t('messages.12ead4aafb8ab60f');
export const AUTHOR_NAME_ONLY = () => $t('messages.59b987976ebf281f');
export const AUTHOR_EMAIL_ONLY = () => "E-mail";
export const AUTHOR_NAME = () => $t('messages.61119c472f52ef37');
export const AUTHOR_EMAIL = () => $t('messages.87a161baa9fa383b');
export const AUTHOR_NAME_CANNOT_BE_EMPTY = () => $t('messages.5b85b26cba7ab43e');
export const AUTHOR_EMAIL_CANNOT_BE_EMPTY = () =>
  $t('messages.05760e81b6ef759b');

export const NAME_YOUR_NEW_BRANCH = () => $t('messages.8ba5cc0dbac00419');
export const SWITCH_BRANCHES = () => $t('messages.29f782fefeed44de');

export const DOCUMENTATION = () => $t('messages.9233028ff03baee1');
export const DOCUMENTATION_TOOLTIP = () => $t('messages.5b0c10449766c8e8');
export const CONNECT = () => $t('messages.60e325431e6643ac');
export const LATEST_DP_TITLE = () => $t('messages.ed614a2ef33f3352');
export const LATEST_DP_SUBTITLE = () => $t('messages.c14c4a436b4c8caa');
export const CHECK_DP = () => "CHECK";
export const DEPLOY_TO_CLOUD = () => $t('messages.e760fde67fbe7a91');
export const DEPLOY_WITHOUT_GIT = () =>
  $t('messages.14e6fb245e6459c9');
export const COMMIT_CHANGES = () => $t('messages.2af8d5442904229f');
export const COMMIT_TO = () => $t('messages.a634931dae3e6c2a');
export const COMMIT_AND_PUSH = () => $t('messages.486bfde76dbc700a');
export const PULL_CHANGES = () => $t('messages.fa71166c0ee63428');
export const REGENERATE_SSH_KEY = (keyType: string, keySize: number) =>
  $t('messages.e1ccab9c69fb4229', {keyType: keyType,keySize: keySize});
export const GENERATE_SSH_KEY = (keyType: string, keySize: number) =>
  $t('messages.78785de6ebde4528', {keyType: keyType,keySize: keySize});
export const SSH_KEY_PLATFORM = (name: string) => ` (${name})`;
export const SSH_KEY = () => $t('messages.3601aab59b9a136c');
export const COPY_SSH_KEY = () => $t('messages.69d5bf4aad59e669');
export const SSH_KEY_GENERATED = () => $t('messages.7fb47810f0b3c584');
export const REGENERATE_KEY_CONFIRM_MESSAGE = () =>
  $t('messages.27be91bce9b9f01d');
export const DEPLOY_KEY_USAGE_GUIDE_MESSAGE = () =>
  $t('messages.f32b6cc98dee3aa9');
export const COMMITTING_AND_PUSHING_CHANGES = () =>
  $t('messages.f6c65ed3ca7ba5b0');
export const DISCARDING_AND_PULLING_CHANGES = () =>
  $t('messages.07c6a62cf8e71b50');
export const DISCARD_SUCCESS = () => $t('messages.3322eaa508dc3763');
export const DISCARD_AND_PULL_SUCCESS = () => $t('messages.258d487432cafa27');

export const IS_MERGING = () => $t('messages.0adbed344922a81c');

export const MERGE_CHANGES = () => $t('messages.ad2b294b0ed91955');
export const SELECT_BRANCH_TO_MERGE = () => $t('messages.cdbd77315f54275c');
export const CONNECT_GIT = () => $t('messages.56b2a52cac657ddb');
export const CONNECT_GIT_BETA = () => $t('messages.ed27d1ea57c61ba3');
export const RETRY = () => $t('messages.437c59d318553d3a');
export const CREATE_NEW_BRANCH = () => $t('messages.0af0a214ce441f36');
export const ERROR_WHILE_PULLING_CHANGES = () => "ERROR WHILE PULLING CHANGES";
export const SUBMIT = () => $t('messages.b7b1c5347b87adf0');
export const GIT_USER_UPDATED_SUCCESSFULLY = () =>
  $t('messages.695543d0c725c12c');
export const REMOTE_URL_INPUT_PLACEHOLDER = () =>
  "git@example.com:user/repository.git";
export const GIT_COMMIT_MESSAGE_PLACEHOLDER = () => $t('messages.d4598a5d17ff43a5');
export const INVALID_USER_DETAILS_MSG = () => $t('messages.b5387b15279ffeed');
export const PASTE_SSH_URL_INFO = () =>
  $t('messages.3bda2020ab0ce963');
export const GENERATE_KEY = () => $t('messages.19f6b79b3cdc1544');
export const UPDATE_CONFIG = () => $t('messages.847170e040166e5b');
export const CONNECT_BTN_LABEL = () => $t('messages.60e325431e6643ac');
export const IMPORT_BTN_LABEL = () => $t('messages.a01bd582dfd543f8');
export const FETCH_GIT_STATUS = () => $t('messages.c6e804f2ef3e8376');
export const FETCH_MERGE_STATUS = () => $t('messages.d9ecb804be1fd0cd');
export const NO_MERGE_CONFLICT = () =>
  $t('messages.6111bacb7818f611');
export const MERGE_CONFLICT_ERROR = () => $t('messages.a61f9d17f08ecbce');
export const FETCH_MERGE_STATUS_FAILURE = () => $t('messages.b4a5113ae4f85b7b');
export const GIT_UPSTREAM_CHANGES = () =>
  $t('messages.b44732f5ee6a08af');
export const GIT_CONFLICTING_INFO = () =>
  $t('messages.3d3bab7b6c9d9d1e');
export const CANNOT_PULL_WITH_LOCAL_UNCOMMITTED_CHANGES = () =>
  $t('messages.beae17765ce2a152');
export const CANNOT_MERGE_DUE_TO_UNCOMMITTED_CHANGES = () =>
  $t('messages.60adb9c08bd85206');

export const DISCONNECT_SERVICE_SUBHEADER = () =>
  $t('messages.ef788dba54d81e40');
export const DISCONNECT_SERVICE_WARNING = () =>
  $t('messages.7c0a457e7cd7058c');
export const AUTHENTICATION_METHOD_ENABLED = (methodName: string) => $t('messages.09dc354869c62566');

export const REVOKE_EXISTING_REPOSITORIES = () =>
  $t('messages.9af1a16e889be8a6');
export const REVOKE_EXISTING_REPOSITORIES_INFO = () =>
  $t('messages.fbf575b6ad575ff6');
export const CONTACT_SUPPORT = () => $t('messages.9f6fabcb1c6a2190');
export const CONTACT_SALES_MESSAGE_ON_INTERCOM = (workspaceName: string) =>
  $t('messages.46196babaf7450ca', {workspaceName: workspaceName});
export const REPOSITORY_LIMIT_REACHED = () => $t('messages.75ef3daeb9cfc97d');
export const REPOSITORY_LIMIT_REACHED_INFO = () =>
  $t('messages.9849b286495ba12b');
export const APPLICATION_IMPORT_SUCCESS = () =>
  $t('messages.d639c61e8213ae28');
export const APPLICATION_IMPORT_SUCCESS_DESCRIPTION = () =>
  $t('messages.3653e4d229b58db4');
export const NONE_REVERSIBLE_MESSAGE = () =>
  $t('messages.a6c908f5363adecf');
export const CONTACT_SUPPORT_TO_UPGRADE = () =>
  $t('messages.f2dee1844c70e4a2');
export const REVOKE_CAUSE_APPLICATION_BREAK = () =>
  $t('messages.89558865b5409a01');
export const REVOKE_GIT = () => $t('messages.2e35be5e10151565');
export const DISCONNECT = () => $t('messages.ce4f3f4ee0a38ff8');
export const REVOKE = () => $t('messages.72e15e8733c972de');
export const REVOKE_ACCESS = () => $t('messages.17b93d4e62ffda4e');
export const GIT_DISCONNECTION_SUBMENU = () => "Git Connection > Disconnect";
export const DISCONNECT_FROM_GIT = (name: string) =>
  $t('messages.96b76ab153e7acc4', {name: name});
export const GIT_REVOKE_ACCESS = (name: string) => $t('messages.2a1305b17d37f601', {name: name});
export const GIT_TYPE_REPO_NAME_FOR_REVOKING_ACCESS = (name: string) =>
  `Type “${name}” in the input box to revoke access.`;
export const APPLICATION_NAME = () => $t('messages.012edd4ea066e068');
export const OPEN_REPO = () => $t('messages.a240d4abf0f0e220');
export const CONNECTING_REPO = () => $t('messages.a2ebedc20d060953');
export const IMPORTING_APP_FROM_GIT = () => $t('messages.f6c55a7cf47bd50a');
export const CONFIRM_SSH_KEY = () =>
  $t('messages.99e6e712e82f0826');
export const READ_DOCUMENTATION = () => $t('messages.9a543b337d3938aa');
export const LEARN_MORE = () => $t('messages.d36cdbc432e24801');

export const I_UNDERSTAND = () => $t('messages.023df78794d364d3');
export const GIT_NO_UPDATED_TOOLTIP = () => $t('messages.158d74dd345fd047');

export const FIND_OR_CREATE_A_BRANCH = () => $t('messages.7db231c8b6a84b10');
export const SYNC_BRANCHES = () => $t('messages.00f4e9e6241860c1');

export const CONFLICTS_FOUND = () =>
  $t('messages.08de3a5dfea1de2a');
export const UNCOMMITTED_CHANGES = () => $t('messages.9ae9c9ca3ef1ef2e');
export const NO_COMMITS_TO_PULL = () =>
  $t('messages.f157809081689795');
export const CONFLICTS_FOUND_WHILE_PULLING_CHANGES = () =>
  $t('messages.06aecf5469f43138');
export const NOT_LIVE_FOR_YOU_YET = () => $t('messages.25e5f254db47d5d4');
export const COMING_SOON = () => $t('messages.eeab093702c866d1');
export const CONNECTING_TO_REPO_DISABLED = () =>
  $t('messages.f8fec00f684464b9');
export const DURING_ONBOARDING_TOUR = () => $t('messages.665b3a7e21aef506');
export const MERGED_SUCCESSFULLY = () => $t('messages.4505dcdf1cc262ee');
export const DISCARD_CHANGES_WARNING = () =>
  $t('messages.f685951c75ad7a09');
export const DISCARD_CHANGES = () => $t('messages.73a0b156434c620c');

// GIT DEPLOY begin
export const DEPLOY = () => $t('messages.76b1c43f085ef30e');
export const DEPLOY_YOUR_APPLICATION = () => $t('messages.1d51fdda3f72112f');
export const CHANGES_APP_SETTINGS = () => $t('messages.eb01b770895277ad');
export const CHANGES_THEME = () => $t('messages.cfbd9f8f96dd7e43');
export const CHANGES_SINCE_LAST_DEPLOYMENT = () =>
  $t('messages.fd4e9adaf9ae1047');
export const CHANGES_ONLY_USER = () => $t('messages.ffd02bf5f57cece1');
export const CHANGES_MADE_SINCE_LAST_COMMIT = () =>
  $t('messages.427fe2996f2bce46');
export const CHANGES_ONLY_MIGRATION = () =>
  "Appsmith update changes since last commit";
export const CHANGES_USER_AND_MIGRATION = () =>
  "Appsmith update and user changes since last commit";
export const CURRENT_PAGE_DISCARD_WARNING = (page: string) =>
  $t('messages.4818a273a9c2312f', {page: page});
export const DISCARD_MESSAGE = () =>
  `Some changes may reappear after discarding them, these changes support new features in Appsmith. You can safely commit them to your repository.`;
// GIT DEPLOY end

// GIT CHANGE LIST begin
export const CHANGES_FROM_APPSMITH = () =>
  "Some changes are platform upgrades from Appsmith.";
export const TRY_TO_PULL = () =>
  $t('messages.cad4f95591cfd83d');
export const NOT_PUSHED_YET = () =>
  $t('messages.062a79813aecb53f');
// GIT CHANGE LIST end

// GIT DELETE BRANCH begin
export const DELETE = () => $t('messages.92cff16f7596613e');
export const LOCAL_BRANCHES = () => $t('messages.47ac3a2cc51db17d');
export const REMOTE_BRANCHES = () => $t('messages.c684a710a7243f3c');

export const DELETE_BRANCH_SUCCESS = (branchName: string) =>
  $t('messages.678cb1e13bc097d5', {branchName: branchName});

// warnings
export const DELETE_BRANCH_WARNING_CHECKED_OUT = (currentBranchName: string) =>
  `Cannot delete checked out branch. Please check out other branch before deleting ${currentBranchName}.`;
export const DELETE_BRANCH_WARNING_DEFAULT = (defaultBranchName: string) =>
  `Cannot delete default branch: ${defaultBranchName}`;
// GIT DELETE BRANCH end

// GIT ERRORS begin
export const ERROR_GIT_AUTH_FAIL = () =>
  $t('messages.0c3c702eab6ea70c');
export const ERROR_GIT_INVALID_REMOTE = () =>
  $t('messages.34a0a1d871bcf0e3');
// GIT ERRORS end

// Git Connect V2
export const CHOOSE_A_GIT_PROVIDER_STEP = () => $t('messages.299e9c36f3681ae2');
export const GENERATE_SSH_KEY_STEP = () => $t('messages.364ab3342abc1d85');
export const ADD_DEPLOY_KEY_STEP = () => $t('messages.e3798c2a45024025');
export const CHOOSE_GIT_PROVIDER_QUESTION = () =>
  $t('messages.200b040a4cec8020');
export const IS_EMPTY_REPO_QUESTION = () =>
  $t('messages.d925927b14688fd0');
export const HOW_TO_CREATE_EMPTY_REPO = () => $t('messages.bae99cdb485ec968');
export const IMPORT_APP_IF_NOT_EMPTY = () =>
  $t('messages.7acbd0b27af28ed0');
export const I_HAVE_EXISTING_REPO = () =>
  "I have an existing appsmith app connected to Git";
export const ERROR_REPO_NOT_EMPTY_TITLE = () =>
  $t('messages.33c147efc066127e');
export const ERROR_REPO_NOT_EMPTY_MESSAGE = () =>
  $t('messages.d1a99d31772674bd');
export const READ_DOCS = () => $t('messages.8d5eb90a89e7a309');
export const COPY_SSH_URL_MESSAGE = () =>
  $t('messages.2fc4df1181f72868');
export const REMOTE_URL_INPUT_LABEL = () => $t('messages.da651e7fb3091ec2');
export const HOW_TO_COPY_REMOTE_URL = () =>
  $t('messages.06d5eaf087ae845c');
export const ERROR_SSH_KEY_MISCONF_TITLE = () => $t('messages.9c1d5c162ceca50c');
export const ERROR_SSH_KEY_MISCONF_MESSAGE = () =>
  $t('messages.ed57f8e5ad9018ba');
export const ADD_DEPLOY_KEY_STEP_TITLE = () =>
  $t('messages.6e3e4bef68c49915');
export const HOW_TO_ADD_DEPLOY_KEY = () =>
  $t('messages.4010d21760fcae08');
export const CONSENT_ADDED_DEPLOY_KEY = () =>
  $t('messages.6c8a7fc19f9d1c6f');
export const PREVIOUS_STEP = () => $t('messages.aec24a5071d17c9e');
export const GIT_AUTHOR = () => $t('messages.aa2663c3ae7052bf');
export const DISCONNECT_GIT = () => $t('messages.a981c9657ebfce4d');
export const DISCONNECT_GIT_MESSAGE = () =>
  $t('messages.7e26ef40b59d4cf7');
export const AUTOCOMMIT = () => $t('messages.ae8358ca4f2b2870');
export const AUTOCOMMIT_MESSAGE = () =>
  "Enable/disable auto migrations from Appsmith.";
export const AUTOCOMMIT_ENABLE = () => $t('messages.0ca6b8888cc897a1');
export const AUTOCOMMIT_DISABLE = () => $t('messages.024b0eeb37010a2d');
export const AUTOCOMMIT_CONFIRM_DISABLE_MESSAGE = () =>
  "Disabling auto-commit may result in uncommitted system changes after an Appsmith instance upgrade, requiring manual handling and potential discrepancies in Git versioning.";
export const AUTOCOMMIT_IN_PROGRESS_MESSAGE = () =>
  "Auto-committing Appsmith upgrade changes...";
export const AUTOCOMMIT_ENABLED_TOAST = () =>
  $t('messages.97e7e7c668629995');
export const AUTOCOMMIT_DISABLED_TOAST = () =>
  $t('messages.5d3bdd3d09a4ec96');
export const NEED_EMPTY_REPO_MESSAGE = () =>
  "You need an empty repository to connect to Git on Appsmith, please create one on your Git service provider to continue.";
export const GIT_IMPORT_WAITING = () =>
  $t('messages.f638bb9975f61572');
export const GIT_CONNECT_WAITING = () =>
  $t('messages.a4bbcd8b332ee715');
export const CONNECT_GIT_TEXT = () => $t('messages.56b2a52cac657ddb');
export const ERROR_SSH_RECONNECT_MESSAGE = () =>
  $t('messages.dd36257fd36d21bb');
export const ERROR_SSH_RECONNECT_OPTION1 = () =>
  $t('messages.cdace49f56765ff1');
export const ERROR_SSH_RECONNECT_OPTION2 = () =>
  $t('messages.c798496bb7f69e83');
export const COPIED_SSH_KEY = () => $t('messages.dd9200115ee2bdee');
export const NO_COPIED_SSH_KEY = () => $t('messages.87564d1c059bc791');
// Git Connect V2 end

// Git Branch Protection
export const UPDATE = () => $t('messages.6590dc1e53d01185');
export const DEFAULT_BRANCH = () => $t('messages.3bdbe19ec192f067');
export const DEFAULT_BRANCH_DESC = () =>
  $t('messages.5d577b2eff179ef7');
export const BRANCH_PROTECTION = () => "Branch protection";
export const BRANCH_PROTECTION_DESC = () =>
  $t('messages.904660b7f3a9f4f2');
export const GO_TO_SETTINGS = () => $t('messages.eefc24e666c1788c');
export const NOW_PROTECT_BRANCH = () =>
  $t('messages.3025c84587c99509');
export const APPSMITH_ENTERPRISE = () => "Appsmith Enterprise";
export const PROTECT_BRANCH_SUCCESS = () => $t('messages.b3b3d9ed8ba20ff7');
export const UPDATE_DEFAULT_BRANCH_SUCCESS = (branchName: string) =>
  $t('messages.177117bf5a81fff1', {branchName: branchName || ''});
export const CONTACT_ADMIN_FOR_GIT = () =>
  $t('messages.35f8879a5a843427');
export const BRANCH_PROTECTION_CALLOUT_MSG = () =>
  "The branch is protected; please switch to or create a new branch to edit the app.";
export const BRANCH_PROTECTION_CALLOUT_CREATE_BRANCH = () =>
  $t('messages.0af0a214ce441f36');
export const BRANCH_PROTECTION_CALLOUT_UNPROTECT = () => $t('messages.26478f5e6ea644c9');
export const BRANCH_PROTECTION_CALLOUT_UNPROTECT_LOADING = () =>
  $t('messages.ef97b2464d6c095a');
export const BRANCH_PROTECTION_PROTECTED = () => $t('messages.81ff4d5316fef763');
// Git Branch Protection end

// Git Connection Success
export const GIT_CONNECT_SUCCESS_TITLE = () => $t('messages.27784d3fac7c9bd9');
export const GIT_CONNECT_SUCCESS_MESSAGE = () =>
  $t('messages.a39bc5c8aa2eb5c0');
export const GIT_CONNECT_SUCCESS_ACTION_CONTINUE = () =>
  $t('messages.135d35f5222a35dc');
export const GIT_CONNECT_SUCCESS_ACTION_SETTINGS = () => $t('messages.697fd99ed702750e');
export const GIT_CONNECT_SUCCESS_PROTECTION_MSG = () =>
  $t('messages.2e45a74ebb89320d');
export const GIT_CONNECT_SUCCESS_REPO_NAME = () => $t('messages.76f9c071b78d67a9');
export const GIT_CONNECT_SUCCESS_DEFAULT_BRANCH = () => $t('messages.3bdbe19ec192f067');
export const GIT_CONNECT_SUCCESS_DEFAULT_BRANCH_TOOLTIP = () =>
  $t('messages.5d577b2eff179ef7');
export const GIT_CONNECT_SUCCESS_PROTECTION_DOC_CTA = () =>
  $t('messages.76efba85559a8f16');
// Git Connection Success end

export const GENERAL = () => $t('messages.3bf8b416020cfb93');
export const BRANCH = () => "Branch";

export const CONTINUOUS_DELIVERY = () => $t('messages.7cf48ce929c2c09f');
export const CONFIGURE_CD_TITLE = () => $t('messages.9f6fbc051fe75039');
export const CONFIGURE_CD_DESC = () =>
  $t('messages.57b2de5a16e2e7fe');
export const TRY_APPSMITH_ENTERPRISE = () => "Try Appsmith Enterprise";

export const NAV_DESCRIPTION = () =>
  $t('messages.2b84075049e652c9');
export const ACTION_OPERATION_DESCRIPTION = () =>
  $t('messages.0fa2936eaf4a0951');
export const TABLE_WIDGET_VALIDATION_ASSIST_PROMPT = () =>
  $t('messages.70ec6a6ec113bd32');

export const TRIGGER_ACTION_VALIDATION_ERROR = (
  functionName: string,
  argumentName: string,
  expectedType: string,
  received: string,
) =>
  $t('messages.372392fc998c5367', {functionName: functionName,expectedType: expectedType,argumentName: argumentName,received: received});

// Comment card tooltips
export const MORE_OPTIONS = () => $t('messages.485f27589f54bcda');
export const ADD_REACTION = () => $t('messages.4cb3410901447a02');
export const RESOLVE_THREAD = () => $t('messages.2d4a8007431a4e39');
export const RESOLVED_THREAD = () => $t('messages.a343569361b745a9');
export const EMOJI = () => $t('messages.5197d4ab29e410ba');

// Sniping mode messages
export const SNIPING_SELECT_WIDGET_AGAIN = () =>
  $t('messages.c8df44d3a3416408');

export const SNIPING_NOT_SUPPORTED = () =>
  $t('messages.385fe917062ef3ea');

//First Time User Onboarding
//Checklist page
export enum ONBOARDING_CHECKLIST_ACTIONS {
  CONNECT_A_DATASOURCE = "Connect datasource",
  CREATE_A_QUERY = $t('messages.5279425db4a8e166'),
  ADD_WIDGETS = "Add widgets",
  CONNECT_DATA_TO_WIDGET = "Connect data to widget",
  DEPLOY_APPLICATIONS = "Deploy application",
}

export const ONBOARDING_CHECKLIST_BANNER_HEADER = () =>
  "Amazing work! You’ve explored the basics of Appsmith";
export const ONBOARDING_CHECKLIST_BANNER_BODY = () =>
  $t('messages.335ddaddb92c4a3a');
export const ONBOARDING_CHECKLIST_BANNER_BUTTON = () => $t('messages.436b57cd1485fad0');
export const ONBOARDING_SKIPPED_FIRST_TIME_USER = () =>
  $t('messages.92ef79d48aadce30');
export const ONBOARDING_CHECKLIST_HEADER = () => "👋 Welcome to Appsmith!";
export const ONBOARDING_CHECKLIST_BODY = () =>
  "Let’s get you started on your first application, explore Appsmith yourself or follow our guide below to discover what Appsmith can do.";
export const ONBOARDING_CHECKLIST_COMPLETE_TEXT = () => "complete";

export const SIGNPOSTING_POPUP_SUBTITLE = () =>
  $t('messages.4f4976c7f1dad7c8');
export const SIGNPOSTING_SUCCESS_POPUP = {
  title: () => "🎉 Awesome! You’ve explored the basics of Appsmith",
  subtitle: () =>
    $t('messages.9a4ea2ccd0897b7f'),
};

export const ONBOARDING_CHECKLIST_CONNECT_DATA_SOURCE = {
  bold: () => $t('messages.b4e44598e53438ec'),
  normal: () => $t('messages.37cd0578a3f60b14'),
};

export const ONBOARDING_CHECKLIST_CREATE_A_QUERY = {
  bold: () => $t('messages.537de7ede63448f9'),
  normal: () => $t('messages.d81e89083f8fbccf'),
};

export const ONBOARDING_CHECKLIST_ADD_WIDGETS = {
  bold: () => $t('messages.98a820a56e54495f'),
  normal: () => $t('messages.c505a110efe6f676'),
};

export const ONBOARDING_CHECKLIST_CONNECT_DATA_TO_WIDGET = {
  bold: () => $t('messages.a945f091be0bc69c'),
  normal: () => "using query names in bindings {{}}",
};

export const ONBOARDING_CHECKLIST_DEPLOY_APPLICATIONS = {
  bold: () => $t('messages.1d51fdda3f72112f'),
  normal: () => $t('messages.c781847f1b1ae20e'),
};

export const SIGNPOSTING_LAST_STEP_TOOLTIP = () => $t('messages.1781027a2c82c0e4');
export const SIGNPOSTING_TOOLTIP = {
  DEFAULT: {
    content: () =>
      $t('messages.bc3b1205c101d4eb'),
  },
  CONNECT_A_DATASOURCE: {
    content: () => $t('messages.86c256833361d072'),
  },
  CREATE_QUERY: {
    content: () => $t('messages.d3bdc2ca2d6408a2'),
  },
  ADD_WIDGET: {
    content: () => $t('messages.d006c799025f8d49'),
  },
  CONNECT_DATA_TO_WIDGET: {
    content: () =>
      $t('messages.f02e45e1a894cf52'),
  },
  DEPLOY_APPLICATION: {
    content: () =>
      $t('messages.f8e4011c902d9728'),
  },
  DOCUMENTATION: {
    content: () => $t('messages.6a0b625bec4c3718'),
  },
};

export const ONBOARDING_CHECKLIST_FOOTER = () =>
  $t('messages.ce9a7374937e9fd3');

export const ONBOARDING_TELEMETRY_POPUP = () =>
  "We only collect usage data to make Appsmith better for everyone. Visit admin settings to toggle this off.";

//Introduction modal
export const HOW_APPSMITH_WORKS = () =>
  "Here’s a quick overview of how Appsmith works. ";
export const ONBOARDING_INTRO_CONNECT_YOUR_DATABASE = () =>
  $t('messages.0cc23487937781f5');
export const DRAG_AND_DROP = () =>
  $t('messages.3c0bb7e7dd76b03b');
export const CUSTOMIZE_WIDGET_STYLING = () =>
  $t('messages.97a7a5be1ff49595');
export const ONBOARDING_INTRO_PUBLISH = () =>
  $t('messages.2f0285717263cfe5');
export const CHOOSE_ACCESS_CONTROL_ROLES = () =>
  $t('messages.bd774a5b1c01d564');
export const BUILD_MY_FIRST_APP = () => $t('messages.41f1cb7264c56f0c');
export const ONBOARDING_INTRO_FOOTER = () =>
  $t('messages.17062a9d2bb576f3');
export const START_TUTORIAL = () => $t('messages.fc2f63ccb17ec8df');
export const WELCOME_TO_APPSMITH = () => "Welcome to Appsmith!";
export const QUERY_YOUR_DATABASE = () =>
  "Query your own database or API inside Appsmith. Write JS to construct dynamic queries.";
export const SIGNPOSTING_INFO_MENU = {
  documentation: () => $t('messages.6a0b625bec4c3718'),
};

//Statusbar
export const ONBOARDING_STATUS_STEPS_FIRST = () => $t('messages.559fb3d623e194fc');
export const ONBOARDING_STATUS_STEPS_FIRST_ALT = () => $t('messages.62d47420a081e36e');
export const ONBOARDING_STATUS_STEPS_SECOND = () => $t('messages.5c0cc71a051c11b1');
export const ONBOARDING_STATUS_STEPS_THIRD = () => $t('messages.0b7b9e8a63b6a2ba');
export const ONBOARDING_STATUS_STEPS_THIRD_ALT = () => $t('messages.1d466b373da3c1b0');
export const ONBOARDING_STATUS_STEPS_FOURTH = () =>
  $t('messages.7f8cf968d2efd4e2');
export const ONBOARDING_STATUS_STEPS_FIVETH = () =>
  $t('messages.b4b3946bb37ac306');
export const ONBOARDING_STATUS_STEPS_SIXTH = () => "Completed 🎉";
export const ONBOARDING_STATUS_GET_STARTED = () => $t('messages.d6c5ab0d8670c43b');

//Tasks
//1. datasource
export const ONBOARDING_TASK_DATASOURCE_HEADER = () =>
  $t('messages.65d6c0757a40030d');
export const ONBOARDING_TASK_DATASOURCE_BODY = () =>
  $t('messages.f6361c5b0cfacbb4');
export const ONBOARDING_TASK_DATASOURCE_BUTTON = () => $t('messages.a2e17ae689bff307');
export const ONBOARDING_TASK_DATASOURCE_FOOTER_ACTION = () => $t('messages.81ff8b078d683e50');
export const ONBOARDING_TASK_DATASOURCE_FOOTER = () => "first.";
//2. query
export const ONBOARDING_TASK_QUERY_HEADER = () => $t('messages.5c0cc71a051c11b1');
export const ONBOARDING_TASK_QUERY_BODY = () =>
  $t('messages.48c8d5650bf0a7a4');
export const ONBOARDING_TASK_QUERY_BUTTON = () => $t('messages.5279425db4a8e166');
export const ONBOARDING_TASK_QUERY_FOOTER_ACTION = () => $t('messages.81ff8b078d683e50');
//2. widget
export const ONBOARDING_TASK_WIDGET_HEADER = () =>
  $t('messages.88d81904dee34133');
export const ONBOARDING_TASK_WIDGET_BODY = () =>
  $t('messages.c1bd7727d0beee54');
export const ONBOARDING_TASK_WIDGET_BUTTON = () => $t('messages.e950c0999c3893e0');
export const ONBOARDING_TASK_WIDGET_FOOTER_ACTION = () =>
  $t('messages.1adc0bf9eb3bd30d');
export const ONBOARDING_TASK_FOOTER = () => "Alternatively, you can also";

export const USE_SNIPPET = () => $t('messages.325447c42242847d');
export const SNIPPET_TOOLTIP = () => $t('messages.e71058fa6c735a25');

//Welcome page
export const WELCOME_HEADER = () => $t('messages.0e750a02325ca5aa');
export const WELCOME_BODY = () => $t('messages.e29f5be6e2b53eed');
export const WELCOME_ACTION = () => $t('messages.d6c5ab0d8670c43b');
export const PRODUCT_UPDATES_CONFIRMATION_LABEL = () =>
  $t('messages.3c5818ea3c756909');

// API Editor
export const API_EDITOR_TAB_TITLES = {
  HEADERS: () => $t('messages.b4d195148ac95d7b'),
  PARAMS: () => $t('messages.2e1fb8d655842b6b'),
  BODY: () => $t('messages.32f5d4b4175f7246'),
  PAGINATION: () => $t('messages.0a02e94b4dc2f0e7'),
  AUTHENTICATION: () => $t('messages.064e118da52df950'),
  SETTINGS: () => $t('messages.172afc00246949ec'),
};
export const ACTION_EXECUTION_MESSAGE = (actionType: string) =>
  $t('messages.685869694a420f2d', {actionType: actionType});
export const ACTION_EXECUTION_CANCEL = () => $t('messages.e48c82be56887daf');

export const WELCOME_FORM_HEADER = () => $t('messages.468aefb1b8ef58f6');
export const WELCOME_FORM_FIRST_NAME = () => $t('messages.b61cb181f35c9bb6');
export const WELCOME_FORM_LAST_NAME = () => $t('messages.d399fd993ea70d7a');
export const WELCOME_FORM_EMAIL_ID = () => $t('messages.b89b6ed8f3cf5639');
export const WELCOME_FORM_CREATE_PASSWORD = () => $t('messages.d917fa8f3c20699b');
export const WELCOME_FORM_VERIFY_PASSWORD = () => $t('messages.b0d38f4a3c6f08e3');
export const WELCOME_FORM_DATA_COLLECTION_HEADER = () =>
  $t('messages.baf28d109ab707fb');
export const WELCOME_FORM_DATA_COLLECTION_BODY = () =>
  $t('messages.2b275d9ae2a7912f');
export const WELCOME_FORM_DATA_COLLECTION_LINK = () => $t('messages.4b9bbd3568680a68');
export const WELCOME_FORM_DATA_COLLECTION_LABEL_ENABLE = () =>
  "Share data & make Appsmith better!";
export const WELCOME_FORM_DATA_COLLECTION_LABEL_DISABLE = () =>
  $t('messages.47f1c009e447993b');
export const WELCOME_FORM_NEWLETTER_HEADER = () => $t('messages.550b0710863c5883');
export const WELCOME_FORM_NEWLETTER_LABEL = () =>
  $t('messages.22c59c5d72c40313');
export const WELCOME_FORM_SUBMIT_LABEL = () => $t('messages.5428018b0a25871a');

//help tooltips
export const ACCOUNT_TOOLTIP = () => $t('messages.b1c0da4a9dc99267');
export const RENAME_APPLICATION_TOOLTIP = () => $t('messages.fa76d922c8cd8841');
export const LOGO_TOOLTIP = () => $t('messages.055b5406fc37ea7f');
export const ADD_PAGE_TOOLTIP = () => $t('messages.534aaaa2d6dfb8e3');
export const ADD_DATASOURCE_TOOLTIP = () =>
  $t('messages.74c0f94f3b3c6a51');
export const ADD_WIDGET_TOOLTIP = () => $t('messages.3191d52c00277fe9');
export const HELP_RESOURCE_TOOLTIP = () => $t('messages.974a306817ee1157');
export const COPY_ELEMENT = () => $t('messages.14c16b95182fdfb2');
export const SHOW_TEMPLATES = () => $t('messages.0ee5b7ab23dcb29c');
export const LAYOUT_DROPDOWN_TOOLTIP = () =>
  $t('messages.f65f237a093ef51c');
export const DEPLOY_BUTTON_TOOLTIP = () =>
  $t('messages.99565cfcf884518a');
export const SHARE_BUTTON_TOOLTIP = () => "Invite your team to Appsmith";
export const SHARE_BUTTON_TOOLTIP_WITH_USER = (length: number) => () =>
  $t('messages.7b1c0831beb7aa14', {length: length});
export const DEBUGGER_TOOLTIP = () => $t('messages.93acf08324ac8365');
export const PAGE_PROPERTIES_TOOLTIP = () => $t('messages.bfe9fda1d2b776e6');
export const CLEAR_LOG_TOOLTIP = () => $t('messages.980f0c0ece530b53');
export const ADD_JS_ACTION = () => $t('messages.a7d28d2ded8452a8');
export const ENTITY_MORE_ACTIONS_TOOLTIP = () => $t('messages.4702200781854db7');
export const NOTIFICATIONS_TOOLTIP = () => $t('messages.7d8fc3e6bfd9e3f0');

// Navigation Menu
export const DEPLOY_MENU_OPTION = () => $t('messages.76b1c43f085ef30e');
export const CURRENT_DEPLOY_PREVIEW_OPTION = () => $t('messages.e495f6ee30664ec8');
export const CONNECT_TO_GIT_OPTION = () => $t('messages.2ca2736556ca4668');
//
export const GO_TO_PAGE = () => $t('messages.2063c8b5758d9f69');
export const DEFAULT_PAGE_TOOLTIP = () => $t('messages.d1ca4d5ca7d4a4ae');
export const HIDDEN_TOOLTIP = () => $t('messages.1959aee4ae666275');
export const CLONE_TOOLTIP = () => $t('messages.6fd664b50f980a03');
export const DELETE_TOOLTIP = () => $t('messages.92cff16f7596613e');
export const SETTINGS_TOOLTIP = () => $t('messages.172afc00246949ec');

//settings
export const ADMIN_SETTINGS = () => $t('messages.9a4e996f54dc17a4');
export const HELP = () => $t('messages.1d860d3e8f9ce51e');
export const RESTART_BANNER_BODY = () =>
  $t('messages.1d38fc53b337bcea');
export const RESTART_BANNER_HEADER = () => $t('messages.882451f7fea21197');
export const RESTART_ERROR_BODY = () =>
  $t('messages.3607d2eb0ad2c6ea');
export const RESTART_ERROR_HEADER = () => $t('messages.0e3ec346f89fc6a0');
export const RETRY_BUTTON = () => $t('messages.437c59d318553d3a');
export const INFO_VERSION_MISMATCH_FOUND_RELOAD_REQUEST = () =>
  "Hey! There is a new version of Appsmith available. Please consider refreshing your window.";
export const TEST_EMAIL_SUCCESS = (email: string) => () =>
  $t('messages.961628eb639f0e86', {email: email});
export const TEST_EMAIL_SUCCESS_TROUBLESHOOT = () => $t('messages.7c49ff5086519d74');
export const TEST_EMAIL_FAILURE = () => $t('messages.9b3d18e3a594db4e');

export const ADMIN_SETTINGS_EMAIL_WARNING = () =>
  $t('messages.6a89e9c35cf8657f');
export const DISCONNECT_AUTH_ERROR = () =>
  $t('messages.cb28ea798fdf68ea');
export const MANDATORY_FIELDS_ERROR = () => $t('messages.3b8c0cb59c970700');
export const FORM_LOGIN_DESC = () =>
  "Enable your workspace to sign in with Appsmith Form.";
export const GOOGLE_AUTH_DESC = () =>
  "Enable your workspace to sign in with Google (OAuth 2.0) single sign-on (SSO).";
export const GITHUB_AUTH_DESC = () =>
  $t('messages.cf8b60a78bd174fd');
export const SAML_AUTH_DESC = () =>
  $t('messages.c8b9ea5d24f1576b');
export const OIDC_AUTH_DESC = () =>
  $t('messages.0bb6ad7a2f87c6d5');
export const SAVE_BUTTON = () => $t('messages.03f41736e0cec2b6');
export const SAVE_AND_RESTART_BUTTON = () => $t('messages.28a688bec12a66e1');
export const SAVE_AND_REFRESH_BUTTON = () => $t('messages.76d205653d09ff29');
export const RESET_BUTTON = () => $t('messages.3166091c4587d5c7');
export const BUSINESS_TAG = () => $t('messages.dc9e291876f7f3eb');
export const ENTERPRISE_TAG = () => $t('messages.6894848f3377c316');

// Upgrade pages begin
export const AVAILABLE_ON_BUSINESS = () => $t('messages.794f9127793a23aa');
export const EXCLUSIVE_TO_BUSINESS = (featureName: string) =>
  $t('messages.054500b6636d3685', {featureName: featureName});
export const AVAILABLE_ON_ENTERPRISE = () => "Available on Appsmith Enterprise";
// Upgrade pages end

// Audit logs begin
export const AUDIT_LOGS = () => $t('messages.e23123d151714232');
export const TRY_AGAIN_WITH_YOUR_FILTER = () => $t('messages.dd2d561594620934');

// Audit logs Upgrade page begin
export const INTRODUCING = (featureName: string) =>
  $t('messages.a2762accbf4290f7', {featureName: featureName});
export const AUDIT_LOGS_UPGRADE_PAGE_SUB_HEADING = () =>
  $t('messages.67f9c800a1b11ede');
export const SECURITY_AND_COMPLIANCE = () => $t('messages.1f6bc70c341488f7');
export const SECURITY_AND_COMPLIANCE_DETAIL1 = () =>
  $t('messages.90c0e5e4bf732a72');
export const SECURITY_AND_COMPLIANCE_DETAIL2 = () =>
  $t('messages.14e1415ecd792439');
export const DEBUGGING = () => $t('messages.8d9b2ebca40c15f4');
export const DEBUGGING_DETAIL1 = () =>
  $t('messages.5b04ddd7670f7058');
export const INCIDENT_MANAGEMENT = () => $t('messages.0c569f7a7c0522a6');
export const INCIDENT_MANAGEMENT_DETAIL1 = () =>
  $t('messages.0c2fb3ff31274f85');
// Audit logs Upgrade page end
// Audit logs end

// Access control upgrade page begin
export const GRANULAR_ACCESS_CONTROL_FOR_TEAMS = () =>
  $t('messages.49ebb3b2df9a560c');
export const ACCESS_CONTROL_UPGRADE_PAGE_SUB_HEADING = () =>
  $t('messages.912fa7a5099d5cc9');
export const SECURITY_APPS_LEAST_PRIVILEGE = () =>
  $t('messages.e036429c42e1e8cb');
export const SECURITY_APPS_LEAST_PRIVILEGE_DETAIL1 = () =>
  `Create roles by the least privilege needed as defaults, <span>e.g.: View only</span>, assign them to users in groups, <span>e.g.: Marketing</span>, and modify for special access, <span>e.g.: Content creators_Execute queries</span>`;
export const PREVENT_ACCIDENTAL_DAMAGE = () =>
  $t('messages.c32a22472c82c6b1');
export const PREVENT_ACCIDENTAL_DAMAGE_DETAIL1 = () =>
  `Assign edit and delete permissions to an entire group, then modify granularly so non-native users of your data don’t drop a table or bulk-delete streaming data records before you can say, “Retrieve”.`;
export const RESTRICT_PUBLIC_EXPOSURE = () =>
  $t('messages.9025913e962cb7ca');
export const RESTRICT_PUBLIC_EXPOSURE_DETAIL1 = () =>
  $t('messages.b756f333b72a5a0a');
export const ACCESS_CONTROL_UPGRADE_PAGE_FOOTER = () =>
  $t('messages.cfd8551fd68ce3ab');
// Access control upgrade page end

// Provisioning upgrade page begin
export const USER_PROVISIONING_FOR_ENTERPRISES = () =>
  "Manage Appsmith users via your identity provider";
export const PROVISIONING_UPGRADE_PAGE_SUB_HEADING = () =>
  `Add and remove Appsmith users centrally. Sync existing groups to Appsmith.`;
export const PROVISION_DEPROVISION_USERS = () =>
  $t('messages.59f4d56fe7badbb3');
export const PROVISION_DEPROVISION_USERS_DETAIL1 = () =>
  `Control user authorization and access to Appsmith workspaces and apps via your IdP using the SCIM protocol.<div>&nbsp;</div><div><span style="font-style: italic;font-weight: normal;">More protocols coming soon</span></div>`;
export const AUTO_GROUP_SYNC = () => $t('messages.fc2095a665de9f57');
export const AUTO_GROUP_SYNC_DETAIL1 = () =>
  `Easily manage access for groups when you sync them to Appsmith from your IdP.`;
export const PROVISIONING_UPGRADE_PAGE_FOOTER = () =>
  "Secure your Appsmith apps with Granular Access Controls, Audit Logs, Custom SSO, and more on Appsmith Enterprise.";
// Provisioning upgrade page end

//
export const WELCOME_FORM_NON_SUPER_USER_ROLE_DROPDOWN = () =>
  $t('messages.dcaf345edeaafc30');
export const WELCOME_FORM_NON_SUPER_USER_ROLE = () => $t('messages.974f03b30bd92dcf');
export const WELCOME_FORM_NON_SUPER_USER_USE_CASE = () =>
  "What would you like to use Appsmith for?";
export const WELCOME_FORM_NON_SUPER_USER_PROFICIENCY_LEVEL = () =>
  $t('messages.c40b87e752a2aa38');

export const WELCOME_FORM_PROFICIENCY_ERROR_MESSAGE = () =>
  $t('messages.23de8e86aa7c9d39');
export const WELCOME_FORM_USE_CASE_ERROR_MESSAGE = () =>
  $t('messages.64ebe624e435b39f');

export const WELCOME_FORM_EMAIL_ERROR_MESSAGE = () =>
  $t('messages.4349c49bd8361e68');

export const WELCOME_FORM_STRONG_PASSWORD_ERROR_MESSAGE = () =>
  $t('messages.7cf2afa7a655df06');

export const WELCOME_FORM_GENERIC_ERROR_MESSAGE = () =>
  $t('messages.3b6f4c28cf784e23');

export const WELCOME_FORM_PASSWORDS_NOT_MATCHING_ERROR_MESSAGE = () =>
  $t('messages.a22d67462ea5585d');

export const QUERY_CONFIRMATION_MODAL_MESSAGE = () =>
  $t('messages.ead1e330ea2181ba');
export const ENTITY_EXPLORER_TITLE = () => "NAVIGATION";
export const MULTI_SELECT_PROPERTY_PANE_MESSAGE = () =>
  $t('messages.3343012efd6102e1');
export const WIDGET_MULTI_SELECT = () => $t('messages.07fad873ad8c75ac');
export const WIDGET_DEPRECATION_MESSAGE = (widgetName: string) =>
  $t('messages.f8073268528f4b98', {widgetName: widgetName});

export const LOCK_ENTITY_EXPLORER_MESSAGE = () => $t('messages.1aeca2d80aab1f17');
export const CLOSE_ENTITY_EXPLORER_MESSAGE = () => $t('messages.744113f5c5736e42');
export const JS_TOGGLE_DISABLED_MESSAGE = $t('messages.0825d0a60df280ca');
export const JS_TOGGLE_SWITCH_JS_MESSAGE =
  $t('messages.6935dbfd7670a828');
export const PROPERTY_PANE_EMPTY_SEARCH_RESULT_MESSAGE =
  $t('messages.0909817e8e3d7bc5');
export const PROPERTY_SEARCH_INPUT_PLACEHOLDER =
  $t('messages.a521682df304ed10');
export const EXPLORER_BETA_ENTITY = () => "BETA";
export const BINDING_WIDGET_WALKTHROUGH_TITLE = () => $t('messages.be22b8c9cfe45e62');
export const BINDING_WIDGET_WALKTHROUGH_DESC = () =>
  $t('messages.ecab36b0b8a26d39');

// API Pane
export const API_PANE_NO_BODY = () => $t('messages.5a1cbb8a003dca2d');
export const API_PANE_AUTO_GENERATED_HEADER = () =>
  "This content-type header is auto-generated by appsmith based on body type of the API. Create a new header content-type to overwrite this value.";
export const API_PANE_DUPLICATE_HEADER = (headerName: string) =>
  $t('messages.997cd129c503aa06', {headerName: headerName});

export const TABLE_WIDGET_TOTAL_RECORD_TOOLTIP = () =>
  $t('messages.5c03191d2cf5862b');
export const CREATE_DATASOURCE_TOOLTIP = () => $t('messages.7bb588c1350cbbe8');
export const ADD_QUERY_JS_TOOLTIP = () => $t('messages.3e4985d1e9d183e6');
export const LIST_WIDGET_V2_TOTAL_RECORD_TOOLTIP = () =>
  $t('messages.f673663cf931444b');

// Add datasource
export const GENERATE_APPLICATION_TITLE = () => $t('messages.c3654fc83ece7350');
export const GENERATE_APPLICATION_DESCRIPTION = () =>
  $t('messages.616c759433479a47');
export const DELETE_WORKSPACE_SUCCESSFUL = () =>
  $t('messages.65d9751c6c3447a1');
// theming
export const CHANGE_APP_THEME = (name: string) => $t('messages.3bba8497422898ea', {name: name});
export const SET_DEFAULT_SELECTED_THEME = (name: string) =>
  $t('messages.31221e04e63058a9', {name: name});
export const SAVE_APP_THEME = (name: string) => $t('messages.cf8572c01c989235', {name: name});
export const DELETE_APP_THEME = (name: string) => $t('messages.fad3925229706036', {name: name});
export const DELETE_APP_THEME_WARNING = () =>
  $t('messages.20adb2a0d79033cc');
export const APP_THEME_BETA_CARD_HEADING = () => `🎨 Theme your app`;
export const APP_THEME_BETA_CARD_CONTENT = () =>
  $t('messages.61e748fbf2bb948e');

export const UPGRADE_TO_EE = (authLabel: string) =>
  $t('messages.c2a60ce18f5470f4', {authLabel: authLabel});
export const UPGRADE_TO_EE_FEATURE = (feature: string) =>
  $t('messages.a31bc330696b24da', {feature: feature});
export const UPGRADE_TO_EE_GENERIC = () => $t('messages.079220236f2052eb');
export const ADMIN_AUTH_SETTINGS_TITLE = () => $t('messages.064e118da52df950');
export const ADMIN_AUTH_SETTINGS_SUBTITLE = () =>
  $t('messages.517eab5772403c79');
export const DANGER_ZONE = () => $t('messages.d048adc62673acf8');
export const DISCONNECT_AUTH_METHOD = () => $t('messages.ce4f3f4ee0a38ff8');
export const DISCONNECT_CONFIRMATION = () => $t('messages.94920b8e6194aa6c');

// Branding
export const ADMIN_BRANDING_SETTINGS_TITLE_UPGRADE = () =>
  "Custom Branding for your workspaces";
export const ADMIN_BRANDING_SETTINGS_SUBTITLE_UPGRADE = () =>
  $t('messages.d17bae89611054ac');
export const ADMIN_BRANDING_COLOR_TOOLTIP = () =>
  $t('messages.d244c1e79ee170b8');
export const ADMIN_BRANDING_LOGO_SIZE_ERROR = () =>
  $t('messages.10ffcbcfd9ecc9ce');
export const ADMIN_BRANDING_LOGO_DIMENSION_ERROR = () =>
  $t('messages.df2ff6d8f98b4082');
export const ADMIN_BRANDING_LOGO_FORMAT_ERROR = () =>
  $t('messages.bd8b037d8909b481');
export const ADMIN_BRANDING_LOGO_REQUIREMENT = () =>
  `.SVG, .PNG, or .JPG only • Max 2MB`;
export const ADMIN_BRANDING_FAVICON_DIMENSION_ERROR = () =>
  $t('messages.e88d7226cd18ab25');
export const ADMIN_BRANDING_FAVICON_SIZE_ERROR = () =>
  $t('messages.10ffcbcfd9ecc9ce');
export const ADMIN_BRANDING_FAVICON_FORMAT_ERROR = () =>
  $t('messages.440f0d76ec1f26cd');
export const ADMIN_BRANDING_FAVICON_REQUIREMENT = () =>
  `.ICO, .PNG, or .JPG only • Max 32X32`;
export const ADMIN_BRANDING_COLOR_TOOLTIP_PRIMARY = () =>
  $t('messages.2e267a49e1416da0');
export const ADMIN_BRANDING_COLOR_TOOLTIP_BACKGROUND = () =>
  $t('messages.ba3ad8f7fb8c4d77');
export const ADMIN_BRANDING_COLOR_TOOLTIP_HOVER = () =>
  $t('messages.3d95e4fb28753f76');
export const ADMIN_BRANDING_COLOR_TOOLTIP_FONT = () =>
  $t('messages.c56e7a32cbceeb8d');
export const ADMIN_BRANDING_COLOR_TOOLTIP_DISABLED = () =>
  $t('messages.41eb0a8cbeea7e3a');
export const ADMIN_BRANDING_UPGRADE_INTERCOM_MESSAGE = () =>
  `I would like to enable Custom Branding for my workspace and am interested in Appsmith Business.`;

// Guided tour
// -- STEPS ---
export const STEP_ONE_TITLE = () =>
  $t('messages.9882dc415cd5c870');
export const STEP_ONE_SUCCESS_TEXT = () =>
  $t('messages.bace4b251c02cb97');
export const STEP_ONE_BUTTON_TEXT = () => $t('messages.441712d5fb29698f');
export const STEP_TWO_TITLE = () =>
  $t('messages.ce4d54e3f5c19fdc');
export const STEP_THREE_TITLE = () =>
  $t('messages.71975c4af7570adf');
export const STEP_THREE_SUCCESS_TEXT = () =>
  $t('messages.ec09b7cd9a77b14f');
export const STEP_THREE_SUCCESS_BUTTON_TEXT = () => $t('messages.441712d5fb29698f');
export const STEP_FOUR_TITLE = () =>
  $t('messages.0ee7dcce969e926d');
export const STEP_FOUR_HINT_BUTTON_TEXT = () => $t('messages.bbb34723e2056f3a');
export const STEP_FOUR_SUCCESS_TEXT = () =>
  $t('messages.a1403a3215385a3e');
export const STEP_FOUR_SUCCESS_BUTTON_TEXT = () => $t('messages.441712d5fb29698f');
export const STEP_FIVE_TITLE = () =>
  $t('messages.9a5b0de451d29b0e');
export const STEP_FIVE_HINT_TEXT = () =>
  $t('messages.c45958ffdad08dfb');
export const STEP_FIVE_SUCCESS_TEXT = () =>
  $t('messages.a47f603404d00fae');
export const STEP_FIVE_SUCCESS_BUTTON_TEXT = () => $t('messages.441712d5fb29698f');
export const STEP_SIX_TITLE = () =>
  $t('messages.01dd3d7cc85ca7d0');
export const STEP_SIX_SUCCESS_TEXT = () =>
  $t('messages.7c6dd995abeef7f6');
export const STEP_SIX_SUCCESS_BUTTON_TEXT = () => $t('messages.441712d5fb29698f');
export const STEP_SEVEN_TITLE = () =>
  $t('messages.a8d7ac47a6e4d885');
export const STEP_EIGHT_TITLE = () =>
  $t('messages.0c871dae1adbf3e6');
export const STEP_EIGHT_SUCCESS_TEXT = () =>
  $t('messages.d740c4a151ca155a');
export const STEP_NINE_TITLE = () => $t('messages.462ec154ce20b032');
export const CONTINUE = () => $t('messages.5f5540a90cdeb463');
export const PROCEED_TO_NEXT_STEP = () => $t('messages.441712d5fb29698f');
export const PROCEED = () => $t('messages.bbb34723e2056f3a');
export const COMPLETE = () => $t('messages.ac3d9933032cbfb8');
// -- End Tutorial --
export const END_TUTORIAL = () => $t('messages.5da6fb1aafcbaa3e');
export const CANCEL_DIALOG = () => $t('messages.745450bf893892a4');
// -- Intro content --
export const TITLE = () =>
  $t('messages.5d642d69320b6499');
export const DESCRIPTION = () =>
  $t('messages.264571e88767e1d6');
export const BUTTON_TEXT = () => $t('messages.f3cc337b96e5aaa6');
// -- Rating --
export const RATING_TITLE = () =>
  "Congratulations! You just built your first app in Appsmith.";
export const RATING_DESCRIPTION = () =>
  $t('messages.09979e959061bbd9');
export const RATING_TEXT = () => $t('messages.25d855d1ba1bf95b');
// -- End Message --
export const END_TITLE = () => $t('messages.2d6fe8538fe19cc8');
export const END_DESCRIPTION = () =>
  $t('messages.5622f6075f131a0e');
export const END_BUTTON_TEXT = () => $t('messages.a712a2b9806592a9');

export const CONTEXT_RENAME = () => $t('messages.da7ab5b3b029531d');
export const CONTEXT_SHOW_BINDING = () => $t('messages.e3b772689db3336a');
export const CONTEXT_MOVE = () => $t('messages.93cd25ebbd1b04ab');
export const CONTEXT_COPY = () => $t('messages.562ad19c4ed49adb');
export const CONTEXT_DUPLICATE = () => $t('messages.baea3059d8f4c6fd');
export const CONTEXT_DELETE = () => $t('messages.92cff16f7596613e');
export const CONFIRM_CONTEXT_DELETE = () => $t('messages.94920b8e6194aa6c');
export const CONFIRM_CONTEXT_DELETING = () => $t('messages.180a0110e951c8b3');
export const CONTEXT_NO_PAGE = () => $t('messages.f4ea53c4ab7689fb');
export const CONTEXT_REFRESH = () => $t('messages.351e70144df2b795');
export const CONTEXT_CLONE = () => $t('messages.6fd664b50f980a03');
export const CONTEXT_SETTINGS = () => $t('messages.172afc00246949ec');
export const CONTEXT_PARTIAL_EXPORT = () => $t('messages.9c3e93ed4cbd8988');
export const CONTEXT_PARTIAL_IMPORT = () => $t('messages.a01bd582dfd543f8');
export const CONTEXT_SET_AS_HOME_PAGE = () => $t('messages.5b7b2544b2d172a4');
export const PAGE = () => $t('messages.8c0ead54d0b04a14');
export const PAGES = () => $t('messages.b5b7451fae100d39');

// Entity explorer
export const ADD_DATASOURCE_BUTTON = () => $t('messages.5e014513a40b62e3');
export const ADD_WIDGET_BUTTON = () => $t('messages.bf0564382a248abe');
export const ADD_QUERY_JS_BUTTON = () => $t('messages.6d1eb3ce9b74cc44');
export const EMPTY_WIDGET_MAIN_TEXT = () => $t('messages.fea33ca137997c55');
export const EMPTY_WIDGET_BUTTON_TEXT = () => $t('messages.b4d60d0c915b4b73');
export const EMPTY_QUERY_JS_MAIN_TEXT = () => $t('messages.f2c46edee227cb0b');
export const EMPTY_QUERY_JS_BUTTON_TEXT = () => $t('messages.6efdfe78f1bc1402');
export const EMPTY_DATASOURCE_MAIN_TEXT = () => $t('messages.77502c47f85a9bcc');
export const EMPTY_DATASOURCE_BUTTON_TEXT = () => $t('messages.881cefe530d38486');
export const SEARCH_DATASOURCES = () => $t('messages.db558fa4797801f7');

// Templates
export const MORE = () => $t('messages.586db5bf0598959f');
export const SHOW_LESS = () => $t('messages.fc45608bb1b446e0');
export const CHOOSE_WHERE_TO_FORK = () => $t('messages.e1b77cb3fad4df53');
export const SELECT_WORKSPACE = () => $t('messages.d909363a3c23f1a3');
export const FORK_TEMPLATE = () => $t('messages.2c68355815852121');
export const TEMPLATES = () => $t('messages.d2786a2052487cbb');
export const FORK_THIS_TEMPLATE = () => $t('messages.44bee04d0bd048a8');
export const FORK_THIS_TEMPLATE_BUILDING_BLOCK = () => $t('messages.42ce90a9875d72cb');
export const COULDNT_FIND_TEMPLATE = () =>
  $t('messages.7aa8d1c971209201');
export const COULDNT_FIND_TEMPLATE_DESCRIPTION = () =>
  $t('messages.146a74302c9d7a96');
export const REQUEST_TEMPLATE = () => $t('messages.cbdf792496f990b6');
export const REQUEST_BUILDING_BLOCK = () => $t('messages.75a5754369eff0a4');
export const SEARCH_TEMPLATES = () => $t('messages.1e173ff0a29bb1f2');
export const INTRODUCING_TEMPLATES = () => $t('messages.9f874f11b37f9557');
export const TEMPLATE_NOTIFICATION_DESCRIPTION = () =>
  $t('messages.d4766614f15b96a0');
export const GO_BACK = () => $t('messages.509dfaf1ba0ff80e');
export const OVERVIEW = () => $t('messages.99f8e1e9e61e9a83');
export const FUNCTION = () => $t('messages.600aab7e06f3b747');
export const INDUSTRY = () => $t('messages.5f6e582f5a33b5c1');
export const DATASOURCES = () => $t('messages.24400b249ef5a91d');
export const NOTE = () => $t('messages.97b9cd0bdad4aa07');
export const NOTE_MESSAGE = () => $t('messages.97ceea541c5fb11f');
export const WIDGET_USED = () => $t('messages.b203819586adb3d7');
export const SIMILAR_TEMPLATES = () => $t('messages.3d4f09c7670908d3');
export const VIEW_ALL_TEMPLATES = () => $t('messages.ae59a0c1837507d2');
export const FILTERS = () => $t('messages.863f8d3902f673c8');
export const FILTER_SELECTALL = () => $t('messages.63e8e72c9948155f');
export const FILTER_SELECT_PAGE = () => $t('messages.fffd0b8e3ec7ef39');
export const FILTER_SELECT_PAGES = () => $t('messages.88b1af039639d5b0');
export const FORKING_TEMPLATE = () => $t('messages.83ff302c4d5e5792');
export const FETCHING_TEMPLATES = () => $t('messages.2708c18738339849');
export const FETCHING_TEMPLATE_LIST = () => $t('messages.67b72e51159c98f1');

export const TEMPLATES_BACK_BUTTON = () => $t('messages.509dfaf1ba0ff80e');
export const SKIP_START_WITH_USE_CASE_TEMPLATES = () =>
  $t('messages.1e755c2fc2afbcdf');

export const IMAGE_LOAD_ERROR = () => $t('messages.4bccbd5f1645644f');

export const REDIRECT_URL_TOOLTIP = () =>
  $t('messages.7b2d0e3e66a6cf41');
export const ENTITY_ID_TOOLTIP = () =>
  $t('messages.db72c491df30fab8');

export const FORK_APP_MODAL_LOADING_TITLE = () =>
  $t('messages.af7592746a9809ce');
export const FORK_APP_MODAL_EMPTY_TITLE = () =>
  $t('messages.82dfa2f1efbca55c');
export const FORK_APP_MODAL_SUCCESS_TITLE = () =>
  $t('messages.0d08507ea5a9bbe2');
export const FORK = () => $t('messages.83060648735f2517');

export const CLEAN_URL_UPDATE = {
  name: () => $t('messages.a3fa24ba66e4667d'),
  shortDesc: () =>
    $t('messages.74a89750a2567a83'),
  description: [
    () =>
      $t('messages.a60b5ce5d8c7e55c'),
    (url: string) =>
      `The current app’s URL will be:<br /><code style="line-break: anywhere; padding: 2px 4px; line-height: 22px">${url}</code>`,
  ],
  disclaimer: () =>
    "Existing references to <strong>appsmith.URL.fullpath</strong> and <strong>appsmith.URL.pathname</strong> properties will behave differently.",
};

export const MEMBERS_TAB_TITLE = (
  length: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isFreeInstance?: boolean,
) => $t('messages.e2892fbe212b3e10', {length: length});
export const SEARCH_USERS = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isFreeInstance?: boolean,
) => $t('messages.a78401b63ea72ff1');

export const CREATE_PAGE = () => $t('messages.698f9bc5f6458023');
export const CANVAS_NEW_PAGE_CARD = () => $t('messages.f5e715ee234c88d0');
export const ADD_PAGE_FROM_TEMPLATE = () => $t('messages.7f04cace0ba7cee3');
export const INVALID_URL = () =>
  "Please enter a valid URL, for example, https://example.com";
export const SAVE_OR_DISCARD_DATASOURCE_WARNING = () =>
  $t('messages.e3faaa10b0404a11');

export const APP_SETTINGS_PANE_HEADER = () => $t('messages.172afc00246949ec');
export const APP_SETTINGS_CLOSE_TOOLTIP = () => $t('messages.8f8a1c041bcec50a');

export const GENERAL_SETTINGS_SECTION_HEADER = () => $t('messages.3bf8b416020cfb93');
export const GENERAL_SETTINGS_SECTION_CONTENT_HEADER = () => $t('messages.9ef632a9f6f84d57');
export const GENERAL_SETTINGS_SECTION_HEADER_DESC = () => $t('messages.2903368fc07a0f91');
export const GENERAL_SETTINGS_APP_NAME_LABEL = () => $t('messages.ded50b0071ee0636');
export const GENERAL_SETTINGS_NAME_EMPTY_MESSAGE = () =>
  $t('messages.69c36df63a5a4485');
export const GENERAL_SETTINGS_NAME_SPECIAL_CHARACTER_ERROR = () =>
  $t('messages.1c60178da88eb69c');
export const GENERAL_SETTINGS_APP_ICON_LABEL = () => $t('messages.f6dfff079505f878');

export const THEME_SETTINGS_SECTION_HEADER = () => $t('messages.f882c5d435a7e1ee');
export const THEME_SETTINGS_SECTION_CONTENT_HEADER = () => $t('messages.07ad8b6857b264be');
export const THEME_SETTINGS_SECTION_HEADER_DESC = () =>
  $t('messages.3fdb5c34ba53bb05');

export const PAGE_SETTINGS_SECTION_HEADER = () => $t('messages.81f6515227164c7d');
export const PAGE_SETTINGS_SECTION_CONTENT_HEADER = () => "settings";
export const PAGE_SETTINGS_PAGE_NAME_LABEL = () => $t('messages.fa08fac5cc83392f');
export const PAGE_SETTINGS_NAME_EMPTY_MESSAGE = () =>
  $t('messages.dd668e229468cbbf');
export const PAGE_SETTINGS_NAME_SPECIAL_CHARACTER_ERROR = () =>
  $t('messages.9f348a6d14c3ae31');
export const PAGE_SETTINGS_PAGE_URL_LABEL = () => $t('messages.a93001e058381c77');
export const PAGE_SETTINGS_PAGE_URL_VERSION_UPDATE_1 = () => $t('messages.95af155584d20fe8');
export const PAGE_SETTINGS_PAGE_URL_VERSION_UPDATE_2 = () => "update";
export const PAGE_SETTINGS_PAGE_URL_VERSION_UPDATE_3 = () =>
  "your app URL to the new format to set the page URL.";
export const PAGE_SETTINGS_SHOW_PAGE_NAV = () => $t('messages.df5b179d7c1a991f');
export const PAGE_SETTINGS_SHOW_PAGE_NAV_TOOLTIP = () =>
  "Show or hide the page in the appsmith navbar in view mode";
export const PAGE_SETTINGS_SET_AS_HOMEPAGE = () => $t('messages.5b7b2544b2d172a4');
export const PAGE_SETTINGS_SET_AS_HOMEPAGE_TOOLTIP = () =>
  $t('messages.a697a63a681e8ebb');
export const PAGE_SETTINGS_SET_AS_HOMEPAGE_TOOLTIP_NON_HOME_PAGE = () =>
  $t('messages.277d75cad173f147');
export const PAGE_SETTINGS_ACTION_NAME_CONFLICT_ERROR = (name: string) =>
  $t('messages.eed3d9ae7ecf876f', {name: name});

export const CODE_EDITOR_LOADING_ERROR = (message?: string) =>
  $t('messages.c8b8f4f975c3d6d3', {message: message || ''});

export const UPDATE_VIA_IMPORT_SETTING = {
  settingHeader: () => $t('messages.f5ffd795eb412a2d'),
  settingDesc: () => $t('messages.5082141d05ce4cef'),
  settingLabel: () => $t('messages.a01bd582dfd543f8'),
  settingContent: () =>
    $t('messages.cee7c79a4f4dff58'),
  settingActionButtonTxt: () => $t('messages.a01bd582dfd543f8'),
  disabledForGit: () =>
    $t('messages.ef70c5918a7360bf'),
};

export const IN_APP_EMBED_SETTING = {
  applicationUrl: () => $t('messages.62a76408967d9868'),
  allowEmbeddingLabel: () => $t('messages.ca1fc9059d7c6f55'),
  allowEmbeddingTooltip: () =>
    $t('messages.b8bdd9ee2210803d'),
  forkApplicationConfirmation: {
    title: () => $t('messages.42f15be5f257ab30'),
    body: () => $t('messages.140f0125a5cbf394'),
    cancel: () => $t('messages.745450bf893892a4'),
    confirm: () => $t('messages.2f9a36912bb1e7ac'),
  },
  copy: () => $t('messages.6b2ba04e0b8613b4'),
  copied: () => $t('messages.de486719bc9d760f'),
  limitEmbeddingLabel: () => $t('messages.71bb82fc18cc0840'),
  limitEmbeddingTooltip: () => $t('messages.5ffd14a5bcd9a691'),
  disableEmbeddingLabel: () => $t('messages.630c66222cb0ec14'),
  disableEmbeddingTooltip: () =>
    $t('messages.82fb64fae107d116'),
  embed: () => $t('messages.21cd9354798320a3'),
  embedSnippetTitle: () => $t('messages.4c050eb444e6d672'),
  change: () => $t('messages.79585c927a493e5c'),
  copiedEmbedCode: () => $t('messages.a1f06ed54a793e50'),
  embedSize: () => $t('messages.8c92169847bd43fb'),
  previewEmbeddedApp: () => $t('messages.253028e508f4145e'),
  sectionHeader: () => $t('messages.4ee61d727b571edd'),
  sectionContentHeader: () => $t('messages.bb8ea70347838aac'),
  sectionHeaderDesc: () => $t('messages.3c84220c30b22d18'),
  showNavigationBar: () => $t('messages.7ab158b86159278d'),
  forkContentHeader: () => $t('messages.83060648735f2517'),
  forkLabel: () => $t('messages.21e1dd5cd574e40f'),
  forkLabelTooltip: () =>
    $t('messages.140f0125a5cbf394'),
  upgradeHeading: () =>
    $t('messages.930be107de651b65'),
  upgradeHeadingForInviteModal: () => $t('messages.c2d928ce38d69b43'),
  upgradeSubheadingForInviteModal: () =>
    "Make your app public by visiting the share settings, and easily embed your Appsmith app into legacy applications",
  privateAppsText: () => $t('messages.00e896a9b2a856fd'),
  rampSubtextModal: () =>
    "Embed private Appsmith apps and seamlessly authenticate users through SSO in our Enterprise Plan",
  rampSubtextSidebar: () =>
    "To embed private Appsmith apps and seamlessly authenticate users through SSO, try our ",
  rampLinktext: () => $t('messages.31aa9d6a02860655'),
  rampLinktextvariant2: () => $t('messages.9b99dd5a8523a2f5'),
  upgradeContent: () => $t('messages.ed5dcf5e36ccc485'),
  appsmithEnterpriseEdition: () => "Appsmith Enterprise Plan.",
  secondaryHeadingForAppSettings: () =>
    "Make your app public to embed your Appsmith app into legacy applications",
  secondaryHeading: () =>
    $t('messages.930be107de651b65'),
};

export const APP_NAVIGATION_SETTING = {
  sectionHeader: () => $t('messages.3f766f2c4dd1849f'),
  sectionHeaderDesc: () => $t('messages.a7aae43067ec8596'),
  showNavbarLabel: () => $t('messages.c9372967f3949bca'),
  orientationLabel: () => $t('messages.11753e05f5efbb94'),
  navStyleLabel: () => $t('messages.b431b00464aa8258'),
  positionLabel: () => $t('messages.9ca0ccc0210bc0e9'),
  itemStyleLabel: () => $t('messages.25682c8782ea3433'),
  colorStyleLabel: () => $t('messages.05f02d9703607f01'),
  logoLabel: () => $t('messages.52e9d59e35e9ae85'),
  logoConfigurationLabel: () => $t('messages.66291e2863109183'),
  showSignInLabel: () => $t('messages.82767453db9117a9'),
  showSignInTooltip: () =>
    $t('messages.3f99f2e45e51498d'),
  logoUploadFormatError: () => $t('messages.8afda9b745ae4132'),
  logoUploadSizeError: () => $t('messages.f877b55869fe9b5a'),
  showLogoLabel: () => $t('messages.3cd811f11458b662'),
  showApplicationTitleLabel: () => $t('messages.b95c586d0fe7451c'),
};

export const LOCK_SIDEBAR_MESSAGE = () => $t('messages.1aeca2d80aab1f17');
export const CLOSE_SIDEBAR_MESSAGE = () => $t('messages.744113f5c5736e42');

// Datasource/New query
export const NEW_QUERY_BUTTON_TEXT = () => $t('messages.b6f0e5c32a919510');
export const NEW_API_BUTTON_TEXT = () => $t('messages.eb5df52884020beb');
export const NEW_AI_BUTTON_TEXT = () => $t('messages.7eb1362aa976e928');
export const GENERATE_NEW_PAGE_BUTTON_TEXT = () => $t('messages.ccac64966162fc30');
export const RECONNECT_BUTTON_TEXT = () => $t('messages.3ce53f38cfd3ae82');
export const SAVE_BUTTON_TEXT = () => $t('messages.03f41736e0cec2b6');
export const TEST_BUTTON_TEXT = () => $t('messages.d2d197f1872aa139');
export const SAVE_AND_AUTHORIZE_BUTTON_TEXT = () => $t('messages.a3a9ab276acfe7e3');
export const SAVE_AND_RE_AUTHORIZE_BUTTON_TEXT = () => $t('messages.037a927933cfd347');
export const DISCARD_POPUP_DONT_SAVE_BUTTON_TEXT = () => $t('messages.0593b1eaa41b4e1b');
export const GSHEET_AUTHORISED_FILE_IDS_KEY = () => "userAuthorizedSheetIds";
export const GOOGLE_SHEETS_INFO_BANNER_MESSAGE = () =>
  "Appsmith will require access to your google drive to access google sheets.";
export const GOOGLE_SHEETS_AUTHORIZE_DATASOURCE = () => $t('messages.0467d527f8e8a925');
export const GOOGLE_SHEETS_LEARN_MORE = () => $t('messages.d36cdbc432e24801');
export const DATASOURCE_SCHEMA_NOT_AVAILABLE = () => $t('messages.1fa375a05da70e6d');
export const DATASOURCE_INTERCOM_TEXT = () =>
  "Do you need help setting up a Google Sheets datasource?";
export const GOOGLE_SHEETS_ASK_FOR_SUPPORT = () => $t('messages.cdd02aabdfb59874');
export const GOOGLE_SHEETS_FILE_PICKER_TITLE = () =>
  "Select Google Sheets to query";
export const DATASOURCE_GENERATE_PAGE_BUTTON = () => $t('messages.ccac64966162fc30');
export const FETCHING_DATASOURCE_PREVIEW_DATA = () => $t('messages.c46d83fe8bfe5474');
export const SCHEMA_PREVIEW_NO_DATA = () =>
  $t('messages.9d66099532fa65bb');
export const GSHEET_SPREADSHEET_LABEL = () => $t('messages.5c40195365e7f570');
export const GSHEET_SPREADSHEET_LOADING = () => $t('messages.84f2364554543d12');
export const GSHEET_SHEET_LOADING = () => $t('messages.dc579187b9f00fa9');
export const GSHEET_DATA_LOADING = () => $t('messages.76d0d85aada0e48d');
export const GSHEET_SEARCH_PLACEHOLDER = () => $t('messages.314a6f29742d81b2');

//Layout Conversion flow
export const CONVERT = () => $t('messages.812304beec66ef5a');
export const BUILD_RESPONSIVE = () => $t('messages.22f8030bb6e0f10b');
export const BUILD_RESPONSIVE_TEXT = () =>
  "Appsmith will convert your application's UI to auto-layout, a new mode designed for building mobile-friendly apps in no time";
export const BUILD_FIXED_LAYOUT = () => $t('messages.362646a7e254d2f0');
export const BUILD_FIXED_LAYOUT_TEXT = () =>
  "Appsmith will convert your application’s UI to fixed layout, the default mode.";
export const USE_SNAPSHOT = () => $t('messages.c48ef6a21519e4b9');
export const USE_SNAPSHOT_HEADER = () => $t('messages.c48ef6a21519e4b9');
export const DISCARD_SNAPSHOT_HEADER = () => $t('messages.3f69dbc84de88d53');
export const SAVE_SNAPSHOT = () =>
  $t('messages.863581a4753af5f0');
export const SAVE_SNAPSHOT_TEXT = () =>
  $t('messages.772d08366522269d');
export const CREATE_SNAPSHOT = () => $t('messages.31f09b4c5d318880');
export const CONVERTING_APP = () => $t('messages.6f0244163f26fbf1');
export const RESTORING_SNAPSHOT = () => $t('messages.4520bcb4f73527a8');
export const REFRESH_THE_APP = () => $t('messages.121a9870510433f1');
export const CONVERT_ANYWAYS = () => $t('messages.066158e8069a2be7');
export const CONVERSION_SUCCESS_HEADER = () => $t('messages.f38b17a95b6ed15b');
export const DISCARD_SNAPSHOT_TEXT = () =>
  $t('messages.2b33ff24a3651bfa');
export const CONVERSION_SUCCESS_TEXT = () =>
  $t('messages.41db062a5f05f046');
export const CONVERSION_WARNING_HEADER = () =>
  $t('messages.1024619159dd5d44');
export const CONVERSION_WARNING_TEXT = () =>
  $t('messages.cf98a3c349ea9061');
export const CONVERSION_ERROR_HEADER = () => $t('messages.10ba9b81f714234e');
export const CONVERSION_ERROR = () =>
  "Appsmith ran into a critical error while trying to convert to auto-layout";
export const SEND_REPORT = () => $t('messages.bd6345cda5e2327b');
export const CONVERSION_ERROR_TEXT = () => $t('messages.6c08a89f558d9e1b');
export const DROPDOWN_LABEL_TEXT = () => $t('messages.be5ef71bf215de7c');
export const CONVERSION_WARNING = () => $t('messages.a74cd6c9387f1c1c');
export const SNAPSHOT_LABEL = () =>
  $t('messages.59e2694381bc0996');
export const USE_SNAPSHOT_TEXT = () =>
  $t('messages.8a6e8487c6f1557e');
export const SNAPSHOT_WARNING_MESSAGE = () =>
  $t('messages.f03ba7060016ac33');
export const CONVERT_TO_FIXED_TITLE = () => $t('messages.e3a5f974c1999b41');
export const CONVERT_TO_FIXED_BUTTON = () => $t('messages.09817cf2f0e05931');
export const CONVERT_TO_AUTO_TITLE = () => $t('messages.30007221c2129b17');
export const CONVERT_TO_AUTO_BUTTON = () => $t('messages.354c880ba49cd22c');
export const SNAPSHOT_BANNER_MESSAGE = () =>
  $t('messages.f3e0697dbab59779');
export const USE_SNAPSHOT_CTA = () => $t('messages.c48ef6a21519e4b9');
export const DISCARD_SNAPSHOT_CTA = () => $t('messages.4f712d9bea1d43a2');
export const MORE_DETAILS = () => $t('messages.b983aa3247919d60');
export const CONVERSION_ERROR_MESSAGE_HEADER = () =>
  $t('messages.4d60dac010c8b790');
export const CONVERSION_ERROR_MESSAGE_TEXT_ONE = () =>
  $t('messages.f4c4a7e7ae65ad5f');
export const CONVERSION_ERROR_MESSAGE_TEXT_TWO = () =>
  $t('messages.cae3ca6f43816b8d');
export const SNAPSHOT_TIME_FROM_MESSAGE = (
  timeSince: string,
  readableDate: string,
) => $t('messages.a9b1aba7828ea944', {timeSince: timeSince,readableDate: readableDate});
export const SNAPSHOT_TIME_TILL_EXPIRATION_MESSAGE = (
  timeTillExpiration: string,
) => $t('messages.57bf5978f05f4861', {timeTillExpiration: timeTillExpiration});
export const DISCARD = () => $t('messages.04f5d5b7dfe664bd');
// Alert options and labels for showMessage types
export const ALERT_STYLE_OPTIONS = [
  { label: $t('messages.edbaf57b33439ceb'), value: "'info'", id: "info" },
  {
    label: $t('messages.2be6ecc8abff645f'),
    value: "'success'",
    id: "success",
  },
  { label: $t('messages.cf639ec88d6174d4'), value: "'error'", id: "error" },
  { label: $t('messages.77a2860a1f37635e'), value: "'warning'", id: "warning" },
];

export const customJSLibraryMessages = {
  ADD_JS_LIBRARY: () => $t('messages.b76edee39ab0533a'),
  REC_LIBRARY: () => $t('messages.ef23fbb88e2383f2'),
  INSTALLATION_SUCCESSFUL: (accessor: string) =>
    $t('messages.2e025934cb09cca8', {accessor: accessor}),
  INSTALLATION_FAILED: () => $t('messages.b682c4abd5164648'),
  INSTALLED_ALREADY: (accessor: string) =>
    $t('messages.d3e7159ca6961915', {accessor: accessor}),
  UNINSTALL_FAILED: (name: string) =>
    $t('messages.1f62506c2dfcc9a4', {name: name}),
  UNINSTALL_SUCCESS: (accessor: string) =>
    $t('messages.7fc61f5179dde0ab', {accessor: accessor}),
  LEARN_MORE_DESC: () => $t('messages.94e14f8463fcbfbd'),
  UNSUPPORTED_LIB: () => $t('messages.05db5c05cfe984c5'),
  UNSUPPORTED_LIB_DESC: () =>
    $t('messages.0b7ac4f5847840bd'),
  LEARN_MORE: () => $t('messages.d36cdbc432e24801'),
  REPORT_ISSUE: () => $t('messages.f10f0441b0b2b035'),
  AUTOCOMPLETE_FAILED: (name: string) =>
    $t('messages.ab0fddf0ddc52c61', {name: name}),
  CLIENT_LOAD_FAILED: (url: string) => $t('messages.fb65d4c4f8174859', {url: url}),
  LIB_OVERRIDE_ERROR: (
    name: string,
  ) => $t('messages.14dc078910ed51db', {name}),
  DEFS_FAILED_ERROR: (name: string) =>
    $t('messages.6e2dc8d0049fa108', {name: name}),
  IMPORT_URL_ERROR: (url: string) =>
    $t('messages.a9c0c3c3f8932d56', {url: url}),
  NAME_COLLISION_ERROR: (accessors: string) =>
    $t('messages.736865c39ee2a78d', {accessors: accessors}),
};

// Business Plan upgrade page
export const MOVE_TO_BUSINESS_EDITION = (trailingChar: string) =>
  $t('messages.f081599cac618ae9', {trailingChar: trailingChar || ''});

//Datasource environment
export const START_SWITCH_ENVIRONMENT = (environment: string) =>
  $t('messages.4fb76cf067488c19', {environment_toLowerCase__: environment.toLowerCase()});
export const SWITCH_ENVIRONMENT_SUCCESS = (environment: string) =>
  $t('messages.396713839fe74564', {environment_toLowerCase__: environment.toLowerCase()});
export const SWITCH_ENV_DISABLED_TOOLTIP_TEXT = (): string =>
  $t('messages.296d4e9bd9c4040f');

export const TEST_DATASOURCE_SUCCESS = (
  datasourceName: string,
  environmentName: string,
) => {
  return environmentName
    ? $t('messages.08223fd9e0f80577', {datasourceName: datasourceName,environmentName_toLowerCase__: environmentName.toLowerCase()})
    : $t('messages.2377a7f67b0502f3', {datasourceName: datasourceName});
};

export const TEST_DATASOURCE_ERROR = () =>
  $t('messages.4deeb47244fe0e75');

// Camera widget
export const DEFAULT_CAMERA_LABEL = () => $t('messages.4e93b134b181b0a4');
export const DEFAULT_CAMERA_LABEL_DESCRIPTION = () =>
  $t('messages.db1da337067486be');
export const FRONT_CAMERA_LABEL = () => $t('messages.1cc3ea4e60b95138');
export const BACK_CAMERA_LABEL = () => $t('messages.a092024cdeb550a8');

// Color picker
export const FULL_COLOR_PICKER_LABEL = () => $t('messages.3a3a78e0eac2e114');

// Column selector modal
export const EDIT_FIELDS = () => $t('messages.ea5846f85fdf592e');
export const FIELDS_CONFIGURATION = () => $t('messages.6a0833ff350ae711');
export const SAVE_CHANGES = () => $t('messages.bad325736845b335');
export const COLUMN_TYPE = () => $t('messages.f0a8388b34c2b1ae');
export const COLUMN_NAME = () => $t('messages.6ee37804ff5b1dd5');
export const EDIT_FIELDS_DISABLED_TOOLTIP_TEXT = () =>
  $t('messages.b8393c4153656aba');

export const SAVE_CHANGES_DISABLED_TOOLTIP_TEXT = () =>
  $t('messages.78f7ea9aee6d667b');

export const NO_CONNECTABLE_WIDGET_FOUND = () =>
  $t('messages.7b582fc04f12ba7c');

export const CONNECT_BUTTON_TEXT = () => $t('messages.27a8449fecbe14f2');

export const NO_FIELDS_ADDED = () => $t('messages.b8ceb3282f82a9eb');

// One click binding control
export const DATASOURCE_DROPDOWN_OPTIONS = {
  CONNECT_TO_QUERY: () => $t('messages.2581d37252658da4'),
  CONNECT_TO: () => $t('messages.a45b41144cae58a8'),
  CHOOSE_DATASOURCE_TO_CONNECT: () => $t('messages.c8f8769473439f46'),
  CREATE_OR_EDIT_RECORDS: () => $t('messages.ca62c048d7fed7cf'),
  WRITE_JSON_SCHEMA: () => $t('messages.386961bcfb25f060'),
  SELECT_A_DATASOURCE: () => $t('messages.ff5b0baf5aa52168'),
  CONNECT_DATA: () => $t('messages.27a8449fecbe14f2'),
  OTHER_ACTIONS: () => $t('messages.fb68920508fdb7c4'),
};

export const COMMUNITY_TEMPLATES = {
  tabTitle: () => $t('messages.6cad7d805a1f8ae5'),
  cancel: () => $t('messages.745450bf893892a4'),
  publishSuccessPage: {
    title: () => "Live on Appsmith community",
    description: () =>
      $t('messages.6aba341ea394a3ea'),
    viewTemplateButton: () => $t('messages.3035f172de4d9a56'),
  },
  publishFormPage: {
    title: () => $t('messages.a67dca5074cbc8f0'),
    footer: {
      publishButton: () => $t('messages.a67dca5074cbc8f0'),
      tnCText: () =>
        $t('messages.e26c64a32e61b358'),
    },
    preview: {
      thumbnail: () => $t('messages.16d6327e06930518'),
    },
    templateForm: {
      titleInputLabel: () => $t('messages.54872e0c8edfe7fe'),
      titleInputPlaceholder: () => $t('messages.631330d087938d52'),
      titleRequiredError: () => $t('messages.1441e3ae96084753'),

      excerptInputLabel: () => $t('messages.ec3113f9000d8cef'),
      excerptInputPlaceholder: () => "One line excerpt",

      descriptionInputLabel: () => $t('messages.8e8c9eb6b7e4b07a'),
      descriptionInputPlaceholder: () => $t('messages.4f59eff9a44a6e79'),

      useCasesInputLabel: () => "Use-cases",
      useCasesInputPlaceholder: () => $t('messages.320e7a6e41e5f85f'),
    },
    authorDetails: {
      title: () => $t('messages.9fefb60962926f96'),
      displayNameLabel: () => $t('messages.53613b954d1fd6f9'),
      displayNamePlaceholder: () => $t('messages.53613b954d1fd6f9'),
      nameRequiredError: () => $t('messages.b3f3467d47aab1a7'),

      emailLabel: () => $t('messages.b89b6ed8f3cf5639'),
      emailPlaceholder: () => $t('messages.b89b6ed8f3cf5639'),
    },
    applicationSettings: {
      title: () => $t('messages.d34236deacc95a2f'),
      publicSetting: () => $t('messages.7f62cbd29739520d'),
      forkableSetting: () => $t('messages.21e1dd5cd574e40f'),
    },
    publishedInfo: {
      title: () => $t('messages.97ba4d64f71755e3'),
      correct: [
        () => $t('messages.025a30923b7aeff9'),
        () => $t('messages.83beb24e2ffa5637'),
        () => $t('messages.58f09b6b45990b79'),
      ],
      incorrect: [
        () => $t('messages.c4a435a09514d79b'),
        () => $t('messages.3dcbc40bcaa4c25a'),
        () => $t('messages.e45739739dfe3d41'),
        () => $t('messages.4280fd7230b12b41'),
      ],
    },
    publishedFailedError: () => $t('messages.fafa94c2274e8aec'),
  },
  modals: {
    unpublishedInfo: {
      title: () => "Publish to Appsmith community",
      description: () =>
        "Publish this app to Appsmith community for the public to view, fork, and remix.",
      publishBtn: () => $t('messages.0c9b1207fad07aa6'),
    },
    publishedInfo: {
      title: () => "Live on Appsmith community!",
      description: () =>
        $t('messages.6aba341ea394a3ea'),
      viewTemplate: () => $t('messages.3035f172de4d9a56'),
    },
  },
};

// Interim data state info
export const EMPTY_TABLE_TITLE_TEXT = () => $t('messages.110dbd695d45894b');
export const EMPTY_TABLE_MESSAGE_TEXT = () =>
  $t('messages.a07e3263ff394854');
export const NO_COLUMNS_MESSAGE_TEXT = () => $t('messages.9dde267fc7947dd5');
export const LOADING_RECORDS_TITLE_TEXT = () => $t('messages.b7c1e330bbe03127');
export const LOADING_RECORDS_MESSAGE_TEXT = () => $t('messages.cfff2e7e356b1d1c');
export const FAILED_RECORDS_TITLE_TEXT = () => $t('messages.b55bb22403deac65');
export const FAILED_RECORDS_MESSAGE_TEXT = () =>
  $t('messages.e8d3bec2f66d8536');

export const DATA_PANE_TITLE = () => $t('messages.2e4b105d25ce7c15');
export const DATASOURCE_LIST_BLANK_DESCRIPTION = () =>
  $t('messages.ecf6b4d5f25e701e');
export const DATASOURCE_BLANK_STATE_MESSAGE = () => $t('messages.954a2ddea6d6db47');

// Create New Apps Intermediary step
export const CREATE_NEW_APPS_STEP_TITLE = () => $t('messages.8426445fff1f0bd9');
export const CREATE_NEW_APPS_STEP_SUBTITLE = () =>
  $t('messages.7fddf9ebb9349c4f');
export const START_FROM_TEMPLATE_TITLE = () => $t('messages.adf6675265d34f5a');
export const START_FROM_TEMPLATE_SUBTITLE = () =>
  $t('messages.50e8930d234f68c3');
export const START_FROM_SCRATCH_TITLE = () => $t('messages.3ac045321d3fa523');
export const START_FROM_SCRATCH_SUBTITLE = () =>
  $t('messages.286c65882ee4d3f2');
export const START_WITH_DATA_TITLE = () => $t('messages.bfbb18e3f9a46dea');
export const START_WITH_DATA_SUBTITLE = () =>
  $t('messages.c87588a4f28443ea');
export const START_WITH_DATA_CONNECT_HEADING = () => $t('messages.66a20984949d5e43');
export const START_WITH_DATA_CONNECT_SUBHEADING = () =>
  $t('messages.4ccbc2d336e1dc4f');
export const START_WITH_TEMPLATE_CONNECT_HEADING = () => $t('messages.f7391e65da8314b1');
export const START_WITH_TEMPLATE_CONNECT_SUBHEADING = () =>
  $t('messages.0d35d04f8263d5ce');

export const EDITOR_PANE_TEXTS = {
  queries_tab: () => $t('messages.14ee8d1e2a6a512c'),
  js_tab: () => "JS",
  ui_tab: () => "UI",
  query_blank_state: () => $t('messages.a713d5e48ab00502'),
  js_blank_state: () => $t('messages.e80803858c99c4bd'),
  query_blank_state_description: () =>
    $t('messages.d77b0fbb21df9750'),
  js_blank_state_description: () =>
    $t('messages.0eb395533e6b274f'),
  widget_blank_state_description: () =>
    $t('messages.8b49a25ec3da145c'),
  query_add_button: () => $t('messages.ae963ff5c86ff8db'),
  js_add_button: () => $t('messages.bf2494c7d7e9a014'),
  js_blank_object_item: () => $t('messages.7b180daf65364bc7'),
  widget_add_button: () => $t('messages.4f5d27e2f3227c7d'),
  query_create_tab_title: () => $t('messages.4b764a58312e66aa'),
  widgets_create_tab_title: () => $t('messages.bfeead1a8fe6ff0e'),
  js_create_tab_title: () => $t('messages.bb8a52b860c1a53e'),
  js_create_modules: () => $t('messages.15c64f72bdd17c1d'),
  queries_create_from_existing: () => $t('messages.24400b249ef5a91d'),
  queries_create_new: () => $t('messages.9f7e8800a993d89d'),
  queries_create_modules: () => $t('messages.767ff71df97a8088'),
  loading_building_blocks: () => $t('messages.573eb8e4fcad161e'),
  empty_search_result: (type: string) => $t('messages.15fa970b25289a48', {type: type}),
  search_objects: {
    jsObject: () => $t('messages.0af90c231af60143'),
    queries: () => "queries",
    datasources: () => "datasources",
  },
};

export const PARTIAL_IMPORT_EXPORT = {
  export: {
    modalHeading: () => $t('messages.9c3e93ed4cbd8988'),
    modalSubHeading: () => $t('messages.a3b9ab4959e1d630'),
    cta: () => $t('messages.1d2b573f69dda65c'),
    sections: {
      jsObjects: () => $t('messages.04be6d18656393d5'),
      databases: () => $t('messages.32b117f81759a679'),
      queries: () => $t('messages.14ee8d1e2a6a512c'),
      customLibs: () => $t('messages.f9b6a6d291fd8b78'),
      widgets: () => $t('messages.b203819586adb3d7'),
    },
  },
  import: {
    modalHeading: () => $t('messages.a01bd582dfd543f8'),
    modalSubheading: () => $t('messages.5a30f4b35e352ecc'),
  },
};

export const DATASOURCE_SECURELY_TITLE = () => $t('messages.df310d24f521f94c');

export const CUSTOM_WIDGET_FEATURE = {
  addEvent: {
    addCTA: () => $t('messages.4746df89a7b0624f'),
    cancelCTA: () => $t('messages.745450bf893892a4'),
    addEventCTA: () => $t('messages.ad264e2098c2c6e7'),
    nameLabel: () => $t('messages.59b987976ebf281f'),
    errors: {
      restricted: () => $t('messages.76778b177cf82657'),
      duplicate: () => $t('messages.9c55505b54feb513'),
    },
  },
  editSource: {
    editSourceCTA: () => $t('messages.cc4389fce6c059ea'),
    goToSourceCTA: () => $t('messages.aaf721670179c288'),
  },
  builder: {
    header: () => $t('messages.32dbc74bb4704e84'),
    close: () => $t('messages.f9b4fd1f8625365f'),
    connectionLost: () =>
      $t('messages.48e95729f757d197'),
    editor: {
      css: {
        contextTooltipScss: () => $t('messages.755ba9cb0acb8671'),
        contextTooltipVariables: () => $t('messages.4dee26177bdc5508'),
        placeholder: () =>
          "/* you can access string and number properties of your model using `var(--appsmith-model-<property-name>)`*/",
      },
      html: {
        placeholder: () =>
          "<!-- no need to write html, head, body tags, it is handled by the widget -->",
      },
      js: {
        placeholder: () =>
          "// no need to write window onLoad, it is handled by the widget",
      },
    },
  },
  templateKey: {
    blank: () => $t('messages.91b1a0dbe63a9254'),
    vanillaJs: () => $t('messages.8631b72e647a5212'),
    react: () => $t('messages.0260b510803d72f3'),
    vue: () => "Vue",
  },
  template: {
    modal: {
      header: () => $t('messages.94920b8e6194aa6c'),
      body: () =>
        $t('messages.a1e329d9a92e68fb'),
      successCTA: () => $t('messages.788f8b65d0e9841b'),
      cancelCTA: () => $t('messages.745450bf893892a4'),
    },
    buttonCTA: () => $t('messages.d2786a2052487cbb'),
    revert: () => $t('messages.7fc008df7bce1fcb'),
  },
  layout: {
    tab: () => $t('messages.a1261145df9d3d53'),
    split: () => $t('messages.5f0ec9ed360f413d'),
  },
  referrences: {
    title: () => $t('messages.c5a67e858ca437cc'),
    tooltip: {
      open: () => $t('messages.f7cddfeffbe9c70f'),
      close: () => $t('messages.9d705b70ce7aea87'),
    },
    liveModel: {
      helpMessage: [
        () => "- Use `appsmith.model` to access your model in javascript",
        () =>
          "- Use `appsmith.updateModel()` to update your model from javascript",
      ],
      label: () => $t('messages.bf022fc16f28b846'),
    },
    events: {
      helpMessage: [
        () =>
          "- Use `appsmith.triggerEvent(&lt;EVENT_NAME&gt;)` to trigger an event",
        () =>
          "- `appsmith.triggerEvent()` also accepts context data as second arg",
      ],
      label: () => $t('messages.58bc34e4fe3e3049'),
      emptyMessage: () =>
        $t('messages.9e40e78b4cac7a62'),
    },
    help: {
      message: () =>
        $t('messages.2551d2e9668fa7ca'),
      buttonCTA: () => $t('messages.9233028ff03baee1'),
    },
  },
  debugger: {
    title: () => $t('messages.9f3cbe3a59504af0'),
    emptyMessage: () => $t('messages.c3ff9894818832fc'),
    helpDropdown: {
      stackoverflow: () => $t('messages.fe89ac3f43c17ceb'),
    },
    noOnReadyWarning: (url: string) =>
      `Missing appsmith.onReady() function call. Initiate your component inside 'appsmith.onReady()' for your custom widget to work as expected. For more information - ${url}`,
  },
  preview: {
    eventFired: () => $t('messages.1288030cae14376a'),
    modelUpdated: () => $t('messages.2bd7639b26a2a0ee'),
  },
};

export const WIDGET_PANEL_EMPTY_MESSAGE = () =>
  $t('messages.06cd3dadf9a19316');

export const UI_ELEMENT_PANEL_SEARCH_TEXT = () => $t('messages.ee46c3dc8460f3f9');

export const HTTP_PROTOCOL_INPUT_PLACEHOLDER = () => $t('messages.1cfd8a10ad2b6d1b');

export const ADD_PAGE_FROM_TEMPLATE_MODAL = {
  title: () => $t('messages.0fead34f2fc94e80'),
  buildingBlocksTitle: () => $t('messages.0fec96cd1b230d93'),
};

export const HEADER_TITLES = {
  DATA: () => $t('messages.f1732cfc9a4c1ca6'),
  EDITOR: () => $t('messages.b5b7451fae100d39'),
  SETTINGS: () => $t('messages.172afc00246949ec'),
  LIBRARIES: () => $t('messages.23b499dbf13456df'),
};

export const PASTE_FAILED = (str: string): string => $t('messages.3c3f42992c85bdbc', {str: str});

export const CREATE_A_NEW_ITEM = (item: string) => $t('messages.9b55a736af47b102', {item: item});

export const MAXIMIZE_BUTTON_TOOLTIP = () =>
  $t('messages.85ae804fc3a0fe78');
export const MINIMIZE_BUTTON_TOOLTIP = () => $t('messages.90ea5e4fb8724fee');
export const SPLITPANE_ANNOUNCEMENT = {
  TITLE: () => $t('messages.869be9a2ab32a891'),
  DESCRIPTION: () =>
    $t('messages.b8a7aa1d2f3eee0c'),
};

export const CANVAS_VIEW_MODE_TOOLTIP = (shortcutKey: string) =>
  `💡 ${shortcutKey} click a widget to navigate to UI mode.`;

export const EMPTY_CANVAS_HINTS = {
  DRAG_DROP_WIDGET_HINT: () => $t('messages.af2dd0ca88bad1d6'),
  DRAG_DROP_BUILDING_BLOCK_HINT: {
    TITLE: () => $t('messages.b0281f761fa821ae'),
    DESCRIPTION: () => $t('messages.f1129c26deeabbfb'),
  },
};

export const BETA_TAG = () => $t('messages.d2e57790b076c3ea');

export const BUTTON_WIDGET_DEFAULT_LABEL = () => $t('messages.2171bfc4fac5982b');

export const PAGE_ENTITY_NAME = $t('messages.8c0ead54d0b04a14');

export const EMPTY_DATASOURCE_TOOLTIP_SIDEBUTTON = () =>
  $t('messages.8eaca8d3a8d656e7');

export const FIELD_REQUIRED_MESSAGE = () => $t('messages.f713bda228ebc991');

export const PREPARED_STATEMENT_WARNING = {
  MESSAGE: () =>
    $t('messages.1f7c90b2416092df'),
  LINK: () => $t('messages.7648395e506c50b7'),
};

export const JS_EDITOR_SETTINGS = {
  TITLE: () => $t('messages.172afc00246949ec'),
  ON_LOAD_TITLE: () => $t('messages.103fd994a54276e3'),
};
