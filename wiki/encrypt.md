# 加密模块 (encrypt)

加密模块提供了一系列加密和编码功能，包括 Base64 编码和 MD5 哈希等。

## Base64 编码

提供了字符串的 Base64 编码和解码功能。

### encode

对文本进行 Base64 编码。

```typescript
function encode(input: string): string;
```

### decode

对 Base64 文本进行解码。

```typescript
function decode(input: string): string;
```

### 使用示例

```typescript
// Base64 编码
const encoded = base64.encode('Hello World');
console.log(encoded); // 'SGVsbG8gV29ybGQ='

// Base64 解码
const decoded = base64.decode('SGVsbG8gV29ybGQ=');
console.log(decoded); // 'Hello World'
```

## MD5 哈希

提供了字符串的 MD5 哈希计算功能。

### md5

计算字符串的 MD5 哈希值。

```typescript
function md5(str: string, raw?: false): string;
function md5(str: string, raw: true): Int32Array;
```

参数说明：

-   `str`: 要计算哈希的字符串
-   `raw`: 是否返回原始的 Int32Array 数据，默认为 false

### hashAsciiStr

计算 ASCII 字符串的 MD5 哈希值。

```typescript
function hashAsciiStr(str: string, raw?: false): string;
function hashAsciiStr(str: string, raw: true): Int32Array;
```

参数说明：

-   `str`: 要计算哈希的 ASCII 字符串
-   `raw`: 是否返回原始的 Int32Array 数据，默认为 false

### 使用示例

```typescript
// 计算 MD5 哈希
const hash = MD5.md5('Hello World');
console.log(hash); // 'b10a8db164e0754105b7a99be72e3fe5'

// 计算 ASCII 字符串的 MD5 哈希
const asciiHash = MD5.hashAsciiStr('Hello World');
console.log(asciiHash); // 'b10a8db164e0754105b7a99be72e3fe5'

// 获取原始哈希数据
const rawHash = MD5.md5('Hello World', true);
console.log(rawHash); // Int32Array
```

## 特点说明

1. **Base64 编码**：支持 UTF-8 字符串的编码和解码
2. **MD5 哈希**：提供标准的 MD5 哈希计算功能
3. **类型支持**：完整的 TypeScript 类型定义
4. **性能优化**：MD5 哈希计算使用了优化的算法实现
5. **易用性**：API 设计简洁，使用方便
6. **可扩展**：模块化设计，易于扩展新的加密功能
