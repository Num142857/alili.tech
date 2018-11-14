---
title: Centos7环境下启动puppeteer失败解决办法
tags: [puppeteer]
slug: e550825
keywords: puppeteer,Centos7,安装,问题
date: 2018-02-25 19:33:33
---

> 小贴士: 在centos6环境下,是不能启动puppeteer的,在centos6下,很多puppeteer依赖库是不存在的.所以如果你想在centos6上运行puppeteer,建议还是放弃,把时间花在其他地方比较值得.



# 缺少依赖
在新的centos7上运行puppeteer往往会运行失败,很多时候会报这样的错:
```
...node_modules/puppeteer/.local-chromium/linux-496140/chrome-linux/chrome: error while loading shared libraries: libpangocairo-1.0.so.0: cannot open shared object file: No such file or directory
```
这样的错表示,缺少依赖.

下面列出,你的系统可能需要安装的依赖库,使用yum安装
``` bash
#字体
yum install ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y

#依赖库
yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y
```

# 禁用沙箱模式
在Linux环境下,往往还会出现以下错误:

[https://github.com/GoogleChrome/puppeteer/issues/290](https://github.com/GoogleChrome/puppeteer/issues/290)

```
(node:30559) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: Failed to connect to chrome!
(node:30559) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

## js示例代码

```js
const puppeteer = require('puppeteer');

(async () => {
  //禁用沙箱模式
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await browser.close();
})();
```