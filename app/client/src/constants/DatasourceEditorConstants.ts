import {$t} from "locale/index";
export const DATASOURCE_CONSTANT = "DATASOURCE";
export const APPSMITH_IP_ADDRESSES = ["18.223.74.85", "3.131.104.27"];
export const PRIMARY_KEY = $t('DatasourceEditorConstants.96909fc5095ebadb');
export const FOREIGN_KEY = $t('DatasourceEditorConstants.4ada6e86e4232a14');

/* NOTE: This is a default formData value, 
required to fix the missing config for an existing mongo query */
export const MongoDefaultActionConfig = {
  actionConfiguration: {
    formData: {
      aggregate: {
        limit: {
          data: "10",
        },
        arrayPipelines: {
          data: "",
        },
      },
      delete: {
        limit: {
          data: "SINGLE",
        },
        query: {
          data: "",
        },
      },
      updateMany: {
        limit: {
          data: "SINGLE",
        },
        query: {
          data: "",
        },
        update: {
          data: "",
        },
      },
      smartSubstitution: {
        data: true,
      },
      collection: {
        data: "",
      },
      find: {
        skip: {
          data: "",
        },
        query: {
          data: "",
        },
        sort: {
          data: "",
        },
        limit: {
          data: "",
        },
        projection: {
          data: "",
        },
      },
      insert: {
        documents: {
          data: "",
        },
      },
      count: {
        query: {
          data: "",
        },
      },
      distinct: {
        query: {
          data: "",
        },
        key: {
          data: "",
        },
      },
    },
  },
};

export enum VIEW_MODE_TABS {
  VIEW_DATA = "VIEW_DATA",
  CONFIGURATIONS = "CONFIGURATIONS",
}

export const MAX_DATASOURCE_SUGGESTIONS = 3;
