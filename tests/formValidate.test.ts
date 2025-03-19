import { isFullUrl, isHttp } from '../src/base';
import formValidate from '../src/formValidate';

describe('FormValidate', () => {
	describe('validate', () => {
		test('should return true when no rules provided', () => {
			expect(formValidate.validate(undefined, 'test')).toBe(true);
			expect(formValidate.validate([], 'test')).toBe(true);
		});

		test('should validate required rule', () => {
			const rules = [{ required: true }];
			expect(formValidate.validate(rules, '')).toBe('此项目必须填写');
			expect(formValidate.validate(rules, 'test')).toBe(true);
			expect(formValidate.validate(rules, null)).toBe('此项目必须填写');
			expect(formValidate.validate(rules, [])).toBe('此项目必须填写');
			expect(formValidate.validate(rules, [1])).toBe(true);
			expect(formValidate.validate(rules, true)).toBe(true);
			expect(formValidate.validate(rules, {})).toBe('此项目必须填写');
			expect(formValidate.validate(rules, { key: 'value' })).toBe(true);
		});

		test('should validate type rules', () => {
			expect(formValidate.validate([{ type: 'email' }], 'test@example.com')).toBe(true);
			expect(formValidate.validate([{ type: 'email' }], 'invalid')).toBe('非有效 邮箱 数据');
			expect(formValidate.validate([{ type: 'url' }], 'https://example.com')).toBe(true);
			expect(formValidate.validate([{ type: 'url' }], 'invalid')).toBe('非有效 网址 数据');
			expect(formValidate.validate([{ type: 'mobile' }], '13800138000')).toBe(true);
			expect(formValidate.validate([{ type: 'mobilephone' }], '1234')).toBe(
				'非有效 手机号码 数据'
			);
			expect(formValidate.validate([{ type: 'number' }], 123)).toBe(true);
			expect(formValidate.validate([{ type: 'number' }], 'abc')).toBe('非有效 数字 数据');
			expect(formValidate.validate([{ type: 'guid' }], 'abc')).toBe('非有效 GUID 数据');
			expect(formValidate.validate([{ type: 'chinese' }], 'abc')).toBe(
				'非有效 中文字符 数据'
			);
			expect(formValidate.validate([{ type: 'english' }], 'abc')).toBe(true);
			expect(formValidate.validate([{ type: 'ip' }], 'abc')).toBe('非有效 IP 数据');
			expect(formValidate.validate([{ type: 'name' }], 'abc')).toBe(true);
			expect(formValidate.validate([{ type: 'xxx' }], 'abc')).toBe('不支持此格式 [xxx] 验证');
		});

		test('should validate range rules', () => {
			expect(formValidate.validate([{ min: 5 }], 10)).toBe(true);
			expect(formValidate.validate([{ min: 5 }], 3)).toBe('此值必须大于等于 5');
			expect(formValidate.validate([{ max: 5 }], 3)).toBe(true);
			expect(formValidate.validate([{ max: 5 }], 10)).toBe('此值必须小于等于 5');
			expect(formValidate.validate([{ minLength: 2 }], 'abc')).toBe(true);
			expect(formValidate.validate([{ minLength: 2 }], 'a')).toBe('此值长度必须大于等于 2');
			expect(formValidate.validate([{ maxLength: 5 }], 'abc')).toBe(true);
			expect(formValidate.validate([{ maxLength: 5 }], 'abcdef')).toBe(
				'此值长度必须小于等于 5'
			);
		});

		test('should validate date range rules', () => {
			const today = new Date();
			const yesterday = new Date(today);
			yesterday.setDate(today.getDate() - 1);
			const tomorrow = new Date(today);
			tomorrow.setDate(today.getDate() + 1);

			expect(
				formValidate.validate([{ minDate: yesterday.toISOString() }], today.toISOString())
			).toBe(true);
			expect(
				formValidate.validate([{ maxDate: tomorrow.toISOString() }], today.toISOString())
			).toBe(true);
			expect(
				formValidate.validate([{ minDate: tomorrow.toISOString() }], today.toISOString())
			).toMatch(/时间必须晚于或者等于/);
			expect(
				formValidate.validate([{ maxDate: yesterday.toISOString() }], today.toISOString())
			).toMatch(/时间必须早于或者等于/);
		});

		test('should validate pattern rules', () => {
			expect(formValidate.validate([{ pattern: /^\d+$/ }], '123')).toBe(true);
			expect(formValidate.validate([{ pattern: /^\d+$/ }], 'abc')).toBe('不符合指定正则规则');
		});

		test('should validate custom function rules', () => {
			const customRule = {
				validate: (value: any) => (value === 'valid' ? true : '值必须为valid')
			};
			expect(formValidate.validate([customRule], 'valid')).toBe(true);
			expect(formValidate.validate([customRule], 'invalid')).toBe('值必须为valid');
		});
	});

	describe('description', () => {
		test('should return empty string when no rules provided', () => {
			expect(formValidate.description([])).toBe('');
		});

		test('should describe required rule', () => {
			expect(formValidate.description([{ required: true }])).toBe('必填');
		});

		test('should describe type rules', () => {
			expect(formValidate.description([{ type: 'email' }])).toBe('要求格式为邮箱');
			expect(formValidate.description([{ type: 'url' }])).toBe('要求格式为网址');
			expect(formValidate.description([{ type: 'mobile' }])).toBe('要求格式为手机号码');
		});

		test('should describe range rules', () => {
			expect(formValidate.description([{ min: 5 }])).toBe('必须大于等于5');
			expect(formValidate.description([{ max: 10 }])).toBe('必须小于等于10');
			expect(formValidate.description([{ minLength: 2 }])).toBe('长度必须大于等于2');
			expect(formValidate.description([{ maxLength: 5 }])).toBe('长度必须小于等于5');
		});

		test('should describe pattern rules', () => {
			expect(formValidate.description([{ pattern: /^\d+$/ }])).toBe('要求符合规则：/^\\d+$/');
		});

		test('should combine multiple rule descriptions', () => {
			const rules = [{ required: true }, { type: 'email' }, { maxLength: 50 }];
			expect(formValidate.description(rules)).toBe(
				'必填；要求格式为邮箱；长度必须小于等于50'
			);
		});
	});

	describe('utility functions', () => {
		test('should check if rules exist', () => {
			expect(formValidate.hasRules([])).toBe(false);
			expect(formValidate.hasRules([{ required: true }])).toBe(true);
		});

		test('should check if required rule exists', () => {
			expect(formValidate.hasRequired([{ type: 'email' }])).toBe(false);
			expect(formValidate.hasRequired([{ required: true }])).toBe(true);
		});

		test('should concat multiple rule sets', () => {
			const rules1 = [{ required: true }];
			const rules2 = [{ type: 'email' }];
			const combined = formValidate.concat(rules1, rules2);
			expect(combined).toHaveLength(1);
			expect(combined).toContainEqual({ required: true, type: 'email' });
		});
	});
});
