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
' 	文件相关库
'
' 	name: files/index
' 	create: 2023-11-012
' 	memo: 文件相关库
' 	
' ------------------------------------------------------------
*/

import { hasObject } from '../base';

/** excel 相关操作 */
export { exportJson as excelJson, exportTable as excelTable } from './excel';

/** Json 操作 */
export { download as jsonDownload } from './json';

/** 二维码对象 */
import type { IQR } from './index.d';

import _QR from './qr.js';
export const QR = _QR;

/**
 * 创建 QR 对象,后续需要进一步处理
 * 具体请参考 https://uqrcode.cn/doc/
 */
export function QRObject(params: IQR) {
	/** 无效参数 */
	if (!params || !hasObject(params) || !params.code) return;

	/** 尺寸 */
	if (!params.size || params.size < 1) params.size = 200;

	// 获取uQRCode实例
	const qr = new QR();

	// 设置二维码内容
	qr.data = params.code;

	// 设置二维码大小，必须与canvas设置的宽高一致
	qr.size = params.size;

	/** 纠错等级,默认为H */
	params.level === 'L' || params.level == 1
		? (qr.errorCorrectLevel = QR.errorCorrectLevel.L)
		: params.level === 'Q' || params.level == 3
		? (qr.errorCorrectLevel = QR.errorCorrectLevel.Q)
		: params.level === 'M' || params.level == 0
		? (qr.errorCorrectLevel = QR.errorCorrectLevel.M)
		: (qr.errorCorrectLevel = QR.errorCorrectLevel.H);

	params.color && (qr.foregroundColor = params.color);
	params.backColor && (qr.backgroundColor = params.backColor);

	// LOGO
	let logo = '';
	if (!!params.logo) {
		logo = params.logo.toString();

		// xxx.png 或 data:image/svg+xml;
		if (logo.indexOf('.') < 1 && logo.indexOf(':') < 1) logo = '/logo.png';
	}

	// 设置二维码前景图，可以是路径
	// @ts-ignore
	logo && (qr.foregroundImageSrc = logo);

	// logo &&
	// 	(qr.foregroundImageSrc =
	// 		'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgc3R5bGU9ImJhY2tncm91bmQ6ICNGRkZGRkYiPjxwYXRoIGQ9Ik03ODguNzUwMDggMzkwLjcwMzM2TDcwOS41ODg0OCA0NC43NjY3MmwtOC4wNzU1MiA0Ljg4OTYtNTY0LjYzMzYgMzQxLjkxODcyIDMyMi42NzM5MiA1ODYuMzM0NzIgMjI1LjUzODU2LTI0Ny4zMzU2OGgyNC44MDM4NGwtMjYyLjcwNzIgMjkzLjQyNDY0TDcyLjM3ODg4IDM3NC44MDk2IDcyMS41NjkyOCAwbDg1LjgxODg4IDM5MC43MDMzNmgtMTguNjM2OHogbS02MjYuODU5NTIgNy4zNjUxMkw3MDQuNjU2NjQgNjMuMTc1NjhsNzYuMjIxNDQgMzI3LjUyNzY4aC0yMi4wMDcwNEw2OTEuMjU4ODggMTEzLjExNDg4IDIyNS43MzE4NCA0MTQuNjEzNzZsMjUyLjYyMDggNDkzLjA3Nzc2IDE2Ni4yODk5Mi0xNzcuMTE3NDRoMjkuODcwMDhjLTg2LjQ0NjA4IDk0LjA3NDg4LTE4My41ODUyOCAxOTkuNzgyNC0yMDkuODg4IDIyOC40MDgzMkwxNjEuODkwNTYgMzk4LjA2ODQ4eiIgZmlsbD0iIzAwNUVBNyI+PC9wYXRoPjxwYXRoIGQ9Ik01NDYuOTUwNCA2OTMuNjcwNGwtNjguOTg2ODgtMjI0LjEwNDk2IDYuMjM2MTYgMC4xMzA1NiA0MzYuMDUxMiA5LjExMzYgOS4wNjYyNCA0NDIuMTEwNzItMjEwLjc2NDgtNjcuMDIyMDgtMTQuMTk1MiA4LjE5NTg0IDI0Ny4yNjI3MiA4MS4xMTM2VjQ0Ny45MDRINDU2LjMxODcybDc5Ljk2OTI4IDI1MS45MjE5MiAxMC42NjI0LTYuMTU2OHogbTM2MS4xMzQwOC0yMDIuODg1MTJjLTc3LjE4MDE2LTIuMjU1MzYtNDIxLjIxNzI4LTEyLjMxNjE2LTQyMS4yMTcyOC0xMi4zMTYxNmw2NC41OTEzNiAyMTIuNTk3NzYgMTIuNTkxMzYtNy4yNzE2OC01My4wMTYzMi0xODEuMTc2MzIgMzY1Ljk4NTI4IDE4LjcyNzY4IDE4LjM0MzY4IDM2NS42MDY0LTE1My42Njc4NC00Ni40MTY2NC0xNy4wOTE4NCA5Ljg2ODggMTk1LjU1ODQgNjEuMzU4MDhzLTkuOTUyLTM0Ni44NDE2LTEyLjA3NjgtNDIwLjk3NzkyeiIgZmlsbD0iI0YwODMyMSI+PC9wYXRoPjwvc3ZnPg==');

	// 调用制作二维码方法
	qr.make();

	return qr;
}

/**
 * 创建二维码图片
 * 具体请参考 https://uqrcode.cn/doc/
 */
export function QRCreate(params: IQR) {
	const qr = QRObject(params);
	if (!qr) return '';

	// 获取绘制的模块
	const drawModules = qr.getDrawModules();

	// 遍历 drawModules 创建 svg 元素
	const svg = [
		`<svg width="${params.size}" height="${params.size}" xmlns="http://www.w3.org/2000/svg" version="1.1">`
	];

	for (var i = 0; i < drawModules.length; i++) {
		var drawModule = drawModules[i];
		switch (drawModule.type) {
			case 'tile':
				/* 绘制小块 */
				svg.push(
					`<rect x="${drawModule.x}" y="${drawModule.y}" width="${
						drawModule.width + 0.5
					}" height="${drawModule.height + 0.5}" style="fill: ${drawModule.color};" />`
				);
				break;

			case 'image':
				/* 绘制小块 */
				svg.push(
					`<rect x="${drawModule.x - 5}" y="${drawModule.y - 5}" width="${
						drawModule.width + 10
					}" height="${drawModule.height + 10}" rx="10"  style="fill:white;" />`
				);

				/* 绘制图像 */
				svg.push(
					`<image href="${drawModule.imageSrc}" x="${drawModule.x}" y="${drawModule.y}" width="${drawModule.width}" height="${drawModule.height}" />`
				);
				break;
		}
	}

	svg.push('</svg>');

	return svg.join('');
}
