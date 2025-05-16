// 不适合 node 下测试，仅支持浏览器端测试

import { SERVERMODE } from '../../config';
import { objectDownload, jsonDownload } from '../../src/files/json';

describe('json utils', () => {
	describe('mode', () => {
		it('only in brower test', async () => {
			if (SERVERMODE) return;
		});
	});

	if (SERVERMODE) return;

	describe('objectDownload', () => {
		it('should handle empty object', () => {
			expect(() => objectDownload({})).not.toThrow();
		});

		it('should handle null/undefined', () => {
			expect(() => objectDownload(null)).not.toThrow();
			expect(() => objectDownload(undefined)).not.toThrow();
		});

		it('should handle complex objects', () => {
			const data = {
				id: 1,
				name: 'Test',
				array: [1, 2, 3],
				nested: { a: 1, b: 2 }
			};
			expect(() => objectDownload(data, 'test.json')).not.toThrow();
		});
	});

	describe('download', () => {
		it('should handle empty string', () => {
			expect(() => jsonDownload('')).not.toThrow();
		});

		it('should handle invalid JSON string', () => {
			expect(() => jsonDownload('invalid json')).not.toThrow();
		});

		it('should handle valid JSON string', () => {
			const jsonStr = '{"id":1,"name":"Test"}';
			expect(() => jsonDownload(jsonStr, 'test.json')).not.toThrow();
		});
	});
});
