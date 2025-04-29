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
' 	全局导入
'
' 	name: index
' 	create: 2025-03-21
' 	memo: 全局导入
' 	
' ------------------------------------------------------------
*/

import { $Global } from '../base';
import { createHttp } from './hook';

// 调试配置
export { HTTP_DEBUG } from './hook';

// 创建自定义实例
export const createHttpInstance = createHttp;

// 全局实例
export const http = createHttp();
export * from './types';

// 全局实例
$Global.$http = http;
