"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }













var _chunkU4TVRTVKcjs = require('./chunk-U4TVRTVK.cjs');

// src/console/index.ts
var _chalk = require('chalk'); var _chalk2 = _interopRequireDefault(_chalk);
var _ufo = require('ufo');
var ConsoleEcho = class {
  /** 信息输出 */
  _echo(icon, bgColor, color, mode, message, ...optionalParams) {
    if ((!_chunkU4TVRTVKcjs.DEBUG || _chunkU4TVRTVKcjs.TEST) && mode !== "error") return;
    const stringify = (objColor, obj) => {
      obj = emptyString(obj);
      const str = _chunkU4TVRTVKcjs.isObject.call(void 0, obj) ? JSON.stringify(obj, null, "	") : obj;
      return objColor(` ${str} `);
    };
    const emptyString = (obj) => {
      if (typeof obj === "undefined") return _chalk2.default.bgGray.cyanBright(" Undefined ");
      if (obj === null) return _chalk2.default.bgGray.cyanBright(" Null ");
      if (obj === "") return _chalk2.default.bgGray.yellowBright(" EmptyString ");
      if (obj === true) return _chalk2.default.bgGray.greenBright(" True ");
      if (obj === false) return _chalk2.default.bgGray.redBright(" False ");
      return obj;
    };
    let source = _chalk2.default.reset.white(_chunkU4TVRTVKcjs.errorTrace.call(void 0, 1, 1, ["$Global.echo", "consoleEcho."]));
    if (_chunkU4TVRTVKcjs.hasString.call(void 0, message) && _chunkU4TVRTVKcjs.hasArray.call(void 0, optionalParams)) {
      for (let i = 0; i < optionalParams.length; i++) {
        if (!_chunkU4TVRTVKcjs.hasObject.call(void 0, optionalParams[i])) continue;
        if (message.includes("{") && message.includes("}")) break;
        message = _chunkU4TVRTVKcjs.template.call(void 0, message, optionalParams[i]);
      }
    }
    if (message) {
      message = stringify(bgColor.bold, message) + "\n" + _chalk2.default.reset.white(source);
    } else {
      message = _chalk2.default.reset(color(source));
    }
    icon && (message = icon + " " + message);
    const len = optionalParams.length;
    const showIndex = mode === "debug" && len > 1;
    console.group(message);
    optionalParams.forEach((par, index) => {
      if (index === 0 && _chunkU4TVRTVKcjs.isFn.call(void 0, par)) {
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
    this._echo("", _chalk2.default.reset, color, "default", message, void 0, ...optionalParams);
  }
  /** 普通打印输出 */
  log(message, ...optionalParams) {
    _chunkU4TVRTVKcjs.DEBUG && console.log(message, ...optionalParams);
  }
  /** 表格显示 */
  table(tabularData, properties) {
    console.table(tabularData, properties);
  }
  /** 信息输出，蓝色 */
  information(message, ...optionalParams) {
    this._echo(
      message === "INFO" ? "\u2139" : "",
      _chalk2.default.bgBlue.whiteBright,
      _chalk2.default.blueBright,
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
      _chalk2.default.bgRedBright.yellowBright,
      _chalk2.default.redBright,
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
      _chalk2.default.bgYellowBright.redBright,
      _chalk2.default.yellowBright,
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
      _chalk2.default.bgGreen.whiteBright,
      _chalk2.default.green,
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
    if (!_chunkU4TVRTVKcjs.hasArray.call(void 0, optionalParams)) return;
    const enabled = optionalParams[optionalParams.length - 1];
    if (enabled === "~") return;
    let title = "";
    let id = _chalk2.default.bgGray.yellowBright(` ${_chunkU4TVRTVKcjs.globalId.call(void 0, )} `);
    if (_chunkU4TVRTVKcjs.isString.call(void 0, optionalParams[0]) && optionalParams[0]) {
      title = optionalParams[0];
      optionalParams = optionalParams.splice(1);
    }
    if (!_chunkU4TVRTVKcjs.SERVERMODE) {
      let source = _chalk2.default.reset.white(_chunkU4TVRTVKcjs.errorTrace.call(void 0, 1, 1, ["$Global.echo", "consoleEcho."]));
      const infos = source == null ? void 0 : source.split(" (");
      if (_chunkU4TVRTVKcjs.hasArray.call(void 0, infos)) {
        !title && infos[0] && (title = infos[0].indexOf("[37m") > -1 ? ((_a = infos[0]) == null ? void 0 : _a.split("[37m")[1]) || "" : infos[0]);
        infos[1] && (id += _chalk2.default.bgBlack.whiteBright(
          " " + ((_b = _ufo.parseFilename.call(void 0, infos[1], { strict: true })) == null ? void 0 : _b.split(":")[0])
        ));
      }
    }
    title && (title = _chalk2.default.bgMagenta.whiteBright(` ${title}`));
    this._echo(id, _chalk2.default.reset, _chalk2.default.white, "debug", title, ...optionalParams);
  }
};
var createConsoleEcho = () => {
  if (!_chunkU4TVRTVKcjs.$Global.con) {
    _chunkU4TVRTVKcjs.$Global.con = new ConsoleEcho();
    _chunkU4TVRTVKcjs.$Global.echo = (...optionalParams) => _chunkU4TVRTVKcjs.$Global.con.debug(...optionalParams);
  }
  return _chunkU4TVRTVKcjs.$Global.con;
};




exports.ConsoleEcho = ConsoleEcho; exports.createConsoleEcho = createConsoleEcho;
