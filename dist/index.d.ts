export { $Global, CACHE_TIME_MAX, CanvasContext, ClassName, Cookies, CookiesOptions, DEBOUNCE_WINDOW_RESIZE, DEBUG, DESCRIPTION, DecimalLength, DrawModule, FormValidate, HOMEPAGE, IQR, IRule, IRules, LOGO, LRU, MD5, NAME, QR, QRCode, QRCodeOptions, QRCreate, QRErrorCorrectLevel, QRModule, QRObject, QRPlugin, SERVERMODE, TEST, TITLE, UIThemeQuery, UIThemeSet, VERSION, arrEmpty, arrRemove, base64Decode, base64Encode, cleanDuplicate, clone, compare, counting, createFormValidate, createImportantStyle, debounce, deleteCookie, each, eachSync, errorTrace, every, excelJson, excelTable, execute, fnId, fullscreenExit, fullscreenLaunch, get, getCookie, globalId, group, has, hasArray, hasObject, hasObjectName, hasString, hash, htmlClear, htmlEncode, inRange, isArray, isAsync, isBoolean, isCar, isChinese, isDate, isEmail, isEmpty, isEnglish, isEqual, isFloat, isFn, isFullUrl, isFullscreen, isFunction, isGuid, isHttp, isIP, isInt, isJSON, isMatch, isMobile, isNaN, isName, isNil, isNumber, isObject, isPhone, isPrimitive, isPromise, isReg, isRegExp, isString, isSymbol, isUrl, isVueComponent, jsonDownload, list, list2tree, listConvert, listParents, listTop, math, merge, mergeClass, moduleOptions, modulesUpdate, modulesUpdateSync, notEmpty, number, objClear, objEmpty, objectDownload, range, reduce, remoteFileToBase64, remove, rnd, screenType, select, set, setCookie, sleep, some, sort, string2Value, stringClear, stringCut, stringIncludes, template, throttle, toArray, toDate, toDeepObject, toFloat, toHtml, toInt, toJSON, toObject, toSingleObject, treeConvert, treeExecute, treeFind, treeFindAll, treeParents, trimEx, typeName, waterMark, xor } from './base.js';
export { A as Action, b as AsyncAction, a as AsyncFunc, D as Dict, F as Func, I as IList, e as IListMap, d as ITree, f as ITreeMap, M as MaybePromise, N as NVs, c as Nullable } from './types-Cultc70v.js';
export { C as ConsoleEcho, c as createConsoleEcho } from './index-hKbpKGUW.js';
export { c as createEventBus } from './index-BvIGCbO1.js';
export { AlertNotifyMode, CacheValue, HTTP_DEBUG, HttpCacheOptions, HttpClient, HttpConfig, HttpContext, HttpError, HttpFetch, HttpOptions, HttpRequest, HttpResponse, HttpResponseMap, HttpRuntime, IApi, IApiBase, IApiResult, ITask, ITasks, ResolvedHttpOptions, ResponseType, TaskModeEnum, Tasks, TokenContent, createCache, createHttp, createTasks } from './limit.js';
import DOMPurify from 'isomorphic-dompurify';
import dayjs from 'dayjs';
import 'chalk';
import './cache.d-BZHaRzyS.js';
import 'ofetch';

/**
 * 获取浏览器指纹
 * 结果将返回两个参数：
 * id：浏览器指纹
 * score：指纹评分；1 最可信，0 最不可信
 * 如果服务端而非浏览器端执行则此函数固定返回 { id: 'server', score: 1 }
 */
declare function fingerprint(): Promise<{
    id: string;
    score: number;
}>;

/**
 * html 安全化处理，去除危险标记，方式 xss 攻击
 * @param dirty 	待处理的 html 或者节点
 * @param config 	配置选项，不设置则默认仅处理 html
 * @returns		处理后的 html
 */
declare function htmlSafe(dirty: string | Node, config?: DOMPurify.Config): string;

/** 时间库 */

/**
 * 将任何可以转换成时间的对象，使用 dayjs 包装
 * @param date 	用于包装的时间（字符串支持:now,yesterday,tomorrow)
 */
declare const date: (date?: any) => dayjs.Dayjs;
/**
 * 将任何可以转换成时间的对象，按条件格式化成字符串
 * 所有早于 2000 年的时间都无效
 * @param date 		用于格式化的时间（字符串支持:now,today,yesterday,tomorrow,weekstart,monthstart,yearstart,weekend,monthend,yearend)
 * @param format 	格式。支持：YYYY MM DD HH mm ss / desc 间隔描述
 */
declare const dateFormat: (date?: any, format?: string) => string;
/**
 * 计算时长
 * @param start 		开始时间
 * @param end 			结束时间
 * @param isEn 			使用英文、中文
 * @param incSuffix 	是否包含前、后
 * @returns
 */
declare const dateLong: (start: any, end?: any, isEn?: boolean, incSuffix?: boolean) => string;

export { date, dateFormat, dateLong, fingerprint, htmlSafe };
