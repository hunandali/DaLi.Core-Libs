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
' 	模块加载操作
'
' 	name: lib.base.modules
' 	create: 2023-05-10
' 	memo: 模块加载操作
' 	
' ------------------------------------------------------------
*/

/** 是否服务器模式 */
import { SERVERMODE } from '../../config';
import { hasObject, isArray, isFn } from './type';
import type { Dict } from '../types';

/** 模块加载属性 */
declare type moduleOptions = {
	/** 是否使用全路径做为 key，否则仅保留文件名作为 key */
	fullPath?: boolean;

	/** 是否包含 index 文件，默认不包含 */
	incIndex?: boolean;
};

/**
 * 对模块加载进行基础处理
 *
 * @param modules 	模块数据集合
 * @param options 	模块加载属性
 * @param incIndex 	是否包含 index 文件，默认不包含
 * @returns 		返回处理后的模块对象
 */
function modulesLoad(
	modules: Dict,
	options: moduleOptions = { fullPath: false, incIndex: false }
): Dict | undefined {
	if (!modules) return;
	if (!hasObject(options)) options = { fullPath: false, incIndex: false };
	const { fullPath, incIndex } = options;

	if (!isArray(modules))
		// 非数组转换成数组
		modules = [modules];

	// 分析所有函数对象
	const objs: Dict = {};

	modules.forEach((mod: any) => {
		for (var name in mod) {
			const obj = mod[name];

			// './***/***.js' => ***/***
			// './***.js'	=> ***

			name = name.replace(/\\/g, '/');

			// 保留全路径还是仅保留最后一节
			const idx = fullPath ? name.indexOf('/') : name.lastIndexOf('/');

			name = name.substring(idx + 1);
			name = name.replace(/^(.*)\.\w+$/, '$1').toLowerCase();

			// 排除 index.*   xxx.d
			if (name && (incIndex || name !== 'index') && !name.endsWith('.d')) {
				// 如果服务端包含 .client.js 或者 客户端包含 .server.js 则无效
				// 分离服务端与客户端
				if (SERVERMODE) {
					// 移除客户端
					if (name.endsWith('.client')) name = '';
				} else {
					// 移除服务端
					if (name.endsWith('.server')) name = '';
				}

				if (name && obj) {
					objs[name] = obj.default ?? obj;
				}
			}
		}
	});

	return objs;
}

/**
 * 异步方式更新模块对象数据，并异步初始化
 *
 * @param modules 	模块数据集合，使用 import.meta.glob 获取
 * @param options 	模块加载属性
 * @param ...args 	其他附加参数，用于初始化附加参数，使用 arguments 获取，并移除前面两个参数
 * @returns 		返回模块对象
 */
export async function modulesUpdateSync(
	modules: Dict,
	options: moduleOptions = { fullPath: false, incIndex: false },
	...args: any
): Promise<Dict> {
	const objs = modulesLoad(modules, options);
	if (!objs) return {};

	// 名称排序，以便带 .server / .client 的脚本后执行，然后合并默认值
	const names = Object.keys(objs);
	if (names.length < 1) return {};
	names.sort();

	// 返回数据
	const moduleList: Dict = {};

	// 分析对象并初始化
	for (let i in names) {
		let name = names[i]!;

		let obj = objs[name];

		// 初始化操作，异步初始化优先执行
		if (isFn(obj.asyncInit)) {
			await obj.asyncInit.apply(obj, args);
			delete obj.asyncInit;
		}

		if (isFn(obj.init)) {
			await obj.init.apply(obj, args);
			delete obj.init;
		}

		// 移除 client / server 名称
		if (name.endsWith('.client') || name.endsWith('.server'))
			name = name.substring(0, name.length - 7);

		// 合并数据
		moduleList[name] = obj;
	}

	return moduleList;
}

/**
 * 同步方式更新模块对象数据，并同步初始化
 *
 * @param modules 	模块数据集合，使用 import.meta.glob 获取
 * @param options 	模块加载属性
 * @param ...args 	其他附加参数，用于初始化附加参数，使用 arguments 获取，并移除前面两个参数
 * @returns 		返回模块对象
 */
export function modulesUpdate(
	modules: Dict,
	options: moduleOptions = { fullPath: false, incIndex: false },
	...args: any
): Dict {
	const objs = modulesLoad(modules, options);
	if (!objs) return {};

	// 名称排序，以便带 .server / .client 的脚本后执行，然后合并默认值
	const names = Object.keys(objs);
	if (names.length < 1) return {};
	names.sort();

	// 返回数据
	const moduleList: Dict = {};

	// 分析对象并初始化
	for (let i in names) {
		let name = names[i]!;
		let obj = objs[name];

		if (isFn(obj.init)) {
			obj.init.apply(obj, args);
			delete obj.init;
		}

		// 移除 client / server 名称
		if (name.endsWith('.client') || name.endsWith('.server'))
			name = name.substring(0, name.length - 7);

		// 合并数据
		moduleList[name] = obj;
	}

	return moduleList;
}

// /**
//  * 根据组件库获取指定组件项目
//  *
//  * @param modules 	模块数据集合，使用 import.meta.glob 获取
//  * @returns 		返回组件
//  */
// export function componentLoad(modules: Dict, defaultComponent?: VNode) {
// 	const objs = modulesLoad(modules, false);

// 	// 未设置时，默认使用 TDesign Vue Next for Web
// 	let name = APP.COMPONENT_LIB;
// 	!hasObjectName(objs, name) && (name = 'tdvn');

// 	// 如果仍然不存在则使用空数据
// 	return hasObjectName(objs, name) ? objs![name] : defaultComponent ? defaultComponent : h('div', { class: 'text-error', innerHTML: '无此组件' });
// }
