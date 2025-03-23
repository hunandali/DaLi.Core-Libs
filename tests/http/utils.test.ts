import { getToken, isPayloadMethod, showError, updateId, updateReqest } from '../../src/http/utils';
import { HttpConfig, HttpContext, HttpError } from '../../src/http/types';

describe('HTTP Utils Tests', () => {
	describe('isPayloadMethod', () => {
		it('should return true for methods that can carry payload', () => {
			expect(isPayloadMethod('POST')).toBe(true);
			expect(isPayloadMethod('PUT')).toBe(true);
			expect(isPayloadMethod('PATCH')).toBe(true);
			expect(isPayloadMethod('DELETE')).toBe(true);
		});

		it('should return false for methods that cannot carry payload', () => {
			expect(isPayloadMethod('GET')).toBe(false);
			expect(isPayloadMethod('HEAD')).toBe(false);
			expect(isPayloadMethod()).toBe(false);
		});
	});

	describe('getToken', () => {
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

		it('should return undefined when no token is provided', () => {
			expect(getToken(context)).toBeUndefined();
		});

		it('should return token from options.body when tokenContent is true', () => {
			context.options.body = { token: 'test-token' };
			expect(getToken(context, true)).toBe('test-token');
			expect(context.options.body).not.toHaveProperty('token');
		});

		it('should return token from options.params when tokenContent is true', () => {
			context.options.params = { token: 'test-token' };
			expect(getToken(context, true)).toBe('test-token');
			expect(context.options.params).not.toHaveProperty('token');
		});

		it('should return token from function when tokenContent is a function', () => {
			const tokenFn = jest.fn().mockReturnValue('test-token');
			expect(getToken(context, tokenFn)).toBe('test-token');
			expect(tokenFn).toHaveBeenCalledWith(context);
		});

		it('should return token directly when tokenContent is a string', () => {
			expect(getToken(context, 'test-token')).toBe('test-token');
		});
	});

	describe('updateReqest', () => {
		it('should handle string request', () => {
			const result = updateReqest('http://test.api.com/test', { method: 'GET' });
			expect(result.url).toBe('http://test.api.com/test');
		});

		it('should handle Request object', () => {
			const request = new Request('http://test.api.com/test');
			const result = updateReqest(request, { method: 'GET' });
			expect(result.url).toBe('http://test.api.com/test');
		});

		it('should append baseURL when provided', () => {
			const result = updateReqest('/test', {
				method: 'GET',
				baseURL: 'http://test.api.com'
			});
			expect(result.url).toBe('http://test.api.com/test');
		});

		// it('should handle path parameters', () => {
		// 	const result = updateReqest('/users/{id}', {
		// 		method: 'GET',
		// 		params: { id: '123' }
		// 	});
		// 	expect(result.url).toBe('/users/123');
		// 	expect(result.options.params).not.toHaveProperty('id');
		// });

		it('should handle query parameters', () => {
			const result = updateReqest('/users', {
				method: 'GET',
				query: { page: '1', size: '10' }
			});
			expect(result.options.query).toEqual({ page: '1', size: '10' });
		});
	});

	describe('showError', () => {
		let config: HttpConfig;
		let error: HttpError;

		beforeEach(() => {
			config = { private: true, alert: jest.fn().mockReturnValue(true) };
			error = {
				name: 'Test Error',
				message: 'Test message',
				status: 400,
				statusCode: 400,
				request: 'http://test.api.com/test',
				options: { method: 'GET' }
			};
		});

		it('should return false when config is not provided', () => {
			expect(showError(undefined as any, error)).toBe(false);
		});

		it('should return false when error is not provided', () => {
			expect(showError(config, undefined as any)).toBe(false);
		});

		it('should call alert function and return true', () => {
			expect(showError(config, error)).toBe(true);
			expect(config.alert).toHaveBeenCalledWith(error, config);
		});

		it('should not show error again if already alerted', () => {
			error.alerted = true;
			expect(showError(config, error)).toBe(false);
			expect(config.alert).not.toHaveBeenCalled();
		});
	});

	describe('updateId', () => {
		it('should handle undefined input', () => {
			expect(updateId(undefined)).toBeUndefined();
		});

		it('should handle null input', () => {
			expect(updateId(null)).toBeNull();
		});

		it('should handle non-object input', () => {
			expect(updateId('test')).toBe('test');
			expect(updateId(123)).toBe(123);
		});

		it('should handle object without data property', () => {
			const obj = { id: 123 };
			expect(updateId(obj)).toEqual(obj);
		});

		it('should handle object with data property', () => {
			const obj = { data: { id: 123 } };
			expect(updateId(obj.data)).toEqual({ id: 123 });
		});

		it('should handle array of objects', () => {
			const arr = [{ id: 123 }, { id: 456 }];
			expect(updateId(arr)).toEqual(arr);
		});
	});
});
