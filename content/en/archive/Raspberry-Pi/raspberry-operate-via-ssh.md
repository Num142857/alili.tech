---
title: Raspberry Operate via SSH
tags: [Raspberry-Pi]
slug: 467ebcb2
keywords: Raspberry Pi,nodejs,ssh,Front-end,Raspberry,pi
date: 2017-01-10 17:53:05
---

After various searches, various struggles, finally installed operating system for my little Raspberry Pi.
But, this PIXEL OS graphical interface, various inexplicable bugs that won't respond.
After struggling for several hours, made me very frustrated.

Because just started with Linux, many problems need online searches, switching back and forth between PC and Raspberry Pi is really uncomfortable.

Below introduces method to control Raspberry Pi via SSH from another computer. To solve the above frustrating problems.

Open command line on Raspberry Pi:

Enter sudo raspi-config

![](http://img.blog.csdn.net/20161012150453948)
<!-- more -->

Select Advanced Options

![](http://img.blog.csdn.net/20161012150617215)

Select SSH

![](http://img.blog.csdn.net/20161012150654787)

Select yes

![](http://img.blog.csdn.net/20161012150753381)

SSH Enabled

![](http://img.blog.csdn.net/20161012150827171)

Then open PC command line (I use macOS, command line can directly use ssh)

Enter: 
```
ssh pi@192.168.1.xxx  
```

Address is Raspberry Pi's ip address, if don't know, enter ifconfig in Raspberry Pi command line, can see it

![](http://www.geekfan.net/wp-content/uploads/4768718a07fec72ff908aa6cde5b21a9.png)

Then enter password, if haven't modified user pi's password, default password is: raspberry

Then can play freely

![](http://www.geekfan.net/wp-content/uploads/313ee0ee381651b70e8550ed77cd969f.png)

