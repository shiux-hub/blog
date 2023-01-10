---
title: 一键制作 macOS Monterey U盘 USB 启动安装盘命令方法教程 (全新安装 Mac 系统)
reprint: false
date: 2021-11-07 21:02:35
categories:
  - MacOS
tags:
  - 技巧
cover: https://s2.loli.net/2023/01/01/sFAKEtPzYlVQd9B.png
coverWidth:
coverHeight:
---

随着苹果 macOS 正式版发布，很多使用 Mac 电脑的同学都已升级到最新版了。但如果你对系统有洁癖或原本系统已凌乱不堪，那么可能还是希望能格式化「全新安装 macOS」的。

不过由于苹果官方只提供了 macOS 的升级程序，并没提供完整 ISO 镜像，想要全新安装的话，只能自己制作一个 macOS 的 U 盘启动盘/安装盘了。今天就给大家提供一个简单的制作教程，这样以后给 Mac 重装系统、在没网络的情况下给多台机器装机都方便许多……

## 开始制作

1. 首先，准备一个 8 GB 或更大容量的 U 盘，并备份好里面的所有资料。

2. 下载好 macOS 正式版的安装程序备用，先不要启动安装。

3. 打开`应用程序 → 实用工具 → 磁盘工具`，将U盘「抹掉」(格式化) 成**「Mac OS X 扩展（日志式）」**格式、GUID 分区图，并「给U盘改一个名字」。
注意：这个盘符名称必须与后面的命令完全一致，需认真检查，很多新手出错在这里！

4. 记住你刚才给 U 盘改的名字，建议最好是简单的纯英文且「无空格」，比如就叫做 `Mac`，否则后面容易出错 ！！

5. 打开 “应用程序→实用工具→终端”，将下面的一段命令复制并粘贴进去 （记得修改替换成你所取的 U 盘名称，注意名称的大小写敏感）

6. **制作命令如下：**
**制作 macOS Monterey 12 启动盘：**

```bash
sudo /Applications/Install\ macOS\ Monterey.app/Contents/Resources/createinstallmedia --volume /Volumes/你的U盘名称
```

**制作 macOS Big Sur 11 启动盘：**

```bash
sudo /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/createinstallmedia --volume /Volumes/你的U盘名称
```

**制作 macOS Catalina 10.15 启动盘：**

```bash
sudo /Applications/Install\ macOS\ Catalina.app/Contents/Resources/createinstallmedia --volume /Volumes/你的U盘名称
```

**制作 macOS High Sierra 10.13 启动盘：**

```bash
sudo /Applications/Install\ macOS\ High\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/你的U盘名称
```

**制作 macOS Sierra 10.12 启动盘：**

```bash
sudo /Applications/Install\ macOS\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/你的U盘名称
```

1. 回车并执行该命令，这时会提示让你输入管理员密码，便会开始制作过程了：

2. 如上图，这时系统已经在制作中了，请耐心等待直到屏幕最后出现 Done. 字样即表示大功告成了！然后，就带着U盘出去浪吧……

## 错误解决方法

如果你执行上面的命令后出现`mount of outer dmg failed`的错误提示，那么需要在终端中执行一句命令来修复权限（这里以 Monterey 为例）：

```bash
sudo chmod 777 /Applications/Install\ macOS\ Monterey.app/Contents/Resources/createinstallmedia
```
