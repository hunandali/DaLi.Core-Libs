/*
 * ------------------------------------------------------------
 *
 * 	Copyright © 2025 湖南大沥网络科技有限公司.
 *
 * 	  author: 木炭
 * 	   email: woodcoal@qq.com
 * 	homepage: http://www.hunandali.com/
 *
 * ------------------------------------------------------------
 *
 * 	基于第三方包的时间扩展操作
 *
 * 	file: date.ts
 * 	time: 2025-08-13 14:06:20
 *
 * ------------------------------------------------------------
 */

/** 时间库 */
import dayjs from 'dayjs';
import { isEmpty, isString } from '../base';

// 常用日期转换类型
// new Date().toLocaleDateString(); // 1/06/2021
// new Date().toLocaleDateString('en-US', {
// 	year: 'numeric',
// 	month: '2-digit',
// 	day: '2-digit'
// }); // 01/06/2021 (month and day with two digits)

// new Date().toLocaleDateString('en-ZA'); // 2020/01/06(year/month/day) notice the different locale

// new Date().toLocaleDateString('en-CA'); // 2021-01-06 (year-month-day) notice the different locale

// new Date().toLocaleString('en-US', {
// 	hour: '2-digit',
// 	hour12: false,
// 	timeZone: 'America/New_York'
// }); // 07 (just the hour)

/**
 * 将任何可以转换成时间的对象，使用 dayjs 包装
 * @param date 	用于包装的时间（字符串支持:now,yesterday,tomorrow)
 */
export const date = (date?: any) =>
	!date || date === 'now'
		? dayjs()
		: date === 'yesterday'
		? dayjs().subtract(1, 'day')
		: date === 'tomorrow'
		? dayjs().add(1, 'day')
		: dayjs(date);

/**
 * 将任何可以转换成时间的对象，按条件格式化成字符串
 * 所有早于 2000 年的时间都无效
 * @param date 		用于格式化的时间（字符串支持:now,today,yesterday,tomorrow,weekstart,monthstart,yearstart,weekend,monthend,yearend)
 * @param format 	格式。支持：YYYY MM DD HH mm ss / desc 间隔描述
 */
export const dateFormat = (date?: any, format: string = 'YYYY-MM-DD') => {
	if (isEmpty(date)) return '';

	if (isString(date)) date = date.toLowerCase();

	const day =
		!date || date === 'now' || date === 'today'
			? dayjs()
			: date === 'yesterday'
			? dayjs().subtract(1, 'day')
			: date === 'tomorrow'
			? dayjs().add(1, 'day')
			: /* 开始时间 */
			date === 'weekstart'
			? dayjs().startOf('week')
			: date === 'monthstart'
			? dayjs().startOf('month')
			: date === 'yearstart'
			? dayjs().startOf('year')
			: /* 结束时间 */
			date === 'weekend'
			? dayjs().endOf('week')
			: date === 'monthend'
			? dayjs().endOf('month')
			: date === 'yearend'
			? dayjs().endOf('year')
			: /* 自定义时间 */
			  dayjs(date);

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
