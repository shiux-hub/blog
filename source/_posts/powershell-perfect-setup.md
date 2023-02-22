---
title: Powershell完美配置
reprint: false
date: 2023-02-22 16:32:30
categories:
  - Windows
tags:
  - 技巧
  - Powershell
  - 终端
  - 笔记
cover:
coverWidth:
coverHeight:
---

坑边闲话：忆往昔岁月，不堪回首，伟大的Windows竟然拿不出一个像样的终端模拟器。`mintty.exe`和封装后的`cmder`之流，总是有各种问题，而且不兼容emoji字符。后来，全网Windows用户随着一个华丽的广告沸腾了，微软宣布了终端软件Windows Terminal的开发进程，而且开源！如今，Windows Terminal正式版已经陪伴我们走过了很长一段时间，其稳定性和易用性已经非常不错，关键是颜值相当高。如果你是一个追求完美与和谐的User，那么请跟上我的步伐，我们重新起航！

**重要提醒：**本文的所有配置经过无数网友的多重考验，**请勿在配置过程中突发奇想**而走弯路，一定要认真阅读每一个段落、每一个句子！

![效果图](https://s1.ax1x.com/2023/02/22/pSv13b8.png)

## 安装 Windows Terminal

相信这一步对大多数人不构成任何困难，去 Microsoft Store 搜索下载就是了。

该项难度系数：:star:

## 安装字体

这里仅推荐一款字体：Fira Code Nerd Font。该字体支持 ligature 连字功能，而且是一款专门为代码显示准备的字体，该字体也支持很多有趣的特殊字符，非常适合在终端里使用。该字体开源，广受海内外程序员好评！

单击此处从 GitHub 下载。

装上该字体，即可进入下一步。

该项难度系数：:star::star:
（或许有人登 Github 有网络问题，请自行解决。）

## 安装新款Powershell Core

首先声明，我们这儿用的Powershell与Windows自带的Powershell是完全不同的两个东西，除了功能相似和名字相同，两者内在已经天差地别。

现阶段Windows 11自带的Powershell错误提示冗长，颜值低，速度慢，总之就是不太值得去用了。

那么Powershell Core是什么呢？这是伟大的.Net Core跨平台战略的一个重要组成部分，微软设想，要让强大的.Net在所有平台上通用，让这么强大的Powershell在所有平台上都能用，古老的bash可以退休了！

基于以上愿景，微软开始了漫长而辉煌的征程。

~~在<https://github.com/PowerShell/PowerShell/releases>这个GitHub链接里，有目前Powershell的最新版，我建议你从`release`里选个最新的版本。~~

~~直接单击此处下载`x86-64 Windows 64`位`.msi`安装包。~~

2022年下半年开始，可以到微软商店下载了。

直接在商店中搜索`Powershell`

![商店中下载Powershell](https://s1.ax1x.com/2023/02/22/pSvU1A0.png)

该项难度系数：:star:

## 安装PowerShell插件

这一步是灵魂。

直接上代码：打开刚装好的新版PowerShell，执行以下命令。

```bash
# 安装 oh-my-posh 包，让你的命令行更酷炫、优雅
winget install JanDeDobbeleer.OhMyPosh -s winget
```

安装过程可能有点慢，好像卡住了一样，但是请耐心等待几分钟。等不及的同学自行搜索科学方法访问GitHub.

**oh my posh官网** - <https://ohmyposh.dev/>

该项难度系数：:star:

## 配置 Windows Terminal

这一项也是灵魂。

只有新款Powershell而没有Windows Terminal，好比吃肉不放盐。

简单点，直接上配置代码，遇到不懂的地方，自己读注释。记得将此设置默认配置（代码已经给出）。

```json
// 默认的配置就是我们的新 powershell（重要！！！）
"defaultProfile": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",

{
    // 键标记
    "guid": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",
    "name": "PowerShell",
    "source": "Windows.Terminal.PowershellCore",
    // 行为
    "closeOnExit": true,
    "commandline": "pwsh -nol",
    "hidden": false,
    // 外观
    "fontFace": "MesloLGM NF",
    "fontSize": 14,
    "padding": "5, 5, 20, 25",
    // 颜色主题
    "colorScheme": "MyStyle"
},
```

同时附上Homebrew配色，该配色经过我改良。

```json
{
  "background": "#282C34",
  "black": "#282C34",
  "blue": "#409EFF",
  "brightBlack": "#EC7259",
  "brightBlue": "#729FCF",
  "brightCyan": "#56B6C2",
  "brightGreen": "#98C379",
  "brightPurple": "#C678DD",
  "brightRed": "#CB0000",
  "brightWhite": "#DCDFE4",
  "brightYellow": "#E5C07B",
  "cursorColor": "#FFFFFF",
  "cyan": "#56B6C2",
  "foreground": "#FFFFFF",
  "green": "#4E9A06",
  "name": "MyStyle",
  "purple": "#C678DD",
  "red": "#E06C75",
  "selectionBackground": "#FFFFFF",
  "white": "#DCDFE4",
  "yellow": "#E5C07B"
},
```

特别注意，用其他配色可能**降低颜值**。

完整配置

```json
{
    "$help": "https://aka.ms/terminal-documentation",
    "$schema": "https://aka.ms/terminal-profiles-schema",
    "actions": 
    [
        {
            "command": 
            {
                "action": "copy",
                "singleLine": false
            },
            "keys": "ctrl+c"
        },
        {
            "command": "paste",
            "keys": "ctrl+v"
        },
        {
            "command": "find",
            "keys": "ctrl+shift+f"
        },
        {
            "command": 
            {
                "action": "splitPane",
                "split": "auto",
                "splitMode": "duplicate"
            },
            "keys": "alt+shift+d"
        }
    ],
    "copyFormatting": "none",
    "copyOnSelect": false,
    "defaultProfile": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",
    "launchMode": "maximized",
    "profiles": 
    {
        "defaults": {
            "font":
            {
                "face": "MesloLGM NF",
                "size": 14,
                "padding": "5, 5, 20, 25"
            },
            "colorScheme": "MyStyle"
        },
        "list": 
        [
            {
                "commandline": "%SystemRoot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
                "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
                "hidden": true,
                "name": "Windows PowerShell"
            },
            {
                "guid": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",
                "hidden": false,
                "name": "PowerShell",
                "commandline": "pwsh -nol",
                "source": "Windows.Terminal.PowershellCore"
            },
            {
                "commandline": "%SystemRoot%\\System32\\cmd.exe",
                "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
                "hidden": false,
                "name": "\u547d\u4ee4\u63d0\u793a\u7b26"
            },
            {
                "guid": "{b453ae62-4e3d-5e58-b989-0a998ec441b8}",
                "hidden": true,
                "name": "Azure Cloud Shell",
                "source": "Windows.Terminal.Azure"
            },
            {
                "guid": "{0cf0707b-7ef7-5a76-9608-ee3d44b4be46}",
                "hidden": false,
                "name": "Developer Command Prompt for VS 2022",
                "source": "Windows.Terminal.VisualStudio"
            },
            {
                "guid": "{99575e71-49f6-5357-bc8b-ed308f81a80c}",
                "hidden": false,
                "name": "Developer PowerShell for VS 2022",
                "source": "Windows.Terminal.VisualStudio"
            },
            {
                "guid": "{16208362-94fc-5b1f-a491-5b2624d5ab56}",
                "hidden": true,
                "name": "Visual Studio Debug Console",
                "source": "VSDebugConsole"
            }
        ]
    },
    "schemes": 
    [
        {
            "background": "#283033",
            "black": "#000000",
            "blue": "#6666E9",
            "brightBlack": "#666666",
            "brightBlue": "#0000FF",
            "brightCyan": "#00E5E5",
            "brightGreen": "#00D900",
            "brightPurple": "#E500E5",
            "brightRed": "#E50000",
            "brightWhite": "#E5E5E5",
            "brightYellow": "#E5E500",
            "cursorColor": "#FFFFFF",
            "cyan": "#00A6B2",
            "foreground": "#00FF00",
            "green": "#00A600",
            "name": "Homebrew",
            "purple": "#B200B2",
            "red": "#FC5275",
            "selectionBackground": "#FFFFFF",
            "white": "#BFBFBF",
            "yellow": "#999900"
        },
        {
            "background": "#282C34",
            "black": "#282C34",
            "blue": "#409EFF",
            "brightBlack": "#EC7259",
            "brightBlue": "#729FCF",
            "brightCyan": "#56B6C2",
            "brightGreen": "#98C379",
            "brightPurple": "#C678DD",
            "brightRed": "#CB0000",
            "brightWhite": "#DCDFE4",
            "brightYellow": "#E5C07B",
            "cursorColor": "#FFFFFF",
            "cyan": "#56B6C2",
            "foreground": "#FFFFFF",
            "green": "#4E9A06",
            "name": "MyStyle",
            "purple": "#C678DD",
            "red": "#E06C75",
            "selectionBackground": "#FFFFFF",
            "white": "#DCDFE4",
            "yellow": "#E5C07B"
        },
        {
            "background": "#0C0C0C",
            "black": "#0C0C0C",
            "blue": "#0037DA",
            "brightBlack": "#767676",
            "brightBlue": "#3B78FF",
            "brightCyan": "#61D6D6",
            "brightGreen": "#16C60C",
            "brightPurple": "#B4009E",
            "brightRed": "#E74856",
            "brightWhite": "#F2F2F2",
            "brightYellow": "#F9F1A5",
            "cursorColor": "#FFFFFF",
            "cyan": "#3A96DD",
            "foreground": "#CCCCCC",
            "green": "#13A10E",
            "name": "Campbell",
            "purple": "#881798",
            "red": "#C50F1F",
            "selectionBackground": "#FFFFFF",
            "white": "#CCCCCC",
            "yellow": "#C19C00"
        },
        {
            "background": "#012456",
            "black": "#0C0C0C",
            "blue": "#0037DA",
            "brightBlack": "#767676",
            "brightBlue": "#3B78FF",
            "brightCyan": "#61D6D6",
            "brightGreen": "#16C60C",
            "brightPurple": "#B4009E",
            "brightRed": "#E74856",
            "brightWhite": "#F2F2F2",
            "brightYellow": "#F9F1A5",
            "cursorColor": "#FFFFFF",
            "cyan": "#3A96DD",
            "foreground": "#CCCCCC",
            "green": "#13A10E",
            "name": "Campbell Powershell",
            "purple": "#881798",
            "red": "#C50F1F",
            "selectionBackground": "#FFFFFF",
            "white": "#CCCCCC",
            "yellow": "#C19C00"
        },
        {
            "background": "#282C34",
            "black": "#282C34",
            "blue": "#61AFEF",
            "brightBlack": "#5A6374",
            "brightBlue": "#61AFEF",
            "brightCyan": "#56B6C2",
            "brightGreen": "#98C379",
            "brightPurple": "#C678DD",
            "brightRed": "#E06C75",
            "brightWhite": "#DCDFE4",
            "brightYellow": "#E5C07B",
            "cursorColor": "#FFFFFF",
            "cyan": "#56B6C2",
            "foreground": "#DCDFE4",
            "green": "#98C379",
            "name": "One Half Dark",
            "purple": "#C678DD",
            "red": "#E06C75",
            "selectionBackground": "#FFFFFF",
            "white": "#DCDFE4",
            "yellow": "#E5C07B"
        },
        {
            "background": "#FAFAFA",
            "black": "#383A42",
            "blue": "#0184BC",
            "brightBlack": "#4F525D",
            "brightBlue": "#61AFEF",
            "brightCyan": "#56B5C1",
            "brightGreen": "#98C379",
            "brightPurple": "#C577DD",
            "brightRed": "#DF6C75",
            "brightWhite": "#FFFFFF",
            "brightYellow": "#E4C07A",
            "cursorColor": "#4F525D",
            "cyan": "#0997B3",
            "foreground": "#383A42",
            "green": "#50A14F",
            "name": "One Half Light",
            "purple": "#A626A4",
            "red": "#E45649",
            "selectionBackground": "#FFFFFF",
            "white": "#FAFAFA",
            "yellow": "#C18301"
        },
        {
            "background": "#002B36",
            "black": "#002B36",
            "blue": "#268BD2",
            "brightBlack": "#073642",
            "brightBlue": "#839496",
            "brightCyan": "#93A1A1",
            "brightGreen": "#586E75",
            "brightPurple": "#6C71C4",
            "brightRed": "#CB4B16",
            "brightWhite": "#FDF6E3",
            "brightYellow": "#657B83",
            "cursorColor": "#FFFFFF",
            "cyan": "#2AA198",
            "foreground": "#839496",
            "green": "#859900",
            "name": "Solarized Dark",
            "purple": "#D33682",
            "red": "#DC322F",
            "selectionBackground": "#FFFFFF",
            "white": "#EEE8D5",
            "yellow": "#B58900"
        },
        {
            "background": "#FDF6E3",
            "black": "#002B36",
            "blue": "#268BD2",
            "brightBlack": "#073642",
            "brightBlue": "#839496",
            "brightCyan": "#93A1A1",
            "brightGreen": "#586E75",
            "brightPurple": "#6C71C4",
            "brightRed": "#CB4B16",
            "brightWhite": "#FDF6E3",
            "brightYellow": "#657B83",
            "cursorColor": "#002B36",
            "cyan": "#2AA198",
            "foreground": "#657B83",
            "green": "#859900",
            "name": "Solarized Light",
            "purple": "#D33682",
            "red": "#DC322F",
            "selectionBackground": "#FFFFFF",
            "white": "#EEE8D5",
            "yellow": "#B58900"
        },
        {
            "background": "#000000",
            "black": "#000000",
            "blue": "#3465A4",
            "brightBlack": "#555753",
            "brightBlue": "#729FCF",
            "brightCyan": "#34E2E2",
            "brightGreen": "#8AE234",
            "brightPurple": "#AD7FA8",
            "brightRed": "#EF2929",
            "brightWhite": "#EEEEEC",
            "brightYellow": "#FCE94F",
            "cursorColor": "#FFFFFF",
            "cyan": "#06989A",
            "foreground": "#D3D7CF",
            "green": "#4E9A06",
            "name": "Tango Dark",
            "purple": "#75507B",
            "red": "#CC0000",
            "selectionBackground": "#FFFFFF",
            "white": "#D3D7CF",
            "yellow": "#C4A000"
        },
        {
            "background": "#FFFFFF",
            "black": "#000000",
            "blue": "#3465A4",
            "brightBlack": "#555753",
            "brightBlue": "#729FCF",
            "brightCyan": "#34E2E2",
            "brightGreen": "#8AE234",
            "brightPurple": "#AD7FA8",
            "brightRed": "#EF2929",
            "brightWhite": "#EEEEEC",
            "brightYellow": "#FCE94F",
            "cursorColor": "#000000",
            "cyan": "#06989A",
            "foreground": "#555753",
            "green": "#4E9A06",
            "name": "Tango Light",
            "purple": "#75507B",
            "red": "#CC0000",
            "selectionBackground": "#FFFFFF",
            "white": "#D3D7CF",
            "yellow": "#C4A000"
        },
        {
            "background": "#000000",
            "black": "#000000",
            "blue": "#000080",
            "brightBlack": "#808080",
            "brightBlue": "#0000FF",
            "brightCyan": "#00FFFF",
            "brightGreen": "#00FF00",
            "brightPurple": "#FF00FF",
            "brightRed": "#FF0000",
            "brightWhite": "#FFFFFF",
            "brightYellow": "#FFFF00",
            "cursorColor": "#FFFFFF",
            "cyan": "#008080",
            "foreground": "#C0C0C0",
            "green": "#008000",
            "name": "Vintage",
            "purple": "#800080",
            "red": "#800000",
            "selectionBackground": "#FFFFFF",
            "white": "#C0C0C0",
            "yellow": "#808000"
        }
    ],
    "theme": "system",
    "themes": []
}
```

该项难度系数：:star:

需要懂点json，还需要会配置Windows Terminal。

## 添加Powershell启动参数

在Powershell中输入

```bash
# 这一步使用的是记事本
notepad.exe $Profile

# 如果安装有VSCode，可以使用这条命令
# 优点是可以代码高亮
code $Profile
```

紧接着在弹出的页面中输入下面这一长串代码，保存并关闭。这个`Profile`配置文件与`.zshrc` / `.bashrc`文件一样，都是控制启动前参数的。

```bash
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/1_shell.omp.json" | Invoke-Expression



#-------------------------------  Set Hot-keys BEGIN  -------------------------------
# 设置预测文本来源为历史记录
Set-PSReadLineOption -PredictionSource History

# 每次回溯输入历史，光标定位于输入内容末尾
Set-PSReadLineOption -HistorySearchCursorMovesToEnd

# 设置 Tab 为菜单补全和 Intellisense
Set-PSReadLineKeyHandler -Key "Tab" -Function MenuComplete

# 设置向上键为后向搜索历史记录
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward

# 设置向下键为前向搜索历史纪录
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward
#-------------------------------  Set Hot-keys END    -------------------------------
```

**OhMyPosh主题预览** - <https://ohmyposh.dev/docs/themes>

国内网络可能访问不了。

---

好了，Perfect。:yum:

## 结束语

为什么不用WSL作为默认界面？当然，这也很好，但是在某些编辑和交互控制上，**Powershell才是Windows上的正主**，WSL说白了，就是个临时替代之用的。对于老程序员，当然是“我全都要”。

经过测试，该做法**界面美观，性能优异，配置简单**，值得大家使用。在此强烈推荐！
