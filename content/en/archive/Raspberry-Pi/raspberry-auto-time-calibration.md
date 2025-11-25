---
title: Raspberry Auto Time Calibration
tags: [Raspberry-Pi]
slug: 4befbcf0
keywords: Raspberry Pi,nodejs,ssh,Front-end,Raspberry,pi,Time
date: 2017-01-20 22:30:05
---

Should be Raspberry Pi system version issue, many methods online to enable Network Time Protocol (auto time calibration) have failed. For a beginner like me, tried many methods, none succeeded.

Today let's talk about the correct way to enable;


Raspberry Pi doesn't enable auto time calibration by default. Need to enable NTP (Network Time Protocol) to ensure time accuracy as much as possible.

### Enable NTP:

```
sudo timedatectl set-ntp true
```

Next let's see if time is correct:

```
pi@raspberrypi:~ $ date
Monday, March 20, 2017 21:38:41 CST
```

Clearly time is correct. If time difference is within 24 hours, probably timezone is wrong.

