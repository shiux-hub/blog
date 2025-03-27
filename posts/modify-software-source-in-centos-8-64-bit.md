---
title: CentOS8 64位如何修改软件源
reprint: false
tags:
  - CentOS
  - 技巧
  - 笔记
  - 软件源
categories:
  - Linux
date: 2020-02-18 20:05:57
cover:
coverWidth:
coverHeight:
---

## 备份，以免出错后可以恢复

```bash
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```

## 下载新的源文件

### 阿里云

- wget

```bash
# CentOS 5
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-5.repo
# CentOS 6
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-6.repo
# CentOS 7
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
# CentOS 8
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-8.repo
```

- curl

```bash
# CentOS 5
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-5.repo
# CentOS 6
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-6.repo
# CentOS 7
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
# CentOS 8
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-8.repo
```

### USTC

```bash
# CentOS7
sudo sed -e 's|^mirrorlist=|#mirrorlist=|g' \
         -e 's|^#baseurl=http://mirror.centos.org/centos|baseurl=https://mirrors.ustc.edu.cn/centos|g' \
         -i.bak \
         /etc/yum.repos.d/CentOS-Base.repo
# CentOS8
sudo sed -e 's|^mirrorlist=|#mirrorlist=|g' \
         -e 's|^#baseurl=http://mirror.centos.org/$contentdir|baseurl=https://mirrors.ustc.edu.cn/centos|g' \
         -i.bak \
         /etc/yum.repos.d/CentOS-Linux-AppStream.repo \
         /etc/yum.repos.d/CentOS-Linux-BaseOS.repo \
         /etc/yum.repos.d/CentOS-Linux-Extras.repo \
         /etc/yum.repos.d/CentOS-Linux-PowerTools.repo \
         /etc/yum.repos.d/CentOS-Linux-Plus.repo
```

## 运行以下命令生成缓存

```bash
yum clean all
yum makecache
```
