---
title: Hexo的DTraceProviderBindings MODULE_NOT_FOUND问题
tags: Hexo
abbrlink: e25431a8
keywords: Hexo,DTraceProviderBindings,MODULE_NOT_FOUND,问题
date: 2017-02-19 21:32:05
---

最近在mac上安装Hexo,老是报错 DTraceProviderBindings MODULE_NOT_FOUND;


## 第一种报错

报错命令如下:
```
{ [Error: Cannot find module './build/Release/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND' }
{ [Error: Cannot find module './build/default/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND' }
{ [Error: Cannot find module './build/Debug/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND' }
```

虽然hexo的生成 发布功能没有影响.但是每次运行命令的时候,就会报错.表示很不能忍;

网上的普遍方法是:

```
npm install hexo --no-optional
```

但是,我的电脑还是没有效果;


最后我重装了 hexo-cli
```
npm uninstall hexo-cli -g
npm install hexo-cli -g
```

我的报错问题就解决了.


## 第二种报错

```
{ Error: Cannot find module './build/Release/DTraceProviderBindings'
at Function.Module._resolveFilename (module.js:469:15)
at Function.Module._load (module.js:417:25)
at Module.require (module.js:497:17)
at require (internal/module.js:20:19)
at Object.<anonymous> (/usr/local/lib/node_modules/.dtrace-provider_npminstall/dtrace-provider/0.8.0/dtrace-provider/
dtrace-provider.js:17:23)
at Module._compile (module.js:570:32)
at Object.Module._extensions..js (module.js:579:10)
at Module.load (module.js:487:32)
at tryModuleLoad (module.js:446:12)
at Function.Module._load (module.js:438:3)
at Module.require (module.js:497:17)
at require (internal/module.js:20:19)
at Object.<anonymous> (/usr/local/lib/node_modules/hexo-cli/node_modules/bunyan/lib/bunyan.js:79:18)
at Module._compile (module.js:570:32)
at Object.Module._extensions..js (module.js:579:10)
at Module.load (module.js:487:32) code: 'MODULE_NOT_FOUND' }

```
问题是因为安装的过程中,各种奇奇怪怪的问题导致hexo-cli的依赖库 dtrace-provider 没有安装成功.

接下来我们只要重新安装下 dtrace-provider 就可以了


```
npm uninstall dtrace-provider -g
npm install dtrace-provider -g
```

好了,问题解决了.