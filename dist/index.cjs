"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  $Global: () => $Global,
  Base: () => base_exports,
  CACHE_TIME_MAX: () => CACHE_TIME_MAX,
  Cookies: () => cookies_default,
  DEBOUNCE_WINDOW_RESIZE: () => DEBOUNCE_WINDOW_RESIZE,
  DEBUG: () => DEBUG,
  DESCRIPTION: () => description,
  DecimalLength: () => DecimalLength,
  FormValidate: () => FormValidate,
  HOMEPAGE: () => homepage,
  HTTP_DEBUG: () => HTTP_DEBUG,
  LOGO: () => LOGO,
  LRU: () => LRU,
  MD5: () => MD52,
  NAME: () => name,
  QR: () => QR,
  QRCreate: () => QRCreate,
  QRErrorCorrectLevel: () => QRErrorCorrectLevel,
  QRObject: () => QRObject,
  SERVERMODE: () => SERVERMODE,
  TEST: () => TEST,
  TITLE: () => title,
  Tasks: () => Tasks,
  UIThemeQuery: () => UIThemeQuery,
  UIThemeSet: () => UIThemeSet,
  VERSION: () => version,
  arrayEmpty: () => empty2,
  arrayRemove: () => remove2,
  base64Decode: () => base64Decode,
  base64Encode: () => base64Encode,
  cache: () => cache_default,
  cleanDuplicate: () => cleanDuplicate,
  clear: () => clear,
  clone: () => clone,
  compare: () => compare,
  consoleEcho: () => consoleEcho,
  counting: () => counting,
  createHttpInstance: () => createHttpInstance,
  createImportantStyle: () => createImportantStyle,
  createTasks: () => createTasks,
  date: () => date,
  dateFormat: () => dateFormat,
  dateLong: () => dateLong,
  debounce: () => debounce,
  deleteCookie: () => deleteCookie,
  each: () => each,
  eachSync: () => eachSync,
  empty: () => empty,
  errorTrace: () => errorTrace,
  eventBus: () => eventBus,
  every: () => every,
  excelJson: () => exportJson,
  excelTable: () => exportTable,
  execute: () => execute,
  fingerprint: () => fingerprint,
  fnId: () => fnId,
  formValidate: () => formValidate_default,
  fullscreenExit: () => fullscreenExit,
  fullscreenLaunch: () => fullscreenLaunch,
  get: () => get,
  getCookie: () => getCookie,
  globalId: () => globalId,
  group: () => group,
  has: () => has,
  hasArray: () => hasArray,
  hasObject: () => hasObject,
  hasObjectName: () => hasObjectName,
  hasString: () => hasString,
  hash: () => hash,
  htmlClear: () => htmlClear,
  htmlEncode: () => htmlEncode,
  htmlSafe: () => htmlSafe,
  http: () => http,
  inRange: () => inRange,
  isArray: () => isArray,
  isAsync: () => isAsync,
  isBoolean: () => isBoolean,
  isCar: () => isCar,
  isChinese: () => isChinese,
  isDate: () => isDate,
  isEmail: () => isEmail,
  isEmpty: () => isEmpty,
  isEnglish: () => isEnglish,
  isEqual: () => isEqual,
  isFloat: () => isFloat,
  isFn: () => isFn,
  isFullUrl: () => isFullUrl,
  isFullscreen: () => isFullscreen,
  isGuid: () => isGuid,
  isHttp: () => isHttp,
  isIP: () => isIP,
  isInt: () => isInt,
  isJSON: () => isJSON,
  isMatch: () => isMatch,
  isMobile: () => isMobile,
  isNaN: () => isNaN2,
  isName: () => isName,
  isNil: () => isNil,
  isNumber: () => isNumber,
  isObject: () => isObject,
  isPhone: () => isPhone,
  isPrimitive: () => isPrimitive,
  isRegExp: () => isRegExp,
  isString: () => isString,
  isSymbol: () => isSymbol,
  isUrl: () => isUrl,
  isVueComponent: () => isVueComponent,
  jsonDownload: () => jsonDownload,
  list: () => list,
  list2tree: () => list2tree,
  listConvert: () => listConvert,
  listParents: () => listParents,
  listTop: () => listTop,
  math: () => math,
  merge: () => merge,
  modulesUpdate: () => modulesUpdate,
  modulesUpdateSync: () => modulesUpdateSync,
  notEmpty: () => notEmpty,
  number: () => number,
  objectDownload: () => objectDownload,
  range: () => range,
  reduce: () => reduce,
  remoteFileToBase64: () => remoteFileToBase64,
  remove: () => remove,
  rnd: () => rnd,
  screenType: () => screenType,
  select: () => select,
  set: () => set,
  setCookie: () => setCookie,
  sleep: () => sleep,
  some: () => some,
  sort: () => sort,
  string2Value: () => string2Value,
  stringClear: () => stringClear,
  stringCut: () => stringCut,
  stringIncludes: () => stringIncludes,
  template: () => template,
  throttle: () => throttle,
  toArray: () => toArray,
  toDate: () => toDate,
  toDeepObject: () => toDeepObject,
  toFloat: () => toFloat,
  toHtml: () => toHtml,
  toInt: () => toInt,
  toJSON: () => toJSON,
  toObject: () => toObject,
  toSingleObject: () => toSingleObject,
  treeConvert: () => treeConvert,
  treeExecute: () => treeExecute,
  treeFind: () => treeFind,
  treeFindAll: () => treeFindAll,
  treeParents: () => treeParents,
  trimEx: () => trimEx,
  typeName: () => typeName,
  waterMark: () => waterMark_default,
  xor: () => xor
});
module.exports = __toCommonJS(index_exports);

// package.json
var name = "@da.li/core-libs";
var title = "\u5927\u6CA5\u7F51\u7EDC\u51FD\u6570\u5E93";
var version = "1.25.731";
var description = "\u5927\u6CA5\u7F51\u7EDC\u51FD\u6570\u5E93\u662F\u5927\u6CA5\u7F51\u7EDC\u63D0\u4F9B\u7684\u4E00\u4E2A\u516C\u5171 TypeScript \u51FD\u6570\u5E93\uFF0C\u5C01\u88C5\u4E86\u57FA\u7840\u64CD\u4F5C\u3001\u7F13\u5B58\u3001\u52A0\u5BC6\u3001\u6587\u4EF6\u5904\u7406\u3001HTTP \u8BF7\u6C42\u7B49\u5E38\u7528\u529F\u80FD\u6A21\u5757\uFF0C\u65E8\u5728\u63D0\u9AD8\u5F00\u53D1\u6548\u7387\u3002";
var homepage = "http://www.hunandali.com/";

// config.ts
var LOGO = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgc3R5bGU9ImJhY2tncm91bmQ6ICNGRkZGRkYiPjxwYXRoIGQ9Ik03ODguNzUwMDggMzkwLjcwMzM2TDcwOS41ODg0OCA0NC43NjY3MmwtOC4wNzU1MiA0Ljg4OTYtNTY0LjYzMzYgMzQxLjkxODcyIDMyMi42NzM5MiA1ODYuMzM0NzIgMjI1LjUzODU2LTI0Ny4zMzU2OGgyNC44MDM4NGwtMjYyLjcwNzIgMjkzLjQyNDY0TDcyLjM3ODg4IDM3NC44MDk2IDcyMS41NjkyOCAwbDg1LjgxODg4IDM5MC43MDMzNmgtMTguNjM2OHogbS02MjYuODU5NTIgNy4zNjUxMkw3MDQuNjU2NjQgNjMuMTc1NjhsNzYuMjIxNDQgMzI3LjUyNzY4aC0yMi4wMDcwNEw2OTEuMjU4ODggMTEzLjExNDg4IDIyNS43MzE4NCA0MTQuNjEzNzZsMjUyLjYyMDggNDkzLjA3Nzc2IDE2Ni4yODk5Mi0xNzcuMTE3NDRoMjkuODcwMDhjLTg2LjQ0NjA4IDk0LjA3NDg4LTE4My41ODUyOCAxOTkuNzgyNC0yMDkuODg4IDIyOC40MDgzMkwxNjEuODkwNTYgMzk4LjA2ODQ4eiIgZmlsbD0iIzAwNUVBNyI+PC9wYXRoPjxwYXRoIGQ9Ik01NDYuOTUwNCA2OTMuNjcwNGwtNjguOTg2ODgtMjI0LjEwNDk2IDYuMjM2MTYgMC4xMzA1NiA0MzYuMDUxMiA5LjExMzYgOS4wNjYyNCA0NDIuMTEwNzItMjEwLjc2NDgtNjcuMDIyMDgtMTQuMTk1MiA4LjE5NTg0IDI0Ny4yNjI3MiA4MS4xMTM2VjQ0Ny45MDRINDU2LjMxODcybDc5Ljk2OTI4IDI1MS45MjE5MiAxMC42NjI0LTYuMTU2OHogbTM2MS4xMzQwOC0yMDIuODg1MTJjLTc3LjE4MDE2LTIuMjU1MzYtNDIxLjIxNzI4LTEyLjMxNjE2LTQyMS4yMTcyOC0xMi4zMTYxNmw2NC41OTEzNiAyMTIuNTk3NzYgMTIuNTkxMzYtNy4yNzE2OC01My4wMTYzMi0xODEuMTc2MzIgMzY1Ljk4NTI4IDE4LjcyNzY4IDE4LjM0MzY4IDM2NS42MDY0LTE1My42Njc4NC00Ni40MTY2NC0xNy4wOTE4NCA5Ljg2ODggMTk1LjU1ODQgNjEuMzU4MDhzLTkuOTUyLTM0Ni44NDE2LTEyLjA3NjgtNDIwLjk3NzkyeiIgZmlsbD0iI0YwODMyMSI+PC9wYXRoPjwvc3ZnPg==";
var DEBUG = process.env.NODE_ENV !== "production";
var TEST = process.env.NODE_ENV === "test";
var SERVERMODE = typeof window === "undefined";
var DEBOUNCE_WINDOW_RESIZE = 300;
var CACHE_TIME_MAX = SERVERMODE ? 5 : 30;

// src/base/index.ts
var base_exports = {};
__export(base_exports, {
  $Global: () => $Global,
  DecimalLength: () => DecimalLength,
  arrayEmpty: () => empty2,
  arrayRemove: () => remove2,
  cleanDuplicate: () => cleanDuplicate,
  clear: () => clear,
  clone: () => clone,
  compare: () => compare,
  counting: () => counting,
  date: () => date,
  dateFormat: () => dateFormat,
  dateLong: () => dateLong,
  debounce: () => debounce,
  each: () => each,
  eachSync: () => eachSync,
  empty: () => empty,
  errorTrace: () => errorTrace,
  every: () => every,
  execute: () => execute,
  fingerprint: () => fingerprint,
  fnId: () => fnId,
  get: () => get,
  globalId: () => globalId,
  group: () => group,
  has: () => has,
  hasArray: () => hasArray,
  hasObject: () => hasObject,
  hasObjectName: () => hasObjectName,
  hasString: () => hasString,
  hash: () => hash,
  htmlClear: () => htmlClear,
  htmlEncode: () => htmlEncode,
  htmlSafe: () => htmlSafe,
  inRange: () => inRange,
  isArray: () => isArray,
  isAsync: () => isAsync,
  isBoolean: () => isBoolean,
  isCar: () => isCar,
  isChinese: () => isChinese,
  isDate: () => isDate,
  isEmail: () => isEmail,
  isEmpty: () => isEmpty,
  isEnglish: () => isEnglish,
  isEqual: () => isEqual,
  isFloat: () => isFloat,
  isFn: () => isFn,
  isFullUrl: () => isFullUrl,
  isGuid: () => isGuid,
  isHttp: () => isHttp,
  isIP: () => isIP,
  isInt: () => isInt,
  isJSON: () => isJSON,
  isMatch: () => isMatch,
  isMobile: () => isMobile,
  isNaN: () => isNaN2,
  isName: () => isName,
  isNil: () => isNil,
  isNumber: () => isNumber,
  isObject: () => isObject,
  isPhone: () => isPhone,
  isPrimitive: () => isPrimitive,
  isRegExp: () => isRegExp,
  isString: () => isString,
  isSymbol: () => isSymbol,
  isUrl: () => isUrl,
  isVueComponent: () => isVueComponent,
  list: () => list,
  list2tree: () => list2tree,
  listConvert: () => listConvert,
  listParents: () => listParents,
  listTop: () => listTop,
  math: () => math,
  merge: () => merge,
  modulesUpdate: () => modulesUpdate,
  modulesUpdateSync: () => modulesUpdateSync,
  notEmpty: () => notEmpty,
  number: () => number,
  range: () => range,
  reduce: () => reduce,
  remove: () => remove,
  rnd: () => rnd,
  select: () => select,
  set: () => set,
  sleep: () => sleep,
  some: () => some,
  sort: () => sort,
  string2Value: () => string2Value,
  stringClear: () => stringClear,
  stringCut: () => stringCut,
  stringIncludes: () => stringIncludes,
  template: () => template,
  throttle: () => throttle,
  toArray: () => toArray,
  toDate: () => toDate,
  toDeepObject: () => toDeepObject,
  toFloat: () => toFloat,
  toHtml: () => toHtml,
  toInt: () => toInt,
  toJSON: () => toJSON,
  toObject: () => toObject,
  toSingleObject: () => toSingleObject,
  treeConvert: () => treeConvert,
  treeExecute: () => treeExecute,
  treeFind: () => treeFind,
  treeFindAll: () => treeFindAll,
  treeParents: () => treeParents,
  trimEx: () => trimEx,
  typeName: () => typeName
});

// src/base/type.ts
function typeName(value) {
  let type = (typeof value).toString();
  if (type === "object") {
    type = Object.prototype.toString.call(value);
    type = type.replace("[object ", "").replace("]", "");
  }
  return type;
}
var isArray = Array.isArray;
var isSymbol = (value) => {
  return !!value && value.constructor === Symbol;
};
var isObject = (value) => {
  return !!value && value.constructor === Object;
};
var isPrimitive = (value) => {
  return value === void 0 || value === null || typeof value !== "object" && typeof value !== "function";
};
var isFunction = (value) => {
  return !!(value && value.constructor && value.call && value.apply);
};
var isFn = isFunction;
var isAsync = (value) => {
  return isFn(value) && value[Symbol.toStringTag] === "AsyncFunction";
};
var isString = (value) => {
  return typeof value === "string" || value instanceof String;
};
var isNumber = (value) => {
  try {
    return Number(value) === value;
  } catch (e2) {
    return false;
  }
};
var isDate = (value) => {
  return Object.prototype.toString.call(value) === "[object Date]";
};
var isEmpty = (value) => {
  if (value === true || value === false) return true;
  if (value === null || value === void 0) return true;
  if (isNumber(value)) return value === 0;
  if (isDate(value)) return isNaN2(value.getTime());
  if (isFunction(value)) return false;
  if (isSymbol(value)) return false;
  if (value.constructor === Object) {
    const keys = Object.keys(value).length;
    return keys === 0;
  }
  const length = value.length;
  if (isNumber(length)) return length === 0;
  const size = value.size;
  if (isNumber(size)) return size === 0;
  return false;
};
var isBoolean = (value) => value === true || value === false || typeof value === "boolean";
var isRegExp = (value) => !!value && value instanceof RegExp;
var isNil = (value) => value === null || value === void 0;
var isNaN2 = (value) => !isNumber(value);
var isVueComponent = (input) => {
  if (!hasObject(input)) return false;
  const target = input;
  if (target._isVue === true || target.__isVue === true) {
    return true;
  }
  if (isFn(target.setup) || isFn(target.render)) {
    return true;
  }
  return false;
};
var notEmpty = (value) => !isEmpty(value);
var hasObject = (value) => isObject(value) && Object.keys(value).length > 0;
var hasObjectName = (value, name2) => !!name2 && hasObject(value) && value.hasOwnProperty(name2);
var hasArray = (value) => !!value && isArray(value) && value.length > 0;
var hasString = (value) => !!value && isString(value) && value !== "";

// src/base/value.ts
var isEqual = (x, y) => {
  if (Object.is(x, y)) return true;
  if (x instanceof Date && y instanceof Date) {
    return x.getTime() === y.getTime();
  }
  if (x instanceof RegExp && y instanceof RegExp) {
    return x.toString() === y.toString();
  }
  if (typeof x !== "object" || x === null || typeof y !== "object" || y === null) {
    return false;
  }
  const keysX = Reflect.ownKeys(x);
  const keysY = Reflect.ownKeys(y);
  if (keysX.length !== keysY.length) return false;
  for (let i = 0; i < keysX.length; i++) {
    if (!Reflect.has(y, keysX[i])) return false;
    if (!isEqual(x[keysX[i]], y[keysX[i]])) return false;
  }
  return true;
};
function isMatch(val, reg) {
  if (!val) return false;
  const testValue = isString(val) ? val : val.toString();
  return reg.test(testValue);
}
function isMobile(val) {
  return isMatch(val, /^1[3-9]\d{9}$/);
}
function isCar(val) {
  return isMatch(
    val,
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/
  );
}
function isPhone(val) {
  return isMatch(
    val,
    /^(((0[0-9]{2,3}(\-| ))?([1-9][0-9]{6,7})+((\-| )[0-9]{1,4})?)|(1[3-9]\d{9}|^1060[1-9]\d{1,2}\d{7,8}))$/
  );
}
function isEmail(val) {
  return isMatch(val, /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
}
var DOMAIN = `([a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*|localhost|\\[([0-9a-fA-F:]+)\\])`;
var PORT = `(:\\d+)?`;
var PATH = `(\\/[\\w-._~!$&'()*+,;=:@/%#?]*)*`;
var QUERY = `(\\?[^#]*)?(#[\\w-]*)?`;
function isUrl(val) {
  return isMatch(val, new RegExp(`^(ht|f)tps?://${DOMAIN}${PORT}(/[\\w/.?#-]*)?$`));
}
function isFullUrl(val) {
  return isMatch(val, new RegExp(`^((ht|f)tps?://)?${DOMAIN}${PORT}${PATH}${QUERY}$`));
}
function isHttp(val) {
  return isMatch(val, new RegExp(`^https?://${DOMAIN}${PORT}${PATH}${QUERY}$`));
}
function isGuid(val) {
  return isMatch(
    val,
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
  );
}
function isChinese(val) {
  return isMatch(val, /^[\u4e00-\u9fa5]{0,}$/);
}
function isEnglish(val) {
  return isMatch(val, /^[A-Za-z]+$/);
}
function isName(val, len = 100) {
  len -= 1;
  if (len < 1) len = 1;
  return isMatch(val, new RegExp("^[a-zA-Z]{1,1}[0-9\\.\\-_a-zA-Z]{1," + len + "}$"));
}
function isIP(val) {
  return isMatch(
    val,
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  );
}
function isJSON(val) {
  if (!isString(val)) return false;
  try {
    const obj = JSON.parse(val);
    return !isEmpty(obj);
  } catch (e2) {
  }
  return false;
}
var isInt = (value) => {
  return isNumber(value) && value % 1 === 0;
};
var isFloat = (value) => {
  return isNumber(value) && value % 1 !== 0;
};

// src/base/string.ts
var import_isomorphic_dompurify = __toESM(require("isomorphic-dompurify"), 1);
var template = (str, data, regex = /\{(.+?)\}/g) => {
  return Array.from(str.matchAll(regex)).reduce((acc, match) => {
    const key = trimEx(match[1]);
    return acc.replace(match[0], data[key] || "");
  }, str);
};
var trimEx = (str, charsToTrim = "\b\f\n\r	\v\u3000 ") => {
  if (!str) return "";
  const toTrim = charsToTrim.replace(/[\W]{1}/g, "\\$&");
  const regex = new RegExp(`^[${toTrim}]+|[${toTrim}]+$`, "g");
  return str.replace(regex, "");
};
var string2Value = (value, splitter) => {
  var _a;
  if (splitter) return (_a = value.split(splitter)) == null ? void 0 : _a.map((arg) => string2Value(arg));
  value = trimEx(value);
  switch (value) {
    case "undefined":
      return void 0;
    case "null":
      return null;
    case "true":
      return true;
    case "false":
      return false;
    default:
      const num = Number(value);
      if (isNumber(num)) return num;
      return value;
  }
};
function stringCut(str, len = 10, eli = "\u2026\u2026", mode = 0) {
  if (!hasString(str)) return "";
  if (len === 0 || str.length <= len) return str;
  switch (mode) {
    case 1:
      return str.substring(0, len) + eli;
    case 2:
      return eli + str.substring(str.length - len);
    default:
      const mid = Math.floor(len / 2);
      return str.substring(0, mid) + eli + str.substring(str.length - mid);
  }
}
function stringClear(str, len, mode = 0) {
  if (!hasString(str)) return "";
  str = htmlClear(str).trim();
  return stringCut(str, len, "\u2026\u2026", mode);
}
function htmlClear(str) {
  if (!hasString(str)) return "";
  return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/<[^>]+>/g, "").replace(/(^\s*)|(\s*$)/g, "");
}
function htmlSafe(dirty, config) {
  return import_isomorphic_dompurify.default.sanitize(dirty, config || { USE_PROFILES: { html: true } });
}
function htmlEncode(str) {
  if (!hasString(str)) return "";
  return str.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/ /g, "&nbsp;");
}
function stringIncludes(source, target, ingoreCase = true) {
  if (source === target || target === "*") return true;
  if (!hasString(source) || !hasString(target)) return false;
  const sourceText = ingoreCase ? source.toLowerCase() : source;
  const targetText = ingoreCase ? target.toLowerCase() : target;
  if (sourceText === targetText) return true;
  if (targetText.endsWith("*") && !targetText.endsWith("*")) {
    const prefix = targetText.substring(0, targetText.length - 1);
    return sourceText.startsWith(prefix);
  }
  if (targetText.startsWith("*") && !targetText.startsWith("*")) {
    const suffix = targetText.substring(1);
    return sourceText.endsWith(suffix);
  }
  if (targetText.startsWith("*") && targetText.endsWith("*")) {
    const substr = targetText.substring(1, targetText.length - 1);
    return sourceText.includes(substr);
  }
  if (!targetText.startsWith("*") && !targetText.endsWith("*") && targetText.includes("*")) {
    const parts = targetText.split("*");
    const prefix = parts[0];
    const suffix = parts[parts.length - 1];
    if (!sourceText.startsWith(prefix) || !sourceText.endsWith(suffix)) return false;
    const middle = parts.filter((x) => !!x).slice(1, parts.length - 2);
    if (middle.length < 1) return true;
    let index = prefix.length;
    for (const part of middle) {
      index = sourceText.indexOf(part, index);
      if (index === -1) return false;
      index += part.length;
    }
    return true;
  }
  if (targetText.startsWith("(") && targetText.endsWith(")")) {
    try {
      const regexStr = targetText.substring(1, targetText.length - 2);
      const regex = new RegExp(regexStr, ingoreCase ? "i" : "");
      return regex.test(sourceText);
    } catch (e2) {
    }
  }
  if (targetText.includes("*")) {
    const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regexParts = targetText.split("*").map(escapeRegExp);
    let regexStr = "";
    if (targetText.startsWith("*") && targetText.endsWith("*")) {
      regexStr = regexParts.filter(Boolean).join(".*");
    } else if (targetText.startsWith("*")) {
      regexStr = `.*${regexParts[regexParts.length - 1]}$`;
    } else if (targetText.endsWith("*")) {
      regexStr = `^${regexParts[0]}.*`;
    } else {
      regexStr = `^${regexParts.join(".*")}$`;
    }
    const regex = new RegExp(regexStr, ingoreCase ? "i" : "");
    return regex.test(sourceText);
  }
  return false;
}

// src/base/object.ts
var empty = (obj, filter = (x) => isNil(x)) => {
  if (!obj) return {};
  const keys = Object.keys(obj);
  return keys.reduce((acc, key) => {
    if (filter(obj[key])) {
      return acc;
    } else {
      acc[key] = obj[key];
      return acc;
    }
  }, {});
};
var clear = (obj, filter = (x) => isNil(x) || x.toString().trim() === "", deep = false) => {
  if (!obj || filter(obj)) return void 0;
  if (!hasObject(obj)) return obj;
  const keys = Object.keys(obj);
  return keys.reduce((acc, key) => {
    if (filter(obj[key])) return acc;
    if (isObject(obj[key]) && deep) {
      const value = clear(obj[key], filter);
      hasObject(value) && (acc[key] = value);
      return acc;
    }
    if (isArray(obj[key]) && deep) {
      const value = obj[key].map((item) => clear(item)).filter((item) => !filter(item));
      hasArray(value) && (acc[key] = value);
      return acc;
    }
    acc[key] = obj[key];
    return acc;
  }, {});
};
var get = (value, path, defaultValue) => {
  if (isEmpty(value) || isEmpty(path)) return defaultValue;
  const segments = isArray(path) ? path : path.split(/[\.\[\]]/g);
  let current = value;
  for (const key of segments) {
    if (isNil(current)) return defaultValue;
    const dequoted = key.replace(/['"]/g, "");
    if (dequoted.trim() === "") continue;
    current = current[dequoted];
  }
  return isNil(current) ? defaultValue : current;
};
var set = (initial, path, value) => {
  if (!initial) return {};
  if (isEmpty(path)) return initial;
  const segments = isArray(path) ? path : path.split(/[\.\[\]]/g).filter((x) => !!x.trim());
  const _set = (node) => {
    if (segments.length > 1) {
      const key = segments.shift();
      const nextIsNum = isNumber(parseInt(segments[0]));
      isNil(node[key]) && (node[key] = nextIsNum ? [] : {});
      if (nextIsNum && !isArray(node[key])) {
        node[key] = [node[key]];
      } else if (!nextIsNum && !isObject(node[key])) {
        node[key] = { "": node[key] };
      }
      _set(node[key]);
    } else {
      node[segments[0]] = value;
    }
  };
  _set(initial);
  return initial;
};
var remove = (value, path) => {
  if (isEmpty(value) || isEmpty(path)) return value;
  let segments = isArray(path) ? path : path.split(/[\.\[\]]/g);
  segments = segments.map((x) => x.replace(/['"]/g, "").trim()).filter((x) => x !== "");
  let obj = value;
  for (let i = 0; i < segments.length; i++) {
    const key = segments[i];
    if (isNil(obj)) return value;
    if (i === segments.length - 1) {
      delete obj[key];
    } else {
      obj = obj[key];
    }
  }
  return value;
};
var has = (value, path) => {
  if (isEmpty(value) || isEmpty(path)) return false;
  let segments = isArray(path) ? path : path.split(/[\.\[\]]/g);
  segments = segments.map((x) => x.replace(/['"]/g, "").trim()).filter((x) => x !== "");
  for (let i = 0; i < segments.length; i++) {
    const key = segments[i];
    value = value[key];
    if (value === void 0) return false;
  }
  return true;
};
var each = (obj, action) => {
  if (!isFn(action)) return false;
  if (isArray(obj)) {
    for (let idx = 0, len = obj.length; idx < len; idx++) action(obj[idx], idx, obj);
    return true;
  } else if (isObject(obj)) {
    for (let key in obj) action(obj[key], key, obj);
    return true;
  }
  return false;
};
var eachSync = async (obj, action) => {
  if (!isFn(action)) return false;
  if (isArray(obj)) {
    for (let idx = 0, len = obj.length; idx < len; idx++) await action(obj[idx], idx, obj);
    return true;
  } else if (isObject(obj)) {
    for (let key in obj) await action(obj[key], key, obj);
    return true;
  }
  return false;
};
var reduce = (obj, callbackfn, initialValue) => {
  if (!isFn(callbackfn) || !hasObject(obj) && !hasArray(obj)) return initialValue;
  if (isArray(obj)) {
    return obj.reduce((pre, curr, index) => callbackfn(pre, curr, index, obj), initialValue);
  } else {
    const data = obj;
    return Object.keys(data).reduce(
      (pre, curr) => callbackfn(pre, data[curr], curr, obj),
      initialValue
    );
  }
};
var math = (obj, value, math2 = "sum", defaultValue) => {
  if (!isFn(value)) return void 0;
  const def = math2 === "min" ? Number.MAX_SAFE_INTEGER : math2 === "max" ? Number.MIN_SAFE_INTEGER : 0;
  const defValue = isNil(defaultValue) ? def : defaultValue;
  const ret = reduce(
    obj,
    (pre, curr, index) => {
      let val = value(curr, index, obj);
      !isNumber(val) && (val = defValue);
      return math2 === "min" ? Math.min(pre, val) : math2 === "max" ? Math.max(pre, val) : pre + val;
    },
    def
  );
  if (math2 === "avg") {
    return ret / (isArray(obj) ? obj.length : Object.keys(obj).length);
  } else {
    return ret;
  }
};
var every = (obj, callbackfn) => {
  if (!isFn(callbackfn) || !hasObject(obj) && !hasArray(obj)) return false;
  if (isArray(obj)) {
    return obj.every((element, index) => callbackfn(element, index, obj));
  } else {
    const data = obj;
    return Object.keys(data).every((element) => callbackfn(data[element], element, obj));
  }
};
var some = (obj, callbackfn) => {
  if (!isFn(callbackfn) || !hasObject(obj) && !hasArray(obj)) return false;
  if (isArray(obj)) {
    return obj.some((element, index) => callbackfn(element, index, obj));
  } else {
    const data = obj;
    return Object.keys(data).some((element) => callbackfn(data[element], element, obj));
  }
};
var toArray = (obj, toItem) => {
  if (!obj || !isFn(toItem)) return [];
  const entries = Object.entries(obj);
  if (entries.length === 0) return [];
  return entries.reduce((acc, entry) => {
    acc.push(toItem(entry[0], entry[1]));
    return acc;
  }, []);
};
var toHtml = (value, maxDeep = 10, skipFunction = true, skipEmpty = false, skipUnderline = false, enSort = false) => {
  if (isNil(value) || maxDeep < 1) return "";
  if (value === "") return " ";
  if (skipFunction && isFn(value)) return "";
  const ret = [];
  const isRun = each(value, (obj, key) => {
    if (skipUnderline && key.toString().startsWith("_")) return;
    const type = typeName(obj);
    let text = toHtml(obj, maxDeep - 1, skipFunction, skipEmpty, skipUnderline);
    const skip = skipEmpty && !text;
    if (!text) text = `<code title="${type} \u7A7A\u5185\u5BB9" class="text-2">N/A</code>`;
    if (!skip) ret.push(`<li><b>${key}</b>\uFF1A${text}</li>`);
  });
  if (isRun) {
    enSort && ret.sort();
    return ret.length > 0 ? `<ul>${ret.join("")}</ul>` : "";
  } else {
    return htmlEncode(String(value));
  }
};
var toJSON = (source) => {
  try {
    const obj = isString(source) ? JSON.parse(source) : source;
    if (isObject(obj) || isArray(obj)) return obj;
  } catch (e2) {
  }
  return void 0;
};
var clone = (obj, deep = true, hash2 = /* @__PURE__ */ new WeakMap()) => {
  if (isNil(obj) || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  const key = obj;
  if (hash2.has(key)) return hash2.get(key);
  hash2.set(key, null);
  const _clone_value = (value, deep2 = true) => deep2 ? clone(value, deep2, hash2) : value;
  const _clone_new = (value, args) => {
    var Ctor = value.__proto__.constructor;
    return args ? new Ctor(args) : new Ctor();
  };
  let result = obj;
  switch (Object.prototype.toString.call(obj)) {
    case "[object Object]": {
      const newObj = Object.create(Object.getPrototypeOf(obj));
      for (let i in obj) {
        newObj[i] = _clone_value(obj[i], deep);
      }
      result = newObj;
      break;
    }
    case "[object Array]":
    case "[object Arguments]": {
      const newObj = [];
      const oldObj = obj;
      for (let i = 0; i < oldObj.length; i++) {
        newObj.push(_clone_value(oldObj[i], deep));
      }
      result = newObj;
      break;
    }
    case "[object Set]": {
      const newObj = _clone_new(obj);
      obj.forEach((value) => {
        newObj.add(_clone_value(value, deep));
      });
      result = newObj;
      break;
    }
    case "[object Map]": {
      const newObj = _clone_new(obj);
      obj.forEach((value, key2) => {
        newObj.set(key2, _clone_value(value, deep));
      });
      result = newObj;
      break;
    }
  }
  hash2.set(key, result);
  return result;
};
var merge = (...args) => {
  if (args.length < 1) return;
  const _merge = (original2, resource) => {
    if (isObject(original2)) {
      const flag = each(
        resource,
        (value, key) => original2[key] = _merge(original2[key], value)
      );
      if (!flag) original2 = resource;
    } else if (isArray(resource)) {
      if (isArray(original2)) {
        resource.forEach((value, index) => {
          if (original2.length > index) {
            original2[index] = _merge(original2[index], value);
          } else {
            original2.push(value);
          }
        });
      } else {
        original2 = resource;
      }
    } else {
      original2 = resource;
    }
    return original2;
  };
  let original = args[0];
  for (let index = 1; index < args.length; index++) {
    original = _merge(original, args[index]);
  }
  return original;
};
var toSingleObject = (obj, keepSource = false) => {
  const ret = {};
  _singleObj(ret, obj, "", keepSource);
  return ret;
};
var _singleObj = (data, obj, prefix, keepSource = false) => {
  if (isObject(obj) || isArray(obj)) {
    each(obj, (value, key) => {
      keepSource && !prefix && (data[key] = value);
      const name2 = prefix ? `${prefix}.${key}` : `${key}`;
      _singleObj(data, value, name2, false);
    });
  } else if (prefix) {
    data[prefix] = obj;
  }
};
function toDeepObject(obj, keepSource = false, keepMainKey = true) {
  if (!hasObject(obj)) return {};
  const ret = {};
  const keys = Object.keys(obj);
  keys.filter((key) => !key.includes(".")).forEach((key) => {
    if (keepMainKey && keys.some((k) => k.startsWith(key + "."))) {
      ret[key] = { "": obj[key] };
    } else {
      ret[key] = obj[key];
    }
  });
  keys.filter((key) => key.includes(".")).forEach((key) => set(ret, key, obj[key]));
  return keepSource ? Object.assign(ret, obj) : ret;
}

// src/base/array.ts
var compare = (a, b2, getter) => {
  const fn = getter ? isFn(getter) ? getter : (item) => item[getter] : (item) => item;
  let x = fn(a);
  let y = fn(b2);
  if (isNumber(x) && isNumber(y)) return x - y;
  x = (x || "").toString();
  y = (y || "").toString();
  return x.localeCompare(y);
};
var sort = (array, getter, desc = false) => {
  const _sort = (a, b2) => {
    let x = getter(a);
    let y = getter(b2);
    if (isNumber(x) && isNumber(y)) return desc ? y - x : x - y;
    x = (x || "").toString();
    y = (y || "").toString();
    return desc ? y.localeCompare(x) : x.localeCompare(y);
  };
  return array.sort(_sort);
};
function* range(startOrLength, end, valueOrMapper = (i) => i, step = 1) {
  const mapper = isFn(valueOrMapper) ? valueOrMapper : () => valueOrMapper;
  const start = end ? startOrLength : 0;
  const final = end != null ? end : startOrLength;
  for (let i = start; i <= final; i += step) {
    yield mapper(i);
    if (i + step > final) break;
  }
}
var list = (startOrLength, end, valueOrMapper, step) => {
  return Array.from(range(startOrLength, end, valueOrMapper, step));
};
var counting = (list2, identity) => {
  if (!list2) return {};
  return list2.reduce((acc, item) => {
    var _a;
    const id = identity(item);
    acc[id] = ((_a = acc[id]) != null ? _a : 0) + 1;
    return acc;
  }, {});
};
var group = (array, getGroupId) => {
  return array.reduce((acc, item) => {
    const groupId = getGroupId(item);
    if (!acc[groupId]) acc[groupId] = [];
    acc[groupId].push(item);
    return acc;
  }, {});
};
var toObject = (array, getKey, getValue = (item) => item) => {
  return array.reduce((acc, item) => {
    acc[getKey(item)] = getValue(item);
    return acc;
  }, {});
};
var select = (array, condition, mapper) => {
  if (!array) return [];
  return array.reduce((acc, item, index) => {
    if (!condition(item, index)) return acc;
    acc.push(mapper(item, index));
    return acc;
  }, []);
};
var empty2 = (list2, filter = (x) => isNil(x)) => {
  var _a;
  return (_a = list2 == null ? void 0 : list2.filter(filter)) != null ? _a : [];
};
var remove2 = (array, predicate, position = false) => {
  if (!array || !predicate) return array;
  const filter = isFn(predicate) ? predicate : (value) => isEqual(value, predicate);
  if (position === true || position === "left") {
    const idx = array.findIndex(filter);
    if (idx > -1) array.splice(idx, idx + 1);
  }
  if (position === "right") {
    const idx = array.findLastIndex(filter);
    if (idx > -1) array.splice(idx, idx + 1);
  }
  if (!position) return array.filter((value, index, array2) => !filter(value, index, array2));
  return array;
};
function cleanDuplicate(array, clearValue) {
  if (!hasArray(array)) return [];
  const filter = isFn(clearValue) ? clearValue : (x) => !isNil(x);
  return [...new Set(array)].filter(filter);
}

// src/base/number.ts
function number(value) {
  value = Number(value);
  return isNaN2(value) ? 0 : value;
}
function inRange(number2, start, end) {
  const isTypeSafe = typeof number2 === "number" && typeof start === "number" && (typeof end === "undefined" || typeof end === "number");
  if (!isTypeSafe) {
    return false;
  }
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  return number2 >= Math.min(start, end) && number2 < Math.max(start, end);
}
var toFloat = (value, defaultValue) => {
  const def = defaultValue === void 0 ? 0 : defaultValue;
  if (value === null || value === void 0) {
    return def;
  }
  const result = parseFloat(value);
  return isNaN2(result) ? def : result;
};
var toInt = (value, defaultValue) => {
  const def = defaultValue === void 0 ? 0 : defaultValue;
  if (value === null || value === void 0) {
    return def;
  }
  const result = parseInt(value);
  return isNaN2(result) ? def : result;
};
function DecimalLength(value) {
  const valueString = value.toString();
  const decimalPlace = valueString.indexOf(".");
  if (decimalPlace === -1) {
    return 0;
  } else {
    return valueString.length - decimalPlace - 1;
  }
}
function toDate(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const remainingSeconds = seconds % 60;
  const h = hours < 10 ? "0" + hours : hours;
  const m = minutes < 10 ? "0" + minutes : minutes;
  const s = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
  return `${h}:${m}:${s}`;
}

// src/base/treeList.ts
function treeExecute(list2, func, childrenKey = "children") {
  if (!isFn(func)) return;
  const arr = isObject(list2) ? [list2] : list2;
  if (!hasArray(arr)) return;
  for (let i = 0, len = arr.length; i < len; i++) {
    const item = arr[i];
    if (!item) continue;
    func(item);
    treeExecute(item[childrenKey], func);
  }
}
function treeFind(list2, func, childrenKey = "children") {
  if (!isFn(func)) return;
  const arr = isObject(list2) ? [list2] : list2;
  if (!hasArray(arr)) return;
  for (let i = 0, len = arr.length; i < len; i++) {
    const item = arr[i];
    if (!item) continue;
    let res = func(item);
    if (res === true) return item;
    const ret = treeFind(item[childrenKey], func);
    if (!isEmpty(ret)) return ret;
  }
  return;
}
function treeFindAll(list2, func, childrenKey = "children") {
  const result = [];
  if (!isFn(func)) return result;
  const arr = isObject(list2) ? [list2] : list2;
  if (!hasArray(arr)) return result;
  for (let i = 0, len = arr.length; i < len; i++) {
    const item = arr[i];
    if (!item) continue;
    let res = func(item);
    if (res === true) result.push(item);
    const ret = treeFindAll(item[childrenKey], func, childrenKey);
    if (hasArray(ret)) result.push(...ret);
  }
  return result;
}
function treeParents(data, value, map = { value: "id", parent: "parentId" }, includeSelf = false) {
  const result = [];
  if (!hasArray(data) || isNil(value)) return result;
  !isObject(map) && (map = {});
  const _value = map.value || "value";
  const _parent = map.parent || "parent";
  const _org = value;
  const find = () => {
    var _a;
    const ret = treeFind(data, (item) => item[_value] === value || item.value === value);
    if (ret && hasObject(ret)) {
      if (includeSelf || value !== _org) result.push(ret);
      value = (_a = ret[_parent]) != null ? _a : ret.parent;
      if (value !== _org && result.every((item) => item[_value] !== value)) return value;
    }
    return;
  };
  while (!isNil(find())) {
  }
  return result;
}
function listParents(data, value, map = { value: "id", parent: "parentId" }, includeSelf = false) {
  const result = [];
  if (!hasArray(data) || isNil(value)) return result;
  !isObject(map) && (map = {});
  const _value = map.value || "value";
  const _parent = map.parent || "parent";
  const _org = value;
  const find = () => {
    var _a;
    const ret = data.find((item) => item[_value] === value || item.value === value);
    if (ret && hasObject(ret)) {
      if (includeSelf || value !== _org) result.push(ret);
      value = (_a = ret[_parent]) != null ? _a : ret.parent;
      if (value !== _org && result.every((item) => item[_value] !== value)) return value;
    }
    return;
  };
  while (!isNil(find())) {
  }
  return result;
}
function listTop(data, value, map = { value: "id", parent: "parentId" }) {
  const ret = listParents(data, value, map, false);
  return hasArray(ret) ? ret[ret.length - 1] : void 0;
}
function listConvert(obj, map, ext, skipConvert = false) {
  var _a, _b, _c, _d;
  if (!isObject(obj)) return;
  if (!skipConvert && obj.__list === true) return obj;
  (!map || !isObject(map)) && (map = {});
  const _value = map.value || "value";
  const _label = map.label || "label";
  const _icon = map.icon || "icon";
  const _disabled = map.disabled || "disabled";
  const isRev = isEmpty(map.rev) ? /enable/gi.test(_disabled) : map.rev;
  let ret = { ...obj };
  ret.label = (_c = (_b = (_a = obj[_label]) != null ? _a : obj["label"]) != null ? _b : obj["text"]) == null ? void 0 : _c.toString();
  ret.value = (_d = obj[_value]) != null ? _d : obj["value"];
  ret.icon = obj[_icon];
  ret.disabled = isRev ? !obj[_disabled] : !!obj[_disabled];
  if (map.numberValue === true) {
    ret.value = number(ret.value);
  }
  isFn(ext) && (ret = ext(ret, map));
  !skipConvert && (ret.__list = true);
  return ret;
}
function treeConvert(obj, map, ext, skipConvert = false) {
  var _a, _b, _c, _d;
  if (!isObject(obj)) return;
  if (!skipConvert && obj.__tree === true) return obj;
  (!map || !isObject(map)) && (map = {});
  const _value = map.value || "value";
  const _label = map.label || "label";
  const _icon = map.icon || "icon";
  const _disabled = map.disabled || "disabled";
  const _parent = map.parent || "parent";
  const _children = map.children || "children";
  const isRev = isEmpty(map.rev) ? /enable/gi.test(_disabled) : map.rev;
  let ret = { ...obj };
  ret.label = (_c = (_b = (_a = obj[_label]) != null ? _a : obj["label"]) != null ? _b : obj["text"]) == null ? void 0 : _c.toString();
  ret.value = (_d = obj[_value]) != null ? _d : obj["value"];
  ret.icon = obj[_icon];
  ret.disabled = isRev ? !obj[_disabled] : !!obj[_disabled];
  ret.parent = obj[_parent];
  ret.children = obj[_children];
  if (map.numberValue === true) {
    ret.value = number(ret.value);
  }
  isFn(ext) && (ret = ext(ret, map));
  if (hasObject(ret)) {
    hasArray(ret.children) && (ret.children = ret.children.map((item) => {
      const child = treeConvert(item, map, ext, skipConvert);
      child && (child.parent = ret.value);
      return child;
    }).filter((item) => !!item));
    !skipConvert && (ret.__tree = true);
  }
  return ret;
}
function list2tree(list2, parent) {
  if (!hasArray(list2)) return [];
  return list2.filter((item) => item.parent === parent && item.value !== parent).map((item) => ({ ...item, children: list2tree(list2, item.value) }));
}

// src/base/modules.ts
function modulesLoad(modules, options = { fullPath: false, incIndex: false }) {
  if (!modules) return;
  if (!hasObject(options)) options = { fullPath: false, incIndex: false };
  const { fullPath, incIndex } = options;
  if (!isArray(modules))
    modules = [modules];
  const objs = {};
  modules.forEach((mod) => {
    var _a;
    for (var name2 in mod) {
      const obj = mod[name2];
      name2 = name2.replace(/\\/g, "/");
      const idx = fullPath ? name2.indexOf("/") : name2.lastIndexOf("/");
      name2 = name2.substring(idx + 1);
      name2 = name2.replace(/^(.*)\.\w+$/, "$1").toLowerCase();
      if (name2 && (incIndex || name2 !== "index") && !name2.endsWith(".d")) {
        if (SERVERMODE) {
          if (name2.endsWith(".client")) name2 = "";
        } else {
          if (name2.endsWith(".server")) name2 = "";
        }
        if (name2 && obj) {
          objs[name2] = (_a = obj.default) != null ? _a : obj;
        }
      }
    }
  });
  return objs;
}
async function modulesUpdateSync(modules, options = { fullPath: false, incIndex: false }, ...args) {
  const objs = modulesLoad(modules, options);
  if (!objs) return {};
  const names = Object.keys(objs);
  if (names.length < 1) return {};
  names.sort();
  const moduleList = {};
  for (let i in names) {
    let name2 = names[i];
    let obj = objs[name2];
    if (isFn(obj.asyncInit)) {
      await obj.asyncInit.apply(obj, args);
      delete obj.asyncInit;
    }
    if (isFn(obj.init)) {
      await obj.init.apply(obj, args);
      delete obj.init;
    }
    if (name2.endsWith(".client") || name2.endsWith(".server"))
      name2 = name2.substring(0, name2.length - 7);
    moduleList[name2] = obj;
  }
  return moduleList;
}
function modulesUpdate(modules, options = { fullPath: false, incIndex: false }, ...args) {
  const objs = modulesLoad(modules, options);
  if (!objs) return {};
  const names = Object.keys(objs);
  if (names.length < 1) return {};
  names.sort();
  const moduleList = {};
  for (let i in names) {
    let name2 = names[i];
    let obj = objs[name2];
    if (isFn(obj.init)) {
      obj.init.apply(obj, args);
      delete obj.init;
    }
    if (name2.endsWith(".client") || name2.endsWith(".server"))
      name2 = name2.substring(0, name2.length - 7);
    moduleList[name2] = obj;
  }
  return moduleList;
}

// src/base/utils.ts
var import_dayjs = __toESM(require("dayjs"), 1);
var import_fingerprintjs = __toESM(require("@fingerprintjs/fingerprintjs"), 1);
function hash(obj) {
  if (isEmpty(obj)) return -1;
  if (!isString(obj)) obj = JSON.stringify(obj);
  if (obj.length === 0) return 0;
  let hash2 = 0;
  for (let i = 0; i < obj.length; i++) {
    let character = obj.charCodeAt(i);
    hash2 = (hash2 << 5) - hash2 + character;
    hash2 = hash2 & hash2;
  }
  return hash2;
}
function rnd() {
  return Number(Math.random().toString().substring(3) + Date.now()).toString(36).slice(0, 11);
}
var date = (date2) => !date2 || date2 === "now" ? (0, import_dayjs.default)() : date2 === "yesterday" ? (0, import_dayjs.default)().subtract(1, "day") : date2 === "tomorrow" ? (0, import_dayjs.default)().add(1, "day") : (0, import_dayjs.default)(date2);
var dateFormat = (date2, format = "YYYY-MM-DD") => {
  if (isEmpty(date2)) return "";
  if (isString(date2)) date2 = date2.toLowerCase();
  const day = !date2 || date2 === "now" ? (0, import_dayjs.default)() : date2 === "yesterday" ? (0, import_dayjs.default)().subtract(1, "day") : date2 === "tomorrow" ? (0, import_dayjs.default)().add(1, "day") : (0, import_dayjs.default)(date2);
  if (!day.isValid()) return "\u2716";
  if (day.isBefore("2000-01-01", "day")) return "\u2796";
  if (format !== "desc") return day.format(format);
  return dateLong(day, null, false, true);
};
var dateLong = (start, end, isEn = false, incSuffix = false) => {
  const dayStart = (0, import_dayjs.default)(start);
  if (!dayStart.isValid()) return "\u2716";
  const dayEnd = end ? (0, import_dayjs.default)(end) : (0, import_dayjs.default)();
  if (!dayEnd.isValid()) return "\u2716";
  let long = dayEnd.unix() - dayStart.unix();
  const isAfter = long < 0;
  long = Math.abs(long);
  if (long <= 1) return incSuffix ? isEn ? "now" : "\u6B64\u523B" : isEn ? "0sec" : "0\u79D2";
  const s = isEn ? "sec" : "\u79D2";
  const m = isEn ? "min" : "\u5206";
  const h = isEn ? "hout" : "\u65F6";
  const d = isEn ? "day" : "\u5929";
  const suffix = incSuffix ? isAfter ? isEn ? "after" : "\u540E" : isEn ? "before" : "\u524D" : "";
  if (long < 60) return `${long}${s}${suffix}`;
  long = long / 60;
  if (long < 60) {
    const a2 = Math.floor(long);
    let ret2 = `${a2}${m}`;
    const b3 = Math.floor((long - a2) * 60);
    b3 > 0 && (ret2 += `${b3}${s}`);
    return ret2 + suffix;
  }
  long = long / 60;
  if (long < 24) {
    const a2 = Math.floor(long);
    let ret2 = `${a2}${h}`;
    const b3 = Math.floor((long - a2) * 60);
    b3 > 0 && (ret2 += `${b3}${m}`);
    return ret2 + suffix;
  }
  long = long / 24;
  const a = Math.floor(long);
  let ret = `${a}${d}`;
  const b2 = Math.floor((long - a) * 24);
  b2 > 0 && (ret += `${b2}${h}`);
  return ret + suffix;
};
function errorTrace(returnCount = 1, removeCount = 1, removeContents = []) {
  const def = returnCount === 1 ? "" : [];
  if (!Error.captureStackTrace) return def;
  const err = {};
  Error.captureStackTrace(err);
  let errs = err.stack.split("\n");
  if (errs.length < 3) return def;
  removeCount += 2;
  errs = errs.filter((value, index) => {
    if (index < removeCount) return false;
    return !removeContents.some((content) => value.indexOf(content) > -1);
  }).map((value) => {
    value = value.trim();
    value.startsWith("at") && (value = value.substring(2).trim());
    return value;
  });
  if (!hasArray(errs)) return def;
  return returnCount === 1 ? errs[0] : returnCount > 1 ? errs.splice(0, returnCount) : errs;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function execute(fn, count = 1) {
  if (!isFn(fn)) return () => {
  };
  let times = count < 1 ? 1 : count;
  return function() {
    times--;
    if (times < 0) return;
    return fn(arguments);
  };
}
var Funs = /* @__PURE__ */ new Map();
function fnId(fn, remove3 = false) {
  if (!isFn(fn)) return "";
  let id = "";
  if (Funs.has(fn)) {
    id = Funs.get(fn);
    remove3 && Funs.delete(fn);
  } else {
    id = globalId("Fn");
    if (!remove3) Funs.set(fn, id);
  }
  return id;
}
function debounce(func, wait = 1e3, immediate = false) {
  let timer;
  return function() {
    const context = this;
    const args = [...arguments];
    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = void 0;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timer = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}
function throttle(func, wait = 1e3, type = true) {
  let timeout;
  let previous = 0;
  return function() {
    let context = this;
    let args = [...arguments];
    if (type) {
      let now = Date.now();
      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    } else {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = void 0;
          func.apply(context, args);
        }, wait);
      }
    }
  };
}
var _globalId = 0;
function globalId(prefix) {
  return prefix ? [prefix, ++_globalId].join("-") : (++_globalId).toString();
}
async function fingerprint() {
  if (SERVERMODE) return { id: "server", score: 1 };
  const fpJs = await import_fingerprintjs.default.load().then((fg) => fg.get());
  return { id: fpJs.visitorId, score: fpJs.confidence.score };
}

// src/base/index.ts
var $Global = function() {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw new Error("\u65E0\u6CD5\u83B7\u53D6\u9876\u7EA7\u5BF9\u8C61\uFF1AglobalThis");
}();

// src/task.ts
var Tasks = class {
  /**
   * 构造
   * @param tasks 任务列表
   * @param interval 轮询周期（单位：秒）
   */
  constructor(tasks, interval = 30) {
    this.instance = hasArray(tasks) ? tasks : [];
    this.timer = void 0;
    this.interval = interval < 1 ? 30 : interval;
    this.counter = 0;
    this.last = /* @__PURE__ */ new Date();
    this.busy = false;
  }
  /** 执行任务 */
  async execute(task) {
    if (!task || task.busy || task.interval < 1) return;
    const now = Date.now();
    if ((now - task.last) / 1e3 < task.interval) return;
    task.count += 1;
    task.busy = true;
    task.result = await task.execute(task, this.instance);
    task.busy = false;
    task.last = Date.now();
    task.lastTime = (/* @__PURE__ */ new Date()).toLocaleString();
  }
  /** 停止任务 */
  stop() {
    if (!this.timer) return;
    clearTimeout(this.timer);
    this.timer = void 0;
  }
  /** 启动任务 */
  start() {
    this.stop();
    if (this.busy) return;
    if (!hasArray(this.instance)) return;
    this.busy = true;
    this.counter += 1;
    this.last = /* @__PURE__ */ new Date();
    this.instance.forEach((task) => this.execute(task));
    this.last = /* @__PURE__ */ new Date();
    this.busy = false;
    this.timer = setTimeout(() => {
      this.start();
    }, this.interval * 1e3);
  }
};
var createTasks = (modules, interval = 30, mode = true) => {
  if (!mode) return;
  if (SERVERMODE && mode === "client") return;
  if (!SERVERMODE && mode === "server") return;
  if (!hasObject(modules) && !hasArray(modules)) return;
  const packages = modulesUpdate(modules);
  if (!hasObject(packages)) return;
  const tasks = [];
  Object.keys(packages).forEach((key) => {
    const obj = packages[key];
    if (obj && isFn(obj.execute)) {
      obj.name = key;
      obj.interval = Number(obj.interval || 0);
      obj.last = 0;
      obj.count = 0;
      obj.busy = false;
      isFn(obj.init) && obj.init();
      if (obj.interval > 0) tasks.push(obj);
    }
  });
  return new Tasks(tasks, interval);
};

// src/LRU.ts
var lruValue = class {
  /** 构造,超时设置为 0 时,永不到期 时间单位:秒 */
  constructor(key, value, exp) {
    this.key = key;
    this.value = value;
    this.exp = exp && exp > 0 ? Date.now() + exp * 1e3 : 0;
    this.prev = void 0;
    this.next = void 0;
  }
  /** 更新值 */
  update(value, exp) {
    this.value = value;
    this.exp = exp && exp > 0 ? Date.now() + exp * 1e3 : 0;
  }
  // 是否到期
  isExp() {
    if (this.exp && this.exp > 0) {
      return Date.now() >= this.exp;
    } else {
      return false;
    }
  }
};
var LRU = class {
  /**
   * 构造
   * @param capacity	最大元素数量
   */
  constructor(capacity = 100) {
    /** 缓存的键 */
    this.datas = /* @__PURE__ */ new Map();
    /** 最大缓存数量 */
    this.capacity = 100;
    this.capacity = capacity || 10;
  }
  /** 获取缓存，不存在返回 undefined */
  get(key) {
    if (!key) return;
    const item = this.datas.get(key);
    if (item === void 0) return;
    if (item.isExp()) {
      this._checkSize();
      return;
    }
    this._updateItem(item);
    return item.value;
  }
  /**
   * 获取缓存
   * @param key	缓存键
   * @param value	缓存内容
   * @param exp	超时时长 单位:秒，0 为永不到期
   */
  set(key, value, exp) {
    if (!key) return;
    let item = this.datas.get(key);
    if (item) {
      item.update(value, exp);
    } else {
      this._checkSize();
      item = new lruValue(key, value, exp);
      this.datas.set(key, item);
    }
    this._updateItem(item);
  }
  /** 移除缓存 */
  remove(key) {
    if (!key) return;
    const item = this.datas.get(key);
    if (item === void 0) return;
    this._remove(item);
  }
  /** 是否存在缓存键 */
  has(key) {
    if (!key) return false;
    return this.datas.has(key);
  }
  /** 清除所有缓存 */
  clear() {
    this.datas.clear();
    this.head = void 0;
    this.tail = void 0;
  }
  /** 所有缓存的键 */
  keys() {
    return this.datas.keys();
  }
  /** 缓存数量 */
  length() {
    return this.datas.size;
  }
  /** 强制清除到期缓存 */
  trim() {
    for (const item of this.datas.values()) {
      if (item.isExp()) this._remove(item);
    }
  }
  /** 更新调整位置，将新数据移动到尾部 */
  _updateItem(item) {
    if (!this.tail) {
      this.head = this.tail = item;
      return;
    }
    if (this.tail === item) {
      return;
    }
    let prev = item.prev;
    let next = item.next;
    if (prev && next) {
      prev.next = next;
      next.prev = prev;
      item.next = void 0;
    }
    if (!prev && next) {
      next.prev = void 0;
      this.head = next;
    }
    this.tail.next = item;
    item.prev = this.tail;
    this.tail = item;
    item.next = void 0;
  }
  /** 移除最近最少使用节点 */
  _checkSize() {
    var _a;
    if (this.length() < this.capacity) return;
    this.trim();
    const num = this.length();
    if (num === 0) {
      this.head = void 0;
      this.tail = void 0;
    }
    if (num < this.capacity) return;
    let target = this.head;
    let next = (_a = this.head) == null ? void 0 : _a.next;
    if (next) {
      next.prev = void 0;
      this.head = next;
    } else {
      this.head = void 0;
      this.tail = void 0;
    }
    this.datas.delete(target.key);
  }
  /** 强制移除 */
  _remove(item) {
    const prev = item.prev;
    const next = item.next;
    if (next && prev) {
      next.prev = prev;
      prev.next = next;
    } else if (next && !prev) {
      this.head = next;
      next.prev = void 0;
    } else if (!next && prev) {
      this.tail = prev;
      prev.next = void 0;
    }
    this.datas.delete(item.key);
  }
};

// src/cache/cache.server.ts
var DEFAULT_TIME = CACHE_TIME_MAX * 86400;
var DEFAULT_COUNT = 1e4;
var cache_server_default = class {
  constructor() {
    /** LUR 缓存对象，最大缓存 1000 个项目 */
    this.instance = new LRU(DEFAULT_COUNT);
  }
  /**
   * 获取缓存数据
   * @param key		键名
   * @param valueFunc 当值不存在时，返回值的函数
   * @param delay		缓存时长，单位：秒
   */
  async get(key, valueFunc, delay = 0) {
    if (!key) return;
    let value = this.instance.get(key);
    if (isEmpty(value) && isFn(valueFunc)) {
      try {
        value = await valueFunc();
        await this.set(key, value, delay);
      } catch (e2) {
        console.error(e2);
      }
    }
    return value;
  }
  /**
   * 缓存数据
   * @param key	键名
   * @param value	值
   * @param delay	缓存时长，单位：秒
   */
  async set(key, value, delay = 0) {
    delay = delay || DEFAULT_TIME;
    delay = delay > 0 ? delay : 0;
    this.instance.set(key, value, delay);
  }
  /** 移除缓存 */
  async remove(key) {
    if (!key) return;
    this.instance.remove(key);
  }
  /** 清空缓存 */
  async clear() {
    this.instance.clear();
  }
  /** 所有缓存的键 */
  async keys() {
    const keys = this.instance.keys();
    return Array.from(keys);
  }
  /** 缓存数量 */
  async length() {
    return this.instance.length();
  }
};

// src/cache/cache.client.ts
var import_localforage = __toESM(require("localforage"), 1);
var DEFAULT_TIME2 = CACHE_TIME_MAX * 86400;
var cache_client_default = class {
  constructor() {
    /** 缓存对象 */
    this.instance = import_localforage.default;
    /** 正在检查缓存 */
    this.checkStatus = false;
  }
  /**
   * 获取缓存数据
   * @param key		键名
   * @param valueFunc 当值不存在时，返回值的函数
   * @param delay		缓存时长，单位：秒
   */
  async get(key, valueFunc, delay = 0) {
    if (!key) return;
    let value;
    const ret = await this.instance.getItem(key);
    if (ret) {
      const last = ret.last;
      if (last === 0 || last >= Date.now()) {
        value = ret.data;
      } else {
        await this.remove(key);
      }
    }
    if (isEmpty(value) && isFn(valueFunc)) {
      try {
        value = await valueFunc();
        await this.set(key, value, delay);
      } catch (e2) {
        console.error(e2);
      }
    }
    this.checkCache();
    return value;
  }
  /**
   * 缓存数据
   * @param key	键名
   * @param value	值
   * @param delay	缓存时长，单位：秒
   */
  async set(key, value, delay = 0) {
    if (!key) return;
    delay = delay || DEFAULT_TIME2;
    delay = delay > 0 ? delay : 0;
    const data = {
      last: delay > 0 ? Date.now() + delay * 1e3 : 0,
      data: value
    };
    await this.instance.setItem(key, data);
  }
  /** 移除缓存 */
  async remove(key) {
    if (!key) return;
    await this.instance.removeItem(key);
  }
  /** 清空缓存 */
  async clear() {
    this.instance.clear();
  }
  /** 所有缓存的键 */
  async keys() {
    return await this.instance.keys();
  }
  /** 缓存数量 */
  async length() {
    return await this.instance.length();
  }
  /** 检查并清除无效缓存 */
  async checkCache() {
    if (this.checkStatus) return;
    const cacheKey = "_last_cache_check";
    const last = await this.instance.getItem(cacheKey) || 0;
    const exp = Date.now() - 36e5;
    if (last > exp) return;
    this.checkStatus = true;
    const keys = await this.instance.keys();
    if (!hasArray(keys)) return;
    await Promise.all(keys.map((key) => this.get(key)));
    await this.instance.setItem(cacheKey, Date.now());
    this.checkStatus = false;
  }
};

// src/cache/index.ts
var cache = new (SERVERMODE ? cache_server_default : cache_client_default)();
var cache_default = cache;
if (!$Global.$cache) $Global.$cache = cache;

// src/encrypt/base64.ts
var base64_default = class {
  constructor() {
    this.CODE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  }
  /** 对文本进行 base64 加密 */
  encode(input) {
    let output = "";
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    input = this.utf8Encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = (chr1 & 3) << 4 | chr2 >> 4;
      enc3 = (chr2 & 15) << 2 | chr3 >> 6;
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output + this.CODE.charAt(enc1) + this.CODE.charAt(enc2) + this.CODE.charAt(enc3) + this.CODE.charAt(enc4);
    }
    return output;
  }
  /** 对 base64 文本进行解密 */
  decode(input) {
    let output = "";
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = this.CODE.indexOf(input.charAt(i++));
      enc2 = this.CODE.indexOf(input.charAt(i++));
      enc3 = this.CODE.indexOf(input.charAt(i++));
      enc4 = this.CODE.indexOf(input.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = this.utf8Decode(output);
    return output;
  }
  /** UTF-8 编码 */
  utf8Encode(input) {
    input = input.replace(/\r\n/g, "\n");
    let utfText = "";
    for (let n = 0; n < input.length; n++) {
      let c = input.charCodeAt(n);
      if (c < 128) {
        utfText += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utfText += String.fromCharCode(c >> 6 | 192);
        utfText += String.fromCharCode(c & 63 | 128);
      } else {
        utfText += String.fromCharCode(c >> 12 | 224);
        utfText += String.fromCharCode(c >> 6 & 63 | 128);
        utfText += String.fromCharCode(c & 63 | 128);
      }
    }
    return utfText;
  }
  /** UTF-8 解码 */
  utf8Decode(utfText) {
    let string = "";
    let i = 0;
    let c = 0;
    let c1 = 0;
    let c2 = 0;
    while (i < utfText.length) {
      c = utfText.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c1 = utfText.charCodeAt(i + 1);
        string += String.fromCharCode((c & 31) << 6 | c1 & 63);
        i += 2;
      } else {
        c1 = utfText.charCodeAt(i + 1);
        c2 = utfText.charCodeAt(i + 2);
        string += String.fromCharCode((c & 15) << 12 | (c1 & 63) << 6 | c2 & 63);
        i += 3;
      }
    }
    return string;
  }
};

// src/encrypt/md5.ts
var _MD5 = class _MD5 {
  constructor() {
    this._dataLength = 0;
    this._bufferLength = 0;
    this._state = new Int32Array(4);
    this._buffer = new ArrayBuffer(68);
    this._buffer8 = new Uint8Array(this._buffer, 0, 68);
    this._buffer32 = new Uint32Array(this._buffer, 0, 17);
    this.start();
  }
  static md5(str, raw = false) {
    return _MD5.onePassHasher.start().appendStr(str).end(raw);
  }
  static hashAsciiStr(str, raw = false) {
    return _MD5.onePassHasher.start().appendAsciiStr(str).end(raw);
  }
  static _hex(x) {
    const hc = _MD5.hexChars;
    const ho = _MD5.hexOut;
    let n;
    let offset;
    for (let i = 0; i < 4; i += 1) {
      offset = i * 8;
      n = x[i];
      for (let j = 0; j < 8; j += 2) {
        ho[offset + 1 + j] = hc.charAt(n & 15);
        n >>>= 4;
        ho[offset + 0 + j] = hc.charAt(n & 15);
        n >>>= 4;
      }
    }
    return ho.join("");
  }
  static _md5cycle(x, k) {
    let a = x[0];
    let b2 = x[1];
    let c = x[2];
    let d = x[3];
    a += (b2 & c | ~b2 & d) + k[0] - 680876936 | 0;
    a = (a << 7 | a >>> 25) + b2 | 0;
    d += (a & b2 | ~a & c) + k[1] - 389564586 | 0;
    d = (d << 12 | d >>> 20) + a | 0;
    c += (d & a | ~d & b2) + k[2] + 606105819 | 0;
    c = (c << 17 | c >>> 15) + d | 0;
    b2 += (c & d | ~c & a) + k[3] - 1044525330 | 0;
    b2 = (b2 << 22 | b2 >>> 10) + c | 0;
    a += (b2 & c | ~b2 & d) + k[4] - 176418897 | 0;
    a = (a << 7 | a >>> 25) + b2 | 0;
    d += (a & b2 | ~a & c) + k[5] + 1200080426 | 0;
    d = (d << 12 | d >>> 20) + a | 0;
    c += (d & a | ~d & b2) + k[6] - 1473231341 | 0;
    c = (c << 17 | c >>> 15) + d | 0;
    b2 += (c & d | ~c & a) + k[7] - 45705983 | 0;
    b2 = (b2 << 22 | b2 >>> 10) + c | 0;
    a += (b2 & c | ~b2 & d) + k[8] + 1770035416 | 0;
    a = (a << 7 | a >>> 25) + b2 | 0;
    d += (a & b2 | ~a & c) + k[9] - 1958414417 | 0;
    d = (d << 12 | d >>> 20) + a | 0;
    c += (d & a | ~d & b2) + k[10] - 42063 | 0;
    c = (c << 17 | c >>> 15) + d | 0;
    b2 += (c & d | ~c & a) + k[11] - 1990404162 | 0;
    b2 = (b2 << 22 | b2 >>> 10) + c | 0;
    a += (b2 & c | ~b2 & d) + k[12] + 1804603682 | 0;
    a = (a << 7 | a >>> 25) + b2 | 0;
    d += (a & b2 | ~a & c) + k[13] - 40341101 | 0;
    d = (d << 12 | d >>> 20) + a | 0;
    c += (d & a | ~d & b2) + k[14] - 1502002290 | 0;
    c = (c << 17 | c >>> 15) + d | 0;
    b2 += (c & d | ~c & a) + k[15] + 1236535329 | 0;
    b2 = (b2 << 22 | b2 >>> 10) + c | 0;
    a += (b2 & d | c & ~d) + k[1] - 165796510 | 0;
    a = (a << 5 | a >>> 27) + b2 | 0;
    d += (a & c | b2 & ~c) + k[6] - 1069501632 | 0;
    d = (d << 9 | d >>> 23) + a | 0;
    c += (d & b2 | a & ~b2) + k[11] + 643717713 | 0;
    c = (c << 14 | c >>> 18) + d | 0;
    b2 += (c & a | d & ~a) + k[0] - 373897302 | 0;
    b2 = (b2 << 20 | b2 >>> 12) + c | 0;
    a += (b2 & d | c & ~d) + k[5] - 701558691 | 0;
    a = (a << 5 | a >>> 27) + b2 | 0;
    d += (a & c | b2 & ~c) + k[10] + 38016083 | 0;
    d = (d << 9 | d >>> 23) + a | 0;
    c += (d & b2 | a & ~b2) + k[15] - 660478335 | 0;
    c = (c << 14 | c >>> 18) + d | 0;
    b2 += (c & a | d & ~a) + k[4] - 405537848 | 0;
    b2 = (b2 << 20 | b2 >>> 12) + c | 0;
    a += (b2 & d | c & ~d) + k[9] + 568446438 | 0;
    a = (a << 5 | a >>> 27) + b2 | 0;
    d += (a & c | b2 & ~c) + k[14] - 1019803690 | 0;
    d = (d << 9 | d >>> 23) + a | 0;
    c += (d & b2 | a & ~b2) + k[3] - 187363961 | 0;
    c = (c << 14 | c >>> 18) + d | 0;
    b2 += (c & a | d & ~a) + k[8] + 1163531501 | 0;
    b2 = (b2 << 20 | b2 >>> 12) + c | 0;
    a += (b2 & d | c & ~d) + k[13] - 1444681467 | 0;
    a = (a << 5 | a >>> 27) + b2 | 0;
    d += (a & c | b2 & ~c) + k[2] - 51403784 | 0;
    d = (d << 9 | d >>> 23) + a | 0;
    c += (d & b2 | a & ~b2) + k[7] + 1735328473 | 0;
    c = (c << 14 | c >>> 18) + d | 0;
    b2 += (c & a | d & ~a) + k[12] - 1926607734 | 0;
    b2 = (b2 << 20 | b2 >>> 12) + c | 0;
    a += (b2 ^ c ^ d) + k[5] - 378558 | 0;
    a = (a << 4 | a >>> 28) + b2 | 0;
    d += (a ^ b2 ^ c) + k[8] - 2022574463 | 0;
    d = (d << 11 | d >>> 21) + a | 0;
    c += (d ^ a ^ b2) + k[11] + 1839030562 | 0;
    c = (c << 16 | c >>> 16) + d | 0;
    b2 += (c ^ d ^ a) + k[14] - 35309556 | 0;
    b2 = (b2 << 23 | b2 >>> 9) + c | 0;
    a += (b2 ^ c ^ d) + k[1] - 1530992060 | 0;
    a = (a << 4 | a >>> 28) + b2 | 0;
    d += (a ^ b2 ^ c) + k[4] + 1272893353 | 0;
    d = (d << 11 | d >>> 21) + a | 0;
    c += (d ^ a ^ b2) + k[7] - 155497632 | 0;
    c = (c << 16 | c >>> 16) + d | 0;
    b2 += (c ^ d ^ a) + k[10] - 1094730640 | 0;
    b2 = (b2 << 23 | b2 >>> 9) + c | 0;
    a += (b2 ^ c ^ d) + k[13] + 681279174 | 0;
    a = (a << 4 | a >>> 28) + b2 | 0;
    d += (a ^ b2 ^ c) + k[0] - 358537222 | 0;
    d = (d << 11 | d >>> 21) + a | 0;
    c += (d ^ a ^ b2) + k[3] - 722521979 | 0;
    c = (c << 16 | c >>> 16) + d | 0;
    b2 += (c ^ d ^ a) + k[6] + 76029189 | 0;
    b2 = (b2 << 23 | b2 >>> 9) + c | 0;
    a += (b2 ^ c ^ d) + k[9] - 640364487 | 0;
    a = (a << 4 | a >>> 28) + b2 | 0;
    d += (a ^ b2 ^ c) + k[12] - 421815835 | 0;
    d = (d << 11 | d >>> 21) + a | 0;
    c += (d ^ a ^ b2) + k[15] + 530742520 | 0;
    c = (c << 16 | c >>> 16) + d | 0;
    b2 += (c ^ d ^ a) + k[2] - 995338651 | 0;
    b2 = (b2 << 23 | b2 >>> 9) + c | 0;
    a += (c ^ (b2 | ~d)) + k[0] - 198630844 | 0;
    a = (a << 6 | a >>> 26) + b2 | 0;
    d += (b2 ^ (a | ~c)) + k[7] + 1126891415 | 0;
    d = (d << 10 | d >>> 22) + a | 0;
    c += (a ^ (d | ~b2)) + k[14] - 1416354905 | 0;
    c = (c << 15 | c >>> 17) + d | 0;
    b2 += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
    b2 = (b2 << 21 | b2 >>> 11) + c | 0;
    a += (c ^ (b2 | ~d)) + k[12] + 1700485571 | 0;
    a = (a << 6 | a >>> 26) + b2 | 0;
    d += (b2 ^ (a | ~c)) + k[3] - 1894986606 | 0;
    d = (d << 10 | d >>> 22) + a | 0;
    c += (a ^ (d | ~b2)) + k[10] - 1051523 | 0;
    c = (c << 15 | c >>> 17) + d | 0;
    b2 += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
    b2 = (b2 << 21 | b2 >>> 11) + c | 0;
    a += (c ^ (b2 | ~d)) + k[8] + 1873313359 | 0;
    a = (a << 6 | a >>> 26) + b2 | 0;
    d += (b2 ^ (a | ~c)) + k[15] - 30611744 | 0;
    d = (d << 10 | d >>> 22) + a | 0;
    c += (a ^ (d | ~b2)) + k[6] - 1560198380 | 0;
    c = (c << 15 | c >>> 17) + d | 0;
    b2 += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
    b2 = (b2 << 21 | b2 >>> 11) + c | 0;
    a += (c ^ (b2 | ~d)) + k[4] - 145523070 | 0;
    a = (a << 6 | a >>> 26) + b2 | 0;
    d += (b2 ^ (a | ~c)) + k[11] - 1120210379 | 0;
    d = (d << 10 | d >>> 22) + a | 0;
    c += (a ^ (d | ~b2)) + k[2] + 718787259 | 0;
    c = (c << 15 | c >>> 17) + d | 0;
    b2 += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
    b2 = (b2 << 21 | b2 >>> 11) + c | 0;
    x[0] = a + x[0] | 0;
    x[1] = b2 + x[1] | 0;
    x[2] = c + x[2] | 0;
    x[3] = d + x[3] | 0;
  }
  /**
   * Initialise buffer to be hashed
   */
  start() {
    this._dataLength = 0;
    this._bufferLength = 0;
    this._state.set(_MD5.stateIdentity);
    return this;
  }
  // Char to code point to to array conversion:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
  // #Example.3A_Fixing_charCodeAt_to_handle_non-Basic-Multilingual-Plane_characters_if_their_presence_earlier_in_the_string_is_unknown
  /**
   * Append a UTF-8 string to the hash buffer
   * @param str String to append
   */
  appendStr(str) {
    const buf8 = this._buffer8;
    const buf32 = this._buffer32;
    let bufLen = this._bufferLength;
    let code;
    let i;
    for (i = 0; i < str.length; i += 1) {
      code = str.charCodeAt(i);
      if (code < 128) {
        buf8[bufLen++] = code;
      } else if (code < 2048) {
        buf8[bufLen++] = (code >>> 6) + 192;
        buf8[bufLen++] = code & 63 | 128;
      } else if (code < 55296 || code > 56319) {
        buf8[bufLen++] = (code >>> 12) + 224;
        buf8[bufLen++] = code >>> 6 & 63 | 128;
        buf8[bufLen++] = code & 63 | 128;
      } else {
        code = (code - 55296) * 1024 + (str.charCodeAt(++i) - 56320) + 65536;
        if (code > 1114111) {
          throw new Error("Unicode standard supports code points up to U+10FFFF");
        }
        buf8[bufLen++] = (code >>> 18) + 240;
        buf8[bufLen++] = code >>> 12 & 63 | 128;
        buf8[bufLen++] = code >>> 6 & 63 | 128;
        buf8[bufLen++] = code & 63 | 128;
      }
      if (bufLen >= 64) {
        this._dataLength += 64;
        _MD5._md5cycle(this._state, buf32);
        bufLen -= 64;
        buf32[0] = buf32[16];
      }
    }
    this._bufferLength = bufLen;
    return this;
  }
  /**
   * Append an ASCII string to the hash buffer
   * @param str String to append
   */
  appendAsciiStr(str) {
    const buf8 = this._buffer8;
    const buf32 = this._buffer32;
    let bufLen = this._bufferLength;
    let i;
    let j = 0;
    for (; ; ) {
      i = Math.min(str.length - j, 64 - bufLen);
      while (i--) {
        buf8[bufLen++] = str.charCodeAt(j++);
      }
      if (bufLen < 64) {
        break;
      }
      this._dataLength += 64;
      _MD5._md5cycle(this._state, buf32);
      bufLen = 0;
    }
    this._bufferLength = bufLen;
    return this;
  }
  /**
   * Append a byte array to the hash buffer
   * @param input array to append
   */
  appendByteArray(input) {
    const buf8 = this._buffer8;
    const buf32 = this._buffer32;
    let bufLen = this._bufferLength;
    let i;
    let j = 0;
    for (; ; ) {
      i = Math.min(input.length - j, 64 - bufLen);
      while (i--) {
        buf8[bufLen++] = input[j++];
      }
      if (bufLen < 64) {
        break;
      }
      this._dataLength += 64;
      _MD5._md5cycle(this._state, buf32);
      bufLen = 0;
    }
    this._bufferLength = bufLen;
    return this;
  }
  /**
   * Get the state of the hash buffer
   */
  getState() {
    const s = this._state;
    return {
      buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)),
      buflen: this._bufferLength,
      length: this._dataLength,
      state: [s[0], s[1], s[2], s[3]]
    };
  }
  /**
   * Override the current state of the hash buffer
   * @param state New hash buffer state
   */
  setState(state) {
    const buf = state.buffer;
    const x = state.state;
    const s = this._state;
    let i;
    this._dataLength = state.length;
    this._bufferLength = state.buflen;
    s[0] = x[0];
    s[1] = x[1];
    s[2] = x[2];
    s[3] = x[3];
    for (i = 0; i < buf.length; i += 1) {
      this._buffer8[i] = buf.charCodeAt(i);
    }
  }
  /**
   * Hash the current state of the hash buffer and return the result
   * @param raw Whether to return the value as an `Int32Array`
   */
  end(raw = false) {
    const bufLen = this._bufferLength;
    const buf8 = this._buffer8;
    const buf32 = this._buffer32;
    const i = (bufLen >> 2) + 1;
    this._dataLength += bufLen;
    const dataBitsLen = this._dataLength * 8;
    buf8[bufLen] = 128;
    buf8[bufLen + 1] = buf8[bufLen + 2] = buf8[bufLen + 3] = 0;
    buf32.set(_MD5.buffer32Identity.subarray(i), i);
    if (bufLen > 55) {
      _MD5._md5cycle(this._state, buf32);
      buf32.set(_MD5.buffer32Identity);
    }
    if (dataBitsLen <= 4294967295) {
      buf32[14] = dataBitsLen;
    } else {
      const matches = dataBitsLen.toString(16).match(/(.*?)(.{0,8})$/);
      if (matches === null) {
        return;
      }
      const lo = parseInt(matches[2], 16);
      const hi = parseInt(matches[1], 16) || 0;
      buf32[14] = lo;
      buf32[15] = hi;
    }
    _MD5._md5cycle(this._state, buf32);
    return raw ? this._state : _MD5._hex(this._state);
  }
};
// Private Static Variables
_MD5.stateIdentity = new Int32Array([1732584193, -271733879, -1732584194, 271733878]);
_MD5.buffer32Identity = new Int32Array([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
]);
_MD5.hexChars = "0123456789abcdef";
_MD5.hexOut = [];
// Permanent instance is to use for one-call hashing
_MD5.onePassHasher = new _MD5();
var MD5 = _MD5;
var md5_default = MD5.md5;

// src/encrypt/index.ts
var base64Encode = (input) => new base64_default().encode(input);
var base64Decode = (input) => new base64_default().decode(input);
var MD52 = md5_default;
var xor = (input, key) => {
  let result = "";
  const keyLength = key.length;
  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    const keyCharCode = key.charCodeAt(i % keyLength);
    const xorCharCode = charCode ^ keyCharCode;
    result += String.fromCharCode(xorCharCode);
  }
  return result;
};

// src/files/excel.ts
function exportJson(data, fileName, title2, filter) {
  var _a;
  data = toJSON(data);
  if (!hasArray(data)) return;
  const excel = ["<table>"];
  for (var i = 0; i < data.length; i++) {
    excel.push("<tr>");
    for (var index in data[i]) {
      (!filter || (filter == null ? void 0 : filter.indexOf(index)) == -1) && excel.push(`<td>${(_a = data[i][index]) != null ? _a : ""}</td>`);
    }
    excel.push("</tr>");
  }
  excel.push("</table>");
  exportTable(excel.join(""), fileName, title2);
}
function exportTable(tableHtml, fileName, title2) {
  if (!tableHtml || !isString(tableHtml)) return;
  let excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
  excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
  excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
  excelFile += '; charset=UTF-8">';
  excelFile += "<head>";
  excelFile += "<!--[if gte mso 9]>";
  excelFile += "<xml>";
  excelFile += "<x:ExcelWorkbook>";
  excelFile += "<x:ExcelWorksheets>";
  excelFile += "<x:ExcelWorksheet>";
  excelFile += "<x:Name>";
  excelFile += title2;
  excelFile += "</x:Name>";
  excelFile += "<x:WorksheetOptions>";
  excelFile += "<x:DisplayGridlines/>";
  excelFile += "</x:WorksheetOptions>";
  excelFile += "</x:ExcelWorksheet>";
  excelFile += "</x:ExcelWorksheets>";
  excelFile += "</x:ExcelWorkbook>";
  excelFile += "</xml>";
  excelFile += "<![endif]-->";
  excelFile += "</head>";
  excelFile += "<body>";
  excelFile += tableHtml;
  excelFile += "</body>";
  excelFile += "</html>";
  var uri = "data:application/vnd.ms-excel;charset=utf-8," + encodeURIComponent(excelFile);
  var link = document.createElement("a");
  link.href = uri;
  link.setAttribute("style", "visibility:hidden");
  link.download = fileName + ".xls";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// src/files/json.ts
var objectDownload = (obj, fileName = "\u7ED3\u679C") => {
  if (!obj) return;
  const code = JSON.stringify(obj, null, "	");
  const a = document.createElement("a");
  a.setAttribute("href", "data:application/json;charset=utf-8," + encodeURIComponent(code));
  a.setAttribute("download", fileName);
  a.style.display = "none";
  a.click();
};
var jsonDownload = (json, fileName = "\u7ED3\u679C") => {
  if (!json) return;
  objectDownload(toJSON(json), fileName);
};

// src/files/qr.d.ts
var QRErrorCorrectLevel = /* @__PURE__ */ ((QRErrorCorrectLevel2) => {
  QRErrorCorrectLevel2[QRErrorCorrectLevel2["L"] = 1] = "L";
  QRErrorCorrectLevel2[QRErrorCorrectLevel2["M"] = 0] = "M";
  QRErrorCorrectLevel2[QRErrorCorrectLevel2["Q"] = 3] = "Q";
  QRErrorCorrectLevel2[QRErrorCorrectLevel2["H"] = 2] = "H";
  return QRErrorCorrectLevel2;
})(QRErrorCorrectLevel || {});

// src/files/qr.js
function o(o2) {
  this.mode = r.MODE_8BIT_BYTE, this.data = o2;
}
function e(o2, e2) {
  this.typeNumber = o2, this.errorCorrectLevel = e2, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = new Array();
}
o.prototype = {
  getLength: function(o2) {
    return this.data.length;
  },
  write: function(o2) {
    for (var e2 = 0; e2 < this.data.length; e2++) o2.put(this.data.charCodeAt(e2), 8);
  }
}, e.prototype = {
  addData: function(e2) {
    var r = new o(e2);
    this.dataList.push(r), this.dataCache = null;
  },
  isDark: function(o2, e2) {
    if (o2 < 0 || this.moduleCount <= o2 || e2 < 0 || this.moduleCount <= e2)
      throw new Error(o2 + "," + e2);
    return this.modules[o2][e2];
  },
  getModuleCount: function() {
    return this.moduleCount;
  },
  make: function() {
    if (this.typeNumber < 1) {
      var o2 = 1;
      for (o2 = 1; o2 < 40; o2++) {
        for (var e2 = v.getRSBlocks(o2, this.errorCorrectLevel), r = new p(), t = 0, i = 0; i < e2.length; i++)
          t += e2[i].dataCount;
        for (i = 0; i < this.dataList.length; i++) {
          var n = this.dataList[i];
          r.put(n.mode, 4), r.put(n.getLength(), h.getLengthInBits(n.mode, o2)), n.write(r);
        }
        if (r.getLengthInBits() <= 8 * t) break;
      }
      this.typeNumber = o2;
    }
    this.makeImpl(false, this.getBestMaskPattern());
  },
  makeImpl: function(o2, r) {
    this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
    for (var t = 0; t < this.moduleCount; t++) {
      this.modules[t] = new Array(this.moduleCount);
      for (var i = 0; i < this.moduleCount; i++) this.modules[t][i] = null;
    }
    this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(o2, r), this.typeNumber >= 7 && this.setupTypeNumber(o2), null == this.dataCache && (this.dataCache = e.createData(
      this.typeNumber,
      this.errorCorrectLevel,
      this.dataList
    )), this.mapData(this.dataCache, r);
  },
  setupPositionProbePattern: function(o2, e2) {
    for (var r = -1; r <= 7; r++)
      if (!(o2 + r <= -1 || this.moduleCount <= o2 + r))
        for (var t = -1; t <= 7; t++)
          e2 + t <= -1 || this.moduleCount <= e2 + t || (this.modules[o2 + r][e2 + t] = 0 <= r && r <= 6 && (0 == t || 6 == t) || 0 <= t && t <= 6 && (0 == r || 6 == r) || 2 <= r && r <= 4 && 2 <= t && t <= 4);
  },
  getBestMaskPattern: function() {
    for (var o2 = 0, e2 = 0, r = 0; r < 8; r++) {
      this.makeImpl(true, r);
      var t = h.getLostPoint(this);
      (0 == r || o2 > t) && (o2 = t, e2 = r);
    }
    return e2;
  },
  createMovieClip: function(o2, e2, r) {
    var t = o2.createEmptyMovieClip(e2, r);
    this.make();
    for (var i = 0; i < this.modules.length; i++)
      for (var n = 1 * i, a = 0; a < this.modules[i].length; a++) {
        var d = 1 * a;
        this.modules[i][a] && (t.beginFill(0, 100), t.moveTo(d, n), t.lineTo(d + 1, n), t.lineTo(d + 1, n + 1), t.lineTo(d, n + 1), t.endFill());
      }
    return t;
  },
  setupTimingPattern: function() {
    for (var o2 = 8; o2 < this.moduleCount - 8; o2++)
      null == this.modules[o2][6] && (this.modules[o2][6] = o2 % 2 == 0);
    for (var e2 = 8; e2 < this.moduleCount - 8; e2++)
      null == this.modules[6][e2] && (this.modules[6][e2] = e2 % 2 == 0);
  },
  setupPositionAdjustPattern: function() {
    for (var o2 = h.getPatternPosition(this.typeNumber), e2 = 0; e2 < o2.length; e2++)
      for (var r = 0; r < o2.length; r++) {
        var t = o2[e2], i = o2[r];
        if (null == this.modules[t][i])
          for (var n = -2; n <= 2; n++)
            for (var a = -2; a <= 2; a++)
              this.modules[t + n][i + a] = -2 == n || 2 == n || -2 == a || 2 == a || 0 == n && 0 == a;
      }
  },
  setupTypeNumber: function(o2) {
    for (var e2 = h.getBCHTypeNumber(this.typeNumber), r = 0; r < 18; r++) {
      var t = !o2 && 1 == (e2 >> r & 1);
      this.modules[Math.floor(r / 3)][r % 3 + this.moduleCount - 8 - 3] = t;
    }
    for (r = 0; r < 18; r++) {
      t = !o2 && 1 == (e2 >> r & 1);
      this.modules[r % 3 + this.moduleCount - 8 - 3][Math.floor(r / 3)] = t;
    }
  },
  setupTypeInfo: function(o2, e2) {
    for (var r = this.errorCorrectLevel << 3 | e2, t = h.getBCHTypeInfo(r), i = 0; i < 15; i++) {
      var n = !o2 && 1 == (t >> i & 1);
      i < 6 ? this.modules[i][8] = n : i < 8 ? this.modules[i + 1][8] = n : this.modules[this.moduleCount - 15 + i][8] = n;
    }
    for (i = 0; i < 15; i++) {
      n = !o2 && 1 == (t >> i & 1);
      i < 8 ? this.modules[8][this.moduleCount - i - 1] = n : i < 9 ? this.modules[8][15 - i - 1 + 1] = n : this.modules[8][15 - i - 1] = n;
    }
    this.modules[this.moduleCount - 8][8] = !o2;
  },
  mapData: function(o2, e2) {
    for (var r = -1, t = this.moduleCount - 1, i = 7, n = 0, a = this.moduleCount - 1; a > 0; a -= 2)
      for (6 == a && a--; ; ) {
        for (var d = 0; d < 2; d++)
          if (null == this.modules[t][a - d]) {
            var u = false;
            n < o2.length && (u = 1 == (o2[n] >>> i & 1)), h.getMask(e2, t, a - d) && (u = !u), this.modules[t][a - d] = u, -1 == --i && (n++, i = 7);
          }
        if ((t += r) < 0 || this.moduleCount <= t) {
          t -= r, r = -r;
          break;
        }
      }
  }
}, e.PAD0 = 236, e.PAD1 = 17, e.createData = function(o2, r, t) {
  for (var i = v.getRSBlocks(o2, r), n = new p(), a = 0; a < t.length; a++) {
    var d = t[a];
    n.put(d.mode, 4), n.put(d.getLength(), h.getLengthInBits(d.mode, o2)), d.write(n);
  }
  var u = 0;
  for (a = 0; a < i.length; a++) u += i[a].dataCount;
  if (n.getLengthInBits() > 8 * u)
    throw new Error("code length overflow. (" + n.getLengthInBits() + ">" + 8 * u + ")");
  for (n.getLengthInBits() + 4 <= 8 * u && n.put(0, 4); n.getLengthInBits() % 8 != 0; )
    n.putBit(false);
  for (; !(n.getLengthInBits() >= 8 * u || (n.put(e.PAD0, 8), n.getLengthInBits() >= 8 * u)); )
    n.put(e.PAD1, 8);
  return e.createBytes(n, i);
}, e.createBytes = function(o2, e2) {
  for (var r = 0, t = 0, i = 0, n = new Array(e2.length), a = new Array(e2.length), d = 0; d < e2.length; d++) {
    var u = e2[d].dataCount, s = e2[d].totalCount - u;
    t = Math.max(t, u), i = Math.max(i, s), n[d] = new Array(u);
    for (var g = 0; g < n[d].length; g++) n[d][g] = 255 & o2.buffer[g + r];
    r += u;
    var l = h.getErrorCorrectPolynomial(s), c = new f(n[d], l.getLength() - 1).mod(l);
    a[d] = new Array(l.getLength() - 1);
    for (g = 0; g < a[d].length; g++) {
      var m = g + c.getLength() - a[d].length;
      a[d][g] = m >= 0 ? c.get(m) : 0;
    }
  }
  var v2 = 0;
  for (g = 0; g < e2.length; g++) v2 += e2[g].totalCount;
  var p2 = new Array(v2), C2 = 0;
  for (g = 0; g < t; g++)
    for (d = 0; d < e2.length; d++) g < n[d].length && (p2[C2++] = n[d][g]);
  for (g = 0; g < i; g++)
    for (d = 0; d < e2.length; d++) g < a[d].length && (p2[C2++] = a[d][g]);
  return p2;
};
for (r = { MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4, MODE_KANJI: 8 }, t = { L: 1, M: 0, Q: 3, H: 2 }, i = 0, n = 1, a = 2, d = 3, u = 4, s = 5, g = 6, l = 7, h = {
  PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]
  ],
  G15: 1335,
  G18: 7973,
  G15_MASK: 21522,
  getBCHTypeInfo: function(o2) {
    for (var e2 = o2 << 10; h.getBCHDigit(e2) - h.getBCHDigit(h.G15) >= 0; )
      e2 ^= h.G15 << h.getBCHDigit(e2) - h.getBCHDigit(h.G15);
    return (o2 << 10 | e2) ^ h.G15_MASK;
  },
  getBCHTypeNumber: function(o2) {
    for (var e2 = o2 << 12; h.getBCHDigit(e2) - h.getBCHDigit(h.G18) >= 0; )
      e2 ^= h.G18 << h.getBCHDigit(e2) - h.getBCHDigit(h.G18);
    return o2 << 12 | e2;
  },
  getBCHDigit: function(o2) {
    for (var e2 = 0; 0 != o2; ) e2++, o2 >>>= 1;
    return e2;
  },
  getPatternPosition: function(o2) {
    return h.PATTERN_POSITION_TABLE[o2 - 1];
  },
  getMask: function(o2, e2, r2) {
    switch (o2) {
      case i:
        return (e2 + r2) % 2 == 0;
      case n:
        return e2 % 2 == 0;
      case a:
        return r2 % 3 == 0;
      case d:
        return (e2 + r2) % 3 == 0;
      case u:
        return (Math.floor(e2 / 2) + Math.floor(r2 / 3)) % 2 == 0;
      case s:
        return e2 * r2 % 2 + e2 * r2 % 3 == 0;
      case g:
        return (e2 * r2 % 2 + e2 * r2 % 3) % 2 == 0;
      case l:
        return (e2 * r2 % 3 + (e2 + r2) % 2) % 2 == 0;
      default:
        throw new Error("bad maskPattern:" + o2);
    }
  },
  getErrorCorrectPolynomial: function(o2) {
    for (var e2 = new f([1], 0), r2 = 0; r2 < o2; r2++)
      e2 = e2.multiply(new f([1, c.gexp(r2)], 0));
    return e2;
  },
  getLengthInBits: function(o2, e2) {
    if (1 <= e2 && e2 < 10)
      switch (o2) {
        case r.MODE_NUMBER:
          return 10;
        case r.MODE_ALPHA_NUM:
          return 9;
        case r.MODE_8BIT_BYTE:
        case r.MODE_KANJI:
          return 8;
        default:
          throw new Error("mode:" + o2);
      }
    else if (e2 < 27)
      switch (o2) {
        case r.MODE_NUMBER:
          return 12;
        case r.MODE_ALPHA_NUM:
          return 11;
        case r.MODE_8BIT_BYTE:
          return 16;
        case r.MODE_KANJI:
          return 10;
        default:
          throw new Error("mode:" + o2);
      }
    else {
      if (!(e2 < 41)) throw new Error("type:" + e2);
      switch (o2) {
        case r.MODE_NUMBER:
          return 14;
        case r.MODE_ALPHA_NUM:
          return 13;
        case r.MODE_8BIT_BYTE:
          return 16;
        case r.MODE_KANJI:
          return 12;
        default:
          throw new Error("mode:" + o2);
      }
    }
  },
  getLostPoint: function(o2) {
    for (var e2 = o2.getModuleCount(), r2 = 0, t2 = 0; t2 < e2; t2++)
      for (var i2 = 0; i2 < e2; i2++) {
        for (var n2 = 0, a2 = o2.isDark(t2, i2), d2 = -1; d2 <= 1; d2++)
          if (!(t2 + d2 < 0 || e2 <= t2 + d2))
            for (var u2 = -1; u2 <= 1; u2++)
              i2 + u2 < 0 || e2 <= i2 + u2 || 0 == d2 && 0 == u2 || a2 == o2.isDark(t2 + d2, i2 + u2) && n2++;
        n2 > 5 && (r2 += 3 + n2 - 5);
      }
    for (t2 = 0; t2 < e2 - 1; t2++)
      for (i2 = 0; i2 < e2 - 1; i2++) {
        var s2 = 0;
        o2.isDark(t2, i2) && s2++, o2.isDark(t2 + 1, i2) && s2++, o2.isDark(t2, i2 + 1) && s2++, o2.isDark(t2 + 1, i2 + 1) && s2++, 0 != s2 && 4 != s2 || (r2 += 3);
      }
    for (t2 = 0; t2 < e2; t2++)
      for (i2 = 0; i2 < e2 - 6; i2++)
        o2.isDark(t2, i2) && !o2.isDark(t2, i2 + 1) && o2.isDark(t2, i2 + 2) && o2.isDark(t2, i2 + 3) && o2.isDark(t2, i2 + 4) && !o2.isDark(t2, i2 + 5) && o2.isDark(t2, i2 + 6) && (r2 += 40);
    for (i2 = 0; i2 < e2; i2++)
      for (t2 = 0; t2 < e2 - 6; t2++)
        o2.isDark(t2, i2) && !o2.isDark(t2 + 1, i2) && o2.isDark(t2 + 2, i2) && o2.isDark(t2 + 3, i2) && o2.isDark(t2 + 4, i2) && !o2.isDark(t2 + 5, i2) && o2.isDark(t2 + 6, i2) && (r2 += 40);
    var g2 = 0;
    for (i2 = 0; i2 < e2; i2++) for (t2 = 0; t2 < e2; t2++) o2.isDark(t2, i2) && g2++;
    return r2 += 10 * (Math.abs(100 * g2 / e2 / e2 - 50) / 5);
  }
}, c = {
  glog: function(o2) {
    if (o2 < 1) throw new Error("glog(" + o2 + ")");
    return c.LOG_TABLE[o2];
  },
  gexp: function(o2) {
    for (; o2 < 0; ) o2 += 255;
    for (; o2 >= 256; ) o2 -= 255;
    return c.EXP_TABLE[o2];
  },
  EXP_TABLE: new Array(256),
  LOG_TABLE: new Array(256)
}, m = 0; m < 8; m++)
  c.EXP_TABLE[m] = 1 << m;
var r;
var t;
var i;
var n;
var a;
var d;
var u;
var s;
var g;
var l;
var h;
var c;
var m;
for (m = 8; m < 256; m++)
  c.EXP_TABLE[m] = c.EXP_TABLE[m - 4] ^ c.EXP_TABLE[m - 5] ^ c.EXP_TABLE[m - 6] ^ c.EXP_TABLE[m - 8];
for (m = 0; m < 255; m++) c.LOG_TABLE[c.EXP_TABLE[m]] = m;
function f(o2, e2) {
  if (null == o2.length) throw new Error(o2.length + "/" + e2);
  for (var r = 0; r < o2.length && 0 == o2[r]; ) r++;
  this.num = new Array(o2.length - r + e2);
  for (var t = 0; t < o2.length - r; t++) this.num[t] = o2[t + r];
}
function v(o2, e2) {
  this.totalCount = o2, this.dataCount = e2;
}
function p() {
  this.buffer = new Array(), this.length = 0;
}
function C(o2) {
  return o2.setFillStyle = o2.setFillStyle || function(e2) {
    o2.fillStyle = e2;
  }, o2.setFontSize = o2.setFontSize || function(e2) {
    o2.font = `${e2}px`;
  }, o2.setTextAlign = o2.setTextAlign || function(e2) {
    o2.textAlign = e2;
  }, o2.setTextBaseline = o2.setTextBaseline || function(e2) {
    o2.textBaseline = e2;
  }, o2.setGlobalAlpha = o2.setGlobalAlpha || function(e2) {
    o2.globalAlpha = e2;
  }, o2.setStrokeStyle = o2.setStrokeStyle || function(e2) {
    o2.strokeStyle = e2;
  }, o2.setShadow = o2.setShadow || function(e2, r, t, i) {
    o2.shadowOffsetX = e2, o2.shadowOffsetY = r, o2.shadowBlur = t, o2.shadowColor = i;
  }, o2.draw = o2.draw || function(o3, e2) {
    e2 && e2();
  }, o2;
}
function b(o2, e2) {
  var r = this.data = "";
  this.dataEncode = true;
  var t = this.size = 200;
  this.useDynamicSize = false, this.dynamicSize = t;
  var i = this.typeNumber = -1;
  this.errorCorrectLevel = b.errorCorrectLevel.H;
  var n = this.margin = 0;
  this.areaColor = "#FFFFFF", this.backgroundColor = "rgba(255,255,255,0)", this.backgroundImageSrc = void 0;
  var a = this.backgroundImageWidth = void 0, d = this.backgroundImageHeight = void 0, u = this.backgroundImageX = void 0, s = this.backgroundImageY = void 0;
  this.backgroundImageAlpha = 1, this.backgroundImageBorderRadius = 0;
  var g = this.backgroundPadding = 0;
  this.foregroundColor = "#000000", this.foregroundImageSrc = void 0;
  var l = this.foregroundImageWidth = void 0, h = this.foregroundImageHeight = void 0, c = this.foregroundImageX = void 0, m = this.foregroundImageY = void 0, f2 = this.foregroundImagePadding = 0;
  this.foregroundImageBackgroundColor = "#FFFFFF";
  var v2 = this.foregroundImageBorderRadius = 0, p2 = this.foregroundImageShadowOffsetX = 0, k = this.foregroundImageShadowOffsetY = 0, y = this.foregroundImageShadowBlur = 0;
  this.foregroundImageShadowColor = "#808080";
  var w = this.foregroundPadding = 0, I = this.positionProbeBackgroundColor = void 0, B = this.positionProbeForegroundColor = void 0, S = this.separatorColor = void 0, P = this.positionAdjustBackgroundColor = void 0, E = this.positionAdjustForegroundColor = void 0, L = this.timingBackgroundColor = void 0, D = this.timingForegroundColor = void 0, A = this.typeNumberBackgroundColor = void 0, T = this.typeNumberForegroundColor = void 0, N = this.darkBlockColor = void 0;
  this.base = void 0, this.modules = [], this.moduleCount = 0, this.drawModules = [];
  var M = this.canvasContext = void 0;
  this.loadImage, this.drawReserve = false, this.isMaked = false, Object.defineProperties(this, {
    data: {
      get() {
        if ("" === r || void 0 === r) throw new b.Error("\u4E8C\u7EF4\u7801\u6570\u636E\u672A\u8BBE\u7F6E");
        return r;
      },
      set(o3) {
        r = String(o3);
      }
    },
    size: {
      get: () => t,
      set(o3) {
        t = Number(o3);
      }
    },
    typeNumber: {
      get: () => i,
      set(o3) {
        i = Number(o3);
      }
    },
    margin: {
      get: () => n,
      set(o3) {
        n = Number(o3);
      }
    },
    backgroundImageWidth: {
      get() {
        return void 0 === a ? this.dynamicSize : this.useDynamicSize ? this.dynamicSize / this.size * a : a;
      },
      set(o3) {
        a = Number(o3);
      }
    },
    backgroundImageHeight: {
      get() {
        return void 0 === d ? this.dynamicSize : this.useDynamicSize ? this.dynamicSize / this.size * d : d;
      },
      set(o3) {
        d = Number(o3);
      }
    },
    backgroundImageX: {
      get() {
        return void 0 === u ? 0 : this.useDynamicSize ? this.dynamicSize / this.size * u : u;
      },
      set(o3) {
        u = Number(o3);
      }
    },
    backgroundImageY: {
      get() {
        return void 0 === s ? 0 : this.useDynamicSize ? this.dynamicSize / this.size * s : s;
      },
      set(o3) {
        s = Number(o3);
      }
    },
    backgroundPadding: {
      get: () => g,
      set(o3) {
        g = o3 > 1 ? 1 : o3 < 0 ? 0 : o3;
      }
    },
    foregroundImageWidth: {
      get() {
        return void 0 === l ? (this.dynamicSize - 2 * this.margin) / 4 : this.useDynamicSize ? this.dynamicSize / this.size * l : l;
      },
      set(o3) {
        l = Number(o3);
      }
    },
    foregroundImageHeight: {
      get() {
        return void 0 === h ? (this.dynamicSize - 2 * this.margin) / 4 : this.useDynamicSize ? this.dynamicSize / this.size * h : h;
      },
      set(o3) {
        h = Number(o3);
      }
    },
    foregroundImageX: {
      get() {
        return void 0 === c ? this.dynamicSize / 2 - this.foregroundImageWidth / 2 : this.useDynamicSize ? this.dynamicSize / this.size * c : c;
      },
      set(o3) {
        c = Number(o3);
      }
    },
    foregroundImageY: {
      get() {
        return void 0 === m ? this.dynamicSize / 2 - this.foregroundImageHeight / 2 : this.useDynamicSize ? this.dynamicSize / this.size * m : m;
      },
      set(o3) {
        m = Number(o3);
      }
    },
    foregroundImagePadding: {
      get() {
        return this.useDynamicSize ? this.dynamicSize / this.size * f2 : f2;
      },
      set(o3) {
        f2 = Number(o3);
      }
    },
    foregroundImageBorderRadius: {
      get() {
        return this.useDynamicSize ? this.dynamicSize / this.size * v2 : v2;
      },
      set(o3) {
        v2 = Number(o3);
      }
    },
    foregroundImageShadowOffsetX: {
      get() {
        return this.useDynamicSize ? this.dynamicSize / this.size * p2 : p2;
      },
      set(o3) {
        p2 = Number(o3);
      }
    },
    foregroundImageShadowOffsetY: {
      get() {
        return this.useDynamicSize ? this.dynamicSize / this.size * k : k;
      },
      set(o3) {
        k = Number(o3);
      }
    },
    foregroundImageShadowBlur: {
      get() {
        return this.useDynamicSize ? this.dynamicSize / this.size * y : y;
      },
      set(o3) {
        y = Number(o3);
      }
    },
    foregroundPadding: {
      get: () => w,
      set(o3) {
        w = o3 > 1 ? 1 : o3 < 0 ? 0 : o3;
      }
    },
    positionProbeBackgroundColor: {
      get() {
        return I || this.backgroundColor;
      },
      set(o3) {
        I = o3;
      }
    },
    positionProbeForegroundColor: {
      get() {
        return B || this.foregroundColor;
      },
      set(o3) {
        B = o3;
      }
    },
    separatorColor: {
      get() {
        return S || this.backgroundColor;
      },
      set(o3) {
        S = o3;
      }
    },
    positionAdjustBackgroundColor: {
      get() {
        return P || this.backgroundColor;
      },
      set(o3) {
        P = o3;
      }
    },
    positionAdjustForegroundColor: {
      get() {
        return E || this.foregroundColor;
      },
      set(o3) {
        E = o3;
      }
    },
    timingBackgroundColor: {
      get() {
        return L || this.backgroundColor;
      },
      set(o3) {
        L = o3;
      }
    },
    timingForegroundColor: {
      get() {
        return D || this.foregroundColor;
      },
      set(o3) {
        D = o3;
      }
    },
    typeNumberBackgroundColor: {
      get() {
        return A || this.backgroundColor;
      },
      set(o3) {
        A = o3;
      }
    },
    typeNumberForegroundColor: {
      get() {
        return T || this.foregroundColor;
      },
      set(o3) {
        T = o3;
      }
    },
    darkBlockColor: {
      get() {
        return N || this.foregroundColor;
      },
      set(o3) {
        N = o3;
      }
    },
    canvasContext: {
      get() {
        if (void 0 === M) throw new b.Error("\u753B\u5E03\u65E0\u6548\uFF0C\u8BF7\u8BBE\u7F6E\u6709\u6548\u753B\u5E03");
        return M;
      },
      set(o3) {
        M = C(o3);
      }
    }
  }), b.plugins.forEach((o3) => o3(b, this, false)), o2 && this.setOptions(o2), e2 && (this.canvasContext = C(e2));
}
f.prototype = {
  get: function(o2) {
    return this.num[o2];
  },
  getLength: function() {
    return this.num.length;
  },
  multiply: function(o2) {
    for (var e2 = new Array(this.getLength() + o2.getLength() - 1), r = 0; r < this.getLength(); r++)
      for (var t = 0; t < o2.getLength(); t++)
        e2[r + t] ^= c.gexp(c.glog(this.get(r)) + c.glog(o2.get(t)));
    return new f(e2, 0);
  },
  mod: function(o2) {
    if (this.getLength() - o2.getLength() < 0) return this;
    for (var e2 = c.glog(this.get(0)) - c.glog(o2.get(0)), r = new Array(this.getLength()), t = 0; t < this.getLength(); t++)
      r[t] = this.get(t);
    for (t = 0; t < o2.getLength(); t++) r[t] ^= c.gexp(c.glog(o2.get(t)) + e2);
    return new f(r, 0).mod(o2);
  }
}, v.RS_BLOCK_TABLE = [
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]
], v.getRSBlocks = function(o2, e2) {
  var r = v.getRsBlockTable(o2, e2);
  if (null == r)
    throw new Error("bad rs block @ typeNumber:" + o2 + "/errorCorrectLevel:" + e2);
  for (var t = r.length / 3, i = new Array(), n = 0; n < t; n++)
    for (var a = r[3 * n + 0], d = r[3 * n + 1], u = r[3 * n + 2], s = 0; s < a; s++)
      i.push(new v(d, u));
  return i;
}, v.getRsBlockTable = function(o2, e2) {
  switch (e2) {
    case t.L:
      return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 0];
    case t.M:
      return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 1];
    case t.Q:
      return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 2];
    case t.H:
      return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 3];
    default:
      return;
  }
}, p.prototype = {
  get: function(o2) {
    var e2 = Math.floor(o2 / 8);
    return 1 == (this.buffer[e2] >>> 7 - o2 % 8 & 1);
  },
  put: function(o2, e2) {
    for (var r = 0; r < e2; r++) this.putBit(1 == (o2 >>> e2 - r - 1 & 1));
  },
  getLengthInBits: function() {
    return this.length;
  },
  putBit: function(o2) {
    var e2 = Math.floor(this.length / 8);
    this.buffer.length <= e2 && this.buffer.push(0), o2 && (this.buffer[e2] |= 128 >>> this.length % 8), this.length++;
  }
}, e.errorCorrectLevel = t, b.errorCorrectLevel = e.errorCorrectLevel, b.Error = function(o2) {
  o2 = `[\u4E8C\u7EF4\u7801]\uFF1A${o2}`;
  console.error(o2);
  this.errMsg = o2;
}, b.plugins = [], b.use = function(o2) {
  "function" == typeof o2 && b.plugins.push(o2);
}, b.prototype.loadImage = function(o2) {
  return Promise.resolve(o2);
}, b.prototype.setOptions = function(o2) {
  var e2, r, t, i, n, a, d, u, s, g, l, h, c, m, f2, v2, p2, C2, b2, k, y, w, I, B, S, P, E, L, D, A, T, N, M, z, _, O, R, F, x, H, X, Y, j, W, G, K, Q, U, $, J, q, V, Z, oo, eo, ro;
  o2 && (Object.keys(o2).forEach((e3) => {
    this[e3] = o2[e3];
  }), function(o3 = {}, e3 = {}, r2 = false) {
    let t2;
    for (var i2 in t2 = r2 ? o3 : { ...o3 }, e3) {
      var n2 = e3[i2];
      null != n2 && (n2.constructor == Object ? t2[i2] = this.deepReplace(t2[i2], n2) : n2.constructor != String || n2 ? t2[i2] = n2 : t2[i2] = t2[i2]);
    }
  }(
    this,
    {
      data: o2.data || o2.text,
      dataEncode: o2.dataEncode,
      size: o2.size,
      useDynamicSize: o2.useDynamicSize,
      typeNumber: o2.typeNumber,
      errorCorrectLevel: o2.errorCorrectLevel,
      margin: o2.margin,
      areaColor: o2.areaColor,
      backgroundColor: o2.backgroundColor || (null === (e2 = o2.background) || void 0 === e2 ? void 0 : e2.color),
      backgroundImageSrc: o2.backgroundImageSrc || (null === (r = o2.background) || void 0 === r || null === (t = r.image) || void 0 === t ? void 0 : t.src),
      backgroundImageWidth: o2.backgroundImageWidth || (null === (i = o2.background) || void 0 === i || null === (n = i.image) || void 0 === n ? void 0 : n.width),
      backgroundImageHeight: o2.backgroundImageHeight || (null === (a = o2.background) || void 0 === a || null === (d = a.image) || void 0 === d ? void 0 : d.height),
      backgroundImageX: o2.backgroundImageX || (null === (u = o2.background) || void 0 === u || null === (s = u.image) || void 0 === s ? void 0 : s.x),
      backgroundImageY: o2.backgroundImageY || (null === (g = o2.background) || void 0 === g || null === (l = g.image) || void 0 === l ? void 0 : l.y),
      backgroundImageAlpha: o2.backgroundImageAlpha || (null === (h = o2.background) || void 0 === h || null === (c = h.image) || void 0 === c ? void 0 : c.alpha),
      backgroundImageBorderRadius: o2.backgroundImageBorderRadius || (null === (m = o2.background) || void 0 === m || null === (f2 = m.image) || void 0 === f2 ? void 0 : f2.borderRadius),
      backgroundPadding: o2.backgroundPadding,
      foregroundColor: o2.foregroundColor || (null === (v2 = o2.foreground) || void 0 === v2 ? void 0 : v2.color),
      foregroundImageSrc: o2.foregroundImageSrc || (null === (p2 = o2.foreground) || void 0 === p2 || null === (C2 = p2.image) || void 0 === C2 ? void 0 : C2.src),
      foregroundImageWidth: o2.foregroundImageWidth || (null === (b2 = o2.foreground) || void 0 === b2 || null === (k = b2.image) || void 0 === k ? void 0 : k.width),
      foregroundImageHeight: o2.foregroundImageHeight || (null === (y = o2.foreground) || void 0 === y || null === (w = y.image) || void 0 === w ? void 0 : w.height),
      foregroundImageX: o2.foregroundImageX || (null === (I = o2.foreground) || void 0 === I || null === (B = I.image) || void 0 === B ? void 0 : B.x),
      foregroundImageY: o2.foregroundImageY || (null === (S = o2.foreground) || void 0 === S || null === (P = S.image) || void 0 === P ? void 0 : P.y),
      foregroundImagePadding: o2.foregroundImagePadding || (null === (E = o2.foreground) || void 0 === E || null === (L = E.image) || void 0 === L ? void 0 : L.padding),
      foregroundImageBackgroundColor: o2.foregroundImageBackgroundColor || (null === (D = o2.foreground) || void 0 === D || null === (A = D.image) || void 0 === A ? void 0 : A.backgroundColor),
      foregroundImageBorderRadius: o2.foregroundImageBorderRadius || (null === (T = o2.foreground) || void 0 === T || null === (N = T.image) || void 0 === N ? void 0 : N.borderRadius),
      foregroundImageShadowOffsetX: o2.foregroundImageShadowOffsetX || (null === (M = o2.foreground) || void 0 === M || null === (z = M.image) || void 0 === z ? void 0 : z.shadowOffsetX),
      foregroundImageShadowOffsetY: o2.foregroundImageShadowOffsetY || (null === (_ = o2.foreground) || void 0 === _ || null === (O = _.image) || void 0 === O ? void 0 : O.shadowOffsetY),
      foregroundImageShadowBlur: o2.foregroundImageShadowBlur || (null === (R = o2.foreground) || void 0 === R || null === (F = R.image) || void 0 === F ? void 0 : F.shadowBlur),
      foregroundImageShadowColor: o2.foregroundImageShadowColor || (null === (x = o2.foreground) || void 0 === x || null === (H = x.image) || void 0 === H ? void 0 : H.shadowColor),
      foregroundPadding: o2.foregroundPadding,
      positionProbeBackgroundColor: o2.positionProbeBackgroundColor || (null === (X = o2.positionProbe) || void 0 === X ? void 0 : X.backgroundColor) || (null === (Y = o2.positionDetection) || void 0 === Y ? void 0 : Y.backgroundColor),
      positionProbeForegroundColor: o2.positionProbeForegroundColor || (null === (j = o2.positionProbe) || void 0 === j ? void 0 : j.foregroundColor) || (null === (W = o2.positionDetection) || void 0 === W ? void 0 : W.foregroundColor),
      separatorColor: o2.separatorColor || (null === (G = o2.separator) || void 0 === G ? void 0 : G.color),
      positionAdjustBackgroundColor: o2.positionAdjustBackgroundColor || (null === (K = o2.positionAdjust) || void 0 === K ? void 0 : K.backgroundColor) || (null === (Q = o2.alignment) || void 0 === Q ? void 0 : Q.backgroundColor),
      positionAdjustForegroundColor: o2.positionAdjustForegroundColor || (null === (U = o2.positionAdjust) || void 0 === U ? void 0 : U.foregroundColor) || (null === ($ = o2.alignment) || void 0 === $ ? void 0 : $.foregroundColor),
      timingBackgroundColor: o2.timingBackgroundColor || (null === (J = o2.timing) || void 0 === J ? void 0 : J.backgroundColor),
      timingForegroundColor: o2.timingForegroundColor || (null === (q = o2.timing) || void 0 === q ? void 0 : q.foregroundColor),
      typeNumberBackgroundColor: o2.typeNumberBackgroundColor || (null === (V = o2.typeNumber) || void 0 === V ? void 0 : V.backgroundColor) || (null === (Z = o2.versionInformation) || void 0 === Z ? void 0 : Z.backgroundColor),
      typeNumberForegroundColor: o2.typeNumberForegroundColor || (null === (oo = o2.typeNumber) || void 0 === oo ? void 0 : oo.foregroundColor) || (null === (eo = o2.versionInformation) || void 0 === eo ? void 0 : eo.foregroundColor),
      darkBlockColor: o2.darkBlockColor || (null === (ro = o2.darkBlock) || void 0 === ro ? void 0 : ro.color)
    },
    true
  ));
}, b.prototype.make = function() {
  let {
    foregroundColor: o2,
    backgroundColor: r,
    typeNumber: t,
    errorCorrectLevel: i,
    data: n,
    dataEncode: a,
    size: d,
    margin: u,
    useDynamicSize: s
  } = this;
  if (o2 === r) throw new b.Error("\u524D\u666F\u4E0E\u80CC\u666F\u4E0D\u80FD\u4F7F\u7528\u76F8\u540C\u989C\u8272\uFF01");
  a && (n = function(o3) {
    o3 = o3.toString();
    for (var e2, r2 = "", t2 = 0; t2 < o3.length; t2++)
      (e2 = o3.charCodeAt(t2)) >= 1 && e2 <= 127 ? r2 += o3.charAt(t2) : e2 > 2047 ? (r2 += String.fromCharCode(224 | e2 >> 12 & 15), r2 += String.fromCharCode(128 | e2 >> 6 & 63), r2 += String.fromCharCode(128 | e2 >> 0 & 63)) : (r2 += String.fromCharCode(192 | e2 >> 6 & 31), r2 += String.fromCharCode(128 | e2 >> 0 & 63));
    return r2;
  }(n));
  var g = new e(t, i);
  g.addData(n), g.make(), this.base = g, this.typeNumber = g.typeNumber, this.modules = g.modules, this.moduleCount = g.moduleCount, this.dynamicSize = s ? Math.ceil((d - 2 * u) / g.moduleCount) * g.moduleCount + 2 * u : d, function(o3) {
    let {
      dynamicSize: e2,
      margin: r2,
      backgroundColor: t2,
      backgroundPadding: i2,
      foregroundColor: n2,
      foregroundPadding: a2,
      modules: d2,
      moduleCount: u2
    } = o3;
    var s2 = (e2 - 2 * r2) / u2, g2 = s2, l = 0;
    i2 > 0 && (g2 -= 2 * (l = g2 * i2 / 2));
    var h = s2, c = 0;
    a2 > 0 && (h -= 2 * (c = h * a2 / 2));
    for (var m = 0; m < u2; m++)
      for (var f2 = 0; f2 < u2; f2++) {
        var v2 = f2 * s2 + r2, p2 = m * s2 + r2;
        if (d2[m][f2]) {
          var C2 = c, b2 = v2 + c, k = p2 + c, y = h, w = h;
          d2[m][f2] = {
            type: ["foreground"],
            color: n2,
            isBlack: true,
            isDrawn: false,
            destX: v2,
            destY: p2,
            destWidth: s2,
            destHeight: s2,
            x: b2,
            y: k,
            width: y,
            height: w,
            paddingTop: C2,
            paddingRight: C2,
            paddingBottom: C2,
            paddingLeft: C2
          };
        } else
          C2 = l, b2 = v2 + l, k = p2 + l, y = g2, w = g2, d2[m][f2] = {
            type: ["background"],
            color: t2,
            isBlack: false,
            isDrawn: false,
            destX: v2,
            destY: p2,
            destWidth: s2,
            destHeight: s2,
            x: b2,
            y: k,
            width: y,
            height: w,
            paddingTop: C2,
            paddingRight: C2,
            paddingBottom: C2,
            paddingLeft: C2
          };
      }
  }(this), function(o3) {
    let {
      modules: e2,
      moduleCount: r2,
      positionProbeBackgroundColor: t2,
      positionProbeForegroundColor: i2
    } = o3;
    var n2 = r2 - 7;
    [
      [0, 0, 1],
      [1, 0, 1],
      [2, 0, 1],
      [3, 0, 1],
      [4, 0, 1],
      [5, 0, 1],
      [6, 0, 1],
      [0, 1, 1],
      [1, 1, 0],
      [2, 1, 0],
      [3, 1, 0],
      [4, 1, 0],
      [5, 1, 0],
      [6, 1, 1],
      [0, 2, 1],
      [1, 2, 0],
      [2, 2, 1],
      [3, 2, 1],
      [4, 2, 1],
      [5, 2, 0],
      [6, 2, 1],
      [0, 3, 1],
      [1, 3, 0],
      [2, 3, 1],
      [3, 3, 1],
      [4, 3, 1],
      [5, 3, 0],
      [6, 3, 1],
      [0, 4, 1],
      [1, 4, 0],
      [2, 4, 1],
      [3, 4, 1],
      [4, 4, 1],
      [5, 4, 0],
      [6, 4, 1],
      [0, 5, 1],
      [1, 5, 0],
      [2, 5, 0],
      [3, 5, 0],
      [4, 5, 0],
      [5, 5, 0],
      [6, 5, 1],
      [0, 6, 1],
      [1, 6, 1],
      [2, 6, 1],
      [3, 6, 1],
      [4, 6, 1],
      [5, 6, 1],
      [6, 6, 1]
    ].forEach((o4) => {
      var r3 = e2[o4[0]][o4[1]], a2 = e2[o4[0] + n2][o4[1]], d2 = e2[o4[0]][o4[1] + n2];
      d2.type.push("positionProbe"), a2.type.push("positionProbe"), r3.type.push("positionProbe"), r3.color = 1 == o4[2] ? i2 : t2, a2.color = 1 == o4[2] ? i2 : t2, d2.color = 1 == o4[2] ? i2 : t2;
    });
  }(this), function(o3) {
    let { modules: e2, moduleCount: r2, separatorColor: t2 } = o3;
    [
      [7, 0],
      [7, 1],
      [7, 2],
      [7, 3],
      [7, 4],
      [7, 5],
      [7, 6],
      [7, 7],
      [0, 7],
      [1, 7],
      [2, 7],
      [3, 7],
      [4, 7],
      [5, 7],
      [6, 7]
    ].forEach((o4) => {
      var i2 = e2[o4[0]][o4[1]], n2 = e2[r2 - o4[0] - 1][o4[1]], a2 = e2[o4[0]][r2 - o4[1] - 1];
      a2.type.push("separator"), n2.type.push("separator"), i2.type.push("separator"), i2.color = t2, n2.color = t2, a2.color = t2;
    });
  }(this), function(o3) {
    let {
      typeNumber: e2,
      modules: r2,
      moduleCount: t2,
      foregroundColor: i2,
      backgroundColor: n2,
      positionAdjustForegroundColor: a2,
      positionAdjustBackgroundColor: d2,
      timingForegroundColor: u2,
      timingBackgroundColor: s2
    } = o3;
    var g2 = [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46],
      [6, 28, 50],
      [6, 30, 54],
      [6, 32, 58],
      [6, 34, 62],
      [6, 26, 46, 66],
      [6, 26, 48, 70],
      [6, 26, 50, 74],
      [6, 30, 54, 78],
      [6, 30, 56, 82],
      [6, 30, 58, 86],
      [6, 34, 62, 90],
      [6, 28, 50, 72, 94],
      [6, 26, 50, 74, 98],
      [6, 30, 54, 78, 102],
      [6, 28, 54, 80, 106],
      [6, 32, 58, 84, 110],
      [6, 30, 58, 86, 114],
      [6, 34, 62, 90, 118],
      [6, 26, 50, 74, 98, 122],
      [6, 30, 54, 78, 102, 126],
      [6, 26, 52, 78, 104, 130],
      [6, 30, 56, 82, 108, 134],
      [6, 34, 60, 86, 112, 138],
      [6, 30, 58, 86, 114, 142],
      [6, 34, 62, 90, 118, 146],
      [6, 30, 54, 78, 102, 126, 150],
      [6, 24, 50, 76, 102, 128, 154],
      [6, 28, 54, 80, 106, 132, 158],
      [6, 32, 58, 84, 110, 136, 162],
      [6, 26, 54, 82, 110, 138, 166],
      [6, 30, 58, 86, 114, 142, 170]
    ][e2 - 1];
    if (g2)
      for (var l = [
        [-2, -2, 1],
        [-1, -2, 1],
        [0, -2, 1],
        [1, -2, 1],
        [2, -2, 1],
        [-2, -1, 1],
        [-1, -1, 0],
        [0, -1, 0],
        [1, -1, 0],
        [2, -1, 1],
        [-2, 0, 1],
        [-1, 0, 0],
        [0, 0, 1],
        [1, 0, 0],
        [2, 0, 1],
        [-2, 1, 1],
        [-1, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
        [2, 1, 1],
        [-2, 2, 1],
        [-1, 2, 1],
        [0, 2, 1],
        [1, 2, 1],
        [2, 2, 1]
      ], h = g2.length, c = 0; c < h; c++)
        for (var m = 0; m < h; m++) {
          var { x: f2, y: v2 } = { x: g2[c], y: g2[m] };
          f2 < 9 && v2 < 9 || f2 > t2 - 9 - 1 && v2 < 9 || v2 > t2 - 9 - 1 && f2 < 9 || l.forEach((o4) => {
            var e3 = r2[f2 + o4[0]][v2 + o4[1]];
            e3.type.push("positionAdjust"), e3.type.includes("timing") ? 1 == o4[2] ? e3.color = a2 == i2 ? u2 : a2 : e3.color = a2 == i2 && d2 == n2 ? s2 : d2 : e3.color = 1 == o4[2] ? a2 : d2;
          });
        }
  }(this), function(o3) {
    let {
      modules: e2,
      moduleCount: r2,
      timingForegroundColor: t2,
      timingBackgroundColor: i2
    } = o3;
    for (var n2 = r2 - 16, a2 = 0; a2 < n2; a2++) {
      var d2 = e2[6][8 + a2], u2 = e2[8 + a2][6];
      d2.type.push("timing"), u2.type.push("timing"), d2.color = 1 & a2 ^ 1 ? t2 : i2, u2.color = 1 & a2 ^ 1 ? t2 : i2;
    }
  }(this), function(o3) {
    let { modules: e2, moduleCount: r2, darkBlockColor: t2 } = o3;
    var i2 = e2[r2 - 7 - 1][8];
    i2.type.push("darkBlock"), i2.color = t2;
  }(this), function(o3) {
    let {
      typeNumber: e2,
      modules: r2,
      moduleCount: t2,
      typeNumberBackgroundColor: i2,
      typeNumberForegroundColor: n2
    } = o3;
    if (e2 < 7) return r2;
    var a2 = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      "000111110010010100",
      "001000010110111100",
      "001001101010011001",
      "001010010011010011",
      "001011101111110110",
      "001100011101100010",
      "001101100001000111",
      "001110011000001101",
      "001111100100101000",
      "010000101101111000",
      "010001010001011101",
      "010010101000010111",
      "010011010100110010",
      "010100100110100110",
      "010101011010000011",
      "010110100011001001",
      "010111011111101100",
      "011000111011000100",
      "011001000111100001",
      "011010111110101011",
      "011011000010001110",
      "011100110000011010",
      "011101001100111111",
      "011110110101110101",
      "011111001001010000",
      "100000100111010101",
      "100001011011110000",
      "100010100010111010",
      "100011011110011111",
      "100100101100001011",
      "100101010000101110",
      "100110101001100100",
      "100111010101000001",
      "101000110001101001"
    ], d2 = a2[e2] + a2[e2], u2 = [t2 - 11, t2 - 10, t2 - 9];
    [
      [5, u2[2]],
      [5, u2[1]],
      [5, u2[0]],
      [4, u2[2]],
      [4, u2[1]],
      [4, u2[0]],
      [3, u2[2]],
      [3, u2[1]],
      [3, u2[0]],
      [2, u2[2]],
      [2, u2[1]],
      [2, u2[0]],
      [1, u2[2]],
      [1, u2[1]],
      [1, u2[0]],
      [0, u2[2]],
      [0, u2[1]],
      [0, u2[0]],
      [u2[2], 5],
      [u2[1], 5],
      [u2[0], 5],
      [u2[2], 4],
      [u2[1], 4],
      [u2[0], 4],
      [u2[2], 3],
      [u2[1], 3],
      [u2[0], 3],
      [u2[2], 2],
      [u2[1], 2],
      [u2[0], 2],
      [u2[2], 1],
      [u2[1], 1],
      [u2[0], 1],
      [u2[2], 0],
      [u2[1], 0],
      [u2[0], 0]
    ].forEach((o4, e3) => {
      var t3 = r2[o4[0]][o4[1]];
      t3.type.push("typeNumber"), t3.color = "1" == d2[e3] ? n2 : i2;
    });
  }(this), this.isMaked = true, this.drawModules = [];
}, b.prototype.getDrawModules = function() {
  if (this.drawModules && this.drawModules.length > 0) return this.drawModules;
  let o2 = this.drawModules = [], {
    modules: e2,
    moduleCount: r,
    dynamicSize: t,
    areaColor: i,
    backgroundImageSrc: n,
    backgroundImageX: a,
    backgroundImageY: d,
    backgroundImageWidth: u,
    backgroundImageHeight: s,
    backgroundImageAlpha: g,
    backgroundImageBorderRadius: l,
    foregroundImageSrc: h,
    foregroundImageX: c,
    foregroundImageY: m,
    foregroundImageWidth: f2,
    foregroundImageHeight: v2,
    foregroundImagePadding: p2,
    foregroundImageBackgroundColor: C2,
    foregroundImageBorderRadius: b2,
    foregroundImageShadowOffsetX: k,
    foregroundImageShadowOffsetY: y,
    foregroundImageShadowBlur: w,
    foregroundImageShadowColor: I
  } = this;
  i && o2.push({ name: "area", type: "area", color: i, x: 0, y: 0, width: t, height: t }), n && o2.push({
    name: "backgroundImage",
    type: "image",
    imageSrc: n,
    mappingName: "backgroundImageSrc",
    x: a,
    y: d,
    width: u,
    height: s,
    alpha: g,
    borderRadius: l
  });
  for (var B = 0; B < r; B++)
    for (var S = 0; S < r; S++) {
      var P = e2[B][S];
      P.isDrawn || (P.type.includes("foreground") ? o2.push({
        name: "foreground",
        type: "tile",
        color: P.color,
        destX: P.destX,
        destY: P.destY,
        destWidth: P.destWidth,
        destHeight: P.destHeight,
        x: P.x,
        y: P.y,
        width: P.width,
        height: P.height,
        paddingTop: P.paddingTop,
        paddingRight: P.paddingRight,
        paddingBottom: P.paddingBottom,
        paddingLeft: P.paddingLeft,
        rowIndex: B,
        colIndex: S
      }) : o2.push({
        name: "background",
        type: "tile",
        color: P.color,
        destX: P.destX,
        destY: P.destY,
        destWidth: P.destWidth,
        destHeight: P.destHeight,
        x: P.x,
        y: P.y,
        width: P.width,
        height: P.height,
        paddingTop: P.paddingTop,
        paddingRight: P.paddingRight,
        paddingBottom: P.paddingBottom,
        paddingLeft: P.paddingLeft,
        rowIndex: B,
        colIndex: S
      }), P.isDrawn = true);
    }
  return h && o2.push({
    name: "foregroundImage",
    type: "image",
    imageSrc: h,
    mappingName: "foregroundImageSrc",
    x: c,
    y: m,
    width: f2,
    height: v2,
    padding: p2,
    backgroundColor: C2,
    borderRadius: b2,
    shadowOffsetX: k,
    shadowOffsetY: y,
    shadowBlur: w,
    shadowColor: I
  }), o2;
}, b.prototype.isBlack = function(o2, e2) {
  var r = this.moduleCount;
  return !(0 > o2 || 0 > e2 || o2 >= r || e2 >= r) && this.modules[o2][e2].isBlack;
}, b.prototype.drawCanvas = function(o2) {
  let {
    isMaked: e2,
    canvasContext: r,
    useDynamicSize: t,
    dynamicSize: i,
    foregroundColor: n,
    foregroundPadding: a,
    backgroundColor: d,
    backgroundPadding: u,
    drawReserve: s,
    margin: g
  } = this;
  if (!e2) this.make();
  let l = this.getDrawModules(), h = async (e3, t2) => {
    try {
      r.draw(o2);
      for (var i2 = 0; i2 < l.length; i2++) {
        var n2 = l[i2];
        switch (r.save(), n2.type) {
          case "area":
            r.setFillStyle(n2.color), r.fillRect(n2.x, n2.y, n2.width, n2.height);
            break;
          case "tile":
            var a2 = n2.x, d2 = n2.y, u2 = n2.width, g2 = n2.height;
            r.setFillStyle(n2.color), r.fillRect(a2, d2, u2, g2);
            break;
          case "image":
            if ("backgroundImage" === n2.name) {
              a2 = Math.round(n2.x), d2 = Math.round(n2.y), u2 = Math.round(n2.width), g2 = Math.round(n2.height);
              u2 < 2 * (c = Math.round(n2.borderRadius)) && (c = u2 / 2), g2 < 2 * c && (c = g2 / 2), r.setGlobalAlpha(n2.alpha), c > 0 && (r.beginPath(), r.moveTo(a2 + c, d2), r.arcTo(a2 + u2, d2, a2 + u2, d2 + g2, c), r.arcTo(a2 + u2, d2 + g2, a2, d2 + g2, c), r.arcTo(a2, d2 + g2, a2, d2, c), r.arcTo(a2, d2, a2 + u2, d2, c), r.closePath(), r.setStrokeStyle("rgba(0,0,0,0)"), r.stroke(), r.clip());
              try {
                var h2 = await this.loadImage(n2.imageSrc);
                r.drawImage(h2, a2, d2, u2, g2);
              } catch (o3) {
                throw new b.Error(`${n2.mappingName} \u65E0\u6548\uFF01`);
              }
            } else if ("foregroundImage" === n2.name) {
              a2 = Math.round(n2.x), d2 = Math.round(n2.y), u2 = Math.round(n2.width), g2 = Math.round(n2.height);
              var c, m = Math.round(n2.padding);
              u2 < 2 * (c = Math.round(n2.borderRadius)) && (c = u2 / 2), g2 < 2 * c && (c = g2 / 2);
              var f2 = a2 - m, v2 = d2 - m, p2 = u2 + 2 * m, C2 = g2 + 2 * m, k = Math.round(p2 / u2 * c);
              p2 < 2 * k && (k = p2 / 2), C2 < 2 * k && (k = C2 / 2), r.save(), r.setShadow(
                n2.shadowOffsetX,
                n2.shadowOffsetY,
                n2.shadowBlur,
                n2.shadowColor
              ), k > 0 ? (r.beginPath(), r.moveTo(f2 + k, v2), r.arcTo(f2 + p2, v2, f2 + p2, v2 + C2, k), r.arcTo(f2 + p2, v2 + C2, f2, v2 + C2, k), r.arcTo(f2, v2 + C2, f2, v2, k), r.arcTo(f2, v2, f2 + p2, v2, k), r.closePath(), r.setFillStyle(n2.backgroundColor), r.fill()) : (r.setFillStyle(n2.backgroundColor), r.fillRect(f2, v2, p2, C2)), r.restore(), r.save(), k > 0 ? (r.beginPath(), r.moveTo(f2 + k, v2), r.arcTo(f2 + p2, v2, f2 + p2, v2 + C2, k), r.arcTo(f2 + p2, v2 + C2, f2, v2 + C2, k), r.arcTo(f2, v2 + C2, f2, v2, k), r.arcTo(f2, v2, f2 + p2, v2, k), r.closePath(), r.setFillStyle(
                m > 0 ? n2.backgroundColor : "rgba(0,0,0,0)"
              ), r.fill()) : (r.setFillStyle(
                m > 0 ? n2.backgroundColor : "rgba(0,0,0,0)"
              ), r.fillRect(f2, v2, p2, C2)), r.restore(), c > 0 && (r.beginPath(), r.moveTo(a2 + c, d2), r.arcTo(a2 + u2, d2, a2 + u2, d2 + g2, c), r.arcTo(a2 + u2, d2 + g2, a2, d2 + g2, c), r.arcTo(a2, d2 + g2, a2, d2, c), r.arcTo(a2, d2, a2 + u2, d2, c), r.closePath(), r.setStrokeStyle("rgba(0,0,0,0)"), r.stroke(), r.clip());
              try {
                h2 = await this.loadImage(n2.imageSrc);
                r.drawImage(h2, a2, d2, u2, g2);
              } catch (o3) {
                throw new b.Error(`${n2.mappingName} \u65E0\u6548\uFF01`);
              }
            }
        }
        s && r.draw(true), r.restore();
      }
      r.draw(true), setTimeout(e3, 150);
    } catch (o3) {
      t2(o3);
    }
  };
  return new Promise((o3, e3) => {
    h(o3, e3);
  });
}, b.prototype.draw = function(o2) {
  return this.drawCanvas(o2);
}, b.prototype.register = function(o2) {
  o2 && o2(b, this, true);
};

// src/files/index.ts
var QR = b;
async function QRObject(params) {
  if (!params || !hasObject(params) || !params.code) return;
  if (!params.size || params.size < 1) params.size = 200;
  const qr = new QR();
  qr.data = params.code;
  qr.size = params.size;
  qr.errorCorrectLevel = params.level || 2 /* H */;
  params.color = params.color || "#000000";
  params.backColor = params.backColor || "#FFFFFF";
  qr.foregroundColor = params.reserve ? params.backColor : params.color;
  qr.backgroundColor = params.reserve ? params.color : params.backColor;
  let logo = params.logo;
  if (logo === true) {
    logo = LOGO;
  } else if (!logo) {
    logo = false;
  } else {
    if (!logo.startsWith("data:image") && logo.indexOf(".") > 0) {
      logo = await remoteFileToBase64(logo, true);
    }
  }
  if (logo) {
    if (qr.errorCorrectLevel === 1 /* L */) {
      qr.errorCorrectLevel = 0 /* M */;
    }
    qr.foregroundImageSrc = logo;
  }
  qr.make();
  return qr;
}
async function QRCreate(params) {
  const qr = await QRObject(params);
  if (!qr) return "";
  const drawModules = qr.getDrawModules();
  const svg = [
    `<svg width="${params.size}" height="${params.size}" xmlns="http://www.w3.org/2000/svg" version="1.1">`
  ];
  for (var i = 0; i < drawModules.length; i++) {
    var drawModule = drawModules[i];
    switch (drawModule.type) {
      case "tile":
        svg.push(
          `<rect x="${drawModule.x}" y="${drawModule.y}" width="${drawModule.width + 0.5}" height="${drawModule.height + 0.5}" style="fill: ${drawModule.color};" />`
        );
        break;
      case "image":
        svg.push(
          `<rect x="${drawModule.x - 5}" y="${drawModule.y - 5}" width="${drawModule.width + 10}" height="${drawModule.height + 10}" rx="10"  style="fill:white;" />`
        );
        svg.push(
          `<image href="${drawModule.imageSrc}" x="${drawModule.x}" y="${drawModule.y}" width="${drawModule.width}" height="${drawModule.height}" />`
        );
        break;
    }
  }
  svg.push("</svg>");
  return svg.join("");
}
async function remoteFileToBase64(url, onlyImage = true) {
  return new Promise(async (resolve, reject) => {
    await fetch(url).then((res) => res.blob()).then((blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (hasString(reader.result)) {
          const data = reader.result;
          if (data.startsWith("data:")) {
            if (!onlyImage || data.startsWith("data:image")) {
              return resolve(data);
            }
          }
        }
        reject(new Error("\u6587\u4EF6\u65E0\u6548\u6216\u8005\u83B7\u53D6\u5931\u8D25"));
      };
      reader.onerror = () => {
        reject(reader.error || new Error("\u6587\u4EF6\u8F6C\u6362\u6210 base64 \u683C\u5F0F\u5931\u8D25"));
      };
      reader.readAsDataURL(blob);
    }).catch(() => {
      reject("\u65E0\u6CD5\u8BFB\u53D6\u8FDC\u7A0B\u6587\u4EF6");
    });
  });
}

// src/http/utils.ts
var import_ufo = require("ufo");
var payloadMethods = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function getToken(context, tokenContent = "") {
  tokenContent = context.options.token || tokenContent;
  if (!tokenContent) return;
  if (tokenContent === true) {
    const dataToken = (data) => {
      if (hasObjectName(data, "token")) {
        const value = data.token;
        if (hasString(value)) {
          delete data.token;
          return value;
        }
      }
    };
    return dataToken(context.options.body) || dataToken(context.options.params) || dataToken(context.options.query);
  } else if (isFn(tokenContent)) {
    return tokenContent(context);
  } else {
    return tokenContent;
  }
}
function updateRequest(context, appenQuery = false) {
  const { request, options } = context;
  const sourceUrl = isString(request) ? request : request == null ? void 0 : request.url;
  const baseUrl = options.baseURL;
  let url = baseUrl ? (0, import_ufo.withBase)(sourceUrl, baseUrl) : sourceUrl;
  url = url.replace(/%7B/gi, "{").replace(/%7D/gi, "}");
  const queryData = {};
  const encode = hasArray(options.encode) ? options.encode.map((x) => x.toLowerCase()) : [];
  const fields = [];
  const update = (name2, isQuery = true) => {
    const data = options[name2];
    if (!data) return;
    for (const key of Object.keys(data)) {
      let value = data[key];
      const isEncode = encode.includes(key.toLowerCase());
      if (isEncode) {
        value = base64Encode(value);
        fields.push(key);
      }
      const reg = new RegExp(`{${key}}`, "gi");
      if (reg.test(url)) {
        url = url.replace(reg, value);
      }
      if (isQuery) {
        queryData[key] = value;
      } else if (isEncode) {
        data[key] = value;
      }
    }
    if (isQuery) delete options[name2];
  };
  update("headers", false);
  update("body", false);
  update("query", true);
  update("params", true);
  if (isPayloadMethod(options.method)) {
    if (hasArray(fields)) {
      options.body = {
        ...options.body,
        _encode: fields.join(",")
      };
    }
  } else {
    delete options.body;
    if (hasArray(fields)) {
      queryData["_encode"] = fields.join(",");
    }
  }
  if (hasObject(queryData)) {
    if (appenQuery) {
      url = (0, import_ufo.withQuery)(url, queryData);
    } else {
      options.query = queryData;
    }
  }
  if (sourceUrl !== url) {
    if (isString(request)) {
      context.request = url;
    } else {
      context.request = new Request(url, request);
    }
  }
  return { url, request: context.request, options };
}
function showError(config, error) {
  if (!config || !error || error.alerted) return false;
  if (error.alert && isFn(config.alert)) error.alerted = config.alert(error, config);
  return !!error.alerted;
}
function updateId(item) {
  var _a;
  const hasData = hasObjectName(item, "data");
  const hasID = hasObjectName(item, "_ID_");
  if (hasData && !hasID) {
    item.data = updateId(item.data);
  } else if (hasID) {
    item.id = (_a = item._ID_) != null ? _a : item.id;
  } else if (hasArray(item)) {
    item = item.map((x) => updateId(x));
  }
  if (hasObjectName(item, "children")) item.children = updateId(item.children);
  return item;
}
function getResponseErrorMessage(code, message) {
  let title2 = "";
  switch (code) {
    case 400:
      title2 = "\u65E0\u6548\u8BF7\u6C42";
      message = message || "\u5F53\u524D\u64CD\u4F5C\u65E0\u6548";
      break;
    case 401:
      title2 = "\u767B\u5F55\u5F02\u5E38";
      message = message || "\u60A8\u7684\u767B\u5F55\u4FE1\u606F\u5DF2\u7ECF\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55\u540E\u518D\u64CD\u4F5C";
      break;
    case 403:
      title2 = "\u65E0\u64CD\u4F5C\u6743\u9650";
      message = message || "\u60A8\u65E0\u6743\u6267\u884C\u6B64\u64CD\u4F5C\uFF0C\u8BF7\u4E0E\u7BA1\u7406\u5458\u8054\u7CFB\u6388\u6743\uFF01";
      break;
    case 404:
      title2 = "\u8D44\u6E90\u4E0D\u5B58\u5728";
      message = message || "\u60A8\u8BF7\u6C42\u7684\u5730\u5740\u4E0D\u5B58\u5728\uFF0C\u8BF7\u68C0\u67E5\u9700\u8981\u8BBF\u95EE\u7684 API \u63A5\u53E3\u662F\u5426\u6B63\u786E";
      break;
    case 500:
      title2 = "\u670D\u52A1\u7AEF\u5F02\u5E38";
      message = message || "\u6267\u884C\u60A8\u7684\u64CD\u4F5C\u65F6\uFF0C\u670D\u52A1\u5668\u53D1\u751F\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5";
      break;
    default:
      title2 = "\u64CD\u4F5C\u5F02\u5E38";
      message = "\u64CD\u4F5C\u53D1\u751F\u5F02\u5E38\uFF1A" + (message || "\u9519\u8BEF\u4EE3\u7801 " + code);
  }
  return { title: title2, message };
}

// src/http/hook.ts
var import_ofetch = require("ofetch");
var import_chalk = __toESM(require("chalk"), 1);
var HTTP_DEBUG = {
  /**
   * 输出模式：是否开启调试信息输出
   * - false: 不输出
   * - true: 输出详细的 http 结果
   * - simple: 仅输出简单结果，及请求地址与方式，结果与参数不输出
   */
  output: true,
  /** 仅调试环境才生效，正式环境不生效 */
  debugOnly: true,
  /** 是否输出参数使用提示 */
  show: true
};
function debug(succ, title2, context, config) {
  if (TEST) return;
  if (HTTP_DEBUG.output === false) return;
  if (HTTP_DEBUG.debugOnly && !DEBUG) return;
  const space = import_chalk.default.reset(" ".repeat(4));
  const outputs = [];
  if (HTTP_DEBUG.show) {
    HTTP_DEBUG.show = false;
    outputs.push(import_chalk.default.bgYellow("#".repeat(72)));
    outputs.push("");
    outputs.push(space + `${import_chalk.default.bgRedBright("\u8C03\u8BD5\u6A21\u5F0F")}`);
    outputs.push("");
    outputs.push(
      space + import_chalk.default.redBright("\u60A8\u5DF2\u7ECF\u5F00\u542F\u4E86 HTTP \u8BF7\u6C42\u7684\u8C03\u8BD5\u6A21\u5F0F\uFF0C\u5C06\u8F93\u51FA HTTP \u8BF7\u6C42\u7684\u76F8\u5173\u4FE1\u606F\u3002")
    );
    outputs.push(
      space + import_chalk.default.redBright("\u5F53\u524D\u6A21\u5F0F\uFF1A") + import_chalk.default.bgGreen.white(` ${HTTP_DEBUG.output} `)
    );
    outputs.push(
      space + import_chalk.default.redBright("\u60A8\u53EF\u4EE5\u901A\u8FC7\u4FEE\u6539 ") + import_chalk.default.bgMagentaBright.white(" HTTP_DEBUG.output ") + import_chalk.default.redBright(" \u53C2\u6570\u6765\u8C03\u6574\u8C03\u8BD5\u4FE1\u606F\u8F93\u51FA\u7684\u60C5\u51B5\u3002")
    );
    outputs.push("");
    outputs.push(import_chalk.default.bgYellow("#".repeat(72)));
    outputs.push("");
  }
  const color = succ ? import_chalk.default.greenBright : import_chalk.default.redBright;
  const bgColor = succ ? import_chalk.default.bgGreen : import_chalk.default.bgRed;
  outputs.push(succ ? import_chalk.default.bgGreen(title2) : import_chalk.default.bgRed(title2));
  const { request, response, options, error } = context;
  let url = response ? response.url : isObject(request) ? request.url : request;
  let method = options.method || "GET";
  outputs.push(color(`[${method}] ${url}`));
  if (HTTP_DEBUG.output !== "simple") {
    outputs.push("");
    outputs.push(bgColor("[\u53C2\u6570]"));
    outputs.push(config);
    outputs.push("");
    outputs.push(bgColor("[\u8BF7\u6C42]"));
    outputs.push(request);
  }
  outputs.push("");
  outputs.push(bgColor("[\u8F93\u51FA]"));
  outputs.push(response || "\u65E0\u4EFB\u4F55\u8F93\u51FA\u7ED3\u679C");
  outputs.push("");
  outputs.push(bgColor("[\u9519\u8BEF]"));
  outputs.push(error || "\u65E0\u4EFB\u4F55\u9519\u8BEF\u4FE1\u606F");
  outputs.push("");
  outputs.forEach((item) => {
    console.log(item);
  });
}
var defaultMap = {
  Id: "traceId",
  code: "code",
  message: "message",
  data: "data"
};
function createHttp(globalOptions, globalConfig) {
  const runtime = {
    private: false,
    privateMap: defaultMap,
    globalErrorAlert: "toast",
    ...globalConfig,
    reLogin: 0
  };
  const options = {
    ...globalOptions,
    defaults: {
      credentials: "omit",
      baseURL: runtime.baseURL,
      timeout: runtime.timeout,
      onRequest: (context) => onRequest(context, runtime),
      onResponse: (context) => onResponse(context, runtime),
      onRequestError: (context) => onRequestError(context, runtime),
      onResponseError: (context) => onResponseError(context, runtime),
      ...globalOptions == null ? void 0 : globalOptions.defaults
    }
  };
  const http2 = (0, import_ofetch.createFetch)(options);
  http2.runtime = runtime;
  http2.cache = (request, options2) => HttpCache(http2, request, options2);
  http2.GET = (url, params, options2) => HttpFast(http2, url, "GET", params, options2);
  http2.POST = (url, params, options2) => HttpFast(http2, url, "POST", params, options2);
  http2.PUT = (url, params, options2) => HttpFast(http2, url, "PUT", params, options2);
  http2.PATCH = (url, params, options2) => HttpFast(http2, url, "PATCH", params, options2);
  http2.DELETE = (url, params, options2) => HttpFast(http2, url, "DELETE", params, options2);
  http2.FORM = (url, params, options2) => HttpFast(http2, url, "FORM", params, options2);
  http2.upload = (files, request, options2) => HttpUpload(http2, files, request, options2);
  http2.download = (request, options2) => HttpDownload(http2, request, options2);
  http2.api = (api, options2) => HttpApi(http2, api, options2);
  http2.resetLoginStatus = (state = 0) => runtime.reLogin = state > 4 || state < 0 ? 0 : state;
  runtime.http = http2;
  return http2;
}
async function onRequest(context, config) {
  const { request, options } = context;
  config.baseURL && options.baseURL !== config.baseURL && (options.baseURL = config.baseURL);
  config.timeout && config.timeout > 0 && (options.timeout = config.timeout);
  if (!options.headers) options.headers = new Headers();
  const data = updateRequest(context);
  config.last = {
    url: isString(request) ? request : request.url,
    method: options.method || "GET",
    time: /* @__PURE__ */ new Date(),
    id: "",
    status: 0
  };
  if (options.auth && isFn(config.auth) && !config.auth(data.url, options.method, config)) {
    con.error("\u65E0\u6B64\u63A5\u53E3\u64CD\u4F5C\u6743\u9650", data.url, options.method);
    const error = new Error("[NotAllowedError]: No permission for this interface operation");
    error.name = "NotAllowedError";
    error.code = 35;
    throw error;
  }
  if (isFn(config.sign)) await config.sign(data.url, options, config);
  if (!options.headers.has("Authorization")) {
    const token = getToken(context, config.token);
    if (hasString(token)) {
      options.headers.set("Authorization", `Bearer ${token}`);
    }
  }
  if (!options.timeout) options.timeout = config.timeout;
}
function onResponse(context, config) {
  debug(true, "HTTP Response", context, config);
  const { request, response, options } = context;
  if (!response) return;
  config.last = {
    url: isString(request) ? request : request.url,
    method: options.method || "GET",
    time: /* @__PURE__ */ new Date(),
    id: "",
    status: response.status
  };
  if (!config.private) return;
  const map = config.privateMap || defaultMap;
  response.traceId = hasObjectName(response._data, map.Id) ? response._data[map.Id] : "";
  config.last.id = response.traceId;
  if (!response.ok) return;
  const message = hasObjectName(response._data, map.message) ? response._data[map.message] : "";
  if (message && response.ok) {
    con.information("\u670D\u52A1\u5668\u53CD\u9988\u5F02\u5E38\u4FE1\u606F", response.url, options.method);
    showError(config, {
      name: "\u6E29\u99A8\u63D0\u793A",
      message,
      alert: "modal"
    });
  }
  if (hasObjectName(response._data, map.data)) response._data = response._data[map.data];
  if (options.convert) response._data = updateId(response._data);
}
function onRequestError(context, config) {
  debug(false, "HTTP Request Error", context, config);
  const httpError = {
    ...(0, import_ofetch.createFetchError)(context),
    alert: context.options.alert || config.globalErrorAlert
  };
  if (!config.private) throw httpError;
  showError(config, httpError);
  throw httpError;
}
async function onResponseError(context, config) {
  debug(false, "HTTP Response Error", context, config);
  if (!config.private) return;
  const { response, options } = context;
  if (!response) return;
  const { status, statusText, _data } = response;
  if (!SERVERMODE && status === 401 && options.autoLogin && isFn(config.login)) {
    const res = await RetryLogin(context, config);
    if (!res) return res;
  }
  const map = config.privateMap || defaultMap;
  const mapData = hasObjectName(_data, map.data) ? _data[map.data] : "";
  const mapCode = hasObjectName(_data, map.code) ? _data[map.code] : status;
  const mapMessage = hasObjectName(_data, map.message) ? _data[map.message] : statusText;
  const url = response.url;
  if (hasObject(mapData))
    throw {
      ..._data,
      code: mapCode,
      url,
      alert: context.options.alert,
      data: mapData,
      message: mapMessage
    };
  if (!context.error) context.error = (0, import_ofetch.createFetchError)(context);
  var errInfo = getResponseErrorMessage(status, mapMessage);
  const error = context.error;
  error.message = errInfo.message;
  error.name = errInfo.title;
  error.alert = context.options.alert || !status && config.globalErrorAlert;
  showError(config, error);
  throw error;
}
var cache2 = new LRU(30);
var cacheStatus = /* @__PURE__ */ new Map();
async function HttpCache(http2, request, options) {
  if (!options) options = {};
  const { cacheTime, cacheKey, cacheValue, cacheError } = await cacheRead(
    request,
    options,
    http2.runtime
  );
  if (cacheValue && hasObjectName(cacheValue, "succ")) {
    con.information("HTTP \u7F13\u5B58\u547D\u4E2D", request, cacheTime, cacheKey, cacheValue);
    if (cacheValue.succ) {
      return cacheValue.result;
    } else if (cacheError) {
      throw cacheValue.result;
    } else {
    }
  }
  cacheTime > 0 && cacheStatus.set(cacheKey, true);
  let succ = false;
  let result;
  await http2(request, options).then((res) => {
    succ = true;
    result = res;
  }).catch((res) => {
    succ = false;
    result = res;
  });
  if (cacheTime > 0) {
    const time = succ ? cacheTime : cacheError && cacheTime > 30 ? 30 : 0;
    time > 0 && cache2.set(cacheKey, { succ, result }, time);
    cacheStatus.delete(cacheKey);
  }
  if (succ) {
    return result;
  } else {
    throw result;
  }
}
var cacheRead = async (request, options, config) => {
  var _a, _b;
  const nothing = () => {
    options.cacheTime = false;
    options.cacheError = false;
    return { cacheTime, cacheKey: "", cacheValue: void 0, cacheError: false };
  };
  let cacheTime = options.cacheTime === false ? -1 : options.cacheTime || 0;
  if (cacheTime === 0) {
    const isQuery = isPayloadMethod(options.method || "GET");
    cacheTime = (isQuery ? (_a = config.cacheTime) == null ? void 0 : _a.GET : (_b = config.cacheTime) == null ? void 0 : _b.POST) || 0;
  }
  if (cacheTime < 1) return nothing();
  let cacheKey = isString(options.cacheKey) ? options.cacheKey : isFn(options.cacheKey) ? options.cacheKey(request, options) : void 0;
  if (cacheKey === "") return nothing();
  if (!cacheKey) {
    const url = isString(request) ? request : request.url;
    const method = (options.method || "GET").toUpperCase();
    const data = {};
    hasObject(options.query) && Object.assign(data, options.query);
    hasObject(options.params) && Object.assign(data, options.params);
    hasObject(options.body) && Object.assign(data, options.body);
    hasObject(options.headers) && Object.assign(data, options.headers);
    cacheKey = JSON.stringify({
      url,
      method,
      data
    });
  }
  let cacheValue = cache2.get(cacheKey);
  if (cacheValue) return { cacheTime, cacheKey, cacheValue, cacheError: options.cacheError };
  for (let i = 0; i < 10; i++) {
    await sleep(100);
    const status = !!cacheStatus.get(cacheKey);
    if (!status) break;
  }
  cacheValue = cache2.get(cacheKey);
  return { cacheTime, cacheKey, cacheValue, cacheError: options.cacheError };
};
async function HttpFast(http2, url, method, params, options) {
  if (!options) options = {};
  if (method === "FORM") {
    method = "POST";
    options.headers = {
      ...options.headers,
      "Content-Type": "application/x-www-form-urlencoded"
    };
  }
  options.method = method;
  if (isPayloadMethod(method)) {
    options.body = params;
  } else {
    options.query = params;
  }
  return HttpCache(http2, url, options);
}
async function HttpUpload(http2, files, request, options) {
  if (!files || !(files instanceof FormData)) {
    const error = {
      request,
      options,
      status: 400,
      statusCode: 400,
      name: "UploadError",
      message: "\u65E0\u6548\u4E0A\u4F20\u53C2\u6570\uFF01",
      alert: "toast"
    };
    showError(http2.runtime, error);
    throw error;
  }
  if (!options) options = {};
  if (!options.method) options.method = "POST";
  options.body = files;
  return http2(request, options);
}
async function HttpDownload(http2, request, options) {
  if (SERVERMODE || !window) return false;
  let succ = false;
  await http2(request, options).then((res) => {
    const file = window.URL.createObjectURL(res);
    const dom = document.createElement("a");
    dom.style.display = "none";
    dom.href = file;
    dom.setAttribute("download", "");
    document.body.appendChild(dom);
    dom.click();
    window.URL.revokeObjectURL(file);
    showError(http2.runtime, {
      request,
      options,
      status: 200,
      statusCode: 200,
      name: "\u6587\u4EF6\u4E0B\u8F7D",
      message: "\u6587\u4EF6\u4E0B\u8F7D\u5B8C\u6210",
      data: res,
      alert: "toast"
    });
    succ = true;
  }).catch((res) => {
    showError(http2.runtime, {
      request,
      options,
      status: 400,
      statusCode: 400,
      name: "\u6587\u4EF6\u4E0B\u8F7D",
      message: "\u6587\u4EF6\u4E0B\u8F7D\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5",
      data: res,
      alert: "toast"
    });
    succ = false;
  });
  return succ;
}
async function HttpApi(http2, api, options) {
  if (!hasObjectName(api, "url") || !isString(api.url)) throw new Error("\u65E0\u6548\u7684 API \u914D\u7F6E");
  api.method = api.method || "GET";
  api.method = api.method.toUpperCase();
  !hasObject(options) && (options = {});
  options.method = api.method;
  options.headers = api.headers;
  const isPayload = isPayloadMethod(api.method);
  if (isPayload) {
    options.body = api.data;
  } else {
    options.query = api.data;
  }
  api.timeout && api.timeout > 0 && (options.timeout = api.timeout);
  api.keepalive && (options.keepalive = api.keepalive);
  let succ = false;
  let value;
  await http2(api.url, options).then((res) => {
    value = res;
    succ = true;
    con.success("API \u8BF7\u6C42\u6210\u529F", api.url);
  }).catch((res) => {
    value = res;
    con.error("API \u8BF7\u6C42\u5F02\u5E38", api.url);
  });
  if (succ) {
    isFn(api.success) && api.success(value);
  } else {
    isFn(api.fail) && api.fail(value);
  }
  return isFn(api.complete) ? await api.complete({ succ, value, api }) : { succ, value, api };
}
async function RetryLogin(context, config) {
  if (SERVERMODE || !config || !config.http) return;
  const { request, options, response } = context;
  if (!response || response.status !== 401 || !options.autoLogin || !isFn(config.login)) return;
  const info = `[${options.method}]${response.url}`;
  con.debug("401 \u9519\u8BEF\uFF0C\u5C1D\u8BD5\u91CD\u65B0\u767B\u9646", config.reLogin, info);
  if (config.reLogin === 0) {
    config.reLogin = 1;
    con.debug("401 \u9519\u8BEF\uFF0C\u91CD\u65B0\u767B\u9646\u4E2D...", config.reLogin, info);
    const succ = await config.login(request, options, config);
    if (succ) {
      config.reLogin = 3;
      con.success("401 \u9519\u8BEF\uFF0C\u91CD\u65B0\u767B\u5F55\u6210\u529F", info);
    } else {
      config.reLogin = 2;
      con.error("401 \u9519\u8BEF\uFF0C\u91CD\u65B0\u767B\u5F55\u5931\u8D25", info);
    }
  }
  while (config.reLogin === 1) {
    await sleep(2e3);
    con.debug("\u7B49\u5F85\u5237\u65B0", config.reLogin, info);
  }
  if (config.reLogin === 3) {
    con.debug("\u91CD\u8BD5\u8BF7\u6C42", config.reLogin, info);
    config.reLogin = 4;
    return config.http(request, options).then((res) => {
      config.reLogin = 0;
      return res;
    });
  } else {
    config.reLogin = 0;
  }
}

// src/http/index.ts
var createHttpInstance = createHttp;
var http = createHttp();

// src/console.ts
var import_chalk2 = __toESM(require("chalk"), 1);
var import_ufo2 = require("ufo");
var consoleEcho = class {
  /** 信息输出 */
  _echo(icon, bgColor, color, mode, message, ...optionalParams) {
    if ((!DEBUG || TEST) && mode !== "error") return;
    const stringify = (objColor, obj) => {
      obj = emptyString(obj);
      const str = isObject(obj) ? JSON.stringify(obj, null, "	") : obj;
      return objColor(` ${str} `);
    };
    const emptyString = (obj) => {
      if (typeof obj === "undefined") return import_chalk2.default.bgGray.cyanBright(" Undefined ");
      if (obj === null) return import_chalk2.default.bgGray.cyanBright(" Null ");
      if (obj === "") return import_chalk2.default.bgGray.yellowBright(" EmptyString ");
      if (obj === true) return import_chalk2.default.bgGray.greenBright(" True ");
      if (obj === false) return import_chalk2.default.bgGray.redBright(" False ");
      return obj;
    };
    let source = import_chalk2.default.reset.white(errorTrace(1, 1, ["$Global.echo", "consoleEcho."]));
    if (hasString(message) && hasArray(optionalParams)) {
      for (let i = 0; i < optionalParams.length; i++) {
        if (!hasObject(optionalParams[i])) continue;
        if (message.includes("{") && message.includes("}")) break;
        message = template(message, optionalParams[i]);
      }
    }
    if (message) {
      message = stringify(bgColor.bold, message) + "\n" + import_chalk2.default.reset.white(source);
    } else {
      message = import_chalk2.default.reset(color(source));
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
    this._echo("", import_chalk2.default.reset, color, "default", message, void 0, ...optionalParams);
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
      import_chalk2.default.bgBlue.whiteBright,
      import_chalk2.default.blueBright,
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
      import_chalk2.default.bgRedBright.yellowBright,
      import_chalk2.default.redBright,
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
      import_chalk2.default.bgYellowBright.redBright,
      import_chalk2.default.yellowBright,
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
      import_chalk2.default.bgGreen.whiteBright,
      import_chalk2.default.green,
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
    let title2 = "";
    let id = import_chalk2.default.bgGray.yellowBright(` ${globalId()} `);
    if (isString(optionalParams[0]) && optionalParams[0]) {
      title2 = optionalParams[0];
      optionalParams = optionalParams.splice(1);
    }
    if (!SERVERMODE) {
      let source = import_chalk2.default.reset.white(errorTrace(1, 1, ["$Global.echo", "consoleEcho."]));
      const infos = source == null ? void 0 : source.split(" (");
      if (hasArray(infos)) {
        !title2 && infos[0] && (title2 = infos[0].indexOf("[37m") > -1 ? ((_a = infos[0]) == null ? void 0 : _a.split("[37m")[1]) || "" : infos[0]);
        infos[1] && (id += import_chalk2.default.bgBlack.whiteBright(
          " " + ((_b = (0, import_ufo2.parseFilename)(infos[1], { strict: true })) == null ? void 0 : _b.split(":")[0])
        ));
      }
    }
    title2 && (title2 = import_chalk2.default.bgMagenta.whiteBright(` ${title2}`));
    this._echo(id, import_chalk2.default.reset, import_chalk2.default.white, "debug", title2, ...optionalParams);
  }
};
if (!$Global.con) {
  $Global.con = new consoleEcho();
  $Global.echo = (...optionalParams) => $Global.con.debug(...optionalParams);
}

// src/eventBus.ts
var eventBus = class {
  constructor() {
    /** 注册的事件 */
    this.instance = /* @__PURE__ */ new Map();
    /**
     * 注册事件，名称如果已经存在则将被覆盖
     * @param name 事件名称，忽略大小写
     * @param action 事件
     * @param duplicate 当注册相同事件时是否允许重复
     * @param immediate 是否立即执行一次
     */
    this.on = (name2, event, duplicate = false, immediate = false, ...args) => {
      if (!isString(name2) || !name2 || !isFn(event)) return;
      name2 = name2.toLowerCase();
      if (this.instance.has(name2)) {
        const events = this.instance.get(name2);
        if (duplicate) {
          events.push(event);
        } else {
          !events.includes(event) && events.push(event);
        }
      } else {
        this.instance.set(name2, [event]);
      }
      immediate && event(...args);
    };
    /**
     * 注销指定事件，如果不存在则忽略
     * @param name 事件名称，忽略大小写
     * @param event 要移除的事件，不设置则所有都移除
     */
    this.off = (name2, event) => {
      if (!isString(name2) || !name2) return;
      name2 = name2.toLowerCase();
      if (!this.instance.has(name2)) return;
      if (!event) this.instance.delete(name2);
      if (!isFn(event)) return;
      const list2 = this.instance.get(name2);
      if (!list2) return;
      const index = list2.indexOf(event);
      if (index > -1) list2.splice(index, 1);
      if (!hasArray(list2)) this.instance.delete(name2);
    };
    /**
     * 执行事件
     * @param name 事件名称，忽略大小写
     * @param args 提交参数
     */
    this.emit = (name2, ...args) => {
      if (!isString(name2) || !name2) return;
      name2 = name2.toLowerCase();
      if (!this.instance.has(name2)) return;
      const list2 = this.instance.get(name2);
      list2 == null ? void 0 : list2.forEach((event) => event(...args));
    };
  }
};
if (!$Global.$on) {
  const defaultEvents = new eventBus();
  const resizeEvent = debounce(
    () => !SERVERMODE && defaultEvents.emit("window:resize"),
    DEBOUNCE_WINDOW_RESIZE < 100 ? 100 : DEBOUNCE_WINDOW_RESIZE,
    false
  );
  $Global.$on = defaultEvents.on;
  $Global.$off = defaultEvents.off;
  $Global.$emit = defaultEvents.emit;
  $Global.$resize = {
    /** 注册 */
    register: () => !SERVERMODE && window.addEventListener("resize", resizeEvent),
    /** 注销 */
    unregister: () => !SERVERMODE && window.removeEventListener("resize", resizeEvent),
    /** 添加 */
    on: (event, immediate = false, ...args) => {
      !SERVERMODE && defaultEvents.on("window:resize", event, false, immediate, args);
    },
    /** 移除 */
    off: (event) => !SERVERMODE && defaultEvents.off("window:resize", event),
    /** 强制执行 */
    execute: () => !SERVERMODE && resizeEvent()
  };
}

// src/formValidate.ts
var import_dayjs2 = __toESM(require("dayjs"), 1);
var FormValidate = class {
  /** 规则合并，并转换成数组规则列表 */
  concat(...args) {
    if (args.length < 1) return;
    let rules = [];
    for (let index = 0; index < args.length; index++) {
      let rule = args[index];
      rule && (rule = this.updateRules(rule));
      hasArray(rule) && (rules = merge(rules, rule));
    }
    return rules;
  }
  /********************************************************************/
  /**
   * 规则组验证
   * @param rules	规则对象，数组或者对象
   * @param value	要验证的值
   * @returns 	成功返回 true 否则返回错误提示；无规则则表示无需验证,直接返回成功!
   */
  validate(rules, value) {
    if (!rules) return true;
    rules = this.updateRules(rules);
    if (!hasArray(rules)) return true;
    const messages = rules.filter((rule) => hasObject(rule)).map((rule) => this.validateRule(rule, value)).filter((flag) => flag !== true);
    return messages.length === 0 ? true : messages.join("\uFF1B");
  }
  /**
   * 单条规则验证
   * @param rule	规则对象，数组或者对象
   * @param value	要验证的值
   * @returns 	成功返回 true 否则返回错误提示
   */
  validateRule(rule, value) {
    let message = this.validateRequired(rule, value);
    if (message === true) message = this.validateType(rule, value);
    if (message === true) message = this.validateRange(rule, value);
    if (message === true) message = this.validateRegular(rule, value);
    if (message === true) message = this.validateFunction(rule, value);
    return message;
  }
  /** 验证是否必填 */
  validateRequired(rule, value) {
    if (!rule || rule.required !== true) return true;
    const message = rule.message || "\u6B64\u9879\u76EE\u5FC5\u987B\u586B\u5199";
    if (isNil(value)) return message;
    if (isArray(value)) return value.length > 0 ? true : message;
    if (isObject(value)) return Object.keys(value).length > 0 ? true : message;
    if (isString(value)) {
      if (rule.trim === true) value = value.trim();
      return value.length > 0 ? true : message;
    }
    if (isBoolean(value)) return value === true ? true : message;
    return true;
  }
  /** 验证正则表达式，仅针对字符串 */
  validateRegular(rule, value) {
    if (!value || !rule || !rule.pattern) return true;
    if (!isString(value)) return "\u975E\u6709\u6548\u6587\u672C\uFF0C\u4E0D\u80FD\u8FDB\u884C\u6B63\u5219\u6BD4\u8F83";
    const reg = new RegExp(rule.pattern);
    return reg.test(value) ? true : rule.message || "\u4E0D\u7B26\u5408\u6307\u5B9A\u6B63\u5219\u89C4\u5219";
  }
  /**
   *	验证类型
   * @param rule 	类型:url / email / mobile / mobilephone / phone
   * @param value 值:非必须填写的项目，对于空值忽略
   */
  validateType(rule, value) {
    if (!value || !rule || !rule.type) return true;
    const message = (name2) => rule.message ? rule.message : `\u975E\u6709\u6548 ${name2} \u6570\u636E`;
    if (rule.type === "number") return isNumber(value) ? true : message("\u6570\u5B57");
    if (!isString(value) && !isNumber(value)) return message("\u7C7B\u578B\uFF0C\u4EC5\u652F\u6301\u5224\u65AD\u5B57\u7B26\u6216\u6570\u5B57\u683C\u5F0F");
    value = value.toString();
    if (rule.type === "json") return isJSON(value) ? true : message("JSON");
    if (rule.type === "url") return isHttp(value) ? true : message("\u7F51\u5740");
    if (rule.type === "email") return isEmail(value) ? true : message("\u90AE\u7BB1");
    if (rule.type === "tel") return isPhone(value) ? true : message("\u7535\u8BDD\u53F7\u7801");
    if (rule.type === "phone") return isPhone(value) ? true : message("\u7535\u8BDD\u53F7\u7801");
    if (rule.type === "mobile") return isMobile(value) ? true : message("\u624B\u673A\u53F7\u7801");
    if (rule.type === "mobilephone") return isMobile(value) ? true : message("\u624B\u673A\u53F7\u7801");
    if (rule.type === "guid") return isGuid(value) ? true : message("GUID");
    if (rule.type === "chinese") return isChinese(value) ? true : message("\u4E2D\u6587\u5B57\u7B26");
    if (rule.type === "english") return isEnglish(value) ? true : message("\u82F1\u6587\u5B57\u7B26");
    if (rule.type === "ip") return isIP(value) ? true : message("IP");
    if (rule.type === "name")
      return isName(value) ? true : "\u4EC5\u652F\u6301\u5B57\u6BCD\u6570\u5B57\u6A2A\u7EBF\u5C0F\u6570\u70B9\uFF0C\u4E14\u9700\u5B57\u6BCD\u5F00\u5934";
    return "\u4E0D\u652F\u6301\u6B64\u683C\u5F0F [" + rule.type + "] \u9A8C\u8BC1";
  }
  /** 验证区间 */
  validateRange(rule, value) {
    if (isNil(value) || !rule) return true;
    if (rule.min) {
      const min = Number(rule.min);
      if (!isNaN(min)) {
        if (isString(value)) value = Number(value);
        if (isNaN(value)) return "\u6B64\u503C\u5FC5\u987B\u4E3A\u6570\u503C";
        if (isNumber(value) && value < min)
          return rule.message || "\u6B64\u503C\u5FC5\u987B\u5927\u4E8E\u7B49\u4E8E " + min;
      }
    }
    if (rule.max) {
      const max = Number(rule.max);
      if (!isNaN(max)) {
        if (isString(value)) value = Number(value);
        if (isNaN(value)) return "\u6B64\u503C\u5FC5\u987B\u4E3A\u6570\u503C";
        if (isNumber(value) && value > max)
          return rule.message || "\u6B64\u503C\u5FC5\u987B\u5C0F\u4E8E\u7B49\u4E8E " + max;
      }
    }
    if (rule.minLength) {
      const min = Number(rule.minLength);
      if (!isNaN(min)) {
        if (isNumber(value)) value = value.toString();
        if ((isString(value) || isArray(value)) && value.length < min)
          return rule.message || "\u6B64\u503C\u957F\u5EA6\u5FC5\u987B\u5927\u4E8E\u7B49\u4E8E " + min;
      }
    }
    if (rule.maxLength) {
      const max = Number(rule.maxLength);
      if (!isNaN(max)) {
        if (isNumber(value)) value = value.toString();
        if ((isString(value) || isArray(value)) && value.length > max)
          return rule.message || "\u6B64\u503C\u957F\u5EA6\u5FC5\u987B\u5C0F\u4E8E\u7B49\u4E8E " + max;
      }
    }
    const now = (0, import_dayjs2.default)(value);
    if (rule.minDate) {
      if (!now.isValid()) return rule.message || "\u65E0\u6548\u65E5\u671F\u6570\u636E";
      const min = (0, import_dayjs2.default)(rule.minDate);
      if (min.isValid() && now.isBefore(min, "day"))
        return rule.message || "\u65F6\u95F4\u5FC5\u987B\u665A\u4E8E\u6216\u8005\u7B49\u4E8E " + min.format("YYYY\u5E74MM\u6708DD\u65E5");
    }
    if (rule.maxDate) {
      if (!now.isValid()) return rule.message || "\u65E0\u6548\u65E5\u671F\u6570\u636E";
      const max = (0, import_dayjs2.default)(rule.maxDate);
      if (max.isValid() && now.isAfter(max, "day"))
        return rule.message || "\u65F6\u95F4\u5FC5\u987B\u65E9\u4E8E\u6216\u8005\u7B49\u4E8E " + max.format("YYYY\u5E74MM\u6708DD\u65E5");
    }
    return true;
  }
  /** 验证自定义规则函数 */
  validateFunction(rule, value) {
    if (!rule || !isFn(rule.validate)) return true;
    return rule.validate(value);
  }
  /********************************************************************/
  /** 规则描述 */
  description(rules) {
    const ret = [];
    rules = this.updateRules(rules);
    if (!hasArray(rules)) return "";
    rules.filter((rule) => hasObject(rule)).forEach((rule) => {
      ret.push(this.descriptionRequired(rule));
      ret.push(this.descriptionRange(rule));
      ret.push(this.descriptionType(rule));
      ret.push(this.descriptionRegular(rule));
    });
    return ret.filter((msg) => !!msg).join("\uFF1B");
  }
  /** 必填 */
  descriptionRequired(rule) {
    return rule && rule.required === true ? "\u5FC5\u586B" : "";
  }
  /** 正则 */
  descriptionRegular(rule) {
    return rule && !!rule.pattern ? "\u8981\u6C42\u7B26\u5408\u89C4\u5219\uFF1A" + rule.pattern : "";
  }
  /** 类型 */
  descriptionType(rule) {
    if (!rule || !rule.type || !isString(rule.type)) return "";
    if (rule.type === "json") return "\u8981\u6C42\u683C\u5F0F\u4E3A JSON";
    if (rule.type === "url") return "\u8981\u6C42\u683C\u5F0F\u4E3A\u7F51\u5740";
    if (rule.type === "email") return "\u8981\u6C42\u683C\u5F0F\u4E3A\u90AE\u7BB1";
    if (rule.type === "tel") return "\u8981\u6C42\u683C\u5F0F\u4E3A\u7535\u8BDD\u53F7\u7801";
    if (rule.type === "phone") return "\u8981\u6C42\u683C\u5F0F\u4E3A\u7535\u8BDD\u53F7\u7801";
    if (rule.type === "mobile") return "\u8981\u6C42\u683C\u5F0F\u4E3A\u624B\u673A\u53F7\u7801";
    if (rule.type === "mobilephone") return "\u8981\u6C42\u683C\u5F0F\u4E3A\u624B\u673A\u53F7\u7801";
    if (rule.type === "guid") return "\u8981\u6C42\u683C\u5F0F\u4E3AGUID";
    if (rule.type === "number") return "\u8981\u6C42\u683C\u5F0F\u4E3A\u6570\u5B57";
    if (rule.type === "chinese") return "\u8981\u6C42\u683C\u5F0F\u4E3A\u4E2D\u6587\u5B57\u7B26";
    if (rule.type === "english") return "\u8981\u6C42\u683C\u5F0F\u4E3A\u82F1\u6587\u5B57\u7B26";
    if (rule.type === "ip") return "\u8981\u6C42\u683C\u5F0F\u4E3AIP";
    if (rule.type === "name") return "\u8981\u6C42\u683C\u5F0F\u5B57\u6BCD\u5F00\u5934\uFF0C\u4EC5\u5305\u542B\u5B57\u6BCD\u4E0E\u6570\u5B57\u53CA\u4E0B\u5212\u7EBF\u7684\u5B57\u7B26\u4E32";
    return "\u65E0\u6548\u89C4\u5219\u683C\u5F0F" + rule.type;
  }
  /** 区间 */
  descriptionRange(rule) {
    if (!rule) return "";
    const ret = [];
    if (rule.min) {
      const min = Number(rule.min);
      if (!isNaN(min)) ret.push("\u5FC5\u987B\u5927\u4E8E\u7B49\u4E8E" + min);
    }
    if (rule.max) {
      const max = Number(rule.max);
      if (!isNaN(max)) ret.push("\u5FC5\u987B\u5C0F\u4E8E\u7B49\u4E8E" + max);
    }
    if (rule.minLength) {
      const min = Number(rule.minLength);
      if (!isNaN(min)) ret.push("\u957F\u5EA6\u5FC5\u987B\u5927\u4E8E\u7B49\u4E8E" + min);
    }
    if (rule.maxLength) {
      const max = Number(rule.maxLength);
      if (!isNaN(max)) ret.push("\u957F\u5EA6\u5FC5\u987B\u5C0F\u4E8E\u7B49\u4E8E" + max);
    }
    if (rule.minDate) {
      const min = (0, import_dayjs2.default)(rule.minDate);
      if (min.isValid()) ret.push("\u65F6\u95F4\u5FC5\u987B\u665A\u4E8E\u6216\u8005\u7B49\u4E8E " + min.format("YYYY\u5E74MM\u6708DD\u65E5"));
    }
    if (rule.maxDate) {
      const max = (0, import_dayjs2.default)(rule.maxDate);
      if (max.isValid()) ret.push("\u65F6\u95F4\u5FC5\u987B\u65E9\u4E8E\u6216\u8005\u7B49\u4E8E " + max.format("YYYY\u5E74MM\u6708DD\u65E5"));
    }
    return ret.length > 0 ? ret.join("\uFF1B") : "";
  }
  /********************************************************************/
  /** 是否存在规则 */
  hasRules(rules) {
    return hasArray(this.updateRules(rules));
  }
  /** 将规则对象转换成规则列表 */
  updateRules(rules) {
    if (hasArray(rules)) return rules;
    if (!hasObject(rules)) return [];
    const rs = rules;
    rules = Object.keys(rs).map((key) => {
      if (key === "message") return;
      const rule = {};
      rule[key] = rs[key];
      rs.message && (rule.message = rs.message);
      return rule;
    });
    return rules;
  }
  /** 是否存在必填项目 */
  hasRequired(rules) {
    return this.updateRules(rules).some((rule) => rule && rule.required === true);
  }
};
var formValidate_default = new FormValidate();

// src/cookies.ts
function setCookie(name2, value, options = {}) {
  if (SERVERMODE) return;
  try {
    let expires = "";
    const { expire = 86400, path = "/", secure = false, httpOnly = false } = options;
    if (expire) {
      const date2 = /* @__PURE__ */ new Date();
      date2.setTime(date2.getTime() + expire * 1e3);
      expires = "; expires=" + date2.toUTCString();
    }
    const encodedValue = encodeURIComponent(value) || "";
    let cookieString = name2 + "=" + encodedValue + expires + "; path=" + path;
    if (secure) {
      cookieString += "; secure";
    }
    if (httpOnly) {
      cookieString += "; httpOnly";
    }
    document.cookie = cookieString;
  } catch (error) {
    console.error("Error setting cookie:", error);
  }
}
function getCookie(name2) {
  if (SERVERMODE) return null;
  try {
    const nameEQ = name2 + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        const value = c.substring(nameEQ.length, c.length);
        return decodeURIComponent(value);
      }
    }
    return null;
  } catch (error) {
    console.error("Error getting cookie:", error);
    return null;
  }
}
function deleteCookie(name2, path = "/") {
  if (SERVERMODE) return;
  try {
    document.cookie = name2 + "=; Path=" + path + "; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  } catch (error) {
    console.error("Error deleting cookie:", error);
  }
}
var cookies_default = { set: setCookie, get: getCookie, del: deleteCookie };

// src/waterMark.ts
var waterMark_default = (background, interval = 5) => {
  if (SERVERMODE || !background) return;
  const validate = () => {
    const img = isFn(background) ? background() : background;
    if (!img) return;
    let el = document.body.querySelector(".dl-watermark");
    if (!el) {
      el = document.createElement("div");
      el.classList.add("dl-watermark");
      document.body.appendChild(el);
    }
    el.style.pointerEvents = "none";
    el.style.position = "fixed";
    el.style.zIndex = "999999999999999999";
    el.style.left = "0";
    el.style.top = "0";
    el.style.width = "100vw";
    el.style.height = "100vh";
    el.style.backgroundRepeat = "repeat";
    el.style.backgroundPosition = "0 -100px";
    el.style.backgroundImage = img;
    el.style.opacity = "0.8";
  };
  validate();
  setInterval(validate, interval * 1e3);
};

// src/theme.ts
var import_dayjs3 = __toESM(require("dayjs"), 1);
function UIThemeQuery(options) {
  if (!SERVERMODE) {
    let getTheme2 = function(el) {
      const theme2 = el.dataset.theme;
      if (theme2) return theme2;
      const classList = el.classList;
      return defaultThemes.find((item) => classList.contains(item));
    };
    var getTheme = getTheme2;
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
      if (prefersDark.matches) return "dark";
      const prefersLight = window.matchMedia("(prefers-color-scheme: light)");
      if (prefersLight.matches) return "light";
    }
    let defaultThemes = (options == null ? void 0 : options.defaultThemes) || [];
    !hasArray(defaultThemes) && (defaultThemes = []);
    !defaultThemes.includes("dark") && defaultThemes.push("dark");
    !defaultThemes.includes("light") && defaultThemes.push("light");
    const theme = getTheme2(document.documentElement) || getTheme2(document.body);
    if (!theme) return theme;
  }
  const hour = (/* @__PURE__ */ new Date()).getHours();
  const start = (options == null ? void 0 : options.start) || 6;
  const end = (options == null ? void 0 : options.end) || 18;
  return hour > start && hour <= end ? "light" : "dark";
}
function UIThemeSet(theme, el) {
  if (SERVERMODE) return;
  theme = theme || "light";
  el = el || document.documentElement;
  el.classList.contains(theme) && el.classList.remove(theme);
  el.classList.add(theme);
  el.dataset.theme = theme;
}
var createImportantStyle = (days) => {
  if (!days || SERVERMODE) return;
  if (isString(days)) days = days.split(",");
  if (hasArray(days)) {
    const list2 = {};
    days.forEach((day2) => {
      day2 = day2.trim();
      day2 && (list2[day2] = "");
    });
    days = list2;
  }
  if (!hasObject(days)) return;
  const day = Object.keys(days).find((day2) => {
    if (day2.length < 8) day2 = `${(/* @__PURE__ */ new Date()).getFullYear()}-${day2}`;
    return (0, import_dayjs3.default)().isSame(day2, "day");
  });
  if (!day) return;
  let info = days[day];
  let background = "";
  if (isString(info) && info !== "") {
    if (info.startsWith("*")) {
      info = info.slice(1);
      document.body.style.webkitFilter = "grayscale(100%)";
      document.body.style.filter = "grayscale(100%)";
    }
    const img = (text, size2, top2) => {
      return `%3Ctext x='0' y='${top2}%25' font-size='${size2}' text-anchor='left' transform='rotate(-25)' opacity='0.06' font-weight='500' dominant-baseline='middle'%3E${text}%3C/text%3E`;
    };
    const texts = `${info},${dateFormat("", "YYYY-MM-DD")}`.replace(/[\;\:；：，]/g, ",").split(",").filter((text) => !!text);
    let size = 32;
    let top = 48;
    for (let index = 0; index < texts.length; index++) {
      const text = texts[index];
      if (!text) continue;
      background += img(text, size, top);
      index < 1 && (top += 5);
      size = 18;
      top += 8;
    }
    background = `url("data:image/svg+xml,%3Csvg width='375' height='360' xmlns='http://www.w3.org/2000/svg'%3E${background}%3C/svg%3E")`;
  }
  let el = document.body.querySelector(".dl-global-style");
  if (!el) {
    el = document.createElement("div");
    el.classList.add("dl-global-style");
    document.body.appendChild(el);
  }
  el.style.pointerEvents = "none";
  el.style.position = "fixed";
  el.style.zIndex = "999999999999999999";
  el.style.left = "0";
  el.style.top = "0";
  el.style.width = "100vw";
  el.style.height = "100vh";
  el.style.backgroundRepeat = "repeat";
  el.style.backgroundPosition = "center top";
  el.style.backgroundImage = background;
};

// src/page.ts
var screenType = (options) => {
  if (SERVERMODE) return "server";
  options = { desktop: (options == null ? void 0 : options.desktop) || 1024, mobile: (options == null ? void 0 : options.mobile) || 640 };
  if (window.innerWidth >= options.desktop) return "desktop";
  if (window.innerWidth <= options.mobile) return "mobile";
  return "tablet";
};
var isFullscreen = () => {
  if (SERVERMODE) return false;
  return (
    // @ts-ignore
    document.webkitIsFullScreen || // @ts-ignore
    document.mozFullScreen || // @ts-ignore
    document.msFullscreenElement || // @ts-ignore
    document.fullscreenElement || window.innerHeight === window.screen.height && window.innerWidth === window.screen.width
  );
};
var _elementAction = (element, elementFunctionName) => {
  try {
    const fun = element[elementFunctionName];
    if (isFn(fun)) {
      fun();
      return true;
    }
  } catch (e2) {
  }
  return false;
};
var fullscreenLaunch = (element) => {
  if (SERVERMODE) return false;
  let ele = isString(element) ? document.querySelector(element) : element;
  ele = ele || document.querySelector("#app") || document.body;
  if (!ele) return false;
  return _elementAction(ele, "requestFullscreen") || _elementAction(ele, "webkitRequestFullScreen") || _elementAction(ele, "msRequestFullscreen") || _elementAction(ele, "mozRequestFullScreen") || _elementAction(ele, "oRequestFullscreen");
};
var fullscreenExit = () => {
  if (SERVERMODE) return false;
  return _elementAction(document, "exitFullscreen") || _elementAction(document, "webkitExitFullscreen") || _elementAction(document, "msExitFullscreen") || _elementAction(document, "mozCancelFullScreen") || _elementAction(document, "oCancelFullScreen");
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $Global,
  Base,
  CACHE_TIME_MAX,
  Cookies,
  DEBOUNCE_WINDOW_RESIZE,
  DEBUG,
  DESCRIPTION,
  DecimalLength,
  FormValidate,
  HOMEPAGE,
  HTTP_DEBUG,
  LOGO,
  LRU,
  MD5,
  NAME,
  QR,
  QRCreate,
  QRErrorCorrectLevel,
  QRObject,
  SERVERMODE,
  TEST,
  TITLE,
  Tasks,
  UIThemeQuery,
  UIThemeSet,
  VERSION,
  arrayEmpty,
  arrayRemove,
  base64Decode,
  base64Encode,
  cache,
  cleanDuplicate,
  clear,
  clone,
  compare,
  consoleEcho,
  counting,
  createHttpInstance,
  createImportantStyle,
  createTasks,
  date,
  dateFormat,
  dateLong,
  debounce,
  deleteCookie,
  each,
  eachSync,
  empty,
  errorTrace,
  eventBus,
  every,
  excelJson,
  excelTable,
  execute,
  fingerprint,
  fnId,
  formValidate,
  fullscreenExit,
  fullscreenLaunch,
  get,
  getCookie,
  globalId,
  group,
  has,
  hasArray,
  hasObject,
  hasObjectName,
  hasString,
  hash,
  htmlClear,
  htmlEncode,
  htmlSafe,
  http,
  inRange,
  isArray,
  isAsync,
  isBoolean,
  isCar,
  isChinese,
  isDate,
  isEmail,
  isEmpty,
  isEnglish,
  isEqual,
  isFloat,
  isFn,
  isFullUrl,
  isFullscreen,
  isGuid,
  isHttp,
  isIP,
  isInt,
  isJSON,
  isMatch,
  isMobile,
  isNaN,
  isName,
  isNil,
  isNumber,
  isObject,
  isPhone,
  isPrimitive,
  isRegExp,
  isString,
  isSymbol,
  isUrl,
  isVueComponent,
  jsonDownload,
  list,
  list2tree,
  listConvert,
  listParents,
  listTop,
  math,
  merge,
  modulesUpdate,
  modulesUpdateSync,
  notEmpty,
  number,
  objectDownload,
  range,
  reduce,
  remoteFileToBase64,
  remove,
  rnd,
  screenType,
  select,
  set,
  setCookie,
  sleep,
  some,
  sort,
  string2Value,
  stringClear,
  stringCut,
  stringIncludes,
  template,
  throttle,
  toArray,
  toDate,
  toDeepObject,
  toFloat,
  toHtml,
  toInt,
  toJSON,
  toObject,
  toSingleObject,
  treeConvert,
  treeExecute,
  treeFind,
  treeFindAll,
  treeParents,
  trimEx,
  typeName,
  waterMark,
  xor
});
