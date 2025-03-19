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
' 	其他相关操作
'
' 	name: lib.base.utils
' 	create: 2023-05-10
' 	memo: 其他相关操作
' 	
' ------------------------------------------------------------
*/

import type { Dict, Func, Action } from '../types';

/** 导入 */
import { hasArray, isEmpty, isFn, isString } from './type';

/** 时间库 */
import dayjs from 'dayjs';

/** 指纹 */
import fingerprintJs from '@fingerprintjs/fingerprintjs';

/** 参数 */
import { SERVERMODE } from '../../config';

/**
 * 计算对象的 HASH 值
 * @param obj 	要计算的对象
 * @returns 	hash 值
 */
export function hash(obj: any): number {
	if (isEmpty(obj)) return -1;

	// 序列化对象
	if (!isString(obj)) obj = JSON.stringify(obj);

	// 0 长度文本
	if (obj.length === 0) return 0;

	let hash = 0;

	for (let i = 0; i < obj.length; i++) {
		let character = obj.charCodeAt(i);
		hash = (hash << 5) - hash + character;
		hash = hash & hash; // Convert to 32bit integer
	}

	return hash;
}

/** 生成随机ID */
export function rnd(): string {
	return Number(Math.random().toString().substring(3) + Date.now())
		.toString(36)
		.slice(0, 11);
}

/**
 * 将任何可以转换成时间的对象，按条件格式化成字符串
 * 所有早于 2000 年的时间都无效
 * @param date 		用于格式化的时间
 * @param format 	格式。支持：YYYY MM DD HH mm ss / desc 间隔描述
 */
export const dateFormat = (date?: any, format: string = 'YYYY-MM-DD') => {
	if (isEmpty(date)) return '';

	const day = dayjs(date);

	if (!day.isValid()) return '✖';
	if (day.isBefore('2000-01-01', 'day')) return '➖';

	if (format !== 'desc') return day.format(format);

	return dateLong(day, null, false, true);
};

/**
 * 计算时长
 * @param start 		开始时间
 * @param end 			结束时间
 * @param isEn 			使用英文、中文
 * @param incSuffix 	是否包含前、后
 * @returns
 */
export const dateLong = (start: any, end?: any, isEn = false, incSuffix = false) => {
	const dayStart = dayjs(start);
	if (!dayStart.isValid()) return '✖';

	const dayEnd = end ? dayjs(end) : dayjs();
	if (!dayEnd.isValid()) return '✖';

	// 秒差值
	let long = dayEnd.unix() - dayStart.unix();
	const isAfter = long < 0;
	long = Math.abs(long);
	if (long <= 1) return incSuffix ? (isEn ? 'now' : '此刻') : isEn ? '0sec' : '0秒';

	const s = isEn ? 'sec' : '秒';
	const m = isEn ? 'min' : '分';
	const h = isEn ? 'hout' : '时';
	const d = isEn ? 'day' : '天';
	const suffix = incSuffix ? (isAfter ? (isEn ? 'after' : '后') : isEn ? 'before' : '前') : '';

	// 秒
	if (long < 60) return `${long}${s}${suffix}`;

	// 分钟
	long = long / 60;
	if (long < 60) {
		const a = Math.floor(long);
		let ret = `${a}${m}`;

		const b = Math.floor((long - a) * 60);
		b > 0 && (ret += `${b}${s}`);

		return ret + suffix;
	}

	// 小时
	long = long / 60;
	if (long < 24) {
		const a = Math.floor(long);
		let ret = `${a}${h}`;

		const b = Math.floor((long - a) * 60);
		b > 0 && (ret += `${b}${m}`);

		return ret + suffix;
	}

	long = long / 24;
	const a = Math.floor(long);
	let ret = `${a}${d}`;

	const b = Math.floor((long - a) * 24);
	b > 0 && (ret += `${b}${h}`);

	return ret + suffix;
};

/**
 * 函数跟踪，检查指定到当前位置函数的所有信息
 * @param returnCount		最多返回记录数
 * @param removeCount		移除前几条，第一行内容是 ERROR，第二行为当前函数，此2行不计算在内
 * @param removeContents	移除包含的内容
 * @returns 				返回跟踪信息
 */
export function errorTrace(
	returnCount: number = 1,
	removeCount: number = 1,
	removeContents: string[] = []
): string | string[] {
	// 默认返回内容
	const def = returnCount === 1 ? '' : [];

	if (!Error.captureStackTrace) return def;

	// 错误捕捉
	const err: Dict = {};
	Error.captureStackTrace(err);
	let errs: string[] = err.stack.split('\n');

	// 第一条内容内容可能是 ERROR
	// 第二行为当前函数
	if (errs.length < 3) return def;

	// 过滤
	removeCount += 2;
	errs = errs
		.filter((value, index) => {
			// 过滤前几条
			if (index < removeCount) return false;

			// 不能包含内容
			return !removeContents.some((content) => value.indexOf(content) > -1);
		})
		.map((value) => {
			//  移除 空格 与 at
			value = value.trim();
			value.startsWith('at') && (value = value.substring(2).trim());

			return value;
		});

	if (!hasArray(errs)) return def;

	// 返回数量
	return returnCount === 1 ? errs[0]! : returnCount > 1 ? errs.splice(0, returnCount) : errs;
}

/**
 * 异步休眠，使用 await 执行
 * @param ms 休眠时长，单位：毫秒
 */
export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 执行指定次数函数操作
 * @param fn 		要执行的函数
 * @param count 	执行次数，超过此次数不再执行
 */
export function execute(fn: Action, count: number = 1) {
	if (!isFn(fn)) return () => {};

	// 最少执行一次
	let times = count < 1 ? 1 : count;

	return function () {
		times--;
		if (times < 0) return;

		return fn(arguments);
	};
}

/** 函数集合 */
const Funs = new Map<Func, string>();

/**
 * 获取函数唯一标识
 * @param fn		要判断的对象内容
 * @param remove	同时移除此数据
 */
export function fnId(fn: Func, remove: boolean = false) {
	if (!isFn(fn)) return '';

	let id: string | undefined = '';
	if (Funs.has(fn)) {
		id = Funs.get(fn);
		remove && Funs.delete(fn);
	} else {
		id = globalId('Fn');
		if (!remove) Funs.set(fn, id);
	}

	return id;
}

/**
 * 防抖函数
 * @param func		目标函数
 * @param wait 		延迟执行毫秒数
 * @param immediate	true - 立即执行， false - 延迟执行
 */
export function debounce<T>(
	func: (this: T, ...args: any[]) => any,
	wait: number = 1000,
	immediate: boolean = false
): (this: T, ...args: any[]) => any {
	let timer: NodeJS.Timeout | undefined;

	return function () {
		const context = this;
		const args = [...arguments];

		if (timer) clearTimeout(timer);

		if (immediate) {
			let callNow = !timer;

			timer = setTimeout(() => {
				timer = undefined;
			}, wait);

			if (callNow) func.apply(context, args);
		} else {
			timer = setTimeout(() => {
				func.apply(context, args);
			}, wait);
		}
	};
}

/**
 * 节流函数
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type true - 使用表时间戳，在时间段开始的时候触发； false - 使用表定时器，在时间段结束的时候触发
 */
export function throttle<T>(
	func: (this: T, ...args: any[]) => any,
	wait: number = 1000,
	type: boolean = true
): (this: T, ...args: any[]) => any {
	let timeout: NodeJS.Timeout | undefined;
	let previous = 0;

	return function () {
		let context = this;
		let args = [...arguments];

		if (type) {
			let now = Date.now();

			if (now - previous > wait) {
				func.apply(context, args);
				previous = now;
			}
		} else {
			if (!timeout) {
				timeout = setTimeout(() => {
					timeout = undefined;
					func.apply(context, args);
				}, wait);
			}
		}
	};
}

// 标识集合
let _globalId = 0;

/**
 * 全局唯一标识
 *
 * @param {String} prefix 前缀
 * @return {Number}
 */
export function globalId(prefix?: string) {
	return prefix ? [prefix, ++_globalId].join('-') : (++_globalId).toString();
}

/**
 * 获取浏览器指纹
 * 结果将返回两个参数：
 * id：浏览器指纹
 * score：指纹评分；1 最可信，0 最不可信
 * 如果服务端而非浏览器端执行则此函数固定返回 { id: 'server', score: 1 }
 */
export async function fingerprint() {
	// 服务端不处理，直接返回
	if (SERVERMODE) return { id: 'server', score: 1 };

	// 客户端分析
	const fpJs = await fingerprintJs.load().then((fg) => fg.get());

	return { id: fpJs.visitorId, score: fpJs.confidence.score };
}
