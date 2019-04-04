// node的路径包
const path = require("path");
// node的文件系统包
const fs = require("fs");

// npm的命令行字符串对象
const npm = {
  get: "npm config get registry",
  set: "npm config set registry"
};

// yarn的命令行字符串对象
const yarn = {
  get: "yarn config get registry",
  set: "yarn config set registry"
};

// 使用命令行后的提示信息集合
const message = {
  hasRegistry: "[name] 已被添加过",
  notFound: "该源不存在: [name]，请添加",
  useRegistry: "当前源为: [name]",
  delRegistry: "删除源 [name] 成功",
  addRegistry: "添加源 [name] 成功",
  customer: "只能删除已被添加的源",
  delDefault: "不能删除arm默认的源"
};

const savePath = `${process.env.HOME}/.armConfig`;

let rcList = {
  common: join(".arm-commonrc"),
  npm: join(".arm-npmrc"),
  yarn: join(".arm-yarnrc")
};

/**
 * 判断配置类型
 */
function typeVali(type) {
  const data = ["yarn", "npm"];
  const bool = typeof type === "string" && !data.includes(type);
  if (bool) {
    console.error(`该参数不存在：${type} `);
  }
  return bool;
}

/**
 * 获取用户自定义的源
 * 用户自定义的源写在.armrc配置文件中
 */
function join(fileName) {
  return path.join(savePath, fileName);
}
function getCustomRegistry() {
  let jsonData = { ...rcList };
  Object.keys(jsonData).forEach(key => {
    jsonData[key] = fs.existsSync(jsonData[key])
      ? JSON.parse(fs.readFileSync(jsonData[key], "utf-8"))
      : {};
  });
  return jsonData;
}

/**
 * 获取所有的源
 * 将预定义的源和用户自定义的源合并
 */
function getAllRegisties(useRaw = false) {
  const extend = require("extend");
  const rcList = getCustomRegistry();

  Object.keys(rcList).forEach(key => {
    let registries = require(`./registries/${key}.json`);
    rcList[key] = useRaw ? registries : extend({}, registries, rcList[key]);
  });
  return rcList;
}

/**
 * 获取当前所有的源
 * @param {Function} cbk 回调函数
 */
function getAllCurrentRegistry(cbk) {
  execCommand([npm.get, yarn.get], currents => {
    currents = currents.map(curr => convertEnd(curr));
    cbk({ npm: currents[0], yarn: currents[1] });
  });
}

/**
 * 写入数据
 * @param {*} config
 * @param {*} cbk
 */
function setRegistry(type, config, cbk) {
  syncDir(savePath);
  fs.writeFile(rcList[type], JSON.stringify(config), cbk);
}

///////////////////////////
//                       //
//     辅助函数           //
//                       //
///////////////////////////
function syncDir(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    fs.mkdirSync(dirname);
    return true;
  }
}
/**
 * 执行命令行
 * @param {String} command 所需要执行的命令行字符串
 * @param {Function} cbk 回调函数
 */
function execCommand(command, cbk) {
  // node的子进程
  const childProcess = require("child_process");
  if (typeof command === "string") {
    childProcess.exec(command, cbk);
    return;
  }
  if (Array.isArray(command)) {
    const arr = command.map(com => childProcess.execSync(com).toString());
    cbk(arr);
    return;
  }
}

/**
 * 输出错误信息
 */
function printErr(err) {
  console.error("an error occured: " + err);
}

/**
 * 输出普通信息
 */
function printMsg(infos) {
  // 判断info是否是数组
  const msgIsArray = Array.isArray(infos);
  if (msgIsArray) {
    infos.forEach(info => console.log(info));
  } else {
    console.log(infos);
  }
}

/**
 * 退出程序
 */
function exit(error) {
  printErr(error);
  process.exit(1);
}

/**
 * 显示registry的时候的字符串格式
 * @param {String} str registry的key
 * @param {Number} len 包含key字符串的总体长度
 */
function line(str, len = 8) {
  const line = new Array(Math.max(1, len - str.length)).join("-");
  return " " + line + " ";
}

/**
 * 检测用户输入的registry是否以"/"结尾
 * @param {String} url 用户输入的registry
 */
function endWithslash(url) {
  return /\/$/.test(url);
}

/**
 * 替换字符串
 * @param {String} msg 需要替换的信息字符串
 * @param {String} name 替换的信息
 */
function replaceName(msg, name) {
  return msg.replace(/\[name\]/g, name);
}

/**
 * 比对两个Registry源地址字符串是否一样
 * @param {String} one registry源地址字符串
 * @param {String} other registry源地址字符串
 */
function isSame(one, other) {
  const reg = /\//g;
  return one.replace(reg, "") === other.replace(reg, "");
}

/**
 * 将行末尾的换行符号转换
 * @param {String} str 需要转化的字符串
 */
function convertEnd(str) {
  return str.replace(/\r|\n/g, "");
}

module.exports = {
  npm,
  yarn,
  typeVali,
  message,
  getCustomRegistry,
  getAllRegisties,
  getAllCurrentRegistry,
  execCommand,
  printErr,
  printMsg,
  exit,
  line,
  endWithslash,
  replaceName,
  isSame,
  convertEnd,
  setRegistry
};
