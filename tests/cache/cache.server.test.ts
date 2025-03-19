import Cache from '../../src/cache/cache.server';
const cache = new Cache();

describe('cache server', () => {
	beforeEach(() => {
		// Clear cache before each test
		cache.clear();
	});

	describe('set and get', () => {
		it('should store and retrieve value in cache', async () => {
			const key = 'test-key';
			const value = { data: 'test-value' };
			await cache.set(key, value);
			const result = await cache.get(key);
			expect(result).toEqual(value);
		});

		it('should handle null value', async () => {
			const key = 'null-key';
			await cache.set(key, null);
			const result = await cache.get(key);
			expect(result).toBeNull();
		});

		it('should return undefined for non-existent key', async () => {
			const result = await cache.get('non-existent');
			expect(result).toBeUndefined();
		});

		it('should use valueFunc when key not exists', async () => {
			const key = 'func-key';
			const value = { data: 'func-value' };
			const result = await cache.get(key, () => value);
			expect(result).toEqual(value);

			// Should be cached
			const cachedResult = await cache.get(key);
			expect(cachedResult).toEqual(value);
		});

		it('should handle valueFunc error', async () => {
			const key = 'error-key';
			const result = await cache.get(key);
			expect(result).toBeUndefined();
		});
	});

	describe('remove', () => {
		it('should remove stored value', async () => {
			const key = 'test-key';
			const value = { data: 'test-value' };
			await cache.set(key, value);
			await cache.remove(key);
			const result = await cache.get(key);
			expect(result).toBeUndefined();
		});

		it('should handle non-existent key', async () => {
			await cache.remove('non-existent');
			const result = await cache.get('non-existent');
			expect(result).toBeUndefined();
		});
	});

	describe('clear', () => {
		it('should clear all stored values', async () => {
			await cache.set('key1', 'value1');
			await cache.set('key2', 'value2');
			await cache.clear();
			const length = await cache.length();
			expect(length).toBe(0);
		});
	});

	describe('keys', () => {
		it('should return all cache keys', async () => {
			await cache.set('key1', 'value1');
			await cache.set('key2', 'value2');
			const keys = await cache.keys();
			expect(keys).toEqual(['key1', 'key2']);
		});

		it('should return empty array when cache is empty', async () => {
			await cache.clear();
			const keys = await cache.keys();
			expect(keys).toEqual([]);
		});
	});

	describe('length', () => {
		it('should return correct cache length', async () => {
			await cache.clear();
			await cache.set('key1', 'value1');
			await cache.set('key2', 'value2');
			const length = await cache.length();
			expect(length).toBe(2);
		});

		it('should return 0 when cache is empty', async () => {
			await cache.clear();
			const length = await cache.length();
			expect(length).toBe(0);
		});
	});
});
