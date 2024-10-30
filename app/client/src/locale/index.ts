import messages from './locale.json'
const locale = 'zh'
const $t = (key: string, replaceObj?: any): string => {
    const codes = key.split('.')
    let tempMessage: any
    codes.forEach((code: string, index: number) => {
        if(index === 0){
            tempMessage = (messages as any)[code]
        }else{
            if(tempMessage){
                tempMessage = tempMessage[code]
            }
        }
    })

    let message = ''
    if(tempMessage){
        message = tempMessage[locale] || ''
    }

    if(replaceObj){
        Object.keys(replaceObj).forEach((field: string) => {
            const value = replaceObj[field]
            message = message.replace(new RegExp(`\\{\\s*${field}\\s*\\}`), value)
        })
    }

    if(!message){
        message = key
    }

    return message
}

export {
    $t
}