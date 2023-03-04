---
title: 修改了Python安装目录的文件夹名称而无法使用pip的两种实用解决方法
reprint: false
date: 2023-03-04 15:16:41
categories:
  - Code
tags:
  - PIP
cover:
coverWidth:
coverHeight:
---

![python执行文件路径问题](https://s1.ax1x.com/2023/03/04/ppAjwvT.png)

把Python安装目录的文件夹名称修改了，记得也要把电脑的环境变量修改过来，这个是前提！

然而，环境变量修改也无法使用pip，我在这里提供两种实用方法！

## 以脚本方式运行pip

在使用第一种方法之前，请检查电脑的pip是否更新了。

如果更新了还是不行，请尝试以下这条命令：

```bash
python -m pip install --force-reinstall pip
```

![以脚本方式运行pip](https://s1.ax1x.com/2023/03/04/ppAjzqg.png)

## 修改pip程序

支持从根本上解决问题，那么根本问题是什么呢？

是因为它在安装的时候就已经把安装时的路径写入了底层源码，我们修改环境变量后也只是根据当前电脑的文件目录查找出的路径与底层的并不匹配而引发异常。

所以，我们修改`pip.exe`源码里的路径，简单而带点粗暴！

利用HEdit（十六进制修改工具）打开pip.exe并进行修改（毕竟是底层代码，切记谨慎操作）

如果懒得下载工具，这当然拦不住python爱好者，几行python代码搞定：

```python
# pip程序文件目录
pip_path = 'F:/python3.10/Scripts/pip.exe'
# python当前路径(只能使用反括号)
python_current_path = b'F:\\python3.10'
# python修改之前的路径(只能使用反括号)
python_old_path = b'F:\\py310'
# 二进制读写文件
with open(pip_path, 'rb+') as bin_file:
    bytes_str = bin_file.read()
    # 字符串前面有加上b，转为bytes类型
    bytes_str = bytes_str.replace(python_old_path, python_current_path)
    # 定位到文件开头
    bin_file.seek(0)
    # bin_file.truncate() # 清空文件
    bin_file.write(bytes_str)
    bin_file.flush()
    print("修改完成！！")
```
