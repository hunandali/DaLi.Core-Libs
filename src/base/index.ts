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
' 	常用基础函数
'
' 	name: base/index
' 	create: 2023-11-02
' 	memo: 常用基础函数
' 	
' ------------------------------------------------------------
*/

/** 常用类型判断 */
export {
	hasArray,
	hasObject,
	hasObjectName,
	hasString,
	isArray,
	isAsync,
	isBoolean,
	isDate,
	isEmpty,
	isFn,
	isNaN,
	isNil,
	isNumber,
	isObject,
	isPrimitive,
	isRegExp,
	isString,
	isSymbol,
	notEmpty,
	typeName
} from './type';

/** 常用值判断 */
export {
	isCar,
	isChinese,
	isEmail,
	isEnglish,
	isEqual,
	isFloat,
	isFullUrl,
	isGuid,
	isHttp,
	isIP,
	isInt,
	isJSON,
	isMatch,
	isMobile,
	isName,
	isPhone,
	isUrl
} from './value';

/** 字符串相关操作 */
export {
	htmlClear,
	htmlEncode,
	htmlSafe,
	string2Value,
	stringClear,
	stringCut,
	template,
	trimEx,
	stringIncludes
} from './string';

/** 数组及对象相关操作 */
export {
	clear,
	clone,
	each,
	eachSync,
	empty,
	every,
	get,
	has,
	math,
	merge,
	reduce,
	remove,
	set,
	some,
	toArray,
	toDeepObject,
	toHtml,
	toJSON,
	toSingleObject
} from './object';

/** 数组操作 */
export {
	empty as arrayEmpty,
	remove as arrayRemove,
	cleanDuplicate,
	compare,
	counting,
	group,
	list,
	range,
	select,
	sort,
	toObject
} from './array';

export { DecimalLength, inRange, number, toDate, toFloat, toInt } from './number';

/** 列表树形数据操作 */
export {
	list2tree,
	listConvert,
	listParents,
	listTop,
	treeConvert,
	treeExecute,
	treeFind,
	treeFindAll,
	treeParents
} from './treeList';

/** 模块加载 */
export { modulesUpdate, modulesUpdateSync } from './modules';

/** 其他相关操作 */
export {
	dateFormat,
	dateLong,
	debounce,
	errorTrace,
	execute,
	fingerprint,
	fnId,
	globalId,
	hash,
	rnd,
	sleep,
	throttle
} from './utils';

/** 获取全局顶级对象 */
export const $Global = (function () {
	if (typeof globalThis !== 'undefined') return globalThis;
	if (typeof self !== 'undefined') return self;
	if (typeof window !== 'undefined') return window;
	if (typeof global !== 'undefined') return global;
	throw new Error('无法获取顶级对象：globalThis');
})();
