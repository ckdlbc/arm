// 用来添加命令行的工具包
const cmd = require('commander')

const onUse = require('./use')

const {
  printMsg,
  typeVali,
  message,
  replaceName,
  setRegistry,
  getAllRegisties,
  getAllCurrentRegistry,
  exit,
  isSame
} = require('../utils')

// 删除源
cmd
  .command('del <registry> [option]')
  .description('删除源')
  .action(onDel)

/**
 * 添加源
 */
function onDel(name, type) {
  const allRegistries = getAllRegisties(true)
  const customRegistries = getAllRegisties()
  let allDataTemp = allRegistries.common
  let customDataTemp = customRegistries.common
  const vali = typeVali(type)
  if (vali) {
    return
  }
  let useType = 'common'
  if (typeof type === 'string') {
    useType = type
    allDataTemp = allRegistries[type]
    customDataTemp = customRegistries[type]
  }

  if (allDataTemp.hasOwnProperty(name)) {
    printMsg(replaceName(message.delDefault, name))
    return
  }
  if (!customDataTemp.hasOwnProperty(name)) {
    printMsg(replaceName(message.customer, name))
    return
  }
  getAllCurrentRegistry(curs => {
    // 删除之后需要指定一个源
    Object.keys(curs).forEach(key => {
      if (isSame(curs[key], customDataTemp[name].registry)) {
        onUse('taobao', useType === 'common' ? {} : useType, false)
      }
    })
    delete customDataTemp[name]
    setRegistry(useType, customDataTemp, function(err) {
      if (err) return exit(err)
      printMsg(replaceName(message.delRegistry, name))
    })
  })
}
