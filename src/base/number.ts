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
' 	数值操作
'
' 	name: lib.base.number
' 	create: 2024-03-21
' 	memo: 数值操作
' 	
' ------------------------------------------------------------
*/

import { isNaN } from './type';

/** 尝试转换成数值，不成功则返回 0 */
export function number(value: any): number {
	value = Number(value);
	return isNaN(value) ? 0 : value;
}
/**
 * 检查给定的数值是否在 0 到指定数值之间(包括 0 与指定数值)。
 * @param number 需要检查的数值
 * @param end    最大值(不包括)
 */
export function inRange(number: number, end: number): boolean;

/**
 * 检查给定的数值是否在指定数值之间(包括指定数值)
 * @param number    需要检查的数值
 * @param start     最小值(包括)
 * @param end       最大值(不包括)
 */
export function inRange(number: number, start: number, end: number): boolean;
export function inRange(number: number, start: number, end?: number): boolean {
	const isTypeSafe =
		typeof number === 'number' &&
		typeof start === 'number' &&
		(typeof end === 'undefined' || typeof end === 'number');

	if (!isTypeSafe) {
		return false;
	}

	if (typeof end === 'undefined') {
		end = start;
		start = 0;
	}

	return number >= Math.min(start, end) && number < Math.max(start, end);
}

/** 将数值转换成浮点数 */
export const toFloat = <T extends number | null = number>(
	value: any,
	defaultValue?: T
): number | T => {
	const def = defaultValue === undefined ? 0.0 : defaultValue;
	if (value === null || value === undefined) {
		return def;
	}
	const result = parseFloat(value);
	return isNaN(result) ? def : result;
};

/** 将数值转换成整数 */
export const toInt = <T extends number | null = number>(
	value: any,
	defaultValue?: T
): number | T => {
	const def = defaultValue === undefined ? 0 : defaultValue;
	if (value === null || value === undefined) {
		return def;
	}
	const result = parseInt(value);
	return isNaN(result) ? def : result;
};

/** 获取数值的小数位数 */
export function DecimalLength(value: number): number {
	const valueString = value.toString();
	const decimalPlace = valueString.indexOf('.');
	if (decimalPlace === -1) {
		return 0; // 没有小数点，返回0
	} else {
		return valueString.length - decimalPlace - 1; // 有小数点，返回小数点后的位数
	}
}

/** 将秒数值转换成时间 */
export function toDate(seconds: number) {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	// 添加前导零（如果需要）
	const h = hours < 10 ? '0' + hours : hours;
	const m = minutes < 10 ? '0' + minutes : minutes;
	const s = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

	return `${h}:${m}:${s}`;
}
