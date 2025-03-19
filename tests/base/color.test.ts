import { HEX2RGB, RGB2HEX, darken, lighten } from '../../src/base/color';

describe('color utils', () => {
	describe('HEX2RGB', () => {
		it('should convert hex to rgb correctly', () => {
			expect(HEX2RGB('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
			expect(HEX2RGB('#00ff00')).toEqual({ r: 0, g: 255, b: 0 });
			expect(HEX2RGB('#0000ff')).toEqual({ r: 0, g: 0, b: 255 });
			expect(HEX2RGB('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
			expect(HEX2RGB('#000000')).toEqual({ r: 0, g: 0, b: 0 });
		});

		it('should handle hex codes without #', () => {
			expect(HEX2RGB('ff0000')).toEqual({ r: 255, g: 0, b: 0 });
			expect(HEX2RGB('00ff00')).toEqual({ r: 0, g: 255, b: 0 });
		});

		it('should handle mixed case hex codes', () => {
			expect(HEX2RGB('#Ff0000')).toEqual({ r: 255, g: 0, b: 0 });
			expect(HEX2RGB('#00Ff00')).toEqual({ r: 0, g: 255, b: 0 });
		});
	});

	describe('RGB2HEX', () => {
		it('should convert rgb to hex correctly', () => {
			expect(RGB2HEX({ r: 255, g: 0, b: 0 })).toBe('#ff0000');
			expect(RGB2HEX({ r: 0, g: 255, b: 0 })).toBe('#00ff00');
			expect(RGB2HEX({ r: 0, g: 0, b: 255 })).toBe('#0000ff');
			expect(RGB2HEX({ r: 255, g: 255, b: 255 })).toBe('#ffffff');
			expect(RGB2HEX({ r: 0, g: 0, b: 0 })).toBe('#000000');
		});

		it('should handle single digit values', () => {
			expect(RGB2HEX({ r: 0, g: 0, b: 1 })).toBe('#000001');
			expect(RGB2HEX({ r: 0, g: 1, b: 0 })).toBe('#000100');
		});
	});

	describe('darken', () => {
		it('should darken colors correctly', () => {
			expect(darken('#ff0000', 0.5)).toBe('#800000');
			expect(darken('#00ff00', 0.5)).toBe('#008000');
			expect(darken('#0000ff', 0.5)).toBe('#000080');
		});

		it('should handle edge cases', () => {
			expect(darken('#ffffff', 1)).toBe('#000000');
			expect(darken('#000000', 0.5)).toBe('#000000');
			expect(darken('#ff0000', 0)).toBe('#ff0000');
		});
	});

	describe('lighten', () => {
		it('should lighten colors correctly', () => {
			expect(lighten('#7f0000', 0.5)).toBe('#bf8080');
			expect(lighten('#007f00', 0.5)).toBe('#80bf80');
			expect(lighten('#00007f', 0.5)).toBe('#8080bf');
		});

		it('should handle edge cases', () => {
			expect(lighten('#000000', 1)).toBe('#ffffff');
			expect(lighten('#ffffff', 0.5)).toBe('#ffffff');
			expect(lighten('#ff0000', 0)).toBe('#ff0000');
		});
	});
});
