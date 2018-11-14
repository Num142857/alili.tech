---
title: Linux - 安装nginx步骤
tags: [Linux]
slug: d150fc3c
keywords: Linux,Centos,ssh,nginx,yum
date: 2018-01-16 20:32:05
---

###  安装nginx相关的依赖

```bash
yum install gcc
yum install pcre-devel
yum install zlib zlib-devel
yum install openssl openssl-devel
```
当然你也可以一起安装
```
yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel
```

### 下载nginx的tar压缩包
进入网页 [http://nginx.org/download/](http://nginx.org/download/) 

选择你需要的版本:
```bash
 # 进入local文件夹
 cd /usr/local

 # 我选择了一个相对较新的版本,下载到当前目录
 wget http://nginx.org/download/nginx-1.13.9.tar.gz

 # 解压
 tar -xvf nginx-1.13.9.tar.gz

 # 重命名
 mv nginx-1.13.9.tar.gz nginx

 #进入nginx目录
 cd nginx

 #执行以下命令
 ./configure

 #编译
 make
```


进行以上步骤之后,你的nginx就已经安装完毕了

### nginx常用命令
以下操作全都是在nginx目录下进行
#### 启动:
```bash
./sbin/nginx
```
#### 停止:
```bash
./sbin/nginx -s stop
#或者
./sbin/nginx -s quit
```

#### 重启:
```bash
./sbin/nginx -s reload
```

#### 查看进程命令
```bash
ps -ef | grep nginx
```