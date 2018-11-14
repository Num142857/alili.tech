---
title: Raspberry之安装Nodejs
tags: Raspberry Pi
abbrlink: 58ab432d
keywords: 树莓派,nodejs,ssh,前端,Raspberry,pi
date: 2017-01-11 22:30:05
---

我安装的树莓派系统是自带Nodejs的,但是版本非常的低.而且没有npm.
为了安装新版的nodejs,我折腾了十几个小时,网上的方法各种失败.

最终终于安装成功了,接下来我介绍一下我的安装方法.

### 下载Nodejs

[Nodejs 下载页面](https://nodejs.org/en/download/)

<!-- more -->
我们选择Linux Binaries (ARM) ARMv7的版本,复制下载链接

```
wget https://nodejs.org/dist/v6.9.5/node-v6.9.5-linux-armv7l.tar.xz
tar -xzf node-v6.9.5-linux-armv7l.tar.xz //解压安装包
sudo mv node-v6.9.5-linux-armv7l  /usr/local/bin/node/
sudo ln /usr/local/bin/node/bin/node /usr/local/bin/node
sudo ln -s /usr/local/bin/node/lib/node_modules/npm/bin/npm /usr/local/bin/npm
```

好了,这时候我们在任意目录下输入:
```
node -v
npm -v 
```
node 是最新版本的了,npm 也有了

因为在国内,用npm下载包的话,会经常不稳定,这时候我们可以用到 cnpm,
输入以下命令:

```
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

下载完成之后,我们安装模块的时候:
```
$ cnpm install [name]
```