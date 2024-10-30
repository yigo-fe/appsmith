/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const xlsx = require('xlsx')
const Replace = require('./replace')
const Translate = require('./translate')
const Ignore = require('./ingore')
const { strict } = require('assert')
const translate = new Translate.translate({
	appid: '20240827002134073',
	secret: 'SQNwd8J6JQ79yma8hYR6'
	// appid: '20240827002133754',
	// secret: 'a9uorje9NSY8o0YnS5HH'
	// appid: '20240806002117333',
	// secret: 'Ls8PLVdvGkar7cK8jiw8'
})

const args = process.argv
const project = args[2] || 'app/client'
const projectName = args[3] || 'appsmith'
const directory = args[4] || 'src'

const allExistUuid = {}

// 忽略的文件
let ignoreFiles = Ignore.files

// 忽略的文件夹
const ignoreFoldersReg = Ignore.folders.map(item => new RegExp(item))

// 忽略匹配到的特定格式的字符串
const ignoreMatchTextRegs = Ignore.matchContents

// 忽略内容
const ignoreTexts = Ignore.texts

// let specialFiles = [
// 	'/ce/constants/messages.ts'
// ]

const fuhao = `\\-|\\*|\\/|\\.|:|\\!|\\?|\\s|,|\\~|\\≠|\\+|\\(|\\)|&|\\$|\\{|\\}`
const yinHao = `'|"|\``
const removeFileContentReg = [
	// 去掉注释
	{ reg: `(\\/\\*[\\s\\S.]*?\\*\\/)|(\\/\\/[\\s\\S.]*?\\n)|(<!--[\\s\\S.]*?-->)`, content: '' },
	// 去掉标签中的字符串模版
	// { reg: `(>\\s*\\n?\\s*\\{\\{\\s*(\\w|\\.|\\s|\\&)+\\s*\\}\\}\\s*(\\w|\\/)*\\s*\\n?\\s*<)`, content: '><' },
	// 去掉已翻译内容
	{ reg: `(\\$t\\('\\w+',?\\s*(\\{(\\w|:|,|\\.|\\s)+\\})?\\))`, content: '' },
	// ) => Array<PropertyUpdates>;
	{ reg: `(\\s*=>(\\s|\\r)*(\\w|${fuhao})+(\\s|\\r)*<)`, content: '' },
	
]



// ${department.name}
const templateReg = `\\$\\{(\\s|\\r)*(\\w|\\.)+(\\s|\\r)*\\}`
const spaceAndBreakReg = `(\\s|\\r)`
const textMatchReg = [

	// 单引号开头，包裹双引号，无其他特殊字符
	`((?=.*")'\\s*[A-Z](\\w|"|\\s)+')`,
	`((?=.*')"\\s*[A-Z](\\w|'|\\s)+")`,
	// 仅匹配大写开头的英文，单引号包裹
	`('\\s*[A-Z](\\w|${fuhao}|")+')`,
	// 仅匹配大写开头的英文，双引号包裹
	`("\\s*[A-Z](\\w|${fuhao}|')+")`,
	// 仅匹配大写开头的英文，模版字符串符号包裹
	`(\`(\\s|\\r)*[A-Z](\\w|${fuhao}|'|"|\\r)+(\\s|\\r)*\`)`,
	// `${name} is already being used.`;
	`(\`${spaceAndBreakReg}*((${templateReg})${spaceAndBreakReg}*)+(\\w|${fuhao}|'|"|\\r)+${spaceAndBreakReg}*\`)`,
	`('(\\w+\\s)+\\w+')`,
	`("(\\w+\\s)+\\w+")`,
]

// 以下是特殊语句匹配
const specialMatchReg = [
	// helpText: "when a date is selected in the calendar",
	{reg: `(helpText: "(\\w|\\s)+")`, replace: 'helpText: '},
	// {reg: `((symbol_native|code|currency|sectionName|propertyName|controlType|DATASOURCE|widgetName):\\s*"\\w+",?)`, replace: ''},
	// {reg: `((dependencies):\\s*\\["\\w+"\\],?)`, replace: ''},
]

const specialChar = [
	{char: '’', code: '_____danYinHao_____'},
	{char: 'α', code: '_____aErFa_____'},
]

function convertFilesPath(folder, files){
	for(let i=0; i<files.length; i++){
		files[i] = path.join(folder, files[i])
	}
}

async function run(){
	
	if(!project || !projectName){
		console.error('请输入要扫描的项目文件夹名称和excel上的项目名称，命令如：npm run pro-lowcode-runtime-front runtime')
		return
	}
	const existTranslateObj = await getExistTranslate()
	const scanPath = path.resolve(__dirname, `../../${project}/${directory}`)
	convertFilesPath(scanPath, ignoreFiles)
	// convertFilesPath(scanPath, specialFiles)
	const fileList = getFileList(scanPath)
	
	const scanRes = scanAllText(fileList)
	const allText = scanRes.text
	// console.log('scanRes=',scanRes)
	// return
	// allText.length = 20
	const textPathObj = scanRes.path

	let transDataList = []
	const allNoReplaceList = []
	const noTranslateList = []
	if(allText.length > 0){
		for(const text of allText){
			let zh = ''
			let ja = ''
			const tanslateText = text.replace(/\n/g, ' ')
			console.log('执行翻译中=', tanslateText)
			try{
				// zh = await translate(tanslateText, {from: 'en', to: 'zh'})
				// ja = await translate(tanslateText, {from: 'en', to: 'jp'})
			}catch(e){
				console.log('翻译异常', e)
			}
			
			const item = {
				// '项目名称': projectName,
				'zh-CN（中文）': zh,
				'en-US (英文）': text,
				'ja-JP（日文）': ja
			}

			// 翻译一个词条就写一次文件，避免程序中断，已翻译数据丢失
			const isReplaced = Replace.runItem(item, textPathObj, allExistUuid)
			if(isReplaced){
				if(!zh || !ja){
					noTranslateList.push(item)
				}else{
					transDataList.push(item)
				}
			}else{
				allNoReplaceList.push(item)
			}
			const excelTransList = []
			getAllTranslateList([].concat(transDataList, noTranslateList), existTranslateObj, excelTransList, projectName)
			
			writeExcel(excelTransList)
			if(allNoReplaceList.length > 0){
				const noReplaceExcelList = []
				getTranslateListForExcel(allNoReplaceList, projectName, noReplaceExcelList)
				writeExcel(noReplaceExcelList, '未替换成功')
			}
			if(noTranslateList.length > 0){
				writeFile(path.resolve(__dirname, '../local/未翻译.json'), noTranslateList)
			}
		}
	}

	console.log('正在生成Excel文件')
	filterTranslatesNoInFile(scanPath)
	
	await checkNoTranslate(scanPath)
}

function getTranslateListForExcel(transList, projectName, allList){
	transList.forEach(translate => {
		const zh = translate['zh-CN（中文）']
		const en = translate['en-US (英文）']
		const ja = translate['ja-JP（日文）']
		const codes = translate.codes
		if(codes){
			codes.forEach(code => {
				const item = {
					'项目名称': projectName,
					'文本编号': code,
					'zh-CN（中文）': zh,
					'en-US (英文）': en,
					'ja-JP（日文）': ja
				}
				allList.push(item)
			})
		}
	})
	return allList
}

function getAllTranslateList(translateList, existObj, allList, projectName){
	Object.keys(existObj).forEach(code => {
		allList.push(existObj[code])
	})

	getTranslateListForExcel(translateList, projectName, allList)
}

async function filterTranslatesNoInFile(scanPath){
	const existTranslateObj = await getExistTranslate()
	const fileList = getFileList(scanPath)

	const codes = {}
	fileList.forEach(filePath => {
		let fileContent = fs.readFileSync(filePath, 'utf-8')
		
		const matchList = fileContent.match(/(\$t\(('|")(\w|\.)+('|"))/g)
		if(matchList){
			matchList.forEach(item => {
				let code = item.replace("$t(", '').replace(/\)|'/g, '').replace(/\./g, '_')
				code = 'Q_' + code
				codes[code] = code
			})
		}
	})

	const newList = []
	for(let code in existTranslateObj){
		if(codes[code]){
			newList.push(existTranslateObj[code])
		}
	}
	
	writeExcel(newList)
}

async function checkNoTranslate(scanPath){
	const fileList = getFileList(scanPath)
	
	const scanRes = scanAllText(fileList)
	const allText = scanRes.text
	const textPathObj = scanRes.path

	await writeFile(path.resolve(__dirname, '../local/text.txt'), allText.join('\n'))
	await writeFile(path.resolve(__dirname, '../local/path.json'), textPathObj)
	if(allText.length > 0){
		console.log('----------------')
		console.error('还有文件未替换，需要手动处理，请查看 /local/text.json 文件')
		console.log('记得把多个excel进行合并哦')
	}else{
		console.log('所有文件已处理完成')
		console.log('记得把多个excel进行合并哦')
	}
}

function getFileList(dir, filesList = []) {
	const files = fs.readdirSync(dir)
	files.forEach(item => {
		var fullPath = path.join(dir, item)
		const stat = fs.statSync(fullPath)
		if (stat.isDirectory()) {
			getFileList(path.join(dir, item), filesList) //递归读取文件
		}else{
			if(/\.(t|j)s(x?)$/.test(fullPath)){
				if(!/(((\.|\/)test\.(t|j)s(x?))|(\/api\/\w+\.(t|j)s(x?))|(\.d\.ts)|(\.mock(\w*)\..*)|(\.test(\w*)\..*))$/.test(fullPath)){
					if(ignoreFiles.indexOf(fullPath) === -1){
						let isIgnoreFolder = false
						for(const ignoreFolder of ignoreFoldersReg){
							if(ignoreFolder.test(fullPath)){
								isIgnoreFolder = true
								break
							}
						}
						if(!isIgnoreFolder){
							filesList.push(fullPath)
						}
					}
				}
			}
		}
	})
	return filesList
}

function replaceContentOfIgnoreTexts(texts, content){
	for(let text of texts){
		content = content.replaceAll(text, '')
	}
	return content
}

function scanAllText(fileList){
	const regList = [].concat(specialMatchReg.map(item => item.reg), textMatchReg)
	const allReg = new RegExp(`${regList.join('|')}`, 'g')
	const allText = []
	const textPath = []
	fileList.forEach(filePath => {
		console.log('匹配文件=', filePath)
		let fileContent = fs.readFileSync(filePath, 'utf-8')
		//去掉注释的中文
		// fileContent = fileContent.replace(/(\/\*[\s\S.]*?\*\/)|(\/\/[\s\S.]*?\n)|(<!--[\s\S.]*?-->)/g, '')
		// 	.replace(/(>\s*\n?\s*\{\{\s*(\w|\.|\s|\&)+\s*\}\}\s*(\w|\/)*\s*\n?\s*<)/g, '><')
		// 	.replace(/(\$t\('\w+'\))/g, '')
		// 	.replace(/(import(\s|\r|\{|(type))+\w+(\s|\r|\})+from(\s|\r)+('|")\w+('|");?)/g, '')
		for(let regItem of removeFileContentReg){
			fileContent = fileContent.replace(new RegExp(regItem.reg, 'g'), regItem.content)
		}

		for(let textItem of ignoreTexts){
			const textFile = textItem.file
			const texts = textItem.text
			if(texts){
				if(textFile){
					if(filePath.indexOf(textFile) > -1){
						fileContent = replaceContentOfIgnoreTexts(texts, fileContent)
					}
				}else{
					fileContent = replaceContentOfIgnoreTexts(texts, fileContent)
				}
			}
		}

		fileContent = ignoreHtmlTags(fileContent)

		fileContent = convertSpecialChar(fileContent, 'encode')

		// console.log('===============')
		// console.log(fileContent)
		
		const strArr = fileContent.match(allReg)
		// console.log(strArr)
		if (strArr?.length) {
			strArr.forEach((item, index) => {
				if (item.length) {
					item = replaceSpecialMatchReg(item)
					item = convertSpecialChar(item, 'decode')
					item = item.replace(/^('|"|`|>)/, '')
						.replace(/('|"|`|<)$/, '')
						.trim()
					if(!item){
						return
					}
					// 不包含小写字母的排出
					if(!/[a-z]/.test(item)){
						return
					}
					// 有特别需要过滤字符的
					for(const reg of ignoreMatchTextRegs){
						if(reg.test(item)){
							return
						}
					}
					// 就一个单词，但是是驼峰或下划线或中划线或点连接的排除
					if(!/\s/.test(item)){
						if(/(([A-Z][a-z]+){2,})|(\.|\-|_)/.test(item)){
							return 
						}
					}

					// 去掉全是模版字符串的如：return `${basePath}${suffixPath}${queryString}${hashPath}`;
					if(checkIsAllStringTemplate(item)){
						return
					}

					if(/((class(N|n)ame)|(cssVariables)|(Appsmith)|(sans\-serif)|(Execution failed\$\{)|(There was some error: \$\{e\})|(\ssolid\s(\d+)px(\s?))|(\$\{Classes\.)|(\$\{\w+\} (Min|Max): \$\{))/i.test(item)){
						return
					}

					allText.push(item)
					textPath.push({
						text: item,
						path: filePath
					})
				}
			})
		}
	})
	let uniqueTextList = [...new Set(allText)]
	const textPathObj = convertTextPath(textPath)

	uniqueTextList.sort((a, b) => b.length - a.length)
	
	return {
		text: uniqueTextList,
		path: textPathObj
	}
}

function checkIsAllStringTemplate(text){
	let isAll = false
	if(/\$\{/.test(text)){
		// `${diameter}px ${diameter}px`
		// message: `${WIDGET_TYPE_VALIDATION_ERROR} ${getExpectedType(config)}`,
		let replaceText = text.replace(/(\(\{(\w|,|\s|\r)+\}\))/, '')
		replaceText = replaceText.replace(/(\$\{(\w|\.|\s|\+|\*|\(|\)|,|\r|\?|"|'|\:)+\}(px|(\.\w+)*)*)/g, '')
		if(!/[a-zA-Z]{3,}/.test(replaceText)){
			isAll = true
		}
	}
	return isAll
}

function ignoreHtmlTags(fileContent){
	const contentList = fileContent.split('\n')
	// console.log(contentList.join('\n'))
	// console.log('-------------')
	const ignoreTags = fileContent?.match(/<\/(svg|style)>/g)
	if(ignoreTags){
		for(const tag of ignoreTags){
			const tagContent = tag.replace('</', '').replace('>', '')
			ignoreHtmlTag(contentList, tagContent)
		}
	}

	// 移除标签中的属性,排除title、alt属性
	let isTagStart = false
	const matchAttrReg = /(\s(title|alt|label)\="(\w|\s|\-)+"\s?)/g
	const replaceAttrReg = /(\s\w+\="(\w|\s|\-)+"\s?)/g
	// 移除所有的import语句
	const removeLineIndexList = []
	let isImportLineStart = false
	/**
	 * 移除
	 * interface
	 * export enum FileDataTypes
	 */
	let interfaceKuoHaoCount = 0
	/**
	 * 移除语句 
	 * AnalyticsUtil.logEvent("APP_CRASH", { error, errorInfo });
	 * log.error("Widget property pane config not defined", type);
	 * log.debug("Widget registration took: ", performance.now() - start, "ms");
	 * new Error("Attempting to update page without page id")
	 * throw new Error("Unknown message type: " + data.type);
	 * throw new PluginsNotFoundError("Unable to fetch plugins");
	 */
	let logKuoHaoCount = 0
	for(let i=0; i<contentList.length; i++){
		let line = contentList[i]

		if(/^\s*import\s/.test(line)){
			removeLineIndexList.push(i)
			isImportLineStart = true
			if(/\sfrom\s/.test(line) || /^\s*import\s+".*"/.test(line)){
				isImportLineStart = false
			}
		}else{
			if(isImportLineStart){
				removeLineIndexList.push(i)
			}
			if(/\sfrom\s/.test(line)){
				isImportLineStart = false
			}
		}

		if(/(\.logEvent\()|(log\.\w+\()|(new Error\()|(throw new \w+\()/.test(line)){
			logKuoHaoCount = 0
			removeLineIndexList.push(i)
			logKuoHaoCount = resetKuoHaoCount(logKuoHaoCount, line, '()')
		}else{
			if(logKuoHaoCount > 0){
				removeLineIndexList.push(i)
				logKuoHaoCount = resetKuoHaoCount(logKuoHaoCount, line, '()')
			}else{
				logKuoHaoCount = 0
			}
		}

		if(/(^interface\s)|(\sinterface\s)|(\senum\s)/.test(line)){
			interfaceKuoHaoCount = 0
			removeLineIndexList.push(i)
			interfaceKuoHaoCount = resetKuoHaoCount(interfaceKuoHaoCount, line, '{}')
		}else{
			if(interfaceKuoHaoCount > 0){
				removeLineIndexList.push(i)
				interfaceKuoHaoCount = resetKuoHaoCount(interfaceKuoHaoCount, line, '{}')
			}else{
				interfaceKuoHaoCount = 0
			}
		}

		if(/<\w+(\s|\r)+/.test(line)){
			isTagStart = true
			if(/\s?\/?>/.test(line)){
				isTagStart = false
			}
			line = removeHtmlTagAttribute(line, matchAttrReg, replaceAttrReg)
		}

		if(isTagStart){
			line = removeHtmlTagAttribute(line, matchAttrReg, replaceAttrReg)
		}
			
		if(/\s?\/?>/.test(line)){
			isTagStart = false
		}

		contentList[i] = line
	}

	removeContentLineByIndexList(contentList, removeLineIndexList)

	// console.log('去掉后=', contentList.join('\n'))
	return contentList.join('\n')
}

function removeHtmlTagAttribute(line, matchAttrReg, replaceAttrReg){
	const match = line.match(matchAttrReg)
	if(match){
		match.forEach((item, index) => {
			line = line.replace(item, ` -------${index}------- `)
		})
	}
	line = line.replace(replaceAttrReg, ' ')
	if(match){
		match.forEach((item, index) => {
			line = line.replace(` -------${index}------- `, item)
		})
	}
	return line
}

function ignoreHtmlTag(contentList, tag){
	let isTagStart = false
	for(let i=contentList.length-1; i>=0; i--){
		const line = contentList[i]
		if(line.indexOf(`</${tag}>`) > -1){
			isTagStart = true

			if(line.indexOf(`<${tag}>`) > -1 || line.indexOf(`<${tag} `) > -1){
				isTagStart = false
			}

			contentList.splice(i, 1)
			continue
		}
		
		if(isTagStart){
			if(new RegExp(`<${tag}(\\s|>)`).test(line)){
				isTagStart = false
			}
			contentList.splice(i, 1)
		}
	}
}

function replaceSpecialMatchReg(text){
	for(let reg of specialMatchReg){
		if(new RegExp(reg.reg).test(text)){
			text = text.replace(reg.replace, '')
			break
		}
	}
	return text
}

function checkToAddTempFolder() {
	return new Promise(resolve => {
		fs.stat(path.resolve(__dirname, '../local'), function (err, statObj) {
			// 判断local文件是否存在，如果不存在则创建，如果创建则直接处理json文件
			if (!statObj) {
				fs.mkdir(path.resolve(__dirname, '../local'), function (err) {
					resolve()
				})
			} else {
				resolve()
			}
		})
	});
}

async function writeFile(filePath, content){
	await checkToAddTempFolder()
	if(typeof content !== 'string'){
		content = JSON.stringify(content, null, 4)
	}
	fs.writeFileSync(filePath, content)
}


function convertTextPath(allTextPathList){
	const obj = {}
	allTextPathList.forEach(item => {
		let text = item.text
		const filePath = item.path
		if(!obj[text]){
			obj[text] = []
		}
		// console.log('filePath=',filePath)
		// console.log('text=',text)
		if(obj[text].indexOf(filePath) === -1){
			obj[text].push(filePath)
		}
	})
	return obj
}

function removeContentLineByIndexList(contentList, indexList){
	for(let i=indexList.length-1; i>=0; i--){
		contentList.splice(indexList[i], 1)
	}
}

function resetKuoHaoCount(interfaceKuoHaoCount, line, kuoHao){
	let zuoReg
	let youReg
	if(kuoHao === '{}'){
		zuoReg = /(\{)/g
		youReg = /(\})/g
	}else{
		zuoReg = /(\()/g
		youReg = /(\))/g
	}
	const zuoKuoHaoMatch = line.match(zuoReg)
	if(zuoKuoHaoMatch){
		interfaceKuoHaoCount += zuoKuoHaoMatch.length
	}
	const youKuoHaoMatch = line.match(youReg)
	if(youKuoHaoMatch){
		interfaceKuoHaoCount -= youKuoHaoMatch.length
	}
	return interfaceKuoHaoCount
}

async function writeExcel(data, fileName){
	// const data = [{
	// 	'项目名称': 'console',
	// 	'文本编号': 'aaa',
	// 	'zh-CN（中文）': '中文',
	// 	'en-US (英文）': 'en',
	// 	'ja-JP（日文）': 'ja'
	// }]
	if(!fileName){
		fileName = 'translate'
	}
	await checkToAddTempFolder()
	const worksheet = xlsx.utils.json_to_sheet(data);
	const workbook = xlsx.utils.book_new();
	xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
	xlsx.writeFile(workbook, path.resolve(__dirname, `../local/${fileName}.xlsx`));
}

async function getFormalTranslate(){
	let data = {}
	const filePath = path.resolve(__dirname, `../../app/client/src/locale/locale.json`)
	if(fs.existsSync(filePath)){
		let content = fs.readFileSync(filePath, 'utf-8')
		data = JSON.parse(content)
	}

	const obj = {}
	Object.keys(data).forEach(pageKey => {
		Object.keys(data[pageKey]).forEach(field => {
			allExistUuid[field] = field
			const id = `Q_${pageKey}_${field}`
			const item = data[pageKey][field]
			obj[id] = {
				'文本编号': id,
				'项目名称': projectName,
				'zh-CN（中文）': item.zh,
				'en-US (英文）': item.en,
				'ja-JP（日文）': item.ja
			}
		})
	})
	return obj
}


async function getExistTranslate(){
	let data = []
	const filePath = path.resolve(__dirname, `../local/translate.xlsx`)
	if(fs.existsSync(filePath)){
		const workbook = xlsx.readFile(filePath)
		const sheetNames = workbook.SheetNames
		const sheet = workbook.Sheets[sheetNames[0]]
		data = xlsx.utils.sheet_to_json(sheet)
	}
	const obj = {}
	data.forEach(item => {
		const id = item['文本编号']
		const idSplit = id.split('_')
		const uuid = idSplit[idSplit.length - 1]
		allExistUuid[uuid] = uuid
		obj[item['文本编号']] = item
	})

	const formalTranslate = await getFormalTranslate()
	Object.assign(formalTranslate, obj)
	
	// console.log(obj)
	return formalTranslate
}

function convertSpecialChar(content, type){
	specialChar.forEach(item => {
		if(type === 'encode'){
			content = content.replaceAll(item.char, item.code)
		}else{
			content = content.replaceAll(item.code, item.char)
		}
	})
	return content
}


  run('')