---
title: CentOS7 Environment Puppeteer Startup Failure Solution
tags: [Puppeteer]
slug: e550825
keywords: Puppeteer,CentOS7,Installation,Issue
date: 2018-02-25 19:33:33
---

> Tip: In CentOS6 environment, Puppeteer cannot be started. In CentOS6, many Puppeteer dependency libraries don't exist. So if you want to run Puppeteer on CentOS6, I suggest giving up, it's more worthwhile to spend time elsewhere.

# Missing Dependencies
Running Puppeteer on a new CentOS7 often fails, many times reporting errors like:
```
...node_modules/puppeteer/.local-chromium/linux-496140/chrome-linux/chrome: error while loading shared libraries: libpangocairo-1.0.so.0: cannot open shared object file: No such file or directory
```
This error indicates missing dependencies.

Below lists dependency libraries your system may need to install, use yum to install
```bash
# Fonts
yum install ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y

# Dependency libraries
yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y
```

# Disable Sandbox Mode
In Linux environment, the following error often occurs:

[https://github.com/GoogleChrome/puppeteer/issues/290](https://github.com/GoogleChrome/puppeteer/issues/290)

```
(node:30559) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: Failed to connect to chrome!
(node:30559) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

## JS Example Code

```js
const puppeteer = require('puppeteer');

(async () => {
  // Disable sandbox mode
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await browser.close();
})();
```

