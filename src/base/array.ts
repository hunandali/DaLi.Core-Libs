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
' 	数组操作
'
' 	name: base/array
' 	create: 2023-05-10
' 	memo: 数组操作
' 	
' ------------------------------------------------------------
*/

/** 导入 */
import { hasArray, isFn, isNil, isNumber } from './type';
import { isEqual } from './value';
import type { Dict } from '../types';

/**
 * 大小比较函数
 * @param a 		第一个项目
 * @param b 		第二个项目
 * @param getter 	比较的项目
 */
export const compare = <T extends Dict = any>(
	a: T,
	b: T,
	getter?: string | ((item: T) => number | string | undefined) | undefined
) => {
	const fn = getter ? (isFn(getter) ? getter : (item: T) => item[getter]) : (item: T) => item;

	let x = fn(a);
	let y = fn(b);

	if (isNumber(x) && isNumber(y)) return x - y;

	x = (x || '').toString();
	y = (y || '').toString();
	return x.localeCompare(y);
};

/**
 * 排序
 * @param array     要操作的数组
 * @param getter    排序函数
 * @param desc      是否降序
 * @returns         排序后的数组
 */
export const sort = <T>(
	array: Array<T>,
	getter: (item: T) => number | string | undefined,
	desc = false
) => {
	const _sort = (a: T, b: T) => {
		let x = getter(a);
		let y = getter(b);

		if (isNumber(x) && isNumber(y)) return desc ? y - x : x - y;

		x = (x || '').toString();
		y = (y || '').toString();
		return desc ? y.localeCompare(x) : x.localeCompare(y);
	};

	return array.sort(_sort);
};

/**
 * 创建用于迭代的范围
 * 给定开始、结束、值和步长，返回一个生成器，该生成器将按步长生成从开始到结束的值。for (let i = 0)对于替换为很有用for of。Range 将返回一个生成器，该生成器for of一次调用一个生成器，因此创建大范围是安全的。
 *
 * @example
 * range(3)                  // yields 0, 1, 2, 3
 * range(0, 3)               // yields 0, 1, 2, 3
 * range(0, 3, 'y')          // yields y, y, y, y
 * range(0, 3, () => 'y')    // yields y, y, y, y
 * range(0, 3, i => i)       // yields 0, 1, 2, 3
 * range(0, 3, i => `y${i}`) // yields y0, y1, y2, y3
 * range(0, 3, obj)          // yields obj, obj, obj, obj
 * range(0, 6, i => i, 2)    // yields 0, 2, 4, 6
 *
 * for (const i of range(0, 200, i=>i 10)) {
 *    console.log(i) // => 0, 10, 20, 30 ... 190, 200
 * }
 */
export function* range<T = number>(
	startOrLength: number,
	end?: number,
	valueOrMapper: T | ((i: number) => T) = (i) => i as T,
	step: number = 1
): Generator<T> {
	const mapper = isFn(valueOrMapper) ? valueOrMapper : () => valueOrMapper;
	const start = end ? startOrLength : 0;
	const final = end ?? startOrLength;
	for (let i = start; i <= final; i += step) {
		yield mapper(i);
		if (i + step > final) break;
	}
}

/**
 * 创建包含特定项目的列表
 * 给定开始、结束、值和步长，返回一个列表，其中包含按步长从开始到结束的值。
 * @example
 * list(3)                  // 0, 1, 2, 3
 * list(0, 3)               // 0, 1, 2, 3
 * list(0, 3, 'y')          // y, y, y, y
 * list(0, 3, () => 'y')    // y, y, y, y
 * list(0, 3, i => i)       // 0, 1, 2, 3
 * list(0, 3, i => `y${i}`) // y0, y1, y2, y3
 * list(0, 3, obj)          // obj, obj, obj, obj
 * list(0, 6, i => i, 2)    // 0, 2, 4, 6
 */
export const list = <T = number>(
	startOrLength: number,
	end?: number,
	valueOrMapper?: T | ((i: number) => T),
	step?: number
): T[] => {
	return Array.from(range(startOrLength, end, valueOrMapper, step));
};

/**
 *  统计数组中每个项目出现的次数
 *
 * @example
 * counting([{name: 'Ra', culture: 'egypt' }, { name: 'Zeus', culture: 'greek' }, { name: 'Loki', culture: 'greek'}], g => g.culture) // => { egypt: 1, greek: 2 }
 */
export const counting = <T, TId extends string | number | symbol>(
	list: readonly T[],
	identity: (item: T) => TId
): Record<TId, number> => {
	if (!list) return {} as Record<TId, number>;
	return list.reduce((acc, item) => {
		const id = identity(item);
		acc[id] = (acc[id] ?? 0) + 1;
		return acc;
	}, {} as Record<TId, number>);
};

/**
 * 分组数组中的项目
 *
 * @example
 * group([1, 2, 3, 4, 5, 6, 7, 8, 9], g => g % 3) // => { 0: [3, 6, 9], 1: [1, 4, 7], 2: [2, 5, 8] }
 */
export const group = <T, Key extends string | number | symbol>(
	array: readonly T[],
	getGroupId: (item: T) => Key
): Partial<Record<Key, T[]>> => {
	return array.reduce((acc, item) => {
		const groupId = getGroupId(item);
		if (!acc[groupId]) acc[groupId] = [];
		acc[groupId].push(item);
		return acc;
	}, {} as Record<Key, T[]>);
};

/**
 * 将列表转换为字典对象
 * @param array 	要转换的数组
 * @param getKey 	获取键的函数
 * @param getValue 	获取值的函数
 * @returns 		转换后的对象
 * @example
 * toObject([1, 2, 3, 4, 5, 6, 7, 8, 9], g => g % 3, g => g) // => { 0: 3, 1: 6, 2: 9 }
 */
export const toObject = <T, Key extends string | number | symbol, Value = T>(
	array: readonly T[],
	getKey: (item: T) => Key,
	getValue: (item: T) => Value = (item) => item as unknown as Value
): Record<Key, Value> => {
	return array.reduce((acc, item) => {
		acc[getKey(item)] = getValue(item);
		return acc;
	}, {} as Record<Key, Value>);
};

/**
 * 按条件过滤数组后映射返回对应数组
 * 类似于 Array.prototype.filter + Array.prototype.map
 * @param array 	要操作的数组
 * @param condition 筛选条件
 * @param mapper 	映射方式
 * @example
 * select([1, 2, 3, 4], x > 2, x => x*x) == [9, 16]
 */
export const select = <T, K>(
	array: readonly T[],
	condition: (item: T, index: number) => boolean,
	mapper: (item: T, index: number) => K
) => {
	if (!array) return [];
	return array.reduce((acc, item, index) => {
		if (!condition(item, index)) return acc;
		acc.push(mapper(item, index));
		return acc;
	}, [] as K[]);
};

/** 从列表中删除所有空项目，默认 null 或者 undefined */
export const empty = <T>(
	list: readonly T[],
	filter: (value: any) => boolean = (x) => isNil(x)
): T[] => {
	return (list?.filter(filter) as T[]) ?? [];
};

/**
 * 移除数组中的项目
 * @param array 	要操作的数组
 * @param predicate 要移除的项目 (item:T)=>boolean
 * @param position 	要移除项目的位置。默认：false。true/left 仅从头开始第一条；right 仅从尾开始第一条；false 全部都移除
 * @returns 		返回处理后的数组
 */
export const remove = <T>(
	array: T[],
	predicate: T | ((value: T, index: number, obj: T[]) => unknown),
	position: boolean | 'left' | 'right' = false
): T[] => {
	if (!array || !predicate) return array;

	// 如果查询条件非函数则需要转换成函数
	const filter = isFn(predicate) ? predicate : (value: T) => isEqual(value, predicate);

	/** 移除第一条 */
	if (position === true || position === 'left') {
		const idx = array.findIndex(filter);
		if (idx > -1) array.splice(idx, idx + 1);
	}

	/** 移除最后一条 */
	if (position === 'right') {
		const idx = array.findLastIndex(filter);
		if (idx > -1) array.splice(idx, idx + 1);
	}

	/** 全部移除 */
	if (!position) return array.filter((value, index, array) => !filter(value, index, array));

	/** 未操作成功,返回原始值 */
	return array;
};

/**
 * 清除数组重复项目
 * @param array 要操作的数组
 * @returns 	返回处理后的数组
 */
export function cleanDuplicate<T>(array: T[], clearValue?: (value: T) => boolean) {
	if (!hasArray(array)) return [];

	const filter = isFn(clearValue) ? clearValue : (x: T) => !isNil(x);
	return [...new Set(array)].filter(filter);
}
