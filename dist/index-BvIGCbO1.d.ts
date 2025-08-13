import { A as Action } from './types-Cultc70v.js';

/** 事件总线 */
declare class EventBus {
    /** 注册的事件 */
    readonly instance: Map<string, Action[]>;
    /**
     * 注册事件，名称如果已经存在则将被覆盖
     * @param name 事件名称，忽略大小写
     * @param action 事件
     * @param duplicate 当注册相同事件时是否允许重复
     * @param immediate 是否立即执行一次
     */
    on: (name: string, event: Action, duplicate?: boolean, immediate?: boolean, ...args: any[]) => void;
    /**
     * 注销指定事件，如果不存在则忽略
     * @param name 事件名称，忽略大小写
     * @param event 要移除的事件，不设置则所有都移除
     */
    off: (name: string, event?: Action) => void;
    /**
     * 执行事件
     * @param name 事件名称，忽略大小写
     * @param args 提交参数
     */
    emit: (name: string, ...args: any[]) => void;
}
/** 创建总线事件 */
declare const createEventBus: () => EventBus;

export { EventBus as E, createEventBus as c };
