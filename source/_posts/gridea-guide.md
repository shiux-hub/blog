---
title: Gridea使用指北
reprint: false
date: 2023-01-01 05:52:46
categories:
  - Guide
tags:
  - Git
  - Hexo
  - Nodejs
  - npm
  - 技巧
  - 笔记
cover: https://s2.loli.net/2023/01/01/XneESaU63gshwdv.png
coverWidth:
coverHeight:
---

## 前言

当下大多数人可能已经对Github Pages不再陌生，它是很多喜欢写文章的人第一次接触的用于免费搭建博客建一个简洁却又不失优雅的个人博客 ，直到现在互联网上还有大量的基于它的个人博客，也有大量的搭建方法的教程。我之前就在少数派发表过一篇详细的GitHub Pages搭建教程，尚未掌握的朋友可以先从这篇文章读起。

然而搭建虽然简单，但是管理和推送文章却相对麻烦不少，在官方的教程里，我们需要经历繁琐的步骤才能发布一篇文章和修改个人空间界面。相较于官方提供的GitHub Desktop和在终端使用Git的方法管理Github Pages，Gridea这款工具则更为的便捷和优雅，它能让作为创作者的你更专注于写作 。

## 简介

Gridea是一个静态博客写作客户端，帮助你更容易地构建并管理博客或任何静态站点。

Gridea最早叫Hve Notes，开发者为了更易读和好记，重新命名为Gridea，支持Windows和 Mac 平台，它的基础界面非常地小清新。

![Gridea文章页](https://s2.loli.net/2023/01/01/kUBrdTAKDsVJmNI.png)

**官网** - <https://gridea.dev/>
**Github** - <https://github.com/getgridea/gridea>

第一次使用它需要你进行应用的初始化配置，才能让他和Github Pages连接，配置很简单，可以参考下面的方法进行配置：

- 域名：Github Pages 对应的域名（例如：`https://brick713.github.io`或`http://moyu.com`）
- 仓库：你的静态文件存放的仓库（例如：`shiux.github.io`）
- 分支：你的Github Pages对应的分支（例如：main）
- 用户名：仓库所属用户的用户名（通常就是你的Github账号的昵称）
- 邮箱：Git 推送时使用的邮箱（通常就是你的Github账号的邮箱）
- Token: Git 推送时需要的 Token用来向Github提交构建后的文件 [Github personal access tokens](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fsettings%2Ftokens)
- CNAME: 可通过这个选项配置你自己的域名（例如：`shiux.com`）
