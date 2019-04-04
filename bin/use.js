// 用来添加命令行的工具包
const cmd = require('commander')

const {
  printMsg,
  typeVali,
  message,
  replaceName,
  getAllRegisties,
  execCommand,
  exit,
  yarn,
  npm,
  getAllCurrentRegistry
} = require('../utils')

// 切换当前的源
cmd
  .command('use <registry> [option]')
  .description('切换当前的源')
  .action(onUse)

/**
 * 切换源
 */
function onUse(name, type, showMsg = true) {
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
    const registry = dataTemp[name]
    const commands = {
      yarn: `${yarn.set} ${registry.registry}`,
      npm: `${npm.set} ${registry.registry}`
    }
    commands.common = `${commands.yarn} && ${commands.npm}`

    execCommand(commands[useType], (err, out) => {
      if (err) return exit(err)
      getAllCurrentRegistry(curs =>
        Object.keys(curs).forEach(key => {
          if (showMsg) {
            printMsg(`${key} ${replaceName(message.useRegistry, curs[key])}`)
          }
        })
      )
    })
  } else {
    printMsg(replaceName(message.notFound, name))
  }
}

module.exports = onUse
