// /*
// ' ------------------------------------------------------------
// '
// ' 	Copyright © 2022 湖南大沥网络科技有限公司.
// '
// ' 	  author:	木炭(WOODCOAL)
// ' 	   email:	i@woodcoal.cn
// ' 	homepage:	http://www.hunandali.com/
// '
// ' ------------------------------------------------------------
// '
// ' 	HTTP模块拦截器测试
// '
// ' 	name: http-interceptors.test
// ' 	create: 2025-03-21
// ' 	memo: HTTP模块拦截器测试
// '
// ' ------------------------------------------------------------
// */

// import { createHttpInstance } from '../../src/http';
// import { HttpClient, HttpContext } from '../../src/http/types';

// // 模拟服务器响应
// const mockServerResponse = {
// 	success: { code: 0, message: '成功', data: { id: 1, name: '测试数据' } },
// 	withToken: { code: 0, message: '成功', data: { authenticated: true } },
// 	error: { code: 500, message: '服务器错误', data: null }
// };

// // 模拟fetch函数
// global.fetch = jest.fn((_url, options) => {
// 	const url = _url as string;

// 	// 检查请求头中是否包含Authorization
// 	const hasAuth = options!.headers && (options!.headers as any).Authorization;

// 	if (url.includes('/auth') && !hasAuth) {
// 		return Promise.resolve({
// 			ok: false,
// 			status: 401,
// 			json: () => Promise.resolve({ code: 401, message: '未授权', data: null })
// 		} as Response);
// 	} else if (url.includes('/auth') && hasAuth) {
// 		return Promise.resolve({
// 			ok: true,
// 			status: 200,
// 			json: () => Promise.resolve(mockServerResponse.withToken)
// 		} as Response);
// 	} else if (url.includes('/error')) {
// 		return Promise.resolve({
// 			ok: false,
// 			status: 500,
// 			json: () => Promise.resolve(mockServerResponse.error)
// 		} as Response);
// 	}

// 	// 默认成功响应
// 	return Promise.resolve({
// 		ok: true,
// 		status: 200,
// 		json: () => Promise.resolve(mockServerResponse.success)
// 	} as Response);
// });

// describe('HTTP模块拦截器测试', () => {
// 	let http: HttpClient;
// 	let requestInterceptor: jest.Mock;
// 	let responseInterceptor: jest.Mock;
// 	let errorInterceptor: jest.Mock;

// 	beforeEach(() => {
// 		// 重置mock
// 		jest.clearAllMocks();

// 		// 创建拦截器mock
// 		requestInterceptor = jest.fn((context: HttpContext) => {
// 			// 为所有请求添加自定义头
// 			context.options.headers.set('X-Custom-Header', 'test-value');
// 			return context;
// 		});

// 		responseInterceptor = jest.fn((context: HttpContext) => {
// 			// 修改响应数据
// 			if (context.response && context.response._data) {
// 				context.response._data.intercepted = true;
// 			}
// 			return context;
// 		});

// 		errorInterceptor = jest.fn((context: HttpContext) => {
// 			// 记录错误
// 			if (context.error) {
// 				context.error.message = `拦截的错误: ${context.error.message}`;
// 			}
// 			throw context.error;
// 		});

// 		// 创建HTTP实例用于测试
// 		http = createHttpInstance({
// 			defaults: {
// 				baseURL: 'https://api.example.com',
// 				timeout: 5000,
// 				onRequest: requestInterceptor,
// 				onResponse: responseInterceptor,
// 				onResponseError: errorInterceptor
// 			}
// 		});
// 	});

// 	/**
// 	 * 测试请求拦截器
// 	 */
// 	test('请求拦截器应该能修改请求参数', async () => {
// 		await http.GET('/api/data');

// 		expect(requestInterceptor).toHaveBeenCalledTimes(1);
// 		expect(global.fetch).toHaveBeenCalledWith(
// 			'https://api.example.com/api/data',
// 			expect.objectContaining({
// 				headers: expect.objectContaining({
// 					'X-Custom-Header': 'test-value'
// 				})
// 			})
// 		);
// 	});

// 	/**
// 	 * 测试响应拦截器
// 	 */
// 	test('响应拦截器应该能修改响应数据', async () => {
// 		const response = await http.GET('/api/data');

// 		expect(responseInterceptor).toHaveBeenCalledTimes(1);
// 		expect(response).toHaveProperty('intercepted', true);
// 	});

// 	/**
// 	 * 测试错误拦截器
// 	 */
// 	test('错误拦截器应该能处理响应错误', async () => {
// 		try {
// 			await http.GET('/error');
// 			fail('应该抛出错误');
// 		} catch (error) {
// 			expect(errorInterceptor).toHaveBeenCalledTimes(1);
// 			// @ts-ignore
// 			expect(error.message).toContain('拦截的错误');
// 		}
// 	});

// 	/**
// 	 * 测试Token认证
// 	 */
// 	test('应该能正确处理Token认证', async () => {
// 		// 创建带Token的HTTP实例
// 		const authHttp = createHttpInstance({
// 			defaults: {
// 				baseURL: 'https://api.example.com',
// 				timeout: 5000
// 			}
// 		});

// 		// 使用token选项发起请求
// 		const response = await authHttp.GET(
// 			'/auth',
// 			{},
// 			{
// 				token: 'test-token',
// 				auth: true
// 			}
// 		);

// 		expect(global.fetch).toHaveBeenCalledWith(
// 			'https://api.example.com/auth',
// 			expect.objectContaining({
// 				headers: expect.objectContaining({
// 					Authorization: 'Bearer test-token'
// 				})
// 			})
// 		);
// 		expect(response).toEqual(mockServerResponse.withToken);
// 	});

// 	/**
// 	 * 测试路径参数替换和请求参数处理
// 	 */
// 	test('应该能正确处理路径参数和请求参数', async () => {
// 		await http.GET('/api/user/{id}', { id: 123, name: 'test' });

// 		expect(global.fetch).toHaveBeenCalledWith(
// 			'https://api.example.com/api/user/123',
// 			expect.objectContaining({
// 				method: 'GET',
// 				headers: expect.objectContaining({
// 					'X-Custom-Header': 'test-value'
// 				})
// 			})
// 		);
// 	});

// 	/**
// 	 * 测试请求参数编码
// 	 */
// 	test('应该能正确处理需要编码的参数', async () => {
// 		await http.POST(
// 			'/api/login',
// 			{ username: 'admin', password: 'secret' },
// 			{
// 				encode: ['password']
// 			}
// 		);

// 		// 验证请求体中包含了编码字段信息
// 		const callArgs = (global.fetch as jest.Mock).mock.calls[0][1];
// 		const body = JSON.parse(callArgs.body);

// 		expect(body).toHaveProperty('_encode', 'password');
// 		// 密码应该被Base64编码
// 		expect(body.password).not.toBe('secret');
// 	});
// });
