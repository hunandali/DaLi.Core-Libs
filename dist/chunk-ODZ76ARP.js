import {
  LOGO,
  SERVERMODE,
  cleanDuplicate,
  hasArray,
  hasObject,
  hasString,
  isArray,
  isBoolean,
  isChinese,
  isEmail,
  isEnglish,
  isFn,
  isGuid,
  isHttp,
  isIP,
  isJSON,
  isMobile,
  isName,
  isNil,
  isNumber,
  isObject,
  isPhone,
  isString,
  merge,
  toJSON
} from "./chunk-IESO4G4V.js";

// src/encrypt/base64.ts
var base64_default = class {
  constructor() {
    this.CODE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  }
  /** 对文本进行 base64 加密 */
  encode(input) {
    let output = "";
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    input = this.utf8Encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = (chr1 & 3) << 4 | chr2 >> 4;
      enc3 = (chr2 & 15) << 2 | chr3 >> 6;
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
  decode(input) {
    let output = "";
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = this.CODE.indexOf(input.charAt(i++));
      enc2 = this.CODE.indexOf(input.charAt(i++));
      enc3 = this.CODE.indexOf(input.charAt(i++));
      enc4 = this.CODE.indexOf(input.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
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
  utf8Encode(input) {
    input = input.replace(/\r\n/g, "\n");
    let utfText = "";
    for (let n = 0; n < input.length; n++) {
      let c = input.charCodeAt(n);
      if (c < 128) {
        utfText += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utfText += String.fromCharCode(c >> 6 | 192);
        utfText += String.fromCharCode(c & 63 | 128);
      } else {
        utfText += String.fromCharCode(c >> 12 | 224);
        utfText += String.fromCharCode(c >> 6 & 63 | 128);
        utfText += String.fromCharCode(c & 63 | 128);
      }
    }
    return utfText;
  }
  /** UTF-8 解码 */
  utf8Decode(utfText) {
    let string = "";
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
        string += String.fromCharCode((c & 31) << 6 | c1 & 63);
        i += 2;
      } else {
        c1 = utfText.charCodeAt(i + 1);
        c2 = utfText.charCodeAt(i + 2);
        string += String.fromCharCode((c & 15) << 12 | (c1 & 63) << 6 | c2 & 63);
        i += 3;
      }
    }
    return string;
  }
};

// src/encrypt/md5.ts
var _MD5 = class _MD5 {
  constructor() {
    this._dataLength = 0;
    this._bufferLength = 0;
    this._state = new Int32Array(4);
    this._buffer = new ArrayBuffer(68);
    this._buffer8 = new Uint8Array(this._buffer, 0, 68);
    this._buffer32 = new Uint32Array(this._buffer, 0, 17);
    this.start();
  }
  static md5(str, raw = false) {
    return _MD5.onePassHasher.start().appendStr(str).end(raw);
  }
  static hashAsciiStr(str, raw = false) {
    return _MD5.onePassHasher.start().appendAsciiStr(str).end(raw);
  }
  static _hex(x) {
    const hc = _MD5.hexChars;
    const ho = _MD5.hexOut;
    let n;
    let offset;
    for (let i = 0; i < 4; i += 1) {
      offset = i * 8;
      n = x[i];
      for (let j = 0; j < 8; j += 2) {
        ho[offset + 1 + j] = hc.charAt(n & 15);
        n >>>= 4;
        ho[offset + 0 + j] = hc.charAt(n & 15);
        n >>>= 4;
      }
    }
    return ho.join("");
  }
  static _md5cycle(x, k) {
    let a = x[0];
    let b2 = x[1];
    let c = x[2];
    let d = x[3];
    a += (b2 & c | ~b2 & d) + k[0] - 680876936 | 0;
    a = (a << 7 | a >>> 25) + b2 | 0;
    d += (a & b2 | ~a & c) + k[1] - 389564586 | 0;
    d = (d << 12 | d >>> 20) + a | 0;
    c += (d & a | ~d & b2) + k[2] + 606105819 | 0;
    c = (c << 17 | c >>> 15) + d | 0;
    b2 += (c & d | ~c & a) + k[3] - 1044525330 | 0;
    b2 = (b2 << 22 | b2 >>> 10) + c | 0;
    a += (b2 & c | ~b2 & d) + k[4] - 176418897 | 0;
    a = (a << 7 | a >>> 25) + b2 | 0;
    d += (a & b2 | ~a & c) + k[5] + 1200080426 | 0;
    d = (d << 12 | d >>> 20) + a | 0;
    c += (d & a | ~d & b2) + k[6] - 1473231341 | 0;
    c = (c << 17 | c >>> 15) + d | 0;
    b2 += (c & d | ~c & a) + k[7] - 45705983 | 0;
    b2 = (b2 << 22 | b2 >>> 10) + c | 0;
    a += (b2 & c | ~b2 & d) + k[8] + 1770035416 | 0;
    a = (a << 7 | a >>> 25) + b2 | 0;
    d += (a & b2 | ~a & c) + k[9] - 1958414417 | 0;
    d = (d << 12 | d >>> 20) + a | 0;
    c += (d & a | ~d & b2) + k[10] - 42063 | 0;
    c = (c << 17 | c >>> 15) + d | 0;
    b2 += (c & d | ~c & a) + k[11] - 1990404162 | 0;
    b2 = (b2 << 22 | b2 >>> 10) + c | 0;
    a += (b2 & c | ~b2 & d) + k[12] + 1804603682 | 0;
    a = (a << 7 | a >>> 25) + b2 | 0;
    d += (a & b2 | ~a & c) + k[13] - 40341101 | 0;
    d = (d << 12 | d >>> 20) + a | 0;
    c += (d & a | ~d & b2) + k[14] - 1502002290 | 0;
    c = (c << 17 | c >>> 15) + d | 0;
    b2 += (c & d | ~c & a) + k[15] + 1236535329 | 0;
    b2 = (b2 << 22 | b2 >>> 10) + c | 0;
    a += (b2 & d | c & ~d) + k[1] - 165796510 | 0;
    a = (a << 5 | a >>> 27) + b2 | 0;
    d += (a & c | b2 & ~c) + k[6] - 1069501632 | 0;
    d = (d << 9 | d >>> 23) + a | 0;
    c += (d & b2 | a & ~b2) + k[11] + 643717713 | 0;
    c = (c << 14 | c >>> 18) + d | 0;
    b2 += (c & a | d & ~a) + k[0] - 373897302 | 0;
    b2 = (b2 << 20 | b2 >>> 12) + c | 0;
    a += (b2 & d | c & ~d) + k[5] - 701558691 | 0;
    a = (a << 5 | a >>> 27) + b2 | 0;
    d += (a & c | b2 & ~c) + k[10] + 38016083 | 0;
    d = (d << 9 | d >>> 23) + a | 0;
    c += (d & b2 | a & ~b2) + k[15] - 660478335 | 0;
    c = (c << 14 | c >>> 18) + d | 0;
    b2 += (c & a | d & ~a) + k[4] - 405537848 | 0;
    b2 = (b2 << 20 | b2 >>> 12) + c | 0;
    a += (b2 & d | c & ~d) + k[9] + 568446438 | 0;
    a = (a << 5 | a >>> 27) + b2 | 0;
    d += (a & c | b2 & ~c) + k[14] - 1019803690 | 0;
    d = (d << 9 | d >>> 23) + a | 0;
    c += (d & b2 | a & ~b2) + k[3] - 187363961 | 0;
    c = (c << 14 | c >>> 18) + d | 0;
    b2 += (c & a | d & ~a) + k[8] + 1163531501 | 0;
    b2 = (b2 << 20 | b2 >>> 12) + c | 0;
    a += (b2 & d | c & ~d) + k[13] - 1444681467 | 0;
    a = (a << 5 | a >>> 27) + b2 | 0;
    d += (a & c | b2 & ~c) + k[2] - 51403784 | 0;
    d = (d << 9 | d >>> 23) + a | 0;
    c += (d & b2 | a & ~b2) + k[7] + 1735328473 | 0;
    c = (c << 14 | c >>> 18) + d | 0;
    b2 += (c & a | d & ~a) + k[12] - 1926607734 | 0;
    b2 = (b2 << 20 | b2 >>> 12) + c | 0;
    a += (b2 ^ c ^ d) + k[5] - 378558 | 0;
    a = (a << 4 | a >>> 28) + b2 | 0;
    d += (a ^ b2 ^ c) + k[8] - 2022574463 | 0;
    d = (d << 11 | d >>> 21) + a | 0;
    c += (d ^ a ^ b2) + k[11] + 1839030562 | 0;
    c = (c << 16 | c >>> 16) + d | 0;
    b2 += (c ^ d ^ a) + k[14] - 35309556 | 0;
    b2 = (b2 << 23 | b2 >>> 9) + c | 0;
    a += (b2 ^ c ^ d) + k[1] - 1530992060 | 0;
    a = (a << 4 | a >>> 28) + b2 | 0;
    d += (a ^ b2 ^ c) + k[4] + 1272893353 | 0;
    d = (d << 11 | d >>> 21) + a | 0;
    c += (d ^ a ^ b2) + k[7] - 155497632 | 0;
    c = (c << 16 | c >>> 16) + d | 0;
    b2 += (c ^ d ^ a) + k[10] - 1094730640 | 0;
    b2 = (b2 << 23 | b2 >>> 9) + c | 0;
    a += (b2 ^ c ^ d) + k[13] + 681279174 | 0;
    a = (a << 4 | a >>> 28) + b2 | 0;
    d += (a ^ b2 ^ c) + k[0] - 358537222 | 0;
    d = (d << 11 | d >>> 21) + a | 0;
    c += (d ^ a ^ b2) + k[3] - 722521979 | 0;
    c = (c << 16 | c >>> 16) + d | 0;
    b2 += (c ^ d ^ a) + k[6] + 76029189 | 0;
    b2 = (b2 << 23 | b2 >>> 9) + c | 0;
    a += (b2 ^ c ^ d) + k[9] - 640364487 | 0;
    a = (a << 4 | a >>> 28) + b2 | 0;
    d += (a ^ b2 ^ c) + k[12] - 421815835 | 0;
    d = (d << 11 | d >>> 21) + a | 0;
    c += (d ^ a ^ b2) + k[15] + 530742520 | 0;
    c = (c << 16 | c >>> 16) + d | 0;
    b2 += (c ^ d ^ a) + k[2] - 995338651 | 0;
    b2 = (b2 << 23 | b2 >>> 9) + c | 0;
    a += (c ^ (b2 | ~d)) + k[0] - 198630844 | 0;
    a = (a << 6 | a >>> 26) + b2 | 0;
    d += (b2 ^ (a | ~c)) + k[7] + 1126891415 | 0;
    d = (d << 10 | d >>> 22) + a | 0;
    c += (a ^ (d | ~b2)) + k[14] - 1416354905 | 0;
    c = (c << 15 | c >>> 17) + d | 0;
    b2 += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
    b2 = (b2 << 21 | b2 >>> 11) + c | 0;
    a += (c ^ (b2 | ~d)) + k[12] + 1700485571 | 0;
    a = (a << 6 | a >>> 26) + b2 | 0;
    d += (b2 ^ (a | ~c)) + k[3] - 1894986606 | 0;
    d = (d << 10 | d >>> 22) + a | 0;
    c += (a ^ (d | ~b2)) + k[10] - 1051523 | 0;
    c = (c << 15 | c >>> 17) + d | 0;
    b2 += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
    b2 = (b2 << 21 | b2 >>> 11) + c | 0;
    a += (c ^ (b2 | ~d)) + k[8] + 1873313359 | 0;
    a = (a << 6 | a >>> 26) + b2 | 0;
    d += (b2 ^ (a | ~c)) + k[15] - 30611744 | 0;
    d = (d << 10 | d >>> 22) + a | 0;
    c += (a ^ (d | ~b2)) + k[6] - 1560198380 | 0;
    c = (c << 15 | c >>> 17) + d | 0;
    b2 += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
    b2 = (b2 << 21 | b2 >>> 11) + c | 0;
    a += (c ^ (b2 | ~d)) + k[4] - 145523070 | 0;
    a = (a << 6 | a >>> 26) + b2 | 0;
    d += (b2 ^ (a | ~c)) + k[11] - 1120210379 | 0;
    d = (d << 10 | d >>> 22) + a | 0;
    c += (a ^ (d | ~b2)) + k[2] + 718787259 | 0;
    c = (c << 15 | c >>> 17) + d | 0;
    b2 += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
    b2 = (b2 << 21 | b2 >>> 11) + c | 0;
    x[0] = a + x[0] | 0;
    x[1] = b2 + x[1] | 0;
    x[2] = c + x[2] | 0;
    x[3] = d + x[3] | 0;
  }
  /**
   * Initialise buffer to be hashed
   */
  start() {
    this._dataLength = 0;
    this._bufferLength = 0;
    this._state.set(_MD5.stateIdentity);
    return this;
  }
  // Char to code point to to array conversion:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
  // #Example.3A_Fixing_charCodeAt_to_handle_non-Basic-Multilingual-Plane_characters_if_their_presence_earlier_in_the_string_is_unknown
  /**
   * Append a UTF-8 string to the hash buffer
   * @param str String to append
   */
  appendStr(str) {
    const buf8 = this._buffer8;
    const buf32 = this._buffer32;
    let bufLen = this._bufferLength;
    let code;
    let i;
    for (i = 0; i < str.length; i += 1) {
      code = str.charCodeAt(i);
      if (code < 128) {
        buf8[bufLen++] = code;
      } else if (code < 2048) {
        buf8[bufLen++] = (code >>> 6) + 192;
        buf8[bufLen++] = code & 63 | 128;
      } else if (code < 55296 || code > 56319) {
        buf8[bufLen++] = (code >>> 12) + 224;
        buf8[bufLen++] = code >>> 6 & 63 | 128;
        buf8[bufLen++] = code & 63 | 128;
      } else {
        code = (code - 55296) * 1024 + (str.charCodeAt(++i) - 56320) + 65536;
        if (code > 1114111) {
          throw new Error("Unicode standard supports code points up to U+10FFFF");
        }
        buf8[bufLen++] = (code >>> 18) + 240;
        buf8[bufLen++] = code >>> 12 & 63 | 128;
        buf8[bufLen++] = code >>> 6 & 63 | 128;
        buf8[bufLen++] = code & 63 | 128;
      }
      if (bufLen >= 64) {
        this._dataLength += 64;
        _MD5._md5cycle(this._state, buf32);
        bufLen -= 64;
        buf32[0] = buf32[16];
      }
    }
    this._bufferLength = bufLen;
    return this;
  }
  /**
   * Append an ASCII string to the hash buffer
   * @param str String to append
   */
  appendAsciiStr(str) {
    const buf8 = this._buffer8;
    const buf32 = this._buffer32;
    let bufLen = this._bufferLength;
    let i;
    let j = 0;
    for (; ; ) {
      i = Math.min(str.length - j, 64 - bufLen);
      while (i--) {
        buf8[bufLen++] = str.charCodeAt(j++);
      }
      if (bufLen < 64) {
        break;
      }
      this._dataLength += 64;
      _MD5._md5cycle(this._state, buf32);
      bufLen = 0;
    }
    this._bufferLength = bufLen;
    return this;
  }
  /**
   * Append a byte array to the hash buffer
   * @param input array to append
   */
  appendByteArray(input) {
    const buf8 = this._buffer8;
    const buf32 = this._buffer32;
    let bufLen = this._bufferLength;
    let i;
    let j = 0;
    for (; ; ) {
      i = Math.min(input.length - j, 64 - bufLen);
      while (i--) {
        buf8[bufLen++] = input[j++];
      }
      if (bufLen < 64) {
        break;
      }
      this._dataLength += 64;
      _MD5._md5cycle(this._state, buf32);
      bufLen = 0;
    }
    this._bufferLength = bufLen;
    return this;
  }
  /**
   * Get the state of the hash buffer
   */
  getState() {
    const s = this._state;
    return {
      buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)),
      buflen: this._bufferLength,
      length: this._dataLength,
      state: [s[0], s[1], s[2], s[3]]
    };
  }
  /**
   * Override the current state of the hash buffer
   * @param state New hash buffer state
   */
  setState(state) {
    const buf = state.buffer;
    const x = state.state;
    const s = this._state;
    let i;
    this._dataLength = state.length;
    this._bufferLength = state.buflen;
    s[0] = x[0];
    s[1] = x[1];
    s[2] = x[2];
    s[3] = x[3];
    for (i = 0; i < buf.length; i += 1) {
      this._buffer8[i] = buf.charCodeAt(i);
    }
  }
  /**
   * Hash the current state of the hash buffer and return the result
   * @param raw Whether to return the value as an `Int32Array`
   */
  end(raw = false) {
    const bufLen = this._bufferLength;
    const buf8 = this._buffer8;
    const buf32 = this._buffer32;
    const i = (bufLen >> 2) + 1;
    this._dataLength += bufLen;
    const dataBitsLen = this._dataLength * 8;
    buf8[bufLen] = 128;
    buf8[bufLen + 1] = buf8[bufLen + 2] = buf8[bufLen + 3] = 0;
    buf32.set(_MD5.buffer32Identity.subarray(i), i);
    if (bufLen > 55) {
      _MD5._md5cycle(this._state, buf32);
      buf32.set(_MD5.buffer32Identity);
    }
    if (dataBitsLen <= 4294967295) {
      buf32[14] = dataBitsLen;
    } else {
      const matches = dataBitsLen.toString(16).match(/(.*?)(.{0,8})$/);
      if (matches === null) {
        return;
      }
      const lo = parseInt(matches[2], 16);
      const hi = parseInt(matches[1], 16) || 0;
      buf32[14] = lo;
      buf32[15] = hi;
    }
    _MD5._md5cycle(this._state, buf32);
    return raw ? this._state : _MD5._hex(this._state);
  }
};
// Private Static Variables
_MD5.stateIdentity = new Int32Array([1732584193, -271733879, -1732584194, 271733878]);
_MD5.buffer32Identity = new Int32Array([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
]);
_MD5.hexChars = "0123456789abcdef";
_MD5.hexOut = [];
// Permanent instance is to use for one-call hashing
_MD5.onePassHasher = new _MD5();
var MD5 = _MD5;
var md5_default = MD5.md5;

// src/encrypt/index.ts
var base64Encode = (input) => new base64_default().encode(input);
var base64Decode = (input) => new base64_default().decode(input);
var MD52 = md5_default;
var xor = (input, key) => {
  let result = "";
  const keyLength = key.length;
  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    const keyCharCode = key.charCodeAt(i % keyLength);
    const xorCharCode = charCode ^ keyCharCode;
    result += String.fromCharCode(xorCharCode);
  }
  return result;
};

// src/files/excel.ts
function exportJson(data, fileName, title, filter) {
  var _a;
  data = toJSON(data);
  if (!hasArray(data)) return;
  const excel = ["<table>"];
  for (var i = 0; i < data.length; i++) {
    excel.push("<tr>");
    for (var index in data[i]) {
      (!filter || (filter == null ? void 0 : filter.indexOf(index)) == -1) && excel.push(`<td>${(_a = data[i][index]) != null ? _a : ""}</td>`);
    }
    excel.push("</tr>");
  }
  excel.push("</table>");
  exportTable(excel.join(""), fileName, title);
}
function exportTable(tableHtml, fileName, title) {
  if (!tableHtml || !isString(tableHtml)) return;
  let excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
  excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
  excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
  excelFile += '; charset=UTF-8">';
  excelFile += "<head>";
  excelFile += "<!--[if gte mso 9]>";
  excelFile += "<xml>";
  excelFile += "<x:ExcelWorkbook>";
  excelFile += "<x:ExcelWorksheets>";
  excelFile += "<x:ExcelWorksheet>";
  excelFile += "<x:Name>";
  excelFile += title;
  excelFile += "</x:Name>";
  excelFile += "<x:WorksheetOptions>";
  excelFile += "<x:DisplayGridlines/>";
  excelFile += "</x:WorksheetOptions>";
  excelFile += "</x:ExcelWorksheet>";
  excelFile += "</x:ExcelWorksheets>";
  excelFile += "</x:ExcelWorkbook>";
  excelFile += "</xml>";
  excelFile += "<![endif]-->";
  excelFile += "</head>";
  excelFile += "<body>";
  excelFile += tableHtml;
  excelFile += "</body>";
  excelFile += "</html>";
  var uri = "data:application/vnd.ms-excel;charset=utf-8," + encodeURIComponent(excelFile);
  var link = document.createElement("a");
  link.href = uri;
  link.setAttribute("style", "visibility:hidden");
  link.download = fileName + ".xls";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// src/files/json.ts
var objectDownload = (obj, fileName = "\u7ED3\u679C") => {
  if (!obj) return;
  const code = JSON.stringify(obj, null, "	");
  const a = document.createElement("a");
  a.setAttribute("href", "data:application/json;charset=utf-8," + encodeURIComponent(code));
  a.setAttribute("download", fileName);
  a.style.display = "none";
  a.click();
};
var jsonDownload = (json, fileName = "\u7ED3\u679C") => {
  if (!json) return;
  objectDownload(toJSON(json), fileName);
};

// src/files/qr.d.ts
var QRErrorCorrectLevel = /* @__PURE__ */ ((QRErrorCorrectLevel2) => {
  QRErrorCorrectLevel2[QRErrorCorrectLevel2["L"] = 1] = "L";
  QRErrorCorrectLevel2[QRErrorCorrectLevel2["M"] = 0] = "M";
  QRErrorCorrectLevel2[QRErrorCorrectLevel2["Q"] = 3] = "Q";
  QRErrorCorrectLevel2[QRErrorCorrectLevel2["H"] = 2] = "H";
  return QRErrorCorrectLevel2;
})(QRErrorCorrectLevel || {});

// src/files/qr.js
function o(o2) {
  this.mode = r.MODE_8BIT_BYTE, this.data = o2;
}
function e(o2, e2) {
  this.typeNumber = o2, this.errorCorrectLevel = e2, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = new Array();
}
o.prototype = {
  getLength: function(o2) {
    return this.data.length;
  },
  write: function(o2) {
    for (var e2 = 0; e2 < this.data.length; e2++) o2.put(this.data.charCodeAt(e2), 8);
  }
}, e.prototype = {
  addData: function(e2) {
    var r = new o(e2);
    this.dataList.push(r), this.dataCache = null;
  },
  isDark: function(o2, e2) {
    if (o2 < 0 || this.moduleCount <= o2 || e2 < 0 || this.moduleCount <= e2)
      throw new Error(o2 + "," + e2);
    return this.modules[o2][e2];
  },
  getModuleCount: function() {
    return this.moduleCount;
  },
  make: function() {
    if (this.typeNumber < 1) {
      var o2 = 1;
      for (o2 = 1; o2 < 40; o2++) {
        for (var e2 = v.getRSBlocks(o2, this.errorCorrectLevel), r = new p(), t = 0, i = 0; i < e2.length; i++)
          t += e2[i].dataCount;
        for (i = 0; i < this.dataList.length; i++) {
          var n = this.dataList[i];
          r.put(n.mode, 4), r.put(n.getLength(), h.getLengthInBits(n.mode, o2)), n.write(r);
        }
        if (r.getLengthInBits() <= 8 * t) break;
      }
      this.typeNumber = o2;
    }
    this.makeImpl(false, this.getBestMaskPattern());
  },
  makeImpl: function(o2, r) {
    this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
    for (var t = 0; t < this.moduleCount; t++) {
      this.modules[t] = new Array(this.moduleCount);
      for (var i = 0; i < this.moduleCount; i++) this.modules[t][i] = null;
    }
    this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(o2, r), this.typeNumber >= 7 && this.setupTypeNumber(o2), null == this.dataCache && (this.dataCache = e.createData(
      this.typeNumber,
      this.errorCorrectLevel,
      this.dataList
    )), this.mapData(this.dataCache, r);
  },
  setupPositionProbePattern: function(o2, e2) {
    for (var r = -1; r <= 7; r++)
      if (!(o2 + r <= -1 || this.moduleCount <= o2 + r))
        for (var t = -1; t <= 7; t++)
          e2 + t <= -1 || this.moduleCount <= e2 + t || (this.modules[o2 + r][e2 + t] = 0 <= r && r <= 6 && (0 == t || 6 == t) || 0 <= t && t <= 6 && (0 == r || 6 == r) || 2 <= r && r <= 4 && 2 <= t && t <= 4);
  },
  getBestMaskPattern: function() {
    for (var o2 = 0, e2 = 0, r = 0; r < 8; r++) {
      this.makeImpl(true, r);
      var t = h.getLostPoint(this);
      (0 == r || o2 > t) && (o2 = t, e2 = r);
    }
    return e2;
  },
  createMovieClip: function(o2, e2, r) {
    var t = o2.createEmptyMovieClip(e2, r);
    this.make();
    for (var i = 0; i < this.modules.length; i++)
      for (var n = 1 * i, a = 0; a < this.modules[i].length; a++) {
        var d = 1 * a;
        this.modules[i][a] && (t.beginFill(0, 100), t.moveTo(d, n), t.lineTo(d + 1, n), t.lineTo(d + 1, n + 1), t.lineTo(d, n + 1), t.endFill());
      }
    return t;
  },
  setupTimingPattern: function() {
    for (var o2 = 8; o2 < this.moduleCount - 8; o2++)
      null == this.modules[o2][6] && (this.modules[o2][6] = o2 % 2 == 0);
    for (var e2 = 8; e2 < this.moduleCount - 8; e2++)
      null == this.modules[6][e2] && (this.modules[6][e2] = e2 % 2 == 0);
  },
  setupPositionAdjustPattern: function() {
    for (var o2 = h.getPatternPosition(this.typeNumber), e2 = 0; e2 < o2.length; e2++)
      for (var r = 0; r < o2.length; r++) {
        var t = o2[e2], i = o2[r];
        if (null == this.modules[t][i])
          for (var n = -2; n <= 2; n++)
            for (var a = -2; a <= 2; a++)
              this.modules[t + n][i + a] = -2 == n || 2 == n || -2 == a || 2 == a || 0 == n && 0 == a;
      }
  },
  setupTypeNumber: function(o2) {
    for (var e2 = h.getBCHTypeNumber(this.typeNumber), r = 0; r < 18; r++) {
      var t = !o2 && 1 == (e2 >> r & 1);
      this.modules[Math.floor(r / 3)][r % 3 + this.moduleCount - 8 - 3] = t;
    }
    for (r = 0; r < 18; r++) {
      t = !o2 && 1 == (e2 >> r & 1);
      this.modules[r % 3 + this.moduleCount - 8 - 3][Math.floor(r / 3)] = t;
    }
  },
  setupTypeInfo: function(o2, e2) {
    for (var r = this.errorCorrectLevel << 3 | e2, t = h.getBCHTypeInfo(r), i = 0; i < 15; i++) {
      var n = !o2 && 1 == (t >> i & 1);
      i < 6 ? this.modules[i][8] = n : i < 8 ? this.modules[i + 1][8] = n : this.modules[this.moduleCount - 15 + i][8] = n;
    }
    for (i = 0; i < 15; i++) {
      n = !o2 && 1 == (t >> i & 1);
      i < 8 ? this.modules[8][this.moduleCount - i - 1] = n : i < 9 ? this.modules[8][15 - i - 1 + 1] = n : this.modules[8][15 - i - 1] = n;
    }
    this.modules[this.moduleCount - 8][8] = !o2;
  },
  mapData: function(o2, e2) {
    for (var r = -1, t = this.moduleCount - 1, i = 7, n = 0, a = this.moduleCount - 1; a > 0; a -= 2)
      for (6 == a && a--; ; ) {
        for (var d = 0; d < 2; d++)
          if (null == this.modules[t][a - d]) {
            var u = false;
            n < o2.length && (u = 1 == (o2[n] >>> i & 1)), h.getMask(e2, t, a - d) && (u = !u), this.modules[t][a - d] = u, -1 == --i && (n++, i = 7);
          }
        if ((t += r) < 0 || this.moduleCount <= t) {
          t -= r, r = -r;
          break;
        }
      }
  }
}, e.PAD0 = 236, e.PAD1 = 17, e.createData = function(o2, r, t) {
  for (var i = v.getRSBlocks(o2, r), n = new p(), a = 0; a < t.length; a++) {
    var d = t[a];
    n.put(d.mode, 4), n.put(d.getLength(), h.getLengthInBits(d.mode, o2)), d.write(n);
  }
  var u = 0;
  for (a = 0; a < i.length; a++) u += i[a].dataCount;
  if (n.getLengthInBits() > 8 * u)
    throw new Error("code length overflow. (" + n.getLengthInBits() + ">" + 8 * u + ")");
  for (n.getLengthInBits() + 4 <= 8 * u && n.put(0, 4); n.getLengthInBits() % 8 != 0; )
    n.putBit(false);
  for (; !(n.getLengthInBits() >= 8 * u || (n.put(e.PAD0, 8), n.getLengthInBits() >= 8 * u)); )
    n.put(e.PAD1, 8);
  return e.createBytes(n, i);
}, e.createBytes = function(o2, e2) {
  for (var r = 0, t = 0, i = 0, n = new Array(e2.length), a = new Array(e2.length), d = 0; d < e2.length; d++) {
    var u = e2[d].dataCount, s = e2[d].totalCount - u;
    t = Math.max(t, u), i = Math.max(i, s), n[d] = new Array(u);
    for (var g = 0; g < n[d].length; g++) n[d][g] = 255 & o2.buffer[g + r];
    r += u;
    var l = h.getErrorCorrectPolynomial(s), c = new f(n[d], l.getLength() - 1).mod(l);
    a[d] = new Array(l.getLength() - 1);
    for (g = 0; g < a[d].length; g++) {
      var m = g + c.getLength() - a[d].length;
      a[d][g] = m >= 0 ? c.get(m) : 0;
    }
  }
  var v2 = 0;
  for (g = 0; g < e2.length; g++) v2 += e2[g].totalCount;
  var p2 = new Array(v2), C2 = 0;
  for (g = 0; g < t; g++)
    for (d = 0; d < e2.length; d++) g < n[d].length && (p2[C2++] = n[d][g]);
  for (g = 0; g < i; g++)
    for (d = 0; d < e2.length; d++) g < a[d].length && (p2[C2++] = a[d][g]);
  return p2;
};
for (r = { MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4, MODE_KANJI: 8 }, t = { L: 1, M: 0, Q: 3, H: 2 }, i = 0, n = 1, a = 2, d = 3, u = 4, s = 5, g = 6, l = 7, h = {
  PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]
  ],
  G15: 1335,
  G18: 7973,
  G15_MASK: 21522,
  getBCHTypeInfo: function(o2) {
    for (var e2 = o2 << 10; h.getBCHDigit(e2) - h.getBCHDigit(h.G15) >= 0; )
      e2 ^= h.G15 << h.getBCHDigit(e2) - h.getBCHDigit(h.G15);
    return (o2 << 10 | e2) ^ h.G15_MASK;
  },
  getBCHTypeNumber: function(o2) {
    for (var e2 = o2 << 12; h.getBCHDigit(e2) - h.getBCHDigit(h.G18) >= 0; )
      e2 ^= h.G18 << h.getBCHDigit(e2) - h.getBCHDigit(h.G18);
    return o2 << 12 | e2;
  },
  getBCHDigit: function(o2) {
    for (var e2 = 0; 0 != o2; ) e2++, o2 >>>= 1;
    return e2;
  },
  getPatternPosition: function(o2) {
    return h.PATTERN_POSITION_TABLE[o2 - 1];
  },
  getMask: function(o2, e2, r2) {
    switch (o2) {
      case i:
        return (e2 + r2) % 2 == 0;
      case n:
        return e2 % 2 == 0;
      case a:
        return r2 % 3 == 0;
      case d:
        return (e2 + r2) % 3 == 0;
      case u:
        return (Math.floor(e2 / 2) + Math.floor(r2 / 3)) % 2 == 0;
      case s:
        return e2 * r2 % 2 + e2 * r2 % 3 == 0;
      case g:
        return (e2 * r2 % 2 + e2 * r2 % 3) % 2 == 0;
      case l:
        return (e2 * r2 % 3 + (e2 + r2) % 2) % 2 == 0;
      default:
        throw new Error("bad maskPattern:" + o2);
    }
  },
  getErrorCorrectPolynomial: function(o2) {
    for (var e2 = new f([1], 0), r2 = 0; r2 < o2; r2++)
      e2 = e2.multiply(new f([1, c.gexp(r2)], 0));
    return e2;
  },
  getLengthInBits: function(o2, e2) {
    if (1 <= e2 && e2 < 10)
      switch (o2) {
        case r.MODE_NUMBER:
          return 10;
        case r.MODE_ALPHA_NUM:
          return 9;
        case r.MODE_8BIT_BYTE:
        case r.MODE_KANJI:
          return 8;
        default:
          throw new Error("mode:" + o2);
      }
    else if (e2 < 27)
      switch (o2) {
        case r.MODE_NUMBER:
          return 12;
        case r.MODE_ALPHA_NUM:
          return 11;
        case r.MODE_8BIT_BYTE:
          return 16;
        case r.MODE_KANJI:
          return 10;
        default:
          throw new Error("mode:" + o2);
      }
    else {
      if (!(e2 < 41)) throw new Error("type:" + e2);
      switch (o2) {
        case r.MODE_NUMBER:
          return 14;
        case r.MODE_ALPHA_NUM:
          return 13;
        case r.MODE_8BIT_BYTE:
          return 16;
        case r.MODE_KANJI:
          return 12;
        default:
          throw new Error("mode:" + o2);
      }
    }
  },
  getLostPoint: function(o2) {
    for (var e2 = o2.getModuleCount(), r2 = 0, t2 = 0; t2 < e2; t2++)
      for (var i2 = 0; i2 < e2; i2++) {
        for (var n2 = 0, a2 = o2.isDark(t2, i2), d2 = -1; d2 <= 1; d2++)
          if (!(t2 + d2 < 0 || e2 <= t2 + d2))
            for (var u2 = -1; u2 <= 1; u2++)
              i2 + u2 < 0 || e2 <= i2 + u2 || 0 == d2 && 0 == u2 || a2 == o2.isDark(t2 + d2, i2 + u2) && n2++;
        n2 > 5 && (r2 += 3 + n2 - 5);
      }
    for (t2 = 0; t2 < e2 - 1; t2++)
      for (i2 = 0; i2 < e2 - 1; i2++) {
        var s2 = 0;
        o2.isDark(t2, i2) && s2++, o2.isDark(t2 + 1, i2) && s2++, o2.isDark(t2, i2 + 1) && s2++, o2.isDark(t2 + 1, i2 + 1) && s2++, 0 != s2 && 4 != s2 || (r2 += 3);
      }
    for (t2 = 0; t2 < e2; t2++)
      for (i2 = 0; i2 < e2 - 6; i2++)
        o2.isDark(t2, i2) && !o2.isDark(t2, i2 + 1) && o2.isDark(t2, i2 + 2) && o2.isDark(t2, i2 + 3) && o2.isDark(t2, i2 + 4) && !o2.isDark(t2, i2 + 5) && o2.isDark(t2, i2 + 6) && (r2 += 40);
    for (i2 = 0; i2 < e2; i2++)
      for (t2 = 0; t2 < e2 - 6; t2++)
        o2.isDark(t2, i2) && !o2.isDark(t2 + 1, i2) && o2.isDark(t2 + 2, i2) && o2.isDark(t2 + 3, i2) && o2.isDark(t2 + 4, i2) && !o2.isDark(t2 + 5, i2) && o2.isDark(t2 + 6, i2) && (r2 += 40);
    var g2 = 0;
    for (i2 = 0; i2 < e2; i2++) for (t2 = 0; t2 < e2; t2++) o2.isDark(t2, i2) && g2++;
    return r2 += 10 * (Math.abs(100 * g2 / e2 / e2 - 50) / 5);
  }
}, c = {
  glog: function(o2) {
    if (o2 < 1) throw new Error("glog(" + o2 + ")");
    return c.LOG_TABLE[o2];
  },
  gexp: function(o2) {
    for (; o2 < 0; ) o2 += 255;
    for (; o2 >= 256; ) o2 -= 255;
    return c.EXP_TABLE[o2];
  },
  EXP_TABLE: new Array(256),
  LOG_TABLE: new Array(256)
}, m = 0; m < 8; m++)
  c.EXP_TABLE[m] = 1 << m;
var r;
var t;
var i;
var n;
var a;
var d;
var u;
var s;
var g;
var l;
var h;
var c;
var m;
for (m = 8; m < 256; m++)
  c.EXP_TABLE[m] = c.EXP_TABLE[m - 4] ^ c.EXP_TABLE[m - 5] ^ c.EXP_TABLE[m - 6] ^ c.EXP_TABLE[m - 8];
for (m = 0; m < 255; m++) c.LOG_TABLE[c.EXP_TABLE[m]] = m;
function f(o2, e2) {
  if (null == o2.length) throw new Error(o2.length + "/" + e2);
  for (var r = 0; r < o2.length && 0 == o2[r]; ) r++;
  this.num = new Array(o2.length - r + e2);
  for (var t = 0; t < o2.length - r; t++) this.num[t] = o2[t + r];
}
function v(o2, e2) {
  this.totalCount = o2, this.dataCount = e2;
}
function p() {
  this.buffer = new Array(), this.length = 0;
}
function C(o2) {
  return o2.setFillStyle = o2.setFillStyle || function(e2) {
    o2.fillStyle = e2;
  }, o2.setFontSize = o2.setFontSize || function(e2) {
    o2.font = `${e2}px`;
  }, o2.setTextAlign = o2.setTextAlign || function(e2) {
    o2.textAlign = e2;
  }, o2.setTextBaseline = o2.setTextBaseline || function(e2) {
    o2.textBaseline = e2;
  }, o2.setGlobalAlpha = o2.setGlobalAlpha || function(e2) {
    o2.globalAlpha = e2;
  }, o2.setStrokeStyle = o2.setStrokeStyle || function(e2) {
    o2.strokeStyle = e2;
  }, o2.setShadow = o2.setShadow || function(e2, r, t, i) {
    o2.shadowOffsetX = e2, o2.shadowOffsetY = r, o2.shadowBlur = t, o2.shadowColor = i;
  }, o2.draw = o2.draw || function(o3, e2) {
    e2 && e2();
  }, o2;
}
function b(o2, e2) {
  var r = this.data = "";
  this.dataEncode = true;
  var t = this.size = 200;
  this.useDynamicSize = false, this.dynamicSize = t;
  var i = this.typeNumber = -1;
  this.errorCorrectLevel = b.errorCorrectLevel.H;
  var n = this.margin = 0;
  this.areaColor = "#FFFFFF", this.backgroundColor = "rgba(255,255,255,0)", this.backgroundImageSrc = void 0;
  var a = this.backgroundImageWidth = void 0, d = this.backgroundImageHeight = void 0, u = this.backgroundImageX = void 0, s = this.backgroundImageY = void 0;
  this.backgroundImageAlpha = 1, this.backgroundImageBorderRadius = 0;
  var g = this.backgroundPadding = 0;
  this.foregroundColor = "#000000", this.foregroundImageSrc = void 0;
  var l = this.foregroundImageWidth = void 0, h = this.foregroundImageHeight = void 0, c = this.foregroundImageX = void 0, m = this.foregroundImageY = void 0, f2 = this.foregroundImagePadding = 0;
  this.foregroundImageBackgroundColor = "#FFFFFF";
  var v2 = this.foregroundImageBorderRadius = 0, p2 = this.foregroundImageShadowOffsetX = 0, k = this.foregroundImageShadowOffsetY = 0, y = this.foregroundImageShadowBlur = 0;
  this.foregroundImageShadowColor = "#808080";
  var w = this.foregroundPadding = 0, I = this.positionProbeBackgroundColor = void 0, B = this.positionProbeForegroundColor = void 0, S = this.separatorColor = void 0, P = this.positionAdjustBackgroundColor = void 0, E = this.positionAdjustForegroundColor = void 0, L = this.timingBackgroundColor = void 0, D = this.timingForegroundColor = void 0, A = this.typeNumberBackgroundColor = void 0, T = this.typeNumberForegroundColor = void 0, N = this.darkBlockColor = void 0;
  this.base = void 0, this.modules = [], this.moduleCount = 0, this.drawModules = [];
  var M = this.canvasContext = void 0;
  this.loadImage, this.drawReserve = false, this.isMaked = false, Object.defineProperties(this, {
    data: {
      get() {
        if ("" === r || void 0 === r) throw new b.Error("\u4E8C\u7EF4\u7801\u6570\u636E\u672A\u8BBE\u7F6E");
        return r;
      },
      set(o3) {
        r = String(o3);
      }
    },
    size: {
      get: () => t,
      set(o3) {
        t = Number(o3);
      }
    },
    typeNumber: {
      get: () => i,
      set(o3) {
        i = Number(o3);
      }
    },
    margin: {
      get: () => n,
      set(o3) {
        n = Number(o3);
      }
    },
    backgroundImageWidth: {
      get() {
        return void 0 === a ? this.dynamicSize : this.useDynamicSize ? this.dynamicSize / this.size * a : a;
      },
      set(o3) {
        a = Number(o3);
      }
    },
    backgroundImageHeight: {
      get() {
        return void 0 === d ? this.dynamicSize : this.useDynamicSize ? this.dynamicSize / this.size * d : d;
      },
      set(o3) {
        d = Number(o3);
      }
    },
    backgroundImageX: {
      get() {
        return void 0 === u ? 0 : this.useDynamicSize ? this.dynamicSize / this.size * u : u;
      },
      set(o3) {
        u = Number(o3);
      }
    },
    backgroundImageY: {
      get() {
        return void 0 === s ? 0 : this.useDynamicSize ? this.dynamicSize / this.size * s : s;
      },
      set(o3) {
        s = Number(o3);
      }
    },
    backgroundPadding: {
      get: () => g,
      set(o3) {
        g = o3 > 1 ? 1 : o3 < 0 ? 0 : o3;
      }
    },
    foregroundImageWidth: {
      get() {
        return void 0 === l ? (this.dynamicSize - 2 * this.margin) / 4 : this.useDynamicSize ? this.dynamicSize / this.size * l : l;
      },
      set(o3) {
        l = Number(o3);
      }
    },
    foregroundImageHeight: {
      get() {
        return void 0 === h ? (this.dynamicSize - 2 * this.margin) / 4 : this.useDynamicSize ? this.dynamicSize / this.size * h : h;
      },
      set(o3) {
        h = Number(o3);
      }
    },
    foregroundImageX: {
      get() {
        return void 0 === c ? this.dynamicSize / 2 - this.foregroundImageWidth / 2 : this.useDynamicSize ? this.dynamicSize / this.size * c : c;
      },
      set(o3) {
        c = Number(o3);
      }
    },
    foregroundImageY: {
      get() {
        return void 0 === m ? this.dynamicSize / 2 - this.foregroundImageHeight / 2 : this.useDynamicSize ? this.dynamicSize / this.size * m : m;
      },
      set(o3) {
        m = Number(o3);
      }
    },
    foregroundImagePadding: {
      get() {
        return this.useDynamicSize ? this.dynamicSize / this.size * f2 : f2;
      },
      set(o3) {
        f2 = Number(o3);
      }
    },
    foregroundImageBorderRadius: {
      get() {
        return this.useDynamicSize ? this.dynamicSize / this.size * v2 : v2;
      },
      set(o3) {
        v2 = Number(o3);
      }
    },
    foregroundImageShadowOffsetX: {
      get() {
        return this.useDynamicSize ? this.dynamicSize / this.size * p2 : p2;
      },
      set(o3) {
        p2 = Number(o3);
      }
    },
    foregroundImageShadowOffsetY: {
      get() {
        return this.useDynamicSize ? this.dynamicSize / this.size * k : k;
      },
      set(o3) {
        k = Number(o3);
      }
    },
    foregroundImageShadowBlur: {
      get() {
        return this.useDynamicSize ? this.dynamicSize / this.size * y : y;
      },
      set(o3) {
        y = Number(o3);
      }
    },
    foregroundPadding: {
      get: () => w,
      set(o3) {
        w = o3 > 1 ? 1 : o3 < 0 ? 0 : o3;
      }
    },
    positionProbeBackgroundColor: {
      get() {
        return I || this.backgroundColor;
      },
      set(o3) {
        I = o3;
      }
    },
    positionProbeForegroundColor: {
      get() {
        return B || this.foregroundColor;
      },
      set(o3) {
        B = o3;
      }
    },
    separatorColor: {
      get() {
        return S || this.backgroundColor;
      },
      set(o3) {
        S = o3;
      }
    },
    positionAdjustBackgroundColor: {
      get() {
        return P || this.backgroundColor;
      },
      set(o3) {
        P = o3;
      }
    },
    positionAdjustForegroundColor: {
      get() {
        return E || this.foregroundColor;
      },
      set(o3) {
        E = o3;
      }
    },
    timingBackgroundColor: {
      get() {
        return L || this.backgroundColor;
      },
      set(o3) {
        L = o3;
      }
    },
    timingForegroundColor: {
      get() {
        return D || this.foregroundColor;
      },
      set(o3) {
        D = o3;
      }
    },
    typeNumberBackgroundColor: {
      get() {
        return A || this.backgroundColor;
      },
      set(o3) {
        A = o3;
      }
    },
    typeNumberForegroundColor: {
      get() {
        return T || this.foregroundColor;
      },
      set(o3) {
        T = o3;
      }
    },
    darkBlockColor: {
      get() {
        return N || this.foregroundColor;
      },
      set(o3) {
        N = o3;
      }
    },
    canvasContext: {
      get() {
        if (void 0 === M) throw new b.Error("\u753B\u5E03\u65E0\u6548\uFF0C\u8BF7\u8BBE\u7F6E\u6709\u6548\u753B\u5E03");
        return M;
      },
      set(o3) {
        M = C(o3);
      }
    }
  }), b.plugins.forEach((o3) => o3(b, this, false)), o2 && this.setOptions(o2), e2 && (this.canvasContext = C(e2));
}
f.prototype = {
  get: function(o2) {
    return this.num[o2];
  },
  getLength: function() {
    return this.num.length;
  },
  multiply: function(o2) {
    for (var e2 = new Array(this.getLength() + o2.getLength() - 1), r = 0; r < this.getLength(); r++)
      for (var t = 0; t < o2.getLength(); t++)
        e2[r + t] ^= c.gexp(c.glog(this.get(r)) + c.glog(o2.get(t)));
    return new f(e2, 0);
  },
  mod: function(o2) {
    if (this.getLength() - o2.getLength() < 0) return this;
    for (var e2 = c.glog(this.get(0)) - c.glog(o2.get(0)), r = new Array(this.getLength()), t = 0; t < this.getLength(); t++)
      r[t] = this.get(t);
    for (t = 0; t < o2.getLength(); t++) r[t] ^= c.gexp(c.glog(o2.get(t)) + e2);
    return new f(r, 0).mod(o2);
  }
}, v.RS_BLOCK_TABLE = [
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]
], v.getRSBlocks = function(o2, e2) {
  var r = v.getRsBlockTable(o2, e2);
  if (null == r)
    throw new Error("bad rs block @ typeNumber:" + o2 + "/errorCorrectLevel:" + e2);
  for (var t = r.length / 3, i = new Array(), n = 0; n < t; n++)
    for (var a = r[3 * n + 0], d = r[3 * n + 1], u = r[3 * n + 2], s = 0; s < a; s++)
      i.push(new v(d, u));
  return i;
}, v.getRsBlockTable = function(o2, e2) {
  switch (e2) {
    case t.L:
      return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 0];
    case t.M:
      return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 1];
    case t.Q:
      return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 2];
    case t.H:
      return v.RS_BLOCK_TABLE[4 * (o2 - 1) + 3];
    default:
      return;
  }
}, p.prototype = {
  get: function(o2) {
    var e2 = Math.floor(o2 / 8);
    return 1 == (this.buffer[e2] >>> 7 - o2 % 8 & 1);
  },
  put: function(o2, e2) {
    for (var r = 0; r < e2; r++) this.putBit(1 == (o2 >>> e2 - r - 1 & 1));
  },
  getLengthInBits: function() {
    return this.length;
  },
  putBit: function(o2) {
    var e2 = Math.floor(this.length / 8);
    this.buffer.length <= e2 && this.buffer.push(0), o2 && (this.buffer[e2] |= 128 >>> this.length % 8), this.length++;
  }
}, e.errorCorrectLevel = t, b.errorCorrectLevel = e.errorCorrectLevel, b.Error = function(o2) {
  o2 = `[\u4E8C\u7EF4\u7801]\uFF1A${o2}`;
  console.error(o2);
  this.errMsg = o2;
}, b.plugins = [], b.use = function(o2) {
  "function" == typeof o2 && b.plugins.push(o2);
}, b.prototype.loadImage = function(o2) {
  return Promise.resolve(o2);
}, b.prototype.setOptions = function(o2) {
  var e2, r, t, i, n, a, d, u, s, g, l, h, c, m, f2, v2, p2, C2, b2, k, y, w, I, B, S, P, E, L, D, A, T, N, M, z, _, O, R, F, x, H, X, Y, j, W, G, K, Q, U, $, J, q, V, Z, oo, eo, ro;
  o2 && (Object.keys(o2).forEach((e3) => {
    this[e3] = o2[e3];
  }), (function(o3 = {}, e3 = {}, r2 = false) {
    let t2;
    for (var i2 in t2 = r2 ? o3 : { ...o3 }, e3) {
      var n2 = e3[i2];
      null != n2 && (n2.constructor == Object ? t2[i2] = this.deepReplace(t2[i2], n2) : n2.constructor != String || n2 ? t2[i2] = n2 : t2[i2] = t2[i2]);
    }
  })(
    this,
    {
      data: o2.data || o2.text,
      dataEncode: o2.dataEncode,
      size: o2.size,
      useDynamicSize: o2.useDynamicSize,
      typeNumber: o2.typeNumber,
      errorCorrectLevel: o2.errorCorrectLevel,
      margin: o2.margin,
      areaColor: o2.areaColor,
      backgroundColor: o2.backgroundColor || (null === (e2 = o2.background) || void 0 === e2 ? void 0 : e2.color),
      backgroundImageSrc: o2.backgroundImageSrc || (null === (r = o2.background) || void 0 === r || null === (t = r.image) || void 0 === t ? void 0 : t.src),
      backgroundImageWidth: o2.backgroundImageWidth || (null === (i = o2.background) || void 0 === i || null === (n = i.image) || void 0 === n ? void 0 : n.width),
      backgroundImageHeight: o2.backgroundImageHeight || (null === (a = o2.background) || void 0 === a || null === (d = a.image) || void 0 === d ? void 0 : d.height),
      backgroundImageX: o2.backgroundImageX || (null === (u = o2.background) || void 0 === u || null === (s = u.image) || void 0 === s ? void 0 : s.x),
      backgroundImageY: o2.backgroundImageY || (null === (g = o2.background) || void 0 === g || null === (l = g.image) || void 0 === l ? void 0 : l.y),
      backgroundImageAlpha: o2.backgroundImageAlpha || (null === (h = o2.background) || void 0 === h || null === (c = h.image) || void 0 === c ? void 0 : c.alpha),
      backgroundImageBorderRadius: o2.backgroundImageBorderRadius || (null === (m = o2.background) || void 0 === m || null === (f2 = m.image) || void 0 === f2 ? void 0 : f2.borderRadius),
      backgroundPadding: o2.backgroundPadding,
      foregroundColor: o2.foregroundColor || (null === (v2 = o2.foreground) || void 0 === v2 ? void 0 : v2.color),
      foregroundImageSrc: o2.foregroundImageSrc || (null === (p2 = o2.foreground) || void 0 === p2 || null === (C2 = p2.image) || void 0 === C2 ? void 0 : C2.src),
      foregroundImageWidth: o2.foregroundImageWidth || (null === (b2 = o2.foreground) || void 0 === b2 || null === (k = b2.image) || void 0 === k ? void 0 : k.width),
      foregroundImageHeight: o2.foregroundImageHeight || (null === (y = o2.foreground) || void 0 === y || null === (w = y.image) || void 0 === w ? void 0 : w.height),
      foregroundImageX: o2.foregroundImageX || (null === (I = o2.foreground) || void 0 === I || null === (B = I.image) || void 0 === B ? void 0 : B.x),
      foregroundImageY: o2.foregroundImageY || (null === (S = o2.foreground) || void 0 === S || null === (P = S.image) || void 0 === P ? void 0 : P.y),
      foregroundImagePadding: o2.foregroundImagePadding || (null === (E = o2.foreground) || void 0 === E || null === (L = E.image) || void 0 === L ? void 0 : L.padding),
      foregroundImageBackgroundColor: o2.foregroundImageBackgroundColor || (null === (D = o2.foreground) || void 0 === D || null === (A = D.image) || void 0 === A ? void 0 : A.backgroundColor),
      foregroundImageBorderRadius: o2.foregroundImageBorderRadius || (null === (T = o2.foreground) || void 0 === T || null === (N = T.image) || void 0 === N ? void 0 : N.borderRadius),
      foregroundImageShadowOffsetX: o2.foregroundImageShadowOffsetX || (null === (M = o2.foreground) || void 0 === M || null === (z = M.image) || void 0 === z ? void 0 : z.shadowOffsetX),
      foregroundImageShadowOffsetY: o2.foregroundImageShadowOffsetY || (null === (_ = o2.foreground) || void 0 === _ || null === (O = _.image) || void 0 === O ? void 0 : O.shadowOffsetY),
      foregroundImageShadowBlur: o2.foregroundImageShadowBlur || (null === (R = o2.foreground) || void 0 === R || null === (F = R.image) || void 0 === F ? void 0 : F.shadowBlur),
      foregroundImageShadowColor: o2.foregroundImageShadowColor || (null === (x = o2.foreground) || void 0 === x || null === (H = x.image) || void 0 === H ? void 0 : H.shadowColor),
      foregroundPadding: o2.foregroundPadding,
      positionProbeBackgroundColor: o2.positionProbeBackgroundColor || (null === (X = o2.positionProbe) || void 0 === X ? void 0 : X.backgroundColor) || (null === (Y = o2.positionDetection) || void 0 === Y ? void 0 : Y.backgroundColor),
      positionProbeForegroundColor: o2.positionProbeForegroundColor || (null === (j = o2.positionProbe) || void 0 === j ? void 0 : j.foregroundColor) || (null === (W = o2.positionDetection) || void 0 === W ? void 0 : W.foregroundColor),
      separatorColor: o2.separatorColor || (null === (G = o2.separator) || void 0 === G ? void 0 : G.color),
      positionAdjustBackgroundColor: o2.positionAdjustBackgroundColor || (null === (K = o2.positionAdjust) || void 0 === K ? void 0 : K.backgroundColor) || (null === (Q = o2.alignment) || void 0 === Q ? void 0 : Q.backgroundColor),
      positionAdjustForegroundColor: o2.positionAdjustForegroundColor || (null === (U = o2.positionAdjust) || void 0 === U ? void 0 : U.foregroundColor) || (null === ($ = o2.alignment) || void 0 === $ ? void 0 : $.foregroundColor),
      timingBackgroundColor: o2.timingBackgroundColor || (null === (J = o2.timing) || void 0 === J ? void 0 : J.backgroundColor),
      timingForegroundColor: o2.timingForegroundColor || (null === (q = o2.timing) || void 0 === q ? void 0 : q.foregroundColor),
      typeNumberBackgroundColor: o2.typeNumberBackgroundColor || (null === (V = o2.typeNumber) || void 0 === V ? void 0 : V.backgroundColor) || (null === (Z = o2.versionInformation) || void 0 === Z ? void 0 : Z.backgroundColor),
      typeNumberForegroundColor: o2.typeNumberForegroundColor || (null === (oo = o2.typeNumber) || void 0 === oo ? void 0 : oo.foregroundColor) || (null === (eo = o2.versionInformation) || void 0 === eo ? void 0 : eo.foregroundColor),
      darkBlockColor: o2.darkBlockColor || (null === (ro = o2.darkBlock) || void 0 === ro ? void 0 : ro.color)
    },
    true
  ));
}, b.prototype.make = function() {
  let {
    foregroundColor: o2,
    backgroundColor: r,
    typeNumber: t,
    errorCorrectLevel: i,
    data: n,
    dataEncode: a,
    size: d,
    margin: u,
    useDynamicSize: s
  } = this;
  if (o2 === r) throw new b.Error("\u524D\u666F\u4E0E\u80CC\u666F\u4E0D\u80FD\u4F7F\u7528\u76F8\u540C\u989C\u8272\uFF01");
  a && (n = (function(o3) {
    o3 = o3.toString();
    for (var e2, r2 = "", t2 = 0; t2 < o3.length; t2++)
      (e2 = o3.charCodeAt(t2)) >= 1 && e2 <= 127 ? r2 += o3.charAt(t2) : e2 > 2047 ? (r2 += String.fromCharCode(224 | e2 >> 12 & 15), r2 += String.fromCharCode(128 | e2 >> 6 & 63), r2 += String.fromCharCode(128 | e2 >> 0 & 63)) : (r2 += String.fromCharCode(192 | e2 >> 6 & 31), r2 += String.fromCharCode(128 | e2 >> 0 & 63));
    return r2;
  })(n));
  var g = new e(t, i);
  g.addData(n), g.make(), this.base = g, this.typeNumber = g.typeNumber, this.modules = g.modules, this.moduleCount = g.moduleCount, this.dynamicSize = s ? Math.ceil((d - 2 * u) / g.moduleCount) * g.moduleCount + 2 * u : d, (function(o3) {
    let {
      dynamicSize: e2,
      margin: r2,
      backgroundColor: t2,
      backgroundPadding: i2,
      foregroundColor: n2,
      foregroundPadding: a2,
      modules: d2,
      moduleCount: u2
    } = o3;
    var s2 = (e2 - 2 * r2) / u2, g2 = s2, l = 0;
    i2 > 0 && (g2 -= 2 * (l = g2 * i2 / 2));
    var h = s2, c = 0;
    a2 > 0 && (h -= 2 * (c = h * a2 / 2));
    for (var m = 0; m < u2; m++)
      for (var f2 = 0; f2 < u2; f2++) {
        var v2 = f2 * s2 + r2, p2 = m * s2 + r2;
        if (d2[m][f2]) {
          var C2 = c, b2 = v2 + c, k = p2 + c, y = h, w = h;
          d2[m][f2] = {
            type: ["foreground"],
            color: n2,
            isBlack: true,
            isDrawn: false,
            destX: v2,
            destY: p2,
            destWidth: s2,
            destHeight: s2,
            x: b2,
            y: k,
            width: y,
            height: w,
            paddingTop: C2,
            paddingRight: C2,
            paddingBottom: C2,
            paddingLeft: C2
          };
        } else
          C2 = l, b2 = v2 + l, k = p2 + l, y = g2, w = g2, d2[m][f2] = {
            type: ["background"],
            color: t2,
            isBlack: false,
            isDrawn: false,
            destX: v2,
            destY: p2,
            destWidth: s2,
            destHeight: s2,
            x: b2,
            y: k,
            width: y,
            height: w,
            paddingTop: C2,
            paddingRight: C2,
            paddingBottom: C2,
            paddingLeft: C2
          };
      }
  })(this), (function(o3) {
    let {
      modules: e2,
      moduleCount: r2,
      positionProbeBackgroundColor: t2,
      positionProbeForegroundColor: i2
    } = o3;
    var n2 = r2 - 7;
    [
      [0, 0, 1],
      [1, 0, 1],
      [2, 0, 1],
      [3, 0, 1],
      [4, 0, 1],
      [5, 0, 1],
      [6, 0, 1],
      [0, 1, 1],
      [1, 1, 0],
      [2, 1, 0],
      [3, 1, 0],
      [4, 1, 0],
      [5, 1, 0],
      [6, 1, 1],
      [0, 2, 1],
      [1, 2, 0],
      [2, 2, 1],
      [3, 2, 1],
      [4, 2, 1],
      [5, 2, 0],
      [6, 2, 1],
      [0, 3, 1],
      [1, 3, 0],
      [2, 3, 1],
      [3, 3, 1],
      [4, 3, 1],
      [5, 3, 0],
      [6, 3, 1],
      [0, 4, 1],
      [1, 4, 0],
      [2, 4, 1],
      [3, 4, 1],
      [4, 4, 1],
      [5, 4, 0],
      [6, 4, 1],
      [0, 5, 1],
      [1, 5, 0],
      [2, 5, 0],
      [3, 5, 0],
      [4, 5, 0],
      [5, 5, 0],
      [6, 5, 1],
      [0, 6, 1],
      [1, 6, 1],
      [2, 6, 1],
      [3, 6, 1],
      [4, 6, 1],
      [5, 6, 1],
      [6, 6, 1]
    ].forEach((o4) => {
      var r3 = e2[o4[0]][o4[1]], a2 = e2[o4[0] + n2][o4[1]], d2 = e2[o4[0]][o4[1] + n2];
      d2.type.push("positionProbe"), a2.type.push("positionProbe"), r3.type.push("positionProbe"), r3.color = 1 == o4[2] ? i2 : t2, a2.color = 1 == o4[2] ? i2 : t2, d2.color = 1 == o4[2] ? i2 : t2;
    });
  })(this), (function(o3) {
    let { modules: e2, moduleCount: r2, separatorColor: t2 } = o3;
    [
      [7, 0],
      [7, 1],
      [7, 2],
      [7, 3],
      [7, 4],
      [7, 5],
      [7, 6],
      [7, 7],
      [0, 7],
      [1, 7],
      [2, 7],
      [3, 7],
      [4, 7],
      [5, 7],
      [6, 7]
    ].forEach((o4) => {
      var i2 = e2[o4[0]][o4[1]], n2 = e2[r2 - o4[0] - 1][o4[1]], a2 = e2[o4[0]][r2 - o4[1] - 1];
      a2.type.push("separator"), n2.type.push("separator"), i2.type.push("separator"), i2.color = t2, n2.color = t2, a2.color = t2;
    });
  })(this), (function(o3) {
    let {
      typeNumber: e2,
      modules: r2,
      moduleCount: t2,
      foregroundColor: i2,
      backgroundColor: n2,
      positionAdjustForegroundColor: a2,
      positionAdjustBackgroundColor: d2,
      timingForegroundColor: u2,
      timingBackgroundColor: s2
    } = o3;
    var g2 = [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46],
      [6, 28, 50],
      [6, 30, 54],
      [6, 32, 58],
      [6, 34, 62],
      [6, 26, 46, 66],
      [6, 26, 48, 70],
      [6, 26, 50, 74],
      [6, 30, 54, 78],
      [6, 30, 56, 82],
      [6, 30, 58, 86],
      [6, 34, 62, 90],
      [6, 28, 50, 72, 94],
      [6, 26, 50, 74, 98],
      [6, 30, 54, 78, 102],
      [6, 28, 54, 80, 106],
      [6, 32, 58, 84, 110],
      [6, 30, 58, 86, 114],
      [6, 34, 62, 90, 118],
      [6, 26, 50, 74, 98, 122],
      [6, 30, 54, 78, 102, 126],
      [6, 26, 52, 78, 104, 130],
      [6, 30, 56, 82, 108, 134],
      [6, 34, 60, 86, 112, 138],
      [6, 30, 58, 86, 114, 142],
      [6, 34, 62, 90, 118, 146],
      [6, 30, 54, 78, 102, 126, 150],
      [6, 24, 50, 76, 102, 128, 154],
      [6, 28, 54, 80, 106, 132, 158],
      [6, 32, 58, 84, 110, 136, 162],
      [6, 26, 54, 82, 110, 138, 166],
      [6, 30, 58, 86, 114, 142, 170]
    ][e2 - 1];
    if (g2)
      for (var l = [
        [-2, -2, 1],
        [-1, -2, 1],
        [0, -2, 1],
        [1, -2, 1],
        [2, -2, 1],
        [-2, -1, 1],
        [-1, -1, 0],
        [0, -1, 0],
        [1, -1, 0],
        [2, -1, 1],
        [-2, 0, 1],
        [-1, 0, 0],
        [0, 0, 1],
        [1, 0, 0],
        [2, 0, 1],
        [-2, 1, 1],
        [-1, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
        [2, 1, 1],
        [-2, 2, 1],
        [-1, 2, 1],
        [0, 2, 1],
        [1, 2, 1],
        [2, 2, 1]
      ], h = g2.length, c = 0; c < h; c++)
        for (var m = 0; m < h; m++) {
          var { x: f2, y: v2 } = { x: g2[c], y: g2[m] };
          f2 < 9 && v2 < 9 || f2 > t2 - 9 - 1 && v2 < 9 || v2 > t2 - 9 - 1 && f2 < 9 || l.forEach((o4) => {
            var e3 = r2[f2 + o4[0]][v2 + o4[1]];
            e3.type.push("positionAdjust"), e3.type.includes("timing") ? 1 == o4[2] ? e3.color = a2 == i2 ? u2 : a2 : e3.color = a2 == i2 && d2 == n2 ? s2 : d2 : e3.color = 1 == o4[2] ? a2 : d2;
          });
        }
  })(this), (function(o3) {
    let {
      modules: e2,
      moduleCount: r2,
      timingForegroundColor: t2,
      timingBackgroundColor: i2
    } = o3;
    for (var n2 = r2 - 16, a2 = 0; a2 < n2; a2++) {
      var d2 = e2[6][8 + a2], u2 = e2[8 + a2][6];
      d2.type.push("timing"), u2.type.push("timing"), d2.color = 1 & a2 ^ 1 ? t2 : i2, u2.color = 1 & a2 ^ 1 ? t2 : i2;
    }
  })(this), (function(o3) {
    let { modules: e2, moduleCount: r2, darkBlockColor: t2 } = o3;
    var i2 = e2[r2 - 7 - 1][8];
    i2.type.push("darkBlock"), i2.color = t2;
  })(this), (function(o3) {
    let {
      typeNumber: e2,
      modules: r2,
      moduleCount: t2,
      typeNumberBackgroundColor: i2,
      typeNumberForegroundColor: n2
    } = o3;
    if (e2 < 7) return r2;
    var a2 = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      "000111110010010100",
      "001000010110111100",
      "001001101010011001",
      "001010010011010011",
      "001011101111110110",
      "001100011101100010",
      "001101100001000111",
      "001110011000001101",
      "001111100100101000",
      "010000101101111000",
      "010001010001011101",
      "010010101000010111",
      "010011010100110010",
      "010100100110100110",
      "010101011010000011",
      "010110100011001001",
      "010111011111101100",
      "011000111011000100",
      "011001000111100001",
      "011010111110101011",
      "011011000010001110",
      "011100110000011010",
      "011101001100111111",
      "011110110101110101",
      "011111001001010000",
      "100000100111010101",
      "100001011011110000",
      "100010100010111010",
      "100011011110011111",
      "100100101100001011",
      "100101010000101110",
      "100110101001100100",
      "100111010101000001",
      "101000110001101001"
    ], d2 = a2[e2] + a2[e2], u2 = [t2 - 11, t2 - 10, t2 - 9];
    [
      [5, u2[2]],
      [5, u2[1]],
      [5, u2[0]],
      [4, u2[2]],
      [4, u2[1]],
      [4, u2[0]],
      [3, u2[2]],
      [3, u2[1]],
      [3, u2[0]],
      [2, u2[2]],
      [2, u2[1]],
      [2, u2[0]],
      [1, u2[2]],
      [1, u2[1]],
      [1, u2[0]],
      [0, u2[2]],
      [0, u2[1]],
      [0, u2[0]],
      [u2[2], 5],
      [u2[1], 5],
      [u2[0], 5],
      [u2[2], 4],
      [u2[1], 4],
      [u2[0], 4],
      [u2[2], 3],
      [u2[1], 3],
      [u2[0], 3],
      [u2[2], 2],
      [u2[1], 2],
      [u2[0], 2],
      [u2[2], 1],
      [u2[1], 1],
      [u2[0], 1],
      [u2[2], 0],
      [u2[1], 0],
      [u2[0], 0]
    ].forEach((o4, e3) => {
      var t3 = r2[o4[0]][o4[1]];
      t3.type.push("typeNumber"), t3.color = "1" == d2[e3] ? n2 : i2;
    });
  })(this), this.isMaked = true, this.drawModules = [];
}, b.prototype.getDrawModules = function() {
  if (this.drawModules && this.drawModules.length > 0) return this.drawModules;
  let o2 = this.drawModules = [], {
    modules: e2,
    moduleCount: r,
    dynamicSize: t,
    areaColor: i,
    backgroundImageSrc: n,
    backgroundImageX: a,
    backgroundImageY: d,
    backgroundImageWidth: u,
    backgroundImageHeight: s,
    backgroundImageAlpha: g,
    backgroundImageBorderRadius: l,
    foregroundImageSrc: h,
    foregroundImageX: c,
    foregroundImageY: m,
    foregroundImageWidth: f2,
    foregroundImageHeight: v2,
    foregroundImagePadding: p2,
    foregroundImageBackgroundColor: C2,
    foregroundImageBorderRadius: b2,
    foregroundImageShadowOffsetX: k,
    foregroundImageShadowOffsetY: y,
    foregroundImageShadowBlur: w,
    foregroundImageShadowColor: I
  } = this;
  i && o2.push({ name: "area", type: "area", color: i, x: 0, y: 0, width: t, height: t }), n && o2.push({
    name: "backgroundImage",
    type: "image",
    imageSrc: n,
    mappingName: "backgroundImageSrc",
    x: a,
    y: d,
    width: u,
    height: s,
    alpha: g,
    borderRadius: l
  });
  for (var B = 0; B < r; B++)
    for (var S = 0; S < r; S++) {
      var P = e2[B][S];
      P.isDrawn || (P.type.includes("foreground") ? o2.push({
        name: "foreground",
        type: "tile",
        color: P.color,
        destX: P.destX,
        destY: P.destY,
        destWidth: P.destWidth,
        destHeight: P.destHeight,
        x: P.x,
        y: P.y,
        width: P.width,
        height: P.height,
        paddingTop: P.paddingTop,
        paddingRight: P.paddingRight,
        paddingBottom: P.paddingBottom,
        paddingLeft: P.paddingLeft,
        rowIndex: B,
        colIndex: S
      }) : o2.push({
        name: "background",
        type: "tile",
        color: P.color,
        destX: P.destX,
        destY: P.destY,
        destWidth: P.destWidth,
        destHeight: P.destHeight,
        x: P.x,
        y: P.y,
        width: P.width,
        height: P.height,
        paddingTop: P.paddingTop,
        paddingRight: P.paddingRight,
        paddingBottom: P.paddingBottom,
        paddingLeft: P.paddingLeft,
        rowIndex: B,
        colIndex: S
      }), P.isDrawn = true);
    }
  return h && o2.push({
    name: "foregroundImage",
    type: "image",
    imageSrc: h,
    mappingName: "foregroundImageSrc",
    x: c,
    y: m,
    width: f2,
    height: v2,
    padding: p2,
    backgroundColor: C2,
    borderRadius: b2,
    shadowOffsetX: k,
    shadowOffsetY: y,
    shadowBlur: w,
    shadowColor: I
  }), o2;
}, b.prototype.isBlack = function(o2, e2) {
  var r = this.moduleCount;
  return !(0 > o2 || 0 > e2 || o2 >= r || e2 >= r) && this.modules[o2][e2].isBlack;
}, b.prototype.drawCanvas = function(o2) {
  let {
    isMaked: e2,
    canvasContext: r,
    useDynamicSize: t,
    dynamicSize: i,
    foregroundColor: n,
    foregroundPadding: a,
    backgroundColor: d,
    backgroundPadding: u,
    drawReserve: s,
    margin: g
  } = this;
  if (!e2) this.make();
  let l = this.getDrawModules(), h = async (e3, t2) => {
    try {
      r.draw(o2);
      for (var i2 = 0; i2 < l.length; i2++) {
        var n2 = l[i2];
        switch (r.save(), n2.type) {
          case "area":
            r.setFillStyle(n2.color), r.fillRect(n2.x, n2.y, n2.width, n2.height);
            break;
          case "tile":
            var a2 = n2.x, d2 = n2.y, u2 = n2.width, g2 = n2.height;
            r.setFillStyle(n2.color), r.fillRect(a2, d2, u2, g2);
            break;
          case "image":
            if ("backgroundImage" === n2.name) {
              a2 = Math.round(n2.x), d2 = Math.round(n2.y), u2 = Math.round(n2.width), g2 = Math.round(n2.height);
              u2 < 2 * (c = Math.round(n2.borderRadius)) && (c = u2 / 2), g2 < 2 * c && (c = g2 / 2), r.setGlobalAlpha(n2.alpha), c > 0 && (r.beginPath(), r.moveTo(a2 + c, d2), r.arcTo(a2 + u2, d2, a2 + u2, d2 + g2, c), r.arcTo(a2 + u2, d2 + g2, a2, d2 + g2, c), r.arcTo(a2, d2 + g2, a2, d2, c), r.arcTo(a2, d2, a2 + u2, d2, c), r.closePath(), r.setStrokeStyle("rgba(0,0,0,0)"), r.stroke(), r.clip());
              try {
                var h2 = await this.loadImage(n2.imageSrc);
                r.drawImage(h2, a2, d2, u2, g2);
              } catch (o3) {
                throw new b.Error(`${n2.mappingName} \u65E0\u6548\uFF01`);
              }
            } else if ("foregroundImage" === n2.name) {
              a2 = Math.round(n2.x), d2 = Math.round(n2.y), u2 = Math.round(n2.width), g2 = Math.round(n2.height);
              var c, m = Math.round(n2.padding);
              u2 < 2 * (c = Math.round(n2.borderRadius)) && (c = u2 / 2), g2 < 2 * c && (c = g2 / 2);
              var f2 = a2 - m, v2 = d2 - m, p2 = u2 + 2 * m, C2 = g2 + 2 * m, k = Math.round(p2 / u2 * c);
              p2 < 2 * k && (k = p2 / 2), C2 < 2 * k && (k = C2 / 2), r.save(), r.setShadow(
                n2.shadowOffsetX,
                n2.shadowOffsetY,
                n2.shadowBlur,
                n2.shadowColor
              ), k > 0 ? (r.beginPath(), r.moveTo(f2 + k, v2), r.arcTo(f2 + p2, v2, f2 + p2, v2 + C2, k), r.arcTo(f2 + p2, v2 + C2, f2, v2 + C2, k), r.arcTo(f2, v2 + C2, f2, v2, k), r.arcTo(f2, v2, f2 + p2, v2, k), r.closePath(), r.setFillStyle(n2.backgroundColor), r.fill()) : (r.setFillStyle(n2.backgroundColor), r.fillRect(f2, v2, p2, C2)), r.restore(), r.save(), k > 0 ? (r.beginPath(), r.moveTo(f2 + k, v2), r.arcTo(f2 + p2, v2, f2 + p2, v2 + C2, k), r.arcTo(f2 + p2, v2 + C2, f2, v2 + C2, k), r.arcTo(f2, v2 + C2, f2, v2, k), r.arcTo(f2, v2, f2 + p2, v2, k), r.closePath(), r.setFillStyle(
                m > 0 ? n2.backgroundColor : "rgba(0,0,0,0)"
              ), r.fill()) : (r.setFillStyle(
                m > 0 ? n2.backgroundColor : "rgba(0,0,0,0)"
              ), r.fillRect(f2, v2, p2, C2)), r.restore(), c > 0 && (r.beginPath(), r.moveTo(a2 + c, d2), r.arcTo(a2 + u2, d2, a2 + u2, d2 + g2, c), r.arcTo(a2 + u2, d2 + g2, a2, d2 + g2, c), r.arcTo(a2, d2 + g2, a2, d2, c), r.arcTo(a2, d2, a2 + u2, d2, c), r.closePath(), r.setStrokeStyle("rgba(0,0,0,0)"), r.stroke(), r.clip());
              try {
                h2 = await this.loadImage(n2.imageSrc);
                r.drawImage(h2, a2, d2, u2, g2);
              } catch (o3) {
                throw new b.Error(`${n2.mappingName} \u65E0\u6548\uFF01`);
              }
            }
        }
        s && r.draw(true), r.restore();
      }
      r.draw(true), setTimeout(e3, 150);
    } catch (o3) {
      t2(o3);
    }
  };
  return new Promise((o3, e3) => {
    h(o3, e3);
  });
}, b.prototype.draw = function(o2) {
  return this.drawCanvas(o2);
}, b.prototype.register = function(o2) {
  o2 && o2(b, this, true);
};

// src/files/index.ts
var QR = b;
async function QRObject(params) {
  if (!params || !hasObject(params) || !params.code) return;
  if (!params.size || params.size < 1) params.size = 200;
  const qr = new QR();
  qr.data = params.code;
  qr.size = params.size;
  qr.errorCorrectLevel = params.level || 2 /* H */;
  params.color = params.color || "#000000";
  params.backColor = params.backColor || "#FFFFFF";
  qr.foregroundColor = params.reserve ? params.backColor : params.color;
  qr.backgroundColor = params.reserve ? params.color : params.backColor;
  let logo = params.logo;
  if (logo === true) {
    logo = LOGO;
  } else if (!logo) {
    logo = false;
  } else {
    if (!logo.startsWith("data:image") && logo.indexOf(".") > 0) {
      logo = await remoteFileToBase64(logo, true);
    }
  }
  if (logo) {
    if (qr.errorCorrectLevel === 1 /* L */) {
      qr.errorCorrectLevel = 0 /* M */;
    }
    qr.foregroundImageSrc = logo;
  }
  qr.make();
  return qr;
}
async function QRCreate(params) {
  const qr = await QRObject(params);
  if (!qr) return "";
  const drawModules = qr.getDrawModules();
  const svg = [
    `<svg width="${params.size}" height="${params.size}" xmlns="http://www.w3.org/2000/svg" version="1.1">`
  ];
  for (var i = 0; i < drawModules.length; i++) {
    var drawModule = drawModules[i];
    switch (drawModule.type) {
      case "tile":
        svg.push(
          `<rect x="${drawModule.x}" y="${drawModule.y}" width="${drawModule.width + 0.5}" height="${drawModule.height + 0.5}" style="fill: ${drawModule.color};" />`
        );
        break;
      case "image":
        svg.push(
          `<rect x="${drawModule.x - 5}" y="${drawModule.y - 5}" width="${drawModule.width + 10}" height="${drawModule.height + 10}" rx="10"  style="fill:white;" />`
        );
        svg.push(
          `<image href="${drawModule.imageSrc}" x="${drawModule.x}" y="${drawModule.y}" width="${drawModule.width}" height="${drawModule.height}" />`
        );
        break;
    }
  }
  svg.push("</svg>");
  return svg.join("");
}
async function remoteFileToBase64(url, onlyImage = true) {
  return new Promise(async (resolve, reject) => {
    await fetch(url).then((res) => res.blob()).then((blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (hasString(reader.result)) {
          const data = reader.result;
          if (data.startsWith("data:")) {
            if (!onlyImage || data.startsWith("data:image")) {
              return resolve(data);
            }
          }
        }
        reject(new Error("\u6587\u4EF6\u65E0\u6548\u6216\u8005\u83B7\u53D6\u5931\u8D25"));
      };
      reader.onerror = () => {
        reject(reader.error || new Error("\u6587\u4EF6\u8F6C\u6362\u6210 base64 \u683C\u5F0F\u5931\u8D25"));
      };
      reader.readAsDataURL(blob);
    }).catch(() => {
      reject("\u65E0\u6CD5\u8BFB\u53D6\u8FDC\u7A0B\u6587\u4EF6");
    });
  });
}

// src/cookies.ts
function setCookie(name, value, options = {}) {
  if (SERVERMODE) return;
  try {
    let expires = "";
    const { expire = 86400, path = "/", secure = false, httpOnly = false } = options;
    if (expire) {
      const date = /* @__PURE__ */ new Date();
      date.setTime(date.getTime() + expire * 1e3);
      expires = "; expires=" + date.toUTCString();
    }
    const encodedValue = encodeURIComponent(value) || "";
    let cookieString = name + "=" + encodedValue + expires + "; path=" + path;
    if (secure) {
      cookieString += "; secure";
    }
    if (httpOnly) {
      cookieString += "; httpOnly";
    }
    document.cookie = cookieString;
  } catch (error) {
    console.error("Error setting cookie:", error);
  }
}
function getCookie(name) {
  if (SERVERMODE) return null;
  try {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        const value = c.substring(nameEQ.length, c.length);
        return decodeURIComponent(value);
      }
    }
    return null;
  } catch (error) {
    console.error("Error getting cookie:", error);
    return null;
  }
}
function deleteCookie(name, path = "/") {
  if (SERVERMODE) return;
  try {
    document.cookie = name + "=; Path=" + path + "; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  } catch (error) {
    console.error("Error deleting cookie:", error);
  }
}
var cookies_default = { set: setCookie, get: getCookie, del: deleteCookie };

// src/formValidate.ts
import dayjs from "dayjs";
var FormValidate = class {
  /** 规则合并，并转换成数组规则列表 */
  concat(...args) {
    if (args.length < 1) return;
    let rules = [];
    for (let index = 0; index < args.length; index++) {
      let rule = args[index];
      rule && (rule = this.updateRules(rule));
      hasArray(rule) && (rules = merge(rules, rule));
    }
    return rules;
  }
  /********************************************************************/
  /**
   * 规则组验证
   * @param rules	规则对象，数组或者对象
   * @param value	要验证的值
   * @returns 	成功返回 true 否则返回错误提示；无规则则表示无需验证,直接返回成功!
   */
  validate(rules, value) {
    if (!rules) return true;
    rules = this.updateRules(rules);
    if (!hasArray(rules)) return true;
    const messages = rules.filter((rule) => hasObject(rule)).map((rule) => this.validateRule(rule, value)).filter((flag) => flag !== true);
    return messages.length === 0 ? true : messages.join("\uFF1B");
  }
  /**
   * 单条规则验证
   * @param rule	规则对象，数组或者对象
   * @param value	要验证的值
   * @returns 	成功返回 true 否则返回错误提示
   */
  validateRule(rule, value) {
    let message = this.validateRequired(rule, value);
    if (message === true) message = this.validateType(rule, value);
    if (message === true) message = this.validateRange(rule, value);
    if (message === true) message = this.validateRegular(rule, value);
    if (message === true) message = this.validateFunction(rule, value);
    return message;
  }
  /** 验证是否必填 */
  validateRequired(rule, value) {
    if (!rule || rule.required !== true) return true;
    const message = rule.message || "\u6B64\u9879\u76EE\u5FC5\u987B\u586B\u5199";
    if (isNil(value)) return message;
    if (isArray(value)) return value.length > 0 ? true : message;
    if (isObject(value)) return Object.keys(value).length > 0 ? true : message;
    if (isString(value)) {
      if (rule.trim === true) value = value.trim();
      return value.length > 0 ? true : message;
    }
    if (isBoolean(value)) return value === true ? true : message;
    return true;
  }
  /** 验证正则表达式，仅针对字符串 */
  validateRegular(rule, value) {
    if (!value || !rule || !rule.pattern) return true;
    if (!isString(value)) return "\u975E\u6709\u6548\u6587\u672C\uFF0C\u4E0D\u80FD\u8FDB\u884C\u6B63\u5219\u6BD4\u8F83";
    const reg = new RegExp(rule.pattern);
    return reg.test(value) ? true : rule.message || "\u4E0D\u7B26\u5408\u6307\u5B9A\u6B63\u5219\u89C4\u5219";
  }
  /**
   *	验证类型
   * @param rule 	类型:url / email / mobile / mobilephone / phone
   * @param value 值:非必须填写的项目，对于空值忽略
   */
  validateType(rule, value) {
    if (!value || !rule || !rule.type) return true;
    const message = (name) => rule.message ? rule.message : `\u975E\u6709\u6548 ${name} \u6570\u636E`;
    if (rule.type === "number") return isNumber(value) ? true : message("\u6570\u5B57");
    if (!isString(value) && !isNumber(value)) return message("\u7C7B\u578B\uFF0C\u4EC5\u652F\u6301\u5224\u65AD\u5B57\u7B26\u6216\u6570\u5B57\u683C\u5F0F");
    value = value.toString();
    if (rule.type === "json") return isJSON(value) ? true : message("JSON");
    if (rule.type === "url") return isHttp(value) ? true : message("\u7F51\u5740");
    if (rule.type === "email") return isEmail(value) ? true : message("\u90AE\u7BB1");
    if (rule.type === "tel") return isPhone(value) ? true : message("\u7535\u8BDD\u53F7\u7801");
    if (rule.type === "phone") return isPhone(value) ? true : message("\u7535\u8BDD\u53F7\u7801");
    if (rule.type === "mobile") return isMobile(value) ? true : message("\u624B\u673A\u53F7\u7801");
    if (rule.type === "mobilephone") return isMobile(value) ? true : message("\u624B\u673A\u53F7\u7801");
    if (rule.type === "guid") return isGuid(value) ? true : message("GUID");
    if (rule.type === "chinese") return isChinese(value) ? true : message("\u4E2D\u6587\u5B57\u7B26");
    if (rule.type === "english") return isEnglish(value) ? true : message("\u82F1\u6587\u5B57\u7B26");
    if (rule.type === "ip") return isIP(value) ? true : message("IP");
    if (rule.type === "name")
      return isName(value) ? true : "\u4EC5\u652F\u6301\u5B57\u6BCD\u6570\u5B57\u6A2A\u7EBF\u5C0F\u6570\u70B9\uFF0C\u4E14\u9700\u5B57\u6BCD\u5F00\u5934";
    return "\u4E0D\u652F\u6301\u6B64\u683C\u5F0F [" + rule.type + "] \u9A8C\u8BC1";
  }
  /** 验证区间 */
  validateRange(rule, value) {
    if (isNil(value) || !rule) return true;
    if (rule.min) {
      const min = Number(rule.min);
      if (!isNaN(min)) {
        if (isString(value)) value = Number(value);
        if (isNaN(value)) return "\u6B64\u503C\u5FC5\u987B\u4E3A\u6570\u503C";
        if (isNumber(value) && value < min)
          return rule.message || "\u6B64\u503C\u5FC5\u987B\u5927\u4E8E\u7B49\u4E8E " + min;
      }
    }
    if (rule.max) {
      const max = Number(rule.max);
      if (!isNaN(max)) {
        if (isString(value)) value = Number(value);
        if (isNaN(value)) return "\u6B64\u503C\u5FC5\u987B\u4E3A\u6570\u503C";
        if (isNumber(value) && value > max)
          return rule.message || "\u6B64\u503C\u5FC5\u987B\u5C0F\u4E8E\u7B49\u4E8E " + max;
      }
    }
    if (rule.minLength) {
      const min = Number(rule.minLength);
      if (!isNaN(min)) {
        if (isNumber(value)) value = value.toString();
        if ((isString(value) || isArray(value)) && value.length < min)
          return rule.message || "\u6B64\u503C\u957F\u5EA6\u5FC5\u987B\u5927\u4E8E\u7B49\u4E8E " + min;
      }
    }
    if (rule.maxLength) {
      const max = Number(rule.maxLength);
      if (!isNaN(max)) {
        if (isNumber(value)) value = value.toString();
        if ((isString(value) || isArray(value)) && value.length > max)
          return rule.message || "\u6B64\u503C\u957F\u5EA6\u5FC5\u987B\u5C0F\u4E8E\u7B49\u4E8E " + max;
      }
    }
    const now = dayjs(value);
    if (rule.minDate) {
      if (!now.isValid()) return rule.message || "\u65E0\u6548\u65E5\u671F\u6570\u636E";
      const min = dayjs(rule.minDate);
      if (min.isValid() && now.isBefore(min, "day"))
        return rule.message || "\u65F6\u95F4\u5FC5\u987B\u665A\u4E8E\u6216\u8005\u7B49\u4E8E " + min.format("YYYY\u5E74MM\u6708DD\u65E5");
    }
    if (rule.maxDate) {
      if (!now.isValid()) return rule.message || "\u65E0\u6548\u65E5\u671F\u6570\u636E";
      const max = dayjs(rule.maxDate);
      if (max.isValid() && now.isAfter(max, "day"))
        return rule.message || "\u65F6\u95F4\u5FC5\u987B\u65E9\u4E8E\u6216\u8005\u7B49\u4E8E " + max.format("YYYY\u5E74MM\u6708DD\u65E5");
    }
    return true;
  }
  /** 验证自定义规则函数 */
  validateFunction(rule, value) {
    if (!rule || !isFn(rule.validate)) return true;
    return rule.validate(value);
  }
  /********************************************************************/
  /** 规则描述 */
  description(rules) {
    const ret = [];
    rules = this.updateRules(rules);
    if (!hasArray(rules)) return "";
    rules.filter((rule) => hasObject(rule)).forEach((rule) => {
      ret.push(this.descriptionRequired(rule));
      ret.push(this.descriptionRange(rule));
      ret.push(this.descriptionType(rule));
      ret.push(this.descriptionRegular(rule));
    });
    return ret.filter((msg) => !!msg).join("\uFF1B");
  }
  /** 必填 */
  descriptionRequired(rule) {
    return rule && rule.required === true ? "\u5FC5\u586B" : "";
  }
  /** 正则 */
  descriptionRegular(rule) {
    return rule && !!rule.pattern ? "\u8981\u6C42\u7B26\u5408\u89C4\u5219\uFF1A" + rule.pattern : "";
  }
  /** 类型 */
  descriptionType(rule) {
    if (!rule || !rule.type || !isString(rule.type)) return "";
    if (rule.type === "json") return "\u8981\u6C42\u683C\u5F0F\u4E3A JSON";
    if (rule.type === "url") return "\u8981\u6C42\u683C\u5F0F\u4E3A\u7F51\u5740";
    if (rule.type === "email") return "\u8981\u6C42\u683C\u5F0F\u4E3A\u90AE\u7BB1";
    if (rule.type === "tel") return "\u8981\u6C42\u683C\u5F0F\u4E3A\u7535\u8BDD\u53F7\u7801";
    if (rule.type === "phone") return "\u8981\u6C42\u683C\u5F0F\u4E3A\u7535\u8BDD\u53F7\u7801";
    if (rule.type === "mobile") return "\u8981\u6C42\u683C\u5F0F\u4E3A\u624B\u673A\u53F7\u7801";
    if (rule.type === "mobilephone") return "\u8981\u6C42\u683C\u5F0F\u4E3A\u624B\u673A\u53F7\u7801";
    if (rule.type === "guid") return "\u8981\u6C42\u683C\u5F0F\u4E3AGUID";
    if (rule.type === "number") return "\u8981\u6C42\u683C\u5F0F\u4E3A\u6570\u5B57";
    if (rule.type === "chinese") return "\u8981\u6C42\u683C\u5F0F\u4E3A\u4E2D\u6587\u5B57\u7B26";
    if (rule.type === "english") return "\u8981\u6C42\u683C\u5F0F\u4E3A\u82F1\u6587\u5B57\u7B26";
    if (rule.type === "ip") return "\u8981\u6C42\u683C\u5F0F\u4E3AIP";
    if (rule.type === "name") return "\u8981\u6C42\u683C\u5F0F\u5B57\u6BCD\u5F00\u5934\uFF0C\u4EC5\u5305\u542B\u5B57\u6BCD\u4E0E\u6570\u5B57\u53CA\u4E0B\u5212\u7EBF\u7684\u5B57\u7B26\u4E32";
    return "\u65E0\u6548\u89C4\u5219\u683C\u5F0F" + rule.type;
  }
  /** 区间 */
  descriptionRange(rule) {
    if (!rule) return "";
    const ret = [];
    if (rule.min) {
      const min = Number(rule.min);
      if (!isNaN(min)) ret.push("\u5FC5\u987B\u5927\u4E8E\u7B49\u4E8E" + min);
    }
    if (rule.max) {
      const max = Number(rule.max);
      if (!isNaN(max)) ret.push("\u5FC5\u987B\u5C0F\u4E8E\u7B49\u4E8E" + max);
    }
    if (rule.minLength) {
      const min = Number(rule.minLength);
      if (!isNaN(min)) ret.push("\u957F\u5EA6\u5FC5\u987B\u5927\u4E8E\u7B49\u4E8E" + min);
    }
    if (rule.maxLength) {
      const max = Number(rule.maxLength);
      if (!isNaN(max)) ret.push("\u957F\u5EA6\u5FC5\u987B\u5C0F\u4E8E\u7B49\u4E8E" + max);
    }
    if (rule.minDate) {
      const min = dayjs(rule.minDate);
      if (min.isValid()) ret.push("\u65F6\u95F4\u5FC5\u987B\u665A\u4E8E\u6216\u8005\u7B49\u4E8E " + min.format("YYYY\u5E74MM\u6708DD\u65E5"));
    }
    if (rule.maxDate) {
      const max = dayjs(rule.maxDate);
      if (max.isValid()) ret.push("\u65F6\u95F4\u5FC5\u987B\u65E9\u4E8E\u6216\u8005\u7B49\u4E8E " + max.format("YYYY\u5E74MM\u6708DD\u65E5"));
    }
    return ret.length > 0 ? ret.join("\uFF1B") : "";
  }
  /********************************************************************/
  /** 是否存在规则 */
  hasRules(rules) {
    return hasArray(this.updateRules(rules));
  }
  /** 将规则对象转换成规则列表 */
  updateRules(rules) {
    if (hasArray(rules)) return rules;
    if (!hasObject(rules)) return [];
    const rs = rules;
    rules = Object.keys(rs).map((key) => {
      if (key === "message") return;
      const rule = {};
      rule[key] = rs[key];
      rs.message && (rule.message = rs.message);
      return rule;
    });
    return rules;
  }
  /** 是否存在必填项目 */
  hasRequired(rules) {
    return this.updateRules(rules).some((rule) => rule && rule.required === true);
  }
};
var formValidate;
var createFormValidate = () => {
  if (!formValidate) formValidate = new FormValidate();
  return formValidate;
};

// src/waterMark.ts
var waterMark_default = (background, interval = 5) => {
  if (SERVERMODE || !background) return;
  const validate = () => {
    const img = isFn(background) ? background() : background;
    if (!img) return;
    let el = document.body.querySelector(".dl-watermark");
    if (!el) {
      el = document.createElement("div");
      el.classList.add("dl-watermark");
      document.body.appendChild(el);
    }
    el.style.pointerEvents = "none";
    el.style.position = "fixed";
    el.style.zIndex = "999999999999999999";
    el.style.left = "0";
    el.style.top = "0";
    el.style.width = "100vw";
    el.style.height = "100vh";
    el.style.backgroundRepeat = "repeat";
    el.style.backgroundPosition = "0 -100px";
    el.style.backgroundImage = img;
    el.style.opacity = "0.8";
  };
  validate();
  setInterval(validate, interval * 1e3);
};

// src/theme.ts
import dayjs2 from "dayjs";
function UIThemeQuery(options) {
  if (!SERVERMODE) {
    let getTheme2 = function(el) {
      const theme2 = el.dataset.theme;
      if (theme2) return theme2;
      const classList = el.classList;
      return defaultThemes.find((item) => classList.contains(item));
    };
    var getTheme = getTheme2;
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
      if (prefersDark.matches) return "dark";
      const prefersLight = window.matchMedia("(prefers-color-scheme: light)");
      if (prefersLight.matches) return "light";
    }
    let defaultThemes = (options == null ? void 0 : options.defaultThemes) || [];
    !hasArray(defaultThemes) && (defaultThemes = []);
    !defaultThemes.includes("dark") && defaultThemes.push("dark");
    !defaultThemes.includes("light") && defaultThemes.push("light");
    const theme = getTheme2(document.documentElement) || getTheme2(document.body);
    if (!theme) return theme;
  }
  const hour = (/* @__PURE__ */ new Date()).getHours();
  const start = (options == null ? void 0 : options.start) || 6;
  const end = (options == null ? void 0 : options.end) || 18;
  return hour > start && hour <= end ? "light" : "dark";
}
function UIThemeSet(theme, el, defaultClass) {
  if (SERVERMODE) return;
  theme = theme || "light";
  el = el || document.documentElement;
  el.className = defaultClass || "";
  el.classList.add(theme);
  el.dataset.theme = theme;
}
var createImportantStyle = (days) => {
  if (!days || SERVERMODE) return;
  if (isString(days)) days = days.split(",");
  if (hasArray(days)) {
    const list = {};
    days.forEach((day2) => {
      day2 = day2.trim();
      day2 && (list[day2] = "");
    });
    days = list;
  }
  if (!hasObject(days)) return;
  const day = Object.keys(days).find((day2) => {
    if (day2.length < 8) day2 = `${(/* @__PURE__ */ new Date()).getFullYear()}-${day2}`;
    return dayjs2().isSame(day2, "day");
  });
  if (!day) return;
  let info = days[day];
  let background = "";
  if (isString(info) && info !== "") {
    if (info.startsWith("*")) {
      info = info.slice(1);
      document.body.style.webkitFilter = "grayscale(100%)";
      document.body.style.filter = "grayscale(100%)";
    }
    const img = (text, size2, top2) => {
      return `%3Ctext x='0' y='${top2}%25' font-size='${size2}' text-anchor='left' transform='rotate(-25)' opacity='0.06' font-weight='500' dominant-baseline='middle'%3E${text}%3C/text%3E`;
    };
    const texts = `${info},${(/* @__PURE__ */ new Date()).toLocaleDateString("en-CA")}`.replace(/[\;\:；：，]/g, ",").split(",").filter((text) => !!text);
    let size = 32;
    let top = 48;
    for (let index = 0; index < texts.length; index++) {
      const text = texts[index];
      if (!text) continue;
      background += img(text, size, top);
      index < 1 && (top += 5);
      size = 18;
      top += 8;
    }
    background = `url("data:image/svg+xml,%3Csvg width='375' height='360' xmlns='http://www.w3.org/2000/svg'%3E${background}%3C/svg%3E")`;
  }
  let el = document.body.querySelector(".dl-global-style");
  if (!el) {
    el = document.createElement("div");
    el.classList.add("dl-global-style");
    document.body.appendChild(el);
  }
  el.style.pointerEvents = "none";
  el.style.position = "fixed";
  el.style.zIndex = "999999999999999999";
  el.style.left = "0";
  el.style.top = "0";
  el.style.width = "100vw";
  el.style.height = "100vh";
  el.style.backgroundRepeat = "repeat";
  el.style.backgroundPosition = "center top";
  el.style.backgroundImage = background;
};
var mergeClass = (...classNames) => {
  let result = [];
  for (let className of classNames) {
    if (isFn(className)) {
      className = className();
    }
    if (isString(className)) {
      result.push(className);
    } else if (isArray(className)) {
      result.push(...className);
    } else if (isObject(className)) {
      for (const key in className) {
        if (className[key]) result.push(key);
      }
    }
  }
  if (result.length < 1) return result;
  result = result.join("|").replace(/\s+/g, "|").trim().split("|").filter((x) => !!x);
  return cleanDuplicate(result);
};

// src/page.ts
var screenType = (options) => {
  if (SERVERMODE) return "server";
  options = { desktop: (options == null ? void 0 : options.desktop) || 1024, mobile: (options == null ? void 0 : options.mobile) || 640 };
  if (window.innerWidth >= options.desktop) return "desktop";
  if (window.innerWidth <= options.mobile) return "mobile";
  return "tablet";
};
var isFullscreen = () => {
  if (SERVERMODE) return false;
  return (
    // @ts-ignore
    document.webkitIsFullScreen || // @ts-ignore
    document.mozFullScreen || // @ts-ignore
    document.msFullscreenElement || // @ts-ignore
    document.fullscreenElement || window.innerHeight === window.screen.height && window.innerWidth === window.screen.width
  );
};
var _elementAction = (element, elementFunctionName) => {
  try {
    const fun = element[elementFunctionName];
    if (isFn(fun)) {
      fun();
      return true;
    }
  } catch (e2) {
  }
  return false;
};
var fullscreenLaunch = (element) => {
  if (SERVERMODE) return false;
  let ele = isString(element) ? document.querySelector(element) : element;
  ele = ele || document.querySelector("#app") || document.body;
  if (!ele) return false;
  return _elementAction(ele, "requestFullscreen") || _elementAction(ele, "webkitRequestFullScreen") || _elementAction(ele, "msRequestFullscreen") || _elementAction(ele, "mozRequestFullScreen") || _elementAction(ele, "oRequestFullscreen");
};
var fullscreenExit = () => {
  if (SERVERMODE) return false;
  return _elementAction(document, "exitFullscreen") || _elementAction(document, "webkitExitFullscreen") || _elementAction(document, "msExitFullscreen") || _elementAction(document, "mozCancelFullScreen") || _elementAction(document, "oCancelFullScreen");
};

export {
  base64Encode,
  base64Decode,
  MD52 as MD5,
  xor,
  exportJson,
  exportTable,
  objectDownload,
  jsonDownload,
  QRErrorCorrectLevel,
  QR,
  QRObject,
  QRCreate,
  remoteFileToBase64,
  setCookie,
  getCookie,
  deleteCookie,
  cookies_default,
  FormValidate,
  createFormValidate,
  waterMark_default,
  UIThemeQuery,
  UIThemeSet,
  createImportantStyle,
  mergeClass,
  screenType,
  isFullscreen,
  fullscreenLaunch,
  fullscreenExit
};
