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
' 	导出 Excel
'
' 	name: lib.file.excel
' 	create: 2023-08-20
' 	memo: https://github.com/sunhuihuibuhui/JavaScript-export-Excel
' 	
' ------------------------------------------------------------
*/

import { toJSON, hasArray, isString } from '../base';

/**
 * 通过 JSON 数据导出 Excel
 * @param data		要导出的 JSON 数据
 * @param fileName	导出文件名
 * @param title		工作区标题
 * @param filter	过滤字段
 */
export function exportJson(data: any, fileName: string, title: string, filter?: string[]) {
	data = toJSON(data);
	if (!hasArray(data)) return;

	const excel = ['<table>'];

	//设置数据
	for (var i = 0; i < data.length; i++) {
		excel.push('<tr>');

		for (var index in data[i]) {
			// 判断是否有过滤行
			(!filter || filter?.indexOf(index) == -1) && excel.push(`<td>${data[i][index] ?? ''}</td>`);
		}

		excel.push('</tr>');
	}
	excel.push('</table>');

	exportTable(excel.join(''), fileName, title);
}

/**
 * 表格内容导出 Excel
 * @param tableHtml	要导出的表格内容(HTML 代码)
 * @param fileName	导出文件名
 * @param title		工作区标题
 */
export function exportTable(tableHtml: string, fileName: string, title: string) {
	if (!tableHtml || !isString(tableHtml)) return;

	let excelFile =
		"<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
	excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
	excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
	excelFile += '; charset=UTF-8">';
	excelFile += '<head>';
	excelFile += '<!--[if gte mso 9]>';
	excelFile += '<xml>';
	excelFile += '<x:ExcelWorkbook>';
	excelFile += '<x:ExcelWorksheets>';
	excelFile += '<x:ExcelWorksheet>';
	excelFile += '<x:Name>';
	excelFile += title;
	excelFile += '</x:Name>';
	excelFile += '<x:WorksheetOptions>';
	excelFile += '<x:DisplayGridlines/>';
	excelFile += '</x:WorksheetOptions>';
	excelFile += '</x:ExcelWorksheet>';
	excelFile += '</x:ExcelWorksheets>';
	excelFile += '</x:ExcelWorkbook>';
	excelFile += '</xml>';
	excelFile += '<![endif]-->';
	excelFile += '</head>';
	excelFile += '<body>';
	excelFile += tableHtml;
	excelFile += '</body>';
	excelFile += '</html>';

	var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
	var link = document.createElement('a');
	link.href = uri;
	link.setAttribute('style', 'visibility:hidden');
	link.download = fileName + '.xls';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
