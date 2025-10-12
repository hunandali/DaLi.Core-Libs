// package.json
var name = "@da.li/core-libs";
var title = "\u5927\u6CA5\u7F51\u7EDC\u51FD\u6570\u5E93";
var version = "1.25.1013";
var description = "\u5927\u6CA5\u7F51\u7EDC\u51FD\u6570\u5E93\u662F\u5927\u6CA5\u7F51\u7EDC\u63D0\u4F9B\u7684\u4E00\u4E2A\u516C\u5171 TypeScript \u51FD\u6570\u5E93\uFF0C\u5C01\u88C5\u4E86\u57FA\u7840\u64CD\u4F5C\u3001\u7F13\u5B58\u3001\u52A0\u5BC6\u3001\u6587\u4EF6\u5904\u7406\u3001HTTP \u8BF7\u6C42\u7B49\u5E38\u7528\u529F\u80FD\u6A21\u5757\uFF0C\u65E8\u5728\u63D0\u9AD8\u5F00\u53D1\u6548\u7387\u3002";
var homepage = "http://www.hunandali.com/";

// config.ts
var LOGO = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgc3R5bGU9ImJhY2tncm91bmQ6ICNGRkZGRkYiPjxwYXRoIGQ9Ik03ODguNzUwMDggMzkwLjcwMzM2TDcwOS41ODg0OCA0NC43NjY3MmwtOC4wNzU1MiA0Ljg4OTYtNTY0LjYzMzYgMzQxLjkxODcyIDMyMi42NzM5MiA1ODYuMzM0NzIgMjI1LjUzODU2LTI0Ny4zMzU2OGgyNC44MDM4NGwtMjYyLjcwNzIgMjkzLjQyNDY0TDcyLjM3ODg4IDM3NC44MDk2IDcyMS41NjkyOCAwbDg1LjgxODg4IDM5MC43MDMzNmgtMTguNjM2OHogbS02MjYuODU5NTIgNy4zNjUxMkw3MDQuNjU2NjQgNjMuMTc1NjhsNzYuMjIxNDQgMzI3LjUyNzY4aC0yMi4wMDcwNEw2OTEuMjU4ODggMTEzLjExNDg4IDIyNS43MzE4NCA0MTQuNjEzNzZsMjUyLjYyMDggNDkzLjA3Nzc2IDE2Ni4yODk5Mi0xNzcuMTE3NDRoMjkuODcwMDhjLTg2LjQ0NjA4IDk0LjA3NDg4LTE4My41ODUyOCAxOTkuNzgyNC0yMDkuODg4IDIyOC40MDgzMkwxNjEuODkwNTYgMzk4LjA2ODQ4eiIgZmlsbD0iIzAwNUVBNyI+PC9wYXRoPjxwYXRoIGQ9Ik01NDYuOTUwNCA2OTMuNjcwNGwtNjguOTg2ODgtMjI0LjEwNDk2IDYuMjM2MTYgMC4xMzA1NiA0MzYuMDUxMiA5LjExMzYgOS4wNjYyNCA0NDIuMTEwNzItMjEwLjc2NDgtNjcuMDIyMDgtMTQuMTk1MiA4LjE5NTg0IDI0Ny4yNjI3MiA4MS4xMTM2VjQ0Ny45MDRINDU2LjMxODcybDc5Ljk2OTI4IDI1MS45MjE5MiAxMC42NjI0LTYuMTU2OHogbTM2MS4xMzQwOC0yMDIuODg1MTJjLTc3LjE4MDE2LTIuMjU1MzYtNDIxLjIxNzI4LTEyLjMxNjE2LTQyMS4yMTcyOC0xMi4zMTYxNmw2NC41OTEzNiAyMTIuNTk3NzYgMTIuNTkxMzYtNy4yNzE2OC01My4wMTYzMi0xODEuMTc2MzIgMzY1Ljk4NTI4IDE4LjcyNzY4IDE4LjM0MzY4IDM2NS42MDY0LTE1My42Njc4NC00Ni40MTY2NC0xNy4wOTE4NCA5Ljg2ODggMTk1LjU1ODQgNjEuMzU4MDhzLTkuOTUyLTM0Ni44NDE2LTEyLjA3NjgtNDIwLjk3NzkyeiIgZmlsbD0iI0YwODMyMSI+PC9wYXRoPjwvc3ZnPg==";
var DEBUG = process.env.NODE_ENV !== "production";
var TEST = process.env.NODE_ENV === "test";
var SERVERMODE = typeof window === "undefined";
var DEBOUNCE_WINDOW_RESIZE = 300;
var CACHE_TIME_MAX = SERVERMODE ? 5 : 30;

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
var isPromise = (value) => {
  if (!value) return false;
  if (!value.then) return false;
  if (!isFunction(value.then)) return false;
  return true;
};
var isAsync = (value) => {
  return isFn(value) && value[Symbol.toStringTag] === "AsyncFunction";
};
var isString = (value) => {
  return typeof value === "string" || value instanceof String;
};
var isNumber = (value) => {
  try {
    return Number(value) === value;
  } catch (e) {
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
  if (isDate(value)) return isNaN(value.getTime());
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
var isReg = isRegExp;
var isNil = (value) => value === null || value === void 0;
var isNaN = (value) => !isNumber(value);
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
  } catch (e) {
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
    } catch (e) {
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
var objEmpty = (obj, filter = (x) => isNil(x)) => {
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
var objClear = (obj, filter = (x) => isNil(x) || x.toString().trim() === "", deep = false) => {
  if (!obj || filter(obj)) return void 0;
  if (!hasObject(obj)) return obj;
  const keys = Object.keys(obj);
  return keys.reduce((acc, key) => {
    if (filter(obj[key])) return acc;
    if (isObject(obj[key]) && deep) {
      const value = objClear(obj[key], filter);
      hasObject(value) && (acc[key] = value);
      return acc;
    }
    if (isArray(obj[key]) && deep) {
      const value = obj[key].map((item) => objClear(item)).filter((item) => !filter(item));
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
  } catch (e) {
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
var compare = (a, b, getter) => {
  const fn = getter ? isFn(getter) ? getter : (item) => item[getter] : (item) => item;
  let x = fn(a);
  let y = fn(b);
  if (isNumber(x) && isNumber(y)) return x - y;
  x = (x || "").toString();
  y = (y || "").toString();
  return x.localeCompare(y);
};
var sort = (array, getter, desc = false) => {
  const _sort = (a, b) => {
    let x = getter(a);
    let y = getter(b);
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
var arrEmpty = (list2, filter = (x) => isNil(x)) => {
  var _a;
  return (_a = list2 == null ? void 0 : list2.filter(filter)) != null ? _a : [];
};
var arrRemove = (array, predicate, position = false) => {
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
  return isNaN(value) ? 0 : value;
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
  return isNaN(result) ? def : result;
};
var toInt = (value, defaultValue) => {
  const def = defaultValue === void 0 ? 0 : defaultValue;
  if (value === null || value === void 0) {
    return def;
  }
  const result = parseInt(value);
  return isNaN(result) ? def : result;
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
  !skipConvert && hasObject(ret) && (ret.__list = true);
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
function list2tree(list2, parent, predicate, updateItem) {
  if (!hasArray(list2)) return [];
  const filterFn = isFn(predicate) ? (item, index, array) => predicate(parent, item, index, array) : (item) => item.parent === parent && item.value !== parent;
  return list2.filter(filterFn).map((item) => {
    let restult = {
      ...item,
      children: list2tree(list2, item.value, predicate, updateItem),
      parent
    };
    return isFn(updateItem) ? updateItem(restult) : restult;
  }).filter((item) => hasObject(item));
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
function fnId(fn, remove2 = false) {
  if (!isFn(fn)) return "";
  let id = "";
  if (Funs.has(fn)) {
    id = Funs.get(fn);
    remove2 && Funs.delete(fn);
  } else {
    id = globalId("Fn");
    if (!remove2) Funs.set(fn, id);
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

// src/base/index.ts
var $Global = (function() {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw new Error("\u65E0\u6CD5\u83B7\u53D6\u9876\u7EA7\u5BF9\u8C61\uFF1AglobalThis");
})();

export {
  name,
  title,
  version,
  description,
  homepage,
  LOGO,
  DEBUG,
  TEST,
  SERVERMODE,
  DEBOUNCE_WINDOW_RESIZE,
  CACHE_TIME_MAX,
  typeName,
  isArray,
  isSymbol,
  isObject,
  isPrimitive,
  isFunction,
  isFn,
  isPromise,
  isAsync,
  isString,
  isNumber,
  isDate,
  isEmpty,
  isBoolean,
  isRegExp,
  isReg,
  isNil,
  isNaN,
  isVueComponent,
  notEmpty,
  hasObject,
  hasObjectName,
  hasArray,
  hasString,
  isEqual,
  isMatch,
  isMobile,
  isCar,
  isPhone,
  isEmail,
  isUrl,
  isFullUrl,
  isHttp,
  isGuid,
  isChinese,
  isEnglish,
  isName,
  isIP,
  isJSON,
  isInt,
  isFloat,
  template,
  trimEx,
  string2Value,
  stringCut,
  stringClear,
  htmlClear,
  htmlEncode,
  stringIncludes,
  objEmpty,
  objClear,
  get,
  set,
  remove,
  has,
  each,
  eachSync,
  reduce,
  math,
  every,
  some,
  toArray,
  toHtml,
  toJSON,
  clone,
  merge,
  toSingleObject,
  toDeepObject,
  compare,
  sort,
  range,
  list,
  counting,
  group,
  toObject,
  select,
  arrEmpty,
  arrRemove,
  cleanDuplicate,
  number,
  inRange,
  toFloat,
  toInt,
  DecimalLength,
  toDate,
  treeExecute,
  treeFind,
  treeFindAll,
  treeParents,
  listParents,
  listTop,
  listConvert,
  treeConvert,
  list2tree,
  modulesUpdateSync,
  modulesUpdate,
  hash,
  rnd,
  errorTrace,
  sleep,
  execute,
  fnId,
  debounce,
  throttle,
  globalId,
  $Global
};
