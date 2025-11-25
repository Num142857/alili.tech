---
title: Linux - CentOS Timezone Setting
tags: [Linux]
slug: linux-centos-timezone-setting
keywords: Linux,Centos,Timezone Setting
date: 2018-07-30 20:32:05
---
## timedatectl Command


### Check Current Timezone Status
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

### Set Timezone to Shanghai
```bash
$ timedatectl set-timezone Asia/Shanghai # Set system timezone to Shanghai
```

### Other Operations
```bash
$ timedatectl list-timezones # List all timezones

$ timedatectl set-local-rtc 1 # Adjust hardware clock to match local clock, 0 means set to UTC time

```

