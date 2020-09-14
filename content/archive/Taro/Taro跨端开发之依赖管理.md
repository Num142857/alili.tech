---
title: 'Taro跨端开发之依赖管理'
tags: [Taro,跨端开发,前端架构]
slug: h8gasmt9u5c
keywords: Taro,多端同构,前端架构,多端开发技巧,跨端开发
date: 2020-08-20 22:17:36
---


## 昨天跑的好好项目,今天跑不起来
我们在开发周期比较长的前端项目的时候,必然会遇到依赖管理的问题.
我们在开发项目的时候,我们用了大量的三方库.这些三方的依赖库时不时的会更新自己的代码.

第三方依赖库的代码更新会很容易造成代码运行的不稳定,
比如昨天还跑的好好的项目,另一位刚刚接手的同学重新安装依赖之后项目就完全跑不起来了.
或者自己机器跑的好好的代码,扔到打包机上重新打包之后就完全跑不起来.

因为三方依赖库用的太多,很多时候并不能很快速的定位到项目为什么跑不起来.
特别是开发RN项目的时候,一个依赖更新的问题可能会定位一个大半天才能找到罪魁祸首(曾经的我为了这种事情浪费了大量的青春).



## 锁定NPM依赖版本
对于那些你不熟悉,或者不能保证稳定的三方npm包,我这边的做法是`直接锁定版本号`.
这件事情做的越早越好,不要盲目相信三方npm越更新性能越好.
他会时不时的让你痛一下.让你浪费大量的时间去寻找到底是谁影响了你的代码正常运行.


## 第三方npm包有bug如何解决?

### 升级原有npm包版本
如果你发现了你的第三方npm有bug,建议不要盲目的升级版本.

第一步你需要先看这个npm包的 `changelog`,如果有明确修复过这个bug,
才会建议你升级.但是不能保证升级之后可能会带来其他bug.

### 修掉bug发布在公司私有源

但是我还是比较建议,在原来版本的npm包上修掉这个bug,并且修改npm包名为公司内部包,发布到公司私有npm源上. 

如果因为npm版本的改动,导致项目不稳定,也可以缩小排查范围,快速定位到是哪一个npm库导致的问题.

例如: mobx => @公司源/mobx


### 小技巧: .npmrc配置
如果你有发布到公司私有源的三方npm包,
你可以尝试修改.npmrc文件使用npm名的作用域直接指向公司私有源

例如:

```
@公司源:registry=http://npm.xxx.com
@tarojs:registry=http://npm.xxx.com
```



## 所有项目依赖统一管理
上面说到了我们将所有的有不稳定的npm包锁定版本,保证项目长期维护可以正常运行.
现在我们团队开发的跨端项目将近上百个. 为了保证上百个的项目可以长期稳定运行.
我将所有的依赖封装成了一个npm库,里面没有任何的js代码,只有稳定的依赖.
所有的项目都会引入这个核心的依赖,以保证所有项目可以稳定运行.

### 保证项目使用npm的差异化,强行指定版本
所有依赖全部统一之后,肯定会有项目因为一些原因不想使用个别的三方npm包.
这里就必须要提到`package.json`依赖管理的 `resolutions`属性.
这样npm就会将多版本共存的版本,强行指定某一版本,满足个别项目的特定需求.

使用方法如下:
```
// package.json 
{
    "resolutions": {
        "hoek": "4.2.1"
    }
}
```

当然你也可以使用这个工具,将依赖强制指定版本:
https://www.npmjs.com/package/npm-force-resolutions


## 加速你的npm安装速度
除了大家都知道的npm换源之外,npm依赖的执行文件下载也会拖慢你的依赖安装速度.

以下是我们团队使用的`.npmrc`配置,对于一些npm依赖的执行文件,
可以使用该配置加速你的npm构建速度.

> .npmrc文件的位置在你的home目录下,你也可以在项目根目录创建该文件.

```
chromedriver-cdnurl=https://npm.taobao.org/mirrors/chromedriver
couchbase-binary-host-mirror=https://npm.taobao.org/mirrors/couchbase/v{version}
debug-binary-host-mirror=https://npm.taobao.org/mirrors/node-inspector
electron-mirror=https://npm.taobao.org/mirrors/electron/
flow-bin-binary-host-mirror=https://npm.taobao.org/mirrors/flow/v
fse-binary-host-mirror=https://npm.taobao.org/mirrors/fsevents
fuse-bindings-binary-host-mirror=https://npm.taobao.org/mirrors/fuse-bindings/v{version}
git4win-mirror=https://npm.taobao.org/mirrors/git-for-windows
gl-binary-host-mirror=https://npm.taobao.org/mirrors/gl/v{version}
grpc-node-binary-host-mirror=https://npm.taobao.org/mirrors
hackrf-binary-host-mirror=https://npm.taobao.org/mirrors/hackrf/v{version}
leveldown-binary-host-mirror=https://npm.taobao.org/mirrors/leveldown/v{version}
leveldown-hyper-binary-host-mirror=https://npm.taobao.org/mirrors/leveldown-hyper/v{version}
mknod-binary-host-mirror=https://npm.taobao.org/mirrors/mknod/v{version}
node-sqlite3-binary-host-mirror=https://npm.taobao.org/mirrors
node-tk5-binary-host-mirror=https://npm.taobao.org/mirrors/node-tk5/v{version}
nodegit-binary-host-mirror=https://npm.taobao.org/mirrors/nodegit/v{version}/
operadriver-cdnurl=https://npm.taobao.org/mirrors/operadriver
phantomjs-cdnurl=https://npm.taobao.org/mirrors/phantomjs
profiler-binary-host-mirror=https://npm.taobao.org/mirrors/node-inspector/
puppeteer-download-host=https://npm.taobao.org/mirrors
python-mirror=https://npm.taobao.org/mirrors/python
rabin-binary-host-mirror=https://npm.taobao.org/mirrors/rabin/v{version}
sass-binary-site=https://npm.taobao.org/mirrors/node-sass
sodium-prebuilt-binary-host-mirror=https://npm.taobao.org/mirrors/sodium-prebuilt/v{version}
sqlite3-binary-site=https://npm.taobao.org/mirrors/sqlite3
utf-8-validate-binary-host-mirror=https://npm.taobao.org/mirrors/utf-8-validate/v{version}
utp-native-binary-host-mirror=https://npm.taobao.org/mirrors/utp-native/v{version}
zmq-prebuilt-binary-host-mirror=https://npm.taobao.org/mirrors/zmq-prebuilt/v{version}
sentrycli_cdnurl=https://npm.taobao.org/mirrors/sentry-cli
```


## 附录 : NPM中的版本号规则
版本的格式: `major.minor.patch`

主版本号.次版本号.修补版本号


#### >version

必须大于某个版本

如：>1.1.2，表示必须大于1.1.2版

#### >=version

可大于或等于某个版本

如：`>=1.1.2`，表示可以等于1.1.2，也可以大于1.1.2版本

#### <version

必须小于某个版本

如：`<1.1.2`，表示必须小于1.1.2版本

#### <=version

可以小于或等于某个版本

如：`<=1.1.2`，表示可以等于1.1.2，也可以小于1.1.2版本

#### ~version
大概匹配某个版本

如果minor版本号指定了，那么minor版本号不变，而patch版本号任意

如果minor和patch版本号未指定，那么minor和patch版本号任意

如：~1.1.2，表示>=1.1.2 <1.2.0，可以是1.1.2，1.1.3，1.1.4，.....，1.1.n

如：~1.1，表示>=1.1.0 <1.2.0，可以是同上

如：~1，表示>=1.0.0 <2.0.0，可以是1.0.0，1.0.1，1.0.2，.....，1.0.n，1.1.n，1.2.n，.....，1.n.n

#### ^version

兼容某个版本

版本号中最左边的非0数字的右侧可以任意

如果缺少某个版本号，则这个版本号的位置可以任意

如：`^1.1.2` ，表示 `>=1.1.2 <2.0.0`，可以是 1.1.2，1.1.3，.....，1.1.n，1.2.n，.....，1.n.n

如：`^0.2.3` ，表示>=0.2.3 <0.3.0，可以是0.2.3，0.2.4，.....，0.2.n

如：`^0.0`，表示 >=0.0.0 <0.1.0，可以是0.0.0，0.0.1，.....，0.0.n

#### x标识符

x的位置表示任意版本

如：1.2.x，表示可以1.2.0，1.2.1，.....，1.2.n

#### *标识符

任意版本，""也表示任意版本

如：*，表示>=0.0.0的任意版本

#### version1 - version2

大于等于version1，小于等于version2

如：`1.1.2 - 1.3.1`，表示包括1.1.2和1.3.1以及他们建的任意版本

range1 || range2

满足range1或者满足range2，可以多个范围

如：`<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0`，表示满足这3个范围的版本都可以







