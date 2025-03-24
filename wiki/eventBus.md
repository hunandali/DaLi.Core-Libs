# 事件总线 (eventBus)

事件总线模块提供了一个全局的事件管理系统，支持事件的注册、注销和触发，同时提供了专门的窗口大小调整事件处理机制。

## 全局变量

### $on

注册事件，如果事件名称已存在，可以选择是否允许重复注册。

```typescript
function $on(
	name: string,
	event: Action,
	duplicate?: boolean,
	immediate?: boolean,
	...args: any[]
): void;
```

**参数：**

-   `name` - 事件名称，忽略大小写
-   `event` - 事件处理函数
-   `duplicate` - 是否允许重复注册，默认为 false
-   `immediate` - 是否立即执行一次，默认为 false
-   `args` - 立即执行时的参数

### $off

注销指定事件。

```typescript
function $off(name: string, event?: Action): void;
```

**参数：**

-   `name` - 事件名称，忽略大小写
-   `event` - 要移除的事件，不设置则移除所有同名事件

### $emit

触发指定事件。

```typescript
function $emit(name: string, ...args: any[]): void;
```

**参数：**

-   `name` - 事件名称，忽略大小写
-   `args` - 事件参数

### $resize

窗口大小调整事件管理器，提供了一组用于处理窗口大小变化的方法。

```typescript
interface $resize {
	/** 注册窗口大小调整事件监听 */
	register(): void;

	/** 注销窗口大小调整事件监听 */
	unregister(): void;

	/** 添加窗口大小调整事件处理函数 */
	on(event: Action, immediate?: boolean, ...args: any[]): void;

	/** 移除窗口大小调整事件处理函数 */
	off(event: Action): void;

	/** 强制执行窗口大小调整事件 */
	execute(): void;
}
```

## 使用示例

```typescript
// 注册事件
$on('myEvent', (param1, param2) => {
	console.log('Event triggered with:', param1, param2);
});

// 触发事件
$emit('myEvent', 'value1', 'value2');

// 注册允许重复的事件
$on('myEvent', handler1, true);
$on('myEvent', handler2, true);

// 注册并立即执行一次
$on('myEvent', handler, false, true, 'init param');

// 移除特定事件处理函数
$off('myEvent', handler);

// 移除所有同名事件
$off('myEvent');

// 注册窗口大小调整事件
$resize.register();
$resize.on((width, height) => {
	console.log('Window size changed:', width, height);
});

// 注销窗口大小调整事件
$resize.unregister();
```

## 特点说明

1. **全局可用**：所有事件方法都挂载在全局作用域，可以在任何地方使用
2. **大小写不敏感**：事件名称忽略大小写，避免命名冲突
3. **防抖处理**：窗口大小调整事件内置防抖机制，避免频繁触发
4. **服务端兼容**：自动识别服务端环境，跳过不支持的操作
5. **灵活配置**：支持事件重复注册、立即执行等配置
6. **链式操作**：支持多个事件处理函数的注册和管理
7. **内存管理**：提供完整的事件注销机制，避免内存泄漏
