---
title: Centos 7 使用yum升级到最新版本的git
tags: [Linux]
slug: 3f6742b1
keywords: Linux,Centos
date: 2018-12-25 20:32:05
---

# yum upgrade 并不能升级git到最新版本

在centos7 默认的git版本是1.8.x

## 查看本机git版本

```bash
git --version
git version 1.8.3.1
```
如果你想使用yum升级到2.0+的版本

## 直接yum升级并不会升级到最新版本

```bash
yum -y upgrade git
git version 1.8.3.1
```

但是我又不想下载源码包,在本机编译然后输出环境变量那种方式.
还是太麻烦了.


# yum升级git版本到2.0+

## Git第三方仓库安装方式（IUS）

```bash
# 安装使用里面说的自动化安装脚本
curl https://setup.ius.io | sh

yum search git 

# 删除本机git,安装git2u
yum remove -y git | yum -y install git2u

# 查看当前版本
git --version
# 成功升级
> git version 2.16.4
```
