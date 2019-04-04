#!/usr/bin/env node

// 用来添加命令行的工具包
const cmd = require('commander')
// package.json
const pkg = require('./package.json')

// arm的版本号
cmd.version(pkg.version)

// 单独配置源的参数
cmd.option('--n', '单独为npm配置').option('--y', '单独为yarn配置')

// 加载命令
const commands = ['ls', 'current', 'add', 'use', 'del', 'help']
commands.forEach(key => require(`./bin/${key}`))
