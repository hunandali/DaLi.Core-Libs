import {
  base64Encode
} from "./chunk-CVFKWLYE.js";
import {
  cache_client_default,
  cache_server_default
} from "./chunk-OHIAEXXS.js";
import {
  LRU
} from "./chunk-6QCBU3HR.js";
import {
  $Global,
  DEBUG,
  SERVERMODE,
  TEST,
  hasArray,
  hasObject,
  hasObjectName,
  hasString,
  isFn,
  isObject,
  isString,
  modulesUpdate,
  sleep
} from "./chunk-JSKPTUZJ.js";

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

// src/cache/index.ts
var createCache = () => {
  if (!$Global.$cache) $Global.$cache = new (SERVERMODE ? cache_server_default : cache_client_default)();
  return $Global.$cache;
};

// src/http/utils.ts
import { withBase, withQuery } from "ufo";
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
  let url = baseUrl ? withBase(sourceUrl, baseUrl) : sourceUrl;
  url = url.replace(/%7B/gi, "{").replace(/%7D/gi, "}");
  const queryData = {};
  const encode = hasArray(options.encode) ? options.encode.map((x) => x.toLowerCase()) : [];
  const fields = [];
  const update = (name, isQuery = true) => {
    const data = options[name];
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
        isQuery && delete data[key];
      }
      if (isQuery) {
        queryData[key] = value;
      } else if (isEncode) {
        data[key] = value;
      }
    }
    if (isQuery) delete options[name];
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
      url = withQuery(url, queryData);
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
  let title = "";
  switch (code) {
    case 400:
      title = "\u65E0\u6548\u8BF7\u6C42";
      message = message || "\u5F53\u524D\u64CD\u4F5C\u65E0\u6548";
      break;
    case 401:
      title = "\u767B\u5F55\u5F02\u5E38";
      message = message || "\u60A8\u7684\u767B\u5F55\u4FE1\u606F\u5DF2\u7ECF\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55\u540E\u518D\u64CD\u4F5C";
      break;
    case 403:
      title = "\u65E0\u64CD\u4F5C\u6743\u9650";
      message = message || "\u60A8\u65E0\u6743\u6267\u884C\u6B64\u64CD\u4F5C\uFF0C\u8BF7\u4E0E\u7BA1\u7406\u5458\u8054\u7CFB\u6388\u6743\uFF01";
      break;
    case 404:
      title = "\u8D44\u6E90\u4E0D\u5B58\u5728";
      message = message || "\u60A8\u8BF7\u6C42\u7684\u5730\u5740\u4E0D\u5B58\u5728\uFF0C\u8BF7\u68C0\u67E5\u9700\u8981\u8BBF\u95EE\u7684 API \u63A5\u53E3\u662F\u5426\u6B63\u786E";
      break;
    case 500:
      title = "\u670D\u52A1\u7AEF\u5F02\u5E38";
      message = message || "\u6267\u884C\u60A8\u7684\u64CD\u4F5C\u65F6\uFF0C\u670D\u52A1\u5668\u53D1\u751F\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5";
      break;
    default:
      title = "\u64CD\u4F5C\u5F02\u5E38";
      message = "\u64CD\u4F5C\u53D1\u751F\u5F02\u5E38\uFF1A" + (message || "\u9519\u8BEF\u4EE3\u7801 " + code);
  }
  return { title, message };
}

// src/http/hook.ts
import { createFetch, createFetchError } from "ofetch";
import chalk from "chalk";
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
function debug(succ, title, context, config) {
  if (TEST) return;
  if (HTTP_DEBUG.output === false) return;
  if (HTTP_DEBUG.debugOnly && !DEBUG) return;
  const space = chalk.reset(" ".repeat(4));
  const outputs = [];
  if (HTTP_DEBUG.show) {
    HTTP_DEBUG.show = false;
    outputs.push(chalk.bgYellow("#".repeat(72)));
    outputs.push("");
    outputs.push(space + `${chalk.bgRedBright("\u8C03\u8BD5\u6A21\u5F0F")}`);
    outputs.push("");
    outputs.push(
      space + chalk.redBright("\u60A8\u5DF2\u7ECF\u5F00\u542F\u4E86 HTTP \u8BF7\u6C42\u7684\u8C03\u8BD5\u6A21\u5F0F\uFF0C\u5C06\u8F93\u51FA HTTP \u8BF7\u6C42\u7684\u76F8\u5173\u4FE1\u606F\u3002")
    );
    outputs.push(
      space + chalk.redBright("\u5F53\u524D\u6A21\u5F0F\uFF1A") + chalk.bgGreen.white(` ${HTTP_DEBUG.output} `)
    );
    outputs.push(
      space + chalk.redBright("\u60A8\u53EF\u4EE5\u901A\u8FC7\u4FEE\u6539 ") + chalk.bgMagentaBright.white(" HTTP_DEBUG.output ") + chalk.redBright(" \u53C2\u6570\u6765\u8C03\u6574\u8C03\u8BD5\u4FE1\u606F\u8F93\u51FA\u7684\u60C5\u51B5\u3002")
    );
    outputs.push("");
    outputs.push(chalk.bgYellow("#".repeat(72)));
    outputs.push("");
  }
  const color = succ ? chalk.greenBright : chalk.redBright;
  const bgColor = succ ? chalk.bgGreen : chalk.bgRed;
  outputs.push(succ ? chalk.bgGreen(title) : chalk.bgRed(title));
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
  const http2 = createFetch(options);
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
  http2.processRequest = processRequest;
  runtime.http = http2;
  return http2;
}
async function processRequest(request, options, config) {
  config.baseURL && options.baseURL !== config.baseURL && (options.baseURL = config.baseURL);
  config.timeout && config.timeout > 0 && (options.timeout = config.timeout);
  if (!options.headers) options.headers = new Headers();
  const data = updateRequest({ request, options });
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
    const token = getToken({ request, options }, config.token);
    if (hasString(token)) {
      options.headers.set("Authorization", `Bearer ${token}`);
    }
  }
  if (!options.timeout) options.timeout = config.timeout;
  return data.url;
}
async function onRequest(context, config) {
  const { request, options } = context;
  const url = await processRequest(request, options, config);
  if (!url) return;
  if (isString(request)) {
    context.request = url;
  } else {
    context.request = new Request(url, request);
  }
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
    ...createFetchError(context),
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
  if (!context.error) context.error = createFetchError(context);
  var errInfo = getResponseErrorMessage(status, mapMessage);
  const error = context.error;
  error.message = errInfo.message;
  error.name = errInfo.title;
  error.alert = context.options.alert || !status && config.globalErrorAlert;
  showError(config, error);
  throw error;
}
var cache = new LRU(30);
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
    time > 0 && cache.set(cacheKey, { succ, result }, time);
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
  let cacheValue = cache.get(cacheKey);
  if (cacheValue) return { cacheTime, cacheKey, cacheValue, cacheError: options.cacheError };
  for (let i = 0; i < 10; i++) {
    await sleep(100);
    const status = !!cacheStatus.get(cacheKey);
    if (!status) break;
  }
  cacheValue = cache.get(cacheKey);
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
  await (options.cacheTime && options.cacheTime > 0 ? HttpCache(http2, api.url, options) : http2(api.url, options)).then((res) => {
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
var http;
var createHttp2 = () => {
  if (!http) http = createHttp();
  return http;
};

export {
  Tasks,
  createTasks,
  createCache,
  HTTP_DEBUG,
  createHttp2 as createHttp
};
