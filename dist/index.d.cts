import DOMPurify from 'isomorphic-dompurify';
import dayjs from 'dayjs';
import { ResponseMap, FetchOptions, FetchContext, FetchRequest, FetchResponse, FetchError, MappedResponseType, $Fetch, CreateFetchOptions } from 'ofetch';
import { ChalkInstance } from 'chalk';

var name = "@da.li/core-libs";
var title = "大沥网络函数库";
var version = "1.25.807";
var description = "大沥网络函数库是大沥网络提供的一个公共 TypeScript 函数库，封装了基础操作、缓存、加密、文件处理、HTTP 请求等常用功能模块，旨在提高开发效率。";
var homepage = "http://www.hunandali.com/";

/** 应用信息 */

/** 默认 Logo */
declare const LOGO = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgc3R5bGU9ImJhY2tncm91bmQ6ICNGRkZGRkYiPjxwYXRoIGQ9Ik03ODguNzUwMDggMzkwLjcwMzM2TDcwOS41ODg0OCA0NC43NjY3MmwtOC4wNzU1MiA0Ljg4OTYtNTY0LjYzMzYgMzQxLjkxODcyIDMyMi42NzM5MiA1ODYuMzM0NzIgMjI1LjUzODU2LTI0Ny4zMzU2OGgyNC44MDM4NGwtMjYyLjcwNzIgMjkzLjQyNDY0TDcyLjM3ODg4IDM3NC44MDk2IDcyMS41NjkyOCAwbDg1LjgxODg4IDM5MC43MDMzNmgtMTguNjM2OHogbS02MjYuODU5NTIgNy4zNjUxMkw3MDQuNjU2NjQgNjMuMTc1NjhsNzYuMjIxNDQgMzI3LjUyNzY4aC0yMi4wMDcwNEw2OTEuMjU4ODggMTEzLjExNDg4IDIyNS43MzE4NCA0MTQuNjEzNzZsMjUyLjYyMDggNDkzLjA3Nzc2IDE2Ni4yODk5Mi0xNzcuMTE3NDRoMjkuODcwMDhjLTg2LjQ0NjA4IDk0LjA3NDg4LTE4My41ODUyOCAxOTkuNzgyNC0yMDkuODg4IDIyOC40MDgzMkwxNjEuODkwNTYgMzk4LjA2ODQ4eiIgZmlsbD0iIzAwNUVBNyI+PC9wYXRoPjxwYXRoIGQ9Ik01NDYuOTUwNCA2OTMuNjcwNGwtNjguOTg2ODgtMjI0LjEwNDk2IDYuMjM2MTYgMC4xMzA1NiA0MzYuMDUxMiA5LjExMzYgOS4wNjYyNCA0NDIuMTEwNzItMjEwLjc2NDgtNjcuMDIyMDgtMTQuMTk1MiA4LjE5NTg0IDI0Ny4yNjI3MiA4MS4xMTM2VjQ0Ny45MDRINDU2LjMxODcybDc5Ljk2OTI4IDI1MS45MjE5MiAxMC42NjI0LTYuMTU2OHogbTM2MS4xMzQwOC0yMDIuODg1MTJjLTc3LjE4MDE2LTIuMjU1MzYtNDIxLjIxNzI4LTEyLjMxNjE2LTQyMS4yMTcyOC0xMi4zMTYxNmw2NC41OTEzNiAyMTIuNTk3NzYgMTIuNTkxMzYtNy4yNzE2OC01My4wMTYzMi0xODEuMTc2MzIgMzY1Ljk4NTI4IDE4LjcyNzY4IDE4LjM0MzY4IDM2NS42MDY0LTE1My42Njc4NC00Ni40MTY2NC0xNy4wOTE4NCA5Ljg2ODggMTk1LjU1ODQgNjEuMzU4MDhzLTkuOTUyLTM0Ni44NDE2LTEyLjA3NjgtNDIwLjk3NzkyeiIgZmlsbD0iI0YwODMyMSI+PC9wYXRoPjwvc3ZnPg==";
/** 是否调试模式 */
declare const DEBUG: boolean;
/** 是否测试环境 */
declare const TEST: boolean;
/** 是否服务器端运行 */
declare const SERVERMODE: boolean;
/** 窗口调整尺寸防抖时间 (ms) */
declare const DEBOUNCE_WINDOW_RESIZE = 300;
/**
 * 默认缓存最大时长(天)
 * 注意：服务端的缓存位于内容中；客户端的缓存使用 localforage
 */
declare const CACHE_TIME_MAX: number;

/** 定义基础字典数据类型 Dict */
type Dict<T = any> = Record<string, T>;
/** 定义基础字典数据类型 namevalues */
type NVs = Record<string, string>;
/** 默认带返回函数 */
type Func<T = any> = (...args: any[]) => T;
/** 默认不带返回函数 */
type Action = (...args: any[]) => void;
/** 默认异步带返回函数 */
type AsyncFunc<T = any> = (...args: any[]) => Promise<T>;
/** 默认异步不带返回函数 */
type AsyncAction = (...args: any[]) => Promise<void>;
/** 可空类型 */
type Nullable<T> = T | null | undefined;
/** 扩展类型，用于处理异步或同步操作 */
type MaybePromise<T> = T | Promise<T>;
/** 列表项目结构 */
interface IList<T = any> extends Dict {
    /** 值 */
    value: T;
    /** 文本 */
    label: string;
    /** 图标 */
    icon?: string;
    /** 禁用 */
    disabled?: boolean;
}
/** 树形数据 */
interface ITree<T = any> extends IList<T> {
    /** 上级 */
    parent?: ITree<T> | T;
    /** 下级 */
    children?: ITree<T>[];
}
/** 列表对象数据字段映射 */
interface IListMap {
    /** 值字段 */
    value?: string;
    /** 文本字段 */
    label?: string;
    /** 图标字段 */
    icon?: string;
    /** 禁用字段 */
    disabled?: string;
    /** 禁用是否取反,如果 disabled 字段,未设置此参数是,如果包含 enable 则强制取反 */
    rev?: boolean | undefined;
    /** 值是否为数值,是则需要将值转换成数值 */
    numberValue?: boolean;
}
/** 树形对象数据字段映射 */
interface ITreeMap extends IListMap {
    /** 上级字段 */
    parent?: string;
    /** 下级字段 */
    children?: string;
}

/** 分析数据的类型名称 */
declare function typeName(value: any): string;
/** 判断是否数组 */
declare const isArray: (arg: any) => arg is any[];
/** 判断是否 Symbol */
declare const isSymbol: (value: any) => value is symbol;
/** 判断是否 Object 对象，仅 {}，不包含 [] null 等对象 */
declare const isObject: (value: any) => value is object;
/**
 * 否是原始类型
 * 原始类型: number, string, boolean, symbol, bigint, undefined, null
 */
declare const isPrimitive: (value: any) => boolean;
/** 是否函数 isFunction 的简写 */
declare const isFn: (value: any) => value is Function;
/** 是否异步函数  async function (){} */
declare const isAsync: (value: any) => boolean;
/** 是否字符串 */
declare const isString: (value: any) => value is string;
/** 是否数值 */
declare const isNumber: (value: any) => value is number;
/** 是否日期对象 */
declare const isDate: (value: any) => value is Date;
/** 是否空值，空对象，空数组，空字符串，空函数，空 Symbol */
declare const isEmpty: (value: any) => boolean;
/** 判断是否 Boolean */
declare const isBoolean: (value: any) => value is boolean;
/** 判断是否正则表达式 */
declare const isRegExp: (value: any) => value is RegExp;
/** 判断是否 null 或者 undefined */
declare const isNil: (value: any) => value is null | undefined;
/**
 * 判断是否 NaN
 * 一个 NaN 原始值是唯一一个不等于自身的值。
 */
declare const isNaN: (value: any) => boolean;
/**
 * 综合判断一个目标是否为 Vue 组件（涵盖实例和配置对象）。
 *
 * 这个函数会按顺序进行以下检查：
 * 1. 检查目标是否为一个有效的对象。
 * 2. 检查目标是否为一个 Vue 2 或 Vue 3 的组件实例（通过内部标志 `_isVue` 或 `__isVue`）。
 * 3. 如果不是实例，则通过启发式方法检查它是否像一个组件的配置对象（检查 `setup`, `render`, `template` 属性）。
 *
 * @param input - 需要被检查的目标。
 * @returns 如果判断为 Vue 组件，则返回 true，否则返回 false。
 */
declare const isVueComponent: (input: any) => boolean;
/** 判断是否不为空，非空对象，非空数组，非空字符串，非空函数，非空 Symbol */
declare const notEmpty: (value: any) => boolean;
/** 判断是否 Object 对象且对象存在内容 */
declare const hasObject: (value: any) => value is object;
/** 对象是否包含指定的属性 */
declare const hasObjectName: (value: any, name: string) => boolean;
/** 数组是否存在内容 */
declare const hasArray: (value: any) => boolean;
/** 判断是否字符串，且字符串存在内容 */
declare const hasString: (value: any) => boolean;

/** 两个项目是否相同 */
declare const isEqual: <TType>(x: TType, y: TType) => boolean;
/**
 * 正则表达式判断
 * @param val 要检测的值
 * @param reg 正则表达式
 * @returns	  是否匹配
 */
declare function isMatch(val: any, reg: RegExp): boolean;
/** 判断是否为手机号码 */
declare function isMobile(val: number | string): boolean;
/** 判断是否为车牌 */
declare function isCar(val: string): boolean;
/** 判断是否为电话号码 */
declare function isPhone(val: string): boolean;
/** 判断是否为 Email */
declare function isEmail(val: string): boolean;
/** 判断是否为网址，必须含 http / https / ftp */
declare function isUrl(val: string): boolean;
/** 判断是否为全网址，http / https / ftp 可选，且可以带路径与参数 */
declare function isFullUrl(val: string): boolean;
/** 判断是否为网址，仅支持 http / https */
declare function isHttp(val: string): boolean;
/** 判断是否为 GUID */
declare function isGuid(val: string): boolean;
/** 判断是否为汉字 */
declare function isChinese(val: string): boolean;
/** 判断是否为英文字母 */
declare function isEnglish(val: string): boolean;
/** 判断是否为名称，即：英文开头的字符串（仅包含半角字母、数字、下划线与横线），类似于账号名，最少两个字符 */
declare function isName(val: string, len?: number): boolean;
/** 判断是否为 IPv4 字符串 */
declare function isIP(val: string): boolean;
/** 判断是否为有效的 JSON 字符串 */
declare function isJSON(val: string): boolean;
/** 是否整数 */
declare const isInt: (value: any) => value is number;
/** 是否浮点数 */
declare const isFloat: (value: any) => value is number;

/**
 * 字符串模板替换
 * 用于在模板字符串中通过名称替换数据。默认表达式会寻找 {name} 以识别名称。
 *
 * template('Hello, {name}', { name: 'ray' })				// => Hello, ray
 * template('Hello, <name>', { name: 'ray' }, /<(.+?)>/g)		// => Hello, ray
 */
declare const template: (str: string, data: Record<string, any>, regex?: RegExp) => string;
/**
 * 从给定的字符串中修剪所有前缀和后缀字符。
 * 类似于内置的 trim 函数，但接受您希望修剪的其他字符并修剪多个字符。
 * 默认移除回车、换行、制表符和全半角空格。
 *
 * trim('  hello ') 						// => 'hello'
 * trim('__hello__', '_') 					// => 'hello'
 * trim('/repos/:owner/:repo/', '/')		// => 'repos/:owner/:repo'
 * trim('222222__hello__1111111', '12_') 	// => 'hello'
 */
declare const trimEx: (str: string | null | undefined, charsToTrim?: string) => string;
/**
 * 文本转换成实际类型值。
 * 如果存在 splitter 则按照分隔符分割成数组再转换。
 * @param value 文本值
 * @param splitter 是否分割成数组，不设置则直接返回
 * @returns 返回任何有效的类型值或者值数组
 */
declare const string2Value: (value: string, splitter?: string | RegExp) => any | any[];
/**
 * 按指定长度截取字符串
 * @param str	待截取的字符串
 * @param len	截取长度，0 不截取
 * @param eli	省略部分替换的文本，默认为省略号
 * @param mode	截取方式：0 保留两头；1 保留左侧；2 保留右侧
 * @returns		返回截取后的字符串
 */
declare function stringCut(str: string, len?: number, eli?: string, mode?: number): string;
/**
 * 清除字符串中的任何 html 标签，并移除首尾的空白字符后截取指定长度文本，省略部分用省略号代替
 * @param str	待处理的字符串
 * @param len	截取长度，0 不截取
 * @param mode	截取方式:0 保留两头,1 保留左侧 ,2 保留右侧
 * @returns		返回截取后的字符串
 */
declare function stringClear(str: string, len: number, mode?: number): string;
/**
 * 清除字符串中的任何 html 标签，并移除首尾的空白字符
 * @param str	待处理的字符串
 * @returns 	处理后的字符串
 */
declare function htmlClear(str: string): string;
/**
 * html 安全化处理，去除危险标记，方式 xss 攻击
 * @param dirty 	待处理的 html 或者节点
 * @param config 	配置选项，不设置则默认仅处理 html
 * @returns		处理后的 html
 */
declare function htmlSafe(dirty: string | Node, config?: DOMPurify.Config): string;
/** 编码 HTML 符号*/
declare function htmlEncode(str: string): string;
/**
 *	判断原始文本中是否存在目标文本（使用 * 作为通配符，匹配任意字符）
 *	1. *xxx 匹配以 xxx 结尾的文本
 *	2. xxx* 匹配以 xxx 开头的文本
 *	3. *xxx* 匹配包含 xxx 的文本
 *	4. xxx*yyy 匹配以 xxx 开头且以 yyy 结尾的文本
 *	5. xxx 匹配完全匹配的文本
 *	6. 使用括号包裹的文本会是为正则表达式匹配

 * @param source 		原始文本
 * @param target 		目标文本
 * @param ingoreCase 	是否忽略大小写，默认忽略
 */
declare function stringIncludes(source: string, target: string, ingoreCase?: boolean): boolean;

/** 清除对象中指定条件的值，默认 null 或者 undefined */
declare const empty$1: <RemovedKeys extends string, T>(obj: T, filter?: (value: any) => boolean) => Omit<T, RemovedKeys>;
/**
 * 深度去除对象中的空值，不指定则移除所有 null 和 undefined 以及空文本
 * @param obj 		要处理的数据
 * @param filter	空值过滤条件，默认空内容与空文本
 * @param deep 		是否递归处理
 */
declare const clear: <RemovedKeys extends string, T>(obj: T, filter?: (value: any) => boolean, deep?: boolean) => Omit<T, RemovedKeys> | undefined;
/**
 * 从对象或者数组中获取指定项的值
 * @param value 			要检索的对象/数组
 * @param path 				要解析的属性路径，只是文本或者数组。如：a.b[0].c.2 或者 ['a','b',2]等
 * @param defaultValue		默认值，解析的结果为 undefined / null 时返回这个值
 * @returns					获取的结果
 */
declare const get: <TDefault = unknown>(value: any, path: string | string[], defaultValue?: TDefault) => TDefault;
/**
 * 向对象或者数组中设置指定项的值
 * @param initial 	要检索的对象/数组
 * @param path 		要解析的属性路径，只是文本或者数组。如：a.b[0].c.2 或者 ['a','b',2]等
 * @param value		要设置的值
 *
 * @example
 * set({}, 'name', 'ra') // => { name: 'ra' }
 * set({}, 'cards[0].value', 2) // => { cards: [{ value: 2 }] }
 */
declare const set: <T extends object, K>(initial: T, path: string | string[], value: K) => T;
/**
 * 向对象或者数组中移除指定项
 * @param initial 	要检索的对象/数组
 * @param path 		要解析的属性路径，只是文本或者数组。如：a.b[0].c.2 或者 ['a','b',2]等
 */
declare const remove$1: (value: any, path: string | string[]) => any;
/**
 * 对象或者数组中是否存在指定项
 * @param initial 	要检索的对象/数组
 * @param path 		要解析的属性路径，只是文本或者数组。如：a.b[0].c.2 或者 ['a','b',2]等
 */
declare const has: (value: any, path: string | string[]) => boolean;
/**
 * 遍历的简化操作
 * @param obj 		要遍历的对象或者数组
 * @param action 	遍历操作，参数一：value；参数二：key / index；参数三：对象本身
 */
declare const each: (obj: Dict | any[], action: (value: any, key: string | number, obj: any) => void) => boolean;
/**
 * 遍历的简化异步操作
 * @param obj 		要遍历的对象或者数组
 * @param action 	遍历操作，参数一：value；参数二：key / index；参数三：对象本身
 */
declare const eachSync: (obj: Dict | any[], action: (value: any, key: string | number, obj: any) => Promise<void>) => Promise<boolean>;
/**
 * 迭代执行的简化操作。每个元素按序执行一个提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。
 * @param obj 			要遍历的对象或者数组
 * @param callbackfn 	为每个元素执行的函数。其返回值将作为下一次调用 callbackFn 时的 accumulator 参数。对于最后一次调用，返回值将作为 reduce() 的返回值。
 * @param initialValue 	第一次调用回调时初始化 previousValue 的值。如果指定了 initialValue，则 callbackFn 从数组中的第一个值作为 currentValue 开始执行。如果没有指定 initialValue，则 previousValue 初始化为数组中的第一个值，并且 callbackFn 从数组中的第二个值作为 currentValue 开始执行。在这种情况下，如果数组为空（没有第一个值可以作为 previousValue 返回），则会抛出错误。
 */
declare const reduce: <T = Dict | any[], TDefault = any>(obj: T, callbackfn: (previousValue: TDefault, currentValue: any, currentIndex: number | string, data: T) => any, initialValue?: TDefault) => any;
/**
 * 迭代计算
 * @param obj 			要遍历的对象或者数组
 * @param value 		获取计算值的方法，参数一：value；参数二：key / index；参数三：对象本身。如果获取的非数值，则返回 defaultValue
 * @param math 			计算方法，最大值，最小值，总和，平均值。默认为总和
 * @param defaultValue 	当 value 分析非有效数值时，使用默认值，如果未设置则 min 取 Number.MAX_SAFE_INTEGER，max 取 Number.MIN_SAFE_INTEGER，其他情况取 0
 */
declare const math: (obj: Dict | any[], value: (value: any, key: string | number, obj: any) => number, math?: "max" | "min" | "sum" | "avg", defaultValue?: number | undefined) => any;
/**
 * 测试所有元素是否都能通过指定函数的测试。它返回一个布尔值
 * @param obj 			要遍历的对象或者数组
 * @param callbackfn 	为每个元素执行的函数。
 */
declare const every: <T = Dict | any[]>(obj: T, callbackfn: (element: any, index: number | string, data: T) => boolean) => boolean;
/**
 * 测试所有元素至少有一个元素能通过指定函数的测试。它返回一个布尔值
 * @param obj 			要遍历的对象或者数组
 * @param callbackfn 	为每个元素执行的函数。
 */
declare const some: <T = Dict | any[]>(obj: T, callbackfn: (element: any, index: number | string, data: T) => boolean) => boolean;
/** 将对象转换成数组 */
declare const toArray: <TValue, TKey extends string | number | symbol, KResult>(obj: Record<TKey, TValue>, toItem: (key: TKey, value: TValue) => KResult) => KResult[];
/**
 * 将对象、数组转换成 html 代码
 * @param value 		需要转换的对象、数组
 * @param maxDeep 		转换最大递归深度，默认 10 层
 * @param skipFunction 	是否过滤函数
 * @param skipEmpty 	忽略空值项目
 * @param skipUnderline 忽略下划线开头的键
 * @param enSort 		结果是否排序
 * @returns 			html 代码字符串
 */
declare const toHtml: (value: any, maxDeep?: number, skipFunction?: boolean, skipEmpty?: boolean, skipUnderline?: boolean, enSort?: boolean) => string;
/**
 * 使用 JSON 反序列化文本为对象，如果原始值本身为对象或者数组则直接返回
 * @param str JSON 字符串
 * @returns
 */
declare const toJSON: (source: any) => object | undefined;
/**
 * 克隆对象
 * @param obj 		目标对象
 * @param deep 		是否深拷贝，默认 true
 */
declare const clone: <T>(obj: T, deep?: boolean, hash?: WeakMap<WeakKey, any>) => any;
/** 合并对象/数组，第一个参数为原始被合并的对象/数组，后续参数为用于合并的值 */
declare const merge: <T = object | Dict | any[]>(...args: T[]) => T | undefined;
/**
 * 多层对象转换成单层对象，深层键使用 小数点 间隔
 * @param obj 			要处理的对象
 * @param keepSource	是否同时保留原始对象
 * @returns 			单层对象
 */
declare const toSingleObject: (obj: any, keepSource?: boolean) => Dict;
/**
 * 将单层对象转换成深层对象，其中包含小数点的键将递归到深层
 * @param obj 			要处理的对象
 * @param keepSource 	是否同时保留原始对象
 * @param keepMainKey 	是否同时保留同名父级键。当出现 a 与 a.b 时，当 b 转换到 a 的对象时会将原始 a 的值覆盖，此时如果保留就使用空白键来避免覆盖
 */
declare function toDeepObject(obj: Dict, keepSource?: boolean, keepMainKey?: boolean): Dict;

/**
 * 大小比较函数
 * @param a 		第一个项目
 * @param b 		第二个项目
 * @param getter 	比较的项目
 */
declare const compare: <T extends Dict = any>(a: T, b: T, getter?: string | ((item: T) => number | string | undefined) | undefined) => any;
/**
 * 排序
 * @param array     要操作的数组
 * @param getter    排序函数
 * @param desc      是否降序
 * @returns         排序后的数组
 */
declare const sort: <T>(array: Array<T>, getter: (item: T) => number | string | undefined, desc?: boolean) => T[];
/**
 * 创建用于迭代的范围
 * 给定开始、结束、值和步长，返回一个生成器，该生成器将按步长生成从开始到结束的值。for (let i = 0)对于替换为很有用for of。Range 将返回一个生成器，该生成器for of一次调用一个生成器，因此创建大范围是安全的。
 *
 * @example
 * range(3)                  // yields 0, 1, 2, 3
 * range(0, 3)               // yields 0, 1, 2, 3
 * range(0, 3, 'y')          // yields y, y, y, y
 * range(0, 3, () => 'y')    // yields y, y, y, y
 * range(0, 3, i => i)       // yields 0, 1, 2, 3
 * range(0, 3, i => `y${i}`) // yields y0, y1, y2, y3
 * range(0, 3, obj)          // yields obj, obj, obj, obj
 * range(0, 6, i => i, 2)    // yields 0, 2, 4, 6
 *
 * for (const i of range(0, 200, i=>i 10)) {
 *    console.log(i) // => 0, 10, 20, 30 ... 190, 200
 * }
 */
declare function range<T = number>(startOrLength: number, end?: number, valueOrMapper?: T | ((i: number) => T), step?: number): Generator<T>;
/**
 * 创建包含特定项目的列表
 * 给定开始、结束、值和步长，返回一个列表，其中包含按步长从开始到结束的值。
 * @example
 * list(3)                  // 0, 1, 2, 3
 * list(0, 3)               // 0, 1, 2, 3
 * list(0, 3, 'y')          // y, y, y, y
 * list(0, 3, () => 'y')    // y, y, y, y
 * list(0, 3, i => i)       // 0, 1, 2, 3
 * list(0, 3, i => `y${i}`) // y0, y1, y2, y3
 * list(0, 3, obj)          // obj, obj, obj, obj
 * list(0, 6, i => i, 2)    // 0, 2, 4, 6
 */
declare const list: <T = number>(startOrLength: number, end?: number, valueOrMapper?: T | ((i: number) => T), step?: number) => T[];
/**
 *  统计数组中每个项目出现的次数
 *
 * @example
 * counting([{name: 'Ra', culture: 'egypt' }, { name: 'Zeus', culture: 'greek' }, { name: 'Loki', culture: 'greek'}], g => g.culture) // => { egypt: 1, greek: 2 }
 */
declare const counting: <T, TId extends string | number | symbol>(list: readonly T[], identity: (item: T) => TId) => Record<TId, number>;
/**
 * 分组数组中的项目
 *
 * @example
 * group([1, 2, 3, 4, 5, 6, 7, 8, 9], g => g % 3) // => { 0: [3, 6, 9], 1: [1, 4, 7], 2: [2, 5, 8] }
 */
declare const group: <T, Key extends string | number | symbol>(array: readonly T[], getGroupId: (item: T) => Key) => Partial<Record<Key, T[]>>;
/**
 * 将列表转换为字典对象
 * @param array 	要转换的数组
 * @param getKey 	获取键的函数
 * @param getValue 	获取值的函数
 * @returns 		转换后的对象
 * @example
 * toObject([1, 2, 3, 4, 5, 6, 7, 8, 9], g => g % 3, g => g) // => { 0: 3, 1: 6, 2: 9 }
 */
declare const toObject: <T, Key extends string | number | symbol, Value = T>(array: readonly T[], getKey: (item: T) => Key, getValue?: (item: T) => Value) => Record<Key, Value>;
/**
 * 按条件过滤数组后映射返回对应数组
 * 类似于 Array.prototype.filter + Array.prototype.map
 * @param array 	要操作的数组
 * @param condition 筛选条件
 * @param mapper 	映射方式
 * @example
 * select([1, 2, 3, 4], x > 2, x => x*x) == [9, 16]
 */
declare const select: <T, K>(array: readonly T[], condition: (item: T, index: number) => boolean, mapper: (item: T, index: number) => K) => K[];
/** 从列表中删除所有空项目，默认 null 或者 undefined */
declare const empty: <T>(list: readonly T[], filter?: (value: any) => boolean) => T[];
/**
 * 移除数组中的项目
 * @param array 	要操作的数组
 * @param predicate 要移除的项目 (item:T)=>boolean
 * @param position 	要移除项目的位置。默认：false。true/left 仅从头开始第一条；right 仅从尾开始第一条；false 全部都移除
 * @returns 		返回处理后的数组
 */
declare const remove: <T>(array: T[], predicate: T | ((value: T, index: number, obj: T[]) => unknown), position?: boolean | "left" | "right") => T[];
/**
 * 清除数组重复项目
 * @param array 要操作的数组
 * @returns 	返回处理后的数组
 */
declare function cleanDuplicate<T>(array: T[], clearValue?: (value: T) => boolean): T[];

/** 尝试转换成数值，不成功则返回 0 */
declare function number(value: any): number;
/**
 * 检查给定的数值是否在 0 到指定数值之间(包括 0 与指定数值)。
 * @param number 需要检查的数值
 * @param end    最大值(不包括)
 */
declare function inRange(number: number, end: number): boolean;
/**
 * 检查给定的数值是否在指定数值之间(包括指定数值)
 * @param number    需要检查的数值
 * @param start     最小值(包括)
 * @param end       最大值(不包括)
 */
declare function inRange(number: number, start: number, end: number): boolean;
/** 将数值转换成浮点数 */
declare const toFloat: <T extends number | null = number>(value: any, defaultValue?: T) => number | T;
/** 将数值转换成整数 */
declare const toInt: <T extends number | null = number>(value: any, defaultValue?: T) => number | T;
/** 获取数值的小数位数 */
declare function DecimalLength(value: number): number;
/** 将秒数值转换成时间 */
declare function toDate(seconds: number): string;

/**
 * 递归执行操作，全部操作一次，不终止
 * @param list	树形数据列表
 * @param func	要执行的操作
 */
declare function treeExecute<T extends ITree>(list: T | T[], func: (item: T) => void, childrenKey?: string): void;
/**
 * 查找首个符合条件的节点
 * @param list			树形数据列表
 * @param func			要匹配条件的函数
 * @param childrenKey 	下级字段名称
 * @returns 			返回查找到的节点
 */
declare function treeFind<T extends ITree>(list: T | T[], func: (item: T) => boolean, childrenKey?: string): T | undefined;
/**
 * 查找所有符合条件的节点
 * @param list			树形数据列表
 * @param func			要匹配条件的函数
 * @param childrenKey 	下级字段名称
 * @returns 			返回所有查找到的节点数组
 */
declare function treeFindAll<T extends ITree>(list: T | T[], func: (item: T) => boolean, childrenKey?: string): T[];
/**
 * 从树形数据中递归获取顶级项目集合
 * @param data		树形数据
 * @param value		要查询的值
 * @param map		树形数据映射，只需要 value 与 parent 字段即可
 * @returns 		返回所有查找到的父级节点数组，当前级别在前面，顶级在后面
 */
declare function treeParents<V, T extends ITree<V>>(data: T[], value: V, map?: ITreeMap, includeSelf?: boolean): T[];
/**
 * 从列表数据中递归获取顶级项目集合
 * @param data		列表数据
 * @param value		要查询的值
 * @param map		树形数据映射，只需要 value 与 parent 字段即可
 * @returns 		返回所有查找到的父级节点数组，当前级别在前面，顶级在后面
 */
declare function listParents<V, T extends IList<V>>(data: T[], value: V, map?: ITreeMap, includeSelf?: boolean): T[];
/**
 * 递归列表数据获取顶级项目
 * @param data		列表数据
 * @param value		要查询的值
 * @param map		树形数据映射，只需要 value 与 parent 字段即可
 * @returns 		返回查找到的顶级节点
 */
declare function listTop<V, T extends IList<V>>(data: T[], value: V, map?: ITreeMap): T | undefined;
/**
 * 将对象数据转换成标准的列表对象数据
 * @param obj 			原始对象
 * @param map 			键值映射
 * @param ext 			扩展转换操作
 * @param skipConvert 	是否忽略转换，如果之前已经转换过仍然进行转换
 * @returns 			转换后的标准列表数据
 */
declare function listConvert<T>(obj: Dict, map?: IListMap, ext?: (obj: Dict, map?: IListMap) => IList<T>, skipConvert?: boolean): IList<T> | undefined;
/**
 * 将对象数据转换成标准的树形数据
 * @param obj 			原始对象
 * @param map 			键值映射
 * @param ext 			扩展转换操作
 * @param skipConvert 	是否忽略转换，如果之前已经转换过仍然进行转换
 * @returns 			转换后的标准树形数据
 */
declare function treeConvert<T>(obj: Dict, map?: ITreeMap, ext?: (obj: Dict, map?: IListMap) => ITree<T>, skipConvert?: boolean): ITree<T> | undefined;
/**
 * 树形列表数据转换成标准树形数据，需要数据中上级字段数据完整
 * @param list		要处理的列表
 * @param parent	默认顶级节点
 * @returns			转换后的标准树形数据
 */
declare function list2tree<T>(list: ITree<T>[], parent: T): ITree<T>[];

/** 模块加载属性 */
type moduleOptions = {
    /** 是否使用全路径做为 key，否则仅保留文件名作为 key */
    fullPath?: boolean;
    /** 是否包含 index 文件，默认不包含 */
    incIndex?: boolean;
};
/**
 * 异步方式更新模块对象数据，并异步初始化
 *
 * @param modules 	模块数据集合，使用 import.meta.glob 获取
 * @param options 	模块加载属性
 * @param ...args 	其他附加参数，用于初始化附加参数，使用 arguments 获取，并移除前面两个参数
 * @returns 		返回模块对象
 */
declare function modulesUpdateSync(modules: Dict | Dict[], options?: moduleOptions, ...args: any): Promise<Dict>;
/**
 * 同步方式更新模块对象数据，并同步初始化
 *
 * @param modules 	模块数据集合，使用 import.meta.glob 获取
 * @param options 	模块加载属性
 * @param ...args 	其他附加参数，用于初始化附加参数，使用 arguments 获取，并移除前面两个参数
 * @returns 		返回模块对象
 */
declare function modulesUpdate(modules: Dict | Dict[], options?: moduleOptions, ...args: any): Dict;

/**
 * 计算对象的 HASH 值
 * @param obj 	要计算的对象
 * @returns 	hash 值
 */
declare function hash(obj: any): number;
/** 生成随机ID */
declare function rnd(): string;
/**
 * 将任何可以转换成时间的对象，使用 dayjs 包装
 * @param date 	用于包装的时间（字符串支持:now,yesterday,tomorrow)
 */
declare const date: (date?: any) => dayjs.Dayjs;
/**
 * 将任何可以转换成时间的对象，按条件格式化成字符串
 * 所有早于 2000 年的时间都无效
 * @param date 		用于格式化的时间（字符串支持:now,yesterday,tomorrow)
 * @param format 	格式。支持：YYYY MM DD HH mm ss / desc 间隔描述
 */
declare const dateFormat: (date?: any, format?: string) => string;
/**
 * 计算时长
 * @param start 		开始时间
 * @param end 			结束时间
 * @param isEn 			使用英文、中文
 * @param incSuffix 	是否包含前、后
 * @returns
 */
declare const dateLong: (start: any, end?: any, isEn?: boolean, incSuffix?: boolean) => string;
/**
 * 函数跟踪，检查指定到当前位置函数的所有信息
 * @param returnCount		最多返回记录数
 * @param removeCount		移除前几条，第一行内容是 ERROR，第二行为当前函数，此2行不计算在内
 * @param removeContents	移除包含的内容
 * @returns 				返回跟踪信息
 */
declare function errorTrace(returnCount?: number, removeCount?: number, removeContents?: string[]): string | string[];
/**
 * 异步休眠，使用 await 执行
 * @param ms 休眠时长，单位：毫秒
 */
declare function sleep(ms: number): Promise<unknown>;
/**
 * 执行指定次数函数操作
 * @param fn 		要执行的函数
 * @param count 	执行次数，超过此次数不再执行
 */
declare function execute(fn: Action, count?: number): () => void;
/**
 * 获取函数唯一标识
 * @param fn		要判断的对象内容
 * @param remove	同时移除此数据
 */
declare function fnId(fn: Func, remove?: boolean): string | undefined;
/**
 * 防抖函数
 * @param func		目标函数
 * @param wait 		延迟执行毫秒数
 * @param immediate	true - 立即执行， false - 延迟执行
 */
declare function debounce<T>(func: (this: T, ...args: any[]) => any, wait?: number, immediate?: boolean): (this: T, ...args: any[]) => any;
/**
 * 节流函数
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type true - 使用表时间戳，在时间段开始的时候触发； false - 使用表定时器，在时间段结束的时候触发
 */
declare function throttle<T>(func: (this: T, ...args: any[]) => any, wait?: number, type?: boolean): (this: T, ...args: any[]) => any;
/**
 * 全局唯一标识
 *
 * @param prefix 前缀
 */
declare function globalId(prefix?: string): string;
/**
 * 获取浏览器指纹
 * 结果将返回两个参数：
 * id：浏览器指纹
 * score：指纹评分；1 最可信，0 最不可信
 * 如果服务端而非浏览器端执行则此函数固定返回 { id: 'server', score: 1 }
 */
declare function fingerprint(): Promise<{
    id: string;
    score: number;
}>;

/** 常用类型判断 */

/** 获取全局顶级对象 */
declare const $Global: typeof globalThis;

declare const index_$Global: typeof $Global;
declare const index_DecimalLength: typeof DecimalLength;
declare const index_cleanDuplicate: typeof cleanDuplicate;
declare const index_clear: typeof clear;
declare const index_clone: typeof clone;
declare const index_compare: typeof compare;
declare const index_counting: typeof counting;
declare const index_date: typeof date;
declare const index_dateFormat: typeof dateFormat;
declare const index_dateLong: typeof dateLong;
declare const index_debounce: typeof debounce;
declare const index_each: typeof each;
declare const index_eachSync: typeof eachSync;
declare const index_errorTrace: typeof errorTrace;
declare const index_every: typeof every;
declare const index_execute: typeof execute;
declare const index_fingerprint: typeof fingerprint;
declare const index_fnId: typeof fnId;
declare const index_get: typeof get;
declare const index_globalId: typeof globalId;
declare const index_group: typeof group;
declare const index_has: typeof has;
declare const index_hasArray: typeof hasArray;
declare const index_hasObject: typeof hasObject;
declare const index_hasObjectName: typeof hasObjectName;
declare const index_hasString: typeof hasString;
declare const index_hash: typeof hash;
declare const index_htmlClear: typeof htmlClear;
declare const index_htmlEncode: typeof htmlEncode;
declare const index_htmlSafe: typeof htmlSafe;
declare const index_inRange: typeof inRange;
declare const index_isArray: typeof isArray;
declare const index_isAsync: typeof isAsync;
declare const index_isBoolean: typeof isBoolean;
declare const index_isCar: typeof isCar;
declare const index_isChinese: typeof isChinese;
declare const index_isDate: typeof isDate;
declare const index_isEmail: typeof isEmail;
declare const index_isEmpty: typeof isEmpty;
declare const index_isEnglish: typeof isEnglish;
declare const index_isEqual: typeof isEqual;
declare const index_isFloat: typeof isFloat;
declare const index_isFn: typeof isFn;
declare const index_isFullUrl: typeof isFullUrl;
declare const index_isGuid: typeof isGuid;
declare const index_isHttp: typeof isHttp;
declare const index_isIP: typeof isIP;
declare const index_isInt: typeof isInt;
declare const index_isJSON: typeof isJSON;
declare const index_isMatch: typeof isMatch;
declare const index_isMobile: typeof isMobile;
declare const index_isNaN: typeof isNaN;
declare const index_isName: typeof isName;
declare const index_isNil: typeof isNil;
declare const index_isNumber: typeof isNumber;
declare const index_isObject: typeof isObject;
declare const index_isPhone: typeof isPhone;
declare const index_isPrimitive: typeof isPrimitive;
declare const index_isRegExp: typeof isRegExp;
declare const index_isString: typeof isString;
declare const index_isSymbol: typeof isSymbol;
declare const index_isUrl: typeof isUrl;
declare const index_isVueComponent: typeof isVueComponent;
declare const index_list: typeof list;
declare const index_list2tree: typeof list2tree;
declare const index_listConvert: typeof listConvert;
declare const index_listParents: typeof listParents;
declare const index_listTop: typeof listTop;
declare const index_math: typeof math;
declare const index_merge: typeof merge;
declare const index_modulesUpdate: typeof modulesUpdate;
declare const index_modulesUpdateSync: typeof modulesUpdateSync;
declare const index_notEmpty: typeof notEmpty;
declare const index_number: typeof number;
declare const index_range: typeof range;
declare const index_reduce: typeof reduce;
declare const index_rnd: typeof rnd;
declare const index_select: typeof select;
declare const index_set: typeof set;
declare const index_sleep: typeof sleep;
declare const index_some: typeof some;
declare const index_sort: typeof sort;
declare const index_string2Value: typeof string2Value;
declare const index_stringClear: typeof stringClear;
declare const index_stringCut: typeof stringCut;
declare const index_stringIncludes: typeof stringIncludes;
declare const index_template: typeof template;
declare const index_throttle: typeof throttle;
declare const index_toArray: typeof toArray;
declare const index_toDate: typeof toDate;
declare const index_toDeepObject: typeof toDeepObject;
declare const index_toFloat: typeof toFloat;
declare const index_toHtml: typeof toHtml;
declare const index_toInt: typeof toInt;
declare const index_toJSON: typeof toJSON;
declare const index_toObject: typeof toObject;
declare const index_toSingleObject: typeof toSingleObject;
declare const index_treeConvert: typeof treeConvert;
declare const index_treeExecute: typeof treeExecute;
declare const index_treeFind: typeof treeFind;
declare const index_treeFindAll: typeof treeFindAll;
declare const index_treeParents: typeof treeParents;
declare const index_trimEx: typeof trimEx;
declare const index_typeName: typeof typeName;
declare namespace index {
  export { index_$Global as $Global, index_DecimalLength as DecimalLength, empty as arrayEmpty, remove as arrayRemove, index_cleanDuplicate as cleanDuplicate, index_clear as clear, index_clone as clone, index_compare as compare, index_counting as counting, index_date as date, index_dateFormat as dateFormat, index_dateLong as dateLong, index_debounce as debounce, index_each as each, index_eachSync as eachSync, empty$1 as empty, index_errorTrace as errorTrace, index_every as every, index_execute as execute, index_fingerprint as fingerprint, index_fnId as fnId, index_get as get, index_globalId as globalId, index_group as group, index_has as has, index_hasArray as hasArray, index_hasObject as hasObject, index_hasObjectName as hasObjectName, index_hasString as hasString, index_hash as hash, index_htmlClear as htmlClear, index_htmlEncode as htmlEncode, index_htmlSafe as htmlSafe, index_inRange as inRange, index_isArray as isArray, index_isAsync as isAsync, index_isBoolean as isBoolean, index_isCar as isCar, index_isChinese as isChinese, index_isDate as isDate, index_isEmail as isEmail, index_isEmpty as isEmpty, index_isEnglish as isEnglish, index_isEqual as isEqual, index_isFloat as isFloat, index_isFn as isFn, index_isFullUrl as isFullUrl, index_isGuid as isGuid, index_isHttp as isHttp, index_isIP as isIP, index_isInt as isInt, index_isJSON as isJSON, index_isMatch as isMatch, index_isMobile as isMobile, index_isNaN as isNaN, index_isName as isName, index_isNil as isNil, index_isNumber as isNumber, index_isObject as isObject, index_isPhone as isPhone, index_isPrimitive as isPrimitive, index_isRegExp as isRegExp, index_isString as isString, index_isSymbol as isSymbol, index_isUrl as isUrl, index_isVueComponent as isVueComponent, index_list as list, index_list2tree as list2tree, index_listConvert as listConvert, index_listParents as listParents, index_listTop as listTop, index_math as math, index_merge as merge, index_modulesUpdate as modulesUpdate, index_modulesUpdateSync as modulesUpdateSync, index_notEmpty as notEmpty, index_number as number, index_range as range, index_reduce as reduce, remove$1 as remove, index_rnd as rnd, index_select as select, index_set as set, index_sleep as sleep, index_some as some, index_sort as sort, index_string2Value as string2Value, index_stringClear as stringClear, index_stringCut as stringCut, index_stringIncludes as stringIncludes, index_template as template, index_throttle as throttle, index_toArray as toArray, index_toDate as toDate, index_toDeepObject as toDeepObject, index_toFloat as toFloat, index_toHtml as toHtml, index_toInt as toInt, index_toJSON as toJSON, index_toObject as toObject, index_toSingleObject as toSingleObject, index_treeConvert as treeConvert, index_treeExecute as treeExecute, index_treeFind as treeFind, index_treeFindAll as treeFindAll, index_treeParents as treeParents, index_trimEx as trimEx, index_typeName as typeName };
}

/** 定时任务 */
interface ITask {
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
type TaskModeEnum = boolean | 'client' | 'server';
/** 后台任务类 */
declare class Tasks {
    /** 任务列表 */
    readonly instance: ITask[];
    /** 定时器 */
    private timer;
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
    constructor(tasks: ITask[], interval?: number);
    /** 执行任务 */
    private execute;
    /** 停止任务 */
    stop(): void;
    /** 启动任务 */
    start(): void;
}
/** 后台任务集合类型 */
type ITasks = Tasks;

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
declare const createTasks: (modules: Dict | Dict[], interval?: number, mode?: TaskModeEnum) => Tasks | undefined;

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
' 	缓存结构
'
' 	name: cache/cache.d
' 	create: 2023-05-12
' 	memo: 缓存结构
' 	
' ------------------------------------------------------------
*/

/** 缓存类结构 */
interface ICache {
	/**
	 * 获取缓存数据
	 * @param key		键名
	 * @param valueFunc 当值不存在时，返回值的函数
	 * @param delay		缓存时长，单位：秒
	 */
	get<T>(key: string, valueFunc?: () => T, delay?: number): Promise<T>;

	/**
	 * 缓存数据
	 * @param key	键名
	 * @param value	值
	 * @param delay	缓存时长，单位：秒
	 */
	set<T>(key: string, value: T, delay?: number): Promise<void>;

	/** 移除缓存 */
	remove(key: string): Promise<void>;

	/** 清空缓存 */
	clear(): Promise<void>;

	/** 所有缓存的键 */
	keys(): Promise<string[]>;

	/** 缓存数量 */
	length(): Promise<number>;
}

/** 类型 */

/** 全局类型申明 */
declare global {
    var $cache: ICache;
}
declare const cache: ICache;

interface HasherState {
    buffer: string;
    buflen: number;
    length: number;
    state: number[];
}
declare class MD5$1 {
    /**
     * Hash a UTF-8 string on the spot
     * @param str String to hash
     * @param raw Whether to return the value as an `Int32Array`
     */
    static md5(str: string, raw?: false): string;
    static md5(str: string, raw: true): Int32Array;
    /**
     * Hash a ASCII string on the spot
     * @param str String to hash
     * @param raw Whether to return the value as an `Int32Array`
     */
    static hashAsciiStr(str: string, raw?: false): string;
    static hashAsciiStr(str: string, raw: true): Int32Array;
    private static stateIdentity;
    private static buffer32Identity;
    private static hexChars;
    private static hexOut;
    private static onePassHasher;
    private static _hex;
    private static _md5cycle;
    private _dataLength;
    private _bufferLength;
    private _state;
    private _buffer;
    private _buffer8;
    private _buffer32;
    constructor();
    /**
     * Initialise buffer to be hashed
     */
    start(): this;
    /**
     * Append a UTF-8 string to the hash buffer
     * @param str String to append
     */
    appendStr(str: string): this;
    /**
     * Append an ASCII string to the hash buffer
     * @param str String to append
     */
    appendAsciiStr(str: string): this;
    /**
     * Append a byte array to the hash buffer
     * @param input array to append
     */
    appendByteArray(input: Uint8Array): this;
    /**
     * Get the state of the hash buffer
     */
    getState(): HasherState;
    /**
     * Override the current state of the hash buffer
     * @param state New hash buffer state
     */
    setState(state: HasherState): void;
    /**
     * Hash the current state of the hash buffer and return the result
     * @param raw Whether to return the value as an `Int32Array`
     */
    end(raw?: boolean): string | Int32Array<ArrayBufferLike> | undefined;
}

/** 对文本进行 base64 编码 */
declare const base64Encode: (input: string) => string;
/** 对 base64 编码后文本进行解码 */
declare const base64Decode: (input: string) => string;
/**
 * 对文本 UTF-8 编码后进行 md5 加密
 * @param str   需要加密的文本
 * @param raw   是否返回文本还是 32 位整型数组
 * @returns     加密后的文本 raw 为 true 时返回 32 位整型数组
 */
declare const MD5: typeof MD5$1.md5;
/**
 * XOR 文本编码
 * @param input 原始文本
 * @param key 加密密钥
 */
declare const xor: (input: string, key: string) => string;

/**
 * 通过 JSON 数据导出 Excel
 * @param data		要导出的 JSON 数据
 * @param fileName	导出文件名
 * @param title		工作区标题
 * @param filter	过滤字段
 */
declare function exportJson(data: any, fileName: string, title: string, filter?: string[]): void;
/**
 * 表格内容导出 Excel
 * @param tableHtml	要导出的表格内容(HTML 代码)
 * @param fileName	导出文件名
 * @param title		工作区标题
 */
declare function exportTable(tableHtml: string, fileName: string, title: string): void;

/**
 * 将数据转换成 JSON 后下载
 * @param obj 		要下载的数据
 * @param fileName	文件名
 */
declare const objectDownload: (obj: any, fileName?: string) => void;
/**
 * 下载 JSON 数据。
 * 系统将先尝试将 JSON 字符串反序列化对象，无法反序列的 JSON 将无法下载
 * @param json 		JSON 字符串
 * @param fileName	文件名
 */
declare const jsonDownload: (json: string, fileName?: string) => void;

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
' 	文件相关类型定义
'
' 	name: files/index.d
' 	create: 2023-11-012
' 	memo: 文件相关类型定义
' 	
' ------------------------------------------------------------
*/

/** 二维码参数 */
interface IQR {
	/** 二维码内容 */
	code?: string;

	/** 二维码尺寸 */
	size?: number;

	/** 纠错级别 */
	level?: QRErrorCorrectLevel;

	/** 二维码颜色 */
	color?: string;

	/** 二维码背景色 */
	backColor?: string;

	// /** Logo 背景色 */
	// logoColor?: string;

	/** 是否显示 logo, 或者路径 */
	logo?: boolean | string;

	/** 颜色反向，前后背景浅色交换 */
	reserve?: boolean;
}

/** 二维码纠错等级枚举 */
declare enum QRErrorCorrectLevel {
	/** 低级别纠错，约可纠错7%的数据码字 */
	L = 1,
	/** 默认值 */
	M = 0,
	/** 中高级纠错，约可纠错25%的数据码字 */
	Q = 3,
	/** 高级别纠错，约可纠错30%的数据码字 */
	H = 2
}
/**
 * QR8bitByte 类 - 处理8位字节编码
 * 用于将输入数据转换为8位字节序列
 */
declare class QR8bitByte {
	mode: number;
	data: string;
	/**
	 * 构造函数
	 * @param data 要编码的数据
	 */
	constructor(data: string);
	/**
	 * 获取数据长度
	 * @returns 数据长度
	 */
	getLength(): number;
	/**
	 * 将数据写入缓冲区
	 * @param buffer 缓冲区
	 */
	write(buffer: QRBitBuffer): void;
}
/**
 * QRCode 类 - 二维码类
 * 用于生成和管理二维码
 */
declare class QRCode {
	static PAD0: number;
	static PAD1: number;
	typeNumber: number;
	errorCorrectLevel: QRErrorCorrectLevel;
	modules: boolean[][] | null;
	moduleCount: number;
	dataCache: number[] | null;
	dataList: QR8bitByte[];
	/**
	 * 构造函数
	 * @param typeNumber QR码版本(1-40)，如果 < 1，则自动计算
	 * @param errorCorrectLevel 错误纠正级别
	 */
	constructor(typeNumber: number, errorCorrectLevel: QRErrorCorrectLevel);
	/**
	 * 添加数据
	 * @param data 要添加的字符串数据
	 */
	addData(data: string): void;
	/**
	 * 判断指定坐标的模块是否为暗色
	 * @param row 行坐标
	 * @param col 列坐标
	 * @returns 是否为暗色
	 */
	isDark(row: number, col: number): boolean;
	/**
	 * 获取模块数量
	 * @returns 模块数量
	 */
	getModuleCount(): number;
	/**
	 * 生成QR码
	 */
	make(): void;
	/**
	 * 获取最佳掩码模式
	 * @returns 掩码模式索引
	 */
	getBestMaskPattern(): number;
	/**
	 * 创建Flash动画元素（用于旧版Flash应用）
	 * @param target_mc 目标电影剪辑
	 * @param instance_name 实例名称
	 * @param depth 深度
	 * @returns 电影剪辑对象
	 */
	createMovieClip(target_mc: any, instance_name: string, depth: number): any;
	/**
	 * 内部生成QR码的实现
	 * @param test 是否测试模式
	 * @param maskPattern 掩码模式
	 */
	makeImpl(test: boolean, maskPattern: number): void;
	/**
	 * 设置定位图形
	 * @param row 行起始坐标
	 * @param col 列起始坐标
	 */
	setupPositionProbePattern(row: number, col: number): void;
	/**
	 * 设置时序图形
	 */
	setupTimingPattern(): void;
	/**
	 * 设置校正图形
	 */
	setupPositionAdjustPattern(): void;
	/**
	 * 设置版本信息
	 * @param test 是否测试模式
	 */
	setupTypeNumber(test: boolean): void;
	/**
	 * 设置格式信息
	 * @param test 是否测试模式
	 * @param maskPattern 掩码模式
	 */
	setupTypeInfo(test: boolean, maskPattern: number): void;
	/**
	 * 将数据映射到矩阵
	 * @param data 数据
	 * @param maskPattern 掩码模式
	 */
	mapData(data: number[], maskPattern: number): void;
	/**
	 * 创建QR码数据
	 * @param typeNumber 版本号
	 * @param errorCorrectLevel 错误纠正级别
	 * @param dataList 数据列表
	 * @returns 编码后的数据
	 */
	static createData(
		typeNumber: number,
		errorCorrectLevel: QRErrorCorrectLevel,
		dataList: QR8bitByte[]
	): number[];
	/**
	 * 创建字节数据
	 * @param buffer 比特缓冲区
	 * @param rsBlocks RS块数组
	 * @returns 最终数据
	 */
	static createBytes(buffer: QRBitBuffer, rsBlocks: QRRSBlock[]): number[];
}
/**
 * QRRSBlock 类 - RS块类
 * 用于纠错编码的RS块
 */
declare class QRRSBlock {
	totalCount: number;
	dataCount: number;
	constructor(totalCount: number, dataCount: number);
	static RS_BLOCK_TABLE: number[][];
	/**
	 * 获取指定版本和纠错级别的RS块
	 * @param typeNumber 版本号(1-40)
	 * @param errorCorrectLevel 纠错级别
	 * @returns RS块数组
	 */
	static getRSBlocks(typeNumber: number, errorCorrectLevel: QRErrorCorrectLevel): QRRSBlock[];
	/**
	 * 获取RS块表
	 * @param typeNumber 版本号
	 * @param errorCorrectLevel 纠错级别
	 * @returns RS块参数
	 */
	static getRsBlockTable(
		typeNumber: number,
		errorCorrectLevel: QRErrorCorrectLevel
	): number[] | undefined;
}
/**
 * QRBitBuffer 类 - 比特流缓冲区
 * 用于存储和管理二维码数据的位流
 */
declare class QRBitBuffer {
	buffer: number[];
	length: number;
	constructor();
	/**
	 * 获取指定位置的位值
	 * @param index 位索引
	 * @returns 位值(true/false)
	 */
	get(index: number): boolean;
	/**
	 * 在缓冲区中放入指定长度的数值
	 * @param num 数值
	 * @param length 位长度
	 */
	put(num: number, length: number): void;
	/**
	 * 获取缓冲区的位长度
	 * @returns 比特数
	 */
	getLengthInBits(): number;
	/**
	 * 在缓冲区中放入单个位
	 * @param bit 位值
	 */
	putBit(bit: boolean): void;
}

/** 画布上下文接口 */
interface CanvasContext extends CanvasRenderingContext2D {
	setFillStyle?: (color: string) => void;
	setFontSize?: (fontSize: number) => void;
	setTextAlign?: (align: CanvasTextAlign) => void;
	setTextBaseline?: (textBaseline: CanvasTextBaseline) => void;
	setGlobalAlpha?: (alpha: number) => void;
	setStrokeStyle?: (color: string) => void;
	setShadow?: (offsetX: number, offsetY: number, blur: number, color: string) => void;
	draw?: (reserve?: boolean, callback?: () => void) => void;
}
/** 绘制模块接口 */
interface DrawModule {
	name: string;
	type: string;
	x: number;
	y: number;
	width: number;
	height: number;
	[key: string]: any;
}
/** 二维码模块单元格接口定义 */
interface QRModule {
	/** 模块类型数组 */
	type: string[];
	/** 模块颜色 */
	color: string;
	/** 是否为黑色模块 */
	isBlack: boolean;
	/** 是否已绘制 */
	isDrawn: boolean;
	/** 目标X坐标 */
	destX: number;
	/** 目标Y坐标 */
	destY: number;
	/** 目标宽度 */
	destWidth: number;
	/** 目标高度 */
	destHeight: number;
	/** X坐标 */
	x: number;
	/** Y坐标 */
	y: number;
	/** 宽度 */
	width: number;
	/** 高度 */
	height: number;
	/** 上内边距 */
	paddingTop: number;
	/** 右内边距 */
	paddingRight: number;
	/** 下内边距 */
	paddingBottom: number;
	/** 左内边距 */
	paddingLeft: number;
}

/** 二维码实例配置接口 */
interface QRCodeOptions {
	/** 二维码文本内容，优先于 data */
	text?: string;
	/** 二维码对应内容 */
	data?: string | number;
	/** 数据编码，默认utf16to8，设为false则传入原始data */
	dataEncode?: boolean;
	/** 二维码大小 */
	size?: number;
	/** 使用动态尺寸，自动计算每一个小方块尺寸为整数 */
	useDynamicSize?: boolean;
	/** 二维码版本，-1为自动计算 */
	typeNumber?: number;
	/** 纠错等级 */
	errorCorrectLevel?: number;
	/** 二维码外边距 */
	margin?: number;
	/** 二维码绘制区域颜色、底部背景色 */
	areaColor?: string;
	/** 背景色 */
	backgroundColor?: string;
	/** 背景图片地址 */
	backgroundImageSrc?: string;
	/** 背景图片宽度，默认与size同宽 */
	backgroundImageWidth?: number;
	/** 背景图片高度，默认与size同高 */
	backgroundImageHeight?: number;
	/** 背景图片位置X坐标，默认0 */
	backgroundImageX?: number;
	/** 背景图片位置Y坐标，默认0 */
	backgroundImageY?: number;
	/** 背景图片透明度，默认不透明 */
	backgroundImageAlpha?: number;
	/** 背景图片圆角，默认不是圆角 */
	backgroundImageBorderRadius?: number;
	/** 背景码点内边距，系数：0.0-1.0 */
	backgroundPadding?: number;
	/** 前景色 */
	foregroundColor?: string;
	/** 前景图片地址 */
	foregroundImageSrc?: string;
	/** 前景图片宽度，默认为size的1/4 */
	foregroundImageWidth?: number;
	/** 前景图片高度，默认为size的1/4 */
	foregroundImageHeight?: number;
	/** 前景图片位置X坐标，默认在画布中间位置 */
	foregroundImageX?: number;
	/** 前景图片位置Y坐标，默认在画布中间位置 */
	foregroundImageY?: number;
	/** 前景图边距填充 */
	foregroundImagePadding?: number;
	/** 前景图背景颜色 */
	foregroundImageBackgroundColor?: string;
	/** 前景图边界圆角 */
	foregroundImageBorderRadius?: number;
	/** 前景图阴影水平偏移值 */
	foregroundImageShadowOffsetX?: number;
	/** 前景图阴影垂直偏移值 */
	foregroundImageShadowOffsetY?: number;
	/** 前景图阴影模糊度 */
	foregroundImageShadowBlur?: number;
	/** 前景图阴影颜色 */
	foregroundImageShadowColor?: string;
	/** 前景码点内边距，0.0-1.0 */
	foregroundPadding?: number;
	/** 定位角区域背景色，默认值跟随背景色 */
	positionProbeBackgroundColor?: string;
	/** 定位角码点颜色，默认值跟随前景色 */
	positionProbeForegroundColor?: string;
	/** 分割区域颜色，默认值跟随背景色 */
	separatorColor?: string;
	/** 对齐区域背景色，默认值跟随背景色 */
	positionAdjustBackgroundColor?: string;
	/** 对齐码点颜色，默认值跟随前景色 */
	positionAdjustForegroundColor?: string;
	/** 时序区域背景色，默认值跟随背景色 */
	timingBackgroundColor?: string;
	/** 时序码点颜色，默认值跟随前景色 */
	timingForegroundColor?: string;
	/** 版本信息区域背景色，默认值跟随背景色 */
	typeNumberBackgroundColor?: string;
	/** 版本信息码点颜色，默认值跟随前景色 */
	typeNumberForegroundColor?: string;
	/** 暗块颜色，默认值跟随前景色 */
	darkBlockColor?: string;
}
/**
 * 插件类型
 * - instance: _当前 QRCode 实例_
 * - options: _实例属性_
 * - isInstance: _是否来自实例注册，`false` 表示为通过 `UQRCode.use` 全局注册，`true` 表示仅当前实例注册_
 */
type QRPlugin = (instance: UQRCode, options: QRCodeOptions, isInstance: boolean) => void;

/**
 * 二维码生成器类
 * 用于生成和绘制二维码，支持自定义样式和图片
 */
declare class UQRCode {
	/** 当前错误消息 */
	errorMessage: string;
	/** 二维码内容 */
	data: string;
	/** 二维码大小 */
	size: number;
	/** 数据编码，默认utf16to8，设为false则传入原始data，如有特殊的编码需求，可以将其设为false，再将数据编码后传入data */
	dataEncode: boolean;
	/** 使用动态尺寸，自动计算每一个小方块尺寸为整数，因为canvas特性，小数点部分会被绘制为透明渐变色，绘制后看起来像是有白色细线，计算为整数则可以解决这个问题，但是实际尺寸已不是原尺寸，canvas的尺寸需要通过获取dynamicSize后重新设置 */
	useDynamicSize: boolean;
	/** 动态尺寸 */
	dynamicSize: number;
	/** 二维码版本，-1为自动计算，自动计算字符越多，版本越高 */
	typeNumber: number;
	/** 纠错等级 */
	errorCorrectLevel: QRErrorCorrectLevel;
	/** 二维码外边距 */
	margin: number;
	/** 二维码绘制区域颜色、底部背景色 */
	areaColor: string;
	/** 背景色 */
	backgroundColor: string;
	/** 背景图片地址 */
	backgroundImageSrc?: string | undefined;
	/** 背景图片宽度 */
	private backgroundImageWidth?: number | undefined;
	/** 背景图片高度 */
	backgroundImageHeight?: number | undefined;
	/** 背景图片X坐标 */
	backgroundImageX?: number | undefined;
	/** 背景图片Y坐标 */
	backgroundImageY?: number | undefined;
	/** 背景图片透明度，默认不透明 */
	backgroundImageAlpha: number;
	/** 背景图片圆角，默认不是圆角 */
	backgroundImageBorderRadius: number;
	/** 背景码点内边距，系数：0.0-1.0 */
	backgroundPadding: number;
	/** 前景色 */
	foregroundColor: string;
	/** 前景图片地址 */
	foregroundImageSrc?: string | undefined;
	/** 前景图片宽度 */
	foregroundImageWidth?: number | undefined;
	/** 前景图片高度 */
	foregroundImageHeight?: number | undefined;
	/** 前景图片X坐标 */
	foregroundImageX?: number | undefined;
	/** 前景图片Y坐标 */
	foregroundImageY?: number | undefined;
	/** 前景图边距填充 */
	foregroundImagePadding: number;
	/** 前景图背景颜色 */
	foregroundImageBackgroundColor: string;
	/** 前景图边界圆角 */
	foregroundImageBorderRadius: number;
	/** 前景图阴影水平偏移值 */
	foregroundImageShadowOffsetX: number;
	/** 前景图阴影垂直偏移值 */
	foregroundImageShadowOffsetY: number;
	/** 前景图阴影模糊度 */
	foregroundImageShadowBlur: number;
	/** 前景图阴影颜色 */
	foregroundImageShadowColor: string;
	/** 前景码点内边距，0.0-1.0 */
	foregroundPadding: number;
	/** 定位角区域背景色，默认值跟随背景色 */
	positionProbeBackgroundColor?: string | undefined;
	/** 定位角码点颜色，默认值跟随背景色 */
	positionProbeForegroundColor?: string | undefined;
	/** 分割区域颜色，默认值跟随背景色 */
	separatorColor?: string | undefined;
	/** 对齐区域背景色，默认值跟随背景色 */
	positionAdjustBackgroundColor?: string | undefined;
	/** 对齐码点颜色，默认值跟随前景色 */
	positionAdjustForegroundColor?: string | undefined;
	/** 时序区域背景色，默认值跟随背景色 */
	timingBackgroundColor?: string | undefined;
	/** 时序码点颜色，默认值跟随前景色 */
	timingForegroundColor?: string | undefined;
	/** 版本信息区域背景色，默认值跟随背景色 */
	typeNumberBackgroundColor?: string | undefined;
	/** 版本信息码点颜色，默认值跟随前景色 */
	typeNumberForegroundColor?: string | undefined;
	/** 暗块颜色，默认值跟随前景色 */
	darkBlockColor?: string | undefined;
	/** 二维码基本对象，通过实例化QRCode类并调用make后得到 */
	base: QRCode | undefined;
	/** 二维码模块数据，基于base的modules但数据格式不一致，这里的modules是定制过的 */
	modules: QRModule[][];
	/** 模块数量 */
	moduleCount: number;
	/** 绘制模块，层级：最底层 -> 绘制区域 -> 背景图片 -> 背景|前景 -> 前景图片 -> 最顶层 */
	drawModules: DrawModule[];
	/** 画布上下文 */
	canvasContext: CanvasContext;
	/** ctx.draw保留绘制，本次绘制是否接着上一次绘制，2d没有draw方法，所以2d该属性对2d无效 */
	drawReserve: boolean;
	/** 制作完成标志 */
	isMaked: boolean;
	/** 插件集合 */
	static plugins: QRPlugin[];
	/**
	 * 全局扩展插件方法
	 * @param plugin 插件函数
	 */
	static use(plugin: QRPlugin): void;
	/**
	 * 构造函数
	 * @param options 配置选项
	 * @param canvasContext canvas上下文
	 */
	constructor(options?: QRCodeOptions, canvasContext?: any);
	/**
	 * 设置选项
	 * @param options 配置选项
	 */
	setOptions(options: QRCodeOptions): void;
	/**
	 * 错误处理
	 * @param msg 错误信息
	 */
	Error(msg: string): void;
	/**
	 * 加载图片
	 * @param src - 图片地址
	 * @returns Promise<any> - 加载完成的图片
	 */
	loadImage(src: string): Promise<string>;
	/**
	 * 制作二维码
	 * 生成二维码数据并进行绘制准备
	 */
	make(): void;
	/**
	 * 获取绘制模块
	 * @returns DrawModule[] - 绘制模块数组
	 */
	getDrawModules(): DrawModule[];
	/**
	 * 判断当前模块是否是黑块（前景部分）
	 * @param rowI - 行索引
	 * @param colI - 列索引
	 * @returns boolean - 是否为黑块
	 */
	isBlack(rowI: number, colI: number): boolean;
	/**
	 * 绘制canvas方法
	 * @param reserve - 是否保留上一次绘制
	 * @returns Promise<void>
	 */
	drawCanvas(reserve?: boolean): Promise<void>;
	/**
	 * 绘制背景图片
	 * @param ctx - 画布上下文
	 * @param drawModule - 绘制模块数据
	 */
	private drawBackgroundImage;
	/**
	 * 绘制前景图片
	 * @param ctx - 画布上下文
	 * @param drawModule - 绘制模块数据
	 */
	private drawForegroundImage;
	/**
	 * 绘制canvas方法，兼容v3.2.0-v3.4.5版本的写法
	 * @param reserve - 是否保留上一次绘制
	 * @returns Promise<void>
	 */
	draw(reserve?: boolean): Promise<void>;
	/**
	 * 注册实例插件
	 * 写扩展插件时需注意，因微信官方旧版Canvas未完全依照Web Canvas API设计，安卓并未兼容，如需要H5和微信小程序旧版Canvas同时兼容，需要在扩展函数里加入这些API的兼容。（如当前未补充的：setLineCap、setTransform、setStrokeStyle等与Web Canvas不一致的API）
	 * @param plugin - 插件函数
	 */
	register(plugin: QRPlugin): void;
}

/** excel 相关操作 */

declare const QR: typeof UQRCode;
/**
 * 创建 QR 对象,后续需要进一步处理
 * 具体请参考 https://uqrcode.cn/doc/
 */
declare function QRObject(params: IQR): Promise<UQRCode | undefined>;
/**
 * 创建二维码图片
 * 具体请参考 https://uqrcode.cn/doc/
 */
declare function QRCreate(params: IQR): Promise<string>;
/**
 * 远程读取文件并转换成 base64
 * @param url 文件地址
 * @param onlyImage 是否只处理图片格式，默认 true
 */
declare function remoteFileToBase64(url: string, onlyImage?: boolean): Promise<string>;

/** 响应类型扩展，支持所有 ResponseMap 键值及默认的 json 格式 */
type ResponseType = keyof ResponseMap | 'json';
/**
 * HTTP 请求配置选项
 * @template R - 响应类型（默认为 json）
 * @template T - 响应体数据类型
 */
interface HttpOptions<R extends ResponseType = ResponseType, T = any> extends FetchOptions<R, T> {
    /**
     * 认证令牌（支持动态获取）
     * @default 使用全局 fetchConfig.token
     */
    token?: TokenContent;
    /**
     * API 权限验证开关
     * @default false 默认不验证权限
     */
    auth?: boolean;
    /**
     * 是否在 401 错误时自动登录(仅支持浏览器客户端)。
     * 当出现 401 错误时触发的登录操作，用于自动刷新登录信息，方便无感登录
     * @default false 默认不验证权限
     */
    autoLogin?: boolean;
    /**
     * ID 转换开关（用于处理大数字精度丢失问题）
     * 从 _ID_ 中获取实际 id。
     * 当 id 为 long 时，如果超过 js 最大值则需要使用 string，此时则需要从 _ID_ 中获取 id。
     * 需要注意的是获取到的 id 将变成 string
     * @default false 默认不转换
     */
    convert?: boolean;
    /**
     * 错误提示方式
     * @default 'modal' 默认弹窗提示
     */
    alert?: AlertNotifyMode;
    /**
     * 需要 Base64 编码的请求字段
     * @example ['password', 'token']
     */
    encode?: string[];
}
/**
 * HTTP 缓存请求配置选项
 * @template R - 响应类型（默认为 json）
 * @template T - 响应体数据类型
 */
interface HttpCacheOptions<R extends ResponseType = ResponseType, T = any> extends HttpOptions<R, T> {
    /**
     * 缓存时长(单位：毫秒)
     * false 不启用缓存
     * @default 0 不启用缓存
     */
    cacheTime?: number | false;
    /** 是否缓存异常 */
    cacheError?: boolean;
    /** 是否缓存异常 undefined,null 将自动创建，空字符串将关闭缓存 */
    cacheKey?: string | ((request: HttpRequest, options?: HttpCacheOptions<R, T>) => string);
}
interface ResolvedHttpOptions<R extends ResponseType = ResponseType, T = any> extends HttpOptions<R, T> {
    headers: Headers;
}
type HttpRequest = FetchRequest;
type HttpResponse<T = any> = FetchResponse<T> & {
    /** 请求的标识(仅对公司内部项目有效) */
    traceId?: string;
};
type HttpError = FetchError & {
    /** 错误提示模式 */
    alert?: AlertNotifyMode;
    /** 是否已经给用户进行提示过 */
    alerted?: boolean;
};
interface HttpContext<T = any, R extends ResponseType = ResponseType> {
    request: HttpRequest;
    options: ResolvedHttpOptions<R>;
    response?: HttpResponse<T>;
    error?: Error;
}
/**
 * HTTP 简化请求类型(含缓存操作)
 * @template T 响应数据类型
 * @template R 响应类型（默认为 json）
 * @param url 请求地址
 * @param params 请求参数
 * @param options 请求选项
 * @returns 解析后的响应数据
 */
type HttpFetch = <T = any, R extends ResponseType = 'json'>(url: string, params?: Dict, options?: HttpCacheOptions<R>) => Promise<MappedResponseType<R, T>>;
/**
 * 增强版 HTTP 客户端接口
 * @extends $Fetch 基础请求接口
 */
interface HttpClient extends $Fetch {
    /**
     * 发起 HTTP 请求
     * @template T 响应数据类型
     * @template R 响应类型（默认为 json）
     * @param request 请求地址或配置
     * @param options 请求选项
     * @returns 解析后的响应数据
     */
    <T = any, R extends ResponseType = 'json'>(request: HttpRequest, options?: HttpOptions<R>): Promise<MappedResponseType<R, T>>;
    /** 运行配置 */
    runtime: HttpRuntime;
    /**
     * 发起带 Cache 的 HTTP 请求
     * @template T 响应数据类型
     * @template R 响应类型（默认为 json）
     * @param request 请求地址或配置
     * @param options 请求选项
     * @returns 解析后的响应数据
     */
    cache: <T = any, R extends ResponseType = 'json'>(request: HttpRequest, options?: HttpCacheOptions<R>) => Promise<MappedResponseType<R, T>>;
    /** 简化操作（GET） */
    GET: HttpFetch;
    /** 简化操作（POST） */
    POST: HttpFetch;
    /** 简化操作（PUT） */
    PUT: HttpFetch;
    /** 简化操作（PATCH） */
    PATCH: HttpFetch;
    /** 简化操作（DELETE） */
    DELETE: HttpFetch;
    /** 简化操作（表单提交） */
    FORM: HttpFetch;
    /** 文件上传 */
    upload: <T = any, R extends ResponseType = 'json'>(files: FormData, request: HttpRequest, options?: HttpOptions<R>) => Promise<MappedResponseType<R, T>>;
    /** 文件下载 */
    download: (request: HttpRequest, options?: HttpOptions) => Promise<boolean>;
    /**
     * 执行 api 操作(简要 API 参数)
     * @param api api 数据
     * @returns api 执行结果
     */
    api: (api: IApi, options?: HttpOptions) => Promise<void | IApiResult>;
    /** 重置登陆状态 */
    resetLoginStatus: (status?: number) => void;
}
/**
 * token 获取方式
 * 1. 函数：从函数则从执行结果来获取 token 值；
 * 2. token 值如果为 ture, 则从请求头中获取 token 值；
 * 3. token 值存在有效文本则在请求头部增加 Authorization 信息
 */
type TokenContent = string | true | ((context: FetchContext) => string);
/**
 * http 默认参数
 * 关于专有格式接口的说明：
 * 1. 该接口时对于专有格式的配置；
 * 2. 专有格式反馈结果为 JSON 格式的接口，且格式为
 * ```json
 * 	{
 * 		code: number, // 错误代码
 * 		message: string, // 错误消息
 *  	traceId: string, // 服务器返回请求 ID
 * 		data: any // 数据结果
 * 	}
 * ```
 */
interface HttpConfig {
    /** 专有接口字段映射 */
    private: boolean;
    /** 专有接口字段映射 */
    privateMap?: HttpResponseMap;
    /** 基础请求地址 */
    baseURL?: string;
    /** 请求头 */
    /** 请求超时时间(单位：毫秒) */
    timeout?: number;
    /** 默认缓存时长(单位：毫秒) */
    cacheTime?: {
        /** GET 类请求 */
        GET: number;
        /** POST 类请求 */
        POST: number;
    };
    /** 通用登录授权 Token 数据 */
    token?: TokenContent;
    /**
     * 网址权限验证
     * @param url 		要验证的网址
     * @param method 	请求方式
     * @param config  	相关配置数据
     * @returns			是否通过验证，未通过验证的网址将无法进行后续操作
     */
    auth?: (url: string, method: string, config: HttpRuntime) => boolean;
    /**
     * 签名算法，用于附加到请求头部的参数
     * @param url 		要签名的网址
     * @param options 	其他相关请求参数
     * @param config  相关配置数据
     */
    sign?: (url: string, options: ResolvedHttpOptions, config: HttpRuntime) => MaybePromise<void>;
    /**
     * 登录验证。
     * 当出现 401 错误时触发的登录操作，用于自动刷新登录信息，方便无感登录
     * @param request 请求信息
     * @param options 其他相关请求参数
     * @param config  相关配置数据
     */
    login?: (request: HttpRequest, options: ResolvedHttpOptions, config: HttpRuntime) => Promise<boolean>;
    /**
     * 错误处理。
     * 当出现错误时触发的操作，用于处理错误信息，方便统一处理。
     * 当请求发送异常时执行的操作，如弹窗信息等。
     * 如果返回 true 表示已经处理不再后续操作，false 则表示后续需要产生错误异常信息
     * @param error 错误信息
     */
    alert?: (error: HttpError, config: HttpRuntime) => boolean;
    /** 全局无返回状态的错误，是否强制提醒 */
    globalErrorAlert?: AlertNotifyMode;
}
/** http 运行参数 */
interface HttpRuntime extends HttpConfig, Dict {
    /**
     * 重登录状态，用于响应状态，无需手动赋值。
     * 0 - 初始化,未发生 401
     * 1 - 已发生 401,尝试登录;成功则返回 0 ,否则返回 2 失败
     * 2 - 登录失败
     * 3 - 登录成功,可以重试
     * 4 - 重试完成
     */
    reLogin?: number;
    /** 最后操作状态 */
    last?: {
        id?: string;
        url: string;
        method: string;
        status?: number;
        time: Date;
    };
    /** 所在的 http 对象 */
    http?: HttpClient;
}
/**
 * 错误提示模式
 * false 直接返回错误信息
 * toast 顶部弹出信息
 * modal / true 弹窗提示
 * 其他 notify
 */
type AlertNotifyMode = 'modal' | 'toast' | 'notify' | boolean | undefined;
/**
 * 缓存值
 * @template T 缓存数据类型
 */
interface CacheValue<T = any> {
    succ: boolean;
    result: T;
}
/** 转有接口键映射名称 */
interface HttpResponseMap {
    Id: string;
    code: string;
    message: string;
    data: string;
}
/** Api 请求  */
interface IApiBase {
    /** api 地址 */
    url?: string;
    /** 请求方式 */
    method?: string;
    /** 提交参数 */
    data?: Dict | RequestInit['body'];
    /** 头部参数 */
    headers?: Headers;
    /** 超时时长，不设置则使用默认值，单位：秒 */
    timeout?: number;
    /** 是否保持连接 */
    keepalive?: boolean;
    /** 执行后处理, 处理过程位于 apis.$execute */
    complete?: (options: IApiResult) => MaybePromise<IApiResult | undefined | void>;
}
/** Api 请求  */
interface IApi extends IApiBase {
    /** 成功后操作 */
    success?: (value: any) => void;
    /** 失败后操作 */
    fail?: (value: any) => void;
}
/** api 执行结果 */
interface IApiResult {
    /** 是否执行成功 */
    succ: boolean;
    /** 返回结果，当 succ 为 true 时返回网络请求结果，当 succ 为 false 时返回错误信息 */
    value: any;
    /** 当前操作的 api */
    api: IApi;
}

/** 调试信息 */
declare const HTTP_DEBUG: {
    /**
     * 输出模式：是否开启调试信息输出
     * - false: 不输出
     * - true: 输出详细的 http 结果
     * - simple: 仅输出简单结果，及请求地址与方式，结果与参数不输出
     */
    output: boolean | "simple" | "request" | "response";
    /** 仅调试环境才生效，正式环境不生效 */
    debugOnly: boolean;
    /** 是否输出参数使用提示 */
    show: boolean;
};
/** 创建 http 对象 */
declare function createHttp(globalOptions?: CreateFetchOptions, globalConfig?: HttpConfig): HttpClient;

declare const createHttpInstance: typeof createHttp;
declare const http: HttpClient;

/** 控制台输出 */
declare class consoleEcho {
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
    var con: consoleEcho;
    var echo: Action;
}

/** 全局类型申明 */
declare global {
    /**
     * 注册事件，名称如果已经存在则将被覆盖
     * @param name 事件名称，忽略大小写
     * @param action 事件
     */
    var $on: eventBus['on'];
    /**
     *
     * @param name 事件名称，忽略大小写
     * @param event 要移除的事件，不设置则所有都移除
     */
    var $off: eventBus['off'];
    /**
     * 执行事件
     * @param name 事件名称，忽略大小写
     * @param args 提交参数
     */
    var $emit: eventBus['emit'];
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
/** 事件总线 */
declare class eventBus {
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

/** 规则接口 */
interface IRule {
    [name: string]: any;
    /** 是否必填 */
    required?: boolean;
    /** 文本是否去除首尾空格后验证 */
    trim?: boolean;
    /** 类型 */
    type?: 'json' | 'url' | 'email' | 'tel' | 'phone' | 'mobile' | 'mobilephone' | 'guid' | 'number' | 'chinese' | 'english' | 'ip' | 'name';
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
type IRules = Array<IRule> | IRule;
/** 规则验证 */
declare class FormValidate {
    /** 规则合并，并转换成数组规则列表 */
    concat(...args: IRules[]): IRule[] | undefined;
    /********************************************************************/
    /**
     * 规则组验证
     * @param rules	规则对象，数组或者对象
     * @param value	要验证的值
     * @returns 	成功返回 true 否则返回错误提示；无规则则表示无需验证,直接返回成功!
     */
    validate(rules: IRules | undefined, value: any): string | true;
    /**
     * 单条规则验证
     * @param rule	规则对象，数组或者对象
     * @param value	要验证的值
     * @returns 	成功返回 true 否则返回错误提示
     */
    validateRule(rule: IRule, value: any): string | true;
    /** 验证是否必填 */
    private validateRequired;
    /** 验证正则表达式，仅针对字符串 */
    private validateRegular;
    /**
     *	验证类型
     * @param rule 	类型:url / email / mobile / mobilephone / phone
     * @param value 值:非必须填写的项目，对于空值忽略
     */
    private validateType;
    /** 验证区间 */
    private validateRange;
    /** 验证自定义规则函数 */
    private validateFunction;
    /********************************************************************/
    /** 规则描述 */
    description(rules: IRules): string;
    /** 必填 */
    private descriptionRequired;
    /** 正则 */
    private descriptionRegular;
    /** 类型 */
    private descriptionType;
    /** 区间 */
    private descriptionRange;
    /********************************************************************/
    /** 是否存在规则 */
    hasRules(rules: IRules): boolean;
    /** 将规则对象转换成规则列表 */
    private updateRules;
    /** 是否存在必填项目 */
    hasRequired(rules: IRules): any;
}
declare const _default$2: FormValidate;

/** Cookies 选项 */
interface CookiesOptions {
    /** 过期时间，单位：秒 */
    expire?: number;
    /** 路径 */
    path?: string;
    /** 安全 */
    secure?: boolean;
    /** HttpOnly */
    httpOnly?: boolean;
}
/**
 * 设置 cookie
 * @param name 名称
 * @param value 值
 * @param options 选项
 */
declare function setCookie(name: string, value: string, options?: CookiesOptions): void;
/**
 * 获取 cookie
 * @param name 名称
 * @returns 值
 */
declare function getCookie(name: string): string | null;
/** 删除 Cookie */
declare function deleteCookie(name: string, path?: string): void;
declare const _default$1: {
    set: typeof setCookie;
    get: typeof getCookie;
    del: typeof deleteCookie;
};

/** LRU 数据结构 */
declare class lruValue {
    /** 缓存键 */
    key: string;
    /** 缓存值 */
    value: any;
    /** 超时时长,单位:秒 */
    exp: number;
    /** 上一个元素 */
    prev: lruValue | undefined;
    /** 下一个元素 */
    next: lruValue | undefined;
    /** 构造,超时设置为 0 时,永不到期 时间单位:秒 */
    constructor(key: string, value: any, exp: number);
    /** 更新值 */
    update(value: any, exp: number): void;
    isExp(): boolean;
}
/** LRU 操作 */
declare class LRU {
    /** 缓存的键 */
    datas: Map<string, lruValue>;
    /** 最大缓存数量 */
    capacity: number;
    /** 头部元素 */
    private head;
    /** 尾部元素 */
    private tail;
    /**
     * 构造
     * @param capacity	最大元素数量
     */
    constructor(capacity?: number);
    /** 获取缓存，不存在返回 undefined */
    get(key: string): any;
    /**
     * 获取缓存
     * @param key	缓存键
     * @param value	缓存内容
     * @param exp	超时时长 单位:秒，0 为永不到期
     */
    set(key: string, value: any, exp: number): void;
    /** 移除缓存 */
    remove(key: string): void;
    /** 是否存在缓存键 */
    has(key: string): boolean;
    /** 清除所有缓存 */
    clear(): void;
    /** 所有缓存的键 */
    keys(): MapIterator<string>;
    /** 缓存数量 */
    length(): number;
    /** 强制清除到期缓存 */
    trim(): void;
    /** 更新调整位置，将新数据移动到尾部 */
    private _updateItem;
    /** 移除最近最少使用节点 */
    private _checkSize;
    /** 强制移除 */
    private _remove;
}

declare const _default: (background: string | (() => string), interval?: number) => void;

/** 获取浏览器自动样式 */
declare function UIThemeQuery(options?: {
    /** 深色与浅色模式自动切换开始时间 */
    start: number;
    /** 深色与浅色模式自动切换结束时间 */
    end: number;
    /** 默认支持的主题，不论是否设置都包含 'dark' 和 'light'，主要用于从 class 中获取样式类型 */
    defaultThemes?: string[];
}): string | undefined;
/**
 * 设置浏览器样式
 * 从 html 根节点调整样式
 * @param theme 主题
 * @param el 样式元素，默认 html 根节点
 */
declare function UIThemeSet(theme: 'light' | 'dark' | string, el?: HTMLElement): void;
/**
 * 重要日期样式变灰
 * @param days 日期，日期组，{日期：水印文本}。如果日期为长日期比较当天，短日期每年比较。如果水印文本以 * 开头，页面变灰。
 */
declare const createImportantStyle: (days: string | string[] | NVs) => void;
/** 样式类名类型 */
type ClassName = string | boolean | undefined | string[] | Record<string, boolean>;
/** 合并样式中的类名，自动移除重复类名、空值 */
declare const mergeClass: (...classNames: ClassName[]) => string[];

/**
 * 设备屏幕类型
 * @param options 配置参数 宽度(desktop：桌面端最小宽度（含）；mobile：移动端最大宽度（含）)
 * @returns 设备屏幕类型
 */
declare const screenType: (options?: {
    desktop: number;
    mobile: number;
}) => "server" | "mobile" | "desktop" | "tablet";
/** 判断是否全屏 */
declare const isFullscreen: () => any;
/** 进入全屏 */
declare const fullscreenLaunch: (element: Element | string) => boolean;
/** 退出全屏 */
declare const fullscreenExit: () => boolean;

export { $Global, type Action, type AlertNotifyMode, type AsyncAction, type AsyncFunc, index as Base, CACHE_TIME_MAX, type CacheValue, type CanvasContext, type ClassName, _default$1 as Cookies, type CookiesOptions, DEBOUNCE_WINDOW_RESIZE, DEBUG, description as DESCRIPTION, DecimalLength, type Dict, type DrawModule, FormValidate, type Func, homepage as HOMEPAGE, HTTP_DEBUG, type HttpCacheOptions, type HttpClient, type HttpConfig, type HttpContext, type HttpError, type HttpFetch, type HttpOptions, type HttpRequest, type HttpResponse, type HttpResponseMap, type HttpRuntime, type IApi, type IApiBase, type IApiResult, type IList, type IListMap, type IQR, type IRule, type IRules, type ITask, type ITasks, type ITree, type ITreeMap, LOGO, LRU, MD5, type MaybePromise, name as NAME, type NVs, type Nullable, QR, QRCode, type QRCodeOptions, QRCreate, QRErrorCorrectLevel, type QRModule, QRObject, type QRPlugin, type ResolvedHttpOptions, type ResponseType, SERVERMODE, TEST, title as TITLE, type TaskModeEnum, Tasks, type TokenContent, UIThemeQuery, UIThemeSet, version as VERSION, empty as arrayEmpty, remove as arrayRemove, base64Decode, base64Encode, cache, cleanDuplicate, clear, clone, compare, consoleEcho, counting, createHttpInstance, createImportantStyle, createTasks, date, dateFormat, dateLong, debounce, deleteCookie, each, eachSync, empty$1 as empty, errorTrace, eventBus, every, exportJson as excelJson, exportTable as excelTable, execute, fingerprint, fnId, _default$2 as formValidate, fullscreenExit, fullscreenLaunch, get, getCookie, globalId, group, has, hasArray, hasObject, hasObjectName, hasString, hash, htmlClear, htmlEncode, htmlSafe, http, inRange, isArray, isAsync, isBoolean, isCar, isChinese, isDate, isEmail, isEmpty, isEnglish, isEqual, isFloat, isFn, isFullUrl, isFullscreen, isGuid, isHttp, isIP, isInt, isJSON, isMatch, isMobile, isNaN, isName, isNil, isNumber, isObject, isPhone, isPrimitive, isRegExp, isString, isSymbol, isUrl, isVueComponent, jsonDownload, list, list2tree, listConvert, listParents, listTop, math, merge, mergeClass, modulesUpdate, modulesUpdateSync, notEmpty, number, objectDownload, range, reduce, remoteFileToBase64, remove$1 as remove, rnd, screenType, select, set, setCookie, sleep, some, sort, string2Value, stringClear, stringCut, stringIncludes, template, throttle, toArray, toDate, toDeepObject, toFloat, toHtml, toInt, toJSON, toObject, toSingleObject, treeConvert, treeExecute, treeFind, treeFindAll, treeParents, trimEx, typeName, _default as waterMark, xor };
