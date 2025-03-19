import { number, inRange, toFloat, toInt, DecimalLength, toDate } from '../../src/base/number';

describe('number utils', () => {
	describe('number', () => {
		it('should convert valid numbers correctly', () => {
			expect(number('123')).toBe(123);
			expect(number(456)).toBe(456);
			expect(number('12.34')).toBe(12.34);
		});

		it('should handle invalid numbers', () => {
			expect(number('abc')).toBe(0);
			expect(number(null)).toBe(0);
			expect(number(undefined)).toBe(0);
			expect(number({})).toBe(0);
		});
	});

	describe('inRange', () => {
		it('should check range with start and end', () => {
			expect(inRange(3, 2, 4)).toBe(true);
			expect(inRange(4, 8)).toBe(true);
			expect(inRange(4, 2)).toBe(false);
			expect(inRange(2, 2)).toBe(false);
		});

		it('should handle invalid inputs', () => {
			expect(inRange('3' as any, 2, 4)).toBe(false);
			expect(inRange(3, '2' as any, 4)).toBe(false);
			expect(inRange(3, 2, '4' as any)).toBe(false);
		});
	});

	describe('toFloat', () => {
		it('should convert to float correctly', () => {
			expect(toFloat('12.34')).toBe(12.34);
			expect(toFloat('12')).toBe(12.0);
			expect(toFloat(12.34)).toBe(12.34);
		});

		it('should handle invalid inputs', () => {
			expect(toFloat('abc')).toBe(0.0);
			expect(toFloat(null)).toBe(0.0);
			expect(toFloat(undefined)).toBe(0.0);
		});

		it('should use custom default value', () => {
			expect(toFloat('abc', 1.5)).toBe(1.5);
			expect(toFloat(null, null)).toBe(null);
		});
	});

	describe('toInt', () => {
		it('should convert to integer correctly', () => {
			expect(toInt('123')).toBe(123);
			expect(toInt('12.34')).toBe(12);
			expect(toInt(12.34)).toBe(12);
		});

		it('should handle invalid inputs', () => {
			expect(toInt('abc')).toBe(0);
			expect(toInt(null)).toBe(0);
			expect(toInt(undefined)).toBe(0);
		});

		it('should use custom default value', () => {
			expect(toInt('abc', 5)).toBe(5);
			expect(toInt(null, null)).toBe(null);
		});
	});

	describe('DecimalLength', () => {
		it('should count decimal places correctly', () => {
			expect(DecimalLength(12.345)).toBe(3);
			expect(DecimalLength(12.0)).toBe(0);
			expect(DecimalLength(12)).toBe(0);
		});
	});

	describe('toDate', () => {
		it('should convert seconds to time format', () => {
			expect(toDate(3661)).toBe('01:01:01');
			expect(toDate(7200)).toBe('02:00:00');
			expect(toDate(45)).toBe('00:00:45');
		});
	});
});
