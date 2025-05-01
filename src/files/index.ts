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

import { hasObject, hasString } from '../base';

/** excel 相关操作 */
export { exportJson as excelJson, exportTable as excelTable } from './excel';

/** Json 操作 */
export * from './json';

/** 二维码对象 */
import { IQR, QRErrorCorrectLevel } from './qr.d';
export * from './qr.d';

import _QR from './qr';
import { LOGO } from '../../config';
export const QR = _QR;

/**
 * 创建 QR 对象,后续需要进一步处理
 * 具体请参考 https://uqrcode.cn/doc/
 */
export async function QRObject(params: IQR) {
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
	qr.errorCorrectLevel = params.level || QRErrorCorrectLevel.H;
	// params.level === 'L' || params.level == 1
	// 	? (qr.errorCorrectLevel = 1)
	// 	: params.level === 'Q' || params.level == 3
	// 	? (qr.errorCorrectLevel = 3)
	// 	: params.level === 'M' || params.level == 0
	// 	? (qr.errorCorrectLevel = 0)
	// 	: (qr.errorCorrectLevel = 2);

	params.color = params.color || '#000000';
	params.backColor = params.backColor || '#FFFFFF';

	qr.foregroundColor = params.reserve ? params.backColor : params.color;
	qr.backgroundColor = params.reserve ? params.color : params.backColor;
	// qr.foregroundImageBackgroundColor = params.logoColor || params.backColor;

	/**
	 * **LOGO 处理**
	 * 1. false 不显示
	 * 2. true 显示默认 LOGO
	 * 3. 图片地址尝试加载并转换成 base64
	 * 4. base64 图片地址，直接显示
	 * 5. 其他情况，不显示
	 */
	let logo = params.logo;
	if (logo === true) {
		logo = LOGO;
	} else if (!logo) {
		logo = false;
	} else {
		// base64 图片数据，直接显示
		// 文件则远程读取
		if (!logo.startsWith('data:image') && logo.indexOf('.') > 0) {
			logo = await remoteFileToBase64(logo, true);
		}
	}

	// logo 存在内容
	if (logo) {
		// 如果容错率太低，可能二维码无法识别
		if (qr.errorCorrectLevel === QRErrorCorrectLevel.L) {
			qr.errorCorrectLevel = QRErrorCorrectLevel.M;
		}

		// 设置二维码前景图
		qr.foregroundImageSrc = logo;
	}

	// 调用制作二维码方法
	qr.make();

	return qr;
}

/**
 * 创建二维码图片
 * 具体请参考 https://uqrcode.cn/doc/
 */
export async function QRCreate(params: IQR) {
	const qr = await QRObject(params);
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

/**
 * 远程读取文件并转换成 base64
 * @param url 文件地址
 * @param onlyImage 是否只处理图片格式，默认 true
 */
export async function remoteFileToBase64(url: string, onlyImage = true): Promise<string> {
	return new Promise(async (resolve, reject) => {
		await fetch(url)
			.then((res) => res.blob())
			.then((blob) => {
				const reader = new FileReader();
				reader.onload = () => {
					if (hasString(reader.result)) {
						const data = reader.result as string;
						if (data.startsWith('data:')) {
							if (!onlyImage || data.startsWith('data:image')) {
								return resolve(data);
							}
						}
					}

					reject(new Error('文件无效或者获取失败'));
				};

				reader.onerror = () => {
					reject(reader.error || new Error('文件转换成 base64 格式失败'));
				};

				reader.readAsDataURL(blob);
			})
			.catch(() => {
				reject('无法读取远程文件');
			});
	});
}
