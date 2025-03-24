# 表单验证 (formValidate)

表单验证模块提供了一个灵活的表单数据验证系统，支持多种验证规则，包括必填、类型检查、区间比较、正则匹配等功能。

## 类型定义

### IRule

单个验证规则的接口定义。

```typescript
interface IRule {
	[name: string]: any;

	/** 是否必填 */
	required?: boolean;

	/** 文本是否去除首尾空格后验证 */
	trim?: boolean;

	/** 类型 */
	type?:
		| 'json'
		| 'url'
		| 'email'
		| 'tel'
		| 'phone'
		| 'mobile'
		| 'mobilephone'
		| 'guid'
		| 'number'
		| 'chinese'
		| 'english'
		| 'ip'
		| 'name';

	/** 正则表达式 */
	pattern?: RegExp | string;

	/** 最小值 */
	min?: number;

	/** 最大值 */
	max?: number;

	/** 最小长度 */
	minLength?: number;

	/** 最大长度 */
	maxLength?: number;

	/** 最小时间 */
	minDate?: string;

	/** 最大时间 */
	maxDate?: string;

	/** 提示信息 */
	message?: string;

	/** 自定义验证规则 */
	validate?: (value: any) => true | string;
}
```

### IRules

规则列表类型，可以是单个规则对象或规则数组。

```typescript
type IRules = Array<IRule> | IRule;
```

## 方法列表

### validate

验证数据是否符合规则。

```typescript
validate(rules: IRules | undefined, value: any): true | string;
```

**参数：**

-   `rules` - 验证规则，可以是单个规则或规则数组
-   `value` - 要验证的值

**返回值：**

-   验证通过返回 true
-   验证失败返回错误提示字符串

### validateRule

验证单条规则。

```typescript
validateRule(rule: IRule, value: any): true | string;
```

**参数：**

-   `rule` - 单个验证规则
-   `value` - 要验证的值

### concat

合并多个规则。

```typescript
concat(...args: IRules[]): IRule[];
```

**参数：**

-   `args` - 要合并的规则列表

### description

获取规则的描述文本。

```typescript
description(rules: IRules): string;
```

**参数：**

-   `rules` - 要描述的规则

### hasRules

检查是否存在有效的规则。

```typescript
hasRules(rules: IRules): boolean;
```

**参数：**

-   `rules` - 要检查的规则

### hasRequired

检查是否包含必填规则。

```typescript
hasRequired(rules: IRules): boolean;
```

**参数：**

-   `rules` - 要检查的规则

## 使用示例

```typescript
// 创建验证规则
const rules = [
	{ required: true, message: '此项必填' },
	{ type: 'email', message: '请输入有效的邮箱地址' },
	{ minLength: 6, maxLength: 20, message: '长度必须在6-20个字符之间' }
];

// 验证数据
const result = validate(rules, 'test@example.com');

// 合并规则
const combinedRules = concat({ required: true }, { type: 'email' });

// 获取规则描述
const desc = description(rules); // => '必填；要求格式为邮箱；长度必须大于等于6；长度必须小于等于20'

// 检查是否存在规则
const hasRule = hasRules(rules); // => true

// 检查是否包含必填规则
const isRequired = hasRequired(rules); // => true
```

## 支持的验证类型

1. **必填验证**

    - required: true - 必填项
    - trim: true - 去除首尾空格后验证

2. **类型验证**

    - json - JSON 格式
    - url - 网址格式
    - email - 邮箱格式
    - tel/phone - 电话号码
    - mobile/mobilephone - 手机号码
    - guid - GUID 格式
    - number - 数字格式
    - chinese - 中文字符
    - english - 英文字符
    - ip - IP 地址
    - name - 字母开头的字符串（仅包含字母、数字、下划线与横线）

3. **区间验证**

    - min/max - 数值范围
    - minLength/maxLength - 长度范围
    - minDate/maxDate - 日期范围

4. **正则验证**

    - pattern - 自定义正则表达式

5. **自定义验证**
    - validate - 自定义验证函数，返回 true 表示通过，返回字符串表示错误信息
