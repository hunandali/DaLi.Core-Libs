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
' 	name: cache
' 	create: 2023-05-12
' 	memo: 统一缓存操作；客户端使用 localForage；服务端使用内存
' 	
' ------------------------------------------------------------
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

const cache: ICache = new (SERVERMODE ? cacheServer : cacheClient)();

/** 导出缓存对象 */
export default cache;

/** 全局位创建则获取 */
if (!$Global.$cache) $Global.$cache = cache;
