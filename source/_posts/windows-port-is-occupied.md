---
title: 解决Windows电脑端口被占用问题
reprint: false
date: 2023-11-30 03:16:48
categories:
  - Windows
tags:
  - 笔记
cover:
coverWidth:
coverHeight:
---

## 常规方案

1. 找出端口被哪个线程占用

   ```shell
    netstat -aon | findstr "4000" # 这里的4000即要查询的端口号
   ```

   ![端口](https://s2.loli.net/2023/11/30/6JbMCPULHSwkeam.jpg)

2. 查询这个进程的信息

   ```shell
   tasklist | findstr "17060" # 这里的12884即线程号，上面找到的线程号
   ```

   ![查询进程](https://s2.loli.net/2023/11/30/BAvuWlaKDjL6XIS.jpg)

3. 关闭占用端口号的进程

   根据进程号杀死进程

   ```shell
   taskkill /T /F /PID 17060
   ```

   根据进程名称杀死进程

   ```shell
   taskkill /f /t /im "com.docker.backend.exe"
   ```

## 非常规方案（适用于通过方案一找不到哪个程序占用了端口号）

有些时候，我们使用`netstat`命令找不到对应端口占用的程序，比如我MySQL服务今天就是因为`12800`被占用了然后起不来了。

```shell
netstat -aon | findstr "3306"
```

啥线程都没找到。

这是因为这些端口被用作了Windows自己的保留端口,每次开机，Windows就会随机保留一些端口，原因如下：

- 开启了Hyper-V特性（安装`Docker`，或者Linux虚拟机 ）
- 因为发现病毒活动而被微软屏蔽
- 安装过Windows Update以后，保留的端口发生变化
- …

由于这些端口被保留，所以即使没有任何程序在使用，用户自己创建的程序也无法使用这些端口，想解决这个问题，有2种：

1. 临时解决方案（靠运气）

   重启电脑，直到需要的端口不在保留端口中。

2. 彻底的解决方案

   网上有很多方案说让禁用Hyper-V，禁用和启用的命令如下：

   ```shell
   # 禁用
   dism.exe /Online /Disable-Feature:Microsoft-Hyper-V /All
   # 启用
   dism.exe /Online /Enable-Feature:Microsoft-Hyper-V /All
   ```

   如果你确实用不到的话，禁用Hyper-V。如果用的到，那就可以用下面的方案：

   **查看保留的端口范围**

   Windows中有一个「TCP 动态端口范围」，处在这个范围内的端口，有时候会被一些服务占用。

   ```shell
   netsh int ipv4 show dynamic tcp
   ```

   ![查看保留的端口范围](https://s2.loli.net/2023/11/30/nKVxeBiwQtsOCJp.jpg)

   这只是一个「待选择」范围，并不代表其中的所有端口都会被保留，只是有一部分会被Hyper-V征用。使用

   ```shell
   netsh int ipv4 show excluded tcp
   ```

   命令可以查看当前所有已经被征用了的端口，如图 所示。这里`*`标注的代表这些范围内的端口**不会**被作为保留端口使用。

   ![查看当前所有已经被征用了的端口](https://s2.loli.net/2023/11/30/zVRDqAYItbnjfSd.jpg)

   **将需要用到的端口排除掉**

   ```shell
   # 这里8081为开始的端口，10的意思为8081-8090这些端口全都要移出保留端口，如果只想8081不作为端口，那么10可以改成1
   netsh int ipv4 add excluded tcp start=8081 num=10
   ```

   或者重新设置一下「TCP 动态端口范围」，让Windows只在我们设定的范围内保留端口即可。可以以管理员权限运行下面的命令，将「TCP 动态端口范围」重新设定为`49152-65535`。如果你觉得这个范围太大，还可以改小一点。

   ```shell
   netsh int ipv4 set dynamic tcp start=49152 num=16384
   netsh int ipv6 set dynamic tcp start=49152 num=16384
   ```

   重启电脑后，再运行命令`netsh int ipv4 show dynamic tcp`查看动态端口范围，发现确实已经修改为了`49152-65535`。现在只有这个范围内的端口可能会被保留了，基本不会影响日常使用。

   ![查看保留的端口范围](https://s2.loli.net/2023/11/30/nKVxeBiwQtsOCJp.jpg)
