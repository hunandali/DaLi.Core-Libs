import * as encrypt from '../../src/encrypt';

describe('base64', () => {
	describe('encode', () => {
		it('should encode string to base64', () => {
			const str = 'Hello World';
			expect(encrypt.base64Encode(str)).toBe('SGVsbG8gV29ybGQ=');
		});

		it('should handle empty string', () => {
			expect(encrypt.base64Encode('')).toBe('');
		});

		it('should handle special characters', () => {
			const str = '你好，世界！';
			expect(encrypt.base64Encode(str)).toBe('5L2g5aW977yM5LiW55WM77yB');
		});
	});

	describe('decode', () => {
		it('should decode base64 to string', () => {
			const base64 = 'SGVsbG8gV29ybGQ=';
			expect(encrypt.base64Decode(base64)).toBe('Hello World');
		});

		it('should handle empty string', () => {
			expect(encrypt.base64Decode('')).toBe('');
		});

		it('should handle special characters', () => {
			const base64 = '5L2g5aW977yM5LiW55WM77yB';
			expect(encrypt.base64Decode(base64)).toBe('你好，世界！');
		});
	});
});
