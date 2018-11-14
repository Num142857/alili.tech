---
title: 升级Mac 10.14 mojave后辅助功能空白无法添加问题
tags: mac
keywords: 'Macbook,Pro,mojave,不可用,问题,辅助功能空白'
abbrlink: b8bdc73c
date: 2018-11-04 22:30:05
---

最近系统升级到Mac mojave 10.14后发现安全性与隐私中的辅助功能是空白的,而且App无论如何都添加不了。
我的macbook pro正常,但是我的mac mini 出现了该问题.让人很是头疼.

# 问题原因

应该是升级导致`/Library/Application\ Support/com.apple.TCC`损坏或权限异常,出现了问题.

# 解决方法
执行下面两行命令后重启系统,就可以恢复正常.
``` bash
sudo chmod 777 /Library/Application\ Support/com.apple.TCC
sudo rm -rf /Library/Application\ Support/com.apple.TCC/TCC.db
# 重启系统
```

