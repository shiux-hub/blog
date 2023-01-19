---
title: Docker扩展命令
reprint: false
date: 2021-11-24 12:00:44
categories:
  - Code
tags:
  - Docker
cover:
coverWidth:
coverHeight:
---

## 清理

> `prune`命令用来删除不再使用的`docker`对象。

- 删除所有未被 tag 标记和未被容器使用的镜像

```bash
docker image prune
```

- 删除所有未被容器使用的镜像

```bash
docker image prune -a
```

- 删除所有停止运行的容器

```bash
docker container prune
```

- 删除所有未被挂载的卷

```bash
docker volume prune
```

- 删除所有网络

```bash
docker network prune
```

- 删除 docker 所有资源

```bash
docker system prune
```

## 导出全部镜像

### 导出命令

```bash
#!/bin/bash
docker save $(docker images --format '{{.Repository}}:{{.Tag}}') -o [filename].tar
```

> `docker images name`和`tag`都为`none`会报错：`Error response from daemon: invalid reference format`

### 导入命令

```bash
#!/bin/bash
docker load -i [filename].tar
```

### 查看有哪些镜像

```bash
#!/bin/bash
IMAGES=$(docker images --format '{{.Repository}}:{{.Tag}}')

for element in ${IMAGES[@]}
do
  #echo "saving ${element} ..."
  #docker save ${element} >> allinone.tar
  #echo "${element} saved"
  echo "${element}"
done
```
