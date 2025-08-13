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
 * 	全局控制台输出
 *
 * 	file: global.ts
 * 	time: 2025-08-13 11:25:38
 *
 * ------------------------------------------------------------
 */
/** 常用操作库 */
import { ConsoleEcho } from '.';
import { $Global } from '../base';
import { Action } from '../types';

/** 全局类型申明 */
declare global {
	/** 控制台打印 */
	var con: ConsoleEcho;

	/** 默认控制台调试信息输出 */
	var echo: Action;
}

/** 全局挂载 */
if (!$Global.con) {
	$Global.con = new ConsoleEcho();
	$Global.echo = (...optionalParams: any[]) => $Global.con.debug(...optionalParams);
}
