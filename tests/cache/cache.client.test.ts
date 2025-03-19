// 不适合 node 下测试，仅支持浏览器端测试

import { SERVERMODE } from '../../config';

import Cache from '../../src/cache/cache.client';
import local from 'localforage';
const cache = new Cache();

describe('cache client', () => {
	describe('mode', () => {
		it('only in brower test', async () => {
			if (SERVERMODE) return;
		});
	});

	if (SERVERMODE) return;

	beforeEach(async () => {
		// Clear cache before each test
		await local.clear();
	});

	describe('set', () => {
		it('should store value in cache', async () => {
			const key = 'test-key';
			const value = { data: 'test-value' };
			await cache.set(key, value);
			const stored = await local.getItem(key);
			expect(stored).toEqual(value);
		});

		it('should handle null value', async () => {
			const key = 'null-key';
			await cache.set(key, null);
			const stored = await local.getItem(key);
			expect(stored).toBe('null');
		});
	});

	describe('get', () => {
		it('should retrieve stored value', async () => {
			const key = 'test-key';
			const value = { data: 'test-value' };
			await local.setItem(key, JSON.stringify(value));
			const result = await cache.get(key);
			expect(result).toEqual(value);
		});

		it('should return null for non-existent key', async () => {
			const result = await cache.get('non-existent');
			expect(result).toBeNull();
		});
	});

	describe('remove', () => {
		it('should remove stored value', async () => {
			const key = 'test-key';
			await local.setItem(key, 'test-value');
			await cache.remove(key);
			expect(local.getItem(key)).toBeNull();
		});

		it('should handle non-existent key', async () => {
			await cache.remove('non-existent');
			expect(await local.getItem('non-existent')).toBeNull();
		});
	});
});
