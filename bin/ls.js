// 用来添加命令行的工具包
const cmd = require('commander')

const {
  getAllCurrentRegistry,
  getAllRegisties,
  isSame,
  line,
  printMsg
} = require('../utils')

// 列出所有可设置的源
cmd
  .command('ls')
  .description('列出所有可设置的源')
  .action(showList)

/**
 * 列出所有可设置的源
 */
function showList() {
  getAllCurrentRegistry(curs => {
    const info = ['', '*** 列出所有可设置的源 ***', '']
    // 获取所有的源包括预定义和用户自定义的
    const allRegistries = getAllRegisties()
    // 循环遍历所有的源
    const allRegistriesKeys = Object.keys(allRegistries)

    let { yarn: yarnReg, npm: npmReg } = curs
    allRegistriesKeys.forEach(key => {
      // 用户设置的源是否在列表里
      let inList = false
      const item = allRegistries[key]
      const isCommon = key === 'common'
      info.push(isCommon ? '公共源：' : `${key}：`)
      Object.entries(item).forEach(([name, obj]) => {
        const { registry } = obj
        const isYarnSame = isSame(registry, yarnReg)
        const isNpmSame = isSame(registry, npmReg)
        let isSameReg = false
        switch (key) {
          case 'npm':
            isSameReg = isNpmSame
            break
          case 'yarn':
            isSameReg = isYarnSame
            break
          default:
            isSameReg = isYarnSame && isNpmSame
            break
        }
        const prefix = isSameReg ? '* ' : '  '
        info.push(`${prefix} ${name} ${line(name, 8)} ${registry}`)
        // 用户设置的源是否在列表里
        if (isSameReg) {
          inList = true
        }
      })
      if (!inList && !isCommon) {
        info.push(`* 【未设置的源】${line(key, 8)} ${curs[key]}`)
      }

      info.push('')
    })

    printMsg(info)
  })
}
