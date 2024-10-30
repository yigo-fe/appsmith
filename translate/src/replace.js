/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
// const fieldObj = require('./replace.json')
// const textFilePathObj = require('./local/text_path_list.json')
function runItem(translate, textPathObj, allExistUuid){
  const text = translate["en-US (英文）"];
    const textFilePathList = textPathObj[text] || [];

    let isReplaced = false
    console.log("replace field=", text);

    const regText = text
        .replace(/\?/g, "\\?")
        .replace(/\./g, "\\.")
        .replace(/\!/g, "\\!")
        .replace(/\(/g, "\\(")
        .replace(/\)/g, "\\)")
        .replace(/\[/g, "\\[")
        .replace(/\]/g, "\\]")
        .replace(/\//g, "\\/")
        .replace(/\*/g, "\\*")
        .replace(/\+/g, "\\+")
        .replace(/\{/g, "\\{")
        .replace(/\}/g, "\\}")
        .replace(/\$/g, "\\$")
        .replace(/\'/g, "\\'")
        .replace(/\"/g, '\\"')
        .replace(/\n/g, '\\n');
        
    textFilePathList.forEach((filePath) => {
      console.log("file path=", filePath);
      const suffix = filePath.match(/\/((\w|\.|\-)+)\.(t|j)s(x?)$/)[1].replace(/\./g, '')
      const uuid = getUUid(allExistUuid)
      const message = `${suffix}.${uuid}`
      const code = `Q_${suffix}_${uuid}`
      const i18n = `$t('${message}')`;
      if(!translate.codes){
        translate.codes = []
      }
      translate.codes.push(code)

      let hasImportI18n = false;
      let importLastLineIndex = 0;
      let isImportStart = false;
      let isImportLineEnd = true
      let fileContent = fs.readFileSync(filePath, "utf-8");
      
      let contentLineList = fileContent.split("\n");
      let isHtmlLine = false
      contentLineList.forEach((line, index) => {
        if (line.indexOf('import {$t} from "locale/index"') > -1) {
          hasImportI18n = true;
        }
        if (/^\s*import\s/.test(line)) {
          isImportStart = true;

          if(/\sfrom\s/.test(line)){
            isImportLineEnd = true
          }else{
            isImportLineEnd = false
          }
        } else {
          if(isImportStart){
            if(!isImportLineEnd){
              if(/\sfrom\s/.test(line)){
                isImportLineEnd = true
              }
            }else{
              if(!importLastLineIndex){
                importLastLineIndex = index;
              }
            }
          }
        }

        // if(text.indexOf('{') > -1){
        //   return
        // }

        
        if(/<(\w|\.)+\s+/.test(line)){
          isHtmlLine = true
        }
        // const replaceTextReg = new RegExp(`('|"|\`)${regText}('|"|\`)`, 'g')
          // 替换html属性
        if(isHtmlLine){
          const matchAttrList = line.match(new RegExp(`(\\s?\\w+="${regText}"\\s?)`, 'g'));
          if (matchAttrList) {
            const replaceTextReg = new RegExp(`"${regText}"`)
            matchAttrList.forEach(matchItem => {
              // const field = matchItem.split('=')[0].trim()
              // switch(field){
              //   case 'title':
              //   case 'placeholder':
              //   case 'alt':
              //   case 'label':
              //     break
              // }
              const replaceContent = matchItem.replace(replaceTextReg, `{${i18n}}`);
              line = line.replace(matchItem, replaceContent);
              isReplaced = true
            })
          }
          // <Sentry.ErrorBoundary fallback={"An error has occured"}>
          const matchDynamicsAttr = line.match(new RegExp(`\\s?\\w+=\\{(("${regText}")|('${regText}')|(\`${regText}\`))\\}`, 'g'))
          if (matchDynamicsAttr) {
            const replaceTextReg = new RegExp(`("${regText}")|('${regText}')|(\`${regText}\`)`)
            matchDynamicsAttr.forEach(matchItem => {
              const replaceContent = matchItem.replace(replaceTextReg, `${i18n}`);
              line = line.replace(matchItem, replaceContent);
              isReplaced = true
            })
          }
        }

        // 替换js赋值
        const matchJsList = line.match(new RegExp(`(\\s?\\w+="${regText}"\\s?)`, 'g'));
        if (matchJsList) {
          const replaceTextReg = new RegExp(`"${regText}"`)
          matchJsList.forEach(matchItem => {
            const replaceContent = matchItem.replace(replaceTextReg, `${i18n}`);
            line = line.replace(matchItem, replaceContent);
            isReplaced = true
          })
        }

        // 通用字符串替换
        // if(regText.indexOf(' ') > -1 && text.indexOf('${') === -1){
        if(text.indexOf('${') === -1){
          const matchJsList = line.match(new RegExp(`('\\s*${regText}\\s*')|("\\s*${regText}\\s*")|(\`\\s*${regText}\\s*\`)`, 'g'));
          if (matchJsList) {
            matchJsList.forEach(matchItem => {
              line = line.replace(matchItem, `${i18n}`);
              isReplaced = true
            })
          }
        }
        // js模版字符串替换
        if(text.indexOf('${') !== -1){
          const matchJsList = line.match(new RegExp(`(\`\\s*${regText}\\s*\`)`, 'g'));
          if (matchJsList) {
            matchJsList.forEach(matchItem => {
              let keys = getJsStrTemplateKeys(matchItem)
              let i18nFields = []
              keys.forEach(keyItem => {
                i18nFields.push(keyItem.i18n)
                replaceTranslate(translate, keyItem.origin, keyItem.template)
              })
              const newI18n = `$t('${message}', {${i18nFields.join(',')}})`
              line = line.replace(matchItem, newI18n);
              isReplaced = true
            })
          }
        }

        if(/\/\>/.test(line)){
          isHtmlLine = false
        }

        contentLineList[index] = line;
      });

      if (!hasImportI18n) {
        contentLineList.splice(0, 0, `import {$t} from "locale/index";`);
      }

      let newFileContent = contentLineList.join("\n")
      // 替换html字符串
      let replaceHtmlRes = replaceHtmlText(newFileContent, regText, i18n)
      newFileContent = replaceHtmlRes.html
      if(replaceHtmlRes.isReplaced){
        isReplaced = true
      }
      // 替换js中的字符串模版
      replaceHtmlRes = replaceHtmlStringTemplate(newFileContent, regText, i18n)
      newFileContent = replaceHtmlRes.html
      if(replaceHtmlRes.isReplaced){
        isReplaced = true
      }
      
      fs.writeFileSync(filePath, newFileContent);
    });

    return isReplaced
}

function run(transDataList, textPathObj, vueType) {
  const noReplaceIndexList = []
  const noReplaceList = []
  const allTranslateList = []
  transDataList.forEach((translate, translateIndex) => {
    const text = translate["en-US (英文）"];
    const textFilePathList = textPathObj[text] || [];

    let isReplaced = false
    console.log("replace field=", text);

    const regText = text
        .replace(/\?/g, "\\?")
        .replace(/\./g, "\\.")
        .replace(/\!/g, "\\!")
        .replace(/\(/g, "\\(")
        .replace(/\)/g, "\\)")
        .replace(/\[/g, "\\[")
        .replace(/\]/g, "\\]")
        .replace(/\//g, "\\/")
        .replace(/\*/g, "\\*")
        .replace(/\+/g, "\\+")
        .replace(/\{/g, "\\{")
        .replace(/\}/g, "\\}")
        .replace(/\$/g, "\\$")
        .replace(/\'/g, "\\'")
        .replace(/\"/g, '\\"')
        .replace(/\n/g, '\\n');
        
    textFilePathList.forEach((filePath) => {
      console.log("file path=", filePath);
      const suffix = filePath.match(/\/((\w|\.|\-)+)\.(t|j)s(x?)$/)[1].replace(/\./g, '')
      const uuid = getUUid()
      const message = `${suffix}.${uuid}`
      const code = `Q_${suffix}_${uuid}`
      const i18n = `$t('${message}')`;
      if(!translate.codes){
        translate.codes = []
      }
      translate.codes.push(code)

      let hasImportI18n = false;
      let importLastLineIndex = 0;
      let isImportStart = false;
      let isImportLineEnd = true
      let fileContent = fs.readFileSync(filePath, "utf-8");
      
      let contentLineList = fileContent.split("\n");
      let isHtmlLine = false
      contentLineList.forEach((line, index) => {
        if (line.indexOf("@byteluck/ok-vue-i18n") > -1) {
          hasImportI18n = true;
        }
        if (/^\s*import\s/.test(line)) {
          isImportStart = true;

          if(/\sfrom\s/.test(line)){
            isImportLineEnd = true
          }else{
            isImportLineEnd = false
          }
        } else {
          if(isImportStart){
            if(!isImportLineEnd){
              if(/\sfrom\s/.test(line)){
                isImportLineEnd = true
              }
            }else{
              if(!importLastLineIndex){
                importLastLineIndex = index;
              }
            }
          }
        }

        // if(text.indexOf('{') > -1){
        //   return
        // }

        
        if(/<(\w|\.)+\s+/.test(line)){
          isHtmlLine = true
        }
        // const replaceTextReg = new RegExp(`('|"|\`)${regText}('|"|\`)`, 'g')
          // 替换html属性
        if(isHtmlLine){
          const matchAttrList = line.match(new RegExp(`(\\s?\\w+="${regText}"\\s?)`, 'g'));
          if (matchAttrList) {
            const replaceTextReg = new RegExp(`"${regText}"`)
            matchAttrList.forEach(matchItem => {
              // const field = matchItem.split('=')[0].trim()
              // switch(field){
              //   case 'title':
              //   case 'placeholder':
              //   case 'alt':
              //   case 'label':
              //     break
              // }
              const replaceContent = matchItem.replace(replaceTextReg, `{${i18n}}`);
              line = line.replace(matchItem, replaceContent);
              isReplaced = true
            })
          }
          // <Sentry.ErrorBoundary fallback={"An error has occured"}>
          const matchDynamicsAttr = line.match(new RegExp(`\\s?\\w+=\\{(("${regText}")|('${regText}')|(\`${regText}\`))\\}`, 'g'))
          if (matchDynamicsAttr) {
            const replaceTextReg = new RegExp(`("${regText}")|('${regText}')|(\`${regText}\`)`)
            matchDynamicsAttr.forEach(matchItem => {
              const replaceContent = matchItem.replace(replaceTextReg, `${i18n}`);
              line = line.replace(matchItem, replaceContent);
              isReplaced = true
            })
          }
        }

        // 替换js赋值
        const matchJsList = line.match(new RegExp(`(\\s?\\w+="${regText}"\\s?)`, 'g'));
        if (matchJsList) {
          const replaceTextReg = new RegExp(`"${regText}"`)
          matchJsList.forEach(matchItem => {
            const replaceContent = matchItem.replace(replaceTextReg, `${i18n}`);
            line = line.replace(matchItem, replaceContent);
            isReplaced = true
          })
        }

        // 通用字符串替换
        if(regText.indexOf(' ') > -1 && text.indexOf('${') === -1){
          const matchJsList = line.match(new RegExp(`('\\s*${regText}\\s*')|("\\s*${regText}\\s*")|(\`\\s*${regText}\\s*\`)`, 'g'));
          if (matchJsList) {
            matchJsList.forEach(matchItem => {
              line = line.replace(matchItem, `${i18n}`);
              isReplaced = true
            })
          }
        }
        // js模版字符串替换
        if(text.indexOf('${') !== -1){
          const matchJsList = line.match(new RegExp(`(\`\\s*${regText}\\s*\`)`, 'g'));
          if (matchJsList) {
            matchJsList.forEach(matchItem => {
              let keys = getJsStrTemplateKeys(matchItem)
              let i18nFields = []
              keys.forEach(keyItem => {
                i18nFields.push(keyItem.i18n)
                replaceTranslate(translate, keyItem.origin, keyItem.template)
              })
              const newI18n = `$t('${message}', {${i18nFields.join(',')}})`
              line = line.replace(matchItem, newI18n);
              isReplaced = true
            })
          }
        }

        if(/\/\>/.test(line)){
          isHtmlLine = false
        }

        contentLineList[index] = line;
      });

      // if (!hasImportI18n) {
      //   let importContent = [`import { i18n } from '@byteluck/ok-vue-i18n'`, `const { $t } = i18n`]
        
      //   if(importContent.length > 0){
      //     contentLineList.splice(importLastLineIndex, 0, ...importContent);
      //   }
      // }

      let newFileContent = contentLineList.join("\n")
      // 替换html字符串
      let replaceHtmlRes = replaceHtmlText(newFileContent, regText, i18n)
      newFileContent = replaceHtmlRes.html
      if(replaceHtmlRes.isReplaced){
        isReplaced = true
      }
      // 替换js中的字符串模版
      replaceHtmlRes = replaceHtmlStringTemplate(newFileContent, regText, i18n)
      newFileContent = replaceHtmlRes.html
      if(replaceHtmlRes.isReplaced){
        isReplaced = true
      }
      
      fs.writeFileSync(filePath, newFileContent);
    });

    if(!isReplaced){
      noReplaceIndexList.push(translateIndex)
      noReplaceList.push(translate)
    }
  });

  for(let i=noReplaceIndexList.length-1; i>=0; i--){
    const index = noReplaceIndexList[i]
    transDataList.splice(index, 1)
  }

  return noReplaceList
}

function getJsStrTemplateKeys(text){
  let templateMatchs = text.match(/\$\{(\w|\.|\(|\)|\?|\s)+\}/g)
  let keys = []
  let keyObj = {}
  if(templateMatchs){
    templateMatchs.forEach(item => {
      let value = item.replace('${', '').replace('}', '').trim()
      let field = value.replace(/(\(|\)|\.|\?)/g, '_').replace(/(\s)/g, '')
      let i18n = `${field}: ${value}`
      let template = `{${field}}`
      if(!keyObj[field]){
        keys.push({
          origin: item,
          field,
          value,
          i18n,
          template
        })
        keyObj[item] = item
      }
    })
  }
  
  return keys
}

function replaceTranslate(translate, key, value){
  const key1 = key.replaceAll('{', '｛').replaceAll('}', '｝')
  const key2 = key.replaceAll('{', '#').replaceAll('}', '#')
  Object.keys(translate).forEach(field => {
    if(field === 'codes'){
      return
    }
    let item = translate[field] || ''
    item = item.replace(key, value)
    item = item.replace(key1, value)
    item = item.replace(key2, value)
    translate[field] = item
  })
}

function replaceHtmlText(html, regText, i18n){
  let isReplaced = false
  const matchHtmlList = html.match(new RegExp(`(>(\\s|\\r)*${regText}(\\s|\\r)*<)`, 'g'));
  if (matchHtmlList) {
    matchHtmlList.forEach(matchItem => {
      html = html.replace(matchItem, `>{${i18n}}<`);
      isReplaced = true
    })
  }
  return {
    html,
    isReplaced
  }
}

function replaceHtmlStringTemplate(html, regText, i18n){
  let isReplaced = false
  const matchHtmlList = html.match(new RegExp(`(\`(\\s|\\r)*${regText}(\\s|\\r)*\`)`, 'g'));
  if (matchHtmlList) {
    matchHtmlList.forEach(matchItem => {
      html = html.replace(matchItem, i18n);
      isReplaced = true
    })
  }
  return {
    html,
    isReplaced
  }
}

function getUUid(allExistUuid){
	let uid = generateUUID()
	while(allExistUuid[uid]){
		uid = generateUUID()
	}
  allExistUuid[uid] = uid
	return uid
}

function generateUUID() {
	const s4 = () => {
	  return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	};
   
	return (
	  s4() +
	  s4() +
	  s4() +
	  s4()
	);
}

module.exports = {
  run,
  runItem
};
