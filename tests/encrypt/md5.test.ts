import * as encrypt from '../../src/encrypt';

describe('MD5', () => {
	describe('MD5', () => {
		it('should hash empty string correctly', () => {
			const result = encrypt.MD5('');
			expect(result).toBe('d41d8cd98f00b204e9800998ecf8427e');
		});

		it('should hash basic string correctly', () => {
			const result = encrypt.MD5('hello');
			expect(result).toBe('5d41402abc4b2a76b9719d911017c592');
		});

		it('should hash UTF-8 string correctly', () => {
			const result = encrypt.MD5('你好，世界');
			expect(result).toBe('dbefd3ada018615b35588a01e216ae6e');
		});

		it('should return Int32Array when raw is true', () => {
			const result = encrypt.MD5('test', true);
			expect(result).toBeInstanceOf(Int32Array);
			expect(result.length).toBe(4);
		});
	});
});
