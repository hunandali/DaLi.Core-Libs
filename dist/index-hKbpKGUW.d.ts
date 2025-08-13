import { ChalkInstance } from 'chalk';
import { A as Action } from './types-Cultc70v.js';

/** 控制台输出 */
declare class ConsoleEcho {
    /** 信息输出 */
    private _echo;
    /** 信息输出 */
    echo(color: ChalkInstance, message?: any, ...optionalParams: any[]): void;
    /** 普通打印输出 */
    log(message?: any, ...optionalParams: any[]): void;
    /** 表格显示 */
    table(tabularData: any, properties?: ReadonlyArray<string>): void;
    /** 信息输出，蓝色 */
    information(message: any, ...optionalParams: any[]): void;
    /** 信息输出，蓝色 */
    info(...optionalParams: any[]): void;
    /** 错误输出，红色 */
    error(message: any, ...optionalParams: any[]): void;
    /** 错误输出，红色 */
    err(...optionalParams: any[]): void;
    /** 警告输出，橙色 */
    warning(message: any, ...optionalParams: any[]): void;
    /** 警告输出，橙色 */
    warn(...optionalParams: any[]): void;
    /** 成功输出，绿色 */
    success(message?: any, ...optionalParams: any[]): void;
    /** 成功输出，绿色 */
    succ(...optionalParams: any[]): void;
    /** 调试信息 */
    debug(...optionalParams: any[]): void;
}
/** 全局类型申明 */
declare global {
    /** 控制台打印 */
    var con: ConsoleEcho;
    var echo: Action;
}
/** 全局挂载 */
declare const createConsoleEcho: () => ConsoleEcho;

export { ConsoleEcho as C, createConsoleEcho as c };
