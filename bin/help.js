// 用来添加命令行的工具包
const cmd = require('commander')

// 打印arm的帮助信息
cmd
  .command('help')
  .description('打印出arm的命令帮助信息')
  .action(cmdOutputHelp)

cmd.parse(process.argv)
if (process.argv.length === 2) {
  cmdOutputHelp()
}

/**
 * 输出命令行帮助信息
 */
function cmdOutputHelp() {
  cmd.outputHelp()
}
