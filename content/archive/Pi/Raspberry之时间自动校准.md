---
title: Raspberry之时间自动校准
tags: Raspberry Pi
abbrlink: 4befbcf0
keywords: 树莓派,nodejs,ssh,前端,Raspberry,pi,时间
date: 2017-01-20 22:30:05
---

应该是树莓派系统版本的问题,网上很多方法开启网络时间协议(时间自动校准)已经失效.对于我这样的小白来说,试了很多种方法,都没有成功.

今天来说说正确的开启姿势;


树莓派没有默认开启时间自动校准功能的.需要打开NTP（Network Time Protocol，网络时间协议）才可以尽可能的保证时间的准确度.

### 启用NTP：

```
sudo timedatectl set-ntp true
```

接下来我们来看看时间是否正确:

```
pi@raspberrypi:~ $ date
2017年 03月 20日 星期一 21:38:41 CST
```

很明显时间都正确了.如果时间差了24小时以内,那大概是时区错了.

