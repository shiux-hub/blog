---
title: OhMyZSH使用指北
reprint: false
date: 2021-11-07 20:56:31
categories:
  - macOS
tags:
  - 终端
  - 笔记
cover:
coverWidth:
coverHeight:
---

OhMyZsh是一个令人愉快、开源、社区驱动的框架，用于管理你的Zsh配置。它捆绑了数千个有用的功能，助手，插件，主题，和一些让你惊艳的东西…

**官网** - <https://ohmyz.sh/>

## 安装

```bash
# curl安装
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# wget安装
sh -c "$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
```

**官网教程** - <https://ohmyz.sh/#install>

## 插件推荐

### git

默认开启

可以使用各种`git`命令缩写。😋

#### 比如

```bash
git add --all ===> gaa

git commit -m ===> gcmsg
```

**官方文档** - <https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git>

或者筛选对应的命令

如和`config`有关的命令

```bash
alias | grep config
```

### z

#### 作用

目录间快速跳转,不用再一直`cd`了 😁

#### 使用

`cd`命令进入`~/user/github/Youthink`文件夹，下次还想进入文件夹的时候，直接使用`z youthink`即可，或者只输入`youthink`的一部分`youth`都行。

```bash
# 删除无效路径
z -x <dir>
# 打开music文件夹
z music
# 使用多个参数打开 /home/user/work/inbox
z w in
```

#### 效果图

![](/images/f043c56c18656d68d4a89862bf47c65b.png)

### zsh-syntax-highlighting

- 作用

平常用的`ls`、`cd` 等命令输入正确会绿色高亮显示，输入错误会显示其他的颜色。

![](/images/878b7471bbcef580c46d52156502de15.png)

**官网** - <https://github.com/zsh-users/zsh-syntax-highlighting>

- 安装

1. 克隆项目

   ```bash
   git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
   ```

   **在 `~/.zshrc` 中配置**

   ```bash
   plugins=( [plugins...] zsh-syntax-highlighting)
   ```

2. 使配置生效

   ```bash
   source ~/.zshrc
   ```

### zsh-autosuggestions

**官网** - <https://github.com/zsh-users/zsh-autosuggestions>

- 作用

效率神器 👍

如图输入命令时，会给出建议的命令（灰色部分）按键盘 → 补全

![](/images/878b7471bbcef580c46d52156502de15.png)

如果感觉 → 补全不方便，还可以自定义补全的快捷键，比如我设置的逗号补全

```bash
bindkey ',' autosuggest-accept
```

在 `.zshrc` 文件添加这句话即可。

- 安装

1. 克隆项目

   ```bash
   git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
   ```

   **在 `~/.zshrc` 中配置**

   ```bash
   plugins=( [plugins...] zsh-autosuggestions)
   ```

2. 使配置生效

   ```bash
   source ~/.zshrc
   ```
