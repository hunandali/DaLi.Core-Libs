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
' 	常用编码库
'
' 	name: lib.encrypt
' 	create: 2023-11-01
' 	memo: 常用编码库
' 	
' ------------------------------------------------------------
*/

import base64 from './base64';
import md5 from './md5';

/** 对文本进行 base64 编码 */
export const base64Encode = (input: string) => new base64().encode(input);

/** 对 base64 编码后文本进行解码 */
export const base64Decode = (input: string) => new base64().decode(input);

/**
 * 对文本 UTF-8 编码后进行 md5 加密
 * @param str   需要加密的文本
 * @param raw   是否返回文本还是 32 位整型数组
 * @returns     加密后的文本 raw 为 true 时返回 32 位整型数组
 */
export const MD5 = md5;

/**
 * XOR 文本编码
 * @param input 原始文本
 * @param key 加密密钥
 */
export const xor = (input: string, key: string) => {
	let result = '';
	const keyLength = key.length;
	for (let i = 0; i < input.length; i++) {
		// 获取当前字符的 ASCII 码
		const charCode = input.charCodeAt(i);
		// 获取密钥中对应位置的字符的 ASCII 码
		const keyCharCode = key.charCodeAt(i % keyLength);
		// 进行 XOR 操作
		const xorCharCode = charCode ^ keyCharCode;
		// 将结果添加到结果字符串中
		result += String.fromCharCode(xorCharCode);
	}
	return result;
};
