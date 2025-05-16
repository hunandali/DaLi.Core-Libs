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
' 	HTTP模块测试
'
' 	name: http.test
' 	create: 2025-03-21
' 	memo: HTTP模块测试
' 	
' ------------------------------------------------------------
*/

import { createHttpInstance, http } from '../../src/http';
import { HttpClient } from '../../src/http/types';

// 模拟服务器响应
const mockServerResponse = {
	success: { code: 0, message: '成功', data: { id: 1, name: '测试数据' } },
	error: { code: 500, message: '服务器错误', data: null },
	unauthorized: { code: 401, message: '未授权', data: null },
	timeout: new Promise((resolve) =>
		setTimeout(() => resolve({ code: 0, data: { delayed: true } }), 1000)
	)
};

// 模拟fetch函数
global.fetch = jest.fn((_url, options) => {
	const url = _url as string;

	// 根据URL和请求方法返回不同的响应
	if (url.includes('/error')) {
		return Promise.resolve({
			ok: false,
			status: 500,
			json: () => Promise.resolve(mockServerResponse.error)
		} as Response);
	} else if (url.includes('/unauthorized')) {
		return Promise.resolve({
			ok: false,
			status: 401,
			json: () => Promise.resolve(mockServerResponse.unauthorized)
		} as Response);
	} else if (url.includes('/timeout')) {
		return mockServerResponse.timeout.then(
			(data) =>
				({
					ok: true,
					status: 200,
					json: () => Promise.resolve(data)
				} as Response)
		);
	}

	// 默认成功响应
	return Promise.resolve({
		ok: true,
		status: 200,
		json: () => Promise.resolve(mockServerResponse.success)
	} as Response);
});

describe('HTTP模块测试', () => {
	let customHttp: HttpClient;

	beforeEach(() => {
		// 重置mock
		jest.clearAllMocks();
		// 创建自定义HTTP实例用于测试
		customHttp = createHttpInstance({
			defaults: {
				baseURL: 'https://api.example.com',
				timeout: 5000
			}
		});
	});

	/**
	 * 测试HTTP客户端实例创建
	 */
	test('应该能够创建HTTP客户端实例', () => {
		expect(http).toBeDefined();
		expect(customHttp).toBeDefined();
		expect(customHttp.runtime).toBeDefined();
		expect(customHttp.GET).toBeInstanceOf(Function);
		expect(customHttp.POST).toBeInstanceOf(Function);
		expect(customHttp.cache).toBeInstanceOf(Function);
	});

	/**
	 * 测试基本GET请求
	 */
	test('应该能够发起GET请求并正确处理响应', async () => {
		const response = await customHttp.GET('/api/data');

		expect(global.fetch).toHaveBeenCalledTimes(1);
		expect(global.fetch).toHaveBeenCalledWith(
			'https://api.example.com/api/data',
			expect.objectContaining({
				method: 'GET'
			})
		);
		// expect(response).toEqual(mockServerResponse.success);
	});

	/**
	 * 测试基本POST请求
	 */
	test('应该能够发起POST请求并正确处理响应', async () => {
		const params = { name: '测试', value: 123 };
		const response = await customHttp.POST('/api/create', params);

		expect(global.fetch).toHaveBeenCalledTimes(1);
		expect(global.fetch).toHaveBeenCalledWith(
			'https://api.example.com/api/create',
			expect.objectContaining({
				method: 'POST',
				body: expect.any(String)
			})
		);
		// expect(response).toEqual(mockServerResponse.success);
	});

	/**
	 * 测试错误处理
	 */
	test('应该能够正确处理请求错误', async () => {
		await expect(customHttp.GET('/error')).rejects.toThrow();
		expect(global.fetch).toHaveBeenCalledTimes(1);
	});

	// /**
	//  * 测试请求超时
	//  */
	// test('应该能够处理请求超时', async () => {
	// 	// 设置较短的超时时间
	// 	const timeoutHttp = createHttpInstance({
	// 		defaults: {
	// 			baseURL: 'https://api.example.com',
	// 			timeout: 100 // 非常短的超时时间
	// 		}
	// 	});

	// 	await expect(timeoutHttp.GET('/timeout')).rejects.toThrow();
	// });

	/**
	 * 测试请求参数处理
	 */
	// test('应该能够正确处理URL参数', async () => {
	// 	await customHttp.GET('/api/data', { id: 123, name: 'test' });

	// 	expect(global.fetch).toHaveBeenCalledWith(
	// 		expect.stringContaining('/api/data'),
	// 		expect.objectContaining({
	// 			method: 'GET'
	// 		})
	// 	);
	// });

	/**
	 * 测试路径参数替换
	 */
	test('应该能够正确替换URL中的路径参数', async () => {
		await customHttp.POST('/api/user/{id}', { id: 123, name: 'test' });

		expect(global.fetch).toHaveBeenCalledWith(
			'https://api.example.com/api/user/123',
			expect.any(Object)
		);
	});
});
