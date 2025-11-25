---
title: Hexo DTraceProviderBindings MODULE_NOT_FOUND Issue
tags: [Hexo]
slug: hexo-dtrace-provider-bindings-module-not-found
keywords: Hexo,DTraceProviderBindings,MODULE_NOT_FOUND,Issue
date: 2017-02-19 21:32:05
---

Recently installing Hexo on Mac, always getting error DTraceProviderBindings MODULE_NOT_FOUND;


## First Type of Error

Error command as follows:
```
{ [Error: Cannot find module './build/Release/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND' }
{ [Error: Cannot find module './build/default/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND' }
{ [Error: Cannot find module './build/Debug/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND' }
```

Although Hexo's generate and publish functions weren't affected. But every time running commands, it would error. Very annoying;

Common method online is:

```
npm install hexo --no-optional
```

But, my computer still had no effect;


Finally I reinstalled hexo-cli
```
npm uninstall hexo-cli -g
npm install hexo-cli -g
```

My error problem was solved.


## Second Type of Error

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
The problem was because during installation, various strange issues caused hexo-cli's dependency library dtrace-provider to not install successfully.

Next we just need to reinstall dtrace-provider

```
npm uninstall dtrace-provider -g
npm install dtrace-provider -g
```

OK, problem solved.

