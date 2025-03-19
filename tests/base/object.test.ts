import { empty, clear } from '../../src/base/object';

describe('object utils', () => {
	describe('empty', () => {
		it('should remove null and undefined values by default', () => {
			const obj = {
				a: null,
				b: undefined,
				c: 'value',
				d: 0
			};
			expect(empty(obj)).toEqual({ c: 'value', d: 0 });
		});

		it('should handle custom filter function', () => {
			const obj = {
				a: 0,
				b: '',
				c: 'value'
			};
			const result = empty(obj, (x) => x === 0 || x === '');
			expect(result).toEqual({ c: 'value' });
		});

		it('should handle empty or invalid input', () => {
			expect(empty(null)).toEqual({});
			expect(empty(undefined)).toEqual({});
			expect(empty({})).toEqual({});
		});
	});

	describe('clear', () => {
		it('should remove null, undefined and empty strings by default', () => {
			const obj = {
				a: null,
				b: undefined,
				c: '',
				d: '  ',
				e: 'value',
				f: 0
			};
			expect(clear(obj)).toEqual({ e: 'value', f: 0 });
		});

		it('should handle deep cleaning of nested objects', () => {
			const obj = {
				a: {
					b: null,
					c: 'value'
				},
				d: [null, 'value', { e: null, f: 'test' }]
			};
			expect(clear(obj, undefined, true)).toEqual({
				a: { c: 'value' },
				d: ['value', { f: 'test' }]
			});
		});

		it('should handle custom filter function', () => {
			const obj = {
				a: 0,
				b: '',
				c: 'value'
			};
			const result = clear(obj, (x) => x === 0 || x === '');
			expect(result).toEqual({ c: 'value' });
		});

		it('should handle empty or invalid input', () => {
			expect(clear(null)).toBeUndefined();
			expect(clear(undefined)).toBeUndefined();
			expect(clear({})).toEqual({});
		});
	});
});
