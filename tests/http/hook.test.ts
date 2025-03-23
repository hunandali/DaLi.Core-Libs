import { SERVERMODE } from '../../config';
import { createHttp, onRequest, onResponse } from '../../src/http/hook';
import { $Http, HttpConfig, HttpContext } from '../../src/http/types';

describe('HTTP Hook Tests', () => {
	let http: $Http;
	let mockConfig: HttpConfig;

	beforeEach(() => {
		mockConfig = {
			private: true,
			baseURL: 'http://test.api.com',
			timeout: 5000,
			token: 'test-token',
			auth: jest.fn(),
			sign: jest.fn(),
			alert: jest.fn()
		};
		http = createHttp({}, mockConfig);
	});

	describe('createHttp', () => {
		it('should create http instance with correct configuration', () => {
			expect(http).toBeDefined();
			expect(http.runtime).toBeDefined();
			expect(http.runtime.baseURL).toBe(mockConfig.baseURL);
			expect(http.runtime.timeout).toBe(mockConfig.timeout);
		});

		it('should have all HTTP method functions', () => {
			expect(typeof http.GET).toBe('function');
			expect(typeof http.POST).toBe('function');
			expect(typeof http.PUT).toBe('function');
			expect(typeof http.PATCH).toBe('function');
			expect(typeof http.DELETE).toBe('function');
			expect(typeof http.FORM).toBe('function');
			expect(typeof http.upload).toBe('function');
			expect(typeof http.download).toBe('function');
			expect(typeof http.cache).toBe('function');
			expect(typeof http.api).toBe('function');
		});
	});

	describe('onRequest', () => {
		let context: HttpContext;

		beforeEach(() => {
			context = {
				request: 'http://test.api.com/test',
				options: {
					method: 'GET',
					headers: new Headers()
				}
			};
		});

		it('should add authorization header when token exists', async () => {
			await onRequest(context, http.runtime);
			expect(context.options.headers.get('Authorization')).toBe('Bearer test-token');
		});

		it('should call auth function when auth option is true', async () => {
			context.options.auth = true;
			const fn = mockConfig.auth as jest.Mock;
			fn.mockReturnValue(true);
			await onRequest(context, http.runtime);
			expect(mockConfig.auth).toHaveBeenCalled();
		});

		// it('should throw error when auth fails', async () => {
		// 	context.options.auth = true;
		// 	const fn = mockConfig.auth as jest.Mock;
		// 	fn.mockReturnValue(false);
		// 	await expect(onRequest(context, http.runtime)).rejects.toThrow();
		// });
	});

	describe('onResponse', () => {
		let context: HttpContext;

		beforeEach(() => {
			context = {
				request: 'http://test.api.com/test',
				options: { method: 'GET', headers: new Headers() },
				response: {
					ok: true,
					_data: {
						data: { id: 1, name: 'test' },
						traceId: 'test-trace-id'
					}
				} as any
			};
		});

		it('should extract traceId from response data', () => {
			onResponse(context, http.runtime);
			expect(context.response!.traceId).toBe('test-trace-id');
		});

		it('should extract data from response', () => {
			onResponse(context, http.runtime);
			expect(context.response!._data).toEqual({ id: 1, name: 'test' });
		});

		// it('should throw error when response contains error message', () => {
		// 	context.response!._data = { message: 'Error message', code: 400 };
		// 	expect(() => onResponse(context, http.runtime)).toThrow();
		// });
	});

	// describe('HTTP Methods', () => {
	// 	beforeEach(() => {
	// 		global.fetch = jest.fn(() =>
	// 			Promise.resolve({
	// 				ok: true,
	// 				json: () => Promise.resolve({ data: 'test' })
	// 			})
	// 		) as jest.Mock;
	// 	});

	// 	it('should make GET request', async () => {
	// 		await http.GET('/test');
	// 		expect(global.fetch).toHaveBeenCalled();
	// 	});

	// 	it('should make POST request', async () => {
	// 		await http.POST('/test', { data: 'test' });
	// 		expect(global.fetch).toHaveBeenCalled();
	// 	});

	// 	it('should make PUT request', async () => {
	// 		await http.PUT('/test', { data: 'test' });
	// 		expect(global.fetch).toHaveBeenCalled();
	// 	});

	// 	it('should make DELETE request', async () => {
	// 		await http.DELETE('/test');
	// 		expect(global.fetch).toHaveBeenCalled();
	// 	});
	// });

	// describe('Download', () => {
	// 	beforeEach(() => {
	// 		global.URL.createObjectURL = jest.fn();
	// 		global.URL.revokeObjectURL = jest.fn();
	// 		document.body.appendChild = jest.fn();
	// 		document.createElement = jest.fn().mockReturnValue({
	// 			style: {},
	// 			click: jest.fn(),
	// 			setAttribute: jest.fn()
	// 		});
	// 	});

	// 	it('should not download in server mode', async () => {
	// 		const originalServerMode = SERVERMODE;
	// 		(global as any).SERVERMODE = true;
	// 		const result = await http.download('/test');
	// 		expect(result).toBe(false);
	// 		(global as any).SERVERMODE = originalServerMode;
	// 	});

	// 	it('should handle download success', async () => {
	// 		global.fetch = jest.fn(() => Promise.resolve({ ok: true })) as jest.Mock;
	// 		const result = await http.download('/test');
	// 		expect(result).toBe(true);
	// 		expect(global.URL.createObjectURL).toHaveBeenCalled();
	// 		expect(document.createElement).toHaveBeenCalledWith('a');
	// 	});

	// 	it('should handle download failure', async () => {
	// 		global.fetch = jest.fn(() => Promise.reject('Error')) as jest.Mock;
	// 		const result = await http.download('/test');
	// 		expect(result).toBe(false);
	// 	});
	// });
});
