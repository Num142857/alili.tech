---
title: Raspberry之外网访问树莓派
tags: [Raspberry-Pi]
slug: 8ad4a3a8
keywords: 树莓派,nodejs,ssh,Front-end,Raspberry,pi
date: 2017-01-10 20:53:05
---

我想在公司的时候,也可以操作我家里的树莓派.
可是家里的ip地址是动态的,那我应该怎么办呢?

经过各种网上一顿搜索之后,利用路由器的端口转发或者DMZ,可以做到外网访问内网.

可是我设置完之后,并没有成功.折腾了好久,没有找到原因.最后以失败告终.(我怀疑我买到了假路由器).

各种方案尝试过之后,利用花生壳可以做到外网访问内网,花生壳的叫法是:

内网穿透


进入花生壳的下载地址,选择树莓派版本

[下载页面](http://hsk.oray.com/download/)

<!-- more -->

复制最新版本的花生壳树莓派版本的最新版下载路径

```
wget http://download.oray.com/peanuthull/embed/phddns_raspberry.tgz  //下载花生壳
tar zxvf phddns_raspberry.tgz  //解压安装包
```

![](http://file.oray.com/service/1507/20150721135050987.jpg)

解压完成后，在当前路径下执行cd phddns2，进入phddns2文件夹，执行./oraynewph start
，如提示Oraynewph start success说明花生壳成功安装运行。

其实我运行oraynewph start的时候并没有成功,

如果你也碰到同样的情况的话可以输入以下命令:

```
$> sudo mkdir -p /usr/oray-app
$> sudo tar -zxvf ./oraynewph.tgz -C /usr/oray-app/
$> sudo rm -rf oraynewph.tgz
$> sudo mv ./parse /usr/oray-app/parse
$> sudo mv ./oray_serve /etc/init.d/oray_serve
$> sudo mv ./oraynewph /bin/oraynewph
$> cd ..
$> rm -rf phddns2
$> sudo touch /tmp/oraynewph_log
$> sudo update-rc.d oray_serve defaults
$> sudo /usr/oray-app/bin/oraynewph -s 0.0.0.0 &>/dev/null &
$> sudo /usr/oray-app/bin/oraysl -a 127.0.0.1 -p 16062 -s phsle01.oray.net:80 -d
```

![](http://file.oray.com/service/1507/20150721135050957.jpg)

在任意路径命令行执行 oraynewph status 即可看到花生壳运行状态以及SN码（先复制，有大用！）。

最后:
```
sudo oraynewph status //获取到了sn
```

![](http://file.oray.com/service/1507/20150721135050867.jpg)

在浏览器输入地址：[b.oray.com](b.oray.com)，在花生壳管理页面，输入SN码与密码（首次登录默认密码admin）
![](http://file.oray.com/service/1507/20150721135050812.jpg)

首次登录需要修改默认密码，完善手机验证和邮箱信息完成初始化。

![](http://file.oray.com/service/1507/20150721135050765.jpg)

树莓派跟花生棒不一样，没有内置帐号，需要绑定花生壳账号使用，由于B哥在水深火热的大局域网中，所以绑定的是花生壳（内网穿透）账号。
![](http://file.oray.com/service/1507/20150721135050273.jpg)

绑定登录成功，可以直接点击页面中间橙色模块 内网映射 添加映射 
![](http://file.oray.com/service/1507/20150721135051580.jpg)

映射添加完成，然后复制外网访问地址，让我们访问瞅瞅。
![](http://file.oray.com/service/1507/20150721135051450.jpg)


拿到这个外网访问的地址,我们就可以利用SSH连接到我们的树莓派了

```
ssh pi@xxxx.xxx
```
