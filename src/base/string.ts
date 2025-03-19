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
' 	字符串相关操作
'
' 	name: lib.base.string
' 	create: 2023-11-02
' 	memo: 字符串相关操作
' 	
' ------------------------------------------------------------
*/

import DOMPurify from 'isomorphic-dompurify';
import { hasString, isNumber } from './type';

/**
 * 字符串模板替换
 * 用于在模板字符串中通过名称替换数据。默认表达式会寻找 {name} 以识别名称。
 *
 * template('Hello, {name}', { name: 'ray' })				// => Hello, ray
 * template('Hello, <name>', { name: 'ray' }, /<(.+?)>/g)		// => Hello, ray
 */
export const template = (str: string, data: Record<string, any>, regex = /\{(.+?)\}/g) => {
	return Array.from(str.matchAll(regex)).reduce((acc, match) => {
		const key = trim(match[1]);
		return acc.replace(match[0], data[key] || '');
	}, str);
};

/**
 * 从给定的字符串中修剪所有前缀和后缀字符。
 * 类似于内置的 trim 函数，但接受您希望修剪的其他字符并修剪多个字符。
 * 默认移除回车、换行、制表符和全半角空格。
 *
 * trim('  hello ') 						// => 'hello'
 * trim('__hello__', '_') 					// => 'hello'
 * trim('/repos/:owner/:repo/', '/')		// => 'repos/:owner/:repo'
 * trim('222222__hello__1111111', '12_') 	// => 'hello'
 */
export const trim = (str: string | null | undefined, charsToTrim: string = '\b\f\n\r\t\v　 ') => {
	if (!str) return '';
	const toTrim = charsToTrim.replace(/[\W]{1}/g, '\\$&');
	const regex = new RegExp(`^[${toTrim}]+|[${toTrim}]+$`, 'g');
	return str.replace(regex, '');
};

/**
 * 文本转换成实际类型值。
 * 如果存在 splitter 则按照分隔符分割成数组再转换。
 * @param value 文本值
 * @param splitter 是否分割成数组，不设置则直接返回
 * @returns 返回任何有效的类型值或者值数组
 */
export const string2Value = (value: string, splitter?: string | RegExp): any | any[] => {
	// 需要分割成数组
	if (splitter) return value.split(splitter)?.map((arg) => string2Value(arg));

	value = trim(value);

	switch (value) {
		case 'undefined':
			return undefined;

		case 'null':
			return null;

		case 'true':
			return true;

		case 'false':
			return false;

		default:
			const num = Number(value);
			if (isNumber(num)) return num;

			// 最后返回文本
			return value;
	}
};

/**
 * 按指定长度截取字符串
 * @param str	待截取的字符串
 * @param len	截取长度，0 不截取
 * @param eli	省略部分替换的文本，默认为省略号
 * @param mode	截取方式：0 保留两头；1 保留左侧；2 保留右侧
 * @returns		返回截取后的字符串
 */
export function stringCut(str: string, len: number = 10, eli: string = '……', mode: number = 0) {
	if (!hasString(str)) return '';

	if (len === 0 || str.length <= len) return str;

	switch (mode) {
		case 1:
			return eli + str.substring(str.length - len);
		case 2:
			return str.substring(0, len) + eli;
		default:
			const mid = Math.floor(len / 2);
			return str.substring(0, mid) + eli + str.substring(str.length - mid);
	}
}

/**
 * 清除字符串中的任何 html 标签，并移除首尾的空白字符后截取指定长度文本，省略部分用省略号代替
 * @param str	待处理的字符串
 * @param len	截取长度，0 不截取
 * @param mode	截取方式:0 保留两头,1 保留左侧 ,2 保留右侧
 * @returns		返回截取后的字符串
 */
export function stringClear(str: string, len: number, mode: number = 0) {
	if (!hasString(str)) return '';

	str = htmlClear(str).trim();
	return stringCut(str, len, '……', mode);
}

/**
 * 清除字符串中的任何 html 标签，并移除首尾的空白字符
 * @param str	待处理的字符串
 * @returns 	处理后的字符串
 */
export function htmlClear(str: string): string {
	if (!hasString(str)) return '';

	return str
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&nbsp;/g, ' ')
		.replace(/&#39;/g, "'")
		.replace(/&quot;/g, '"')
		.replace(/<[^>]+>/g, '')
		.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 * html 安全化处理，去除危险标记，方式 xss 攻击
 * @param html 	待处理的 html
 * @returns		处理后的 html
 */
export function htmlSafe(html: string) {
	return DOMPurify.sanitize(html);
}

/** 编码 HTML 符号*/
export function htmlEncode(str: string): string {
	if (!hasString(str)) return '';

	return str
		.replace(/&/g, '&amp;')
		.replace(/>/g, '&gt;')
		.replace(/</g, '&lt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/ /g, '&nbsp;');
}
