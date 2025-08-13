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
 * 	基于第三方包的其他扩展操作
 *
 * 	file: utils.ts
 * 	time: 2025-08-13 14:16:12
 *
 * ------------------------------------------------------------
 */

/** 指纹 */
import fingerprintJs from '@fingerprintjs/fingerprintjs';
import { SERVERMODE } from '../../config';

/**
 * 获取浏览器指纹
 * 结果将返回两个参数：
 * id：浏览器指纹
 * score：指纹评分；1 最可信，0 最不可信
 * 如果服务端而非浏览器端执行则此函数固定返回 { id: 'server', score: 1 }
 */
export async function fingerprint() {
	// 服务端不处理，直接返回
	if (SERVERMODE) return { id: 'server', score: 1 };

	// 客户端分析
	const fpJs = await fingerprintJs.load().then((fg) => fg.get());

	return { id: fpJs.visitorId, score: fpJs.confidence.score };
}
