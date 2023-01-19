---
title: OCC命令给ownCloud/NextCloud手动添加文件
reprint: false
categories:
  - Guide
tags:
  - NextCloud
  - PHP
  - 技巧
date: 2020-02-22 01:53:02
cover: /images/e0379928eab0fdb115fa7f6f880998af.png
coverWidth:
coverHeight:
---

有时候，直接通过Web页面上传文件并不那么方便，于是有的朋友就直接把文件上传到服务器里，然后拷贝到data目录下，打开`ownCloud`，却还是之前的文件。

这是因为虽然上传了文件，但是`ownCloud/NextCloud`的数据库里并没有这个文件的信息。文件信息都被存储在数据库的`oc_filecache`表

![](https://i.loli.net/2020/02/22/6zRqSpc3yDWGrJk.png)

## 使用OCC命令更新文件索引

occ有三个用于管理NextCloud中文件的命令：

```bash
files
  files:cleanup #清楚文件缓存
  files:scan #重新扫描文件系统
  files:transfer-ownership #将所有文件和文件夹都移动到另一个文件夹
```

我们需要使用`files:scan`来扫描新文件。

```bash
格式:
  files:scan [-p|--path="..."] [-q|--quiet] [-v|vv|vvv --verbose] [--all]
  [user_id1] ... [user_idN]

参数:
  user_id          # 扫描所指定的用户（一个或多个，多个用户ID之间要使用空格分开）的所有文件

选项:
  --path           # 限制扫描路径
  --all            # 扫描所有已知用户的所有文件
  --quiet          # 不输出统计信息
  --verbose        # 在扫描过程中显示正在处理的文件和目录
  --unscanned      # 仅扫描以前未扫描过的文件
```

### 示例

```bash
sudo -u www-data php occ files:scan --all #扫描所有用户的所有文件
sudo -u www php /www/wwwroot/{site_path}/occ files:scan --all #宝塔面板
```

执行命令后未进行扫描并列出扫描信息。

![](https://i.loli.net/2020/02/22/gD6mb7UzQVHBCyi.png)

如果不想显示扫描信息，可以在后面加上`--quiet`

```bash
sudo -u www-data php occ files:scan --all --quiet
sudo -u www php /www/wwwroot/{site_path}/occ files:scan --all --quiet #宝塔面板
```

## 指定扫描位置

总是扫描全部信息并不是那么有必要，还会白白消耗服务器资源。

### 指定扫描的用户

列出所有用户：

```bash
sudo -u www-data php occ user:list
sudo -u www php /www/wwwroot/{site_path}/occ user:list #宝塔面板
```

![](https://i.loli.net/2020/02/22/ebnfvP7HIxsZQCD.png)

为指定用户扫描文件：

```bash
sudo -u www-data php occ files:scan {user_name}
sudo -u www php /www/wwwroot/{site_path}/occ files:scan {user_name} #宝塔面板
```

### 指定扫描目录

当使用`--path` 选项时，该路径必须包含以下部分：

```bash
"user_id/files/path"
#或
"user_id/files/mount_name"
#或
"user_id/files/mount_name/path"
```

> `/files/`是必须要加上的，不可忽略。

#### 示例

```bash
sudo -u www-data php occ files:scan --path="/{user_name}/files/Photos" #指向指定用户的Photos文件夹
sudo -u www php /www/wwwroot/站点文件夹/occ files:scan --path="/{user_name}/files/Photos" #宝塔面板
```
