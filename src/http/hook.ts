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
' 	注入拦截
'
' 	name: hook
' 	create: 2025-03-21
' 	memo: 注入拦截
' 	
' ------------------------------------------------------------
*/

// ==============================================
// #region 参数导入
// ==============================================

import { hasObject, hasObjectName, hasString, isFn, isString, sleep } from '../base';
import {
	getResponseErrorMessage,
	getToken,
	isPayloadMethod,
	showError,
	updateId,
	updateRequest
} from './utils';
import {
	$Http,
	IApi,
	IApiResult,
	CacheValue,
	HttpCacheOptions,
	HttpConfig,
	HttpContext,
	HttpError,
	HttpOptions,
	HttpRequest,
	HttpResponseMap,
	HttpRuntime,
	ResponseType
} from './types';
import { createFetch, createFetchError, CreateFetchOptions, MappedResponseType } from 'ofetch';
import { SERVERMODE } from '../../config';
import { Dict } from '../types';
import LRU from '../LRU';

// ==============================================
// #endregion
// ==============================================
// #region HOOK 拦截
// ==============================================

/** 默认专有接口映射 */
const defaultMap: HttpResponseMap = {
	Id: 'traceId',
	code: 'code',
	message: 'message',
	data: 'data'
};

/** 创建 http 对象 */
export function createHttp(globalOptions?: CreateFetchOptions, globalConfig?: HttpConfig) {
	const runtime: HttpRuntime = {
		private: false,
		privateMap: defaultMap,
		...globalConfig,
		reLogin: 0
	};
	const options: CreateFetchOptions = {
		...globalOptions,
		defaults: {
			credentials: 'omit',
			baseURL: runtime.baseURL,
			timeout: runtime.timeout,
			onRequest: (context) => onRequest(context, runtime),
			onResponse: (context) => onResponse(context, runtime),
			onRequestError: (context) => onRequestError(context, runtime),
			onResponseError: (context) => onResponseError(context, runtime),
			...globalOptions?.defaults
		}
	};

	const http = createFetch(options) as $Http;
	http.runtime = runtime;

	// 带缓存请求实例
	http.cache = (request, options) => HttpCache(request, options, http);

	// 通用请求
	http.GET = (url, params, options) => HttpFast(url, 'GET', params, options, http);
	http.POST = (url, params, options) => HttpFast(url, 'POST', params, options, http);
	http.PUT = (url, params, options) => HttpFast(url, 'PUT', params, options, http);
	http.PATCH = (url, params, options) => HttpFast(url, 'PATCH', params, options, http);
	http.DELETE = (url, params, options) => HttpFast(url, 'DELETE', params, options, http);
	http.FORM = (url, params, options) => HttpFast(url, 'FORM', params, options, http);

	// 特殊请求
	http.upload = (files, request, options) => HttpUpload(files, request, options, http);
	http.download = (request, options) => HttpDownload(request, options, http);
	http.api = (api, options) => HttpApi(api, options, http);

	// 记录对象
	runtime.http = http;

	return http;
}

/** 请求相关拦截 */
export async function onRequest(context: HttpContext, config: HttpRuntime) {
	const { request, options } = context;

	// // 请求方式大写
	// context.options.method = context.options.method ? context.options.method.toUpperCase() : 'GET';

	// 初始化 Headers 对象
	if (!options.headers) options.headers = new Headers();

	// 更新请求
	const data = updateRequest(request, options);

	// 验证权限
	if (options.auth && isFn(config.auth) && !config.auth(data.url, options.method!, config)) {
		// 没有通过验证
		con.error('无此接口操作权限', data.url, options.method);

		const error = new Error('[NotAllowedError]: No permission for this interface operation');
		error.name = 'NotAllowedError';
		(error as any).code = 35; // DOMException.NotAllowedError

		throw error;
	}

	// 数据签名
	if (isFn(config.sign)) await config.sign(data.url, options, config);

	// 增加 Token 授权信息
	if (!options.headers.has('Authorization')) {
		const token = getToken(context, config.token);
		if (hasString(token)) {
			options.headers.set('Authorization', `Bearer ${token}`);
		}
	}

	// 更新超时默认值
	if (!options.timeout) options.timeout = config.timeout;

	// 更新请求参数
	context.request = data.request;
}

/**
 * 输出相关拦截
 * 以下操作仅针对与公司内部接口数据的处理格式。
 */
export function onResponse(context: HttpContext, config: HttpRuntime) {
	if (!config.private) return;

	const map = config.privateMap || defaultMap;

	const { response, options } = context;
	if (!response) return;

	// 请求标识
	response.traceId = hasObjectName(response._data, map.Id) ? response._data[map.Id] : '';

	// 非正常请求不处理
	if (!response.ok) return;

	// 处理反馈消息数据，如果存在则弹出信息
	const message = hasObjectName(response._data, map.message) ? response._data[map.message] : '';
	if (message) {
		// 服务器反馈异常信息
		con.information('服务器反馈异常信息', response.url, options.method);
		showError(
			config,
			{
				name: '温馨提示',
				message
			},
			'modal'
		);
	}

	// 处理返回数据
	if (hasObjectName(response._data, map.data)) response._data = response._data[map.data];

	// 强制处理标识 id
	if (options.convert) response._data = updateId(response._data);
}

/**
 * 请求错误拦截。
 * 以下操作仅针对与公司内部接口的错误友好提示。
 */
export function onRequestError(context: HttpContext, config: HttpRuntime) {
	if (!config.private) return;

	// 展示错误
	const httpError = createFetchError(context) as HttpError;
	const flag = showError(config, httpError);
	con.error('Request Exception', httpError);

	// 处理成功的错误，直接抛出异常，跳过后续处理
	if (flag) throw httpError;
}

/**
 * 输出错误拦截。
 * 以下操作仅针对与公司内部接口的错误友好提示。
 * @param context   请求上下文
 * @param config    请求配置
 * @returns         错误处理结果：true 表示已处理，false 表示未处理。
 */
export async function onResponseError(context: HttpContext, config: HttpRuntime) {
	if (!config.private) return;

	con.error('Response Exception', context, config);

	/** 请求数据 */
	const { response, error, options } = context;
	if (!response || !error) return;

	// 非系统异常，如产生 400,500 等错误
	const { status, statusText, _data } = response;

	// 401 未登录，重试(仅支持客户端操作)
	if (!SERVERMODE && status === 401 && options.autoLogin && isFn(config.login)) {
		const res = await RetryLogin(context, config);
		if (!res) return res;
	}

	// 错误代码处理
	let message = statusText;
	if (config.private) {
		const map = config.privateMap || defaultMap;

		// 处理反馈消息数据，如果存在则弹出信息
		message = hasObjectName(_data, map.message) ? _data[config.map.message] : '';

		if (!message) message = hasObjectName(_data, map.data) ? _data[map.data] : '';
	}

	var err = getResponseErrorMessage(status, message);
	error.message = err.message;
	error.name = err.title;

	// 展示错误
	const httpError = createFetchError(context) as HttpError;
	const flag = showError(config, httpError);

	// 处理成功的错误，直接抛出异常，跳过后续处理
	if (flag) throw httpError;
}

// ==============================================
// #endregion
// ==============================================
// #region 缓存请求
// ==============================================

/** 缓存 */
const cache = new LRU(30);

/** 缓存状态 */
const cacheStatus = new Map<string, boolean>();

/**
 * 发起 HTTP 请求
 * @template T 响应数据类型
 * @template R 响应类型（默认为 json）
 * @param request 请求地址或配置
 * @param options 请求选项
 * @returns 解析后的响应数据
 */
export async function HttpCache<T = any, R extends ResponseType = 'json'>(
	request: HttpRequest,
	options?: HttpCacheOptions<R>,
	http: $Http = $http
): Promise<MappedResponseType<R, T>> {
	if (!options) options = {};

	const url = isString(request) ? request : request.url;
	const method = (options.method || 'GET').toUpperCase();

	/** 所有参数 */
	const data: Dict = {};
	hasObject(options.query) && Object.assign(data, options.query);
	hasObject(options.params) && Object.assign(data, options.params);
	hasObject(options.body) && Object.assign(data, options.body);
	hasObject(options.headers) && Object.assign(data, options.headers);

	/** 读取缓存数据 */
	const { cacheTime, cacheKey, cacheValue, cacheError } = await cacheRead(
		url,
		method,
		data,
		options,
		http.runtime
	);

	// 分析缓存数据
	if (hasObjectName(cacheValue, 'succ')) {
		con.information('HTTP 缓存', url, cacheTime, cacheKey, cacheValue);

		if (cacheValue.succ) {
			// 缓存成功
			return cacheValue.result;
		} else if (cacheError) {
			// 缓存失败，抛出异常
			throw cacheValue.result;
		} else {
			// 缓存失败，继续后续操作
		}
	}

	// 存在缓存要求但未获取到缓存数据
	// 将尝试读取网址并标记状态
	cacheTime > 0 && cacheStatus.set(cacheKey, true);

	let succ = false;
	let result: any;

	await http(request, options)
		.then((res) => {
			succ = true;
			result = res;
			con.success('HTTP 请求', url, cacheTime, cacheKey, result);
		})
		.catch((res) => {
			succ = false;
			result = res;
		});

	// 存在缓存要求
	if (cacheTime > 0) {
		if (succ) {
			// 操作成功，缓存数据
			cache.set(cacheKey, { succ, result }, cacheTime);
		} else if (cacheError) {
			// 缓存错误，缓存异常(异常最多缓存 30 秒)
			const time = cacheTime > 30 ? 30 : cacheTime;
			cache.set(cacheKey, { succ, result }, time);
		}

		// 清除状态
		cacheStatus.delete(cacheKey);
	}

	if (succ) {
		// 操作成功
		return result;
	} else {
		// 操作失败，抛出异常
		throw result;
	}
}

/**
 * 缓存读取
 * @param url 			请求地址
 * @param method 		请求方式
 * @param data 			请求数据
 * @returns cacheTime 	缓存时间
 * @returns cacheKey 	缓存键
 * @returns cacheValue 	缓存值
 */
const cacheRead = async <R extends ResponseType>(
	url: string,
	method: string,
	data: Dict,
	options: HttpCacheOptions<R>,
	config: HttpConfig
) => {
	// 初始化缓存配置
	let cacheKey = '';
	let cacheValue = {} as CacheValue;
	let cacheTime = options.cacheTime === false ? -1 : options.cacheTime || 0;

	if (cacheTime === 0) {
		// 是否 GET / DELETE 模式
		const isQuery = isPayloadMethod(options.method || 'GET');

		// 缓存时间
		cacheTime = (isQuery ? config.cacheTime?.GET : config.cacheTime?.POST) || 0;
	}

	// 关闭缓存
	if (cacheTime < 1) {
		options.cacheTime = false;
		options.cacheError = false;

		return { cacheTime, cacheKey, cacheValue, cacheError: false };
	}

	// 生成缓存键
	cacheKey = JSON.stringify({
		url,
		method,
		data
	});

	// 缓存数据
	cacheValue = cache.get(cacheKey);

	// 获取到缓存，直接返回
	if (cacheValue) return { cacheTime, cacheKey, cacheValue, cacheError: options.cacheError };

	// ----------------------------
	// 未获取到检查缓存状态
	// ----------------------------

	// 等待 10 次，重试检查缓存数据
	for (let i = 0; i < 10; i++) {
		// 等待 100 毫秒,以便之前进程执行
		await sleep(100);

		/** 状态: true - 处理中; false - 未处理或者已经处理完成 */
		const status = !!cacheStatus.get(cacheKey);
		if (!status) break;
	}

	// 再次获取缓存
	cacheValue = cache.get(cacheKey);

	/** 返回参数 */
	return { cacheTime, cacheKey, cacheValue, cacheError: options.cacheError };
};

// ==============================================
// #endregion
// ==============================================
// #region 常用请求操作
// ==============================================

/** 常用 Http 请求操作 */
export async function HttpFast<T = any, R extends ResponseType = 'json'>(
	url: string,
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'FORM',
	params?: Dict,
	options?: HttpCacheOptions<R>,
	http: $Http = $http
) {
	if (!options) options = {};

	if (method === 'FORM') {
		method = 'POST';
		options.headers = {
			...options.headers,
			'Content-Type': 'application/x-www-form-urlencoded'
		};
	}

	options.method = method;

	if (isPayloadMethod(method)) {
		options.body = params;
	} else {
		options.query = params;
	}

	return HttpCache(url, options, http);
}

/**
 * 上传文件
 * @param files		文件数据
 * @param method	请求方式，默认 POST
 * @param headers	头部信息
 */
export async function HttpUpload<T = any, R extends ResponseType = 'json'>(
	files: FormData,
	request: HttpRequest,
	options?: HttpOptions<R>,
	http: $Http = $http
) {
	if (!files || !(files instanceof FormData)) {
		const error: HttpError = {
			request,
			options: options as any,
			status: 400,
			statusCode: 400,
			name: 'UploadError',
			message: '无效上传参数！'
		};

		// 提示错误
		showError(http.runtime, error, 'toast');
		throw error;
	}

	if (!options) options = {};
	if (!options.method) options.method = 'POST';
	options.body = files;

	// 注意 formData 上传无需设置 Content-Type,否则将出错!
	// headers = { ...headers, 'Content-Type': 'multipart/form-data' };
	return http(request, options);
}

/**
 * 下载文件
 * @param request	请求
 * @param options	参数
 */
export async function HttpDownload(
	request: HttpRequest,
	options?: HttpOptions,
	http: $Http = $http
) {
	// 服务端不能操作
	if (SERVERMODE || !window) return false;

	let succ = false;
	await http(request, options)
		.then((res: any) => {
			const file = window.URL.createObjectURL(res);

			//设置一个隐藏的a标签，href为输出流，设置download
			const dom = document.createElement('a');
			dom.style.display = 'none';
			dom.href = file;

			//指示浏览器下载url,而不是导航到它；因此将提示用户将其保存为本地文件
			dom.setAttribute('download', '');

			document.body.appendChild(dom);
			dom.click();

			// 释放
			window.URL.revokeObjectURL(file);

			// 提示下载完成
			showError(
				http.runtime,
				{
					request,
					options,
					status: 200,
					statusCode: 200,
					name: '文件下载',
					message: '文件下载完成',
					data: res
				},
				'toast'
			);

			succ = true;
		})
		.catch((res: any) => {
			console.error(res);

			showError(
				http.runtime,
				{
					request,
					options,
					status: 400,
					statusCode: 400,
					name: '文件下载',
					message: '文件下载失败，请检查',
					data: res
				},
				'toast'
			);

			succ = false;
		});

	return succ;
}

/** 标准 API　处理, 不验证是否已经授权, 强制通过授权 */
export async function HttpApi(api: IApi, options?: HttpOptions, http: $Http = $http) {
	/** 无效参数 */
	if (!hasObjectName(api, 'url')) return;

	// 无效请求
	if (!isString(api.url)) return;

	// 是否 GET / DELETE 模式
	api.method = api.method || 'GET';
	api.method = api.method.toUpperCase();

	// /** 忽略授权 */
	// const data = hasObject(api.data) ? { ...(api.data as Dict) } : {};

	// 需要提交的参数
	!hasObject(options) && (options = {});
	options.method = api.method;
	options.headers = api.headers;

	const isPayload = isPayloadMethod(api.method);
	if (isPayload) {
		// POST 类请求,且提交参数为对象则直接附加到 body
		options.body = api.data;
	} else {
		// GET 类请求,参数加入 query,非有效对象将忽略
		options.query = api.data as Dict;
	}

	// 超时时间
	api.timeout && api.timeout > 0 && (options.timeout = api.timeout);

	// 是否保持连接
	api.keepalive && (options.keepalive = api.keepalive);

	let succ = false;
	let value: any;

	await http(api.url, options)
		.then((res: any) => {
			value = res;
			succ = true;
			con.success('API 请求成功', api.url, res);
		})
		.catch((res: any) => {
			value = res;
			con.error('API 请求异常', api.url, res);
		});

	if (succ) {
		isFn(api.success) && api.success(value);
	} else {
		isFn(api.fail) && api.fail(value);
	}

	return isFn(api.complete)
		? await api.complete({ succ, value, api })
		: ({ succ, value, api } as IApiResult);
}

// ==============================================
// #endregion
// ==============================================
// #region 重试登陆
// ==============================================

/** 401 未登录，重试(仅支持客户端操作) */
async function RetryLogin(context: HttpContext, config: HttpRuntime) {
	if (SERVERMODE || !config || !config.http) return;

	const { request, options, response } = context;
	if (!response || response.status !== 401 || !options.autoLogin || !isFn(config.login)) return;

	const info = `[${options.method}]${response!.url}`;

	con.debug('401 错误，尝试重新登陆', config.reLogin, info);

	// 重新登录
	if (config.reLogin === 0) {
		config.reLogin = 1;
		con.debug('401 错误，重新登陆中...', config.reLogin, info);

		const succ = await config.login(request, options, config);
		if (succ) {
			config.reLogin = 3;
			con.success('401 错误，重新登录成功', info);
		} else {
			config.reLogin = 2;
			con.error('401 错误，重新登录失败', info);
		}
	}

	// 有其他项目在登陆，等待完成
	while (config.reLogin === 1) {
		await sleep(2000);
		con.debug('等待刷新', config.reLogin, info);
	}

	// 登录成功,重试一次
	if (config.reLogin === 3) {
		con.debug('重试请求', config.reLogin, info);
		config.reLogin = 4;

		return config.http(request, options).then((res) => {
			// 还原状态
			config.reLogin = 0;

			// 返回数据
			return res;
		});
	} else {
		// 还原状态
		config.reLogin = 0;
	}
}

// ==============================================
// #endregion
// ==============================================
