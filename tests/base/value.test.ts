import {
	isEqual,
	isMatch,
	isMobile,
	isCar,
	isPhone,
	isEmail,
	isUrl,
	isFullUrl,
	isHttp,
	isGuid,
	isChinese,
	isEnglish,
	isName,
	isIP,
	isJSON,
	isInt,
	isFloat
} from '../../src/base/value';

describe('value utils', () => {
	describe('isEqual', () => {
		it('should compare primitive values', () => {
			expect(isEqual(1, 1)).toBe(true);
			expect(isEqual('a', 'a')).toBe(true);
			expect(isEqual(1, 2)).toBe(false);
		});

		it('should compare objects', () => {
			expect(isEqual({ a: 1 }, { a: 1 })).toBe(true);
			expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
			expect(isEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
		});

		it('should compare dates', () => {
			const date1 = new Date('2023-01-01');
			const date2 = new Date('2023-01-01');
			const date3 = new Date('2023-01-02');
			expect(isEqual(date1, date2)).toBe(true);
			expect(isEqual(date1, date3)).toBe(false);
		});

		it('should compare regular expressions', () => {
			expect(isEqual(/abc/, /abc/)).toBe(true);
			expect(isEqual(/abc/, /def/)).toBe(false);
		});
	});

	describe('isMatch', () => {
		it('should match regex patterns', () => {
			expect(isMatch('abc123', /^[a-z]+\d+$/)).toBe(true);
			expect(isMatch('ABC123', /^[a-z]+\d+$/)).toBe(false);
		});
	});

	describe('isMobile', () => {
		it('should validate mobile numbers', () => {
			expect(isMobile('13812345678')).toBe(true);
			expect(isMobile('12345678901')).toBe(false);
			expect(isMobile('1381234567')).toBe(false);
		});
	});

	describe('isCar', () => {
		it('should validate car plate numbers', () => {
			expect(isCar('湘A12345')).toBe(true);
			expect(isCar('湘A123456')).toBe(true);
			expect(isCar('A12345')).toBe(false);
		});
	});

	describe('isPhone', () => {
		it('should validate phone numbers', () => {
			expect(isPhone('0731-12345678')).toBe(true);
			expect(isPhone('13812345678')).toBe(true);
			expect(isPhone('123456')).toBe(false);
		});
	});

	describe('isEmail', () => {
		it('should validate email addresses', () => {
			expect(isEmail('test@example.com')).toBe(true);
			expect(isEmail('test.name@example.co.uk')).toBe(true);
			expect(isEmail('invalid@email')).toBe(false);
		});
	});

	describe('isUrl/isFullUrl/isHttp', () => {
		it('should validate URLs', () => {
			expect(isUrl('http://example.com')).toBe(true);
			expect(isUrl('example.com')).toBe(false);

			expect(isFullUrl('example.com')).toBe(true);
			expect(isFullUrl('http://example.com/path?query=1')).toBe(true);

			expect(isHttp('http://example.com')).toBe(true);
			expect(isHttp('ftp://example.com')).toBe(false);
		});
	});

	describe('isGuid', () => {
		it('should validate GUID strings', () => {
			expect(isGuid('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
			expect(isGuid('invalid-guid')).toBe(false);
		});
	});

	describe('isChinese', () => {
		it('should validate Chinese characters', () => {
			expect(isChinese('中文')).toBe(true);
			expect(isChinese('中文123')).toBe(false);
		});
	});

	describe('isEnglish', () => {
		it('should validate English characters', () => {
			expect(isEnglish('abc')).toBe(true);
			expect(isEnglish('abc123')).toBe(false);
		});
	});

	describe('isName', () => {
		it('should validate names', () => {
			expect(isName('abc123')).toBe(true);
			expect(isName('123abc')).toBe(false);
			expect(isName('a'.repeat(101))).toBe(false);
		});
	});

	describe('isIP', () => {
		it('should validate IP addresses', () => {
			expect(isIP('192.168.1.1')).toBe(true);
			expect(isIP('256.1.2.3')).toBe(false);
			expect(isIP('1.2.3')).toBe(false);
		});
	});

	describe('isJSON', () => {
		it('should validate JSON strings', () => {
			expect(isJSON('{"a":1}')).toBe(true);
			expect(isJSON('invalid json')).toBe(false);
			expect(isJSON('')).toBe(false);
		});
	});

	describe('isInt/isFloat', () => {
		it('should validate numbers', () => {
			expect(isInt(1)).toBe(true);
			expect(isInt(1.5)).toBe(false);

			expect(isFloat(1.5)).toBe(true);
			expect(isFloat(1)).toBe(false);
		});
	});
});
