/*
' ------------------------------------------------------------
'
' 	Copyright © 2022 湖南大沥网络科技有限公司.
'
' 	  author:	木炭(WOODCOAL)
' 	   email:	i@woodcoal.cn
' 	homepage:	http://www.hunandali.com/
'
' ------------------------------------------------------------
'
' 	验证规则库
'
' 	name: lib.formValidate
' 	create: 2023-11-02
' 	memo: 数据验证规则操作
' 	
' 	验证规则：
' 	1. required(trim)		必填(是否先 tirm)
' 	2. 区间比较		Number 比较大小			Array 比较数量			String 比较字符长度			Datetime 比较时间
' 		比较数字大小：min / max
' 		比较长度： minLenght / maxLength
' 		比较日期： minDate /  maxDate
' 	3. 常用类型	url / email / mobile / mobilephone / phone / guid / number / chinese / english / ip / name
' 	4. 其他正则表达式
' 	
' ------------------------------------------------------------
*/

import dayjs from 'dayjs';
import {
	hasArray,
	hasObject,
	isArray,
	isBoolean,
	isChinese,
	isEmail,
	isEnglish,
	isFn,
	isGuid,
	isHttp,
	isIP,
	isJSON,
	isMobile,
	isName,
	isNil,
	isNumber,
	isObject,
	isPhone,
	isString,
	merge
} from './base';

/** 规则接口 */
export interface IRule {
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

/** 规则列表类型 */
export type IRules = Array<IRule> | IRule;

/** 规则验证 */
export class FormValidate {
	/** 规则合并，并转换成数组规则列表 */
	concat(...args: IRules[]) {
		if (args.length < 1) return;

		let rules: IRule[] = [];

		for (let index = 0; index < args.length; index++) {
			let rule = args[index];
			rule && (rule = this.updateRules(rule));
			hasArray(rule) && (rules = merge(rules, rule) as IRule[]);
		}

		return rules;
	}

	/********************************************************************/

	/**
	 * 规则组验证
	 * @param rules	规则对象，数组或者对象
	 * @param value	要验证的值
	 * @returns 	成功返回 true 否则返回错误提示；无规则则表示无需验证,直接返回成功!
	 */
	validate(rules: IRules | undefined, value: any) {
		if (!rules) return true;

		rules = this.updateRules(rules);
		if (!hasArray(rules)) return true;

		// 验证结果
		const messages = (rules as IRule[])
			.filter((rule) => hasObject(rule))
			.map((rule) => this.validateRule(rule, value))
			.filter((flag) => flag !== true);

		return messages.length === 0 ? true : messages.join('；');
	}

	/**
	 * 单条规则验证
	 * @param rule	规则对象，数组或者对象
	 * @param value	要验证的值
	 * @returns 	成功返回 true 否则返回错误提示
	 */
	validateRule(rule: IRule, value: any) {
		let message = this.validateRequired(rule, value);
		if (message === true) message = this.validateType(rule, value);
		if (message === true) message = this.validateRange(rule, value);
		if (message === true) message = this.validateRegular(rule, value);
		if (message === true) message = this.validateFunction(rule, value);

		return message;
	}

	/** 验证是否必填 */
	private validateRequired(rule: IRule, value: any) {
		/** 无效数据或者类型直接不检查 */
		if (!rule || rule.required !== true) return true;

		/** 信息提示 */
		const message = rule.message || '此项目必须填写';

		if (isNil(value)) return message;

		// 数组必须存在值
		if (isArray(value)) return value.length > 0 ? true : message;

		// 对象必须存在键
		if (isObject(value)) return Object.keys(value).length > 0 ? true : message;

		// 对于字符
		if (isString(value)) {
			// 检查是否 trim
			if (rule.trim === true) value = value.trim();
			return value.length > 0 ? true : message;
		}

		// 对于 Boolean，必须 true
		if (isBoolean(value)) return value === true ? true : message;

		return true;
	}

	/** 验证正则表达式，仅针对字符串 */
	private validateRegular(rule: IRule, value: any) {
		/** 无效数据或者类型直接不检查 */
		if (!value || !rule || !rule.pattern) return true;

		/** 非字符串，数字不比较，返回异常 */
		if (!isString(value)) return '非有效文本，不能进行正则比较';

		/** 正则判断 */
		const reg = new RegExp(rule.pattern);
		return reg.test(value) ? true : rule.message || '不符合指定正则规则';
	}

	/**
	 *	验证类型
	 * @param rule 	类型:url / email / mobile / mobilephone / phone
	 * @param value 值:非必须填写的项目，对于空值忽略
	 */
	private validateType(rule: IRule, value: any) {
		/** 无效数据或者类型直接不检查 */
		if (!value || !rule || !rule.type) return true;

		/** 信息提示 */
		const message = (name: string) => (rule.message ? rule.message : `非有效 ${name} 数据`);

		/** 数字类检测 */
		if (rule.type === 'number') return isNumber(value) ? true : message('数字');

		/** 非字符串，数字不比较，返回异常 */
		if (!isString(value) && !isNumber(value)) return message('类型，仅支持判断字符或数字格式');

		/** 字符检测 */
		value = value.toString();

		if (rule.type === 'json') return isJSON(value) ? true : message('JSON');
		if (rule.type === 'url') return isHttp(value) ? true : message('网址');
		if (rule.type === 'email') return isEmail(value) ? true : message('邮箱');
		if (rule.type === 'tel') return isPhone(value) ? true : message('电话号码');
		if (rule.type === 'phone') return isPhone(value) ? true : message('电话号码');
		if (rule.type === 'mobile') return isMobile(value) ? true : message('手机号码');
		if (rule.type === 'mobilephone') return isMobile(value) ? true : message('手机号码');
		if (rule.type === 'guid') return isGuid(value) ? true : message('GUID');
		if (rule.type === 'chinese') return isChinese(value) ? true : message('中文字符');
		if (rule.type === 'english') return isEnglish(value) ? true : message('英文字符');
		if (rule.type === 'ip') return isIP(value) ? true : message('IP');
		if (rule.type === 'name')
			return isName(value) ? true : '仅支持字母数字横线小数点，且需字母开头';

		return '不支持此格式 [' + rule.type + '] 验证';
	}

	/** 验证区间 */
	private validateRange(rule: IRule, value: any) {
		// false 直接返回， true 继续验证
		if (isNil(value) || !rule) return true;

		/** 数值验证 */
		if (rule.min) {
			const min = Number(rule.min);
			if (!isNaN(min)) {
				if (isString(value)) value = Number(value);
				if (isNaN(value)) return '此值必须为数值';

				if (isNumber(value) && value < min)
					return rule.message || '此值必须大于等于 ' + min;
			}
		}

		if (rule.max) {
			const max = Number(rule.max);
			if (!isNaN(max)) {
				if (isString(value)) value = Number(value);
				if (isNaN(value)) return '此值必须为数值';

				if (isNumber(value) && value > max)
					return rule.message || '此值必须小于等于 ' + max;
			}
		}

		/** 长度验证 */
		if (rule.minLength) {
			const min = Number(rule.minLength);
			if (!isNaN(min)) {
				if (isNumber(value)) value = value.toString();
				if ((isString(value) || isArray(value)) && value.length < min)
					return rule.message || '此值长度必须大于等于 ' + min;
			}
		}

		if (rule.maxLength) {
			const max = Number(rule.maxLength);
			if (!isNaN(max)) {
				if (isNumber(value)) value = value.toString();
				if ((isString(value) || isArray(value)) && value.length > max)
					return rule.message || '此值长度必须小于等于 ' + max;
			}
		}

		/** 时间验证 */
		const now = dayjs(value);
		if (rule.minDate) {
			if (!now.isValid()) return rule.message || '无效日期数据';

			const min = dayjs(rule.minDate);
			if (min.isValid() && now.isBefore(min, 'day'))
				return rule.message || '时间必须晚于或者等于 ' + min.format('YYYY年MM月DD日');
		}

		if (rule.maxDate) {
			if (!now.isValid()) return rule.message || '无效日期数据';

			const max = dayjs(rule.maxDate);
			if (max.isValid() && now.isAfter(max, 'day'))
				return rule.message || '时间必须早于或者等于 ' + max.format('YYYY年MM月DD日');
		}

		return true;
	}

	/** 验证自定义规则函数 */
	private validateFunction(rule: IRule, value: any) {
		/** 无效数据或者类型直接不检查 */
		if (!rule || !isFn(rule.validate)) return true;

		/** 验证结果 */
		return rule.validate(value);
	}

	/********************************************************************/

	/** 规则描述 */
	description(rules: IRules) {
		const ret: string[] = [];

		rules = this.updateRules(rules);
		if (!hasArray(rules)) return '';

		(rules as IRule[])
			.filter((rule) => hasObject(rule))
			.forEach((rule) => {
				ret.push(this.descriptionRequired(rule));
				ret.push(this.descriptionRange(rule));
				ret.push(this.descriptionType(rule));
				ret.push(this.descriptionRegular(rule));
			});

		return ret.filter((msg) => !!msg).join('；');
	}

	/** 必填 */
	private descriptionRequired(rule: IRule) {
		return rule && rule.required === true ? '必填' : '';
	}

	/** 正则 */
	private descriptionRegular(rule: IRule) {
		return rule && !!rule.pattern ? '要求符合规则：' + rule.pattern : '';
	}

	/** 类型 */
	private descriptionType(rule: IRule) {
		if (!rule || !rule.type || !isString(rule.type)) return '';

		if (rule.type === 'json') return '要求格式为 JSON';
		if (rule.type === 'url') return '要求格式为网址';
		if (rule.type === 'email') return '要求格式为邮箱';
		if (rule.type === 'tel') return '要求格式为电话号码';
		if (rule.type === 'phone') return '要求格式为电话号码';
		if (rule.type === 'mobile') return '要求格式为手机号码';
		if (rule.type === 'mobilephone') return '要求格式为手机号码';
		if (rule.type === 'guid') return '要求格式为GUID';
		if (rule.type === 'number') return '要求格式为数字';
		if (rule.type === 'chinese') return '要求格式为中文字符';
		if (rule.type === 'english') return '要求格式为英文字符';
		if (rule.type === 'ip') return '要求格式为IP';
		if (rule.type === 'name') return '要求格式字母开头，仅包含字母与数字及下划线的字符串';

		return '无效规则格式' + rule.type;
	}

	/** 区间 */
	private descriptionRange(rule: IRule) {
		if (!rule) return '';

		const ret: string[] = [];

		// 数字验证
		if (rule.min) {
			const min = Number(rule.min);
			if (!isNaN(min)) ret.push('必须大于等于' + min);
		}

		if (rule.max) {
			const max = Number(rule.max);
			if (!isNaN(max)) ret.push('必须小于等于' + max);
		}

		// 长度验证
		if (rule.minLength) {
			const min = Number(rule.minLength);
			if (!isNaN(min)) ret.push('长度必须大于等于' + min);
		}

		if (rule.maxLength) {
			const max = Number(rule.maxLength);
			if (!isNaN(max)) ret.push('长度必须小于等于' + max);
		}

		if (rule.minDate) {
			const min = dayjs(rule.minDate);
			if (min.isValid()) ret.push('时间必须晚于或者等于 ' + min.format('YYYY年MM月DD日'));
		}

		if (rule.maxDate) {
			const max = dayjs(rule.maxDate);
			if (max.isValid()) ret.push('时间必须早于或者等于 ' + max.format('YYYY年MM月DD日'));
		}

		return ret.length > 0 ? ret.join('；') : '';
	}

	/********************************************************************/

	/** 是否存在规则 */
	hasRules(rules: IRules) {
		return hasArray(this.updateRules(rules));
	}

	/** 将规则对象转换成规则列表 */
	private updateRules(rules: IRules) {
		if (hasArray(rules)) return rules;
		if (!hasObject(rules)) return [];

		const rs = rules as IRule;
		rules = Object.keys(rs).map((key) => {
			if (key === 'message') return;

			const rule: IRule = {};
			rule[key] = rs[key];
			rs.message && (rule.message = rs.message);

			return rule;
		});

		return rules;
	}

	/** 是否存在必填项目 */
	hasRequired(rules: IRules) {
		return this.updateRules(rules).some((rule: IRule) => rule && rule.required === true);
	}
}

export default new FormValidate();
