/**
 * @author        木炭 <woodcoal@qq.com>
 * @date          2025-12-27 20:33:21
 * Copyright © 湖南大沥网络科技有限公司 All rights reserved
 */

/**
 * Emoji 检测工具模块
 * 兼容性增强：
 * 1. 使用 ES Module 导出函数，而非 Class 静态方法。
 * 2. 增加正则降级机制：如果环境不支持 ES2018 Unicode 属性，自动回退到传统正则。
 */

// --- 核心正则构建 ---

let EMOJI_REGEX: RegExp;
let STRICT_EMOJI_REGEX: RegExp;

try {
	// 方案 A: 现代环境 (Node.js 10+, Chrome 64+, iOS 12+)
	// 使用 ES2018 Unicode Property Escapes，最精准
	// 使用 new RegExp 避免旧浏览器解析脚本时直接报 SyntaxError
	EMOJI_REGEX = new RegExp('(\\p{Extended_Pictographic}|\\p{Emoji_Presentation})', 'u');

	// 严谨匹配：包含组合符、肤色修饰符等
	STRICT_EMOJI_REGEX = new RegExp(
		'^(?:\\p{Extended_Pictographic}|\\p{Emoji_Presentation})(?:\\p{EMod}|\\u{FE0F}|\\u{20E3}|[\\u{E0020}-\\u{E007E}]|\\u{200D}(?:\\p{Extended_Pictographic}|\\p{Emoji_Presentation}))*$',
		'u'
	);
} catch (e) {
	// 方案 B: 旧环境降级 (兼容 IE11, 旧安卓等)
	// 使用传统的 Unicode 16进制范围。虽然不如 \p 精准，但覆盖了绝大多数常见 Emoji。
	// 范围包括：杂项符号, 增补符号, 表情符号等
	console.warn('EmojiUtils: 当前环境不支持 ES2018 正则，已降级到兼容模式。');

	// 这是一个简化的兼容正则，覆盖了常见的 Emoji 范围 (Surrogate Pairs)
	const commonRanges = [
		'\\uD83C[\\uDF00-\\uDFFF]', // 杂项符号及象形文字 (U+1F300-1F3FF)
		'\\uD83D[\\uDC00-\\uDE4F]', // 表情符号 (U+1F600-1F64F)
		'\\uD83D[\\uDE80-\\uDEFF]', // 交通和地图符号 (U+1F680-1F6FF)
		'\\uD83E[\\uDD00-\\uDDFF]', // 增补符号 (U+1F900-1F9FF)
		'[\\u2600-\\u27BF]' // 杂项符号 (U+2600-27BF)
	].join('|');

	EMOJI_REGEX = new RegExp(`(${commonRanges})`, 'g');
	STRICT_EMOJI_REGEX = new RegExp(`^(${commonRanges})+$`, 'g');
}

/** 判断字符串中【是否包含】任何 Emoji */
export function containsEmoji(text: string) {
	// 重置正则索引（如果是全局模式）
	if (EMOJI_REGEX.global) EMOJI_REGEX.lastIndex = 0;
	return EMOJI_REGEX.test(text);
}

/**
 * 判断字符串【是否仅由】一个 Emoji 组成
 * (用于头像、图标判断等场景)
 */
export function isSingleEmoji(text: string) {
	if (!text) return false;

	// 1. 正则初步检查
	if (STRICT_EMOJI_REGEX.global) STRICT_EMOJI_REGEX.lastIndex = 0;
	const isMatch = STRICT_EMOJI_REGEX.test(text);

	if (!isMatch) return false;

	// 2. 长度辅助检查 (针对现代环境)
	// 如果环境支持 Intl.Segmenter，用它来处理像 👨‍👩‍👧‍👦 这种视觉上是一个字符但长度很长的 Emoji
	if (typeof Intl !== 'undefined' && Intl.Segmenter) {
		const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
		let length = 0;
		// eslint-disable-next-line no-unused-vars
		for (const segment of segmenter.segment(text)) {
			length++;
			if (length > 1) return false; // 超过1个字素就不是单个 Emoji
		}
		return length === 1;
	}

	// 3. 降级长度检查 (针对旧环境)
	// 如果没有 Intl.Segmenter，我们尝试用较宽松的逻辑
	// 大多数简单 Emoji 长度是 2 (UTF-16)，组合 Emoji 会更长
	// 这里我们只确保它是匹配正则的，就不做过于严格的字素分割了，否则代码量会巨大
	return true;
}

/** 提取字符串中的所有 Emoji */
export function extractEmojis(text: string) {
	if (!text) return [];

	// 确保使用全局匹配标志
	const regex = new RegExp(
		EMOJI_REGEX,
		EMOJI_REGEX.flags.includes('g') ? EMOJI_REGEX.flags : EMOJI_REGEX.flags + 'g'
	);
	return text.match(regex) || [];
}
