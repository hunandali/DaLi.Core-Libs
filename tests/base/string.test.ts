import { template, trim, string2Value, stringCut } from '../../src/base/string';

describe('string utils', () => {
	describe('template', () => {
		it('should replace template variables correctly', () => {
			expect(template('Hello, {name}', { name: 'ray' })).toBe('Hello, ray');
			expect(template('Hello, {name}, age: {age}', { name: 'ray', age: 25 })).toBe(
				'Hello, ray, age: 25'
			);
		});

		it('should handle missing data', () => {
			expect(template('Hello, {name}', {})).toBe('Hello, ');
			expect(template('Hello, {name}', { other: 'value' })).toBe('Hello, ');
		});

		it('should work with custom regex', () => {
			expect(template('Hello, <name>', { name: 'ray' }, /<(.+?)>/g)).toBe('Hello, ray');
			expect(template('Hello, [name]', { name: 'ray' }, /\[(.+?)\]/g)).toBe('Hello, ray');
		});
	});

	describe('trim', () => {
		it('should trim default characters', () => {
			expect(trim('  hello  ')).toBe('hello');
			expect(trim('\n\rhello\t\v')).toBe('hello');
			expect(trim('　hello　')).toBe('hello');
		});

		it('should trim custom characters', () => {
			expect(trim('__hello__', '_')).toBe('hello');
			expect(trim('/repos/:owner/:repo/', '/')).toBe('repos/:owner/:repo');
			expect(trim('222222__hello__1111111', '12_')).toBe('hello');
		});

		it('should handle null and undefined', () => {
			expect(trim(null)).toBe('');
			expect(trim(undefined)).toBe('');
		});
	});

	describe('string2Value', () => {
		it('should convert strings to appropriate types', () => {
			expect(string2Value('123')).toBe(123);
			expect(string2Value('true')).toBe(true);
			expect(string2Value('false')).toBe(false);
			expect(string2Value('null')).toBe(null);
			expect(string2Value('undefined')).toBe(undefined);
			expect(string2Value('hello')).toBe('hello');
		});

		it('should handle array conversion', () => {
			expect(string2Value('1,2,3', ',')).toEqual([1, 2, 3]);
			expect(string2Value('true,false', ',')).toEqual([true, false]);
			expect(string2Value('a,b,c', ',')).toEqual(['a', 'b', 'c']);
		});
	});

	describe('stringCut', () => {
		it('should cut string with default settings', () => {
			expect(stringCut('Hello World', 5)).toBe('He……ld');
			expect(stringCut('Hello', 10)).toBe('Hello');
		});

		it('should cut string with custom ellipsis', () => {
			expect(stringCut('Hello World', 5, '...')).toBe('He...ld');
		});

		it('should handle different modes', () => {
			expect(stringCut('Hello World', 5, '...', 1)).toBe('Hello...');
			expect(stringCut('Hello World', 5, '...', 2)).toBe('...World');
		});

		it('should handle empty or invalid input', () => {
			expect(stringCut('')).toBe('');
			expect(stringCut(null as any)).toBe('');
			expect(stringCut(undefined as any)).toBe('');
		});
	});
});
