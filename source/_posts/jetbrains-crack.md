---
title: JetBrains全系列软件激活教程
reprint: false
tags:
  - JetBrains
categories:
  - Guide
date: 2020-01-24 03:19:08
cover: /images/083f107c7eef554ff2de276f9fcdfeb2.png
coverWidth:
coverHeight:
---

## 无限重置试用

### 写在前面

永久激活的工具zhile的大神已经不再继续开发维护了，此方法一直是跳转到zhili的主页，但是经常遇到反馈说目标网站打不开或者不知道怎么安装插件的问题，所以直接转到这个页面并配一下操作图片吧。另外目前只有这种无限重置试用的方法了，**最终和永久激活使用无差异，因为插件是每次运行自动续期的**！支持JetBrains系列软件的所有新旧版本的激活！！！建议大家去[JetBrains官网](https://www.jetbrains.com/)下载JetBrains系列工具的官方版，一般情况下载很快的。

此方法也适用于 MacOS。

### 背景

JetBrains家的产品有一个很良心的地方，他会允许你试用30天（这个数字写死在代码里了）以评估是否你真的需要为它而付费。但很多时候会出现一种情况： IDE并不能按照我们实际的试用时间来计算。

我举个例子： 如果我们开始了试用，然后媳妇生孩子要你回去陪产！陪产时我们并无空闲对IDE试用评估，它依旧算试用时间。（只是举个例子，或许你并没有女朋友）

发现了吗？你未能真的有30天来对它进行全面的试用评估，你甚至无法作出是否付费的决定。此时你会想要延长试用时间，然而JetBrains并未提供相关功能，该怎么办？

事实上有一款插件可以实现这个功能，你或许可以用它来重置一下试用时间。但切记不要无休止的一直试用，这并不是这个插件的初衷！

![许可证](/images/01f173bc61a6c8757956a5cdac88564f.png)

### 如何安装

> 提供以下两种方法，二选一即可。

1. 插件市场安装：
在`Settings/Preferences... -> Plugins`内手动添加第三方插件仓库地址：`https://plugins.zhile.io` 搜索： IDE Eval Reset插件进行安装。
![管理插件仓库](/images/547acf4426094cef2b6320cb2fc56461.png)
![添加插件仓库](/images/08f04a365fae66db5605b356babbf245.png)
![安装插件](/images/688e8719c10f5d074e6427025527848a.png)

2. 手动下载安装：
[点击这个链接(v2.2.3)下载插件的 zip 包](https://fuocu.lanzoui.com/ie3Fksry09i)（macOS可能会自动解压，切记使用的是zip包，不是解压后的文件夹！），然后打开`Settings/Preferences... -> Plugins`手动安装插件。
![从磁盘添加插件](/images/98f506280ddba598a20cc891ed555b53.png)
![选择插件](/images/28baf8fec6bb6f9dd93f7f534f18c24f.png)

### 如何使用

一般来说，在IDE窗口切出去或切回来时（窗口失去/得到焦点）会触发事件，检测是否长时间（25天）没有重置，给通知让你选择。（初次安装因为无法获取上次重置时间，会直接给予提示）。

您也可以手动唤出插件的主界面：

1. 如果IDE没有打开项目，在Welcome界面点击IDE的菜单：`Get Help -> Eval Reset`

2. 如果IDE打开了项目，点击IDE的菜单：`Help -> Eval Reset`

唤出的插件主界面中包含了一些显示信息，有2个按钮和1个勾选项：

- 按钮：`Reload`用来刷新界面上的显示信息。
- 按钮：`Reset`点击会询问是否重置试用信息并重启 IDE。选择Yes则执行重置操作并重启IDE生效，选择No则什么也不做。（此为手动重置方式）
- 勾选项：`Auto reset before per restart`如果勾选了，则自勾选后每次重启/退出IDE时会自动重置试用信息，你无需做额外的事情。（此为自动重置方式，推荐此方法！）

### 如何更新

1. 插件更新机制（推荐）：
IDE 会自行检测其自身和所安装插件的更新并给予提示。如果本插件有更新，你会收到提示看到更新日志，自行选择是否更新。
点击IDE的Check for Updates...菜单手动检测 IDE 和所安装插件的更新。如果本插件有更新，你会收到提示看到更新日志，自行选择是否更新。
插件更新可能会需要重启IDE。

2. 手动更新：
从本页面下载最新的插件zip包安装更新。插件更新需要重启IDE。

### 一些说明

市场付费插件的试用信息也会一并重置。

`MyBatisCodeHelperPro`插件有两个版本如下，功能完全相同，安装时须看清楚！

- [MyBatisCodeHelperPro](https://plugins.jetbrains.com/plugin/14522-mybatiscodehelperpro-marketplace-edition-) (Marketplace Edition)，**可重置**！
- [MyBatisCodeHelperPro](https://plugins.jetbrains.com/plugin/9837-mybatiscodehelperpro)，**不可重置**！

对于某些付费插件（如:Iedis 2, MinBatis）来说，你可能需要去取掉javaagent配置（如果有）后重启IDE：

- 如果IDE没有打开项目，在Welcome界面点击菜单：`Configure -> Edit Custom VM Options... -> 移除 -javaagent`: 开头的行。
- 如果IDE打开了项目，点击菜单：`Help -> Edit Custom VM Options... -> 移除 -javaagent`: 开头的行。

重置需要重启IDE生效！

重置后并不弹出Licenses对话框让你选择输入License或试用，这和之前的重置脚本/插件不同（省去这烦人的一步）。

如果长达 25 天不曾有任何重置动作，IDE 会有通知询问你是否进行重置。

如果勾选： Auto reset before per restart，重置是静默无感知的。

简单来说： 勾选了Auto reset before per restart则无需再管，一劳永逸。

### 开源信息

插件是学习研究项目，源代码是开放的。

**Gitee** - <https://gitee.com/pengzhile/ide-eval-resetter>

如果你有更好的想法，欢迎给我提Pull Request来共同研究完善。

插件源码使用： GPL-2.0开源协议发布。

插件使用PHP编写，毕竟PHP是世界上最好的编程语言！

### 支持的产品

- IntelliJ IDEA
- AppCode
- CLion
- DataGrip
- GoLand
- PhpStorm
- PyCharm
- Rider
- RubyMine
- WebStorm

**原文地址** - <https://zhile.io/2020/11/18/jetbrains-eval-reset-da33a93d.html>

## 中文汉化包

JetBrains系列大部分在官方的插件中心直接安装使用了。

以WebStorm为例，打开它的设置，点击Plugins，搜索chinese，安装即可。

![安装中文插件](/images/5ae872c51e5d5a8da5d6d67c473adf90.png)

## 激活码

目前全网JetBrains全家桶激活码激活方式都不稳定，请使用无限重置试用的方法。
