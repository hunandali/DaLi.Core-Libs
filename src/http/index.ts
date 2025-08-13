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

import { createHttp as createHttpInstance } from './hook';
import { HttpClient } from './types';

// 调试配置
export { HTTP_DEBUG } from './hook';

// 全局实例
export * from './types';

let http: HttpClient;

// 创建自定义实例
export const createHttp = () => {
	if (!http) http = createHttpInstance();
	return http;
};

// // 全局实例
// export const http = createHttp();
// $Global.$http = http;
