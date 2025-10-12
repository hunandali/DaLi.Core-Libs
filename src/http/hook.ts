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

import { hasObject, hasObjectName, hasString, isFn, isObject, isString, sleep } from '../base';
import {
	getResponseErrorMessage,
	getToken,
	isPayloadMethod,
	showError,
	updateId,
	updateRequest
} from './utils';
import {
	HttpClient,
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
	ResponseType,
	ResolvedHttpOptions
} from './types';
import { createFetch, createFetchError, CreateFetchOptions, MappedResponseType } from 'ofetch';
import { DEBUG, SERVERMODE, TEST } from '../../config';
import { Dict } from '../types';
import LRU from '../LRU';

import chalk from 'chalk';

// ==============================================
// #endregion
// ==============================================
// #region 调试设置
// ==============================================

/** 调试信息 */
export const HTTP_DEBUG = {
	/**
	 * 输出模式：是否开启调试信息输出
	 * - false: 不输出
	 * - true: 输出详细的 http 结果
	 * - simple: 仅输出简单结果，及请求地址与方式，结果与参数不输出
	 */
	output: true as boolean | 'simple' | 'request' | 'response',

	/** 仅调试环境才生效，正式环境不生效 */
	debugOnly: true,

	/** 是否输出参数使用提示 */
	show: true
};

function debug(succ: boolean, title: string, context: HttpContext, config?: HttpConfig) {
	if (TEST) return;
	if (HTTP_DEBUG.output === false) return;
	if (HTTP_DEBUG.debugOnly && !DEBUG) return;

	const space = chalk.reset(' '.repeat(4));
	const outputs = [];
	if (HTTP_DEBUG.show) {
		HTTP_DEBUG.show = false;
		outputs.push(chalk.bgYellow('#'.repeat(72)));
		outputs.push('');
		outputs.push(space + `${chalk.bgRedBright('调试模式')}`);
		outputs.push('');
		outputs.push(
			space +
				chalk.redBright('您已经开启了 HTTP 请求的调试模式，将输出 HTTP 请求的相关信息。')
		);
		outputs.push(
			space + chalk.redBright('当前模式：') + chalk.bgGreen.white(` ${HTTP_DEBUG.output} `)
		);

		outputs.push(
			space +
				chalk.redBright('您可以通过修改 ') +
				chalk.bgMagentaBright.white(' HTTP_DEBUG.output ') +
				chalk.redBright(' 参数来调整调试信息输出的情况。')
		);
		outputs.push('');
		outputs.push(chalk.bgYellow('#'.repeat(72)));
		outputs.push('');
	}

	const color = succ ? chalk.greenBright : chalk.redBright;
	const bgColor = succ ? chalk.bgGreen : chalk.bgRed;

	// 输出标题
	outputs.push(succ ? chalk.bgGreen(title) : chalk.bgRed(title));

	// 输出请求信息
	const { request, response, options, error } = context;
	let url = response ? response.url : isObject(request) ? request.url : request;
	let method = options.method || 'GET';
	outputs.push(color(`[${method}] ${url}`));

	if (HTTP_DEBUG.output !== 'simple') {
		outputs.push('');
		outputs.push(bgColor('[参数]'));
		outputs.push(config);

		outputs.push('');
		outputs.push(bgColor('[请求]'));
		outputs.push(request);
	}

	outputs.push('');
	outputs.push(bgColor('[输出]'));
	outputs.push(response || '无任何输出结果');

	outputs.push('');
	outputs.push(bgColor('[错误]'));
	outputs.push(error || '无任何错误信息');

	// 输出
	outputs.push('');
	outputs.forEach((item) => {
		console.log(item);
	});
}

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
		globalErrorAlert: 'toast',
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

	const http = createFetch(options) as HttpClient;
	http.runtime = runtime;

	// 带缓存请求实例
	http.cache = (request, options) => HttpCache(http, request, options);

	// 通用请求
	http.GET = (url, params, options) => HttpFast(http, url, 'GET', params, options);
	http.POST = (url, params, options) => HttpFast(http, url, 'POST', params, options);
	http.PUT = (url, params, options) => HttpFast(http, url, 'PUT', params, options);
	http.PATCH = (url, params, options) => HttpFast(http, url, 'PATCH', params, options);
	http.DELETE = (url, params, options) => HttpFast(http, url, 'DELETE', params, options);
	http.FORM = (url, params, options) => HttpFast(http, url, 'FORM', params, options);

	// 特殊请求
	http.upload = (files, request, options) => HttpUpload(http, files, request, options);
	http.download = (request, options) => HttpDownload(http, request, options);
	http.api = (api, options) => HttpApi(http, api, options);

	// 重置登陆状态
	http.resetLoginStatus = (state = 0) => (runtime.reLogin = state > 4 || state < 0 ? 0 : state);

	// http 请求预处理，以便将处理后的头部数据，请求数据暴露方便第三方需要时调用
	http.processRequest = processRequest;

	// 记录对象
	runtime.http = http;

	return http;
}

/** http 请求预处理，以便将处理后的头部数据，请求数据暴露方便第三方需要时调用，并返回处理后的请求地址 */
export async function processRequest(
	request: RequestInfo,
	options: ResolvedHttpOptions,
	config: HttpRuntime
) {
	// 如果 Config 中基础配置存在，则使用基础配置，防止 config 中基础参数修改后无法及时更新
	config.baseURL && options.baseURL !== config.baseURL && (options.baseURL = config.baseURL);
	config.timeout && config.timeout > 0 && (options.timeout = config.timeout);

	// // 请求方式大写
	// context.options.method = context.options.method ? context.options.method.toUpperCase() : 'GET';

	// 初始化 Headers 对象
	if (!options.headers) options.headers = new Headers();

	// 更新请求
	const data = updateRequest({ request, options });

	// 更新最后状态
	config.last = {
		url: isString(request) ? request : request.url,
		method: options.method || 'GET',
		time: new Date(),
		id: '',
		status: 0
	};

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
		const token = getToken({ request, options }, config.token);
		if (hasString(token)) {
			options.headers.set('Authorization', `Bearer ${token}`);
		}
	}

	// 更新超时默认值
	if (!options.timeout) options.timeout = config.timeout;

	return data.url;
}

/** 请求相关拦截 */
export async function onRequest(context: HttpContext, config: HttpRuntime) {
	const { request, options } = context;
	const url = await processRequest(request, options, config);
	if (!url) return;

	// 更新请求地址
	if (isString(request)) {
		context.request = url;
	} else {
		context.request = new Request(url, request);
	}
}

/**
 * 输出相关拦截
 * 以下操作仅针对与公司内部接口数据的处理格式。
 */
export function onResponse(context: HttpContext, config: HttpRuntime) {
	debug(true, 'HTTP Response', context, config);

	const { request, response, options } = context;
	if (!response) return;

	// 更新最后状态
	config.last = {
		url: isString(request) ? request : request.url,
		method: options.method || 'GET',
		time: new Date(),
		id: '',
		status: response.status
	};

	if (!config.private) return;

	// 请求标识
	const map = config.privateMap || defaultMap;
	response.traceId = hasObjectName(response._data, map.Id) ? response._data[map.Id] : '';
	config.last.id = response.traceId;

	// 非正常请求不处理
	if (!response.ok) return;

	// 处理反馈消息数据，如果存在则弹出信息
	const message = hasObjectName(response._data, map.message) ? response._data[map.message] : '';
	if (message && response.ok) {
		// 服务器反馈异常信息
		con.information('服务器反馈异常信息', response.url, options.method);

		showError(config, {
			name: '温馨提示',
			message,
			alert: 'modal'
		});
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
	debug(false, 'HTTP Request Error', context, config);

	// 非专有接口不处理
	const httpError: HttpError = {
		...createFetchError(context),
		alert: context.options.alert || config.globalErrorAlert
	};
	if (!config.private) throw httpError;

	// 展示错误
	showError(config, httpError);

	// 直接抛出异常，跳过后续处理
	throw httpError;
}

/**
 * 输出错误拦截。
 * 以下操作仅针对与公司内部接口的错误友好提示。
 * @param context   请求上下文
 * @param config    请求配置
 * @returns         错误处理结果：true 表示已处理，false 表示未处理。
 */
export async function onResponseError(context: HttpContext, config: HttpRuntime) {
	debug(false, 'HTTP Response Error', context, config);

	// 非专有接口不处理
	if (!config.private) return;

	/** 请求数据 */
	const { response, options } = context;
	if (!response) return;

	// 非系统异常，如产生 400,500 等错误
	const { status, statusText, _data } = response;

	// 401 未登录，重试(仅支持客户端操作)
	if (!SERVERMODE && status === 401 && options.autoLogin && isFn(config.login)) {
		const res = await RetryLogin(context, config);
		if (!res) return res;
	}

	// 错误代码处理
	const map = config.privateMap || defaultMap;
	const mapData = hasObjectName(_data, map.data) ? _data[map.data] : '';
	const mapCode = hasObjectName(_data, map.code) ? _data[map.code] : status;
	const mapMessage = hasObjectName(_data, map.message) ? _data[map.message] : statusText;
	const url = response.url;

	// 如果 mapData(Response._data.data) 中存在对象，则表示是专有错误接口数据，需要直接返回处理
	// // 如果返回结果为对象，表示结果需要二次加工，如：错误表单列表
	if (hasObject(mapData))
		throw {
			..._data,
			code: mapCode,
			url,
			alert: context.options.alert,
			data: mapData,
			message: mapMessage
		};

	// 错误处理
	if (!context.error) context.error = createFetchError(context);
	var errInfo = getResponseErrorMessage(status, mapMessage);

	const error = context.error as HttpError;
	error.message = errInfo.message;
	error.name = errInfo.title;
	error.alert = context.options.alert || (!status && config.globalErrorAlert); // 无状态码时，使用全局错误提醒

	// 展示错误
	showError(config, error);

	// 直接抛出异常，跳过后续处理
	throw error;
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
	http: HttpClient,
	request: HttpRequest,
	options?: HttpCacheOptions<R>
): Promise<MappedResponseType<R, T>> {
	if (!options) options = {};

	/** 读取缓存数据 */
	const { cacheTime, cacheKey, cacheValue, cacheError } = await cacheRead(
		request,
		options,
		http.runtime
	);

	// 分析缓存数据
	if (cacheValue && hasObjectName(cacheValue, 'succ')) {
		con.information('HTTP 缓存命中', request, cacheTime, cacheKey, cacheValue);

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
		})
		.catch((res) => {
			succ = false;
			result = res;
		});

	// 存在缓存要求
	if (cacheTime > 0) {
		// 正确直接缓存，错误则需检查状态，但最多不能超过 30s
		const time = succ ? cacheTime : cacheError && cacheTime > 30 ? 30 : 0;
		time > 0 && cache.set(cacheKey, { succ, result }, time);

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
 * @param request 		请求数据
 * @returns cacheTime 	缓存时间
 * @returns cacheKey 	缓存键
 * @returns cacheValue 	缓存值
 */
const cacheRead = async <R extends ResponseType>(
	request: HttpRequest,
	options: HttpCacheOptions<R>,
	config: HttpConfig
) => {
	// 禁止缓存返回
	const nothing = () => {
		options.cacheTime = false;
		options.cacheError = false;

		return { cacheTime, cacheKey: '', cacheValue: undefined, cacheError: false };
	};

	// --------------------
	// 检查缓存时间
	// --------------------
	let cacheTime = options.cacheTime === false ? -1 : options.cacheTime || 0;

	if (cacheTime === 0) {
		// 是否 GET / DELETE 模式
		const isQuery = isPayloadMethod(options.method || 'GET');

		// 缓存时间
		cacheTime = (isQuery ? config.cacheTime?.GET : config.cacheTime?.POST) || 0;
	}

	// 关闭缓存
	if (cacheTime < 1) return nothing();

	// --------------------
	// 检查缓存键
	// --------------------
	let cacheKey = isString(options.cacheKey)
		? options.cacheKey
		: isFn(options.cacheKey)
		? options.cacheKey(request, options)
		: undefined;

	// 缓存键为空字符串关闭缓存
	if (cacheKey === '') return nothing();

	// 为定义手动创建缓存键
	if (!cacheKey) {
		const url = isString(request) ? request : request.url;
		const method = (options.method || 'GET').toUpperCase();

		/** 所有参数 */
		const data: Dict = {};
		hasObject(options.query) && Object.assign(data, options.query);
		hasObject(options.params) && Object.assign(data, options.params);
		hasObject(options.body) && Object.assign(data, options.body);
		hasObject(options.headers) && Object.assign(data, options.headers);

		// 生成缓存键
		cacheKey = JSON.stringify({
			url,
			method,
			data
		});
	}

	// --------------------
	// 缓存数据
	// --------------------
	let cacheValue = cache.get(cacheKey) as CacheValue;

	// 获取到缓存，直接返回
	if (cacheValue) return { cacheTime, cacheKey, cacheValue, cacheError: options.cacheError };

	// --------------------
	// 未获取到检查缓存状态
	// --------------------

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
export async function HttpFast<R extends ResponseType = 'json'>(
	http: HttpClient,
	url: string,
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'FORM',
	params?: Dict,
	options?: HttpCacheOptions<R>
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

	return HttpCache(http, url, options);
}

/**
 * 上传文件
 * @param files		文件数据
 * @param method	请求方式，默认 POST
 * @param headers	头部信息
 */
export async function HttpUpload<R extends ResponseType = 'json'>(
	http: HttpClient,
	files: FormData,
	request: HttpRequest,
	options?: HttpOptions<R>
) {
	if (!files || !(files instanceof FormData)) {
		const error: HttpError = {
			request,
			options: options as any,
			status: 400,
			statusCode: 400,
			name: 'UploadError',
			message: '无效上传参数！',
			alert: 'toast'
		};

		// 提示错误
		showError(http.runtime, error);

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
export async function HttpDownload(http: HttpClient, request: HttpRequest, options?: HttpOptions) {
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
			showError(http.runtime, {
				request,
				options,
				status: 200,
				statusCode: 200,
				name: '文件下载',
				message: '文件下载完成',
				data: res,
				alert: 'toast'
			});

			succ = true;
		})
		.catch((res: any) => {
			showError(http.runtime, {
				request,
				options,
				status: 400,
				statusCode: 400,
				name: '文件下载',
				message: '文件下载失败，请检查',
				data: res,
				alert: 'toast'
			});

			succ = false;
		});

	return succ;
}

/** 标准 API　处理, 不验证是否已经授权, 强制通过授权 */
export async function HttpApi(http: HttpClient, api: IApi, options?: HttpCacheOptions) {
	/** 无效参数 */
	if (!hasObjectName(api, 'url') || !isString(api.url)) throw new Error('无效的 API 配置');

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

	await (options.cacheTime && options.cacheTime > 0
		? HttpCache(http, api.url, options)
		: http(api.url, options)
	)
		.then((res: any) => {
			value = res;
			succ = true;
			con.success('API 请求成功', api.url);
		})
		.catch((res: any) => {
			value = res;
			con.error('API 请求异常', api.url);
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
