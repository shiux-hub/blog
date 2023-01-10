---
title: Python爬虫从入门到放弃（七）PyQuery库的使用
reprint: false
date: 2021-09-11 21:09:40
categories:
  - Code
tags: 
  - Spider
cover:
coverWidth:
coverHeight:
---

PyQuery库也是一个非常强大又灵活的网页解析库，如果你有前端开发经验的，都应该接触过jQuery，那么PyQuery就是你非常绝佳的选择，PyQuery是Python仿照jQuery的严格实现。语法与jQuery几乎完全相同，所以不用再去费心去记一些奇怪的方法了。

**官网地址** - <https://pyquery.readthedocs.io/en/latest/>

**jQuery参考文档** - <https://jquery.cuishifeng.cn/>

## 初始化

初始化的时候一般有三种传入方式：传入字符串，传入url，传入文件。

### 字符串初始化

```python
from pyquery import PyQuery as pq

html = '''
<div>
    <ul>
         <li class="item-0">first item</li>
         <li class="item-1"><a href="link2.html">second item</a></li>
         <li class="item-0 active"><a href="link3.html"><span class="bold">third item</span></a></li>
         <li class="item-1 active"><a href="link4.html">fourth item</a></li>
         <li class="item-0"><a href="link5.html">fifth item</a></li>
     </ul>
</div>
'''
doc = pq(html)
print(doc)
print(type(doc))
print(doc('li'))
```

输出：

![](/images/831f47e3600c4ff034951ac8adfcab9d.png)

由于PyQuery写起来比较麻烦，所以我们导入的时候都会添加别名：

```python
from pyquery import PyQuery as pq
```

这里我们可以知道上述代码中的`doc`其实就是一个`pyquery`对象，我们可以通过`doc`可以进行元素的选择，其实这里就是一个css选择器，所以css选择器的规则都可以用，直接`doc(tag_name)`就可以获取所有的该标签的内容，如果想要获取`class`则`doc('.class_name')`，如果是`id`则`doc('#id_name')`。

### URL初始化

```python
from pyquery import PyQuery as pq


doc = pq(url="http://www.baidu.com", encoding='utf-8')
print(doc('head'))
```

### 文件初始化

我们在`pq()`这里可以传入url参数也可以传入文件参数，当然这里的文件通常是一个`html`文件，例如：`pq(filename='index.html')`

## 基本的CSS选择器

```python
from pyquery import PyQuery as pq


html = '''
<div id="container">
    <ul class="list">
         <li class="item-0">first item</li>
         <li class="item-1"><a href="link2.html">second item</a></li>
         <li class="item-0 active"><a href="link3.html"><span class="bold">third item</span></a></li>
         <li class="item-1 active"><a href="link4.html">fourth item</a></li>
         <li class="item-0"><a href="link5.html">fifth item</a></li>
     </ul>
 </div>
'''
doc = pq(html)
print(doc('#container .list li'))
```

这里我们需要注意的一个地方是`doc('#container .list li')`，这里的三者之间的并不是必须要挨着，只要是层级关系就可以，下面是常用的CSS选择器方法：
