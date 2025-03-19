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
' 	导出 JSON 文件
'
' 	name: lib.file.json
' 	create: 2023-08-20
' 	memo: 导出 JSON 文件
' 	
' ------------------------------------------------------------
*/

import { toJSON } from '../base';

/**
 * 将数据转换成 JSON 后下载
 * @param obj 		要下载的数据
 * @param fileName	文件名
 */
export const downloadObject = (obj: any, fileName: string = '结果') => {
	if (!obj) return;

	const code = JSON.stringify(obj, null, '\t');

	const a = document.createElement('a');
	a.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(code));
	a.setAttribute('download', fileName);
	a.style.display = 'none';
	a.click();
};

/**
 * 下载 JSON 数据。
 * 系统将先尝试将 JSON 字符串反序列化对象，无法反序列的 JSON 将无法下载
 * @param json 		JSON 字符串
 * @param fileName	文件名
 */
export const download = (json: string, fileName: string = '结果') => {
	if (!json) return;

	downloadObject(toJSON(json), fileName);
};
