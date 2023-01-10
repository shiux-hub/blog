---
title: 原生js中编码的三种方法
reprint: false
tags:
  - JavaScript
  - 代码
  - 笔记
categories:
  - Code
date: 2020-02-28 19:38:48
cover:
coverWidth:
coverHeight:
---

在开发中经常需要对用户输入的数据进行编码然后才能通过HTTP请求发送给后台，或者对传递过来的数据进行解码。在JS中原生提供了三种编码/解码方式，分别是 `encodeURI`、 `encodeURIComponent`和 `escape`。

## encodeURI

该方法不会对ASCII表中的字母和数字编码，同时也不会对ASCII中的标点符号编码 `**-_.~*’()**` 在URI中具有特殊含义的符号 `**;/?:@&=+$,#**`同样不会被编码。

```javascript
let url = 'https://google.com/pathname?a=1&b=abcde&c=黄山#hash';
encodeURI(url); // 返回 https://google.com/pathname?a=1&b=abcde&c=%E9%BB%84%E5%B1%B1#hash

encodeURI("-_.~*'()"); // 返回 -_.~*'()

encodeURI(";/?:@&=+$,#"); // 返回 ;/?:@&=+$,#
```

## encodeURIComponent

该方法相比`encodeURI`多编码URI中具有特殊含义的符号 `**;/?:@&=+$,#**`

```javascript
let url = 'https://google.com/pathname?a=1&b=abcde&c=黄山#hash';
encodeURIComponent(url); // 打印 "https%3A%2F%2Fgoogle.com%2Fpathname%3Fa%3D1%26b%3Dabcde%26c%3D%E9%BB%84%E5%B1%B1%23hash"

encodeURIComponent("-_.~*'()"); // 返回 -_.~*'()

encodeURIComponent(";/?:@&=+$,#"); // 返回 %3B%2F%3F%3A%40%26%3D%2B%24%2C%23

// 通过对比可看出方法`encodeURI`和`encodeURIComponent`编码中文的返回结果是一样的。

encodeURI("黄山"); // 返回 %E9%BB%84%E5%B1%B1

encodeURIComponent("黄山"); // 返回 %E9%BB%84%E5%B1%B1
```

## escape（不推荐使用，推荐使用上面两个方法代替）

该方法会对ASCII中 **字母、数字及符号*@-_+./**之外的所有字符进行编码。

```javascript
let url = 'https://google.com/pathname?a=1&b=abcde&c=黄山#hash';
escape(url); // 返回 https%3A//google.com/pathname%3Fa%3D1%26b%3Dabcde%26c%3D%u9EC4%u5C71%23hash

console.log(escape("*@-_+./")); // 打印 *@-_+./

escape对于汉字的编码和上面两个方法的编码结果并不一样。

encodeURI("黄山"); // 返回 %E9%BB%84%E5%B1%B1

encodeURIComponent("黄山"); // 返回 %E9%BB%84%E5%B1%B1

escape("黄山"); // 返回 %u9EC4%u5C71
```

## 解码

三种编码方法对应的解码方法分别是：

|        编码        |        解码        |
| :----------------: | :----------------: |
|     encodeURI      |     decodeURI      |
| encodeURIComponent | decodeURIComponent |
|       escape       |      unescape      |

```javascript
let res = encodeURI("黄山"); // %E9%BB%84%E5%B1%B1
decodeURI(res); // 返回 黄山

let res = encodeURIComponent("黄山"); // %E9%BB%84%E5%B1%B1
decodeURI(res); // 返回 黄山

let res = escape("黄山"); // %u9EC4%u5C71
unescape(res); // 返回 黄山
```
