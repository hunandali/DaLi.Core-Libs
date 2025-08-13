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
' 	对象操作
'
' 	name: base/object
' 	create: 2023-05-10
' 	memo: 对象操作
' 	
' ------------------------------------------------------------
*/

/** 导入 */
import { htmlEncode } from './string';
import {
	hasArray,
	hasObject,
	isArray,
	isEmpty,
	isFn,
	isNil,
	isNumber,
	isObject,
	isString,
	typeName
} from './type';
import type { Dict } from '../types';

///////////////////////////////////////////////////////////////////

/** 清除对象中指定条件的值，默认 null 或者 undefined */
export const objEmpty = <RemovedKeys extends string, T>(
	obj: T,
	filter: (value: any) => boolean = (x) => isNil(x)
): Omit<T, RemovedKeys> => {
	if (!obj) return {} as T;
	const keys = Object.keys(obj) as (keyof T)[];
	return keys.reduce((acc, key) => {
		if (filter(obj[key])) {
			return acc;
		} else {
			acc[key] = obj[key];
			return acc;
		}
	}, {} as T);
};

/**
 * 深度去除对象中的空值，不指定则移除所有 null 和 undefined 以及空文本
 * @param obj 		要处理的数据
 * @param filter	空值过滤条件，默认空内容与空文本
 * @param deep 		是否递归处理
 */
export const objClear = <RemovedKeys extends string, T>(
	obj: T,
	filter: (value: any) => boolean = (x) => isNil(x) || x.toString().trim() === '',
	deep = false
): Omit<T, RemovedKeys> | undefined => {
	if (!obj || filter(obj)) return undefined;

	if (!hasObject(obj)) return obj;

	const keys = Object.keys(obj) as (keyof T)[];
	return keys.reduce((acc, key) => {
		if (filter(obj[key])) return acc;

		// 对象递归
		if (isObject(obj[key]) && deep) {
			const value = objClear(obj[key], filter);

			// @ts-ignore
			hasObject(value) && (acc[key] = value);
			return acc;
		}

		//  数组递归
		if (isArray(obj[key]) && deep) {
			const value = (obj[key] as any[])
				.map((item) => objClear(item))
				.filter((item) => !filter(item));

			// @ts-ignore
			hasArray(value) && (acc[key] = value);
			return acc;
		}

		acc[key] = obj[key];
		return acc;
	}, {} as T);
};

/**
 * 从对象或者数组中获取指定项的值
 * @param value 			要检索的对象/数组
 * @param path 				要解析的属性路径，只是文本或者数组。如：a.b[0].c.2 或者 ['a','b',2]等
 * @param defaultValue		默认值，解析的结果为 undefined / null 时返回这个值
 * @returns					获取的结果
 */
export const get = <TDefault = unknown>(
	value: any,
	path: string | string[],
	defaultValue?: TDefault
): TDefault => {
	if (isEmpty(value) || isEmpty(path)) return defaultValue as TDefault;

	const segments = isArray(path) ? path : path.split(/[\.\[\]]/g);
	let current: any = value;
	for (const key of segments) {
		if (isNil(current)) return defaultValue as TDefault;

		const dequoted = key.replace(/['"]/g, '');
		if (dequoted.trim() === '') continue;

		current = current[dequoted];
	}

	return isNil(current) ? (defaultValue as TDefault) : current;
};

/**
 * 向对象或者数组中设置指定项的值
 * @param initial 	要检索的对象/数组
 * @param path 		要解析的属性路径，只是文本或者数组。如：a.b[0].c.2 或者 ['a','b',2]等
 * @param value		要设置的值
 *
 * @example
 * set({}, 'name', 'ra') // => { name: 'ra' }
 * set({}, 'cards[0].value', 2) // => { cards: [{ value: 2 }] }
 */
export const set = <T extends object, K>(initial: T, path: string | string[], value: K): T => {
	if (!initial) return {} as T;
	if (isEmpty(path)) return initial;

	const segments = isArray(path) ? path : path.split(/[\.\[\]]/g).filter((x) => !!x.trim());

	const _set = (node: any) => {
		if (segments.length > 1) {
			// 当前操作的键
			const key = segments.shift() as string;

			// 下一路径是否数值，是则表示默认值将为数组，否则为对象
			const nextIsNum = isNumber(parseInt(segments[0]));

			// 如果值不存在则设置默认值
			isNil(node[key]) && (node[key] = nextIsNum ? [] : {});

			// 存在下一级，如果当前节点非数组或者对象则需要转换成数组或者对象
			if (nextIsNum && !isArray(node[key])) {
				node[key] = [node[key]];
			} else if (!nextIsNum && !isObject(node[key])) {
				node[key] = { '': node[key] };
			}

			// 递归
			_set(node[key]);
		} else {
			node[segments[0]] = value;
		}
	};

	_set(initial);
	return initial;
};

/**
 * 向对象或者数组中移除指定项
 * @param initial 	要检索的对象/数组
 * @param path 		要解析的属性路径，只是文本或者数组。如：a.b[0].c.2 或者 ['a','b',2]等
 */
export const remove = (value: any, path: string | string[]) => {
	if (isEmpty(value) || isEmpty(path)) return value;

	let segments = isArray(path) ? path : path.split(/[\.\[\]]/g);
	segments = segments.map((x) => x.replace(/['"]/g, '').trim()).filter((x) => x !== '');

	let obj = value;
	for (let i = 0; i < segments.length; i++) {
		const key = segments[i];
		if (isNil(obj)) return value;

		// 如果最后一项
		if (i === segments.length - 1) {
			delete obj[key];
		} else {
			obj = obj[key];
		}
	}

	return value;
};

/**
 * 对象或者数组中是否存在指定项
 * @param initial 	要检索的对象/数组
 * @param path 		要解析的属性路径，只是文本或者数组。如：a.b[0].c.2 或者 ['a','b',2]等
 */
export const has = (value: any, path: string | string[]): boolean => {
	if (isEmpty(value) || isEmpty(path)) return false;

	let segments = isArray(path) ? path : path.split(/[\.\[\]]/g);
	segments = segments.map((x) => x.replace(/['"]/g, '').trim()).filter((x) => x !== '');

	for (let i = 0; i < segments.length; i++) {
		const key = segments[i];
		value = value[key];
		if (value === undefined) return false;
	}

	return true;
};

///////////////////////////////////////////////////////////////////

/**
 * 遍历的简化操作
 * @param obj 		要遍历的对象或者数组
 * @param action 	遍历操作，参数一：value；参数二：key / index；参数三：对象本身
 */
export const each = (
	obj: Dict | any[],
	action: (value: any, key: string | number, obj: any) => void
) => {
	if (!isFn(action)) return false;

	// if (isArray(obj)) {
	// 	forEach(obj, (value, key) => action(value, key, obj));
	// 	return true;
	// } else if (isObject(obj)) {
	// 	Object.keys(obj).forEach((key) => action(obj[key], key, obj));
	// 	return true;
	// }

	if (isArray(obj)) {
		for (let idx = 0, len = obj.length; idx < len; idx++) action(obj[idx], idx, obj);
		return true;
	} else if (isObject(obj)) {
		for (let key in obj) action(obj[key], key, obj);
		return true;
	}

	return false;
};

/**
 * 遍历的简化异步操作
 * @param obj 		要遍历的对象或者数组
 * @param action 	遍历操作，参数一：value；参数二：key / index；参数三：对象本身
 */
export const eachSync = async (
	obj: Dict | any[],
	action: (value: any, key: string | number, obj: any) => Promise<void>
) => {
	if (!isFn(action)) return false;

	if (isArray(obj)) {
		for (let idx = 0, len = obj.length; idx < len; idx++) await action(obj[idx], idx, obj);
		return true;
	} else if (isObject(obj)) {
		for (let key in obj) await action(obj[key], key, obj);
		return true;
	}

	return false;
};

/**
 * 迭代执行的简化操作。每个元素按序执行一个提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。
 * @param obj 			要遍历的对象或者数组
 * @param callbackfn 	为每个元素执行的函数。其返回值将作为下一次调用 callbackFn 时的 accumulator 参数。对于最后一次调用，返回值将作为 reduce() 的返回值。
 * @param initialValue 	第一次调用回调时初始化 previousValue 的值。如果指定了 initialValue，则 callbackFn 从数组中的第一个值作为 currentValue 开始执行。如果没有指定 initialValue，则 previousValue 初始化为数组中的第一个值，并且 callbackFn 从数组中的第二个值作为 currentValue 开始执行。在这种情况下，如果数组为空（没有第一个值可以作为 previousValue 返回），则会抛出错误。
 */
export const reduce = <T = Dict | any[], TDefault = any>(
	obj: T,
	callbackfn: (
		previousValue: TDefault,
		currentValue: any,
		currentIndex: number | string,
		data: T
	) => any,
	initialValue?: TDefault
) => {
	if (!isFn(callbackfn) || (!hasObject(obj) && !hasArray(obj))) return initialValue;

	// 数组执行，按正常操作
	if (isArray(obj)) {
		return obj.reduce((pre, curr, index) => callbackfn(pre, curr, index, obj), initialValue);
	} else {
		const data = obj as Dict;
		return Object.keys(data).reduce(
			(pre, curr) => callbackfn(pre!, data[curr], curr, obj),
			initialValue
		);
	}
};

/**
 * 迭代计算
 * @param obj 			要遍历的对象或者数组
 * @param value 		获取计算值的方法，参数一：value；参数二：key / index；参数三：对象本身。如果获取的非数值，则返回 defaultValue
 * @param math 			计算方法，最大值，最小值，总和，平均值。默认为总和
 * @param defaultValue 	当 value 分析非有效数值时，使用默认值，如果未设置则 min 取 Number.MAX_SAFE_INTEGER，max 取 Number.MIN_SAFE_INTEGER，其他情况取 0
 */
export const math = (
	obj: Dict | any[],
	value: (value: any, key: string | number, obj: any) => number,
	math: 'max' | 'min' | 'sum' | 'avg' = 'sum',
	defaultValue?: number | undefined
) => {
	if (!isFn(value)) return undefined;

	// 初始值
	const def =
		math === 'min' ? Number.MAX_SAFE_INTEGER : math === 'max' ? Number.MIN_SAFE_INTEGER : 0;
	const defValue = isNil(defaultValue) ? def : defaultValue;

	// 迭代计算
	const ret = reduce(
		obj,
		(pre, curr, index) => {
			let val = value(curr, index, obj);
			!isNumber(val) && (val = defValue);

			return math === 'min'
				? Math.min(pre, val)
				: math === 'max'
				? Math.max(pre, val)
				: pre + val;
		},
		def
	);

	// 平均值需要单独处理
	if (math === 'avg') {
		return ret / (isArray(obj) ? obj.length : Object.keys(obj).length);
	} else {
		return ret;
	}
};

/**
 * 测试所有元素是否都能通过指定函数的测试。它返回一个布尔值
 * @param obj 			要遍历的对象或者数组
 * @param callbackfn 	为每个元素执行的函数。
 */
export const every = <T = Dict | any[]>(
	obj: T,
	callbackfn: (element: any, index: number | string, data: T) => boolean
) => {
	if (!isFn(callbackfn) || (!hasObject(obj) && !hasArray(obj))) return false;

	// 数组执行，按正常操作
	if (isArray(obj)) {
		return obj.every((element, index) => callbackfn(element, index, obj));
	} else {
		const data = obj as Dict;
		return Object.keys(data).every((element) => callbackfn(data[element], element, obj));
	}
};

/**
 * 测试所有元素至少有一个元素能通过指定函数的测试。它返回一个布尔值
 * @param obj 			要遍历的对象或者数组
 * @param callbackfn 	为每个元素执行的函数。
 */
export const some = <T = Dict | any[]>(
	obj: T,
	callbackfn: (element: any, index: number | string, data: T) => boolean
) => {
	if (!isFn(callbackfn) || (!hasObject(obj) && !hasArray(obj))) return false;

	// 数组执行，按正常操作
	if (isArray(obj)) {
		return obj.some((element, index) => callbackfn(element, index, obj));
	} else {
		const data = obj as Dict;
		return Object.keys(data).some((element) => callbackfn(data[element], element, obj));
	}
};

///////////////////////////////////////////////////////////////////

/** 将对象转换成数组 */
export const toArray = <TValue, TKey extends string | number | symbol, KResult>(
	obj: Record<TKey, TValue>,
	toItem: (key: TKey, value: TValue) => KResult
) => {
	if (!obj || !isFn(toItem)) return [];

	const entries = Object.entries(obj);
	if (entries.length === 0) return [];

	return entries.reduce((acc, entry) => {
		acc.push(toItem(entry[0] as TKey, entry[1] as TValue));
		return acc;
	}, [] as KResult[]);
};

/**
 * 将对象、数组转换成 html 代码
 * @param value 		需要转换的对象、数组
 * @param maxDeep 		转换最大递归深度，默认 10 层
 * @param skipFunction 	是否过滤函数
 * @param skipEmpty 	忽略空值项目
 * @param skipUnderline 忽略下划线开头的键
 * @param enSort 		结果是否排序
 * @returns 			html 代码字符串
 */
export const toHtml = (
	value: any,
	maxDeep: number = 10,
	skipFunction: boolean = true,
	skipEmpty: boolean = false,
	skipUnderline: boolean = false,
	enSort: boolean = false
) => {
	if (isNil(value) || maxDeep < 1) return '';

	// 空文本直接返回空格，以便空值检测是可以跳过
	if (value === '') return ' ';

	// 是否过滤函数
	if (skipFunction && isFn(value)) return '';

	// 可以循环数据处理
	const ret: string[] = [];
	const isRun = each(value, (obj, key) => {
		if (skipUnderline && key.toString().startsWith('_')) return;

		const type = typeName(obj);

		// 下级内容
		let text = toHtml(obj, maxDeep - 1, skipFunction, skipEmpty, skipUnderline);
		const skip = skipEmpty && !text;
		if (!text) text = `<code title="${type} 空内容" class="text-2">N/A</code>`;

		// 返回结果
		if (!skip) ret.push(`<li><b>${key}</b>：${text}</li>`);
	});

	if (isRun) {
		enSort && ret.sort();

		// 可循环的数据
		return ret.length > 0 ? `<ul>${ret.join('')}</ul>` : '';
	} else {
		// 其他不能循环的数据
		return htmlEncode(String(value));
		// return String(value).replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
	}
};

/**
 * 使用 JSON 反序列化文本为对象，如果原始值本身为对象或者数组则直接返回
 * @param str JSON 字符串
 * @returns
 */
export const toJSON = (source: any) => {
	try {
		const obj = isString(source) ? JSON.parse(source) : source;
		if (isObject(obj) || isArray(obj)) return obj;
	} catch (e) {}

	return undefined;
};

///////////////////////////////////////////////////////////////////

/**
 * 克隆对象
 * @param obj 		目标对象
 * @param deep 		是否深拷贝，默认 true
 */
export const clone = <T>(obj: T, deep = true, hash = new WeakMap()) => {
	// 空对象直接返回
	if (isNil(obj) || typeof obj !== 'object') return obj;

	// 处理日期和正则对象
	if (obj instanceof Date) return new Date(obj);
	if (obj instanceof RegExp) return new RegExp(obj);

	// 处理循环引用
	const key = obj as any;
	if (hash.has(key)) return hash.get(key);

	// 防止循环引用，先赋值空值
	hash.set(key, null);

	/** 获取克隆的值 */
	const _clone_value = <T>(value: T, deep = true): T => (deep ? clone(value, deep, hash) : value);

	/** 创建新对象 */
	const _clone_new = (value: any, args?: any) => {
		var Ctor = value.__proto__.constructor;
		return args ? new Ctor(args) : new Ctor();
	};

	let result = obj as any;

	switch (Object.prototype.toString.call(obj)) {
		case '[object Object]': {
			// 对象类
			const newObj = Object.create(Object.getPrototypeOf(obj));

			for (let i in obj) {
				newObj[i] = _clone_value(obj[i], deep);
			}

			result = newObj;
			break;
		}

		case '[object Array]':
		case '[object Arguments]': {
			// 数组类
			const newObj: any[] = [];
			const oldObj = obj as any[];

			for (let i = 0; i < oldObj.length; i++) {
				newObj.push(_clone_value(oldObj[i], deep));
			}

			result = newObj;
			break;
		}

		case '[object Set]': {
			// Set 对象
			const newObj = _clone_new(obj);

			(obj as any).forEach((value: any) => {
				newObj.add(_clone_value(value, deep));
			});

			result = newObj;
			break;
		}

		case '[object Map]': {
			// Map 对象
			const newObj = _clone_new(obj);

			(obj as any).forEach((value: any, key: any) => {
				newObj.set(key, _clone_value(value, deep));
			});

			result = newObj;
			break;
		}
	}

	// 在有循环引用的情况下，存储对象和克隆的对象
	hash.set(key, result);

	return result;
};

/** 合并对象/数组，第一个参数为原始被合并的对象/数组，后续参数为用于合并的值 */
export const merge = <T = object | Dict | any[]>(...args: T[]): T | undefined => {
	if (args.length < 1) return;

	const _merge = (original: any, resource: any) => {
		if (isObject(original)) {
			// 遍历对象
			const flag = each(
				resource,
				(value, key) => (original[key] = _merge(original[key], value))
			);

			// 未遍历则直接赋值
			if (!flag) original = resource;
		} else if (isArray(resource)) {
			// 数组
			if (isArray(original)) {
				resource.forEach((value: any, index: number) => {
					if (original.length > index) {
						original[index] = _merge(original[index], value);
					} else {
						original.push(value);
					}
				});
			} else {
				original = resource;
			}
		} else {
			original = resource;
		}

		return original;
	};

	let original = args[0];

	for (let index = 1; index < args.length; index++) {
		original = _merge(original, args[index]);
	}

	return original;
};

///////////////////////////////////////////////////////////////////

/**
 * 多层对象转换成单层对象，深层键使用 小数点 间隔
 * @param obj 			要处理的对象
 * @param keepSource	是否同时保留原始对象
 * @returns 			单层对象
 */
export const toSingleObject = (obj: any, keepSource: boolean = false) => {
	const ret: Dict = {};
	_singleObj(ret, obj, '', keepSource);

	return ret;
};

// /**
//  * 多层对象转换成单层对象，深层键使用 小数点 间隔
//  * @param obj 			要处理的对象
//  * @param prefix 		前缀
//  * @param keepSource 	是否保留原始值
//  */
// const _singleObjs = (obj: any, prefix?: string, keepSource: boolean = false) => {
// 	// 空值返回原始内容
// 	if (!hasObject(obj) && !hasArray(obj)) return undefined;

// 	// 前缀，无前缀则无需处理
// 	prefix = prefix ? prefix + '.' : '';

// 	// 返回对象
// 	const ret: Dict = {};

// 	// 递归处理
// 	each(obj, (value, key) => {
// 		// 保持原始内容，且当前为第一级时，记录数据
// 		keepSource && !prefix && (ret[key] = value);

// 		// 对于空白 key 使用上级来创建
// 		let name = prefix! + key;
// 		name.endsWith('.') && (name = name?.substring(0, name.length - 1));

// 		const deepValue = _singleObj(value, name, false);
// 		if (hasObject(deepValue)) {
// 			Object.keys(deepValue).forEach((k) => (ret[k] = deepValue[k]));
// 		} else {
// 			ret[name] = value;
// 		}
// 	});

// 	return ret;
// };

/**
 * 多层对象转换成单层对象，深层键使用 小数点 间隔
 * @param data 			要返回的总数据的对象
 * @param obj 			要处理的对象
 * @param prefix 		前缀
 * @param keepSource 	是否保留原始值
 */
const _singleObj = (data: Dict, obj: any, prefix?: string, keepSource: boolean = false) => {
	if (isObject(obj) || isArray(obj)) {
		each(obj, (value, key) => {
			// 保持原始内容，且当前为第一级时，记录数据
			keepSource && !prefix && (data[key] = value);

			// 下一级前缀
			const name = prefix ? `${prefix}.${key}` : `${key}`;

			// 递归数据
			_singleObj(data, value, name, false);
		});
	} else if (prefix) {
		data[prefix] = obj;
	}
};

/**
 * 将单层对象转换成深层对象，其中包含小数点的键将递归到深层
 * @param obj 			要处理的对象
 * @param keepSource 	是否同时保留原始对象
 * @param keepMainKey 	是否同时保留同名父级键。当出现 a 与 a.b 时，当 b 转换到 a 的对象时会将原始 a 的值覆盖，此时如果保留就使用空白键来避免覆盖
 */
export function toDeepObject(obj: Dict, keepSource: boolean = false, keepMainKey = true) {
	if (!hasObject(obj)) return {};

	// 返回对象
	const ret: Dict = {};
	const keys = Object.keys(obj);

	// 1. 处理所有不带小数点的数据
	keys.filter((key) => !key.includes('.')).forEach((key) => {
		// 如果存在与当前名称一致带小数点的键，则当前数据将会被子项目替换，因此为了防止替换，将当前的值用 空文本 的子键替换
		if (keepMainKey && keys.some((k) => k.startsWith(key + '.'))) {
			ret[key] = { '': obj[key] };
		} else {
			ret[key] = obj[key];
		}
	});

	// 2. 递归所有带小数点数据
	keys.filter((key) => key.includes('.')).forEach((key) => set(ret, key, obj[key]));

	return keepSource ? Object.assign(ret, obj) : ret;
}
