# arm -- All Registry Manager

管理所有的 npm/yarn 包的下载源 Registry

`arm`可以帮助你轻松地添加、删除、查询、切换所有的 Npm/Yarn Registries,目前内置`npm`,`taobao`,`yarn`三个源

## 安装

```
$ npm install -g arm
```

## 如何使用

列出所有 Registry

```
$ arm ls

*** 列出所有可设置的源 ***

公共源：
*  taobao  -  https://registry.npm.taobao.org/

npm：
*  taobao  -  https://registry.npm.taobao.org/
   npm  ----  https://registry.npmjs.org/

yarn：
*  taobao  -  https://registry.npm.taobao.org/
   yarn  ---  https://registry.yarnpkg.com/
```

切换公共源

```
$ arm use taobao  //将npm与yarn同时切到taobao源

npm 当前源为: https://registry.npm.taobao.org/
yarn 当前源为: https://registry.npm.taobao.org/
```

单独切换源

```
$ arm use taobao yarn  //单独将yarn切到taobao源

npm 当前源为: https://registry.npm.taobao.org/
yarn 当前源为: https://registry.npm.taobao.org/


$ arm use taobao npm  //单独将npm切到taobao源

npm 当前源为: https://registry.npm.taobao.org/
yarn 当前源为: https://registry.npm.taobao.org/
```

添加公共源

```
$ arm add cnpm http://r.cnpmjs.org/

添加源 cnpm 成功
```

添加单独源

```
$ arm add cnpm http://r.cnpmjs.org/ npm  // 单独为npm添加源，yarn同理

添加源 cnpm 成功
```

删除公共源

```
$ arm del cnpm

删除源 cnpm 成功
```

删除单独源

```
$ arm del cnpm

删除源 cnpm 成功
```

## 帮助

```
$ arm help

  Usage: index [options] [command]

  Options:

    -V, --version                  output the version number
    --n                            单独为npm配置
    --y                            单独为yarn配置
    -h, --help                     output usage information

  Commands:

    ls                             列出所有可设置的源
    current                        当前使用的源
    add <registry> <url> [option]  添加源
    use <registry> [option]        切换当前的源
    del <registry> [option]        删除源
    help                           打印出arm的命令帮助信息
```

## 内置源

- [npm](https://www.npmjs.org)
- [taobao](http://npm.taobao.org/)
- [yarn](https://registry.yarnpkg.com/)

## LICENSE

公司私用，闭源
