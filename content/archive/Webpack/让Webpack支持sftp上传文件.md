---
title: 让Webpack支持sftp上传文件
tags: [Webpack]
slug: 5e4dd5b8
keywords: webpack,自动化,持续集成,自动部署,sftp,自动发布
date: 2017-07-18 11:43:05
---
今天介绍两个插件,可以让你的webpack支持上传文件到你的ftp服务器.

[sftp-webpack-plugin](https://github.com/iAmHades/sftp-webpack-plugin)

## 安装sftp-webpack-plugin

```
npm install sftp-webpack-plugin --save-dev
```

## 使用

``` javascript
const SftpWebpackPlugin = require('sftp-webpack-plugin');

var config = {
   plugins: [new SftpWebpackPlugin({
    port: 'your port',//服务器端口
    host: 'your host',//服务器地址
    username: 'your username',//用户名
    password: 'your password',//密码
    from: 'you neeed upload file path ',//你的本地路径
    to: 'you want to destination'//服务器上的路径
  })]
}
```


## webpack-sftp-client

[webpack-sftp-client](https://github.com/sqhtiamo/webpack-sftp-client)

## 安装webpack-sftp-client
```
npm install webpack-sftp-client --save-dev
```

## 使用

```javascript
var WebpackSftpClient = require('webpack-sftp-client');

var config = {
   plugins: [new WebpackSftpClient({
    port: '22',//服务器端口
    host: 'exmaple.com',//服务器地址
    username: 'root',//用户名
    password: 'password',//登录密码
    path: './build/', //本地路径
    remotePath: '/data/website/demo/', //服务器路径
    verbose: true //控制台显示详细信息
})]
}

```
