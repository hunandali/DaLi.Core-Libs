// 不适合 node 下测试，仅支持浏览器端测试

import { SERVERMODE } from '../../config';
import { exportJson, exportTable } from '../../src/files/excel';

describe('excel utils', () => {
	describe('mode', () => {
		it('only in brower test', async () => {
			if (SERVERMODE) return;
		});
	});

	if (SERVERMODE) return;

	describe('exportJson', () => {
		it('should handle empty data', () => {
			const data: any[] = [];
			expect(() => exportJson(data, 'test', 'Test')).not.toThrow();
		});

		it('should handle invalid data', () => {
			expect(() => exportJson(null, 'test', 'Test')).not.toThrow();
			expect(() => exportJson(undefined, 'test', 'Test')).not.toThrow();
		});

		it('should handle data with filter', () => {
			const data = [
				{ id: 1, name: 'Test1', hidden: true },
				{ id: 2, name: 'Test2', hidden: false }
			];
			expect(() => exportJson(data, 'test', 'Test', ['hidden'])).not.toThrow();
		});
	});

	describe('exportTable', () => {
		it('should handle empty table', () => {
			expect(() => exportTable('', 'test', 'Test')).not.toThrow();
		});

		it('should handle valid table HTML', () => {
			const tableHtml = '<table><tr><td>Test</td></tr></table>';
			expect(() => exportTable(tableHtml, 'test', 'Test')).not.toThrow();
		});
	});
});
