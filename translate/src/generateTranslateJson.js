const fs = require('fs')
const path = require('path')
const xlsx = require('xlsx')


async function run(){
	const filePath = path.resolve(__dirname, `../local/translate.xlsx`)
	if(fs.existsSync(filePath)){
		const workbook = xlsx.readFile(filePath)
		const sheetNames = workbook.SheetNames
		const sheet = workbook.Sheets[sheetNames[0]]
		data = xlsx.utils.sheet_to_json(sheet)
	}else{
        console.log('没有要处理的翻译字段，可先执行命令进行翻译：npm run scan')
        return
    }
    const noTranslateCodeList = []
	const obj = {}
	data.forEach(item => {
		const code = item['文本编号']
		const zh = item['zh-CN（中文）']
		const en = item['en-US (英文）']
		const ja = item['ja-JP（日文）']
		let newCode = code.replace(/^Q_/, '')
		const codes = newCode.split('_')
		const code1 = codes[0]
		const code2 = codes[1]
		if(!obj[code1]){
			obj[code1] = {}
		}
		obj[code1][code2] = {
			zh,
			en,
			ja
		}

        if(!zh || !en || !ja){
            noTranslateCodeList.push(code)
        }
	})

    if(noTranslateCodeList.length > 0){
        console.log(noTranslateCodeList)
        console.log('-------以上字段未处理------')
        console.log('请将translate/local/translate.xlsx中的字段补全')
        return
    }
	await writeFile(path.resolve(__dirname, '../../app/client/src/locale/locale.json'), obj)
}

async function writeFile(filePath, content){
	await checkToAddTempFolder()
	if(typeof content !== 'string'){
		content = JSON.stringify(content, null, 4)
	}
	fs.writeFileSync(filePath, content)
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

  run('')