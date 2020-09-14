---
title: Linux -  SSH连接远程服务器直接执行command时PATH不全解决方案
tags: [Linux]
keywords: 'Linux,Centos,ssh,copy,id,PATH不全,non-interactive mode'
slug: a5e195cc
date: 2018-03-15 20:32:05
---
## non-interactive mode下PATH不全

ssh username@desktop.domain 'command'这种是典型的non-interactive shell，PATH不全.

## 原因

Linux系统中一种常用的判断是否是交互shell的方式就是通过PS1变量，虽然还有其他的方式，不过现在.bashrc中是通过PS1来判断是否为interactive mode。
``` bash
# .bashrc文件
# If not running interactively, don't do anything  
[ -z "PS1" ] && return  
```

## 解决方案

将必要的export PATH的声明，全部移到[ -z "PS1" ] && return 之前。保证在non-interactive mode下，PATH的设置也都会生效。