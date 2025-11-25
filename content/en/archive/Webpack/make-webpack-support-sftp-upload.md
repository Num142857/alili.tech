---
title: Make Webpack Support sftp Upload Files
tags: [Webpack]
slug: 5e4dd5b8
keywords: webpack,Automation,CI/CD,Auto Deploy,sftp,Auto Publish
date: 2017-07-18 11:43:05
---

Today introduce two plugins, can make your webpack support uploading files to your ftp server.

[sftp-webpack-plugin](https://github.com/iAmHades/sftp-webpack-plugin)

## Install sftp-webpack-plugin

```
npm install sftp-webpack-plugin --save-dev
```

## Usage

```javascript
const SftpWebpackPlugin = require('sftp-webpack-plugin');

var config = {
   plugins: [new SftpWebpackPlugin({
    port: 'your port',//Server port
    host: 'your host',//Server address
    username: 'your username',//Username
    password: 'your password',//Password
    from: 'you neeed upload file path ',//Your local path
    to: 'you want to destination'//Path on server
  })]
}
```


## webpack-sftp-client

[webpack-sftp-client](https://github.com/sqhtiamo/webpack-sftp-client)

## Install webpack-sftp-client
```
npm install webpack-sftp-client --save-dev
```

## Usage

```javascript
var WebpackSftpClient = require('webpack-sftp-client');

var config = {
   plugins: [new WebpackSftpClient({
    port: '22',//Server port
    host: 'exmaple.com',//Server address
    username: 'root',//Username
    password: 'password',//Login password
    path: './build/', //Local path
    remotePath: '/data/website/demo/', //Server path
    verbose: true //Console show detailed information
})]
}

```

