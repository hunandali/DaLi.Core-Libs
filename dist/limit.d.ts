export { $Global, CACHE_TIME_MAX, CanvasContext, ClassName, ClassNameValue, Cookies, CookiesOptions, DEBOUNCE_WINDOW_RESIZE, DEBUG, DESCRIPTION, DecimalLength, DrawModule, FormValidate, HOMEPAGE, IQR, IRule, IRules, LOGO, LRU, MD5, NAME, QR, QRCode, QRCodeOptions, QRCreate, QRErrorCorrectLevel, QRModule, QRObject, QRPlugin, SERVERMODE, TEST, TITLE, UIThemeQuery, UIThemeSet, VERSION, arrEmpty, arrRemove, base64Decode, base64Encode, cleanDuplicate, clone, compare, counting, createFormValidate, createImportantStyle, debounce, deleteCookie, each, eachSync, errorTrace, every, excelJson, excelTable, execute, fnId, fullscreenExit, fullscreenLaunch, get, getCookie, globalId, group, has, hasArray, hasObject, hasObjectName, hasString, hash, htmlClear, htmlEncode, inRange, isArray, isAsync, isBoolean, isCar, isChinese, isDate, isEmail, isEmpty, isEnglish, isEqual, isFloat, isFn, isFullUrl, isFullscreen, isFunction, isGuid, isHttp, isIP, isInt, isJSON, isMatch, isMobile, isNaN, isName, isNil, isNumber, isObject, isPhone, isPrimitive, isPromise, isReg, isRegExp, isString, isSymbol, isUrl, isVueComponent, jsonDownload, list, list2tree, listConvert, listParents, listTop, math, merge, mergeClass, moduleOptions, modulesUpdate, modulesUpdateSync, notEmpty, number, objClear, objEmpty, objectDownload, range, reduce, remoteFileToBase64, remove, rnd, screenType, select, set, setCookie, sleep, some, sort, string2Value, stringClear, stringCut, stringIncludes, template, throttle, toArray, toDate, toDeepObject, toFloat, toHtml, toInt, toJSON, toObject, toSingleObject, treeConvert, treeExecute, treeFind, treeFindAll, treeParents, trimEx, typeName, waterMark, xor } from './base.js';
import { A as Action, D as Dict, M as MaybePromise } from './types-Cultc70v.js';
export { b as AsyncAction, a as AsyncFunc, F as Func, I as IList, e as IListMap, d as ITree, f as ITreeMap, N as NVs, c as Nullable } from './types-Cultc70v.js';
export { C as ConsoleEcho, c as createConsoleEcho } from './index-hKbpKGUW.js';
export { c as createEventBus } from './index-BvIGCbO1.js';
import { I as ICache } from './cache.d-BZHaRzyS.js';
import { ResponseMap, FetchOptions, FetchRequest, FetchResponse, FetchError, MappedResponseType, $Fetch } from 'ofetch';
import 'chalk';

/** 定时任务 */
interface ITask {
    /** 名称 */
    name: string;
    /** 执行间隔时间（秒） */
    interval: number;
    /** 最后执行时间戳 */
    last: number;
    /** 最后执行时间文本描述 */
    lastTime: string;
    /** 执行次数 */
    count: number;
    /** 是否执行中 */
    busy: boolean;
    /** 初始化操作 */
    init?: Action;
    /** 执行操作 */
    execute: (currentTask: ITask, allTasks: ITask[]) => Promise<any>;
    /** 状态消息 */
    message?: string;
    /** 执行结果 */
    result?: any;
}
/**
 * 任务运行模式
 * true: 客户端，服务端都可开启定时任务
 * false: 客户端，服务端都不开启定时任务
 * client: 仅客户端开启定时任务
 * server: 仅服务端开启定时任务
 */
type TaskModeEnum = boolean | 'client' | 'server';
/** 后台任务类 */
declare class Tasks {
    /** 任务列表 */
    readonly instance: ITask[];
    /** 定时器 */
    private timer;
    /** 任务轮询周期（单位：秒） */
    readonly interval: number;
    /** 轮询次数 */
    counter: number;
    /** 最后操作时间 */
    last: Date;
    /** 是否运行中 */
    busy: boolean;
    /**
     * 构造
     * @param tasks 任务列表
     * @param interval 轮询周期（单位：秒）
     */
    constructor(tasks: ITask[], interval?: number);
    /** 执行任务 */
    private execute;
    /** 停止任务 */
    stop(): void;
    /** 启动任务 */
    start(): void;
}
/** 后台任务集合类型 */
type ITasks = Tasks;
/**
 * 通过模块创建任务
 * @param modules 模块数据集合，使用 import.meta.glob 获取
 * @param interval 轮询周期（单位：秒）
 * @param mode 任务运行模式（true: 客户端，服务端都可开启定时任务，false: 客户端，服务端都不开启定时任务，client: 仅客户端开启定时任务，server: 仅服务端开启定时任务）
 * @returns 任务集合
 * @example
 * createTasks(import.meta.glob('./tasks/*.ts', { eager: true }))
 * createTasks([import.meta.glob('./tasks/*.ts', { eager: true }),import.meta.glob('./tasks/*.js', { eager: true })])
 */
declare const createTasks: (modules: Dict | Dict[], interval?: number, mode?: TaskModeEnum) => Tasks | undefined;

/** 类型 */

/** 全局类型申明 */
declare global {
    var $cache: ICache;
}
/** 创建缓存 */
declare const createCache: () => ICache;

/** 响应类型扩展，支持所有 ResponseMap 键值及默认的 json 格式 */
type ResponseType = keyof ResponseMap | 'json';
/**
 * HTTP 请求配置选项
 * @template R - 响应类型（默认为 json）
 * @template T - 响应体数据类型
 */
interface HttpOptions<R extends ResponseType = ResponseType, T = any> extends FetchOptions<R, T> {
    /**
     * 认证令牌（支持动态获取）
     * @default 使用全局 fetchConfig.token
     */
    token?: TokenContent;
    /**
     * API 权限验证开关
     * @default false 默认不验证权限
     */
    auth?: boolean;
    /**
     * 是否在 401 错误时自动登录(仅支持浏览器客户端)。
     * 当出现 401 错误时触发的登录操作，用于自动刷新登录信息，方便无感登录
     * @default false 默认不验证权限
     */
    autoLogin?: boolean;
    /**
     * ID 转换开关（用于处理大数字精度丢失问题）
     * 从 _ID_ 中获取实际 id。
     * 当 id 为 long 时，如果超过 js 最大值则需要使用 string，此时则需要从 _ID_ 中获取 id。
     * 需要注意的是获取到的 id 将变成 string
     * @default false 默认不转换
     */
    convert?: boolean;
    /**
     * 错误提示方式
     * @default 'modal' 默认弹窗提示
     */
    alert?: AlertNotifyMode;
    /**
     * 需要 Base64 编码的请求字段
     * @example ['password', 'token']
     */
    encode?: string[];
}
/**
 * HTTP 缓存请求配置选项
 * @template R - 响应类型（默认为 json）
 * @template T - 响应体数据类型
 */
interface HttpCacheOptions<R extends ResponseType = ResponseType, T = any> extends HttpOptions<R, T> {
    /**
     * 缓存时长(单位：毫秒)
     * false 不启用缓存
     * @default 0 不启用缓存
     */
    cacheTime?: number | false;
    /** 是否缓存异常 */
    cacheError?: boolean;
    /** 是否缓存异常 undefined,null 将自动创建，空字符串将关闭缓存 */
    cacheKey?: string | ((request: HttpRequest, options?: HttpCacheOptions<R, T>) => string);
}
interface ResolvedHttpOptions<R extends ResponseType = ResponseType, T = any> extends HttpOptions<R, T> {
    headers: Headers;
}
type HttpRequest = FetchRequest;
type HttpResponse<T = any> = FetchResponse<T> & {
    /** 请求的标识(仅对公司内部项目有效) */
    traceId?: string;
};
type HttpError = FetchError & {
    /** 错误提示模式 */
    alert?: AlertNotifyMode;
    /** 是否已经给用户进行提示过 */
    alerted?: boolean;
};
interface HttpContext<T = any, R extends ResponseType = ResponseType> {
    request: HttpRequest;
    options: ResolvedHttpOptions<R>;
    response?: HttpResponse<T>;
    error?: Error;
}
/**
 * HTTP 简化请求类型(含缓存操作)
 * @template T 响应数据类型
 * @template R 响应类型（默认为 json）
 * @param url 请求地址
 * @param params 请求参数
 * @param options 请求选项
 * @returns 解析后的响应数据
 */
type HttpFetch = <T = any, R extends ResponseType = 'json'>(url: string, params?: Dict, options?: HttpCacheOptions<R>) => Promise<MappedResponseType<R, T>>;
/**
 * 增强版 HTTP 客户端接口
 * @extends $Fetch 基础请求接口
 */
interface HttpClient extends $Fetch {
    /**
     * 发起 HTTP 请求
     * @template T 响应数据类型
     * @template R 响应类型（默认为 json）
     * @param request 请求地址或配置
     * @param options 请求选项
     * @returns 解析后的响应数据
     */
    <T = any, R extends ResponseType = 'json'>(request: HttpRequest, options?: HttpOptions<R>): Promise<MappedResponseType<R, T>>;
    /** 运行配置 */
    runtime: HttpRuntime;
    /**
     * 发起带 Cache 的 HTTP 请求
     * @template T 响应数据类型
     * @template R 响应类型（默认为 json）
     * @param request 请求地址或配置
     * @param options 请求选项
     * @returns 解析后的响应数据
     */
    cache: <T = any, R extends ResponseType = 'json'>(request: HttpRequest, options?: HttpCacheOptions<R>) => Promise<MappedResponseType<R, T>>;
    /** 简化操作（GET） */
    GET: HttpFetch;
    /** 简化操作（POST） */
    POST: HttpFetch;
    /** 简化操作（PUT） */
    PUT: HttpFetch;
    /** 简化操作（PATCH） */
    PATCH: HttpFetch;
    /** 简化操作（DELETE） */
    DELETE: HttpFetch;
    /** 简化操作（表单提交） */
    FORM: HttpFetch;
    /** 文件上传 */
    upload: <T = any, R extends ResponseType = 'json'>(files: FormData, request: HttpRequest, options?: HttpOptions<R>) => Promise<MappedResponseType<R, T>>;
    /** 文件下载 */
    download: (request: HttpRequest, options?: HttpOptions) => Promise<boolean>;
    /**
     * 执行 api 操作(简要 API 参数)
     * @param api api 数据
     * @returns api 执行结果
     */
    api: (api: IApi, options?: HttpCacheOptions) => Promise<void | IApiResult>;
    /** 重置登陆状态 */
    resetLoginStatus: (status?: number) => void;
    /** 请求预处理，以便将处理后的头部数据，请求数据暴露方便第三方需要时调用 */
    processRequest: (request: RequestInfo, options: ResolvedHttpOptions, config: HttpRuntime) => Promise<void>;
}
/**
 * token 获取方式
 * 1. 函数：从函数则从执行结果来获取 token 值；
 * 2. token 值如果为 ture, 则从请求头中获取 token 值；
 * 3. token 值存在有效文本则在请求头部增加 Authorization 信息
 */
type TokenContent = string | true | ((context: {
    request: RequestInfo;
    options: ResolvedHttpOptions;
}) => string);
/**
 * http 默认参数
 * 关于专有格式接口的说明：
 * 1. 该接口时对于专有格式的配置；
 * 2. 专有格式反馈结果为 JSON 格式的接口，且格式为
 * ```json
 * 	{
 * 		code: number, // 错误代码
 * 		message: string, // 错误消息
 *  	traceId: string, // 服务器返回请求 ID
 * 		data: any // 数据结果
 * 	}
 * ```
 */
interface HttpConfig {
    /** 专有接口字段映射 */
    private: boolean;
    /** 专有接口字段映射 */
    privateMap?: HttpResponseMap;
    /** 基础请求地址 */
    baseURL?: string;
    /** 请求头 */
    /** 请求超时时间(单位：毫秒) */
    timeout?: number;
    /** 默认缓存时长(单位：毫秒) */
    cacheTime?: {
        /** GET 类请求 */
        GET: number;
        /** POST 类请求 */
        POST: number;
    };
    /** 通用登录授权 Token 数据 */
    token?: TokenContent;
    /**
     * 网址权限验证
     * @param url 		要验证的网址
     * @param method 	请求方式
     * @param config  	相关配置数据
     * @returns			是否通过验证，未通过验证的网址将无法进行后续操作
     */
    auth?: (url: string, method: string, config: HttpRuntime) => boolean;
    /**
     * 签名算法，用于附加到请求头部的参数
     * @param url 		要签名的网址
     * @param options 	其他相关请求参数
     * @param config  相关配置数据
     */
    sign?: (url: string, options: ResolvedHttpOptions, config: HttpRuntime) => MaybePromise<void>;
    /**
     * 登录验证。
     * 当出现 401 错误时触发的登录操作，用于自动刷新登录信息，方便无感登录
     * @param request 请求信息
     * @param options 其他相关请求参数
     * @param config  相关配置数据
     */
    login?: (request: HttpRequest, options: ResolvedHttpOptions, config: HttpRuntime) => Promise<boolean>;
    /**
     * 错误处理。
     * 当出现错误时触发的操作，用于处理错误信息，方便统一处理。
     * 当请求发送异常时执行的操作，如弹窗信息等。
     * 如果返回 true 表示已经处理不再后续操作，false 则表示后续需要产生错误异常信息
     * @param error 错误信息
     */
    alert?: (error: HttpError, config: HttpRuntime) => boolean;
    /** 全局无返回状态的错误，是否强制提醒 */
    globalErrorAlert?: AlertNotifyMode;
}
/** http 运行参数 */
interface HttpRuntime extends HttpConfig, Dict {
    /**
     * 重登录状态，用于响应状态，无需手动赋值。
     * 0 - 初始化,未发生 401
     * 1 - 已发生 401,尝试登录;成功则返回 0 ,否则返回 2 失败
     * 2 - 登录失败
     * 3 - 登录成功,可以重试
     * 4 - 重试完成
     */
    reLogin?: number;
    /** 最后操作状态 */
    last?: {
        id?: string;
        url: string;
        method: string;
        status?: number;
        time: Date;
    };
    /** 所在的 http 对象 */
    http?: HttpClient;
}
/**
 * 错误提示模式
 * false 直接返回错误信息
 * toast 顶部弹出信息
 * modal / true 弹窗提示
 * 其他 notify
 */
type AlertNotifyMode = 'modal' | 'toast' | 'notify' | boolean | undefined;
/**
 * 缓存值
 * @template T 缓存数据类型
 */
interface CacheValue<T = any> {
    succ: boolean;
    result: T;
}
/** 转有接口键映射名称 */
interface HttpResponseMap {
    Id: string;
    code: string;
    message: string;
    data: string;
}
/** Api 请求  */
interface IApiBase {
    /** api 地址 */
    url?: string;
    /** 请求方式 */
    method?: string;
    /** 提交参数 */
    data?: Dict | RequestInit['body'];
    /** 头部参数 */
    headers?: Headers;
    /** 超时时长，不设置则使用默认值，单位：秒 */
    timeout?: number;
    /** 是否保持连接 */
    keepalive?: boolean;
    /** 执行后处理, 处理过程位于 apis.$execute */
    complete?: (options: IApiResult) => MaybePromise<IApiResult | undefined | void>;
}
/** Api 请求  */
interface IApi extends IApiBase {
    /** 成功后操作 */
    success?: (value: any) => void;
    /** 失败后操作 */
    fail?: (value: any) => void;
}
/** api 执行结果 */
interface IApiResult {
    /** 是否执行成功 */
    succ: boolean;
    /** 返回结果，当 succ 为 true 时返回网络请求结果，当 succ 为 false 时返回错误信息 */
    value: any;
    /** 当前操作的 api */
    api: IApi;
}

/** 调试信息 */
declare const HTTP_DEBUG: {
    /**
     * 输出模式：是否开启调试信息输出
     * - false: 不输出
     * - true: 输出详细的 http 结果
     * - simple: 仅输出简单结果，及请求地址与方式，结果与参数不输出
     */
    output: boolean | "simple" | "request" | "response";
    /** 仅调试环境才生效，正式环境不生效 */
    debugOnly: boolean;
    /** 是否输出参数使用提示 */
    show: boolean;
};

declare const createHttp: () => HttpClient;

export { Action, type AlertNotifyMode, type CacheValue, Dict, HTTP_DEBUG, type HttpCacheOptions, type HttpClient, type HttpConfig, type HttpContext, type HttpError, type HttpFetch, type HttpOptions, type HttpRequest, type HttpResponse, type HttpResponseMap, type HttpRuntime, type IApi, type IApiBase, type IApiResult, type ITask, type ITasks, MaybePromise, type ResolvedHttpOptions, type ResponseType, type TaskModeEnum, Tasks, type TokenContent, createCache, createHttp, createTasks };
