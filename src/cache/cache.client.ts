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
' 	name: cache.client
' 	create: 2023-05-12
' 	memo: 统一缓存操作；客户端使用 localForage；服务端使用内存
' 	
' ------------------------------------------------------------
*/

import { hasArray, isEmpty, isFn } from '../base';
import localforage from 'localforage';
import { CACHE_TIME_MAX } from '../../config';

/** 类型 */
import type ICache from './cache';

/** 默认最大缓存时长(秒) */
const DEFAULT_TIME = CACHE_TIME_MAX * 86400;

/** 缓存数据结构 */
interface ICacheValue {
	data: any;
	last: number;
}

/** 本地缓存 */
export default class implements ICache {
	/** 缓存对象 */
	readonly instance = localforage;

	/** 正在检查缓存 */
	checkStatus = false;

	/**
	 * 获取缓存数据
	 * @param key		键名
	 * @param valueFunc 当值不存在时，返回值的函数
	 * @param delay		缓存时长，单位：秒
	 */
	async get<T>(key: string, valueFunc?: () => T, delay = 0) {
		if (!key) return;

		let value;

		// 客户端，本地数据
		const ret = await this.instance.getItem<ICacheValue>(key);
		if (ret) {
			const last = ret.last;

			if (last === 0 || last >= Date.now()) {
				value = ret.data;
			} else {
				await this.remove(key);
			}
		}

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

		// 异步检查缓存
		this.checkCache();

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
		if (!key) return;

		delay = delay || DEFAULT_TIME;
		delay = delay > 0 ? delay : 0;

		// 客户端，本地数据
		const data: ICacheValue = {
			last: delay > 0 ? Date.now() + delay * 1000 : 0,
			data: value
		};

		await this.instance.setItem(key, data);
	}

	/** 移除缓存 */
	async remove(key: string) {
		if (!key) return;
		await this.instance.removeItem(key);
	}

	/** 清空缓存 */
	async clear() {
		this.instance.clear();
	}

	/** 所有缓存的键 */
	async keys() {
		return await this.instance.keys();
	}

	/** 缓存数量 */
	async length() {
		return await this.instance.length();
	}

	/** 检查并清除无效缓存 */
	async checkCache() {
		if (this.checkStatus) return;

		const cacheKey = '_last_cache_check';

		// 获取最后操作时间
		const last = (await this.instance.getItem<number>(cacheKey)) || 0;

		// 1 小时间前时间
		const exp = Date.now() - 3600000;

		// 1 小时内检查过缓存
		if (last > exp) return;

		// 开始检查缓存
		this.checkStatus = true;

		const keys = await this.instance.keys();
		if (!hasArray(keys)) return;

		// 清除无效缓存
		await Promise.all(keys.map((key) => this.get(key)));

		// 记录最后时间
		await this.instance.setItem(cacheKey, Date.now());
		this.checkStatus = false;
	}
}
