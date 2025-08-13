import { E as EventBus } from './index-BvIGCbO1.js';
import { A as Action } from './types-Cultc70v.js';

/** 全局类型申明 */
declare global {
    /**
     * 注册事件，名称如果已经存在则将被覆盖
     * @param name 事件名称，忽略大小写
     * @param action 事件
     */
    var $on: EventBus['on'];
    /**
     *
     * @param name 事件名称，忽略大小写
     * @param event 要移除的事件，不设置则所有都移除
     */
    var $off: EventBus['off'];
    /**
     * 执行事件
     * @param name 事件名称，忽略大小写
     * @param args 提交参数
     */
    var $emit: EventBus['emit'];
    /** 窗口大小调整事件 */
    var $resize: {
        /** 注册 */
        register: () => void;
        /** 注销 */
        unregister: () => void;
        /** 添加事件 */
        on: (event: Action, immediate: boolean, ...args: any[]) => void;
        /** 移除事件 */
        off: (event: Action) => void;
        /** 强制执行 */
        execute: () => void;
    };
}
