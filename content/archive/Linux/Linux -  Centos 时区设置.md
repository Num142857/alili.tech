---
title: Linux -  Centos 时区设置
tags: Linux
slug: 3f6742b1
keywords: Linux,Centos,时区设置
date: 2018-07-30 20:32:05
---
## timedatectl 命令


### 查看当前时区状态
```bash
$ timedatectl status
      Local time: Fri 2018-08-31 13:42:42 CST
  Universal time: Fri 2018-08-31 05:42:42 UTC
        RTC time: n/a
       Time zone: Asia/Shanghai (CST, +0800)
     NTP enabled: n/a
NTP synchronized: yes
 RTC in local TZ: no
      DST active: n/a
```

### 设置时区为上海
```bash
$ timedatectl set-timezone Asia/Shanghai # 设置系统时区为上海
```

### 其他操作
```bash
$ timedatectl list-timezones # 列出所有时区

$ timedatectl set-local-rtc 1 # 将硬件时钟调整为与本地时钟一致, 0 为设置为 UTC 时间

```