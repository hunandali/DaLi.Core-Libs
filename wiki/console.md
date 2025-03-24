# 控制台输出 (console)

控制台输出模块提供了一个统一的日志输出接口，支持不同级别的日志输出、调试信息显示等功能。该模块已经全局挂载，可以直接通过 `con` 对象访问所有功能。

## 类说明

### consoleEcho

控制台输出类，提供各种级别的日志输出功能。

```typescript
class consoleEcho {
	constructor();
}
```

## 方法列表

### echo

基础信息输出方法。

```typescript
echo(color: ChalkInstance, message?: any, ...optionalParams: any[]): void;
```

**参数：**

-   `color` - 输出颜色
-   `message` - 输出信息
-   `optionalParams` - 额外参数

### log

普通日志输出，仅在调试模式下生效。

```typescript
log(message?: any, ...optionalParams: any[]): void;
```

**参数：**

-   `message` - 输出信息
-   `optionalParams` - 额外参数

### table

以表格形式显示数据。

```typescript
table(tabularData: any, properties?: ReadonlyArray<string>): void;
```

**参数：**

-   `tabularData` - 表格数据
-   `properties` - 要显示的属性列表

### information / info

信息级别输出，使用蓝色显示。

```typescript
information(message: any, ...optionalParams: any[]): void;
info(...optionalParams: any[]): void;
```

### error / err

错误级别输出，使用红色显示。

```typescript
error(message: any, ...optionalParams: any[]): void;
err(...optionalParams: any[]): void;
```

### warning / warn

警告级别输出，使用橙色显示。

```typescript
warning(message: any, ...optionalParams: any[]): void;
warn(...optionalParams: any[]): void;
```

### success / succ

成功级别输出，使用绿色显示。

```typescript
success(message?: any, ...optionalParams: any[]): void;
succ(...optionalParams: any[]): void;
```

### debug

调试信息输出。

```typescript
debug(...optionalParams: any[]): void;
```

**参数：**

-   `optionalParams` - 调试参数，如果最后一个参数为 `~` 则不输出调试信息

## 全局变量

### con

全局控制台对象，可以直接访问所有输出方法。

```typescript
const con: consoleEcho;
```

### echo

全局调试输出函数，是 `con.debug` 的快捷方式。

```typescript
const echo: Action;
```

## 使用示例

```typescript
// 普通日志
con.log('普通日志');

// 信息输出
con.info('信息输出');
con.information('自定义信息', '额外参数');

// 错误输出
con.err('错误信息');
con.error('自定义错误', '错误详情');

// 警告输出
con.warn('警告信息');
con.warning('自定义警告', '警告详情');

// 成功输出
con.succ('成功信息');
con.success('自定义成功', '成功详情');

// 调试输出
echo('调试信息');
con.debug('调试标题', '调试内容1', '调试内容2');

// 表格输出
con.table([
	{ id: 1, name: 'Item 1' },
	{ id: 2, name: 'Item 2' }
]);
```

## 特点说明

1. **全局可用**：模块已全局挂载，可以在任何地方使用 `con` 对象
2. **彩色输出**：不同级别的日志使用不同的颜色，便于区分
3. **调试模式**：部分输出仅在调试模式下可见
4. **灵活参数**：支持多个参数的输出
5. **自动分组**：复杂输出会自动使用分组显示
6. **源码追踪**：输出会包含代码位置信息，便于追踪
7. **服务端兼容**：同时支持客户端和服务端环境
