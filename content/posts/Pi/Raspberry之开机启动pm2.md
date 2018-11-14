---
title: Raspberry之开机启动pm2
tags: Raspberry Pi
abbrlink: 9b723d04
keywords: 树莓派,nodejs,ssh,前端,Raspberry,pi,pm2
date: 2017-01-12 20:32:05
---

我玩树莓派的过程简直可以用坎坷来形容,研究了十几个小时才安装上Nodejs.

接下来想要做开机启动pm2,又折腾了十几个小时.网上的方法因为跟不上版本的迭代更新了,导致各种失败.

接下来,介绍一下让pm2在树莓派上开机启动的方法

首先下载pm2
```
cnpm install pm2 -g
```

运行需要run的代码
```
pm2 start app.js
```
<!-- more -->

保存这时候pm2运行的状态,以便开机启动后,pm2 可以重新跑app.js

```
sudo pm2 save //系统会生成一个文件 '/home/pi/.pm2/dump.pm2'
```

(重点)接下来我们要锁定这个文件,不允许任何方式的修改

```
sudo chattr +i /home/pi/.pm2/dump.pm2
```

设置开机启动
```
sudo pm2 startup systemd -u pi --hp /home/pi

sudo reboot //重启查看开机启动的效果
```

通过以上步骤,我们就可以成功的开机启动pm2 并且运行app.js

如果我们以后想修改pm2 开机启动的配置,我们需要解锁dump.pm2文件,


```
pm2 start xxx.js //运行另一个程序
sudo chattr -i /home/pi/.pm2/dump.pm2 //解锁文件

sudo pm2 save //保存配置
sudo chattr +i /home/pi/.pm2/dump.pm2 //重新加锁
sudo pm2 startup systemd -u pi --hp /home/pi //设置开机启动

sudo reboot 重启操作系统

```
以上就是修改pm2开机启动配置的方法了,是不是简单得不能再简单?

(这么简单的步骤,居然浪费了一天的时间,才找到方法,不过我很喜欢这样的感觉)




