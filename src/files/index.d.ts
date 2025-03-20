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
	level?: 'L' | 'M' | 'Q' | 'H' | 1 | 0 | 3 | 2;

	/** 二维码颜色 */
	color?: string;

	/** 二维码背景色 */
	backColor?: string;

	/** 是否显示 logo, 或者路径 */
	logo?: boolean | string;
}
