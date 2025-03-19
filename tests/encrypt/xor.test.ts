import * as encrypt from '../../src/encrypt';

describe('xor', () => {
	describe('encode', () => {
		it('xor encode/decode string', () => {
			const str = 'Hello World';
			const key = 'dali';
			const en = encrypt.xor(str, key);
			const de = encrypt.xor(en, key);
			expect(de).toBe(str);
		});
	});
});
