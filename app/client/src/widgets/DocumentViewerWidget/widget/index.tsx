import {$t} from "locale/index";
import type { ValidationResponse } from "constants/WidgetValidation";
import { ValidationTypes } from "constants/WidgetValidation";
import React from "react";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import DocumentViewerComponent from "../component";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import type { SetterConfig } from "entities/AppTheming";
import {
  FlexVerticalAlignment,
  ResponsiveBehavior,
} from "layoutSystems/common/utils/constants";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";

import { isAirgapped } from "ee/utils/airgapHelpers";
import { WIDGET_TAGS } from "constants/WidgetConstants";

const isAirgappedInstance = isAirgapped();

export function documentUrlValidation(value: unknown): ValidationResponse {
  // applied validations if value exist
  if (value) {
    const whiteSpaceRegex = /\s/g;
    const urlRegex =
      /(?:https:\/\/|www)?([\da-z.-]+)\.([a-z.]{2,6})[/\w .-]*\/?/;
    const base64Regex =
      /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;

    if (
      urlRegex.test(value as string) &&
      !whiteSpaceRegex.test(value as string)
    ) {
      if ((value as string).startsWith("www")) {
        return {
          isValid: true,
          parsed: "https://" + value,
        };
      }

      try {
        const newUrl = new URL(value as string);

        // URL is valid
        return {
          isValid: true,
          parsed: newUrl.href,
        };
      } catch (error) {
        return {
          isValid: false,
          parsed: "",
          messages: [
            {
              name: "ValidationError",
              message: $t('index.d28017e2eb3ea8ac'),
            },
          ],
        };
      }
    } else if (base64Regex.test(value as string)) {
      // base 64 is valid
      return {
        isValid: true,
        parsed: value,
      };
    } else {
      // value is not valid URL / Base64
      return {
        isValid: false,
        parsed: "",
        messages: [
          {
            name: "ValidationError",
            message: $t('index.d28017e2eb3ea8ac'),
          },
        ],
      };
    }
  }

  // value is empty here
  return {
    isValid: true,
    parsed: "",
    messages: [{ name: "", message: "" }],
  };
}

class DocumentViewerWidget extends BaseWidget<
  DocumentViewerWidgetProps,
  WidgetState
> {
  static type = "DOCUMENT_VIEWER_WIDGET";

  static getConfig() {
    return {
      name: $t('index.12e3db4ddd8db627'), // The display name which will be made in uppercase and show in the widgets panel ( can have spaces )
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.MEDIA],
      needsMeta: false, // Defines if this widget adds any meta properties
      isCanvas: false, // Defines if this widget has a canvas within in which we can drop other widgets
      searchTags: ["pdf"],
    };
  }

  static getDefaults() {
    return {
      widgetName: "DocumentViewer",
      docUrl: !isAirgappedInstance
        ? "https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf"
        : "",
      rows: 40,
      columns: 24,
      version: 1,
      animateLoading: true,
      responsiveBehavior: ResponsiveBehavior.Fill,
      flexVerticalAlignment: FlexVerticalAlignment.Top,
    };
  }

  static getAutoLayoutConfig() {
    return {
      widgetSize: [
        {
          viewportMinWidth: 0,
          configuration: () => {
            return {
              minWidth: "280px",
              minHeight: "280px",
            };
          },
        },
      ],
    };
  }

  static getAnvilConfig(): AnvilConfig | null {
    return {
      isLargeWidget: false,
      widgetSize: {
        maxHeight: {},
        maxWidth: {},
        minHeight: { base: "280px" },
        minWidth: { base: "280px" },
      },
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.968c02dad7db861c'),
        children: [
          {
            helpText:
              "Preview document URL supports txt, pdf, docx, ppt, pptx, xlsx file formats, but base64 ppt/pptx are not supported.",
            propertyName: "docUrl",
            label: $t('index.55981c1c22d92288'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.5e03558e42631bb0'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.FUNCTION,
              params: {
                fn: documentUrlValidation,
                expected: {
                  type: $t('index.5e03558e42631bb0'),
                  example: "https://www.example.com",
                  autocompleteDataType: AutocompleteDataType.STRING,
                },
              },
            },
          },
        ],
      },
      {
        sectionName: $t('index.bc6fbc3e1b0f97a9'),
        children: [
          {
            helpText: $t('index.3bc55e5cd21672e2'),
            propertyName: "isVisible",
            label: $t('index.b62a94b6e9c9b221'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.7259384e87d01c3b'),
            controlType: "SWITCH",
            helpText: $t('index.b74158bd7370adc2'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
    ];
  }

  static getSetterConfig(): SetterConfig {
    return {
      __setters: {
        setVisibility: {
          path: "isVisible",
          type: "boolean",
        },
        setURL: {
          path: "docUrl",
          type: "string",
        },
      },
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc": $t('index.8b8a1c69c76e6d0d'),
      "!url": "https://docs.appsmith.com/reference/widgets/document-viewer",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      docUrl: "string",
    };
  }

  getWidgetView() {
    return <DocumentViewerComponent docUrl={this.props.docUrl} />;
  }
}

export interface DocumentViewerWidgetProps extends WidgetProps {
  docUrl: string;
}

export default DocumentViewerWidget;
