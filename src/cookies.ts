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
' 	客户端 Cookies 操作
'
' 	name: cookie
' 	create: 2025-04-03
' 	memo: 客户端 Cookies 操作
' 	
' ------------------------------------------------------------
*/

import { SERVERMODE } from '../config';

/** Cookies 选项 */
export interface CookiesOptions {
	/** 过期时间，单位：秒 */
	expire?: number;

	/** 路径 */
	path?: string;

	/** 安全 */
	secure?: boolean;

	/** HttpOnly */
	httpOnly?: boolean;
}

/**
 * 设置 cookie
 * @param name 名称
 * @param value 值
 * @param options 选项
 */
export function setCookie(name: string, value: string, options: CookiesOptions = {}): void {
	if (SERVERMODE) return;

	try {
		let expires = '';

		const { expire = 86400, path = '/', secure = false, httpOnly = false } = options;
		if (expire) {
			const date = new Date();
			date.setTime(date.getTime() + expire * 1000);
			expires = '; expires=' + date.toUTCString();
		}

		const encodedValue = encodeURIComponent(value) || '';

		let cookieString = name + '=' + encodedValue + expires + '; path=' + path;
		if (secure) {
			cookieString += '; secure';
		}
		if (httpOnly) {
			cookieString += '; httpOnly';
		}

		document.cookie = cookieString;
	} catch (error) {
		console.error('Error setting cookie:', error);
	}
}

/**
 * 获取 cookie
 * @param name 名称
 * @returns 值
 */
export function getCookie(name: string): string | null {
	if (SERVERMODE) return null;

	try {
		const nameEQ = name + '=';
		const ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) === 0) {
				const value = c.substring(nameEQ.length, c.length);
				return decodeURIComponent(value);
			}
		}
		return null;
	} catch (error) {
		console.error('Error getting cookie:', error);
		return null;
	}
}

/** 删除 Cookie */
export function deleteCookie(name: string, path: string = '/'): void {
	if (SERVERMODE) return;

	try {
		document.cookie = name + '=; Path=' + path + '; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	} catch (error) {
		console.error('Error deleting cookie:', error);
	}
}

export default { set: setCookie, get: getCookie, del: deleteCookie };
