---
title: SSH的使用指南
reprint: false
tags:
  - CentOS
  - SSH
  - Ubuntu
  - 技巧
  - 终端
categories:
  - Guide
date: 2020-03-01 12:19:23
cover:
coverWidth:
coverHeight:
---
## 问题描述

做DL的经常需要在一台电脑(**本地主机**)上写代码，另一台电脑(**服务器**，计算力强)上进行训练，我们在两台电脑上都安装的是Ubuntu，为了在local主机下也可以随时跑程序，调代码，同时省流量而且迅速(不考虑这些的话用teamviewer也行)，所以在两台电脑主机上进行SSH配置。

## 基础:ssh命令连接

### SSH程序的安装

确保在服务器上安装好了**openssh-server**程序，在本地主机上安装好了**openssh-client**程序。

```bash
sudo apt install openssh-client #本地主机运行此条，实际上通常是默认安装client端程序的
sudo apt install openssh-server #服务器运行此条命令安装
```

### 服务器启动ssh服务

**以下命令都只针对服务器端(server only)。**

一般服务器上安装ssh完成后，会自动启动ssh服务，并且默认随系统启动，如果没有，请手动启动：

```bash
sudo /etc/init.d/ssh start #服务器启动ssh-server服务，
```

其他命令：

```bash
sudo /etc/init.d/ssh stop    #server停止ssh服务
sudo /etc/init.d/ssh restart #server重启ssh服务
```

### 查询服务器的ip地址

在服务器终端运行以下命令：

```bash
ifconfig #查询ip地址，在返回信息中找到自己的ip地址
```

![](https://i.loli.net/2020/03/01/jVMUrk3xSJ5OEYI.jpg)

从我的返回信息中看到，我的ip地址(inet地址)是：**10.170.11.147**。

如果没有看到IP地址，说明你没有安装指定工具：

```bash
sudo apt install net-tools  #Ubuntu
sudo yum install net-tools      #CentOS
```

输入以上命令即可。

### 在本地主机端ssh远程登录服务器

**这一步需要知道服务器的用户名(我的服务器名字也是shiux)及IP地址。**

在本地主机上运行以下命令：  
用户端连接服务器用于登录远程桌面(以下user时远程主机的用户名)

```bash
ssh shiux@10.170.11.147
#或
ssh -l shiux 10.170.11.147
# 如果需要调用图形界面程序
ssh -X shiux@10.170.11.147
```

**初次登录**时会出现以下信息，请记住要**输入的密码是服务器主机本身的登陆密码**：

![](https://i.loli.net/2020/03/01/QaO2VL5AhkJSE8b.jpg)

以上表示连接成功，且命令提示副前的**用户名@主机名**由本地主机变成服务器的信息，即表明**现在该终端所有的命令都是在服务器中执行**。

#### 本地主机端登录相关的其他命令

如果服务器的SSH服务没有开启在22端口,那么SSH链接时则需要用`-p`指定端口（如202）:

```bash
ssh -p 202 shiux@10.170.11.147
#或
ssh -l shiux -p 202 10.170.11.147
```

### 退出远程登录

用`Ctrl+D`或者

```bash
exit
```

## 进阶:利用公钥省去口令输入

每次登录远程主机都需要输入密码是很不便捷的，如果要加速这一步骤，可以利用密钥对进行连接，主要思路是：生成一对公钥私钥，私钥在local主机上，公钥在远程服务器上，每次建立ssh连接自动检查密钥对是否匹配。

### 生成密钥对

```bash
ssh-keygen -t rsa #-t表示选择类型,类型为rsa
```

执行以后会在$HOME目录下生成一个.ssh文件夹,其中包含私钥文件`id_rsa`和公钥文件`id_rsa.pub`。

### 复制公钥至服务器

```bash
# 登录远程服务器
ssh shiux@10.170.11.147 

# 在服务器上创建.ssh文件夹,如果已经存在就跳过此步
mkdir .ssh 

# 为了保证.ssh文件夹的安全，应取消其他用户对文件夹的所有权限
chmod 700 .ssh

# 退出登录
exit

# 本地主机的公钥复制到远程服务器,作为已认证密钥
scp /home/shiux/.ssh/id_rsa.pub shiux@10.170.44.206:/home/shiux/.ssh/authorized_keys
```

在进行以上配置以后，再进行连接时,就可以免去口令(密码)的输入了。
