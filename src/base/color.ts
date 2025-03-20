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
' 	颜色操作
'
' 	name: base/color
' 	create: 2023-05-11
' 	memo: 颜色操作
' 	
' ------------------------------------------------------------
*/

/** Hex 颜色代码转 rgb */
export function HEX2RGB(hex: string) {
	// const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	// return result && result.length > 3
	// 	? {
	// 			r: parseInt(result[1]!, 16),
	// 			g: parseInt(result[2]!, 16),
	// 			b: parseInt(result[3]!, 16)
	// 	  }
	// 	: null;

	// 将颜色转换为 RGB 格式
	const value = hex.replace(/[^0-9a-f]/gi, '');
	const rgb = parseInt(value, 16);

	return {
		r: (rgb >> 16) & 0xff,
		g: (rgb >> 8) & 0xff,
		b: rgb & 0xff
	};
}

/** rgb 颜色代码转 hex */
export function RGB2HEX(rgb: { r: number; g: number; b: number }) {
	return '#' + ((rgb.r << 16) | (rgb.g << 8) | rgb.b).toString(16).padStart(6, '0').slice(-6);
}

/**
 * 颜色加深
 * @param color 需要加深的颜色
 * @param level 颜色加深程度，取值范围为 [0, 1]
 * @returns 	加深后的颜色
 */
export function darken(color: string, level: number): string {
	// 将颜色转换为 RGB 格式
	const rgb = HEX2RGB(color);
	if (!rgb) return color;

	// 计算加深后的颜色值
	rgb.r = Math.round((1 - level) * rgb.r);
	rgb.g = Math.round((1 - level) * rgb.g);
	rgb.b = Math.round((1 - level) * rgb.b);

	return RGB2HEX(rgb);
}
/**
 * 颜色减淡
 * @param color 需要减淡的颜色
 * @param level 颜色减淡程度，取值范围为 [0, 1]
 * @returns 	减淡后的颜色
 */
export function lighten(color: string, level: number): string {
	// 将颜色转换为 RGB 格式
	const rgb = HEX2RGB(color);
	if (!rgb) return color;

	// 计算减淡后的颜色值
	rgb.r = Math.round(level * (255 - rgb.r) + rgb.r);
	rgb.g = Math.round(level * (255 - rgb.g) + rgb.g);
	rgb.b = Math.round(level * (255 - rgb.b) + rgb.b);

	return RGB2HEX(rgb);
}
