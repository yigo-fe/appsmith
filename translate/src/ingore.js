// 路径中包含下列路径的将会忽略
const folders = [
    '/__tests__/',
    '/tests/',
    '/api/',
    '/sql/',
    '/mockData/',
]

// 下列路径的文件将会忽略，这段路径请去掉（app/client/src）
const files = [
    '/constants/WidgetValidation.ts',
	'/ce/utils/analyticsUtilTypes.ts',
	'/ce/RouteBuilder.ts',
	'/constants/routes/baseRoutes.ts',
	'/ce/constants/ApiConstants.tsx',
	'/pages/Templates/test_config.ts',
	'/components/editorComponents/PartialImportExport/PartialExportModal/unitTestUtils.ts',
	'/layoutSystems/autolayout/utils/testData.ts',
	'/workers/Evaluation/domApis.ts',
	'/ce/pages/Editor/IDE/EditorPane/Query/hooks.tsx',
	'/entities/Action/index.ts',
	'/utils/testDSLs.ts',
	'/sagas/WidgetSelectUtils.ts',
	'/pages/Editor/Explorer/mockTestData.ts',
	'/ce/reducers/uiReducers/editorContextReducer.ts',
	'/components/editorComponents/CodeEditor/utils/keyboardShortcutConstants.ts',
	'/components/editorComponents/WidgetQueryGeneratorForm/constants.ts',
	'/constants/Fonts.tsx',
	'/constants/ThemeConstants.tsx',
	'/pages/Editor/Explorer/Libraries/recommendedLibraries.ts',
	'/pages/Editor/IDE/Layout/constants.ts',
	'/PluginActionEditor/components/PluginActionResponse/utils/formatBytes.ts',
	'/plugins/Linting/utils/getLintingErrors.ts',
	'/modules/ui-builder/ui/wds/WDSTableWidget/constants/data.ts',
	'/widgets/FilepickerWidget/widget/FileDataTypes.ts',
]

/**
 * 要忽略的内容，即text字段中的内容不做翻译处理
 * file 是指定的文件，不指定则为全局的
 * text 要过滤的内容
 */
const texts = [
	{
		file: '',
		text: [/(className|path)\s*(=|:)\s*(("(\w|\s|\-)+")|(\{.*\})|(\`.*\`))/g]
	},
	{
		file: '',
		text: [/(export const CUSTOM_CHART_TYPES = \[(\s|\r|\n)*("\w+"(,|\s|\r|\n)*)+\])/g]
	},
	{
		file: '',
		text: [/((dependencies):\s*\["\w+"\],?)/g]
	},
	// "Phone number": "(555) 123-4567",
    {
        file: '',
        text: [/(\s|\n)("|')(\w|\s)+("|'):/g],
    },
	// <Tab key="Debugger" value="Debugger">
	// entityId="Pages"
    {
        file: '',
        text: [/\s(key|value|entityId)=("|')(\w|\s)+("|')/g],
    },
	// <Tabs value={"Debugger"}></Tabs>
    {
        file: '',
        text: [/\s(key|value|entityId|rel)=\{("|')(\w|\s)+("|')\}/g],
    },
	// key={entity.name || "Queries"}
    {
        file: '',
        text: [/(\s|\n)key=\{(\w|\.|\s|\||"|')+\}/g],
    },
	// ["REST API", "Authenticated GraphQL API"].includes()
    {
        file: '',
        text: [/\[(("|')(\w|\s)+("|')\s*,?\s*)+\]\.includes/g],
    },
	// 如: actionType: "Query",
    {
        file: '',
        text: [/((key|url|value|symbol_native|code|currency|type|propertyName|controlType|DATASOURCE|defaultValue|defaultTab|widgetName|actionType):\s*"(\w|\s)+",?)/g],
    },
	// if ("Cypress" in window) {
    {
        file: '',
        text: [/\(\s*("|')\w+("|')\s+in\s+(\w|\.)+\s*\)/g],
    },
	// if ((error as Error)?.message?.includes("Auth fail")) {
    {
        file: '',
        text: [/\.includes\(("|')(\w|\s|:)+("|')\)/g],
    },
	/**
	 * debug(
          "Tern: updateDef for customDataTree took",
          (performance.now() - start).toFixed(),
          "ms",
        );

		throw Error("Ide focus strategy not defined");
	 */
    {
        file: '',
        text: [/(debug|Error)\(\s*("|')(\w|\s|:)+("|')/g],
    },
	// throw Error(`Cannot find url of plugin type ${item.type}`);
    {
        file: '',
        text: [/Error\(\s*`(\w|\s|:|\$|\{|\}|\.)+`/g],
    },
	/**
	 * 
		window.console.log(
          "Feature flag override values set to: ",
          featureFlagValues,
        );

		loglevel.error("Error getting cache result:", error);
	 */
    {
        file: '',
        text: [/(console|loglevel)\.(log|error|info)\(\s*("|')(\w|\s|:|\.)+("|')/g],
    },
	/**
	 * console.error(
                e,
                "Error parsing column value: ",
                column.computedValue,
              );
	 */
    {
        file: '',
        text: [/console.error\(\s*\w+\s*,\s*("|')(\w|\s|:)+("|')/g],
    },
	// throw "Not an ESM module"
    {
        file: '',
        text: [/throw\s+("|')(\w|\s|\.|-)+("|')/g],
    },
	// type: "ISO 8601 date string",
    {
        file: '',
        text: [/(('|")ISO (\w|\s)+('|"))/g],
    },
	// <string, TreeNode>
    {
        file: '',
        text: [/(<\w+\s*,\s*\w+\s*>)/g],
    },
	// export interface ReduxActionWithPromise<T> extends ReduxAction<T> {
    {
        file: '',
        text: [/(<(T|S|E|M|,|\s)+>(\w|\s)+<(T|S|E|M|,|\s)+>)/g],
    },
	// case 语句
	{
		file: '',
		text: [/(^case\s*("|')\w+("|')\s*:)|(\s+case\s*("|')\w+("|')\s*:)/g],
	},
	// 去掉等号判断类型，if (e.key === "Backspace" && !query)
	{
		file: '',
		text: [/==(=?)\s*('|")(\w|\s|\.|\-)+('|")/g],
	},
	// 去掉对象取值,如 aaa['abc']
	{
		file: '',
		text: [/\w+\[\s*("|'|`)(\w|\s|\.|\-)+("|'|`)\s*\]/g],
	},
	// {column.render("Header")}
	{
		file: '',
		text: [/\.render\(("|')\w+("|')\)/g],
	},
	// id: "Sample data",  id="Sample data",
	{
		file: '',
		text: [/(\s|\n)id\s*(:|=)\s*('|")(\w|\s)+('|")/g],
	},
	// font-family: "Twemoji Country Flags";   fontFamily: "System Default",
	{
		file: '',
		text: [/((font-family)|(fontFamily)):\s*"(\w|\s)+"/g],
	},
	{
		file: '',
		text: [/fontFamily:\s*string\s*=\s*("|')(\w|\s)+("|')/g],
	},
	// border: `${resizeBorder}px solid`,
	{
		file: '',
		text: [/(border|padding)\s*:\s*`(\$|\{|\}|\w|\s)+`/g],
	},
	// e.code.includes("Numpad")
	// const plugin = uppy.getPlugin("Dashboard") as Dashboard;
	{
		file: '',
		text: [/\.(includes|getPlugin)\(('|")\w+('|")\)/g],
	},
	// flex: `${column.width} 0 auto`,
	{
		file: '',
		text: [/flex\s*:\s*`\$\{(\w|\.)+\}\s+\w*\s*\w*`,/g],
	},
    {
        file: 'app/client/src/ce/constants/messages.ts',
        text: ['entityType === "Application"'],
    },
    {
        file: 'app/client/src/ce/pages/Editor/Explorer/Entity/getEntityProperties.ts',
        text: ['properties[action.name + "()"] = "Function"', 'value = "Function"'],
    },
    {
        file: 'app/client/src/ce/sagas/ApplicationSagas.tsx',
        text: ['["Queries/JS"]: true,'],
    },
    {
        file: 'app/client/src/ce/sagas/PageSagas.tsx',
        text: ['resourceType: "Page",'],
    },
    {
        file: 'app/client/src/ce/entities/IDE/constants.ts',
        text: ['None: "None",'],
    },
    {
        file: 'app/client/src/ce/selectors/entitiesSelector.ts',
        text: ['API = "APIs",', 'AI = "AI Queries",', '? "APIs"', '? "AI Queries"'],
    },
    {
        file: 'app/client/src/ce/workers/Evaluation/evaluationUtils.ts',
        text: ['return "Function call"'],
    },
    {
        file: 'app/client/src/components/editorComponents/ActionCreator/helpers.tsx',
        text: ['value: "Modal",'],
    },
    {
        file: 'app/client/src/components/editorComponents/CodeEditor/generateQuickCommands.tsx',
        text: ['actionType: plugin?.type === PluginType.DB ? "Query" : "API"'],
    },
    {
        file: 'app/client/src/components/editorComponents/CodeEditor/index.tsx',
        text: ['options.extraKeys["Tab"]', 'key === "Enter"', 'event.code === "Backspace"'],
    },
    {
        file: 'app/client/src/components/editorComponents/GlobalSearch/GlobalSearchHotKeys.tsx',
        text: [/group:\s*("|')\w+("|')\s*,/g],
    },
    {
        file: 'app/client/src/components/editorComponents/GlobalSearch/utils.tsx',
        text: ['{modText()} {shiftText()} {isMacOrIOS() ? "+" : "Plus"}', /(ACTION|WIDGET|JSACTION):\s*"(\w|\s)+"/g],
    },
    {
        file: 'app/client/src/components/editorComponents/WidgetQueryGeneratorForm/CommonControls/DatasourceDropdown/useSource/useConnectToOptions.tsx',
        text: [/entityBound:\s*("|')(\w|\s)+("|'),/g],
    },
    {
        file: 'app/client/src/components/editorComponents/WidgetQueryGeneratorForm/CommonControls/DatasourceDropdown/useSource/useOtherOptions.tsx',
        text: [/selectedAction\s*:\s*("|')(\w|\s|\-|\.)+("|')/g],
    },
    {
        file: 'app/client/src/components/formControls/KeyValueArrayControl.tsx',
        text: ['`Key ${index + 1}`', '`Value ${index + 1}`', '`Value (optional)`'],
    },
    {
        file: 'app/client/src/components/propertyControls/FieldConfigurationControl.tsx',
        text: [/placeholder="{\s*name:\s*('|")John('|")\s*,\s*dataType:\s*('|")string('|")\s*}"/g],
    },
    {
        file: 'app/client/src/constants/Datasource.ts',
        text: [/NOSQL_PLUGINS_DEFAULT_TEMPLATE_TYPE\s*=\s*('|")(\w|\s|\-|\.)+('|")/g],
    },
    {
        file: 'app/client/src/constants/WidgetConstants.tsx',
        text: ['"Building Blocks"'],
    },
    {
        file: 'app/client/src/constants/AppsmithActionConstants/ActionConstants.tsx',
        text: ['"Swagger"'],
    },
    {
        file: 'app/client/src/layoutSystems/common/dropTarget/unitTestUtils.ts',
        text: [/functions:\s*\[("|')\w+("|')\]/g],
    },
    {
        file: 'app/client/src/modules/ui-builder/ui/wds/WDSTableWidget/config/propertyPaneConfig/PanelConfig/Data.ts',
        text: ["Epoch", "Milliseconds"],
    },
    {
        file: 'app/client/src/widgets/TableWidget/widget/propertyConfig.ts',
        text: ["Epoch", "Milliseconds"],
    },
    {
        file: 'app/client/src/pages/setup/constants.ts',
        text: [/((value):\s*"(\w|\s)+",?)/g],
    },
    {
        file: 'app/client/src/workers/Evaluation/validations.ts',
        text: ['return "Array";'],
    },
	{
        file: 'app/client/src/widgets/TableWidgetV2/widget/reactTableUtils/fixtures.ts',
        text: [/((lll):\s*"(\w|\s|:|,)+",?)/g],
    },
	{
        file: 'app/client/src/widgets/JSONFormWidget/component/Field.tsx',
        text: ['setValue(name, klonaRegularWithTelemetry(defaultValue, "Field"))'],
    },
]

// 匹配到下列内容，将会忽略，需是正则表达式
const matchContents = [
    /(YYYY)|(MM)|(DD)/,
	/^(WHERE \? LIKE \?)|(SELECT \* FROM \?)|(ORDER BY)|(OFFSET \? ROWS)|(FETCH NEXT \? ROWS ONLY)|(LIMIT \?)|(OFFSET \\?)|(OFFSET \?)$/,
	/SELECT COUNT\(\*\) from/,
	/\d(px) solid/,
	/Counterclockwise/,
	/InverseMSColumn2D/,
	/DatasourceDBForm/,
	/Configurations/,
	/Container(\d)Copy/,
	/Elasticsearch/,
	/Liechtenstein/,
	/Administrator/,
	/InverseMSArea/,
	/InverseMSLine/,
	/LogMSColumn2D/,
	/Massachusetts/,
	/Turkmenistan/,
	/Canvas(\d+)Copy/,
	/Pennsylvania/,
	/Canvas(\d+)Copy/,
	/QRGenerator/,
	/Branchname/,
	/PostgreSQL/,
	/Montserrat/,
	/^(Chrome|Opera|Object|Promise|Javascript|Canvas|Base64|Binary)$/,
	/LIB\//,
	/base64/,
	/Text(\d+)Copy(\d+)/,
	/HH:mm:ss/,
	/(Option|Select|Product|Location|Container|Table|Modal|Image|Page)\d+/,
	/\/:/,
	/\/v1\//,
	/\{id\}_(success|failure)_/,
	/File\-\$\{index \+ fileCount\}/,
	/WHERE \$\d ilike \$\d/,
	/Ctrl|Alt|Shift/,
	/Function\(\s*\)/,
	/^(Lt)|(Rp)|(Ft)|(Br)|(Bs)|(Fry)|(Cap)|(One)|(Hug)|(Edg)|(TSh)|(Api)|(Vue)|(Boil)|(Bake)|(Tall)|(Good)|(Ascending)|(Descending)|(JSEditor)|(JSONForm)|(Markdown)|(MSArea)|(Google)|(Github)|(App)$/,
]

module.exports = {
    files,
    folders,
    matchContents,
    texts
  };