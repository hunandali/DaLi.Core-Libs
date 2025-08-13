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
 * 	全局缓存挂载
 *
 * 	file: global.ts
 * 	time: 2025-08-13 10:28:30
 *
 * ------------------------------------------------------------
 */
/** 类型相关操作 */
import { $Global } from '../base';
import { SERVERMODE } from '../../config';

import cacheServer from './cache.server';
import cacheClient from './cache.client';

/** 类型 */
import type ICache from './cache';

/** 全局类型申明 */
declare global {
	var $cache: ICache;
}

(() => {
	let _Cache: ICache;

	const createCache = (): ICache => {
		console.log('初始化缓存对象操作');
		return new (SERVERMODE ? cacheServer : cacheClient)();
	};

	Object.defineProperty($Global, '$cache', {
		configurable: true,
		get() {
			!_Cache && (_Cache = createCache());

			return _Cache;
		}
	});
})();
