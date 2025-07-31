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
' 	后台任务
'
' 	name: task
' 	create: 2022-03-29
' 	memo: 后台任务
' 	
' ------------------------------------------------------------
*/

import { SERVERMODE } from '../config';
import { hasArray, hasObject, isFn, modulesUpdate } from './base';
import { Action, Dict } from './types';

/** 定时任务 */
export interface ITask {
	/** 名称 */
	name: string;

	/** 执行间隔时间（秒） */
	interval: number;

	/** 最后执行时间戳 */
	last: number;

	/** 最后执行时间文本描述 */
	lastTime: string;

	/** 执行次数 */
	count: number;

	/** 是否执行中 */
	busy: boolean;

	/** 初始化操作 */
	init?: Action;

	/** 执行操作 */
	execute: (currentTask: ITask, allTasks: ITask[]) => Promise<any>;

	/** 状态消息 */
	message?: string;

	/** 执行结果 */
	result?: any;
}

/**
 * 任务运行模式
 * true: 客户端，服务端都可开启定时任务
 * false: 客户端，服务端都不开启定时任务
 * client: 仅客户端开启定时任务
 * server: 仅服务端开启定时任务
 */
export type TaskModeEnum = boolean | 'client' | 'server';

/** 后台任务类 */
export class Tasks {
	/** 任务列表 */
	readonly instance: ITask[];

	/** 定时器 */
	private timer: NodeJS.Timeout | string | number | undefined;

	/** 任务轮询周期（单位：秒） */
	readonly interval: number;

	/** 轮询次数 */
	counter: number;

	/** 最后操作时间 */
	last: Date;

	/** 是否运行中 */
	busy: boolean;

	/**
	 * 构造
	 * @param tasks 任务列表
	 * @param interval 轮询周期（单位：秒）
	 */
	constructor(tasks: ITask[], interval = 30) {
		this.instance = hasArray(tasks) ? tasks : [];
		this.timer = undefined;
		this.interval = interval < 1 ? 30 : interval;
		this.counter = 0;
		this.last = new Date();
		this.busy = false;
	}

	/** 执行任务 */
	private async execute(task: ITask) {
		// 运行中，或者动态修改周期小于 1 后将不再执行
		if (!task || task.busy || task.interval < 1) return;

		// 时间未到
		const now = Date.now();
		if ((now - task.last) / 1000 < task.interval) return;

		// 执行
		task.count += 1;
		task.busy = true;
		task.result = await task.execute(task, this.instance);
		task.busy = false;

		// 缓存最后时间
		task.last = Date.now();
		task.lastTime = new Date().toLocaleString();
	}

	/** 停止任务 */
	stop() {
		if (!this.timer) return;

		clearTimeout(this.timer);
		this.timer = undefined;
	}

	/** 启动任务 */
	start() {
		// 强制结束之前轮询
		this.stop();

		// 任务还在执行
		if (this.busy) return;

		// 无任务不处理
		if (!hasArray(this.instance)) return;

		this.busy = true;
		this.counter += 1;
		this.last = new Date();

		// 依次执行后台任务
		this.instance.forEach((task) => this.execute(task));

		this.last = new Date();
		this.busy = false;

		this.timer = setTimeout(() => {
			/** 使用箭头函数，否则可能不再执行 */
			this.start();
		}, this.interval * 1000);
	}
}

/** 后台任务集合类型 */
export type ITasks = Tasks;

/** 后台任务 */
export default Tasks;

/**
 * 通过模块创建任务
 * @param modules 模块数据集合，使用 import.meta.glob 获取
 * @param interval 轮询周期（单位：秒）
 * @param mode 任务运行模式（true: 客户端，服务端都可开启定时任务，false: 客户端，服务端都不开启定时任务，client: 仅客户端开启定时任务，server: 仅服务端开启定时任务）
 * @returns 任务集合
 * @example
 * createTasks(import.meta.glob('./tasks/*.ts', { eager: true }))
 * createTasks([import.meta.glob('./tasks/*.ts', { eager: true }),import.meta.glob('./tasks/*.js', { eager: true })])
 */
export const createTasks = (modules: Dict | Dict[], interval = 30, mode: TaskModeEnum = true) => {
	// 非运行模式也移除
	if (!mode) return;
	if (SERVERMODE && mode === 'client') return;
	if (!SERVERMODE && mode === 'server') return;

	// 无任务移除
	if (!hasObject(modules) && !hasArray(modules)) return;

	const packages = modulesUpdate(modules);
	if (!hasObject(packages)) return;

	// 任务列表
	const tasks: ITask[] = [];

	// 任务赋值
	Object.keys(packages).forEach((key) => {
		const obj = packages[key] as ITask;

		if (obj && isFn(obj.execute)) {
			obj.name = key;
			obj.interval = Number(obj.interval || 0);
			obj.last = 0;
			obj.count = 0;
			obj.busy = false;

			isFn(obj.init) && obj.init!();

			// 初始化后任务周期如果不大于 1 则任务将被忽略
			if (obj.interval > 0) tasks.push(obj);
		}
	});

	return new Tasks(tasks, interval);
};
