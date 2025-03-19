import {
	typeName,
	isArray,
	isSymbol,
	isObject,
	isPrimitive,
	isFunction,
	isFn,
	isPromise,
	isAsync,
	isString,
	isNumber,
	isDate,
	isEmpty
} from '../../src/base/type';

describe('type utils', () => {
	describe('typeName', () => {
		it('should return correct type names', () => {
			expect(typeName({})).toBe('Object');
			expect(typeName([])).toBe('Array');
			expect(typeName('string')).toBe('string');
			expect(typeName(123)).toBe('number');
			expect(typeName(true)).toBe('boolean');
			expect(typeName(null)).toBe('Null');
			expect(typeName(undefined)).toBe('undefined');
			expect(typeName(new Date())).toBe('Date');
		});
	});

	describe('type checks', () => {
		it('should check arrays correctly', () => {
			expect(isArray([])).toBe(true);
			expect(isArray([1, 2, 3])).toBe(true);
			expect(isArray({})).toBe(false);
			expect(isArray(null)).toBe(false);
		});

		it('should check symbols correctly', () => {
			expect(isSymbol(Symbol('test'))).toBe(true);
			expect(isSymbol('string')).toBe(false);
		});

		it('should check objects correctly', () => {
			expect(isObject({})).toBe(true);
			expect(isObject({ a: 1 })).toBe(true);
			expect(isObject([])).toBe(false);
			expect(isObject(null)).toBe(false);
		});

		it('should check primitives correctly', () => {
			expect(isPrimitive(123)).toBe(true);
			expect(isPrimitive('string')).toBe(true);
			expect(isPrimitive(true)).toBe(true);
			expect(isPrimitive(null)).toBe(true);
			expect(isPrimitive(undefined)).toBe(true);
			expect(isPrimitive({})).toBe(false);
			expect(isPrimitive([])).toBe(false);
		});

		it('should check functions correctly', () => {
			expect(isFunction(() => {})).toBe(true);
			expect(isFunction(function () {})).toBe(true);
			expect(isFunction({})).toBe(false);
			expect(isFn(() => {})).toBe(true);
		});

		it('should check promises correctly', () => {
			expect(isPromise(Promise.resolve())).toBe(true);
			expect(isPromise(new Promise(() => {}))).toBe(true);
			expect(isPromise({})).toBe(false);
		});

		it('should check async functions correctly', () => {
			expect(isAsync(async () => {})).toBe(true);
			expect(isAsync(() => {})).toBe(false);
		});

		it('should check strings correctly', () => {
			expect(isString('')).toBe(true);
			expect(isString('test')).toBe(true);
			expect(isString(new String('test'))).toBe(true);
			expect(isString(123)).toBe(false);
		});

		it('should check numbers correctly', () => {
			expect(isNumber(123)).toBe(true);
			expect(isNumber(0)).toBe(true);
			expect(isNumber(NaN)).toBe(false);
			expect(isNumber('123')).toBe(false);
		});

		it('should check dates correctly', () => {
			expect(isDate(new Date())).toBe(true);
			expect(isDate('2023-01-01')).toBe(false);
		});

		it('should check empty values correctly', () => {
			expect(isEmpty(null)).toBe(true);
			expect(isEmpty(undefined)).toBe(true);
			expect(isEmpty('')).toBe(true);
			expect(isEmpty([])).toBe(true);
			expect(isEmpty({})).toBe(true);
			expect(isEmpty('test')).toBe(false);
			expect(isEmpty([1])).toBe(false);
			expect(isEmpty({ a: 1 })).toBe(false);
		});
	});
});
