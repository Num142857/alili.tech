---
title: Linux - Install Nginx Steps
tags: [Linux]
slug: linux-install-nginx-steps
keywords: Linux,Centos,ssh,nginx,yum
date: 2018-01-16 20:32:05
---

### Install Nginx Related Dependencies

```bash
yum install gcc
yum install pcre-devel
yum install zlib zlib-devel
yum install openssl openssl-devel
```
Of course you can also install together
```
yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel
```

### Download Nginx tar Archive
Go to webpage [http://nginx.org/download/](http://nginx.org/download/) 

Choose the version you need:
```bash
 # Enter local folder
 cd /usr/local

 # I chose a relatively new version, download to current directory
 wget http://nginx.org/download/nginx-1.13.9.tar.gz

 # Extract
 tar -xvf nginx-1.13.9.tar.gz

 # Rename
 mv nginx-1.13.9.tar.gz nginx

 # Enter nginx directory
 cd nginx

 # Execute following commands
 ./configure

 # Compile
 make
```


After completing the above steps, your nginx is already installed

### Nginx Common Commands
All following operations are performed in nginx directory
#### Start:
```bash
./sbin/nginx
```
#### Stop:
```bash
./sbin/nginx -s stop
#or
./sbin/nginx -s quit
```

#### Restart:
```bash
./sbin/nginx -s reload
```

#### Check Process Command
```bash
ps -ef | grep nginx
```

