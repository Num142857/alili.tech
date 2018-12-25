---
title: Typescript的福音:Json To Interface
tags: [Typescript]
slug: ijfdh4ry66c
keywords: typescript,vs code, 插件
date: 2018-12-25 19:33:33
---
在我们使用ts的时候,我们需要写大量的 interface.

但是我们一条json数据的字段实在是太多了,一个一个写的话不仅会花费大量的时间.

在团队内部推广ts,因为使用问题导致推广层层阻碍,最后放弃使用屡见不鲜.

今天推荐的这个插件,希望可以帮到你.

# JSON to TS 插件

## 安装
```
ext install json-to-ts
```

## 复制到剪贴板后 运行快捷键 (Ctrl + Alt + V)
![](https://github.com/MariusAlch/vscode-json-to-ts/raw/master/./images/clipboard.gif)

## 鼠标选中后 运行快捷键 (Ctrl + Alt + S)
![](https://github.com/MariusAlch/vscode-json-to-ts/raw/master/./images/selection.gif)

# 已知问题

## linux 已知问题

```bash
Command failed: xclip -selection clipboard -o
```
## 解决方法
```bash
sudo apt-get install xclip
```