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
export * from './type';

/** 常用值判断 */
export * from './value';

/** 字符串相关操作 */
export * from './string';

/** 数组及对象相关操作 */
export * from './object';

/** 数组操作 */
export * from './array';

export * from './number';

/** 列表树形数据操作 */
export * from './treeList';

/** 模块加载 */
export * from './modules';

/** 其他相关操作 */
export * from './utils';

/** 常用 Emoji 正则表达式 */
export * from './emoji';

/** 获取全局顶级对象 */
export const $Global = (function () {
	if (typeof globalThis !== 'undefined') return globalThis;
	if (typeof self !== 'undefined') return self;
	if (typeof window !== 'undefined') return window;
	if (typeof global !== 'undefined') return global;
	throw new Error('无法获取顶级对象：globalThis');
})();
