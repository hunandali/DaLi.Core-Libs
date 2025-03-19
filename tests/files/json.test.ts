// 不适合 node 下测试，仅支持浏览器端测试

import { SERVERMODE } from '../../config';
import { downloadObject, download } from '../../src/files/json';

describe('json utils', () => {
	describe('mode', () => {
		it('only in brower test', async () => {
			if (SERVERMODE) return;
		});
	});

	if (SERVERMODE) return;

	describe('downloadObject', () => {
		it('should handle empty object', () => {
			expect(() => downloadObject({})).not.toThrow();
		});

		it('should handle null/undefined', () => {
			expect(() => downloadObject(null)).not.toThrow();
			expect(() => downloadObject(undefined)).not.toThrow();
		});

		it('should handle complex objects', () => {
			const data = {
				id: 1,
				name: 'Test',
				array: [1, 2, 3],
				nested: { a: 1, b: 2 }
			};
			expect(() => downloadObject(data, 'test.json')).not.toThrow();
		});
	});

	describe('download', () => {
		it('should handle empty string', () => {
			expect(() => download('')).not.toThrow();
		});

		it('should handle invalid JSON string', () => {
			expect(() => download('invalid json')).not.toThrow();
		});

		it('should handle valid JSON string', () => {
			const jsonStr = '{"id":1,"name":"Test"}';
			expect(() => download(jsonStr, 'test.json')).not.toThrow();
		});
	});
});
