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
 * 	用于手动单独测试 http 模块
 *
 * 	file: http_test.ts
 * 	time: 2025-05-16 12:34:32
 *
 * ------------------------------------------------------------
 */

import { http as fetch } from '../../src/http';

const BASE_URL_PUBLIC = 'http://shanhe.kim/api/';
const BASE_URL_PRIVATE = 'http://127.0.0.1:10000/api/';

describe('HTTP模块测试', () => {
	// 此测试需要本地设计的服务端调试环境，否则测试无效
	test('Private 请求', async () => {
		fetch.runtime.baseURL = BASE_URL_PRIVATE;
		fetch.runtime.private = true;
		const res = fetch('auth/login', {
			method: 'POST',
			body: { name: 'aaa', password: 'bbbb' }
		});

		expect(res).rejects.toThrow(
			'[POST] "http://127.0.0.1:10000/api/auth/login": 401 Unauthorized'
		);
	});

	test('Public 请求', async () => {
		fetch.runtime.baseURL = BASE_URL_PUBLIC;
		fetch.runtime.private = false;
		const res = await fetch('za/tianqi.php', { method: 'GET', params: { city: '成都' } });
		expect(res).toBeDefined();
		expect(res.code).toBe(1);
		expect(res.data).toBeDefined();
		expect(res.data).toBeInstanceOf(Object);
		expect(res.data.city).toBe('成都');
	});

	test('GET 请求', async () => {
		fetch.runtime.baseURL = BASE_URL_PUBLIC;
		fetch.runtime.private = false;
		const res = await fetch.GET('za/tianqi.php', { city: '成都' });
		expect(res).toBeDefined();
		expect(res.code).toBe(1);
		expect(res.data).toBeDefined();
		expect(res.data).toBeInstanceOf(Object);
		expect(res.data.city).toBe('成都');
	});
});
