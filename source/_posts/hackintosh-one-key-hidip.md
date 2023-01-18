---
title: hackintosh-one-key-hidip
reprint: false
date: 2023-01-19 00:48:58
categories:
  - MacOS
tags:
  - Hackintosh
  - Issue
cover: 
coverWidth:
coverHeight:
---

搞了一台飞利浦的2K显示屏，本来以为只要外接显示屏的分辨率够了就可以获得Retina的细腻效果。但事与愿违，后来查询后发现苹果的Retina效果是外接显示器不可能达到那样的细腻，但外接显示器只要分辨率够，可以通过软件渲染得来Retina效果，这就是HiDPI技术。

> **HiDPI本质上是用软件的方式实现单位面积内的高密度像素。**用四个像素点来表现一个像素，因此能够更加清晰细腻。
>
> **高PPI(硬件) + HiDPI渲染(软件) = 更细腻的显示效果(retina)**

![Retina原理](https://blog.haitianhome.com/wp-content/uploads/2020/07/unnamed-file.jpg)

但是悲剧的是，苹果觉得2K显示器没法做到真HiDPI（4K刚好渲染出真1080P的retina效果），所以只有在4K屏幕上才能直接开启HiDPI。

所以这里先划下重点，**如果想要完美效果，那直接上4K屏！**

但是已经买了2K屏，总不能退掉，而且4K屏的价格也是2K屏的2倍以上。所以2K屏也可以通过软件强行告诉系统，这个屏幕可以开HiDPI，你就直接开吧！

下面就记录[海天](https://blog.haitianhome.com/)再给2K屏开启HiDPI碰到的问题，有手动和脚本自动两种方法，但是不知道怎么回事，海天手动的方法就是没开启成功，最后使用脚本却成功开启了。

### 开启HiDPI的对比

下面两张是用iphone手机手持在一个相对差不多的位置拍摄的，可以看出，开启后字体的显示还是清晰很多。

![img](https://blog.haitianhome.com/wp-content/uploads/2020/07/IMG_0074_%E5%89%AF%E6%9C%AC1200px-768x1024.jpg)

![img](https://blog.haitianhome.com/wp-content/uploads/2020/07/IMG_0314_%E5%89%AF%E6%9C%AC1200px-768x1024.jpg)

### 手动开启HiDPI

#### 获取外接显示器 DisplayVendorID和DisplayProductID

在终端工具输入：

```shell
ioreg -l | grep "DisplayVendorID"
# 和
ioreg -l | grep "DisplayProductID"
```

就可以获得显示器的DisplayVendorID和DisplayProductID，如果获得两个，那说明的你的macbook还在亮着，可以合盖来排除掉，获得外接显示器的DisplayVendorID和DisplayProductID。

#### **制作外接显示屏系统配置文件**

**转换为16进制**

将DisplayVendorID和DisplayProductID的数值，转换为16进制，网上有很多工具，这里就不提供了。

**创建显示器配置文件夹**

然后新建文件夹，命名为：DisplayVendorID-XXXX，其中XXXX是刚才转换的DisplayVendorID的16进制值小写。

**创建显示器配置内容**

这一步需要借助工具来生成，[点击这里进行生成](https://blog.haitianhome.com/go.php?aHR0cHM6Ly9jb21zeXN0by5naXRodWIuaW8vRGlzcGxheS1PdmVycmlkZS1Qcm9wZXJ0eUxpc3QtRmlsZS1QYXJzZXItYW5kLUdlbmVyYXRvci13aXRoLUhpRFBJLVN1cHBvcnQtRm9yLVNjYWxlZC1SZXNvbHV0aW9ucy8=)，将显示器的名称、DisplayVendorID和DisplayProductID对应填写进去，即可获得配置文件，然后下载文件到，刚创建的DisplayVendorID-XXXX文件夹内。（记得将plist的后缀去掉）

![img](https://blog.haitianhome.com/wp-content/uploads/2020/07/unnamed-file.png)

到这一步，显示器的配置文件已经手动创建好了，需要将文件放到系统的 /System/Library/Displays/Contents/Resources/Overrides/ 文件夹内。（这里需要打开SIP，方法可参考文末）

然后使用软件RDM即可开启HiDPI。

### 脚本开启HiDPI

找到两个脚本，大家都可以试一下，我是使用国人制作的one-key-hidpi开启成功的。

[Enable-HiDPI-OSX](https://blog.haitianhome.com/go.php?aHR0cHM6Ly9naXRodWIuY29tL3N5c2NsL0VuYWJsZS1IaURQSS1PU1g=)

[one-key-hidpi](https://blog.haitianhome.com/go.php?aHR0cHM6Ly9naXRodWIuY29tL3h6aGloL29uZS1rZXktaGlkcGkvYmxvYi9tYXN0ZXIvUkVBRE1FLXpoLm1k)

看介绍one-key-hidpi的作者还是参考的Enable-HiDPI-OSX，但是我使用Enable-HiDPI-OSX却没有成功。

脚本一键开启很方便，将脚本下载下来，运行脚本，按照提示操作即可。

**下载脚本并运行**

```shell
# 下载脚本：
curl -o ~/onekeyhidpi.sh https://raw.githubusercontent.com/xzhih/one-key-hidpi/master/hidpi.sh

# 运行脚本：
chmod +x ~/onekeyhidpi.sh

~/onekeyhidpi.sh
```

**按照脚本提示输入对应数字即可**

![脚本一键开启HiDPI](https://blog.haitianhome.com/wp-content/uploads/2020/07/unnamed-file-1.png)

### 开启SIP

苹果操作系统对于系统的保护是很严格的，不管是上面的手动操作，还是脚本，都必须打开SIP也就是系统防火墙。

**查看SIP状态**

在终端中输入`csrutil status`，就可以看到是`enabled`还是`disabled`。

**关闭SIP**

1. 重启MAC，按住`cmd+R`直到屏幕上出现苹果的标志和进度条，进入`Recovery`模式
2. 在屏幕左上方的工具栏找到实用工具（左数第3个），打开终端，输入：`csrutil disable`
3. 重启mac

**打开SIP**

1. 重启MAC，按住`cmd+R`直到屏幕上出现苹果的标志和进度条，进入`Recovery`模式
2. 在屏幕左上方的工具栏找到实用工具（左数第3个），打开终端，输入：`csrutil enable`
3. 重启mac

### 使用 RDM 设置分辨率

RDM全称为Retina Display Manage，下载安装即可：[http://avi.alkalay.net/software/RDM/](https://blog.haitianhome.com/go.php?aHR0cDovL2F2aS5hbGthbGF5Lm5ldC9zb2Z0d2FyZS9SRE0v)

重启后打开RDM，选取带雷电符号的1920x1080，即可开启HiDPI。

![RDM开启](https://blog.haitianhome.com/wp-content/uploads/2020/07/unnamed-file-2.png)

## 注意

最后在提醒一下，最好用一个好的扩展坞连接，我一开始用一个山泽的扩展坞，怎么也点不了1920×1080的HiDPI的设置，但是换了个绿联的就可以了。

神奇的是，HiDPI开启成功后，我换回山泽的，却还是可以正常使用。
