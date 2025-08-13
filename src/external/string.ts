/*
 * ------------------------------------------------------------
 *
 * 	Copyright © 2025 湖南大沥网络科技有限公司.
 *
 * 	  author: 木炭
 * 	   email: woodcoal@qq.com
 * 	homepage: http://www.hunandali.com/
 *
 * ------------------------------------------------------------
 *
 * 	基于第三方包的字符串扩展操作
 *
 * 	file: string.ts
 * 	time: 2025-08-13 14:05:01
 *
 * ------------------------------------------------------------
 */

import DOMPurify from 'isomorphic-dompurify';

/**
 * html 安全化处理，去除危险标记，方式 xss 攻击
 * @param dirty 	待处理的 html 或者节点
 * @param config 	配置选项，不设置则默认仅处理 html
 * @returns		处理后的 html
 */
export function htmlSafe(dirty: string | Node, config?: DOMPurify.Config) {
	return DOMPurify.sanitize(dirty, config || { USE_PROFILES: { html: true } });
}
