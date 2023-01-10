---
title: 阿里巴巴矢量图批量下载
reprint: false
tags:
  - 技巧
categories:
  - Guide
date: 2020-01-15 02:26:41
cover:
coverWidth:
coverHeight:
---

在[阿里巴巴矢量图标库](https://www.iconfont.cn/)中找到一个喜欢的图标库，想要全部下载，但是发现需要挨个点击添加购物车中，如下图所示，居然没找一个可以全选的按钮！！总之不知道为啥要这样设计吧。但是确实很不方便。

![阿里巴巴矢量图标库](/images/b276d985a84be364ee6381616aabcb5d.png)

想要全选的话，操作如下

1. 按下F12或者打开浏览器开发者模式

2. 进入console的窗口
![打开console](https://i.loli.net/2021/08/01/vp31rX8tU9heNMC.png)
3. 输入下列代码，然后回车

   ```javascript
   const iconList = document.querySelectorAll('.icon-gouwuche1');
   for (let i = 0; i < iconList.length; i++) {
     iconList[i].click();
   }
   ```

4. 完成，即可进入购物车中查看自己添加的图标。
