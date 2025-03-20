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
' 	全局类型
'
' 	name: types.ts
' 	create: 2023-05-14
' 	memo: 全局类型
' 	
' ------------------------------------------------------------
*/

/////////////////////////////////////////////////////////////////

/** 定义基础字典数据类型 Dict */
export type Dict<T = any> = Record<string, T>;

/** 定义基础字典数据类型 namevalues */
export type NVs = Record<string, string>;

/** 默认带返回函数 */
export type Func<T = any> = (...args: any[]) => T;

/** 默认不带返回函数 */
export type Action = (...args: any[]) => void;

/** 默认异步带返回函数 */
export type AsyncFunc<T = any> = (...args: any[]) => Promise<T>;

/** 默认异步不带返回函数 */
export type AsyncAction = (...args: any[]) => Promise<void>;

/** 可空类型 */
export type Nullable<T> = T | null | undefined;

/////////////////////////////////////////////////////////////////

/** 列表项目结构 */
export interface IList<T = any> extends Dict {
	/** 值 */
	value: T;

	/** 文本 */
	label: string;

	/** 图标 */
	icon?: string;

	/** 禁用 */
	disabled?: boolean;
}

/** 树形数据 */
export interface ITree<T = any> extends IList<T> {
	/** 上级 */
	parent?: ITree<T> | T;

	/** 下级 */
	children?: ITree<T>[];
}

/** 列表对象数据字段映射 */
export interface IListMap {
	/** 值字段 */
	value?: string;

	/** 文本字段 */
	label?: string;

	/** 图标字段 */
	icon?: string;

	/** 禁用字段 */
	disabled?: string;

	/** 禁用是否取反,如果 disabled 字段,未设置此参数是,如果包含 enable 则强制取反 */
	rev?: boolean | undefined;

	/** 值是否为数值,是则需要将值转换成数值 */
	numberValue?: boolean;
}

/** 树形对象数据字段映射 */
export interface ITreeMap extends IListMap {
	/** 上级字段 */
	parent?: string;

	/** 下级字段 */
	children?: string;
}
