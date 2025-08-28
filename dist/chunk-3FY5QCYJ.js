import {
  $Global,
  DEBUG,
  SERVERMODE,
  TEST,
  errorTrace,
  globalId,
  hasArray,
  hasObject,
  hasString,
  isFn,
  isObject,
  isString,
  template
} from "./chunk-C63VA6BJ.js";

// src/console/index.ts
import chalk from "chalk";
import { parseFilename } from "ufo";
var ConsoleEcho = class {
  /** 信息输出 */
  _echo(icon, bgColor, color, mode, message, ...optionalParams) {
    if ((!DEBUG || TEST) && mode !== "error") return;
    const stringify = (objColor, obj) => {
      obj = emptyString(obj);
      const str = isObject(obj) ? JSON.stringify(obj, null, "	") : obj;
      return objColor(` ${str} `);
    };
    const emptyString = (obj) => {
      if (typeof obj === "undefined") return chalk.bgGray.cyanBright(" Undefined ");
      if (obj === null) return chalk.bgGray.cyanBright(" Null ");
      if (obj === "") return chalk.bgGray.yellowBright(" EmptyString ");
      if (obj === true) return chalk.bgGray.greenBright(" True ");
      if (obj === false) return chalk.bgGray.redBright(" False ");
      return obj;
    };
    let source = chalk.reset.white(errorTrace(1, 1, ["$Global.echo", "consoleEcho."]));
    if (hasString(message) && hasArray(optionalParams)) {
      for (let i = 0; i < optionalParams.length; i++) {
        if (!hasObject(optionalParams[i])) continue;
        if (message.includes("{") && message.includes("}")) break;
        message = template(message, optionalParams[i]);
      }
    }
    if (message) {
      message = stringify(bgColor.bold, message) + "\n" + chalk.reset.white(source);
    } else {
      message = chalk.reset(color(source));
    }
    icon && (message = icon + " " + message);
    const len = optionalParams.length;
    const showIndex = mode === "debug" && len > 1;
    console.group(message);
    optionalParams.forEach((par, index) => {
      if (index === 0 && isFn(par)) {
        par();
      } else {
        if (showIndex) {
          console.log(`${index + 1}.`, par);
        } else {
          console.log(emptyString(par));
        }
      }
    });
    mode === "error" && console.error("...");
    mode === "warn" && console.warn("...");
    console.groupEnd();
  }
  /** 信息输出 */
  echo(color, message, ...optionalParams) {
    this._echo("", chalk.reset, color, "default", message, void 0, ...optionalParams);
  }
  /** 普通打印输出 */
  log(message, ...optionalParams) {
    DEBUG && console.log(message, ...optionalParams);
  }
  /** 表格显示 */
  table(tabularData, properties) {
    console.table(tabularData, properties);
  }
  /** 信息输出，蓝色 */
  information(message, ...optionalParams) {
    this._echo(
      message === "INFO" ? "\u2139" : "",
      chalk.bgBlue.whiteBright,
      chalk.blueBright,
      "default",
      message,
      ...optionalParams
    );
  }
  /** 信息输出，蓝色 */
  info(...optionalParams) {
    this.information("INFO", ...optionalParams);
  }
  /** 错误输出，红色 */
  error(message, ...optionalParams) {
    this._echo(
      message === "ERROR" ? "\u26D4" : "",
      chalk.bgRedBright.yellowBright,
      chalk.redBright,
      message === "ERROR" ? "error" : "default",
      message,
      ...optionalParams
    );
  }
  /** 错误输出，红色 */
  err(...optionalParams) {
    this.error("ERROR", ...optionalParams);
  }
  /** 警告输出，橙色 */
  warning(message, ...optionalParams) {
    this._echo(
      message === "WARN" ? "\u26A0" : "",
      chalk.bgYellowBright.redBright,
      chalk.yellowBright,
      message === "WARN" ? "warn" : "default",
      message,
      ...optionalParams
    );
  }
  /** 警告输出，橙色 */
  warn(...optionalParams) {
    this.warning("WARN", ...optionalParams);
  }
  /** 成功输出，绿色 */
  success(message, ...optionalParams) {
    this._echo(
      message === "SUCC" ? "\u2705" : "",
      chalk.bgGreen.whiteBright,
      chalk.green,
      "default",
      message,
      ...optionalParams
    );
  }
  /** 成功输出，绿色 */
  succ(...optionalParams) {
    this.success("SUCC", ...optionalParams);
  }
  /** 调试信息 */
  debug(...optionalParams) {
    var _a, _b;
    if (!hasArray(optionalParams)) return;
    const enabled = optionalParams[optionalParams.length - 1];
    if (enabled === "~") return;
    let title = "";
    let id = chalk.bgGray.yellowBright(` ${globalId()} `);
    if (isString(optionalParams[0]) && optionalParams[0]) {
      title = optionalParams[0];
      optionalParams = optionalParams.splice(1);
    }
    if (!SERVERMODE) {
      let source = chalk.reset.white(errorTrace(1, 1, ["$Global.echo", "consoleEcho."]));
      const infos = source == null ? void 0 : source.split(" (");
      if (hasArray(infos)) {
        !title && infos[0] && (title = infos[0].indexOf("[37m") > -1 ? ((_a = infos[0]) == null ? void 0 : _a.split("[37m")[1]) || "" : infos[0]);
        infos[1] && (id += chalk.bgBlack.whiteBright(
          " " + ((_b = parseFilename(infos[1], { strict: true })) == null ? void 0 : _b.split(":")[0])
        ));
      }
    }
    title && (title = chalk.bgMagenta.whiteBright(` ${title}`));
    this._echo(id, chalk.reset, chalk.white, "debug", title, ...optionalParams);
  }
};
var createConsoleEcho = () => {
  if (!$Global.con) {
    $Global.con = new ConsoleEcho();
    $Global.echo = (...optionalParams) => $Global.con.debug(...optionalParams);
  }
  return $Global.con;
};

export {
  ConsoleEcho,
  createConsoleEcho
};
