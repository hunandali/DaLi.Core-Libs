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
' 	应用全局基础参数
'
' 	name: global
' 	create: 2024-03-14
' 	memo: 应用全局基础参数
' 	
' ------------------------------------------------------------
*/

/** 应用信息 */
export {
	title as TITLE,
	name as NAME,
	version as VERSION,
	description as DESCRIPTION,
	homepage as HOMEPAGE
} from './package.json';

/** 是否调试模式 */
export const DEBUG = process.env.NODE_ENV !== 'production';

/** 是否服务器端运行 */
export const SERVERMODE = typeof window === 'undefined';

/** 窗口调整尺寸防抖时间 (ms) */
export const DEBOUNCE_WINDOW_RESIZE = 300;

/**
 * 默认缓存最大时长(天)
 * 注意：服务端的缓存位于内容中；客户端的缓存使用 localforage
 */
export const CACHE_TIME_MAX = SERVERMODE ? 5 : 30;
