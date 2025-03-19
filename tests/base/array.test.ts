import { compare, sort, range } from '../../src/base/array';

describe('array utils', () => {
	describe('compare', () => {
		it('should compare numbers correctly', () => {
			expect(compare({ value: 1 }, { value: 2 }, 'value')).toBeLessThan(0);
			expect(compare({ value: 2 }, { value: 1 }, 'value')).toBeGreaterThan(0);
			expect(compare({ value: 1 }, { value: 1 }, 'value')).toBe(0);
		});

		it('should compare strings correctly', () => {
			expect(compare({ value: 'a' }, { value: 'b' }, 'value')).toBeLessThan(0);
			expect(compare({ value: 'b' }, { value: 'a' }, 'value')).toBeGreaterThan(0);
			expect(compare({ value: 'a' }, { value: 'a' }, 'value')).toBe(0);
		});

		it('should handle undefined values', () => {
			expect(compare({ value: undefined }, { value: 'a' }, 'value')).toBeLessThan(0);
			expect(compare({ value: 'a' }, { value: undefined }, 'value')).toBeGreaterThan(0);
			expect(compare({ value: undefined }, { value: undefined }, 'value')).toBe(0);
		});

		it('should work with custom getter function', () => {
			const getter = (item: { value: any }) => item.value;
			expect(compare({ value: 1 }, { value: 2 }, getter)).toBeLessThan(0);
			expect(compare({ value: 'a' }, { value: 'b' }, getter)).toBeLessThan(0);
		});
	});

	describe('sort', () => {
		it('should sort numbers correctly', () => {
			const arr = [{ value: 3 }, { value: 1 }, { value: 2 }];
			const sorted = sort(arr, (item) => item.value);
			expect(sorted.map((item) => item.value)).toEqual([1, 2, 3]);
		});

		it('should sort strings correctly', () => {
			const arr = [{ value: 'c' }, { value: 'a' }, { value: 'b' }];
			const sorted = sort(arr, (item) => item.value);
			expect(sorted.map((item) => item.value)).toEqual(['a', 'b', 'c']);
		});

		it('should sort in descending order', () => {
			const arr = [{ value: 1 }, { value: 2 }, { value: 3 }];
			const sorted = sort(arr, (item) => item.value, true);
			expect(sorted.map((item) => item.value)).toEqual([3, 2, 1]);
		});

		it('should handle undefined values', () => {
			const arr = [{ value: undefined }, { value: 'a' }, { value: 'b' }];
			const sorted = sort(arr, (item) => item.value);
			expect(sorted.map((item) => item.value)).toEqual([undefined, 'a', 'b']);
		});
	});

	describe('range', () => {
		it('should generate range with only length', () => {
			const result = Array.from(range(3));
			expect(result).toEqual([0, 1, 2, 3]);
		});

		it('should generate range with start and end', () => {
			const result = Array.from(range(1, 3));
			expect(result).toEqual([1, 2, 3]);
		});

		it('should generate range with custom value', () => {
			const result = Array.from(range(0, 2, 'x'));
			expect(result).toEqual(['x', 'x', 'x']);
		});

		it('should generate range with mapper function', () => {
			const result = Array.from(range(0, 2, (i) => `value${i}`));
			expect(result).toEqual(['value0', 'value1', 'value2']);
		});

		it('should generate range with custom step', () => {
			const result = Array.from(range(0, 6, (i) => i, 2));
			expect(result).toEqual([0, 2, 4, 6]);
		});
	});
});
