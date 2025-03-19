import LRU from '../src/LUR';

describe('LRU缓存测试', () => {
	let lru: LRU;

	beforeEach(() => {
		lru = new LRU(3); // 设置容量为3的缓存
	});

	describe('基本操作', () => {
		it('应正确设置和获取缓存', () => {
			lru.set('key1', 'value1', 0);
			expect(lru.get('key1')).toBe('value1');
		});

		it('应正确处理不存在的键', () => {
			expect(lru.get('nonexistent')).toBeUndefined();
		});

		it('应正确检查键是否存在', () => {
			lru.set('key1', 'value1', 0);
			expect(lru.has('key1')).toBe(true);
			expect(lru.has('nonexistent')).toBe(false);
		});
	});

	describe('容量控制', () => {
		it('应在超出容量时移除最久未使用的项', () => {
			lru.set('key1', 'value1', 0);
			lru.set('key2', 'value2', 0);
			lru.set('key3', 'value3', 0);
			lru.set('key4', 'value4', 0); // 应该移除key1

			expect(lru.get('key1')).toBeUndefined();
			expect(lru.get('key2')).toBe('value2');
			expect(lru.get('key3')).toBe('value3');
			expect(lru.get('key4')).toBe('value4');
		});

		it('应正确更新使用顺序', () => {
			lru.set('key1', 'value1', 0);
			lru.set('key2', 'value2', 0);
			lru.set('key3', 'value3', 0);
			lru.get('key1'); // 更新key1的使用时间
			lru.set('key4', 'value4', 0); // 应该移除key2

			expect(lru.get('key1')).toBe('value1');
			expect(lru.get('key2')).toBeUndefined();
			expect(lru.get('key3')).toBe('value3');
			expect(lru.get('key4')).toBe('value4');
		});
	});

	describe('过期控制', () => {
		it('应正确处理过期时间', async () => {
			lru.set('key1', 'value1', 1); // 1秒后过期
			expect(lru.get('key1')).toBe('value1');

			await new Promise((resolve) => setTimeout(resolve, 1100));
			expect(lru.get('key1')).toBeUndefined();
		});

		it('应正确处理永不过期的项', () => {
			lru.set('key1', 'value1', 0); // 永不过期
			expect(lru.get('key1')).toBe('value1');
		});
	});

	describe('清理操作', () => {
		it('应正确移除单个项', () => {
			lru.set('key1', 'value1', 0);
			lru.set('key2', 'value2', 0);
			lru.remove('key1');

			expect(lru.get('key1')).toBeUndefined();
			expect(lru.get('key2')).toBe('value2');
		});

		it('应正确清除所有缓存', () => {
			lru.set('key1', 'value1', 0);
			lru.set('key2', 'value2', 0);
			lru.clear();

			expect(lru.length()).toBe(0);
			expect(lru.get('key1')).toBeUndefined();
			expect(lru.get('key2')).toBeUndefined();
		});

		it('应正确清理过期项', async () => {
			lru.set('key1', 'value1', 1); // 1秒后过期
			lru.set('key2', 'value2', 0); // 永不过期

			await new Promise((resolve) => setTimeout(resolve, 1100));
			lru.trim();

			expect(lru.get('key1')).toBeUndefined();
			expect(lru.get('key2')).toBe('value2');
		});
	});
});
