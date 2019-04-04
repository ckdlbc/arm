// 用来添加命令行的工具包
const cmd = require('commander')

const { getAllCurrentRegistry, printMsg, typeVali } = require('../utils')

// 当前使用的源
cmd
  .command('current')
  .description('当前使用的源')
  .action(showCurrent)

/**
 * 当前使用的源
 */
function showCurrent(type) {
  const vali = typeVali(type)
  if (vali) {
    return
  }
  getAllCurrentRegistry(curs => {
    const info = ['', '*** 当前使用的源 ***', '']
    Object.keys(curs).forEach(key => {
      if (vali) {
        if (type === key) {
          info.push(`${type}: ${curs[type]}`)
        }
      } else {
        info.push(`${key}: ${curs[key]}`)
      }
    })
    info.push('')
    printMsg(info)
  })
}
