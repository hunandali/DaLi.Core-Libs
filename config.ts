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

/** 默认 Logo */
export const LOGO =
	'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgc3R5bGU9ImJhY2tncm91bmQ6ICNGRkZGRkYiPjxwYXRoIGQ9Ik03ODguNzUwMDggMzkwLjcwMzM2TDcwOS41ODg0OCA0NC43NjY3MmwtOC4wNzU1MiA0Ljg4OTYtNTY0LjYzMzYgMzQxLjkxODcyIDMyMi42NzM5MiA1ODYuMzM0NzIgMjI1LjUzODU2LTI0Ny4zMzU2OGgyNC44MDM4NGwtMjYyLjcwNzIgMjkzLjQyNDY0TDcyLjM3ODg4IDM3NC44MDk2IDcyMS41NjkyOCAwbDg1LjgxODg4IDM5MC43MDMzNmgtMTguNjM2OHogbS02MjYuODU5NTIgNy4zNjUxMkw3MDQuNjU2NjQgNjMuMTc1NjhsNzYuMjIxNDQgMzI3LjUyNzY4aC0yMi4wMDcwNEw2OTEuMjU4ODggMTEzLjExNDg4IDIyNS43MzE4NCA0MTQuNjEzNzZsMjUyLjYyMDggNDkzLjA3Nzc2IDE2Ni4yODk5Mi0xNzcuMTE3NDRoMjkuODcwMDhjLTg2LjQ0NjA4IDk0LjA3NDg4LTE4My41ODUyOCAxOTkuNzgyNC0yMDkuODg4IDIyOC40MDgzMkwxNjEuODkwNTYgMzk4LjA2ODQ4eiIgZmlsbD0iIzAwNUVBNyI+PC9wYXRoPjxwYXRoIGQ9Ik01NDYuOTUwNCA2OTMuNjcwNGwtNjguOTg2ODgtMjI0LjEwNDk2IDYuMjM2MTYgMC4xMzA1NiA0MzYuMDUxMiA5LjExMzYgOS4wNjYyNCA0NDIuMTEwNzItMjEwLjc2NDgtNjcuMDIyMDgtMTQuMTk1MiA4LjE5NTg0IDI0Ny4yNjI3MiA4MS4xMTM2VjQ0Ny45MDRINDU2LjMxODcybDc5Ljk2OTI4IDI1MS45MjE5MiAxMC42NjI0LTYuMTU2OHogbTM2MS4xMzQwOC0yMDIuODg1MTJjLTc3LjE4MDE2LTIuMjU1MzYtNDIxLjIxNzI4LTEyLjMxNjE2LTQyMS4yMTcyOC0xMi4zMTYxNmw2NC41OTEzNiAyMTIuNTk3NzYgMTIuNTkxMzYtNy4yNzE2OC01My4wMTYzMi0xODEuMTc2MzIgMzY1Ljk4NTI4IDE4LjcyNzY4IDE4LjM0MzY4IDM2NS42MDY0LTE1My42Njc4NC00Ni40MTY2NC0xNy4wOTE4NCA5Ljg2ODggMTk1LjU1ODQgNjEuMzU4MDhzLTkuOTUyLTM0Ni44NDE2LTEyLjA3NjgtNDIwLjk3NzkyeiIgZmlsbD0iI0YwODMyMSI+PC9wYXRoPjwvc3ZnPg==';

/** 是否调试模式 */
export const DEBUG = process.env.NODE_ENV !== 'production';

/** 是否测试环境 */
export const TEST = process.env.NODE_ENV === 'test';

/** 是否服务器端运行 */
export const SERVERMODE = typeof window === 'undefined';

/** 窗口调整尺寸防抖时间 (ms) */
export const DEBOUNCE_WINDOW_RESIZE = 300;

/**
 * 默认缓存最大时长(天)
 * 注意：服务端的缓存位于内容中；客户端的缓存使用 localforage
 */
export const CACHE_TIME_MAX = SERVERMODE ? 5 : 30;
