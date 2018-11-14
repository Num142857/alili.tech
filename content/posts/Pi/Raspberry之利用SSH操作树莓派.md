---
title: Raspberry之利用SSH操作树莓派
tags: Raspberry Pi
abbrlink: 467ebcb2
keywords: 树莓派,nodejs,ssh,前端,Raspberry,pi
date: 2017-01-10 17:53:05
---

各种搜索,各种折腾之后,终于给我的小树莓派安装好了操作系统.
但是,这PIXEL OS图形操作界面,各种莫名其妙点不动的bug.
折腾了好几个小时之后,让我各种抓狂.

因为是刚刚接触Linux,很多问题需要在网上搜索,PC跟树莓派之间切换来切换去实在是不好受.

下面就介绍,用另一台电脑通过SSH来控制树莓派的方法.来解决以上各种抓狂的问题.

在树莓派打开命令行:

输入 sudo raspi-config

![](http://img.blog.csdn.net/20161012150453948)
<!-- more -->

选择Advanced Options

![](http://img.blog.csdn.net/20161012150617215)

选择SSH

![](http://img.blog.csdn.net/20161012150654787)

选择yes

![](http://img.blog.csdn.net/20161012150753381)

SSH 已经启用

![](http://img.blog.csdn.net/20161012150827171)

然后打开PC的命令行(我用的是MAC,命令行直接可以用ssh)

输入: 
```
ssh pi@192.168.1.xxx  
```

地址为树莓派的ip地址,如果不知道,在树莓派命令行输入 ifconfig,就可以看到了

![](http://www.geekfan.net/wp-content/uploads/4768718a07fec72ff908aa6cde5b21a9.png)

然后输入密码,如果还没有修改过用户pi的密码的话,默认密码就是:raspberry

随后就可以尽情的玩耍了

![](http://www.geekfan.net/wp-content/uploads/313ee0ee381651b70e8550ed77cd969f.png)