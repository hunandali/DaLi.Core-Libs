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
' 	缓存操作
'
' 	name: cache.server
' 	create: 2023-05-12
' 	memo: 统一缓存操作；客户端使用 localForage；服务端使用内存
' 	
' ------------------------------------------------------------
*/

import { isEmpty, isFn } from '../base';
import lur from '../LUR';
import { CACHE_TIME_MAX } from '../../config';

/** 类型 */
import type ICache from './cache';

/** 默认最大缓存时长(秒) */
const DEFAULT_TIME = CACHE_TIME_MAX * 86400;

/** 最大缓存 1000 个项目 */
const DEFAULT_COUNT = 10000;

/** 内存缓存 */
export default class implements ICache {
	/** LUR 缓存对象，最大缓存 1000 个项目 */
	readonly instance = new lur(DEFAULT_COUNT);

	/**
	 * 获取缓存数据
	 * @param key		键名
	 * @param valueFunc 当值不存在时，返回值的函数
	 * @param delay		缓存时长，单位：秒
	 */
	async get<T>(key: string, valueFunc?: () => T, delay = 0) {
		if (!key) return;

		let value = this.instance.get(key);

		// 值不存在，如果存在值函数，从函数中获取值
		if (isEmpty(value) && isFn(valueFunc)) {
			try {
				value = await valueFunc!();
				await this.set(key, value, delay);
			} catch (e) {
				// 函数执行异常，如 API 401 错误等
				console.error(e);
			}
		}

		// 返回内容
		return value;
	}

	/**
	 * 缓存数据
	 * @param key	键名
	 * @param value	值
	 * @param delay	缓存时长，单位：秒
	 */
	async set<T>(key: string, value: T, delay = 0) {
		delay = delay || DEFAULT_TIME;
		delay = delay > 0 ? delay : 0;

		this.instance.set(key, value, delay);
	}

	/** 移除缓存 */
	async remove(key: string) {
		if (!key) return;
		this.instance.remove(key);
	}

	/** 清空缓存 */
	async clear() {
		this.instance.clear();
	}

	/** 所有缓存的键 */
	async keys() {
		const keys = this.instance.keys();
		return Array.from(keys);
	}

	/** 缓存数量 */
	async length() {
		return this.instance.length();
	}
}
