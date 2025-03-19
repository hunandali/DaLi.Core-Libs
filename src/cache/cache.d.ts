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
' 	缓存结构
'
' 	name: cache.d
' 	create: 2023-05-12
' 	memo: 缓存结构
' 	
' ------------------------------------------------------------
*/

/** 缓存类结构 */
export default interface ICache {
	/**
	 * 获取缓存数据
	 * @param key		键名
	 * @param valueFunc 当值不存在时，返回值的函数
	 * @param delay		缓存时长，单位：秒
	 */
	get<T>(key: string, valueFunc?: () => T, delay?: number): Promise<T>;

	/**
	 * 缓存数据
	 * @param key	键名
	 * @param value	值
	 * @param delay	缓存时长，单位：秒
	 */
	set<T>(key: string, value: T, delay?: number): Promise<void>;

	/** 移除缓存 */
	remove(key: string): Promise<void>;

	/** 清空缓存 */
	clear(): Promise<void>;

	/** 所有缓存的键 */
	keys(): Promise<string[]>;

	/** 缓存数量 */
	length(): Promise<number>;
}
