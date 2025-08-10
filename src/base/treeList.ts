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
' 	树形数据操作库
'
' 	name: base/tree
' 	create: 2023-04-16
' 	memo: 树形数据相关操作
'
'	树形数据格式: text / value / children
' 	
' ------------------------------------------------------------
*/

import { hasArray, hasObject, isEmpty, isFn, isNil, isObject } from './type';
import { number } from './number';
import type { Dict, ITree, ITreeMap, IList, IListMap } from '../types';

/**
 * 递归执行操作，全部操作一次，不终止
 * @param list	树形数据列表
 * @param func	要执行的操作
 */
export function treeExecute<T extends ITree>(
	list: T | T[],
	func: (item: T) => void,
	childrenKey: string = 'children'
) {
	if (!isFn(func)) return;

	const arr = isObject(list) ? [list as T] : (list as T[]);
	if (!hasArray(arr)) return;

	for (let i = 0, len = arr.length; i < len; i++) {
		const item = arr[i];
		if (!item) continue;

		func(item);
		treeExecute(item[childrenKey], func);
	}
}

// /**
//  * 递归执行操作，执行成功就停止操作
//  * @param {Object} list		树形数据列表
//  * @param {Function} func	要执行的操作
//  */
// export function treeRun<T extends ITree>(
// 	list: T | T[],
// 	func: (item: T) => boolean,
// 	childrenKey: string = 'children'
// ): T | undefined {
// 	if (!isFn(func)) return;

// 	const arr: T[] = isObject(list) ? (list as Dict)[childrenKey] : list;
// 	if (!hasArray(arr)) return;

// 	for (let i = 0, len = arr.length; i < len; i++) {
// 		const item = arr[i];
// 		if (!item) continue;

// 		let res = func(item);
// 		if (res === true) return item;

// 		const ret = treeRun(item[childrenKey], func);
// 		if (!isEmpty(ret)) return ret;
// 	}

// 	return;
// }

/**
 * 查找首个符合条件的节点
 * @param list			树形数据列表
 * @param func			要匹配条件的函数
 * @param childrenKey 	下级字段名称
 * @returns 			返回查找到的节点
 */
export function treeFind<T extends ITree>(
	list: T | T[],
	func: (item: T) => boolean,
	childrenKey: string = 'children'
): T | undefined {
	if (!isFn(func)) return;

	const arr = isObject(list) ? [list as T] : (list as T[]);
	if (!hasArray(arr)) return;

	for (let i = 0, len = arr.length; i < len; i++) {
		const item = arr[i];
		if (!item) continue;

		let res = func(item);
		if (res === true) return item;

		const ret = treeFind(item[childrenKey], func);
		if (!isEmpty(ret)) return ret;
	}

	return;
}

/**
 * 查找所有符合条件的节点
 * @param list			树形数据列表
 * @param func			要匹配条件的函数
 * @param childrenKey 	下级字段名称
 * @returns 			返回所有查找到的节点数组
 */
export function treeFindAll<T extends ITree>(
	list: T | T[],
	func: (item: T) => boolean,
	childrenKey: string = 'children'
): T[] {
	const result: T[] = [];

	if (!isFn(func)) return result;

	const arr = isObject(list) ? [list as T] : (list as T[]);
	if (!hasArray(arr)) return result;

	for (let i = 0, len = arr.length; i < len; i++) {
		const item = arr[i];
		if (!item) continue;

		let res = func(item);
		if (res === true) result.push(item);

		const ret = treeFindAll(item[childrenKey], func, childrenKey);
		if (hasArray(ret)) result.push(...ret);
	}

	return result;
}

/**
 * 从树形数据中递归获取顶级项目集合
 * @param data		树形数据
 * @param value		要查询的值
 * @param map		树形数据映射，只需要 value 与 parent 字段即可
 * @returns 		返回所有查找到的父级节点数组，当前级别在前面，顶级在后面
 */
export function treeParents<V, T extends ITree<V>>(
	data: T[],
	value: V,
	map: ITreeMap = { value: 'id', parent: 'parentId' },
	includeSelf = false
) {
	const result: T[] = [];
	if (!hasArray(data) || isNil(value)) return result;

	!isObject(map) && (map = {});
	const _value = map.value || 'value';
	const _parent = map.parent || 'parent';

	// 记录原始值
	const _org = value;

	// 查找值
	const find = () => {
		const ret = treeFind(data, (item) => item[_value] === value || item.value === value);

		if (ret && hasObject(ret)) {
			if (includeSelf || value !== _org) result.push(ret);

			// 重新更新上级
			value = ret[_parent] ?? ret.parent;

			// 对于存在重复数据的树，获取后的值与之前重复，则将出现无限循环
			if (value !== _org && result.every((item) => item[_value] !== value)) return value;
		}

		return;
	};

	while (!isNil(find())) {}

	return result;
}

/**
 * 从列表数据中递归获取顶级项目集合
 * @param data		列表数据
 * @param value		要查询的值
 * @param map		树形数据映射，只需要 value 与 parent 字段即可
 * @returns 		返回所有查找到的父级节点数组，当前级别在前面，顶级在后面
 */
export function listParents<V, T extends IList<V>>(
	data: T[],
	value: V,
	map: ITreeMap = { value: 'id', parent: 'parentId' },
	includeSelf = false
) {
	const result: T[] = [];
	if (!hasArray(data) || isNil(value)) return result;

	!isObject(map) && (map = {});
	const _value = map.value || 'value';
	const _parent = map.parent || 'parent';

	// 记录原始值
	const _org = value;

	// 查找值
	const find = () => {
		const ret = data.find((item) => item[_value] === value || item.value === value);
		if (ret && hasObject(ret)) {
			if (includeSelf || value !== _org) result.push(ret);

			// 重新更新上级
			value = ret[_parent] ?? ret.parent;

			// 对于存在重复数据的树，获取后的值与之前重复，则将出现无限循环
			if (value !== _org && result.every((item) => item[_value] !== value)) return value;
		}

		return;
	};

	while (!isNil(find())) {}

	return result;
}

/**
 * 递归列表数据获取顶级项目
 * @param data		列表数据
 * @param value		要查询的值
 * @param map		树形数据映射，只需要 value 与 parent 字段即可
 * @returns 		返回查找到的顶级节点
 */
export function listTop<V, T extends IList<V>>(
	data: T[],
	value: V,
	map: ITreeMap = { value: 'id', parent: 'parentId' }
) {
	const ret = listParents(data, value, map, false);
	return hasArray(ret) ? ret[ret.length - 1] : undefined;
}

// /**
//  * 查找所有上级节点
//  * @param {Object} list		树形数据列表
//  * @param {Object} value	要查询的值
//  * @param {String} name		值对应字段，默认：value
//  */
// export function parents(list: any, value: any, valueKey: string = 'value'): any {
// 	if (!hasArray(list) || isEmpty(value)) return;

// 	value = value.toString();
// 	valueKey = valueKey || 'value';

// 	for (var i = 0; i < list.length; i++) {
// 		const item = list[i];

// 		// 检查是否包含此项
// 		if (item[valueKey].toString() === value) {
// 			// 找到，不要再寻找，直接返回空数组
// 			return [item];
// 		} else {
// 			// 未找到递归子项目
// 			const arr = parents(item.children, value, valueKey);
// 			if (arr) {
// 				arr.unshift(item);
// 				return arr;
// 			}
// 		}
// 	}
// }

// /**
//  * 查找所有子节点
//  * @param {Object} list		树形数据列表
//  * @param {Object} value	要查询的值
//  * @param {String} name		值对应字段，默认：value
//  */
// function childrens(list: any, value: any, valueKey: string = 'value'): any {
// 	let arr: ITree[] = [];

// 	// 查找指定项目
// 	const data: any = find(list, value, valueKey);

// 	// 找到项目
// 	if (!isEmpty(data)) {
// 		// 获取所有子项目
// 		if (hasArray(data.children)) {
// 			arr.push(...data.children);
// 			execute(data.children, (item: ITree) => arr.push(...item.children));
// 		}
// 	}

// 	return arr;
// }

// /**
//  * 递归获取树形子集数据
//  */
// function findChildren(data, id, idName = 'id', _parent = 'parentId') {
// 	idName = idName ?? 'id';
// 	_parent = _parent ?? 'parentId';

// 	if (this.hasArray(data)) {
// 		const list = data.filter((item) => item[_parent] == id);

// 		if (this.hasArray(list)) {
// 			list.forEach((item) => {
// 				item.children = this.findChildren(data, item[idName], idName, _parent);
// 			});

// 			return list;
// 		}
// 	}

// 	return [];
// }

// /** lodash 导入 */
// import { filter } from 'lodash-es';

// /**
//  * 递归执行操作，全部操作一次，不终止
//  * @param {ITree[]} list	树形数据列表
//  * @param {Function} predicate	要执行的操作
//  */
// export function treeExecute<T extends ITree>(
// 	list: List<T>,
// 	predicate?: ListIterateeCustom<T, boolean>,
// 	childrenKey: string = 'children'
// ) {
// 	const arrs = filter(list, predicate);

// 	list.forEach((item: any) => {
// 		if (isObject(item)) {
// 			func(item);
// 			treeExecute(item[childrenKey], func);
// 		}
// 	});
// }

/**
 * 将对象数据转换成标准的列表对象数据
 * @param obj 			原始对象
 * @param map 			键值映射
 * @param ext 			扩展转换操作
 * @param skipConvert 	是否忽略转换，如果之前已经转换过仍然进行转换
 * @returns 			转换后的标准列表数据
 */
export function listConvert<T, V extends IList<T> & { __list?: boolean }>(
	obj: Dict,
	map?: IListMap,
	ext?: (obj: V, map?: IListMap) => V,
	skipConvert: boolean = false
): IList<T> | undefined {
	if (!isObject(obj)) return;
	if (!skipConvert && obj.__list === true) return obj as V;

	(!map || !isObject(map)) && (map = {});
	const _value = map.value || 'value';
	const _label = map.label || 'label';
	const _icon = map.icon || 'icon';
	const _disabled = map.disabled || 'disabled';

	/** 如果禁用字段为 enabled 则禁用字段需要取反 */
	const isRev = isEmpty(map.rev) ? /enable/gi.test(_disabled) : map.rev;

	let ret = { ...obj } as V;
	ret.label = (obj[_label] ?? obj['label'] ?? obj['text'])?.toString();
	ret.value = obj[_value] ?? obj['value'];
	ret.icon = obj[_icon];
	ret.disabled = isRev ? !obj[_disabled] : !!obj[_disabled];

	/** 数值转换 */
	if (map.numberValue === true) {
		// @ts-ignore
		ret.value = number(ret.value);
	}

	/** 扩展转换 */
	isFn(ext) && (ret = ext(ret, map));

	/** 附加转换标记 */
	!skipConvert && hasObject(ret) && (ret.__list = true);

	return ret;
}

/**
 * 将对象数据转换成标准的树形数据
 * @param obj 			原始对象
 * @param map 			键值映射
 * @param ext 			扩展转换操作
 * @param skipConvert 	是否忽略转换，如果之前已经转换过仍然进行转换
 * @returns 			转换后的标准树形数据
 */
export function treeConvert<T, V extends ITree<T> & { __tree?: boolean }>(
	obj: Dict,
	map?: ITreeMap,
	ext?: (obj: V, map?: IListMap) => V,
	skipConvert: boolean = false
): ITree<T> | undefined {
	if (!isObject(obj)) return;
	if (!skipConvert && obj.__tree === true) return obj as V;

	(!map || !isObject(map)) && (map = {});
	const _value = map.value || 'value';
	const _label = map.label || 'label';
	const _icon = map.icon || 'icon';
	const _disabled = map.disabled || 'disabled';
	const _parent = map.parent || 'parent';
	const _children = map.children || 'children';

	/** 如果禁用字段为 enabled 则禁用字段需要取反 */
	const isRev = isEmpty(map.rev) ? /enable/gi.test(_disabled) : map.rev;

	let ret = { ...obj } as V;
	ret.label = (obj[_label] ?? obj['label'] ?? obj['text'])?.toString();
	ret.value = obj[_value] ?? obj['value'];
	ret.icon = obj[_icon];
	ret.disabled = isRev ? !obj[_disabled] : !!obj[_disabled];
	ret.parent = obj[_parent];
	ret.children = obj[_children];

	/** 数值转换 */
	if (map.numberValue === true) {
		// @ts-ignore
		ret.value = number(ret.value);
	}

	/** 扩展转换 */
	isFn(ext) && (ret = ext(ret, map));

	if (hasObject(ret)) {
		// 存在指定的子级则递归子级
		hasArray(ret.children) &&
			(ret.children = ret
				.children!.map((item) => {
					const child = treeConvert<T, V>(item, map, ext, skipConvert);

					// 赋值上级
					child && (child.parent = ret.value);

					return child;
				})
				.filter((item) => !!item));

		/** 附加转换标记 */
		!skipConvert && (ret.__tree = true);
	}

	return ret;
}

/**
 * 树形列表数据转换成标准树形数据，需要数据中上级字段数据完整
 * @param list			要处理的列表
 * @param parent		默认顶级节点
 * @param predicate		筛选条件
 * @param updateItem	更新节点数据
 * @returns			转换后的标准树形数据
 */
export function list2tree<T, S extends IList<T>, V extends S & ITree<T>>(
	list: S[],
	parent: T,
	predicate?: (parent: T, value: S, index: number, array: S[]) => boolean,

	updateItem?: (
		item: S & {
			children?: V[];
			parent: T;
		}
	) => V
): V[] {
	if (!hasArray(list)) return [];

	/** 值不能与父级相等，否则将出现死循环 */
	const filterFn = isFn(predicate)
		? (item: S, index: number, array: S[]) => predicate(parent, item, index, array)
		: (item: S) => item.parent === parent && item.value !== parent;

	return list
		.filter(filterFn)
		.map((item) => {
			let restult = {
				...item,
				children: list2tree<T, S, V>(list, item.value, predicate, updateItem),
				parent
			};

			return (isFn(updateItem) ? updateItem(restult) : restult) as V;
		})
		.filter((item) => hasObject(item));
}
