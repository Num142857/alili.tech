---
title: 关闭Mac系统的SIP与卸载Mac上的输入法
tags: mac
abbrlink: 760c8e37
keywords: Macbook,Pro,输入法,卸载,问题
date: 2017-01-21 22:30:05
---

mac电脑上,有的多余的输入法,发现竟然删不掉.每次切换输入法的时候总是要多按几次切换.表示极其的不爽.

首先就是系统默认的输入法.

## 关闭 mac 系统的 SIP 
- 重启系统，按住 Command + R 进入恢复模式。

- 点击顶部菜单栏 实用工具 中的 终端 。

- 输入以下命令来禁用 SIP 保护机制。

```bash
csrutil disable
```

- 执行后输出以下信息表示禁用成功。
```bash
Successfully disabled System Integrity Protection. Please restart the machine for the changes to take effect.
```

- 最后重启系统即可。


## 重新打开 SIP 方法
在恢复模式下的终端输入以下命令
```bash
csrutil enable
```

## 卸载系统输入法

* 安装Xcode或下载“Property List Editor”，因为需要打开(.plist)格式文件 

* 打开“终端”

* 在“终端”里输入命令
```
sudo open ~/Library/Preferences/com.apple.HIToolbox.plist
```
回车，输入用户账户的密码

![](http://www.cr173.com/up/2017-1/201701161151525689893.png)

我们选中“Root”—“AppleEnabledInputSources”， 一个一个点开,查找你想要删除的输入法，然后删除。

![](http://www.cr173.com/up/2017-1/201701161152373133375.png)

最后重启Mac


## QQ输入法等第三方输入法

* 首先打开活动监视器，把QQ输入法进程关闭。 

* Finder界面按下 shift+command+G, 输入：/library/input methods（系统的资料库）, 进入文件夹，找到qq输入法，删掉。 

* Finder界面按下 shift+command+G, 输入：~/library/input methods （个人文件夹的资料库）， 进入文件夹，找到qq输入法，删掉。