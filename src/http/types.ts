/*
' ------------------------------------------------------------
'
' 	Copyright © 2022 湖南大沥网络科技有限公司.
'
' 	  author:	木炭(WOODCOAL)
' 	   email:	i@woodcoal.cn
' 	homepage:	http://www.hunandali.com/
'
' ------------------------------------------------------------
'
' 	数据类型
'
' 	name: types
' 	create: 2025-03-21
' 	memo: 数据类型申明
' 	
' ------------------------------------------------------------
*/

import { Dict, MaybePromise } from '../types';
import {
	$Fetch,
	FetchContext,
	FetchError,
	FetchOptions,
	FetchRequest,
	FetchResponse,
	MappedResponseType,
	ResponseMap
} from 'ofetch';

// /** 全局变量 */
// declare global {
// 	/**
// 	 * 全局 HTTP 实例
// 	 * @example
// 	 * // 发起 GET 请求
// 	 * await HttpClient('/api/data', { method: 'GET' })
// 	 */
// 	var $http: HttpClient;
// }

/** 响应类型扩展，支持所有 ResponseMap 键值及默认的 json 格式 */
export type ResponseType = keyof ResponseMap | 'json';

/**
 * HTTP 请求配置选项
 * @template R - 响应类型（默认为 json）
 * @template T - 响应体数据类型
 */
export interface HttpOptions<R extends ResponseType = ResponseType, T = any>
	extends FetchOptions<R, T> {
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
export interface HttpCacheOptions<R extends ResponseType = ResponseType, T = any>
	extends HttpOptions<R, T> {
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

export interface ResolvedHttpOptions<R extends ResponseType = ResponseType, T = any>
	extends HttpOptions<R, T> {
	headers: Headers;
}

export type HttpRequest = FetchRequest;
export type HttpResponse<T = any> = FetchResponse<T> & {
	/** 请求的标识(仅对公司内部项目有效) */
	traceId?: string;
};
export type HttpError = FetchError & {
	/** 错误提示模式 */
	alert?: AlertNotifyMode;

	/** 是否已经给用户进行提示过 */
	alerted?: boolean;
};

export interface HttpContext<T = any, R extends ResponseType = ResponseType> {
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
export type HttpFetch = <T = any, R extends ResponseType = 'json'>(
	url: string,
	params?: Dict,
	options?: HttpCacheOptions<R>
) => Promise<MappedResponseType<R, T>>;

/**
 * 增强版 HTTP 客户端接口
 * @extends $Fetch 基础请求接口
 */
export interface HttpClient extends $Fetch {
	/**
	 * 发起 HTTP 请求
	 * @template T 响应数据类型
	 * @template R 响应类型（默认为 json）
	 * @param request 请求地址或配置
	 * @param options 请求选项
	 * @returns 解析后的响应数据
	 */
	<T = any, R extends ResponseType = 'json'>(
		request: HttpRequest,
		options?: HttpOptions<R>
	): Promise<MappedResponseType<R, T>>;

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
	cache: <T = any, R extends ResponseType = 'json'>(
		request: HttpRequest,
		options?: HttpCacheOptions<R>
	) => Promise<MappedResponseType<R, T>>;

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
	upload: <T = any, R extends ResponseType = 'json'>(
		files: FormData,
		request: HttpRequest,
		options?: HttpOptions<R>
	) => Promise<MappedResponseType<R, T>>;

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
	processRequest: (
		request: RequestInfo,
		options: ResolvedHttpOptions,
		config: HttpRuntime
	) => Promise<string>;
}

/**
 * token 获取方式
 * 1. 函数：从函数则从执行结果来获取 token 值；
 * 2. token 值如果为 ture, 则从请求头中获取 token 值；
 * 3. token 值存在有效文本则在请求头部增加 Authorization 信息
 */
export type TokenContent =
	| string
	| true
	| ((context: { request: RequestInfo; options: ResolvedHttpOptions }) => string);

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
export interface HttpConfig {
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
	login?: (
		request: HttpRequest,
		options: ResolvedHttpOptions,
		config: HttpRuntime
	) => Promise<boolean>;

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
export interface HttpRuntime extends HttpConfig, Dict {
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
export type AlertNotifyMode = 'modal' | 'toast' | 'notify' | boolean | undefined;

/**
 * 缓存值
 * @template T 缓存数据类型
 */
export interface CacheValue<T = any> {
	succ: boolean;
	result: T;
}

/** 转有接口键映射名称 */
export interface HttpResponseMap {
	Id: string;
	code: string;
	message: string;
	data: string;
}

/** Api 请求  */
export interface IApiBase {
	/** api 地址 */
	url?: string;

	/** 请求方式 */
	method?: string;

	/** 提交参数 */
	data?: Dict | RequestInit['body'] | any[];

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
export interface IApi extends IApiBase {
	/** 成功后操作 */
	success?: (value: any) => void;

	/** 失败后操作 */
	fail?: (value: any) => void;
}

/** api 执行结果 */
export interface IApiResult {
	/** 是否执行成功 */
	succ: boolean;

	/** 返回结果，当 succ 为 true 时返回网络请求结果，当 succ 为 false 时返回错误信息 */
	value: any;

	/** 当前操作的 api */
	api: IApi;
}
