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

## 准备和条件

### 下载 macOS

要保证下载的安装包`Install macOS *.app`（“安装 macOS [版本名称]”的 App）在 “应用程序” 文件夹。

- DMG 的软件包，需要打开拖拽到 “应用程序” 文件夹；
- ISO 格式也可以拖拽到 “应用程序” 文件夹，或者只需要双击挂载更便捷；
- PKG 格式的软件包，打开根据提示自动安装到 “应用程序” 文件夹；
- 在 Mac App Store 下载的 App 会自动保存在 “应用程序” 文件夹。

### 准备启动介质：USB 移动存储设备

可以使用以下三种介质中的一种：

1. U 盘：Catalina 及以上版本需要 16G 及以上容量的 U 盘，其他旧版本 8G 容量的 U 盘即可（SD 卡同理）；
2. USB 移动硬盘，比如 USB SSD 移动硬盘更佳（推荐！）；
3. 使用系统 “磁盘工具” 新建一个分区（非 APFS 卷），适合有经验的用户，大版本更新推荐使用 USB 外置存储抹掉整个内置磁盘。

使用 “磁盘工具” 抹掉上述介质或者分区，要求如下：

1. Mac OS X 扩展（日志式）；
2. GUID 分区图；
3. 分区名称：sysin（这里为示例名称，可以自定义，简单点就直接按照本文操作即可）。

![erase-media](https://sysin.org/blog/macos-createinstallmedia/erase-media.webp)

上述对话框无法正确呈现？请确保已经显示所有设备（如下图），针对设备级别操作。

![diskutil-show-all-device](https://sysin.org/blog/macos-createinstallmedia/diskutil-show-all-device.webp)

## 开始制作

1. 首先，准备一个8 GB或更大容量的U盘，并备份好里面的所有资料。

2. 下载好MacOS正式版的安装程序备用，先不要启动安装。

3. 打开`应用程序 → 实用工具 → 磁盘工具`，将U盘「抹掉」(格式化) 成**「Mac OS X 扩展（日志式）」**格式、GUID分区图，并「给U盘改一个名字」。
    注意：这个盘符名称必须与后面的命令完全一致，需认真检查，很多新手出错在这里！

4. 记住你刚才给U盘改的名字，建议最好是简单的纯英文且「无空格」，比如就叫做 `Mac`，否则后面容易出错 ！！

5. 打开 “应用程序→实用工具→终端”，将下面的一段命令复制并粘贴进去 （记得修改替换成你所取的U盘名称，注意名称的大小写敏感）

6. **制作命令如下：**

> 提示：以下命令都是针对正式版，早期的Beta版本App名称通常是加上beta。

**制作macOS Ventura 13启动盘：**

```shell
sudo /Applications/Install\ macOS\ Ventura.app/Contents/Resources/createinstallmedia --volume /Volumes/你的U盘名称
```

**制作macOS Monterey 12启动盘：**

```shell
sudo /Applications/Install\ macOS\ Monterey.app/Contents/Resources/createinstallmedia --volume /Volumes/你的U盘名称
```

**制作macOS Big Sur 11启动盘：**

```shell
sudo /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/createinstallmedia --volume /Volumes/你的U盘名称
```

**制作macOS Catalina 10.15启动盘：**

```shell
sudo /Applications/Install\ macOS\ Catalina.app/Contents/Resources/createinstallmedia --volume /Volumes/你的U盘名称
```

**制作macOS High Sierra 10.13启动盘：**

```shell
sudo /Applications/Install\ macOS\ High\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/你的U盘名称
```

如果您的 Mac 运行的是 macOS Sierra 或更低版本，请使用 `--applicationpath` 参数和安装器路径，具体方法与在适用于 Sierra 的命令中完成这个操作的方法类似。

**制作macOS Sierra 10.12启动盘：**

```shell
sudo /Applications/Install\ macOS\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/sysin --applicationpath /Applications/Install\ macOS\ Sierra.app --nointeraction
```

**制作OS X El Capitan 10.11启动盘：**

```shell
sudo /Applications/Install\ OS\ X\ El\ Capitan.app/Contents/Resources/createinstallmedia --volume /Volumes/sysin --applicationpath /Applications/Install\ OS\ X\ El\ Capitan.app
```

**制作OS X Yosemite 10.10启动盘：**

```shell
sudo /Applications/Install\ OS\ X\ Yosemite.app/Contents/Resources/createinstallmedia --volume /Volumes/sysin --applicationpath /Applications/Install\ OS\ X\ Yosemite.app --nointeraction
```

键入命令后：

1. 按下`Return`键以输入这个命令。
2. 出现提示时，请键入您的管理员密码，然后再次按下`Return`键。在您键入密码时，“终端” 不会显示任何字符。
3. 出现提示时，请键入`Y`以确认您要抹掉宗卷，然后按下`Return`键。在抹掉宗卷的过程中，“终端” 会显示进度。
4. 宗卷被抹掉后，您可能会看到一条提醒，提示 “终端” 要访问可移除宗卷上的文件。点按 “好” 以允许继续拷贝。
5. 当 “终端” 显示操作已完成时，相应宗卷将拥有与您下载的安装器相同的名称，例如 “安装macOS Big Sur”。您现在可以退出“终端” 并弹出宗卷。
   ![img](https://support.apple.com/library/content/dam/edam/applecare/images/en_US/macos/Big-Sur/macos-big-sur-terminal-create-bootable-installer.jpg)

如果出现 ”mount of outer dmg failed“ 错误，请在终端中执行命令修复权限（Big Sur 为例）：
`sudo chmod 755 /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/createinstallmedia`

## 错误解决方法

如果你执行上面的命令后出现`mount of outer dmg failed`的错误提示，那么需要在终端中执行一句命令来修复权限（这里以 Monterey 为例）：

```shell
sudo chmod 777 /Applications/Install\ macOS\ Monterey.app/Contents/Resources/createinstallmedia
```

## 在Windows下创建macOS引导介质

macOS是一种Unix操作系统，其实这个问题跟如何在Windows下如何创建Linux引导介质同理。

Linux写入USB引导介质，通常需要一个ISO镜像，和一个第三方的USB Boot创建工具。

这里推荐使用跨平台的开源免费软件Etcher，该操作也同样适用于Linux，在macOS下无需这种方式，虽然也是可用的。

### 条件

- USB存储介质（U盘，macOS 10.15+ 需要 16G及以上，USB SSD移动硬盘更佳）
- macOS dmg镜像，使用百度搜索（黑苹果引导镜像）获取
- [Etcher](https://github.com/balena-io/etcher)：跨平台的操作系统镜像 USB 引导创建工具

### 步骤

1. 使用 “磁盘管理” 将USB存储介质格式化为exFAT格式
2. 打开balenaEtcher，选择Flash from file，浏览到下载的macOS dmg文件
   ![etcher1](https://sysin.org/blog/macos-createinstallmedia/etcher1.webp)
   注意：会提示 Missing partition table，点击 Continue 即可。
   ![etcher2](https://sysin.org/blog/macos-createinstallmedia/etcher2.webp)
3. 选择要写入的USB存储介质
   本例中为hp x5000m已自动选择：
   ![etcher3](https://sysin.org/blog/macos-createinstallmedia/etcher3.webp)
4. 点击Flash!开始写入（需要数分钟到数十分钟不等，取决于介质本身）
   写入成功的截图：
   ![etcher4](https://sysin.org/blog/macos-createinstallmedia/etcher4.webp)

> 写入成功的USB存储介质格式为“Mac OS扩展（日志式）”，Windows等第三方系统是无法读取的，显示为RAW格式。
