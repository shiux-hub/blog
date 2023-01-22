---
title: 黑苹果合盖睡眠问题修复
reprint: false
date: 2023-01-02 03:50:57
categories:
  - MacOS
tags:
  - Hackintosh
  - Issue
cover: https://s2.loli.net/2023/01/02/Zhc8qARHC6erQdl.jpg
coverWidth:
coverHeight:
---

用过MacBook系列产品的童鞋应该都会发现，在系统合盖休眠之后，蓝牙进程还是在后台处于开启状态，这对于限制链接数的蓝牙设备就会造成名额占位。

例如，蓝牙耳机，一般的限制最多接入两个音源输入设备，MacBook上用蓝牙耳机听着音乐，同时平板也保持和耳机的连接，当你合上MacBook，再想用手机连接蓝牙耳机时，由于接入设备数量已经给平板和MacBook占满了，就会让你被迫手动关闭平板或者 Mac 对耳机的链接。

耗电与否先不讨论，在使用蓝牙耳机的体验上已经大打折扣了。如果可以改变MacBook的习性，让它合盖之后自动关闭蓝牙，就不用手动释放对蓝牙设备的占用了。So, 果断开工让MacBook成为更聪明的宝宝！

## CLI 关闭蓝牙

[blueutil](https://github.com/toy/blueutil)是macOS平台的控制蓝牙的命令行工具，可以检查蓝牙状态，以及开启/关闭等操作。通过Homebrew安装十分方便：

```bash
brew install blueutil
```

关闭蓝牙：

```bash
blueutil -p 0
```

开启蓝牙：

```bash
blueutil -p 1
```

短短的命令就可以轻松 开/关 蓝牙，这时候只需要把上述 CLI 加入 合盖/开盖 监视器即可。

## 监测休眠及唤醒

[SleepWatcher](https://formulae.brew.sh/formula/sleepwatcher)可以监测Mac的休眠唤醒以及空闲状态，并执行用户自指定的命令。通过Homebrew获得：

```bash
brew install sleepwatcher
```

系统自启动 **SleepWatcher** 后台进程，过程需要 Administrator 密码开启权限：

```bash
brew services start sleepwatcher ==> Successfully started **SleepWatcher** (label: homebrew.mxcl.sleepwatcher) 
```

执行完毕可以检查后台进程是否添加成功：

```shell
$ brew services list
Name              Status  User  Plist sleepwatcher      started Cotes /Users/cotes/Library/LaunchAgents/homebrew.mxcl.sleepwatcher.plist $ ps aux | grep sleepwatcher Cotes             3067   0.0  0.0  4317336   4552   ??  S     7:39PM   0:01.79 /usr/local/sbin/sleepwatcher -V -s ~/.sleep -w ~/.wakeup 
```

从输出看到**SleepWatcher**已经成功进驻后台进程列表。`-s`的参数指定监测的休眠指令存放于`~/.sleep`，`-w`指定监测的唤醒指令存放于`~/.wakeup`，接下来把蓝牙开关的命令加入这两个文件即可。

指定合盖（休眠）执行蓝牙关闭：

```bash
echo "$(which blueutil) -p 0" >> ~/.sleep 
```

> **注**：`which`是为了指定CLI的绝对路径。

接着，添加开盖（唤醒）自动开启蓝牙，并且自动连上蓝牙设备：

```bash
echo "$(which blueutil) -p 1 && $(which blueutil) --connect [ID]" >> ~/.wakeup 
```

把上述`ID`更换为目标蓝牙设备的MAC地址。在蓝牙外设与MacOS保持连接的状态下，可通过以下命令查询：

```shell
$ blueutil --paired
address: 4e-21-f2-b1-a5-67, not connected, not favourite, paired, name: "Headphone", recent access date: 2020-03-23 21:25:48 +0000 
```

输出日志的`address`部分就是设备的 MAC 地址。

最后，为命令文件添加执行权：

```bash
chmod +x ~/.sleep ~/.wakeup 
```

OK，一切完毕，自动开闭蓝牙真心爽。不吹不黑，**SleepWatcher**是个好东西，日后必另作他用。
