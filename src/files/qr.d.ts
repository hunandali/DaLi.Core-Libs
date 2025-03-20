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
' 	二维码生成类型定义
'
' 	name: files/qr.d
' 	create: 2023-05-12
' 	memo: 二维码生成类型定义
' 	
' ------------------------------------------------------------
*/

declare class QR {
	/** 二维码内容 */
	data: string;

	/** 二维码大小 */
	size: number;

	/** 纠错等级 */
	static errorCorrectLevel: {
		L: number;
		M: number;
		Q: number;
		H: number;
	};

	/** 当前纠错等级 */
	errorCorrectLevel: number;

	/** 前景色 */
	foregroundColor: string;

	/** 背景色 */
	backgroundColor: string;

	/** 前景图片 */
	foregroundImageSrc: string;

	/** 生成二维码 */
	make(): void;

	/** 获取绘制的模块 */
	getDrawModules(): Array<{
		type: 'tile' | 'image';
		x: number;
		y: number;
		width: number;
		height: number;
		color: string;
		imageSrc?: string;
	}>;
}

export = QR;
