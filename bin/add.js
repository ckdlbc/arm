// 用来添加命令行的工具包
const cmd = require('commander')

const {
  getAllRegisties,
  printMsg,
  typeVali,
  message,
  replaceName,
  endWithslash,
  setRegistry,
  exit
} = require('../utils')

// 添加源
cmd
  .command('add <registry> <url> [option]')
  .description('添加源')
  .action(onAdd)

/**
 * 添加源
 */
function onAdd(name, url, type) {
  const allRegistries = getAllRegisties()
  let dataTemp = allRegistries.common
  const vali = typeVali(type)
  if (vali) {
    return
  }
  let useType = 'common'
  if (typeof type === 'string') {
    useType = type
    dataTemp = allRegistries[type]
  }
  if (dataTemp.hasOwnProperty(name)) {
    printMsg(replaceName(message.hasRegistry, name))
    return
  }
  const config = (dataTemp[name] = {})
  if (!endWithslash(url)) url += '/'
  config.registry = url
  setRegistry(useType, allRegistries[useType], err => {
    if (err) return exit(err)
    printMsg(replaceName(message.addRegistry, name))
  })
}
