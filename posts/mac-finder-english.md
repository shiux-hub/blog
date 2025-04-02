---
title: Mac系统的访达Finder侧边栏目录的英文转中文
reprint: false
tags:
  - 技巧
  - 终端
categories:
  - macOS
date: 2020-02-28 13:21:47
cover:
coverWidth:
coverHeight:
---

想把Mac电脑的访达Finder中的英文目录转成中文，可以参考以下办法：

打开Mac电脑终端，按需自取命令即可。比如，我的只有【影片】-【Movies】，我只需选择命令6即可。

> 以下操作如果没生效，需要重启Finder。
> 重启步骤为`🍎->强制关闭->访达`

- 桌面

```bash
touch ~/Desktop/.localized
```

- 文稿

```bash
touch ~/Documents/.localized
```

- 下载

```bash
touch ~/Downloads/.localized
```

- 图片：

```bash
touch ~/Pictures/.localized
```

- 音乐：

```bash
touch ~/Music/.localized
```

- 影片：

```bash
touch ~/Movies/.localized
```

以上就是给大家分享的Mac电脑Finder英文目录转中文的图文教程，是不是简单又实用！希望对大家有所帮助！
