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
// ' 	HTTP模块文件处理和错误处理测试
// '
// ' 	name: http-files-error.test
// ' 	create: 2025-03-21
// ' 	memo: HTTP模块文件处理和错误处理测试
// '
// ' ------------------------------------------------------------
// */

// import { createHttpInstance } from '../../src/http';
// import { HttpClient, HttpError } from '../../src/http/types';

// // 模拟服务器响应
// const mockServerResponse = {
// 	success: { code: 0, message: '成功', data: { id: 1, name: '测试数据' } },
// 	uploadSuccess: {
// 		code: 0,
// 		message: '上传成功',
// 		data: { fileId: 'abc123', url: 'https://example.com/files/abc123.jpg' }
// 	},
// 	downloadSuccess: new Uint8Array([1, 2, 3, 4, 5]),
// 	error: { code: 500, message: '服务器错误', data: null },
// 	validationError: { code: 400, message: '参数错误', data: { field: 'name', error: '不能为空' } },
// 	networkError: new Error('网络连接失败')
// };

// // 模拟FormData
// class MockFormData {
// 	private data = new Map();
// 	append(key: string, value: any) {
// 		this.data.set(key, value);
// 	}
// 	get(key: string) {
// 		return this.data.get(key);
// 	}
// 	has(key: string) {
// 		return this.data.has(key);
// 	}
// }

// // 模拟全局FormData
// global.FormData = MockFormData as any;

// // 模拟fetch函数
// global.fetch = jest.fn((_url, options) => {
// 	const url = _url as string;

// 	if (url.includes('/upload')) {
// 		return Promise.resolve({
// 			ok: true,
// 			status: 200,
// 			json: () => Promise.resolve(mockServerResponse.uploadSuccess)
// 		} as Response);
// 	} else if (url.includes('/download')) {
// 		return Promise.resolve({
// 			ok: true,
// 			status: 200,
// 			arrayBuffer: () => Promise.resolve(mockServerResponse.downloadSuccess) as any
// 		} as Response);
// 	} else if (url.includes('/error/validation')) {
// 		return Promise.resolve({
// 			ok: false,
// 			status: 400,
// 			json: () => Promise.resolve(mockServerResponse.validationError)
// 		} as Response);
// 	} else if (url.includes('/error/server')) {
// 		return Promise.resolve({
// 			ok: false,
// 			status: 500,
// 			json: () => Promise.resolve(mockServerResponse.error)
// 		} as Response);
// 	} else if (url.includes('/error/network')) {
// 		return Promise.reject(mockServerResponse.networkError);
// 	}

// 	// 默认成功响应
// 	return Promise.resolve({
// 		ok: true,
// 		status: 200,
// 		json: () => Promise.resolve(mockServerResponse.success)
// 	} as Response);
// });

// describe('HTTP模块文件处理和错误处理测试', () => {
// 	let http: HttpClient;
// 	let alertMock: jest.Mock;

// 	beforeEach(() => {
// 		// 重置mock
// 		jest.clearAllMocks();

// 		// 模拟错误提示函数
// 		alertMock = jest.fn().mockReturnValue(true);

// 		// 创建HTTP实例用于测试
// 		http = createHttpInstance(
// 			{
// 				defaults: {
// 					baseURL: 'https://api.example.com',
// 					timeout: 5000
// 				}
// 			},
// 			{
// 				private: false,
// 				alert: alertMock
// 			}
// 		);
// 	});

// 	/**
// 	 * 测试文件上传功能
// 	 */
// 	test('应该能够正确处理文件上传', async () => {
// 		// 模拟文件对象
// 		const mockFile = new Blob(['file content'], { type: 'image/jpeg' });
// 		(mockFile as any).name = 'test.jpg';

// 		const files = [mockFile];
// 		const request = {
// 			url: '/upload',
// 			method: 'POST'
// 		};

// 		const response = await http.upload(files as any, request as any);

// 		expect(global.fetch).toHaveBeenCalledTimes(1);
// 		expect(global.fetch).toHaveBeenCalledWith(
// 			'https://api.example.com/upload',
// 			expect.objectContaining({
// 				method: 'POST',
// 				body: expect.any(MockFormData)
// 			})
// 		);
// 		expect(response).toEqual(mockServerResponse.uploadSuccess);
// 	});

// 	/**
// 	 * 测试文件下载功能
// 	 */
// 	test('应该能够正确处理文件下载', async () => {
// 		const request = {
// 			url: '/download',
// 			method: 'GET'
// 		};

// 		const response = await http.download(request as any, { responseType: 'arrayBuffer' });

// 		expect(global.fetch).toHaveBeenCalledTimes(1);
// 		expect(global.fetch).toHaveBeenCalledWith(
// 			'https://api.example.com/download',
// 			expect.objectContaining({
// 				method: 'GET'
// 			})
// 		);
// 		expect(response).toEqual(mockServerResponse.downloadSuccess);
// 	});

// 	/**
// 	 * 测试验证错误处理
// 	 */
// 	test('应该能够正确处理验证错误', async () => {
// 		try {
// 			await http.GET('/error/validation');
// 			fail('应该抛出错误');
// 		} catch (error) {
// 			expect(error).toBeInstanceOf(Error);
// 			expect((error as HttpError).response?.status).toBe(400);
// 			expect(alertMock).toHaveBeenCalledTimes(1);
// 		}
// 	});

// 	/**
// 	 * 测试服务器错误处理
// 	 */
// 	test('应该能够正确处理服务器错误', async () => {
// 		try {
// 			await http.GET('/error/server');
// 			fail('应该抛出错误');
// 		} catch (error) {
// 			expect(error).toBeInstanceOf(Error);
// 			expect((error as HttpError).response?.status).toBe(500);
// 			expect(alertMock).toHaveBeenCalledTimes(1);
// 		}
// 	});

// 	/**
// 	 * 测试网络错误处理
// 	 */
// 	test('应该能够正确处理网络错误', async () => {
// 		try {
// 			await http.GET('/error/network');
// 			fail('应该抛出错误');
// 		} catch (error) {
// 			expect(error).toBeInstanceOf(Error);
// 			// @ts-ignore
// 			expect(error.message).toContain('网络连接失败');
// 			expect(alertMock).toHaveBeenCalledTimes(1);
// 		}
// 	});

// 	/**
// 	 * 测试自定义错误提示
// 	 */
// 	test('应该能够使用自定义错误提示方式', async () => {
// 		try {
// 			await http.GET('/error/server', {}, { alert: 'toast' });
// 			fail('应该抛出错误');
// 		} catch (error) {
// 			expect(error).toBeInstanceOf(Error);
// 			expect((error as HttpError).alert).toBe('toast');
// 			expect(alertMock).toHaveBeenCalledTimes(1);
// 		}
// 	});

// 	/**
// 	 * 测试错误提示只显示一次
// 	 */
// 	test('错误提示应该只显示一次', async () => {
// 		const error = new Error('测试错误') as HttpError;
// 		error.alerted = true;

// 		// 模拟请求拦截器抛出错误
// 		(global.fetch as jest.Mock).mockRejectedValueOnce(error);

// 		try {
// 			await http.GET('/api/data');
// 			fail('应该抛出错误');
// 		} catch (e) {
// 			expect(alertMock).not.toHaveBeenCalled();
// 		}
// 	});
// });
