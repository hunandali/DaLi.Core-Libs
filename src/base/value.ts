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
' 	常用值判断
'
' 	name: base/value
' 	create: 2023-05-10
' 	memo: 判断值是否指定格式
' 	
' ------------------------------------------------------------
*/

import { isEmpty, isNumber, isString } from './type';

/** 两个项目是否相同 */
export const isEqual = <TType>(x: TType, y: TType): boolean => {
	if (Object.is(x, y)) return true;
	if (x instanceof Date && y instanceof Date) {
		return x.getTime() === y.getTime();
	}
	if (x instanceof RegExp && y instanceof RegExp) {
		return x.toString() === y.toString();
	}
	if (typeof x !== 'object' || x === null || typeof y !== 'object' || y === null) {
		return false;
	}
	const keysX = Reflect.ownKeys(x as unknown as object) as (keyof typeof x)[];
	const keysY = Reflect.ownKeys(y as unknown as object);
	if (keysX.length !== keysY.length) return false;
	for (let i = 0; i < keysX.length; i++) {
		if (!Reflect.has(y as unknown as object, keysX[i])) return false;
		if (!isEqual(x[keysX[i]], y[keysX[i]])) return false;
	}
	return true;
};

// /**
//  * 深度比较两个对象之间的值是否相等
//  *
//  * @param {any} x 要比较的值 X
//  * @param {any} y 要比较的值 Y
//  * @return {Boolean}
//  */
// export function isEqual(x: any, y: any) {
// 	// 两者都是 null undefined 或者值完全一致
// 	if (x === y) return true;

// 	// 两者类型必须一致
// 	if (!(x instanceof Object) || !(y instanceof Object)) return false;

// 	// 必须有相同的结构
// 	if (x.constructor !== y.constructor) return false;

// 	// 日期对象比较，日期比较特殊，通过计算处理
// 	if (isDate(x) && x - y !== 0) return false;

// 	// 对于对象，数组进行递归检查
// 	for (var p in x) {
// 		// 必须有相同的属性
// 		if (!y.hasOwnProperty(p)) return false;

// 		// 递归比较
// 		if (!isEquals(x[p], y[p])) return false;
// 	}

// 	// 反查 y 属性，两者必须一致
// 	for (p in y) {
// 		if (!x.hasOwnProperty(p)) return false;
// 	}

// 	return true;
// }

/**
 * 正则表达式判断
 * @param val 要检测的值
 * @param reg 正则表达式
 * @returns	  是否匹配
 */
export function isMatch(val: any, reg: RegExp) {
	if (!val) return false;

	const testValue: string = isString(val) ? (val as string) : val.toString();
	return reg.test(testValue);
}

/** 判断是否为手机号码 */
export function isMobile(val: number | string) {
	return isMatch(val, /^1[3-9]\d{9}$/);
}

/** 判断是否为车牌 */
export function isCar(val: string) {
	return isMatch(
		val,
		/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/
	);
}

/** 判断是否为电话号码 */
export function isPhone(val: string) {
	return isMatch(
		val,
		/^(((0[0-9]{2,3}(\-| ))?([1-9][0-9]{6,7})+((\-| )[0-9]{1,4})?)|(1[3-9]\d{9}|^1060[1-9]\d{1,2}\d{7,8}))$/
	);
}

/** 判断是否为 Email */
export function isEmail(val: string) {
	return isMatch(val, /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
}

// 公共正则组件
const DOMAIN = `([a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*|localhost|\\[([0-9a-fA-F:]+)\\])`;
const PORT = `(:\\d+)?`;
const PATH = `(\\/[\\w-._~!$&'()*+,;=:@/%#?]*)*`; // 使用标准RFC 3986允许字符集
const QUERY = `(\\?[^#]*)?(#[\\w-]*)?`;

/** 判断是否为网址，必须含 http / https / ftp */
export function isUrl(val: string) {
	return isMatch(val, new RegExp(`^(ht|f)tps?://${DOMAIN}${PORT}(/[\\w/.?#-]*)?$`));
}

/** 判断是否为全网址，http / https / ftp 可选，且可以带路径与参数 */
export function isFullUrl(val: string) {
	return isMatch(val, new RegExp(`^((ht|f)tps?://)?${DOMAIN}${PORT}${PATH}${QUERY}$`));
}

/** 判断是否为网址，仅支持 http / https */
export function isHttp(val: string) {
	return isMatch(val, new RegExp(`^https?://${DOMAIN}${PORT}${PATH}${QUERY}$`));
}

/** 判断是否为 GUID */
export function isGuid(val: string) {
	return isMatch(
		val,
		/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
	);
}

/** 判断是否为汉字 */
export function isChinese(val: string) {
	return isMatch(val, /^[\u4e00-\u9fa5]{0,}$/);
}

/** 判断是否为英文字母 */
export function isEnglish(val: string) {
	return isMatch(val, /^[A-Za-z]+$/);
}

/** 判断是否为名称，即：英文开头的字符串（仅包含半角字母、数字、下划线与横线），类似于账号名，最少两个字符 */
export function isName(val: string, len: number = 100) {
	len -= 1;
	if (len < 1) len = 1;
	return isMatch(val, new RegExp('^[a-zA-Z]{1,1}[0-9\\.\\-_a-zA-Z]{1,' + len + '}$'));
}

/** 判断是否为 IPv4 字符串 */
export function isIP(val: string) {
	return isMatch(
		val,
		/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
	);
}

/** 判断是否为有效的 JSON 字符串 */
export function isJSON(val: string) {
	if (!isString(val)) return false;

	try {
		const obj = JSON.parse(val);
		return !isEmpty(obj);
	} catch (e) {}

	return false;
}

/** 是否整数 */
export const isInt = (value: any): value is number => {
	return isNumber(value) && value % 1 === 0;
};

/** 是否浮点数 */
export const isFloat = (value: any): value is number => {
	return isNumber(value) && value % 1 !== 0;
};
