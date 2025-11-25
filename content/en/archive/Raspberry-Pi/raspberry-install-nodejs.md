---
title: Raspberry Install Node.js
tags: [Raspberry-Pi]
slug: 58ab432d
keywords: Raspberry Pi,nodejs,ssh,Front-end,Raspberry,pi
date: 2017-01-11 22:30:05
---

My installed Raspberry Pi system comes with Node.js, but version is very low. And no npm.
To install new version nodejs, I struggled for over ten hours, various methods online failed.

Finally installed successfully, next I'll introduce my installation method.

### Download Node.js

[Node.js Download Page](https://nodejs.org/en/download/)

<!-- more -->
We choose Linux Binaries (ARM) ARMv7 version, copy download link

```
wget https://nodejs.org/dist/v6.9.5/node-v6.9.5-linux-armv7l.tar.xz
tar -xzf node-v6.9.5-linux-armv7l.tar.xz // Extract installation package
sudo mv node-v6.9.5-linux-armv7l  /usr/local/bin/node/
sudo ln /usr/local/bin/node/bin/node /usr/local/bin/node
sudo ln -s /usr/local/bin/node/lib/node_modules/npm/bin/npm /usr/local/bin/npm
```

Alright, at this time we enter in any directory:
```
node -v
npm -v 
```
node is latest version, npm also available

Because in China, using npm to download packages will often be unstable, at this time we can use cnpm,
Enter the following command:

```
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

After download completes, when we install modules:
```
$ cnpm install [name]
```

