---
title: Linux -  使用ssh-copy-id命令实现ssh Linux免密码登陆
tags: Linux
abbrlink: 5f4cf684
keywords: Linux,Centos,ssh,copy,id,免密码
date: 2017-12-16 20:32:05
---

### 1. 生成公钥和私钥
```
ssh-keygen -t rsa
```
按照提示输入完后，会在~/.ssh目录下生成id_rsa和id_rsa.pub这两个文件

### 2.与服务器建立联系
```
ssh-copy-id  root@192.168.0.100  //示例ip
```
接下来会要求输入连接密码，验证成功后

### 3.无密码登陆服务器

尝试以下命令，看是不是直接登陆成功了：
```
ssh  root@192.168.0.100
```

就是这么简单