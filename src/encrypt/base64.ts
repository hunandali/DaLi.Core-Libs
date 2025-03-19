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
' 	base64 编码库
'
' 	name: lib.encrypt.base64
' 	create: 2023-05-12
' 	memo: base64 编码
' 	
' ------------------------------------------------------------
*/

export default class {
	private readonly CODE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	/** 对文本进行 base64 加密 */
	encode(input: string) {
		let output = '';
		let chr1: number, chr2: number, chr3: number;
		let enc1: number, enc2: number, enc3: number, enc4: number;
		let i = 0;
		input = this.utf8Encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output + this.CODE.charAt(enc1) + this.CODE.charAt(enc2) + this.CODE.charAt(enc3) + this.CODE.charAt(enc4);
		}
		return output;
	}

	/** 对 base64 文本进行解密 */
	decode(input: string) {
		let output = '';
		let chr1: number, chr2: number, chr3: number;
		let enc1: number, enc2: number, enc3: number, enc4: number;
		let i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
		while (i < input.length) {
			enc1 = this.CODE.indexOf(input.charAt(i++));
			enc2 = this.CODE.indexOf(input.charAt(i++));
			enc3 = this.CODE.indexOf(input.charAt(i++));
			enc4 = this.CODE.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 !== 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 !== 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = this.utf8Decode(output);

		return output;
	}

	/** UTF-8 编码 */
	utf8Encode(input: string): string {
		input = input.replace(/\r\n/g, '\n');

		let utfText = '';
		for (let n = 0; n < input.length; n++) {
			let c = input.charCodeAt(n);
			if (c < 128) {
				utfText += String.fromCharCode(c);
			} else if (c > 127 && c < 2048) {
				utfText += String.fromCharCode((c >> 6) | 192);
				utfText += String.fromCharCode((c & 63) | 128);
			} else {
				utfText += String.fromCharCode((c >> 12) | 224);
				utfText += String.fromCharCode(((c >> 6) & 63) | 128);
				utfText += String.fromCharCode((c & 63) | 128);
			}
		}

		return utfText;
	}

	/** UTF-8 解码 */
	utf8Decode(utfText: string): string {
		let string = '';
		let i = 0;
		let c = 0;
		let c1 = 0;
		let c2 = 0;

		while (i < utfText.length) {
			c = utfText.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if (c > 191 && c < 224) {
				c1 = utfText.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
				i += 2;
			} else {
				c1 = utfText.charCodeAt(i + 1);
				c2 = utfText.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
				i += 3;
			}
		}

		return string;
	}
}
