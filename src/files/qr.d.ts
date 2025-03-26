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
' 	文件相关类型定义
'
' 	name: files/index.d
' 	create: 2023-11-012
' 	memo: 文件相关类型定义
' 	
' ------------------------------------------------------------
*/

/** 二维码参数 */
export interface IQR {
	/** 二维码内容 */
	code?: string;

	/** 二维码尺寸 */
	size?: number;

	/** 纠错级别 */
	level?: QRErrorCorrectLevel;

	/** 二维码颜色 */
	color?: string;

	/** 二维码背景色 */
	backColor?: string;

	/** 是否显示 logo, 或者路径 */
	logo?: boolean | string;
}

/** 二维码纠错等级枚举 */
export enum QRErrorCorrectLevel {
	/** 低级别纠错，约可纠错7%的数据码字 */
	L = 1,
	/** 默认值 */
	M = 0,
	/** 中高级纠错，约可纠错25%的数据码字 */
	Q = 3,
	/** 高级别纠错，约可纠错30%的数据码字 */
	H = 2
}
/**
 * QR8bitByte 类 - 处理8位字节编码
 * 用于将输入数据转换为8位字节序列
 */
declare class QR8bitByte {
	mode: number;
	data: string;
	/**
	 * 构造函数
	 * @param data 要编码的数据
	 */
	constructor(data: string);
	/**
	 * 获取数据长度
	 * @returns 数据长度
	 */
	getLength(): number;
	/**
	 * 将数据写入缓冲区
	 * @param buffer 缓冲区
	 */
	write(buffer: QRBitBuffer): void;
}
/**
 * QRCode 类 - 二维码类
 * 用于生成和管理二维码
 */
export declare class QRCode {
	static PAD0: number;
	static PAD1: number;
	typeNumber: number;
	errorCorrectLevel: QRErrorCorrectLevel;
	modules: boolean[][] | null;
	moduleCount: number;
	dataCache: number[] | null;
	dataList: QR8bitByte[];
	/**
	 * 构造函数
	 * @param typeNumber QR码版本(1-40)，如果 < 1，则自动计算
	 * @param errorCorrectLevel 错误纠正级别
	 */
	constructor(typeNumber: number, errorCorrectLevel: QRErrorCorrectLevel);
	/**
	 * 添加数据
	 * @param data 要添加的字符串数据
	 */
	addData(data: string): void;
	/**
	 * 判断指定坐标的模块是否为暗色
	 * @param row 行坐标
	 * @param col 列坐标
	 * @returns 是否为暗色
	 */
	isDark(row: number, col: number): boolean;
	/**
	 * 获取模块数量
	 * @returns 模块数量
	 */
	getModuleCount(): number;
	/**
	 * 生成QR码
	 */
	make(): void;
	/**
	 * 获取最佳掩码模式
	 * @returns 掩码模式索引
	 */
	getBestMaskPattern(): number;
	/**
	 * 创建Flash动画元素（用于旧版Flash应用）
	 * @param target_mc 目标电影剪辑
	 * @param instance_name 实例名称
	 * @param depth 深度
	 * @returns 电影剪辑对象
	 */
	createMovieClip(target_mc: any, instance_name: string, depth: number): any;
	/**
	 * 内部生成QR码的实现
	 * @param test 是否测试模式
	 * @param maskPattern 掩码模式
	 */
	makeImpl(test: boolean, maskPattern: number): void;
	/**
	 * 设置定位图形
	 * @param row 行起始坐标
	 * @param col 列起始坐标
	 */
	setupPositionProbePattern(row: number, col: number): void;
	/**
	 * 设置时序图形
	 */
	setupTimingPattern(): void;
	/**
	 * 设置校正图形
	 */
	setupPositionAdjustPattern(): void;
	/**
	 * 设置版本信息
	 * @param test 是否测试模式
	 */
	setupTypeNumber(test: boolean): void;
	/**
	 * 设置格式信息
	 * @param test 是否测试模式
	 * @param maskPattern 掩码模式
	 */
	setupTypeInfo(test: boolean, maskPattern: number): void;
	/**
	 * 将数据映射到矩阵
	 * @param data 数据
	 * @param maskPattern 掩码模式
	 */
	mapData(data: number[], maskPattern: number): void;
	/**
	 * 创建QR码数据
	 * @param typeNumber 版本号
	 * @param errorCorrectLevel 错误纠正级别
	 * @param dataList 数据列表
	 * @returns 编码后的数据
	 */
	static createData(
		typeNumber: number,
		errorCorrectLevel: QRErrorCorrectLevel,
		dataList: QR8bitByte[]
	): number[];
	/**
	 * 创建字节数据
	 * @param buffer 比特缓冲区
	 * @param rsBlocks RS块数组
	 * @returns 最终数据
	 */
	static createBytes(buffer: QRBitBuffer, rsBlocks: QRRSBlock[]): number[];
}
/**
 * QRRSBlock 类 - RS块类
 * 用于纠错编码的RS块
 */
declare class QRRSBlock {
	totalCount: number;
	dataCount: number;
	constructor(totalCount: number, dataCount: number);
	static RS_BLOCK_TABLE: number[][];
	/**
	 * 获取指定版本和纠错级别的RS块
	 * @param typeNumber 版本号(1-40)
	 * @param errorCorrectLevel 纠错级别
	 * @returns RS块数组
	 */
	static getRSBlocks(typeNumber: number, errorCorrectLevel: QRErrorCorrectLevel): QRRSBlock[];
	/**
	 * 获取RS块表
	 * @param typeNumber 版本号
	 * @param errorCorrectLevel 纠错级别
	 * @returns RS块参数
	 */
	static getRsBlockTable(
		typeNumber: number,
		errorCorrectLevel: QRErrorCorrectLevel
	): number[] | undefined;
}
/**
 * QRBitBuffer 类 - 比特流缓冲区
 * 用于存储和管理二维码数据的位流
 */
declare class QRBitBuffer {
	buffer: number[];
	length: number;
	constructor();
	/**
	 * 获取指定位置的位值
	 * @param index 位索引
	 * @returns 位值(true/false)
	 */
	get(index: number): boolean;
	/**
	 * 在缓冲区中放入指定长度的数值
	 * @param num 数值
	 * @param length 位长度
	 */
	put(num: number, length: number): void;
	/**
	 * 获取缓冲区的位长度
	 * @returns 比特数
	 */
	getLengthInBits(): number;
	/**
	 * 在缓冲区中放入单个位
	 * @param bit 位值
	 */
	putBit(bit: boolean): void;
}

/** 画布上下文接口 */
export interface CanvasContext extends CanvasRenderingContext2D {
	setFillStyle?: (color: string) => void;
	setFontSize?: (fontSize: number) => void;
	setTextAlign?: (align: CanvasTextAlign) => void;
	setTextBaseline?: (textBaseline: CanvasTextBaseline) => void;
	setGlobalAlpha?: (alpha: number) => void;
	setStrokeStyle?: (color: string) => void;
	setShadow?: (offsetX: number, offsetY: number, blur: number, color: string) => void;
	draw?: (reserve?: boolean, callback?: () => void) => void;
}
/** 绘制模块接口 */
export interface DrawModule {
	name: string;
	type: string;
	x: number;
	y: number;
	width: number;
	height: number;
	[key: string]: any;
}
/** 二维码模块单元格接口定义 */
export interface QRModule {
	/** 模块类型数组 */
	type: string[];
	/** 模块颜色 */
	color: string;
	/** 是否为黑色模块 */
	isBlack: boolean;
	/** 是否已绘制 */
	isDrawn: boolean;
	/** 目标X坐标 */
	destX: number;
	/** 目标Y坐标 */
	destY: number;
	/** 目标宽度 */
	destWidth: number;
	/** 目标高度 */
	destHeight: number;
	/** X坐标 */
	x: number;
	/** Y坐标 */
	y: number;
	/** 宽度 */
	width: number;
	/** 高度 */
	height: number;
	/** 上内边距 */
	paddingTop: number;
	/** 右内边距 */
	paddingRight: number;
	/** 下内边距 */
	paddingBottom: number;
	/** 左内边距 */
	paddingLeft: number;
}

/** 二维码实例配置接口 */
export interface QRCodeOptions {
	/** 二维码文本内容，优先于 data */
	text?: string;
	/** 二维码对应内容 */
	data?: string | number;
	/** 数据编码，默认utf16to8，设为false则传入原始data */
	dataEncode?: boolean;
	/** 二维码大小 */
	size?: number;
	/** 使用动态尺寸，自动计算每一个小方块尺寸为整数 */
	useDynamicSize?: boolean;
	/** 二维码版本，-1为自动计算 */
	typeNumber?: number;
	/** 纠错等级 */
	errorCorrectLevel?: number;
	/** 二维码外边距 */
	margin?: number;
	/** 二维码绘制区域颜色、底部背景色 */
	areaColor?: string;
	/** 背景色 */
	backgroundColor?: string;
	/** 背景图片地址 */
	backgroundImageSrc?: string;
	/** 背景图片宽度，默认与size同宽 */
	backgroundImageWidth?: number;
	/** 背景图片高度，默认与size同高 */
	backgroundImageHeight?: number;
	/** 背景图片位置X坐标，默认0 */
	backgroundImageX?: number;
	/** 背景图片位置Y坐标，默认0 */
	backgroundImageY?: number;
	/** 背景图片透明度，默认不透明 */
	backgroundImageAlpha?: number;
	/** 背景图片圆角，默认不是圆角 */
	backgroundImageBorderRadius?: number;
	/** 背景码点内边距，系数：0.0-1.0 */
	backgroundPadding?: number;
	/** 前景色 */
	foregroundColor?: string;
	/** 前景图片地址 */
	foregroundImageSrc?: string;
	/** 前景图片宽度，默认为size的1/4 */
	foregroundImageWidth?: number;
	/** 前景图片高度，默认为size的1/4 */
	foregroundImageHeight?: number;
	/** 前景图片位置X坐标，默认在画布中间位置 */
	foregroundImageX?: number;
	/** 前景图片位置Y坐标，默认在画布中间位置 */
	foregroundImageY?: number;
	/** 前景图边距填充 */
	foregroundImagePadding?: number;
	/** 前景图背景颜色 */
	foregroundImageBackgroundColor?: string;
	/** 前景图边界圆角 */
	foregroundImageBorderRadius?: number;
	/** 前景图阴影水平偏移值 */
	foregroundImageShadowOffsetX?: number;
	/** 前景图阴影垂直偏移值 */
	foregroundImageShadowOffsetY?: number;
	/** 前景图阴影模糊度 */
	foregroundImageShadowBlur?: number;
	/** 前景图阴影颜色 */
	foregroundImageShadowColor?: string;
	/** 前景码点内边距，0.0-1.0 */
	foregroundPadding?: number;
	/** 定位角区域背景色，默认值跟随背景色 */
	positionProbeBackgroundColor?: string;
	/** 定位角码点颜色，默认值跟随前景色 */
	positionProbeForegroundColor?: string;
	/** 分割区域颜色，默认值跟随背景色 */
	separatorColor?: string;
	/** 对齐区域背景色，默认值跟随背景色 */
	positionAdjustBackgroundColor?: string;
	/** 对齐码点颜色，默认值跟随前景色 */
	positionAdjustForegroundColor?: string;
	/** 时序区域背景色，默认值跟随背景色 */
	timingBackgroundColor?: string;
	/** 时序码点颜色，默认值跟随前景色 */
	timingForegroundColor?: string;
	/** 版本信息区域背景色，默认值跟随背景色 */
	typeNumberBackgroundColor?: string;
	/** 版本信息码点颜色，默认值跟随前景色 */
	typeNumberForegroundColor?: string;
	/** 暗块颜色，默认值跟随前景色 */
	darkBlockColor?: string;
}
/**
 * 插件类型
 * - instance: _当前 QRCode 实例_
 * - options: _实例属性_
 * - isInstance: _是否来自实例注册，`false` 表示为通过 `UQRCode.use` 全局注册，`true` 表示仅当前实例注册_
 */
export type QRPlugin = (instance: UQRCode, options: QRCodeOptions, isInstance: boolean) => void;

/**
 * 二维码生成器类
 * 用于生成和绘制二维码，支持自定义样式和图片
 */
export default class UQRCode {
	/** 当前错误消息 */
	errorMessage: string;
	/** 二维码内容 */
	data: string;
	/** 二维码大小 */
	size: number;
	/** 数据编码，默认utf16to8，设为false则传入原始data，如有特殊的编码需求，可以将其设为false，再将数据编码后传入data */
	dataEncode: boolean;
	/** 使用动态尺寸，自动计算每一个小方块尺寸为整数，因为canvas特性，小数点部分会被绘制为透明渐变色，绘制后看起来像是有白色细线，计算为整数则可以解决这个问题，但是实际尺寸已不是原尺寸，canvas的尺寸需要通过获取dynamicSize后重新设置 */
	useDynamicSize: boolean;
	/** 动态尺寸 */
	dynamicSize: number;
	/** 二维码版本，-1为自动计算，自动计算字符越多，版本越高 */
	typeNumber: number;
	/** 纠错等级 */
	errorCorrectLevel: QRErrorCorrectLevel;
	/** 二维码外边距 */
	margin: number;
	/** 二维码绘制区域颜色、底部背景色 */
	areaColor: string;
	/** 背景色 */
	backgroundColor: string;
	/** 背景图片地址 */
	backgroundImageSrc?: string | undefined;
	/** 背景图片宽度 */
	private backgroundImageWidth?: number | undefined;
	/** 背景图片高度 */
	backgroundImageHeight?: number | undefined;
	/** 背景图片X坐标 */
	backgroundImageX?: number | undefined;
	/** 背景图片Y坐标 */
	backgroundImageY?: number | undefined;
	/** 背景图片透明度，默认不透明 */
	backgroundImageAlpha: number;
	/** 背景图片圆角，默认不是圆角 */
	backgroundImageBorderRadius: number;
	/** 背景码点内边距，系数：0.0-1.0 */
	backgroundPadding: number;
	/** 前景色 */
	foregroundColor: string;
	/** 前景图片地址 */
	foregroundImageSrc?: string | undefined;
	/** 前景图片宽度 */
	foregroundImageWidth?: number | undefined;
	/** 前景图片高度 */
	foregroundImageHeight?: number | undefined;
	/** 前景图片X坐标 */
	foregroundImageX?: number | undefined;
	/** 前景图片Y坐标 */
	foregroundImageY?: number | undefined;
	/** 前景图边距填充 */
	foregroundImagePadding: number;
	/** 前景图背景颜色 */
	foregroundImageBackgroundColor: string;
	/** 前景图边界圆角 */
	foregroundImageBorderRadius: number;
	/** 前景图阴影水平偏移值 */
	foregroundImageShadowOffsetX: number;
	/** 前景图阴影垂直偏移值 */
	foregroundImageShadowOffsetY: number;
	/** 前景图阴影模糊度 */
	foregroundImageShadowBlur: number;
	/** 前景图阴影颜色 */
	foregroundImageShadowColor: string;
	/** 前景码点内边距，0.0-1.0 */
	foregroundPadding: number;
	/** 定位角区域背景色，默认值跟随背景色 */
	positionProbeBackgroundColor?: string | undefined;
	/** 定位角码点颜色，默认值跟随背景色 */
	positionProbeForegroundColor?: string | undefined;
	/** 分割区域颜色，默认值跟随背景色 */
	separatorColor?: string | undefined;
	/** 对齐区域背景色，默认值跟随背景色 */
	positionAdjustBackgroundColor?: string | undefined;
	/** 对齐码点颜色，默认值跟随前景色 */
	positionAdjustForegroundColor?: string | undefined;
	/** 时序区域背景色，默认值跟随背景色 */
	timingBackgroundColor?: string | undefined;
	/** 时序码点颜色，默认值跟随前景色 */
	timingForegroundColor?: string | undefined;
	/** 版本信息区域背景色，默认值跟随背景色 */
	typeNumberBackgroundColor?: string | undefined;
	/** 版本信息码点颜色，默认值跟随前景色 */
	typeNumberForegroundColor?: string | undefined;
	/** 暗块颜色，默认值跟随前景色 */
	darkBlockColor?: string | undefined;
	/** 二维码基本对象，通过实例化QRCode类并调用make后得到 */
	base: QRCode | undefined;
	/** 二维码模块数据，基于base的modules但数据格式不一致，这里的modules是定制过的 */
	modules: QRModule[][];
	/** 模块数量 */
	moduleCount: number;
	/** 绘制模块，层级：最底层 -> 绘制区域 -> 背景图片 -> 背景|前景 -> 前景图片 -> 最顶层 */
	drawModules: DrawModule[];
	/** 画布上下文 */
	canvasContext: CanvasContext;
	/** ctx.draw保留绘制，本次绘制是否接着上一次绘制，2d没有draw方法，所以2d该属性对2d无效 */
	drawReserve: boolean;
	/** 制作完成标志 */
	isMaked: boolean;
	/** 插件集合 */
	static plugins: QRPlugin[];
	/**
	 * 全局扩展插件方法
	 * @param plugin 插件函数
	 */
	static use(plugin: QRPlugin): void;
	/**
	 * 构造函数
	 * @param options 配置选项
	 * @param canvasContext canvas上下文
	 */
	constructor(options?: QRCodeOptions, canvasContext?: any);
	/**
	 * 设置选项
	 * @param options 配置选项
	 */
	setOptions(options: QRCodeOptions): void;
	/**
	 * 错误处理
	 * @param msg 错误信息
	 */
	Error(msg: string): void;
	/**
	 * 加载图片
	 * @param src - 图片地址
	 * @returns Promise<any> - 加载完成的图片
	 */
	loadImage(src: string): Promise<string>;
	/**
	 * 制作二维码
	 * 生成二维码数据并进行绘制准备
	 */
	make(): void;
	/**
	 * 获取绘制模块
	 * @returns DrawModule[] - 绘制模块数组
	 */
	getDrawModules(): DrawModule[];
	/**
	 * 判断当前模块是否是黑块（前景部分）
	 * @param rowI - 行索引
	 * @param colI - 列索引
	 * @returns boolean - 是否为黑块
	 */
	isBlack(rowI: number, colI: number): boolean;
	/**
	 * 绘制canvas方法
	 * @param reserve - 是否保留上一次绘制
	 * @returns Promise<void>
	 */
	drawCanvas(reserve?: boolean): Promise<void>;
	/**
	 * 绘制背景图片
	 * @param ctx - 画布上下文
	 * @param drawModule - 绘制模块数据
	 */
	private drawBackgroundImage;
	/**
	 * 绘制前景图片
	 * @param ctx - 画布上下文
	 * @param drawModule - 绘制模块数据
	 */
	private drawForegroundImage;
	/**
	 * 绘制canvas方法，兼容v3.2.0-v3.4.5版本的写法
	 * @param reserve - 是否保留上一次绘制
	 * @returns Promise<void>
	 */
	draw(reserve?: boolean): Promise<void>;
	/**
	 * 注册实例插件
	 * 写扩展插件时需注意，因微信官方旧版Canvas未完全依照Web Canvas API设计，安卓并未兼容，如需要H5和微信小程序旧版Canvas同时兼容，需要在扩展函数里加入这些API的兼容。（如当前未补充的：setLineCap、setTransform、setStrokeStyle等与Web Canvas不一致的API）
	 * @param plugin - 插件函数
	 */
	register(plugin: QRPlugin): void;
}
