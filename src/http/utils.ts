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
' 	公用函数
'
' 	name: utils
' 	create: 2025-03-21
' 	memo: 公用函数
' 	
' ------------------------------------------------------------
*/

import { hasArray, hasObject, hasObjectName, hasString, isFn, isNil, isString } from '../base';
import { base64Encode } from '../encrypt';
import type { Dict } from '../types';

import type {
	AlertNotifyMode,
	HttpConfig,
	HttpContext,
	HttpError,
	HttpOptions,
	HttpRequest,
	TokenContent
} from './types';
import { withBase, withQuery } from 'ufo';

/** 可以携带 body 的响应数据类型 */
const payloadMethods = new Set(Object.freeze(['PATCH', 'POST', 'PUT', 'DELETE']));

/** 是否可以携带 body 数据 */
export function isPayloadMethod(method = 'GET') {
	return payloadMethods.has(method.toUpperCase());
}

/**
 * 从请求参数中获取 Token 数据
 * @param context	请求上下文
 * @param tokenContent	token 请求方式，上下文不存在有效 token 时，则从此参数获取。
 * @returns			token 数据
 */
export function getToken<C extends HttpContext = HttpContext>(
	context: C,
	tokenContent: TokenContent = ''
): string | undefined {
	tokenContent = context.options.token || tokenContent;
	if (!tokenContent) return;

	if (tokenContent === true) {
		// 从请求参数中获取 token
		const dataToken = (data: any): string | undefined => {
			if (hasObjectName(data, 'token')) {
				const value = data.token;
				if (hasString(value)) {
					delete data.token;
					return value;
				}
			}
		};

		return (
			dataToken(context.options.body) ||
			dataToken(context.options.params) ||
			dataToken(context.options.query)
		);
	} else if (isFn(tokenContent)) {
		// 函数获取
		return tokenContent(context);
	} else {
		// 直接使用 token
		return tokenContent;
	}
}

/**
 * 更新请求参数。
 * @param request		请求地址
 * @param options		请求参数
 * @param appenQuery	是否追加 query 参数
 */
export function updateRequest(request: HttpRequest, options: HttpOptions, appenQuery = false) {
	// 分析请求地址
	const sourceUrl = isString(request) ? request : request?.url;
	const baseUrl = options.baseURL;
	let url = baseUrl ? withBase(sourceUrl, baseUrl) : sourceUrl;

	// 对于地址中包含大括号，需要替换掉括号
	// 如：/api/{id} 需要将 id 替换成正确id
	// 去掉的 id，需要在数据中删掉 id，防止值再次附加到地址上
	url = url.replace(/%7B/gi, '{').replace(/%7D/gi, '}');

	// 地址请求数据
	const queryData: Dict = {};

	// 加密字段
	const encode = hasArray(options.encode) ? options.encode!.map((x) => x.toLowerCase()) : [];
	const fields: string[] = [];

	// 替换地址数据
	const update = (name: keyof HttpOptions, isQuery = true) => {
		const data = options[name] as Dict;
		if (!data) return;

		for (const key of Object.keys(data)) {
			// 加密参数处理
			let value = data[key];
			const isEncode = encode.includes(key.toLowerCase());
			if (isEncode) {
				value = base64Encode(value);
				fields.push(key);
			}

			// 路径参数替换
			const reg = new RegExp(`{${key}}`, 'gi');
			if (reg.test(url)) {
				// 替换地址参数
				url = url.replace(reg, value);
				// delete data[key];
			}
			if (isQuery) {
				// 加入请求参数
				queryData[key] = value;
			} else if (isEncode) {
				// 加密字段
				data[key] = value;
			}
		}

		if (isQuery) delete options[name];
	};

	// 处理数据
	update('headers', false);
	update('body', false);
	update('query', true);
	update('params', true);

	// body 中加入加密字段
	if (isPayloadMethod(options.method)) {
		// 是否可携带 body 数据
		if (hasArray(fields)) {
			options.body = {
				...(options.body as Dict),
				_encode: fields.join(',')
			};
		}
	} else {
		// 不能携带删除
		delete options.body;

		if (hasArray(fields)) {
			queryData['_encode'] = fields.join(',');
		}
	}

	// 请求参数合并到地址
	if (hasObject(queryData)) {
		if (appenQuery) {
			url = withQuery(url, queryData);
		} else {
			options.query = queryData;
		}
	}

	// 地址存在变化，需要调整请求信息
	if (sourceUrl !== url) request = isString(request) ? url : new Request(url, request);

	// 返回处理后的数据
	return { url, request, options };
}

/** 显示错误信息 */
export function showError(config: HttpConfig, error: HttpError, alert?: AlertNotifyMode): boolean {
	if (!config || !error || error.alerted) return false;

	// 弹窗模式
	if (isNil(error.alert)) error.alert = alert;

	// 监视是否弹窗提示
	const isShow = isFn(config.alert) ? config.alert(error, config) : false;

	// 回写展示状态
	error.alerted = isShow;

	return isShow;
}

/**
 * 解析 ID 值。
 * 数值型 id 且 id > 999999999 则从 _ID_ 中解析出实际数值
 */
export function updateId(item: any) {
	const hasData = hasObjectName(item, 'data');
	const hasID = hasObjectName(item, '_ID_');

	if (hasData && !hasID) {
		item.data = updateId(item.data);
	} else if (hasID) {
		item.id = item._ID_ ?? item.id;
	} else if (hasArray(item)) {
		item = item.map((x: any) => updateId(x));
	}

	// 存在 children
	if (hasObjectName(item, 'children')) item.children = updateId(item.children);

	return item;
}

/** 分析常用错误代码描述 */
export function getResponseErrorMessage(code: number, message: string) {
	// 异常或者错误
	let title = '';

	switch (code) {
		case 400:
			title = '无效请求';
			message = message || '当前操作无效';
			break;

		case 401:
			// 未登录
			title = '登录异常';
			message = message || '您的登录信息已经过期，请重新登录后再操作';
			// 清除 token
			// sys.$dataClear('auth');
			// sys.auth.$reset();
			break;

		case 403:
			// 无权限
			title = '无操作权限';
			message = message || '您无权执行此操作，请与管理员联系授权！';
			break;

		case 404:
			// 不存在
			title = '资源不存在';
			message = message || '您请求的地址不存在，请检查需要访问的 API 接口是否正确';
			break;

		case 500:
			// 内部错误
			title = '服务端异常';
			message = message || '执行您的操作时，服务器发生异常，请稍后再试';
			break;

		default:
			// 其他错误
			title = '操作异常';
			message = '操作发生异常：' + (message || '错误代码 ' + code);
	}

	return { title, message };
}
