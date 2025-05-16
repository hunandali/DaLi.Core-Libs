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
// ' 	HTTP模块API和缓存测试
// '
// ' 	name: http-api-cache.test
// ' 	create: 2025-03-21
// ' 	memo: HTTP模块API和缓存测试
// '
// ' ------------------------------------------------------------
// */

// import { createHttpInstance } from '../../src/http';
// import { HttpClient, IApi, IApiResult } from '../../src/http/types';
// import '../../src/console';

// // 模拟服务器响应
// const mockServerResponse = {
// 	success: { code: 0, message: '成功', data: { id: 1, name: '测试数据' } },
// 	apiSuccess: { code: 0, message: '成功', data: { result: true, items: [1, 2, 3] } },
// 	error: { code: 500, message: '服务器错误', data: null }
// };

// // // 模拟fetch函数
// // global.fetch = jest.fn((_url, options) => {
// // 	const url = _url as string;

// // 	// 记录请求次数用于缓存测试
// // 	if (url.includes('/cached')) {
// // 		(global.fetch as jest.Mock).mockImplementationOnce((url, options) => {
// // 			return Promise.resolve({
// // 				ok: true,
// // 				status: 200,
// // 				json: () => Promise.resolve({ ...mockServerResponse.success, cached: true })
// // 			} as Response);
// // 		});
// // 	}

// // 	if (url.includes('/error')) {
// // 		return Promise.resolve({
// // 			ok: false,
// // 			status: 500,
// // 			json: () => Promise.resolve(mockServerResponse.error)
// // 		} as Response);
// // 	} else if (url.includes('/api/')) {
// // 		return Promise.resolve({
// // 			ok: true,
// // 			status: 200,
// // 			text: () => Promise.resolve(mockServerResponse.apiSuccess),
// // 			json: () => Promise.resolve(mockServerResponse.apiSuccess)
// // 		} as any);
// // 	}

// // 	// 默认成功响应
// // 	return Promise.resolve({
// // 		ok: true,
// // 		status: 200,
// // 		json: () => Promise.resolve(mockServerResponse.success)
// // 	} as Response);
// // });

// const BASE_URL = 'http://shanhe.kim/api/';

// describe('HTTP模块API和缓存测试', () => {
// 	let http = createHttpInstance();

// 	beforeEach(() => {
// 		http.runtime.baseURL = BASE_URL;
// 	});

// 	/**
// 	 * 测试API请求功能
// 	 */
// 	test('应该能够正确处理API请求', async () => {
// 		const api: IApi = {
// 			url: 'za/tianqi.php',
// 			method: 'GET',
// 			data: { city: '成都' }
// 		};

// 		const response = (await http.api(api)) as IApiResult;

// 		expect(response).toBeDefined();
// 		expect(response.succ).toBeTruthy();
// 		expect(response.value.code).toEqual(1);
// 	});

// 	/**
// 	 * 测试API请求错误处理
// 	 */
// 	test('应该能够正确处理API请求错误', async () => {
// 		const api: IApi = {
// 			url: 'bad/request'
// 		};

// 		await expect(http.api(api)).rejects.toThrow();
// 	});

// 	/**
// 	 * 测试缓存功能
// 	 */
// 	test('应该能够正确缓存请求结果', async () => {
// 		// 第一次请求，应该发起实际网络请求
// 		const response1 = await http.cache('/cached', { cacheTime: 1000 });

// 		// 第二次请求，应该使用缓存
// 		const response2 = await http.cache('/cached', { cacheTime: 1000 });

// 		// 验证只发起了一次网络请求
// 		expect(global.fetch).toHaveBeenCalledTimes(1);
// 		expect(response1).toEqual(response2);
// 	});

// 	/**
// 	 * 测试缓存过期
// 	 */
// 	test('应该在缓存过期后重新发起请求', async () => {
// 		// 第一次请求
// 		await http.cache('/cached', { cacheTime: 100 });

// 		// 等待缓存过期
// 		await new Promise((resolve) => setTimeout(resolve, 200));

// 		// 第二次请求，缓存已过期，应该重新发起请求
// 		await http.cache('/cached', { cacheTime: 100 });

// 		// 验证发起了两次网络请求
// 		expect(global.fetch).toHaveBeenCalledTimes(2);
// 	});

// 	/**
// 	 * 测试不同请求参数的缓存
// 	 */
// 	test('应该对不同参数的请求使用不同缓存', async () => {
// 		// 第一次请求，带参数A
// 		await http.cache('/cached', { cacheTime: 1000, params: { id: 1 } });

// 		// 第二次请求，带参数B
// 		await http.cache('/cached', { cacheTime: 1000, params: { id: 2 } });

// 		// 验证发起了两次网络请求（因为参数不同）
// 		expect(global.fetch).toHaveBeenCalledTimes(2);
// 	});

// 	/**
// 	 * 测试禁用缓存
// 	 */
// 	test('应该在禁用缓存时每次都发起请求', async () => {
// 		// 第一次请求，禁用缓存
// 		await http.cache('/cached', { cacheTime: false });

// 		// 第二次请求，禁用缓存
// 		await http.cache('/cached', { cacheTime: false });

// 		// 验证发起了两次网络请求
// 		expect(global.fetch).toHaveBeenCalledTimes(2);
// 	});
// });
