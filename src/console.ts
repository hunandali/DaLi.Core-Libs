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
' 	控制台输出
'
' 	name: console
' 	create: 2023-05-11
' 	memo: 控制台信息输出，兼容客户端与服务端，已做全局处理，直接 con.xxx 操作
' 	
' ------------------------------------------------------------
*/

import chalk from 'chalk';
import type { ChalkInstance } from 'chalk';

/** 常用操作库 */
import { SERVERMODE, DEBUG } from '../config';
import { $Global, errorTrace, globalId, hasArray, isFn, isObject, isString } from './base';
import { parseFilename } from 'ufo';

import type { Action } from './types';

/** 控制台输出 */
export class consoleEcho {
	/** 信息输出 */
	private _echo(
		icon: string,
		bgColor: ChalkInstance,
		color: ChalkInstance,
		mode: 'default' | 'error' | 'warn' | 'debug',
		message: any,
		...optionalParams: any[]
	) {
		// 正式模式仅输出异常
		if (!DEBUG && mode !== 'error') return;

		// 格式化文本
		const stringify = (objColor: ChalkInstance, obj: any) => {
			obj = emptyString(obj);
			const str = isObject(obj) ? JSON.stringify(obj, null, '\t') : obj;
			return objColor(` ${str} `);
		};

		// 空内容处理
		const emptyString = (obj: any) => {
			if (typeof obj === 'undefined') return chalk.bgGray.cyanBright(' Undefined ');
			if (obj === null) return chalk.bgGray.cyanBright(' Null ');
			if (obj === '') return chalk.bgGray.yellowBright(' EmptyString ');
			if (obj === true) return chalk.bgGray.greenBright(' True ');
			if (obj === false) return chalk.bgGray.redBright(' False ');

			return obj;
		};

		// 获取信息位置
		let source = chalk.reset.white(errorTrace(1, 1, ['$Global.echo', 'consoleEcho.']));

		if (message) {
			message = stringify(bgColor.bold, message) + '\n' + chalk.reset.white(source);
		} else {
			message = chalk.reset(color(source));
		}

		icon && (message = icon + ' ' + message);

		const len = optionalParams.length;
		const showIndex = mode === 'debug' && len > 1;

		// 客户端则用组显示
		console.group(message);

		optionalParams.forEach((par, index) => {
			// 第一条如果时函数，则直接执行，而不是打印
			if (index === 0 && isFn(par)) {
				par();
			} else {
				if (showIndex) {
					console.log(`${index + 1}.`, par);
				} else {
					console.log(emptyString(par));
				}
			}
		});

		mode === 'error' && console.error('...');
		mode === 'warn' && console.warn('...');

		console.groupEnd();
	}

	/** 信息输出 */
	echo(color: ChalkInstance, message?: any, ...optionalParams: any[]) {
		this._echo('', chalk.reset, color, 'default', message, undefined, ...optionalParams);
	}

	/** 普通打印输出 */
	log(message?: any, ...optionalParams: any[]) {
		DEBUG && console.log(message, ...optionalParams);
	}

	/** 表格显示 */
	table(tabularData: any, properties?: ReadonlyArray<string>) {
		console.table(tabularData, properties);
	}

	/** 信息输出，蓝色 */
	information(message: any, ...optionalParams: any[]) {
		this._echo(
			message === 'INFO' ? 'ℹ' : '',
			chalk.bgBlue.whiteBright,
			chalk.blueBright,
			'default',
			message,
			...optionalParams
		);
	}

	/** 信息输出，蓝色 */
	info(...optionalParams: any[]) {
		this.information('INFO', ...optionalParams);
	}

	/** 错误输出，红色 */
	error(message: any, ...optionalParams: any[]) {
		this._echo(
			message === 'ERROR' ? '⛔' : '',
			chalk.bgRedBright.yellowBright,
			chalk.redBright,
			message === 'ERROR' ? 'error' : 'default',
			message,
			...optionalParams
		);
	}

	/** 错误输出，红色 */
	err(...optionalParams: any[]) {
		this.error('ERROR', ...optionalParams);
	}

	/** 警告输出，橙色 */
	warning(message: any, ...optionalParams: any[]) {
		this._echo(
			message === 'WARN' ? '⚠' : '',
			chalk.bgYellowBright.redBright,
			chalk.yellowBright,
			message === 'WARN' ? 'warn' : 'default',
			message,
			...optionalParams
		);
	}

	/** 警告输出，橙色 */
	warn(...optionalParams: any[]) {
		this.warning('WARN', ...optionalParams);
	}

	/** 成功输出，绿色 */
	success(message?: any, ...optionalParams: any[]) {
		this._echo(
			message === 'SUCC' ? '✅' : '',
			chalk.bgGreen.whiteBright,
			chalk.green,
			'default',
			message,
			...optionalParams
		);
	}

	/** 成功输出，绿色 */
	succ(...optionalParams: any[]) {
		this.success('SUCC', ...optionalParams);
	}

	/** 调试信息 */
	debug(...optionalParams: any[]) {
		if (!hasArray(optionalParams)) return;

		// 最后一位数据为 ~ 表示不输出调试
		const enabled = optionalParams[optionalParams.length - 1];
		if (enabled === '~') return;

		// 检查第一条是否字符串且存在内容，存在则作为标题，否则使用 调试位置信息
		let title = '';
		let id = chalk.bgGray.yellowBright(` ${globalId()} `);

		if (isString(optionalParams[0]) && optionalParams[0]) {
			title = optionalParams[0];
			optionalParams = optionalParams.splice(1);
		}

		if (!SERVERMODE) {
			// 获取信息位置
			let source = chalk.reset.white(errorTrace(1, 1, ['$Global.echo', 'consoleEcho.']));

			// 分析函数与位置
			// [0m[37mdebounce.trailing (http://localhost:10030/resource/.sys/plugins/sys.ts?t=1696352481769:20:9)[39m[0m

			const infos = source?.split(' (');

			if (hasArray(infos)) {
				!title &&
					infos[0] &&
					(title =
						infos[0].indexOf('[37m') > -1
							? infos[0]?.split('[37m')[1] || ''
							: infos[0]);

				infos[1] &&
					(id += chalk.bgBlack.whiteBright(
						' ' + parseFilename(infos[1], { strict: true })?.split(':')[0]
					));
			}
		}

		title && (title = chalk.bgMagenta.whiteBright(` ${title}`));

		this._echo(id, chalk.reset, chalk.white, 'debug', title, ...optionalParams);
	}
}

/** 全局类型申明 */
declare global {
	/** 控制台打印 */
	var con: consoleEcho;

	var echo: Action;
}

/** 全局挂载 */
if (!$Global.con) {
	$Global.con = new consoleEcho();
	$Global.echo = (...optionalParams: any[]) => $Global.con.debug(...optionalParams);
}
