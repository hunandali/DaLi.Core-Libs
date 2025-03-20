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
' 	常用类型判断
'
' 	name: base/type
' 	create: 2024-03-20
' 	memo: 常用类型判断
' 	https://github.com/rayepps/radash/blob/master/src/typed.ts
'
' ------------------------------------------------------------
*/

/** 分析数据的类型名称 */
export function typeName(value: any): string {
	let type = (typeof value).toString();

	if (type === 'object') {
		type = Object.prototype.toString.call(value);
		type = type.replace('[object ', '').replace(']', '');
	}

	return type;
}

/** 判断是否数组 */
export const isArray = Array.isArray;

/** 判断是否 Symbol */
export const isSymbol = (value: any): value is symbol => {
	return !!value && value.constructor === Symbol;
};

/** 判断是否 Object 对象，仅 {}，不包含 [] null 等对象 */
export const isObject = (value: any): value is object => {
	return !!value && value.constructor === Object;
	// return Object.prototype.toString.call(obj) === '[object Object]';
};

/**
 * 否是原始类型
 * 原始类型: number, string, boolean, symbol, bigint, undefined, null
 */
export const isPrimitive = (value: any): boolean => {
	return (
		value === undefined ||
		value === null ||
		(typeof value !== 'object' && typeof value !== 'function')
	);
};

/** 是否函数 */
export const isFunction = (value: any): value is Function => {
	return !!(value && value.constructor && value.call && value.apply);
};

/** 是否函数 isFunction 的简写 */
export const isFn = isFunction;

/**
 * 是否异步函数
 * 这实际上是一个最佳猜测的 Promise 检查。你可能应该使用 Promise.resolve(value) 来确保百分之百确定你正在正确处理它
 */
export const isPromise = (value: any): value is Promise<any> => {
	if (!value) return false;
	if (!value.then) return false;
	if (!isFunction(value.then)) return false;
	return true;
};

/** 是否异步函数  async function (){} */
export const isAsync = (value: any) => {
	return isFn(value) && value[Symbol.toStringTag] === 'AsyncFunction';
};

/** 是否字符串 */
export const isString = (value: any): value is string => {
	return typeof value === 'string' || value instanceof String;
};

/** 是否数值 */
export const isNumber = (value: any): value is number => {
	try {
		return Number(value) === value;
	} catch {
		return false;
	}
};

/** 是否日期对象 */
export const isDate = (value: any): value is Date => {
	return Object.prototype.toString.call(value) === '[object Date]';
};

/** 是否空值，空对象，空数组，空字符串，空函数，空 Symbol */
export const isEmpty = (value: any) => {
	if (value === true || value === false) return true;
	if (value === null || value === undefined) return true;
	if (isNumber(value)) return value === 0;
	if (isDate(value)) return isNaN(value.getTime());
	if (isFunction(value)) return false;
	if (isSymbol(value)) return false;

	// 对象处理
	if (value.constructor === Object) {
		const keys = Object.keys(value).length;
		return keys === 0;
	}

	// 数组处理
	const length = (value as any).length;
	if (isNumber(length)) return length === 0;
	const size = (value as any).size;
	if (isNumber(size)) return size === 0;

	return false;
};

/** 判断是否 Boolean */
export const isBoolean = (value: any): value is boolean =>
	value === true || value === false || typeof value === 'boolean';

/** 判断是否正则表达式 */
export const isRegExp = (value: any): value is RegExp => !!value && value instanceof RegExp;

/** 判断是否正则表达式 isRegExp 的缩写 */
export const isReg = isRegExp;

/** 判断是否 null 或者 undefined */
export const isNil = (value: any): value is null | undefined =>
	value === null || value === undefined;

/**
 * 判断是否 NaN
 * 一个 NaN 原始值是唯一一个不等于自身的值。
 */
export const isNaN = (value: any): boolean => !isNumber(value);

/** 判断是否不为空，非空对象，非空数组，非空字符串，非空函数，非空 Symbol */
export const notEmpty = (value: any): boolean => !isEmpty(value);

/** 判断是否 Object 对象且对象存在内容 */
export const hasObject = (value: any): value is object =>
	isObject(value) && Object.keys(value).length > 0;

/** 对象是否包含指定的属性 */
export const hasObjectName = (value: any, name: string): boolean =>
	!!name && hasObject(value) && value.hasOwnProperty(name);

/** 数组是否存在内容 */
export const hasArray = (value: any): boolean => !!value && isArray(value) && value.length > 0;

/** 判断是否字符串，且字符串存在内容 */
export const hasString = (value: any): boolean => !!value && isString(value) && value !== '';
